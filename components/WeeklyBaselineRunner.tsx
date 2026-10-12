'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,Check,Clock,RefreshCw} from 'lucide-react';
import styles from './WeeklyDashboard.module.css';

type Attempt={id:string;submitted:boolean;expired:boolean;secondsRemaining:number;questions:Array<{id:string;subject:string;prompt:string;options:string[];savedAnswer:string|null}>;
 summary:Array<{objectiveId:string;subject:string;objectiveText:string;message:string}>};
type Overview={baseline:{status:string;first_offered_at:string|null;postponed_until:string|null};ready:boolean;attempt:Attempt|null};
async function request(body?:Record<string,unknown>){
 const response=await fetch('/api/weekly/baseline',body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{cache:'no-store'});
 const data=await response.json();if(!response.ok)throw new Error(data.error||'Starting check unavailable.');return data;
}
export default function WeeklyBaselineRunner(){
 const [overview,setOverview]=useState<Overview|null>(null),[attempt,setAttempt]=useState<Attempt|null>(null),[index,setIndex]=useState(0),
  [deadline,setDeadline]=useState(0),[remaining,setRemaining]=useState(0),[busy,setBusy]=useState(false),[error,setError]=useState(''),[draft,setDraft]=useState<string|null>(null);
 const autoFinished=useRef<string|null>(null);
 const receive=useCallback((value:Attempt)=>{setAttempt(value);setDeadline(Date.now()+value.secondsRemaining*1000);setRemaining(value.secondsRemaining)},[]);
 useEffect(()=>{
  let active=true;
  request().then(data=>{if(active){setOverview(data);if(data.attempt){receive(data.attempt);
   const next=data.attempt.questions.findIndex((item:{savedAnswer:string|null})=>!item.savedAnswer);setIndex(Math.max(0,next))}}})
   .catch(e=>{if(active)setError(e.message)});
  return ()=>{active=false};
 },[receive]);
 useEffect(()=>{if(!attempt||attempt.submitted)return;
  const timer=setInterval(()=>setRemaining(Math.max(0,Math.ceil((deadline-Date.now())/1000))),1000);return ()=>clearInterval(timer);
 },[deadline,attempt]);
 const finish=useCallback(async()=>{
  if(!attempt||busy)return;setBusy(true);setError('');
  try{const data=await request({action:'FINISH',attemptId:attempt.id});receive(data.attempt);setDraft(null)}
  catch(e){setError(e instanceof Error?e.message:'Could not finish check.')}finally{setBusy(false)}
 },[attempt,busy,receive]);
 useEffect(()=>{
  if(attempt&&!attempt.submitted&&remaining===0&&!busy&&autoFinished.current!==attempt.id){autoFinished.current=attempt.id;finish()}
 },[remaining,busy,attempt,finish]);
 async function start(){
  setBusy(true);setError('');
  try{const data=await request({action:'START'});if(data.attempt){receive(data.attempt);setIndex(Math.max(0,data.attempt.questions.findIndex((q:{savedAnswer:string|null})=>!q.savedAnswer)))}
   else setOverview(value=>value?{...value,baseline:{...value.baseline,status:'COMPLETED'}}:null)}
  catch(e){setError(e instanceof Error?e.message:'Could not start check.')}finally{setBusy(false)}
 }
 async function postpone(){
  setBusy(true);setError('');try{await request({action:'POSTPONE'});setOverview(await request())}
  catch(e){setError(e instanceof Error?e.message:'Could not postpone.')}finally{setBusy(false)}
 }
 async function save(answer:string){
  if(!attempt||busy)return;setDraft(answer);setBusy(true);setError('');
  try{const data=await request({action:'ANSWER',attemptId:attempt.id,itemId:attempt.questions[index].id,answer});receive(data.attempt);setDraft(null)}
  catch(e){setError(e instanceof Error?e.message:'Could not save answer.')}finally{setBusy(false)}
 }
 function move(next:number){setIndex(next);setDraft(null);setError('')}
 const question=attempt?.questions[index],complete=attempt?.submitted||overview?.baseline.status==='COMPLETED';
 return <main className={styles.workspace}>
  <Link href="/weekly" className={styles.back}><ArrowLeft size={18}/> This week</Link>
  <header className={styles.header}><h1>{complete?'Your starting point':'Starting check'}</h1></header>
  {error&&<p className={styles.error} role="alert">{error}</p>}
  {!overview&&!error&&<p role="status">Loading starting check...</p>}
  {!overview&&error&&<button className={styles.back} onClick={()=>location.reload()}><RefreshCw size={18}/> Retry</button>}
  {complete?<section className={styles.empty}>
   {attempt?.expired&&<p>The check has ended. Your saved answers are recorded.</p>}
   {attempt?.summary.map(item=><article key={item.objectiveId} className={styles.objective}><h2>{item.subject}</h2><p>{item.objectiveText}</p><p>{item.message}</p></article>)}
   {!attempt&&<p>Your earlier starting check is already recorded.</p>}
   <Link href="/weekly/revisit">Today's revisit <ArrowRight size={18}/></Link>
  </section>:question&&attempt?<section className={styles.question}>
   <div className={styles.weekRow}><span>{question.subject}</span><span aria-label="Time remaining"><Clock size={16}/> {Math.floor(remaining/60)}:{String(remaining%60).padStart(2,'0')}</span></div>
   <p>Question {index+1} of {attempt.questions.length}</p><progress max={attempt.questions.length} value={attempt.questions.filter(q=>q.savedAnswer).length} aria-label="Starting-check progress"/>
   <h2>{question.prompt}</h2><div className={styles.options}>{question.options.map((option,i)=><button key={option} disabled={busy||remaining===0} aria-pressed={(draft||question.savedAnswer)===option} onClick={()=>save(option)}><b>{String.fromCharCode(65+i)}</b>{option}</button>)}</div>
   {busy&&<p role="status">Saving...</p>}{draft&&error&&<button className={styles.back} disabled={busy} onClick={()=>save(draft)}><RefreshCw size={18}/> Retry save</button>}
   <div className={styles.numbers}>{attempt.questions.map((q,i)=><button key={q.id} aria-label={'Question '+(i+1)+(q.savedAnswer?', answered':'')} aria-current={i===index} disabled={busy||Boolean(draft)} onClick={()=>move(i)}>{i+1}</button>)}</div>
   <div className={styles.actions}><button disabled={busy||Boolean(draft)||index===0} onClick={()=>move(index-1)}><ArrowLeft size={18}/> Previous</button>
    {index<attempt.questions.length-1&&remaining>0?<button disabled={busy||Boolean(draft)} onClick={()=>move(index+1)}>Next <ArrowRight size={18}/></button>:<button disabled={busy||Boolean(draft)} onClick={finish}><Check size={18}/> Finish check</button>}
   </div>
  </section>:overview&&<section className={styles.empty}>
   <p>20 questions · 15 minutes</p>
   {!overview.ready&&<p>The reviewed starting check is being prepared.</p>}
   {overview.baseline.postponed_until&&<p>Postponed until {new Intl.DateTimeFormat('en-NG',{timeZone:'Africa/Lagos',dateStyle:'medium'}).format(new Date(overview.baseline.postponed_until))}</p>}
   <div className={styles.actions}><button disabled={busy||!overview.ready} onClick={start}>Start check <ArrowRight size={18}/></button>
    <button disabled={busy||!overview.baseline.first_offered_at||Date.now()>=new Date(overview.baseline.first_offered_at).getTime()+3*86400000} onClick={postpone}><Clock size={18}/> Do it later</button></div>
  </section>}
 </main>;
}
