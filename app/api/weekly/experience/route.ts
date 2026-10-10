import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {isWeeklyLearningEnabled} from '@/lib/weeklyLearning';

/**
 * Existing students retain their user ID, credentials and learning history.
 * This is an eligibility check, NOT a bypass of guardian verification or a redirect.
 * A released class does not imply that a particular student has completed onboarding.
 */
export async function GET(){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student account required'},{status:403});
 try{
  const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${session.userId} LIMIT 1`);
  const classLevel=String(profile?.class_level??'').toUpperCase();
  if(!['JSS1','JSS2','JSS3'].includes(classLevel))
   return NextResponse.json({experience:'legacy',reason:'CLASS_UNSET'});
  if(!(await isWeeklyLearningEnabled(classLevel)))
   return NextResponse.json({experience:'legacy',classLevel,reason:'NOT_RELEASED'});
  const [week]=await withDbRetry(()=>sql`SELECT term,current_week FROM weekly_class_week_state WHERE class_level=${classLevel} LIMIT 1`);
  if(!week)return NextResponse.json({experience:'legacy',classLevel,reason:'WEEK_UNSET'});

  // A legacy account never inherits consent or a parent PIN implicitly.
  const [consent]=await withDbRetry(()=>sql`
   SELECT consent_data,consent_version,consent_at FROM weekly_parent_consents
   WHERE student_id=${session.userId} LIMIT 1`);
  const [parentPin]=await withDbRetry(()=>sql`
   SELECT student_id FROM weekly_parent_pins WHERE student_id=${session.userId} LIMIT 1`);
  const [studentPin]=await withDbRetry(()=>sql`
   SELECT student_id FROM weekly_student_pins WHERE student_id=${session.userId} LIMIT 1`);
  const hasConsent=consent?.consent_data===true&&Boolean(consent?.consent_version)&&Boolean(consent?.consent_at);
  const needsParentOnboarding=!hasConsent||!parentPin;
  const needsStudentPin=!studentPin;
  if(needsParentOnboarding||needsStudentPin)
   return NextResponse.json({
    experience:'onboarding_required',classLevel,
    parentConsentRequired:needsParentOnboarding,
    studentPinRequired:needsStudentPin,
    reason:'COMPLETE_VERIFIED_ONBOARDING'
   });
  // Existing consent rows do not prove guardian identity or current legal approval.
  // Do not authorize a new student-facing experience until that workflow exists.
  return NextResponse.json({
   experience:'weekly_candidate',classLevel,
   term:Number(week.term),week:Number(week.current_week),
   guardianVerificationRequired:true,
   reason:'GUARDIAN_VERIFICATION_NOT_YET_IMPLEMENTED'
  });
 }catch{
  // Missing tables or transient failures must not accidentally enable the new flow.
  return NextResponse.json({experience:'legacy',reason:'UNAVAILABLE'});
 }
}
