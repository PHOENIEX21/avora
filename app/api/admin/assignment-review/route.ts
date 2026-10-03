import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

export async function GET(req:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Forbidden'},{status:403});
 const url=new URL(req.url);
 const studentId=url.searchParams.get('studentId');
 const classLevel=url.searchParams.get('classLevel');
 const subject=url.searchParams.get('subject');
 const dueOnly=url.searchParams.get('dueOnly')==='true';
 const students=await withDbRetry(()=>sql`
  SELECT u.id,u.full_name,u.email,sp.class_level,
   COUNT(DISTINCT ua.id)::int assignment_count,
   COUNT(aq.id)::int retained_question_count,
   COUNT(aq.id) FILTER(WHERE aq.active_for_review=true AND aq.needs_confirmation=false AND (aq.next_review_at IS NULL OR aq.next_review_at<=now()))::int due_review_count
  FROM users u JOIN student_profiles sp ON sp.user_id=u.id
  LEFT JOIN uploaded_assignments ua ON ua.student_id=u.id
  LEFT JOIN assignment_questions aq ON aq.assignment_id=ua.id
  WHERE u.role='STUDENT' AND (${classLevel}::text IS NULL OR sp.class_level=${classLevel})
  GROUP BY u.id,sp.class_level ORDER BY u.full_name`);
 let questions:any[]=[];
 if(studentId){
  questions=await withDbRetry(()=>sql`
   SELECT aq.id,aq.original_text,aq.curriculum_topic_id,aq.classification_confidence,aq.question_type,
          aq.needs_confirmation,aq.last_resurfaced_at,aq.resurfaced_count,aq.next_review_at,aq.active_for_review,
          ua.id assignment_id,ua.label,ua.subject_name,ua.class_level,ua.uploaded_at,
          COALESCE(stats.attempt_count,0)::int attempt_count,stats.latest_score,stats.latest_attempt_at
   FROM assignment_questions aq
   JOIN uploaded_assignments ua ON ua.id=aq.assignment_id
   LEFT JOIN LATERAL (
     SELECT COUNT(*) attempt_count,
       (ARRAY_AGG(aqa.score ORDER BY aqa.attempted_at DESC))[1] latest_score,
       MAX(aqa.attempted_at) latest_attempt_at
     FROM assignment_question_attempts aqa WHERE aqa.assignment_question_id=aq.id
   ) stats ON true
   WHERE ua.student_id=${studentId}
     AND (${subject}::text IS NULL OR ua.subject_name=${subject})
     AND (${dueOnly}=false OR (aq.active_for_review=true AND aq.needs_confirmation=false AND (aq.next_review_at IS NULL OR aq.next_review_at<=now())))
   ORDER BY CASE WHEN aq.next_review_at IS NULL THEN 0 ELSE 1 END,aq.next_review_at,ua.uploaded_at DESC`);
 }
 return NextResponse.json({students,questions});
}
