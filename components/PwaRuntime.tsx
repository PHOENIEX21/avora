'use client';
import {useEffect,useRef,useState} from 'react';
import {countPendingSyncActions,flushQueuedActions} from '@/lib/offline';
import {trackEvent} from '@/lib/telemetry';

type InstallPromptEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:'accepted'|'dismissed';platform:string}>};

export default function PwaRuntime(){
 const [online,setOnline]=useState(true);const [installPrompt,setInstallPrompt]=useState<InstallPromptEvent|null>(null);const [updateReady,setUpdateReady]=useState(false);const [pending,setPending]=useState(0);const [syncing,setSyncing]=useState(false);const registration=useRef<ServiceWorkerRegistration|null>(null);
 useEffect(()=>{if(typeof window==='undefined')return;const refresh=()=>setOnline(navigator.onLine);refresh();window.addEventListener('online',refresh);window.addEventListener('offline',refresh);const before=(e:Event)=>{e.preventDefault();setInstallPrompt(e as InstallPromptEvent)};window.addEventListener('beforeinstallprompt',before);return()=>{window.removeEventListener('online',refresh);window.removeEventListener('offline',refresh);window.removeEventListener('beforeinstallprompt',before)}},[]);
 useEffect(()=>{if(typeof navigator==='undefined'||!('serviceWorker'in navigator))return;let active=true;async function register(){if(process.env.NODE_ENV!=='production')return;try{const reg=await navigator.serviceWorker.register('/sw.js',{scope:'/'});if(!active)return;registration.current=reg;if(reg.waiting&&navigator.serviceWorker.controller)setUpdateReady(true);reg.addEventListener('updatefound',()=>{const worker=reg.installing;if(!worker)return;worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)setUpdateReady(true)})});navigator.serviceWorker.addEventListener('controllerchange',()=>window.location.reload());void reg.update()}catch{}}void register();return()=>{active=false}},[]);
 useEffect(()=>{let cancelled=false;async function refreshPending(){try{const n=await countPendingSyncActions();if(!cancelled)setPending(n)}catch{}}void refreshPending();const timer=window.setInterval(refreshPending,15000);return()=>{cancelled=true;window.clearInterval(timer)}},[]);
 useEffect(()=>{if(!online)return;void syncNow()},[online]);
 async function syncNow(){if(syncing)return;setSyncing(true);try{const result=await flushQueuedActions();setPending(result.remaining)}catch{}finally{setSyncing(false)}}
 async function install(){if(!installPrompt)return;await installPrompt.prompt();const choice=await installPrompt.userChoice;if(choice.outcome==='accepted')trackEvent('PWA_INSTALLED',{surface:'pwa'});setInstallPrompt(null)}
 function applyUpdate(){trackEvent('PWA_UPDATE_APPLIED',{surface:'pwa'});const waiting=registration.current?.waiting;if(waiting)waiting.postMessage({type:'SKIP_WAITING'});else window.location.reload()}
 if(!updateReady&&!installPrompt&&!pending&&!online)return null;
 return <aside className="pwa-runtime-v141" aria-live="polite">
  {!online&&<div><b>Offline</b><span>Cached lesson review remains available. Live marking needs a connection.</span></div>}
  {pending>0&&<div><b>{pending} item{pending===1?'':'s'} waiting to sync</b><button type="button" disabled={!online||syncing} onClick={()=>void syncNow()}>{syncing?'Syncing…':'Sync now'}</button></div>}
  {installPrompt&&<div><b>Install AVORA</b><span>Keep AVORA on this device for faster access.</span><button type="button" onClick={()=>void install()}>Install</button></div>}
  {updateReady&&<div><b>AVORA update ready</b><span>Your current lesson is saved. Update when ready.</span><button type="button" onClick={applyUpdate}>Update safely</button></div>}
 </aside>
}
