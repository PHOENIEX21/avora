'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import {ArrowLeft,ArrowRight,Check,RefreshCw} from 'lucide-react';
import styles from './WeeklyExamRunner.module.css';
type Question={id:string;number:number;subject:string;topic:string;prompt:string;type:string;options:string[]};
type Paper={sessionId:string;title:string;secondsRemaining:number;questions:Question[];answers:Record<string,string>};
async function api(path:string,body?:Record<string,unknown>){
 const response=await fetch(path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)}:{cache:'no-store',signal:AbortSignal.timeout(10000)});
 const data=await response.json();if(!response.ok)throw new Error(data.error||'Exam unavailable. Retry.');return data;
}
export default function WeeklyExamRunner({examId}:{examId:string}){
 const router=useRouter(),[paper,setPaper]=useState<Paper|null>(null),[index,setIndex]=useState(0),[answers,setAnswers]=useState<Record<string,string>>({}),
  [saved,setSaved]=useState<Record<string,string>>({}),[left,setLeft]=useState(0),[deadline,setDeadline]=useState(0),[pending,setPending]=useState(0),[busy,setBusy]=useState(false),[error,setError]=useState(''),[retry,setRetry]=useState(0);
 const current=useRef<Record<string,string>>({}),confirmed=useRef<Record<string,string>>({}),queue=useRef<Promise<boolean>>(Promise.resolve(true)),textTimer=useRef<ReturnType<typeof setTimeout>|null>(null),autoSubmitted=useRef(false),submitting=useRef(false),generation=useRef(0);
 useEffect(()=>{let active=true;
  const activeGeneration=++generation.current;autoSubmitted.current=false;submitting.current=false;queue.current=Promise.resolve(true);current.current={};confirmed.current={};
  setPaper(null);setAnswers({});setSaved({});setIndex(0);setPending(0);setLeft(0);setDeadline(0);
  setBusy(true);setError('');
  (async()=>{try{
   const start=await api('/api/weekly-exam/'+examId+'/start',{});
   if(start.status==='COMPLETED'){if(active)router.replace('/weekly-exam/result/'+start.sessionId);return}
   const data=await api('/api/weekly-exam/session/'+start.sessionId);
   if(data.completed){if(active)router.replace('/weekly-exam/result/'+data.sessionId);return}
   if(!data.questions?.length)throw new Error('The reviewed paper is unavailable.');
   if(active){setPaper(data);setAnswers(data.answers||{});setSaved(data.answers||{});current.current=data.answers||{};confirmed.current=data.answers||{};setLeft(data.secondsRemaining);setDeadline(Date.now()+data.secondsRemaining*1000)}
  }catch(e){if(active)setError(e instanceof Error?e.message:'Could not load paper.')}finally{if(active)setBusy(false)}})();
  return()=>{active=false;generation.current=activeGeneration+1;if(textTimer.current)clearTimeout(textTimer.current)};
 },[examId,retry,router]);
 const save=useCallback((question:Question,answer:string)=>{
  if(!paper)return Promise.resolve(false);const token=generation.current;setPending(value=>value+1);
  const task=queue.current.then(async()=>{
   if(token!==generation.current)return false;
   try{await api('/api/weekly-exam/answer',{sessionId:paper.sessionId,questionId:question.id,answer});
    if(token!==generation.current)return false;
    confirmed.current={...confirmed.current,[question.id]:answer};setSaved({...confirmed.current});setError('');return true;
   }catch(e){if(token===generation.current)setError(e instanceof Error?e.message:'Answer not saved. Retry.');return false}finally{if(token===generation.current)setPending(value=>value-1)}
  });queue.current=task;return task;
 },[paper]);
 function change(question:Question,answer:string){
  current.current={...current.current,[question.id]:answer};setAnswers({...current.current});
  if(textTimer.current)clearTimeout(textTimer.current);
  if(question.type==='MULTIPLE_CHOICE')void save(question,answer);
  else textTimer.current=setTimeout(()=>{textTimer.current=null;void save(question,answer)},500);
 }
 const finish=useCallback(async(expired=false)=>{
  if(!paper||submitting.current)return;const token=generation.current;submitting.current=true;setBusy(true);setError('');
  if(textTimer.current){clearTimeout(textTimer.current);textTimer.current=null}
  try{
   await queue.current;
   if(token!==generation.current)return;
   if(!expired)for(const question of paper.questions){const answer=current.current[question.id]??'';if(answer!==(confirmed.current[question.id]??'')&&!await save(question,answer))throw new Error('Some answers are not saved. Retry submission.')}
   await api('/api/weekly-exam/finish',{sessionId:paper.sessionId});if(token===generation.current)router.replace('/weekly-exam/result/'+paper.sessionId);
  }catch(e){if(token===generation.current)setError(e instanceof Error?e.message:'Could not submit. Retry.')}finally{if(token===generation.current){submitting.current=false;setBusy(false)}}
 },[paper,router,save]);
 useEffect(()=>{if(!paper)return;const timer=setInterval(()=>setLeft(Math.max(0,Math.ceil((deadline-Date.now())/1000))),500);return()=>clearInterval(timer)},[paper,deadline]);
 useEffect(()=>{if(paper&&left===0&&!autoSubmitted.current){autoSubmitted.current=true;void finish(true)}},[paper,left,finish]);
 async function move(next:number){
  if(!paper)return;if(textTimer.current){clearTimeout(textTimer.current);textTimer.current=null}
  const question=paper.questions[index],answer=current.current[question.id]??'';
  if(answer!==(confirmed.current[question.id]??'')&&!await save(question,answer))return;await queue.current;setIndex(next);
 }
 if(!paper)return <main className="shell"><h1>Weekly exam</h1>{error?<><p className="exam-error" role="alert">{error}</p><button disabled={busy} onClick={()=>setRetry(value=>value+1)}><RefreshCw size={18}/> Retry</button></>:<p role="status">Preparing your reviewed paper...</p>}</main>;
 const question=paper.questions[index],unsaved=paper.questions.some(q=>(answers[q.id]??'')!==(saved[q.id]??''));
 return <main className={'exam-session weekly-exam-session '+styles.runner}>
  <header className="exam-bar"><div><strong>{paper.title}</strong><span>Question {index+1} of {paper.questions.length}</span></div><time aria-label="Time remaining">{Math.floor(left/60)}:{String(left%60).padStart(2,'0')}</time><button disabled={busy} onClick={()=>finish(left===0)}><Check size={18}/> Submit</button></header>
  <progress max={paper.questions.length} value={paper.questions.filter(q=>saved[q.id]).length} aria-label="Saved answer progress"/>
  <div className="exam-work"><aside className="question-nav"><strong>Questions</strong><div>{paper.questions.map((q,i)=><button key={q.id} aria-label={'Question '+(i+1)} aria-current={index===i} disabled={busy||pending>0} className={(index===i?'active ':'')+(saved[q.id]?'answered':'')} onClick={()=>move(i)}>{i+1}</button>)}</div></aside>
   <section className="exam-question"><div className="exam-topic">{question.subject} · {question.topic}</div><h1>{question.prompt}</h1>
    {question.type==='MULTIPLE_CHOICE'?<div className="exam-options">{question.options.map((option,i)=><button key={option} disabled={busy||pending>0||left===0} aria-pressed={answers[question.id]===option} className={answers[question.id]===option?'chosen':''} onClick={()=>change(question,option)}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div>
     :<div className="exam-input"><label htmlFor="weekly-theory-answer">Your answer</label><textarea id="weekly-theory-answer" rows={8} maxLength={12000} disabled={busy||left===0} value={answers[question.id]||''} onChange={e=>change(question,e.target.value)}/></div>}
    {error&&<p className="exam-error" role="alert">{error}</p>}
    <footer><span role="status">{pending?'Saving...':unsaved?'Answer not saved':'Saved'}</span><div><button disabled={index===0||busy||pending>0} onClick={()=>move(index-1)}><ArrowLeft size={18}/> Previous</button>
     {index===paper.questions.length-1||left===0?<button className="next" disabled={busy} onClick={()=>finish(left===0)}>{busy?'Submitting...':'Submit weekly exam'}<Check size={18}/></button>:<button className="next" disabled={busy||pending>0} onClick={()=>move(index+1)}>Next <ArrowRight size={18}/></button>}
    </div></footer>
   </section></div>
 </main>;
}
