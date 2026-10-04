import fs from 'node:fs';
const snapshot=JSON.parse(fs.readFileSync('data/revised-2025-curriculum-snapshot.json','utf8'));
const bank=JSON.parse(fs.readFileSync('data/jss1-jss2-assessment-bank.json','utf8'));
const authority=fs.readFileSync('lib/curriculumAuthority.ts','utf8');
const deep=fs.readFileSync('lib/revised2025DeepLessons.ts','utf8');
const supplemental=fs.readFileSync('lib/revised2025SupplementalLessons.ts','utf8');
const coverage=fs.readFileSync('lib/curriculumCoverage.ts','utf8');
const tutor=fs.readFileSync('lib/curriculumTutor.ts','utf8');
const version=JSON.parse(fs.readFileSync('data/curriculum-version-status.json','utf8'));
const counts=snapshot.summary;
const topics=snapshot.topics;
const deepReady=topics.every(x=>x.deepLesson&&x.deepLesson.teaching?.length>=3&&x.deepLesson.workedExamples?.length>=2&&x.deepLesson.guidedPractice?.length&&x.deepLesson.independentPractice?.length&&x.deepLesson.misconceptions?.length>=3&&x.deepLesson.mastery?.criterion);
const currentIds=new Set(topics.map(x=>x.id));
const qCounts=new Map();for(const q of bank.questions)qCounts.set(q.curriculumTopicId,(qCounts.get(q.curriculumTopicId)||0)+1);
const checks=[
 ['111 current revised JSS1/JSS2 curriculum entries',counts.total===111],
 ['current counts are JSS1 Math 23 / English 29 / JSS2 Math 22 / English 37',counts.JSS1.Mathematics===23&&counts.JSS1.English===29&&counts.JSS2.Mathematics===22&&counts.JSS2.English===37],
 ['all 111 revised topics have deep composed lessons',deepReady],
 ['all revised evidence dependencies resolve',deep.includes('unresolvedRevised2025Evidence')&&snapshot.topics.every(x=>x.deepLesson?.evidenceLessonIds?.length)],
 ['23 fresh/reorganised competency lessons authored',(supplemental.match(/"topicId": "revised2025-/g)||[]).length===23],
 ['authority includes official revised BEC 2025 source',authority.includes("key:'nerdc-new-revised-bec-2025'")],
 ['JSS1/JSS2 official inventory uses revised source',authority.includes("sourceKey:'nerdc-new-revised-bec-2025'")],
 ['JSS3 prior-cycle inventory is deliberately preserved',authority.includes("legacyMathematicsTopicInventory.filter(x=>x.classLevel==='JSS3')")&&authority.includes("legacyEnglishTopicInventory.filter(x=>x.classLevel==='JSS3')")],
 ['coverage resolves revised lessons first',coverage.includes('getRevised2025DeepLesson(topic.id)')],
 ['live Tutor uses revised current-cohort lessons',tutor.includes('...revised2025DeepLessons')],
 ['888 bank questions exactly target revised topic IDs',bank.questions.length===888&&bank.questions.every(q=>currentIds.has(q.curriculumTopicId))&&[...currentIds].every(id=>qCounts.get(id)===8)],
 ['111 performance tasks exactly target revised topic IDs',bank.performanceTasks.length===111&&bank.performanceTasks.every(t=>currentIds.has(t.curriculumTopicId))],
 ['curriculum version guard is reconciled',version.status==='REVISED_2025_RECONCILED_CURRENT_COHORTS'&&version.launchAllowed===true]
];
let fail=0;for(const [n,ok] of checks){console.log(`${ok?'✓':'✗'} ${n}`);if(!ok)fail++}console.log(`Revised-2025 reconciliation audit: ${checks.length-fail}/${checks.length}`);if(fail)process.exit(1);
