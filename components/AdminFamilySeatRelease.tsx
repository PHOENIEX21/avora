'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
export default function AdminFamilySeatRelease({familyId,studentId,studentName}:{familyId:string;studentId:string;studentName:string}){
 const r=useRouter();const[busy,setBusy]=useState(false);const[msg,setMsg]=useState('');
 async function release(){const reason=window.prompt(`Reason for releasing ${studentName}'s family seat? This should only be used for a verified family change.`);if(!reason||reason.trim().length<8)return;setBusy(true);setMsg('');try{const res=await fetch(`/api/admin/families/${familyId}/release-seat`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({studentId,reason})});const d=await res.json();if(!res.ok)throw new Error(d.error||'Could not release seat.');r.refresh()}catch(e:any){setMsg(e.message)}finally{setBusy(false)}}
 return <div className="admin-seat-release"><button type="button" disabled={busy} onClick={release}>{busy?'Releasing…':'Release seat'}</button>{msg&&<small>{msg}</small>}</div>
}
