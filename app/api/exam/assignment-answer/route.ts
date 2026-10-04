import {learningAccessDenial} from '@/lib/apiAccess';
import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';

const schema=z.object({sessionId:z.string().uuid(),questionId:z.string().uuid(),answer:z.string().max(12000)});
export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});
 const denied=await learningAccessDenial(s);if(denied)return denied;
 try{
  const d=schema.parse(await req.json());
  const rows=await withDbRetry(()=>sql`
   UPDATE exam_sessions SET assignment_answers=assignment_answers||${sql.json({[d.questionId]:d.answer})}
   WHERE id=${d.sessionId} AND student_id=${s.userId} AND status='ACTIVE'
     AND ${d.questionId}=ANY(assignment_question_ids)
   RETURNING id`);
  if(!rows.length)return NextResponse.json({error:'This assignment question is not part of the active assessment.'},{status:409});
  return NextResponse.json({ok:true});
 }catch(e){console.error('assignment exam answer',e);return NextResponse.json({error:'This answer could not sync yet. It remains on this screen — retry before submitting.'},{status:503})}
}
