"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function UserNav({name}:{name:string}){
 const router=useRouter(); const [busy,setBusy]=useState(false); const first=name.trim().split(/\s+/)[0]||'Learner';
 async function logout(){setBusy(true);try{await fetch('/api/auth/logout',{method:'POST'});router.replace('/');router.refresh()}finally{setBusy(false)}}
 return <div className="user-nav"><span className="user-avatar">{first.slice(0,1).toUpperCase()}</span><span className="user-name">{first}</span><button className="signout-link" onClick={logout} disabled={busy}>{busy?'…':'Sign out'}</button></div>
}
