import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
export async function requireAdmin(){const s=await getSession();if(!s)redirect('/login');if(s.role!=='ADMIN')redirect(s.role==='PARENT'?'/parent':'/home');return s;}
export async function requireUser(){const s=await getSession();if(!s)redirect('/login');return s;}
