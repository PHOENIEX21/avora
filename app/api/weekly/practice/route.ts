import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql} from '@/lib/db';
import {answerIsCorrect} from '@/lib/answers';
import {weeklyStudentContext,WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {startWeeklyPractice,weeklyPracticeSession,finishWeeklyPractice} from '@/lib/weeklyPractice';
import type {PracticeItem} from '@/lib/weeklyWorkspacePolicy';
import {startWeeklyRevisit} from '@/lib/weeklyRevisit';

const requestSchema=z.discriminatedUnion('action',[
 z.object({action:z.literal('START'),objectiveId:z.string().uuid()}),
 z.object({action:z.literal('START_REVISIT')}),
 z.object({action:z.literal('ANSWER'),sessionId:z.string().uuid(),itemId:z.string().uuid(),answer:z.string().min(1).max(4000),confidence:z.enum(['GUESS','FAIRLY_SURE','SURE']).nullable().optional()}),
 z.object({action:z.literal('REPORT'),sessionId:z.string().uuid(),itemId:z.string().uuid(),reason:z.string().trim().min(5).max(500)}),
 z.object({action:z.literal('FINISH'),sessionId:z.string().uuid()})
]);
function failure(error:unknown){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Practice unavailable.'},
 {status:error instanceof WeeklyWorkspaceError?error.status:503})}
export async function GET(request:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required.'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access required.'},{status:403});
 const id=new URL(request.url).searchParams.get('sessionId');
 if(!z.string().uuid().safeParse(id).success)return NextResponse.json({error:'Invalid practice session.'},{status:400});
 try{return NextResponse.json(await weeklyPracticeSession(await weeklyStudentContext(session.userId),id!))}catch(error){return failure(error)}
}
export async function POST(request:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required.'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access required.'},{status:403});
 const parsed=requestSchema.safeParse(await request.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:'Invalid practice request.'},{status:400});
 try{
  const context=await weeklyStudentContext(session.userId),data=parsed.data;
  if(data.action==='START_REVISIT'){
   const id=await startWeeklyRevisit(context);
   return NextResponse.json(id?await weeklyPracticeSession(context,id):{id:null,submitted:false,questions:[]});
  }
  if(data.action==='START'){
   const id=await startWeeklyPractice(context,data.objectiveId);
   return NextResponse.json(await weeklyPracticeSession(context,id));
  }
  if(data.action==='FINISH')return NextResponse.json(await finishWeeklyPractice(context,data.sessionId));
  const visible=await weeklyPracticeSession(context,data.sessionId);
  if(data.action==='REPORT'){
   if(!visible.questions.some(q=>q.id===data.itemId))throw new WeeklyWorkspaceError('Question unavailable.',404);
   await sql.begin(async tx=>{
    await tx`SELECT id FROM users WHERE id=${session.userId} FOR UPDATE`;
    const [prior]=await tx`SELECT id FROM weekly_question_reports WHERE student_id=${session.userId} AND item_id=${data.itemId} AND status='PENDING'`;
    if(!prior)await tx`INSERT INTO weekly_question_reports(student_id,item_id,reason) VALUES(${session.userId},${data.itemId},${data.reason})`;
   });
   return NextResponse.json({reported:true});
  }
  const result=await sql.begin(async tx=>{
   const [row]=await tx`SELECT item_snapshot,submitted_at FROM weekly_cbt_sessions
    WHERE id=${data.sessionId} AND student_id=${session.userId} FOR UPDATE`;
   if(!row||row.submitted_at)throw new WeeklyWorkspaceError('Practice already finished or unavailable.',409);
   const item=(row.item_snapshot as PracticeItem[]).find(x=>x.id===data.itemId);
   if(!item||!item.options.includes(data.answer))throw new WeeklyWorkspaceError('Choose an option from this question.',400);
   const [prior]=await tx`SELECT answer,is_correct FROM weekly_cbt_answers WHERE session_id=${data.sessionId} AND item_id=${data.itemId}`;
   if(prior&&prior.answer!==data.answer)throw new WeeklyWorkspaceError('This answer has already been checked.',409);
   const correct=prior?Boolean(prior.is_correct):answerIsCorrect(data.answer,item.answer,item.options);
   if(!prior)await tx`INSERT INTO weekly_cbt_answers(session_id,item_id,answer,confidence,is_correct)
    VALUES(${data.sessionId},${data.itemId},${data.answer},${data.confidence??null},${correct})`;
   return {correct,correctAnswer:item.answer,explanation:item.explanation};
  });
  return NextResponse.json(result);
 }catch(error){return failure(error)}
}
