import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url),student='11111111-1111-4111-8111-111111111111',objective='22222222-2222-4222-8222-222222222222';
function fixture(options={}){
 const calls=[],cache=new Map(),rows=[{id:objective,subject_name:'TEST_ONLY_SUBJECT',topic_title:'TEST_ONLY_TOPIC',objective_text:'TEST_ONLY_OBJECTIVE',day_index:1,studied_at:null},
  {id:'other-day',subject_name:'TEST_ONLY_SUBJECT',topic_title:'TEST_ONLY_TOPIC',objective_text:'TEST_ONLY_TUESDAY',day_index:2,studied_at:null}];
 class WorkspaceError extends Error{constructor(message,status){super(message);this.status=status}}
 function load(file){if(cache.has(file))return cache.get(file);const mod={exports:{}};cache.set(file,mod.exports);
  const js=ts.transpileModule(readFileSync(new URL('../'+file,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  new Function('module','exports','require',js)(mod,mod.exports,name=>{
   if(name==='./db'||name==='@/lib/db')return {withDbRetry:work=>work(),sql:async(strings,...values)=>{const text=strings.join('?');calls.push({text,values});if(text.includes('extract(isodow'))return [{today:'2026-10-12',weekday:options.weekday||1}];if(text.includes('SELECT DISTINCT objective_id'))return options.completed?[{objective_id:objective}]:[];if(text.includes('SELECT id,submitted_at'))return options.revisit?[{id:'fixture-revisit',questions:5,submitted_at:options.revisitDone?'date':null}]:[];return []}};
   if(name==='./weeklyWorkspace'||name==='@/lib/weeklyWorkspace')return {WeeklyWorkspaceError:WorkspaceError,weeklyStudentContext:async id=>{if(options.blocked)throw new WorkspaceError('Guardian verification required',403);assert.equal(id,student);return {studentId:id,classLevel:'JSS1',term:1,week:2}},weeklyObjectives:async()=>rows};
   if(name==='@/lib/auth')return {getSession:async()=>options.guest?null:{userId:student,role:options.role||'STUDENT'}};
   if(name==='@/lib/learningAccess')return {requireStudentLearningAccess:async()=>{if(options.entitlementDenied)throw new Error('REDIRECT:/access')}};
   if(name==='@/lib/weeklyToday')return load('lib/weeklyToday.ts');
   if(name==='./weeklyRevisit')return {weeklyRevisitDueCount:async()=>options.due||0};
   if(name==='next/navigation')return {usePathname:()=>'/weekly/today',redirect:path=>{throw new Error('REDIRECT:'+path)}};
   if(name==='next/link')return {default:({children,...props})=>require('react').createElement('a',props,children)};
   if(name==='@/components/WeeklyToday')return {default:()=>null};
   if(name==='@/lib/weeklyVisual')return {weeklySubjectColour:()=> '#697183'};
   if(name.endsWith('.module.css'))return {default:new Proxy({},{get:(_,key)=>String(key)})};
   return require(name);
  });return mod.exports;
 }return {calls,rows,plan:()=>load('lib/weeklyToday.ts').weeklyTodayPlan(student),page:()=>load('app/weekly/today/page.tsx').default(),load};
}
test('Today gates every plan read before SQL and never writes or starts a paper',async()=>{
 const blocked=fixture({blocked:true});await assert.rejects(blocked.plan(),/Guardian/);assert.equal(blocked.calls.length,0);
 const f=fixture();const plan=await f.plan();assert.equal(plan.total,2);assert.equal(plan.completed,0);assert.equal(plan.tasks.some(task=>task.text==='TEST_ONLY_TUESDAY'),false);
 assert.ok(f.calls.every(call=>!(/\b(INSERT|UPDATE|DELETE)\b/.test(call.text))));assert.equal(plan.tasks[0].href,'/weekly?term=1&week=2&subject=TEST_ONLY_SUBJECT');
 assert.equal(plan.tasks[1].href,'/weekly/practice?objectiveId='+objective);
});
test('saved study and complete submitted daily practice count separately; no mastery is fabricated',async()=>{
 const f=fixture({completed:true});f.rows[0].studied_at='date';const plan=await f.plan();assert.equal(plan.total,2);assert.equal(plan.completed,2);
 const query=f.calls.find(call=>call.text.includes('SELECT DISTINCT objective_id'));
 for(const guard of ["mode='PRACTICE'","source='DAILY_LESSON'",'submitted_at IS NOT NULL','count(DISTINCT answer.item_id)','cardinality(question_ids)>=5',"AT TIME ZONE 'Africa/Lagos'"])assert.ok(query.text.includes(guard));
 assert.ok(query.values.includes(student));assert.ok(query.values.includes('2026-10-12'));assert.deepEqual(query.values.find(Array.isArray),[objective]);
});
test('only an actual own assigned Revisit is in the ring, with release/enrolment metadata checks',async()=>{
 for(const done of [false,true]){const f=fixture({revisit:true,revisitDone:done}),plan=await f.plan();assert.equal(plan.total,3);assert.equal(plan.completed,done?1:0);assert.equal(plan.tasks.at(-1).questions,5);
  const query=f.calls.find(call=>call.text.includes('SELECT id,submitted_at'));for(const guard of ['objective.class_level','objective.approval_status',"subject.active=true",'weekly_student_optional_subjects','objective.week_number'])assert.ok(query.text.includes(guard));
 }
});
test('weekends never borrow Friday and empty days have no fake completion',async()=>{
 const f=fixture({weekday:6}),plan=await f.plan();assert.equal(plan.total,0);assert.equal(plan.completed,0);
});
test('due reviewed revision appears before opening; remaining due work is not hidden by an earlier completed set',async()=>{
 for(const options of [{due:3},{due:3,revisit:true,revisitDone:true}]){const f=fixture(options),plan=await f.plan();assert.equal(plan.tasks.at(-1).questions,3);assert.equal(plan.tasks.at(-1).done,false);assert.equal(plan.completed,0)}
});
test('Today page rejects guests, other roles and denied entitlement before plan reads',async()=>{
 for(const [options,path] of [[{guest:true},'/login'],[{role:'ADMIN'},'/home'],[{role:'PARENT'},'/home'],[{entitlementDenied:true},'/access']]){const f=fixture(options);await assert.rejects(f.page(),new RegExp('REDIRECT:'+path));assert.equal(f.calls.length,0)}
 const f=fixture({blocked:true}),{renderToStaticMarkup}=require('react-dom/server');assert.match(renderToStaticMarkup(await f.page()),/Today is unavailable/);assert.equal(f.calls.length,0);
});
test('ring renders honest empty and finished states without source questions or scores',()=>{
 const f=fixture(),React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),Component=f.load('components/WeeklyToday.tsx').default;
 const plan={classLevel:'JSS1',term:1,week:2,date:'2026-10-12',tasks:[],total:0,completed:0};let html=renderToStaticMarkup(React.createElement(Component,{plan}));assert.match(html,/No daily set scheduled/);assert.doesNotMatch(html,/set is complete/);
 html=renderToStaticMarkup(React.createElement(Component,{plan:{...plan,total:1,completed:1,tasks:[{id:'x',kind:'STUDY',subject:'TEST_ONLY',topic:'TEST_ONLY',text:'TEST_ONLY',done:true,href:'/weekly'}]}}));assert.match(html,/set is complete/);assert.match(html,/aria-valuenow="1"/);assert.doesNotMatch(html,/score|correctAnswer|Words learned/);
});
test('existing mobile navigation recognises the guarded Today route without changing legacy destinations',()=>{
 const f=fixture(),React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),Component=f.load('components/MobileNav.tsx').default;
 const html=renderToStaticMarkup(React.createElement(Component,{role:'STUDENT'}));assert.match(html,/<a[^>]*href="\/home"[^>]*class="active"/);assert.match(html,/href="\/learn"/);assert.match(html,/href="\/community"/);
});
