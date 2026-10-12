import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {learningAccessDenial} from '@/lib/apiAccess';
import {startOfficialWeeklyExam} from '@/lib/weeklyExamSession';
import {WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {z} from 'zod';
export async function POST(_request:Request,{params}:{params:Promise<{id:string}>}){
 const session=await getSession();if(!session)return NextResponse.json({error:'Sign in required.'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access required.'},{status:403});
 const denied=await learningAccessDenial(session);if(denied)return denied;
 const {id}=await params;if(!z.string().uuid().safeParse(id).success)return NextResponse.json({error:'Invalid weekly ID.'},{status:400});
 try{return NextResponse.json(await startOfficialWeeklyExam(session.userId,id))}
 catch(error){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Weekly exam unavailable. Retry.'},{status:error instanceof WeeklyWorkspaceError?error.status:503})}
}
