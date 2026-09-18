import {learningAccessDenial} from '@/lib/apiAccess';
import {NextResponse} from 'next/server';
import {sql,withDbRetry} from '@/lib/db';
import {getSession} from '@/lib/auth';
import {subjectSlug,subjectLabel} from '@/lib/subjects';
import {reserveTrialQuestions} from '@/lib/trialLimits';
import {assessmentAliases} from '@/lib/masterTopicAliases';
import {isExamReadyQuestion} from '@/lib/questionQuality';

const DIAGNOSTIC_TARGET=5;
export async function GET(req:Request){
 const session=await getSession();if(!session)return NextResponse.json({error:'Unauthorized'},{status:401});const accessDenied=await learningAccessDenial(session);if(accessDenied)return accessDenied;
 try{
  const url=new URL(req.url),mode=url.searchParams.get('mode')==='diagnostic'?'DIAGNOSTIC':'PRACTICE',requestedTopic=url.searchParams.get('topic')?.trim();
  const [profile]=await withDbRetry(()=>sql`SELECT preferred_subject,target_exam,current_skill_id,class_level FROM student_profiles WHERE user_id=${session.userId}`);
  const preferred=profile?.preferred_subject||'Mathematics',subject=subjectLabel(preferred),subSlug=subjectSlug(preferred),exam=profile?.target_exam||'BECE',classLevel=String(profile?.class_level||'JSS3');
  const classExam=classLevel==='JSS3'?exam:null;
  const available=`${classLevel} · ${subject}`;

  if(mode==='DIAGNOSTIC'){
   const [done]=await withDbRetry(()=>sql`SELECT COUNT(*)::int n FROM attempts a JOIN questions q ON q.id=a.question_id WHERE a.student_id=${session.userId} AND a.mode='DIAGNOSTIC' AND q.class_level=${classLevel}`);
   const answered=Number(done?.n||0);if(answered>=DIAGNOSTIC_TARGET)return NextResponse.json({question:null,complete:true,context:{exam:classExam||`${classLevel} Curriculum`,classLevel,subject,answered,minimumEvidence:DIAGNOSTIC_TARGET}});
   const rows=await withDbRetry(()=>sql`SELECT q.id,q.prompt,q.question_type,q.options,q.correct_answer,q.difficulty,q.hint_text,q.interaction_steps,q.question_group,s.name AS skill_name,t.name AS topic_name FROM questions q JOIN skills s ON s.id=q.skill_id JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND char_length(trim(q.prompt))>=8 AND sub.slug=${subSlug} AND q.class_level=${classLevel} AND (${classExam}::text IS NULL OR q.exam_name=${classExam}) AND q.id NOT IN (SELECT question_id FROM attempts WHERE student_id=${session.userId} AND mode='DIAGNOSTIC') ORDER BY q.difficulty,q.curriculum_order,random() LIMIT 25`);
   const r=rows.find(isExamReadyQuestion);if(!r)return NextResponse.json({question:null,complete:true,context:{exam:classExam||`${classLevel} Curriculum`,classLevel,subject,answered,minimumEvidence:DIAGNOSTIC_TARGET,bank:available}});
   await withDbRetry(()=>sql`UPDATE student_profiles SET diagnostic_started_at=COALESCE(diagnostic_started_at,now()) WHERE user_id=${session.userId}`);
   return NextResponse.json({question:shape(r,false),mode,context:{exam:classExam||`${classLevel} Curriculum`,classLevel,subject,answered,minimumEvidence:DIAGNOSTIC_TARGET,trial:{diagnosticIncluded:true,diagnosticQuestions:DIAGNOSTIC_TARGET}}});
  }

  let skillId=profile?.current_skill_id,selectedTopicName='';
  if(skillId){const valid=await withDbRetry(()=>sql`SELECT s.id,t.name topic_name FROM skills s JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id WHERE s.id=${skillId} AND t.stage=${classLevel} AND sub.slug=${subSlug} AND EXISTS(SELECT 1 FROM questions q WHERE q.skill_id=s.id AND q.class_level=${classLevel} AND q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND (${classExam}::text IS NULL OR q.exam_name=${classExam})) LIMIT 1`);if(!valid[0])skillId=null;else selectedTopicName=valid[0].topic_name;}
  if(requestedTopic){
   const requestedAliases=assessmentAliases(classLevel,subject,requestedTopic).map(x=>x.toLowerCase());
   const chosen=await withDbRetry(()=>sql`SELECT s.id,t.name topic_name FROM skills s JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id JOIN questions q ON q.skill_id=s.id WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND q.class_level=${classLevel} AND t.stage=${classLevel} AND sub.slug=${subSlug} AND (lower(t.name)=ANY(${requestedAliases}) OR lower(COALESCE(NULLIF(trim(q.exam_topic),''),t.name))=ANY(${requestedAliases})) AND (${classExam}::text IS NULL OR q.exam_name=${classExam}) ORDER BY q.curriculum_order,q.difficulty LIMIT 1`);
   if(chosen[0]?.id){skillId=chosen[0].id;selectedTopicName=chosen[0].topic_name;}
  }
  if(!skillId){
   const weak=await withDbRetry(()=>sql`SELECT s.id,t.name topic_name FROM skills s JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id LEFT JOIN mastery m ON m.skill_id=s.id AND m.student_id=${session.userId} WHERE sub.slug=${subSlug} AND t.stage=${classLevel} AND EXISTS(SELECT 1 FROM questions q WHERE q.skill_id=s.id AND q.class_level=${classLevel} AND q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND (${classExam}::text IS NULL OR q.exam_name=${classExam})) ORDER BY COALESCE(m.score,0) ASC,t.order_index ASC,s.created_at ASC LIMIT 1`);
   skillId=weak[0]?.id;selectedTopicName=weak[0]?.topic_name||'';if(skillId)await withDbRetry(()=>sql`UPDATE student_profiles SET current_skill_id=${skillId},current_topic_id=(SELECT topic_id FROM skills WHERE id=${skillId}) WHERE user_id=${session.userId}`);
  }
  if(!skillId)return NextResponse.json({question:null,complete:true,context:{classLevel,subject,bank:available}});
  const [evidence]=await withDbRetry(()=>sql`SELECT COUNT(*)::int n,COUNT(*) FILTER(WHERE is_correct)::int correct FROM attempts a JOIN questions q ON q.id=a.question_id WHERE a.student_id=${session.userId} AND a.mode='PRACTICE' AND q.skill_id=${skillId}`);const n=Number(evidence?.n||0),accuracy=n?Number(evidence.correct)/n:0;
  if(!requestedTopic&&n>=5&&accuracy>=0.8){const next=await withDbRetry(()=>sql`SELECT s.id,t.name topic_name FROM skills s JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id LEFT JOIN mastery m ON m.skill_id=s.id AND m.student_id=${session.userId} WHERE sub.slug=${subSlug} AND t.stage=${classLevel} AND s.id<>${skillId} AND EXISTS(SELECT 1 FROM questions q WHERE q.skill_id=s.id AND q.class_level=${classLevel} AND q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND (${classExam}::text IS NULL OR q.exam_name=${classExam})) ORDER BY COALESCE(m.score,0) ASC,t.order_index ASC LIMIT 1`);if(next[0]?.id){skillId=next[0].id;selectedTopicName=next[0].topic_name||'';await withDbRetry(()=>sql`UPDATE student_profiles SET current_skill_id=${skillId},current_topic_id=(SELECT topic_id FROM skills WHERE id=${skillId}) WHERE user_id=${session.userId}`)}}
  let rows:any[]=[...(await withDbRetry(()=>sql`SELECT q.id,q.prompt,q.question_type,q.options,q.correct_answer,q.difficulty,q.hint_text,q.interaction_steps,q.question_group,s.name AS skill_name,t.name AS topic_name FROM questions q JOIN skills s ON s.id=q.skill_id JOIN topics t ON t.id=s.topic_id WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND q.class_level=${classLevel} AND char_length(trim(q.prompt))>=8 AND q.skill_id=${skillId} AND (${classExam}::text IS NULL OR q.exam_name=${classExam}) AND q.id NOT IN (SELECT question_id FROM attempts WHERE student_id=${session.userId} AND mode='PRACTICE') ORDER BY q.curriculum_order,q.difficulty,random() LIMIT 25`))];
  rows=rows.filter(isExamReadyQuestion);
  if(!rows[0])rows=[...(await withDbRetry(()=>sql`SELECT q.id,q.prompt,q.question_type,q.options,q.correct_answer,q.difficulty,q.hint_text,q.interaction_steps,q.question_group,s.name AS skill_name,t.name AS topic_name FROM questions q JOIN skills s ON s.id=q.skill_id JOIN topics t ON t.id=s.topic_id WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND q.class_level=${classLevel} AND q.skill_id=${skillId} AND (${classExam}::text IS NULL OR q.exam_name=${classExam}) ORDER BY random() LIMIT 25`))];
  rows=rows.filter(isExamReadyQuestion);
  const r=rows[0];if(!r)return NextResponse.json({question:null,complete:true,context:{classLevel,subject,topic:selectedTopicName}});
  const [progress]=await withDbRetry(()=>sql`SELECT COUNT(*)::int answered,COUNT(*) FILTER(WHERE is_correct)::int correct FROM attempts a JOIN questions q ON q.id=a.question_id WHERE a.student_id=${session.userId} AND a.mode='PRACTICE' AND q.skill_id=${skillId}`);
  const reserved=await reserveTrialQuestions(session.userId,'PRACTICE',[String(r.id)]);if(!reserved.allowed)return NextResponse.json({error:`Your 14-day trial includes ${reserved.limit} self-service assessment questions. You have ${reserved.remaining} remaining. Subscribe to continue practice without the trial cap.`,code:'TRIAL_QUESTION_LIMIT',trial:reserved},{status:402});return NextResponse.json({question:shape(r,true),mode,context:{exam:classExam||`${classLevel} Curriculum`,classLevel,subject,topic:r.topic_name,skill:r.skill_name,group:r.question_group||r.skill_name,answered:Number(progress?.answered||0),minimumEvidence:5,accuracy:Number(progress?.answered||0)?Number(progress?.correct||0)/Number(progress?.answered||1):0,trial:reserved.isTrial?{remaining:reserved.remaining,limit:reserved.limit}:null}});
 }catch(e){console.error('questions',e);return NextResponse.json({error:'AVORA could not reach your learning data just now. Please retry.'},{status:503})}
}
function normalizeOptions(value:any):string[]|null{if(Array.isArray(value))return value.map(String);if(typeof value==='string'){try{return normalizeOptions(JSON.parse(value))}catch{return null}}if(value&&typeof value==='object'){if(Array.isArray(value.options))return value.options.map(String);if(Array.isArray(value.choices))return value.choices.map(String)}return null}
function shape(r:any,guided:boolean){const raw=Array.isArray(r.interaction_steps)?r.interaction_steps:[];const steps=guided?raw.map((x:any)=>({prompt:x.prompt,inputLabel:x.inputLabel||'Your step'})):[];const options=normalizeOptions(r.options);return{id:r.id,prompt:r.prompt,questionType:r.question_type,options,skillName:r.skill_name,topicName:r.topic_name,difficulty:r.difficulty,hint:r.hint_text,guided:steps.length>0,steps}}