import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const register=read('app/api/auth/register/route.ts');
const authForm=read('components/AuthForm.tsx');
const onboarding=read('app/api/onboarding/route.ts');
const parentCreateUI=read('components/ParentCreateChild.tsx');
const parentCreate=read('app/api/parent/children/create/route.ts');
const family=read('app/parent/family/page.tsx');
const childConnect=read('components/StudentParentConnect.tsx');
const link=read('app/api/parent/link/route.ts');
const billing=read('lib/billing.ts');
const trial=read('lib/trialLimits.ts');
const jssExam=read('app/api/exam/start/route.ts');
const nceeExam=read('app/api/common-entrance/mock/start/route.ts');
const layout=read('app/layout.tsx');

const checks=[
 ['independent learner must explicitly choose class',!register.includes(".default('JSS3')")&&authForm.includes('Choose your class')&&authForm.includes('required')],
 ['parent-created learner must explicitly choose class',parentCreateUI.includes('Choose the learner’s class')&&parentCreateUI.includes('required')],
 ['registration supports Primary 5/6 and JSS1/2/3',register.includes("'Primary 5','Primary 6','JSS1','JSS2','JSS3'")],
 ['primary registration maps to NCEE and JSS maps to BECE',register.includes("startsWith('Primary')?'NCEE':'BECE'")],
 ['onboarding enforces Primary=NCEE and JSS=BECE',onboarding.includes("Primary learners must use the NCEE preparation path")&&onboarding.includes("JSS learners must use the BECE path")],
 ['class selection visibly controls curriculum Tutor Practice and Exam',authForm.includes('Your class controls the curriculum, Tutor, Practice and Exam questions shown to you.')],
 ['family maximum remains exactly 3 learner identities',billing.includes('FAMILY_MAX_STUDENTS=3')],
 ['linked independent child visibly consumes one of three seats',family.includes('occupy one of the three learner seats')&&family.includes('only two more children can be added')],
 ['parent account explicitly does not consume learner seat',family.includes('The parent account is not a learner seat')],
 ['family UI computes remaining seats dynamically',family.includes('const remaining=Math.max(0,3-seats)')],
 ['link API returns remaining seat arithmetic',link.includes('remainingSeats:Math.max(0,FAMILY_MAX_STUDENTS-(Number(activeCount?.count||0)+1))')],
 ['parent-create API returns remaining seat arithmetic',parentCreate.includes('remainingSeats:Math.max(0,FAMILY_MAX_STUDENTS-(Number(count?.count||0)+1))')],
 ['linking existing learner cannot extend trial end date',billing.includes('started_at=LEAST(learner_access_trials.started_at,EXCLUDED.started_at)')&&billing.includes('ends_at=LEAST(learner_access_trials.ends_at,EXCLUDED.ends_at)')],
 ['trial usage is learner-identity-bound',trial.includes('trial_question_exposures')&&trial.includes('student_id=${studentId}')],
 ['trial self-service question allowance remains 150',trial.includes('TRIAL_QUESTION_ALLOWANCE=150')],
 ['JSS trial full mock limit remains 1',trial.includes('TRIAL_JSS_FULL_MOCK_LIMIT=1')&&jssExam.includes('count>=TRIAL_JSS_FULL_MOCK_LIMIT')],
 ['NCEE trial full mock limit remains 1',trial.includes('TRIAL_NCEE_FULL_MOCK_LIMIT=1')&&nceeExam.includes('count>=TRIAL_NCEE_FULL_MOCK_LIMIT')],
 ['JSS exam consumes trial question allowance',jssExam.includes("reserveTrialQuestions(s.userId,'JSS_EXAM'")],
 ['NCEE mock consumes trial question allowance',nceeExam.includes("reserveTrialQuestions(s.userId,'NCEE_MOCK'")],
 ['global live trial countdown remains wired',layout.includes('TrialCountdownStrip')&&layout.includes('getStudentEntitlement')],
 ['child-side copy explains family seat and no trial reset',childConnect.includes('one of the family’s three learner seats')&&childConnect.includes('does not restart or extend')],
 ['parent navigation exposes Children family setup',layout.includes('href="/parent/family"')&&layout.includes('Children')],
];
let pass=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++;}
console.log(`\nV13.3 FAMILY CLASS + TRIAL ENFORCEMENT: ${pass}/${checks.length}`);
if(pass!==checks.length)process.exit(1);
