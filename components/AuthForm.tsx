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
 const [registerClass,setRegisterClass]=useState('');
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
  if(mode==='login'){
    // Start the sonic mark while we are still in the user-initiated sign-in flow,
    // then navigate to a dedicated intro route. This makes the visual ident
    // reliable even when the login form unmounts immediately after auth succeeds.
    playAvoraSonicMark(audioRef.current);
    router.replace('/signin-intro');
    router.refresh();
    return;
  }
  router.replace('/home'); router.refresh();
 }


 return <form onSubmit={submit} method="post" action={`/api/auth/${mode}`}>{error&&<div className="notice error">{error}</div>}{mode==='register'&&<><div className="field"><label>Full name</label><input name="fullName" required minLength={2}/></div><div className="field"><label>Class</label><select name="classLevel" value={registerClass} onChange={e=>setRegisterClass(e.target.value)} required><option value="" disabled>Choose your class</option><option>Primary 5</option><option>Primary 6</option><option>JSS1</option><option>JSS2</option><option>JSS3</option></select><small>Your class controls the curriculum, Tutor, Practice and Exam questions shown to you.</small></div><div className="field"><label>Learning route</label><input value={!registerClass?'Choose your class first':registerClass.startsWith('Primary')?'NCEE · National Common Entrance':'BECE · Basic Education Certificate'} disabled aria-label="Learning route"/><small>{!registerClass?'AVORA will assign the correct exam route after you choose a class.':registerClass.startsWith('Primary')?'Primary 5 and Primary 6 enter AVORA Common Entrance Prep.':'JSS1–JSS3 enter the BECE learning path.'}</small></div></>}<div className="field"><label>Email</label><input type="email" name="email" required autoComplete="email"/></div><div className="field"><label>Password</label><input type="password" name="password" required minLength={mode==='register'?8:1} autoComplete={mode==='login'?'current-password':'new-password'}/></div>{mode==='login'&&<p className="auth-help-link"><a href="/forgot-password">Forgot password?</a></p>}<button className="btn btn-primary auth-submit" style={{width:'100%',marginTop:8}} disabled={busy}>{busy?<><span className="button-spinner" aria-hidden="true"/> {mode==='login'?'Signing you in…':'Creating your account…'}</>:mode==='login'?'Sign in':'Create my AVORA account'}</button></form>
}
