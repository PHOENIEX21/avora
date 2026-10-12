import {getSession} from '@/lib/auth';
import {getDawnGate} from '@/lib/dawnAccess';
import {redirect} from 'next/navigation';
import {z} from 'zod';
import WeeklyPracticeRunner from '@/components/WeeklyPracticeRunner';
export default async function WeeklyFixPage({searchParams}:{searchParams:Promise<{mistakeId?:string}>}){
 const session=await getSession();if(!session)redirect('/login');if(session.role!=='STUDENT')redirect('/home');
 const gate=await getDawnGate(session.userId);if(gate.status!=='ready')redirect('/weekly');
 const {mistakeId}=await searchParams;if(!z.string().uuid().safeParse(mistakeId).success)redirect('/weekly/mistakes');
 return <WeeklyPracticeRunner source="FIX" mistakeId={mistakeId!}/>;
}
