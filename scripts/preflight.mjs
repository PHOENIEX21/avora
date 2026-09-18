import postgres from 'postgres';
import fs from 'node:fs';

const failures=[];
const warnings=[];
const expectedBank=JSON.parse(fs.readFileSync('data/jss1-jss2-assessment-bank.json','utf8'));
const expectedTopicCounts={};for(const t of expectedBank.performanceTasks){const k=`${t.classLevel}|${t.subject}`;expectedTopicCounts[k]=(expectedTopicCounts[k]||0)+1;}
try{const curriculumVersion=JSON.parse(fs.readFileSync('data/curriculum-version-status.json','utf8'));if(curriculumVersion.launchAllowed!==true)failures.push(`curriculum launch guard: ${curriculumVersion.status} — ${curriculumVersion.reason}`)}catch{failures.push('curriculum version status file is missing or unreadable')}
const required=(name)=>{
 const value=(process.env[name]||'').trim();
 if(!value) failures.push(`${name} is missing`);
 return value;
};

const databaseUrl=required('DATABASE_URL');
const authSecret=required('AUTH_SECRET');
if(authSecret && authSecret.length<32) failures.push('AUTH_SECRET must be at least 32 characters');
const appUrl=required('APP_URL');
if(appUrl && /^http:\/\/localhost/i.test(appUrl)) failures.push('APP_URL still points to localhost. Use the final deployed HTTPS URL for launch preflight.');
else if(appUrl && !/^https:\/\//i.test(appUrl)) failures.push('APP_URL must use HTTPS for public launch.');

const brevoKey=required('BREVO_API_KEY');
const emailFrom=required('EMAIL_FROM');
if(emailFrom && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailFrom)) failures.push('EMAIL_FROM is not a valid email address.');
if(process.env.SENDGRID_API_KEY) warnings.push('SENDGRID_API_KEY is configured only as an optional migration fallback; remove it after Brevo delivery is confirmed.');
const aiProvider=(process.env.AI_PROVIDER||'gemini').trim().toLowerCase();
if(aiProvider==='gemini') required('GEMINI_API_KEY');
else if(aiProvider==='openai') required('OPENAI_API_KEY');
else failures.push('AI_PROVIDER must be gemini or openai.');


const paystackPublic=required('PAYSTACK_PUBLIC_KEY');
const paystackSecret=required('PAYSTACK_SECRET_KEY');
const paystackPlan=required('PAYSTACK_PLAN_CODE_FAMILY_MONTHLY');
const cronSecret=required('CRON_SECRET');
if(cronSecret && cronSecret.length<24) failures.push('CRON_SECRET must be at least 24 characters');
if(paystackPublic && !/^pk_(test|live)_/.test(paystackPublic)) failures.push('PAYSTACK_PUBLIC_KEY does not look like a valid Paystack public key.');
if(paystackSecret && !/^sk_(test|live)_/.test(paystackSecret)) failures.push('PAYSTACK_SECRET_KEY does not look like a valid Paystack secret key.');
if(paystackPlan && !/^PLN_/.test(paystackPlan)) failures.push('PAYSTACK_PLAN_CODE_FAMILY_MONTHLY must be a Paystack plan code beginning PLN_.');
if(paystackPublic && paystackSecret && ((paystackPublic.includes('_test_')&&!paystackSecret.includes('_test_'))||(paystackPublic.includes('_live_')&&!paystackSecret.includes('_live_')))) failures.push('Paystack public and secret keys must both be test keys or both be live keys.');

if(failures.length){
 console.error('\nAVORA preflight failed:\n- '+failures.join('\n- '));
 process.exit(1);
}

