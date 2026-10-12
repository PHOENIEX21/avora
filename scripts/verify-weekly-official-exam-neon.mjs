import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import ts from 'typescript';
import postgres from 'postgres';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),require=createRequire(import.meta.url),marker='AVORA_OFFICIAL_EXAM_ROLLBACK';
export async function verifyOfficialWeeklyExam(sql){
 let checks=0,rolledBack=false;const users=[];const equal=(a,b)=>{assert.equal(a,b);checks++};
 try{await sql.begin(async tx=>{
  const [identity]=await tx`SELECT current_setting('neon.branch_id',true) branch`;equal(identity.branch,'br-blue-scene-ayydvo7l');
  const admin=randomUUID(),student=randomUUID(),other=randomUUID(),parent=randomUUID(),theoryStudent=randomUUID(),legacyStudent=randomUUID();users.push(admin,student,other,parent,theoryStudent,legacyStudent);
  for(const id of users){const role=id===admin?'ADMIN':id===parent?'PARENT':'STUDENT';await tx`INSERT INTO users(id,email,password_hash,full_name,role) VALUES(${id},${id+'@avora-test.invalid'},'NOT_A_LOGIN_HASH','TEST_ONLY_OFFICIAL_EXAM',${role})`;
   if(role==='STUDENT')await tx`INSERT INTO student_profiles(user_id,class_level) VALUES(${id},'JSS1')`;
  }
  await tx`INSERT INTO weekly_class_flags(class_level,enabled) VALUES('JSS1',false) ON CONFLICT(class_level) DO UPDATE SET enabled=false`;
  await tx`INSERT INTO parent_student_links(parent_id,student_id,status) VALUES(${parent},${student},'ACTIVE')`;
  const subjectId=randomUUID(),topicId=randomUUID(),skill=randomUUID(),schedule=randomUUID(),objective=randomUUID(),subject='AVORA_TEST_'+randomUUID(),topic='TEST_ONLY_'+randomUUID();
  await tx`INSERT INTO subjects(id,slug,name) VALUES(${subjectId},${subject},${subject})`;
  await tx`INSERT INTO topics(id,subject_id,slug,name,stage) VALUES(${topicId},${subjectId},${topic},${topic},'JSS1')`;
  await tx`INSERT INTO skills(id,topic_id,slug,name) VALUES(${skill},${topicId},'TEST_ONLY','TEST_ONLY')`;
  await tx`INSERT INTO term_topic_schedule(id,class_level,subject_name,term,week_number,curriculum_topic_id) VALUES(${schedule},'JSS1',${subject},1,1,${topic})`;
  await tx`INSERT INTO academic_daily_objectives(id,schedule_id,day_index,title,objective_text,status) VALUES(${objective},${schedule},1,'TEST_ONLY','TEST_ONLY_OBJECTIVE','LIVE')`;
  const questionIds=[];
  for(let i=0;i<6;i++){const id=randomUUID();questionIds.push(id);
   await tx`INSERT INTO questions(id,skill_id,prompt,question_type,options,correct_answer,explanation,status,class_level)
    VALUES(${id},${skill},${'TEST_ONLY_'+i},${i===5?'SHORT_ANSWER':'MULTIPLE_CHOICE'},'["One","Two","Three","Four"]'::jsonb,'{"value":"B"}'::jsonb,'TEST_ONLY_APPROVED_SOLUTION','PUBLISHED','JSS1')`;
  }
  const blueprint=randomUUID(),version=randomUUID(),mixed=randomUUID(),mixedVersion=randomUUID();
  for(const [id,v,ids] of [[blueprint,version,questionIds.slice(0,5)],[mixed,mixedVersion,[...questionIds.slice(0,4),questionIds[5]]]]){
   await tx`INSERT INTO weekly_exam_blueprints(id,class_level,term,week_number,title,duration_minutes,question_count,status,created_by,approved_by,approved_at,release_at,closes_at,results_release_at)
    VALUES(${id},'JSS1',1,1,${'TEST_ONLY_'+id},15,5,'IN_REVIEW',${admin},${admin},clock_timestamp(),clock_timestamp()-interval '1 minute',clock_timestamp()+interval '1 hour',clock_timestamp()+interval '2 hours')`;
   await tx`INSERT INTO weekly_exam_versions(id,blueprint_id,version_number,status) VALUES(${v},${id},1,'IN_REVIEW')`;
   for(const [index,q] of ids.entries())await tx`INSERT INTO weekly_exam_version_questions(version_id,question_id,position,subject_name,curriculum_topic_id,objective_id,relevance_status,answer_status)
    VALUES(${v},${q},${index+1},${subject},${topic},${objective},'PASSED','PASSED')`;
  }
  let signedIn=student,role='STUDENT',guardianBlocked=false,failNotification=false,aiInputs=[];const cache=new Map();
  const tagged=async(strings,...values)=>{if(failNotification&&strings.join('').includes('INSERT INTO parent_notifications'))throw new Error('TEST_ONLY_INJECTED_OUTCOME_FAILURE');return tx(strings,...values)};
  tagged.json=value=>JSON.stringify(value);
  tagged.begin=async work=>{await tx.unsafe('SAVEPOINT avora_official_fixture');try{const result=await work(tagged);await tx.unsafe('RELEASE SAVEPOINT avora_official_fixture');return result}
   catch(error){await tx.unsafe('ROLLBACK TO SAVEPOINT avora_official_fixture');await tx.unsafe('RELEASE SAVEPOINT avora_official_fixture');throw error}};
  function load(file){file=resolve(root,file);if(cache.has(file))return cache.get(file);const mod={exports:{}};cache.set(file,mod.exports);
   const js=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
   new Function('module','exports','require',js)(mod,mod.exports,name=>{
    if(name==='./db'||name==='@/lib/db')return {sql:tagged,withDbRetry:work=>work()};
    if(name==='./dawnAccess')return {getDawnGate:async()=>({status:guardianBlocked?'verification_pending':'ready',classLevel:'JSS1',term:1,week:1})};
    if(name==='@/lib/auth')return {getSession:async()=>({userId:signedIn,role})};
    if(name==='@/lib/apiAccess')return {learningAccessDenial:async()=>null};
    if(name==='@/lib/premiumAccess')return {requirePremiumFeature:async()=>null};
    if(name==='@/lib/aiGateway')return {configuredAiProvider:()=>null,aiStructured:async()=>{throw new Error('AI must not receive held paper data')}};
    if(name==='@/lib/aiCostGuard')return {claimAiRequest:async()=>({allowed:false}),completeAiRequest:async()=>{}};
    if(name==='@/lib/admin/access')return {requireAdmin:async()=>{if(role!=='ADMIN')throw new Error('Admin required');return {userId:signedIn,role}}};
    if(name==='@/lib/weeklyTheoryMarker')return {markWeeklyTheory:async items=>{aiInputs=items;return {ok:true,json:{marks:items.map(item=>({questionId:item.questionId,fraction:.6,feedback:'TEST_ONLY_AI_DRAFT',evidence:'TEST_ONLY'}))}}}};
    if(name==='@/lib/weeklyExamGenerator')return {regenerateWeeklyQuestion:async()=>{throw new Error('No real question generation during fixture verification')}};
    if(name==='next/server')return {NextResponse:{json:(body,init)=>Response.json(body,init)}};
    if(name.startsWith('@/'))return load(name.slice(2)+'.ts');if(name.startsWith('.'))return load(resolve(dirname(file),name)+'.ts');return require(name);
   });return mod.exports;
  }
  const start=load('app/api/weekly-exam/[id]/start/route.ts'),read=load('app/api/weekly-exam/session/[id]/route.ts'),answer=load('app/api/weekly-exam/answer/route.ts'),finish=load('app/api/weekly-exam/finish/route.ts'),outcome=load('lib/weeklyOutcome.ts');
  const request=body=>new Request('https://avora-test.invalid',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const startPaper=id=>start.POST(request({}),{params:Promise.resolve({id})});
  const readPaper=id=>read.GET(new Request('https://avora-test.invalid'),{params:Promise.resolve({id})});
  const ownerLock=load('app/api/admin/weekly-exams/[id]/versions/[versionId]/lock/route.ts');
  const ownerSchedule=load('app/api/admin/weekly-exams/[id]/schedule/route.ts');
  const window={releaseAt:new Date(Date.now()+86400000).toISOString(),closesAt:new Date(Date.now()+90000000).toISOString(),resultsReleaseAt:new Date(Date.now()+93600000).toISOString()};
  const ownerEdit=load('app/api/admin/weekly-exams/[id]/versions/[versionId]/questions/[questionId]/edit/route.ts');
  const ownerReview=load('app/api/admin/weekly-exams/[id]/versions/[versionId]/questions/[questionId]/route.ts');
  signedIn=admin;role='ADMIN';
  // A fresh owner draft must not mutate a published bank question.
  const editContext={params:Promise.resolve({id:blueprint,versionId:version,questionId:questionIds[0]})};
  const edited=await ownerEdit.PATCH(request({prompt:'TEST_ONLY_OWNER_DRAFT',correctAnswer:'Two',solution:'TEST_ONLY_APPROVED_SOLUTION',options:['One','Two','Three','Four']}),editContext);
  equal(edited.status,200);const replacement=(await edited.json()).questionId;equal(replacement===questionIds[0],false);
  const [original]=await tx`SELECT prompt,status FROM questions WHERE id=${questionIds[0]}`;equal(original.prompt,'TEST_ONLY_0');equal(original.status,'PUBLISHED');
  const [fresh]=await tx`SELECT status FROM questions WHERE id=${replacement}`;equal(fresh.status,'DRAFT');
  equal((await ownerLock.POST(request({}),{params:Promise.resolve({id:blueprint,versionId:version})})).status,409);
  const reviewContext={params:Promise.resolve({id:blueprint,versionId:version,questionId:replacement})};
  for(const action of ['PASS_RELEVANCE','PASS_ANSWER'])equal((await ownerReview.PATCH(request({action}),reviewContext)).status,200);
  await tx`UPDATE weekly_exam_version_questions SET question_id=${replacement} WHERE version_id=${mixedVersion} AND question_id=${questionIds[0]}`;
  questionIds[0]=replacement;
  for(const [id,versionId] of [[blueprint,version],[mixed,mixedVersion]]){
   equal((await ownerLock.POST(request({}),{params:Promise.resolve({id,versionId})})).status,200);
   const [sealed]=await tx`SELECT paper_snapshot,status FROM weekly_exam_versions WHERE id=${versionId}`;equal(sealed.paper_snapshot.length,5);equal(sealed.status,'LOCKED');
   await tx`UPDATE weekly_exam_blueprints SET release_at=NULL WHERE id=${id}`;
   equal((await ownerSchedule.POST(request(window),{params:Promise.resolve({id})})).status,200);
   equal((await ownerSchedule.POST(request({...window,resultsReleaseAt:window.releaseAt}),{params:Promise.resolve({id})})).status,400);
   await tx`UPDATE weekly_exam_blueprints SET status='LIVE',release_at=clock_timestamp()-interval '1 minute',closes_at=clock_timestamp()+interval '1 hour',results_release_at=clock_timestamp()+interval '2 hours' WHERE id=${id}`;
   equal((await ownerSchedule.POST(request(window),{params:Promise.resolve({id})})).status,409);
  }
  const [published]=await tx`SELECT status FROM questions WHERE id=${replacement}`;equal(published.status,'PUBLISHED');
  equal((await ownerEdit.PATCH(request({prompt:'BLOCKED',correctAnswer:'Two',solution:'BLOCKED',options:['One','Two','Three','Four']}),{params:Promise.resolve({id:blueprint,versionId:version,questionId:replacement})})).status,409);
  signedIn=student;role='STUDENT';
  equal((await startPaper('bad-id')).status,400);role='PARENT';equal((await startPaper(blueprint)).status,403);role='STUDENT';
  await tx`UPDATE weekly_class_flags SET enabled=true WHERE class_level='JSS1'`;guardianBlocked=true;equal((await startPaper(blueprint)).status,403);
  guardianBlocked=false;await tx`UPDATE weekly_class_flags SET enabled=false WHERE class_level='JSS1'`;
  const studentMixed=await (await startPaper(mixed)).json();const studentMixedPaper=await (await readPaper(studentMixed.sessionId)).json();
  for(const q of studentMixedPaper.questions)equal((await answer.POST(request({sessionId:studentMixed.sessionId,questionId:q.id,answer:q.type==='MULTIPLE_CHOICE'?'Two':'TEST_ONLY_THEORY_RESPONSE'}))).status,200);
  const started=await startPaper(blueprint);equal(started.status,200);const first=await started.json();equal((await (await startPaper(blueprint)).json()).sessionId,first.sessionId);
  let paper=await (await readPaper(first.sessionId)).json();equal(paper.questions.length,5);equal(/"(key|correct_answer|explanation)":/.test(JSON.stringify(paper)),false);
  const firstAnswer={sessionId:first.sessionId,questionId:paper.questions[0].id,answer:'Two'};
  equal((await answer.POST(request(firstAnswer))).status,200);equal((await (await readPaper(first.sessionId)).json()).answers[firstAnswer.questionId],'Two');
  equal((await answer.POST(request({...firstAnswer,questionId:objective}))).status,400);
  equal((await answer.POST(request({...firstAnswer,answer:'outside'}))).status,400);
  const embargo=load('lib/weeklyExamEmbargo.ts');equal((await embargo.heldOfficialQuestionIds(questionIds.slice(0,5))).size,5);
  for(const path of ['app/api/attempts/route.ts','app/api/tutor/check/route.ts','app/api/practice/explain/route.ts','app/api/practice/step/route.ts']){
   const result=await load(path).POST(request({questionId:firstAnswer.questionId,answer:'Two',reveal:true,stepIndex:0}));
   equal(result.status,409);equal(/"(correct|correctAnswer|explanation)":/.test(JSON.stringify(await result.json())),false);
  }
  await tx`UPDATE exam_sessions SET status='ACTIVE' WHERE id=${first.sessionId}`;
  equal((await load('app/api/exam/answer/route.ts').POST(request(firstAnswer))).status,409);
  equal((await load('app/api/exam/finish/route.ts').POST(request({sessionId:first.sessionId}))).status,404);
  equal((await load('app/api/exam/assignment-finish/route.ts').POST(request({sessionId:first.sessionId}))).status,404);
  await tx`UPDATE exam_sessions SET status='IN_PROGRESS' WHERE id=${first.sessionId}`;
  signedIn=other;equal((await readPaper(first.sessionId)).status,404);equal((await finish.POST(request({sessionId:first.sessionId}))).status,404);
  const timed=await (await startPaper(blueprint)).json();const timedPaper=await (await readPaper(timed.sessionId)).json();
  equal((await answer.POST(request({sessionId:timed.sessionId,questionId:timedPaper.questions[0].id,answer:'Two'}))).status,200);
  await tx`UPDATE exam_sessions SET started_at=clock_timestamp()-interval '16 minutes' WHERE id=${timed.sessionId}`;
  equal((await answer.POST(request({sessionId:timed.sessionId,questionId:timedPaper.questions[0].id,answer:'One'}))).status,409);
  equal((await load('lib/weeklyExamSession.ts').expireOfficialWeeklyExams()).expired,1);
  equal((await load('lib/weeklyExamSession.ts').expireOfficialWeeklyExams()).expired,0);
  equal((await (await readPaper(timed.sessionId)).json()).completed,true);
  const [timedStored]=await tx`SELECT status,answers,score FROM exam_sessions WHERE id=${timed.sessionId}`;equal(timedStored.status,'COMPLETED');equal(timedStored.answers[timedPaper.questions[0].id],'Two');equal(Number(timedStored.score),.2);
  await tx`UPDATE questions SET correct_answer='{"value":"One"}'::jsonb,prompt='TEST_ONLY_EDITED_BASE',explanation='TEST_ONLY_EDITED_SOLUTION' WHERE id=ANY(${questionIds}::uuid[])`;
  signedIn=theoryStudent;const mixedStarted=await (await startPaper(mixed)).json();const mixedPaper=await (await readPaper(mixedStarted.sessionId)).json();
  equal(mixedPaper.questions.every(q=>q.prompt!=='TEST_ONLY_EDITED_BASE'),true);
  for(const q of mixedPaper.questions)equal((await answer.POST(request({sessionId:mixedStarted.sessionId,questionId:q.id,answer:q.type==='MULTIPLE_CHOICE'?'Two':'TEST_ONLY_THEORY_RESPONSE'}))).status,200);
  signedIn=student;
  paper=await (await readPaper(first.sessionId)).json();equal(paper.questions.every(q=>q.prompt!=='TEST_ONLY_EDITED_BASE'),true);
  for(const q of paper.questions)equal((await answer.POST(request({sessionId:first.sessionId,questionId:q.id,answer:'Two'}))).status,200);
  const submitted=await finish.POST(request({sessionId:first.sessionId}));equal(submitted.status,200);equal(/"(score|objectiveCorrect|objectiveTotal|correctAnswer)":/.test(JSON.stringify(await submitted.json())),false);
  equal((await (await finish.POST(request({sessionId:first.sessionId}))).json()).alreadySubmitted,true);
  const [evidence]=await tx`SELECT count(*)::int count FROM attempts WHERE student_id=${student}`;equal(evidence.count,0);
  const [marks]=await tx`SELECT count(*)::int count,sum(mark_fraction)::int earned FROM weekly_exam_question_marks WHERE session_id=${first.sessionId}`;equal(marks.count,5);equal(marks.earned,5);
  equal((await outcome.syncWeeklyOutcome(first.sessionId,student)).synced,false);
  const [heldMastery]=await tx`SELECT count(*)::int count FROM mastery WHERE student_id=${student}`;equal(heldMastery.count,0);
  const [heldParents]=await tx`SELECT count(*)::int count FROM parent_notifications WHERE student_id=${student}`;equal(heldParents.count,0);
  await tx`UPDATE weekly_exam_blueprints SET results_release_at=clock_timestamp()-interval '1 minute' WHERE id=${blueprint}`;
  equal((await outcome.syncWeeklyOutcome(first.sessionId,student)).synced,false);
  await tx`UPDATE weekly_exam_blueprints SET closes_at=clock_timestamp()-interval '1 second' WHERE id=${blueprint}`;
  failNotification=true;await assert.rejects(outcome.syncWeeklyOutcome(first.sessionId,student),/TEST_ONLY_INJECTED_OUTCOME_FAILURE/);checks++;
  const [failed]=await tx`SELECT weekly_outcome_sync_state FROM exam_sessions WHERE id=${first.sessionId}`;equal(failed.weekly_outcome_sync_state,'PENDING');
  const [failedMastery]=await tx`SELECT count(*)::int count FROM mastery WHERE student_id=${student}`;equal(failedMastery.count,0);
  failNotification=false;equal((await outcome.syncWeeklyOutcome(first.sessionId,student)).synced,true);equal((await outcome.syncWeeklyOutcome(first.sessionId,student)).synced,false);
  const [skillEvidence]=await tx`SELECT evidence_count FROM mastery WHERE student_id=${student} AND skill_id=${skill}`;equal(skillEvidence.evidence_count,5);
  const [releasedAttempts]=await tx`SELECT count(*)::int count FROM attempts WHERE student_id=${student}`;equal(releasedAttempts.count,5);
  const [objectiveEvidence]=await tx`SELECT evidence_count FROM learner_objective_mastery WHERE student_id=${student} AND objective_id=${objective}`;equal(objectiveEvidence.evidence_count,5);
  const [parentCount]=await tx`SELECT count(*)::int count FROM parent_notifications WHERE student_id=${student}`;equal(parentCount.count,1);
  const [parentReport]=await tx`SELECT attempts,correct_answers,summary,supervised_assessments,supervised_average FROM parent_weekly_reports WHERE student_id=${student}`;equal(parentReport.attempts,5);equal(parentReport.correct_answers,5);equal(parentReport.summary.includes('%'),false);equal(parentReport.supervised_assessments,0);equal(parentReport.supervised_average,null);
  signedIn=theoryStudent;equal((await finish.POST(request({sessionId:mixedStarted.sessionId}))).status,200);
  const [mixedPending]=await tx`SELECT score,marking_status FROM exam_sessions WHERE id=${mixedStarted.sessionId}`;equal(mixedPending.score,null);equal(mixedPending.marking_status,'PENDING');
  await tx`UPDATE weekly_exam_blueprints SET closes_at=clock_timestamp()-interval '1 second',results_release_at=clock_timestamp()-interval '1 second' WHERE id=${mixed}`;
  equal((await embargo.heldOfficialQuestionIds(questionIds.slice(0,5))).size,0);
  equal((await outcome.syncWeeklyOutcome(mixedStarted.sessionId,theoryStudent)).synced,false);
  signedIn=admin;role='ADMIN';const draft=load('app/api/admin/weekly-exams/sessions/[id]/mark-theory/route.ts'),finalize=load('app/api/admin/weekly-exams/sessions/[id]/finalize/route.ts');
  equal((await draft.POST(request({}),{params:Promise.resolve({id:mixedStarted.sessionId})})).status,200);
  equal(aiInputs[0].approvedSolution,'TEST_ONLY_APPROVED_SOLUTION');equal(aiInputs[0].objective,'TEST_ONLY_OBJECTIVE');
  equal((await finalize.POST(request({marks:{}}),{params:Promise.resolve({id:mixedStarted.sessionId})})).status,400);
  const finalMarks={[questionIds[5]]:{fraction:1,feedback:'TEST_ONLY_OWNER_APPROVAL'}};
  equal((await finalize.POST(request({marks:finalMarks}),{params:Promise.resolve({id:mixedStarted.sessionId})})).status,200);
  equal((await finalize.POST(request({marks:finalMarks}),{params:Promise.resolve({id:mixedStarted.sessionId})})).status,409);
  equal((await outcome.syncWeeklyOutcome(mixedStarted.sessionId,theoryStudent)).synced,true);
  const [mixedFinal]=await tx`SELECT score FROM exam_sessions WHERE id=${mixedStarted.sessionId}`;equal(Number(mixedFinal.score),1);
  signedIn=student;role='STUDENT';equal((await finish.POST(request({sessionId:studentMixed.sessionId}))).status,200);
  signedIn=admin;role='ADMIN';equal((await draft.POST(request({}),{params:Promise.resolve({id:studentMixed.sessionId})})).status,200);
  equal((await finalize.POST(request({marks:finalMarks}),{params:Promise.resolve({id:studentMixed.sessionId})})).status,200);
  equal((await outcome.syncWeeklyOutcome(studentMixed.sessionId,student)).synced,true);
  const [distinctSkill]=await tx`SELECT evidence_count FROM mastery WHERE student_id=${student} AND skill_id=${skill}`;equal(distinctSkill.evidence_count,6);
  const [distinctObjective]=await tx`SELECT evidence_count,status FROM learner_objective_mastery WHERE student_id=${student} AND objective_id=${objective}`;equal(distinctObjective.evidence_count,6);equal(distinctObjective.status==='MASTERED',false);
  const [distinctTopic]=await tx`SELECT status,attempts_count FROM student_topic_mastery WHERE student_id=${student} AND curriculum_topic_id=${topic}`;equal(distinctTopic.status==='MASTERED',false);equal(distinctTopic.attempts_count,6);
  const [weeklyActivity]=await tx`SELECT attempts,correct_answers FROM parent_weekly_reports WHERE student_id=${student}`;equal(weeklyActivity.attempts,10);equal(weeklyActivity.correct_answers,10);
  const legacy=randomUUID();await tx`INSERT INTO exam_sessions(id,student_id,exam_name,subject_name,question_ids,status,score,submitted_at,weekly_exam_blueprint_id,weekly_exam_version_id)
   VALUES(${legacy},${legacyStudent},'TEST_ONLY_LEGACY',${subject},${questionIds.slice(0,5)}::uuid[],'COMPLETED',.7,clock_timestamp(),${blueprint},${version})`;
  equal((await outcome.syncWeeklyOutcome(legacy,legacyStudent)).synced,false);
  const [preserved]=await tx`SELECT score,weekly_outcome_sync_state FROM exam_sessions WHERE id=${legacy}`;equal(Number(preserved.score),.7);equal(preserved.weekly_outcome_sync_state,'LEGACY');
  throw new Error(marker);
 });}catch(error){if(error.message!==marker)throw error;rolledBack=true}
 const [left]=await sql`SELECT count(*)::int count FROM users WHERE id=ANY(${users}::uuid[])`;equal(left.count,0);return {checks,rolledBack};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const sql=process.env.AVORA_DATABASE_TRANSPORT==='neon-websocket'?(await import('../lib/neonDevelopmentDb.ts')).createNeonDevelopmentSql(process.env.DATABASE_URL):postgres(process.env.DATABASE_URL,{ssl:'require',max:1});
 try{console.log(JSON.stringify(await verifyOfficialWeeklyExam(sql)))}finally{await sql.end()}
}
