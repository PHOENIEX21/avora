import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';import {sql,withDbRetry} from '@/lib/db';
export async function GET(_req:Request,{params}:{params:Promise<{id:string;attachmentId:string}>}){
 try{
  const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required.'},{status:401});
  const {id,attachmentId}=await params;
  const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
  const [room]=await withDbRetry(()=>sql`SELECT class_level FROM study_rooms WHERE id=${id} AND status='ACTIVE'`);
  if(!room||(s.role!=='ADMIN'&&String(room.class_level)!==String(profile?.class_level)))return NextResponse.json({error:'Not allowed.'},{status:403});
  const [file]=await withDbRetry(()=>sql`SELECT a.file_name,a.mime_type,encode(a.file_bytes,'base64') AS data FROM study_room_attachments a JOIN study_room_posts p ON p.id=a.post_id WHERE a.id=${attachmentId} AND p.room_id=${id} AND (p.status='VISIBLE' OR (p.status='PENDING_REVIEW' AND p.author_id=${s.userId}))`);
  if(!file)return NextResponse.json({error:'Attachment not found.'},{status:404});
  const bytes=Buffer.from(file.data,'base64');
  return new Response(new Uint8Array(bytes),{headers:{'Content-Type':file.mime_type,'Content-Disposition':'inline; filename="attachment"','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; sandbox"}});
 }catch(e){console.error('attachment retrieval failed',e);return NextResponse.json({error:'Attachment unavailable.'},{status:500})}
}
