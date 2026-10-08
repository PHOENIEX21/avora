'use client';
import {useEffect,useState} from 'react';
type Admin={user_id:string;full_name:string;email:string};
export default function CommunityAdminManager(){
 const [admins,setAdmins]=useState<Admin[]>([]),[email,setEmail]=useState(''),[msg,setMsg]=useState(''),[busy,setBusy]=useState(false);
 async function load(){const r=await fetch('/api/community/admins');if(r.ok){const d=await r.json();setAdmins(d.admins||[])}}
 useEffect(()=>{void load()},[]);
 async function grant(){setBusy(true);setMsg('');try{const r=await fetch('/api/community/admins',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});const d=await r.json();if(!r.ok)throw Error(d.error||'Could not grant access');setEmail('');setMsg('Admin access granted');await load()}catch(e){setMsg(e instanceof Error?e.message:'Error')}finally{setBusy(false)}}
 async function revoke(userId:string){if(!window.confirm('Remove this person’s community admin access?'))return;setBusy(true);try{const r=await fetch('/api/community/admins',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId})});if(!r.ok)throw Error('Could not revoke access');setMsg('Admin access revoked');await load()}catch(e){setMsg(e instanceof Error?e.message:'Error')}finally{setBusy(false)}}
 return <section className="community-admin-manager"><h2>Community administrators</h2><p>You are the owner. Only you can appoint or remove group administrators. Delegated administrators cannot appoint others or manage AVORA's global administration.</p><label htmlFor="community-admin-email">Existing learner or staff account email</label><div className="community-admin-grant"><input id="community-admin-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="person@example.com"/><button type="button" disabled={busy||!email.trim()} onClick={grant}>Grant admin access</button></div>{msg&&<p role="status">{msg}</p>}{admins.map(a=><div key={a.user_id} className="community-admin-entry"><span>{a.full_name} — {a.email}</span><button type="button" disabled={busy} onClick={()=>revoke(a.user_id)}>Remove admin</button></div>)}</section>;
}
