import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import {z} from 'zod';

const objective='11111111-1111-4111-8111-111111111111';
const question='22222222-2222-4222-8222-222222222222';
const otherQuestion='33333333-3333-4333-8333-333333333333';
const student='44444444-4444-4444-8444-444444444444';
function compile(path,dependencies){
 const source=readFileSync(new URL(path,import.meta.url),'utf8');
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const mod={exports:{}};
 new Function('module','exports','require',compiled)(mod,mod.exports,name=>{
  assert.ok(name in dependencies,'unexpected dependency '+name);
  return dependencies[name];
 });
 return mod.exports;
}
const answers=compile('../lib/answers.ts',{});
const mastery=compile('../lib/mastery.ts',{});

function fixture(options={}){
 const calls=[];
 let saved=null;
 const query=async (strings,...values)=>{
  const text=strings.join('?');calls.push({text,values});
  if(text.includes('FROM student_profiles'))return [{class_level:options.classLevel??'JSS1'}];
  if(text.includes('JOIN term_topic_schedule')){
   assert.ok(text.includes("a.status='PUBLISHED'"));
   assert.equal(values.at(-1),options.classLevel??'JSS1');
   return options.unavailable?[]:[{id:'assessment'}];
  }
  if(text.includes('FROM daily_assessment_questions'))return options.questions??[
   {id:question,question_type:'MULTIPLE_CHOICE',correct_answer:'4',options:['3','4'],skill_id:'skill'}
  ];
  if(text.includes('INSERT INTO daily_assessment_submissions')){
   if(saved)return [];
   saved={correct_count:0,total_count:0};return [{student_id:student}];
  }
  if(text.includes('FROM daily_assessment_submissions'))return [saved];
  if(text.includes('SELECT score,evidence_count FROM mastery'))return [{score:.5,evidence_count:2}];
  if(text.includes('SELECT evidence_count,earned_fraction'))return [{evidence_count:2,earned_fraction:1}];
  if(text.includes('UPDATE daily_assessment_submissions'))saved={correct_count:values[0],total_count:values[1]};
  return [];
 };
 query.begin=async work=>{
  calls.push({text:'BEGIN',values:[]});
  const before=saved;
  try{return await work(query)}catch(error){saved=before;throw error}
 };
 const {POST}=compile('../app/api/daily-check/[id]/submit/route.ts',{
  'next/server':{NextResponse:{json:(body,init)=>Response.json(body,init)}},
  '@/lib/auth':{getSession:async()=>options.session===null?null:{userId:student,role:options.role??'STUDENT'}},
  '@/lib/db':{sql:query,withDbRetry:work=>work()},
  '@/lib/answers':answers,'@/lib/mastery':mastery,zod:{z}
 });
 return {calls,submit:(body={answers:{[question]:'4'}},id=objective)=>POST(
  new Request('https://avora.test/api/daily-check/'+id+'/submit',{
   method:'POST',headers:{'Content-Type':'application/json'},body:typeof body==='string'?body:JSON.stringify(body)
  }),{params:Promise.resolve({id})})};
}

test('unauthenticated and non-student submissions never query the database',async()=>{
 for(const [options,status] of [[{session:null},401],[{role:'ADMIN'},403],[{role:'PARENT'},403]]){
  const f=fixture(options);assert.equal((await f.submit()).status,status);assert.equal(f.calls.length,0);
 }
});
test('invalid objective and malformed answers return 400 without database writes',async()=>{
 for(const [body,id] of [['{',objective],[{},objective],[{answers:{bad:'4'}},objective],[{answers:{[question]:'x'.repeat(4001)}},objective],[{answers:{}},'bad']]){
  const f=fixture();assert.equal((await f.submit(body,id)).status,400);assert.equal(f.calls.length,0);
 }
});
test('unpublished or other-class assessment cannot be submitted',async()=>{
 const f=fixture({classLevel:'JSS2',unavailable:true});
 assert.equal((await f.submit()).status,404);assert.ok(!f.calls.some(x=>x.text==='BEGIN'));
});
test('empty and unsupported question sets cannot complete a task or create evidence',async()=>{
 for(const questions of [[],[{id:question,question_type:'SHORT_ANSWER'}]]){
  const f=fixture({questions});assert.equal((await f.submit()).status,409);
  assert.ok(!f.calls.some(x=>x.text==='BEGIN'));
 }
});
test('answers from another assessment are rejected before any writes',async()=>{
 const f=fixture();assert.equal((await f.submit({answers:{[otherQuestion]:'4'}})).status,400);
 assert.ok(!f.calls.some(x=>x.text==='BEGIN'));
});
test('submission updates independent evidence and completes only the student objective task',async()=>{
 const f=fixture();const result=await f.submit();
 assert.equal(result.status,200);assert.deepEqual(await result.json(),{ok:true,alreadySubmitted:false,score:100,correct:1,total:1});
 const insert=f.calls.find(x=>x.text.includes('INSERT INTO learner_objective_mastery'));
 assert.deepEqual(insert.values,[student,objective,3,2,2/3,'PRACTISING',3,2,2/3,'PRACTISING']);
 const task=f.calls.find(x=>x.text.includes('UPDATE learner_daily_tasks'));
 assert.deepEqual(task.values,['assessment',student,objective]);
 assert.ok(task.text.includes("task_kind='DAILY_CHECK'"));
 const lock=f.calls.findIndex(x=>x.text.includes('FOR UPDATE'));
 const claim=f.calls.findIndex(x=>x.text.includes('INSERT INTO daily_assessment_submissions'));
 assert.ok(lock>=0&&lock<claim);
});
test('replayed submission returns saved result without increasing evidence again',async()=>{
 const f=fixture();await f.submit();const before=f.calls.length;
 const response=await f.submit({answers:{[question]:'3'}});
 assert.deepEqual(await response.json(),{ok:true,alreadySubmitted:true,score:100,correct:1,total:1});
 const replay=f.calls.slice(before);
 assert.ok(!replay.some(x=>/INSERT INTO (attempts|mastery|learner_objective_mastery)|UPDATE learner_daily_tasks/.test(x.text)));
});
test('missing answer records incorrect evidence rather than fabricated success',async()=>{
 const f=fixture();const response=await f.submit({answers:{}});
 assert.equal((await response.json()).score,0);
 const attempt=f.calls.find(x=>x.text.includes('INSERT INTO attempts'));
 assert.equal(attempt.values[3],false);
});
