import {getSession} from '@/lib/auth';
import {getDawnGate} from '@/lib/dawnAccess';
import {redirect} from 'next/navigation';
import WeeklyBaselineRunner from '@/components/WeeklyBaselineRunner';
export default async function WeeklyBaselinePage(){
 const session=await getSession();if(!session)redirect('/login');if(session.role!=='STUDENT')redirect('/home');
 const gate=await getDawnGate(session.userId);if(gate.status!=='ready')redirect('/weekly');
 return <WeeklyBaselineRunner/>;
}
