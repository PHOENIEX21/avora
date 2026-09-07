"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { readJson } from "@/lib/clientFetch";

function playAvoraSonicMark(ctx: AudioContext | null){
  if(!ctx || ctx.state === 'closed') return;
  try{
    const now = ctx.currentTime + 0.03;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.14, now + 0.05);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);
    master.connect(ctx.destination);
    const notes = [293.66, 369.99, 440, 587.33];
    notes.forEach((frequency,index)=>{
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = index < 2 ? 'sine' : 'triangle';
      osc.frequency.value = frequency;
      const start = now + index * 0.16;
      const end = start + 0.56;
      gain.gain.setValueAtTime(0.0001,start);
      gain.gain.exponentialRampToValueAtTime(index === 3 ? 0.32 : 0.18,start + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001,end);
      osc.connect(gain); gain.connect(master); osc.start(start); osc.stop(end + 0.02);
    });
  }catch{}
}

export default function AuthForm({mode}:{mode:'login'|'register'}){
 const router=useRouter();
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const [verify,setVerify]=useState<{email:string;emailSent:boolean;devVerificationUrl?:string}|null>(null);
 const audioRef=useRef<AudioContext|null>(null);

 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault(); setBusy(true); setError('');
  if(mode==='login' && typeof window!=='undefined'){
    try{
      const AudioCtx = window.AudioContext || (window as typeof window & {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
      if(AudioCtx){ audioRef.current = audioRef.current || new AudioCtx(); void audioRef.current.resume(); }
    }catch{}
  }
  const form=new FormData(e.currentTarget); const body=Object.fromEntries(form.entries());
  const r=await fetch(`/api/auth/${mode}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  let d:any;
  try{ d=await readJson<any>(r); }catch(err:any){ setBusy(false); setError(err.message||'AVORA could not complete sign in.'); return; }
  if(!r.ok){setBusy(false);setError(d.error||'Something went wrong.');return}
  if(mode==='register'&&d.verificationRequired){setBusy(false);setVerify({email:d.email,emailSent:!!d.emailSent,devVerificationUrl:d.devVerificationUrl});return}
  if(mode==='login'){
    // Start the sonic mark while we are still in the user-initiated sign-in flow,
    // then navigate to a dedicated intro route. This makes the visual ident
    // reliable even when the login form unmounts immediately after auth succeeds.
    playAvoraSonicMark(audioRef.current);
    // Authentication changes the server-rendered root layout (public vs signed-in nav).
    // A full navigation guarantees the new httpOnly session cookie is reflected in
    // the root layout immediately instead of preserving the cached logged-out layout.
    window.location.assign('/signin-intro');
    return;
  }
  window.location.assign('/signin-intro'); router.refresh();
 }


 if(verify)return <div className="verify-card"><div className="verify-icon">✓</div><h3>Check your inbox</h3><p>We created your AVORA account for <strong>{verify.email}</strong>. Verify that email to unlock your learning space.</p>{verify.emailSent?<div className="notice success">Verification email sent successfully.</div>:<div className="notice">SendGrid is not configured yet, so no email was sent.</div>}{verify.devVerificationUrl&&<a className="btn btn-primary" href={verify.devVerificationUrl}>Verify locally →</a>}<p className="microcopy">The verification link expires after 30 minutes.</p></div>
 return <form onSubmit={submit}>{error&&<div className="notice error">{error}</div>}{mode==='register'&&<><div className="field"><label>Full name</label><input name="fullName" required minLength={2}/></div><div className="field"><label>Class</label><select name="classLevel" defaultValue="JSS3"><option>JSS1</option><option>JSS2</option><option>JSS3</option></select></div><div className="field"><label>Target exam</label><select name="targetExam" defaultValue="BECE"><option>Common Entrance</option><option>BECE</option></select></div></>}<div className="field"><label>Email</label><input type="email" name="email" required autoComplete="email"/></div><div className="field"><label>Password</label><input type="password" name="password" required minLength={mode==='register'?8:1} autoComplete={mode==='login'?'current-password':'new-password'}/></div><button className="btn btn-primary auth-submit" style={{width:'100%',marginTop:8}} disabled={busy}>{busy?<><span className="button-spinner" aria-hidden="true"/> {mode==='login'?'Signing you in…':'Creating your account…'}</>:mode==='login'?'Sign in':'Create my AVORA account'}</button></form>
}
