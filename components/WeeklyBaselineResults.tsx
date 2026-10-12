'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowLeft,RefreshCw} from 'lucide-react';
import styles from './WeeklyDashboard.module.css';
type Row={attempt_id:string;student_id:string;full_name:string;subject:string;objective_text:string;baseline_correct:number;baseline_total:number;practice_correct:number;practice_total:number};
export default function WeeklyBaselineResults(){
 const [classLevel,setClassLevel]=useState('JSS1'),[rows,setRows]=useState<Row[]>([]),[busy,setBusy]=useState(true),[error,setError]=useState(''),[retry,setRetry]=useState(0);
 useEffect(()=>{
  let active=true;setBusy(true);setError('');
  fetch('/api/admin/weekly/baseline/results?classLevel='+classLevel,{cache:'no-store'}).then(async response=>{
   const data=await response.json();if(!response.ok)throw new Error(data.error||'Results unavailable.');if(active)setRows(data.rows);
  }).catch(e=>{if(active)setError(e.message)}).finally(()=>{if(active)setBusy(false)});
  return ()=>{active=false};
 },[classLevel,retry]);
 return <main className={styles.workspace}><Link href="/admin/weekly/baseline" className={styles.back}><ArrowLeft size={18}/> Starting-check review</Link>
  <header className={styles.header}><h1>Baseline comparison</h1></header>
  <label>Class <select value={classLevel} onChange={event=>{setClassLevel(event.target.value);setRows([])}}>{['JSS1','JSS2','JSS3'].map(value=><option key={value}>{value}</option>)}</select></label>
  {error&&<p className={styles.error} role="alert">{error}</p>}{busy&&<p role="status">Loading results...</p>}
  <button className={styles.back} disabled={busy} onClick={()=>setRetry(value=>value+1)}><RefreshCw size={18}/> Reload</button>
  {!busy&&!error&&!rows.length&&<p>No completed starting checks are recorded.</p>}
  {rows.map((row,i)=><article className={styles.objective} key={row.attempt_id+':'+i}><h2>{row.full_name} · {row.subject}</h2><p>{row.objective_text}</p>
   <dl><dt>Starting check</dt><dd>{row.baseline_correct} of {row.baseline_total} correct</dd><dt>Later distinct practice questions</dt>
    <dd>{row.practice_total?row.practice_correct+' of '+row.practice_total+' correct':'No later evidence'}</dd></dl>
  </article>)}
 </main>;
}
