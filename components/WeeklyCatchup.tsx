import Link from 'next/link';
import {ArrowLeft,ArrowRight} from 'lucide-react';
import styles from './WeeklyDashboard.module.css';
type Objective={id:string;subject:string;topic:string;text:string;term:number;week:number;reason:string};
export default function WeeklyCatchup({objectives}:{objectives:Objective[]}){
 return <main className={styles.workspace}><Link href="/weekly" className={styles.back}><ArrowLeft size={18}/> This week</Link>
  <header className={styles.header}><h1>Catch up</h1></header>
  {!objectives.length&&<p>No objectives are waiting for follow-up.</p>}
  <div className={styles.actions}><Link href="/weekly/revisit">Today's revisit <ArrowRight size={18}/></Link></div>
  {objectives.map(objective=><article key={objective.id} className={styles.objective}><small>{objective.subject} · Term {objective.term} · Week {objective.week}</small>
   <h2>{objective.topic}</h2><p>{objective.text}</p><p>{objective.reason==='NOT_STUDIED'?'Not yet studied':'A little more practice'}</p>
   <div className={styles.actions}><Link href={'/weekly?term='+objective.term+'&week='+objective.week}>Review objectives</Link>
    <Link href={'/weekly/practice?objectiveId='+objective.id}>Practise <ArrowRight size={18}/></Link></div>
  </article>)}
 </main>;
}
