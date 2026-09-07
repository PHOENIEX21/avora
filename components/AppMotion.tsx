'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const labels: Record<string,string> = {
  '/learn': 'Opening your learning path…',
  '/tutor': 'Preparing your AVORA Tutor…',
  '/practice': 'Preparing your practice…',
  '/exam': 'Preparing your exam…',
  '/progress': 'Updating your progress…',
  '/home': 'Opening your learning home…',
};

function labelFor(href:string){
  const path = href.split('?')[0].split('#')[0];
  const key = Object.keys(labels).find(k => path === k || path.startsWith(k + '/'));
  return key ? labels[key] : 'Getting things ready…';
}

export default function AppMotion({enabled=true}:{enabled?:boolean}){
  const pathname = usePathname();
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState('Getting things ready…');
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null);

  useEffect(()=>{
    setLoading(false);
    if(timer.current){ clearTimeout(timer.current); timer.current = null; }
  },[pathname]);

  useEffect(()=>{
    if(!enabled) return;
    function onClick(e:MouseEvent){
      if(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
      if(!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if(url.origin !== window.location.origin) return;
      const current = new URL(window.location.href);
      const onlyHashChanged = url.pathname === current.pathname && url.search === current.search && url.hash !== current.hash;
      if(onlyHashChanged || (url.pathname === current.pathname && url.search === current.search && !url.hash)) return;
      setMessage(labelFor(url.pathname));
      if(timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(()=>setLoading(true),450);
    }
    document.addEventListener('click',onClick,true);
    return ()=>{
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
