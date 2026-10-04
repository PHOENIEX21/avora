'use client';
import Link from 'next/link';
import {FormEvent,useState} from 'react';
import {useRouter,useSearchParams} from 'next/navigation';

export function ForgotPasswordForm(){
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState(''),[devUrl,setDevUrl]=useState('');
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setError('');setMessage('');setDevUrl('');
    const form=new FormData(e.currentTarget);
    try{
      const r=await fetch('/api/auth/forgot-password',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:form.get('email')})});
      const d=await r.json();
      if(!r.ok)throw new Error(d.error||'Could not request a reset link.');
      setMessage(d.message||'Check your email for the next step.');
      if(d.devResetUrl)setDevUrl(d.devResetUrl);
    }catch(e:any){setError(e.message||'Could not request a reset link.')}finally{setBusy(false)}
  }
  return <form onSubmit={submit}>{error&&<div className="notice error">{error}</div>}{message&&<div className="notice success">{message}</div>}<div className="field"><label>Email</label><input type="email" name="email" autoComplete="email" required/></div><button className="btn btn-primary" style={{width:'100%'}} disabled={busy}>{busy?'Preparing reset…':'Send reset link'}</button>{devUrl&&<a className="btn btn-secondary" style={{width:'100%',marginTop:10}} href={devUrl}>Open local reset link →</a>}<p style={{textAlign:'center',fontSize:14}}><Link href="/login" style={{fontWeight:800}}>Back to sign in</Link></p></form>
}

export function ResetPasswordForm(){
  const router=useRouter(),sp=useSearchParams();
  const token=sp.get('token')||'';
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[done,setDone]=useState(false);
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setError('');
    const form=new FormData(e.currentTarget);const password=String(form.get('password')||''),confirm=String(form.get('confirm')||'');
    if(password!==confirm){setBusy(false);setError('The two passwords do not match.');return}
    try{
      const r=await fetch('/api/auth/reset-password',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token,password})});
      const d=await r.json();if(!r.ok)throw new Error(d.error||'Could not reset password.');setDone(true);
    }catch(e:any){setError(e.message||'Could not reset password.')}finally{setBusy(false)}
  }
  if(done)return <div className="verify-card"><div className="verify-icon">✓</div><h3>Password changed</h3><p>Your new AVORA password is ready.</p><button className="btn btn-primary" onClick={()=>{router.replace('/login');router.refresh()}}>Sign in →</button></div>;
  if(!token)return <div className="notice error">This reset link is incomplete. <Link href="/forgot-password">Request a new one.</Link></div>;
  return <form onSubmit={submit}>{error&&<div className="notice error">{error}</div>}<div className="field"><label>New password</label><input type="password" name="password" minLength={8} maxLength={128} autoComplete="new-password" required/></div><div className="field"><label>Confirm new password</label><input type="password" name="confirm" minLength={8} maxLength={128} autoComplete="new-password" required/></div><button className="btn btn-primary" style={{width:'100%'}} disabled={busy}>{busy?'Changing password…':'Change password'}</button></form>
}
