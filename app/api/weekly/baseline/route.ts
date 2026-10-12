import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {weeklyStudentContext,WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {weeklyBaselineOverview,startWeeklyBaseline,updateWeeklyBaseline,postponeWeeklyBaseline} from '@/lib/weeklyBaseline';

const schema=z.discriminatedUnion('action',[
 z.object({action:z.literal('START')}),z.object({action:z.literal('POSTPONE')}),
 z.object({action:z.literal('ANSWER'),attemptId:z.string().uuid(),itemId:z.string().uuid(),answer:z.string().min(1).max(4000)}),
 z.object({action:z.literal('FINISH'),attemptId:z.string().uuid()})
]);
function failure(error:unknown){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Starting check unavailable'},
 {status:error instanceof WeeklyWorkspaceError?error.status:503})}
export async function GET(){
 const session=await getSession();if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access only'},{status:403});
 try{return NextResponse.json(await weeklyBaselineOverview(await weeklyStudentContext(session.userId)))}catch(error){return failure(error)}
}
export async function POST(request:Request){
 const session=await getSession();if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access only'},{status:403});
 const data=schema.safeParse(await request.json().catch(()=>null));if(!data.success)return NextResponse.json({error:'Invalid starting-check request'},{status:400});
 try{
  const context=await weeklyStudentContext(session.userId),action=data.data;
  if(action.action==='START')return NextResponse.json(await startWeeklyBaseline(context));
  if(action.action==='POSTPONE')return NextResponse.json(await postponeWeeklyBaseline(context));
  return NextResponse.json(await updateWeeklyBaseline(context,action.attemptId,
   action.action==='ANSWER'?action.itemId:undefined,action.action==='ANSWER'?action.answer:undefined));
 }catch(error){return failure(error)}
}
