import fs from 'node:fs';
const r=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const lib=r('lib/nceePrep.ts'),topic=r('app/common-entrance/learn/[topic]/page.tsx'),creator=r('components/LiveAssessmentCreator.tsx'),mock=r('app/common-entrance/mock/page.tsx');
const checks=[
 ['two primary classes',lib.includes("['Primary 5','Primary 6']")],
 ['six tested domains', ['Mathematics','Basic Science & Technology','English Studies','National Values Education','Quantitative & Vocational Aptitude','Verbal Aptitude'].every(x=>lib.includes(`'${x}'`))],
 ['official current paper timing',lib.includes('durationMinutes:130')&&lib.includes('durationMinutes:80')],
 ['deep sequence includes prerequisites and mastery',lib.includes("'prerequisite recall'")&&lib.includes("'mastery gate'")],
 ['minimum five examples',lib.includes('minimumWorkedExamplesPerTopic: 5')],
 ['younger learner pedagogy',lib.includes('short teaching chunks')&&lib.includes('concrete home, school, money')],
 ['vocabulary no-jump contract',lib.includes('simple meaning → example → contrast/non-example')],
 ['board teaching',topic.includes('ncee-mini-board')&&topic.includes('BOARD')],
 ['guided and independent practice',topic.includes('Your turn')&&topic.includes('masteryChecks')],
 ['targeted remediation',lib.includes('Return to the prerequisite that broke down')],
 ['weekly live Primary 5/6 classes',creator.includes('<option>Primary 5</option>')&&creator.includes('<option>Primary 6</option>')],
 ['weekly live all NCEE non-English domains',creator.includes('Basic Science & Technology')&&creator.includes('Verbal Aptitude')],
 ['eight original full mocks',lib.includes('Array.from({length:8}')&&mock.includes('Eight complete AVORA mock forms')],
 ['historical references are rights-safe',lib.includes("access:'REFERENCE_ONLY'")&&lib.includes('reproduceQuestions:false')],
 ['current exam structure kept separate from AVORA item count',lib.includes("not a claim about NECO's official item count")],
];let n=0;for(const [x,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${x}`);n+=+ok}console.log(`\nNCEE V10.10 audit: ${n}/${checks.length}`);if(n!==checks.length)process.exit(1);
