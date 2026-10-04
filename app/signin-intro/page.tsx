import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import SignInIntro from '@/components/SignInIntro';

export const dynamic='force-dynamic';

export default async function SignInIntroPage(){
  const session=await getSession();
  if(!session)redirect('/login');
  if(session.role==='PARENT')redirect('/parent');
  if(session.role==='ADMIN')redirect('/admin');
  return <SignInIntro/>;
}
