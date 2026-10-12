import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const context={studentId:'11111111-1111-4111-8111-111111111111',classLevel:'JSS1',term:1,week:1};
const event={sessionId:'new-session',itemId:'similar',objectiveId:'objective',correct:true,confidence:'SURE'};
function fixture({linked=[],owned=true,fixed=false,budget=0,bank=true,open=null}={}){
 const calls=[];
 const query=async(strings,...values)=>{const text=strings.join('?');calls.push({text,values});
  if(text.includes('SELECT objective_id FROM weekly_mistakes'))return owned?[{objective_id:'objective'}]:[];
  if(text.includes('SELECT * FROM weekly_mistakes'))return [{id:'mistake',objective_id:'objective',item_id:'original',followup_item_id:null,fixed_at:fixed?'date':null}];
  if(text.includes('confirm_due_on<='))return linked;
  if(text.includes('SELECT id,item_snapshot,question_ids'))return open?[open]:[];
  if(text.includes('SELECT i.*'))return bank?[{id:'similar',objective_id:'objective',prompt:'TEST ONLY',options:['A','B','C','D'],answer_key:{correct:'A'},explanation:'TEST ONLY',item_type:'MCQ',status:'PUBLISHED',reviewer_id:'reviewer',reviewed_at:'date'}]:[];
  if(text.includes('INSERT INTO weekly_cbt_sessions'))return [{id:'session'}];
  return [];
 };query.begin=fn=>fn(query);
 class WorkspaceError extends Error{constructor(message,status=403){super(message);this.status=status}}
 const source=ts.transpileModule(readFileSync(resolve(root,'lib/weeklyMistakes.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const policySource=ts.transpileModule(readFileSync(resolve(root,'lib/weeklyWorkspacePolicy.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const policy={exports:{}};new Function('module','exports','require',policySource)(policy,policy.exports,name=>name==='./answers'?{answerIsCorrect:(answer,key)=>answer===key}:{evidenceStatus:()=>null});
 const mod={exports:{}};
 new Function('module','exports','require',source)(mod,mod.exports,name=>({
  './db':{sql:query,withDbRetry:fn=>fn()},'./weeklyWorkspace':{WeeklyWorkspaceError:WorkspaceError,weeklyObjective:async()=>({subject_name:'Mathematics',term:1,week_number:1,topic_title:'TEST ONLY'})},
  './weeklyWorkspacePolicy':policy.exports,'./weeklyRevisit':{WEEKLY_REVISIT_DAILY_CAP:8,weeklyRevisitBudget:async()=>budget}
 }[name]));return {lib:mod.exports,calls,query};
}
test('wrong practice records an owned mistake and resets earlier proof on conflict',async()=>{
 const f=fixture();await f.lib.recordWeeklyMistakeAnswer(f.query,context,{...event,correct:false});
 const insert=f.calls.find(c=>c.text.includes('INSERT INTO weekly_mistakes'));
 assert.deepEqual(insert.values,[context.studentId,'similar','objective','new-session']);
 for(const guard of ['ON CONFLICT(student_id,item_id)','first_correct_at=NULL','fixed_at=NULL'])assert.ok(insert.text.includes(guard));
});
test('first similar correct starts the interval without fixing the original',async()=>{
 const f=fixture({linked:[{id:'mistake',first_correct_at:null}]});await f.lib.recordWeeklyMistakeAnswer(f.query,context,event);
 const update=f.calls.find(c=>c.text.includes('UPDATE weekly_mistakes'));
 assert.ok(update.text.includes('::date+2'));assert.ok(!update.text.includes('fixed_at='));
});
test('early or same-session repeats do not mark a mistake fixed',async()=>{
 for(const change of [{due:false,first_correct_session_id:'old'},{due:true,first_correct_session_id:event.sessionId}]){
  const f=fixture({linked:[{id:'mistake',first_correct_at:'date',...change}]});await f.lib.recordWeeklyMistakeAnswer(f.query,context,event);
  assert.ok(!f.calls.some(c=>c.text.includes('UPDATE weekly_mistakes')));
 }
});
test('later different-session evidence fixes the original; guessed and wrong evidence reset it',async()=>{
 const linked=[{id:'mistake',first_correct_at:'date',first_correct_session_id:'old',due:true}];
 const f=fixture({linked});await f.lib.recordWeeklyMistakeAnswer(f.query,context,event);
 assert.ok(f.calls.some(c=>c.text.includes('SET fixed_at=clock_timestamp()')));
 for(const change of [{confidence:'GUESS'},{correct:false}]){const g=fixture({linked});await g.lib.recordWeeklyMistakeAnswer(g.query,context,{...event,...change});
  assert.ok(g.calls.some(c=>c.text.includes('SET first_correct_at=NULL')));assert.ok(!g.calls.some(c=>c.text.includes('SET fixed_at=')));
 }
});
test('similar follow-up shares the reviewed Revisit model and locks the student first',async()=>{
 const f=fixture();assert.equal(await f.lib.startWeeklyFix(context,'mistake'),'session');
 const insert=f.calls.find(c=>c.text.includes('INSERT INTO weekly_cbt_sessions'));
 assert.ok(insert.text.includes("'REVISIT','PRACTICE'"));assert.equal(JSON.parse(insert.values[2])[0].mistakeId,'mistake');
 assert.equal(JSON.parse(insert.values[2])[0].id,'similar');
 const query=f.calls.find(c=>c.text.includes('SELECT i.*'));
 for(const check of ["i.status='PUBLISHED'","m.pool='LIVE'",'i.id<>','i.reviewer_id IS NOT NULL','count(DISTINCT r.student_id)>=3'])assert.ok(query.text.includes(check));
 assert.ok(f.calls.findIndex(c=>c.text.includes('FROM users'))<f.calls.findIndex(c=>c.text.includes('SELECT * FROM weekly_mistakes')));
});
test('foreign, fixed, exhausted-budget and unreviewed-bank follow-ups fail without new sessions',async()=>{
 for(const [options,status] of [[{owned:false},404],[{fixed:true},409],[{budget:8},409],[{bank:false},409]]){
  const f=fixture(options);await assert.rejects(f.lib.startWeeklyFix(context,'mistake'),e=>e.status===status);
  assert.ok(!f.calls.some(c=>c.text.includes('INSERT INTO weekly_cbt_sessions')));
 }
});
test('repeated open follow-up returns the same session even when its daily budget is full',async()=>{
 const f=fixture({budget:8,open:{id:'existing',item_snapshot:[{id:'similar',mistakeId:'mistake'}]}});
 assert.equal(await f.lib.startWeeklyFix(context,'mistake'),'existing');assert.ok(!f.calls.some(c=>c.text.includes('INSERT INTO weekly_cbt_sessions')));
});
test('existing wrong practice is imported idempotently without fabricated fixed evidence or exam corrections',async()=>{
 const f=fixture();await f.lib.weeklyMistakes(context);
 const history=f.calls.find(c=>c.text.includes('SELECT DISTINCT ON(a.item_id)'));
 assert.equal(history.values[0],context.studentId);
 for(const guard of ["s.mode='PRACTICE'","s.source IN ('DAILY_LESSON','REVISIT')",'a.is_correct=false','ON CONFLICT(student_id,item_id) DO NOTHING'])assert.ok(history.text.includes(guard));
 assert.ok(!history.text.includes('fixed_at'));assert.ok(!history.text.includes('DO UPDATE'));
 const visible=f.calls.find(c=>c.text.includes('WITH visible AS'));
 for(const guard of ["o.approval_status='PUBLISHED'",'o.class_level=', 'o.week_number<=','weekly_student_optional_subjects'])assert.ok(visible.text.includes(guard));
});
