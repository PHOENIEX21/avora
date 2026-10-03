import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {createHash} from 'crypto';

const MAX=8*1024*1024,ALLOWED=new Set(['image/jpeg','image/png','image/webp']);
function cfg(){const base=process.env.NOTE_IMAGE_STORAGE_URL||'',token=process.env.NOTE_IMAGE_STORAGE_TOKEN||'';return {base:base.replace(/\/$/,''),token}}
export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required.'},{status:401});
 const form=await req.formData(),noteId=String(form.get('noteId')||''),file=form.get('image');
 if(!(file instanceof File)||!noteId)return NextResponse.json({error:'Choose an image and note.'},{status:400});
 if(!ALLOWED.has(file.type)||file.size>MAX)return NextResponse.json({error:'Use JPG, PNG or WebP up to 8 MB.'},{status:400});
 const own=await withDbRetry(()=>sql`SELECT id FROM learner_notes WHERE id=${noteId} AND student_id=${s.userId}`);if(!own.length)return NextResponse.json({error:'Note not found.'},{status:404});
 const {base,token}=cfg();if(!base||!token)return NextResponse.json({error:'Permanent note-image storage is not configured yet.',code:'NOTE_STORAGE_NOT_CONFIGURED'},{status:503});
 const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg',hash=createHash('sha256').update(await file.arrayBuffer()).digest('hex').slice(0,20),key=`${s.userId}/${noteId}/${Date.now()}-${hash}.${ext}`;
 const bytes=await file.bytes();const up=await fetch(`${base}/${key}`,{method:'PUT',headers:{Authorization:`Bearer ${token}`,'Content-Type':file.type,'Content-Length':String(file.size)},body:bytes});if(!up.ok)return NextResponse.json({error:'The image could not be stored permanently.'},{status:503});
 const [row]=await withDbRetry(()=>sql`INSERT INTO learner_note_images(note_id,student_id,storage_key,original_name,mime_type,byte_size) VALUES(${noteId},${s.userId},${key},${file.name},${file.type},${file.size}) RETURNING id,original_name,mime_type,byte_size,created_at`);
 return NextResponse.json({image:row},{status:201});
}
export async function GET(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required.'},{status:401});const id=new URL(req.url).searchParams.get('id');
 const [row]=await withDbRetry(()=>sql`SELECT storage_key,mime_type FROM learner_note_images WHERE id=${id} AND student_id=${s.userId}`);if(!row)return NextResponse.json({error:'Image not found.'},{status:404});
 const {base,token}=cfg();if(!base||!token)return NextResponse.json({error:'Storage unavailable.'},{status:503});const r=await fetch(`${base}/${row.storage_key}`,{headers:{Authorization:`Bearer ${token}`}});if(!r.ok)return NextResponse.json({error:'Image unavailable.'},{status:503});return new NextResponse(r.body,{headers:{'Content-Type':row.mime_type,'Cache-Control':'private, max-age=3600'}});
}
