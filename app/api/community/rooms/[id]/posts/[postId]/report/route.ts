import {NextResponse} from 'next/server';import {getSession} from '@/lib/auth';import {sql,withDbRetry} from '@/lib/db';import {isCommunityAdmin} from '@/lib/communityAccess';
export async function POST(req:Request,{params}:{params:Promise<{id:string;postId:string}>}){
 try{const s=await getSession();if(!s)return NextResponse.json({error:'Sign in required'},{status:401});
 const {id,postId}=await params;const data=await req.json().catch(()=>({}));
 const reason=String(data.reason||'').trim().slice(0,500);
 if(reason.length<5)return NextResponse.json({error:'Please describe the concern (at least five characters).'}, {status:400});
 const [room]=await withDbRetry(()=>sql`SELECT class_level FROM study_rooms WHERE id=${id} AND status='ACTIVE'`);
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 if(!room||(!await isCommunityAdmin(s.userId)&&String(profile?.class_level)!==String(room.class_level)))return NextResponse.json({error:'Not allowed'},{status:403});
 const [post]=await withDbRetry(()=>sql`SELECT id FROM study_room_posts WHERE id=${postId} AND room_id=${id} AND status='VISIBLE'`);
 if(!post)return NextResponse.json({error:'Message unavailable'},{status:404});
 const [existing]=await withDbRetry(()=>sql`SELECT id FROM study_room_reports WHERE post_id=${postId} AND reporter_id=${s.userId} AND status='OPEN' LIMIT 1`);
 if(existing)return NextResponse.json({ok:true,message:'Already reported for review.'});
 await withDbRetry(()=>sql`INSERT INTO study_room_reports(post_id,reporter_id,reason,status) VALUES(${postId},${s.userId},${reason},'OPEN')`);
 return NextResponse.json({ok:true,message:'Reported to Community moderators.'});
 }catch(e){console.error('report failed',e);return NextResponse.json({error:'Could not submit report'},{status:500})}
}
