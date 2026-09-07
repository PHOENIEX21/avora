'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { readJson } from '@/lib/clientFetch';

type Q={id:string;number:number;prompt:string;type:string;options?:string[];topic:string};
type Subject='Mathematics'|'English Language';
type Mode='FULL_MOCK'|'QUICK_10'|'TOPIC_TEST'|'WEAKNESS_TEST';

const modeInfo:{id:Mode;name:string;why:string}[]=[
 {id:'FULL_MOCK',name:'Full Mock',why:'A balanced exam-style paper to measure readiness across the subject.'},
 {id:'QUICK_10',name:'Quick 10',why:'A short revision check when you have only a few minutes.'},
 {id:'TOPIC_TEST',name:'Topic Test',why:'Stay on one curriculum area until the skill becomes secure.'},
 {id:'WEAKNESS_TEST',name:'Weakness Test',why:'Recheck areas AVORA has previously seen you struggle with.'}
];
const topicMap:Record<Subject,string[]>={
 'Mathematics':['Number & Numeration','Algebra','Geometry & Mensuration','Commercial Arithmetic','Statistics & Data','Ratio & Proportion','Measurement','Probability'],
 'English Language':['Grammar & Structure','Vocabulary & Lexis','Comprehension','Sentence Meaning','Punctuation','Spelling & Usage','Word Classes','Concord']
};

