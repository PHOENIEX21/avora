import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';
import {answerIsCorrect} from '@/lib/answers';
import {inspectQuestion,normalizeQuestionOptions} from '@/lib/questionQuality';

const schema=z.object({questionId:z.string().uuid(),answer:z.string().max(500).default(''),reveal:z.boolean().optional().default(false)});

export async function POST(req:Request){
 const s=await getSession();
 if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});
 
 try{
  const d=schema.parse(await req.json());
  const [q]=await withDbRetry(()=>sql`SELECT prompt,question_type,correct_answer,options,hint_text,explanation FROM questions WHERE id=${d.questionId} AND status='PUBLISHED'`);
  if(!q)return NextResponse.json({error:'Question not found.'},{status:404});
  const options=normalizeQuestionOptions(q.options);
  const quality=inspectQuestion(String(q.prompt||''),String(q.question_type||''),options,q.correct_answer);
  if(!quality.examReady)return NextResponse.json({error:'This question failed AVORA’s clarity/exam-standard gate and has been withheld.',issues:quality.issues},{status:409});
  const correct=d.answer.trim()?answerIsCorrect(d.answer,q.correct_answer,options):false;
  const explanation=String(q.explanation||'Review the rule or method used in this question, then compare each step with the answer.');
  if(d.reveal){
   return NextResponse.json({
    correct,
    feedback:correct?'Yes. That answer is correct.':'This answer is being revealed for learning, so it will not count as independent mastery.',
    hint:q.hint_text||'Read exactly what is given and what must be found.',
    explanation,
    correctAnswer:String(q.correct_answer||''),
    questionHelp:`Read the command word first, then answer only what it asks: ${String(q.prompt||'this problem')}`,
    gradingStrategy:quality.grading
   });
  }
  return NextResponse.json({
   correct,
   feedback:correct?'Yes. That answer is correct. Now prove the skill independently.':'Not yet. Keep the same skill and use one clue before trying again.',
   hint:q.hint_text||'Read exactly what is given and what must be found. Which single step connects them?',
   explanation:correct?explanation:null,
   gradingStrategy:quality.grading
  });
 }catch(e){
  console.error('tutor check',e);
  return NextResponse.json({error:'AVORA could not check that answer yet. Please retry.'},{status:503});
 }
}
