import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

export async function POST(req:Request){
 const session=await getSession();
 if(!session||!['STUDENT','ADMIN'].includes(session.role))return NextResponse.json({error:'Forbidden'},{status:403});
 const body=await req.json(),questionId=String(body.questionId||''),topicId=String(body.curriculumTopicId||'').trim();
 if(!questionId||!topicId)return NextResponse.json({error:'Question and confirmed topic are required.'},{status:400});
 const [row]=await withDbRetry(()=>sql`
  SELECT aq.id,aq.question_type,aq.options,aq.correct_answer,aq.rubric,aq.max_marks,aq.model_solution,ua.student_id
  FROM assignment_questions aq JOIN uploaded_assignments ua ON ua.id=aq.assignment_id
  WHERE aq.id=${questionId} AND (${session.role}='ADMIN' OR ua.student_id=${session.userId})`);
 if(!row)return NextResponse.json({error:'Assignment question not found.'},{status:404});
 const ready=row.model_solution&&row.model_solution!=='Pending reviewed solution.'&&
  ((row.question_type==='MULTIPLE_CHOICE'&&Array.isArray(row.options)&&row.options.length===4&&row.correct_answer)||
   (row.question_type==='THEORY'&&Array.isArray(row.rubric)&&row.rubric.length&&Number(row.max_marks)>0));
 if(!ready)return NextResponse.json({error:'Complete and validate the academic conversion before confirming this question.'},{status:409});
 await withDbRetry(()=>sql`UPDATE assignment_questions SET curriculum_topic_id=${topicId},classification_confidence='HIGH',needs_confirmation=false,confirmed_at=now(),next_review_at=now()+interval '7 days',active_for_review=true WHERE id=${questionId}`);
 return NextResponse.json({questionId,confirmed:true,nextReviewInDays:7});
}
