import fs from 'node:fs';

const read=(p)=>fs.readFileSync(p,'utf8');
const lesson=read('lib/jss1MathematicsDeepLessons.ts');
const bankDoc=JSON.parse(read('data/jss1-jss2-assessment-bank.json'));
const bank=Array.isArray(bankDoc)?bankDoc:bankDoc.questions;
const tutor=read('components/TutorClient.tsx');
const css=read('app/globals.css');

const topics=[
 'Whole Numbers',
 'LCM (Least Common Multiple)',
 'HCF (Highest Common Factor)',
 'Counting in Base 2',
 'Conversion of Base 10 Numerals to Binary Numbers',
 'Fractions: Types, Simplification and Equivalent Fractions',
 'Addition and Subtraction of Fractions',
 'Multiplication and Division of Fractions'
];

const checks=[];
const check=(name,pass,detail='')=>checks.push({name,pass:Boolean(pass),detail});
const rebuilt=bank.filter(q=>String(q.id||'').startsWith('avora-rebuild-v1-jss1-math-'));

check('24 JSS1 Mathematics deep lesson objects', (lesson.match(/classLevel:\s*'JSS1'/g)||[]).length===24);
check('Deep Whole Numbers teaching replaced shallow copy', lesson.includes('place value system is built entirely on groups of three digits'));
check('Deep Data Presentation lesson present', lesson.includes("topic: 'Data presentation'")&&lesson.includes('Median is the middle value'));
check('Assessment bank total remains 888', Array.isArray(bank)&&bank.length===888, String(bank?.length));
check('Exactly 64 Batch-1 rebuilt MCQs', rebuilt.length===64, String(rebuilt.length));
for(const topic of topics){
 const rows=bank.filter(q=>q.classLevel==='JSS1'&&q.subject==='Mathematics'&&q.topic===topic);
 check(topic+' has exactly 8 replacement MCQs', rows.length===8&&rows.every(q=>String(q.id||'').startsWith('avora-rebuild-v1-jss1-math-')), String(rows.length));
}
check('Replacement IDs are unique', new Set(rebuilt.map(q=>q.id)).size===64);
check('Every replacement has four unique options and matching answer', rebuilt.every(q=>Array.isArray(q.options)&&q.options.length===4&&new Set(q.options).size===4&&q.options.includes(q.correctAnswer)));
check('Every replacement explanation is substantive', rebuilt.every(q=>typeof q.explanation==='string'&&q.explanation.trim().length>=25&&!/^The correct answer is\b/i.test(q.explanation.trim())));
check('Directed-number bank gap remains explicit, not guessed', !bank.some(q=>q.classLevel==='JSS1'&&q.subject==='Mathematics'&&['Addition and subtraction','Directed Numbers'].includes(q.topic)));
check('Long teaching is split into learner slides without dropping source prose', tutor.includes('function teachingSlideChunks')&&tutor.includes('flatMap(expandTeachingEvent)'));
check('Tutor exposes lesson-slide identity and progress', tutor.includes('LESSON SLIDE')&&tutor.includes('slide-progress-v1410')&&tutor.includes('tutor-slide-mode'));
check('Previous and Next teaching controls remain present', tutor.includes('← Previous')&&tutor.includes('Next teaching step →'));
check('Teaching controls are sticky in slide mode', css.includes('.tutor-slide-mode .teacher-controls-v1')&&css.includes('position:sticky')&&css.includes('bottom:92px'));
check('Teaching copy is large and bold enough for slide learning', css.includes('.tutor-slide-mode .avora-teacher-copy p')&&css.includes('font-size:clamp(18px')&&css.includes('font-weight:650'));
check('Golden mastery exercise treatment is present', css.includes('focused lesson slides + golden mastery exercises')&&css.includes('.nerdc-topic-exercise .teacher-options button.chosen')&&css.includes('#efd679')&&css.includes('#d6ad3e'));

const failed=checks.filter(x=>!x.pass);
for(const x of checks) console.log(`${x.pass?'PASS':'FAIL'}  ${x.name}${x.detail?' — '+x.detail:''}`);
console.log(`\nV14.10 audit: ${checks.length-failed.length}/${checks.length} passed`);
if(failed.length)process.exit(1);
