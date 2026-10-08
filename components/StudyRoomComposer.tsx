'use client';
import {useState} from 'react';import {useRouter} from 'next/navigation';
export default function StudyRoomComposer({roomId,parentPostId,compact=false}:{roomId:string;parentPostId?:string;compact?:boolean}){
 const router=useRouter();const [showEmoji,setShowEmoji]=useState(false);const [body,setBody]=useState(''),[file,setFile]=useState<File|null>(null),[busy,setBusy]=useState(false),[msg,setMsg]=useState(''),[error,setError]=useState(false),[reset,setReset]=useState(0);
 async function post(){
  if(busy||(!file&&body.trim().length<3))return;
  setBusy(true);setMsg('');setError(false);
  try{
   const form=new FormData();form.set('body',body);form.set('postType',parentPostId?'ANSWER':'QUESTION');if(parentPostId)form.set('parentPostId',parentPostId);if(file)form.set('file',file);
   const r=await fetch('/api/community/rooms/'+roomId+'/posts',{method:'POST',body:form});
   const raw=await r.text();let d:{error?:string;message?:string}={};
   try{d=raw?JSON.parse(raw):{}}catch{throw Error('Unexpected server response (HTTP '+r.status+').')}
   if(!r.ok)throw Error(d.error||'Could not post (HTTP '+r.status+').');
   setBody('');setFile(null);setReset(x=>x+1);setMsg('Sent to group.');router.refresh();
  }catch(e){setError(true);setMsg(e instanceof Error?e.message:'Could not post.')}finally{setBusy(false)}
 }
 return <div className={compact?'study-reply-composer':'study-room-composer'}>
 <textarea rows={compact?2:3} maxLength={4000} value={body} onChange={e=>setBody(e.target.value)} placeholder={compact?'Reply or explain the solution…':'Message your study group…'} aria-label={compact?'Reply':'Group message'}/>
 <div className="community-composer-actions"><button type="button" aria-expanded={showEmoji} aria-label="Choose emoji" onClick={()=>setShowEmoji(v=>!v)}>☺</button>{showEmoji&&<div className="community-composer-emojis">{['😀','😊','👍','❤️','👏','🙏','🎉','📚','✏️','💡'].map(emoji=><button type="button" key={emoji} onClick={()=>{setBody(v=>(v+emoji).slice(0,4000));setShowEmoji(false)}}>{emoji}</button>)}</div>}<label className="community-attach">📎 Image / PDF<input key={reset} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" onChange={e=>{const f=e.target.files?.[0]||null;if(f&&f.size>4*1024*1024){setError(true);setMsg('Maximum file size is 4 MB.');setFile(null)}else{setFile(f);setMsg('');setError(false)}}}/></label>
 <label className="community-attach">📷 Camera<input key={'camera-'+reset} type="file" accept="image/*" capture="environment" onChange={e=>{const f=e.target.files?.[0]||null;if(f&&(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>4*1024*1024)){setError(true);setMsg('Use JPG, PNG or WebP up to 4 MB.');setFile(null)}else{setFile(f);setError(false);setMsg('')}}}/></label>
 {file&&<small>{file.name} ({(file.size/1024/1024).toFixed(2)} MB) <button type="button" onClick={()=>{setFile(null);setReset(x=>x+1)}}>Remove</button></small>}
 <button type="button" disabled={busy||(!file&&body.trim().length<3)} onClick={post}>{busy?'Sending…':compact?'Reply →':'Send →'}</button></div>
 {msg&&<small role="status" style={{color:error?'#b91c1c':undefined}}>{msg}</small>}
 </div>;
}
