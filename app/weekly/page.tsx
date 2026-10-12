import Link from 'next/link';
import {getSession} from '@/lib/auth';
import {getDawnGate} from '@/lib/dawnAccess';
import {redirect} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function WeeklyPage(){
 const session=await getSession();
 if(!session)redirect('/login');
 if(session.role!=='STUDENT')redirect('/home');
 const gate=await getDawnGate(session.userId);
 return <main className="shell"><h1>Weekly learning</h1><p>{gate.status==='legacy'?'Your weekly class has not been released.':'Guardian verification must be completed before weekly learning can open.'}</p><Link href="/learn">Continue learning</Link></main>;
}
