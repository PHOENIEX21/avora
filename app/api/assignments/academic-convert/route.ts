import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {getOfficialObjectives} from '@/lib/curriculumObjectives';
import {convertAcademicQuestion} from '@/lib/assignmentAcademicConverter';

export async function POST(req:Request){
 const session=await getSession();
 if(!session||!['STUDENT','ADMIN'].includes(session.role))return NextResponse.json({error:'Forbidden'},{status:403});
 const body=await req.json();
 const questionId=String(body.questionId||'');
 if(!questionId)return NextResponse.json({error:'questionId is required.'},{status:400});
 const [row]=await withDbRetry(()=>sql`
  SELECT aq.id,aq.original_text,aq.curriculum_topic_id,aq.classification_confidence,
         ua.student_id,ua.class_level,ua.subject_name
  FROM assignment_questions aq JOIN uploaded_assignments ua ON ua.id=aq.assignment_id
  WHERE aq.id=${questionId} AND (${session.role}='ADMIN' OR ua.student_id=${session.userId})`);
 if(!row)return NextResponse.json({error:'Assignment question not found.'},{status:404});
 if(row.classification_confidence==='UNCLASSIFIED'||!row.curriculum_topic_id)
  return NextResponse.json({error:'Confirm the curriculum topic before academic conversion.'},{status:409});
 const objectives=getOfficialObjectives(String(row.curriculum_topic_id))?.objectives||[];
 const suppliedOptions=[...String(row.original_text).matchAll(/(?:^|\n)\s*[A-D][.)]\s+(.+?)(?=\n\s*[A-D][.)]|$)/g)].map(m=>m[1].trim());
 const converted=await convertAcademicQuestion({originalText:String(row.original_text),classLevel:String(row.class_level),subject:String(row.subject_name||''),topicId:String(row.curriculum_topic_id),objectives,suppliedOptions:suppliedOptions.length===4?suppliedOptions:[]});
 if(!converted.ok)return NextResponse.json({error:'Academic conversion could not be validated. The original question was left unchanged.'},{status:422});
 const q=converted.json!;
 await withDbRetry(()=>sql`
  UPDATE assignment_questions SET
   question_type=${q.questionType},
   options=${q.questionType==='MULTIPLE_CHOICE'?JSON.stringify(q.options):null}::jsonb,
   correct_answer=${q.questionType==='MULTIPLE_CHOICE'?q.correctAnswer:null},
   rubric=${q.questionType==='THEORY'?JSON.stringify(q.rubric):null}::jsonb,
   max_marks=${q.questionType==='THEORY'?q.maxMarks:null},
   model_solution=${q.modelSolution},
   needs_confirmation=true
  WHERE id=${questionId}`);
 return NextResponse.json({questionId,converted:q,requiresConfirmation:true});
}
