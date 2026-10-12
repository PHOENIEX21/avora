import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql} from '@/lib/db';
import {weeklyStudentContext,weeklyObjective,WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';

const schema=z.object({objectiveId:z.string().uuid(),source:z.enum(['TEXTBOOK','LESSON']),action:z.enum(['START','COMPLETE'])});
export async function POST(request:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required.'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access required.'},{status:403});
 const data=await request.json().catch(()=>null),parsed=schema.safeParse(data);
 if(!parsed.success)return NextResponse.json({error:'Invalid study update.'},{status:400});
 try{
  const context=await weeklyStudentContext(session.userId);
  const objective=await weeklyObjective(context,parsed.data.objectiveId);
  if(Number(objective.term)!==context.term||Number(objective.week_number)!==context.week)
   throw new WeeklyWorkspaceError('Previous weeks are read-only.',409);
  const {source,action,objectiveId}=parsed.data;
  const [study]=await sql`INSERT INTO weekly_objective_study(student_id,objective_id,study_source,studied_at)
   VALUES(${session.userId},${objectiveId},${source},${action==='COMPLETE'?new Date():null})
   ON CONFLICT(student_id,objective_id) DO UPDATE SET study_source=EXCLUDED.study_source,
    studied_at=COALESCE(weekly_objective_study.studied_at,EXCLUDED.studied_at),updated_at=now()
   RETURNING study_source,started_at,studied_at`;
  return NextResponse.json({study});
 }catch(error){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Study update unavailable.'},
  {status:error instanceof WeeklyWorkspaceError?error.status:503})}
}
