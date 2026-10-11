import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

const periods=['AFTER_SCHOOL','EVENING','AFTER_DINNER'] as const;
function validTime(value:unknown):value is string{
 return typeof value==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}
export async function GET(){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access only'},{status:403});
 try{
  const [row]=await withDbRetry(()=>sql`SELECT study_period,study_time::text AS study_time,timezone,parent_weekly_summary_enabled
   FROM weekly_student_study_settings WHERE student_id=${session.userId}`);
  return NextResponse.json({settings:row??null});
 }catch{return NextResponse.json({error:'Study settings unavailable'},{status:503})}
}
export async function PUT(request:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student access only'},{status:403});
 let body:unknown;
 try{body=await request.json()}catch{return NextResponse.json({error:'Invalid JSON'},{status:400})}
 if(!body||typeof body!=='object'||Array.isArray(body))return NextResponse.json({error:'Invalid settings'},{status:400});
 const data=body as Record<string,unknown>;
 if(!periods.includes(data.studyPeriod as typeof periods[number])||!validTime(data.studyTime))
  return NextResponse.json({error:'Select a study period and valid HH:MM time'},{status:400});
 if(typeof data.parentWeeklySummaryEnabled!=='boolean')
  return NextResponse.json({error:'Invalid summary preference'},{status:400});
 // Opting in here records a preference only; it does not authorize contacting a guardian.
 try{
  await withDbRetry(()=>sql`INSERT INTO weekly_student_study_settings
   (student_id,study_period,study_time,timezone,parent_weekly_summary_enabled)
   VALUES(${session.userId},${data.studyPeriod as string},${data.studyTime as string},'Africa/Lagos',${data.parentWeeklySummaryEnabled})
   ON CONFLICT(student_id) DO UPDATE SET
   study_period=EXCLUDED.study_period,study_time=EXCLUDED.study_time,
   parent_weekly_summary_enabled=EXCLUDED.parent_weekly_summary_enabled,updated_at=now()`);
  return NextResponse.json({saved:true});
 }catch{return NextResponse.json({error:'Unable to save study settings'},{status:503})}
}
