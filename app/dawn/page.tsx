import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {isWeeklyLearningEnabled} from '@/lib/weeklyLearning';
import styles from './page.module.css';

export const dynamic='force-dynamic';

/** Feature-flagged Dawn shell: existing accounts and learning history are untouched. */
export default async function DawnToday(){
 const session=await getSession();
 if(!session)redirect('/login');
 if(session.role!=='STUDENT')redirect('/');
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${session.userId} LIMIT 1`);
 const classLevel=String(profile?.class_level??'').toUpperCase();
 if(!['JSS1','JSS2','JSS3'].includes(classLevel))redirect('/home');
 if(!(await isWeeklyLearningEnabled(classLevel)))redirect('/home');
 const [state]=await withDbRetry(()=>sql`SELECT term,current_week FROM weekly_class_week_state WHERE class_level=${classLevel} LIMIT 1`);
 if(!state)redirect('/home');
 const [consent]=await withDbRetry(()=>sql`SELECT consent_data,consent_at,consent_version,parent_contact_verified_at FROM weekly_parent_consents WHERE student_id=${session.userId} LIMIT 1`);
 const [parentPin]=await withDbRetry(()=>sql`SELECT student_id FROM weekly_parent_pins WHERE student_id=${session.userId} LIMIT 1`);
 const [studentPin]=await withDbRetry(()=>sql`SELECT student_id FROM weekly_student_pins WHERE student_id=${session.userId} LIMIT 1`);
 const onboardingRequired=consent?.consent_data!==true||!consent.consent_at||!consent.consent_version||!consent.parent_contact_verified_at||!parentPin||!studentPin;
 return <main className={styles.screen}>
  <div className={styles.phone}>
   <header className={styles.header}>
    <div className={styles.topline}><span className={styles.brand}>AVORA<span className={styles.brandDot}>✦</span></span><span className={styles.classTag}>{classLevel}</span></div>
    <p className={styles.eyebrow}>YOUR LEARNING JOURNEY</p>
    <h1>Every day, a little brighter<span className={styles.spark}> ✦</span></h1>
    <p className={styles.intro}>Your learning space, one clear step at a time.</p>
    <div className={styles.stars} aria-hidden="true">✧ <span>✦</span> · ✧ · <span>✦</span></div>
   </header>
   <section className={styles.content}>
    <div className={styles.weekRow}><div><p className={styles.sectionLabel}>THIS WEEK</p><h2>Term {Number(state.term)} · Week {Number(state.current_week)}</h2></div><span className={styles.weekIcon}>✷</span></div>
    {onboardingRequired?
     <article className={styles.onboarding}><div className={styles.onboardingIcon}>♡</div><h3>Let’s get your learning space ready</h3><p>A parent or guardian needs to complete the secure setup before the new learning experience opens. Your existing lessons and results are safe.</p><Link href="/dawn/guardian-setup" className={styles.secondary}>View guardian setup →</Link><Link href="/home" className={styles.secondary}>Continue existing lessons →</Link></article>
     :<article className={styles.onboarding}><div className={styles.onboardingIcon}>✦</div><h3>Your new learning journey is almost ready</h3><p>We’re finishing the verified guardian access and weekly assessments. Continue your existing lessons while we prepare.</p><Link href="/home" className={styles.secondary}>Continue existing lessons →</Link></article>}
    <h2 className={styles.nextTitle}>Your learning, your pace</h2>
    <div className={styles.tiles}>
     <div className={styles.tile}><span>◉</span><b>Today</b><small>Daily activities preparing</small></div>
     <Link href="/dawn/this-week" className={styles.tile}><span>✧</span><b>This Week</b><small>Weekly learning goals</small></Link>
     <div className={styles.tile}><span>✦</span><b>My Stars</b><small>Mastery view preparing</small></div>
     <div className={styles.tile}><span>♡</span><b>Parent Area</b><small>Secure setup pending</small></div>
    </div>
   </section>
   <nav className={styles.nav} aria-label="Learning navigation"><span className={styles.navActive}>⌂ <small>Today</small></span><Link href="/dawn/this-week">◫ <small>This week</small></Link><Link href="/learn">▤ <small>Lessons</small></Link><Link href="/profile">◯ <small>Profile</small></Link></nav>
  </div>
 </main>;
}
