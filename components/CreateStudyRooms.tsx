'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
export default function CreateStudyRooms(){
 const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
 const router=useRouter();
 async function create(){
  setBusy(true);setMessage('');
  try{
   const response=await fetch('/api/admin/community/rooms',{method:'POST',headers:{Accept:'application/json'}});
   const body=await response.text();
   let data:{error?:string;created?:number;message?:string}={};
   if(body){try{data=JSON.parse(body)}catch{throw new Error('The server returned an invalid response (HTTP '+response.status+'). Please retry or check the deployment logs.')}}
   if(!response.ok)throw new Error(data.error||'Room creation failed (HTTP '+response.status+').');
   if(!body)throw new Error('The server returned an empty response. Please refresh to check whether rooms were created.');
   setMessage((data.created??0)+' new rooms created. Existing rooms were preserved.');
   router.refresh();
  }catch(e){setMessage(e instanceof Error?e.message:'Could not prepare Study Rooms.')}finally{setBusy(false)}
 }
 return <div className="academic-room-setup"><button type="button" className="premium-primary" onClick={create} disabled={busy}>{busy?'Preparing rooms…':'Create JSS1–JSS3 subject rooms'}</button><p role="status" aria-live="polite">{message}</p></div>;
}
