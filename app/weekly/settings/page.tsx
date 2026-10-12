import {getSession} from '@/lib/auth';
import {redirect} from 'next/navigation';
import WeeklyStudySettings from '@/components/WeeklyStudySettings';

export default async function WeeklySettingsPage(){
 const session=await getSession();if(!session)redirect('/login');
 if(session.role!=='STUDENT')redirect('/home');
 return <WeeklyStudySettings/>;
}
