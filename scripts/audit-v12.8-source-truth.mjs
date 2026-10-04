import fs from 'node:fs';
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
const courses=[...new Set(units.map(x=>`${x.classLevel}|${x.subject}|${x.term}`))];
const allText=JSON.stringify(units).toLowerCase();
const sourceDir='data/curriculum-sources/2026-09-12';
const sourceFiles=fs.readdirSync(sourceDir).filter(x=>x.endsWith('.md')&&x!=='README.md'&&x!=='MASTER-CURRICULUM.md').sort();
const newEnglish=['jss2-english-term1.md','jss2-english-term2.md','jss2-english-term3.md','jss3-english-term1.md','jss3-english-term2.md','jss3-english-term3.md'];

function norm(s){return s.toLowerCase().replace(/^\d+\.\s+/,'').replace(/\*\*/g,'').replace(/\s+/g,' ').trim()}
function meaningfulLines(file){
 return read(`${sourceDir}/${file}`).split(/\r?\n/).map(x=>x.trim()).filter(x=>x&&x!=='---'&&!x.startsWith('#')&&!/^(\*\*)?practice questions:(\*\*)?$/i.test(x)).map(norm);
}
function runtimeLines(file){
 const us=units.filter(x=>x.sourceFile===file);
 return new Set(us.flatMap(x=>[x.title,...x.steps,...x.checks]).map(norm));
}
const coverage=newEnglish.map(file=>{
 const src=meaningfulLines(file), rt=runtimeLines(file);
 const missing=src.filter(x=>!rt.has(x));
 return {file,total:src.length,covered:src.length-missing.length,missing};
});

const checks=[
 ['all 20 supplied curriculum documents are compiled',sourceFiles.length===20&&files.length===20&&sourceFiles.every(x=>files.includes(x))],
 ['151 source-backed lesson units are compiled',units.length===151],
 ['at least 2,000 ordered teaching steps are runtime-backed',steps>=2000],
 ['513 learner-first source checks are compiled',checksCount===513],
 ['18 complete term courses are reachable',courses.length===18],
 ['all six new JSS2/JSS3 English files are runtime-backed',newEnglish.every(f=>files.includes(f))],
 ['every meaningful line in six new English files is represented',coverage.every(x=>x.missing.length===0)],
 ['every source unit has a normal-topic target',units.every(x=>Array.isArray(x.targets)&&x.targets.length>0)],
 ['JSS2 triphthongs are runtime-backed',allText.includes('triphthong')&&allText.includes('/aɪə/')],
 ['JSS2 transitive/intransitive verbs are runtime-backed',allText.includes('transitive')&&allText.includes('intransitive')],
 ['JSS2 active/passive voice is runtime-backed',allText.includes('the exams were marked by the teacher')],
 ['JSS2 critical reading is runtime-backed',allText.includes('critical reading')],
 ['JSS2 summary method is runtime-backed',allText.includes('rewrite these main points in your own words')],
 ['JSS3 obligation nuance is runtime-backed',allText.includes('source of the obligation')&&allText.includes('ought to')],
 ['JSS3 skimming/scanning is runtime-backed',allText.includes('skimming')&&allText.includes('scanning')],
 ['JSS3 schwa is runtime-backed',allText.includes('schwa /ə/')&&allText.includes('photograph')],
 ['JSS3 stress/intonation is runtime-backed',allText.includes('record')&&allText.includes('rising intonation')],
 ['JSS3 visual comprehension is runtime-backed',allText.includes('diagrams, maps, and sketches')],
 ['JSS3 punctuation/comma splice is runtime-backed',allText.includes('comma splice')],
 ['JSS3 full tense system is runtime-backed',allText.includes('present perfect')&&allText.includes('past perfect')],
 ['JSS3 BECE mixed comprehension is runtime-backed',allText.includes('full mixed revision')&&allText.includes('skimming/main idea')],
 ['source-course teaching remains available without polluting learner topic names',read('lib/curriculumTutor.ts').includes('getSentCurriculumCourse')&&!read('lib/curriculumTutor.ts').includes('getSentCourseNames')],
 ['Tutor still compiles source-backed structured steps',read('components/TutorClient.tsx').includes('composeLearnerSourceMoments(unit.structuredSteps)')],
 ['attempt-first source checks remain wired through structured learner-response steps',read('components/TutorClient.tsx').includes('structuredSteps')&&read('components/TutorClient.tsx').includes('requiresLearnerResponse')&&read('lib/lessonPresentation.ts').includes('YOUR TURN — THINK FIRST')&&read('lib/lessonPresentation.ts').includes('requiresLearnerResponse:true')],
];
let pass=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}
for(const c of coverage)console.log(`COVERAGE — ${c.file}: ${c.covered}/${c.total}${c.missing.length?` missing=${c.missing.slice(0,3).join(' | ')}`:''}`);
console.log(`\nV12.8 SOURCE TRUTH: ${pass}/${checks.length}`);
console.log(`Runtime totals: ${units.length} units · ${steps} steps · ${checksCount} checks · ${courses.length} courses · ${files.length} source files`);
if(pass!==checks.length)process.exit(1);