const sql=postgres(databaseUrl,{ssl:'require',max:1,connect_timeout:10,idle_timeout:5});
try{
 await sql`SELECT 1`;
 const requiredTables=['login_rate_limits','password_reset_tokens','users','student_profiles','questions','attempts','mastery','topics','skills','email_verification_tokens','exam_sessions','tutor_topic_progress','learner_skill_insights','tutor_interactions','remediation_plans','curriculum_performance_tasks','live_assessments','support_threads','parent_profiles','billing_accounts','billing_student_seats','ncee_mock_sessions','trial_question_exposures'];
 const tables=await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name=ANY(${requiredTables})`;
 const found=new Set(tables.map(x=>x.table_name));
 for(const t of requiredTables) if(!found.has(t)) failures.push(`database table ${t} is missing`);
 const [securityMigration]=await sql`SELECT EXISTS(SELECT 1 FROM schema_migrations WHERE filename='026_login_security.sql') AS applied`;
 if(!securityMigration?.applied) failures.push('security migration 026_login_security.sql has not been applied');
 const [latest]=await sql`SELECT EXISTS(SELECT 1 FROM schema_migrations WHERE filename='027_authored_mock_exams.sql') AS applied`;
 if(!latest?.applied) failures.push('latest database migration 027_authored_mock_exams.sql has not been applied');
 const [extendedMockMigration]=await sql`SELECT EXISTS(SELECT 1 FROM schema_migrations WHERE filename='028_extended_mock_rubric_grading.sql') AS applied`;
 if(!extendedMockMigration?.applied) failures.push('latest database migration 028_extended_mock_rubric_grading.sql has not been applied');
 const [launchHardeningMigration]=await sql`SELECT EXISTS(SELECT 1 FROM schema_migrations WHERE filename='031_launch_commercial_hardening.sql') AS applied`;
 if(!launchHardeningMigration?.applied) failures.push('migration 031_launch_commercial_hardening.sql has not been applied');
 const [aiGatewayMigration]=await sql`SELECT EXISTS(SELECT 1 FROM schema_migrations WHERE filename='032_ai_gateway_email_launch.sql') AS applied`;
 if(!aiGatewayMigration?.applied) failures.push('migration 032_ai_gateway_email_launch.sql has not been applied');

 const rows=await sql`
  SELECT COALESCE(q.exam_name,'UNSPECIFIED') exam, sub.slug subject,
         COUNT(*)::int published,
         COUNT(*) FILTER (WHERE q.quality_status='REVIEWED')::int reviewed,
         COUNT(DISTINCT t.id)::int topics
  FROM questions q
  JOIN skills sk ON sk.id=q.skill_id
  JOIN topics t ON t.id=sk.topic_id
  JOIN subjects sub ON sub.id=t.subject_id
  WHERE q.status='PUBLISHED'
  GROUP BY COALESCE(q.exam_name,'UNSPECIFIED'),sub.slug
  ORDER BY 1,2`;
 console.log('\nAVORA question-bank readiness');
 console.table(rows);
 for(const row of rows){
  if(Number(row.published)<40) warnings.push(`${row.exam} ${row.subject} has only ${row.published} published questions; a 40-question mock may have limited variation.`);
  if(Number(row.reviewed)<10) warnings.push(`${row.exam} ${row.subject} has fewer than 10 reviewed questions.`);
 }
 const classBanks=await sql`SELECT q.class_level,sub.name subject,COUNT(*)::int reviewed,COUNT(DISTINCT q.curriculum_topic_id)::int topics,MIN(topic_count)::int min_per_topic FROM questions q JOIN skills sk ON sk.id=q.skill_id JOIN topics t ON t.id=sk.topic_id JOIN subjects sub ON sub.id=t.subject_id JOIN LATERAL (SELECT COUNT(*)::int topic_count FROM questions q2 WHERE q2.curriculum_topic_id=q.curriculum_topic_id AND q2.class_level=q.class_level AND q2.status='PUBLISHED' AND q2.quality_status='REVIEWED') tc ON true WHERE q.class_level IN ('JSS1','JSS2') AND q.status='PUBLISHED' AND q.quality_status='REVIEWED' GROUP BY q.class_level,sub.name ORDER BY q.class_level,sub.name`;

 const [jssCount]=await sql`SELECT COUNT(*)::int n FROM questions WHERE class_level IN ('JSS1','JSS2') AND review_version='V10.0.0' AND status='PUBLISHED'`;
 if(Number(jssCount?.n)!==888) failures.push(`expected 888 published revised JSS1/JSS2 questions; found ${Number(jssCount?.n||0)}`);
 const [nceeCount]=await sql`SELECT COUNT(*)::int n FROM questions WHERE class_level IN ('Primary 5','Primary 6') AND review_version='V11.0.0' AND assessment_kind='NCEE_PREP' AND status='PUBLISHED'`;
 if(Number(nceeCount?.n)!==960) failures.push(`expected 960 published V11 NCEE preparation questions; found ${Number(nceeCount?.n||0)}`);
 const nceeParity=await sql`SELECT class_level,question_group domain,COUNT(*)::int n FROM questions WHERE review_version='V11.0.0' AND assessment_kind='NCEE_PREP' AND status='PUBLISHED' GROUP BY class_level,question_group ORDER BY class_level,question_group`;
 if(nceeParity.length!==12||nceeParity.some(r=>Number(r.n)!==80)) failures.push('NCEE bank parity failed: each of 6 domains must contain exactly 80 published questions in both Primary 5 and Primary 6');
 console.log('\nVerified active bank counts');console.table([{bank:'JSS1/JSS2 revised',count:Number(jssCount?.n||0)},{bank:'Primary 5/6 NCEE',count:Number(nceeCount?.n||0)}]);

 console.log('\nJSS1/JSS2 class-bank parity');console.table(classBanks);
 for(const level of ['JSS1','JSS2'])for(const subject of ['Mathematics','English Language']){const r=classBanks.find(x=>x.class_level===level&&x.subject===subject),key=`${level}|${subject}`,expectedTopics=expectedTopicCounts[key]||0;if(!r)failures.push(`${level} ${subject} class assessment bank is missing`);else{if(Number(r.reviewed)<40)failures.push(`${level} ${subject} has fewer than 40 reviewed class questions`);if(Number(r.min_per_topic)<8)failures.push(`${level} ${subject} has a current curriculum topic with fewer than 8 reviewed questions`);if(Number(r.topics)!==expectedTopics)failures.push(`${level} ${subject} has ${r.topics} active curriculum topics but ${expectedTopics} are required by the reconciled current map`);}}
}catch(error){
 failures.push(`database check failed: ${error?.message||error}`);
}finally{
 await sql.end({timeout:2}).catch(()=>{});
}

if(warnings.length) console.warn('\nWarnings to resolve before public launch:\n- '+warnings.join('\n- '));
if(failures.length){
 console.error('\nAVORA preflight failed:\n- '+failures.join('\n- '));
 process.exit(1);
}
console.log('\nAVORA preflight passed: core environment and database checks are healthy.');
