import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import {z} from 'zod';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const student='11111111-1111-4111-8111-111111111111',objective='22222222-2222-4222-8222-222222222222';
const sessionId='33333333-3333-4333-8333-333333333333';
function loader(overrides){
 const cache=new Map();
 function load(file){
  file=resolve(root,file);if(cache.has(file))return cache.get(file);
  const mod={exports:{}};cache.set(file,mod.exports);
  const compiled=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  new Function('module','exports','require',compiled)(mod,mod.exports,name=>{
   if(name in overrides)return overrides[name];
   const target=name.startsWith('@/')?resolve(root,name.slice(2)):resolve(dirname(file),name);
   return load(target+'.ts');
  });return mod.exports;
 }
 return load;
}
const policy=loader({})('lib/weeklyWorkspacePolicy.ts');
const published={id:objective,prompt:'Test question',options:['One','Two','Three','Four'],answer_key:{correct:'B'},
 item_type:'MCQ',status:'PUBLISHED',objective_id:objective,reviewer_id:student,reviewed_at:'2026-10-12',explanation:'Test explanation'};
test('serving needs published reviewed content and exactly one defensible key',()=>{
 assert.equal(policy.reviewedPracticeItem(published).answer,'Two');
 for(const change of [{status:'APPROVED'},{reviewer_id:null},{reviewed_at:null},{answer_key:null},{answer_key:'No match'},
  {options:['One','One','Three','Four']},{explanation:''},{item_type:'SHORT_ANSWER'},{objective_id:null}])
  assert.equal(policy.reviewedPracticeItem({...published,...change}),null);
 assert.deepEqual(Object.keys(policy.publicPracticeItem(policy.reviewedPracticeItem(published))).sort(),['id','options','prompt']);
});
test('study is not mastery and seven distinct successful answers use existing evidence policy',()=>{
 assert.equal(policy.weeklyProgress(0,0,true).status,'STUDIED');
 assert.equal(policy.weeklyProgress(0,0,false).status,'NOT_STARTED');
 assert.notEqual(policy.weeklyProgress(5,5,true).status,'MASTERED');
 assert.equal(policy.weeklyProgress(7,7,false).status,'MASTERED');
 assert.notEqual(policy.weeklyProgress(7,6,false).status,'MASTERED');
 assert.equal(policy.weeklyProgress(7,7,false,6).accuracy,100);
 assert.notEqual(policy.weeklyProgress(7,7,false,6).status,'MASTERED');
});

