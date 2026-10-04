import {redirect} from 'next/navigation';import {getSession} from '@/lib/auth';import StudentParentConnect from '@/components/StudentParentConnect';
export default async function Page(){const s=await getSession();if(!s)redirect('/login');if(s.role!=='STUDENT')redirect(s.role==='PARENT'?'/parent':'/admin');return <main className="shell page parent-connect-page"><StudentParentConnect/></main>}
