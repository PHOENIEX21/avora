'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
export default function StudyRoomComposer({roomId,parentPostId,compact=false}:{roomId:string;parentPostId?:string;compact?:boolean}){
 const router=useRouter();const [body,setBody]=useState(''),[busy,setBusy]=useState(false),[msg,setMsg]=useState(''),[error,setError]=useState(false);
 async function post(){
  if(busy||body.trim().length<3)return;
  setBusy(true);setMsg('');setError(false);
  try{
   const r=await fetch('/api/community/rooms/'+roomId+'/posts',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({body,parentPostId:parentPostId||null,postType:parentPostId?'ANSWER':'QUESTION'})});
   const raw=await r.text();let data:{error?:string;message?:string}={};
   try{data=raw?JSON.parse(raw):{}}catch{throw new Error('The server returned an unexpected response (HTTP '+r.status+').')}
   if(!r.ok)throw new Error(data.error||'Could not send your message (HTTP '+r.status+').');
   setBody('');setMsg('Message sent to the group.');router.refresh();
  }catch(e){setError(true);setMsg(e instanceof Error?e.message:'Could not send. Please try again.')}finally{setBusy(false)}
 }
 return <div className={compact?'study-reply-composer':'study-room-composer'}>
  <textarea rows={compact?2:3} maxLength={4000} value={body} onChange={e=>setBody(e.target.value)} placeholder={compact?'Write a reply or explain the solution…':'Message your study group: ask, explain or share your working…'} aria-label={compact?'Reply to message':'Write a group message'}/>
  <button type="button" disabled={busy||body.trim().length<3} onClick={post}>{busy?'Sending…':compact?'Send reply':'Send message →'}</button>
  {msg&&<small role="status" style={{color:error?'#b91c1c':undefined}}>{msg}</small>}
 </div>;
}
