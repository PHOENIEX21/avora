import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { getSession } from "@/lib/auth";
import UserNav from "@/components/UserNav";
import Brand from "@/components/Brand";
import MobileNav from "@/components/MobileNav";
import MobileAccount from "@/components/MobileAccount";
import AppMotion from "@/components/AppMotion";

export const metadata: Metadata = {title:"AVORA — Learning that understands you",description:"Interactive, adaptive and exam-aware learning built around real mastery.",manifest:"/manifest.webmanifest",icons:{icon:"/icons/avora-192.png",apple:"/icons/avora-192.png"}};
export const viewport: Viewport = { themeColor: "#0b1f3a", width: "device-width", initialScale: 1 };
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 const session=await getSession();
 const name=session ? (session.name || session.email.split('@')[0] || 'Learner') : '';
 return <html lang="en" data-scroll-behavior="smooth"><body className={session?'signed-in':''}><header className="topbar"><div className="shell topbar-inner"><Link href={session?'/home':'/'} className="brand"><Brand compact/></Link>{session&&<MobileAccount name={name}/>} {session?<nav className="nav desktop-nav" aria-label="Main navigation"><Link href="/home">Home</Link><Link href="/learn">Learn</Link><Link href="/tutor">Tutor</Link><Link href="/practice">Practice</Link><Link href="/exam">Exam</Link><Link href="/progress">Progress</Link><UserNav name={name}/></nav>:<nav className="nav public-nav"><Link href="/#how">How it works</Link><Link href="/#parents">Parents</Link><Link href="/#schools">Schools</Link><Link className="nav-signin" href="/login">Sign in</Link><Link className="nav-start" href="/register">Start learning</Link></nav>}</div></header>{session&&<AppMotion enabled/>}{children}{session&&<MobileNav/>}<footer className="footer"><div className="shell footer-inner"><Brand compact/><span>Learning that understands you.</span><small>Built around evidence, not empty completion.</small></div></footer><script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){const prod=${process.env.NODE_ENV === 'production' ? 'true' : 'false'};if(prod){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}else{navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister()));if('caches' in window){caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('avora-')).map(k=>caches.delete(k))))}}}`}} /></body></html>
}
