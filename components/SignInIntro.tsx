"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function tryPlaySonicMark(){
  try{
    const W = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const AudioCtx = window.AudioContext || W.webkitAudioContext;
    if(!AudioCtx) return;
    const ctx = new AudioCtx();
    void ctx.resume().catch(()=>{});
    const now = ctx.currentTime + 0.04;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.12, now + 0.06);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.45);
    master.connect(ctx.destination);
    [293.66,369.99,440,587.33].forEach((frequency,index)=>{
      const osc=ctx.createOscillator();
      const gain=ctx.createGain();
      osc.type=index<2?'sine':'triangle';
      osc.frequency.value=frequency;
      const start=now+index*.16;
      const end=start+.56;
      gain.gain.setValueAtTime(.0001,start);
      gain.gain.exponentialRampToValueAtTime(index===3?.28:.16,start+.06);
      gain.gain.exponentialRampToValueAtTime(.0001,end);
      osc.connect(gain); gain.connect(master); osc.start(start); osc.stop(end+.02);
    });
    window.setTimeout(()=>{ try{ void ctx.close(); }catch{} },1800);
  }catch{}
}

export default function SignInIntro(){
  const router=useRouter();
  const [leaving,setLeaving]=useState(false);
  const finished=useRef(false);

  function finish(){
    if(finished.current) return;
    finished.current=true;
    setLeaving(true);
    window.setTimeout(()=>window.location.replace('/home'),260);
  }

  useEffect(()=>{
    tryPlaySonicMark();
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer=window.setTimeout(finish, reduce ? 900 : 4800);
    return()=>window.clearTimeout(timer);
    // finish is intentionally bound to this mounted intro only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return <div className={`avora-signin-ident${leaving?' ident-leaving':''}`} role="status" aria-live="polite" aria-label="Welcome to AVORA">
    <div className="ident-orbit ident-orbit-a" aria-hidden="true" />
    <div className="ident-orbit ident-orbit-b" aria-hidden="true" />
    <div className="ident-mark-wrap"><img className="ident-mark" src="/avora-mark.svg" alt="AVORA" /></div>
    <div className="ident-wordmark">AVORA</div>
    <p>Learning that understands you.</p>
    <button type="button" className="ident-skip" onClick={finish}>Skip</button>
  </div>;
}
