import type postgres from 'postgres';
import {sql,withDbRetry} from './db';
import {weeklyObjective,WeeklyWorkspaceError,type WeeklyStudentContext} from './weeklyWorkspace';
import {reviewedPracticeItem,type PracticeItem} from './weeklyWorkspacePolicy';
import {WEEKLY_REVISIT_DAILY_CAP,weeklyRevisitBudget} from './weeklyRevisit';

type Transaction=postgres.TransactionSql;
export async function recordWeeklyMistakeAnswer(tx:Transaction,context:WeeklyStudentContext,
 event:{sessionId:string;itemId:string;objectiveId:string;correct:boolean;confidence:string|null}){
 if(!event.correct)await tx`INSERT INTO weekly_mistakes(student_id,item_id,objective_id,wrong_session_id)
  VALUES(${context.studentId},${event.itemId},${event.objectiveId},${event.sessionId})
  ON CONFLICT(student_id,item_id) DO UPDATE SET wrong_session_id=EXCLUDED.wrong_session_id,objective_id=EXCLUDED.objective_id,
   first_correct_at=NULL,first_correct_session_id=NULL,confirm_due_on=NULL,fixed_at=NULL,updated_at=clock_timestamp()`;
 const linked=await tx`SELECT id,first_correct_at,first_correct_session_id,
  confirm_due_on<=(clock_timestamp() AT TIME ZONE 'Africa/Lagos')::date AS due
  FROM weekly_mistakes WHERE student_id=${context.studentId} AND followup_item_id=${event.itemId} AND fixed_at IS NULL ORDER BY id FOR UPDATE`;
 for(const mistake of linked){
  if(!event.correct||event.confidence==='GUESS'){
   await tx`UPDATE weekly_mistakes SET first_correct_at=NULL,first_correct_session_id=NULL,confirm_due_on=NULL,updated_at=clock_timestamp() WHERE id=${mistake.id}`;
  }else if(!mistake.first_correct_at){
   await tx`UPDATE weekly_mistakes SET first_correct_at=clock_timestamp(),first_correct_session_id=${event.sessionId},
    confirm_due_on=(clock_timestamp() AT TIME ZONE 'Africa/Lagos')::date+2,updated_at=clock_timestamp() WHERE id=${mistake.id}`;
  }else if(mistake.due&&String(mistake.first_correct_session_id)!==event.sessionId){
   await tx`UPDATE weekly_mistakes SET fixed_at=clock_timestamp(),updated_at=clock_timestamp() WHERE id=${mistake.id}`;
  }
 }
}
export async function weeklyMistakes(context:WeeklyStudentContext,tab:'TO_FIX'|'FIXED'='TO_FIX',offset=0){
 // Import genuine prior practice mistakes once; never infer spaced fixes or reopen recorded ones.
 await sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${context.studentId} FOR UPDATE`;
  await tx`INSERT INTO weekly_mistakes(student_id,item_id,objective_id,wrong_session_id,updated_at)
   SELECT DISTINCT ON(a.item_id) s.student_id,a.item_id,o.id,s.id,COALESCE(s.submitted_at,s.started_at)
   FROM weekly_cbt_sessions s JOIN weekly_cbt_answers a ON a.session_id=s.id AND a.is_correct=false
   CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(s.item_snapshot)='array' THEN s.item_snapshot ELSE '[]'::jsonb END) snapshot
   JOIN weekly_curriculum_objectives o ON o.id::text=COALESCE(NULLIF(snapshot->>'objectiveId',''),s.objective_id::text)
   WHERE s.student_id=${context.studentId} AND s.mode='PRACTICE' AND s.source IN ('DAILY_LESSON','REVISIT')
    AND snapshot->>'id'=a.item_id::text AND NOT EXISTS(SELECT 1 FROM weekly_mistakes m WHERE m.student_id=s.student_id AND m.item_id=a.item_id)
   ORDER BY a.item_id,COALESCE(s.submitted_at,s.started_at) DESC,s.id DESC
   ON CONFLICT(student_id,item_id) DO NOTHING`;
 });
 const [result]=await withDbRetry(()=>sql`WITH visible AS (
  SELECT m.id,m.fixed_at,m.updated_at,m.confirm_due_on,o.subject_name,o.topic_title,
   snapshot->>'prompt' prompt,a.answer,snapshot->>'answer' correct_answer,snapshot->>'explanation' explanation,a.confidence
  FROM weekly_mistakes m JOIN weekly_cbt_sessions s ON s.id=m.wrong_session_id AND s.student_id=m.student_id
  JOIN weekly_cbt_answers a ON a.session_id=s.id AND a.item_id=m.item_id AND a.is_correct=false
  CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(s.item_snapshot)='array' THEN s.item_snapshot ELSE '[]'::jsonb END) snapshot
  JOIN weekly_curriculum_objectives o ON o.id=m.objective_id
  JOIN weekly_class_subjects cs ON cs.class_level=o.class_level AND cs.subject_name=o.subject_name AND cs.active=true
  WHERE m.student_id=${context.studentId} AND snapshot->>'id'=m.item_id::text AND s.mode='PRACTICE' AND s.source IN ('DAILY_LESSON','REVISIT')
   AND o.class_level=${context.classLevel} AND o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL
   AND (o.term<${context.term} OR (o.term=${context.term} AND o.week_number<=${context.week}))
   AND (cs.subject_kind='CORE' OR EXISTS(SELECT 1 FROM weekly_student_optional_subjects os
    WHERE os.student_id=${context.studentId} AND os.class_level=o.class_level AND os.subject_name=o.subject_name))
 ), totals AS (SELECT count(*) FILTER(WHERE fixed_at IS NULL)::int to_fix,count(*) FILTER(WHERE fixed_at IS NOT NULL)::int fixed FROM visible),
 page AS (SELECT * FROM visible WHERE (fixed_at IS NULL)=${tab==='TO_FIX'}
  ORDER BY CASE WHEN confidence='SURE' THEN 0 ELSE 1 END,updated_at DESC,id LIMIT 50 OFFSET ${offset})
 SELECT totals.*,(SELECT COALESCE(jsonb_agg(page),'[]'::jsonb) FROM page) rows FROM totals`);
 return {rows:result?.rows||[],toFix:Number(result?.to_fix||0),fixed:Number(result?.fixed||0)};
}
export async function startWeeklyFix(context:WeeklyStudentContext,mistakeId:string){
 const [owned]=await withDbRetry(()=>sql`SELECT objective_id FROM weekly_mistakes WHERE id=${mistakeId} AND student_id=${context.studentId}`);
 if(!owned)throw new WeeklyWorkspaceError('Mistake unavailable.',404);
 const objective=await weeklyObjective(context,String(owned.objective_id));
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${context.studentId} FOR UPDATE`;
  const [mistake]=await tx`SELECT * FROM weekly_mistakes WHERE id=${mistakeId} AND student_id=${context.studentId} FOR UPDATE`;
  if(!mistake||mistake.fixed_at)throw new WeeklyWorkspaceError('Mistake already fixed or unavailable.',409);
  const [open]=await tx`SELECT id,item_snapshot,question_ids FROM weekly_cbt_sessions WHERE student_id=${context.studentId}
   AND source='REVISIT' AND mode='PRACTICE' AND submitted_at IS NULL AND item_snapshot IS NOT NULL ORDER BY started_at,id LIMIT 1 FOR UPDATE`;
  const openItems=(open?.item_snapshot||[]) as Array<PracticeItem&{mistakeId?:string}>;
  if(openItems.some(item=>item.mistakeId===mistakeId))return String(open.id);
  if(await weeklyRevisitBudget(tx,context.studentId)>=WEEKLY_REVISIT_DAILY_CAP)
   throw new WeeklyWorkspaceError('Your daily Revisit set is full. Come back tomorrow.',409);
  const rows=await tx`SELECT i.* FROM weekly_items i
   JOIN weekly_topic_question_memberships m ON m.item_id=i.id AND m.pool='LIVE'
   JOIN weekly_topic_question_sets t ON t.id=m.topic_set_id
   WHERE i.objective_id=${String(mistake.objective_id)} AND i.id<>${String(mistake.item_id)} AND i.status='PUBLISHED'
    AND i.reviewer_id IS NOT NULL AND i.reviewed_at IS NOT NULL
    AND (${mistake.followup_item_id===null} OR i.id=${mistake.followup_item_id})
    AND t.class_level=${context.classLevel} AND t.subject_name=${String(objective.subject_name)} AND t.term=${Number(objective.term)}
    AND t.week_number=${Number(objective.week_number)} AND t.topic_title=${String(objective.topic_title)}
    AND NOT EXISTS(SELECT 1 FROM weekly_question_reports r WHERE r.item_id=i.id AND r.status='PENDING'
     GROUP BY r.item_id HAVING count(DISTINCT r.student_id)>=3)
   ORDER BY i.id LIMIT 50`;
  const item=rows.map(row=>reviewedPracticeItem(row)).find(Boolean);
  if(!item)throw new WeeklyWorkspaceError('A reviewed similar question is not ready.',409);
  if(openItems.some(existing=>existing.id===item.id))throw new WeeklyWorkspaceError('Finish your current Revisit before another follow-up.',409);
  const snapshot=[...openItems,{...item,objectiveId:String(mistake.objective_id),mistakeId,scheduledIntervalDays:2,retentionCheck:false}];
  let id:string;
  if(open){
   await tx`UPDATE weekly_cbt_sessions SET question_ids=${snapshot.map(item=>item.id)},item_snapshot=${JSON.stringify(snapshot)}::jsonb
    WHERE id=${open.id} AND student_id=${context.studentId}`;id=String(open.id);
  }else{
   const [created]=await tx`INSERT INTO weekly_cbt_sessions(student_id,source,mode,question_ids,item_snapshot)
    VALUES(${context.studentId},'REVISIT','PRACTICE',${[item.id]},${JSON.stringify(snapshot)}::jsonb) RETURNING id`;id=String(created.id);
  }
  await tx`UPDATE weekly_mistakes SET followup_item_id=${item.id},updated_at=clock_timestamp() WHERE id=${mistakeId} AND student_id=${context.studentId}`;
  return id;
 });
}
