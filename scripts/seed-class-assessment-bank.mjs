import fs from 'node:fs/promises';
import postgres from 'postgres';
const databaseUrl=process.env.DIRECT_URL||process.env.DATABASE_URL;if(!databaseUrl){console.error('DIRECT_URL and DATABASE_URL are missing.');process.exit(1)}
const sql=postgres(databaseUrl,{ssl:'require',max:1,connect_timeout:30});
const bank=JSON.parse(await fs.readFile(new URL('../data/jss1-jss2-assessment-bank.json',import.meta.url),'utf8'));
const slug=s=>String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,90);
const subjectSlug=s=>s==='English Language'?'english':'mathematics';
let inserted=0,updated=0;
// Retire the previous-current-cohort bank before installing the reconciled 2025 curriculum bank.
await sql`UPDATE questions SET status='RETIRED'
 WHERE class_level IN ('JSS1','JSS2')
   AND content_origin='AVORA_ORIGINAL'
   AND curriculum_topic_id LIKE 'nerdc2025-%'
   AND review_version IS DISTINCT FROM 'V13.2.0'`;
await sql`UPDATE curriculum_performance_tasks SET status='ARCHIVED',updated_at=now() WHERE class_level IN ('JSS1','JSS2')`;
async function getSubject(name){const s=subjectSlug(name);return (await sql`INSERT INTO subjects(slug,name,description) VALUES(${s},${name},${name==='Mathematics'?'Build numerical reasoning and problem-solving mastery.':'Build reading, writing, oral-language, grammar and literature mastery.'}) ON CONFLICT(slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`)[0]}
const subjectCache=new Map();
async function ensureSkill(q){let sub=subjectCache.get(q.subject);if(!sub){sub=await getSubject(q.subject);subjectCache.set(q.subject,sub)}
 const topicSlug=`${q.classLevel.toLowerCase()}-${slug(q.curriculumTopicId)}`;
 const [t]=await sql`INSERT INTO topics(subject_id,slug,name,stage,order_index) VALUES(${sub.id},${topicSlug},${q.topic},${q.classLevel},0) ON CONFLICT(subject_id,slug) DO UPDATE SET name=EXCLUDED.name,stage=EXCLUDED.stage RETURNING id`;
 const skillSlug=`curriculum-${slug(q.curriculumTopicId)}`;
 const [sk]=await sql`INSERT INTO skills(topic_id,slug,name,description,mastery_threshold) VALUES(${t.id},${skillSlug},${q.topic},${`${q.classLevel} examination-practice skill for ${q.topic}`},0.80) ON CONFLICT(topic_id,slug) DO UPDATE SET name=EXCLUDED.name,description=EXCLUDED.description RETURNING id`;
 return sk.id;
}
try{
 for(const q of bank.questions){
  const skillId=await ensureSkill(q);
  const exists=await sql`SELECT id FROM questions WHERE variant_family=${q.variantFamily} LIMIT 1`;
  if(exists.length){
   await sql`UPDATE questions SET skill_id=${skillId},prompt=${q.prompt},question_type=${q.questionType},options=${sql.json(q.options)},correct_answer=${sql.json({value:q.correctAnswer})},explanation=${q.explanation},misconception_tags=${q.misconceptionTags},difficulty=${q.difficulty},status='PUBLISHED',content_origin='AVORA_ORIGINAL',quality_status='REVIEWED',curriculum_objective=${q.curriculumObjective},class_level=${q.classLevel},curriculum_topic_id=${q.curriculumTopicId},assessment_kind=${q.assessmentKind},review_version='V13.2.0',exam_name=NULL,question_group=${q.curriculumTopicId},curriculum_order=${q.difficulty},variant_family=${q.variantFamily} WHERE id=${exists[0].id}`;updated++;
  }else{
   await sql`INSERT INTO questions(skill_id,source_type,prompt,question_type,options,correct_answer,explanation,misconception_tags,difficulty,status,content_origin,quality_status,curriculum_objective,class_level,curriculum_topic_id,assessment_kind,review_version,exam_name,question_group,curriculum_order,variant_family) VALUES(${skillId},'AVORA_ORIGINAL',${q.prompt},${q.questionType},${sql.json(q.options)},${sql.json({value:q.correctAnswer})},${q.explanation},${q.misconceptionTags},${q.difficulty},'PUBLISHED','AVORA_ORIGINAL','REVIEWED',${q.curriculumObjective},${q.classLevel},${q.curriculumTopicId},${q.assessmentKind},'V13.2.0',NULL,${q.curriculumTopicId},${q.difficulty},${q.variantFamily})`;inserted++;
  }
 }
 for(const t of bank.performanceTasks){
  await sql`INSERT INTO curriculum_performance_tasks(id,curriculum_topic_id,class_level,subject_name,topic_name,prompt,rubric,prerequisites,source_authority,source_url,source_page,status,updated_at) VALUES(${t.id},${t.curriculumTopicId},${t.classLevel},${t.subject},${t.topic},${t.prompt},${sql.json(t.rubric)},${sql.json(t.prerequisites)},${t.sourceAuthority},${t.sourceUrl||null},${t.sourcePage||null},${t.status},now()) ON CONFLICT(id) DO UPDATE SET prompt=EXCLUDED.prompt,rubric=EXCLUDED.rubric,prerequisites=EXCLUDED.prerequisites,status=EXCLUDED.status,updated_at=now()`;
 }
 console.log(`Class assessment bank ready. Inserted ${inserted}, updated ${updated}, performance tasks ${bank.performanceTasks.length}.`);
 console.table(bank.summary.byClassSubject);
}finally{await sql.end({timeout:2})}

