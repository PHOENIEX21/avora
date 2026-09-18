import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const official=JSON.parse(read('data/nerdc-2025-official-jss1-jss2.json')).records;
const map=read('lib/nerdc2025TopicMap.ts');
const teaching=[read('lib/jss2MathematicsDeepLessons.ts'),read('lib/revised2025SupplementalLessons.ts'),read('lib/nerdc2025Teaching.ts')].join('\n');
const current=official.filter(x=>x.classLevel==='JSS2'&&x.subject==='Mathematics');
const mapped=[...map.matchAll(/\[K\('JSS2','Mathematics','([^']+)'\),m\(\[(.*?)\],\[(.*?)\]\)\]/g)];
const keys=new Set(mapped.map(x=>x[1]));
const refs=new Set(mapped.flatMap(x=>[...x[3].matchAll(/['"]([^'"]+)['"]/g)].map(y=>y[1])));
const ids=new Set([...teaching.matchAll(/["']?topicId["']?\s*:\s*['"]([^'"]+)['"]/g)].map(x=>x[1]));
const math=read('lib/jss2MathematicsDeepLessons.ts');
const checks=[
 ['16 exact September 2025 NERDC JSS2 Mathematics topics',current.length===16],
 ['every official JSS2 Mathematics topic has a runtime mapping',mapped.length===16&&current.every(x=>keys.has(x.topic))],
 ['every mapped JSS2 Mathematics evidence id resolves',[...refs].every(id=>ids.has(id))],
 ['IQR and box plots are explicitly taught',/interquartile range/i.test(math)&&/box plot/i.test(math)],
 ['square/square-root table use is explicitly taught',/square\/square-root table/i.test(math)],
 ['quadratic box/grid method is explicitly taught',/quadratic box\/grid method/i.test(math)&&/2×2 box/i.test(math)],
 ['deep lesson components remain present',teaching.includes('workedExamples:')&&teaching.includes('misconceptions:')&&teaching.includes('guidedPractice:')&&teaching.includes('independentPractice:')&&teaching.includes('DEEP_WHEN_PASSED')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}console.log(`JSS2 Mathematics current-cohort audit: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
