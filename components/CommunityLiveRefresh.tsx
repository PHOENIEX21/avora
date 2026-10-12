'use client';
import {useEffect,useState} from 'react';import {useRouter} from 'next/navigation';
export default function CommunityLiveRefresh({roomId}:{roomId:string}){
 const router=useRouter();const [online,setOnline]=useState<number|null>(null);
 useEffect(()=>{
  let active=true;
  async function heartbeat(){
   if(document.visibilityState!=='visible')return;
   try{const response=await fetch('/api/community/rooms/'+roomId+'/presence',{method:'POST'});
    if(response.ok){const data=await response.json();if(active)setOnline(data.online)}}catch{}
  }
  function refresh(){if(document.visibilityState==='visible'){router.refresh();void heartbeat()}}
  void heartbeat();const timer=window.setInterval(refresh,8000);
  document.addEventListener('visibilitychange',refresh);
  return ()=>{active=false;window.clearInterval(timer);document.removeEventListener('visibilitychange',refresh)};
 },[router,roomId]);
 return <small className="community-online-count" aria-live="polite">{online===null?'Connecting to group…':online+' online now'}</small>;
}
