import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {requirePremiumFeature} from '@/lib/premiumAccess';
import {getCurriculumTutorPlan} from '@/lib/curriculumTutor';
import {aiStructured,configuredAiProvider} from '@/lib/aiGateway';
import {checkUnderstandingGate,understandingGateMessage} from '@/lib/understandingGuard';

const schema=z.object({
 subject:z.string().min(2).max(80),
 topic:z.string().min(2).max(120),
 classLevel:z.string().min(2).max(40),
 exam:z.string().min(2).max(40),
 unitIndex:z.number().int().min(0).max(50),
 question:z.string().min(1).max(1200),
 answer:z.string().min(1).max(2000),
 board:z.array(z.string().max(500)).max(20).default([]),
});

const resultSchema={
 type:'object',
 properties:{
  correct:{type:'boolean'},
  verdict:{type:'string'},
  feedback:{type:'string'},
  correction:{type:'string'},
  solution:{type:'string'},
  board:{type:'array',items:{type:'string'}},
 },
 required:['correct','verdict','feedback','correction','solution','board'],
};

export async function POST(req:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Please sign in again.'},{status:401});
 const premiumDenied=await requirePremiumFeature(session,'Interactive AVORA Tutor');
 if(premiumDenied)return premiumDenied;
 try{
  const input=schema.parse(await req.json());
  const plan=getCurriculumTutorPlan(input.classLevel,input.subject,input.topic);
  const unit=plan?.units[input.unitIndex]||plan?.units[0];
  if(!unit)return NextResponse.json({error:'Lesson checkpoint not found.'},{status:404});

  // Code-level gate, runs before any AI call: a bare "yes"/"I understand" can never
  // pass a checkpoint by itself, regardless of how the AI grader would have judged it.
  const gate=checkUnderstandingGate(input.answer);
  if(gate.blocked){
   return NextResponse.json({
    correct:false,
    verdict:'Not yet.',
    feedback:understandingGateMessage(gate.reason),
    correction:'Reread the question, then answer it directly: explain the idea in your own words or show the working it is asking for.',
    solution:'',
    board:[] as string[],
   });
  }

  if(!configuredAiProvider())return NextResponse.json({error:'AVORA marking is temporarily unavailable. Please retry when the AI teacher is connected.'},{status:503});
  const result=await aiStructured<{
   correct:boolean;verdict:string;feedback:string;correction:string;solution:string;board:string[];
  }>({
   name:'avora_checkpoint_mark',
   instructions:`You are marking one learner checkpoint as a rigorous teacher. You MUST evaluate the learner's exact answer against the exact question. Return correct=false for an incorrect, incomplete, irrelevant, or non-responsive answer. Return correct=true only when every requested part is answered correctly with valid reasoning. Agreement, confidence or enthusiasm is not evidence of understanding: an answer that merely restates the question, asserts the rule was understood, or otherwise avoids doing the requested reasoning/working must be marked correct=false, however fluent it sounds. Do not respond with a generic teaching prompt. Always give a direct verdict first, then say what the learner did correctly, identify the first missing or wrong step, and provide AVORA's own complete worked solution to the question. If the learner's answer is correct, still provide the complete solution as verification. Keep each field concise and age-appropriate. The solution must answer this exact question, not a similar example.`,
   input:`Class: ${input.classLevel}
Subject: ${input.subject}
Topic: ${input.topic}
Lesson unit: ${unit.title}
Lesson explanation: ${unit.explain}
Lesson example: ${unit.example}
Question: ${input.question}
Learner answer/working: ${input.answer}
Board context: ${input.board.join(' | ')}`,
   schema:resultSchema,
   maxOutputTokens:700,
  });
  if(!result.ok)return NextResponse.json({error:'AVORA could not mark this checkpoint yet. Please retry.'},{status:503});
  return NextResponse.json(result.json);
 }catch(error){
  console.error('tutor checkpoint',error);
  return NextResponse.json({error:'AVORA could not mark this checkpoint yet. Please retry.'},{status:503});
 }
}
