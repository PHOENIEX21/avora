import fs from 'node:fs';
const bank=JSON.parse(fs.readFileSync('data/jss1-jss2-assessment-bank.json','utf8'));
const snapshot=JSON.parse(fs.readFileSync('data/revised-2025-curriculum-snapshot.json','utf8'));
const qroute=fs.readFileSync('app/api/questions/route.ts','utf8');
const estart=fs.readFileSync('app/api/exam/start/route.ts','utf8');
const practice=fs.readFileSync('app/practice/page.tsx','utf8');
const examPage=fs.readFileSync('app/exam/page.tsx','utf8');
const seed=fs.readFileSync('scripts/seed-class-assessment-bank.mjs','utf8');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const aliases=fs.readFileSync('lib/masterTopicAliases.ts','utf8');
const tutor=fs.readFileSync('lib/curriculumTutor.ts','utf8');
const groups={};for(const q of bank.questions){const k=`${q.classLevel}|${q.subject}|${q.curriculumTopicId}`;(groups[k]??=[]).push(q)}
const classSubject={};for(const q of bank.questions){const k=`${q.classLevel}|${q.subject}`;classSubject[k]=(classSubject[k]||0)+1}
const topicCounts=Object.values(groups).map(x=>x.length);
const required=['JSS1|Mathematics','JSS1|English Language','JSS2|Mathematics','JSS2|English Language'];
const kindsByTopic=new Map();for(const q of bank.questions){const set=kindsByTopic.get(q.curriculumTopicId)||new Set();set.add(q.assessmentKind);kindsByTopic.set(q.curriculumTopicId,set)}
const requiredKinds=['CONCEPT','APPLICATION','MISCONCEPTION','OBJECTIVE','TRANSFER','MASTERY','REASONING'];
const currentIds=new Set(snapshot.topics.map(x=>x.id));
const checks=[
 ['release version preserves V12.3+ contract',Number(pkg.version.split('.')[0])>12||(Number(pkg.version.split('.')[0])===12&&Number(pkg.version.split('.')[1])>=3)],
 ['reviewed bank is the V13.2 examination-standard rebuild',bank.curriculumVersion==='AVORA_MASTER_V13_2_EXAM_STANDARD'],
 ['888 JSS1/JSS2 independent questions',bank.questions.length===888],
 ['111 curriculum performance tasks',bank.performanceTasks.length===111],
 ['every legacy JSS1/JSS2 bank topic still has exactly 8 reviewed questions',Object.keys(groups).length===111&&topicCounts.every(n=>n===8)],
 ['legacy bank topic IDs remain internally consistent with their archived snapshot',new Set(bank.questions.map(q=>q.curriculumTopicId)).size===111&&[...currentIds].every(id=>bank.questions.some(q=>q.curriculumTopicId===id))&&bank.questions.every(q=>currentIds.has(q.curriculumTopicId))],
 ['all four class-subject banks exceed 40 questions',required.every(k=>(classSubject[k]||0)>=40)],
 ['all bank questions are AVORA original and reviewed',bank.questions.every(q=>q.contentOrigin==='AVORA_ORIGINAL'&&q.qualityStatus==='REVIEWED')],
 ['every multiple-choice key exists exactly once in four unique options',bank.questions.every(q=>Array.isArray(q.options)&&q.options.length===4&&new Set(q.options).size===4&&q.options.filter(x=>x===q.correctAnswer).length===1)],
 ['question IDs, prompts and variant families are unique',new Set(bank.questions.map(q=>q.id)).size===bank.questions.length&&new Set(bank.questions.map(q=>q.prompt)).size===bank.questions.length&&new Set(bank.questions.map(q=>q.variantFamily)).size===bank.questions.length],
 ['every topic spans concept, application, misconception, objective, transfer and mastery evidence',[...kindsByTopic.values()].every(set=>requiredKinds.every(k=>set.has(k)))],
 ['every legacy bank topic retains one performance task',new Set(bank.performanceTasks.map(t=>t.curriculumTopicId)).size===111&&bank.performanceTasks.every(t=>currentIds.has(t.curriculumTopicId))],
 ['master curriculum is runtime authority while legacy bank is compatibility-only',tutor.includes("from './masterCurriculum'")&&!tutor.includes('revised2025DeepLessons')],
 ['assessment routes resolve master topics through aliases',qroute.includes('assessmentAliases')&&estart.includes('assessmentAliases')&&aliases.includes('Compatibility aliases')],
 ['questions route filters learner class',qroute.includes('q.class_level=${classLevel}')],
 ['exam start derives learner class',estart.includes('class_level')&&estart.includes('effectiveExam')],
 ['practice no longer blocks JSS1/JSS2',!practice.includes("p?.class_level!=='JSS3'")],
 ['exam no longer blocks JSS1/JSS2',!examPage.includes("p?.class_level!=='JSS3'")],
 ['seed retires superseded current-cohort AVORA questions',seed.includes("review_version IS DISTINCT FROM 'V13.2.0'")&&seed.includes("status='RETIRED'")],
 ['seed writes V13.2.0 review version',seed.includes("review_version='V13.2.0'")&&seed.includes("'V13.2.0',NULL")]
];
let fail=0;for(const [n,ok] of checks){console.log(`${ok?'✓':'✗'} ${n}`);if(!ok)fail++}console.log(`Assessment parity audit: ${checks.length-fail}/${checks.length}`);if(fail)process.exit(1);
