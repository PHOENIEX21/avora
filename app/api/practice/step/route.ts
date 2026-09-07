import {NextResponse} from 'next/server';
import {z} from 'zod';
import {sql,withDbRetry} from '@/lib/db';
import {getSession} from '@/lib/auth';
import {answerIsCorrect} from '@/lib/answers';
const schema=z.object({questionId:z.string().uuid(),stepIndex:z.number().int().min(0),answer:z.string().max(300)});
export async function POST(req:Request){const s=await getSession();if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});try{const d=schema.parse(await req.json());const [q]=await withDbRetry(()=>sql`SELECT interaction_steps FROM questions WHERE id=${d.questionId} AND status='PUBLISHED'`);const raw=Array.isArray(q?.interaction_steps)?q.interaction_steps:(typeof q?.interaction_steps==='string'?JSON.parse(q.interaction_steps):[]);const step=raw[d.stepIndex];if(!step)return NextResponse.json({error:'This guided step is unavailable.'},{status:404});const accepted=Array.isArray(step.answers)?step.answers:[step.answer];const correct=accepted.some((a:unknown)=>answerIsCorrect(d.answer,{value:a}));return NextResponse.json({correct,feedback:correct?(step.success||'Yes — that step keeps the reasoning valid.'):(step.feedback||'Not yet. Look at what this step is trying to change.'),hint:step.hint||null})}catch(e){console.error('practice step',e);return NextResponse.json({error:'AVORA could not check that step yet. Please retry.'},{status:503})}}
