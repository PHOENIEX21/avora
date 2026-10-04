import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { getSession } from "@/lib/auth";
import UserNav from "@/components/UserNav";
import Brand from "@/components/Brand";
import MobileNav from "@/components/MobileNav";
import MobileAccount from "@/components/MobileAccount";
import AppMotion from "@/components/AppMotion";
import TrialCountdownStrip from "@/components/TrialCountdownStrip";
import PwaRuntime from "@/components/PwaRuntime";
import ProductTelemetry from "@/components/ProductTelemetry";
import {getStudentEntitlement,getFamilyBillingStatus} from "@/lib/billing";

export const metadata: Metadata = {title:"AVORA — Learning that understands you",description:"Interactive, adaptive and exam-aware learning built around real mastery.",manifest:"/manifest.webmanifest",icons:{icon:"/icons/avora-192.png",apple:"/icons/avora-192.png"}};
export const viewport: Viewport = { themeColor: "#283B73", width: "device-width", initialScale: 1 };
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 const session=await getSession();
 const name=session ? (session.name || session.email.split('@')[0] || 'Learner') : '';
 const studentAccess=session?.role==='STUDENT'?await getStudentEntitlement(session.userId):null;
 const familyAccess=session?.role==='PARENT'?await getFamilyBillingStatus(session.userId):null;
 const renderedAt=Date.now();
 return <html lang="en" data-scroll-behavior="smooth"><body className={session?'signed-in':''}><header className="topbar"><div className="shell topbar-inner"><Link href={session?(session.role==='PARENT'?'/parent':session.role==='ADMIN'?'/admin':'/home'):'/'} className="brand"><Brand compact/></Link>{session&&<MobileAccount name={name}/>} {session?(session.role==='PARENT'?<nav className="nav desktop-nav parent-desktop-nav" aria-label="Parent navigation"><Link href="/parent">Overview</Link><Link href="/parent/family">Children</Link><Link href="/parent/billing">Plan</Link><UserNav name={name}/></nav>:session.role==='ADMIN'?<nav className="nav desktop-nav admin-desktop-nav" aria-label="Admin navigation"><Link href="/admin">Dashboard</Link><Link href="/admin/academic-preview">Academic</Link><Link href="/admin/students">Students</Link><Link href="/admin/live-assessments">Live</Link><Link href="/admin/support">Support</Link><Link href="/admin/families">Families</Link><UserNav name={name}/></nav>:<nav className="nav desktop-nav" aria-label="Main navigation"><Link href="/home">Home</Link><Link href="/learn">Learn</Link><Link href="/curriculum">Curriculum</Link><Link href="/tutor">Tutor</Link><Link href="/practice">Practice</Link><Link href="/exam">Exam</Link><Link href="/progress">Progress</Link><Link href="/live-assessment">Live</Link><Link href="/parent-connect">Parent</Link><Link href="/support">Support</Link><UserNav name={name}/></nav>):<nav className="nav public-nav"><Link href="/#how">How it works</Link><Link href="/#parents">Parents</Link><Link href="/#schools">Schools</Link><Link className="nav-signin" href="/login">Sign in</Link><Link className="nav-start" href="/register">Start learning</Link></nav>}</div></header>{session&&<AppMotion enabled/>}{studentAccess?.status==='TRIALING'&&studentAccess.endsAt&&<TrialCountdownStrip endsAt={String(studentAccess.endsAt)} initialNow={renderedAt}/>}{familyAccess?.status==='TRIALING'&&familyAccess.trial_ends_at&&<TrialCountdownStrip endsAt={String(familyAccess.trial_ends_at)} href="/parent/billing" scope="AVORA FAMILY · 14-DAY TRIAL" initialNow={renderedAt}/>}{session&&<ProductTelemetry/>}{children}{session&&<MobileNav role={session.role}/>}<PwaRuntime/><footer className="footer"><div className="shell footer-inner"><Brand compact/><span>Learning that understands you.</span><small>Built around evidence, not empty completion.</small></div></footer></body></html>
}
