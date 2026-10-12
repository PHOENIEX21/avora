import {sql,withDbRetry} from './db';
import {weeklyObjective,WeeklyWorkspaceError,type WeeklyStudentContext} from './weeklyWorkspace';
import {reviewedPracticeItem,publicPracticeItem,type PracticeItem} from './weeklyWorkspacePolicy';
import {nextRevisitInterval} from './weeklyLearning';

export async function startWeeklyPractice(context:WeeklyStudentContext,objectiveId:string){
 const objective=await weeklyObjective(context,objectiveId);
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${context.studentId} FOR UPDATE`;
  const [open]=await tx`SELECT id FROM weekly_cbt_sessions WHERE student_id=${context.studentId}
   AND objective_id=${objectiveId} AND submitted_at IS NULL`;
  if(open)return String(open.id);
  const rows=await tx`SELECT i.* FROM weekly_items i
   JOIN weekly_topic_question_memberships m ON m.item_id=i.id AND m.pool='LIVE'
   JOIN weekly_topic_question_sets t ON t.id=m.topic_set_id
   WHERE i.objective_id=${objectiveId} AND i.status='PUBLISHED'
    AND i.reviewer_id IS NOT NULL AND i.reviewed_at IS NOT NULL
    AND t.class_level=${context.classLevel} AND t.subject_name=${String(objective.subject_name)}
    AND t.term=${Number(objective.term)} AND t.week_number=${Number(objective.week_number)} AND t.topic_title=${String(objective.topic_title)}
    AND NOT EXISTS(SELECT 1 FROM weekly_question_reports r WHERE r.item_id=i.id
     AND r.status='PENDING' GROUP BY r.item_id HAVING count(DISTINCT r.student_id)>=3)
   ORDER BY random() LIMIT 50`;
  const items=rows.map(row=>reviewedPracticeItem(row)).filter((x):x is PracticeItem=>x!==null).slice(0,5);
  if(items.length<5)throw new WeeklyWorkspaceError('Five reviewed live practice questions are not ready.',409);
  const [created]=await tx`INSERT INTO weekly_cbt_sessions(student_id,objective_id,source,mode,question_ids,item_snapshot)
   VALUES(${context.studentId},${objectiveId},'DAILY_LESSON','PRACTICE',${items.map(x=>x.id)},${JSON.stringify(items)}::jsonb) RETURNING id`;
  return String(created.id);
 });
}
export async function weeklyPracticeSession(context:WeeklyStudentContext,sessionId:string){
 const [session]=await withDbRetry(()=>sql`SELECT id,objective_id,item_snapshot,submitted_at FROM weekly_cbt_sessions
  WHERE id=${sessionId} AND student_id=${context.studentId}`);
 if(!session)throw new WeeklyWorkspaceError('Practice unavailable.',404);
 await weeklyObjective(context,String(session.objective_id));
 const answers=await withDbRetry(()=>sql`SELECT item_id,answer,confidence,is_correct FROM weekly_cbt_answers WHERE session_id=${sessionId}`);
 const items=session.item_snapshot as PracticeItem[];
 return {id:String(session.id),objectiveId:String(session.objective_id),submitted:Boolean(session.submitted_at),
  questions:items.map(item=>{
   const answer=answers.find(row=>String(row.item_id)===item.id);
   return {...publicPracticeItem(item),saved:answer?{answer:String(answer.answer),confidence:answer.confidence,
    correct:answer.is_correct,correctAnswer:item.answer,explanation:item.explanation}:null};
  })};
}
export async function finishWeeklyPractice(context:WeeklyStudentContext,sessionId:string){
 const visible=await weeklyPracticeSession(context,sessionId);
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${context.studentId} FOR UPDATE`;
  const [session]=await tx`SELECT submitted_at,correct_count,total_count FROM weekly_cbt_sessions WHERE id=${sessionId} AND student_id=${context.studentId} FOR UPDATE`;
  if(!session)throw new WeeklyWorkspaceError('Practice unavailable.',404);
  const answers=await tx`SELECT item_id,is_correct,confidence FROM weekly_cbt_answers WHERE session_id=${sessionId}`;
  if(answers.length!==visible.questions.length)throw new WeeklyWorkspaceError('Answer every question before finishing.',409);
  if(!session.submitted_at){
   for(const answer of answers){
    const [old]=await tx`SELECT streak FROM weekly_student_item_schedule WHERE student_id=${context.studentId} AND item_id=${answer.item_id}`;
    const retained=answer.is_correct&&answer.confidence!=='GUESS',streak=retained?Number(old?.streak||0)+1:0;
    const interval=nextRevisitInterval(Number(old?.streak||0),Boolean(retained));
    await tx`INSERT INTO weekly_student_item_schedule(student_id,item_id,due_date,interval_days,streak,last_result,last_served_at)
     VALUES(${context.studentId},${answer.item_id},(now() AT TIME ZONE 'Africa/Lagos')::date+${interval}::integer,${interval},${streak},${answer.is_correct},now())
     ON CONFLICT(student_id,item_id) DO UPDATE SET due_date=EXCLUDED.due_date,interval_days=EXCLUDED.interval_days,
      streak=EXCLUDED.streak,last_result=EXCLUDED.last_result,last_served_at=EXCLUDED.last_served_at`;
   }
   await tx`UPDATE weekly_cbt_sessions SET submitted_at=now(),correct_count=${answers.filter(a=>a.is_correct).length},total_count=${answers.length}
    WHERE id=${sessionId} AND student_id=${context.studentId}`;
  }
  return {submitted:true,correct:session.submitted_at?Number(session.correct_count):answers.filter(a=>a.is_correct).length,
   total:session.submitted_at?Number(session.total_count):answers.length,alreadySubmitted:Boolean(session.submitted_at)};
 });
}
