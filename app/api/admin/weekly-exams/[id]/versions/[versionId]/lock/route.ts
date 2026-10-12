import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql} from '@/lib/db';
import {reviewedOfficialVersion} from '@/lib/weeklyExamSession';
import {WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {z} from 'zod';
export async function POST(_request:Request,{params}:{params:Promise<{id:string;versionId:string}>}){
 const admin=await requireAdmin(),{id,versionId}=await params;
 if(!z.string().uuid().safeParse(id).success||!z.string().uuid().safeParse(versionId).success)return NextResponse.json({error:'Invalid paper version.'},{status:400});
 try{
  await sql.begin(async tx=>{
   const [version]=await tx`SELECT v.*,b.question_count,b.class_level,b.term,b.week_number FROM weekly_exam_versions v
    JOIN weekly_exam_blueprints b ON b.id=v.blueprint_id WHERE v.id=${versionId} AND b.id=${id} FOR UPDATE OF b,v`;
   if(!version)throw new WeeklyWorkspaceError('Paper version not found.',404);
   if(!['DRAFT','IN_REVIEW'].includes(String(version.status)))throw new WeeklyWorkspaceError('Only a review-stage paper can be sealed.',409);
   const [started]=await tx`SELECT id FROM exam_sessions WHERE weekly_exam_blueprint_id=${id} LIMIT 1`;
   if(started)throw new WeeklyWorkspaceError('A paper with saved attempts cannot be replaced. Keep the original assessment.',409);
   const paper=await reviewedOfficialVersion(tx,{versionId,classLevel:String(version.class_level),term:Number(version.term),week:Number(version.week_number),count:Number(version.question_count)});
   await tx`UPDATE questions SET status='PUBLISHED',quality_status='REVIEWED' WHERE id=ANY(${paper.map(q=>q.id)}::uuid[])`;
   await tx`UPDATE weekly_exam_versions SET status='LOCKED',paper_snapshot=${JSON.stringify(paper)}::jsonb,locked_at=clock_timestamp() WHERE id=${versionId}`;
   await tx`UPDATE weekly_exam_blueprints SET status='APPROVED',approved_by=${admin.userId},approved_at=clock_timestamp(),updated_at=clock_timestamp() WHERE id=${id}`;
   await tx`UPDATE weekly_exam_versions SET status='SUPERSEDED' WHERE blueprint_id=${id} AND id<>${versionId} AND status IN ('DRAFT','IN_REVIEW','APPROVED','LOCKED')`;
  });return NextResponse.json({ok:true});
 }catch(error){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Could not seal reviewed paper.'},{status:error instanceof WeeklyWorkspaceError?error.status:503})}
}
