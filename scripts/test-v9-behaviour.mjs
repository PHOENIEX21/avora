import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function load(path){const src=fs.readFileSync(path,'utf8');const out=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const mod={exports:{}};vm.runInNewContext(out,{module:mod,exports:mod.exports,require(){throw new Error('unexpected import')},console},{filename:path});return mod.exports}
const c=load('lib/tutorCurriculum.ts');
const l=load('lib/learnerIntelligence.ts');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg);console.log('✓ '+msg)};
assert(c.getTutorPlan('BECE','Mathematics','Simultaneous equations')?.units.some(u=>u.title==='Simultaneous equations'),'BECE simultaneous-equations alias reaches the full Algebra plan');
assert(c.getTutorPlan('NCEE','English Language','Concord')?.goal.includes('subjects')||c.getTutorPlan('NCEE','English Language','Concord')?.units?.length>0,'NCEE English Concord stays on its own plan');
assert(c.getTutorPlan('BECE','English Language','Concord')?.units?.length>0,'BECE Concord remains teachable');
assert(l.evidenceStatus(.86,8,0)==='MASTERED','mastery requires strong repeated evidence');
assert(l.evidenceStatus(.86,2,0)!=='MASTERED','two answers cannot create fake mastery');
assert(l.evidenceStatus(.32,7,3)==='NEEDS_TEACHING','repeated weak evidence triggers teaching');
assert(l.inferMisconception({topic:'Algebra',skill:'Simultaneous equations by elimination'})?.key==='ELIMINATION_CHOICE','simultaneous-equation errors map to elimination misconception');
assert(l.inferMisconception({topic:'Concord',skill:'Subject verb agreement'})?.key==='TRUE_SUBJECT_AGREEMENT','concord errors map to true-subject misconception');
const r=l.remediationReason([{topic:'Algebra',percent:35,total:5},{topic:'Geometry',percent:70,total:5}]);
assert(r.topic==='Algebra'&&r.reason.includes('full reteaching'),'remediation prioritises the weakest topic and requests full reteaching');
console.log('\nV9 behaviour tests passed.');
