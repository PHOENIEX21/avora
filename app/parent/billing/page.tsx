import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {ensureBillingAccount,familyPlanDisplayPrice,syncLinkedChildrenToSeats,FAMILY_MAX_STUDENTS} from '@/lib/billing';
import {sql,withDbRetry} from '@/lib/db';
import ParentBillingButton from '@/components/ParentBillingButton';
import PaystackReturnVerifier from '@/components/PaystackReturnVerifier';
export const dynamic='force-dynamic';

export default async function BillingPage(){
 const s=await getSession();if(!s)redirect('/login');if(s.role!=='PARENT')redirect(s.role==='ADMIN'?'/admin':'/home');
 const b=await ensureBillingAccount(s.userId);await syncLinkedChildrenToSeats(s.userId,b.id,b.max_students);
 const seats=await withDbRetry(()=>sql`SELECT u.id,u.full_name,sp.class_level,bs.status,bs.attached_at FROM billing_student_seats bs JOIN users u ON u.id=bs.student_id LEFT JOIN student_profiles sp ON sp.user_id=u.id WHERE bs.billing_account_id=${b.id} AND bs.status='ACTIVE' ORDER BY bs.attached_at`);
 const links=await withDbRetry(()=>sql`SELECT psl.student_id,u.full_name,sp.class_level FROM parent_student_links psl JOIN users u ON u.id=psl.student_id LEFT JOIN student_profiles sp ON sp.user_id=u.id WHERE psl.parent_id=${s.userId} AND psl.status='ACTIVE' ORDER BY psl.linked_at`);
 const price=familyPlanDisplayPrice();const trialLeft=b.trial_ends_at?Math.max(0,Math.ceil((new Date(b.trial_ends_at).getTime()-Date.now())/86400000)):0;
 const statusLabel=b.status==='TRIALING'?`${trialLeft} days left`:b.status;
 return <main className="parent-child-page billing-v108"><PaystackReturnVerifier/>
  <section className="shell parent-child-head billing-hero"><div><Link href="/parent">← Parent dashboard</Link><span>AVORA FAMILY</span><h1>One family. One payment. Up to three learners.</h1><p>Your children can be in different classes. Each learner keeps a separate identity, class, Tutor history, assessment evidence and mastery record.</p></div><div className="parent-big-score"><strong>{statusLabel}</strong><span>family access status</span></div></section>

  <section className="shell billing-plan-grid">
   <article className="billing-plan-card featured"><span>FAMILY MONTHLY</span><h2>₦{price.toLocaleString('en-NG')} <small>/ month</small></h2><p>Parent oversight plus learning access for up to <b>{FAMILY_MAX_STUDENTS} identified children</b>.</p>{b.status==='TRIALING'&&<p><b>Trial started:</b> {b.trial_started_at?new Date(b.trial_started_at).toLocaleDateString('en-NG',{dateStyle:'medium'}):'—'}<br/><b>Trial ends:</b> {b.trial_ends_at?new Date(b.trial_ends_at).toLocaleDateString('en-NG',{dateStyle:'medium'}):'—'}</p>}<div className="billing-feature-list"><span>✓ 3 separate learner profiles</span><span>✓ JSS1, JSS2 and JSS3 can coexist</span><span>✓ Parent dashboard and weekly evidence</span><span>✓ Tutor, Practice, Exam and Live Assessment</span><span>✓ Human support</span></div>{b.status==='ACTIVE'?<div className="billing-active-note"><b>Subscription active</b><span>Your occupied learner seats are covered.</span></div>:<><p><b>No automatic charge:</b> the trial ends without charging you. Continue only when you choose Paystack checkout.</p><ParentBillingButton/></>}</article>
   <article className="billing-plan-card"><span>IDENTITY PROTECTION</span><h2>Three seats, not three shared passwords.</h2><p>Each seat belongs to one learner profile. A child’s class may change as they progress, but the learning identity and evidence remain continuous.</p><div className="billing-rule-list"><div><b>Separate records</b><span>No mixing of siblings’ scores or mastery.</span></div><div><b>Server-enforced limit</b><span>A fourth learner cannot be attached by changing the browser.</span></div><div><b>Controlled replacement</b><span>Learner seats are not disposable. Genuine family changes go through AVORA Support.</span></div><div><b>One family at a time</b><span>A learner cannot occupy active seats in two different family subscriptions.</span></div></div></article>
  </section>

  <section className="shell parent-panel billing-seat-panel"><header><div><span>LEARNER SEATS</span><h2>{seats.length} of {FAMILY_MAX_STUDENTS} seats in use</h2></div><small>Different classes are fully supported</small></header><div className="billing-seat-grid">{Array.from({length:FAMILY_MAX_STUDENTS},(_,i)=>{const x:any=seats[i];return <div className={`billing-seat ${x?'filled':'empty'}`} key={i}><div className="billing-seat-number">{i+1}</div>{x?<><strong>{x.full_name}</strong><span>{x.class_level||'Learner'} · Separate learning profile</span><small>Identity-bound family seat</small></>:<><strong>Available learner seat</strong><span>Link another child when your family needs it.</span><small>Seat {i+1} of {FAMILY_MAX_STUDENTS}</small></>}</div>})}</div>{links.length>seats.length&&<p className="billing-warning">Some linked learner profiles are not currently occupying a family seat. AVORA Support can help resolve the family setup safely.</p>}</section>

  <section className="shell billing-explainer"><div><span className="section-kicker">HOW ACCESS WORKS</span><h2>Parent owns billing. Children own their learning identities.</h2></div><div className="billing-flow"><div><b>1</b><span>Parent subscribes once</span></div><i>→</i><div><b>2</b><span>Up to 3 learner seats</span></div><i>→</i><div><b>3</b><span>Each child learns in their own class</span></div><i>→</i><div><b>4</b><span>Parent sees separate evidence</span></div></div><p>Changing from JSS1 to JSS2 does not use a new seat. It is the same child progressing academically. If a genuine family situation requires replacing a learner, contact <Link href="/support">AVORA Support</Link> so the change is recorded rather than silently wiping identity history.</p></section>
 </main>
}
