import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import ParentLinkChild from '@/components/ParentLinkChild';
import ParentCreateChild from '@/components/ParentCreateChild';

export const dynamic='force-dynamic';

export default async function ParentFamily(){
 const s=await getSession();if(!s)redirect('/login');if(s.role!=='PARENT')redirect('/home');
 const links=await withDbRetry(()=>sql`SELECT psl.student_id,u.full_name,u.email,sp.class_level FROM parent_student_links psl JOIN users u ON u.id=psl.student_id LEFT JOIN student_profiles sp ON sp.user_id=u.id WHERE psl.parent_id=${s.userId} AND psl.status='ACTIVE' ORDER BY psl.linked_at`);
 const seats=links.length;const remaining=Math.max(0,3-seats);
 return <main className="shell family-setup-page">
  <header className="family-setup-head"><div><span className="section-kicker">FAMILY SETUP</span><h1>Add your child in the way that matches your family.</h1><p>Choose one of the two options below. If your child already has AVORA, connect that same learner account. If your child is new, create their learner account here. Each child keeps a separate login, class, progress and assessment evidence.</p></div><div className="family-seat-count"><b>{seats} / 3</b><span>{remaining} {remaining===1?'learner seat':'learner seats'} remaining</span></div></header>
  <section className="family-flow-map"><article><b>1</b><span>You are the parent</span><small>This Parent account manages the family and subscription.</small></article><i>→</i><article><b>2</b><span>Choose how to add your child</span><small>Connect an existing learner with their secure code, or create a brand-new learner account below.</small></article><i>→</i><article><b>3</b><span>Your child learns on their own login</span><small>You see evidence in Parent; your child uses the learner account for Tutor, Practice and Exams.</small></article></section>
  {seats<3?<section className="family-setup-grid">
   <div className="family-setup-card family-choice-primary"><span>MY CHILD ALREADY HAS AVORA</span><h2>Connect the existing learner</h2><p>Do not create another account. Ask your child to open <b>Parent connection</b> and give you the secure code, then enter it here.</p><ParentLinkChild inline/></div>
   <ParentCreateChild/>
  </section>:<section className="family-cap-state"><h2>Your family already has 3 learner profiles.</h2><p>The Family plan allows a maximum of three active learner identities. A fourth learner cannot be added.</p></section>}
  <section className="family-rules"><h2>How the 3 learner seats work</h2><div><p><b>A child who registered first still counts.</b> When that learner is linked to this family, they occupy one of the three learner seats and only two more children can be added.</p><p><b>The parent account is not a learner seat.</b> The limit is three separate child/learner identities.</p></div><h2>How duplicates are prevented</h2><div><p><b>One email = one AVORA identity.</b> Existing emails cannot be registered again.</p><p><b>One learner = one active family seat.</b> The same learner cannot be attached to two active family subscriptions.</p><p><b>One parent-child pair = one link.</b> Re-entering a code for an already linked learner is rejected instead of silently creating another record.</p><p><b>Maximum 3 learners.</b> The fourth active learner is blocked server-side, not just hidden in the interface.</p></div></section>
  <footer className="family-setup-foot"><Link href="/parent">← Back to parent dashboard</Link><Link href="/parent/billing">Family subscription →</Link></footer>
 </main>
}
