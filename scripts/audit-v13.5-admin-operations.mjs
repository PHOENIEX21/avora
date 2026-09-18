import fs from 'node:fs';
import path from 'node:path';
const read=p=>fs.readFileSync(p,'utf8');

const adminPages=[
 'app/admin/page.tsx',
 'app/admin/academic-preview/page.tsx',
 'app/admin/students/page.tsx',
 'app/admin/students/[id]/page.tsx',
 'app/admin/families/page.tsx',
 'app/admin/families/[id]/page.tsx',
 'app/admin/live-assessments/page.tsx',
 'app/admin/live-assessments/new/page.tsx',
 'app/admin/live-assessments/[id]/page.tsx',
 'app/admin/live-assessments/[id]/results/page.tsx',
 'app/admin/support/page.tsx',
 'app/admin/support/[id]/page.tsx',
];
const adminApis=[
 'app/api/admin/families/[id]/release-seat/route.ts',
 'app/api/admin/live-assessments/route.ts',
 'app/api/admin/live-assessments/[id]/route.ts',
 'app/api/admin/support/[id]/route.ts',
];
const layout=read('app/layout.tsx');
const mobile=read('components/MobileNav.tsx');
const access=read('lib/admin/access.ts');
const dashboard=read('app/admin/page.tsx');
const preview=read('app/admin/academic-preview/page.tsx');
const curriculum=read('lib/curriculumTutor.ts');
const css=read('app/globals.css');

const pageGuards=adminPages.every(p=>read(p).includes('requireAdmin'));
const apiGuards=adminApis.every(p=>{
 const t=read(p);return t.includes("role!=='ADMIN'")||t.includes("role !== 'ADMIN'")||t.includes('requireAdmin');
});
const stalePreview=/jssLesson\.(objectives|workedExamples|misconceptions|prerequisites|teaching|guidedPractice|independentPractice|mastery)/.test(preview);

const checks=[
 ['all admin pages are server-side admin guarded',pageGuards],
 ['all admin mutation/read APIs under /api/admin are admin guarded',apiGuards],
 ['non-admin redirect is role-aware for parents and learners',access.includes("s.role==='PARENT'?'/parent':'/home'")],
 ['desktop admin has dedicated operations navigation',layout.includes('admin-desktop-nav')&&layout.includes('/admin/academic-preview')&&layout.includes('/admin/students')&&layout.includes('/admin/live-assessments')&&layout.includes('/admin/support')&&layout.includes('/admin/families')],
 ['mobile admin has dedicated admin navigation',mobile.includes("role==='ADMIN'")&&mobile.includes('admin-mobile-dock')&&!mobile.includes("if(role==='ADMIN') return null")],
 ['admin dashboard links all five core operating areas',dashboard.includes('/admin/academic-preview')&&dashboard.includes('/admin/students')&&dashboard.includes('/admin/live-assessments')&&dashboard.includes('/admin/support')&&dashboard.includes('/admin/families')],
 ['dashboard KPI failures degrade safely instead of crashing dashboard',dashboard.includes('safeCount')&&dashboard.includes('Admin tools remain available')],
 ['Academic Preview reads V13 master topic names',preview.includes('getOfficialTopicNames')&&curriculum.includes('masterTopics(classLevel,subject)')],
 ['Academic Preview uses current source-backed unit shape',preview.includes('jssLesson.units')&&preview.includes('u.sourceSteps')&&preview.includes('u.sourceChecks')],
 ['Academic Preview contains no stale legacy deep-lesson field access',!stalePreview],
 ['Academic Preview covers Primary 5/6 and JSS1/2/3',preview.includes("'Primary 5','Primary 6','JSS1','JSS2','JSS3'")],
 ['admin academic topic grid is responsive',css.includes('.academic-topic-grid{display:grid')&&css.includes('@media(max-width:560px)')&&css.includes('.academic-path-switch,.academic-topic-grid,.academic-preview-summary,.academic-inspector-stats{grid-template-columns:minmax(0,1fr)}')],
 ['admin summary/lesson stats are responsive',css.includes('.academic-preview-summary{display:grid')&&css.includes('.academic-inspector-stats{display:grid')],
 ['student/admin rows can shrink without horizontal leak',css.includes('.student-table-row>*')&&css.includes('overflow-wrap:anywhere')],
 ['admin action cards collapse to one column on mobile',css.includes('.admin-action-grid{grid-template-columns:minmax(0,1fr)}')],
 ['admin KPI cards retain existing mobile collapse',css.includes('@media(max-width:520px){.admin-kpis,.form-grid{grid-template-columns:1fr}')],
 ['family admin list retains its mobile collapse',css.includes('@media(max-width:850px){.family-admin-row{grid-template-columns:1fr 1fr}')],
 ['live assessment admin routes remain present',fs.existsSync('app/admin/live-assessments/new/page.tsx')&&fs.existsSync('app/admin/live-assessments/[id]/results/page.tsx')],
 ['support admin routes remain present',fs.existsSync('app/admin/support/page.tsx')&&fs.existsSync('app/admin/support/[id]/page.tsx')],
 ['family seat release remains admin-only and reason-gated',read('app/api/admin/families/[id]/release-seat/route.ts').includes("s.role!=='ADMIN'")&&read('app/api/admin/families/[id]/release-seat/route.ts').includes('clear verified reason')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}
console.log(`\nV13.5 ADMIN OPERATIONS AUDIT: ${pass}/${checks.length}`);
if(pass!==checks.length)process.exit(1);
