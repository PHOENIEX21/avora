import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {classifyAssignmentQuestion,assignmentQuestionKind} from '@/lib/assignmentConversion';
import {extractAssignmentFile} from '@/lib/assignmentFileExtraction';

const MAX_BYTES=4*1024*1024;
const ALLOWED=new Set(['image/jpeg','image/png','image/webp','application/pdf']);

export async function POST(req:Request){
 const session=await getSession();
 if(!session||session.role!=='STUDENT')return NextResponse.json({error:'Student sign-in required.'},{status:403});
 const form=await req.formData();
 const file=form.get('file');
 const classLevel=String(form.get('classLevel')||'').trim();
 const subject=String(form.get('subject')||'').trim();
 const label=String(form.get('label')||'').trim();
 if(!(file instanceof File))return NextResponse.json({error:'Choose an image or PDF.'},{status:400});
 if(!['JSS1','JSS2','JSS3'].includes(classLevel)||!subject)return NextResponse.json({error:'Class and subject are required.'},{status:400});
 if(!ALLOWED.has(file.type))return NextResponse.json({error:'Use JPG, PNG, WebP or PDF.'},{status:400});
 if(file.size<=0||file.size>MAX_BYTES)return NextResponse.json({error:'Upload a file up to 4 MB.'},{status:400});

 const bytes=Buffer.from(await file.arrayBuffer());
 const extracted=await extractAssignmentFile({bytes,mimeType:file.type,fileName:file.name,classLevel,subject});
 if(!extracted.ok)return NextResponse.json({error:extracted.error},{status:422});

 const rawText=extracted.questions.map((q,i)=>`${i+1}. ${q.originalText}`).join('\n\n');
 const sourceType=file.type==='application/pdf'?'FILE':'IMAGE';
 const assignment=await withDbRetry(()=>sql.begin(async tx=>{
  const [row]=await tx`INSERT INTO uploaded_assignments(student_id,source_type,raw_text,label,class_level,subject_name,status)
   VALUES(${session.userId},${sourceType},${rawText},${label||file.name},${classLevel},${subject},'EXTRACTED') RETURNING id`;
  const questionIds:string[]=[];
  for(const item of extracted.questions){
   const c=classifyAssignmentQuestion(item.originalText,classLevel);
   const kind=assignmentQuestionKind(item.originalText);
   const supplied=[...String(item.originalText).matchAll(/(?:^|\n)\s*[A-D][.)]\s+(.+?)(?=\n\s*[A-D][.)]|$)/g)].map(m=>m[1].trim());
   const [q]=await tx`INSERT INTO assignment_questions(
      assignment_id,original_text,curriculum_topic_id,classification_confidence,question_type,
      options,correct_answer,rubric,max_marks,model_solution,needs_confirmation,next_review_at
    ) VALUES(
      ${row.id},${item.originalText},${c.curriculumTopicId},${c.confidence},${kind},
      ${kind==='MULTIPLE_CHOICE'?JSON.stringify(supplied):null}::jsonb,
      ${null},
      ${kind==='THEORY'?JSON.stringify([]):null}::jsonb,
      ${kind==='THEORY'?1:null},
      ${'Pending academic conversion.'},true,now()
    ) RETURNING id`;
   questionIds.push(String(q.id));
  }
  await tx`UPDATE uploaded_assignments SET status='CONVERTED',updated_at=now() WHERE id=${row.id}`;
  return {id:String(row.id),questionIds};
 }));
 return NextResponse.json({
  assignmentId:assignment.id,
  questionIds:assignment.questionIds,
  questionCount:extracted.questions.length,
  sourceType,
  questions:extracted.questions
 },{status:201});
}
