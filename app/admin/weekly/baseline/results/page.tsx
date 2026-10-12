import {getSession} from '@/lib/auth';
import {redirect} from 'next/navigation';
import WeeklyBaselineResults from '@/components/WeeklyBaselineResults';
export default async function BaselineResultsPage(){
 const session=await getSession();if(!session)redirect('/login');if(session.role!=='ADMIN')redirect('/home');
 return <WeeklyBaselineResults/>;
}
