import {learningAccessDenial} from '@/lib/apiAccess';
import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
export async function POST(){
 const s=await getSession();
 if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});
 const accessDenied=await learningAccessDenial(s);if(accessDenied)return accessDenied;
 try{
  const [r]=await withDbRetry(()=>sql`SELECT COUNT(*)::int AS total,COUNT(*) FILTER(WHERE is_correct)::int AS correct FROM attempts WHERE student_id=${s.userId} AND mode='DIAGNOSTIC'`);
  const total=Number(r?.total||0),correct=Number(r?.correct||0);
  if(total<1)return NextResponse.json({error:'AVORA needs at least one diagnostic answer before creating your direction.'},{status:409});
  const score=correct/total;
  const updated=await withDbRetry(()=>sql`UPDATE student_profiles SET diagnostic_completed=true,diagnostic_completed_at=now(),diagnostic_score=${score},updated_at=now() WHERE user_id=${s.userId} RETURNING diagnostic_completed,diagnostic_score`);
  if(!updated.length) return NextResponse.json({error:'Your learner profile could not be found.'},{status:404});
  return NextResponse.json({ok:true,score,total,correct});
 }catch(e){console.error('diagnostic complete',e);return NextResponse.json({error:'AVORA could not save your diagnostic yet. Your answers are safe — please retry.'},{status:503})}
}
