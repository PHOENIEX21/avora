import {getSession} from '@/lib/auth';
import {getDawnGate} from '@/lib/dawnAccess';
import {redirect} from 'next/navigation';
import WeeklyMistakes from '@/components/WeeklyMistakes';
export default async function WeeklyMistakesPage(){
 const session=await getSession();if(!session)redirect('/login');if(session.role!=='STUDENT')redirect('/home');
 const gate=await getDawnGate(session.userId);if(gate.status!=='ready')redirect('/weekly');
 return <WeeklyMistakes/>;
}
