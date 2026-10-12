import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
export async function POST(req:Request,{params}:{params:Promise<{id:string;pollId:string}>}){
 try{
 const s=await getSession();if(!s)return NextResponse.json({error:'Sign in first.'},{status:401});
 const {id,pollId}=await params;const d=await req.json();const option=Number(d.optionIndex);
 if(!Number.isInteger(option)||option<0)return NextResponse.json({error:'Choose a valid option.'},{status:400});
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 const [poll]=await withDbRetry(()=>sql`SELECT p.options,r.class_level FROM study_room_polls p JOIN study_rooms r ON r.id=p.room_id WHERE p.id=${pollId} AND p.room_id=${id} AND r.status='ACTIVE' AND (p.closes_at IS NULL OR p.closes_at>now())`);
 if(!poll||(s.role!=='ADMIN'&&poll.class_level!==profile?.class_level))return NextResponse.json({error:'Poll unavailable.'},{status:403});
 const options=typeof poll.options==='string'?JSON.parse(poll.options):poll.options;
 if(option>=options.length)return NextResponse.json({error:'Invalid choice.'},{status:400});
 await withDbRetry(()=>sql`INSERT INTO study_room_poll_votes(poll_id,voter_id,option_index) VALUES(${pollId},${s.userId},${option}) ON CONFLICT(poll_id,voter_id) DO UPDATE SET option_index=EXCLUDED.option_index,created_at=now()`);
 return NextResponse.json({ok:true});
 }catch(e){console.error('poll vote failed',e);return NextResponse.json({error:'Could not save vote.'},{status:500})}
}
