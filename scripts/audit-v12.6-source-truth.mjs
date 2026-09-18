import fs from 'node:fs';
import path from 'node:path';
const read=p=>fs.readFileSync(p,'utf8');
const runtime=read('lib/sentCurriculumRuntime.ts');
const marker='const sentUnits:SentUnit[]=';
const start=runtime.indexOf(marker)+marker.length;
const end=runtime.indexOf(';\n\nconst courseName',start);
if(start<marker.length||end<0)throw new Error('Cannot locate sentUnits payload');
const units=JSON.parse(runtime.slice(start,end));
const files=[...new Set(units.map(x=>x.sourceFile))].sort();
const steps=units.reduce((n,x)=>n+x.steps.length,0);
const checksCount=units.reduce((n,x)=>n+x.checks.length,0);
const hiddenSolutions=units.reduce((n,x)=>n+(x.sourceSolutions||[]).filter(Boolean).length,0);
const courses=[...new Set(units.map(x=>`${x.classLevel}|${x.subject}|${x.term}`))];
const allText=JSON.stringify(units).toLowerCase();
const tutor=read('components/TutorClient.tsx');
const adapter=read('lib/curriculumTutor.ts');
const sourceDir='data/curriculum-sources/2026-09-12';
const sourceFiles=fs.readdirSync(sourceDir).filter(x=>x.endsWith('.md')&&x!=='README.md').sort();
const part3=units.find(x=>x.sourceFile==='jss3-math-term3.md'&&x.title.startsWith('Part 3:'));
const checks=[
 ['all 14 supplied curriculum documents are compiled',sourceFiles.length===14&&files.length===14&&sourceFiles.every(x=>files.includes(x))],
 ['source runtime has 94 ordered lesson units',units.length===94],
 ['source runtime has at least 1,600 ordered teaching steps',steps>=1600],
 ['source runtime has 389 learner-first source checks',checksCount===389],
 ['12 complete term courses are reachable',courses.length===12],
 ['every source unit is reachable through a complete term course',units.every(x=>courses.includes(`${x.classLevel}|${x.subject}|${x.term}`))],
 ['SPQ3R content is in runtime',allText.includes('spq3r')],
 ['compound plural edge cases are in runtime',allText.includes('mothers-in-law')||allText.includes('brothers-in-law')],
 ['passers-by content is in runtime',allText.includes('passers-by')],
 ['units conversion content is in runtime',allText.includes('1000 mm')&&allText.includes('100 cm')],
 ['bracket prerequisite is in runtime',allText.includes('every term in the first bracket')||allText.includes('bracket × bracket')],
 ['bearing/elevation content is in runtime',allText.includes('reciprocal')&&allText.includes('elevation')],
 ['construction content is in runtime',allText.includes('45°')&&allText.includes('compass')],
 ['known divide-first algebra error is corrected',allText.includes('x+3/2=11/2')&&allText.includes('every term on the left must be divided by 2')],
 ['source courses are appended to topic picker',adapter.includes('getSentCourseNames')&&adapter.includes('...getSentCourseNames(classLevel,subject)')],
 ['matching official topics receive source units before mastery',adapter.includes('getSentCurriculumUnits')&&adapter.includes('plan.units=[...core,...supplied,...mastery]')],
 ['Tutor renders every source step as a teaching event',tutor.includes('SOURCE STEP ${i+1} OF ${unit.sourceSteps.length}')],
 ['Tutor turns supplied exercises into learner checkpoints',tutor.includes('SOURCE PRACTICE ${i+1} — YOUR ATTEMPT FIRST')],
 ['checkpoint next is locked until learner has been checked',tutor.includes("disabled={event.kind==='check'&&!checkpointReply}")],
 ['pre-attempt model-answer shortcut removed',!tutor.includes('Show me a model answer')],
 ['practice explanation is based on learner attempt',tutor.includes('My attempt was: ${answer}')&&tutor.includes('preserve anything I did correctly')],
 ['partial/incomplete work is explicitly recognised',tutor.includes('partly correct or correct-so-far but incomplete')],
 ['full guided solution requires prior hint',tutor.includes("(!feedback.correct&&questionHelp)")&&tutor.includes('Show the full worked solution after the hint')],
 ['JSS3 mock objective/theory answers are hidden until attempt',part3&&part3.checks.length===22&&(part3.sourceSolutions||[]).filter(Boolean).length===14&&!part3.steps.some(x=>/^Profit = 54,000/.test(x))],
];
let failed=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)failed++;}
console.log(`\nSource truth audit: ${checks.length-failed}/${checks.length}`);
console.log(`Documents: ${files.length}; units: ${units.length}; ordered steps: ${steps}; learner checks: ${checksCount}; hidden reference solutions: ${hiddenSolutions}; term courses: ${courses.length}`);
if(failed)process.exit(1);
