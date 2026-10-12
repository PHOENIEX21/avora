import {sql,withDbRetry} from './db';
import {weeklyStudentContext,weeklyObjectives} from './weeklyWorkspace';
import {weeklyRevisitDueCount} from './weeklyRevisit';
export type WeeklyTodayTask={id:string;kind:'STUDY'|'PRACTICE'|'REVISIT';subject:string;topic:string;text:string;done:boolean;href:string;questions?:number};
export type WeeklyTodayPlan={classLevel:string;term:number;week:number;date:string;tasks:WeeklyTodayTask[];completed:number;total:number};

/** Reading Today never starts an assessment, seeds content or advances a schedule. */
export async function weeklyTodayPlan(studentId:string):Promise<WeeklyTodayPlan>{
 const context=await weeklyStudentContext(studentId);
 const [clock]=await withDbRetry(()=>sql`SELECT (statement_timestamp() AT TIME ZONE 'Africa/Lagos')::date::text today,
  extract(isodow FROM statement_timestamp() AT TIME ZONE 'Africa/Lagos')::int weekday`);
 const objectives=await weeklyObjectives(context),today=objectives.filter(objective=>Number(objective.day_index)===Number(clock.weekday));
 const ids=today.map(objective=>objective.id);
 const completed=ids.length?await withDbRetry(()=>sql`SELECT DISTINCT objective_id FROM weekly_cbt_sessions
  WHERE student_id=${studentId} AND source='DAILY_LESSON' AND mode='PRACTICE' AND objective_id=ANY(${ids}::uuid[])
   AND submitted_at IS NOT NULL AND item_snapshot IS NOT NULL AND cardinality(question_ids)>0
   AND cardinality(question_ids)>=5 AND CASE WHEN jsonb_typeof(item_snapshot)='array' THEN jsonb_array_length(item_snapshot) ELSE 0 END=cardinality(question_ids)
   AND (SELECT count(DISTINCT answer.item_id) FROM weekly_cbt_answers answer WHERE answer.session_id=weekly_cbt_sessions.id AND answer.item_id=ANY(weekly_cbt_sessions.question_ids))=cardinality(question_ids)
   AND (submitted_at AT TIME ZONE 'Africa/Lagos')::date=${clock.today}::date`):[];
 const practised=new Set(completed.map(row=>String(row.objective_id)));
 const tasks:WeeklyTodayTask[]=today.flatMap(objective=>{
  const base={subject:objective.subject_name,topic:objective.topic_title,text:objective.objective_text};
  const query=new URLSearchParams({term:String(context.term),week:String(context.week),subject:objective.subject_name});
  return [{...base,id:'study:'+objective.id,kind:'STUDY' as const,done:Boolean(objective.studied_at),href:'/weekly?'+query},
   {...base,id:'practice:'+objective.id,kind:'PRACTICE' as const,done:practised.has(objective.id),href:'/weekly/practice?objectiveId='+objective.id}];
 });
 const [revisit]=await withDbRetry(()=>sql`SELECT id,submitted_at,cardinality(question_ids)::int questions FROM weekly_cbt_sessions
  WHERE student_id=${studentId} AND source='REVISIT' AND mode='PRACTICE' AND item_snapshot IS NOT NULL AND cardinality(question_ids)>0
   AND CASE WHEN jsonb_typeof(item_snapshot)='array' THEN jsonb_array_length(item_snapshot) ELSE 0 END=cardinality(question_ids)
   AND NOT EXISTS(SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(item_snapshot)='array' THEN item_snapshot ELSE '[]'::jsonb END) item
    LEFT JOIN weekly_curriculum_objectives objective ON objective.id::text=item->>'objectiveId'
    LEFT JOIN weekly_class_subjects subject ON subject.class_level=objective.class_level AND subject.subject_name=objective.subject_name AND subject.active=true
    WHERE objective.id IS NULL OR objective.class_level<>${context.classLevel} OR objective.approval_status<>'PUBLISHED' OR objective.published_at IS NULL
     OR objective.term>${context.term} OR (objective.term=${context.term} AND objective.week_number>${context.week}) OR subject.class_level IS NULL
     OR (subject.subject_kind<>'CORE' AND NOT EXISTS(SELECT 1 FROM weekly_student_optional_subjects enrolment WHERE enrolment.student_id=${studentId} AND enrolment.class_level=objective.class_level AND enrolment.subject_name=objective.subject_name)))
   AND (submitted_at IS NULL OR (submitted_at AT TIME ZONE 'Africa/Lagos')::date=${clock.today}::date)
   AND (submitted_at IS NULL OR (SELECT count(DISTINCT answer.item_id) FROM weekly_cbt_answers answer WHERE answer.session_id=weekly_cbt_sessions.id AND answer.item_id=ANY(weekly_cbt_sessions.question_ids))=cardinality(question_ids))
  ORDER BY submitted_at NULLS FIRST,submitted_at DESC,id DESC LIMIT 1`);
 const due=(!revisit||revisit.submitted_at)?await weeklyRevisitDueCount(context):0;
 if(due>0)tasks.push({id:'revisit:due:'+clock.today,kind:'REVISIT',subject:'Revisit',topic:'Due revision',text:due+' questions',questions:due,done:false,href:'/weekly/revisit'});
 else if(revisit)tasks.push({id:'revisit:'+revisit.id,kind:'REVISIT',subject:'Revisit',topic:'Assigned revision',text:String(revisit.questions)+' questions',questions:Number(revisit.questions),done:Boolean(revisit.submitted_at),href:'/weekly/revisit'});
 return {classLevel:context.classLevel,term:context.term,week:context.week,date:String(clock.today),tasks,total:tasks.length,completed:tasks.filter(task=>task.done).length};
}
