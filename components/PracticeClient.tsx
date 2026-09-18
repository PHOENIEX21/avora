'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { readJson } from '@/lib/clientFetch';

type Step = { prompt: string; inputLabel: string };
type Q = {
  id: string;
  prompt: string;
  questionType: string;
  options: string[] | null;
  skillName: string;
  topicName: string;
  difficulty: number;
  hint?: string;
  guided?: boolean;
  steps?: Step[];
};
type Context = {
  exam: string;
  subject: string;
  topic?: string;
  skill?: string;
  group?: string;
  answered?: number;
  minimumEvidence?: number;
};

export default function PracticeClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const mode = sp.get('mode') === 'diagnostic' ? 'DIAGNOSTIC' : 'PRACTICE';
  const requestedTopic = sp.get('topic') || '';

  const [q, setQ] = useState<Q | null>(null);
  const [context, setContext] = useState<Context | null>(null);
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState(false);
  const [lessonReady, setLessonReady] = useState(false);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<any>(null);
  const [hint, setHint] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [stepAnswer, setStepAnswer] = useState('');
  const [stepFeedback, setStepFeedback] = useState<any>(null);
  const [stepHints, setStepHints] = useState(0);
  const [exerciseHelp, setExerciseHelp] = useState<any>(null);
  const [explainingExercise, setExplainingExercise] = useState(false);

  const sessionTarget = mode === 'DIAGNOSTIC' ? (context?.minimumEvidence || 5) : 5;

  async function load() {
    setLoading(true);
    setError('');
    setResult(null);
    setAnswer('');
    setHint(false);
    setStepIndex(0);
    setStepAnswer('');
    setStepFeedback(null);
    setStepHints(0);
    setExerciseHelp(null);
    try {
      const r = await fetch(`/api/questions?mode=${mode.toLowerCase()}${requestedTopic ? '&topic=' + encodeURIComponent(requestedTopic) : ''}`, { cache: 'no-store' });
      const d = await readJson<any>(r);
      if (!r.ok) throw new Error(d.error || 'Could not load a question.');
      setContext(d.context || null);
      setLessonReady(Boolean(d.lessonReady));
      if (d.complete || !d.question) {
        setQ(null);
        setComplete(true);
      } else {
        setQ(d.question);
        setComplete(false);
        setLessonReady(false);
      }
    } catch (e: any) {
      setError(e.message || 'AVORA could not load your next question.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setCount(0);
    setComplete(false);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedTopic, mode]);

  async function submit(v: string, retrySave = false) {
    if (!q || (result && !retrySave) || submitting) return;
    setAnswer(v);
    setSubmitting(true);
    setError('');
    try {
      const r = await fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, answer: v, mode, hintCount: (hint ? 1 : 0) + stepHints }),
      });
      const d = await readJson<any>(r);
      if (!r.ok) throw new Error(d.error || 'Could not save this answer.');
      setResult(d);
      if (d.saved !== false && !d.assisted) setCount(c => c + 1);
    } catch (e: any) {
      setError(e.message || 'Could not save this answer.');
    } finally {
      setSubmitting(false);
    }
  }

  async function checkStep() {
    if (!q || !stepAnswer.trim() || submitting) return;
    setError('');
    setSubmitting(true);
    try {
      const r = await fetch('/api/practice/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, stepIndex, answer: stepAnswer }),
      });
      const d = await readJson<any>(r);
      if (!r.ok) throw new Error(d.error || 'Could not check that step.');
      setStepFeedback(d);
      if (d.correct) {
        if (stepIndex === (q.steps?.length || 1) - 1) {
          setSubmitting(false);
          await submit(stepAnswer);
          return;
        }
        setTimeout(() => {
          setStepIndex(i => i + 1);
          setStepAnswer('');
          setStepFeedback(null);
        }, 350);
      }
    } catch (e: any) {
      setError(e.message || 'Could not check that step.');
    } finally {
      setSubmitting(false);
    }
  }


  async function explainExercise() {
    if (!q || !result || result.correct || !answer.trim() || explainingExercise) return;
    setExplainingExercise(true);
    setError('');
    try {
      const r = await fetch('/api/practice/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, answer }),
      });
      const d = await readJson<any>(r);
      if (!r.ok) throw new Error(d.error || 'Could not explain this exercise.');
      setExerciseHelp(d);
      setStepHints(h => h + 1);
    } catch (e: any) {
      setError(e.message || 'Could not explain this exercise.');
    } finally {
      setExplainingExercise(false);
    }
  }

  function retryAfterHelp() {
    setResult(null);
    setExerciseHelp(null);
  }

  async function finishDiagnostic() {
    setError('');
    setSubmitting(true);
    try {
      const r = await fetch('/api/diagnostic/complete', { method: 'POST' });
      const d = await readJson<any>(r);
      if (!r.ok) throw new Error(d.error || 'Could not finish diagnostic.');
      router.replace('/welcome?diagnostic=complete');
      router.refresh();
    } catch (e: any) {
      setError(e.message || 'Could not finish diagnostic.');
      setSubmitting(false);
    }
  }

  function finishPracticeSession() {
    setQ(null);
    setComplete(true);
    setLessonReady(Boolean(requestedTopic));
  }

  if (loading) return <div className="practice-stage"><p>AVORA is choosing the next useful question…</p></div>;

  if (error && !q && !complete) return <div className="practice-stage recovery"><h2>We lost the connection for a moment.</h2><p>{error}</p><button className="primary-action" onClick={load}>Try again</button></div>;

  if (complete) return <div className="practice-stage practice-complete">
    <span className="flow-label">{mode === 'DIAGNOSTIC' ? 'STARTING POINT FOUND' : lessonReady ? 'READY FOR YOUR LESSON' : 'PRACTICE COMPLETE'}</span>
    <h2>{mode === 'DIAGNOSTIC' ? 'AVORA has enough evidence for now.' : lessonReady ? `You’ve completed this ${context?.topic || requestedTopic} practice set.` : 'You completed this practice set.'}</h2>
    <p>{mode === 'DIAGNOSTIC' ? 'This is a starting estimate, not a permanent label. Your learning direction will keep changing as you improve.' : lessonReady ? `AVORA can now teach ${context?.topic || requestedTopic} using the evidence from these ${count} focused questions.` : `You answered ${count} questions in this session. AVORA has saved the evidence and can use it to adapt what comes next.`}</p>
    {error && <p className="flow-error">{error}</p>}
    {mode === 'DIAGNOSTIC' ? <button className="primary-action" disabled={submitting} onClick={finishDiagnostic}>{submitting ? 'Saving…' : 'See my learning direction'}</button> : lessonReady ? <button className="primary-action" onClick={() => router.push('/tutor?topic=' + encodeURIComponent(context?.topic || requestedTopic))}>Continue to my lesson →</button> : <button className="primary-action" onClick={() => { setCount(0); setComplete(false); load(); }}>Start another 5-question set</button>}
  </div>;

  if (!q) return null;
  // Answer-first contract: guided teaching is unlocked only after AVORA has seen the learner's own attempt.
  const guided = false;
  const shownCount = Math.min(sessionTarget, count);
  const sessionFinished = mode === 'PRACTICE' && count >= sessionTarget;

  return <section className="practice-stage">
    {mode === 'PRACTICE' && context && <header className="learning-context">
      <span>{context.exam} · {context.subject}</span>
      <h1>{context.topic}</h1>
      <p>Current skill: <strong>{context.skill}</strong></p>
      <div className="evidence-meter">
        <i style={{ width: `${Math.min(100, (shownCount / sessionTarget) * 100)}%` }} />
        <span>{shownCount} of {sessionTarget} questions in this practice set</span>
      </div>
    </header>}

    <div className="practice-meta"><span>{mode === 'DIAGNOSTIC' ? 'DIAGNOSTIC' : 'FOCUSED PRACTICE'}</span><span>{q.skillName}</span><span>Level {q.difficulty}</span></div>
    <h2 className="practice-prompt">{q.prompt}</h2>

    {guided && !result ? <div className="live-solve">
      <div className="step-rail"><b>{stepIndex + 1}</b><span>of {q.steps!.length} reasoning steps</span></div>
      <h3>{q.steps![stepIndex].prompt}</h3>
      <label>{q.steps![stepIndex].inputLabel}</label>
      <div className="step-entry"><input value={stepAnswer} onChange={e => setStepAnswer(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') checkStep(); }} autoFocus /><button disabled={submitting} onClick={checkStep}>{submitting ? 'Checking…' : 'Check step'}</button></div>
      {stepFeedback && <div className={stepFeedback.correct ? 'step-feedback correct' : 'step-feedback'}><strong>{stepFeedback.correct ? 'That step works.' : 'Look again.'}</strong><p>{stepFeedback.feedback}</p>{!stepFeedback.correct && stepFeedback.hint && <button className="hint-action" onClick={() => { setStepHints(h => h + 1); setStepFeedback({ ...stepFeedback, showHint: true }); }}>Give me a clue</button>}{stepFeedback.showHint && <p className="guided-hint">{stepFeedback.hint}</p>}</div>}
    </div> : !result && <>
      {Array.isArray(q.options) && q.options.length ? <div className="answer-lines">{q.options.map(o => <button key={o} disabled={submitting} onClick={() => submit(o)} className={answer === o ? 'answer-line chosen' : 'answer-line'}><span>{o}</span></button>)}</div> : <form onSubmit={e => { e.preventDefault(); submit(answer); }} className="short-answer"><label>Show your answer or working. AVORA checks what you actually tried.</label><textarea rows={5} value={answer} onChange={e => setAnswer(e.target.value)} autoFocus placeholder="Type your answer or show the steps you have reached so far…"/><button className="primary-action" disabled={!answer.trim() || submitting}>{submitting ? 'Checking…' : 'Check my thinking'}</button></form>}
      {mode === 'PRACTICE' && <p className="attempt-first-note">Attempt first. AVORA unlocks targeted teaching after it has seen your own thinking.</p>}
    </>}

    {error && <p className="flow-error">{error}</p>}
    {result && <div className="thinking-response">
      <span className={result.correct ? 'response-state good' : 'response-state'}>{result.correct ? '✓ CORRECT' : '✗ NOT CORRECT YET'}</span>
      <h3>{result.correct ? 'Correct answer. Now prove the skill again.' : 'This answer is not correct yet. Keep the problem — change the thinking.'}</h3>
      <p>{result.diagnosis}</p>
      {result.saved === false && <div className="evidence-save-warning"><strong>Your answer was marked, but the evidence was not saved.</strong><p>{result.saveMessage || 'AVORA could not save this attempt yet.'}</p><button className="secondary-practice-action" disabled={submitting} onClick={() => submit(answer, true)}>{submitting ? 'Saving…' : 'Retry saving evidence'}</button></div>}
      {!result.correct && mode === 'PRACTICE' && <div className="remediation-note"><strong>Your attempt comes first.</strong><p>AVORA will keep every correct part, locate the first meaningful gap, and teach from there without dumping the final answer.</p><button className="explain-exercise-action" disabled={explainingExercise} onClick={explainExercise}>{explainingExercise ? 'AVORA is studying your attempt…' : 'Explain this exercise from my attempt'}</button></div>}
      {exerciseHelp && !result.correct && <div className="exercise-help-panel"><span>{exerciseHelp.state === 'PARTIAL' ? 'PARTLY RIGHT — KEEP GOING' : exerciseHelp.state === 'INCOMPLETE' ? 'RIGHT DIRECTION — NOT FINISHED' : 'FIRST GAP FOUND'}</span><h4>{exerciseHelp.message}</h4>{Array.isArray(exerciseHelp.board)&&exerciseHelp.board.length>0&&<div className="exercise-help-board">{exerciseHelp.board.map((line:string,i:number)=><div key={i}>{line}</div>)}</div>}<p><strong>Your next move:</strong> {exerciseHelp.nextPrompt}</p><button className="primary-action" onClick={retryAfterHelp}>Let me continue my own answer</button></div>}
      {result.saved === false ? null : sessionFinished ? <button className="primary-action" onClick={()=>requestedTopic?router.push('/tutor?topic='+encodeURIComponent(context?.topic||requestedTopic)):finishPracticeSession()}>{requestedTopic ? 'Finish practice & continue to lesson →' : 'Finish practice'}</button> : result.correct ? <button className="primary-action" onClick={load}>{mode === 'DIAGNOSTIC' ? 'Next question' : 'Next question'}</button> : !exerciseHelp && <button className="secondary-practice-action" onClick={load}>{mode === 'DIAGNOSTIC' ? 'Next question' : 'Try a different question instead'}</button>}
    </div>}

    <div className="practice-foot">{mode === 'DIAGNOSTIC' ? `${count} answered · mistakes help AVORA choose where to begin` : 'This counter tracks only this practice set. Older attempts remain in your mastery history, but never inflate the on-screen question count.'}</div>
  </section>;
}
