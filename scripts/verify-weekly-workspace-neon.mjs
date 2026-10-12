import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import postgres from 'postgres';
import ts from 'typescript';

const require=createRequire(import.meta.url),root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const rollbackMarker='AVORA_WORKSPACE_VERIFIED_ROLLBACK';

/** Real route/SQL integration with isolated fixtures. Always rolls back the transaction. */
export async function verifyWeeklyWorkspace(sql){
 let checks=0,rolledBack=false;const fixtureUsers=[];
 const equal=(actual,expected)=>{assert.equal(actual,expected);checks++};
 try{await sql.begin(async tx=>{
  const [identity]=await tx`SELECT current_setting('neon.branch_id',true) AS branch_id`;
  equal(identity.branch_id,'br-blue-scene-ayydvo7l');
  const admin=randomUUID(),student=randomUUID(),otherStudent=randomUUID();
  fixtureUsers.push(admin,student,otherStudent);
  const current=randomUUID(),past=randomUUID(),future=randomUUID(),draft=randomUUID(),otherClass=randomUUID();
  const subject='AVORA_TEST_'+randomUUID(),topic='TEST_ONLY',bank=randomUUID();
  for(const [id,role] of [[admin,'ADMIN'],[student,'STUDENT'],[otherStudent,'STUDENT']])
   await tx`INSERT INTO users(id,email,password_hash,full_name,role) VALUES(${id},${id+'@avora-test.invalid'},'NOT_A_LOGIN_HASH','Isolated test fixture',${role})`;
  await tx`INSERT INTO weekly_class_subjects(class_level,subject_name,subject_kind) VALUES('JSS1',${subject},'CORE')`;
  for(const [id,cls,week,published] of [[current,'JSS1',2,true],[past,'JSS1',1,true],[future,'JSS1',3,true],[draft,'JSS1',2,false],[otherClass,'JSS2',2,true]])
   await tx`INSERT INTO weekly_curriculum_objectives(id,class_level,subject_name,term,week_number,day_index,topic_title,objective_text,source_reference,approval_status,reviewed_by,published_by,published_at)
    VALUES(${id},${cls},${subject},1,${week},1,${topic},${'TEST_ONLY_'+id},'TEST_FIXTURE_NOT_CURRICULUM',${published?'PUBLISHED':'DRAFT'},${admin},${published?admin:null},${published?new Date():null})`;
  await tx`INSERT INTO weekly_topic_question_sets(id,class_level,subject_name,term,week_number,topic_title) VALUES(${bank},'JSS1',${subject},1,2,${topic})`;
  for(let i=0;i<5;i++){
   const id=randomUUID();
   await tx`INSERT INTO weekly_items(id,objective_id,prompt,item_type,options,answer_key,explanation,difficulty,source,source_ref,status,reviewer_id,reviewed_at)
    VALUES(${id},${current},${'TEST_ONLY_'+i},'MCQ','["One","Two","Three","Four"]'::jsonb,'{"correct":"B"}'::jsonb,'TEST_ONLY',${['RECALL','APPLICATION','ANALYSIS'][i%3]},'CURRICULUM_BANK','TEST_FIXTURE_NOT_CURRICULUM','PUBLISHED',${admin},now())`;
   await tx`INSERT INTO weekly_topic_question_memberships(topic_set_id,item_id,pool,exam_eligible) VALUES(${bank},${id},'LIVE',true)`;
  }
  let signedIn=student,role='STUDENT',gateStatus='ready';
  const tagged=(strings,...params)=>tx(strings,...params);
  tagged.begin=work=>work(tagged);
  const db={sql:tagged,withDbRetry:work=>work()},cache=new Map();
  function load(file){
   file=resolve(root,file);if(cache.has(file))return cache.get(file);
   const mod={exports:{}};cache.set(file,mod.exports);
   const compiled=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
   new Function('module','exports','require',compiled)(mod,mod.exports,name=>{
    if(name==='./db'||name==='@/lib/db')return db;
    if(name==='./dawnAccess')return {getDawnGate:async()=>({status:gateStatus,classLevel:'JSS1',term:1,week:2})};
    if(name==='@/lib/auth')return {getSession:async()=>({userId:signedIn,role})};
    if(name==='next/server')return {NextResponse:{json:(body,init)=>Response.json(body,init)}};
    if(name.startsWith('@/'))return load(name.slice(2)+'.ts');
    if(name.startsWith('.'))return load(resolve(dirname(file),name)+'.ts');
    return require(name);
   });return mod.exports;
  }
  const practice=load('app/api/weekly/practice/route.ts'),study=load('app/api/weekly/study/route.ts'),workspace=load('lib/weeklyWorkspace.ts');
  const post=(handler,body)=>handler.POST(new Request('https://avora-test.invalid/api/weekly',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}));
  equal((await post(study,{objectiveId:current,source:'TEXTBOOK',action:'COMPLETE'})).status,200);
  let [studied]=await tx`SELECT studied_at FROM weekly_objective_study WHERE student_id=${student} AND objective_id=${current}`;
  equal(Boolean(studied.studied_at),true);
  equal((await post(study,{objectiveId:past,source:'TEXTBOOK',action:'COMPLETE'})).status,409);
  const started=await post(practice,{action:'START',objectiveId:current});equal(started.status,200);
  const paper=await started.json();equal(paper.questions.length,5);
  equal(paper.questions.every(q=>!('answer' in q)&&!('correctAnswer' in q)&&q.saved===null),true);
  equal((await (await post(practice,{action:'START',objectiveId:current})).json()).id,paper.id);
  for(const objectiveId of [future,draft,otherClass])equal((await post(practice,{action:'START',objectiveId})).status,404);
  equal((await post(practice,{action:'FINISH',sessionId:paper.id})).status,409);
  for(const [i,q] of paper.questions.entries()){
   const response=await post(practice,{action:'ANSWER',sessionId:paper.id,itemId:q.id,answer:'Two',confidence:i===0?'GUESS':'SURE'});
   equal(response.status,200);equal((await response.json()).correct,true);
  }
  equal((await post(practice,{action:'ANSWER',sessionId:paper.id,itemId:paper.questions[0].id,answer:'One'})).status,409);
  const finished=await post(practice,{action:'FINISH',sessionId:paper.id});equal(finished.status,200);
  const first=await finished.json();equal(first.correct,5);equal(first.total,5);
  const replay=await (await post(practice,{action:'FINISH',sessionId:paper.id})).json();equal(replay.alreadySubmitted,true);equal(replay.correct,5);
  const [stored]=await tx`SELECT correct_count,total_count FROM weekly_cbt_sessions WHERE id=${paper.id}`;
  equal(Number(stored.correct_count),5);equal(Number(stored.total_count),5);
  const schedules=await tx`SELECT item_id,interval_days FROM weekly_student_item_schedule WHERE student_id=${student}`;
  equal(schedules.length,5);equal(Number(schedules.find(x=>x.item_id===paper.questions[0].id).interval_days),1);
  const context={studentId:student,classLevel:'JSS1',term:1,week:2};
  const currentRows=await workspace.weeklyObjectives(context);
  equal(currentRows.length,1);equal(currentRows[0].progress.evidence,5);equal(currentRows[0].progress.accuracy,100);
  equal(currentRows[0].progress.status==='MASTERED',false);
  equal((await workspace.weeklyObjectives(context,1,1)).length,1);
  signedIn=otherStudent;
  equal((await practice.GET(new Request('https://avora-test.invalid/api/weekly/practice?sessionId='+paper.id))).status,404);
  signedIn=student;gateStatus='verification_pending';
  equal((await practice.GET(new Request('https://avora-test.invalid/api/weekly/practice?sessionId='+paper.id))).status,403);
  gateStatus='ready';role='ADMIN';
  equal((await post(practice,{action:'START',objectiveId:current})).status,403);role='STUDENT';
  const report={action:'REPORT',sessionId:paper.id,itemId:paper.questions[0].id,reason:'TEST_ONLY Please check this question.'};
  equal((await post(practice,report)).status,200);equal((await post(practice,report)).status,200);
  const [reports]=await tx`SELECT count(*)::int count FROM weekly_question_reports WHERE student_id=${student} AND item_id=${paper.questions[0].id}`;
  equal(reports.count,1);
  for(const reporter of [admin,otherStudent])await tx`INSERT INTO weekly_question_reports(student_id,item_id,reason) VALUES(${reporter},${paper.questions[0].id},'TEST_ONLY')`;
  equal((await post(practice,{action:'START',objectiveId:current})).status,409);
  throw new Error(rollbackMarker);
 });}catch(error){if(error.message!==rollbackMarker)throw error;rolledBack=true}
 assert.ok(rolledBack);
 const [leftovers]=await sql`SELECT count(*)::int count FROM users WHERE id=ANY(${fixtureUsers}::uuid[])`;
 equal(leftovers.count,0);return {checks,rolledBack};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 if(!process.env.DATABASE_URL)throw new Error('Set the isolated development DATABASE_URL before running this integration check.');
 const sql=process.env.AVORA_DATABASE_TRANSPORT==='neon-websocket'
  ?(await import('../lib/neonDevelopmentDb.ts')).createNeonDevelopmentSql(process.env.DATABASE_URL)
  :postgres(process.env.DATABASE_URL,{ssl:'require',max:1,connect_timeout:15});
 try{console.log(JSON.stringify(await verifyWeeklyWorkspace(sql)))}finally{await sql.end()}
}
