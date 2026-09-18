import { redirect } from 'next/navigation';
import { getStudentEntitlement } from '@/lib/billing';
import type { Session } from '@/lib/auth';

export async function requireStudentLearningAccess(session:Session){
  if(session.role!=='STUDENT') return null;
  const entitlement=await getStudentEntitlement(session.userId);
  if(!entitlement.allowed) redirect('/access');
  return entitlement;
}

export function trialDaysRemaining(endsAt:string|Date|null|undefined){
  if(!endsAt)return 0;
  return Math.max(0,Math.ceil((new Date(endsAt).getTime()-Date.now())/86400000));
}
