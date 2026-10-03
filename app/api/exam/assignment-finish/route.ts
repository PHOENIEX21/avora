import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {markAssignmentMcq,gradeAssignmentTheory} from '@/lib/assignmentMarking';

export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});
 const body=await req.json(),sessionId=String(body.sessionId||'');
 const [exam]=await withDbRetry(()=>sql`SELECT id,assignment_question_ids,assignment_answers,status FROM exam_sessions WHERE id=${sessionId} AND student_id=${s.userId}`);
 if(!exam)return NextResponse.json({error:'Assessment not found.'},{status:404});
 if(exam.status!=='ACTIVE')return NextResponse.json({error:'This assessment is no longer active.'},{status:409});
 const ids=(exam.assignment_question_ids||[]).map(String);if(!ids.length)return NextResponse.json({marks:[],assignmentPercent:null});
 const rows=await withDbRetry(()=>sql`SELECT id,original_text,question_type,options,correct_answer,rubric,max_marks,model_solution,curriculum_topic_id FROM assignment_questions WHERE id=ANY(${ids}::uuid[]) AND needs_confirmation=false`);
 const answers=exam.assignment_answers||{},marks:any[]=[];
 for(const q of rows){
  const answer=String(answers[q.id]||'');
  if(q.question_type==='MULTIPLE_CHOICE'){
   const score=markAssignmentMcq(answer,String(q.correct_answer||''));
   marks.push({id:q.id,score,maxMarks:1,normalizedScore:score,feedback:score?'Correct.':'Review the worked solution.',topicId:q.curriculum_topic_id});
  }else{
   if(!answer.trim()){marks.push({id:q.id,score:0,maxMarks:Number(q.max_marks||1),normalizedScore:0,feedback:'No response submitted.',topicId:q.curriculum_topic_id});continue}
   const graded=await gradeAssignmentTheory({prompt:q.original_text,answer,rubric:Array.isArray(q.rubric)?q.rubric:[],maxMarks:Number(q.max_marks||1),modelSolution:String(q.model_solution||'')});
   if(!graded.ok)return NextResponse.json({error:'Your answers are saved, but theory marking is temporarily unavailable. Retry submission later; no response has been lost.',code:'ASSIGNMENT_THEORY_GRADER_UNAVAILABLE'},{status:503});
   marks.push({id:q.id,...graded.json,topicId:q.curriculum_topic_id});
  }
 }
 await withDbRetry(()=>sql.begin(async tx=>{
  for(const m of marks){
   await tx`INSERT INTO assignment_question_attempts(assignment_question_id,student_id,submitted_answer,score,rubric_feedback,is_resurfaced_review)
     VALUES(${m.id},${s.userId},${String(answers[m.id]||'')},${Number(m.normalizedScore)},${JSON.stringify({feedback:m.feedback,criteria:m.criteria||[]})}::jsonb,true)`;
   const days=Number(m.normalizedScore)>=0.8?30:Number(m.normalizedScore)>=0.5?14:7;
   await tx`UPDATE assignment_questions SET next_review_at=now()+make_interval(days=>${days}) WHERE id=${m.id}`;
  }
  await tx`UPDATE exam_sessions SET assignment_marks=${JSON.stringify(Object.fromEntries(marks.map(m=>[m.id,m])))}::jsonb WHERE id=${sessionId}`;
 }));
 const percent=marks.length?Math.round(marks.reduce((n,m)=>n+Number(m.normalizedScore),0)/marks.length*100):null;
 return NextResponse.json({marks,assignmentPercent:percent});
}
