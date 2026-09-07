import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {subjectLabel,subjectSlug} from '@/lib/subjects';
import {getTutorTopicNames} from '@/lib/tutorCurriculum';

export const dynamic='force-dynamic';
export const revalidate=0;

function json(data:unknown,init?:ResponseInit){
 const response=NextResponse.json(data,init);
 response.headers.set('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');
 response.headers.set('Pragma','no-cache');
 return response;
}

function normalizeOptions(value:any):string[]{
 if(Array.isArray(value))return value.map(String);
 if(typeof value==='string'){try{return normalizeOptions(JSON.parse(value))}catch{return []}}
 if(value&&typeof value==='object'){
  if(Array.isArray(value.options))return value.options.map(String);
  if(Array.isArray(value.choices))return value.choices.map(String);
 }
 return [];
}

function shapeQuestion(row:any){
 return {
  id:String(row.id),
  prompt:String(row.prompt||''),
  type:String(row.question_type||'SHORT_ANSWER'),
  options:normalizeOptions(row.options),
  hint:String(row.hint_text||''),
  explanation:String(row.explanation||''),
  difficulty:Number(row.difficulty||1),
  skill:String(row.skill_name||''),
  topic:String(row.topic_name||''),
 };
}

export async function GET(req:Request){
 const session=await getSession();
 if(!session)return json({error:'Please sign in again.'},{status:401});
 try{
  const requestedTopic=new URL(req.url).searchParams.get('topic')?.trim()||'';
  const [profile]=await withDbRetry(()=>sql`SELECT class_level,target_exam,preferred_subject FROM student_profiles WHERE user_id=${session.userId}`);
  const exam=String(profile?.target_exam||'BECE');
  const preferred=String(profile?.preferred_subject||'Mathematics');
  const subject=subjectLabel(preferred);
  const subSlug=subjectSlug(preferred);
  const classLevel=String(profile?.class_level||(exam==='BECE'?'JSS3':'Primary 6'));

  // Keep the picker fast: one grouped query returns only topics that really have reviewed content.
  const topicRows=await withDbRetry(()=>sql`
   SELECT COALESCE(NULLIF(trim(q.exam_topic),''),t.name) AS name,COUNT(*)::int AS questions,MIN(t.order_index)::int AS order_index
   FROM questions q
   JOIN skills s ON s.id=q.skill_id
   JOIN topics t ON t.id=s.topic_id
   JOIN subjects sub ON sub.id=t.subject_id
   WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED'
     AND char_length(trim(q.prompt))>=8
     AND sub.slug=${subSlug}
     AND (q.exam_name=${exam} OR q.exam_name IS NULL)
   GROUP BY COALESCE(NULLIF(trim(q.exam_topic),''),t.name)
   ORDER BY MIN(t.order_index),COALESCE(NULLIF(trim(q.exam_topic),''),t.name)
  `);
  const bankTopics=topicRows.map((r:any)=>({name:String(r.name),questions:Number(r.questions||0)}));
  const counts=new Map(bankTopics.map((t:any)=>[String(t.name).toLowerCase(),Number(t.questions||0)]));
  const academicTopics=getTutorTopicNames(exam,subject);
  const topics=[...academicTopics.map(name=>({name,questions:counts.get(name.toLowerCase())||0})),...bankTopics.filter((t:any)=>!academicTopics.some(name=>name.toLowerCase()===String(t.name).toLowerCase()))];

  if(!requestedTopic)return json({exam,subject,classLevel,topics,questions:[]});

  const questionRows=await withDbRetry(()=>sql`
   SELECT q.id,q.prompt,q.question_type,q.options,q.hint_text,q.explanation,q.difficulty,
          s.name AS skill_name,COALESCE(NULLIF(trim(q.exam_topic),''),t.name) AS topic_name
   FROM questions q
   JOIN skills s ON s.id=q.skill_id
   JOIN topics t ON t.id=s.topic_id
   JOIN subjects sub ON sub.id=t.subject_id
   WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED'
     AND char_length(trim(q.prompt))>=8
     AND sub.slug=${subSlug}
     AND (q.exam_name=${exam} OR q.exam_name IS NULL)
     AND (lower(COALESCE(NULLIF(trim(q.exam_topic),''),t.name))=lower(${requestedTopic}) OR lower(t.name)=lower(${requestedTopic}))
   ORDER BY q.curriculum_order,q.difficulty,q.created_at
   LIMIT 4
  `);

  return json({exam,subject,classLevel,topics,questions:questionRows.map(shapeQuestion)});
 }catch(error){
  console.error('tutor GET',error);
  return json({error:'AVORA Tutor could not prepare this lesson just now. Please retry.'},{status:503});
 }
}
