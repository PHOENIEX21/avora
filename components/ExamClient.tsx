'use client';

import {trackEvent} from '@/lib/telemetry';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { readJson } from '@/lib/clientFetch';

type Q={id:string;number:number;prompt:string;type:string;options?:string[];topic:string};
type ExtendedTask={taskKey:string;number:number;type:'MATH_THEORY'|'ENGLISH_COMPOSITION';prompt:string;maxMarks:number;requiredCount:number};
type Subject='Mathematics'|'English Language';
type Mode='FULL_MOCK'|'QUICK_10'|'TOPIC_TEST'|'WEAKNESS_TEST'|'PAST_YEAR_PRACTICE'|'AUTHORED_MOCK';
type YearRef={year:number;paperStructure?:string;status?:string;rights?:string;solutions?:boolean;sourceLabel?:string;sourceUrl?:string;directReproductionAllowed?:boolean};

const modeInfo:{id:Mode;name:string;why:string}[]=[
 {id:'FULL_MOCK',name:'Fresh Full Mock',why:'A newly assembled balanced paper from AVORA’s reviewed question bank.'},
 {id:'AUTHORED_MOCK',name:'Mock Set 1 / 2',why:'Take one of AVORA’s fixed authored mock papers in its original question order.'},
 {id:'QUICK_10',name:'Quick 10',why:'A short revision check when you have only a few minutes.'},
 {id:'TOPIC_TEST',name:'Topic Test',why:'Stay on one curriculum area until the skill becomes secure.'},
 {id:'WEAKNESS_TEST',name:'Weakness Test',why:'Recheck areas AVORA has previously seen you struggle with.'},
 {id:'PAST_YEAR_PRACTICE',name:'Past-year practice',why:'Choose a verified exam year and practise questions built to the same curriculum and exam standard.'}
];
export default function ExamClient({classLevel,topicOptions}:{classLevel:'JSS1'|'JSS2'|'JSS3';topicOptions:Record<Subject,string[]>}){
 const router=useRouter();
 const examLabel=classLevel==='JSS3'?'BECE':`${classLevel} Curriculum Assessment`;
 const [subject,setSubject]=useState<Subject>('Mathematics');
 const [mode,setMode]=useState<Mode>('FULL_MOCK');
 const [topic,setTopic]=useState('');
 const [years,setYears]=useState<YearRef[]>([]);
 const [pastYear,setPastYear]=useState<number|''>('');
 const [mockSet,setMockSet]=useState<1|2>(1);
 const [paper,setPaper]=useState<any>(null);
 const [i,setI]=useState(0);
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const [flags,setFlags]=useState<Record<string,boolean>>({});
 const [left,setLeft]=useState(2700);
 const [result,setResult]=useState<any>(null);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const [reviewOpen,setReviewOpen]=useState(false);
 const [phase,setPhase]=useState<'OBJECTIVE'|'EXTENDED'>('OBJECTIVE');
 const [extendedIndex,setExtendedIndex]=useState(0);
 const [extendedAnswers,setExtendedAnswers]=useState<Record<string,string>>({});
 const [selectedExtended,setSelectedExtended]=useState<string[]>([]);
 const finishRef=useRef<(force?:boolean)=>void>(()=>{});
 useEffect(()=>{finishRef.current=finish});

 useEffect(()=>{setTopic(topicOptions[subject]?.[0]||'')},[subject,topicOptions]);
 useEffect(()=>{if(classLevel!=='JSS3'){setYears([]);setPastYear('');if(mode==='PAST_YEAR_PRACTICE')setMode('FULL_MOCK');return;}let cancelled=false;(async()=>{try{const r=await fetch('/api/exam/years?exam=BECE&subject='+encodeURIComponent(subject),{cache:'no-store'});const d=await readJson<any>(r);if(!cancelled&&r.ok){const y:Array<YearRef>=d.years||[];setYears(y);setPastYear(v=>y.some(x=>x.year===v)?v:(y[0]?.year||''));}}catch{if(!cancelled){setYears([]);setPastYear('')}}})();return()=>{cancelled=true}},[classLevel,subject,mode]);
 useEffect(()=>{if(!paper)return;const t=setInterval(()=>setLeft(x=>{if(x<=1){clearInterval(t);finishRef.current(true);return 0}return x-1}),1000);return()=>clearInterval(t)},[paper]);
 useEffect(()=>{if(paper)document.body.classList.add('exam-running');else document.body.classList.remove('exam-running');return()=>document.body.classList.remove('exam-running')},[paper]);

 async function start(){
  if(busy)return;
  setBusy(true);setError('');
  try{
   const r=await fetch('/api/exam/start',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject,assessmentType:mode,mockSet:mode==='AUTHORED_MOCK'?mockSet:undefined,topic:mode==='TOPIC_TEST'?topic:undefined,pastYear:mode==='PAST_YEAR_PRACTICE'&&pastYear?pastYear:undefined})});
   const d=await readJson<any>(r);
   if(!r.ok)throw new Error(d.error||'Could not prepare this assessment.');
   setPaper(d);setLeft(d.durationSeconds);setAnswers({});setFlags({});setI(0);setReviewOpen(false);setPhase('OBJECTIVE');setExtendedIndex(0);setExtendedAnswers({});setSelectedExtended([]);
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

 async function saveExtended(task:ExtendedTask,a:string){
  setExtendedAnswers(v=>({...v,[task.taskKey]:a}));
  try{const r=await fetch('/api/exam/extended-answer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:paper.sessionId,taskKey:task.taskKey,answer:a})});const d=await readJson<any>(r);if(!r.ok){setError(d.error||'Could not sync this response.');return false}setError('');return true}catch(e:any){setError(e.message||'Could not sync this response.');return false}
 }

 async function persistExtended(){
  if(!paper?.extendedTasks?.length||phase!=='EXTENDED')return true;const task:ExtendedTask=paper.extendedTasks[extendedIndex];if(!task||!selectedExtended.includes(task.taskKey))return true;const a=extendedAnswers[task.taskKey];if(a==null)return true;return saveExtended(task,a);
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
  const requiredExtended=paper.extendedTasks?.[0]?.requiredCount||0;
  if(requiredExtended&&selectedExtended.length!==requiredExtended){setError(`Select exactly ${requiredExtended} ${subject==='Mathematics'?'theory questions':'composition option'}${requiredExtended===1?'':'s'} before submitting.`);setPhase('EXTENDED');return;}
  if(!force && (flagged>0||unanswered>0) && !reviewOpen){setReviewOpen(true);return;}
  setBusy(true);setReviewOpen(false);
  const synced=phase==='OBJECTIVE'?await persistCurrent():await persistExtended();
  if(!synced){setBusy(false);return}
  try{
   const r=await fetch('/api/exam/finish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:paper.sessionId,extendedAnswers,selectedExtendedKeys:selectedExtended})});
   const d=await readJson<any>(r);
   if(!r.ok)throw new Error(d.error||'Could not submit assessment.');
   setResult(d);setPaper(null);
  }catch(e:any){setError(e.message||'Could not submit yet. Your answers are still here — retry when connected.')}finally{setBusy(false)}
 }

 if(result)return <main className="exam-shell"><section className="exam-result"><span className="section-kicker">ASSESSMENT COMPLETE</span><h1>{result.score}%</h1><p>{result.extended?.possible?`Objective: ${result.correct} of ${result.total} correct (${result.objectiveScore}%). Extended response: ${result.extended.earned}/${result.extended.possible} marks (${result.extended.percent}%).`:`${result.correct} of ${result.total} correct.`} Submission unlocks the learning review and targeted reteaching.</p>{result.paperReference&&<div className="past-paper-reference"><small>PAST-PAPER REFERENCE</small><strong>{result.paperReference.exam} · {result.paperReference.year} · {result.paperReference.subject}</strong><span>{result.paperReference.note}</span>{result.paperReference.sourceUrl&&<a href={result.paperReference.sourceUrl} target="_blank" rel="noreferrer">Open referenced source ↗</a>}</div>}<div className="exam-next-step"><span>NEXT LEARNING LOOP</span><b>Review solutions → identify the gap → Tutor teaches → fresh practice proves mastery</b>{result.remediation?.reason&&<p>{result.remediation.reason}</p>}</div><div className="topic-analysis topic-actions">{result.analysis.map((x:any)=><button key={x.topic} onClick={()=>{trackEvent('EXAM_TO_TUTOR',{subject,topic:x.topic,source:'exam'});router.push('/tutor?topic='+encodeURIComponent(x.topic)+'&subject='+encodeURIComponent(subject)+'&from=exam')}} className={x.topic===result.recommended?'recommended-topic':''}><div><strong>{x.topic}</strong>{x.topic===result.recommended&&<small>RECOMMENDED START</small>}</div><span>{x.correct}/{x.total} correct</span><b>{x.percent}%</b><i>Learn this →</i></button>)}</div><section className="solution-review"><div className="solution-review-head"><span className="section-kicker">FULL SOLUTIONS</span><h2>Learn from every question.</h2><p>Solutions are shown only after submission. Wrong answers remain visible beside the correct method so you can see exactly what changed.</p></div>{(result.review||[]).map((r:any)=><article key={r.id} className={r.correct?'solution-card correct':'solution-card incorrect'}><header><span>QUESTION {r.number} · {r.topic}</span><b>{r.correct?'Correct ✓':'Needs review'}</b></header><h3>{r.prompt}</h3><div className="answer-compare"><div><small>YOUR ANSWER</small><strong>{r.yourAnswer||'No answer'}</strong></div><div><small>CORRECT ANSWER</small><strong>{r.correctAnswer}</strong></div></div><div className="worked-solution"><small>WORKED SOLUTION</small>{r.solutionSteps?.map((step:string,n:number)=><p key={n}><b>{n+1}.</b> {step}</p>)}</div>{!r.correct&&r.wrongAnswerReasoning&&<p className="why-wrong"><b>What to check:</b> {r.wrongAnswerReasoning}</p>}<footer><span>{r.skill}{r.microSkill?` · ${r.microSkill}`:''}</span><button onClick={()=>{trackEvent('EXAM_TO_TUTOR',{subject,topic:r.topic,source:'review'});router.push('/tutor?topic='+encodeURIComponent(r.topic)+'&subject='+encodeURIComponent(subject)+'&from=review')}}>Teach me this →</button></footer></article>)}</section>{(result.extendedReview||[]).length>0&&<section className="extended-review"><div className="solution-review-head"><span className="section-kicker">PAPER 2 / COMPOSITION</span><h2>Rubric-marked extended responses.</h2><p>Marks are awarded criterion by criterion. AVORA uses weaknesses here to guide reteaching, but feedback itself never counts as independent mastery evidence.</p></div>{result.extendedReview.map((r:any)=><article key={r.taskKey} className="solution-card extended-solution-card"><header><span>{r.type==='MATH_THEORY'?`THEORY QUESTION ${r.number}`:`COMPOSITION OPTION ${String.fromCharCode(64+r.number)}`}</span><b>{r.score}/{r.maxScore}</b></header><h3>{r.prompt}</h3><div className="extended-answer-review"><small>YOUR RESPONSE</small><p>{r.yourAnswer||'No response submitted.'}</p></div><div className="rubric-breakdown">{r.criteria.map((c:any)=><div key={c.id}><strong>{c.label}</strong><span>{c.score}/{c.maxScore}</span><p>{c.feedback}</p><button onClick={()=>{trackEvent('MOCK_TO_TUTOR',{subject,topic:c.topic,source:'mock-rubric'});router.push('/tutor?topic='+encodeURIComponent(c.topic)+'&subject='+encodeURIComponent(subject)+'&from=mock-rubric')}}>Teach this area →</button></div>)}</div>{r.feedback&&<p className="why-wrong"><b>Marker feedback:</b> {r.feedback}</p>}{r.workedSolution&&<div className="worked-solution"><small>REFERENCE WORKED SOLUTION</small><p>{r.workedSolution}</p></div>}</article>)}</section>}<div className="recommendation"><small>AVORA RECOMMENDS</small><h2>{result.recommended}</h2><p>Start with the weakest evidence, or choose any assessed topic above. You stay in control of where learning begins.</p><button className="btn btn-primary" onClick={()=>{const weak=[...result.analysis].filter((x:any)=>x.percent<80).sort((a:any,b:any)=>a.percent-b.percent).map((x:any)=>x.topic);const first=weak[0]||result.recommended;trackEvent('EXAM_TO_TUTOR',{subject,topic:first,source:'exam',mode:'recovery'});router.push('/tutor?topic='+encodeURIComponent(first)+'&subject='+encodeURIComponent(subject)+'&recovery='+encodeURIComponent(weak.join('|'))+'&from=exam')}}>Start my guided recovery plan</button><button className="btn btn-secondary" onClick={()=>{setResult(null);setMode('FULL_MOCK')}}>Try another assessment</button></div></section></main>;

 if(!paper)return <main className="exam-centre shell"><header className="compact-head"><span className="section-kicker">EXAM CENTRE</span><h1>Every attempt should tell AVORA something new.</h1><p>Choose a subject and purpose. AVORA uses your actual class bank, prefers questions you have not recently seen, and keeps the paper curriculum-balanced.</p></header><section className="exam-builder"><div className="builder-group"><b>1. Level</b><div className="choice-row"><button className="selected" type="button">{examLabel}</button></div></div><div className="builder-group"><b>2. Subject</b><div className="choice-row">{(['Mathematics','English Language'] as Subject[]).map(x=><button key={x} className={subject===x?'selected':''} onClick={()=>setSubject(x)}>{x}</button>)}</div></div><div className="builder-group"><b>3. What do you need today?</b><div className="assessment-types">{modeInfo.filter(x=>classLevel==='JSS3'||x.id!=='PAST_YEAR_PRACTICE').map(x=><button key={x.id} className={mode===x.id?'selected':''} onClick={()=>setMode(x.id)}><strong>{x.name}</strong><span>{x.why}</span></button>)}</div></div>{mode==='AUTHORED_MOCK'&&<div className="builder-group authored-mock-picker"><b>4. Choose authored mock</b><div className="choice-row"><button type="button" className={mockSet===1?'selected':''} onClick={()=>setMockSet(1)}>Mock Set 1</button><button type="button" className={mockSet===2?'selected':''} onClick={()=>setMockSet(2)}>Mock Set 2</button></div><p>Fixed AVORA mock: questions stay in the authored order so results can be compared across attempts. During the 14-day trial this counts as your one complete full mock.</p></div>}{mode==='TOPIC_TEST'&&<div className="builder-group"><b>4. Choose topic</b><select value={topic} onChange={e=>setTopic(e.target.value)}>{topicOptions[subject].map(t=><option key={t}>{t}</option>)}</select></div>}{mode==='PAST_YEAR_PRACTICE'&&<div className="builder-group"><b>4. Choose verified year</b>{years.length?<select className="exam-year-select" aria-label="Choose verified exam year" value={pastYear} onChange={e=>setPastYear(Number(e.target.value))}>{years.map(y=><option key={y.year} value={y.year}>{y.year}</option>)}</select>:<div className="year-loading">Loading available years…</div>}{pastYear&&<div className="year-source-note">{years.find(y=>y.year===pastYear)?.paperStructure&&<span>{years.find(y=>y.year===pastYear)?.paperStructure}</span>}<strong>About these questions</strong><p>AVORA uses the selected year as an exam reference and gives you original practice questions at the same curriculum and exam standard. Source details remain recorded for transparency.</p></div>}</div>}</section><section className="coverage"><div><span className="section-kicker">WHAT TO EXPECT</span><h2>{examLabel} · {subject}</h2></div><p>{mode==='AUTHORED_MOCK'?`AVORA authored Mock Set ${mockSet}, preserved in its fixed question order.`:mode==='FULL_MOCK'?'A broad exam-style assessment across the subject.':mode==='QUICK_10'?'10 fresh revision questions selected from the reviewed bank.':mode==='TOPIC_TEST'?`Focused practice on ${topic}.`:mode==='PAST_YEAR_PRACTICE'?`Practise BECE ${subject} at the standard and topic coverage associated with ${pastYear||'your selected'} reference year.`:'A targeted reassessment designed to expose gaps that still need teaching.'}</p></section>{error&&<p className="exam-error">{error}</p>}<button className="btn btn-primary" disabled={busy} onClick={start}>{busy?'Preparing a fresh paper…':'Start this assessment'}</button><p className="freshness-note">AVORA records question exposure per learner, so repeat attempts prefer unseen material before recycling older evidence.</p>{classLevel==='JSS3'&&<a className="exam-archive-link" href="/exam/archive">Explore verified BECE exam references →</a>}</main>;

 const q:Q=paper.questions[i],total=paper.questions.length;
 const mm=String(Math.floor(left/60)).padStart(2,'0'),ss=String(left%60).padStart(2,'0');
 const flaggedCount=Object.values(flags).filter(Boolean).length;
 const unansweredCount=paper.questions.filter((x:Q)=>!String(answers[x.id]||'').trim()).length;

 if(phase==='EXTENDED'&&paper.extendedTasks?.length){
  const tasks:ExtendedTask[]=paper.extendedTasks;const task=tasks[extendedIndex]||tasks[0];const required=tasks[0]?.requiredCount||1;const selected=selectedExtended.includes(task.taskKey);
  const toggle=()=>{setError('');setSelectedExtended(v=>v.includes(task.taskKey)?v.filter(k=>k!==task.taskKey):(v.length<required?[...v,task.taskKey]:v));};
  return <main className="exam-session extended-paper"><header className="exam-bar"><div><strong>{paper.examLabel||examLabel} · {subject}</strong><span>{subject==='Mathematics'?'Paper 2 — Theory':'Section D — Composition'} · Answer {required} of {tasks.length}</span></div><time>{mm}:{ss}</time><button disabled={busy} onClick={()=>finish()}>{busy?'Marking…':'Submit full mock'}</button></header><div className="exam-work"><aside className="question-nav extended-nav"><strong>{subject==='Mathematics'?'Theory':'Composition'}</strong><div>{tasks.map((x,n)=><button key={x.taskKey} onClick={async()=>{await persistExtended();setExtendedIndex(n)}} className={`${n===extendedIndex?'active ':''}${selectedExtended.includes(x.taskKey)?'answered ':''}`}>{subject==='Mathematics'?x.number:String.fromCharCode(65+x.number-1)}</button>)}</div><small>{selectedExtended.length}/{required} selected</small><button className="back-objective" onClick={async()=>{await persistExtended();setPhase('OBJECTIVE');setI(paper.questions.length-1)}}>← Back to Paper 1</button></aside><section className="exam-question extended-question"><div className="exam-topic">{task.type==='MATH_THEORY'?`Theory Question ${task.number} · ${task.maxMarks} marks`:`Composition Option ${String.fromCharCode(64+task.number)} · ${task.maxMarks} marks`}</div><h1>{task.prompt}</h1><button type="button" className={selected?'extended-select selected':'extended-select'} onClick={toggle}>{selected?'✓ Selected for marking':selectedExtended.length>=required?`You have selected ${required} — deselect one to change`:'Select this question for marking'}</button>{selected&&<div className="exam-input extended-input"><label>{task.type==='MATH_THEORY'?'Show your full working and final answers':'Write your full composition'}</label><textarea rows={task.type==='MATH_THEORY'?12:18} value={extendedAnswers[task.taskKey]||''} onChange={e=>{setExtendedAnswers(v=>({...v,[task.taskKey]:e.target.value}));setError('')}} onBlur={()=>saveExtended(task,extendedAnswers[task.taskKey]||'')} placeholder={task.type==='MATH_THEORY'?'Write each part clearly. Show formulas, substitutions, working and units.':'Write your complete response here. AVORA will mark it criterion by criterion.'}/></div>}{error&&<p className="exam-error">{error}</p>}<footer><span className="extended-rule">Only selected responses are marked. Partial credit is available for valid working.</span><div><button disabled={extendedIndex===0||busy} onClick={async()=>{await persistExtended();setExtendedIndex(x=>Math.max(0,x-1))}}>Previous</button>{extendedIndex<tasks.length-1?<button className="next" disabled={busy} onClick={async()=>{await persistExtended();setExtendedIndex(x=>Math.min(tasks.length-1,x+1))}}>Next</button>:<button className="next" disabled={busy} onClick={()=>finish()}>{busy?'Marking…':'Submit full mock'}</button>}</div></footer></section></div></main>;
 }

 return <main className="exam-session"><header className="exam-bar"><div><strong>{paper.examLabel||examLabel} · {subject}{paper.reference?.year?` · ${paper.reference.year}`:''}</strong><span>Question {i+1} of {total}{paper.reference?.year?' · referenced-year practice':''}</span></div><time>{mm}:{ss}</time><button disabled={busy} onClick={()=>finish()}>{busy?'Submitting…':'Submit'}</button></header><div className="exam-work"><aside className="question-nav"><strong>Questions</strong><div>{paper.questions.map((x:Q,n:number)=><button key={x.id} onClick={()=>goTo(n)} className={`${n===i?'active ':''}${answers[x.id]?'answered ':''}${flags[x.id]?'flagged':''}`}>{n+1}</button>)}</div>{flaggedCount>0&&<small>{flaggedCount} flagged for review</small>}</aside><section className="exam-question"><div className="exam-topic">{q.topic}</div><h1>{q.prompt}</h1>{q.type==='MULTIPLE_CHOICE'&&Array.isArray(q.options)&&q.options.length?<div className="exam-options">{q.options.map((o,j)=><button key={o} className={answers[q.id]===o?'chosen':''} onClick={()=>setAnswers(v=>({...v,[q.id]:o}))}><b>{String.fromCharCode(65+j)}</b><span>{o}</span></button>)}</div>:<div className="exam-input"><label>Your answer</label><input value={answers[q.id]||''} onChange={e=>{setAnswers(v=>({...v,[q.id]:e.target.value}));setError('')}} /></div>}{error&&<p className="exam-error">{error}</p>}{reviewOpen&&<div className="exam-review-notice"><strong>Review before submitting</strong><p>{unansweredCount} unanswered · {flaggedCount} flagged. Flagged questions are reminders for you to revisit; they do not change your score by themselves.</p><div>{flaggedCount>0&&<button onClick={()=>{const n=paper.questions.findIndex((x:Q)=>flags[x.id]);if(n>=0){setReviewOpen(false);setI(n)}}}>Go to first flagged</button>}<button className="next" onClick={()=>finish(true)}>Submit anyway</button></div></div>}<footer><button className="quiet-exam" onClick={()=>setFlags(v=>({...v,[q.id]:!v[q.id]}))}>{flags[q.id]?'✓ Flagged — remove flag':'Flag for review'}</button><div><button disabled={i===0||busy} onClick={()=>goTo(i-1)}>Previous</button>{i===total-1?(paper.extendedTasks?.length?<button className="next" disabled={busy} onClick={async()=>{if(await persistCurrent()){setPhase('EXTENDED');setExtendedIndex(0)}}}>Continue to {subject==='Mathematics'?'Paper 2':'Composition'} →</button>:<button className="next" disabled={busy} onClick={()=>finish()}>{busy?'Submitting…':'Submit assessment'}</button>):<button className="next" disabled={busy} onClick={()=>goTo(i+1)}>Next</button>}</div></footer></section></div></main>;
}