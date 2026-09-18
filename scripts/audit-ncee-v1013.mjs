import fs from 'node:fs';
const root=new URL('../',import.meta.url);const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const rich=read('lib/nceeRichTeaching.ts'),sourceRuntime=read('lib/nceeSourceRuntime.ts'),page=read('app/common-entrance/learn/[topic]/page.tsx'),limits=read('lib/trialLimits.ts'),questions=read('app/api/questions/route.ts'),ncee=read('app/api/common-entrance/mock/start/route.ts'),exam=read('app/api/exam/start/route.ts'),migration=read('database/migrations/023_trial_question_allowance.sql');
const checks=[
 ['concrete reviewed examples',rich.includes('slice(0,5)')&&rich.includes('needs at least five concrete reviewed examples')],
 ['topic big idea + why',rich.includes('bigIdea')&&rich.includes('whyItWorks')],
 ['eight-stage teaching',rich.includes("8 · Mastery or reteach")],
 ['misconception repair',rich.includes('misconceptionRepairs')],
 ['lesson UI renders source teaching + board + checks',page.includes('AVORA teaches it in order')&&page.includes('ncee-mini-board')&&page.includes('Your turn')&&sourceRuntime.includes('worked-example')],
 ['trial allowance 150',limits.includes('TRIAL_QUESTION_ALLOWANCE=150')],
 ['one NCEE full mock',limits.includes('TRIAL_NCEE_FULL_MOCK_LIMIT=1')],
 ['one JSS full mock',limits.includes('TRIAL_JSS_FULL_MOCK_LIMIT=1')],
 ['diagnostic separate',questions.includes('diagnosticIncluded:true')&&!questions.includes('continue practice and diagnostics')],
 ['NCEE mock quota',ncee.includes("trialAssessmentCount(s.userId,'NCEE_FULL_MOCK')")&&ncee.includes("reserveTrialQuestions(s.userId,'NCEE_MOCK',ids)")],
 ['JSS mock quota',exam.includes("trialAssessmentCount(s.userId,'JSS_FULL_MOCK')")&&exam.includes("reserveTrialQuestions(s.userId,'JSS_EXAM',ids.map(String))")],
 ['practice quota',questions.includes("reserveTrialQuestions(session.userId,'PRACTICE',[String(r.id)])")],
 ['identity-bound ledger',migration.includes('UNIQUE(student_id, question_key)')],
];
let ok=0;for(const [n,p] of checks){console.log(`${p?'PASS':'FAIL'} ${n}`);if(p)ok++}console.log(`\nNCEE V10.13 deep teaching + trial allowance: ${ok}/${checks.length}`);if(ok!==checks.length)process.exit(1);
