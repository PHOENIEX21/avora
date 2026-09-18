import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function loadTsModule(path){
 const src=fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
 const js=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const mod={exports:{}};const context={module:mod,exports:mod.exports,require(){throw new Error('Unexpected import in audited module')},console};
 vm.runInNewContext(js,context,{filename:path});return mod.exports;
}
const curriculum=loadTsModule('lib/tutorCurriculum.ts');
const deep=fs.readFileSync(new URL('../lib/deepTeaching.ts',import.meta.url),'utf8');
const failures=[];let topics=0,units=0,terms=0;
for(const exam of ['BECE','NCEE'])for(const subject of ['Mathematics','English Language']){
 const names=curriculum.getTutorTopicNames(exam,subject);if(!names.length)failures.push(`${exam}/${subject}: no topic map`);
 for(const topic of names){topics++;const plan=curriculum.getTutorPlan(exam,subject,topic);if(!plan){failures.push(`${exam}/${subject}/${topic}: plan missing`);continue}
  if(!plan.goal||String(plan.goal).length<20)failures.push(`${topic}: goal too thin`);
  if(!plan.why||String(plan.why).length<20)failures.push(`${topic}: rationale too thin`);
  if(!Array.isArray(plan.units)||plan.units.length<2)failures.push(`${topic}: needs at least 2 teaching units`);
  for(const [i,u] of (plan.units||[]).entries()){units++;terms+=(u.terms||[]).length;
   if(!u.title)failures.push(`${topic} unit ${i+1}: title missing`);
   if(!Array.isArray(u.terms)||u.terms.length<1)failures.push(`${topic}/${u.title}: definitions missing`);
   if(!u.explain||String(u.explain).length<45)failures.push(`${topic}/${u.title}: explanation too thin`);
   if(!u.example||String(u.example).length<10)failures.push(`${topic}/${u.title}: worked example missing`);
   if(!u.check||String(u.check).length<10)failures.push(`${topic}/${u.title}: learner checkpoint missing`);
  }
 }
}
for(const bank of ['simultaneous equations','operations and order of operations','area of plane shapes','fractions, decimals and percentages','linear equations','concord','speech sounds: vowels and consonants','writing & composition','comprehension'])if(!deep.includes(`'${bank}'`))failures.push(`high-risk deep example bank missing: ${bank}`);
if(failures.length){console.error('Teaching-depth audit FAILED');for(const x of failures.slice(0,80))console.error(' - '+x);console.error(`Total failures: ${failures.length}`);process.exit(1)}
console.log(`Teaching-depth audit passed: ${topics} topic plans, ${units} teaching units, ${terms} explicit definitions checked.`);
console.log('Every audited unit has definitions, substantive explanation, an example and a learner checkpoint; high-risk deep-example banks are present.');
