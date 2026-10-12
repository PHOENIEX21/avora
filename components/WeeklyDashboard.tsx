'use client';
import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {ArrowLeft,BookOpen,Check,ChevronRight,RotateCcw,Settings,Star} from 'lucide-react';
import styles from './WeeklyDashboard.module.css';

export type WeeklyObjectiveView={id:string;subject:string;topic:string;text:string;source:string;lessonHref:string|null;
 studied:boolean;studySource:'TEXTBOOK'|'LESSON'|null;progress:{status:string;evidence:number;accuracy:number|null}};
export type WeeklyDashboardProps={classLevel:string;term:number;week:number;currentTerm:number;currentWeek:number;
 weeks:Array<{term:number;week:number}>;objectives:WeeklyObjectiveView[];retention?:{questions:number;correct:number;retained:number}};
export default function WeeklyDashboard(props:WeeklyDashboardProps){
 const router=useRouter(),[subject,setSubject]=useState<string|null>(null),[busy,setBusy]=useState<string|null>(null),[error,setError]=useState('');
 const [studySources,setStudySources]=useState<Record<string,'TEXTBOOK'|'LESSON'>>({});
 const subjects=[...new Set(props.objectives.map(x=>x.subject))];
 const current=props.term===props.currentTerm&&props.week===props.currentWeek;
 const mastered=props.objectives.filter(x=>x.progress.status==='MASTERED').length;
 async function study(objective:WeeklyObjectiveView,action:'START'|'COMPLETE',source:'TEXTBOOK'|'LESSON'){
  setBusy(objective.id);setError('');
  try{
   const r=await fetch('/api/weekly/study',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({objectiveId:objective.id,source,action})});
   const data=await r.json();if(!r.ok)throw new Error(data.error||'Could not save study progress.');
   setStudySources(values=>({...values,[objective.id]:source}));
   if(source==='LESSON'&&action==='START'&&objective.lessonHref)router.push(objective.lessonHref);else router.refresh();
  }catch(e){setError(e instanceof Error?e.message:'Could not save study progress.')}finally{setBusy(null)}
 }
 const cards=subjects.map(name=>{
  const objectives=props.objectives.filter(x=>x.subject===name);
  return <button key={name} className={styles.subject} onClick={()=>setSubject(name)}>
   <span className={styles.edge} style={{background:name==='Mathematics'?'#E8590C':name.includes('English')?'#3B82F6':'#12A594'}}/>
   <span className={styles.subjectCopy}><span className={styles.subjectHeading}><strong>{name}</strong><small>{objectives.filter(x=>x.progress.status==='MASTERED').length}/{objectives.length} stars</small></span>
    <span>{[...new Set(objectives.map(x=>x.topic))].join(' · ')}</span>
    <span className={styles.stars}>{objectives.map(x=><Star key={x.id} size={16} aria-label={x.progress.status.replaceAll('_',' ')} fill={x.progress.status==='MASTERED'?'#FFC857':'none'}/>)}</span>
   </span><ChevronRight size={20}/>
  </button>;
 });
 return <main className={styles.workspace}>
  <header className={styles.header}><Link href="/home" className={styles.back}><ArrowLeft size={18}/> Today</Link>
   <p>{props.classLevel} · TERM {props.term}</p><h1>{subject||'Week '+props.week}</h1>
   <div className={styles.weekRow}><span>{subjects.length} subjects · {mastered} stars lit</span>
    <label>Week<select aria-label="Choose released week" value={props.term+':'+props.week} onChange={e=>{const [term,week]=e.target.value.split(':');setSubject(null);router.push('/weekly?term='+term+'&week='+week)}}>
     {props.weeks.map(x=><option key={x.term+':'+x.week} value={x.term+':'+x.week}>Term {x.term} · Week {x.week}</option>)}
    </select></label></div>
  </header>
  {!current&&<p className={styles.history}>Previous week · study record is read-only</p>}
  {error&&<p role="alert" className={styles.error}>{error}</p>}
  {!props.objectives.length?<section className={styles.empty}><h2>Your weekly plan is being prepared</h2><Link href="/learn"><BookOpen size={18}/> Continue lessons</Link></section>
   :subject?<section aria-label="Topic objectives"><button className={styles.back} onClick={()=>setSubject(null)}><ArrowLeft size={18}/> All subjects</button>
    {props.objectives.filter(x=>x.subject===subject).map((objective,i)=><article key={objective.id} className={styles.objective}>
     <div className={styles.objectiveHeading}><Star size={22} fill={objective.progress.status==='MASTERED'?'#FFC857':'none'}/><span>Objective {i+1}</span><small>{objective.progress.status.replaceAll('_',' ')}</small></div>
     <h2>{objective.topic}</h2><p>{objective.text}</p>
     <fieldset disabled={busy===objective.id||!current}><legend>Study source</legend><div className={styles.sourceChoices}>
      <button aria-pressed={(studySources[objective.id]||objective.studySource)==='TEXTBOOK'} onClick={()=>study(objective,'START','TEXTBOOK')}><BookOpen size={18}/> My textbook</button>
      {objective.lessonHref?<button aria-pressed={(studySources[objective.id]||objective.studySource)==='LESSON'} onClick={()=>study(objective,'START','LESSON')}><BookOpen size={18}/> In-app lesson</button>:<span>Lesson not available</span>}
     </div></fieldset>
     <div className={styles.actions}>{current&&<button disabled={busy===objective.id||objective.studied} onClick={()=>study(objective,'COMPLETE',studySources[objective.id]||objective.studySource||'TEXTBOOK')}><Check size={18}/>{objective.studied?'Studied':'Mark studied'}</button>}
      {!current&&objective.lessonHref&&<Link href={objective.lessonHref}><BookOpen size={18}/> Review lesson</Link>}
      <Link className={styles.primary} href={'/weekly/practice?objectiveId='+objective.id}>Practise <ChevronRight size={18}/></Link></div>
     <div className={styles.evidence}>{objective.progress.accuracy===null?'No practice evidence yet':objective.progress.accuracy+'% · '+objective.progress.evidence+' distinct questions'}</div>
     <small className={styles.source}>Source: {objective.source}</small>
    </article>)}
   </section>:<section aria-label="Weekly subjects" className={styles.subjectList}>{cards.slice(0,4)}{cards.length>4&&<details><summary>{cards.length-4} more subjects</summary><div className={styles.subjectList}>{cards.slice(4)}</div></details>}</section>}
  {props.retention&&props.retention.questions>0&&<p className={styles.evidence}>21-day retention: {props.retention.retained} of {props.retention.questions} correct without guessing</p>}
  <footer className={styles.footer}><Link href="/weekly/revisit"><RotateCcw size={18}/> Today's revisit</Link><Link href="/weekly/mistakes">Mistakes</Link><Link href="/weekly/catch-up">Catch up</Link><Link href="/weekly/baseline">Starting check</Link><Link href="/learn">Lessons</Link><Link href="/weekly-exam">Weekly exams</Link><Link href="/progress">Learning history</Link><Link href="/weekly/settings"><Settings size={18}/> Study time</Link></footer>
 </main>;
}
