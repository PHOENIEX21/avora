import {sql} from './db';
import type postgres from 'postgres';
import {WeeklyWorkspaceError,type WeeklyStudentContext} from './weeklyWorkspace';
import {reviewedPracticeItem,publicPracticeItem,type PracticeItem} from './weeklyWorkspacePolicy';
import {answerIsCorrect} from './answers';
import {BASELINE_QUESTION_TARGET,baselineMayPostpone,baselinePostponementDeadline} from './weeklyBaselinePolicy';

type Transaction=postgres.TransactionSql;
export type BaselineItem=PracticeItem&{objectiveId:string;subject:string;objectiveText:string;week:number;term:number};
type Result={objectiveId:string;subject:string;objectiveText:string;correct:number;total:number;needsPractice:boolean};

export async function baselineCandidates(tx:Transaction,classLevel:string,term:number,ids?:string[]){
 const rows=ids?await tx`SELECT i.*,o.subject_name,o.objective_text,o.week_number,o.term FROM weekly_items i
  JOIN weekly_curriculum_objectives o ON o.id=i.objective_id
  JOIN weekly_class_subjects cs ON cs.class_level=o.class_level AND cs.subject_name=o.subject_name AND cs.active=true AND cs.subject_kind='CORE'
  WHERE i.id=ANY(${ids}::uuid[]) AND o.class_level=${classLevel} AND o.term=${term}
   AND o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL AND i.status='PUBLISHED'
   AND i.reviewer_id IS NOT NULL AND i.reviewed_at IS NOT NULL
   AND EXISTS(SELECT 1 FROM weekly_topic_question_memberships m JOIN weekly_topic_question_sets t ON t.id=m.topic_set_id
    WHERE m.item_id=i.id AND m.pool='LIVE' AND t.class_level=o.class_level AND t.subject_name=o.subject_name
     AND t.term=o.term AND t.week_number=o.week_number AND t.topic_title=o.topic_title)
   AND NOT EXISTS(SELECT 1 FROM weekly_question_reports r WHERE r.item_id=i.id AND r.status='PENDING'
    GROUP BY r.item_id HAVING count(DISTINCT r.student_id)>=3)`
  :await tx`SELECT i.*,o.subject_name,o.objective_text,o.week_number,o.term FROM weekly_items i
   JOIN weekly_curriculum_objectives o ON o.id=i.objective_id
   JOIN weekly_class_subjects cs ON cs.class_level=o.class_level AND cs.subject_name=o.subject_name AND cs.active=true AND cs.subject_kind='CORE'
   WHERE o.class_level=${classLevel} AND o.term=${term} AND o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL
    AND i.status='PUBLISHED' AND i.reviewer_id IS NOT NULL AND i.reviewed_at IS NOT NULL
    AND EXISTS(SELECT 1 FROM weekly_topic_question_memberships m JOIN weekly_topic_question_sets t ON t.id=m.topic_set_id
     WHERE m.item_id=i.id AND m.pool='LIVE' AND t.class_level=o.class_level AND t.subject_name=o.subject_name
      AND t.term=o.term AND t.week_number=o.week_number AND t.topic_title=o.topic_title)
    AND NOT EXISTS(SELECT 1 FROM weekly_question_reports r WHERE r.item_id=i.id AND r.status='PENDING'
     GROUP BY r.item_id HAVING count(DISTINCT r.student_id)>=3)
   ORDER BY o.subject_name,o.week_number,i.id LIMIT 1000`;
 return rows.flatMap(row=>{
  const item=reviewedPracticeItem(row);return item?[{...item,objectiveId:String(row.objective_id),subject:String(row.subject_name),
   objectiveText:String(row.objective_text),week:Number(row.week_number),term:Number(row.term)}]:[];
 });
}
export async function selectedBaselinePaper(tx:Transaction,classLevel:string,term:number,ids:string[],week?:number){
 if(ids.length!==BASELINE_QUESTION_TARGET||new Set(ids).size!==BASELINE_QUESTION_TARGET)
  throw new WeeklyWorkspaceError('Select twenty distinct reviewed questions.',409);
 const items=await baselineCandidates(tx,classLevel,term,ids);
 if(items.length!==BASELINE_QUESTION_TARGET||items.some(item=>week!==undefined&&item.week>week))
  throw new WeeklyWorkspaceError('The starting check contains unavailable or unreleased questions.',409);
 const subjects=await tx`SELECT subject_name FROM weekly_class_subjects WHERE class_level=${classLevel} AND active=true AND subject_kind='CORE'`;
 const covered=new Set(items.map(item=>item.subject));
 if(![...covered].some(name=>/english/i.test(name))||![...covered].some(name=>/mathematics/i.test(name))
  ||subjects.some(subject=>!covered.has(String(subject.subject_name))))
  throw new WeeklyWorkspaceError('Include English, Mathematics and every active core subject.',409);
 return ids.map(id=>items.find(item=>item.id===id)!);
}
export function baselineResults(items:BaselineItem[],answers:Record<string,string>):Result[]{
 const results=new Map<string,Result>();
 for(const item of items){
  const result=results.get(item.objectiveId)||{objectiveId:item.objectiveId,subject:item.subject,objectiveText:item.objectiveText,correct:0,total:0,needsPractice:false};
  result.total++;if(answerIsCorrect(answers[item.id]||'',item.answer,item.options))result.correct++;
  result.needsPractice=result.correct/result.total<.8;results.set(item.objectiveId,result);
 }
 return [...results.values()];
}
function publicSummary(results:Result[]){return results.map(result=>({objectiveId:result.objectiveId,subject:result.subject,objectiveText:result.objectiveText,
 message:result.needsPractice?'We will revisit this together.':'A good starting point to build on.'}))}
