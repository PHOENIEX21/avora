import {NextResponse} from 'next/server';
import {timingSafeEqual} from 'node:crypto';
import {sql,withDbRetry} from '@/lib/db';
import {syncWeeklyOutcome} from '@/lib/weeklyOutcome';
import {expireOfficialWeeklyExams} from '@/lib/weeklyExamSession';
export const maxDuration=60;
export async function POST(request:Request){
 const secret=process.env.CRON_SECRET,received=request.headers.get('authorization')||'';
 if(!secret||Buffer.byteLength(received)!==Buffer.byteLength('Bearer '+secret)||!timingSafeEqual(Buffer.from(received),Buffer.from('Bearer '+secret)))return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const {expired}=await expireOfficialWeeklyExams();
  const rows=await withDbRetry(()=>sql`SELECT es.id FROM exam_sessions es JOIN weekly_exam_blueprints b ON b.id=es.weekly_exam_blueprint_id
   WHERE es.weekly_outcome_sync_state='PENDING' AND es.status='COMPLETED' AND es.marking_status IN ('NOT_REQUIRED','COMPLETED')
    AND b.closes_at IS NOT NULL AND b.results_release_at IS NOT NULL AND clock_timestamp()>=b.closes_at AND clock_timestamp()>=b.results_release_at
   ORDER BY es.submitted_at,es.id LIMIT 2`);
  let synced=0;for(const row of rows)if((await syncWeeklyOutcome(String(row.id))).synced)synced++;
  return NextResponse.json({ok:true,expired,synced});
 }catch{return NextResponse.json({error:'Outcome processing is incomplete. Pending sessions can be retried.'},{status:503})}
}
