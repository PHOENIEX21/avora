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

export default function MobileNav(){
 const path=usePathname();
 const [open,setOpen]=useState(false);
 useEffect(()=>setOpen(false),[path]);
 const moreActive=path.startsWith('/practice')||path.startsWith('/progress');
 return <>
  {open&&<div className="mobile-more-panel" role="dialog" aria-label="More learning tools">
   <Link href="/practice"><span>Independent practice</span><small>Prove what you can do without Tutor help.</small></Link>
   <Link href="/progress"><span>Progress</span><small>See evidence, mastery and what still needs work.</small></Link>
  </div>}
  <nav className="mobile-dock" aria-label="Mobile navigation">
   {primary.map(item=>{const active=path===item.href||path.startsWith(item.href+'/');return <Link key={item.href} href={item.href} className={active?'active':''}><span aria-hidden="true">{item.icon}</span><b>{item.label}</b></Link>})}
   <button type="button" className={moreActive||open?'active':''} onClick={()=>setOpen(v=>!v)} aria-expanded={open}><span aria-hidden="true">•••</span><b>More</b></button>
  </nav>
 </>;
}
