import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';
import {isCommunityAdmin} from '@/lib/communityAccess';
const MAX=4*1024*1024;
const ALLOWED=new Set(['application/pdf','image/jpeg','image/png','image/webp']);
const schema=z.object({body:z.string().trim().max(4000),parentPostId:z.string().uuid().nullable().optional(),postType:z.enum(['QUESTION','ANSWER','WORKING']).default('QUESTION')});
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 try{
  const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required.'},{status:401});
  const {id}=await params;const form=await req.formData();
  const parsed=schema.safeParse({body:String(form.get('body')||''),parentPostId:form.get('parentPostId')||null,postType:form.get('postType')||'QUESTION'});
  if(!parsed.success)return NextResponse.json({error:'Invalid message or reply.'},{status:400});
  const d=parsed.data;const file=form.get('file');
  if(file!==null&&!(file instanceof File))return NextResponse.json({error:'Invalid attachment.'},{status:400});
  if(file instanceof File&&(!ALLOWED.has(file.type)||file.size<1||file.size>MAX))return NextResponse.json({error:'Attach a JPG, PNG, WebP or PDF up to 4 MB.'},{status:400});
  if(d.body.length<3&&!(file instanceof File))return NextResponse.json({error:'Write a message or attach a file.'},{status:400});
  const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
  const [room]=await withDbRetry(()=>sql`SELECT class_level FROM study_rooms WHERE id=${id} AND status='ACTIVE'`);
  if(!room||(!await isCommunityAdmin(s.userId)&&String(room.class_level)!==String(profile?.class_level)))return NextResponse.json({error:'This group is not available for your class.'},{status:403});
  if(d.parentPostId){const parentId=d.parentPostId;const [parent]=await withDbRetry(()=>sql`SELECT id FROM study_room_posts WHERE id=${parentId} AND room_id=${id} AND status='VISIBLE'`);if(!parent)return NextResponse.json({error:'Reply target unavailable.'},{status:409})}
  const [activity]=await withDbRetry(()=>sql`SELECT COUNT(*)::int AS recent FROM study_room_posts WHERE author_id=${s.userId} AND created_at>now()-interval '1 minute'`);
  if(Number(activity?.recent||0)>=8)return NextResponse.json({error:'Please wait before sending more messages.'},{status:429});
  const bytes=file instanceof File?Buffer.from(await file.arrayBuffer()):null;
  if(bytes){const signatures:Record<string,boolean>={'application/pdf':bytes.subarray(0,5).toString()==='%PDF-','image/png':bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a','image/jpeg':bytes.subarray(0,3).toString('hex')==='ffd8ff','image/webp':bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP'};if(!signatures[(file as File).type])return NextResponse.json({error:'File content does not match its type.'},{status:400})}
  const name=file instanceof File?file.name.replace(/[\\/\x00-\x1f]/g,'').slice(0,120)||'attachment':null;
  await withDbRetry(()=>sql.begin(async tx=>{
   const [post]=await tx`INSERT INTO study_room_posts(room_id,author_id,parent_post_id,post_type,body,status) VALUES(${id},${s.userId},${d.parentPostId||null},${d.postType},${d.body},'VISIBLE') RETURNING id`;
   if(bytes&&file){const encoded=bytes.toString('base64');await tx`INSERT INTO study_room_attachments(post_id,file_name,mime_type,file_size,file_bytes) VALUES(${post.id},${name||'attachment'},${file.type},${bytes.length},decode(${encoded},'base64'))`}
  }));
  return NextResponse.json({ok:true,message:'Message posted to your study group.'});
 }catch(e){console.error('community post failed',e);return NextResponse.json({error:'Message could not be posted. Please retry.'},{status:500})}
}
