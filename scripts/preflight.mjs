import postgres from 'postgres';

const failures=[];
const warnings=[];
const required=(name)=>{
 const value=(process.env[name]||'').trim();
 if(!value) failures.push(`${name} is missing`);
 return value;
};

const databaseUrl=required('DATABASE_URL');
const authSecret=required('AUTH_SECRET');
if(authSecret && authSecret.length<32) failures.push('AUTH_SECRET must be at least 32 characters');
const appUrl=(process.env.APP_URL||'').trim();
if(!appUrl) warnings.push('APP_URL is missing. Set it to the final HTTPS site URL before inviting users.');
else if(/^http:\/\/localhost/i.test(appUrl)) warnings.push('APP_URL still points to localhost. Change it to the deployed HTTPS URL before public registration.');
else if(!/^https:\/\//i.test(appUrl)) warnings.push('APP_URL should use HTTPS in production.');
if(!(process.env.SENDGRID_API_KEY||'').trim()) warnings.push('SENDGRID_API_KEY is missing; production email verification will not be delivered.');
if(!(process.env.SENDGRID_FROM_EMAIL||'').trim()) warnings.push('SENDGRID_FROM_EMAIL is missing; production email verification will not be delivered.');

if(failures.length){
 console.error('\nAVORA preflight failed:\n- '+failures.join('\n- '));
 process.exit(1);
}

const sql=postgres(databaseUrl,{ssl:'require',max:1,connect_timeout:10,idle_timeout:5});
try{
 await sql`SELECT 1`;
 const tables=await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('users','student_profiles','questions','attempts','mastery','topics','skills')`;
 const found=new Set(tables.map(x=>x.table_name));
 for(const t of ['users','student_profiles','questions','attempts','mastery','topics','skills']) if(!found.has(t)) failures.push(`database table ${t} is missing`);

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
