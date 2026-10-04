import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const official=JSON.parse(read('data/nerdc-2025-official-jss1-jss2.json')).records;
const map=read('lib/nerdc2025TopicMap.ts');
const teaching=[read('lib/jss1EnglishDeepLessons.ts'),read('lib/revised2025SupplementalLessons.ts'),read('lib/nerdc2025Teaching.ts')].join('\n');
const objectives=read('lib/curriculumObjectives.ts');
const current=official.filter(x=>x.classLevel==='JSS1'&&x.subject==='English Language');
const mapped=[...map.matchAll(/\[K\('JSS1','English Language','([^']+)'\),m\(\[(.*?)\],\[(.*?)\]\)\]/g)];
const keys=new Set(mapped.map(x=>x[1]));
const refs=new Set(mapped.flatMap(x=>[...x[3].matchAll(/['"]([^'"]+)['"]/g)].map(y=>y[1])));
const ids=new Set([...teaching.matchAll(/["']?topicId["']?\s*:\s*['"]([^'"]+)['"]/g)].map(x=>x[1]));
const themes=new Set(current.map(x=>x.theme));
const checks=[
 ['17 exact September 2025 NERDC JSS1 English topics',current.length===17],
 ['all five official English themes are represented',['Listening and Speaking','Reading','Grammatical Accuracy','Writing','Literature'].every(x=>themes.has(x))],
 ['every official JSS1 English topic has a runtime mapping',mapped.length===17&&current.every(x=>keys.has(x.topic))],
 ['every mapped JSS1 English evidence id resolves',[...refs].every(id=>ids.has(id))],
 ['current objective registry uses exact official ids and objectives',objectives.includes('nerdc2025OfficialTopics.map')&&objectives.includes('objectives:[...topic.objectives]')],
 ['deep English evidence retains worked examples misconceptions and practice',teaching.includes('workedExamples')&&teaching.includes('misconceptions')&&teaching.includes('guidedPractice')&&teaching.includes('independentPractice')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}console.log(`JSS1 English current-cohort audit: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
