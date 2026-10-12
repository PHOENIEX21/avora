import {sql,withDbRetry} from '@/lib/db';
import {isWeeklyLearningEnabled} from '@/lib/weeklyLearning';
import {decideDawnAccess} from '@/lib/dawnAccessPolicy';

/**
 * Server-side Dawn gate. A feature flag is necessary but not sufficient.
 * No client-supplied class or student ID is trusted.
 * A recorded consent row is not proof of legal approval: the owner must
 * explicitly activate the verified workflow before full Dawn access.
 */
export type DawnGate =
 | {status:'legacy';reason:'CLASS_UNSET'|'NOT_RELEASED'|'WEEK_UNSET'|'UNAVAILABLE'}
 | {status:'onboarding_required';classLevel:string;term:number;week:number;guardianConsent:boolean;verifiedContact:boolean;parentPin:boolean;studentPin:boolean}
 | {status:'verification_pending';classLevel:string;term:number;week:number}
 | {status:'ready';classLevel:string;term:number;week:number};

export async function getDawnGate(studentId:string):Promise<DawnGate>{
 try{
  const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${studentId} LIMIT 1`);
  const classLevel=String(profile?.class_level??'').toUpperCase();
  if(!['JSS1','JSS2','JSS3'].includes(classLevel))return {status:'legacy',reason:'CLASS_UNSET'};
  if(!(await isWeeklyLearningEnabled(classLevel)))return {status:'legacy',reason:'NOT_RELEASED'};
  const [week]=await withDbRetry(()=>sql`SELECT term,current_week FROM weekly_class_week_state WHERE class_level=${classLevel} LIMIT 1`);
  if(!week)return {status:'legacy',reason:'WEEK_UNSET'};
  const [consent]=await withDbRetry(()=>sql`SELECT consent_data,consent_version,consent_at,parent_contact_verified_at FROM weekly_parent_consents WHERE student_id=${studentId} LIMIT 1`);
  const [parentPin]=await withDbRetry(()=>sql`SELECT student_id FROM weekly_parent_pins WHERE student_id=${studentId} LIMIT 1`);
  const [studentPin]=await withDbRetry(()=>sql`SELECT student_id FROM weekly_student_pins WHERE student_id=${studentId} LIMIT 1`);
  const guardianConsent=consent?.consent_data===true&&Boolean(consent.consent_version)&&Boolean(consent.consent_at);
  const verifiedContact=Boolean(consent?.parent_contact_verified_at);
  const parentPinReady=Boolean(parentPin),studentPinReady=Boolean(studentPin);
  const base={classLevel,term:Number(week.term),week:Number(week.current_week)};
  const decision=decideDawnAccess({
   classReleased:true,weekReleased:true,consentRecorded:guardianConsent,
   contactVerified:verifiedContact,parentPinPresent:parentPinReady,
   studentPinPresent:studentPinReady,
   // Must remain false until approved legal wording, verification and audit workflow exist.
   guardianWorkflowApproved:false
  });
  if(decision==='onboarding_required')
   return {status:'onboarding_required',...base,guardianConsent,verifiedContact,parentPin:parentPinReady,studentPin:studentPinReady};
  if(decision==='ready')return {status:'ready',...base};
  // The policy remains inactive until the guardian workflow is approved.
  return {status:'verification_pending',...base};
 }catch{
  return {status:'legacy',reason:'UNAVAILABLE'};
 }
}
