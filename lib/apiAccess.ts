import {NextResponse} from 'next/server';
import {getStudentEntitlement} from '@/lib/billing';
import type {Session} from '@/lib/auth';

export async function learningAccessDenial(session:Session|null){
  if(!session||session.role!=='STUDENT')return null;
  const access=await getStudentEntitlement(session.userId);
  if(access.allowed)return null;
  return NextResponse.json({error:'Your AVORA trial has ended. Connect a parent family subscription to continue learning.',code:'SUBSCRIPTION_REQUIRED'},{status:402});
}
