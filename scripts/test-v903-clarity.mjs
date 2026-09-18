import fs from 'node:fs';
const tutor=fs.readFileSync('components/TutorClient.tsx','utf8');
const check=fs.readFileSync('app/api/tutor/check/route.ts','utf8');
const exam=fs.readFileSync('components/ExamClient.tsx','utf8');
const css=fs.readFileSync('app/globals.css','utf8');
const tests=[
 ['aligned practice selector',tutor.includes('questionFit(q,unit)')&&tutor.includes('score>=1')],
 ['unmatched reviewed question is skipped',tutor.includes('else if(guidedQ)setPhase')&&tutor.includes('else continueAfterGuided()')],
 ['checkpoint has explicit expectation',tutor.includes('What AVORA wants you to do')&&tutor.includes('event.expectation')],
 ['checkpoint help is attempt-first',tutor.includes('checkpointReply&&<div className="checkpoint-help-actions"')&&tutor.includes('Explain my first gap')&&tutor.includes('Teach this from my attempt')&&!tutor.includes('Show me a model answer')],
 ['guided diagnosis is based on submitted attempt',tutor.includes('feedback&&<div className="question-help-row"')&&tutor.includes('Explain from my attempt')&&tutor.includes('My attempt was: ${answer}')],
 ['guided full reveal requires prior hint',tutor.includes('(!feedback.correct&&questionHelp)')&&tutor.includes('Show the full worked solution after the hint')&&check.includes('correctAnswer')&&check.includes('reveal')],
 ['learner answer shown in feedback',tutor.includes('<strong>Your answer:</strong> {answer}')],
 ['generic duplicate checkpoint removed',!tutor.includes("kind:'check',label:'GUIDED VARIATION — YOUR TURN'")],
 ['year selector is explicitly visible',exam.includes('exam-year-select')&&css.includes('.exam-year-select')],
 ['student-facing past-year copy simplified',exam.includes('About these questions')&&!exam.includes('exact-paper rights are cleared')],
];
let fail=0;
for(const [name,ok] of tests){console.log(`${ok?'✓':'✗'} ${name}`);if(!ok)fail++}
if(fail){console.error(`\nV9.0.3 clarity tests FAILED: ${fail}`);process.exit(1)}
console.log(`\nV9.0.3 clarity tests passed: ${tests.length}/${tests.length}`);
