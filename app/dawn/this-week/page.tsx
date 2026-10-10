import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {isWeeklyLearningEnabled} from '@/lib/weeklyLearning';
import styles from '../page.module.css';

export const dynamic='force-dynamic';

export default async function DawnThisWeek(){
 const session=await getSession();
 if(!session)redirect('/login');
 if(session.role!=='STUDENT')redirect('/');
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${session.userId} LIMIT 1`);
 const classLevel=String(profile?.class_level??'').toUpperCase();
 if(!['JSS1','JSS2','JSS3'].includes(classLevel)||!(await isWeeklyLearningEnabled(classLevel)))redirect('/home');
 const [state]=await withDbRetry(()=>sql`SELECT term,current_week FROM weekly_class_week_state WHERE class_level=${classLevel} LIMIT 1`);
 if(!state)redirect('/home');
 const [consent]=await withDbRetry(()=>sql`SELECT consent_data,consent_version,consent_at,parent_contact_verified_at FROM weekly_parent_consents WHERE student_id=${session.userId} LIMIT 1`);
 const [pin]=await withDbRetry(()=>sql`SELECT student_id FROM weekly_parent_pins WHERE student_id=${session.userId} LIMIT 1`);
 const [studentPin]=await withDbRetry(()=>sql`SELECT student_id FROM weekly_student_pins WHERE student_id=${session.userId} LIMIT 1`);
 const eligible=consent?.consent_data===true&&Boolean(consent.consent_version)&&Boolean(consent.consent_at)&&Boolean(consent.parent_contact_verified_at)&&Boolean(pin)&&Boolean(studentPin);
 const rows=eligible?await withDbRetry(()=>sql`
  SELECT subject_name,topic_title,objective_text FROM weekly_curriculum_objectives
  WHERE class_level=${classLevel} AND term=${Number(state.term)}
  AND week_number=${Number(state.current_week)}
  AND approval_status='PUBLISHED' AND published_at IS NOT NULL
  ORDER BY subject_name,topic_title,day_index,objective_text
 `):[];
 const subjects=new Map<string,Map<string,string[]>>();
 for(const row of rows){
  const subject=String(row.subject_name),topic=String(row.topic_title);
  if(!subjects.has(subject))subjects.set(subject,new Map());
  const topics=subjects.get(subject)!;
  if(!topics.has(topic))topics.set(topic,[]);
  topics.get(topic)!.push(String(row.objective_text));
 }
 return <main className={styles.screen}><div className={styles.phone}>
  <header className={styles.header}>
   <div className={styles.topline}><span className={styles.brand}>AVORA<span className={styles.brandDot}>✦</span></span><span className={styles.classTag}>{classLevel}</span></div>
   <p className={styles.eyebrow}>YOUR WEEKLY JOURNEY</p>
   <h1>This week, we grow<span className={styles.spark}> ✦</span></h1>
   <p className={styles.intro}>Term {Number(state.term)} · Week {Number(state.current_week)}</p>
  </header>
  <section className={styles.content}>
   <div className={styles.weekRow}><div><p className={styles.sectionLabel}>THIS WEEK</p><h2>Learning objectives</h2></div><span className={styles.weekIcon}>✷</span></div>
   {!eligible?<article className={styles.onboarding}><div className={styles.onboardingIcon}>♡</div><h3>Guardian setup required</h3><p>The weekly plan stays private until verified parent consent and secure PIN setup are complete.</p><Link href="/home" className={styles.secondary}>Continue existing lessons →</Link></article>
   :subjects.size===0?<article className={styles.onboarding}><div className={styles.onboardingIcon}>✦</div><h3>Your weekly plan is being prepared</h3><p>There are no published objectives ready to show yet. Your existing lessons remain available.</p><Link href="/home" className={styles.secondary}>Continue existing lessons →</Link></article>
   :Array.from(subjects.entries()).map(([subject,topics])=><section className={styles.onboarding} key={subject}><p className={styles.sectionLabel}>{subject}</p>{Array.from(topics.entries()).map(([topic,objectives])=><div key={topic}><h3>{topic}</h3><ol>{objectives.map((objective,i)=><li key={i}>{objective}</li>)}</ol></div>)}</section>)}
  </section>
  <nav className={styles.nav} aria-label="Learning navigation"><Link href="/dawn">⌂ <small>Today</small></Link><span className={styles.navActive}>◫ <small>This week</small></span><Link href="/learn">▤ <small>Lessons</small></Link><Link href="/home">◯ <small>Old home</small></Link></nav>
 </div></main>;
}
