import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {aiStructured} from '@/lib/aiGateway';
import {checkUnderstandingGate,understandingGateMessage} from '@/lib/understandingGuard';
import {z} from 'zod';

const requestSchema=z.object({
 subject:z.string().min(1).max(80),
 topic:z.string().min(1).max(240),
 classLevel:z.string().min(1).max(40),
 question:z.string().min(1).max(1000),
 answer:z.string().min(1).max(1000),
});

const resultSchema={
 type:'object',
 properties:{
  correct:{type:'boolean'},
  feedback:{type:'string'},
  hint:{type:'string'},
  explanation:{type:'string'},
 },
 required:['correct','feedback','hint','explanation'],
};

export async function POST(req:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Please sign in again.'},{status:401});
 try{
  const input=requestSchema.parse(await req.json());

  const gate=checkUnderstandingGate(input.answer);
  if(gate.blocked){
   return NextResponse.json({
    correct:false,
    feedback:understandingGateMessage(gate.reason),
    hint:'Answer the exact question asked, showing your reasoning or working — not just a one-word reply.',
    explanation:'',
   });
  }

  const result=await aiStructured<{correct:boolean;feedback:string;hint:string;explanation:string}>({
   name:'avora_probe_mark',
   schema:resultSchema,
   instructions:'You are marking a short diagnostic answer for a Nigerian secondary-school learner. Read every command in the diagnostic question. Mark correct only when the learner answers every requested part and the mathematics is valid. A partial answer, a list of values without the requested table or explanation, or an answer that skips a requested graph/shape/reason must be marked false. An answer that only expresses agreement or confidence ("I understand", "yes", "that makes sense") without doing the requested work is not an answer and must be marked false. Be generous about wording and equivalent mathematical notation, but never praise an incomplete or incorrect answer. Return concise feedback, one useful hint, and a short explanation. Do not reveal that an AI graded the answer.',
   input:`Class: ${input.classLevel}\nSubject: ${input.subject}\nTopic: ${input.topic}\nDiagnostic question: ${input.question}\nLearner answer: ${input.answer}`,
  });
  if(!result.ok)return NextResponse.json({error:'AVORA could not mark this diagnostic answer yet. Please retry.'},{status:503});
  return NextResponse.json(result.json);
 }catch(error){
  console.error('tutor probe',error);
  return NextResponse.json({error:'AVORA could not mark this diagnostic answer yet. Please retry.'},{status:503});
 }
}
