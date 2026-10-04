import Link from 'next/link';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
export const dynamic='force-dynamic';
export default async function FamiliesPage(){
 await requireAdmin();
 const rows=await withDbRetry(()=>sql`SELECT b.id,b.status,b.plan_key,b.max_students,b.trial_ends_at,b.current_period_end,b.created_at,u.full_name,u.email,COUNT(bs.id) FILTER(WHERE bs.status='ACTIVE')::int active_seats FROM billing_accounts b JOIN users u ON u.id=b.owner_user_id LEFT JOIN billing_student_seats bs ON bs.billing_account_id=b.id GROUP BY b.id,u.id ORDER BY b.updated_at DESC`);
 return <main className="shell admin-v103"><header className="admin-section-head"><div><span className="eyebrow">FAMILY ACCESS CONTROL</span><h1>Subscriptions, learner seats and identity integrity.</h1><p>See who owns each family account, how many learner seats are occupied, and where genuine seat changes need intervention.</p></div><Link href="/admin">← Admin home</Link></header><section className="admin-panel"><div className="family-admin-list">{rows.length?rows.map((x:any)=><Link href={`/admin/families/${x.id}`} className="family-admin-row" key={x.id}><div><b>{x.full_name||'Parent / guardian'}</b><span>{x.email}</span></div><div><small>Status</small><strong>{x.status}</strong></div><div><small>Learner seats</small><strong>{x.active_seats} / {x.max_students}</strong></div><div><small>Trial / period</small><strong>{x.trial_ends_at?new Date(x.trial_ends_at).toLocaleDateString('en-NG'):x.current_period_end?new Date(x.current_period_end).toLocaleDateString('en-NG'):'—'}</strong></div><em>Review →</em></Link>):<p className="parent-panel-empty">No family billing accounts yet.</p>}</div></section></main>
}
