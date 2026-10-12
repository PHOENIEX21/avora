import {redirect} from 'next/navigation';import Link from 'next/link';import {getSession} from '@/lib/auth';import {isCommunityAdmin} from '@/lib/communityAccess';import {sql,withDbRetry} from '@/lib/db';import CommunityReportActions from '@/components/CommunityReportActions';
export const dynamic='force-dynamic';
export default async function ReportsPage(){
 const s=await getSession();if(!s)redirect('/login');if(!await isCommunityAdmin(s.userId))redirect('/community');
 const reports=await withDbRetry(()=>sql`SELECT x.id,x.reason,x.created_at,p.body,u.full_name,r.title FROM study_room_reports x JOIN study_room_posts p ON p.id=x.post_id JOIN users u ON u.id=p.author_id JOIN study_rooms r ON r.id=p.room_id WHERE x.status='OPEN' ORDER BY x.created_at ASC LIMIT 100`);
 return <main className="shell"><Link href="/community">← Community</Link><h1>Community safety reports</h1><p>Review reported messages and hide harmful content. Reports are not visible to learners.</p>{reports.length===0&&<p>No open reports.</p>}{reports.map((x:any)=><article className="moderation-card" key={x.id}><small>{x.title} · {x.full_name}</small><p><strong>Reported message:</strong> {x.body||'Attachment'}</p><p><strong>Reason:</strong> {x.reason}</p><CommunityReportActions reportId={x.id}/></article>)}</main>;
}
