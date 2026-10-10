import {NextResponse} from 'next/server';import {getSession} from '@/lib/auth';import {isCommunityAdmin} from '@/lib/communityAccess';import {sql,withDbRetry} from '@/lib/db';
export async function POST(req:Request,{params}:{params:Promise<{id:string;postId:string}>}){
 try{const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required'},{status:401});
 if(!await isCommunityAdmin(s.userId))return NextResponse.json({error:'Admin only'},{status:403});
 const {id,postId}=await params;const [post]=await withDbRetry(()=>sql`SELECT id FROM study_room_posts WHERE id=${postId} AND room_id=${id} AND status='VISIBLE'`);
 if(!post)return NextResponse.json({error:'Message not found'},{status:404});
 await withDbRetry(()=>sql`UPDATE study_rooms SET pinned_post_id=${postId} WHERE id=${id} AND status='ACTIVE'`);
 return NextResponse.json({ok:true});
 }catch(e){console.error('pin failed',e);return NextResponse.json({error:'Could not pin'},{status:500})}
}
export async function DELETE(_req:Request,{params}:{params:Promise<{id:string;postId:string}>}){
 try{const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required'},{status:401});
 if(!await isCommunityAdmin(s.userId))return NextResponse.json({error:'Admin only'},{status:403});
 const {id,postId}=await params;
 await withDbRetry(()=>sql`UPDATE study_rooms SET pinned_post_id=NULL WHERE id=${id} AND pinned_post_id=${postId}`);
 return NextResponse.json({ok:true});
 }catch(e){console.error('unpin failed',e);return NextResponse.json({error:'Could not unpin'},{status:500})}
}
