'use client';

export const TELEMETRY_EVENTS = [
  'PAGE_VIEW','TUTOR_LESSON_OPENED','TUTOR_LESSON_STARTED','TUTOR_LESSON_RESTORED','TUTOR_CACHED_LESSON_USED',
  'TUTOR_RETEACH_TRIGGERED','TUTOR_LESSON_COMPLETED','TUTOR_OFFLINE_ENTERED','TUTOR_RECONNECTED',
  'EXAM_COMPLETED','EXAM_TO_TUTOR','MOCK_TO_TUTOR','PROGRESS_TO_TUTOR','LIVE_TO_TUTOR',
  'PWA_INSTALLED','PWA_UPDATE_APPLIED','FAMILY_MANAGE_OPENED'
] as const;
export type TelemetryEventName=typeof TELEMETRY_EVENTS[number];
type Context=Record<string,string|number|boolean|null|undefined>;
const KEY='avora:telemetry-queue:v1';
const SAFE_KEYS=new Set(['path','subject','classLevel','topic','exam','source','outcome','mode','reason','mockSet','offline','restored','cached','surface']);
function safeContext(input:Context={}){const out:Record<string,string|number|boolean|null>={};for(const [k,v] of Object.entries(input)){if(!SAFE_KEYS.has(k)||v===undefined)continue;if(typeof v==='string')out[k]=v.slice(0,120);else if(typeof v==='number'&&Number.isFinite(v))out[k]=v;else if(typeof v==='boolean'||v===null)out[k]=v}return out}
function queued(){if(typeof window==='undefined')return [] as any[];try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch{return []}}
function save(items:any[]){try{localStorage.setItem(KEY,JSON.stringify(items.slice(-100)))}catch{}}
async function send(item:any){const r=await fetch('/api/telemetry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(item),keepalive:true});if(r.status===401||r.status===403)return 'auth';if(!r.ok)throw new Error('telemetry failed');return 'ok'}
export async function flushTelemetry(){if(typeof window==='undefined'||!navigator.onLine)return;const items=queued();if(!items.length)return;const remaining:any[]=[];for(let i=0;i<items.length;i++){try{const state=await send(items[i]);if(state==='auth'){remaining.push(...items.slice(i));break}}catch{remaining.push(...items.slice(i));break}}save(remaining)}
export function trackEvent(eventName:TelemetryEventName,context:Context={}){if(typeof window==='undefined')return;const item={eventName,context:safeContext(context),clientTime:new Date().toISOString()};if(!navigator.onLine){save([...queued(),item]);return}void send(item).catch(()=>save([...queued(),item]))}
