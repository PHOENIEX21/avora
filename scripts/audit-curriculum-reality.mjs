import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const authority=read('lib/curriculumAuthority.ts');
const coverage=read('lib/curriculumCoverage.ts');
const objectives=read('lib/curriculumObjectives.ts');
const official=JSON.parse(read('data/nerdc-2025-official-jss1-jss2.json'));
const map=read('lib/nerdc2025TopicMap.ts');
const teaching=read('lib/nerdc2025Teaching.ts');
const page=read('app/curriculum/page.tsx');
const records=official.records||[];
const by=(c,s)=>records.filter(x=>x.classLevel===c&&x.subject===s).length;
const objectiveMapUsesOfficial=objectives.includes('nerdc2025OfficialTopics.map')&&objectives.includes('topicId:topic.id')&&objectives.includes('objectives:[...topic.objectives]');
const checks=[
 ['runtime official curriculum inventory is preserved',authority.includes('officialCurriculumTopicInventory')],
 ['JSS1/JSS2 authority is the supplied September 2025 NERDC registry',authority.includes('CURRENT_COHORT_RUNTIME_AUTHORITY')&&authority.includes('nerdc-revised-bec-september-2025')],
 ['official current-cohort inventory contains 75 topics',records.length===75],
 ['official counts are JSS1 Math 23 / English 17',by('JSS1','Mathematics')===23&&by('JSS1','English Language')===17],
 ['official counts are JSS2 Math 16 / English 19',by('JSS2','Mathematics')===16&&by('JSS2','English Language')===19],
 ['current objective registry uses exact official NERDC ids',objectiveMapUsesOfficial],
 ['current objective registry preserves source files and pages',objectives.includes('sourceFile:topic.sourceFile')&&objectives.includes('sourcePages:[...topic.pages]')],
 ['old 111-subtopic registry is not the current objective authority',!objectives.includes('revised2025DeepLessons')&&!objectives.includes('revised2025Objectives')],
 ['coverage resolves source-backed runtime teaching',coverage.includes('getSentCurriculumUnits')&&coverage.includes("lessonStatus:deep?'DEEP':'UNASSESSED'")],
 ['all official topics have explicit mapping table entries',(map.match(/\[K\('JSS[12]'/g)||[]).length===75],
 ['NERDC teaching layer contains current special English evidence',teaching.includes('nerdc2025-special-jss2-english-debate')&&teaching.includes('nerdc2025-special-jss2-english-dialogue-writing')],
 ['curriculum UI exists',page.includes('Official curriculum coverage')],
 ['curriculum UI shows lesson status',page.includes('lessonStatus')],
 ['curriculum UI shows official objectives',page.includes('Official objective map')&&page.includes('official.objectives.map')],
 ['curriculum UI shows NERDC source page',page.includes('NERDC source page')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++;}
console.log(`\nCurriculum reality audit: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
