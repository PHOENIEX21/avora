import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const runtime=read('lib/sentCurriculumRuntime.ts');
const marker='const sentUnits:SentUnit[]=';
const start=runtime.indexOf(marker)+marker.length;
const end=runtime.indexOf(';\n\nconst courseName',start);
if(start<marker.length||end<0)throw new Error('Cannot locate sentUnits payload');
const units=JSON.parse(runtime.slice(start,end));

const masterSource=read('lib/masterCurriculum.ts');
const arrayStart=masterSource.indexOf('export const masterCurriculum:MasterCurriculumTopic[]=')+'export const masterCurriculum:MasterCurriculumTopic[]='.length;
const arrayEnd=masterSource.indexOf('.map(x=>',arrayStart);
let jsonish=masterSource.slice(arrayStart,arrayEnd)
 .replace(/\bclassLevel:/g,'"classLevel":').replace(/\bsubject:/g,'"subject":')
 .replace(/\bterm:/g,'"term":').replace(/\btopic:/g,'"topic":')
 .replace(/\bfoundation:/g,'"foundation":').replace(/\bid:/g,'"id":');
const master=JSON.parse(jsonish);

const authority=read('lib/curriculumAuthority.ts');
const tutor=read('lib/curriculumTutor.ts');
const coverage=read('lib/curriculumCoverage.ts');
const learn=read('app/learn/page.tsx');
const exam=read('app/exam/page.tsx');
const tutorApi=read('app/api/tutor/route.ts');
const questionApi=read('app/api/questions/route.ts');
const examStart=read('app/api/exam/start/route.ts');
const aliases=read('lib/masterTopicAliases.ts');

const masterKey=x=>`${x.classLevel}|${x.subject}|${x.topic}`;
const masterKeys=new Set(master.map(masterKey));
const unitTargets=units.flatMap(u=>(u.targets||[]).map(t=>`${u.classLevel}|${u.subject}|${t}`));
const unitTargetSet=new Set(unitTargets);
const missingTeaching=master.filter(x=>!unitTargetSet.has(masterKey(x)));
const orphanTargets=[...new Set(unitTargets.filter(x=>!masterKeys.has(x)))];

const englishPrefix={1:'Speech Work:',2:'Grammar:',3:'Comprehension:',4:'Composition:',5:'Literature:'};
const englishStrandMismatches=units.filter(u=>u.subject==='English Language'&&/^([1-5])\./.test(u.title)).filter(u=>{
 const n=Number(u.title.match(/^([1-5])\./)[1]);return !(u.targets||[])[0]?.startsWith(englishPrefix[n]);
});
const bracketFoundationWrong=units.filter(u=>u.sourceFile==='math-foundation-multiplying-two-brackets.md').filter(u=>!(u.targets||[])[0]?.startsWith('Algebraic Expressions:'));


const classCounts={};
for(const x of master){
 const k=`${x.classLevel}|${x.subject}`;
 classCounts[k]=(classCounts[k]||0)+1;
}

const checks=[
 ['master curriculum contains exactly 96 runtime topics',master.length===96],
 ['master counts match uploaded curriculum',classCounts['JSS1|Mathematics']===25&&classCounts['JSS1|English Language']===15&&classCounts['JSS2|Mathematics']===14&&classCounts['JSS2|English Language']===15&&classCounts['JSS3|Mathematics']===13&&classCounts['JSS3|English Language']===14],
 ['all 151 deep source units remain compiled',units.length===151],
 ['every master topic has source-backed teaching',missingTeaching.length===0],
 ['no source unit targets an obsolete curriculum topic',orphanTargets.length===0],
 ['English source sections map to the matching master strand',englishStrandMismatches.length===0],
 ['bracket-foundation units map to JSS2 Algebraic Expressions',bracketFoundationWrong.length===0],
 ['curriculum authority imports only the master registry',authority.includes("from './masterCurriculum'")&&!authority.includes('revised2025CurrentTopics')&&!authority.includes('legacyMathematicsTopicInventory')],
 ['Tutor topic picker reads master topics',tutor.includes("from './masterCurriculum'")&&tutor.includes('masterTopics(classLevel,subject)')],
 ['Tutor rejects non-master runtime topics',tutor.includes("if(!master)return undefined")],
 ['Tutor plans come from source-backed units',tutor.includes('getSentCurriculumUnits')&&!tutor.includes('revised2025DeepLessons')&&!tutor.includes('jss1MathematicsDeepLessons')],
 ['coverage audit is source-backed, not revised-registry-backed',coverage.includes('getSentCurriculumUnits')&&!coverage.includes('getRevised2025DeepLesson')],
 ['Learn page surfaces the master curriculum',learn.includes('getOfficialTopicNames')&&learn.includes('AVORA MASTER')],
 ['Exam page surfaces master topic options',exam.includes('getOfficialTopicNames')],
 ['Tutor API validates master topics',tutorApi.includes('getCurriculumTutorPlan')&&tutorApi.includes('assessmentAliases')],
 ['Practice resolves master topics through assessment aliases',questionApi.includes('assessmentAliases')],
 ['Exam topic tests resolve master topics through assessment aliases',examStart.includes('assessmentAliases')],
 ['all 96 master topics have compatibility alias groups',(aliases.match(/"JSS[123]\|(?:Mathematics|English Language)\|/g)||[]).length===96],
 ['uploaded master Markdown is preserved in curriculum sources',fs.existsSync('data/curriculum-sources/2026-09-12/MASTER-CURRICULUM.md')],
 ['legacy curriculum files are not imported by runtime authority/tutor',!authority.includes('revised2025Curriculum')&&!tutor.includes('revised2025Curriculum')],
];

let pass=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}
console.log(`Master topic counts: ${JSON.stringify(classCounts)}`);
console.log(`Missing master teaching: ${missingTeaching.length}`);
if(missingTeaching.length)console.log(missingTeaching.slice(0,10));
console.log(`Orphan source targets: ${orphanTargets.length}`);
if(orphanTargets.length)console.log(orphanTargets.slice(0,10));
console.log(`\nV13 MASTER CURRICULUM: ${pass}/${checks.length}`);
if(pass!==checks.length)process.exit(1);
