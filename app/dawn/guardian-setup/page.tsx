import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {isWeeklyLearningEnabled} from '@/lib/weeklyLearning';
import styles from '../page.module.css';

export const dynamic='force-dynamic';

/** Read-only Dawn onboarding explanation. Never collects unverified consent or PINs. */
export default async function DawnGuardianSetup(){
 const session=await getSession();
 if(!session)redirect('/login');
 if(session.role!=='STUDENT')redirect('/');
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${session.userId} LIMIT 1`);
 const classLevel=String(profile?.class_level??'').toUpperCase();
 if(!['JSS1','JSS2','JSS3'].includes(classLevel)||!(await isWeeklyLearningEnabled(classLevel)))redirect('/home');
 const [consent]=await withDbRetry(()=>sql`SELECT consent_data,consent_version,consent_at,parent_contact_verified_at FROM weekly_parent_consents WHERE student_id=${session.userId} LIMIT 1`).catch(()=>[]);
 const [parentPin]=await withDbRetry(()=>sql`SELECT student_id FROM weekly_parent_pins WHERE student_id=${session.userId} LIMIT 1`).catch(()=>[]);
 const [studentPin]=await withDbRetry(()=>sql`SELECT student_id FROM weekly_student_pins WHERE student_id=${session.userId} LIMIT 1`).catch(()=>[]);
 const checks=[
  {name:'Guardian consent',ready:consent?.consent_data===true&&Boolean(consent.consent_at)&&Boolean(consent.consent_version)},
  {name:'Verified guardian contact',ready:Boolean(consent?.parent_contact_verified_at)},
  {name:'Parent Area PIN',ready:Boolean(parentPin)},
  {name:'Student PIN',ready:Boolean(studentPin)}
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
