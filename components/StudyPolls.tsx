'use client';
import {useState} from 'react';import {useRouter} from 'next/navigation';
export default function StudyPolls({roomId,polls}:{roomId:string;polls:{id:string;question:string;options:string[];counts:number[];mine:number|null}[]}){
 const router=useRouter();const [editing,setEditing]=useState(false),[question,setQuestion]=useState(''),[choices,setChoices]=useState(['','']),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function request(url:string,payload:unknown){
  const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  const t=await r.text();let d:{error?:string}={};try{d=t?JSON.parse(t):{}}catch{throw Error('Unexpected server response ('+r.status+').')}
  if(!r.ok)throw Error(d.error||'Request failed ('+r.status+').');router.refresh();
 }
 async function create(){setBusy(true);setError('');try{await request('/api/community/rooms/'+roomId+'/polls',{question,options:choices});setEditing(false);setQuestion('');setChoices(['',''])}catch(e){setError(e instanceof Error?e.message:'Poll failed')}finally{setBusy(false)}}
 async function vote(id:string,optionIndex:number){setBusy(true);setError('');try{await request('/api/community/rooms/'+roomId+'/polls/'+id+'/vote',{optionIndex})}catch(e){setError(e instanceof Error?e.message:'Vote failed')}finally{setBusy(false)}}
 return <section className="study-polls"><header><h2>Group polls</h2><button type="button" onClick={()=>setEditing(!editing)}>{editing?'Cancel':'Create poll +'}</button></header>
 {editing&&<div className="study-poll-editor"><input aria-label="Poll question" placeholder="Ask a class question…" value={question} onChange={e=>setQuestion(e.target.value)}/>{choices.map((choice,i)=><input key={i} aria-label={'Choice '+(i+1)} placeholder={'Choice '+(i+1)} value={choice} onChange={e=>setChoices(x=>x.map((v,j)=>i===j?e.target.value:v))}/>)}<button type="button" disabled={choices.length>=6} onClick={()=>setChoices(x=>[...x,''])}>Add choice</button><button type="button" disabled={busy||question.trim().length<5||choices.some(x=>!x.trim())} onClick={create}>Publish poll</button></div>}
 {polls.map(p=><article key={p.id} className="study-poll-card"><h3>{p.question}</h3>{p.options.map((o,i)=><button type="button" disabled={busy} key={i} onClick={()=>vote(p.id,i)} aria-pressed={p.mine===i}>{o} · {p.counts[i]||0} votes {p.mine===i?'✓':''}</button>)}</article>)}{error&&<p role="alert">{error}</p>}</section>;
}
