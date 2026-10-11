import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {getDawnGate} from '@/lib/dawnAccess';
import styles from './page.module.css';

export const dynamic='force-dynamic';

/** Feature-flagged Dawn shell: existing accounts and learning history are untouched. */
export default async function DawnToday(){
 const session=await getSession();
 if(!session)redirect('/login');
 if(session.role!=='STUDENT')redirect('/');
 const gate=await getDawnGate(session.userId);
 if(gate.status==='legacy')redirect('/home');
 const classLevel=gate.classLevel;
 const state={term:gate.term,current_week:gate.week};
 const onboardingRequired=gate.status==='onboarding_required';
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
