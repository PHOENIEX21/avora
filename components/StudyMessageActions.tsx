'use client';
import {useState} from 'react';import {useRouter} from 'next/navigation';
export default function StudyMessageActions({roomId,postId,initialStarred}:{roomId:string;postId:string;initialStarred:boolean}){
 const [starred,setStarred]=useState(initialStarred),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const router=useRouter();
 async function toggle(){if(busy)return;setBusy(true);setError('');
 try{const r=await fetch('/api/community/rooms/'+roomId+'/posts/'+postId+'/star',{method:starred?'DELETE':'POST'});
 if(!r.ok)throw Error('Could not update starred message');setStarred(!starred);router.refresh();
 }catch(e){setError(e instanceof Error?e.message:'Please retry')}finally{setBusy(false)}}
 return <span className="community-message-actions"><button type="button" disabled={busy} onClick={toggle} aria-pressed={starred} title={starred?'Remove from starred messages':'Star this message'}>{starred?'★ Starred':'☆ Star'}</button>{error&&<small role="alert">{error}</small>}</span>;
}
