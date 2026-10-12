'use client';
import {useEffect,useState,type FormEvent} from 'react';
import Link from 'next/link';
import {ArrowLeft,Check,RefreshCw} from 'lucide-react';
import styles from './WeeklyDashboard.module.css';

const periods=[['AFTER_SCHOOL','After school'],['EVENING','Evening'],['AFTER_DINNER','After dinner']] as const;
export default function WeeklyStudySettings(){
 const [period,setPeriod]=useState('EVENING'),[time,setTime]=useState('18:00'),[loaded,setLoaded]=useState(false),
  [busy,setBusy]=useState(false),[error,setError]=useState(''),[saved,setSaved]=useState(false),[retry,setRetry]=useState(0);
 useEffect(()=>{
  let active=true;
  async function load(){
   try{
    const response=await fetch('/api/weekly/study-settings',{cache:'no-store'}),data=await response.json();
    if(!response.ok)throw new Error(data.error||'Study settings unavailable.');
    if(active){if(data.settings?.study_period)setPeriod(data.settings.study_period);
     if(data.settings?.study_time)setTime(data.settings.study_time);setLoaded(true);setError('')}
   }catch(e){if(active)setError(e instanceof Error?e.message:'Study settings unavailable.')}
  }
  load();return ()=>{active=false};
 },[retry]);
 async function save(event:FormEvent){
  event.preventDefault();if(!loaded||busy)return;setBusy(true);setError('');setSaved(false);
  try{
   const response=await fetch('/api/weekly/study-settings',{method:'PUT',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({studyPeriod:period,studyTime:time})}),data=await response.json();
   if(!response.ok)throw new Error(data.error||'Could not save study time.');setSaved(true);
  }catch(e){setError(e instanceof Error?e.message:'Could not save study time.')}finally{setBusy(false)}
 }
 return <main className={styles.workspace}>
  <Link className={styles.back} href="/weekly"><ArrowLeft size={18}/> This week</Link>
  <header className={styles.header}><h1>Study time</h1><p>West Africa Time · Africa/Lagos</p></header>
  {error&&<p className={styles.error} role="alert">{error}</p>}
  {!loaded&&!error&&<p role="status">Loading settings...</p>}
  {!loaded&&error&&<button className={styles.back} onClick={()=>{setError('');setRetry(value=>value+1)}}><RefreshCw size={18}/> Retry</button>}
  <form onSubmit={save} className={styles.studySettings}>
   <fieldset disabled={!loaded||busy}><legend>Usual study period</legend>
    <div className={styles.studyPeriods}>{periods.map(([value,label])=><label key={value}>
     <input type="radio" name="study-period" value={value} checked={period===value} onChange={()=>{setPeriod(value);setSaved(false)}}/>{label}
    </label>)}</div>
    <label className={styles.studyTime} htmlFor="study-time">Time<input id="study-time" type="time" required value={time} onChange={event=>{setTime(event.target.value);setSaved(false)}}/></label>
   </fieldset>
   <div className={styles.actions}><button type="submit" disabled={!loaded||busy||!time}><Check size={18}/>{busy?'Saving...':'Save study time'}</button></div>
   {saved&&<p role="status">Study time saved.</p>}
  </form>
 </main>;
}
