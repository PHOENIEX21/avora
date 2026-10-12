import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql} from '@/lib/db';
import {WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {z} from 'zod';
const schema=z.object({releaseAt:z.iso.datetime({offset:true}),closesAt:z.iso.datetime({offset:true}),resultsReleaseAt:z.iso.datetime({offset:true}).nullable().optional()});
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
 await requireAdmin();const {id}=await params,parsed=schema.safeParse(await request.json().catch(()=>null));
 if(!z.string().uuid().safeParse(id).success||!parsed.success)return NextResponse.json({error:'Use a valid opening, closing and results window.'},{status:400});
 const release=new Date(parsed.data.releaseAt),close=new Date(parsed.data.closesAt),results=new Date(parsed.data.resultsReleaseAt||parsed.data.closesAt);
 if(close<=release||results<close)return NextResponse.json({error:'Closing must follow opening; results must not precede closing.'},{status:400});
 try{
  const versionId=await sql.begin(async tx=>{
   const versions=await tx`SELECT b.*,v.id version_id,v.paper_snapshot FROM weekly_exam_blueprints b
    JOIN weekly_exam_versions v ON v.blueprint_id=b.id AND v.status='LOCKED' AND v.locked_at IS NOT NULL
    WHERE b.id=${id} AND b.approved_by IS NOT NULL AND b.approved_at IS NOT NULL FOR UPDATE OF b,v`;
   if(versions.length!==1||!Array.isArray(versions[0].paper_snapshot))throw new WeeklyWorkspaceError('An owner-sealed paper is required before scheduling.',409);
   const exam=versions[0];
   const [clock]=await tx`SELECT clock_timestamp()<${release.toISOString()}::timestamptz AS future,
    (${exam.release_at}::timestamptz IS NULL OR clock_timestamp()<${exam.release_at}::timestamptz) AS before_start`;
   const [started]=await tx`SELECT id FROM exam_sessions WHERE weekly_exam_blueprint_id=${id} LIMIT 1`;
   if(!['APPROVED','SCHEDULED'].includes(String(exam.status))||!clock.before_start||started)throw new WeeklyWorkspaceError('An opened exam or saved attempt cannot be rescheduled.',409);
   if(!clock.future)throw new WeeklyWorkspaceError('Schedule an opening time in the future.',400);
   await tx`UPDATE weekly_exam_blueprints SET status='SCHEDULED',release_at=${release.toISOString()},closes_at=${close.toISOString()},
    results_release_at=${results.toISOString()},scheduled_at=${release.toISOString()},updated_at=clock_timestamp() WHERE id=${id}`;
   return String(exam.version_id);
  });return NextResponse.json({ok:true,versionId});
 }catch(error){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Could not schedule the sealed paper.'},{status:error instanceof WeeklyWorkspaceError?error.status:503})}
}
