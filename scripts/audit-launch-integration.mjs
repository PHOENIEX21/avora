import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const tutorApi=read('app/api/tutor/route.ts'),chatApi=read('app/api/tutor/chat/route.ts'),client=read('components/TutorClient.tsx'),curriculumTutor=read('lib/curriculumTutor.ts'),learn=read('app/learn/page.tsx'),onboarding=read('components/OnboardingClient.tsx'),exam=read('app/exam/page.tsx'),practice=read('app/practice/page.tsx'),questions=read('app/api/questions/route.ts'),examStart=read('app/api/exam/start/route.ts');
const pkg=JSON.parse(read('package.json'));
const checks=[
 ['release version preserves V12.3+ launch contract',/^12\.(?:[3-9]|[1-9]\d+)\./.test(pkg.version)||/^(?:1[3-9]|[2-9]\d+)\./.test(pkg.version)],
 ['launch gate includes all curriculum audits',pkg.scripts['audit:curriculum'].includes('audit-jss3-english-complete.mjs')],
 ['live Tutor API uses official class topics',tutorApi.includes('getOfficialTopicNames(classLevel,subject)')],
 ['live Tutor API returns deep curriculum plan',tutorApi.includes('getCurriculumTutorPlan(classLevel,subject,requestedTopic)')],
 ['Tutor client consumes server curriculum plan',client.includes('setPlan(d.plan||undefined)')],
 ['Tutor chat uses same deep plan',chatApi.includes('getCurriculumTutorPlan(d.classLevel,d.subject,d.topic)')],
 ['adapter uses the master curriculum and type-aware deep teaching maps',curriculumTutor.includes('teachingMapFor')&&curriculumTutor.includes('getCurriculumTutorPlan')&&curriculumTutor.includes('deepLessonToTutorPlan')],
 ['official class inventory drives Learn',learn.includes('getOfficialTopicNames(classLevel,subject)')],
 ['onboarding supports Primary 5/6 NCEE and JSS BECE progression',onboarding.includes("'Primary 5','Primary 6','JSS1','JSS2','JSS3'")&&onboarding.includes("?'NCEE':'BECE'")],
 ['practice is enabled for every JSS class',!practice.includes("class_level!=='JSS3'")],
 ['exam is enabled for every JSS class',!exam.includes("class_level!=='JSS3'")],
 ['practice API filters by actual learner class',questions.includes('q.class_level=${classLevel}')],
 ['exam API derives actual learner class',examStart.includes('effectiveExam')&&examStart.includes('q.class_level=${classLevel}')],
 ['class assessment migration exists',fs.existsSync('database/migrations/014_class_assessment_banks.sql')]
];
let fail=0;for(const [n,ok] of checks){console.log(`${ok?'✓':'✗'} ${n}`);if(!ok)fail++}console.log(`Launch integration audit: ${checks.length-fail}/${checks.length}`);if(fail)process.exit(1);