function fixture(options={}){
 const calls=[],items=Array.from({length:5},(_,i)=>({...policy.reviewedPracticeItem(published),id:`00000000-0000-4000-8000-00000000000${i}`}));
 const row={id:objective,class_level:'JSS1',subject_name:'Mathematics',topic_title:'Test topic',term:1,week_number:options.objectiveWeek??1};
 let submitted=false,open=Boolean(options.resume),reportSaved=false,source=options.source??'DAILY_LESSON',activeItems=items;const answers=new Map(),seeded=new Set();
 const query=async(strings,...values)=>{
  const text=strings.join('?');calls.push({text,values});
  if(text.includes('SELECT o.id,o.subject_name,o.topic_title'))return options.catchupRows??[];
  if(text.includes('WITH candidates AS'))return options.bank??items.map(item=>({...published,id:item.id}));
  if(text.includes('SELECT item_id FROM weekly_student_item_schedule'))return [...seeded].map(item_id=>({item_id}));
  if(text.includes('FROM unnest(')){for(const id of values[1])seeded.add(id);return values[1].map(item_id=>({item_id}));}
  if(text.includes('SELECT o.*'))return options.hidden?[]:[row];
  if(text.includes('SELECT id FROM weekly_cbt_sessions'))return open?[{id:sessionId}]:[];
  if(text.includes('SELECT i.*'))return options.bank??items.map(item=>({...published,id:item.id,scheduled_interval_days:2,retention_check:false}));
  if(text.includes('INSERT INTO weekly_cbt_sessions')){
   open=true;source=text.includes("'REVISIT'")?'REVISIT':'DAILY_LESSON';
   activeItems=JSON.parse(values.at(-1));return [{id:sessionId}];
  }
  if(text.includes('SELECT id,objective_id,item_snapshot'))return values[1]===student?[{id:sessionId,objective_id:source==='REVISIT'?null:objective,
   source,mode:options.mode??'PRACTICE',item_snapshot:activeItems,submitted_at:submitted?'2026-10-12':null}]:[];
  if(text.includes('SELECT item_snapshot,submitted_at'))return [{item_snapshot:activeItems,submitted_at:submitted?'2026-10-12':null,objective_id:objective,source,mode:options.mode??'PRACTICE'}];
  if(text.includes('SELECT submitted_at,correct_count'))return [{submitted_at:submitted?'2026-10-12':null,correct_count:5,total_count:5,source,mode:options.mode??'PRACTICE',item_snapshot:options.appendBeforeFinish?[...activeItems,{...items[0],id:'extra'}]:activeItems}];
  if(text.includes('SELECT answer,is_correct'))return answers.has(values[1])?[answers.get(values[1])]:[];
  if(text.includes('FROM weekly_cbt_answers'))return [...answers.values()];
  if(text.includes('INSERT INTO weekly_cbt_answers')){
   answers.set(values[1],{item_id:values[1],answer:values[2],confidence:values[3],is_correct:values[4]});return [];
  }
  if(text.includes('UPDATE weekly_cbt_sessions'))submitted=true;
  if(text.includes('SELECT id FROM weekly_question_reports'))return reportSaved?[{id:'report'}]:[];
  if(text.includes('INSERT INTO weekly_question_reports'))reportSaved=true;
  if(text.includes('SELECT streak'))return options.schedule?[options.schedule]:[];
  if(text.includes('RETURNING study_source'))return [{study_source:values[2],studied_at:values[3]}];
  return [];
 };
 query.begin=work=>work(query);
 const load=loader({zod:{z},'next/server':{NextResponse:{json:(data,init)=>Response.json(data,init)}},
  '@/lib/auth':{getSession:async()=>options.auth===null?null:{userId:student,role:options.role??'STUDENT'}},
  './db':{sql:query,withDbRetry:work=>work()},'@/lib/db':{sql:query,withDbRetry:work=>work()},
  './dawnAccess':{getDawnGate:async()=>({status:options.gate??'ready',classLevel:'JSS1',term:1,week:options.currentWeek??1})}
 });
 const route=load('app/api/weekly/practice/route.ts'),study=load('app/api/weekly/study/route.ts');
 const request=body=>new Request('https://avora.test/api/weekly/practice',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 return {calls,items,post:body=>route.POST(request(body)),get:()=>route.GET(new Request('https://avora.test/api/weekly/practice?sessionId='+sessionId)),
  study:body=>study.POST(request(body)),workspace:load('lib/weeklyWorkspace.ts'),revisit:load('lib/weeklyRevisit.ts'),catchup:load('lib/weeklyCatchup.ts')};
}
test('weekly routes reject unauthenticated and non-student users before data access',async()=>{
 for(const [options,status] of [[{auth:null},401],[{role:'PARENT'},403],[{role:'ADMIN'},403]]){
  const f=fixture(options);assert.equal((await f.get()).status,status);assert.equal(f.calls.length,0);
 }
});
test('every existing guardian blocked state rejects weekly data',async()=>{
 for(const gate of ['legacy','onboarding_required','verification_pending']){
  const f=fixture({gate});assert.equal((await f.get()).status,403);assert.equal(f.calls.length,0);
 }
});
test('draft, other-class and future objective IDs fail closed',async()=>{
 for(const options of [{hidden:true},{objectiveWeek:2}]){
  const f=fixture(options);assert.equal((await f.get()).status,404);
  const check=f.calls.find(x=>x.text.includes('SELECT o.*'));
  assert.ok(check.text.includes("o.approval_status='PUBLISHED'"));
  assert.ok(check.text.includes('cs.active=true'));assert.ok(check.text.includes('weekly_student_optional_subjects'));
  assert.equal(check.values[1],'JSS1');
 }
});
test('practice response contains no unchecked answer keys or explanations',async()=>{
 const f=fixture();const body=await (await f.get()).json();
 assert.equal(body.questions.length,5);
 for(const q of body.questions){assert.equal(q.saved,null);assert.ok(!('answer' in q));assert.ok(!('explanation' in q));}
});
test('official exam snapshots never expose corrections through the practice API',async()=>{
 for(const options of [{source:'WEEKLY_EXAM'},{mode:'EXAM'}]){
  const f=fixture(options);assert.equal((await f.get()).status,404);
  assert.ok(!f.calls.some(x=>x.text.includes('FROM weekly_cbt_answers')));
 }
});
test('daily revisit stores at most eight reviewed items in the existing CBT model',async()=>{
 const bank=Array.from({length:12},(_,i)=>({...published,id:`00000000-0000-4000-8000-${String(i).padStart(12,'0')}`,
  scheduled_interval_days:i===0?21:2,retention_check:i===0}));
 const f=fixture({bank});const response=await f.post({action:'START_REVISIT',studentId:'someone-else'});
 assert.equal(response.status,200);const data=await response.json();assert.equal(data.questions.length,8);
 assert.equal(data.objectiveId,null);assert.ok(data.questions.every(q=>q.saved===null&&!('answer' in q)));
 const insert=f.calls.find(x=>x.text.includes('INSERT INTO weekly_cbt_sessions'));
 assert.equal(insert.values[0],student);assert.equal(insert.values[1].length,8);
 assert.ok(insert.text.includes("'REVISIT','PRACTICE'"));
 assert.ok(JSON.parse(insert.values[2]).every(item=>item.objectiveId===objective));
 assert.equal(JSON.parse(insert.values[2])[0].retentionCheck,true);
 await f.post({action:'START_REVISIT'});
 assert.equal(f.calls.filter(x=>x.text.includes('INSERT INTO weekly_cbt_sessions')).length,1);
 const query=f.calls.find(x=>x.text.includes('FROM weekly_student_item_schedule schedule'));
 for(const guard of ["AT TIME ZONE 'Africa/Lagos'","o.approval_status='PUBLISHED'","i.status='PUBLISHED'",
  "m.pool='LIVE'",'weekly_student_optional_subjects',"last_answer.confidence='SURE'",'count(DISTINCT r.student_id)>=3',"s.mode='PRACTICE'"])
  assert.ok(query.text.includes(guard),guard);
 const existing=f.calls.find(x=>x.text.includes('SELECT id FROM weekly_cbt_sessions')&&x.text.includes("source='REVISIT'"));
 assert.ok(existing.text.includes('submitted_at IS NULL'));
 const budget=f.calls.find(x=>x.text.includes('sum(cardinality(question_ids))'));
 assert.ok(budget.text.includes('submitted_at AT TIME ZONE'));assert.ok(budget.text.includes('started_at AT TIME ZONE'));
});
test('catch-up seeds a reviewed objective once without resetting existing schedules',async()=>{
 const f=fixture({catchupRows:[{id:objective,subject_name:'Mathematics',topic_title:'TEST_ONLY',objective_text:'TEST_ONLY',term:1,week_number:1,reason:'NOT_STUDIED'}]});
 const context={studentId:student,classLevel:'JSS1',term:1,week:2};
 assert.equal(await f.catchup.seedWeeklyCatchup(context),1);assert.equal(await f.catchup.seedWeeklyCatchup(context),0);
 const insert=f.calls.find(x=>x.text.includes('FROM unnest('));assert.equal(insert.values[0],student);assert.equal(insert.values[1].length,1);
 assert.ok(insert.text.includes('ON CONFLICT(student_id,item_id) DO NOTHING'));
 const list=f.calls.find(x=>x.text.includes('SELECT o.id,o.subject_name,o.topic_title'));
 for(const guard of ["o.approval_status='PUBLISHED'",'weekly_student_optional_subjects','evidence.total<7 OR evidence.retained<evidence.total',"s.mode='PRACTICE'"])
  assert.ok(list.text.includes(guard),guard);
 const bank=f.calls.find(x=>x.text.includes('WITH candidates AS'));
 for(const guard of ["m.pool='LIVE'",'weekly_student_optional_subjects','count(DISTINCT r.student_id)>=3','o.week_number<='])assert.ok(bank.text.includes(guard),guard);
});
test('21-day retention includes only completed own practice and treats guessing separately',async()=>{
 const f=fixture();assert.deepEqual(await f.revisit.weeklyRetentionSummary({studentId:student,classLevel:'JSS1',term:1,week:1}),
  {questions:0,correct:0,retained:0});
 const query=f.calls.find(x=>x.text.includes('jsonb_array_elements'));
 assert.equal(query.values[0],student);
 for(const guard of ["s.source='REVISIT'","s.mode='PRACTICE'",'s.submitted_at IS NOT NULL',"a.confidence IS DISTINCT FROM 'GUESS'","item->>'retentionCheck'='true'"])
  assert.ok(query.text.includes(guard),guard);
});
test('no eligible revisit content yields an empty state, not fabricated questions',async()=>{
 const f=fixture({bank:[{...published,status:'DRAFT'}]});
 const response=await f.post({action:'START_REVISIT'});assert.equal(response.status,200);
 assert.deepEqual(await response.json(),{id:null,submitted:false,questions:[]});
 assert.ok(!f.calls.some(x=>x.text.includes('INSERT INTO weekly_cbt_sessions')));
});
test('revisit cannot bypass role, guardian or objective release gates',async()=>{
 for(const [options,status] of [[{auth:null},401],[{role:'PARENT'},403],[{gate:'verification_pending'},403],
  [{hidden:true},404],[{objectiveWeek:2},404]]){
  const f=fixture(options);assert.equal((await f.post({action:'START_REVISIT'})).status,status);
 }
});
test('start stores reviewed questions in existing CBT model and resumes the same session',async()=>{
 const f=fixture();const body={action:'START',objectiveId:objective,studentId:'another-student'};
 assert.equal((await f.post(body)).status,200);assert.equal((await f.post(body)).status,200);
 const inserts=f.calls.filter(x=>x.text.includes('INSERT INTO weekly_cbt_sessions'));
 assert.equal(inserts.length,1);assert.equal(inserts[0].values[0],student);assert.equal(inserts[0].values[2].length,5);
 assert.ok(inserts[0].text.includes("'DAILY_LESSON','PRACTICE'"));
 const bank=f.calls.find(x=>x.text.includes('SELECT i.*'));
 for(const guard of ["m.pool='LIVE'","i.status='PUBLISHED'","r.status='PENDING'",'count(DISTINCT r.student_id)>=3'])assert.ok(bank.text.includes(guard));
});
test('fewer than five valid reviewed questions cannot start practice',async()=>{
 const f=fixture({bank:[published,{...published,status:'APPROVED'}]});
 assert.equal((await f.post({action:'START',objectiveId:objective})).status,409);
 assert.ok(!f.calls.some(x=>x.text.includes('INSERT INTO weekly_cbt_sessions')));
});
test('reports are scoped to owned practice questions and repeated reports count once',async()=>{
 const f=fixture();const report={action:'REPORT',sessionId,itemId:f.items[0].id,reason:'Please review this question.'};
 assert.equal((await f.post(report)).status,200);assert.equal((await f.post(report)).status,200);
 assert.equal(f.calls.filter(x=>x.text.includes('INSERT INTO weekly_question_reports')).length,1);
 assert.equal((await f.post({...report,itemId:objective})).status,404);
});
test('answer is saved once, checked on the server, and immutable after feedback',async()=>{
 const f=fixture(),body={action:'ANSWER',sessionId,itemId:f.items[0].id,answer:'Two',confidence:'SURE'};
 const first=await f.post(body);assert.equal(first.status,200);assert.equal((await first.json()).correct,true);
 await f.post(body);assert.equal(f.calls.filter(x=>x.text.includes('INSERT INTO weekly_cbt_answers')).length,1);
 assert.equal((await f.post({...body,answer:'One'})).status,409);
 assert.equal((await f.post({...body,itemId:objective})).status,400);
});
test('incomplete submission is blocked; finishing twice schedules revisit only once',async()=>{
 const f=fixture();assert.equal((await f.post({action:'FINISH',sessionId})).status,409);
 for(const [i,item] of f.items.entries())await f.post({action:'ANSWER',sessionId,itemId:item.id,answer:'Two',confidence:i===0?'GUESS':'SURE'});
 assert.equal((await f.post({action:'FINISH',sessionId})).status,200);
 const again=await f.post({action:'FINISH',sessionId});assert.equal((await again.json()).alreadySubmitted,true);
 const schedules=f.calls.filter(x=>x.text.includes('INSERT INTO weekly_student_item_schedule'));
 assert.equal(schedules.length,5);assert.equal(schedules[0].values[2],1);assert.equal(schedules[1].values[2],2);
 assert.ok(schedules.every(x=>x.text.includes("AT TIME ZONE 'Africa/Lagos'")));
 assert.ok(f.calls.find(x=>x.text.includes('UPDATE weekly_cbt_sessions')).text.includes('submitted_at=clock_timestamp()'));
});
test('finishing checks the locked paper when a similar follow-up was appended concurrently',async()=>{
 const f=fixture({appendBeforeFinish:true});
 for(const item of f.items)assert.equal((await f.post({action:'ANSWER',sessionId,itemId:item.id,answer:'Two',confidence:'SURE'})).status,200);
 assert.equal((await f.post({action:'FINISH',sessionId})).status,409);
 assert.ok(!f.calls.some(call=>call.text.includes('UPDATE weekly_cbt_sessions')));
 assert.ok(!f.calls.some(call=>call.text.includes('INSERT INTO weekly_student_item_schedule')));
});
test('study completion uses authenticated identity and does not create answer evidence',async()=>{
 const f=fixture();const response=await f.study({objectiveId:objective,source:'LESSON',action:'COMPLETE',studentId:'someone-else'});
 assert.equal(response.status,200);
 const insert=f.calls.find(x=>x.text.includes('INSERT INTO weekly_objective_study'));
 assert.equal(insert.values[0],student);assert.equal(insert.values[2],'LESSON');
 assert.ok(!f.calls.some(x=>x.text.includes('INSERT INTO weekly_cbt_answers')));
});
test('correct practice before the Lagos due date preserves the retention schedule',async()=>{
 const f=fixture({schedule:{streak:1,due:false}});
 for(const item of f.items)await f.post({action:'ANSWER',sessionId,itemId:item.id,answer:'Two',confidence:'SURE'});
 const result=await f.post({action:'FINISH',sessionId});
 assert.equal(result.status,200);assert.equal((await result.json()).correct,5);
 assert.equal(f.calls.filter(x=>x.text.includes('INSERT INTO weekly_student_item_schedule')).length,0);
 const check=f.calls.find(x=>x.text.includes('SELECT streak'));
 assert.ok(check.text.includes("AT TIME ZONE 'Africa/Lagos'"));assert.ok(check.text.includes('FOR UPDATE'));
});
test('due correct practice advances the existing two, seven, twenty-one day intervals',async()=>{
 for(const [streak,interval] of [[1,7],[2,21]]){
  const f=fixture({schedule:{streak,due:true}});
  for(const item of f.items)await f.post({action:'ANSWER',sessionId,itemId:item.id,answer:'Two'});
  assert.equal((await f.post({action:'FINISH',sessionId})).status,200);
  const schedules=f.calls.filter(x=>x.text.includes('INSERT INTO weekly_student_item_schedule'));
  assert.equal(schedules.length,5);assert.ok(schedules.every(x=>x.values[2]===interval&&x.values[4]===streak+1));
 }
});
test('early wrong and guessed answers reset the retention streak and return tomorrow',async()=>{
 const f=fixture({schedule:{streak:2,due:false}});
 for(const [i,item] of f.items.entries())await f.post({action:'ANSWER',sessionId,itemId:item.id,
  answer:i===0?'One':'Two',confidence:i===1?'GUESS':'SURE'});
 const result=await f.post({action:'FINISH',sessionId});assert.equal(result.status,200);
 assert.equal((await result.json()).correct,4);
 const schedules=f.calls.filter(x=>x.text.includes('INSERT INTO weekly_student_item_schedule'));
 assert.equal(schedules.length,2);assert.ok(schedules.every(x=>x.values[2]===1&&x.values[4]===0));
});
test('past-week study records are read-only',async()=>{
 const f=fixture({objectiveWeek:1,currentWeek:2});
 assert.equal((await f.study({objectiveId:objective,source:'TEXTBOOK',action:'COMPLETE'})).status,409);
 assert.ok(!f.calls.some(x=>x.text.includes('INSERT INTO weekly_objective_study')));
 const context={studentId:student,classLevel:'JSS1',term:1,week:2};
 const rows=await f.workspace.weeklyObjective(context,objective);assert.equal(rows.week_number,1);
 await assert.rejects(()=>f.workspace.weeklyObjectives(context,1,3),/not been released/);
});
