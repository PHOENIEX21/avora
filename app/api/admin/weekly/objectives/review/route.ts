import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {objectiveReviewTransition} from '@/lib/weeklyObjectiveReviewPolicy';
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
  const decision=objectiveReviewTransition(action,current,existing.reviewed_by,Number(existing.day_index));
  if(!decision.ok)return NextResponse.json({error:decision.reason},{status:409});
  // The ZIP requires at least six reviewed items per objective and an assembled weekly exam.
  // Fail closed: the admin cannot publish a bare objective or bypass the assessment bank.
  if(action==='PUBLISH'){
   const [ready]=await withDbRetry(()=>sql`
    SELECT
     (SELECT count(*)::int FROM weekly_items i WHERE i.objective_id=${objectiveId} AND i.status='APPROVED' AND i.reviewer_id IS NOT NULL AND i.answer_key IS NOT NULL) AS approved_items,
     (SELECT count(*)::int FROM weekly_exam_items ei JOIN weekly_exams e ON e.id=ei.exam_id
      JOIN weekly_curriculum_objectives o ON o.class_level=e.class_level AND o.subject_name=e.subject_name AND o.term=e.term AND o.week_number=e.week_number
      WHERE o.id=${objectiveId} AND e.status IN ('REVIEWED','SCHEDULED')) AS assembled_exam_items`);
   if(Number(ready?.approved_items)<6 || Number(ready?.assembled_exam_items)<1)
    return NextResponse.json({error:'Publication requires at least six reviewed questions for this objective and an assembled reviewed weekly exam',approvedItems:Number(ready?.approved_items??0),assembledExamItems:Number(ready?.assembled_exam_items??0)},{status:409});
  }
  const result=await withDbRetry(()=>sql`
   UPDATE weekly_curriculum_objectives SET
    approval_status=${decision.next},
    reviewed_by=CASE WHEN ${action==='APPROVE'} THEN ${session.userId}::uuid WHEN ${action==='REJECT'} THEN NULL ELSE reviewed_by END,
    published_by=CASE WHEN ${action==='PUBLISH'} THEN ${session.userId}::uuid ELSE published_by END,
    published_at=CASE WHEN ${action==='PUBLISH'} THEN now() ELSE published_at END
   WHERE id=${objectiveId} AND approval_status=${current} RETURNING id,approval_status`);
  return NextResponse.json({ok:result.length===1,objective:result[0]??null});
 }catch{return NextResponse.json({error:'Review failed; confirm the Phase 1 migration is installed'},{status:503})}
}
