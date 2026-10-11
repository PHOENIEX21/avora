import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

export async function GET(){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access only'},{status:403});
 try{
  const [row]=await withDbRetry(()=>sql`SELECT status,postponed_until,first_offered_at,started_at,completed_at
   FROM weekly_student_baseline_state WHERE student_id=${session.userId}`);
  return NextResponse.json({baseline:row??{status:'NOT_STARTED'}});
 }catch{return NextResponse.json({error:'Starting check unavailable'},{status:503})}
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
  const result=await sql.begin(async tx=>{
   const users=await tx`SELECT id FROM users WHERE id=${session.userId} FOR UPDATE`;
   if(!users.length)return 'missing';
   await tx`INSERT INTO weekly_student_baseline_state(student_id,first_offered_at)
    VALUES(${session.userId},now()) ON CONFLICT(student_id) DO NOTHING`;
   const [row]=await tx`SELECT status,first_offered_at,postponed_until
    FROM weekly_student_baseline_state WHERE student_id=${session.userId} FOR UPDATE`;
   if(row.status==='COMPLETED'||row.status==='IN_PROGRESS')return 'unchanged';
   if(action==='POSTPONE'){
    const limit=new Date(row.first_offered_at).getTime()+3*24*60*60*1000;
    if(Date.now()>=limit)return 'postpone_expired';
    await tx`UPDATE weekly_student_baseline_state SET status='POSTPONED',
     postponed_until=to_timestamp(${limit}/1000.0),updated_at=now()
     WHERE student_id=${session.userId}`;
    return 'postponed';
   }
   await tx`UPDATE weekly_student_baseline_state SET status='IN_PROGRESS',
    started_at=now(),postponed_until=NULL,updated_at=now()
    WHERE student_id=${session.userId}`;
   return 'started';
  });
  if(result==='postpone_expired')return NextResponse.json({error:'The three-day postponement period has ended'},{status:409});
  if(result==='missing')return NextResponse.json({error:'Student unavailable'},{status:404});
  return NextResponse.json({status:result});
 }catch{return NextResponse.json({error:'Starting check update unavailable'},{status:503})}
}
