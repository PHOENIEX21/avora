import {NextResponse} from 'next/server';
import {getStudentAccessTier} from '@/lib/billing';
import type {Session} from '@/lib/auth';
export async function requirePremiumFeature(session:Session|null,feature:string){
 if(!session||session.role!=='STUDENT')return null;
 const access=await getStudentAccessTier(session.userId);
 if(access.tier!=='FREE')return null;
 return NextResponse.json({error:`${feature} is included with AVORA Premium. Your learning history is safe and AVORA Free remains available.`,code:'PREMIUM_REQUIRED',tier:'FREE',upgradeHref:'/access'},{status:402});
}
