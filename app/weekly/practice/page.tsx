import {getSession} from '@/lib/auth';
import {redirect} from 'next/navigation';
import {getDawnGate} from '@/lib/dawnAccess';
import WeeklyPracticeRunner from '@/components/WeeklyPracticeRunner';

export default async function WeeklyPracticePage({searchParams}:{searchParams:Promise<{objectiveId?:string}>}){
 const session=await getSession();if(!session)redirect('/login');
 if(session.role!=='STUDENT')redirect('/home');
 const gate=await getDawnGate(session.userId);if(gate.status!=='ready')redirect('/weekly');
 const {objectiveId}=await searchParams;
 return <WeeklyPracticeRunner objectiveId={objectiveId||''}/>;
}
