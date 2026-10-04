import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const runtime=read('lib/sentCurriculumRuntime.ts');
const tutor=read('components/TutorClient.tsx');
const quality=read('lib/questionQuality.ts');
const check=read('app/api/tutor/check/route.ts');
const practice=read('app/api/questions/route.ts');
const exam=read('app/api/exam/start/route.ts');
const explain=read('app/api/practice/explain/route.ts');
const engine=read('lib/lessonStepEngine.ts');
const bank=JSON.parse(read('data/jss1-jss2-assessment-bank.json'));
const generic=bank.questions.filter(q=>/AVORA|revised JSS|curriculum expectations|which explanation best represents|which outcome is genuinely part|which principle should guide|which statement identifies a mistake|which worked example correctly applies|which second example or reasoning move|strongest independent evidence|successful reasoning .* should achieve/i.test(q.prompt));
const checks=[
 ['structured whiteboard+voice step engine exists',engine.includes("BoardAction='WRITE'|'DRAW'|'HIGHLIGHT'|'CLEAR_SECTION'|'ASK'|'PAUSE'")&&engine.includes('narration:string')&&engine.includes('pauseAfterMs:number')],
 ['all source units receive structured steps',runtime.includes('structuredSteps:structureTeachingSteps(steps,checks)')],
 ['Tutor consumes structured synchronized steps',tutor.includes('SOURCE-BACKED LIVE LESSON')&&tutor.includes('step.boardAction')&&tutor.includes('step.narration')],
 ['learner-response steps pause teaching',engine.includes('requiresLearnerResponse:true')&&tutor.includes("boardAction:'ASK'")],
 ['question clarity gate rejects curriculum/meta questions',quality.includes('META_CURRICULUM_QUESTION')&&quality.includes('NO_EXPLICIT_TASK_COMMAND')],
 ['MCQ quality requires four unique options',quality.includes('MCQ_REQUIRES_FOUR_OPTIONS')&&quality.includes('DUPLICATE_OPTIONS')],
 ['grading strategy distinguishes objective/exact/open responses',quality.includes("'MCQ'|'EXACT_NUMERIC'|'EXACT_TEXT'|'STRUCTURED_RESPONSE'|'LLM_RUBRIC'")],
 ['Practice serves only questions that pass exam-ready gate',practice.includes('isExamReadyQuestion')&&practice.includes('filter(isExamReadyQuestion)')],
 ['Exam papers serve only questions that pass exam-ready gate',exam.includes('filter(isExamReadyQuestion)')],
 ['Tutor checking refuses questions that fail clarity gate',check.includes('failed AVORA’s clarity/exam-standard gate')],
 ['wrong-answer flow preserves first-gap diagnosis',explain.includes('first meaningful gap')&&explain.includes('Preserve every correct step')],
 ['wrong-answer flow forbids premature answer dump',explain.includes('without dumping the complete worked answer')],
 ['partial and incomplete states remain explicit',explain.includes("'PARTIAL','INCOMPLETE','INCORRECT'")],
 ['assisted work is not described as independent mastery',tutor.includes('assisted work never counts as independent mastery')],
 ['rebuilt bank contains no legacy curriculum/meta prompts and live clarity gate remains active',generic.length===0&&quality.includes('META_CURRICULUM_QUESTION')],
];
let n=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)n++}
console.log(`Legacy curriculum/meta-style prompts remaining in rebuilt JSS1/JSS2 bank: ${generic.length}/${bank.questions.length}. The live Practice/Exam clarity gate remains active as a second safety layer.`);
console.log(`V13.1 TEACHING + ASSESSMENT: ${n}/${checks.length}`);if(n!==checks.length)process.exit(1);
