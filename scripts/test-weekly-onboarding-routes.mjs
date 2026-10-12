import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),student='11111111-1111-4111-8111-111111111111';
function fixture(options={}){
 const calls=[],cache=new Map();let settings=options.settings??null,baseline=options.baseline??null;
 const sql=async(strings,...values)=>{
  const query=strings.join('?');calls.push({query,values});
  if(query.includes('SELECT id FROM users'))return [{id:student}];
  if(query.includes('SELECT study_period'))return settings?[settings]:[];
  if(query.includes('SELECT parent_weekly_summary_enabled'))return settings?[{parent_weekly_summary_enabled:settings.parent_weekly_summary_enabled}]:[];
  if(query.includes('INSERT INTO weekly_student_study_settings')){
   settings={study_period:values[1],study_time:values[2],timezone:'Africa/Lagos',parent_weekly_summary_enabled:settings?.parent_weekly_summary_enabled??false};return [];
  }
  if(query.includes('INSERT INTO weekly_student_baseline_state')){
   baseline??={status:'NOT_STARTED',first_offered_at:null};
   if(!['COMPLETED','IN_PROGRESS'].includes(baseline.status))baseline.first_offered_at??=new Date();return [baseline];
  }
  if(query.includes('SELECT status'))return baseline?[baseline]:[];
  if(query.includes("SET status='POSTPONED'")){baseline.status='POSTPONED';baseline.postponed_until=new Date(values[0]);return []}
  return [];
 };
 sql.begin=work=>work(sql);
 function load(file){
  file=resolve(root,file);if(cache.has(file))return cache.get(file);
  const mod={exports:{}};cache.set(file,mod.exports);
  const output=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  new Function('module','exports','require',output)(mod,mod.exports,name=>{
   if(name==='next/server')return {NextResponse:{json:(body,init)=>Response.json(body,init)}};
   if(name==='@/lib/auth')return {getSession:async()=>options.auth===null?null:{userId:student,role:options.role??'STUDENT'}};
   if(name==='@/lib/db'||name==='./db')return {sql,withDbRetry:work=>work()};
   if(name==='./dawnAccess')return {getDawnGate:async()=>({status:options.gate??'ready',classLevel:'JSS1',term:1,week:1})};
   return load((name.startsWith('@/')?name.slice(2):resolve(dirname(file),name))+'.ts');
  });return mod.exports;
 }
 const settingsRoute=load('app/api/weekly/study-settings/route.ts'),baselineRoute=load('app/api/weekly/baseline/route.ts');
 function request(method,body){return new Request('https://avora-test.invalid/api/weekly',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})}
 return {calls,get:()=>settingsRoute.GET(),put:body=>settingsRoute.PUT(request('PUT',body)),
  baselineGet:()=>baselineRoute.GET(),baselinePost:body=>baselineRoute.POST(request('POST',body)),
  invalidJson:()=>settingsRoute.PUT(new Request('https://avora-test.invalid',{method:'PUT',body:'{'}))};
}
const valid={studyPeriod:'EVENING',studyTime:'18:30'};
test('onboarding routes reject guests and other roles before querying',async()=>{
 for(const [options,status] of [[{auth:null},401],[{role:'ADMIN'},403],[{role:'PARENT'},403]]){
  const f=fixture(options);
  for(const request of [()=>f.get(),()=>f.put(valid),()=>f.baselineGet(),()=>f.baselinePost({action:'START'})])assert.equal((await request()).status,status);
  assert.equal(f.calls.length,0);
 }
});
test('invalid study times, periods and summary shapes cannot write settings',async()=>{
 const f=fixture();
 for(const body of [null,[],{}, {...valid,studyPeriod:'NIGHT'},...['24:00','18:60','7:30','18:30:00',''].map(studyTime=>({...valid,studyTime})),
  {...valid,parentWeeklySummaryEnabled:'true'}])assert.equal((await f.put(body)).status,400);
 assert.equal((await f.invalidJson()).status,400);assert.equal(f.calls.length,0);
});
test('study time persists across reads and changes only authenticated student settings',async()=>{
 const f=fixture();assert.equal((await f.get()).status,200);
 assert.equal((await f.put({...valid,studentId:'someone-else'})).status,200);
 const settings=(await (await f.get()).json()).settings;
 assert.deepEqual(settings,{study_period:'EVENING',study_time:'18:30',timezone:'Africa/Lagos',parent_weekly_summary_enabled:false});
 const insert=f.calls.find(x=>x.query.includes('INSERT INTO weekly_student_study_settings'));
 assert.deepEqual(insert.values,[student,'EVENING','18:30']);
 assert.ok(!insert.query.includes('parent_weekly_summary_enabled'));
 assert.ok(f.calls.some(x=>x.query.includes('FROM users')&&x.query.includes('FOR UPDATE')));
});
test('student changes preserve enabled guardian summaries and reject toggling either direction',async()=>{
 for(const enabled of [true,false]){
  const f=fixture({settings:{study_period:'AFTER_SCHOOL',study_time:'16:00',timezone:'Africa/Lagos',parent_weekly_summary_enabled:enabled}});
  assert.equal((await f.put({...valid,parentWeeklySummaryEnabled:!enabled})).status,403);
  assert.ok(!f.calls.some(x=>x.query.includes('INSERT INTO weekly_student_study_settings')));
  assert.equal((await f.put(valid)).status,200);
  assert.equal((await (await f.get()).json()).settings.parent_weekly_summary_enabled,enabled);
  assert.equal((await f.put({...valid,parentWeeklySummaryEnabled:enabled})).status,200);
 }
});
test('baseline routes enforce guardian and release gates before state reads or writes',async()=>{
 for(const gate of ['legacy','onboarding_required','verification_pending']){
  const f=fixture({gate});assert.equal((await f.baselineGet()).status,403);
  assert.equal((await f.baselinePost({action:'POSTPONE'})).status,403);assert.equal(f.calls.length,0);
 }
});
test('baseline START cannot mark an unassigned starting check in progress',async()=>{
 const f=fixture();assert.equal((await f.baselinePost({action:'START'})).status,409);
 assert.ok(!f.calls.some(x=>/INSERT|UPDATE/.test(x.query)));
});
test('baseline first offer and repeated postponement keep a single fixed deadline',async()=>{
 const f=fixture({baseline:{status:'NOT_STARTED',first_offered_at:null}});
 const offered=(await (await f.baselineGet()).json()).baseline;
 assert.ok(offered.first_offered_at);
 assert.equal((await f.baselinePost({action:'POSTPONE'})).status,200);
 const first=(await (await f.baselineGet()).json()).baseline;
 assert.equal((await f.baselinePost({action:'POSTPONE'})).status,200);
 const second=(await (await f.baselineGet()).json()).baseline;
 assert.equal(second.postponed_until,first.postponed_until);
 assert.equal(new Date(second.postponed_until)-new Date(second.first_offered_at),3*24*60*60*1000);
});
test('expired postponement and completed baseline records cannot restart or be overwritten',async()=>{
 const expired=fixture({baseline:{status:'NOT_STARTED',first_offered_at:new Date(Date.now()-4*24*60*60*1000)}});
 assert.equal((await expired.baselinePost({action:'POSTPONE'})).status,409);
 const complete=fixture({baseline:{status:'COMPLETED',first_offered_at:new Date(),completed_at:new Date()}});
 assert.equal((await complete.baselinePost({action:'START'})).status,200);
 assert.equal((await complete.baselinePost({action:'POSTPONE'})).status,200);
 assert.ok(!complete.calls.some(x=>x.query.includes("SET status='POSTPONED'")));
});
test('legacy completed or active baseline records are not given invented first-offer dates',async()=>{
 for(const status of ['COMPLETED','IN_PROGRESS']){
  const f=fixture({baseline:{status,first_offered_at:null}});
  const read=(await (await f.baselineGet()).json()).baseline;assert.equal(read.first_offered_at,null);
  await f.baselinePost({action:'POSTPONE'});
  assert.equal((await (await f.baselineGet()).json()).baseline.first_offered_at,null);
 }
});
