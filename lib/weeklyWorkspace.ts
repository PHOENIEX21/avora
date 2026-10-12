import {sql,withDbRetry} from './db';
import {getDawnGate} from './dawnAccess';
import {canReadReleasedWeek} from './weeklyReleaseWindow';
import {weeklyProgress} from './weeklyWorkspacePolicy';

export class WeeklyWorkspaceError extends Error{
 constructor(message:string,public status:number){super(message)}
}
export async function weeklyStudentContext(studentId:string){
 const gate=await getDawnGate(studentId);
 if(gate.status!=='ready')throw new WeeklyWorkspaceError(
  gate.status==='legacy'?'Your weekly class has not been released.':'Guardian onboarding and verification required.',403);
 return {studentId,classLevel:gate.classLevel,term:gate.term,week:gate.week};
}
export type WeeklyStudentContext=Awaited<ReturnType<typeof weeklyStudentContext>>;
export async function weeklyObjectives(context:WeeklyStudentContext,term=context.term,week=context.week){
 if(!canReadReleasedWeek({term:context.term,week:context.week},{term,week}))
  throw new WeeklyWorkspaceError('This week has not been released.',404);
 const rows=await withDbRetry(()=>sql`
  SELECT o.id,o.subject_name,o.topic_title,o.curriculum_topic_id,o.objective_text,o.source_reference,o.day_index,
   study.study_source,study.started_at,study.studied_at,
   COALESCE(progress.evidence,0)::int evidence,COALESCE(progress.correct,0)::int correct,COALESCE(progress.retained_correct,0)::int retained_correct
  FROM weekly_curriculum_objectives o
  JOIN weekly_class_subjects cs ON cs.class_level=o.class_level AND cs.subject_name=o.subject_name AND cs.active=true
  LEFT JOIN weekly_objective_study study ON study.objective_id=o.id AND study.student_id=${context.studentId}
  LEFT JOIN LATERAL (
   SELECT count(*) evidence,count(*) FILTER(WHERE latest.is_correct) correct,
    count(*) FILTER(WHERE latest.is_correct AND latest.confidence IS DISTINCT FROM 'GUESS') retained_correct
   FROM (SELECT DISTINCT ON (a.item_id) a.item_id,a.is_correct,a.confidence
    FROM weekly_cbt_answers a JOIN weekly_cbt_sessions s ON s.id=a.session_id
    WHERE s.student_id=${context.studentId} AND s.objective_id=o.id AND s.submitted_at IS NOT NULL
    ORDER BY a.item_id,s.submitted_at DESC,s.id DESC) latest
  ) progress ON true
  WHERE o.class_level=${context.classLevel} AND o.term=${term} AND o.week_number=${week}
   AND o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL
   AND (cs.subject_kind='CORE' OR EXISTS(SELECT 1 FROM weekly_student_optional_subjects os
    WHERE os.student_id=${context.studentId} AND os.class_level=o.class_level AND os.subject_name=o.subject_name))
  ORDER BY o.subject_name,o.topic_title,o.day_index,o.objective_text`);
 return rows.map(row=>({...row,id:String(row.id),subject_name:String(row.subject_name),topic_title:String(row.topic_title),
  objective_text:String(row.objective_text),source_reference:String(row.source_reference),
  curriculum_topic_id:row.curriculum_topic_id,study_source:row.study_source,studied_at:row.studied_at,
  progress:weeklyProgress(Number(row.evidence),Number(row.correct),Boolean(row.studied_at),Number(row.retained_correct))}));
}
export async function weeklyObjective(context:WeeklyStudentContext,objectiveId:string){
 const [row]=await withDbRetry(()=>sql`
  SELECT o.* FROM weekly_curriculum_objectives o
  JOIN weekly_class_subjects cs ON cs.class_level=o.class_level AND cs.subject_name=o.subject_name AND cs.active=true
  WHERE o.id=${objectiveId} AND o.class_level=${context.classLevel}
   AND o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL
   AND (cs.subject_kind='CORE' OR EXISTS(SELECT 1 FROM weekly_student_optional_subjects os
    WHERE os.student_id=${context.studentId} AND os.class_level=o.class_level AND os.subject_name=o.subject_name))`);
 if(!row||!canReadReleasedWeek({term:context.term,week:context.week},{term:Number(row.term),week:Number(row.week_number)}))
  throw new WeeklyWorkspaceError('Objective unavailable.',404);
 return row;
}
