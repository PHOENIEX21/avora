import {sql,withDbRetry} from './db';
import type {WeeklyStudentContext} from './weeklyWorkspace';
import {reviewedPracticeItem} from './weeklyWorkspacePolicy';

export async function weeklyCatchup(context:WeeklyStudentContext){
 const rows=await withDbRetry(()=>sql`SELECT o.id,o.subject_name,o.topic_title,o.objective_text,o.term,o.week_number,
  CASE WHEN baseline.weak THEN 'BASELINE' WHEN evidence.weak THEN 'PRACTICE' ELSE 'NOT_STUDIED' END reason
  FROM weekly_curriculum_objectives o
  JOIN weekly_class_subjects cs ON cs.class_level=o.class_level AND cs.subject_name=o.subject_name AND cs.active=true
  LEFT JOIN weekly_objective_study study ON study.student_id=${context.studentId} AND study.objective_id=o.id
  LEFT JOIN LATERAL (
   SELECT true weak FROM weekly_baseline_attempts b CROSS JOIN LATERAL jsonb_array_elements(
    CASE WHEN jsonb_typeof(b.result_data)='array' THEN b.result_data ELSE '[]'::jsonb END) result
   WHERE b.student_id=${context.studentId} AND b.class_level=${context.classLevel} AND b.status IN ('COMPLETED','EXPIRED')
    AND result->>'objectiveId'=o.id::text AND result->>'needsPractice'='true' LIMIT 1
  ) baseline ON true
  LEFT JOIN LATERAL (
   SELECT count(*) total,count(*) FILTER(WHERE latest.is_correct AND latest.confidence IS DISTINCT FROM 'GUESS') retained,
    count(*) FILTER(WHERE NOT latest.is_correct OR latest.confidence='GUESS')>0 weak
   FROM (SELECT DISTINCT ON(a.item_id) a.is_correct,a.confidence FROM weekly_cbt_answers a
    JOIN weekly_cbt_sessions s ON s.id=a.session_id WHERE s.student_id=${context.studentId} AND s.mode='PRACTICE' AND s.submitted_at IS NOT NULL
     AND (s.objective_id=o.id OR (s.source='REVISIT' AND s.item_snapshot @> jsonb_build_array(jsonb_build_object('id',a.item_id::text,'objectiveId',o.id::text))))
    ORDER BY a.item_id,s.submitted_at DESC,s.id DESC) latest
  ) evidence ON true
  WHERE o.class_level=${context.classLevel} AND o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL
   AND (o.term<${context.term} OR (o.term=${context.term} AND o.week_number<=${context.week}))
   AND (cs.subject_kind='CORE' OR EXISTS(SELECT 1 FROM weekly_student_optional_subjects os
    WHERE os.student_id=${context.studentId} AND os.class_level=o.class_level AND os.subject_name=o.subject_name))
   AND (evidence.total<7 OR evidence.retained<evidence.total)
   AND (baseline.weak OR evidence.weak OR (study.studied_at IS NULL AND (o.term<${context.term} OR o.week_number<${context.week})))
  ORDER BY CASE WHEN baseline.weak THEN 0 WHEN evidence.weak THEN 1 ELSE 2 END,o.term,o.week_number,o.subject_name,o.id LIMIT 200`);
 return rows.map(row=>({id:String(row.id),subject:String(row.subject_name),topic:String(row.topic_title),text:String(row.objective_text),
  term:Number(row.term),week:Number(row.week_number),reason:String(row.reason)}));
}

export async function seedWeeklyCatchup(context:WeeklyStudentContext){
 const objectives=await weeklyCatchup(context);
 if(!objectives.length)return 0;
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${context.studentId} FOR UPDATE`;
  const rows=await tx`WITH candidates AS (
   SELECT i.*,row_number() OVER(PARTITION BY i.objective_id ORDER BY i.id) candidate_rank
    FROM weekly_items i JOIN weekly_curriculum_objectives o ON o.id=i.objective_id
    JOIN weekly_class_subjects cs ON cs.class_level=o.class_level AND cs.subject_name=o.subject_name AND cs.active=true
    WHERE i.objective_id=ANY(${objectives.map(objective=>objective.id)}::uuid[]) AND o.class_level=${context.classLevel}
     AND o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL
     AND (o.term<${context.term} OR (o.term=${context.term} AND o.week_number<=${context.week}))
     AND (cs.subject_kind='CORE' OR EXISTS(SELECT 1 FROM weekly_student_optional_subjects os
      WHERE os.student_id=${context.studentId} AND os.class_level=o.class_level AND os.subject_name=o.subject_name))
     AND i.status='PUBLISHED' AND i.reviewer_id IS NOT NULL AND i.reviewed_at IS NOT NULL
     AND EXISTS(SELECT 1 FROM weekly_topic_question_memberships m JOIN weekly_topic_question_sets t ON t.id=m.topic_set_id
      WHERE m.item_id=i.id AND m.pool='LIVE' AND t.class_level=o.class_level AND t.subject_name=o.subject_name
       AND t.term=o.term AND t.week_number=o.week_number AND t.topic_title=o.topic_title)
     AND NOT EXISTS(SELECT 1 FROM weekly_question_reports r WHERE r.item_id=i.id AND r.status='PENDING'
      GROUP BY r.item_id HAVING count(DISTINCT r.student_id)>=3)
   ) SELECT * FROM candidates WHERE candidate_rank<=20 ORDER BY objective_id,id`;
  const candidates=rows.flatMap(row=>{const item=reviewedPracticeItem(row);return item?[{id:item.id,objectiveId:String(row.objective_id)}]:[]});
  if(!candidates.length)return 0;
  const scheduled=await tx`SELECT item_id FROM weekly_student_item_schedule WHERE student_id=${context.studentId}
   AND item_id=ANY(${candidates.map(item=>item.id)}::uuid[])`;
  const scheduledIds=new Set(scheduled.map(row=>String(row.item_id))),ids:string[]=[];
  for(const objective of objectives){
   const eligible=candidates.filter(item=>item.objectiveId===objective.id);
   if(!eligible.length||eligible.some(item=>scheduledIds.has(item.id)))continue;ids.push(eligible[0].id);
  }
  if(!ids.length)return 0;
  const inserted=await tx`INSERT INTO weekly_student_item_schedule(student_id,item_id,due_date,interval_days,streak)
   SELECT ${context.studentId},item_id,(clock_timestamp() AT TIME ZONE 'Africa/Lagos')::date,2,0 FROM unnest(${ids}::uuid[]) item_id
   ON CONFLICT(student_id,item_id) DO NOTHING RETURNING item_id`;
  return inserted.length;
 });
}
