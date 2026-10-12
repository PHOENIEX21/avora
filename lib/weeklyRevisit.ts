import {sql,withDbRetry} from './db';
import type {WeeklyStudentContext} from './weeklyWorkspace';
import {reviewedPracticeItem,type PracticeItem} from './weeklyWorkspacePolicy';
import {seedWeeklyCatchup} from './weeklyCatchup';
import type postgres from 'postgres';

export const WEEKLY_REVISIT_DAILY_CAP=8;
export type RevisitItem=PracticeItem&{objectiveId:string;scheduledIntervalDays:number;retentionCheck:boolean};
export async function weeklyRevisitBudget(tx:postgres.TransactionSql,studentId:string){
 const [row]=await tx`SELECT COALESCE(sum(cardinality(question_ids)),0)::int used FROM weekly_cbt_sessions
  WHERE student_id=${studentId} AND source='REVISIT' AND mode='PRACTICE' AND item_snapshot IS NOT NULL
   AND (submitted_at IS NULL OR (started_at AT TIME ZONE 'Africa/Lagos')::date=(clock_timestamp() AT TIME ZONE 'Africa/Lagos')::date
    OR (submitted_at AT TIME ZONE 'Africa/Lagos')::date=(clock_timestamp() AT TIME ZONE 'Africa/Lagos')::date)`;
 return Number(row?.used||0);
}

export async function startWeeklyRevisit(context:WeeklyStudentContext):Promise<string|null>{
 await seedWeeklyCatchup(context);
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${context.studentId} FOR UPDATE`;
  const [existing]=await tx`SELECT id FROM weekly_cbt_sessions WHERE student_id=${context.studentId}
   AND source='REVISIT' AND mode='PRACTICE' AND item_snapshot IS NOT NULL
   AND submitted_at IS NULL
   ORDER BY submitted_at NULLS FIRST,started_at DESC LIMIT 1`;
  if(existing)return String(existing.id);
  const remaining=Math.max(0,WEEKLY_REVISIT_DAILY_CAP-await weeklyRevisitBudget(tx,context.studentId));
  if(!remaining){
   const [completed]=await tx`SELECT id FROM weekly_cbt_sessions WHERE student_id=${context.studentId} AND source='REVISIT' AND mode='PRACTICE'
    AND item_snapshot IS NOT NULL AND (submitted_at AT TIME ZONE 'Africa/Lagos')::date=(clock_timestamp() AT TIME ZONE 'Africa/Lagos')::date
    ORDER BY submitted_at DESC,id LIMIT 1`;
   return completed?String(completed.id):null;
  }
  const rows=await tx`SELECT i.*,schedule.interval_days AS scheduled_interval_days,
   schedule.interval_days=21 AND (schedule.last_served_at AT TIME ZONE 'Africa/Lagos')::date+21
    <=(now() AT TIME ZONE 'Africa/Lagos')::date AS retention_check
   FROM weekly_student_item_schedule schedule
   JOIN weekly_items i ON i.id=schedule.item_id
   JOIN weekly_curriculum_objectives o ON o.id=i.objective_id
   JOIN weekly_class_subjects cs ON cs.class_level=o.class_level AND cs.subject_name=o.subject_name AND cs.active=true
   LEFT JOIN LATERAL (
    SELECT a.is_correct,a.confidence FROM weekly_cbt_answers a JOIN weekly_cbt_sessions s ON s.id=a.session_id
    WHERE s.student_id=${context.studentId} AND a.item_id=i.id AND s.submitted_at IS NOT NULL
     AND s.source IN ('DAILY_LESSON','REVISIT') AND s.mode='PRACTICE'
    ORDER BY s.submitted_at DESC,s.id DESC LIMIT 1
   ) last_answer ON true
   WHERE schedule.student_id=${context.studentId} AND schedule.due_date<=(now() AT TIME ZONE 'Africa/Lagos')::date
    AND o.class_level=${context.classLevel} AND o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL
    AND (o.term<${context.term} OR (o.term=${context.term} AND o.week_number<=${context.week}))
    AND (cs.subject_kind='CORE' OR EXISTS(SELECT 1 FROM weekly_student_optional_subjects os
     WHERE os.student_id=${context.studentId} AND os.class_level=o.class_level AND os.subject_name=o.subject_name))
    AND i.status='PUBLISHED' AND i.reviewer_id IS NOT NULL AND i.reviewed_at IS NOT NULL
    AND EXISTS(SELECT 1 FROM weekly_topic_question_memberships m JOIN weekly_topic_question_sets t ON t.id=m.topic_set_id
     WHERE m.item_id=i.id AND m.pool='LIVE' AND t.class_level=o.class_level AND t.subject_name=o.subject_name
      AND t.term=o.term AND t.week_number=o.week_number AND t.topic_title=o.topic_title)
    AND NOT EXISTS(SELECT 1 FROM weekly_question_reports r WHERE r.item_id=i.id AND r.status='PENDING'
     GROUP BY r.item_id HAVING count(DISTINCT r.student_id)>=3)
   ORDER BY CASE WHEN last_answer.is_correct=false AND last_answer.confidence='SURE' THEN 0 ELSE 1 END,
    schedule.due_date,i.id LIMIT 100`;
  const items:RevisitItem[]=[];
  for(const row of rows){
   const item=reviewedPracticeItem(row);
   if(item)items.push({...item,objectiveId:String(row.objective_id),scheduledIntervalDays:Number(row.scheduled_interval_days),
    retentionCheck:row.retention_check===true});
   if(items.length===remaining)break;
  }
  if(!items.length)return null;
  const [created]=await tx`INSERT INTO weekly_cbt_sessions(student_id,source,mode,question_ids,item_snapshot)
   VALUES(${context.studentId},'REVISIT','PRACTICE',${items.map(x=>x.id)},${JSON.stringify(items)}::jsonb) RETURNING id`;
  return String(created.id);
 });
}

export async function weeklyRetentionSummary(context:WeeklyStudentContext){
 const [summary]=await withDbRetry(()=>sql`SELECT count(*)::int questions,
  count(*) FILTER(WHERE a.is_correct)::int correct,
  count(*) FILTER(WHERE a.is_correct AND a.confidence IS DISTINCT FROM 'GUESS')::int retained
  FROM weekly_cbt_sessions s CROSS JOIN LATERAL jsonb_array_elements(
   CASE WHEN jsonb_typeof(s.item_snapshot)='array' THEN s.item_snapshot ELSE '[]'::jsonb END) item
  JOIN weekly_cbt_answers a ON a.session_id=s.id AND a.item_id::text=item->>'id'
  WHERE s.student_id=${context.studentId} AND s.source='REVISIT' AND s.mode='PRACTICE'
   AND s.submitted_at IS NOT NULL AND item->>'retentionCheck'='true'`);
 return {questions:Number(summary?.questions||0),correct:Number(summary?.correct||0),retained:Number(summary?.retained||0)};
}
