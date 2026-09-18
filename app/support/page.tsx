import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import SupportChat from '@/components/SupportChat';
export const dynamic='force-dynamic';
export default async function Support(){const s=await getSession();if(!s)redirect('/login');if(s.role==='ADMIN')redirect('/admin/support');return <main className="shell support-page"><header className="support-page-head"><div><span className="eyebrow">AVORA HUMAN ASSISTANCE</span><h1>Talk to a real person when you need one.</h1><p>Learning help, live-assessment questions and account support — inside AVORA.</p></div><div className="support-presence"><i></i><span>Support centre</span><small>Messages stay with your account</small></div></header><SupportChat/></main>}
