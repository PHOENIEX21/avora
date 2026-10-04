import fs from 'node:fs';
import {jss1MathematicsDeepLessons} from '../lib/jss1MathematicsDeepLessons.ts';

const root=new URL('../',import.meta.url);
const read=path=>fs.readFileSync(new URL(path,root),'utf8');
const bank=JSON.parse(read('data/jss1-jss2-assessment-bank.json'));
const tutor=read('components/TutorClient.tsx');
const css=read('app/globals.css');
const pkg=JSON.parse(read('package.json'));
const targetTopics=[
 'Whole Numbers','LCM (Least Common Multiple)','HCF (Highest Common Factor)','Counting in Base 2',
 'Conversion of Base 10 Numerals to Binary Numbers','Fractions: Types, Simplification and Equivalent Fractions',
 'Addition and Subtraction of Fractions','Multiplication and Division of Fractions'
];
let pass=0,fail=0;
function check(ok,label){if(ok){pass++;console.log(`PASS ${label}`)}else{fail++;console.error(`FAIL ${label}`)}}
check(pkg.version==='14.9.2','package version is 14.9.2');
check(jss1MathematicsDeepLessons.length===24,'24 complete JSS1 Mathematics deep lessons');
check(jss1MathematicsDeepLessons.every(x=>x.objectives.length>=1&&x.teaching.length>=5&&x.workedExamples.length>=6&&x.guidedPractice.length>=3&&x.independentPractice.length>=12&&x.misconceptions.length>=5),'every JSS1 Math lesson meets rebuilt depth floor');
check(jss1MathematicsDeepLessons.every(x=>x.boardReady===true&&x.mastery?.status==='DEEP_WHEN_PASSED'),'all JSS1 Math lessons remain board-ready with explicit mastery standard');
check(bank.questions.length===888,'assessment bank remains 888 questions');
const selected=bank.questions.filter(q=>q.classLevel==='JSS1'&&q.subject==='Mathematics'&&targetTopics.includes(q.topic));
check(selected.length===64,'exactly 64 target JSS1 Math questions present');
check(targetTopics.every(t=>selected.filter(q=>q.topic===t).length===8),'8 replacement questions exist for each target topic');
check(selected.every(q=>String(q.id).startsWith('avora-rebuild-v1-jss1-math-')),'all target questions are the rebuilt reviewed entries');
check(selected.every(q=>Array.isArray(q.options)&&q.options.length===4&&new Set(q.options).size===4&&q.options.includes(q.correctAnswer)),'all target MCQs have four distinct options and a valid correct answer');
check(selected.every(q=>q.qualityStatus==='REVIEWED'&&q.contentOrigin==='AVORA_ORIGINAL'),'all target questions retain reviewed/original metadata');
check(selected.every(q=>String(q.explanation||'').length>=20&&!/^The correct answer is\b/i.test(String(q.explanation||''))),'all target questions have worked explanations, not answer-only placeholders');
check(!bank.questions.some(q=>q.classLevel==='JSS1'&&q.subject==='Mathematics'&&/directed numbers|^addition and subtraction$/i.test(String(q.topic||''))),'known directed-number bank gap remains explicit; no inaccurate mapping was invented');
check(/lessonSlideChunks/.test(tutor)&&/onTouchStart=\{handleLessonTouchStart\}/.test(tutor)&&/onTouchEnd=\{handleLessonTouchEnd\}/.test(tutor),'Tutor has slide chunking and mobile swipe navigation');
check(/lesson-slide-strip-v1492/.test(tutor)&&/goToVisitedSlide/.test(tutor)&&/maxVisitedEventIndex/.test(tutor),'Tutor lets learners tap back to previously visited slides');
check(/lesson-slide-controls-v1492/.test(tutor)&&/← Previous/.test(tutor)&&/>Next →</.test(tutor),'Previous/Next slide controls are explicit and persistent');
check(/position:fixed/.test(css)&&/lesson-slide-controls-v1492/.test(css),'mobile slide controls stay visible without scrolling');
check(/nerdc-topic-exercise\{border:2px solid #d6a84b/.test(css)&&/exercise-question-strip-v1492/.test(css),'end-of-topic MCQ experience uses premium gold visual treatment');
check(/phase!==?'teach'/.test(tutor)||/phase!='teach'/.test(tutor)||/phase!=='teach'/.test(tutor),'full curriculum objective block is shown before teaching rather than consuming slide space');
console.log(`\nV14.9.2 JSS1 Math + slide UI audit: ${pass} passed, ${fail} failed`);
if(fail)process.exit(1);
