import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {getStudentAccessTier,getStudentEntitlement,TRIAL_DAYS,familyPlanDisplayPrice} from '@/lib/billing';
import {sql,withDbRetry} from '@/lib/db';

export const dynamic='force-dynamic';

function date(value:any){
 return value?new Date(value).toLocaleDateString('en-NG',{dateStyle:'medium'}):'Not available';
}

export default async function PlanPage(){
 const session=await getSession();
 if(!session)redirect('/login');
 if(session.role==='PARENT')redirect('/parent/billing');
 if(session.role==='ADMIN')redirect('/admin');
 const [tier,entitlement]=await Promise.all([getStudentAccessTier(session.userId),getStudentEntitlement(session.userId)]);
 const [trial]=await withDbRetry(()=>sql`SELECT started_at,ends_at FROM learner_access_trials WHERE student_id=${session.userId}`);
 const family=entitlement.parentId?await withDbRetry(()=>sql`SELECT status,trial_started_at,trial_ends_at,current_period_start,current_period_end FROM billing_accounts WHERE owner_user_id=${entitlement.parentId} LIMIT 1`).then(rows=>rows[0]):null;
 const trialStart=family?.trial_started_at||trial?.started_at;
 const trialEnd=family?.trial_ends_at||trial?.ends_at||entitlement.endsAt;
 const remaining=trialEnd?Math.max(0,Math.ceil((new Date(trialEnd).getTime()-Date.now())/86400000)):0;
 const isPremium=tier.tier==='PREMIUM';
 const isTrial=tier.tier==='PREMIUM_TRIAL';
 const parentManaged=Boolean(entitlement.parentId);
 const statusTitle=isPremium?'AVORA Premium':isTrial?'AVORA Premium Trial':'AVORA Free';
 return <main className="shell plan-page">
  <header className="plan-hero"><div><span className="section-kicker">ACCOUNT · TRIAL & PLAN</span><h1>{statusTitle}</h1><p>{isPremium?'Your Premium access is active.':isTrial?`You have temporary Premium access for ${TRIAL_DAYS} days.`:'Your trial has ended. Your learning history remains attached to this account.'}</p></div><div className="plan-status"><strong>{isPremium?'Active':isTrial?`${remaining} days remaining`:'Free access'}</strong><span>{isPremium&&entitlement.endsAt?`Current access ends ${date(entitlement.endsAt)}`:isTrial?`Day ${Math.min(TRIAL_DAYS,Math.max(1,TRIAL_DAYS-remaining+1))} of ${TRIAL_DAYS}`:'Choose a family subscription to restore Premium learning access.'}</span></div></header>
  <div className="plan-actions"><Link className="premium-secondary" href="/home">← Return to learning</Link>{isPremium?null:<Link className="premium-primary" href="/parent-connect">Continue with Premium — connect a parent →</Link>}</div>
  <section className="plan-grid">
   <article className="plan-card"><span className="section-kicker">YOUR REAL STATUS</span><h2>{isTrial?'Premium trial':isPremium?'Premium subscription':'Free access'}</h2>{isTrial&&<dl><div><dt>Trial started</dt><dd>{date(trialStart)}</dd></div><div><dt>Trial ends</dt><dd>{date(trialEnd)}</dd></div><div><dt>Days remaining</dt><dd>{remaining}</dd></div></dl>}{isPremium&&<p>Premium was activated only after the billing account was verified by Paystack. Your learning progress stays with your account.</p>}{!isTrial&&!isPremium&&<p>Your previous lessons, assessment results and progress are not deleted. Learning access is controlled by the current entitlement.</p>}</article>
   <article className="plan-card"><span className="section-kicker">WHAT IS MY TRIAL?</span><h2>Fourteen days to learn with Premium access.</h2><p>During the trial, AVORA can use the Premium learning path available to your account: Tutor lessons, Practice, Exam and progress evidence. The trial itself expires automatically; it does not silently charge you.</p><h3>What happens after day 14?</h3><p>You will not be charged automatically when the trial ends. If there is no verified family subscription, the account moves to Free/limited access while your learning history, assessment results and progress remain stored.</p></article>
  </section>
  <section className="plan-comparison"><header><span className="section-kicker">CLEAR COMPARISON</span><h2>Free and Premium</h2></header><div className="plan-compare-grid"><article><h3>AVORA Free</h3><p>Account access, saved learning history and progress records remain available. Premium-gated learning and family-covered Tutor access require an active entitlement.</p></article><article className="featured"><h3>AVORA Premium</h3><p>Full entitled learning access through the active trial or verified family subscription, including Tutor teaching, Practice, Exam and progress evidence.</p></article></div></section>
  {!isPremium&&<section className="plan-upgrade"><div><span className="section-kicker">CONTINUE WITH PREMIUM</span><h2>Upgrade now through the parent billing page.</h2><p>AVORA uses the configured family plan: <strong>₦{familyPlanDisplayPrice().toLocaleString('en-NG')} / month</strong>, for up to 3 linked learners. This button connects your learner account to the parent flow; the parent then sees the payment button: <strong>Upgrade now to Premium</strong>.</p></div><Link className="premium-primary" href="/parent-connect">Open parent upgrade flow →</Link></section>}
  <section className="plan-help"><h2>Will I be charged automatically?</h2><p>No. You will not be charged automatically when your trial ends. The parent chooses whether to continue with AVORA Premium through the secure Paystack checkout. Cancelling or failing payment does not activate Premium.</p><p>Questions about a family subscription? <Link href="/support">Contact AVORA support.</Link></p></section>
 </main>;
}
