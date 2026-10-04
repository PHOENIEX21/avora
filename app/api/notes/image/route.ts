import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {createHash} from 'crypto';
const MAX=5*1024*1024,ALLOWED=new Set(['image/jpeg','image/png','image/webp']);
export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required.'},{status:401});
 const form=await req.formData(),noteId=String(form.get('noteId')||''),file=form.get('image');
 if(!(file instanceof File)||!noteId)return NextResponse.json({error:'Choose an image and note.'},{status:400});
 if(!ALLOWED.has(file.type)||file.size>MAX)return NextResponse.json({error:'Use JPG, PNG or WebP up to 5 MB.'},{status:400});
 const own=await withDbRetry(()=>sql`SELECT id FROM learner_notes WHERE id=${noteId} AND student_id=${s.userId}`);if(!own.length)return NextResponse.json({error:'Note not found.'},{status:404});
 const bytes=Buffer.from(await file.arrayBuffer()),hash=createHash('sha256').update(bytes).digest('hex').slice(0,20),key=`db://${s.userId}/${noteId}/${Date.now()}-${hash}`;
 const [row]=await withDbRetry(()=>sql`INSERT INTO learner_note_images(note_id,student_id,storage_key,original_name,mime_type,byte_size,image_bytes) VALUES(${noteId},${s.userId},${key},${file.name},${file.type},${file.size},${bytes}) RETURNING id,original_name,mime_type,byte_size,created_at`);
 return NextResponse.json({image:row},{status:201});
}
export async function GET(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required.'},{status:401});const id=new URL(req.url).searchParams.get('id');
 const [row]=await withDbRetry(()=>sql`SELECT mime_type,image_bytes FROM learner_note_images WHERE id=${id} AND student_id=${s.userId}`);if(!row)return NextResponse.json({error:'Image not found.'},{status:404});
 const stored=Buffer.isBuffer(row.image_bytes)?row.image_bytes:Buffer.from(row.image_bytes);const body=stored.buffer.slice(stored.byteOffset,stored.byteOffset+stored.byteLength) as ArrayBuffer;return new NextResponse(body,{headers:{'Content-Type':row.mime_type,'Cache-Control':'private, max-age=3600','X-Content-Type-Options':'nosniff'}});
}