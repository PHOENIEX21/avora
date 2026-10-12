import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url);
function fixture(options={}){
 const calls=[];let planReads=0,gateReads=0;
 const tagged=async(strings,...values)=>{const text=strings.join('?');calls.push({text,values});if(text.includes('SELECT u.full_name'))return [{full_name:'TEST_ONLY',class_level:'JSS1',onboarding_completed:true,diagnostic_completed:true}];return []};
 const mod={exports:{}};
 const js=ts.transpileModule(readFileSync(new URL('../app/home/page.tsx',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const Clock=options.now?class extends Date{constructor(...args){super(...(args.length?args:[options.now]))}static now(){return new Date(options.now).getTime()}}:Date;
 new Function('module','exports','require','Date',js)(mod,mod.exports,name=>{
  if(name==='@/lib/auth')return {getSession:async()=>options.guest?null:{userId:'fixture-student',role:options.role||'STUDENT'}};
  if(name==='@/lib/learningAccess')return {requireStudentLearningAccess:async()=>({allowed:true})};
  if(name==='@/lib/dawnAccess')return {getDawnGate:async()=>{gateReads++;return options.gate||{status:'legacy',reason:'NOT_RELEASED'}}};
  if(name==='@/lib/db')return {sql:tagged,withDbRetry:work=>work()};
  if(name==='@/lib/academicCore')return {getActiveAcademicPlan:async()=>{planReads++;return options.plan||[]}};
  if(name==='@/lib/learnerPresentation')return {learnerTopicTitle:value=>value};
  if(name==='next/navigation')return {redirect:path=>{throw new Error('REDIRECT:'+path)}};
  if(name==='next/link')return {default:()=>null};return require(name);
 },Clock);return {home:mod.exports.default,calls,planReads:()=>planReads,gateReads:()=>gateReads};
}
test('home routes guests and non-students to their own entry before learner data access',async()=>{
 for(const [options,path] of [[{guest:true},'/login'],[{role:'ADMIN'},'/admin'],[{role:'PARENT'},'/parent'],[{role:'TEACHER'},'/']]){
  const f=fixture(options);await assert.rejects(f.home(),new RegExp('REDIRECT:'+path+'$'));assert.equal(f.calls.length,0);assert.equal(f.gateReads(),0);
 }
});
test('a ready weekly student enters the existing workspace before legacy academic queries',async()=>{
 const f=fixture({gate:{status:'ready',classLevel:'JSS1',term:1,week:2}});await assert.rejects(f.home(),/REDIRECT:\/weekly\/today$/);assert.equal(f.calls.length,0);assert.equal(f.planReads(),0);
});
test('guardian pending, missing release and gate failures cannot expose academic plans or official cards through home',async()=>{
 for(const gate of [{status:'onboarding_required'},{status:'verification_pending'},{status:'legacy',reason:'WEEK_UNSET'},{status:'legacy',reason:'UNAVAILABLE'}]){
  const f=fixture({gate});await f.home();assert.equal(f.planReads(),0);assert.ok(!f.calls.some(call=>call.text.includes('FROM weekly_exam_blueprints')));
  assert.ok(f.calls.some(call=>call.text.includes('FROM mastery')));
 }
});
test('unreleased legacy classes retain existing learning and only owner-sealed official cards',async()=>{
 const f=fixture();await f.home();assert.equal(f.planReads(),1);const query=f.calls.find(call=>call.text.includes('FROM weekly_exam_blueprints'));
 for(const guard of ['v.paper_snapshot IS NOT NULL','v.locked_at IS NOT NULL','b.approved_by IS NOT NULL','b.approved_at IS NOT NULL'])assert.ok(query.text.includes(guard));
 assert.ok(query.values.includes('JSS1'));assert.ok(query.values.includes('fixture-student'));
});
test('Today selects the Lagos weekday across UTC midnight and does not pretend weekends are Friday',async()=>{
 const {renderToStaticMarkup}=require('react-dom/server');
 const plan=[{id:'fixture',day_index:2,topic_name:'TEST_ONLY_TUESDAY',subject_name:'TEST_ONLY',title:'TEST_ONLY',objective_text:'TEST_ONLY',question_target:5}];
 const weekday=fixture({now:'2026-10-12T23:30:00Z',plan});assert.match(renderToStaticMarkup(await weekday.home()),/TEST_ONLY_TUESDAY/);
 const weekend=fixture({now:'2026-10-17T12:00:00Z',plan:[{...plan[0],day_index:5,topic_name:'TEST_ONLY_FRIDAY'}]});assert.doesNotMatch(renderToStaticMarkup(await weekend.home()),/TEST_ONLY_FRIDAY/);
});
