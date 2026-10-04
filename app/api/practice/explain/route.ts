import {requirePremiumFeature} from '@/lib/premiumAccess';
import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {answerIsCorrect,displayCorrectAnswer} from '@/lib/answers';
import {claimAiRequest,completeAiRequest} from '@/lib/aiCostGuard';
import {aiStructured,configuredAiProvider} from '@/lib/aiGateway';

export const dynamic='force-dynamic';

const schema=z.object({questionId:z.string().uuid(),answer:z.string().min(1).max(2000)});
type State='CORRECT'|'PARTIAL'|'INCOMPLETE'|'INCORRECT';

function fallback(answer:string,expected:string,hint:string,explanation:string){
 const lines=answer.split(/\n|;|→|=>/).map(x=>x.trim()).filter(Boolean);
 const state:State=lines.length>=2?'PARTIAL':'INCORRECT';
 return {
  state,
  message:state==='PARTIAL'
   ?'Some working is visible, so AVORA will keep the useful part instead of throwing it away. The answer is not complete or correct yet. Find the first line where the result stops following the rule, then continue from there.'
   :'Your attempt has been recorded. AVORA will not replace it with the final answer. Let us identify the first idea you need and repair only that part.',
  nextPrompt:hint||'What is the first operation, rule, or language clue that connects what is given to what the question asks for?',
  board:[lines[0]?`Keep: ${lines[0]}`:'Keep your original attempt visible','Find the first unsupported change','Repair one step, then retry'],
  teacherNote:explanation?`Use this only as teacher guidance, not as an answer dump: ${explanation}`:'Work one justified step at a time.',
  expectedHidden:Boolean(expected)
 };
}

export async function POST(req:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Please sign in again.'},{status:401});
 const premiumDenied=await requirePremiumFeature(session,'Personalized AI Practice Guidance');if(premiumDenied)return premiumDenied;
 try{
  const d=schema.parse(await req.json());
  const [q]=await withDbRetry(()=>sql`SELECT q.prompt,q.correct_answer,q.options,q.hint_text,q.explanation,q.micro_skill,sk.name skill,t.name topic FROM questions q JOIN skills sk ON sk.id=q.skill_id JOIN topics t ON t.id=sk.topic_id WHERE q.id=${d.questionId} AND q.status='PUBLISHED'`);
  if(!q)return NextResponse.json({error:'Question not found.'},{status:404});
  const expected=displayCorrectAnswer(q.correct_answer);
  if(answerIsCorrect(d.answer,q.correct_answer,q.options))return NextResponse.json({state:'CORRECT',message:'Your answer is already correct. Explain the key reason for your method, then move to a fresh question for independent evidence.',nextPrompt:'What rule or idea made your answer valid?',board:['Correct result','Explain why it works','Prove it again on a fresh question']});

  const base=fallback(d.answer,expected,String(q.hint_text||''),String(q.explanation||''));
  if(!configuredAiProvider())return NextResponse.json(base);
  const aiClaim=await claimAiRequest(session.userId,'PRACTICE_EXPLAIN');
  if(!aiClaim.allowed)return NextResponse.json({error:'AI guidance is temporarily at its safe usage limit. Continue deterministic practice or try later.',code:aiClaim.reason},{status:429});

  const ai=await aiStructured<any>({
   name:'exercise_diagnosis',
   instructions:`You are AVORA's exercise diagnosis teacher. The learner MUST attempt before receiving this help. Diagnose the learner's submitted work without shaming and without dumping the complete worked answer. Preserve every correct step. Classify the attempt as PARTIAL when meaningful steps are correct but the work is unfinished or later goes wrong; INCOMPLETE when it is on the right path but stops before answering; INCORRECT when the first meaningful reasoning is wrong. State the first meaningful gap or error. Give exactly one next prompt that lets the learner continue. For mathematics, explain the legal operation/rule behind a transformation; never say merely "move it" or "minus cancels minus". For English, explain the language evidence or rule behind the decision. The board must contain at most 3 short lines and must not reveal the final answer. Return JSON only.`,
   input:JSON.stringify({question:String(q.prompt||''),topic:String(q.topic||''),skill:String(q.skill||''),microSkill:String(q.micro_skill||''),learnerAttempt:d.answer,teacherCorrectAnswer:expected,teacherHint:String(q.hint_text||''),teacherExplanation:String(q.explanation||'')}),
   schema:{type:'object',additionalProperties:false,properties:{state:{type:'string',enum:['PARTIAL','INCOMPLETE','INCORRECT']},message:{type:'string'},nextPrompt:{type:'string'},board:{type:'array',items:{type:'string'},maxItems:3}},required:['state','message','nextPrompt','board']}
  });
  if(!ai.ok){await completeAiRequest(aiClaim.eventId,null,'FAILED');return NextResponse.json(base);}
  await completeAiRequest(aiClaim.eventId,ai.usage,'COMPLETED');
  return NextResponse.json(ai.json);
 }catch(e){console.error('practice explain',e);return NextResponse.json({error:'AVORA could not explain that attempt just now. Please retry.'},{status:400});}
}
