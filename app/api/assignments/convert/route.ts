import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {segmentTypedAssignment,classifyAssignmentQuestion,assignmentQuestionKind} from '@/lib/assignmentConversion';

export async function POST(req:Request){
 const session=await getSession();
 if(!session||session.role!=='STUDENT')return NextResponse.json({error:'Student sign-in required.'},{status:403});
 const body=await req.json();
 const rawText=String(body.rawText||'').trim();
 const classLevel=String(body.classLevel||'').trim();
 const subject=String(body.subject||'').trim();
 if(!rawText||!['JSS1','JSS2','JSS3'].includes(classLevel)||!subject)return NextResponse.json({error:'Class, subject and assignment text are required.'},{status:400});
 const segments=segmentTypedAssignment(rawText);
 if(!segments.length)return NextResponse.json({error:'No assignment questions could be separated from this text.'},{status:400});
 const preview=segments.map(segment=>{
   const classification=classifyAssignmentQuestion(segment.originalText,classLevel);
   return {...segment,...classification,questionType:assignmentQuestionKind(segment.originalText)};
 });
 return NextResponse.json({sourceType:'TYPED',classLevel,subject,questionCount:preview.length,questions:preview});
}

export async function PUT(req:Request){
 const session=await getSession();
 if(!session||session.role!=='STUDENT')return NextResponse.json({error:'Student sign-in required.'},{status:403});
 const body=await req.json();
 const rawText=String(body.rawText||'').trim(),classLevel=String(body.classLevel||''),subject=String(body.subject||'');
 if(!rawText||!['JSS1','JSS2','JSS3'].includes(classLevel)||!subject)return NextResponse.json({error:'Class, subject and assignment text are required.'},{status:400});
 const segments=segmentTypedAssignment(rawText);
 if(!segments.length)return NextResponse.json({error:'No questions found.'},{status:400});
 const assignment=await withDbRetry(()=>sql.begin(async tx=>{
   const [row]=await tx`INSERT INTO uploaded_assignments(student_id,source_type,raw_text,label,class_level,subject_name,status) VALUES(${session.userId},'TYPED',${rawText},${body.label||null},${classLevel},${subject},'EXTRACTED') RETURNING id`;
   for(const segment of segments){
     const c=classifyAssignmentQuestion(segment.originalText,classLevel);
     await tx`INSERT INTO assignment_questions(assignment_id,original_text,curriculum_topic_id,classification_confidence,question_type,options,correct_answer,rubric,max_marks,model_solution,needs_confirmation,next_review_at)
       VALUES(${row.id},${segment.originalText},${c.curriculumTopicId},${c.confidence},'THEORY',${null},${null},${JSON.stringify([])}::jsonb,${1},${'Pending reviewed solution.'},true,now())`;
   }
   await tx`UPDATE uploaded_assignments SET status='CONVERTED',updated_at=now() WHERE id=${row.id}`;
   return row;
 }));
 return NextResponse.json({assignmentId:assignment.id,questionCount:segments.length,status:'CONVERTED',requiresReview:true});
}
