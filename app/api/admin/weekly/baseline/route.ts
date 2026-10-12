import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql} from '@/lib/db';
import {baselineCandidates,selectedBaselinePaper} from '@/lib/weeklyBaseline';
import {WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';

const scope=z.object({classLevel:z.enum(['JSS1','JSS2','JSS3']),term:z.coerce.number().int().min(1).max(3)});
const selection=scope.extend({questionIds:z.array(z.string().uuid()).length(20)});
function failure(error:unknown){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Starting-check review unavailable'},
 {status:error instanceof WeeklyWorkspaceError?error.status:503})}
export async function GET(request:Request){
 const session=await getSession();if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const params=scope.safeParse(Object.fromEntries(new URL(request.url).searchParams));
 if(!params.success)return NextResponse.json({error:'Invalid class or term'},{status:400});
 try{return NextResponse.json(await sql.begin(async tx=>{
  const [config]=await tx`SELECT baseline_question_ids,baseline_term FROM weekly_class_flags WHERE class_level=${params.data.classLevel}`;
  return {items:await baselineCandidates(tx,params.data.classLevel,params.data.term),
   selectedIds:Number(config?.baseline_term)===params.data.term?config?.baseline_question_ids||[]:[]};
 }))}catch(error){return failure(error)}
}
export async function PUT(request:Request){
 const session=await getSession();if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const data=selection.safeParse(await request.json().catch(()=>null));
 if(!data.success)return NextResponse.json({error:'Select twenty reviewed questions for a class and term'},{status:400});
 try{
  await sql.begin(async tx=>{
   const {classLevel,term,questionIds}=data.data;await selectedBaselinePaper(tx,classLevel,term,questionIds);
   await tx`INSERT INTO weekly_class_flags(class_level,baseline_question_ids,baseline_term,baseline_reviewed_by,baseline_reviewed_at)
    VALUES(${classLevel},${questionIds},${term},${session.userId},clock_timestamp())
    ON CONFLICT(class_level) DO UPDATE SET baseline_question_ids=EXCLUDED.baseline_question_ids,
     baseline_term=EXCLUDED.baseline_term,baseline_reviewed_by=EXCLUDED.baseline_reviewed_by,baseline_reviewed_at=EXCLUDED.baseline_reviewed_at`;
   await tx`INSERT INTO weekly_admin_audit_log(admin_id,action,target_type,target_id,details)
    VALUES(${session.userId},'BASELINE_PAPER_REVIEWED','CLASS',${classLevel},${JSON.stringify({term,questionIds})}::jsonb)`;
  });return NextResponse.json({saved:true});
 }catch(error){return failure(error)}
}
