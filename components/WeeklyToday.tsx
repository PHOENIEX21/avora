import Link from 'next/link';
import {ArrowRight,BookOpen,Check,PenLine,RotateCcw,Star} from 'lucide-react';
import type {WeeklyTodayPlan} from '@/lib/weeklyToday';
import {weeklySubjectColour} from '@/lib/weeklyVisual';
import styles from './WeeklyToday.module.css';
export default function WeeklyToday({plan}:{plan:WeeklyTodayPlan}){
 const finished=plan.total>0&&plan.completed===plan.total,percent=plan.total?Math.round(plan.completed/plan.total*100):0;
 const date=new Intl.DateTimeFormat('en-NG',{weekday:'long',day:'numeric',month:'long',timeZone:'Africa/Lagos'}).format(new Date(plan.date+'T12:00:00Z'));
 return <main className={styles.screen}>
  <header className={styles.header}><p>{plan.classLevel} · Term {plan.term} · Week {plan.week}</p><h1>Today</h1><span>{date}</span></header>
  <section className={styles.summary} aria-label="Today's plan progress">
   <div className={styles.ring} role="progressbar" aria-label="Completed planned activities" aria-valuemin={0} aria-valuemax={plan.total||1} aria-valuenow={plan.completed} aria-valuetext={plan.total?plan.completed+' of '+plan.total+' planned activities complete':'No scheduled activities'}>
    <svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="weekly-today-ring"><stop offset="0" stopColor="var(--dawn-gold)"/><stop offset=".5" stopColor="var(--dawn-rose)"/><stop offset="1" stopColor="var(--dawn-teal)"/></linearGradient></defs><circle className={styles.track} cx="60" cy="60" r="50"/><circle className={styles.fill} stroke="url(#weekly-today-ring)" cx="60" cy="60" r="50" pathLength="100" opacity={percent?1:0} strokeDasharray={percent+' 100'}/></svg>
    <span>{plan.total?plan.completed+'/'+plan.total:'—'}</span>
   </div><div><h2>{finished?"Today's set is complete":plan.total?'Your daily set':'No daily set scheduled'}</h2><p>{finished?'Done for today.':plan.total?plan.total-plan.completed+' activities remaining':'Your released weekly objectives remain available.'}</p></div>
  </section>
  <section className={styles.tasks} aria-label="Today's activities">{plan.tasks.map(task=>{
   const Icon=task.kind==='STUDY'?BookOpen:task.kind==='PRACTICE'?PenLine:RotateCcw;
   return <article key={task.id} className={styles.task} data-complete={task.done}>
    <div className={styles.taskTop}><span className={styles.gem} style={{background:weeklySubjectColour(task.subject)}} aria-hidden="true"/><span>{task.subject}</span><span className={styles.state}>{task.done?<><Check size={16}/> {task.kind==='STUDY'?'Studied':'Complete'}</>:task.kind==='STUDY'?'Study':task.kind==='PRACTICE'?'Practice':'Revisit'}</span></div>
    <h2>{task.text}</h2><p>{task.topic}</p>
    <Link href={task.href}><Icon size={18}/>{task.done?'Open':task.kind==='STUDY'?'Study objective':task.kind==='PRACTICE'?'Practise':'Continue revisit'}<ArrowRight size={18}/></Link>
   </article>;
  })}</section>
  <nav className={styles.links} aria-label="Weekly learning"><Link href="/weekly"><Star size={18}/> This week <ArrowRight size={18}/></Link><Link href="/weekly/revisit"><RotateCcw size={18}/> Revisit</Link><Link href="/weekly-exam">Weekly exams</Link><Link href="/weekly/settings">Study time</Link></nav>
 </main>;
}
