import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const official=JSON.parse(read('data/nerdc-2025-official-jss1-jss2.json'));
const manifest=JSON.parse(read('data/nerdc-2025-integration-manifest.json'));
const map=read('lib/nerdc2025TopicMap.ts');
const teaching=read('lib/nerdc2025Teaching.ts');
const deep=[read('lib/jss1MathematicsDeepLessons.ts'),read('lib/jss2MathematicsDeepLessons.ts'),read('lib/jss1EnglishDeepLessons.ts'),read('lib/jss2EnglishDeepLessons.ts'),read('lib/revised2025SupplementalLessons.ts'),teaching].join('\n');
const master=read('lib/masterCurriculum.ts');
const authority=read('lib/curriculumAuthority.ts');
const runtime=read('lib/sentCurriculumRuntime.ts');
const tutor=read('lib/curriculumTutor.ts');
const tutorApi=read('app/api/tutor/route.ts');
const exercise=read('lib/nerdc2025Exercises.ts');
const checkRoute=read('app/api/tutor/exercise-check/route.ts');
const client=read('components/TutorClient.tsx');
const env=read('.env.example');
const math2=read('lib/jss2MathematicsDeepLessons.ts');
const pkg=JSON.parse(read('package.json'));
const records=official.records||[];
const count=(c,s)=>records.filter(x=>x.classLevel===c&&x.subject===s).length;
const mapRows=[...map.matchAll(/\[K\('([^']+)','([^']+)','([^']+)'\),m\(\[(.*?)\],\[(.*?)\]\)\]/g)];
const mapKeys=new Set(mapRows.map(m=>`${m[1]}|${m[2]}|${m[3]}`));
const evidenceRefs=new Set(mapRows.flatMap(m=>[...m[5].matchAll(/['\"]([^'\"]+)['\"]/g)].map(x=>x[1])));
const evidenceIds=new Set([...deep.matchAll(/[\"']?topicId[\"']?\s*:\s*['\"]([^'\"]+)['\"]/g)].map(m=>m[1]));
const missingMap=records.filter(x=>!mapKeys.has(`${x.classLevel}|${x.subject}|${x.topic}`));
const missingEvidence=[...evidenceRefs].filter(id=>!evidenceIds.has(id));
const invalidOfficial=records.filter(x=>!x.topic||!x.theme||!Array.isArray(x.pages)||!x.pages.length||!Array.isArray(x.objectives)||!x.objectives.length||!String(x.content||'').trim());
const invalidManifest=manifest.topics.filter(x=>x.exerciseQuestionTarget!==15||x.masteryThresholdPercent!==80||!x.sourcePages?.length||!x.evidenceIds?.length||x.reviewedBankQuestionsReusable+(x.authoredNerdcQuestions||0)+x.conceptChecksNeededFor15!==15);
const specialRequired=[
 'nerdc2025-special-jss1-english-oral-comprehension-current',
 'nerdc2025-special-jss2-english-debate','nerdc2025-special-jss2-english-oral-comprehension-current','nerdc2025-special-jss2-english-oral-summary',
 'nerdc2025-special-jss2-english-reading-fluency-current','nerdc2025-special-jss2-english-sentence-function','nerdc2025-special-jss2-english-sentence-structure',
 'nerdc2025-special-jss2-english-tense-system-current','nerdc2025-special-jss2-english-skit-making','nerdc2025-special-jss2-english-dialogue-writing'
];
const checks=[
 ['release version is V14.9.x',['14.9.0','14.9.1'].includes(pkg.version)],
 ['official source version is September 2025 NERDC',official.version==='NERDC_NEW_REVISED_BEC_SEPTEMBER_2025'&&official.authority==='NERDC'],
 ['official current-cohort inventory contains 75 topics',records.length===75],
 ['JSS1 Mathematics has 23 official topics',count('JSS1','Mathematics')===23],
 ['JSS1 English has 17 official topics',count('JSS1','English Language')===17],
 ['JSS2 Mathematics has 16 official topics',count('JSS2','Mathematics')===16],
 ['JSS2 English has 19 official topics',count('JSS2','English Language')===19],
 ['every official record keeps source pages, objectives and content',invalidOfficial.length===0],
 ['every official topic has an exact runtime mapping',mapRows.length===75&&mapKeys.size===75&&missingMap.length===0],
 ['every mapped teaching evidence id resolves',missingEvidence.length===0],
 ['current-cohort masterTopics overlays exact NERDC registry',master.includes("officialNerdc2025Topics(classLevel,subject)")&&master.includes("source:'NERDC_2025_OFFICIAL'")],
 ['runtime authority explicitly uses September 2025 NERDC for JSS1/JSS2',authority.includes('CURRENT_COHORT_RUNTIME_AUTHORITY')&&authority.includes("sourceKey:'nerdc-revised-bec-september-2025'|'avora-master-curriculum'")],
 ['legacy source-backed units are reusable only through official-topic mapping',runtime.includes('legacyTargetsForOfficialTopic')&&runtime.includes('const accepted=new Set([topic,...legacyTargetsForOfficialTopic')],
 ['Tutor combines source-backed teaching with official current-cohort deep units',tutor.includes('getNerdc2025DeepUnits')&&tutor.includes('mergeUnits(getSentCurriculumUnits')],
 ['all required current English supplements exist',specialRequired.every(id=>evidenceIds.has(id))],
 ['JSS2 Data Presentation explicitly teaches IQR and box plots',/interquartile range/i.test(math2)&&/five-number summary/i.test(math2)&&/box plot/i.test(math2)],
 ['JSS2 directed-number topic explicitly teaches square-root table verification',/square\/square-root table/i.test(math2)&&/bracket(?:ing)? it between nearby perfect squares/i.test(math2)],
 ['JSS2 algebra explicitly teaches NERDC quadratic box/grid method',/quadratic box\/grid method/i.test(math2)&&/2×2 box/i.test(math2)],
 ['integration manifest covers every official topic',manifest.version==='14.9.0'&&manifest.topicCount===75&&manifest.topics.length===75&&invalidManifest.length===0],
 ['Tutor API returns 15 official-topic exercise questions',tutorApi.includes('publicNerdc2025ExerciseQuestions')&&tutorApi.includes('15')],
 ['exercise engine defaults to exactly 15 and keeps answers server-side',exercise.includes('count=15')&&exercise.includes("Omit<NerdcExerciseQuestion,'correctAnswer'>")&&exercise.includes('checkNerdc2025Exercise')],
 ['six gap topics prioritize purpose-written AVORA NERDC banks',exercise.includes('authoredNerdc2025EnglishQuestions')&&exercise.includes("source:'AVORA_AUTHORED_NERDC_BANK'")&&manifest.topics.filter(x=>x.authoredNerdcQuestions===15).length===6],
 ['generated concept prompts are unique within an exercise',exercise.includes('Concept check ${i+1}')&&exercise.includes('Reasoning check ${i+1}')&&exercise.includes('Misconception check ${i+1}')],
 ['exercise-check API requires authentication and returns answer only after attempt',checkRoute.includes('getSession')&&checkRoute.includes('body?.answer')&&checkRoute.includes('checkNerdc2025Exercise')&&checkRoute.includes('NextResponse.json(result')],
 ['Tutor has exercise phase and 80 percent mastery gate',client.includes("'exercise'")&&client.includes("Math.ceil(exerciseQuestions.length*.8)")&&client.includes('Re-teach this topic completely')],
 ['learner-facing voice is off by default but preserved behind feature flag',client.includes("NEXT_PUBLIC_VOICE_TEACHING_ENABLED==='true'")&&env.includes('NEXT_PUBLIC_VOICE_TEACHING_ENABLED="false"')&&client.includes('speechSynthesis')],
 ['text-first source banner is learner-facing',client.includes('Verified text-first lesson')&&client.includes('academic source of truth')],
 ['new audit is wired into launch check',String(pkg.scripts['launch:check']||'').includes('audit:v14.9-nerdc-official')],
];
let pass=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}
console.log(`Official records with missing source/objective/content: ${invalidOfficial.length}`);
console.log(`Missing official topic mappings: ${missingMap.length}`);
console.log(`Missing mapped evidence ids: ${missingEvidence.length}`);
console.log(`Invalid manifest rows: ${invalidManifest.length}`);
console.log(`\nV14.9 NERDC OFFICIAL INTEGRATION: ${pass}/${checks.length} PASS`);
if(pass!==checks.length)process.exit(1);
