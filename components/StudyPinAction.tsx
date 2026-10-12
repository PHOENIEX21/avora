'use client';
import {useRouter} from 'next/navigation';import {useState} from 'react';
export default function StudyPinAction({roomId,postId,pinned}:{roomId:string;postId:string;pinned:boolean}){
 const router=useRouter();const [busy,setBusy]=useState(false);
 async function change(){setBusy(true);try{const r=await fetch('/api/community/rooms/'+roomId+'/posts/'+postId+'/pin',{method:pinned?'DELETE':'POST'});if(r.ok)router.refresh()}finally{setBusy(false)}}
 return <button className="community-pin-action" type="button" disabled={busy} onClick={change}>{pinned?'Unpin':'📌 Pin'}</button>;
}
