import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const official=JSON.parse(read('data/nerdc-2025-official-jss1-jss2.json')).records;
const map=read('lib/nerdc2025TopicMap.ts');
const teaching=[read('lib/jss2EnglishDeepLessons.ts'),read('lib/revised2025SupplementalLessons.ts'),read('lib/nerdc2025Teaching.ts')].join('\n');
const authored=read('lib/nerdc2025AuthoredEnglishExercises.ts');
const objectives=read('lib/curriculumObjectives.ts');
const current=official.filter(x=>x.classLevel==='JSS2'&&x.subject==='English Language');
const mapped=[...map.matchAll(/\[K\('JSS2','English Language','([^']+)'\),m\(\[(.*?)\],\[(.*?)\]\)\]/g)];
const keys=new Set(mapped.map(x=>x[1]));
const refs=new Set(mapped.flatMap(x=>[...x[3].matchAll(/['"]([^'"]+)['"]/g)].map(y=>y[1])));
const ids=new Set([...teaching.matchAll(/["']?topicId["']?\s*:\s*['"]([^'"]+)['"]/g)].map(x=>x[1]));
const themes=new Set(current.map(x=>x.theme));
const checks=[
 ['19 exact September 2025 NERDC JSS2 English topics',current.length===19],
 ['all five official English themes are represented',['Listening and Speaking','Reading','Grammatical Accuracy','Writing','Literature'].every(x=>themes.has(x))],
 ['every official JSS2 English topic has a runtime mapping',mapped.length===19&&current.every(x=>keys.has(x.topic))],
 ['every mapped JSS2 English evidence id resolves',[...refs].every(id=>ids.has(id))],
 ['current objective registry uses exact official ids and objectives',objectives.includes('nerdc2025OfficialTopics.map')&&objectives.includes('objectives:[...topic.objectives]')],
 ['new curriculum-specific English evidence is present',teaching.includes('nerdc2025-special-jss2-english-debate')&&teaching.includes('nerdc2025-special-jss2-english-oral-summary')&&teaching.includes('nerdc2025-special-jss2-english-skit-making')&&teaching.includes('nerdc2025-special-jss2-english-dialogue-writing')],
 ['six new topics have 90 purpose-written exercise questions',(authored.match(/ q\(/g)||[]).length===90],
 ['deep English evidence retains worked examples misconceptions and practice',teaching.includes('workedExamples')&&teaching.includes('misconceptions')&&teaching.includes('guidedPractice')&&teaching.includes('independentPractice')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}console.log(`JSS2 English current-cohort audit: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
