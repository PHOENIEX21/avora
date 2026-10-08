import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';import {isCommunityAdmin} from '@/lib/communityAccess';import {sql,withDbRetry} from '@/lib/db';
async function check(roomId:string,userId:string,role:string){
 const [room]=await withDbRetry(()=>sql`SELECT class_level FROM study_rooms WHERE id=${roomId} AND status='ACTIVE'`);
 if(!room)return false;if(await isCommunityAdmin(userId))return true;
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${userId}`);
 return String(profile?.class_level)===String(room.class_level);
}
export async function POST(_req:Request,{params}:{params:Promise<{id:string;postId:string}>}){
 try{const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required'},{status:401});
 const {id,postId}=await params;if(!await check(id,s.userId,s.role))return NextResponse.json({error:'Not allowed'},{status:403});
 const [post]=await withDbRetry(()=>sql`SELECT id FROM study_room_posts WHERE id=${postId} AND room_id=${id} AND status='VISIBLE'`);
 if(!post)return NextResponse.json({error:'Message unavailable'},{status:404});
 await withDbRetry(()=>sql`INSERT INTO study_room_starred_posts(user_id,post_id) VALUES(${s.userId},${postId}) ON CONFLICT DO NOTHING`);
 return NextResponse.json({starred:true});
 }catch(e){console.error('star message failed',e);return NextResponse.json({error:'Could not star message'},{status:500})}
}
export async function DELETE(_req:Request,{params}:{params:Promise<{id:string;postId:string}>}){
 try{const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required'},{status:401});
 const {id,postId}=await params;if(!await check(id,s.userId,s.role))return NextResponse.json({error:'Not allowed'},{status:403});
 await withDbRetry(()=>sql`DELETE FROM study_room_starred_posts WHERE user_id=${s.userId} AND post_id=${postId} AND EXISTS (SELECT 1 FROM study_room_posts WHERE id=${postId} AND room_id=${id})`);
 return NextResponse.json({starred:false});
 }catch(e){console.error('unstar message failed',e);return NextResponse.json({error:'Could not remove star'},{status:500})}
}
