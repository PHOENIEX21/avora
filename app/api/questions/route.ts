import {NextResponse} from 'next/server';
import {sql,withDbRetry} from '@/lib/db';
import {getSession} from '@/lib/auth';
import {subjectSlug,subjectLabel} from '@/lib/subjects';

const DIAGNOSTIC_TARGET = 5;

export async function GET(req:Request){
 const session=await getSession(); if(!session)return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const url=new URL(req.url); const mode=url.searchParams.get('mode')==='diagnostic'?'DIAGNOSTIC':'PRACTICE'; const requestedTopic=url.searchParams.get('topic')?.trim();
  const [profile]=await withDbRetry(()=>sql`SELECT preferred_subject,target_exam,current_skill_id FROM student_profiles WHERE user_id=${session.userId}`);
  const preferred=profile?.preferred_subject||'Mathematics', subject=subjectLabel(preferred), subSlug=subjectSlug(preferred), exam=profile?.target_exam||'BECE';

  if(mode==='DIAGNOSTIC'){
   const [done]=await withDbRetry(()=>sql`SELECT COUNT(*)::int n FROM attempts WHERE student_id=${session.userId} AND mode='DIAGNOSTIC'`);
   const answered=Number(done?.n||0);
   if(answered>=DIAGNOSTIC_TARGET)return NextResponse.json({question:null,complete:true,context:{exam,subject,answered,minimumEvidence:DIAGNOSTIC_TARGET}});

   const rows=await withDbRetry(()=>sql`SELECT q.id,q.prompt,q.question_type,q.options,q.difficulty,q.hint_text,q.interaction_steps,q.question_group,s.name AS skill_name,t.name AS topic_name FROM questions q JOIN skills s ON s.id=q.skill_id JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND char_length(trim(q.prompt))>=8 AND sub.slug=${subSlug} AND (q.exam_name=${exam} OR q.exam_name IS NULL) AND q.id NOT IN (SELECT question_id FROM attempts WHERE student_id=${session.userId} AND mode='DIAGNOSTIC') ORDER BY q.difficulty,q.curriculum_order,random() LIMIT 1`);
   const r=rows[0]; if(!r)return NextResponse.json({question:null,complete:true,context:{exam,subject,answered,minimumEvidence:DIAGNOSTIC_TARGET}});
   await withDbRetry(()=>sql`UPDATE student_profiles SET diagnostic_started_at=COALESCE(diagnostic_started_at,now()) WHERE user_id=${session.userId}`);
   return NextResponse.json({question:shape(r,false),mode,context:{exam,subject,answered,minimumEvidence:DIAGNOSTIC_TARGET}});
  }

  let skillId=profile?.current_skill_id;
  let selectedTopicName='';
  if(requestedTopic){
   const chosen=await withDbRetry(()=>sql`SELECT s.id,t.name topic_name FROM skills s JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id JOIN questions q ON q.skill_id=s.id WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND char_length(trim(q.prompt))>=8 AND sub.slug=${subSlug} AND (lower(q.exam_topic)=lower(${requestedTopic}) OR lower(t.name)=lower(${requestedTopic})) AND (q.exam_name=${exam} OR q.exam_name IS NULL) ORDER BY t.order_index,s.created_at LIMIT 1`);
   if(chosen[0]?.id){skillId=chosen[0].id;selectedTopicName=chosen[0].topic_name;}
  }

  if(!skillId){
   const weak=await withDbRetry(()=>sql`SELECT s.id,t.name topic_name FROM skills s JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id LEFT JOIN mastery m ON m.skill_id=s.id AND m.student_id=${session.userId} WHERE sub.slug=${subSlug} AND EXISTS(SELECT 1 FROM questions q WHERE q.skill_id=s.id AND q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND (q.exam_name=${exam} OR q.exam_name IS NULL)) ORDER BY COALESCE(m.score,0) ASC,t.order_index ASC,s.created_at ASC LIMIT 1`);
   skillId=weak[0]?.id;selectedTopicName=weak[0]?.topic_name||'';
   if(skillId)await withDbRetry(()=>sql`UPDATE student_profiles SET current_skill_id=${skillId},current_topic_id=(SELECT topic_id FROM skills WHERE id=${skillId}) WHERE user_id=${session.userId}`);
  }
  if(!skillId)return NextResponse.json({question:null,complete:true});

  const [evidence]=await withDbRetry(()=>sql`SELECT COUNT(*)::int n,COUNT(*) FILTER(WHERE is_correct)::int correct FROM attempts a JOIN questions q ON q.id=a.question_id WHERE a.student_id=${session.userId} AND a.mode='PRACTICE' AND q.skill_id=${skillId}`);
  const n=Number(evidence?.n||0), accuracy=n?Number(evidence.correct)/n:0;

  // Explicit topic practice remains on the chosen topic. The client counts five fresh attempts in this learning session.

  // Only free/general practice may advance to another weakest skill automatically.
  if(!requestedTopic && n>=5 && accuracy>=0.8){
   const next=await withDbRetry(()=>sql`SELECT s.id FROM skills s JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id LEFT JOIN mastery m ON m.skill_id=s.id AND m.student_id=${session.userId} WHERE sub.slug=${subSlug} AND s.id<>${skillId} AND EXISTS(SELECT 1 FROM questions q WHERE q.skill_id=s.id AND q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND (q.exam_name=${exam} OR q.exam_name IS NULL)) ORDER BY COALESCE(m.score,0) ASC,t.order_index ASC LIMIT 1`);
   if(next[0]?.id){skillId=next[0].id;await withDbRetry(()=>sql`UPDATE student_profiles SET current_skill_id=${skillId},current_topic_id=(SELECT topic_id FROM skills WHERE id=${skillId}) WHERE user_id=${session.userId}`);}
  }

  let rows=await withDbRetry(()=>sql`SELECT q.id,q.prompt,q.question_type,q.options,q.difficulty,q.hint_text,q.interaction_steps,q.question_group,s.name AS skill_name,t.name AS topic_name FROM questions q JOIN skills s ON s.id=q.skill_id JOIN topics t ON t.id=s.topic_id WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND char_length(trim(q.prompt))>=8 AND q.skill_id=${skillId} AND (q.exam_name=${exam} OR q.exam_name IS NULL) AND q.id NOT IN (SELECT question_id FROM attempts WHERE student_id=${session.userId} AND mode='PRACTICE') ORDER BY q.curriculum_order,q.difficulty,random() LIMIT 1`);
  if(!rows[0]) rows=await withDbRetry(()=>sql`SELECT q.id,q.prompt,q.question_type,q.options,q.difficulty,q.hint_text,q.interaction_steps,q.question_group,s.name AS skill_name,t.name AS topic_name FROM questions q JOIN skills s ON s.id=q.skill_id JOIN topics t ON t.id=s.topic_id WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND char_length(trim(q.prompt))>=8 AND q.skill_id=${skillId} AND (q.exam_name=${exam} OR q.exam_name IS NULL) ORDER BY random() LIMIT 1`);
  const r=rows[0]; if(!r)return NextResponse.json({question:null,complete:true});
  const [progress]=await withDbRetry(()=>sql`SELECT COUNT(*)::int answered,COUNT(*) FILTER(WHERE is_correct)::int correct FROM attempts a JOIN questions q ON q.id=a.question_id WHERE a.student_id=${session.userId} AND a.mode='PRACTICE' AND q.skill_id=${skillId}`);
  return NextResponse.json({question:shape(r,true),mode,context:{exam,subject,topic:r.topic_name,skill:r.skill_name,group:r.question_group||r.skill_name,answered:Number(progress?.answered||0),minimumEvidence:5,accuracy:Number(progress?.answered||0)?Number(progress?.correct||0)/Number(progress?.answered||1):0}});
 }catch(e){console.error('questions',e);return NextResponse.json({error:'AVORA could not reach your learning data just now. Please retry.'},{status:503})}
}
function normalizeOptions(value:any):string[]|null{
 if(Array.isArray(value))return value.map(String);
 if(typeof value==='string'){try{return normalizeOptions(JSON.parse(value))}catch{return null}}
 if(value&&typeof value==='object'){
  if(Array.isArray(value.options))return value.options.map(String);
  if(Array.isArray(value.choices))return value.choices.map(String);
 }
 return null;
}
function shape(r:any,guided:boolean){const raw=Array.isArray(r.interaction_steps)?r.interaction_steps:[];const steps=guided?raw.map((x:any)=>({prompt:x.prompt,inputLabel:x.inputLabel||'Your step'})):[];const options=normalizeOptions(r.options);return{id:r.id,prompt:r.prompt,questionType:r.question_type,options,skillName:r.skill_name,topicName:r.topic_name,difficulty:r.difficulty,hint:r.hint_text,guided:steps.length>0,steps}}
