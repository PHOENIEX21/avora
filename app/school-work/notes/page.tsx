import {redirect} from 'next/navigation';import {getSession} from '@/lib/auth';import {sql,withDbRetry} from '@/lib/db';import NotesClient from '@/components/NotesClient';
export const dynamic='force-dynamic';
export default async function Notes(){const s=await getSession();if(!s)redirect('/login');const [p]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);return <main className="shell notes-page"><NotesClient classLevel={String(p?.class_level||'JSS1')}/></main>}
