import {NextResponse} from 'next/server';import {getSession} from '@/lib/auth';import {isCommunityAdmin} from '@/lib/communityAccess';import {sql,withDbRetry} from '@/lib/db';
export async function PATCH(req:Request,{params}:{params:Promise<{reportId:string}>}){
 const s=await getSession();if(!s||!await isCommunityAdmin(s.userId))return NextResponse.json({error:'Moderator access required'},{status:403});
 const {reportId}=await params;const d=await req.json().catch(()=>({}));
 if(!['DISMISSED','ACTIONED'].includes(d.action))return NextResponse.json({error:'Invalid action'},{status:400});
 const [report]=await withDbRetry(()=>sql`SELECT post_id FROM study_room_reports WHERE id=${reportId} AND status='OPEN'`);
 if(!report)return NextResponse.json({error:'Report not found or already reviewed'},{status:404});
 if(d.action==='ACTIONED')await withDbRetry(()=>sql`UPDATE study_room_posts SET status='HIDDEN' WHERE id=${report.post_id} AND status='VISIBLE'`);
 await withDbRetry(()=>sql`UPDATE study_room_reports SET status=${d.action},reviewed_at=now() WHERE id=${reportId} AND status='OPEN'`);
 return NextResponse.json({ok:true});
}
