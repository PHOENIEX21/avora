import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';import {sql,withDbRetry} from '@/lib/db';
export async function POST(_req:Request,{params}:{params:Promise<{id:string}>}){
 try{const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required.'},{status:401});
 const {id}=await params;const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 const [room]=await withDbRetry(()=>sql`SELECT class_level FROM study_rooms WHERE id=${id} AND status='ACTIVE'`);
 if(!room||(s.role!=='ADMIN'&&String(room.class_level)!==String(profile?.class_level)))return NextResponse.json({error:'Group unavailable.'},{status:403});
 await withDbRetry(()=>sql`INSERT INTO study_room_presence(room_id,user_id,last_seen_at) VALUES(${id},${s.userId},now()) ON CONFLICT(room_id,user_id) DO UPDATE SET last_seen_at=now()`);
 const [counts]=await withDbRetry(()=>sql`SELECT COUNT(*)::int AS online FROM study_room_presence WHERE room_id=${id} AND last_seen_at>now()-interval '45 seconds'`);
 return NextResponse.json({online:counts?.online||0});
 }catch(e){console.error('presence failed',e);return NextResponse.json({error:'Presence unavailable.'},{status:500})}
}
