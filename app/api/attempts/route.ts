import { NextResponse } from "next/server";
import { z } from "zod";
import { sql,withDbRetry } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { nextMasteryScore } from "@/lib/mastery";
import { answerIsCorrect, displayCorrectAnswer } from "@/lib/answers";

const schema=z.object({questionId:z.string().uuid(),answer:z.string().max(500),mode:z.enum(['PRACTICE','DIAGNOSTIC']).default('PRACTICE'),hintCount:z.number().int().min(0).max(9).default(0)});
function diagnosis(actual:string,expected:string,correct:boolean){if(correct)return 'You reached the correct result independently. AVORA will use another question to confirm the skill.';const a=Number(actual.replace(/[^0-9.-]/g,'')),e=Number(expected.replace(/[^0-9.-]/g,''));if(Number.isFinite(a)&&Number.isFinite(e)&&Math.abs(a)===Math.abs(e))return 'Your value is close, but the sign changed. Check where a negative term was moved or combined.';return 'That answer does not match yet. Stay on this skill and locate the first step that changed.'}
function transient(e:any){return /CONNECT_TIMEOUT|ETIMEDOUT|ECONNRESET|ECONNREFUSED|connection/i.test(String(e?.code||'')+' '+String(e?.message||''))}
export async function POST(req:Request){
 const session=await getSession(); if(!session)return NextResponse.json({error:'Sign in to save mastery progress.'},{status:401});
 try{
  const data=schema.parse(await req.json());
  const [q]=await withDbRetry(()=>sql`SELECT id,skill_id,correct_answer,options,explanation,difficulty FROM questions WHERE id=${data.questionId} AND status='PUBLISHED'`);
  if(!q)return NextResponse.json({error:'Question not found.'},{status:404});
  const expected=displayCorrectAnswer(q.correct_answer),correct=answerIsCorrect(data.answer,q.correct_answer,q.options),diag=diagnosis(data.answer,expected,correct);
  await withDbRetry(()=>sql`INSERT INTO attempts(student_id,question_id,answer,is_correct,diagnosis,mode,hint_count) VALUES(${session.userId},${q.id},${sql.json({value:data.answer})},${correct},${diag},${data.mode},${data.hintCount})`);
  const [m]=await withDbRetry(()=>sql`SELECT score,evidence_count FROM mastery WHERE student_id=${session.userId} AND skill_id=${q.skill_id}`);
  const current=m?Number(m.score):0,count=m?Number(m.evidence_count):0;let score=nextMasteryScore(current,correct,count);if(data.hintCount>0&&correct)score=Math.max(current,score-.04*data.hintCount);
  await withDbRetry(()=>sql`INSERT INTO mastery(student_id,skill_id,score,evidence_count,last_practiced_at) VALUES(${session.userId},${q.skill_id},${score},1,now()) ON CONFLICT(student_id,skill_id) DO UPDATE SET score=${score},evidence_count=mastery.evidence_count+1,last_practiced_at=now(),updated_at=now()`);
  const [e]=await withDbRetry(()=>sql`SELECT COUNT(*)::int n,COUNT(*) FILTER(WHERE is_correct)::int correct FROM attempts a JOIN questions qq ON qq.id=a.question_id WHERE a.student_id=${session.userId} AND a.mode=${data.mode} AND qq.skill_id=${q.skill_id}`);
  const evidenceCount=Number(e?.n||0),accuracy=evidenceCount?Number(e?.correct||0)/evidenceCount:0;
  return NextResponse.json({correct,explanation:q.explanation,diagnosis:diag,mastery:score,evidenceCount,accuracy});
 }catch(e:any){console.error('attempt save',e);if(e instanceof z.ZodError)return NextResponse.json({error:'That answer could not be read. Please try again.'},{status:400});return NextResponse.json({error:transient(e)?'AVORA briefly lost the database connection. Your answer was not counted twice — tap Check again.':'Could not record this attempt. Please retry.'},{status:503})}
}
