'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const SLOW_NAVIGATION_MS = 6000;
const OFFLINE_MESSAGE = 'You appear to be offline. AVORA will keep trying…';
const SLOW_MESSAGE = 'Connection is taking longer than usual…';

export default function AppMotion({enabled=true}:{enabled?:boolean}){
  const pathname = usePathname();
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState(SLOW_MESSAGE);
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null);
  const pointerStart = useRef<{x:number;y:number}|null>(null);

  useEffect(()=>{
    setLoading(false);
    if(timer.current){ clearTimeout(timer.current); timer.current = null; }
  },[pathname]);

  useEffect(()=>{
    if(!enabled) return;
    function onPointerDown(e:PointerEvent){
      pointerStart.current={x:e.clientX,y:e.clientY};
    }
    function onClick(e:MouseEvent){
      if(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const start=pointerStart.current;
      pointerStart.current=null;
      if(start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)>10)return;
      const target = e.target as Element | null;
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
      if(!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if(url.origin !== window.location.origin) return;
      const current = new URL(window.location.href);
      const onlyHashChanged = url.pathname === current.pathname && url.search === current.search && url.hash !== current.hash;
      if(onlyHashChanged || (url.pathname === current.pathname && url.search === current.search && !url.hash)) return;
      if(timer.current) clearTimeout(timer.current);
      if(!navigator.onLine){
        setMessage(OFFLINE_MESSAGE);
        setLoading(true);
        return;
      }
      setMessage(SLOW_MESSAGE);
      // Normal AVORA navigation should feel immediate. Only reveal the route
      // overlay when a transition is genuinely taking an unusually long time.
      timer.current = setTimeout(()=>setLoading(true),SLOW_NAVIGATION_MS);
    }
    document.addEventListener('pointerdown',onPointerDown,true);
    document.addEventListener('click',onClick,true);
    return ()=>{
      document.removeEventListener('pointerdown',onPointerDown,true);
      document.removeEventListener('click',onClick,true);
      if(timer.current) clearTimeout(timer.current);
    };
  },[enabled]);

  if(!enabled || !loading) return null;
  return <div className="avora-route-loader" role="status" aria-live="polite" aria-label={message}>
    <div className="avora-loader-mark" aria-hidden="true">
      <span className="avora-loader-ring ring-one" />
      <span className="avora-loader-ring ring-two" />
      <img src="/avora-mark.svg" alt="" />
    </div>
    <p>{message}</p>
  </div>;
}
