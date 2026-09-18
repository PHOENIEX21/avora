'use client';
import {FormEvent,useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';

type Message={id:string;sender_role:string;body:string;created_at:string;sender_name?:string|null};
export default function AdminSupportConsole({threadId,initialThread,initialMessages}:{threadId:string;initialThread:any;initialMessages:Message[]}){
 const router=useRouter();const [thread,setThread]=useState(initialThread),[messages,setMessages]=useState(initialMessages),[sending,setSending]=useState(false),[error,setError]=useState('');
 async function refresh(){const r=await fetch(`/api/support/${threadId}/messages`,{cache:'no-store'});const d=await r.json();if(r.ok){setThread(d.thread);setMessages(d.messages||[])}}
 useEffect(()=>{const t=setInterval(refresh,5000);return()=>clearInterval(t)},[]);// eslint-disable-line react-hooks/exhaustive-deps
 async function send(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget),message=String(f.get('message')||'').trim();if(!message)return;setSending(true);const r=await fetch(`/api/support/${threadId}/messages`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message})});const d=await r.json();setSending(false);if(!r.ok){setError(d.error||'Could not send.');return}e.currentTarget.reset();await refresh();router.refresh()}
 async function act(payload:any){setError('');const r=await fetch(`/api/admin/support/${threadId}`,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});const d=await r.json();if(!r.ok){setError(d.error||'Could not update conversation.');return}await refresh();router.refresh()}
 return <div className="admin-support-console">
  <div className="admin-support-toolbar"><div><button type="button" onClick={()=>act({action:'ASSIGN_SELF'})}>Assign to me</button><select value={thread.priority} onChange={e=>act({action:'PRIORITY',priority:e.target.value})}><option>LOW</option><option>NORMAL</option><option>HIGH</option><option>URGENT</option></select><select value={thread.status} onChange={e=>act({action:'STATUS',status:e.target.value})}><option value="OPEN">Open</option><option value="WAITING_ON_SUPPORT">Waiting on support</option><option value="WAITING_ON_STUDENT">Waiting on student</option><option value="RESOLVED">Resolved</option><option value="CLOSED">Closed</option></select></div><span>Auto-refreshes every 5 seconds</span></div>
  <div className="admin-support-stream">{messages.map(m=><article key={m.id} className={`support-bubble ${m.sender_role==='ADMIN'?'mine':'theirs'}`}><div><b>{m.sender_role==='ADMIN'?(m.sender_name||'AVORA Support'):(m.sender_name||'Student')}</b><time>{new Date(m.created_at).toLocaleString('en-NG',{dateStyle:'medium',timeStyle:'short'})}</time></div><p>{m.body}</p></article>)}</div>
  {thread.status!=='CLOSED'&&<form className="support-compose admin-compose" onSubmit={send}><label htmlFor="admin-support-message">Reply as AVORA Support</label><textarea id="admin-support-message" name="message" maxLength={4000} placeholder="Write a clear, helpful response…" required/><div><small>Replies are visible to the learner immediately after refresh.</small><button disabled={sending}>{sending?'Sending…':'Send reply'}</button></div></form>}
  {error&&<p className="form-error">{error}</p>}
 </div>
}
