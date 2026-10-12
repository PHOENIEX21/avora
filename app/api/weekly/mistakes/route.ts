import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {weeklyStudentContext,WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {weeklyMistakes} from '@/lib/weeklyMistakes';
export async function GET(request:Request){
 const session=await getSession();if(!session)return NextResponse.json({error:'Sign in required.'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access required.'},{status:403});
 const params=new URL(request.url).searchParams;
 const parsed=z.object({tab:z.enum(['TO_FIX','FIXED']),offset:z.coerce.number().int().min(0).max(100000)}).safeParse({tab:params.get('tab')??'TO_FIX',offset:params.get('offset')??0});
 if(!parsed.success)return NextResponse.json({error:'Invalid notebook page.'},{status:400});
 try{return NextResponse.json(await weeklyMistakes(await weeklyStudentContext(session.userId),parsed.data.tab,parsed.data.offset))}
 catch(error){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Mistakes unavailable.'},{status:error instanceof WeeklyWorkspaceError?error.status:503})}
}
