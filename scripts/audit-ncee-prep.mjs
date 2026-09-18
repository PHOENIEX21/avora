import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const lib=read('lib/nceePrep.ts');const onboarding=read('components/OnboardingClient.tsx');const api=read('app/api/onboarding/route.ts');const home=read('app/common-entrance/page.tsx');const learn=read('app/common-entrance/learn/page.tsx');const mock=read('app/common-entrance/mock/page.tsx');
const checks=[
 ['exactly two primary prep classes',lib.includes("['Primary 5','Primary 6']")],
 ['all six official NCEE domains', ['Mathematics','Basic Science & Technology','English Studies','National Values Education','Quantitative & Vocational Aptitude','Verbal Aptitude'].every(x=>lib.includes(`'${x}'`))],
 ['official two-paper structure represented',lib.includes("paper1")&&lib.includes("paper2")&&lib.includes('durationMinutes:130')&&lib.includes('durationMinutes:80')],
 ['Primary 5 scope exists',lib.includes('p5:[')&&lib.includes('Foundation year')===false],
 ['Primary 6 scope exists',lib.includes('p6:[')],
 ['deep teaching contract fields', ['prerequisites','keyTerms','teachingJourney','workedExamples','commonMistakes','masteryChecks'].every(x=>lib.includes(x))],
 ['three forms before mastery',lib.includes('Model at least three different forms')&&lib.includes('Three forms you must meet')===false],
 ['kid-specific common entrance home',home.includes('Small steps. Big confidence.')&&home.includes('does not treat a ten-year-old like a JSS learner')],
 ['onboarding exposes Primary 5 and Primary 6',onboarding.includes("'Primary 5','Primary 6','JSS1'")],
 ['onboarding enforces NCEE/BECE relationship',api.includes("Primary learners must use the NCEE preparation path")],
 ['all-domain learning browser exists',learn.includes('NCEE_DOMAINS')&&(learn.includes('nceeTopicsFor')||learn.includes('nceeSourceTopicsFor'))],
 ['full mock covers official domains',mock.includes('whole NCEE')&&mock.includes('AVORA’s own practice design')],
 ['mock does not pretend AVORA item count is official',lib.includes("not a claim about NECO's official item count")],
];
let passed=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)passed++}console.log(`\nNCEE Prep audit: ${passed}/${checks.length}`);if(passed!==checks.length)process.exit(1);
