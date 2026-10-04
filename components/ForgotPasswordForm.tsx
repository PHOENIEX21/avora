"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordForm(){
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[done,setDone]=useState(''),[devUrl,setDevUrl]=useState('');
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setError('');setDone('');setDevUrl('');
    const f=new FormData(e.currentTarget);
    try{
      const r=await fetch('/api/auth/forgot-password',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:f.get('email')})});
      const d=await r.json();
      if(!r.ok){setError(d.error||'Could not start password reset.');return}
      setDone(d.message||'If that account exists, check your email for the reset link.');
      if(d.devResetUrl)setDevUrl(d.devResetUrl);
    }catch{setError('Could not connect to AVORA. Please try again.')}finally{setBusy(false)}
  }
  return <form onSubmit={submit} className="password-recovery-form">
    {error&&<div className="notice error">{error}</div>}
    {done&&<div className="notice success">{done}</div>}
    <div className="field"><label>Email</label><input type="email" name="email" required autoComplete="email" placeholder="you@example.com"/></div>
    <button className="btn btn-primary auth-submit" style={{width:'100%'}} disabled={busy}>{busy?'Preparing reset link…':'Send reset link'}</button>
    {devUrl&&<a className="btn password-dev-link" href={devUrl}>Open local reset link →</a>}
    <p className="auth-helper"><Link href="/login">← Back to sign in</Link></p>
  </form>
}
