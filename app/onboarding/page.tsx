import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { sql,withDbRetry } from '@/lib/db';
import OnboardingClient from '@/components/OnboardingClient';
export default async function OnboardingPage(){
 const session=await getSession(); if(!session)redirect('/login');
 const [p]=await withDbRetry(()=>sql`SELECT onboarding_completed FROM student_profiles WHERE user_id=${session.userId}`);
 if(p?.onboarding_completed)redirect('/home');
 const [u]=await withDbRetry(()=>sql`SELECT full_name FROM users WHERE id=${session.userId}`);
 return <OnboardingClient firstName={(u?.full_name||'Learner').split(/\s+/)[0]}/>;
}
