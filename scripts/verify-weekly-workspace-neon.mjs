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
  const settings=load('app/api/weekly/study-settings/route.ts'),baseline=load('app/api/weekly/baseline/route.ts');
  const put=body=>settings.PUT(new Request('https://avora-test.invalid/api/weekly/study-settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}));
  equal((await (await settings.GET()).json()).settings,null);
  equal((await put({studyPeriod:'EVENING',studyTime:'18:45',studentId:otherStudent})).status,200);
  const savedSettings=(await (await settings.GET()).json()).settings;
  equal(savedSettings.study_time,'18:45');equal(savedSettings.timezone,'Africa/Lagos');equal(savedSettings.parent_weekly_summary_enabled,false);
  // Simulate a previously verified guardian setting; student updates must preserve it.
  await tx`UPDATE weekly_student_study_settings SET parent_weekly_summary_enabled=true WHERE student_id=${student}`;
  equal((await put({studyPeriod:'AFTER_DINNER',studyTime:'20:15'})).status,200);
  equal((await put({studyPeriod:'EVENING',studyTime:'18:45',parentWeeklySummaryEnabled:false})).status,403);
  const preserved=(await (await settings.GET()).json()).settings;
  equal(preserved.study_time,'20:15');equal(preserved.parent_weekly_summary_enabled,true);
  signedIn=otherStudent;equal((await (await settings.GET()).json()).settings,null);
  signedIn=student;role='ADMIN';equal((await put({studyPeriod:'EVENING',studyTime:'18:45'})).status,403);role='STUDENT';
  gateStatus='verification_pending';equal((await baseline.GET()).status,403);gateStatus='ready';
  const offered=(await (await baseline.GET()).json()).baseline;equal(offered.status,'NOT_STARTED');equal(Boolean(offered.first_offered_at),true);
  equal((await post(baseline,{action:'START'})).status,409);
  equal((await (await baseline.GET()).json()).baseline.status,'NOT_STARTED');
  equal((await post(baseline,{action:'POSTPONE'})).status,200);
  const firstPostponement=(await (await baseline.GET()).json()).baseline;
  equal((await post(baseline,{action:'POSTPONE'})).status,200);
  const secondPostponement=(await (await baseline.GET()).json()).baseline;
  equal(secondPostponement.first_offered_at,firstPostponement.first_offered_at);
  equal(secondPostponement.postponed_until,firstPostponement.postponed_until);
  equal(new Date(secondPostponement.postponed_until)-new Date(secondPostponement.first_offered_at),3*24*60*60*1000);
  await tx`UPDATE weekly_student_baseline_state SET first_offered_at=now()-interval '4 days' WHERE student_id=${student}`;
  equal((await post(baseline,{action:'POSTPONE'})).status,409);
  await tx`UPDATE weekly_student_baseline_state SET status='COMPLETED',completed_at=now() WHERE student_id=${student}`;
  equal((await post(baseline,{action:'START'})).status,200);
  equal((await (await baseline.GET()).json()).baseline.status,'COMPLETED');
  await tx`UPDATE weekly_student_baseline_state SET first_offered_at=NULL WHERE student_id=${student}`;
  equal((await (await baseline.GET()).json()).baseline.first_offered_at,null);
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
  const snapshot=async()=>await tx`SELECT item_id,due_date,interval_days,streak,last_result,last_served_at
   FROM weekly_student_item_schedule WHERE student_id=${student} ORDER BY item_id`;
  const repeat=async({wrong=false,guess=false}={})=>{
   const response=await post(practice,{action:'START',objectiveId:current});equal(response.status,200);
   const set=await response.json();equal(set.id===paper.id,false);
   for(const q of set.questions)equal((await post(practice,{action:'ANSWER',sessionId:set.id,itemId:q.id,
    answer:wrong?'One':'Two',confidence:guess?'GUESS':'SURE'})).status,200);
   const completed=await post(practice,{action:'FINISH',sessionId:set.id});equal(completed.status,200);
   equal((await completed.json()).correct,wrong?0:5);
  };
  const beforeEarly=await snapshot();
  await repeat();assert.deepEqual(await snapshot(),beforeEarly);checks++;
  // Simulated due dates are confined to the rollback-only fixture transaction.
  for(const [interval,expectedStreak] of [[7,2],[21,3]]){
   await tx`UPDATE weekly_student_item_schedule SET due_date=(now() AT TIME ZONE 'Africa/Lagos')::date,streak=${expectedStreak-1}
    WHERE student_id=${student}`;
   await repeat();
   for(const schedule of await snapshot()){
    equal(Number(schedule.interval_days),interval);equal(Number(schedule.streak),expectedStreak);
   }
  }
  await repeat({wrong:true});
  for(const schedule of await snapshot()){
   equal(Number(schedule.interval_days),1);equal(Number(schedule.streak),0);equal(schedule.last_result,false);
  }
  await repeat({guess:true});
  for(const schedule of await snapshot()){
   equal(Number(schedule.interval_days),1);equal(Number(schedule.streak),0);equal(schedule.last_result,true);
  }
  const afterRepeats=await workspace.weeklyObjectives(context);
  equal(afterRepeats[0].progress.evidence,5);equal(afterRepeats[0].progress.accuracy,100);
  equal(afterRepeats[0].progress.status==='MASTERED',false);
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
  const eligible=[],blocked=[];
  async function dueItem(objectiveId,{live=true,status='PUBLISHED',due=true}={}){
   const [objective]=await tx`SELECT * FROM weekly_curriculum_objectives WHERE id=${objectiveId}`;
   const [set]=await tx`INSERT INTO weekly_topic_question_sets(class_level,subject_name,term,week_number,topic_title)
    VALUES(${objective.class_level},${objective.subject_name},${objective.term},${objective.week_number},${objective.topic_title})
    ON CONFLICT(class_level,subject_name,term,week_number,topic_title) DO UPDATE SET topic_title=EXCLUDED.topic_title RETURNING id`;
   const id=randomUUID();
   await tx`INSERT INTO weekly_items(id,objective_id,prompt,item_type,options,answer_key,explanation,difficulty,source,source_ref,status,reviewer_id,reviewed_at)
    VALUES(${id},${objectiveId},'TEST_ONLY_REVISIT','MCQ','["One","Two","Three","Four"]'::jsonb,'{"correct":"B"}'::jsonb,
     'TEST_ONLY','APPLICATION','CURRICULUM_BANK','TEST_FIXTURE_NOT_CURRICULUM',${status},${admin},now())`;
   await tx`INSERT INTO weekly_topic_question_memberships(topic_set_id,item_id,pool,exam_eligible)
    VALUES(${set.id},${id},${live?'LIVE':'RESERVE'},true)`;
   await tx`INSERT INTO weekly_student_item_schedule(student_id,item_id,due_date,interval_days,streak)
    VALUES(${student},${id},(now() AT TIME ZONE 'Africa/Lagos')::date+${due?-3:2}::integer,2,1)`;
   return {id,objectiveId};
  }
  for(let i=0;i<11;i++)eligible.push(await dueItem(i<6?past:current));
  for(const objectiveId of [future,draft,otherClass])blocked.push(await dueItem(objectiveId));
  blocked.push(await dueItem(current,{live:false}),await dueItem(current,{status:'RETIRED'}),await dueItem(current,{due:false}));
  const optional=randomUUID(),optionalSubject=subject+'_OPTIONAL';
  await tx`INSERT INTO weekly_class_subjects(class_level,subject_name,subject_kind) VALUES('JSS1',${optionalSubject},'OPTIONAL')`;
  await tx`INSERT INTO weekly_curriculum_objectives(id,class_level,subject_name,term,week_number,day_index,topic_title,objective_text,source_reference,approval_status,reviewed_by,published_by,published_at)
   VALUES(${optional},'JSS1',${optionalSubject},1,2,1,${topic},'TEST_ONLY_OPTIONAL','TEST_FIXTURE_NOT_CURRICULUM','PUBLISHED',${admin},${admin},now())`;
  blocked.push(await dueItem(optional));
  const sureMistake=eligible.at(-1),mistakeSession=randomUUID();
  await tx`UPDATE weekly_student_item_schedule SET interval_days=21,streak=3,last_served_at=now()-interval '21 days'
   WHERE student_id=${student} AND item_id=${sureMistake.id}`;
  const mistakeSnapshot=[{id:sureMistake.id,objectiveId:current,prompt:'TEST_ONLY_REVISIT',options:['One','Two','Three','Four'],answer:'Two',explanation:'TEST_ONLY'}];
  await tx`INSERT INTO weekly_cbt_sessions(id,student_id,objective_id,source,mode,question_ids,item_snapshot,submitted_at,correct_count,total_count)
   VALUES(${mistakeSession},${student},${current},'DAILY_LESSON','PRACTICE',${[sureMistake.id]},${JSON.stringify(mistakeSnapshot)}::jsonb,now()-interval '1 day',0,1)`;
  await tx`INSERT INTO weekly_cbt_answers(session_id,item_id,answer,confidence,is_correct)
   VALUES(${mistakeSession},${sureMistake.id},'One','SURE',false)`;
  await tx`UPDATE weekly_student_item_schedule SET due_date=(now() AT TIME ZONE 'Africa/Lagos')::date WHERE student_id=${student} AND item_id=${sureMistake.id}`;
  const revisitResponse=await post(practice,{action:'START_REVISIT'});equal(revisitResponse.status,200);
  const revisit=await revisitResponse.json();equal(revisit.questions.length,8);equal(revisit.questions[0].id,sureMistake.id);
  equal(revisit.questions.some(q=>blocked.some(item=>item.id===q.id)),false);
  equal(revisit.questions.every(q=>eligible.some(item=>item.id===q.id)&&q.saved===null&&!('answer' in q)),true);
  equal((await (await post(practice,{action:'START_REVISIT'})).json()).id,revisit.id);
  const retention=load('lib/weeklyRevisit.ts');
  equal((await retention.weeklyRetentionSummary(context)).questions,0);
  for(const q of revisit.questions)equal((await post(practice,{action:'ANSWER',sessionId:revisit.id,itemId:q.id,answer:'Two',confidence:'SURE'})).status,200);
  const resumed=await (await practice.GET(new Request('https://avora-test.invalid/api/weekly/practice?sessionId='+revisit.id))).json();
  equal(resumed.questions.every(q=>q.saved?.correct===true&&q.saved.correctAnswer==='Two'),true);
  equal((await post(practice,{action:'FINISH',sessionId:revisit.id})).status,200);
  const [revisitStored]=await tx`SELECT source,mode,objective_id,correct_count,total_count FROM weekly_cbt_sessions WHERE id=${revisit.id}`;
  equal(revisitStored.source,'REVISIT');equal(revisitStored.mode,'PRACTICE');equal(revisitStored.objective_id,null);
  equal(Number(revisitStored.correct_count),8);equal(Number(revisitStored.total_count),8);
  const measured=await retention.weeklyRetentionSummary(context);
  equal(measured.questions,1);equal(measured.correct,1);equal(measured.retained,1);
  equal((await (await post(practice,{action:'START_REVISIT'})).json()).id,revisit.id);
  const revisitSchedule=await snapshot();
  equal((await (await post(practice,{action:'FINISH',sessionId:revisit.id})).json()).alreadySubmitted,true);
  assert.deepEqual(await snapshot(),revisitSchedule);checks++;
  for(const objectiveId of [current,past]){
   const rows=await workspace.weeklyObjectives(context,1,objectiveId===current?2:1);
   const expected=revisit.questions.filter(q=>eligible.find(item=>item.id===q.id)?.objectiveId===objectiveId).length;
   equal(rows[0].progress.evidence,(objectiveId===current?5:0)+expected);
  }
  signedIn=otherStudent;
  equal((await practice.GET(new Request('https://avora-test.invalid/api/weekly/practice?sessionId='+revisit.id))).status,404);
  equal((await (await post(practice,{action:'START_REVISIT'})).json()).questions.length,0);
  signedIn=student;
  const official=randomUUID();
  await tx`INSERT INTO weekly_cbt_sessions(id,student_id,source,mode,question_ids,item_snapshot)
   VALUES(${official},${student},'WEEKLY_EXAM','EXAM',${[sureMistake.id]},${JSON.stringify(mistakeSnapshot)}::jsonb)`;
  equal((await practice.GET(new Request('https://avora-test.invalid/api/weekly/practice?sessionId='+official))).status,404);
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
