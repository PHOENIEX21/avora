import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

async function authorized(threadId:string,userId:string,role:string){
 const [thread]=await withDbRetry(()=>sql`SELECT st.*,u.full_name student_name,u.email student_email,sp.class_level FROM support_threads st JOIN users u ON u.id=st.student_id LEFT JOIN student_profiles sp ON sp.user_id=u.id WHERE st.id=${threadId}`);
 if(!thread)return null;
 if(role==='ADMIN'||thread.student_id===userId)return thread;
 return null;
}
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s)return NextResponse.json({error:'Unauthorized'},{status:401});const {id}=await params;
 const thread=await authorized(id,s.userId,s.role);if(!thread)return NextResponse.json({error:'Not found'},{status:404});
 const messages=await withDbRetry(()=>sql`SELECT sm.id,sm.sender_role,sm.body,sm.created_at,u.full_name sender_name FROM support_messages sm LEFT JOIN users u ON u.id=sm.sender_id WHERE sm.thread_id=${id} ORDER BY sm.created_at ASC`);
 return NextResponse.json({thread,messages});
}
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s)return NextResponse.json({error:'Unauthorized'},{status:401});const {id}=await params;
 const thread=await authorized(id,s.userId,s.role);if(!thread)return NextResponse.json({error:'Not found'},{status:404});
 if(thread.status==='CLOSED')return NextResponse.json({error:'This conversation is closed.'},{status:409});
 const b=await req.json(),body=String(b.message||'').trim().slice(0,4000);if(!body)return NextResponse.json({error:'Write a message first.'},{status:400});
 const senderRole=s.role==='ADMIN'?'ADMIN':'STUDENT';
 const nextStatus=senderRole==='ADMIN'?'WAITING_ON_STUDENT':'WAITING_ON_SUPPORT';
 await sql.begin(async tx=>{
  await tx`INSERT INTO support_messages(thread_id,sender_id,sender_role,body) VALUES(${id},${s.userId},${senderRole},${body})`;
  await tx`UPDATE support_threads SET status=${nextStatus},last_message_at=now(),updated_at=now(),resolved_at=NULL WHERE id=${id}`;
 });
 return NextResponse.json({ok:true});
}
