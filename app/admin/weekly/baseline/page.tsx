import {getSession} from '@/lib/auth';
import {redirect} from 'next/navigation';
import WeeklyBaselineReview from '@/components/WeeklyBaselineReview';
export default async function WeeklyBaselineAdminPage(){
 const session=await getSession();if(!session)redirect('/login');if(session.role!=='ADMIN')redirect('/home');
 return <WeeklyBaselineReview/>;
}
