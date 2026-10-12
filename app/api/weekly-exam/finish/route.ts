import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {learningAccessDenial} from '@/lib/apiAccess';
import {finishOfficialWeeklyExam} from '@/lib/weeklyExamSession';
import {WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {z} from 'zod';
const schema=z.object({sessionId:z.string().uuid()});
export async function POST(request:Request){
 const session=await getSession();if(!session)return NextResponse.json({error:'Sign in required.'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access required.'},{status:403});
 const denied=await learningAccessDenial(session);if(denied)return denied;
 const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:'Invalid weekly request.'},{status:400});
 try{return NextResponse.json(await finishOfficialWeeklyExam(session.userId,parsed.data.sessionId))}
 catch(error){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Weekly exam unavailable. Retry.'},{status:error instanceof WeeklyWorkspaceError?error.status:503})}
}
