import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {buildScheduledAssessment,scheduledTopic} from '@/lib/scheduledAssessment';
import {markAssignmentQuestionResurfaced} from '@/lib/assignmentReview';
import {z} from 'zod';

const schema=z.object({subject:z.enum(['Mathematics','English Language']),kind:z.enum(['DAILY_CBT','WEEKEND_EXAM']),term:z.number().int().min(1).max(3),weekNumber:z.number().int().min(1).max(20)});
function options(v:any){if(Array.isArray(v))return v.map(String);if(typeof v==='string'){try{return options(JSON.parse(v))}catch{return null}}return null}

export async function POST(req:Request){
 const session=await getSession();if(!session)return NextResponse.json({error:'Please sign in again.'},{status:401});
 try{
  const d=schema.parse(await req.json());
  const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${session.userId}`);
  const classLevel=String(profile?.class_level||'');
  const schedule=await scheduledTopic(classLevel,d.subject,d.term,d.weekNumber);
  if(!schedule)return NextResponse.json({error:'No verified AVORA topic schedule is configured for this class, subject, term and week yet.'},{status:409});
  const paper=await buildScheduledAssessment({studentId:session.userId,classLevel,subject:d.subject,kind:d.kind,currentTopicId:String(schedule.curriculum_topic_id)});
  if(paper.objectiveQuestions.length<5)return NextResponse.json({error:'There are not enough reviewed AVORA questions to create this scheduled assessment safely.'},{status:409});
  const objectiveIds=paper.objectiveQuestions.map((q:any)=>String(q.id));
  const assignmentIds=paper.assignmentQuestions.map((q:any)=>String(q.id));
  const duration=d.kind==='DAILY_CBT'?1200:2700;
  const [exam]=await withDbRetry(()=>sql`INSERT INTO exam_sessions(student_id,exam_name,subject_name,question_ids,duration_seconds,assessment_type,topic_focus,assignment_question_ids,schedule_kind,curriculum_topic_id)
    VALUES(${session.userId},${classLevel==='JSS3'?'BECE':classLevel+'_CURRICULUM'},${d.subject},${objectiveIds},${duration},${d.kind},${String(schedule.curriculum_topic_id)},${assignmentIds},${d.kind},${String(schedule.curriculum_topic_id)}) RETURNING id,started_at,duration_seconds`);
  if(assignmentIds.length)await markAssignmentQuestionResurfaced(assignmentIds);
  return NextResponse.json({sessionId:exam.id,startedAt:exam.started_at,durationSeconds:exam.duration_seconds,kind:d.kind,mix:paper.mix,
   objectiveQuestions:paper.objectiveQuestions.map((q:any,i:number)=>({number:i+1,id:q.id,prompt:q.prompt,type:q.question_type,options:options(q.options),topic:q.topic})),
   assignmentQuestions:paper.assignmentQuestions.map((q:any,i:number)=>({number:paper.objectiveQuestions.length+i+1,id:q.id,prompt:q.original_text,type:q.question_type,options:options(q.options),topicId:q.curriculum_topic_id,source:'STUDENT_ASSIGNMENT'}))
  });
 }catch(error){if(error instanceof z.ZodError)return NextResponse.json({error:'Choose a valid subject, assessment type, term and week.'},{status:400});console.error('scheduled assessment start',error);return NextResponse.json({error:'Could not prepare this scheduled assessment.'},{status:503})}
}
