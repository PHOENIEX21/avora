import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {getDawnGate} from '@/lib/dawnAccess';

/** Read-only, student-scoped experience resolution. No redirect or activation. */
export async function GET(){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 if(session.role!=='STUDENT')return NextResponse.json({error:'Student account required'},{status:403});
 const gate=await getDawnGate(session.userId);
 if(gate.status==='legacy')return NextResponse.json({experience:'legacy',reason:gate.reason});
 if(gate.status==='onboarding_required')return NextResponse.json({
  experience:'onboarding_required',classLevel:gate.classLevel,
  term:gate.term,week:gate.week,
  parentConsentRequired:!gate.guardianConsent||!gate.verifiedContact||!gate.parentPin,
  studentPinRequired:!gate.studentPin,
  reason:'COMPLETE_VERIFIED_ONBOARDING'
 });
 return NextResponse.json({
  experience:'weekly_candidate',classLevel:gate.classLevel,
  term:gate.term,week:gate.week,
  guardianVerificationRequired:true,
  reason:'GUARDIAN_VERIFICATION_NOT_YET_IMPLEMENTED'
 });
}
