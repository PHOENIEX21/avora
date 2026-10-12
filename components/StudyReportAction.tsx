'use client';import {useState} from 'react';
export default function StudyReportAction({roomId,postId}:{roomId:string;postId:string}){
 const [open,setOpen]=useState(false),[reason,setReason]=useState(''),[busy,setBusy]=useState(false),[msg,setMsg]=useState('');
 async function send(){setBusy(true);try{const r=await fetch('/api/community/rooms/'+roomId+'/posts/'+postId+'/report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({reason})});const d=await r.json();setMsg(d.message||d.error||'Unable to report');if(r.ok)setOpen(false)}catch{setMsg('Unable to report')}finally{setBusy(false)}}
 return <span className="community-report-action"><button type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>⚑ Report</button>{open&&<span className="community-report-form"><label>Reason for reporting<input maxLength={500} value={reason} onChange={e=>setReason(e.target.value)} placeholder="Bullying, spam, unsafe content…"/></label><button type="button" disabled={busy||reason.trim().length<5} onClick={send}>Submit report</button></span>}{msg&&<small role="status">{msg}</small>}</span>;
}
