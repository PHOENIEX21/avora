import Link from 'next/link';
import {notFound} from 'next/navigation';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
import AdminFamilySeatRelease from '@/components/AdminFamilySeatRelease';
export const dynamic='force-dynamic';
export default async function FamilyDetail({params}:{params:Promise<{id:string}>}){
 await requireAdmin();const {id}=await params;
 const [family]=await withDbRetry(()=>sql`SELECT b.*,u.full_name,u.email FROM billing_accounts b JOIN users u ON u.id=b.owner_user_id WHERE b.id=${id}`);if(!family)notFound();
 const seats=await withDbRetry(()=>sql`SELECT bs.student_id,bs.status,bs.attached_at,bs.locked_at,u.full_name,u.email,sp.class_level FROM billing_student_seats bs JOIN users u ON u.id=bs.student_id LEFT JOIN student_profiles sp ON sp.user_id=u.id WHERE bs.billing_account_id=${id} ORDER BY bs.attached_at`);
 const events=await withDbRetry(()=>sql`SELECT e.*,u.full_name student_name,a.full_name actor_name FROM family_seat_events e JOIN users u ON u.id=e.student_id LEFT JOIN users a ON a.id=e.actor_user_id WHERE e.billing_account_id=${id} ORDER BY e.created_at DESC LIMIT 30`);
 return <main className="shell admin-v103"><header className="admin-section-head"><div><Link href="/admin/families">← Family access</Link><span className="eyebrow">FAMILY ACCOUNT</span><h1>{family.full_name||family.email}</h1><p>{family.email} · {family.status} · {seats.filter((x:any)=>x.status==='ACTIVE').length}/{family.max_students} active learner seats</p></div></header><section className="admin-detail-grid"><article className="admin-panel"><h2>Learner identities</h2><p>Seats are identity-bound. Use release only after a genuine family change has been verified.</p>{seats.length?seats.map((x:any)=><div className="admin-family-seat" key={x.student_id}><div><b>{x.full_name}</b><span>{x.class_level||'Learner'} · {x.email}</span><small>{x.status} · attached {new Date(x.attached_at).toLocaleDateString('en-NG')}</small></div>{x.status==='ACTIVE'&&<AdminFamilySeatRelease familyId={id} studentId={x.student_id} studentName={x.full_name}/>}</div>):<p>No learner seat history yet.</p>}</article><article className="admin-panel"><h2>Seat audit trail</h2>{events.length?events.map((e:any)=><div className="family-event-row" key={e.id}><b>{e.event_type}</b><span>{e.student_name}</span><small>{e.reason||'No reason recorded'} · {new Date(e.created_at).toLocaleString('en-NG')}</small></div>):<p>No seat events recorded yet.</p>}</article></section></main>
}
