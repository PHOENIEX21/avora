'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
export default function CreateStudyRooms(){
 const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
 const router=useRouter();
 async function create(){
  setBusy(true);setMessage('');
  try{
   const r=await fetch('/api/admin/community/rooms',{method:'POST'});
   const data=await r.json();
   if(!r.ok)throw new Error(data.error||'Could not prepare Study Rooms.');
   setMessage(data.created+' new rooms created. Existing rooms were preserved.');
   router.refresh();
  }catch(e){setMessage(e instanceof Error?e.message:'Could not prepare Study Rooms.')}finally{setBusy(false)}
 }
 return <div className="academic-room-setup"><button type="button" className="premium-primary" onClick={create} disabled={busy}>{busy?'Preparing rooms…':'Create JSS1–JSS3 subject rooms'}</button><p role="status">{message}</p></div>;
}
