import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {baselineMayPostpone,baselinePostponementDeadline} from '@/lib/weeklyBaselinePolicy';
import {weeklyStudentContext,WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';

function failure(error:unknown){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Starting check unavailable'},
 {status:error instanceof WeeklyWorkspaceError?error.status:503})}

export async function GET(){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access only'},{status:403});
 try{
  await weeklyStudentContext(session.userId);
  const [row]=await sql.begin(async tx=>{
   await tx`SELECT id FROM users WHERE id=${session.userId} FOR UPDATE`;
   return tx`INSERT INTO weekly_student_baseline_state(student_id,first_offered_at) VALUES(${session.userId},now())
    ON CONFLICT(student_id) DO UPDATE SET first_offered_at=CASE
     WHEN weekly_student_baseline_state.status IN ('COMPLETED','IN_PROGRESS') THEN weekly_student_baseline_state.first_offered_at
     ELSE COALESCE(weekly_student_baseline_state.first_offered_at,EXCLUDED.first_offered_at) END
    RETURNING status,postponed_until,first_offered_at,started_at,completed_at`;
  });
  return NextResponse.json({baseline:row});
 }catch(error){return failure(error)}
}

export async function POST(request:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access only'},{status:403});
 let data:unknown;
 try{data=await request.json()}catch{return NextResponse.json({error:'Invalid JSON'},{status:400})}
 if(!data||typeof data!=='object'||Array.isArray(data)||!('action' in data))
  return NextResponse.json({error:'Invalid request'},{status:400});
 const action=(data as {action:unknown}).action;
 if(action!=='POSTPONE'&&action!=='START')return NextResponse.json({error:'Unsupported action'},{status:400});
 try{
  await weeklyStudentContext(session.userId);
  if(action==='START'){
   const [state]=await withDbRetry(()=>sql`SELECT status FROM weekly_student_baseline_state WHERE student_id=${session.userId}`);
   if(state?.status==='COMPLETED')return NextResponse.json({status:'unchanged'});
   return NextResponse.json({error:'The reviewed starting check is not ready yet.'},{status:409});
  }
  const result=await sql.begin(async tx=>{
   const users=await tx`SELECT id FROM users WHERE id=${session.userId} FOR UPDATE`;
   if(!users.length)return 'missing';
   await tx`INSERT INTO weekly_student_baseline_state(student_id,first_offered_at)
    VALUES(${session.userId},now()) ON CONFLICT(student_id) DO UPDATE SET
     first_offered_at=CASE WHEN weekly_student_baseline_state.status IN ('COMPLETED','IN_PROGRESS')
      THEN weekly_student_baseline_state.first_offered_at
      ELSE COALESCE(weekly_student_baseline_state.first_offered_at,EXCLUDED.first_offered_at) END`;
   const [row]=await tx`SELECT status,first_offered_at,postponed_until
    FROM weekly_student_baseline_state WHERE student_id=${session.userId} FOR UPDATE`;
   if(row.status==='COMPLETED'||row.status==='IN_PROGRESS')return 'unchanged';
   if(action==='POSTPONE'){
    const firstOffered=new Date(row.first_offered_at);
    if(!baselineMayPostpone(firstOffered))return 'postpone_expired';
    const limit=baselinePostponementDeadline(firstOffered).getTime();
    await tx`UPDATE weekly_student_baseline_state SET status='POSTPONED',
     postponed_until=to_timestamp(${limit}/1000.0),updated_at=now()
     WHERE student_id=${session.userId}`;
    return 'postponed';
   }
   return 'unchanged';
  });
  if(result==='postpone_expired')return NextResponse.json({error:'The three-day postponement period has ended'},{status:409});
  if(result==='missing')return NextResponse.json({error:'Student unavailable'},{status:404});
  return NextResponse.json({status:result});
 }catch(error){return failure(error)}
}
