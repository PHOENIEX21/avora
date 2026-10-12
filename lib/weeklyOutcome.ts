import {sql,withDbRetry} from './db';
import {nextMasteryScore} from './mastery';
import {evidenceConfidence,evidenceStatus} from './learnerIntelligence';
import type {WeeklyPaperQuestion} from './weeklyExamSession';
export async function syncWeeklyOutcome(sessionId:string,expectedStudentId?:string){
 const [owner]=await withDbRetry(()=>sql`SELECT student_id FROM exam_sessions WHERE id=${sessionId}`);
 if(!owner||(expectedStudentId&&String(owner.student_id)!==expectedStudentId))return {synced:false};
 return sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${owner.student_id} FOR UPDATE`;
  const [session]=await tx`SELECT es.*,b.title,b.term,b.week_number FROM exam_sessions es
   JOIN weekly_exam_blueprints b ON b.id=es.weekly_exam_blueprint_id
   WHERE es.id=${sessionId} AND es.student_id=${owner.student_id} AND es.status='COMPLETED'
    AND es.marking_status IN ('NOT_REQUIRED','COMPLETED') AND es.weekly_outcome_sync_state='PENDING'
    AND b.results_release_at IS NOT NULL AND b.closes_at IS NOT NULL
    AND clock_timestamp()>=b.results_release_at AND clock_timestamp()>=b.closes_at FOR UPDATE OF es`;
  if(!session)return {synced:false};
  const marks=await tx`SELECT * FROM weekly_exam_question_marks WHERE session_id=${sessionId}`;
  const paper=session.weekly_paper_snapshot as WeeklyPaperQuestion[];
  if(!Array.isArray(paper)||!paper.length||marks.length!==paper.length
   ||marks.some(mark=>!paper.some(question=>question.id===String(mark.question_id))))
   throw new Error('Final reviewed marks are incomplete; outcome remains pending.');
  const byObjective=new Map<string,{earned:number;total:number}>(),byTopic=new Map<string,{subject:string;topic:string;earned:number;total:number}>();
  for(const mark of marks){
   const question=paper.find(question=>question.id===String(mark.question_id))!;
   const fraction=Number(mark.mark_fraction),objective=byObjective.get(question.objectiveId)||{earned:0,total:0};
   const [seen]=await tx`SELECT id FROM attempts WHERE student_id=${session.student_id} AND question_id=${question.id}
    AND mode IN ('PRACTICE','EXAM','DIAGNOSTIC') AND COALESCE(hint_count,0)=0 LIMIT 1`;
   await tx`INSERT INTO attempts(student_id,question_id,answer,is_correct,diagnosis,mode,created_at)
    VALUES(${session.student_id},${question.id},${JSON.stringify({value:session.answers?.[question.id]||''})}::jsonb,${fraction>=.7},'Reviewed weekly exam evidence','EXAM',${session.submitted_at})`;
   if(!seen){objective.earned+=fraction;objective.total++;byObjective.set(question.objectiveId,objective)}
   const key=question.subject+'|'+question.topic,topic=byTopic.get(key)||{subject:question.subject,topic:question.topic,earned:0,total:0};
   topic.earned+=fraction;topic.total++;byTopic.set(key,topic);
   if(seen)continue;
   const [old]=await tx`SELECT score,evidence_count FROM mastery WHERE student_id=${session.student_id} AND skill_id=${question.skillId} FOR UPDATE`;
   const evidence=Number(old?.evidence_count||0)+1,score=nextMasteryScore(Number(old?.score||0),fraction>=.7,evidence-1);
   await tx`INSERT INTO mastery(student_id,skill_id,score,evidence_count,last_practiced_at)
    VALUES(${session.student_id},${question.skillId},${score},1,clock_timestamp())
    ON CONFLICT(student_id,skill_id) DO UPDATE SET score=EXCLUDED.score,evidence_count=mastery.evidence_count+1,last_practiced_at=EXCLUDED.last_practiced_at,updated_at=clock_timestamp()`;
   await tx`INSERT INTO learner_skill_insights(student_id,skill_id,status,confidence,independent_accuracy,independent_evidence,updated_at)
    VALUES(${session.student_id},${question.skillId},${evidenceStatus(score,evidence,fraction>=.7?0:1)},${evidenceConfidence(evidence)},${score},${evidence},clock_timestamp())
    ON CONFLICT(student_id,skill_id) DO UPDATE SET status=EXCLUDED.status,confidence=EXCLUDED.confidence,independent_accuracy=EXCLUDED.independent_accuracy,independent_evidence=EXCLUDED.independent_evidence,updated_at=clock_timestamp()`;
  }
  for(const [objectiveId,value] of byObjective){
   const [old]=await tx`SELECT evidence_count,earned_fraction FROM learner_objective_mastery WHERE student_id=${session.student_id} AND objective_id=${objectiveId} FOR UPDATE`;
   const evidence=Number(old?.evidence_count||0)+value.total,earned=Number(old?.earned_fraction||0)+value.earned,score=earned/evidence;
   await tx`INSERT INTO learner_objective_mastery(student_id,objective_id,evidence_count,earned_fraction,mastery_score,status,last_weekly_session_id)
    VALUES(${session.student_id},${objectiveId},${evidence},${earned},${score},${evidenceStatus(score,evidence,score<1?1:0)},${sessionId})
    ON CONFLICT(student_id,objective_id) DO UPDATE SET evidence_count=EXCLUDED.evidence_count,earned_fraction=EXCLUDED.earned_fraction,mastery_score=EXCLUDED.mastery_score,status=EXCLUDED.status,last_weekly_session_id=EXCLUDED.last_weekly_session_id,updated_at=clock_timestamp()`;
  }
  const ranked=[...byTopic.values()].map(value=>({...value,pct:value.earned/value.total})).sort((a,b)=>a.pct-b.pct);
  for(const topic of ranked){
   const [evidence]=await tx`SELECT count(*)::int total,count(*) FILTER(WHERE latest.is_correct)::int correct FROM (
    SELECT DISTINCT ON(a.question_id) a.is_correct FROM attempts a
    WHERE a.student_id=${session.student_id} AND a.mode IN ('PRACTICE','EXAM','DIAGNOSTIC') AND COALESCE(a.hint_count,0)=0
     AND EXISTS(SELECT 1 FROM weekly_exam_question_marks mapping JOIN exam_sessions evidence_session ON evidence_session.id=mapping.session_id
      WHERE mapping.question_id=a.question_id AND evidence_session.student_id=${session.student_id}
       AND (evidence_session.weekly_outcome_sync_state='SYNCED' OR evidence_session.id=${sessionId})
       AND mapping.curriculum_topic_id=${topic.topic} AND mapping.subject_name=${topic.subject})
    ORDER BY a.question_id,a.created_at DESC,a.id DESC
   ) latest`;
   const count=Number(evidence.total),accuracy=count?Number(evidence.correct)/count:0,mastered=count>=7&&accuracy>=.8;
   await tx`INSERT INTO student_topic_mastery(student_id,curriculum_topic_id,status,first_attempted_at,mastered_at,attempts_count,updated_at)
    VALUES(${session.student_id},${topic.topic},${mastered?'MASTERED':accuracy<.5?'STRUGGLING':'IN_PROGRESS'},clock_timestamp(),${mastered?new Date():null},${count},clock_timestamp())
    ON CONFLICT(student_id,curriculum_topic_id) DO UPDATE SET status=CASE WHEN student_topic_mastery.status='MASTERED' AND EXCLUDED.status='IN_PROGRESS' THEN student_topic_mastery.status ELSE EXCLUDED.status END,
     mastered_at=COALESCE(student_topic_mastery.mastered_at,EXCLUDED.mastered_at),attempts_count=GREATEST(student_topic_mastery.attempts_count,EXCLUDED.attempts_count),updated_at=clock_timestamp()`;
  }
  const weak=ranked.filter(topic=>topic.pct<.75),first=weak[0];
  if(first){
   await tx`UPDATE remediation_plans SET status='SUPERSEDED',completed_at=clock_timestamp() WHERE student_id=${session.student_id} AND exam_name='AVORA_WEEKLY' AND subject_name=${first.subject} AND status='ACTIVE'`;
   await tx`INSERT INTO remediation_plans(student_id,exam_name,subject_name,source_exam_session_id,weak_topics,recommended_topic,plan_reason)
    VALUES(${session.student_id},'AVORA_WEEKLY',${first.subject},${sessionId},${JSON.stringify(weak)}::jsonb,${first.topic},${'Review '+first.topic+' and try fresh independent practice.'})`;
  }
  const parents=await tx`SELECT parent_id FROM parent_student_links WHERE student_id=${session.student_id} AND status='ACTIVE'`;
  const [dates]=await tx`SELECT date_trunc('week',${session.submitted_at}::timestamptz AT TIME ZONE 'Africa/Lagos')::date::text week_start,
   (date_trunc('week',${session.submitted_at}::timestamptz AT TIME ZONE 'Africa/Lagos')::date+6)::text week_end`;
  const [activity]=await tx`SELECT count(*)::int attempts,count(*) FILTER(WHERE is_correct)::int correct,
   (SELECT count(*)::int FROM tutor_topic_progress WHERE student_id=${session.student_id} AND coverage_complete=true
    AND updated_at>=(${dates.week_start}::date::timestamp AT TIME ZONE 'Africa/Lagos') AND updated_at<((${dates.week_end}::date+1)::timestamp AT TIME ZONE 'Africa/Lagos')) lessons,
   (SELECT round(avg(score)*100)::int FROM mastery WHERE student_id=${session.student_id}) mastery_average
   FROM attempts WHERE student_id=${session.student_id}
    AND created_at>=(${dates.week_start}::date::timestamp AT TIME ZONE 'Africa/Lagos') AND created_at<((${dates.week_end}::date+1)::timestamp AT TIME ZONE 'Africa/Lagos')`;
  const strongest=ranked.at(-1),summary='Weekly assessment reviewed. '+(first?'Next: review '+first.topic+'.':'Continue the next curriculum week.');
  for(const parent of parents){
   await tx`INSERT INTO parent_weekly_reports(parent_id,student_id,week_start,week_end,lessons_completed,attempts,correct_answers,supervised_assessments,supervised_average,mastery_average,strongest_topic,weakest_topic,recommended_next,summary)
    VALUES(${parent.parent_id},${session.student_id},${dates.week_start},${dates.week_end},${Number(activity.lessons)},${Number(activity.attempts)},${Number(activity.correct)},0,NULL,${activity.mastery_average??null},${strongest?.topic||null},${first?.topic||null},${first?'Review '+first.topic:'Continue the next curriculum week'},${summary})
    ON CONFLICT(parent_id,student_id,week_start) DO UPDATE SET lessons_completed=EXCLUDED.lessons_completed,attempts=EXCLUDED.attempts,correct_answers=EXCLUDED.correct_answers,mastery_average=EXCLUDED.mastery_average,strongest_topic=EXCLUDED.strongest_topic,weakest_topic=EXCLUDED.weakest_topic,recommended_next=EXCLUDED.recommended_next,summary=EXCLUDED.summary,generated_at=clock_timestamp()`;
   await tx`INSERT INTO parent_notifications(parent_id,student_id,kind,title,body,href) VALUES(${parent.parent_id},${session.student_id},'WEEKLY_REPORT','Weekly learning report ready',${summary},${'/parent/child/'+session.student_id})`;
  }
  await tx`UPDATE exam_sessions SET weekly_outcome_sync_state='SYNCED',weekly_outcome_synced_at=clock_timestamp() WHERE id=${sessionId}`;
  return {synced:true};
 });
}
