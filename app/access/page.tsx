import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {getStudentEntitlement,TRIAL_DAYS} from '@/lib/billing';

export const dynamic='force-dynamic';
export default async function AccessPage(){
 const s=await getSession();if(!s)redirect('/login');
 if(s.role==='PARENT')redirect('/parent/billing');if(s.role==='ADMIN')redirect('/admin');
 const access=await getStudentEntitlement(s.userId);if(access.allowed)redirect('/home');
 return <main className="access-page shell">
  <section className="access-expired-card">
   <div className="access-orb">A</div>
   <span className="section-kicker">YOUR {TRIAL_DAYS}-DAY PREMIUM TRIAL IS COMPLETE</span>
   <h1>Keep your learning history. Continue with your family.</h1>
   <p>Your lessons, mastery evidence, assessments and progress are still safe. Ask a parent or guardian to link your learner profile to an AVORA Family subscription.</p>
   <div className="access-actions"><Link className="premium-primary" href="/parent-connect">Connect a parent</Link><Link className="premium-secondary" href="/support">Talk to AVORA support</Link></div>
   <div className="access-family-note"><strong>AVORA Family</strong><span>One parent subscription can cover up to three identified learners, even when they are in different classes.</span></div>
  </section>
 </main>
}