async function finish(tx:Transaction,context:WeeklyStudentContext,attempt:Record<string,unknown>){
 if(attempt.status!=='IN_PROGRESS')return;
 const items=attempt.item_snapshot as BaselineItem[],answers=attempt.answer_data as Record<string,string>;
 const results=baselineResults(items,answers);
 for(const item of items){
  if(answerIsCorrect(answers[item.id]||'',item.answer,item.options))continue;
  await tx`INSERT INTO weekly_student_item_schedule(student_id,item_id,due_date,interval_days,streak,last_result,last_served_at)
   VALUES(${context.studentId},${item.id},(clock_timestamp() AT TIME ZONE 'Africa/Lagos')::date+1,1,0,false,clock_timestamp())
   ON CONFLICT(student_id,item_id) DO NOTHING`;
 }
 await tx`UPDATE weekly_baseline_attempts SET status=${attempt.timed_out?'EXPIRED':'COMPLETED'},submitted_at=clock_timestamp(),result_data=${JSON.stringify(results)}::jsonb
  WHERE id=${String(attempt.id)} AND student_id=${context.studentId}`;
 await tx`UPDATE weekly_student_baseline_state SET status='COMPLETED',completed_at=clock_timestamp(),updated_at=clock_timestamp()
  WHERE student_id=${context.studentId}`;
}
async function state(tx:Transaction,context:WeeklyStudentContext){
 await tx`SELECT id FROM users WHERE id=${context.studentId} FOR UPDATE`;
 const [row]=await tx`INSERT INTO weekly_student_baseline_state(student_id,first_offered_at) VALUES(${context.studentId},clock_timestamp())
  ON CONFLICT(student_id) DO UPDATE SET first_offered_at=CASE
   WHEN weekly_student_baseline_state.status IN ('COMPLETED','IN_PROGRESS') THEN weekly_student_baseline_state.first_offered_at
   ELSE COALESCE(weekly_student_baseline_state.first_offered_at,EXCLUDED.first_offered_at) END RETURNING *`;
 return row;
}
async function attemptFor(tx:Transaction,context:WeeklyStudentContext,id:string){
 const [attempt]=await tx`SELECT *,started_at+duration_seconds*interval '1 second'<=clock_timestamp() AS timed_out,
  GREATEST(0,ceil(extract(epoch FROM started_at+duration_seconds*interval '1 second'-clock_timestamp())))::int seconds_remaining
  FROM weekly_baseline_attempts WHERE id=${id} AND student_id=${context.studentId} FOR UPDATE`;
 if(!attempt||attempt.class_level!==context.classLevel)throw new WeeklyWorkspaceError('Starting check unavailable.',404);
 if(!Array.isArray(attempt.item_snapshot)||attempt.item_snapshot.length!==BASELINE_QUESTION_TARGET)
  throw new WeeklyWorkspaceError('This earlier starting check needs admin review.',409);
 if(attempt.status==='IN_PROGRESS'&&(attempt.item_snapshot as BaselineItem[]).some(item=>item.term>context.term||(item.term===context.term&&item.week>context.week)))
  throw new WeeklyWorkspaceError('Starting check questions have not been released.',403);
 const objectiveIds=[...new Set((attempt.item_snapshot as BaselineItem[]).map(item=>item.objectiveId))];
 const available=await tx`SELECT o.id FROM weekly_curriculum_objectives o JOIN weekly_class_subjects cs
  ON cs.class_level=o.class_level AND cs.subject_name=o.subject_name AND cs.active=true AND cs.subject_kind='CORE'
  WHERE o.id=ANY(${objectiveIds}::uuid[]) AND o.class_level=${context.classLevel}
   AND o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL
   AND (o.term<${context.term} OR (o.term=${context.term} AND o.week_number<=${context.week}))`;
 if(available.length!==objectiveIds.length)throw new WeeklyWorkspaceError('Starting check objectives are unavailable.',403);
 return attempt;
}
function view(attempt:Record<string,unknown>){
 const submitted=attempt.status!=='IN_PROGRESS',answers=attempt.answer_data as Record<string,string>;
 return {id:String(attempt.id),submitted,expired:attempt.status==='EXPIRED',secondsRemaining:submitted?0:Number(attempt.seconds_remaining),
  questions:submitted?[]:(attempt.item_snapshot as BaselineItem[]).map(item=>({...publicPracticeItem(item),subject:item.subject,savedAnswer:answers[item.id]||null})),
  summary:submitted?publicSummary((attempt.result_data||[]) as Result[]):[]};
}
export async function weeklyBaselineOverview(context:WeeklyStudentContext){
 return sql.begin(async tx=>{
  const row=await state(tx,context);let attempt=null;
  if(row.attempt_id){
   const current=await attemptFor(tx,context,String(row.attempt_id));
   if(current.status==='IN_PROGRESS'&&current.timed_out){await finish(tx,context,current);current.status='EXPIRED';
    current.result_data=baselineResults(current.item_snapshot as BaselineItem[],current.answer_data as Record<string,string>);row.status='COMPLETED'}
   attempt=view(current);
  }
  const [config]=await tx`SELECT baseline_question_ids,baseline_term,baseline_reviewed_by,baseline_reviewed_at FROM weekly_class_flags WHERE class_level=${context.classLevel}`;
  let ready=Boolean(config?.baseline_reviewed_by&&config?.baseline_reviewed_at&&Number(config.baseline_term)===context.term&&config.baseline_question_ids?.length===20);
  if(ready){try{await selectedBaselinePaper(tx,context.classLevel,context.term,config.baseline_question_ids,context.week)}
   catch(error){if(error instanceof WeeklyWorkspaceError&&error.status===409)ready=false;else throw error}}
  return {baseline:{status:row.status,first_offered_at:row.first_offered_at,postponed_until:row.postponed_until},ready,attempt};
 });
}
export async function startWeeklyBaseline(context:WeeklyStudentContext){
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${context.studentId} FOR UPDATE`;
  const [existing]=await tx`SELECT * FROM weekly_student_baseline_state WHERE student_id=${context.studentId} FOR UPDATE`;
  if(existing?.attempt_id){
   const attempt=await attemptFor(tx,context,String(existing.attempt_id));
   if(attempt.status==='IN_PROGRESS'&&attempt.timed_out){await finish(tx,context,attempt);attempt.status='EXPIRED';
    attempt.result_data=baselineResults(attempt.item_snapshot as BaselineItem[],attempt.answer_data as Record<string,string>)}
   return {attempt:view(attempt)};
  }
  if(existing?.status==='COMPLETED')return {status:'unchanged'};
  if(existing?.status==='IN_PROGRESS')throw new WeeklyWorkspaceError('This earlier starting check needs admin review.',409);
  const [config]=await tx`SELECT baseline_question_ids,baseline_term,baseline_reviewed_by,baseline_reviewed_at FROM weekly_class_flags WHERE class_level=${context.classLevel} FOR SHARE`;
  if(!config?.baseline_reviewed_by||!config?.baseline_reviewed_at||Number(config.baseline_term)!==context.term)
   throw new WeeklyWorkspaceError('The reviewed starting check is not ready yet.',409);
  const items=await selectedBaselinePaper(tx,context.classLevel,context.term,config.baseline_question_ids,context.week);
  await state(tx,context);
  const [created]=await tx`INSERT INTO weekly_baseline_attempts(student_id,class_level,question_ids,item_snapshot,started_at)
   VALUES(${context.studentId},${context.classLevel},${JSON.stringify(items.map(item=>item.id))}::jsonb,${JSON.stringify(items)}::jsonb,clock_timestamp()) RETURNING id`;
  await tx`UPDATE weekly_student_baseline_state SET status='IN_PROGRESS',attempt_id=${created.id},started_at=clock_timestamp(),postponed_until=NULL,updated_at=clock_timestamp()
   WHERE student_id=${context.studentId}`;
  return {attempt:view(await attemptFor(tx,context,String(created.id)))};
 });
}
export async function updateWeeklyBaseline(context:WeeklyStudentContext,id:string,itemId?:string,answer?:string){
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${context.studentId} FOR UPDATE`;
  const attempt=await attemptFor(tx,context,id);
  if(attempt.status!=='IN_PROGRESS')return {attempt:view(attempt),alreadySubmitted:true};
  if(attempt.timed_out){await finish(tx,context,attempt);attempt.status='EXPIRED';
   attempt.result_data=baselineResults(attempt.item_snapshot as BaselineItem[],attempt.answer_data as Record<string,string>);return {attempt:view(attempt)}}
  if(itemId!==undefined){
   const item=(attempt.item_snapshot as BaselineItem[]).find(item=>item.id===itemId);
   if(!item||!answer||!item.options.includes(answer))throw new WeeklyWorkspaceError('Choose an option from this question.',400);
   const answers={...(attempt.answer_data as Record<string,string>),[itemId]:answer};
   await tx`UPDATE weekly_baseline_attempts SET answer_data=${JSON.stringify(answers)}::jsonb WHERE id=${id} AND student_id=${context.studentId}`;
   attempt.answer_data=answers;return {attempt:view(attempt)};
  }
  await finish(tx,context,attempt);attempt.status='COMPLETED';attempt.result_data=baselineResults(attempt.item_snapshot as BaselineItem[],attempt.answer_data as Record<string,string>);
  return {attempt:view(attempt)};
 });
}
export async function postponeWeeklyBaseline(context:WeeklyStudentContext){
 return sql.begin(async tx=>{
  const row=await state(tx,context);
  if(['COMPLETED','IN_PROGRESS'].includes(String(row.status)))return {status:'unchanged'};
  if(!baselineMayPostpone(new Date(row.first_offered_at)))throw new WeeklyWorkspaceError('The three-day postponement period has ended',409);
  await tx`UPDATE weekly_student_baseline_state SET status='POSTPONED',postponed_until=${baselinePostponementDeadline(new Date(row.first_offered_at))},updated_at=clock_timestamp()
   WHERE student_id=${context.studentId}`;
  return {status:'postponed'};
 });
}
