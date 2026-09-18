'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';

const DAY=86400000;
export default function TrialCountdownStrip({endsAt,totalDays=14,href='/account/plan',scope='AVORA TRIAL',initialNow}:{endsAt:string,totalDays?:number;href?:string;scope?:string;initialNow:number}){
 const [now,setNow]=useState(initialNow);
 useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),60000);return()=>clearInterval(id)},[]);
 const end=new Date(endsAt).getTime();
 if(!Number.isFinite(end))return null;
 const remainingMs=Math.max(0,end-now);
 const daysLeft=Math.max(0,Math.ceil(remainingMs/DAY));
 const elapsed=Math.max(0,totalDays-daysLeft);
 const day=Math.min(totalDays,elapsed+1);
 const pct=Math.min(100,Math.max(0,(remainingMs/(totalDays*DAY))*100));
 return <aside className="trial-live-strip" aria-live="polite">
  <div className="shell trial-live-inner">
   <div className="trial-live-copy"><span>{scope}</span><b>{daysLeft>0?`Day ${day} of ${totalDays} · ${daysLeft} ${daysLeft===1?'day':'days'} left`:'Trial ended'}</b><small>{daysLeft>0?`Your access ends ${new Date(endsAt).toLocaleString('en-NG',{dateStyle:'medium',timeStyle:'short'})}. The countdown updates automatically.`:'Choose a family subscription to keep learning with this profile.'}</small></div>
   <div className="trial-live-meter" aria-label={`${daysLeft} trial days remaining`}><i style={{width:`${pct}%`}}/></div>
   <Link href={href}>{daysLeft>0?'Trial details':'Continue access'} →</Link>
  </div>
 </aside>
}
