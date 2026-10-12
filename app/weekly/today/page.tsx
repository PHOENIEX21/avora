import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {weeklyTodayPlan} from '@/lib/weeklyToday';
import {WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import WeeklyToday from '@/components/WeeklyToday';
import styles from '@/components/WeeklyDashboard.module.css';
export const dynamic='force-dynamic';
export default async function WeeklyTodayPage(){
 const session=await getSession();if(!session)redirect('/login');if(session.role!=='STUDENT')redirect('/home');
 await requireStudentLearningAccess(session);
 try{return <WeeklyToday plan={await weeklyTodayPlan(session.userId)}/>}
 catch(error){return <main className={styles.workspace}><header className={styles.header}><h1>Today is unavailable</h1></header><p role="alert">{error instanceof WeeklyWorkspaceError?error.message:'Your daily plan could not be loaded.'}</p><div className={styles.actions}><Link href="/weekly/today">Retry</Link><Link href="/learn">Continue lessons</Link></div></main>}
}
