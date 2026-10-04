"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({token}:{token:string}){
  const router=useRouter();
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[done,setDone]=useState(false);
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setError('');
    const f=new FormData(e.currentTarget);const password=String(f.get('password')||''),confirm=String(f.get('confirmPassword')||'');
    if(password.length<8){setBusy(false);setError('Password must be at least 8 characters.');return}
    if(password!==confirm){setBusy(false);setError('The two passwords do not match.');return}
    try{
      const r=await fetch('/api/auth/reset-password',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token,password})});
      const d=await r.json();if(!r.ok){setError(d.error||'Could not reset password.');return}
      setDone(true);window.setTimeout(()=>router.replace('/login?reset=success'),900);
    }catch{setError('Could not connect to AVORA. Please try again.')}finally{setBusy(false)}
  }
  if(!token)return <div className="notice error">This reset link is incomplete. <Link href="/forgot-password">Request a new one.</Link></div>;
  if(done)return <div className="notice success">Password changed successfully. Taking you to sign in…</div>;
  return <form onSubmit={submit} className="password-recovery-form">
    {error&&<div className="notice error">{error}</div>}
    <div className="field"><label>New password</label><input type="password" name="password" required minLength={8} maxLength={128} autoComplete="new-password"/></div>
    <div className="field"><label>Confirm new password</label><input type="password" name="confirmPassword" required minLength={8} maxLength={128} autoComplete="new-password"/></div>
    <button className="btn btn-primary auth-submit" style={{width:'100%'}} disabled={busy}>{busy?'Changing password…':'Change password'}</button>
    <p className="auth-helper"><Link href="/login">← Back to sign in</Link></p>
  </form>
}
