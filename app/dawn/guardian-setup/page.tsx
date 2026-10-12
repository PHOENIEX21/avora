import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {getDawnGate} from '@/lib/dawnAccess';
import styles from '../page.module.css';

export const dynamic='force-dynamic';

/** Read-only Dawn onboarding explanation. Never collects unverified consent or PINs. */
export default async function DawnGuardianSetup(){
 const session=await getSession();
 if(!session)redirect('/login');
 if(session.role!=='STUDENT')redirect('/');
 const gate=await getDawnGate(session.userId);
 if(gate.status==='legacy')redirect('/home');
 if(gate.status==='ready')redirect('/weekly');
 const classLevel=gate.classLevel;
 const checks=[
  {name:'Guardian consent',ready:gate.status==='verification_pending'||gate.guardianConsent},
  {name:'Verified guardian contact',ready:gate.status==='verification_pending'||gate.verifiedContact},
  {name:'Parent Area PIN',ready:gate.status==='verification_pending'||gate.parentPin},
  {name:'Student PIN',ready:gate.status==='verification_pending'||gate.studentPin}
 ];
 return <main className={styles.screen}><div className={styles.phone}>
  <header className={styles.header}><div className={styles.topline}><span className={styles.brand}>AVORA<span className={styles.brandDot}>✦</span></span><span className={styles.classTag}>{classLevel}</span></div><p className={styles.eyebrow}>A SAFE START</p><h1>Made for you. Protected by family.<span className={styles.spark}> ✦</span></h1><p className={styles.intro}>Your existing AVORA account and progress will stay with you.</p></header>
  <section className={styles.content}><div className={styles.weekRow}><div><p className={styles.sectionLabel}>GUARDIAN SETUP</p><h2>Before your Dawn begins</h2></div><span className={styles.weekIcon}>♡</span></div>
  <article className={styles.onboarding}><div className={styles.onboardingIcon}>♡</div><h3>Four steps to a safer learning space</h3><p>These protections will be completed with a verified parent or guardian. No new account is needed.</p>
  <ol className={styles.checklist}>{checks.map((step,i)=><li key={step.name}><span className={styles.checkIndex}>{i+1}</span><span>{step.name}</span><strong>{step.ready?'Recorded':'Pending'}</strong></li>)}</ol>
  <p className={styles.pending}>Setup submission is not yet available. We will not collect a PIN or treat old consent as verified.</p>
  <Link className={styles.secondary} href="/home">Continue existing learning →</Link></article>
  </section><nav className={styles.nav} aria-label="Learning navigation"><Link href="/dawn">⌂ <small>Today</small></Link><Link href="/dawn/this-week">◫ <small>This week</small></Link><Link href="/learn">▤ <small>Lessons</small></Link><Link href="/home">◯ <small>Old home</small></Link></nav>
 </div></main>;
}
