'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,Check} from 'lucide-react';
import styles from './WeeklyDashboard.module.css';

type Saved={answer:string;confidence:string|null;correct:boolean;correctAnswer:string;explanation:string};
type Practice={id:string|null;submitted:boolean;questions:Array<{id:string;prompt:string;options:string[];saved:Saved|null}>};
type RunnerProps={objectiveId:string;source?:'DAILY_LESSON'}|{source:'REVISIT';objectiveId?:never};
export default function WeeklyPracticeRunner({objectiveId,source='DAILY_LESSON'}:RunnerProps){
 const [practice,setPractice]=useState<Practice|null>(null),[index,setIndex]=useState(0),[answer,setAnswer]=useState(''),[confidence,setConfidence]=useState<string|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState(''),[reason,setReason]=useState(''),[reported,setReported]=useState<string[]>([]);
 async function request(body:Record<string,unknown>){
  const r=await fetch('/api/weekly/practice',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const data=await r.json();if(!r.ok)throw new Error(data.error||'Practice unavailable.');return data;
 }
 useEffect(()=>{
  let active=true;
  request(source==='REVISIT'?{action:'START_REVISIT'}:{action:'START',objectiveId}).then(data=>{if(active){setPractice(data);setIndex(Math.max(0,data.questions.findIndex((q:{saved:Saved|null})=>!q.saved)))}}).catch(e=>{if(active)setError(e.message)});
  return ()=>{active=false};
 },[objectiveId,source]);
 function move(next:number){setIndex(next);setAnswer('');setConfidence(null);setError('');setReason('')}
 async function report(){
  if(!practice?.id)return;setBusy(true);setError('');
  try{const itemId=practice.questions[index].id;await request({action:'REPORT',sessionId:practice.id,itemId,reason});setReported(values=>[...values,itemId]);setReason('')}
  catch(e){setError(e instanceof Error?e.message:'Could not send report.')}finally{setBusy(false)}
 }
 async function check(){
  if(!practice?.id)return;setBusy(true);setError('');
  try{const question=practice.questions[index],result=await request({action:'ANSWER',sessionId:practice.id,itemId:question.id,answer,confidence});
   setPractice({...practice,questions:practice.questions.map((q,i)=>i===index?{...q,saved:{answer,confidence,...result}}:q)});
  }catch(e){setError(e instanceof Error?e.message:'Could not save answer.')}finally{setBusy(false)}
 }
 async function finish(){
  if(!practice?.id)return;setBusy(true);setError('');
  try{await request({action:'FINISH',sessionId:practice.id});setPractice({...practice,submitted:true})}
  catch(e){setError(e instanceof Error?e.message:'Could not finish.')}finally{setBusy(false)}
 }
 const question=practice?.questions[index];
 return <main className={styles.workspace}><Link className={styles.back} href="/weekly"><ArrowLeft size={18}/> This week</Link>
  <header className={styles.header}><p>{source==='REVISIT'?'DAILY REVISIT':'OBJECTIVE PRACTICE'}</p><h1>{source==='REVISIT'?(practice?.submitted?'Revisit complete':"Today's revisit"):(practice?.submitted?'Practice complete':'Keep building understanding')}</h1></header>
  {error&&<p className={styles.error} role="alert">{error}</p>}
  {!practice&&error&&<button onClick={()=>location.reload()}>Retry</button>}
  {!practice&&!error&&<p role="status">Loading practice…</p>}
  {practice&&!practice.questions.length&&<section className={styles.empty}><h2>No reviewed questions are due</h2><Link href="/weekly">Return to this week</Link></section>}
  {practice?.submitted?<section className={styles.empty}><h2>{practice.questions.filter(q=>q.saved?.correct).length} of {practice.questions.length} correct</h2><Link href="/weekly">Return to weekly progress</Link></section>
   :question&&practice&&<section className={styles.question}>
    <p>Question {index+1} of {practice.questions.length}</p><progress max={practice.questions.length} value={practice.questions.filter(q=>q.saved).length} aria-label="Practice progress"/>
    <h2>{question.prompt}</h2><div className={styles.options}>{question.options.map((option,i)=><button key={option} disabled={busy||Boolean(question.saved)} aria-pressed={(question.saved?.answer||answer)===option} onClick={()=>setAnswer(option)}><b>{String.fromCharCode(65+i)}</b>{option}</button>)}</div>
    {!question.saved&&<><p>How sure are you?</p><div className={styles.confidence}>{[['GUESS','Guess'],['FAIRLY_SURE','Fairly sure'],['SURE','Sure']].map(([value,label])=><button key={value} disabled={busy} aria-pressed={confidence===value} onClick={()=>setConfidence(confidence===value?null:value)}>{label}</button>)}</div><div className={styles.actions}><button disabled={busy||!answer} onClick={check}><Check size={18}/> Check answer</button></div></>}
    {question.saved&&<div className={styles.feedback} role="status"><strong>{question.saved.correct?'Correct':'Keep practising'}</strong><p>{question.saved.correctAnswer}</p><p>{question.saved.explanation}</p></div>}
    <div className={styles.numbers}>{practice.questions.map((q,i)=><button key={q.id} aria-label={'Question '+(i+1)+(q.saved?', answered':'')} aria-current={i===index} disabled={busy} onClick={()=>move(i)}>{i+1}</button>)}</div>
    <div className={styles.actions}><button disabled={busy||index===0} onClick={()=>move(index-1)}><ArrowLeft size={18}/> Previous</button>
     {index<practice.questions.length-1?<button disabled={busy} onClick={()=>move(index+1)}>Next <ArrowRight size={18}/></button>:<button disabled={busy||practice.questions.some(q=>!q.saved)} onClick={finish}>{busy?'Saving…':source==='REVISIT'?'Finish revisit':'Finish practice'}<Check size={18}/></button>}
    </div>
    {reported.includes(question.id)?<p role="status">Report sent</p>:<details className={styles.report}><summary>Report a problem</summary><label htmlFor="question-report">What needs checking?</label><textarea id="question-report" maxLength={500} rows={3} value={reason} onChange={e=>setReason(e.target.value)}/><div className={styles.actions}><button disabled={busy||reason.trim().length<5} onClick={report}>Send report</button></div></details>}
   </section>}
 </main>;
}
