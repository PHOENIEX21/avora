'use client';
import {useEffect,useRef,useState} from 'react';
export default function CommunityMessageMenu({children,actions,own}:{children:React.ReactNode;actions:React.ReactNode;own:boolean}){
 const [open,setOpen]=useState(false);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);const pressed=useRef(false);
 function clear(){if(timer.current)clearTimeout(timer.current);timer.current=null}
 function start(){clear();pressed.current=false;timer.current=setTimeout(()=>{pressed.current=true;setOpen(true)},480)}
 useEffect(()=>()=>clear(),[]);
 return <div className={'community-message-interaction'+(own?' is-own':'')} onContextMenu={e=>{e.preventDefault();clear();setOpen(true)}} onTouchStart={start} onTouchEnd={clear} onTouchMove={clear} onTouchCancel={clear}>
 <div onClick={e=>{if((e.target as HTMLElement).closest('a,button,input'))return;if(pressed.current){pressed.current=false;return}setOpen(v=>!v)}}>{children}</div>
 {open&&<div className="community-message-menu" role="group" aria-label="Message actions"><div className="community-message-menu-top"><span>Message options</span><button type="button" onClick={()=>setOpen(false)} aria-label="Close message options">✕</button></div>{actions}</div>}
 </div>;
}
