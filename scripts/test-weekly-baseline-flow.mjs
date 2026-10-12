import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import {z} from 'zod';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),student='11111111-1111-4111-8111-111111111111',attemptId='22222222-2222-4222-8222-222222222222';
function fixture(options={}){
 const calls=[],cache=new Map(),bank=Array.from({length:20},(_,i)=>({id:`00000000-0000-4000-8000-${String(i).padStart(12,'0')}`,
  objective_id:`00000000-1111-4000-8000-${String(i<9?1:i<18?2:3).padStart(12,'0')}`,subject_name:i<9?'Mathematics':i<18?'English Language':'Basic Science',
  objective_text:'TEST_ONLY_OBJECTIVE',week_number:options.future?2:1,term:1,prompt:'TEST_ONLY_QUESTION',options:['One','Two','Three','Four'],
  answer_key:{correct:'B'},explanation:'TEST_ONLY',item_type:'MCQ',status:'PUBLISHED',reviewer_id:student,reviewed_at:new Date()}));
 let state=null,attempt=null,timedOut=false,revoked=false;
 const sql=async(strings,...values)=>{
  const text=strings.join('?');calls.push({text,values});
  if(text.includes('SELECT i.*'))return options.invalidBank?bank.slice(0,19):bank;
  if(text.includes('SELECT o.id FROM weekly_curriculum_objectives'))return revoked?[]:[...new Set(bank.map(item=>item.objective_id))].map(id=>({id}));
  if(text.includes('SELECT subject_name'))return ['Mathematics','English Language','Basic Science'].map(subject_name=>({subject_name}));
  if(text.includes('SELECT baseline_question_ids'))return options.configured===false?[]:[{baseline_question_ids:bank.map(x=>x.id),baseline_term:1,baseline_reviewed_by:student,baseline_reviewed_at:new Date()}];
  if(text.includes('SELECT * FROM weekly_student_baseline_state'))return state?[{...state}]:[];
  if(text.includes('INSERT INTO weekly_student_baseline_state')){state??={status:'NOT_STARTED',first_offered_at:new Date()};return [{...state}]}
  if(text.includes('INSERT INTO weekly_baseline_attempts')){
   attempt={id:attemptId,student_id:student,class_level:'JSS1',status:'IN_PROGRESS',item_snapshot:JSON.parse(values[3]),answer_data:{},seconds_remaining:900};return [{id:attemptId}];
  }
  if(text.includes('FROM weekly_baseline_attempts'))return attempt&&values[0]===attemptId&&values[1]===student?[{...attempt,timed_out:timedOut,seconds_remaining:timedOut?0:900}]:[];
  if(text.includes("SET status='IN_PROGRESS'")){state.status='IN_PROGRESS';state.attempt_id=values[0]}
  if(text.includes('SET answer_data='))attempt.answer_data=JSON.parse(values[0]);
  if(text.includes('SET status=')&&text.includes('weekly_baseline_attempts')){attempt.status=values[0];attempt.result_data=JSON.parse(values[1])}
  if(text.includes("SET status='COMPLETED'"))state.status='COMPLETED';
  return [];
 };sql.begin=work=>work(sql);
 function load(file){
  file=resolve(root,file);if(cache.has(file))return cache.get(file);const mod={exports:{}};cache.set(file,mod.exports);
  const js=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  new Function('module','exports','require',js)(mod,mod.exports,name=>{
   if(name==='zod')return {z};if(name==='next/server')return {NextResponse:{json:(body,init)=>Response.json(body,init)}};
   if(name==='@/lib/auth')return {getSession:async()=>options.auth===null?null:{userId:student,role:options.role??'STUDENT'}};
   if(name==='./db'||name==='@/lib/db')return {sql,withDbRetry:work=>work()};
   if(name==='./dawnAccess')return {getDawnGate:async()=>({status:options.gate??'ready',classLevel:'JSS1',term:1,week:1})};
   return load((name.startsWith('@/')?name.slice(2):resolve(dirname(file),name))+'.ts');
  });return mod.exports;
 }
 const route=load('app/api/weekly/baseline/route.ts'),admin=load('app/api/admin/weekly/baseline/route.ts');
 const request=(body,method='POST')=>new Request('https://avora.test',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 return {bank,calls,start:()=>route.POST(request({action:'START'})),get:()=>route.GET(),post:body=>route.POST(request(body)),
  adminPut:ids=>admin.PUT(request({classLevel:'JSS1',term:1,questionIds:ids},'PUT')),expire:()=>{timedOut=true},revoke:()=>{revoked=true},stored:()=>attempt};
}
test('reviewed baseline starts once, resumes saved answers and never leaks unchecked keys',async()=>{
 const f=fixture(),first=await f.start();assert.equal(first.status,200);const paper=(await first.json()).attempt;
 assert.equal(paper.questions.length,20);assert.equal(paper.secondsRemaining,900);
 for(const question of paper.questions){assert.ok(!('answer' in question));assert.ok(!('explanation' in question));assert.equal(question.savedAnswer,null)}
 const answer={action:'ANSWER',attemptId:paper.id,itemId:paper.questions[0].id,answer:'Two'};
 assert.equal((await f.post(answer)).status,200);assert.equal((await f.post({...answer,answer:'One'})).status,200);
 const resumed=(await (await f.start()).json()).attempt;assert.equal(resumed.id,paper.id);assert.equal(resumed.questions[0].savedAnswer,'One');
 assert.equal(f.calls.filter(x=>x.text.includes('INSERT INTO weekly_baseline_attempts')).length,1);
});
test('missing, invalid or future papers cannot create attempts',async()=>{
 for(const options of [{configured:false},{invalidBank:true},{future:true}]){
  const f=fixture(options);assert.equal((await f.start()).status,409);
  assert.ok(!f.calls.some(x=>x.text.includes('INSERT INTO weekly_baseline_attempts')));
 }
});
test('baseline marking is private, seeds weaknesses once and preserves existing schedules',async()=>{
 const f=fixture(),paper=(await (await f.start()).json()).attempt;
 await f.post({action:'ANSWER',attemptId:paper.id,itemId:paper.questions[0].id,answer:'Two'});
 const finished=await f.post({action:'FINISH',attemptId:paper.id});assert.equal(finished.status,200);
 const result=(await finished.json()).attempt;assert.equal(result.submitted,true);assert.equal(result.questions.length,0);assert.equal(result.summary.length,3);
 assert.ok(!/"(correct|total|answer|score|percentage)":/.test(JSON.stringify(result)));
 assert.equal(f.stored().result_data[0].correct,1);
 const schedules=f.calls.filter(x=>x.text.includes('INSERT INTO weekly_student_item_schedule'));assert.equal(schedules.length,19);
 assert.ok(schedules.every(x=>x.text.includes('ON CONFLICT(student_id,item_id) DO NOTHING')));
 await f.post({action:'FINISH',attemptId:paper.id});assert.equal(f.calls.filter(x=>x.text.includes('INSERT INTO weekly_student_item_schedule')).length,19);
});
test('server expiry finalizes saved answers and prevents late answer changes',async()=>{
 const f=fixture(),paper=(await (await f.start()).json()).attempt;f.expire();
 const result=(await (await f.post({action:'ANSWER',attemptId:paper.id,itemId:paper.questions[0].id,answer:'Two'})).json()).attempt;
 assert.equal(result.expired,true);assert.deepEqual(f.stored().answer_data,{});
 assert.equal((await (await f.get()).json()).attempt.submitted,true);
});
test('foreign attempts, foreign items and invalid options cannot save answers',async()=>{
 const f=fixture(),paper=(await (await f.start()).json()).attempt;
 for(const [change,status] of [[{attemptId:student},404],[{itemId:student},400],[{answer:'Outside the options'},400]])
  assert.equal((await f.post({action:'ANSWER',attemptId:paper.id,itemId:paper.questions[0].id,answer:'Two',...change})).status,status);
 assert.deepEqual(f.stored().answer_data,{});
});
test('a saved baseline cannot bypass revoked objective or class-subject access',async()=>{
 const f=fixture(),paper=(await (await f.start()).json()).attempt;f.revoke();
 assert.equal((await f.get()).status,403);assert.equal((await f.start()).status,403);
 assert.equal((await f.post({action:'ANSWER',attemptId:paper.id,itemId:paper.questions[0].id,answer:'Two'})).status,403);
 assert.deepEqual(f.stored().answer_data,{});
 const guard=f.calls.find(call=>call.text.includes('SELECT o.id FROM weekly_curriculum_objectives'));
 for(const condition of ["o.approval_status='PUBLISHED'",'cs.active=true','o.class_level=','o.week_number<='])assert.ok(guard.text.includes(condition));
});
test('only the admin can select a mixed baseline and selection never releases classes',async()=>{
 const blocked=fixture();assert.equal((await blocked.adminPut(blocked.bank.map(x=>x.id))).status,403);
 const f=fixture({role:'ADMIN'});assert.equal((await f.adminPut(f.bank.map(x=>x.id))).status,200);
 assert.equal((await f.adminPut(Array(20).fill(f.bank[0].id))).status,409);
 assert.ok(f.calls.some(x=>x.text.includes('weekly_admin_audit_log')));
 const insert=f.calls.find(x=>x.text.includes('INSERT INTO weekly_class_flags'));assert.ok(!insert.text.includes('enabled='));
});
