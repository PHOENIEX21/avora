import {learningAccessDenial} from '@/lib/apiAccess';
import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';
const schema=z.object({sessionId:z.string().uuid(),taskKey:z.string().min(1).max(180),answer:z.string().max(12000)});
export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});
 const denied=await learningAccessDenial(s);if(denied)return denied;
 try{const d=schema.parse(await req.json());const rows=await withDbRetry(()=>sql`UPDATE exam_sessions SET extended_answers=extended_answers||${sql.json({[d.taskKey]:d.answer})} WHERE id=${d.sessionId} AND student_id=${s.userId} AND status='ACTIVE' AND assessment_type='AUTHORED_MOCK' RETURNING id`);if(!rows.length)return NextResponse.json({error:'This mock is no longer active.'},{status:409});return NextResponse.json({ok:true})}catch(e){console.error('extended answer',e);return NextResponse.json({error:'This extended answer could not sync yet.'},{status:503})}
}
