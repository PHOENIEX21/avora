import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';
const scope=z.object({classLevel:z.enum(['JSS1','JSS2','JSS3'])});
export async function GET(request:Request){
 const session=await getSession();if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const parsed=scope.safeParse(Object.fromEntries(new URL(request.url).searchParams));if(!parsed.success)return NextResponse.json({error:'Invalid class'},{status:400});
 try{
  const rows=await withDbRetry(()=>sql`SELECT b.id attempt_id,b.student_id,u.full_name,b.class_level,b.started_at,b.submitted_at,b.status,
   result->>'subject' subject,result->>'objectiveText' objective_text,(result->>'correct')::int baseline_correct,(result->>'total')::int baseline_total,
   COALESCE(practice.total,0)::int practice_total,COALESCE(practice.correct,0)::int practice_correct
   FROM weekly_baseline_attempts b JOIN users u ON u.id=b.student_id
   CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(b.result_data)='array' THEN b.result_data ELSE '[]'::jsonb END) result
   LEFT JOIN LATERAL (
    SELECT count(*) total,count(*) FILTER(WHERE latest.is_correct) correct FROM (
     SELECT DISTINCT ON(a.item_id) a.is_correct FROM weekly_cbt_answers a JOIN weekly_cbt_sessions s ON s.id=a.session_id
     WHERE s.student_id=b.student_id AND s.mode='PRACTICE' AND s.submitted_at>b.submitted_at
      AND (s.objective_id::text=result->>'objectiveId' OR (s.source='REVISIT' AND s.item_snapshot @>
       jsonb_build_array(jsonb_build_object('id',a.item_id::text,'objectiveId',result->>'objectiveId'))))
     ORDER BY a.item_id,s.submitted_at DESC,s.id DESC
    ) latest
   ) practice ON true
   WHERE b.class_level=${parsed.data.classLevel} AND b.status IN ('COMPLETED','EXPIRED')
   ORDER BY b.submitted_at DESC,b.id,result->>'subject' LIMIT 200`);
  return NextResponse.json({rows});
 }catch{return NextResponse.json({error:'Baseline comparison unavailable'},{status:503})}
}
