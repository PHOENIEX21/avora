import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
const payload=z.object({objectiveId:z.string().uuid(),action:z.enum(['SUBMIT','APPROVE','PUBLISH','REJECT'])});
export async function POST(request:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin review required'},{status:403});
 const parsed=payload.safeParse(await request.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:'Invalid review request'},{status:400});
 const {objectiveId,action}=parsed.data;
 try{
  const [existing]=await withDbRetry(()=>sql`SELECT id,approval_status,reviewed_by,day_index FROM weekly_curriculum_objectives WHERE id=${objectiveId}`);
  if(!existing)return NextResponse.json({error:'Objective not found'},{status:404});
  const current=String(existing.approval_status);
  const transitions:Record<string,string>={SUBMIT:'DRAFT',APPROVE:'IN_REVIEW',PUBLISH:'APPROVED',REJECT:'IN_REVIEW'};
  if(current!==transitions[action])return NextResponse.json({error:'Invalid review transition'},{status:409});
  if(action==='PUBLISH'&&(!existing.reviewed_by||!existing.day_index))
   return NextResponse.json({error:'A reviewed objective and weekday are required'},{status:409});
  const result=await withDbRetry(()=>sql`
   UPDATE weekly_curriculum_objectives SET
    approval_status=${action==='SUBMIT'?'IN_REVIEW':action==='APPROVE'?'APPROVED':action==='PUBLISH'?'PUBLISHED':'DRAFT'},
    reviewed_by=CASE WHEN ${action==='APPROVE'} THEN ${session.userId}::uuid WHEN ${action==='REJECT'} THEN NULL ELSE reviewed_by END,
    published_by=CASE WHEN ${action==='PUBLISH'} THEN ${session.userId}::uuid ELSE published_by END,
    published_at=CASE WHEN ${action==='PUBLISH'} THEN now() ELSE published_at END
   WHERE id=${objectiveId} AND approval_status=${current} RETURNING id,approval_status`);
  return NextResponse.json({ok:result.length===1,objective:result[0]??null});
 }catch{return NextResponse.json({error:'Review failed; confirm the Phase 1 migration is installed'},{status:503})}
}
