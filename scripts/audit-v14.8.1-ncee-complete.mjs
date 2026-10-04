import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const data=JSON.parse(read('data/ncee-source-content-v14.8.json'));
const completion=JSON.parse(read('data/ncee-completion-v14.8.1.json'));
const depth=JSON.parse(read('data/ncee-depth-supplements-v14.8.1.json'));
const runtime=read('lib/nceeSourceRuntime.ts');
const learn=read('app/common-entrance/learn/page.tsx');
const lesson=read('app/common-entrance/learn/[topic]/page.tsx');
const pkg=JSON.parse(read('package.json'));
const ready=data.topics.filter(t=>t.contentStatus==='TEACHING_READY');
const assessment=data.topics.filter(t=>t.contentStatus==='ASSESSMENT_ONLY');
const practiceOnly=data.topics.filter(t=>t.contentStatus==='PRACTICE_ONLY');
const overrideIds=Object.keys(completion.overrides||{});
const allLearnerText=ready.flatMap(t=>[...t.concepts,...t.workedExamples,...t.practiceQuestions]).join('\n');
const min=depth.minimumLearnerLesson;
const verified=new Date(`${completion.verifiedAt}T00:00:00Z`);
const ageDays=Math.floor((Date.now()-verified.getTime())/86400000);
const currentAffairs=ready.find(t=>t.title==='Current Affairs and General Knowledge (NCEE-Relevant)');
const checks=[
 ['package is 14.8.1 or newer 14.8.x',/^14\.8\.(?:[1-9]|[1-9]\d+)$/.test(pkg.version)],
 ['source data build is 14.8.1',data.version==='14.8.1'],
 ['all 110 source entries preserved',data.topics.length===110],
 ['exactly 107 learner lessons are teaching-ready',ready.length===107],
 ['three mixed/timed practice blocks are assessment-only',assessment.length===3],
 ['no PRACTICE_ONLY gap remains',practiceOnly.length===0],
 ['all seven genuine source gaps have explicit authored completions',overrideIds.length===7&&overrideIds.every(id=>ready.some(t=>t.id===id&&t.completionVersion==='14.8.1'))],
 ['every learner lesson has at least three explanatory concepts',ready.every(t=>t.concepts.length>=min.concepts)],
 ['every learner lesson has at least two concrete worked examples',ready.every(t=>t.workedExamples.length>=min.workedExamples)],
 ['every learner lesson has at least three learner checks',ready.every(t=>t.practiceQuestions.length>=min.practiceQuestions)],
 ['every learner lesson has a static depth supplement provenance',ready.every(t=>t.depthCompletionVersion==='14.8.1')],
 ['assessment-only entries contain practice but cannot become lessons',assessment.every(t=>t.practiceQuestions.length>0)&&runtime.includes("contentStatus==='TEACHING_READY'&&t.id===id")],
 ['learner catalogue filters to teaching-ready content',runtime.includes("contentStatus==='TEACHING_READY'&&t.classLevel===classLevel")&&learn.includes('nceeSourceTopicsFor')],
 ['lesson route cannot resolve assessment-only content',lesson.includes('nceeSourceTopicById')&&runtime.includes("contentStatus==='TEACHING_READY'&&t.id===id")],
 ['author/meta instructions stay out of learner teaching',!/Avora should|Avora must|Content Development Notes|Originally Derived|Source step/i.test(allLearnerText)],
 ['JSS provenance stays out of NCEE learner teaching',!/JSS[123]\s*T[123]/i.test(allLearnerText)],
 ['no raw markdown table row reaches learner teaching',!/^\|/m.test(allLearnerText)],
 ['current-affairs lesson carries an explicit verification date',currentAffairs?.concepts.some(x=>/14 September 2026/.test(x))===true],
 ['current President is dated, not asserted timelessly',currentAffairs?.concepts.some(x=>/As of 14 September 2026.*Bola Ahmed Tinubu/.test(x))===true],
 ['current-affairs verification is not stale at this launch gate',ageDays>=0&&ageDays<=120],
 ['official verification authorities are recorded',completion.externalVerification?.some(x=>x.authority==='NERDC')&&completion.externalVerification?.some(x=>x.authority==='NECO')&&completion.externalVerification?.some(x=>x.authority==='State House Nigeria')],
 ['family/community completion is substantive',ready.find(t=>t.title==='Family and Community Roles')?.concepts.length>=6],
 ['health/hygiene completion is substantive',ready.find(t=>t.title==='Health and Hygiene')?.concepts.length>=7],
 ['rights/responsibilities completion is substantive',ready.find(t=>t.title==='Rights and Responsibilities of Citizens')?.concepts.length>=7],
 ['verbal integration completion is substantive',ready.find(t=>t.title==='Verbal Reasoning Integration')?.workedExamples.length>=3],
 ['advanced classification completion is substantive',ready.find(t=>t.title==='Word Classification and Grouping (Advanced)')?.workedExamples.length>=3],
 ['vocabulary review completion is substantive',ready.find(t=>t.title==='Vocabulary — Comprehensive Review')?.concepts.length>=6],
 ['no learner-facing “missing material” fallback exists in NCEE source runtime',!/don't have material|do not have material|missing material|PRACTICE_ONLY.*student/i.test(runtime)],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)pass++;}
console.log(`\nV14.8.1 NCEE complete-teaching audit: ${pass}/${checks.length} PASS`);
console.log(`Learner lessons: ${ready.length}; assessment-only source blocks: ${assessment.length}; current-affairs verification age: ${ageDays} day(s).`);
if(pass!==checks.length)process.exit(1);
