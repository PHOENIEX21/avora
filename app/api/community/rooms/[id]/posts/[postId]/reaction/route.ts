import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';import {sql,withDbRetry} from '@/lib/db';
const allowed=new Set(['👍','❤️','😂','😮','👏','🙏']);
export async function POST(req:Request,{params}:{params:Promise<{id:string;postId:string}>}){
 try{const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required'},{status:401});
 const {id,postId}=await params;const data=await req.json();const emoji=String(data.emoji||'');
 if(!allowed.has(emoji))return NextResponse.json({error:'Invalid reaction'},{status:400});
 const [room]=await withDbRetry(()=>sql`SELECT class_level FROM study_rooms WHERE id=${id} AND status='ACTIVE'`);
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 if(!room||(s.role!=='ADMIN'&&String(profile?.class_level)!==String(room.class_level)))return NextResponse.json({error:'Not allowed'},{status:403});
 const [post]=await withDbRetry(()=>sql`SELECT id FROM study_room_posts WHERE id=${postId} AND room_id=${id} AND status='VISIBLE'`);
 if(!post)return NextResponse.json({error:'Message unavailable'},{status:404});
 await withDbRetry(()=>sql`INSERT INTO study_room_reactions(post_id,user_id,emoji) VALUES(${postId},${s.userId},${emoji}) ON CONFLICT(post_id,user_id) DO UPDATE SET emoji=excluded.emoji`);
 return NextResponse.json({ok:true});
 }catch(e){console.error('reaction failed',e);return NextResponse.json({error:'Could not react'},{status:500})}
}
export async function DELETE(_req:Request,{params}:{params:Promise<{id:string;postId:string}>}){
 try{const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required'},{status:401});
 const {id,postId}=await params;const [room]=await withDbRetry(()=>sql`SELECT class_level FROM study_rooms WHERE id=${id} AND status='ACTIVE'`);
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 if(!room||(s.role!=='ADMIN'&&String(profile?.class_level)!==String(room.class_level)))return NextResponse.json({error:'Not allowed'},{status:403});
 await withDbRetry(()=>sql`DELETE FROM study_room_reactions WHERE post_id=${postId} AND user_id=${s.userId} AND EXISTS(SELECT 1 FROM study_room_posts WHERE id=${postId} AND room_id=${id})`);
 return NextResponse.json({ok:true});
 }catch(e){console.error('reaction removal failed',e);return NextResponse.json({error:'Could not remove reaction'},{status:500})}
}
