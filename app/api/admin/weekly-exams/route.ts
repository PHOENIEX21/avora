import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
export async function POST(req:Request){
 const admin=await requireAdmin();const b=await req.json();
 const classLevel=String(b.classLevel||''),term=Number(b.term),week=Number(b.week),title=String(b.title||'').trim();
 const questionCount=Number(b.questionCount),durationMinutes=Number(b.durationMinutes);
 const scheduleIds=Array.isArray(b.scheduleIds)?b.scheduleIds.map(String):[];
 if(!['JSS1','JSS2','JSS3'].includes(classLevel)||!Number.isInteger(term)||term<1||term>3||!Number.isInteger(week)||week<1||week>20||!title||questionCount<5||questionCount>100||durationMinutes<10||durationMinutes>240||!scheduleIds.length)return NextResponse.json({error:'Complete the weekly blueprint and select approved curriculum scope.'},{status:400});
 const eligible=await withDbRetry(()=>sql`SELECT t.id::text,t.subject_name,t.curriculum_topic_id,COUNT(o.id) FILTER(WHERE o.status IN ('REVIEWED','LIVE'))::int objectives FROM term_topic_schedule t LEFT JOIN academic_daily_objectives o ON o.schedule_id=t.id WHERE t.id=ANY(${scheduleIds}::uuid[]) AND t.class_level=${classLevel} AND t.term=${term} AND t.week_number=${week} GROUP BY t.id`);
 if(eligible.length!==scheduleIds.length||eligible.some((x:any)=>Number(x.objectives)<1))return NextResponse.json({error:'Every selected topic must belong to this week and have an approved daily objective.'},{status:409});
 const result=await withDbRetry(()=>sql.begin(async tx=>{
  const [exam]=await tx`INSERT INTO weekly_exam_blueprints(class_level,term,week_number,title,duration_minutes,question_count,created_by) VALUES(${classLevel},${term},${week},${title},${durationMinutes},${questionCount},${admin.userId}) RETURNING id`;
  const base=Math.floor(questionCount/eligible.length),extra=questionCount%eligible.length;
  for(let i=0;i<eligible.length;i++){const x:any=eligible[i];await tx`INSERT INTO weekly_exam_scope(blueprint_id,schedule_id,subject_name,curriculum_topic_id,target_questions) VALUES(${exam.id},${x.id},${x.subject_name},${x.curriculum_topic_id},${base+(i<extra?1:0)})`;}
  return exam;
 }));
 return NextResponse.json({id:String(result.id)});
}