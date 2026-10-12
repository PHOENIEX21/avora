import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {weeklyReleaseReadiness} from '@/lib/weeklyReleaseReadiness';

const query=z.object({
 classLevel:z.enum(['JSS1','JSS2','JSS3']),
 term:z.coerce.number().int().min(1).max(3),
 week:z.coerce.number().int().min(1).max(16)
});
export async function GET(request:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const params=query.safeParse(Object.fromEntries(new URL(request.url).searchParams));
 if(!params.success)return NextResponse.json({error:'Select class, term and week'},{status:400});
 const {classLevel,term,week}=params.data;
 try{
  const [row]=await withDbRetry(()=>sql`
   WITH subjects AS (
    SELECT subject_name FROM weekly_class_subjects WHERE class_level=${classLevel} AND active=true
   ),
   all_objectives AS (
     SELECT id,subject_name,approval_status,published_at FROM weekly_curriculum_objectives
     WHERE class_level=${classLevel} AND term=${term} AND week_number=${week}
    ), objectives AS (
    SELECT id,subject_name FROM weekly_curriculum_objectives
    WHERE class_level=${classLevel} AND term=${term} AND week_number=${week}
      AND approval_status='PUBLISHED' AND published_at IS NOT NULL
   ),
   item_counts AS (
    SELECT o.id,count(i.id)::int AS approved_count
    FROM objectives o LEFT JOIN weekly_items i ON i.objective_id=o.id
     AND i.status IN ('APPROVED','PUBLISHED') AND i.answer_key IS NOT NULL
     AND i.reviewer_id IS NOT NULL AND i.reviewed_at IS NOT NULL
    GROUP BY o.id
   )
   SELECT
    (SELECT count(*)::int FROM subjects) AS subject_count,
    (SELECT count(*)::int FROM objectives) AS published_objective_count,
    (SELECT count(*)::int FROM all_objectives WHERE approval_status<>'PUBLISHED' OR published_at IS NULL) AS unpublished_objectives,
    (SELECT count(*)::int FROM subjects s WHERE NOT EXISTS (SELECT 1 FROM objectives o WHERE o.subject_name=s.subject_name AND o.day_index BETWEEN 1 AND 5)) AS subjects_without_weekday_objectives,
    (SELECT count(*)::int FROM subjects s WHERE EXISTS(
      SELECT 1 FROM objectives o WHERE o.subject_name=s.subject_name)) AS published_subject_count,
    (SELECT count(*)::int FROM item_counts WHERE approved_count<6) AS objectives_without_six_items,
    (SELECT count(*)::int FROM objectives o WHERE NOT EXISTS(
      SELECT 1 FROM weekly_class_subjects cs WHERE cs.class_level=${classLevel}
       AND cs.subject_name=o.subject_name AND cs.active=true)) AS objectives_outside_active_subjects,
    (SELECT count(DISTINCT e.subject_name)::int FROM weekly_exams e WHERE e.class_level=${classLevel}
      AND e.term=${term} AND e.week_number=${week}
      AND e.subject_name IN (SELECT subject_name FROM subjects)
      AND e.status IN ('REVIEWED','SCHEDULED') AND EXISTS(
       SELECT 1 FROM weekly_exam_items ei WHERE ei.exam_id=e.id)) AS reviewed_exam_count,
    (SELECT count(DISTINCT qs.subject_name)::int FROM weekly_topic_question_sets qs
     WHERE qs.class_level=${classLevel} AND qs.term=${term} AND qs.week_number=${week}
      AND qs.subject_name IN (SELECT subject_name FROM subjects)
      AND EXISTS (SELECT 1 FROM weekly_curriculum_objectives o WHERE o.class_level=qs.class_level AND o.subject_name=qs.subject_name AND o.term=qs.term AND o.week_number=qs.week_number AND o.topic_title=qs.topic_title AND o.approval_status='PUBLISHED')
      AND (SELECT count(*) FROM weekly_topic_question_memberships m
        JOIN weekly_items i ON i.id=m.item_id
        WHERE m.topic_set_id=qs.id AND m.pool='LIVE'
         AND i.status IN ('APPROVED','PUBLISHED') AND i.reviewer_id IS NOT NULL
         AND i.reviewed_at IS NOT NULL AND i.answer_key IS NOT NULL) BETWEEN 40 AND 50) AS ready_topic_sets,
    (SELECT count(DISTINCT day_index)::int FROM weekly_english_daily_plan
     WHERE class_level=${classLevel} AND term=${term} AND week_number=${week}
      AND status='PUBLISHED') AS published_english_days
  `);
  const evidence={
   subjectCount:Number(row?.subject_count??0),
   publishedObjectiveCount:Number(row?.published_objective_count??0),
   unpublishedObjectiveCount:Number(row?.unpublished_objectives??0),
   subjectsWithoutWeekdayObjectives:Number(row?.subjects_without_weekday_objectives??0),
   objectivesOutsideActiveSubjects:Number(row?.objectives_outside_active_subjects??0),
   publishedSubjectCount:Number(row?.published_subject_count??0),
   objectivesWithoutSixItems:Number(row?.objectives_without_six_items??0),
   reviewedExamCount:Number(row?.reviewed_exam_count??0),
   readyTopicSets:Number(row?.ready_topic_sets??0),
   publishedEnglishDays:Number(row?.published_english_days??0)
  };
  return NextResponse.json({classLevel,term,week,...weeklyReleaseReadiness(evidence),evidence});
 }catch{
  return NextResponse.json({error:'Could not verify weekly release readiness; class remains held'},{status:503});
 }
}
