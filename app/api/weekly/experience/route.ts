import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {isWeeklyLearningEnabled} from '@/lib/weeklyLearning';

// Resolve the class from the authenticated student profile, never from a query string.
export async function GET(){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student account required'},{status:403});
 try{
  const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${session.userId} LIMIT 1`);
  const classLevel=String(profile?.class_level??'').toUpperCase();
  if(!['JSS1','JSS2','JSS3'].includes(classLevel))return NextResponse.json({experience:'legacy',reason:'CLASS_UNSET'});
  if(!(await isWeeklyLearningEnabled(classLevel)))return NextResponse.json({experience:'legacy',classLevel,reason:'NOT_RELEASED'});
  const [week]=await withDbRetry(()=>sql`SELECT term,current_week FROM weekly_class_week_state WHERE class_level=${classLevel} LIMIT 1`);
  if(!week)return NextResponse.json({experience:'legacy',classLevel,reason:'WEEK_UNSET'});
  return NextResponse.json({experience:'weekly_candidate',classLevel,term:Number(week.term),week:Number(week.current_week),requiresParentConsentCheck:true});
 }catch{return NextResponse.json({experience:'legacy',reason:'UNAVAILABLE'});}
}
