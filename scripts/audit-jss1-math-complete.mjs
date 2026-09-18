import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const official=JSON.parse(read('data/nerdc-2025-official-jss1-jss2.json')).records;
const map=read('lib/nerdc2025TopicMap.ts');
const teaching=[read('lib/jss1MathematicsDeepLessons.ts'),read('lib/revised2025SupplementalLessons.ts'),read('lib/nerdc2025Teaching.ts')].join('\n');
const coverage=read('lib/curriculumCoverage.ts');
const current=official.filter(x=>x.classLevel==='JSS1'&&x.subject==='Mathematics');
const mapped=[...map.matchAll(/\[K\('JSS1','Mathematics','([^']+)'\),m\(\[(.*?)\],\[(.*?)\]\)\]/g)];
const keys=new Set(mapped.map(x=>x[1]));
const refs=new Set(mapped.flatMap(x=>[...x[3].matchAll(/['"]([^'"]+)['"]/g)].map(y=>y[1])));
const ids=new Set([...teaching.matchAll(/["']?topicId["']?\s*:\s*['"]([^'"]+)['"]/g)].map(x=>x[1]));
const checks=[
 ['23 exact September 2025 NERDC JSS1 Mathematics topics',current.length===23],
 ['every official JSS1 Mathematics topic has a runtime mapping',mapped.length===23&&current.every(x=>keys.has(x.topic))],
 ['every mapped JSS1 Mathematics evidence id resolves',[...refs].every(id=>ids.has(id))],
 ['source-backed mathematics lessons retain objectives and teaching',teaching.includes('objectives:')&&teaching.includes('teaching:')&&teaching.includes('workedExamples:')],
 ['misconceptions guided independent practice and mastery are retained',teaching.includes('misconceptions:')&&teaching.includes('guidedPractice:')&&teaching.includes('independentPractice:')&&teaching.includes('DEEP_WHEN_PASSED')],
 ['coverage resolves actual runtime units rather than old registry counts',coverage.includes('getSentCurriculumUnits')&&coverage.includes("lessonStatus:deep?'DEEP':'UNASSESSED'")],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}console.log(`JSS1 Mathematics current-cohort audit: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
