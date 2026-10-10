import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

const schema=z.object({
 classLevel:z.enum(['JSS1','JSS2','JSS3']),
 enabled:z.boolean(),
 term:z.number().int().min(1).max(3).nullable().optional(),
 week:z.number().int().min(1).max(16).nullable().optional()
});
export async function GET(){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 try{
  const flags=await withDbRetry(()=>sql`SELECT class_level,enabled,pilot_term,pilot_week,updated_at FROM weekly_class_flags ORDER BY class_level`);
  return NextResponse.json({flags});
 }catch{return NextResponse.json({error:'Weekly schema not installed'},{status:503})}
}
export async function POST(request:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const parsed=schema.safeParse(await request.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:'Invalid class flag settings'},{status:400});
 const {classLevel,enabled,term,week}=parsed.data;
 if(enabled&&(!term||!week))return NextResponse.json({error:'Select a pilot term and week'},{status:400});
 try{
  if(enabled){
   const [ready]=await withDbRetry(()=>sql`
    SELECT COUNT(*)::int AS total, COUNT(DISTINCT day_index)::int AS days
    FROM weekly_curriculum_objectives
    WHERE class_level=${classLevel} AND term=${term!} AND week_number=${week!}
      AND approval_status='PUBLISHED' AND published_at IS NOT NULL AND day_index BETWEEN 1 AND 5`);
   if(Number(ready?.days)!==5||Number(ready?.total)<5)
    return NextResponse.json({error:'Pilot activation requires approved curriculum objectives across all five weekdays'},{status:409});
  }
  if(enabled){const [state]=await withDbRetry(()=>sql`SELECT term,current_week FROM weekly_class_week_state WHERE class_level=${classLevel}`);
   if(!state||Number(state.term)!==term||Number(state.current_week)!==week)return NextResponse.json({error:'Release the matching class week before enabling the pilot'},{status:409});}
  await withDbRetry(()=>sql`
   INSERT INTO weekly_class_flags(class_level,enabled,pilot_term,pilot_week,updated_by,updated_at)
   VALUES(${classLevel},${enabled},${term??null},${week??null},${session.userId},now())
   ON CONFLICT(class_level) DO UPDATE SET
    enabled=EXCLUDED.enabled,pilot_term=EXCLUDED.pilot_term,pilot_week=EXCLUDED.pilot_week,
    updated_by=EXCLUDED.updated_by,updated_at=now()`);
  return NextResponse.json({ok:true,classLevel,enabled});
 }catch{return NextResponse.json({error:'Could not update the weekly pilot flag'},{status:503})}
}
