'use client';
import {useState} from 'react';import {useRouter} from 'next/navigation';
const emojis=['👍','❤️','😂','😮','👏','🙏'];
export default function StudyReactions({roomId,postId,mine,counts}:{roomId:string;postId:string;mine:string|null;counts:{emoji:string;count:number}[]}){
 const router=useRouter();const [open,setOpen]=useState(false),[busy,setBusy]=useState(false);
 async function choose(emoji:string){if(busy)return;setBusy(true);try{
 const r=await fetch('/api/community/rooms/'+roomId+'/posts/'+postId+'/reaction',{method:mine===emoji?'DELETE':'POST',headers:{'Content-Type':'application/json'},...(mine===emoji?{}:{body:JSON.stringify({emoji})})});
 if(r.ok){setOpen(false);router.refresh()}}finally{setBusy(false)}}
 return <div className="community-reactions"><div className="community-reaction-summary">{counts.map(x=><button key={x.emoji} type="button" disabled={busy} onClick={()=>choose(x.emoji)} aria-label={x.count+' reactions '+x.emoji}>{x.emoji} {x.count}{mine===x.emoji?' ✓':''}</button>)}</div><button type="button" className="community-react-toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>☺ React</button>{open&&<div className="community-emoji-picker">{emojis.map(e=><button key={e} type="button" disabled={busy} onClick={()=>choose(e)}>{e}</button>)}</div>}</div>;
}
