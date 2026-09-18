import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const f=read('lib/jss3MathematicsDeepLessons.ts');
const coverage=read('lib/curriculumCoverage.ts');
const objectives=read('lib/curriculumObjectives.ts');
const master=read('lib/masterCurriculum.ts');
const checks=[
 ['15 preserved JSS3 Mathematics deep lessons',(f.match(/topicId:'nerdc-jss3-math-/g)||[]).length===15],
 ['all JSS3 Mathematics records retain NERDC-labelled source evidence',(f.match(/authority:'NERDC'/g)||[]).length>=15],
 ['all records have mastery gates',(f.match(/status:'DEEP_WHEN_PASSED'/g)||[]).length>=15],
 ['all records board ready',(f.match(/boardReady:true/g)||[]).length>=15],
 ['misconceptions guided and independent practice retained',(f.match(/misconceptions:\[/g)||[]).length===15&&(f.match(/guidedPractice:\[/g)||[]).length===15&&(f.match(/independentPractice:\[/g)||[]).length===15],
 ['JSS3 objective registry remains registered',objectives.includes('jss3MathObjectives')&&objectives.includes('...jss3MathObjectives')],
 ['JSS3 runtime stays on preserved master curriculum',master.includes("if(isNerdc2025Class(classLevel))return nerdcRuntimeMasterTopics")&&master.includes("return masterCurriculum.filter(x=>x.classLevel===classLevel&&x.subject===subject)")],
 ['coverage uses the shared source-backed runtime resolver',coverage.includes('getSentCurriculumUnits')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}console.log(`JSS3 Mathematics preserved-cohort audit: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
