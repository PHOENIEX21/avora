import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import WeeklyWordBank from '@/components/WeeklyWordBank';
export default async function WordsPage(){
 const session=await getSession();
 if(!session)redirect('/login');
 if(session.role!=='ADMIN')redirect('/home');
 return <WeeklyWordBank/>;
}
