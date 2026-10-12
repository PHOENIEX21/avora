'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,RotateCcw} from 'lucide-react';
import styles from './WeeklyDashboard.module.css';
type Row={id:string;subject_name:string;topic_title:string;prompt:string;answer:string;correct_answer:string;explanation:string;confidence:string|null;confirm_due_on:string|null};
type Notebook={rows:Row[];toFix:number;fixed:number};
export default function WeeklyMistakes(){
 const [tab,setTab]=useState<'TO_FIX'|'FIXED'>('TO_FIX'),[offset,setOffset]=useState(0),[data,setData]=useState<Notebook|null>(null),[error,setError]=useState(''),[retry,setRetry]=useState(0);
 useEffect(()=>{let active=true;setData(null);setError('');
  fetch('/api/weekly/mistakes?tab='+tab+'&offset='+offset).then(async response=>{const result=await response.json();if(!response.ok)throw new Error(result.error||'Notebook unavailable.');if(active)setData(result)}).catch(e=>{if(active)setError(e.message)});
  return()=>{active=false};
 },[tab,offset,retry]);
 const total=data?(tab==='TO_FIX'?data.toFix:data.fixed):0;
 return <main className={styles.workspace}><Link className={styles.back} href="/weekly"><ArrowLeft size={18}/> This week</Link>
  <header className={styles.header}><p>MY LEARNING</p><h1>Mistakes notebook</h1></header>
  <div className={styles.confidence} role="tablist" aria-label="Mistake status">{(['TO_FIX','FIXED'] as const).map(value=><button key={value} role="tab" aria-selected={tab===value} onClick={()=>{setTab(value);setOffset(0)}}>{value==='TO_FIX'?'To fix':'Fixed'}{data?' ('+(value==='TO_FIX'?data.toFix:data.fixed)+')':''}</button>)}</div>
  {error?<><p className={styles.error} role="alert">{error}</p><button onClick={()=>setRetry(value=>value+1)}>Retry</button></>:!data?<p role="status">Loading notebook...</p>:<>
   {!data.rows.length&&<section className={styles.empty}><h2>{tab==='TO_FIX'?'No mistakes to fix':'No spaced fixes yet'}</h2><Link href="/weekly/revisit">Go to Revisit</Link></section>}
   {data.rows.map(row=><article className={styles.objective} key={row.id}><p>{row.subject_name} · {row.topic_title}</p><h2>{row.prompt}</h2>
    <p>Your answer: <del>{row.answer}</del>{row.confidence==='SURE'?' · Sure':''}</p><p>Correct answer: <strong>{row.correct_answer}</strong></p><p>{row.explanation}</p>
    {tab==='TO_FIX'&&<div className={styles.actions}><Link href={'/weekly/fix?mistakeId='+row.id}><RotateCcw size={18}/> Try a similar question</Link></div>}
   </article>)}
   {total>50&&<div className={styles.actions}><button disabled={!offset} onClick={()=>setOffset(value=>Math.max(0,value-50))}><ArrowLeft size={18}/> Previous</button><span>{offset+1}–{Math.min(offset+50,total)} of {total}</span><button disabled={offset+50>=total} onClick={()=>setOffset(value=>value+50)}>Next <ArrowRight size={18}/></button></div>}
  </>}
 </main>;
}
