export type AiProvider='gemini'|'openai';
export type AiUsage={inputTokens:number;outputTokens:number;provider:AiProvider;model:string;estimatedCostUsd:number};
export type AiResult<T=string>={ok:true;text:string;json?:T;usage:AiUsage}|{ok:false;error:string;provider?:AiProvider;status?:number;detail?:string};

const GEMINI_MODEL=process.env.GEMINI_MODEL?.trim()||'gemini-3.6-flash';
const OPENAI_MODEL=process.env.OPENAI_MODEL?.trim()||process.env.AI_MODEL?.trim()||'gpt-5.6-luna';

function providerOrder():AiProvider[]{
  const preferred=(process.env.AI_PROVIDER||'gemini').trim().toLowerCase();
  return preferred==='openai'?['openai','gemini']:['gemini','openai'];
}
function hasProvider(p:AiProvider){return p==='gemini'?Boolean(process.env.GEMINI_API_KEY?.trim()):Boolean(process.env.OPENAI_API_KEY?.trim()||process.env.AI_API_KEY?.trim());}
function cleanPrompt(value:string){return value.replace(/\b(?:email|phone|full name|parent name|address)\s*[:=][^\n]{1,160}/gi,'[private account detail removed]');}

// Gemini generateContent accepts a JSON-Schema subset. In particular, nullable values
// should use type:["string","null"] rather than OpenAI-style anyOf unions.
function geminiSchema(value:any):any{
  if(Array.isArray(value))return value.map(geminiSchema);
  if(!value||typeof value!=='object')return value;
  const out:any={};
  for(const [key,item] of Object.entries(value)){
    if(key==='additionalProperties')continue;
    if(key==='anyOf'&&Array.isArray(item)){
      const options=(item as any[]).map(x=>x&&typeof x==='object'?x:null).filter(Boolean);
      const types=options.map(x=>x.type).filter((x:any)=>typeof x==='string');
      const onlyTypes=options.every(x=>Object.keys(x).every(k=>k==='type'));
      if(onlyTypes&&types.length===options.length){
        out.type=types.find((type:string)=>type!=='null')||types[0];
        if(types.includes('null'))out.nullable=true;
        continue;
      }
    }
    if(key==='type'&&Array.isArray(item)){
      out.type=item.find((type:string)=>type!=='null')||item[0];
      if(item.includes('null'))out.nullable=true;
      continue;
    }
    out[key]=geminiSchema(item);
  }
  return out;
}

function safeProviderError(raw:any){
  const status=String(raw?.error?.status||'').replace(/[^A-Z0-9_\-]/gi,'').slice(0,80);
  const message=String(raw?.error?.message||'').replace(/[\r\n\t]+/g,' ').replace(/\s+/g,' ').slice(0,240);
  return [status,message].filter(Boolean).join(': ');
}

async function geminiStructured<T>(instructions:string,input:string,schema:any,maxOutputTokens=180):Promise<AiResult<T>>{
 const key=process.env.GEMINI_API_KEY?.trim();if(!key)return {ok:false,error:'GEMINI_NOT_CONFIGURED'};
 const model=GEMINI_MODEL;
 const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{
  method:'POST',headers:{'x-goog-api-key':key,'Content-Type':'application/json'},
  body:JSON.stringify({systemInstruction:{parts:[{text:cleanPrompt(instructions)}]},contents:[{role:'user',parts:[{text:cleanPrompt(input)}]}],generationConfig:{temperature:0.15,maxOutputTokens,responseMimeType:'application/json',responseSchema:geminiSchema(schema)}})
 });
 if(!response.ok){
  const raw=await response.json().catch(()=>null);
  return {ok:false,error:'GEMINI_REQUEST_FAILED',provider:'gemini',status:response.status,detail:safeProviderError(raw)||undefined};
 }
 const raw:any=await response.json();
 const text=raw?.candidates?.[0]?.content?.parts?.map((p:any)=>p?.text||'').join('').trim();
 if(!text)return {ok:false,error:'GEMINI_EMPTY_RESPONSE',provider:'gemini'};
 try{
  const json=JSON.parse(text) as T;const meta=raw.usageMetadata||{};
  return {ok:true,text,json,usage:{inputTokens:Number(meta.promptTokenCount||0),outputTokens:Number(meta.candidatesTokenCount||0),provider:'gemini',model,estimatedCostUsd:0}};
 }catch{return {ok:false,error:'GEMINI_INVALID_JSON',provider:'gemini'};}
}

async function openaiStructured<T>(instructions:string,input:string,schema:any,name:string,maxOutputTokens=180):Promise<AiResult<T>>{
 const key=process.env.OPENAI_API_KEY?.trim()||process.env.AI_API_KEY?.trim();if(!key)return {ok:false,error:'OPENAI_NOT_CONFIGURED'};
 const model=OPENAI_MODEL;
 const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model,store:false,instructions:cleanPrompt(instructions),input:cleanPrompt(input),text:{format:{type:'json_schema',name,strict:true,schema}}})});
 if(!response.ok)return {ok:false,error:'OPENAI_REQUEST_FAILED',provider:'openai',status:response.status};
 const raw:any=await response.json();const text=raw.output_text||raw.output?.flatMap((x:any)=>x.content||[]).find((x:any)=>x.type==='output_text')?.text;
 if(!text)return {ok:false,error:'OPENAI_EMPTY_RESPONSE',provider:'openai'};
 try{const json=JSON.parse(text) as T;const usage=raw.usage||{};const inputTokens=Number(usage.input_tokens||0),outputTokens=Number(usage.output_tokens||0);const estimatedCostUsd=(inputTokens/1_000_000)*0.20+(outputTokens/1_000_000)*1.20;return {ok:true,text,json,usage:{inputTokens,outputTokens,provider:'openai',model,estimatedCostUsd}};}catch{return {ok:false,error:'OPENAI_INVALID_JSON',provider:'openai'};}
}

export async function aiStructured<T>(args:{instructions:string;input:string;schema:any;name:string;maxOutputTokens?:number}):Promise<AiResult<T>>{
 let last:AiResult<T>={ok:false,error:'NO_AI_PROVIDER_CONFIGURED'};
 for(const provider of providerOrder()){
  if(!hasProvider(provider))continue;
  last=provider==='gemini'?await geminiStructured<T>(args.instructions,args.input,args.schema,args.maxOutputTokens):await openaiStructured<T>(args.instructions,args.input,args.schema,args.name,args.maxOutputTokens);
  if(last.ok)return last;
 }
 return last;
}

export function configuredAiProvider(){return providerOrder().find(hasProvider)||null;}
