import Link from 'next/link';
import {getSession} from '@/lib/auth';
import {redirect} from 'next/navigation';
import {weeklyStudentContext,WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {weeklyCatchup} from '@/lib/weeklyCatchup';
import WeeklyCatchup from '@/components/WeeklyCatchup';
import styles from '@/components/WeeklyDashboard.module.css';
export default async function WeeklyCatchupPage(){
 const session=await getSession();if(!session)redirect('/login');if(session.role!=='STUDENT')redirect('/home');
 try{
  const objectives=await weeklyCatchup(await weeklyStudentContext(session.userId));
  return <WeeklyCatchup objectives={objectives}/>;
 }catch(error){if(error instanceof WeeklyWorkspaceError&&error.status===403)redirect('/weekly');
  return <main className={styles.workspace}><h1>Catch-up unavailable</h1><Link href="/weekly/catch-up">Retry</Link></main>}
}
