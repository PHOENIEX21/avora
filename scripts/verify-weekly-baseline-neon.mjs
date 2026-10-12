import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import ts from 'typescript';
import postgres from 'postgres';
const require=createRequire(import.meta.url),root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),marker='AVORA_BASELINE_ROLLBACK';
export async function verifyWeeklyBaseline(sql){
 let checks=0,rolledBack=false;const users=[];const equal=(a,b)=>{assert.equal(a,b);checks++};
 try{await sql.begin(async tx=>{
  const [identity]=await tx`SELECT current_setting('neon.branch_id',true) branch`;equal(identity.branch,'br-blue-scene-ayydvo7l');
  const admin=randomUUID(),student=randomUUID(),lateStudent=randomUUID();users.push(admin,student,lateStudent);
  for(const [id,role] of [[admin,'ADMIN'],[student,'STUDENT'],[lateStudent,'STUDENT']])await tx`INSERT INTO users(id,email,password_hash,full_name,role)
   VALUES(${id},${id+'@avora-test.invalid'},'NOT_A_LOGIN_HASH','TEST_ONLY_BASELINE',${role})`;
  for(const subject of ['Mathematics','English Language'])await tx`INSERT INTO weekly_class_subjects(class_level,subject_name,subject_kind,active)
   VALUES('JSS1',${subject},'CORE',true) ON CONFLICT(class_level,subject_name) DO UPDATE SET active=true,subject_kind='CORE'`;
  const subjects=await tx`SELECT subject_name FROM weekly_class_subjects WHERE class_level='JSS1' AND active=true AND subject_kind='CORE' ORDER BY subject_name`;
  assert.ok(subjects.length<=20);const objectives=[];
  for(const subject of subjects){
   const id=randomUUID(),bank=randomUUID(),topic='TEST_ONLY_'+randomUUID();
   await tx`INSERT INTO weekly_curriculum_objectives(id,class_level,subject_name,term,week_number,day_index,topic_title,objective_text,source_reference,approval_status,reviewed_by,published_by,published_at)
    VALUES(${id},'JSS1',${subject.subject_name},1,1,1,${topic},'TEST_ONLY_BASELINE_OBJECTIVE','TEST_FIXTURE_NOT_CURRICULUM','PUBLISHED',${admin},${admin},now())`;
   await tx`INSERT INTO weekly_topic_question_sets(id,class_level,subject_name,term,week_number,topic_title)
    VALUES(${bank},'JSS1',${subject.subject_name},1,1,${topic})`;
   objectives.push({id,bank,subject:subject.subject_name});
  }
  const questionIds=[];
  for(let i=0;i<20;i++){
   const id=randomUUID(),objective=objectives[i%objectives.length];questionIds.push(id);
   await tx`INSERT INTO weekly_items(id,objective_id,prompt,item_type,options,answer_key,explanation,difficulty,source,source_ref,status,reviewer_id,reviewed_at)
    VALUES(${id},${objective.id},'TEST_ONLY_BASELINE_QUESTION','MCQ','["One","Two","Three","Four"]'::jsonb,'{"correct":"B"}'::jsonb,
     'TEST_ONLY','RECALL','CURRICULUM_BANK','TEST_FIXTURE_NOT_CURRICULUM','PUBLISHED',${admin},now())`;
   await tx`INSERT INTO weekly_topic_question_memberships(topic_set_id,item_id,pool,exam_eligible) VALUES(${objective.bank},${id},'LIVE',true)`;
  }
  let signedIn=student,role='STUDENT',gate='ready';const cache=new Map(),tag=(strings,...values)=>tx(strings,...values);tag.begin=work=>work(tag);
  function load(file){
   file=resolve(root,file);if(cache.has(file))return cache.get(file);const mod={exports:{}};cache.set(file,mod.exports);
   const js=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
   new Function('module','exports','require',js)(mod,mod.exports,name=>{
    if(name==='./db'||name==='@/lib/db')return {sql:tag,withDbRetry:work=>work()};
    if(name==='./dawnAccess')return {getDawnGate:async()=>({status:gate,classLevel:'JSS1',term:1,week:2})};
    if(name==='@/lib/auth')return {getSession:async()=>({userId:signedIn,role})};
    if(name==='next/server')return {NextResponse:{json:(body,init)=>Response.json(body,init)}};
    if(name.startsWith('@/'))return load(name.slice(2)+'.ts');if(name.startsWith('.'))return load(resolve(dirname(file),name)+'.ts');return require(name);
   });return mod.exports;
  }
  const route=load('app/api/weekly/baseline/route.ts'),review=load('app/api/admin/weekly/baseline/route.ts');
  const send=(handler,method,body)=>handler[method](new Request('https://avora-test.invalid/api',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}));
  await tx`UPDATE weekly_class_flags SET baseline_question_ids='{}',baseline_reviewed_by=NULL,baseline_reviewed_at=NULL WHERE class_level='JSS1'`;
  equal((await send(route,'POST',{action:'START'})).status,409);
  equal((await review.GET(new Request('https://avora-test.invalid?classLevel=JSS1&term=1'))).status,403);
  const [beforeFlag]=await tx`SELECT enabled FROM weekly_class_flags WHERE class_level='JSS1'`;
  signedIn=admin;role='ADMIN';equal((await send(review,'PUT',{classLevel:'JSS1',term:1,questionIds:Array(20).fill(questionIds[0])})).status,409);
  equal((await send(review,'PUT',{classLevel:'JSS1',term:1,questionIds})).status,200);
  const [afterFlag]=await tx`SELECT enabled FROM weekly_class_flags WHERE class_level='JSS1'`;
  equal(afterFlag.enabled,beforeFlag?.enabled??false);
  signedIn=student;role='STUDENT';gate='verification_pending';equal((await route.GET()).status,403);gate='ready';
  equal((await (await route.GET()).json()).ready,true);
  const started=await send(route,'POST',{action:'START'});equal(started.status,200);const paper=(await started.json()).attempt;
  equal(paper.questions.length,20);equal(paper.secondsRemaining<=900&&paper.secondsRemaining>890,true);
  equal(paper.questions.every(q=>q.savedAnswer===null&&!('answer' in q)&&!('explanation' in q)),true);
  const answer={action:'ANSWER',attemptId:paper.id,itemId:paper.questions[0].id,answer:'Two'};
  equal((await send(route,'POST',answer)).status,200);
  equal((await send(route,'POST',{...answer,answer:'Outside the options'})).status,400);
  equal((await (await send(route,'POST',{action:'START'})).json()).attempt.id,paper.id);
  equal((await (await route.GET()).json()).attempt.questions[0].savedAnswer,'Two');
  const [snap]=await tx`SELECT item_snapshot FROM weekly_baseline_attempts WHERE id=${paper.id}`;
  equal(snap.item_snapshot[0].answer,'Two');
  await tx`UPDATE weekly_curriculum_objectives SET approval_status='DRAFT' WHERE id=${objectives[0].id}`;
  equal((await route.GET()).status,403);
  equal((await send(route,'POST',answer)).status,403);
  await tx`UPDATE weekly_curriculum_objectives SET approval_status='PUBLISHED' WHERE id=${objectives[0].id}`;
  signedIn=lateStudent;equal((await send(route,'POST',{...answer,answer:'One'})).status,404);signedIn=student;
  const finishResponse=await send(route,'POST',{action:'FINISH',attemptId:paper.id});equal(finishResponse.status,200);
  const finished=(await finishResponse.json()).attempt;equal(finished.submitted,true);equal(finished.questions.length,0);
  equal(/"(correct|total|score|answer|percentage)":/.test(JSON.stringify(finished)),false);
  const [marked]=await tx`SELECT result_data,status FROM weekly_baseline_attempts WHERE id=${paper.id}`;
  equal(marked.status,'COMPLETED');equal(marked.result_data.reduce((n,item)=>n+item.correct,0),1);
  const [seeded]=await tx`SELECT count(*)::int count FROM weekly_student_item_schedule WHERE student_id=${student}`;equal(seeded.count,19);
  equal((await send(route,'POST',{action:'FINISH',attemptId:paper.id})).status,200);
  const [replay]=await tx`SELECT count(*)::int count FROM weekly_student_item_schedule WHERE student_id=${student}`;equal(replay.count,19);
  signedIn=lateStudent;const late=(await (await send(route,'POST',{action:'START'})).json()).attempt;
  await tx`UPDATE weekly_baseline_attempts SET started_at=clock_timestamp()-interval '16 minutes' WHERE id=${late.id}`;
  const expired=(await (await send(route,'POST',{action:'ANSWER',attemptId:late.id,itemId:late.questions[0].id,answer:'Two'})).json()).attempt;
  equal(expired.expired,true);equal(expired.submitted,true);
  const [lateStored]=await tx`SELECT answer_data,result_data FROM weekly_baseline_attempts WHERE id=${late.id}`;
  equal(Object.keys(lateStored.answer_data).length,0);equal(lateStored.result_data.reduce((n,item)=>n+item.correct,0),0);
  const catchup=load('lib/weeklyCatchup.ts'),revisit=load('lib/weeklyRevisit.ts'),practice=load('app/api/weekly/practice/route.ts');
  const context={studentId:lateStudent,classLevel:'JSS1',term:1,week:2};
  const waiting=await catchup.weeklyCatchup(context);
  equal(objectives.every(objective=>waiting.some(item=>item.id===objective.id&&item.reason==='BASELINE')),true);
  equal(await catchup.seedWeeklyCatchup(context),0);
  const [seedCount]=await tx`SELECT count(*)::int count FROM weekly_student_item_schedule WHERE student_id=${lateStudent}`;equal(seedCount.count,20);
  const missed=randomUUID(),missedBank=randomUUID(),missedTopic='TEST_ONLY_CARRY_'+randomUUID(),missedItem=randomUUID();
  await tx`INSERT INTO weekly_curriculum_objectives(id,class_level,subject_name,term,week_number,day_index,topic_title,objective_text,source_reference,approval_status,reviewed_by,published_by,published_at)
   VALUES(${missed},'JSS1','Mathematics',1,1,1,${missedTopic},'TEST_ONLY_MISSED','TEST_FIXTURE_NOT_CURRICULUM','PUBLISHED',${admin},${admin},now())`;
  await tx`INSERT INTO weekly_topic_question_sets(id,class_level,subject_name,term,week_number,topic_title) VALUES(${missedBank},'JSS1','Mathematics',1,1,${missedTopic})`;
  await tx`INSERT INTO weekly_items(id,objective_id,prompt,item_type,options,answer_key,explanation,difficulty,source,source_ref,status,reviewer_id,reviewed_at)
   VALUES(${missedItem},${missed},'TEST_ONLY_CARRY','MCQ','["One","Two","Three","Four"]'::jsonb,'{"correct":"B"}'::jsonb,
    'TEST_ONLY','RECALL','CURRICULUM_BANK','TEST_FIXTURE_NOT_CURRICULUM','PUBLISHED',${admin},now())`;
  await tx`INSERT INTO weekly_topic_question_memberships(topic_set_id,item_id,pool,exam_eligible) VALUES(${missedBank},${missedItem},'LIVE',true)`;
  equal((await catchup.weeklyCatchup(context)).some(item=>item.id===missed&&item.reason==='NOT_STUDIED'),true);
  equal(await catchup.seedWeeklyCatchup(context),1);equal(await catchup.seedWeeklyCatchup(context),0);
  const setId=await revisit.startWeeklyRevisit(context);equal(Boolean(setId),true);
  const set=(await (await practice.GET(new Request('https://avora-test.invalid?sessionId='+setId))).json());
  equal(set.questions.some(item=>item.id===missedItem),true);
  const comparison=load('app/api/admin/weekly/baseline/results/route.ts');
  equal((await comparison.GET(new Request('https://avora-test.invalid?classLevel=JSS1'))).status,403);
  signedIn=admin;role='ADMIN';const reports=await comparison.GET(new Request('https://avora-test.invalid?classLevel=JSS1'));
  equal(reports.status,200);const reportRows=(await reports.json()).rows;
  equal(reportRows.some(item=>item.student_id===student&&item.baseline_correct===1),true);
  equal(reportRows.filter(item=>item.student_id===student).every(item=>item.practice_total===0),true);
  signedIn=student;role='STUDENT';
  await tx`UPDATE weekly_student_item_schedule SET due_date=(clock_timestamp() AT TIME ZONE 'Africa/Lagos')::date WHERE student_id=${student}`;
  const laterResponse=await send(practice,'POST',{action:'START_REVISIT'});equal(laterResponse.status,200);
  const laterPaper=await laterResponse.json();equal(laterPaper.questions.length,8);
  for(const question of laterPaper.questions)equal((await send(practice,'POST',{action:'ANSWER',sessionId:laterPaper.id,itemId:question.id,answer:'Two',confidence:'SURE'})).status,200);
  equal((await send(practice,'POST',{action:'FINISH',sessionId:laterPaper.id})).status,200);
  signedIn=admin;role='ADMIN';
  const laterReport=await (await comparison.GET(new Request('https://avora-test.invalid?classLevel=JSS1'))).json();
  const studentComparison=laterReport.rows.filter(row=>row.student_id===student);
  const matching=laterPaper.questions.filter(question=>questionIds.includes(question.id)).length;
  equal(matching>0,true);
  equal(studentComparison.reduce((sum,row)=>sum+Number(row.practice_total),0),matching);
  equal(studentComparison.reduce((sum,row)=>sum+Number(row.practice_correct),0),matching);
  throw new Error(marker);
 });}catch(error){if(error.message!==marker)throw error;rolledBack=true}
 const [left]=await sql`SELECT count(*)::int count FROM users WHERE id=ANY(${users}::uuid[])`;equal(left.count,0);
 return {checks,rolledBack};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const sql=process.env.AVORA_DATABASE_TRANSPORT==='neon-websocket'?(await import('../lib/neonDevelopmentDb.ts')).createNeonDevelopmentSql(process.env.DATABASE_URL)
  :postgres(process.env.DATABASE_URL,{ssl:'require',max:1});
 try{console.log(JSON.stringify(await verifyWeeklyBaseline(sql)))}finally{await sql.end()}
}
