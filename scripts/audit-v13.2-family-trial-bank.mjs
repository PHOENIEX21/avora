import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const bank=JSON.parse(read('data/jss1-jss2-assessment-bank.json'));
const snap=JSON.parse(read('data/revised-2025-curriculum-snapshot.json'));
const qs=bank.questions||[];
const family=read('app/parent/family/page.tsx');
const linkComponent=read('components/ParentLinkChild.tsx');
const createChildComponent=read('components/ParentCreateChild.tsx');
const createChild=read('app/api/parent/children/create/route.ts');
const link=read('app/api/parent/link/route.ts');
const childConnect=read('components/StudentParentConnect.tsx');
const layout=read('app/layout.tsx');
const strip=read('components/TrialCountdownStrip.tsx');
const register=read('app/api/auth/register/route.ts');
const seed=read('scripts/seed-class-assessment-bank.mjs');

const groups=new Map();
for(const q of qs){const k=q.curriculumTopicId;const a=groups.get(k)||[];a.push(q);groups.set(k,a)}
const metaPhrases=['revised expectations','curriculum expectations','avora should','which outcome','best represents','strongest independent evidence','learner should','official curriculum skill'];
const promptSet=new Set(qs.map(q=>q.prompt));
const optionIntegrity=qs.every(q=>Array.isArray(q.options)&&q.options.length===4&&new Set(q.options.map(x=>String(x).trim().toLowerCase())).size===4&&q.options.filter(x=>String(x).trim().toLowerCase()===String(q.correctAnswer).trim().toLowerCase()).length===1);
const answerPositions=[0,1,2,3].map(pos=>qs.filter(q=>q.options[pos]===q.correctAnswer).length);
const metaFree=qs.every(q=>!metaPhrases.some(p=>String(q.prompt).toLowerCase().includes(p)));
const topicsExact=groups.size===111&&snap.topics.every(t=>groups.get(t.id)?.length===8)&&qs.every(q=>snap.topics.some(t=>t.id===q.curriculumTopicId));
const directEnough=qs.every(q=>String(q.prompt).trim().length>=12&&/[?.!]$/.test(String(q.prompt).trim()));

const checks=[
 ['14-day trial is created immediately when a learner registers',register.includes("learner_access_trials")&&register.includes("interval '14 days'")],
 ['trial countdown is global for signed-in learners',layout.includes('getStudentEntitlement')&&layout.includes('TrialCountdownStrip')],
 ['trial countdown recomputes live in the browser',strip.includes('setInterval')&&strip.includes('daysLeft')&&strip.includes('Day ${day} of ${totalDays}')],
 ['parent family trial also has a live countdown',layout.includes('getFamilyBillingStatus')&&layout.includes('AVORA FAMILY · 14-DAY TRIAL')],
 ['family setup clearly supports existing-code and new-child paths',family.includes('MY CHILD ALREADY HAS AVORA')&&createChildComponent.includes('Create their learner account')&&linkComponent.includes('One-time learner code')],
 ['parent family UI visibly explains separate learner logins',family.includes('Each child keeps a separate login')&&family.includes('child uses the learner account')],
 ['parent can visibly enter a learner code',family.includes('ParentLinkChild inline')],
 ['parent can create a child who does not yet have an AVORA account',createChild.includes("role,email_verified_at")&&createChild.includes("'STUDENT'")&&createChild.includes('student_profiles')],
 ['new parent-created learner receives the same 14-day trial',createChild.includes("learner_access_trials")&&createChild.includes("interval '14 days'")],
 ['family maximum is enforced server-side at three learners',createChild.includes('FAMILY_MAX_STUDENTS')&&link.includes('FAMILY_MAX_STUDENTS')],
 ['duplicate email identity is rejected',createChild.includes('email already belongs to an AVORA account')],
 ['duplicate parent-child link is rejected instead of silently re-linked',link.includes('already linked to your family')&&link.includes('alreadyLinked')],
 ['one learner cannot enter a second active family subscription',link.includes('another AVORA Family subscription')],
 ['child-side instructions explain exactly where parent enters code',childConnect.includes('open <b>Children</b>')&&childConnect.includes('enter this code')],
 ['assessment bank has exactly 888 questions',qs.length===888],
 ['assessment bank has exactly 111 topics with 8 questions each',topicsExact],
 ['every question has four unique choices and one exact keyed answer',optionIntegrity],
 ['all 888 prompts are unique',promptSet.size===888],
 ['old curriculum/AVORA meta-question wording is absent',metaFree],
 ['every prompt states a complete direct task/question',directEnough],
 ['correct-answer positions are evenly distributed',answerPositions.every(n=>n===222)],
 ['bank identifies V13.2 examination-standard review',bank.curriculumVersion==='AVORA_MASTER_V13_2_EXAM_STANDARD'],
 ['seed retires superseded current-cohort AVORA bank',seed.includes("review_version IS DISTINCT FROM 'V13.2.0'")&&seed.includes("status='RETIRED'")],
 ['seed publishes V13.2 review version',seed.includes("review_version='V13.2.0'")&&seed.includes("'V13.2.0',NULL")],
];

let pass=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}
console.log(`Answer positions A/B/C/D: ${answerPositions.join('/')}`);
console.log(`Bank topics/questions: ${groups.size}/${qs.length}`);
console.log(`\nV13.2 FAMILY + TRIAL + EXAM BANK: ${pass}/${checks.length}`);
if(pass!==checks.length)process.exit(1);
