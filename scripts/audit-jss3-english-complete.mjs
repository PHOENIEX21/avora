import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const f=read('lib/jss3EnglishDeepLessons.ts');
const objectives=read('lib/curriculumObjectives.ts');
const coverage=read('lib/curriculumCoverage.ts');
const master=read('lib/masterCurriculum.ts');
const ids=[...f.matchAll(/"topicId"\s*:\s*"([^"]+)"/g)].map(x=>x[1]);
const checks=[
 ['17 preserved JSS3 English records',ids.length===17],
 ['17 unique JSS3 English evidence IDs',new Set(ids).size===17],
 ['all five English strands remain represented',['reading','writing','listening-and-speaking','grammatical-accuracy','literature'].every(s=>ids.some(id=>id.includes(s)))],
 ['all records retain NERDC-labelled source evidence',(f.match(/"authority"\s*:\s*"NERDC"/g)||[]).length===17],
 ['objectives teaching examples misconceptions and practice remain on every record',(f.match(/"objectives"\s*:\s*\[/g)||[]).length===17&&(f.match(/"teaching"\s*:\s*\[/g)||[]).length===17&&(f.match(/"workedExamples"\s*:\s*\[/g)||[]).length===17&&(f.match(/"misconceptions"\s*:\s*\[/g)||[]).length===17&&(f.match(/"guidedPractice"\s*:\s*\[/g)||[]).length===17&&(f.match(/"independentPractice"\s*:\s*\[/g)||[]).length===17],
 ['mastery and board-ready evidence remain on every record',(f.match(/"DEEP_WHEN_PASSED"/g)||[]).length===17&&(f.match(/"boardReady"\s*:\s*true/g)||[]).length===17],
 ['JSS3 objective registry remains registered',objectives.includes('jss3EnglishDeepLessons')&&objectives.includes('...jss3EnglishObjectives')],
 ['JSS3 runtime stays on preserved master curriculum',master.includes("return masterCurriculum.filter(x=>x.classLevel===classLevel&&x.subject===subject)")],
 ['coverage uses the shared source-backed runtime resolver',coverage.includes('getSentCurriculumUnits')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}console.log(`JSS3 English preserved-cohort audit: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
