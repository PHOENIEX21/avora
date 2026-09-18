'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';

const primary=[
 {href:'/home',label:'Home',icon:'⌂'},
 {href:'/learn',label:'Learn',icon:'▤'},
 {href:'/tutor',label:'Tutor',icon:'▣'},
 {href:'/exam',label:'Exam',icon:'◷'},
];

export default function MobileNav({role='STUDENT'}:{role?:string}){
 const path=usePathname();
 const [open,setOpen]=useState(false);
 useEffect(()=>setOpen(false),[path]);
 if(role==='ADMIN') return <nav className="mobile-dock admin-mobile-dock" aria-label="Admin navigation"><Link href="/admin" className={path==='/admin'?'active':''}><span aria-hidden="true">⌂</span><b>Dashboard</b></Link><Link href="/admin/academic-preview" className={path.startsWith('/admin/academic-preview')?'active':''}><span aria-hidden="true">▤</span><b>Academic</b></Link><Link href="/admin/students" className={path.startsWith('/admin/students')?'active':''}><span aria-hidden="true">◎</span><b>Students</b></Link><Link href="/admin/live-assessments" className={path.startsWith('/admin/live-assessments')?'active':''}><span aria-hidden="true">◷</span><b>Live</b></Link><Link href="/admin/support" className={path.startsWith('/admin/support')?'active':''}><span aria-hidden="true">✉</span><b>Support</b></Link><Link href="/admin/families" className={path.startsWith('/admin/families')?'active':''}><span aria-hidden="true">⌂</span><b>Families</b></Link></nav>;
 if(role==='PARENT') return <nav className="mobile-dock parent-mobile-dock" aria-label="Parent navigation"><Link href="/parent" className={path==='/parent'||path.startsWith('/parent/child')||path.startsWith('/parent/live-assessment')?'active':''}><span aria-hidden="true">⌂</span><b>Overview</b></Link><Link href="/parent/family" className={path.startsWith('/parent/family')?'active':''}><span aria-hidden="true">＋</span><b>Children</b></Link><Link href="/parent/billing" className={path.startsWith('/parent/billing')?'active':''}><span aria-hidden="true">◎</span><b>Plan</b></Link></nav>;
 const moreActive=path.startsWith('/practice')||path.startsWith('/progress')||path.startsWith('/live-assessment')||path.startsWith('/support')||path.startsWith('/parent-connect');
 return <>
  {open&&<div className="mobile-more-panel" role="dialog" aria-label="More learning tools">
   <Link href="/practice"><span>Independent practice</span><small>Prove what you can do without Tutor help.</small></Link>
   <Link href="/progress"><span>Progress</span><small>See evidence, mastery and what still needs work.</small></Link>
   <Link href="/live-assessment"><span>Live assessment</span><small>Join scheduled parent-supervised AVORA sessions.</small></Link>
   <Link href="/parent-connect"><span>Parent connection</span><small>Give your parent a secure one-time code to connect to your progress.</small></Link>
   <Link href="/support"><span>Human support</span><small>Message a real AVORA support person inside the app.</small></Link>
  </div>}
  <nav className="mobile-dock" aria-label="Mobile navigation">
   {primary.map(item=>{const active=path===item.href||path.startsWith(item.href+'/');return <Link key={item.href} href={item.href} className={active?'active':''}><span aria-hidden="true">{item.icon}</span><b>{item.label}</b></Link>})}
   <button type="button" className={moreActive||open?'active':''} onClick={()=>setOpen(v=>!v)} aria-expanded={open}><span aria-hidden="true">•••</span><b>More</b></button>
  </nav>
 </>;
}
