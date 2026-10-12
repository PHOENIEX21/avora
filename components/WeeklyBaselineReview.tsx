'use client';
import {useEffect,useState} from 'react';
import {Check,RefreshCw} from 'lucide-react';
import Link from 'next/link';
import styles from './WeeklyDashboard.module.css';
type Item={id:string;subject:string;week:number;objectiveText:string;prompt:string;answer:string;explanation:string};
export default function WeeklyBaselineReview(){
 const [classLevel,setClassLevel]=useState('JSS1'),[term,setTerm]=useState('1'),[items,setItems]=useState<Item[]>([]),
  [selected,setSelected]=useState<string[]>([]),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState(''),[saved,setSaved]=useState(false),[retry,setRetry]=useState(0),[filter,setFilter]=useState('');
 useEffect(()=>{
  let active=true;setLoading(true);setError('');setSaved(false);
  fetch('/api/admin/weekly/baseline?classLevel='+classLevel+'&term='+term,{cache:'no-store'}).then(async response=>{
   const data=await response.json();if(!response.ok)throw new Error(data.error||'Review unavailable.');
   if(active){setItems(data.items);setSelected(data.selectedIds)}
  }).catch(e=>{if(active)setError(e.message)}).finally(()=>{if(active)setLoading(false)});
  return ()=>{active=false};
 },[classLevel,term,retry]);
 async function save(){setBusy(true);setError('');setSaved(false);
  try{const response=await fetch('/api/admin/weekly/baseline',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({classLevel,term:Number(term),questionIds:selected})});
   const data=await response.json();if(!response.ok)throw new Error(data.error||'Could not save review.');setSaved(true)}
  catch(e){setError(e instanceof Error?e.message:'Could not save review.')}finally{setBusy(false)}
 }
 return <main className={styles.workspace}><header className={styles.header}><h1>Starting-check review</h1><Link href="/admin/weekly/baseline/results">Baseline comparison</Link></header>
  <div className={styles.sourceChoices}><label>Class <select value={classLevel} disabled={busy} onChange={event=>{setClassLevel(event.target.value);setSelected([]);setItems([])}}>{['JSS1','JSS2','JSS3'].map(value=><option key={value}>{value}</option>)}</select></label>
   <label>Term <select value={term} disabled={busy} onChange={event=>{setTerm(event.target.value);setSelected([]);setItems([])}}>{[1,2,3].map(value=><option key={value}>{value}</option>)}</select></label></div>
  <p>{selected.length} of 20 selected</p>{loading&&<p role="status">Loading reviewed questions...</p>}
  {error&&<p role="alert" className={styles.error}>{error}</p>}{saved&&<p role="status">Starting check reviewed and saved.</p>}
  <div className={styles.actions}><button disabled={loading||busy||selected.length!==20} onClick={save}><Check size={18}/> Save reviewed paper</button><button disabled={loading||busy} onClick={()=>setRetry(value=>value+1)}><RefreshCw size={18}/> Reload</button></div>
  <label className={styles.studyTime}>Subject<select aria-label="Subject" value={filter} onChange={event=>setFilter(event.target.value)}><option value="">All subjects</option>{[...new Set(items.map(item=>item.subject))].map(subject=><option key={subject}>{subject}</option>)}</select></label>
  {!loading&&!items.length&&!error&&<p>No published reviewed questions are available.</p>}
  <section aria-label="Reviewed starting-check questions">{items.filter(item=>!filter||item.subject===filter).map(item=><article key={item.id} className={styles.objective}>
   <label><input type="checkbox" checked={selected.includes(item.id)} disabled={loading||busy||(!selected.includes(item.id)&&selected.length>=20)} onChange={event=>{setSaved(false);setSelected(values=>event.target.checked?[...values,item.id]:values.filter(id=>id!==item.id))}}/> {item.subject} · Week {item.week}</label>
   <h2>{item.prompt}</h2><p>{item.objectiveText}</p><details><summary>Answer review</summary><p>{item.answer}</p><p>{item.explanation}</p></details>
  </article>)}</section>
 </main>;
}
