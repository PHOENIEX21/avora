import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql} from '@/lib/db';
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s||s.role!=='ADMIN')return NextResponse.json({error:'Forbidden'},{status:403});const {id}=await params,b=await req.json();
 const action=String(b.action||'');
 if(action==='ASSIGN_SELF'){
  await sql.begin(async tx=>{await tx`UPDATE support_threads SET assigned_admin_id=${s.userId},updated_at=now() WHERE id=${id}`;await tx`INSERT INTO support_thread_events(thread_id,actor_id,event_type,event_data) VALUES(${id},${s.userId},'ASSIGNED',${tx.json({adminId:s.userId})})`});
 }else if(action==='STATUS'){
  const allowed=['OPEN','WAITING_ON_STUDENT','WAITING_ON_SUPPORT','RESOLVED','CLOSED'];const status=String(b.status||'');if(!allowed.includes(status))return NextResponse.json({error:'Invalid status'},{status:400});
  await sql.begin(async tx=>{await tx`UPDATE support_threads SET status=${status},resolved_at=CASE WHEN ${status}='RESOLVED' THEN now() ELSE resolved_at END,updated_at=now() WHERE id=${id}`;await tx`INSERT INTO support_thread_events(thread_id,actor_id,event_type,event_data) VALUES(${id},${s.userId},'STATUS_CHANGED',${tx.json({status})})`});
 }else if(action==='PRIORITY'){
  const allowed=['LOW','NORMAL','HIGH','URGENT'];const priority=String(b.priority||'');if(!allowed.includes(priority))return NextResponse.json({error:'Invalid priority'},{status:400});
  await sql.begin(async tx=>{await tx`UPDATE support_threads SET priority=${priority},updated_at=now() WHERE id=${id}`;await tx`INSERT INTO support_thread_events(thread_id,actor_id,event_type,event_data) VALUES(${id},${s.userId},'PRIORITY_CHANGED',${tx.json({priority})})`});
 }else return NextResponse.json({error:'Invalid action'},{status:400});
 return NextResponse.json({ok:true});
}
