import {sql,withDbRetry} from './db';

export async function dueAssignmentReviewQuestions(studentId:string,subject:string,limit=4){
 const safeLimit=Math.max(1,Math.min(20,Number(limit)||4));
 return withDbRetry(()=>sql`
  SELECT aq.id,aq.original_text,aq.question_type,aq.options,aq.correct_answer,aq.rubric,aq.max_marks,
         aq.model_solution,aq.curriculum_topic_id,aq.resurfaced_count,aq.last_resurfaced_at,aq.next_review_at,
         ua.label,ua.subject_name,
         COALESCE(hist.attempt_count,0)::int attempt_count,
         hist.latest_score
  FROM assignment_questions aq
  JOIN uploaded_assignments ua ON ua.id=aq.assignment_id
  LEFT JOIN LATERAL (
    SELECT COUNT(*) attempt_count,(ARRAY_AGG(aqa.score ORDER BY aqa.attempted_at DESC))[1] latest_score
    FROM assignment_question_attempts aqa WHERE aqa.assignment_question_id=aq.id
  ) hist ON true
  WHERE ua.student_id=${studentId}
    AND ua.subject_name=${subject}
    AND aq.active_for_review=true
    AND aq.needs_confirmation=false
    AND aq.classification_confidence<>'UNCLASSIFIED'
    AND (aq.next_review_at IS NULL OR aq.next_review_at<=now())
  ORDER BY
    CASE WHEN hist.latest_score IS NULL THEN 0 ELSE 1 END,
    hist.latest_score ASC NULLS FIRST,
    aq.last_resurfaced_at ASC NULLS FIRST,
    aq.created_at ASC
  LIMIT ${safeLimit}`);
}

export async function markAssignmentQuestionResurfaced(questionIds:string[]){
 if(!questionIds.length)return;
 await withDbRetry(()=>sql`
  UPDATE assignment_questions SET
   last_resurfaced_at=now(),
   resurfaced_count=resurfaced_count+1,
   next_review_at=now()+interval '14 days'
  WHERE id=ANY(${questionIds}::uuid[])`);
}
