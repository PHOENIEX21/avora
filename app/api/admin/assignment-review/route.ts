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
          aq.options,aq.correct_answer,aq.rubric,aq.max_marks,aq.model_solution,aq.needs_confirmation,aq.last_resurfaced_at,aq.resurfaced_count,aq.next_review_at,aq.active_for_review,
          ua.id assignment_id,ua.label,ua.subject_name,ua.class_level,ua.uploaded_at,ua.approved_at,ua.solution_ready_at,
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


export async function PATCH(req:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Forbidden'},{status:403});
 const body=await req.json();
 const id=String(body.questionId||''),topic=String(body.curriculumTopicId||'').trim(),type=body.questionType;
 if(!id||!topic||!['MULTIPLE_CHOICE','THEORY'].includes(type))return NextResponse.json({error:'Question, curriculum topic and valid question type are required.'},{status:400});
 const original=await withDbRetry(()=>sql`SELECT original_text FROM assignment_questions WHERE id=${id}`);
 if(!original.length)return NextResponse.json({error:'Question not found.'},{status:404});
 const options=type==='MULTIPLE_CHOICE'&&Array.isArray(body.options)?body.options.map((x:any)=>String(x).trim()).filter(Boolean):null;
 const correct=type==='MULTIPLE_CHOICE'?String(body.correctAnswer||'').trim():null;
 const rubric=type==='THEORY'&&Array.isArray(body.rubric)?body.rubric:null;
 const maxMarks=type==='THEORY'?Number(body.maxMarks||0):null;
 const solution=String(body.modelSolution||'').trim();
 if(type==='MULTIPLE_CHOICE'&&(!options||options.length!==4||new Set(options.map((x:string)=>x.toLowerCase())).size!==4||!options.includes(correct||'')))return NextResponse.json({error:'MCQ review requires four distinct options and the correct answer must be one of them.'},{status:400});
 if(type==='THEORY'&&(!rubric?.length||!maxMarks||rubric.reduce((n:number,r:any)=>n+Number(r.marks||0),0)!==maxMarks))return NextResponse.json({error:'Theory rubric marks must add up exactly to the maximum marks.'},{status:400});
 if(!solution)return NextResponse.json({error:'A reviewed model solution is required.'},{status:400});
 await withDbRetry(()=>sql`UPDATE assignment_questions SET curriculum_topic_id=${topic},classification_confidence='HIGH',question_type=${type},options=${options?JSON.stringify(options):null}::jsonb,correct_answer=${correct},rubric=${rubric?JSON.stringify(rubric):null}::jsonb,max_marks=${maxMarks},model_solution=${solution},needs_confirmation=true,active_for_review=false WHERE id=${id}`);
 return NextResponse.json({questionId:id,saved:true,originalTextPreserved:true,requiresConfirmation:true});
}
