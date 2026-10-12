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
  const [row]=await withDbRetry(()=>sql`SELECT study_period,to_char(study_time,'HH24:MI') AS study_time,timezone,parent_weekly_summary_enabled
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
 const parentWeeklySummaryEnabled=data.parentWeeklySummaryEnabled;
 if(parentWeeklySummaryEnabled!==undefined&&typeof parentWeeklySummaryEnabled!=='boolean')
  return NextResponse.json({error:'Invalid summary preference'},{status:400});
 // Guardian notification preferences may only change through verified guardian access.
 try{
  const result=await sql.begin(async tx=>{
   await tx`SELECT id FROM users WHERE id=${session.userId} FOR UPDATE`;
   const [existing]=await tx`SELECT parent_weekly_summary_enabled FROM weekly_student_study_settings WHERE student_id=${session.userId} FOR UPDATE`;
   if(parentWeeklySummaryEnabled!==undefined&&parentWeeklySummaryEnabled!==(existing?.parent_weekly_summary_enabled??false))return 'guardian_only';
   await tx`INSERT INTO weekly_student_study_settings(student_id,study_period,study_time,timezone)
    VALUES(${session.userId},${data.studyPeriod as string},${data.studyTime as string},'Africa/Lagos')
    ON CONFLICT(student_id) DO UPDATE SET study_period=EXCLUDED.study_period,study_time=EXCLUDED.study_time,
     timezone=EXCLUDED.timezone,updated_at=now()`;
   return 'saved';
  });
  if(result==='guardian_only')return NextResponse.json({error:'Guardian access required to change summary preferences'},{status:403});
  return NextResponse.json({saved:true});
 }catch{return NextResponse.json({error:'Unable to save study settings'},{status:503})}
}