export default function ExamClient(){
 const router=useRouter();
 const [exam,setExam]=useState<'BECE'|'NCEE'>('BECE');
 const [subject,setSubject]=useState<Subject>('Mathematics');
 const [mode,setMode]=useState<Mode>('FULL_MOCK');
 const [topic,setTopic]=useState('');
 const [paper,setPaper]=useState<any>(null);
 const [i,setI]=useState(0);
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const [flags,setFlags]=useState<Record<string,boolean>>({});
 const [left,setLeft]=useState(2700);
 const [result,setResult]=useState<any>(null);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const [reviewOpen,setReviewOpen]=useState(false);

 useEffect(()=>{setTopic(topicMap[subject][0])},[subject]);
 useEffect(()=>{if(!paper)return;const t=setInterval(()=>setLeft(x=>{if(x<=1){clearInterval(t);void finish(true);return 0}return x-1}),1000);return()=>clearInterval(t)},[paper]);
 useEffect(()=>{if(paper)document.body.classList.add('exam-running');else document.body.classList.remove('exam-running');return()=>document.body.classList.remove('exam-running')},[paper]);

 async function start(){
  if(busy)return;
  setBusy(true);setError('');
  try{
   const r=await fetch('/api/exam/start',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({exam,subject,assessmentType:mode,topic:mode==='TOPIC_TEST'?topic:undefined})});
   const d=await readJson<any>(r);
   if(!r.ok)throw new Error(d.error||'Could not prepare this assessment.');
   setPaper(d);setLeft(d.durationSeconds);setAnswers({});setFlags({});setI(0);setReviewOpen(false);
  }catch(e:any){setError(e.message||'Could not prepare this assessment. Please retry.')}finally{setBusy(false)}
 }

 async function save(q:Q,a:string){
  setAnswers(v=>({...v,[q.id]:a}));
  try{
   const r=await fetch('/api/exam/answer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:paper.sessionId,questionId:q.id,answer:a})});
   const d=await readJson<any>(r);
   if(!r.ok){setError(d.error||'Could not sync this answer.');return false}
   setError('');return true;
  }catch(e:any){setError(e.message||'Could not sync this answer. Check your connection and retry.');return false}
 }

 async function persistCurrent(){
  if(!paper)return true;
  const current:Q=paper.questions[i];
  const a=answers[current.id];
  if(a==null||a==='')return true;
  return save(current,a);
 }

 async function goTo(n:number){
  if(busy||!paper)return;
  if(await persistCurrent())setI(n);
 }

 async function finish(force=false){
  if(!paper||busy)return;
  const flagged=Object.values(flags).filter(Boolean).length;
  const unanswered=paper.questions.filter((q:Q)=>!String(answers[q.id]||'').trim()).length;
  if(!force && (flagged>0||unanswered>0) && !reviewOpen){setReviewOpen(true);return;}
  setBusy(true);setReviewOpen(false);
  const synced=await persistCurrent();
  if(!synced){setBusy(false);return}
  try{
   const r=await fetch('/api/exam/finish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:paper.sessionId})});
   const d=await readJson<any>(r);
   if(!r.ok)throw new Error(d.error||'Could not submit assessment.');
   setResult(d);setPaper(null);
  }catch(e:any){setError(e.message||'Could not submit yet. Your answers are still here — retry when connected.')}finally{setBusy(false)}
 }

 if(result)return <main className="exam-shell"><section className="exam-result"><span className="section-kicker">ASSESSMENT COMPLETE</span><h1>{result.score}%</h1><p>{result.correct} of {result.total} correct. AVORA uses this evidence to decide what deserves teaching next — not simply to give you a score.</p><div className="exam-next-step"><span>NEXT LEARNING LOOP</span><b>Choose a topic → Tutor teaches → Practice strengthens → Reassessment proves mastery</b></div><div className="topic-analysis topic-actions">{result.analysis.map((x:any)=><button key={x.topic} onClick={()=>router.push('/tutor?topic='+encodeURIComponent(x.topic)+'&subject='+encodeURIComponent(subject))} className={x.topic===result.recommended?'recommended-topic':''}><div><strong>{x.topic}</strong>{x.topic===result.recommended&&<small>RECOMMENDED START</small>}</div><span>{x.correct}/{x.total} correct</span><b>{x.percent}%</b><i>Learn this →</i></button>)}</div><div className="recommendation"><small>AVORA RECOMMENDS</small><h2>{result.recommended}</h2><p>Start with the weakest evidence, or choose any assessed topic above. You stay in control of where learning begins.</p><button className="btn btn-primary" onClick={()=>{const weak=[...result.analysis].filter((x:any)=>x.percent<80).sort((a:any,b:any)=>a.percent-b.percent).map((x:any)=>x.topic);const first=weak[0]||result.recommended;router.push('/tutor?topic='+encodeURIComponent(first)+'&recovery='+encodeURIComponent(weak.join('|'))+'&from=exam')}}>Start my guided recovery plan</button><button className="btn btn-secondary" onClick={()=>{setResult(null);setMode('FULL_MOCK')}}>Try another assessment</button></div></section></main>;

 if(!paper)return <main className="exam-centre shell"><header className="compact-head"><span className="section-kicker">EXAM CENTRE</span><h1>Every attempt should tell AVORA something new.</h1><p>Choose an exam, subject and purpose. AVORA prefers questions you have not recently seen while keeping the paper curriculum-balanced.</p></header><section className="exam-builder"><div className="builder-group"><b>1. Exam</b><div className="choice-row">{(['BECE','NCEE'] as const).map(x=><button key={x} className={exam===x?'selected':''} onClick={()=>setExam(x)}>{x}</button>)}</div></div><div className="builder-group"><b>2. Subject</b><div className="choice-row">{(['Mathematics','English Language'] as Subject[]).map(x=><button key={x} className={subject===x?'selected':''} onClick={()=>setSubject(x)}>{x}</button>)}</div></div><div className="builder-group"><b>3. What do you need today?</b><div className="assessment-types">{modeInfo.map(x=><button key={x.id} className={mode===x.id?'selected':''} onClick={()=>setMode(x.id)}><strong>{x.name}</strong><span>{x.why}</span></button>)}</div></div>{mode==='TOPIC_TEST'&&<div className="builder-group"><b>4. Choose topic</b><select value={topic} onChange={e=>setTopic(e.target.value)}>{topicMap[subject].map(t=><option key={t}>{t}</option>)}</select></div>}</section><section className="coverage"><div><span className="section-kicker">WHAT TO EXPECT</span><h2>{exam} · {subject}</h2></div><p>{mode==='FULL_MOCK'?'A broad exam-style assessment across the subject.':mode==='QUICK_10'?'10 fresh revision questions selected from the reviewed bank.':mode==='TOPIC_TEST'?`Focused practice on ${topic}.`:'A targeted reassessment designed to expose gaps that still need teaching.'}</p></section>{error&&<p className="exam-error">{error}</p>}<button className="btn btn-primary" disabled={busy} onClick={start}>{busy?'Preparing a fresh paper…':'Start this assessment'}</button><p className="freshness-note">AVORA records question exposure per learner, so repeat attempts prefer unseen material before recycling older evidence.</p></main>;

 const q:Q=paper.questions[i],total=paper.questions.length;
 const mm=String(Math.floor(left/60)).padStart(2,'0'),ss=String(left%60).padStart(2,'0');
 const flaggedCount=Object.values(flags).filter(Boolean).length;
 const unansweredCount=paper.questions.filter((x:Q)=>!String(answers[x.id]||'').trim()).length;

 return <main className="exam-session"><header className="exam-bar"><div><strong>{exam} · {subject}</strong><span>Question {i+1} of {total}</span></div><time>{mm}:{ss}</time><button disabled={busy} onClick={()=>finish()}>{busy?'Submitting…':'Submit'}</button></header><div className="exam-work"><aside className="question-nav"><strong>Questions</strong><div>{paper.questions.map((x:Q,n:number)=><button key={x.id} onClick={()=>goTo(n)} className={`${n===i?'active ':''}${answers[x.id]?'answered ':''}${flags[x.id]?'flagged':''}`}>{n+1}</button>)}</div>{flaggedCount>0&&<small>{flaggedCount} flagged for review</small>}</aside><section className="exam-question"><div className="exam-topic">{q.topic}</div><h1>{q.prompt}</h1>{q.type==='MULTIPLE_CHOICE'&&Array.isArray(q.options)&&q.options.length?<div className="exam-options">{q.options.map((o,j)=><button key={o} className={answers[q.id]===o?'chosen':''} onClick={()=>setAnswers(v=>({...v,[q.id]:o}))}><b>{String.fromCharCode(65+j)}</b><span>{o}</span></button>)}</div>:<div className="exam-input"><label>Your answer</label><input value={answers[q.id]||''} onChange={e=>{setAnswers(v=>({...v,[q.id]:e.target.value}));setError('')}} /></div>}{error&&<p className="exam-error">{error}</p>}{reviewOpen&&<div className="exam-review-notice"><strong>Review before submitting</strong><p>{unansweredCount} unanswered · {flaggedCount} flagged. Flagged questions are reminders for you to revisit; they do not change your score by themselves.</p><div>{flaggedCount>0&&<button onClick={()=>{const n=paper.questions.findIndex((x:Q)=>flags[x.id]);if(n>=0){setReviewOpen(false);setI(n)}}}>Go to first flagged</button>}<button className="next" onClick={()=>finish(true)}>Submit anyway</button></div></div>}<footer><button className="quiet-exam" onClick={()=>setFlags(v=>({...v,[q.id]:!v[q.id]}))}>{flags[q.id]?'✓ Flagged — remove flag':'Flag for review'}</button><div><button disabled={i===0||busy} onClick={()=>goTo(i-1)}>Previous</button>{i===total-1?<button className="next" disabled={busy} onClick={()=>finish()}>{busy?'Submitting…':'Submit assessment'}</button>:<button className="next" disabled={busy} onClick={()=>goTo(i+1)}>Next</button>}</div></footer></section></div></main>;
}
