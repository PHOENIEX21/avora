import fs from 'node:fs';

const lesson=fs.readFileSync('lib/jss1MathematicsDeepLessons.ts','utf8');
const bank=JSON.parse(fs.readFileSync('data/jss1-jss2-assessment-bank.json','utf8'));
const exerciseRuntime=fs.readFileSync('lib/nerdc2025Exercises.ts','utf8');
const stepEngine=fs.readFileSync('lib/lessonStepEngine.ts','utf8');
const tutor=fs.readFileSync('components/TutorClient.tsx','utf8');
const css=fs.readFileSync('app/globals.css','utf8');
const telemetry=fs.readFileSync('lib/telemetry.ts','utf8');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));

const wanted=[
 'Whole Numbers','LCM (Least Common Multiple)','HCF (Highest Common Factor)','Counting in Base 2',
 'Conversion of Base 10 Numerals to Binary Numbers','Fractions: Types, Simplification and Equivalent Fractions',
 'Addition and Subtraction of Fractions','Multiplication and Division of Fractions',
];
const all=bank.questions||[];
const replacements=all.filter(q=>q.classLevel==='JSS1'&&q.subject==='Mathematics'&&wanted.includes(q.topic)&&String(q.id||'').startsWith('avora-rebuild-v1-jss1-math-'));
const byTopic=Object.fromEntries(wanted.map(t=>[t,replacements.filter(q=>q.topic===t).length]));
const ids=all.map(q=>q.id);
const deepTopicCount=(lesson.match(/topicId:'/g)||[]).length;
const lazy=replacements.filter(q=>/^The correct answer is\b/i.test(String(q.explanation||'').trim()));
const validOptions=replacements.every(q=>Array.isArray(q.options)&&q.options.length===4&&q.options.includes(q.correctAnswer)&&new Set(q.options).size===4);
const substantive=replacements.every(q=>String(q.explanation||'').trim().length>=20);
const hasExactDirectedBank=all.some(q=>q.classLevel==='JSS1'&&q.subject==='Mathematics'&&q.topic==='Addition and Subtraction');

const checks=[
 ['release is V14.9.2',pkg.version==='14.9.2'],
 ['JSS1 deep lesson export retained',lesson.includes('export const')&&lesson.includes('jss1MathematicsDeepLessons')&&lesson.includes('DeepMathLesson[]')],
 ['all 24 rebuilt JSS1 Mathematics evidence lessons are present',deepTopicCount===24],
 ['assessment bank total remains 888',all.length===888],
 ['assessment-bank IDs remain unique',new Set(ids).size===ids.length],
 ['exactly 64 rebuilt questions are present',replacements.length===64],
 ['each of the eight replacement topics has exactly eight rebuilt questions',wanted.every(t=>byTopic[t]===8)],
 ['all replacement questions have four unique options and a valid correct answer',validOptions],
 ['all replacement explanations are substantive',substantive],
 ['no rebuilt explanation uses the old lazy placeholder',lazy.length===0],
 ['directed-number Addition and Subtraction still has no invented exact bank topic',!hasExactDirectedBank],
 ['exercise runtime explicitly guards the known directed-number gap',exerciseRuntime.includes('hasKnownNerdcAssessmentGap')&&exerciseRuntime.includes("topic)==='Addition and Subtraction'")&&exerciseRuntime.includes('if(hasKnownNerdcAssessmentGap(classLevel,subject,topic))return [];')],
 ['long authored teaching is split into readable slides without summarising away source',stepEngine.includes('splitTeachingSlides')&&stepEngine.includes('SLIDE_TARGET')&&stepEngine.includes('SLIDE_HARD_MAX')],
 ['Tutor labels slide position and keeps Previous/Next navigation',tutor.includes('TEACHING SLIDE')&&tutor.includes('teaching-slide-controls-v1492')&&tutor.includes('← Previous')&&tutor.includes('Next →')],
 ['Tutor auto-focuses the current teaching slide/question',tutor.includes("scrollIntoView({behavior:'smooth',block:'start'})")],
 ['Tutor shows an honest reviewed-assessment-pending state for the gap',tutor.includes('TEACHING COVERAGE COMPLETE · REVIEWED EXERCISE PENDING')&&tutor.includes('will not substitute a different whole-number skill')],
 ['gold exercise progress and fixed action UI are present',tutor.includes('exercise-progress-v1492')&&tutor.includes('exercise-fixed-actions-v1492')],
 ['gold exercise styling is present',css.includes('.tutor-exercise-mode-v1492 .nerdc-topic-exercise')&&css.includes('#cfae49')&&css.includes('linear-gradient(135deg,#8a681d,#b58b2a)')],
 ['slide controls are fixed and mobile safe-area aware',css.includes('.teaching-slide-controls-v1492{position:fixed!important')&&css.includes('env(safe-area-inset-bottom)')],
 ['teaching copy is bold and responsive',css.includes('.avora-teacher-copy p')&&css.includes('font-weight:650')&&css.includes('clamp(')],
 ['exercise telemetry build fix is retained',telemetry.includes("'TUTOR_TOPIC_EXERCISE_STARTED'")&&telemetry.includes("'TUTOR_TOPIC_EXERCISE_COMPLETED'")&&telemetry.includes("'questions','score','total'")],
];
let failures=0;
for(const [name,pass] of checks){console.log(`${pass?'✓':'✗'} ${name}`);if(!pass)failures++;}
console.log(`V14.9.2 JSS1 Mathematics slide/gold audit: ${checks.length-failures}/${checks.length}`);
if(failures)process.exit(1);
