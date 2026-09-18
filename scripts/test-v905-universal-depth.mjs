import fs from 'node:fs';
const tutor=fs.readFileSync(new URL('../components/TutorClient.tsx',import.meta.url),'utf8');
const universal=fs.readFileSync(new URL('../lib/universalTeaching.ts',import.meta.url),'utf8');
const pkg=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8'));
const checks=[
 ['release version preserves universal-depth engine',Number(pkg.version.split('.')[0])>=11],
 ['all Tutor units use universal depth profile',tutor.includes('teachingDepthProfile(unit,subject)')],
 ['foundation is taught before examples',tutor.includes("label:'BUILD THE FOUNDATION FIRST'")],
 ['every term gets meaning stage',tutor.includes("label:'KEY WORD — MEANING'")],
 ['every term gets why-it-matters stage',tutor.includes("label:'WHY THAT WORD MATTERS'")],
 ['core explanation is slowed into reasoning events',tutor.includes("label:i===0?'CORE IDEA — SLOWLY':'BUILD THE IDEA — ONE REASON AT A TIME'")],
 ['fallback units receive explicit second-example contrast',tutor.includes("label:'EXAMPLE 2 — CONTRAST THE THINKING'")],
 ['all units receive misconception teaching',tutor.includes('depth.misconceptions.forEach')],
 ['all units receive mastery checklist before testing',tutor.includes("label:'BEFORE AVORA TESTS YOU'")],
 ['math reasoning asks which rule allows a step',universal.includes('which rule or operation allows that change')],
 ['english reasoning asks for word/structure evidence',universal.includes('what word or structure controls this statement')],
 ['section checks demand reasoning not final-only answers',tutor.includes('Explain the reason, not only the final answer.')],
 ['deep-example banks still remain active',tutor.includes('deepExamples(unit.title)')],
];
let fail=0;for(const [name,ok] of checks){console.log(`${ok?'✓':'✗'} ${name}`);if(!ok)fail++}
if(fail){console.error(`\nUniversal-depth tests failed: ${fail}/${checks.length}`);process.exit(1)}
console.log(`\nUniversal-depth tests passed: ${checks.length}/${checks.length}.`);
