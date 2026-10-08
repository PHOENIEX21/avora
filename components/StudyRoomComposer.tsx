'use client';
import {useRef,useState} from 'react';
import {useRouter} from 'next/navigation';

export default function StudyRoomComposer({roomId,parentPostId,compact=false}:{roomId:string;parentPostId?:string;compact?:boolean}){
 const router=useRouter();
 const [body,setBody]=useState('');
 const [file,setFile]=useState<File|null>(null);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('');
 const [attachmentOpen,setAttachmentOpen]=useState(false);
 const [emojiOpen,setEmojiOpen]=useState(false);
 const inputRef=useRef<HTMLTextAreaElement>(null);
 const fileRef=useRef<HTMLInputElement>(null);
 const galleryRef=useRef<HTMLInputElement>(null);
 const cameraRef=useRef<HTMLInputElement>(null);
 const hasContent=Boolean(body.trim()||file);
 function chooseFile(next:File|null){
  if(!next)return;
  if(next.size>4*1024*1024){setMessage('Maximum attachment size is 4 MB.');return}
  if(!['application/pdf','image/jpeg','image/png','image/webp'].includes(next.type)){setMessage('Only PDF, JPG, PNG and WebP are supported.');return}
  setFile(next);setMessage('');setAttachmentOpen(false);
 }
 async function send(){
  if(busy||(!file&&body.trim().length<3))return;
  setBusy(true);setMessage('');
  try{
   const data=new FormData();
   data.set('body',body);
   data.set('postType',parentPostId?'ANSWER':'QUESTION');
   if(parentPostId)data.set('parentPostId',parentPostId);
   if(file)data.set('file',file);
   const response=await fetch('/api/community/rooms/'+roomId+'/posts',{method:'POST',body:data});
   const payload=await response.json().catch(()=>({error:'Unexpected server response'}));
   if(!response.ok)throw Error(payload.error||'Could not send message.');
   setBody('');setFile(null);setAttachmentOpen(false);setEmojiOpen(false);router.refresh();
  }catch(e){setMessage(e instanceof Error?e.message:'Message could not be sent.')}
  finally{setBusy(false)}
 }
 return <div className={compact?'study-reply-composer':'avora-chat-composer'}>
  <div className="avora-chat-input-row">
   <div className="avora-chat-field">
    <button className="avora-chat-icon" type="button" aria-label="Insert emoji" aria-expanded={emojiOpen} onClick={()=>{setEmojiOpen(v=>!v);setAttachmentOpen(false)}}>☺</button>
    <textarea ref={inputRef} rows={1} value={body} maxLength={4000} aria-label={compact?'Reply':'Message'} placeholder={compact?'Reply':'Message'} onChange={e=>setBody(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();void send()}}}/>
    <button className="avora-chat-icon" type="button" aria-label="Add attachment" aria-expanded={attachmentOpen} onClick={()=>{setAttachmentOpen(v=>!v);setEmojiOpen(false)}}>📎</button>
    <button className="avora-chat-icon" type="button" aria-label="Open camera" onClick={()=>cameraRef.current?.click()}>📷</button>
   </div>
   <button className="avora-chat-send" type="button" aria-label={hasContent?'Send message':'Voice messages not yet available'} title={hasContent?'Send message':'Voice messages coming soon'} disabled={busy||!hasContent||(!file&&body.trim().length<3)} onClick={()=>void send()}>{hasContent?'➤':'🎙'}</button>
  </div>
  <input className="avora-chat-hidden-file" ref={fileRef} type="file" accept=".pdf,application/pdf" aria-label="Choose PDF document" onChange={e=>chooseFile(e.target.files?.[0]||null)}/>
  <input className="avora-chat-hidden-file" ref={galleryRef} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose image" onChange={e=>chooseFile(e.target.files?.[0]||null)}/>
  <input className="avora-chat-hidden-file" ref={cameraRef} type="file" accept="image/*" capture="environment" aria-label="Take a photo" onChange={e=>chooseFile(e.target.files?.[0]||null)}/>
  {emojiOpen&&<div className="avora-chat-emoji-menu">{['😀','😂','😊','❤️','👍','🙏','👏','🎉','📚','💡'].map(e=><button key={e} type="button" onClick={()=>{setBody(v=>(v+e).slice(0,4000));setEmojiOpen(false);inputRef.current?.focus()}}>{e}</button>)}</div>}
  {attachmentOpen&&<div className="avora-chat-attachment-sheet"><div className="avora-chat-sheet-handle"/><button type="button" onClick={()=>fileRef.current?.click()}><span>📄</span>Document</button><button type="button" onClick={()=>galleryRef.current?.click()}><span>🖼️</span>Gallery</button><button type="button" onClick={()=>cameraRef.current?.click()}><span>📷</span>Camera</button><button type="button" onClick={()=>setAttachmentOpen(false)}><span>✕</span>Close</button></div>}
  {file&&<div className="avora-chat-file-preview"><span>📎 {file.name}</span><button type="button" onClick={()=>setFile(null)}>Remove</button></div>}
  {message&&<small role="status" className="avora-chat-error">{message}</small>}
 </div>;
}
