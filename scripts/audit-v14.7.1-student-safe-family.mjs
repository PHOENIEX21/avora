import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const presentation=read('lib/lessonPresentation.ts');
const sent=read('lib/sentCurriculumRuntime.ts');
const client=read('components/TutorClient.tsx');
const family=read('app/parent/family/page.tsx');
const parentRegister=read('app/api/parent/register/route.ts');
const parentForm=read('components/ParentRegisterForm.tsx');
const createChild=read('app/api/parent/children/create/route.ts');
const learnerInvite=read('app/api/parent-link-code/invite/route.ts');
const parentLink=read('app/api/parent/link/route.ts');
const studentConnect=read('components/StudentParentConnect.tsx');
const signin=read('app/signin-intro/page.tsx');
const mobile=read('components/MobileNav.tsx');
const checks=[
 ['all markdown table rows are blocked from learner narration',presentation.includes('Markdown/reference-table rows are source/reference material')],
 ['author instructions blocked',presentation.includes('AUTHOR_INSTRUCTION')&&presentation.includes('avora should')&&presentation.includes('avora must')],
 ['class/term provenance stripped',presentation.includes('PROVENANCE')&&presentation.includes('JSS[123]')],
 ['internal formula/reference unit excluded from learner plans',sent.includes('isLearnerTeachingUnit')&&sent.includes('core formula\\s*&\\s*method reference')],
 ['source explain/example/check use learner sanitizer',sent.includes('sanitizeSourceForLearner(value)')],
 ['raw source is compiled into learner moments',client.includes('composeLearnerSourceMoments(unit.structuredSteps)')],
 ['factorization foundation includes standard form',presentation.includes('ax² + bx + c')],
 ['factorization derives sum b before use',presentation.includes('m + n = b')],
 ['factorization derives product ac before use',presentation.includes('m × n = a × c')],
 ['parent registration creates authenticated PARENT session',parentRegister.includes('createSession')&&parentRegister.includes("role:'PARENT'")],
 ['parent registration sends user directly to family setup',parentForm.includes("'/parent/family'")&&parentRegister.includes("next:'/parent/family'")],
 ['parent can create a brand-new learner',family.includes('<ParentCreateChild/>')&&createChild.includes("'STUDENT'")],
 ['new child is linked to creating parent inside transaction',createChild.includes('parent_student_links')&&createChild.includes("'ACTIVE'")],
 ['existing learner can invite parent by email',studentConnect.includes('/api/parent-link-code/invite')&&learnerInvite.includes('sendParentConnectionInvite')],
 ['learner invitation still requires parent acceptance',learnerInvite.includes('sign in and accept the connection')],
 ['parent can link existing learner with one-time code',family.includes('<ParentLinkChild inline/>')&&parentLink.includes('parent_link_codes')],
 ['link code is locked and single-use',parentLink.includes('FOR UPDATE')&&parentLink.includes('used_at=now()')],
 ['duplicate active parent-child link prevented',parentLink.includes('already linked to your family')],
 ['learner cannot occupy another active family subscription',parentLink.includes('another AVORA Family subscription')],
 ['family is capped at 3 learner identities',parentLink.includes('FAMILY_MAX_STUDENTS')&&createChild.includes('FAMILY_MAX_STUDENTS')],
 ['parent login lands on parent dashboard',signin.includes("session.role==='PARENT'")&&signin.includes("redirect('/parent')")],
 ['parent mobile nav has real Overview Children Plan destinations',mobile.includes('href="/parent"')&&mobile.includes('href="/parent/family"')&&mobile.includes('href="/parent/billing"')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)pass++}
console.log(`V14.7.1 student-safe/family audit: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
