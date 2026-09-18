import {requirePremiumFeature} from '@/lib/premiumAccess';
import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {answerIsCorrect} from '@/lib/answers';

export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s)return NextResponse.json({error:'Unauthorized'},{status:401});
 const premiumDenied=await requirePremiumFeature(s,'Weekly Live Exam');if(premiumDenied)return premiumDenied;
 const {id}=await params,{questionId,answer}=await req.json();
 const [row]=await withDbRetry(()=>sql`SELECT q.correct_answer,q.options,l.status,p.parent_confirmed,p.status participant_status FROM live_assessment_questions laq JOIN questions q ON q.id=laq.question_id JOIN live_assessments l ON l.id=laq.assessment_id JOIN live_assessment_participants p ON p.assessment_id=l.id AND p.student_id=${s.userId} WHERE laq.assessment_id=${id} AND laq.question_id=${questionId}`);
 if(!row||row.status!=='LIVE'||!row.parent_confirmed||row.participant_status==='SUBMITTED')return NextResponse.json({error:'Answering is locked.'},{status:409});
 const isCorrect=answerIsCorrect(answer,row.correct_answer,row.options);
 await withDbRetry(()=>sql`INSERT INTO live_assessment_answers(assessment_id,student_id,question_id,answer,is_correct) VALUES(${id},${s.userId},${questionId},${sql.json({value:answer})},${isCorrect}) ON CONFLICT(assessment_id,student_id,question_id) DO UPDATE SET answer=EXCLUDED.answer,is_correct=EXCLUDED.is_correct,answered_at=now()`);
 return NextResponse.json({ok:true});
}
