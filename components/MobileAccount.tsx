'use client';
import {useState} from 'react';import {useRouter} from 'next/navigation';
export default function MobileAccount({name}:{name:string}){const router=useRouter();const [busy,setBusy]=useState(false);const first=name.trim().split(/\s+/)[0]||'Learner';async function logout(){setBusy(true);await fetch('/api/auth/logout',{method:'POST'});window.location.assign('/')}return <div className="mobile-account"><span className="mobile-account-avatar">{first[0]?.toUpperCase()}</span><span>{first}</span><button onClick={logout} disabled={busy}>{busy?'…':'Sign out'}</button></div>}
