import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const css=read('app/globals.css');
const home=read('app/home/page.tsx');
const learn=read('app/learn/page.tsx');
const tutorPage=read('app/tutor/page.tsx');
const tutor=read('components/TutorClient.tsx');
const exam=read('components/ExamClient.tsx');
const practice=read('components/PracticeClient.tsx');
const progress=read('app/progress/page.tsx');
const family=read('app/parent/family/page.tsx');
const layout=read('app/layout.tsx');

const checks=[
 ['document width is capped and horizontal leak is clipped',css.includes('html,body{width:100%;max-width:100%;overflow-x:clip}')],
 ['shared shell is viewport-safe',css.includes('.shell{width:100%;max-width:1180px')],
 ['all generic grid/flex children can shrink',css.includes('main,section,article,aside,header,footer,nav,form,div{min-width:0}')],
 ['media and inputs cannot exceed their containers',css.includes('img,video,canvas,iframe{max-width:100%')&&css.includes('input,select,textarea,button{max-width:100%}')],
 ['mobile teaching visuals no longer force 300px minimum width',!css.includes('.avora-visual-stage svg{min-width:300px}')&&!css.includes('.visual-bar-model{min-width:300px}')],
 ['visual teaching surface has controlled horizontal containment',css.includes('.avora-visual-stage{max-width:100%;overflow-x:auto')],
 ['Home keeps responsive one-column breakpoint',css.includes('@media(max-width:820px){.premium-welcome')&&home.includes('premium-home')],
 ['Learn has mobile path-row collapse',css.includes('@media(max-width:640px){.path-row')&&learn.includes('learn-v2')],
 ['Tutor grid collapses on mobile and children may shrink',css.includes('.tutor-grid,.tutor-layout{grid-template-columns:minmax(0,1fr)}')&&tutorPage.includes('tutor-page shell')&&tutor.includes('tutor-engine-v1')],
 ['Exam work area collapses and question nav uses minmax columns',css.includes('.exam-work{grid-template-columns:minmax(0,1fr);width:100%}')&&css.includes('.question-nav>div{grid-template-columns:repeat(8,minmax(0,1fr))')&&exam.includes('exam-question')],
 ['Practice is viewport-contained',css.includes('.practice-page{padding-left:16px;padding-right:16px}')&&css.includes('.practice-stage{width:100%;max-width:760px}')&&practice.includes('practice-stage')],
 ['Progress mobile evidence grids collapse safely',css.includes('.evidence-hero-v9{grid-template-columns:minmax(0,1fr)}')&&css.includes('.evidence-summary-v9,.parent-child-summary{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}')&&progress.includes('progress-v9')],
 ['Family page stacks and seat card becomes fluid',css.includes('.family-setup-head{flex-direction:column;align-items:flex-start}')&&css.includes('.family-seat-count{min-width:0;width:100%}')&&family.includes('family-setup-page')],
 ['trial countdown stacks below 560px',css.includes('.trial-live-inner{grid-template-columns:minmax(0,1fr)}')&&layout.includes('TrialCountdownStrip')],
 ['very narrow 380px phones receive reduced gutters and one-column stats',css.includes('@media(max-width:380px)')&&css.includes('.focus-meta,.evidence-summary-v9,.parent-child-summary{grid-template-columns:minmax(0,1fr)}')],
 ['mobile bottom navigation still exists for signed-in learners',css.includes('.mobile-dock{position:fixed;display:grid')&&layout.includes('MobileNav')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}
console.log(`\nV13.4 RESPONSIVE RELEASE AUDIT: ${pass}/${checks.length}`);
if(pass!==checks.length)process.exit(1);
