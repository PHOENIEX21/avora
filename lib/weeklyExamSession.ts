import {randomInt} from 'node:crypto';
import type postgres from 'postgres';
import {sql,withDbRetry} from './db';
import {answerIsCorrect} from './answers';
import {weeklyStudentContext,WeeklyWorkspaceError} from './weeklyWorkspace';
type Tx=postgres.TransactionSql;
export type WeeklyPaperQuestion={id:string;subject:string;topic:string;objectiveId:string;objectiveText:string;skillId:string;prompt:string;type:string;options:string[];key:unknown;explanation:string};
function shuffled<T>(values:T[]){const result=[...values];for(let i=result.length-1;i>0;i--){const j=randomInt(i+1);[result[i],result[j]]=[result[j],result[i]]}return result}
export function reviewedWeeklyPaper(rows:Record<string,unknown>[],count:number,randomize=true):WeeklyPaperQuestion[]{
 if(rows.length!==count||count<5||new Set(rows.map(row=>row.id)).size!==count)throw new WeeklyWorkspaceError('The reviewed paper is incomplete.',409);
 const paper=rows.map(row=>{
  if(!['PASSED','ADMIN_OVERRIDE'].includes(String(row.relevance_status))||!['PASSED','ADMIN_OVERRIDE'].includes(String(row.answer_status))
   ||row.status!=='PUBLISHED'||!row.objective_id||!row.prompt||!row.explanation)throw new WeeklyWorkspaceError('A paper question needs owner review.',409);
  const options=Array.isArray(row.options)?row.options.map(String):[];let key=row.correct_answer;
  if(row.question_type==='MULTIPLE_CHOICE'){
   if(options.length!==4||options.some(option=>!option.trim())||new Set(options.map(option=>option.trim().toLowerCase())).size!==4)throw new WeeklyWorkspaceError('A paper option set needs owner review.',409);
   const correct=options.filter(option=>answerIsCorrect(option,key,options));
   if(correct.length!==1)throw new WeeklyWorkspaceError('A paper answer key needs owner review.',409);key=correct[0];
  }
  return {id:String(row.id),subject:String(row.subject_name),topic:String(row.curriculum_topic_id),objectiveId:String(row.objective_id),objectiveText:String(row.objective_text||''),skillId:String(row.skill_id),prompt:String(row.prompt),type:String(row.question_type),options:randomize?shuffled(options):options,key,explanation:String(row.explanation)};
 });return randomize?shuffled(paper):paper;
}
export async function reviewedOfficialVersion(tx:Tx,exam:{versionId:string;classLevel:string;term:number;week:number;count:number}){
 const rows=await tx`SELECT q.id,q.prompt,q.question_type,q.options,q.correct_answer,q.explanation,q.skill_id,q.status,
  x.subject_name,x.curriculum_topic_id,x.objective_id,o.objective_text,x.relevance_status,x.answer_status
  FROM weekly_exam_version_questions x JOIN questions q ON q.id=x.question_id
  JOIN academic_daily_objectives o ON o.id=x.objective_id AND o.status='LIVE'
  JOIN term_topic_schedule schedule ON schedule.id=o.schedule_id AND schedule.class_level=${exam.classLevel}
   AND schedule.subject_name=x.subject_name AND schedule.curriculum_topic_id=x.curriculum_topic_id
  WHERE x.version_id=${exam.versionId} AND q.class_level=${exam.classLevel}
   AND (schedule.term<${exam.term} OR (schedule.term=${exam.term} AND schedule.week_number<=${exam.week})) ORDER BY x.position`;
 if(rows.some(row=>!['DRAFT','REVIEW','PUBLISHED'].includes(String(row.status))))throw new WeeklyWorkspaceError('A retired paper question needs replacement.',409);
 // Publication happens only in the authenticated owner's final approval transaction.
 return reviewedWeeklyPaper(rows.map(row=>({...row,status:'PUBLISHED'})),exam.count,false);
}
export async function officialWeeklyContext(studentId:string){
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${studentId}`);
 const cls=String(profile?.class_level||'').toUpperCase();if(!cls)throw new WeeklyWorkspaceError('Student class is unavailable.',403);
 const [flag]=await withDbRetry(()=>sql`SELECT enabled FROM weekly_class_flags WHERE class_level=${cls}`);
 return {cls,weekly:flag?.enabled===true?await weeklyStudentContext(studentId):null};
}
export function checkOfficialRelease(context:Awaited<ReturnType<typeof officialWeeklyContext>>,row:Record<string,unknown>){
 if(row.class_level!==context.cls)throw new WeeklyWorkspaceError('Weekly exam unavailable for your class.',404);
 if(context.weekly&&(Number(row.term)>context.weekly.term||(Number(row.term)===context.weekly.term&&Number(row.week_number)>context.weekly.week)))throw new WeeklyWorkspaceError('This academic week has not been released.',403);
}
async function lockedSession(tx:Tx,studentId:string,id:string,context:Awaited<ReturnType<typeof officialWeeklyContext>>){
 const [row]=await tx`SELECT es.*,b.class_level,b.term,b.week_number,b.title,b.release_at,b.closes_at,b.results_release_at,b.status blueprint_status,
  clock_timestamp()<b.release_at AS before_open,
  clock_timestamp()>=b.release_at AND clock_timestamp()<b.closes_at AND clock_timestamp()<es.started_at+es.duration_seconds*interval '1 second' AS accepts_answers,
  GREATEST(0,ceil(extract(epoch FROM LEAST(b.closes_at,es.started_at+es.duration_seconds*interval '1 second')-clock_timestamp())))::int seconds_remaining
  FROM exam_sessions es JOIN weekly_exam_blueprints b ON b.id=es.weekly_exam_blueprint_id
  JOIN weekly_exam_versions v ON v.id=es.weekly_exam_version_id AND v.blueprint_id=b.id AND v.status IN ('LOCKED','SUPERSEDED') AND v.locked_at IS NOT NULL
  WHERE es.id=${id} AND es.student_id=${studentId} FOR UPDATE OF es`;
 if(!row)throw new WeeklyWorkspaceError('Weekly exam session not found.',404);checkOfficialRelease(context,row);return row;
}
function paperOf(row:Record<string,unknown>){
 if(!Array.isArray(row.weekly_paper_snapshot)||!row.weekly_paper_snapshot.length)throw new WeeklyWorkspaceError('This earlier paper needs owner review before resuming.',409);
 return row.weekly_paper_snapshot as WeeklyPaperQuestion[];
}
export async function startOfficialWeeklyExam(studentId:string,blueprintId:string){
 const context=await officialWeeklyContext(studentId);
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${studentId} FOR UPDATE`;
  const rows=await tx`SELECT b.*,v.id version_id,v.paper_snapshot FROM weekly_exam_blueprints b JOIN weekly_exam_versions v ON v.blueprint_id=b.id AND v.status='LOCKED' AND v.locked_at IS NOT NULL
   WHERE b.id=${blueprintId} AND b.class_level=${context.cls} AND b.approved_by IS NOT NULL AND b.approved_at IS NOT NULL ORDER BY v.version_number DESC LIMIT 2 FOR SHARE OF b,v`;
  if(rows.length!==1)throw new WeeklyWorkspaceError('This reviewed weekly exam is unavailable.',403);
  const exam=rows[0];checkOfficialRelease(context,exam);
  const [existing]=await tx`SELECT id,status,weekly_paper_snapshot FROM exam_sessions WHERE student_id=${studentId} AND weekly_exam_blueprint_id=${blueprintId} FOR UPDATE`;
  if(existing){if(existing.status!=='COMPLETED')paperOf(existing);return {sessionId:String(existing.id),status:String(existing.status)}}
  const [clock]=await tx`SELECT clock_timestamp()>=${exam.release_at}::timestamptz AND clock_timestamp()<${exam.closes_at}::timestamptz AS open`;
  if(!['SCHEDULED','LIVE'].includes(String(exam.status))||!clock?.open||Number(exam.duration_minutes)<10)throw new WeeklyWorkspaceError('This weekly exam is not currently open.',403);
  if(!Array.isArray(exam.paper_snapshot)||exam.paper_snapshot.length!==Number(exam.question_count))throw new WeeklyWorkspaceError('This earlier locked version needs owner review and a sealed replacement.',409);
  const sealed=exam.paper_snapshot as WeeklyPaperQuestion[];
  const available=await tx`SELECT q.id FROM questions q JOIN weekly_exam_version_questions x ON x.question_id=q.id
   JOIN academic_daily_objectives o ON o.id=x.objective_id AND o.status='LIVE'
   WHERE x.version_id=${exam.version_id} AND q.id=ANY(${sealed.map(q=>q.id)}::uuid[]) AND q.status='PUBLISHED' AND q.class_level=${context.cls}
    AND x.relevance_status IN ('PASSED','ADMIN_OVERRIDE') AND x.answer_status IN ('PASSED','ADMIN_OVERRIDE')`;
  if(available.length!==sealed.length)throw new WeeklyWorkspaceError('The sealed paper contains unavailable questions.',409);
  const paper=shuffled(sealed.map(question=>({...question,options:shuffled(question.options)})));
  const [created]=await tx`INSERT INTO exam_sessions(student_id,exam_name,subject_name,question_ids,answers,started_at,duration_seconds,status,assessment_type,schedule_kind,weekly_exam_blueprint_id,weekly_exam_version_id,weekly_paper_snapshot)
   VALUES(${studentId},${exam.title},'Weekly Integrated',${paper.map(question=>question.id)}::uuid[],'{}'::jsonb,clock_timestamp(),${Number(exam.duration_minutes)*60},'IN_PROGRESS','WEEKLY_EXAM','WEEKLY',${blueprintId},${exam.version_id},${JSON.stringify(paper)}::jsonb) RETURNING id`;
  return {sessionId:String(created.id),status:'IN_PROGRESS'};
 });
}
export async function readOfficialWeeklyExam(studentId:string,id:string){
 const context=await officialWeeklyContext(studentId);
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${studentId} FOR UPDATE`;const row=await lockedSession(tx,studentId,id,context);
  if(row.status==='COMPLETED')return {sessionId:id,completed:true};
  if(row.before_open)throw new WeeklyWorkspaceError('This exam has not opened.',409);
  if(!['ACTIVE','IN_PROGRESS'].includes(String(row.status))||!['SCHEDULED','LIVE','CLOSED'].includes(String(row.blueprint_status)))throw new WeeklyWorkspaceError('This exam is unavailable.',409);
  const paper=paperOf(row);if(!row.accepts_answers){await submit(tx,studentId,row,paper);return {sessionId:id,completed:true}}
  return {sessionId:id,title:String(row.title),startedAt:row.started_at,durationSeconds:Number(row.duration_seconds),closesAt:row.closes_at,secondsRemaining:Number(row.seconds_remaining),answers:row.answers||{},
   questions:paper.map((question,index)=>({id:question.id,number:index+1,subject:question.subject,topic:question.topic,prompt:question.prompt,type:question.type,options:question.options}))};
 });
}
export async function saveOfficialWeeklyAnswer(studentId:string,id:string,questionId:string,answer:string){
 const context=await officialWeeklyContext(studentId);
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${studentId} FOR UPDATE`;const row=await lockedSession(tx,studentId,id,context);
  if(!['ACTIVE','IN_PROGRESS'].includes(String(row.status))||!['SCHEDULED','LIVE'].includes(String(row.blueprint_status))||!row.accepts_answers)throw new WeeklyWorkspaceError('The server deadline has ended or the exam is unavailable.',409);
  const question=paperOf(row).find(question=>question.id===questionId);
  if(!question||(question.type==='MULTIPLE_CHOICE'&&answer!==''&&!question.options.includes(answer)))throw new WeeklyWorkspaceError('Choose an answer from this paper.',400);
  await tx`UPDATE exam_sessions SET answers=answers||${JSON.stringify({[questionId]:answer})}::jsonb WHERE id=${id} AND student_id=${studentId}`;return {ok:true};
 });
}
async function submit(tx:Tx,studentId:string,row:Record<string,unknown>,paper:WeeklyPaperQuestion[]){
 if(row.status==='COMPLETED')return {ok:true,alreadySubmitted:true};
 if(row.before_open||!['ACTIVE','IN_PROGRESS'].includes(String(row.status))||!['SCHEDULED','LIVE','CLOSED'].includes(String(row.blueprint_status)))throw new WeeklyWorkspaceError('This exam cannot be submitted.',409);
 const answers=(row.answers||{}) as Record<string,string>,objective=paper.filter(question=>question.type==='MULTIPLE_CHOICE'),theory=paper.length-objective.length;let correct=0;
 for(const question of objective){const answer=answers[question.id]||'',ok=answer===question.key;if(ok)correct++;
  await tx`INSERT INTO weekly_exam_question_marks(session_id,question_id,objective_id,subject_name,curriculum_topic_id,mark_fraction,marking_source,feedback)
   VALUES(${String(row.id)},${question.id},${question.objectiveId},${question.subject},${question.topic},${ok?1:0},'OBJECTIVE_AUTO',${ok?'Correct objective response':'Incorrect objective response'})`;
 }
 const score=objective.length?correct/objective.length:null;
 await tx`UPDATE exam_sessions SET status='COMPLETED',submitted_at=clock_timestamp(),objective_score=${score},score=${theory?null:score},marking_status=${theory?'PENDING':'NOT_REQUIRED'},weekly_outcome_sync_state='PENDING' WHERE id=${String(row.id)} AND student_id=${studentId}`;
 return {ok:true,alreadySubmitted:false};
}
export async function finishOfficialWeeklyExam(studentId:string,id:string){
 const context=await officialWeeklyContext(studentId);
 return sql.begin(async tx=>{await tx`SELECT id FROM users WHERE id=${studentId} FOR UPDATE`;const row=await lockedSession(tx,studentId,id,context);
  if(row.status==='COMPLETED')return {ok:true,alreadySubmitted:true};return submit(tx,studentId,row,paperOf(row));
 });
}
/** Secret-protected server jobs can finish expired snapshots without serving learner content. */
export async function expireOfficialWeeklyExams(){
 const rows=await withDbRetry(()=>sql`SELECT es.id,es.student_id,b.class_level FROM exam_sessions es
  JOIN weekly_exam_blueprints b ON b.id=es.weekly_exam_blueprint_id
  WHERE es.status IN ('ACTIVE','IN_PROGRESS') AND es.weekly_paper_snapshot IS NOT NULL AND b.status IN ('SCHEDULED','LIVE','CLOSED')
   AND b.release_at IS NOT NULL AND clock_timestamp()>=b.release_at
   AND (clock_timestamp()>=b.closes_at OR clock_timestamp()>=es.started_at+es.duration_seconds*interval '1 second')
  ORDER BY es.started_at,es.id LIMIT 2`);
 let expired=0;
 for(const candidate of rows)expired+=await sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${candidate.student_id} FOR UPDATE`;
  const row=await lockedSession(tx,String(candidate.student_id),String(candidate.id),{cls:String(candidate.class_level),weekly:null});
  if(row.status==='COMPLETED'||row.accepts_answers||row.before_open)return 0;
  await submit(tx,String(candidate.student_id),row,paperOf(row));return 1;
 });
 return {expired};
}
