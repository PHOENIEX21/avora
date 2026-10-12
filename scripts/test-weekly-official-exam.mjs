import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url),root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const student='11111111-1111-4111-8111-111111111111',sessionId='22222222-2222-4222-8222-222222222222',examId='33333333-3333-4333-8333-333333333333';
export function fixture(options={}){
 const calls=[],cache=new Map(),marks=[],attempts=[],mastery=new Map();let session=null,expired=false,released=false,sealed=null;
 class WorkspaceError extends Error{constructor(message,status=403){super(message);this.status=status}}
 const rows=Array.from({length:5},(_,i)=>({id:`00000000-0000-4000-8000-${String(i).padStart(12,'0')}`,subject_name:'Mathematics',curriculum_topic_id:'TEST_ONLY',objective_id:examId,objective_text:'TEST_ONLY_OBJECTIVE',skill_id:examId,
  prompt:'TEST_ONLY_'+i,question_type:options.theory&&i===4?'SHORT_ANSWER':'MULTIPLE_CHOICE',options:['One','Two','Three','Four'],correct_answer:{value:'B'},explanation:'TEST_ONLY_SOLUTION',status:'PUBLISHED',relevance_status:'PASSED',answer_status:'PASSED'}));
 const query=async(strings,...values)=>{const text=strings.join('?');calls.push({text,values});
  if(text.includes('SELECT class_level FROM student_profiles'))return [{class_level:'JSS1'}];
  if(text.includes('SELECT q.id,q.prompt,q.question_type,q.options,q.correct_answer,q.difficulty,q.mock_question_number'))return rows;
  if(text.includes('SELECT DISTINCT membership.question_id'))return options.held?[{question_id:rows[0].id}]:[];
  if(text.includes('SELECT * FROM exam_sessions WHERE id='))return text.includes('weekly_exam_blueprint_id IS NULL')?[]:session?[session]:[];
  if(text.includes('SELECT enabled FROM weekly_class_flags'))return [{enabled:Boolean(options.weekly)}];
  if(text.includes('SELECT b.*,v.id version_id')){sealed??=load('lib/weeklyExamSession.ts').reviewedWeeklyPaper(rows,5,false);return options.unavailable?[]:[{id:examId,version_id:examId,paper_snapshot:options.unsealed?null:options.badBank?sealed.slice(0,4):sealed,class_level:'JSS1',term:1,week_number:options.future?2:1,status:'SCHEDULED',duration_minutes:15,question_count:5,title:'TEST_ONLY',release_at:'date',closes_at:'date'}]}
  if(text.includes('SELECT v.*,b.question_count'))return [{status:options.lockedStage?'LOCKED':'IN_REVIEW',class_level:'JSS1',term:1,week_number:1,question_count:5}];
  if(text.includes('SELECT id FROM exam_sessions WHERE weekly_exam_blueprint_id='))return options.started?[{id:sessionId}]:[];
  if(text.includes('SELECT q.id FROM questions q JOIN'))return rows.filter(row=>row.status==='PUBLISHED');
  if(text.includes('SELECT id,status,weekly_paper_snapshot'))return session?[session]:[];
  if(text.includes('AS open'))return [{open:options.open!==false}];
  if(text.includes('AS future'))return [{future:options.futureOpening!==false,before_start:options.beforeStart!==false}];
  if(text.includes('FROM weekly_exam_version_questions'))return options.badBank?rows.slice(0,4):rows;
  if(text.includes('INSERT INTO exam_sessions')){session={id:sessionId,status:'IN_PROGRESS',class_level:'JSS1',term:1,week_number:1,blueprint_status:'LIVE',answers:{},weekly_paper_snapshot:JSON.parse(values.at(-1)),marking_status:'NOT_REQUIRED',weekly_outcome_sync_state:'LEGACY',student_id:student,submitted_at:'2026-10-12T11:00:00Z',score:1};return [{id:sessionId}]}
  if(text.includes('SELECT es.*,b.class_level'))return session&&values[0]===sessionId&&values[1]===student?[{...session,accepts_answers:!expired,before_open:Boolean(options.beforeOpen),seconds_remaining:expired?0:899}]:[];
  if(text.includes('SELECT es.id,es.student_id,b.class_level'))return expired&&session?.status==='IN_PROGRESS'?[{id:sessionId,student_id:student,class_level:'JSS1'}]:[];
  if(text.includes('UPDATE exam_sessions SET answers=')){Object.assign(session.answers,JSON.parse(values[0]));return []}
  if(text.includes('INSERT INTO attempts')){attempts.push(values);return []}
  if(text.includes('INSERT INTO weekly_exam_question_marks')){marks.push({question_id:values[1],objective_id:values[2],subject_name:values[3],curriculum_topic_id:values[4],mark_fraction:values[5]});return []}
  if(text.includes("SET status='COMPLETED'")){session.status='COMPLETED';session.marking_status=values[2];session.score=values[1];session.weekly_outcome_sync_state='PENDING';return []}
  if(text.includes('SELECT student_id FROM exam_sessions'))return session?[{student_id:student}]:[];
  if(text.includes('SELECT es.*,b.title'))return released&&session?.status==='COMPLETED'&&session.marking_status!=='PENDING'&&session.weekly_outcome_sync_state==='PENDING'?[session]:[];
  if(text.includes('SELECT * FROM weekly_exam_question_marks'))return marks;
  if(text.includes('SELECT id FROM attempts WHERE'))return attempts.some(answer=>answer[1]===values[1])?[{id:'seen'}]:[];
  if(text.includes('SELECT count(*)::int total,count(*) FILTER'))return [{total:5,correct:0}];
  if(text.includes('FROM attempts WHERE student_id='))return [{attempts:attempts.length,correct:0,lessons:0,mastery_average:0}];
  if(text.includes('SELECT score,evidence_count FROM mastery'))return mastery.has(values[1])?[mastery.get(values[1])]:[];
  if(text.includes('INSERT INTO mastery(')){mastery.set(values[1],{score:values[2],evidence_count:(mastery.get(values[1])?.evidence_count||0)+1});return []}
  if(text.includes('week_start'))return [{week_start:'2026-10-12',week_end:'2026-10-18'}];
  if(text.includes("SET weekly_outcome_sync_state='SYNCED'"))session.weekly_outcome_sync_state='SYNCED';
  return [];
 };query.begin=work=>work(query);
 function load(file){file=resolve(root,file);if(cache.has(file))return cache.get(file);const mod={exports:{}};cache.set(file,mod.exports);
  const js=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  new Function('module','exports','require',js)(mod,mod.exports,name=>{
   if(name==='./db'||name==='@/lib/db')return {sql:query,withDbRetry:work=>work()};
   if(name==='./weeklyWorkspace'||name==='@/lib/weeklyWorkspace')return {WeeklyWorkspaceError:WorkspaceError,weeklyStudentContext:async()=>{if(options.guardianBlocked)throw new WorkspaceError('Guardian verification required.',403);return {studentId:student,classLevel:'JSS1',term:1,week:1}}};
   if(name==='@/lib/auth')return {getSession:async()=>options.guest?null:{userId:student,role:options.role||'STUDENT'}};
   if(name==='@/lib/admin/access')return {requireAdmin:async()=>{if(options.role!=='ADMIN')throw new Error('Admin required');return {userId:student,role:'ADMIN'}}};
   if(name==='@/lib/apiAccess')return {learningAccessDenial:async()=>options.denied?Response.json({error:'Subscription required'},{status:402}):null};
   if(name==='@/lib/premiumAccess')return {requirePremiumFeature:async()=>null};
   if(name==='@/lib/trialLimits')return {trialQuestionUsage:async()=>({isTrial:false}),reserveTrialQuestions:async()=>({allowed:true}),trialAssessmentCount:async()=>0};
   if(name==='@/lib/aiGateway')return {configuredAiProvider:()=>null,aiStructured:async()=>{throw new Error('AI must not receive a held paper')}};
   if(name==='@/lib/aiCostGuard')return {claimAiRequest:async()=>({allowed:false}),completeAiRequest:async()=>{}};
   if(name==='next/server')return {NextResponse:{json:(body,init)=>Response.json(body,init)}};
   if(name.startsWith('@/'))return load(name.slice(2)+'.ts');if(name.startsWith('.'))return load(resolve(dirname(file),name)+'.ts');return require(name);
  });return mod.exports;
 }
 const start=load('app/api/weekly-exam/[id]/start/route.ts'),answer=load('app/api/weekly-exam/answer/route.ts'),finish=load('app/api/weekly-exam/finish/route.ts'),read=load('app/api/weekly-exam/session/[id]/route.ts');
 const request=body=>new Request('https://avora.test',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 return {calls,rows,marks,attempts,mastery,load,post:(file,body)=>load(file).POST(request(body)),lib:load('lib/weeklyExamSession.ts'),outcome:load('lib/weeklyOutcome.ts'),start:id=>start.POST(request({}),{params:Promise.resolve({id:id||examId})}),
  answer:body=>answer.POST(request(body)),finish:body=>finish.POST(request(body||{sessionId})),read:id=>read.GET(new Request('https://avora.test'),{params:Promise.resolve({id:id||sessionId})}),
  expire:()=>{expired=true},release:()=>{released=true},session:()=>session};
}
test('official exam APIs block guests, non-students and invalid UUIDs before SQL',async()=>{
 for(const [options,status] of [[{guest:true},401],[{role:'ADMIN'},403],[{role:'PARENT'},403],[{role:'TEACHER'},403],[{denied:true},402]]){
  const f=fixture(options);for(const action of [()=>f.start(),()=>f.answer({}),()=>f.finish(),()=>f.read()])assert.equal((await action()).status,status);assert.equal(f.calls.length,0);
 }
 const f=fixture();assert.equal((await f.start('bad-id')).status,400);assert.equal((await f.finish({sessionId:'bad-id'})).status,400);assert.equal((await f.answer({})).status,400);assert.equal(f.calls.length,0);
});
test('owner schedules only sealed future papers before opening; results cannot precede closing',async()=>{
 const body={releaseAt:'2026-11-01T09:00:00+01:00',closesAt:'2026-11-01T18:00:00+01:00',resultsReleaseAt:null};
 for(const [options,status] of [[{},200],[{unsealed:true},409],[{started:true},409],[{beforeStart:false},409],[{futureOpening:false},400]]){
  const f=fixture({role:'ADMIN',...options});const route=f.load('app/api/admin/weekly-exams/[id]/schedule/route.ts');
  const r=await route.POST(new Request('https://avora.test',{method:'POST',body:JSON.stringify(body)}),{params:Promise.resolve({id:examId})});assert.equal(r.status,status);
  assert.equal(f.calls.some(c=>c.text.includes("SET status='SCHEDULED'")),status===200);
 }
 const f=fixture({role:'ADMIN'}),route=f.load('app/api/admin/weekly-exams/[id]/schedule/route.ts');
 for(const value of [{...body,resultsReleaseAt:body.releaseAt},{...body,releaseAt:'invalid'}])assert.equal((await route.POST(new Request('https://avora.test',{method:'POST',body:JSON.stringify(value)}),{params:Promise.resolve({id:examId})})).status,400);
 assert.equal(f.calls.length,0);
});
test('new weekly guardian and release gates cannot be bypassed by the legacy exam routes',async()=>{
 for(const options of [{weekly:true,guardianBlocked:true},{weekly:true,future:true}]){const f=fixture(options);assert.equal((await f.start()).status,403);assert.ok(!f.calls.some(c=>c.text.includes('INSERT INTO exam_sessions')))}
});
test('start requires an open owner-reviewed complete paper and resumes one immutable attempt',async()=>{
 for(const options of [{open:false},{badBank:true},{unavailable:true}])assert.notEqual((await fixture(options).start()).status,200);
 const f=fixture();assert.equal((await f.start()).status,200);assert.equal((await (await f.start()).json()).sessionId,sessionId);
 assert.equal(f.calls.filter(c=>c.text.includes('INSERT INTO exam_sessions')).length,1);
 const paper=f.session().weekly_paper_snapshot;assert.equal(paper.length,5);assert.ok(paper.every(q=>q.key==='Two'));
 assert.ok(f.calls.find(c=>c.text.includes('SELECT q.id FROM questions q JOIN')).text.includes("o.status='LIVE'"));
});
test('public paper omits corrections; autosave survives resume and rejects foreign items/options',async()=>{
 const f=fixture();await f.start();let paper=await (await f.read()).json();assert.equal(paper.questions.length,5);assert.ok(!/"(key|explanation|correct_answer)":/.test(JSON.stringify(paper)));
 const q=paper.questions[0];assert.equal((await f.answer({sessionId,questionId:q.id,answer:'Two',studentId:'someone-else'})).status,200);
 paper=await (await f.read()).json();assert.equal(paper.answers[q.id],'Two');
 assert.equal((await f.answer({sessionId,questionId:examId,answer:'Two'})).status,400);assert.equal((await f.answer({sessionId,questionId:q.id,answer:'outside'})).status,400);
 assert.equal((await f.read(examId)).status,404);assert.equal((await f.finish({sessionId:examId})).status,404);
});
test('server expiry rejects late answers and completes saved evidence without score disclosure',async()=>{
 const f=fixture();await f.start();const q=f.session().weekly_paper_snapshot[0];await f.answer({sessionId,questionId:q.id,answer:'Two'});f.expire();
 assert.equal((await f.answer({sessionId,questionId:q.id,answer:'One'})).status,409);
 assert.deepEqual(await (await f.read()).json(),{sessionId,completed:true});assert.equal(f.session().answers[q.id],'Two');assert.equal(f.attempts.length,0);
 const clock=f.calls.find(c=>c.text.includes('AS accepts_answers'));assert.ok(clock.text.includes("es.duration_seconds*interval '1 second'"));assert.ok(clock.text.includes('clock_timestamp()<b.closes_at'));
});
test('submission marks the original snapshot once and never returns marks or corrections',async()=>{
 const f=fixture();await f.start();for(const q of f.session().weekly_paper_snapshot)await f.answer({sessionId,questionId:q.id,answer:'Two'});
 f.rows.forEach(q=>{q.correct_answer={value:'One'};q.prompt='EDITED_BASE_QUESTION'});
 const first=await (await f.finish()).json();assert.deepEqual(first,{ok:true,alreadySubmitted:false});assert.ok(f.marks.every(m=>m.mark_fraction===1));
 assert.deepEqual(await (await f.finish()).json(),{ok:true,alreadySubmitted:true});assert.equal(f.attempts.length,0);assert.equal(f.marks.length,5);assert.equal(f.mastery.size,0);
});
test('held outcomes write no mastery; released outcomes synchronize exactly once',async()=>{
 const f=fixture();await f.start();await f.finish();assert.deepEqual(await f.outcome.syncWeeklyOutcome(sessionId),{synced:false});assert.equal(f.mastery.size,0);
 f.release();assert.deepEqual(await f.outcome.syncWeeklyOutcome(sessionId,examId),{synced:false});assert.equal(f.mastery.size,0);
 assert.deepEqual(await f.outcome.syncWeeklyOutcome(sessionId,student),{synced:true});assert.equal(f.mastery.get(examId).evidence_count,5);
 assert.deepEqual(await f.outcome.syncWeeklyOutcome(sessionId),{synced:false});assert.equal(f.mastery.get(examId).evidence_count,5);
 assert.equal(f.attempts.length,5);
 const guard=f.calls.find(c=>c.text.includes('SELECT es.*,b.title'));assert.ok(guard.text.includes('clock_timestamp()>=b.results_release_at'));assert.ok(guard.text.includes('clock_timestamp()>=b.closes_at'));
});
test('mixed papers remain pending owner theory review and cannot affect mastery',async()=>{
 const f=fixture({theory:true});await f.start();assert.equal((await f.finish()).status,200);assert.equal(f.session().marking_status,'PENDING');assert.equal(f.session().score,null);assert.equal(f.marks.length,4);
 f.release();assert.deepEqual(await f.outcome.syncWeeklyOutcome(sessionId),{synced:false});assert.equal(f.mastery.size,0);
});
test('unreviewed, unmapped, duplicate and ambiguous questions cannot enter a new paper',()=>{
 const f=fixture();for(const change of [{status:'DRAFT'},{objective_id:null},{relevance_status:'PENDING'},{answer_status:'FAILED'},{correct_answer:{value:['One','Two']}},{options:['One','One','Three','Four']}])
  assert.throws(()=>f.lib.reviewedWeeklyPaper(f.rows.map((row,i)=>i===0?{...row,...change}:row),5));
 assert.throws(()=>f.lib.reviewedWeeklyPaper(Array(5).fill(f.rows[0]),5));
});
test('practice, tutor and guided-step routes cannot disclose answers held for an official paper',async()=>{
 for(const path of ['app/api/attempts/route.ts','app/api/tutor/check/route.ts','app/api/practice/explain/route.ts','app/api/practice/step/route.ts']){
  const f=fixture({held:true});const result=await f.post(path,{questionId:f.rows[0].id,answer:'Two',reveal:true,stepIndex:0});
  assert.equal(result.status,409);assert.ok(!/"(correct|correctAnswer|explanation)":/.test(JSON.stringify(await result.json())));
  assert.ok(!f.calls.some(call=>call.text.includes('INSERT INTO attempts')));
 }
});
test('legacy generic exam submission cannot regrade the official session',async()=>{
 const f=fixture();await f.start();assert.equal((await f.post('app/api/exam/finish/route.ts',{sessionId})).status,404);assert.equal(f.marks.length,0);assert.equal(f.session().status,'IN_PROGRESS');
 const query=f.calls.find(call=>call.text.includes('SELECT * FROM exam_sessions WHERE id='));assert.ok(query.text.includes('weekly_exam_blueprint_id IS NULL'));assert.ok(query.text.includes("COALESCE(assessment_type,'')<>'WEEKLY_EXAM'"));
});
test('question pools omit held IDs and embargo includes upcoming or unclosed locked papers',async()=>{
 const f=fixture({held:true}),embargo=f.load('lib/weeklyExamEmbargo.ts');const rows=await embargo.withoutHeldOfficialQuestions(f.rows);
 assert.equal(rows.length,4);assert.ok(!rows.some(row=>row.id===f.rows[0].id));assert.deepEqual(await embargo.withoutHeldOfficialQuestions([]),[]);
 const query=f.calls.find(call=>call.text.includes('SELECT DISTINCT membership.question_id'));
 for(const guard of ["version.status='LOCKED'","blueprint.status IN ('APPROVED','SCHEDULED','LIVE','CLOSED')",'blueprint.closes_at IS NULL','clock_timestamp()<blueprint.closes_at'])assert.ok(query.text.includes(guard));
});
test('self-service Quick 10 cannot select an embargoed question or create a short paper',async()=>{
 function bank(held){const f=fixture({held});for(let i=5;i<10;i++)f.rows.push({...f.rows[0],id:`00000000-0000-4000-8000-${String(i).padStart(12,'0')}`});
  for(const row of f.rows){row.prompt='Choose the TEST_ONLY fixture option.';row.correct_answer='Two'}return f}
 const f=bank(true);const response=await f.post('app/api/exam/start/route.ts',{subject:'Mathematics',assessmentType:'QUICK_10'});
 assert.equal(response.status,409);assert.equal(f.session(),null);assert.ok(!f.calls.some(call=>call.text.includes('INSERT INTO exam_sessions')));
 const noHold=bank(false);assert.equal((await noHold.post('app/api/exam/start/route.ts',{subject:'Mathematics',assessmentType:'QUICK_10'})).status,200);
});
test('earlier active papers without snapshots fail honestly without new grading or attempts',async()=>{
 const f=fixture();await f.start();f.session().weekly_paper_snapshot=null;
 assert.equal((await f.start()).status,409);assert.equal((await f.read()).status,409);assert.equal((await f.finish()).status,409);
 assert.equal(f.session().status,'IN_PROGRESS');assert.equal(f.marks.length,0);assert.equal(f.attempts.length,0);
});
test('outcome cron rejects unauthenticated requests before any database access',async()=>{
 const f=fixture();const response=await f.load('app/api/cron/weekly-exam-outcomes/route.ts').POST(new Request('https://avora.test',{method:'POST'}));
 assert.equal(response.status,401);assert.equal(f.calls.length,0);
});
test('server expiry job completes a saved paper without browser activity and is repeat-safe',async()=>{
 const f=fixture();await f.start();f.expire();assert.deepEqual(await f.lib.expireOfficialWeeklyExams(),{expired:1});
 assert.equal(f.session().status,'COMPLETED');assert.equal(f.marks.length,5);assert.equal(f.attempts.length,0);
 assert.deepEqual(await f.lib.expireOfficialWeeklyExams(),{expired:0});assert.equal(f.marks.length,5);
});
test('a literal letter option cannot be confused with its shuffled position during marking',async()=>{
 const f=fixture();f.rows[0].options=['B','Three','Four','Two'];f.rows[0].correct_answer={value:'D'};
 await f.start();const question=f.session().weekly_paper_snapshot.find(q=>q.id===f.rows[0].id);assert.equal(question.key,'Two');
 question.options=['Three','Two','Four','B'];
 assert.equal((await f.answer({sessionId,questionId:question.id,answer:'B'})).status,200);await f.finish();
 assert.equal(f.marks.find(mark=>mark.question_id===question.id).mark_fraction,0);
});
test('unsealed older versions cannot silently become a different paper',async()=>{
 const f=fixture({unsealed:true});assert.equal((await f.start()).status,409);assert.equal(f.session(),null);
});
test('only explicit owner approval seals a complete reviewed paper; started or locked papers cannot be replaced',async()=>{
 const path='app/api/admin/weekly-exams/[id]/versions/[versionId]/lock/route.ts',params={params:Promise.resolve({id:examId,versionId:examId})},request=new Request('https://avora.test',{method:'POST'});
 const studentFixture=fixture();await assert.rejects(studentFixture.load(path).POST(request,params),/Admin required/);assert.equal(studentFixture.calls.length,0);
 const f=fixture({role:'ADMIN'});assert.equal((await f.load(path).POST(request,params)).status,200);
 const snapshot=f.calls.find(call=>call.text.includes("SET status='LOCKED',paper_snapshot="));assert.equal(JSON.parse(snapshot.values[0]).length,5);
 assert.ok(f.calls.some(call=>call.text.includes("UPDATE questions SET status='PUBLISHED'")));
 for(const options of [{started:true},{lockedStage:true},{badBank:true}]){
  const blocked=fixture({role:'ADMIN',...options});assert.equal((await blocked.load(path).POST(request,params)).status,409);assert.ok(!blocked.calls.some(call=>call.text.includes("UPDATE questions SET status='PUBLISHED'")));
 }
});
