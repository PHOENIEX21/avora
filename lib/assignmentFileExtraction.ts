type ExtractedAssignment={questions:{originalText:string}[]};

const schema={
 type:'object',
 properties:{
  questions:{
   type:'array',
   items:{
    type:'object',
    properties:{originalText:{type:'string'}},
    required:['originalText']
   }
  }
 },
 required:['questions']
};

function cleanProviderError(raw:any){
 const status=String(raw?.error?.status||'').replace(/[^A-Z0-9_\-]/gi,'').slice(0,80);
 const message=String(raw?.error?.message||'').replace(/[\r\n\t]+/g,' ').replace(/\s+/g,' ').slice(0,240);
 return [status,message].filter(Boolean).join(': ');
}

export async function extractAssignmentFile(args:{bytes:Buffer;mimeType:string;fileName:string;classLevel:string;subject:string}){
 const key=process.env.GEMINI_API_KEY?.trim();
 if(!key)return {ok:false as const,error:'Question image/PDF extraction needs the configured Gemini model.'};
 const model=process.env.GEMINI_MODEL?.trim()||'gemini-3.6-flash';
 const instructions=[
  'You are AVORA school-work extraction.',
  'Read the attached Nigerian junior-secondary assignment, classwork, test or homework image/PDF.',
  'Extract every actual student question in reading order.',
  'Preserve the teacher wording as closely as possible.',
  'If a question already contains answer choices, preserve every supplied option exactly and keep A., B., C., D. labels on separate lines.',
  'Do not invent options, answers or solutions during extraction.',
  'Do not turn headings, instructions, marks, page numbers or examples into questions unless they are genuinely part of a question.',
  'For multipart questions, keep the parts together when they belong to one numbered question.',
  'Return only the structured question list.'
 ].join(' ');
 const prompt=`${instructions}\n\nClass: ${args.classLevel}\nSubject: ${args.subject}\nFile name: ${args.fileName}`;
 const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{
  method:'POST',
  headers:{'x-goog-api-key':key,'Content-Type':'application/json'},
  body:JSON.stringify({
   contents:[{role:'user',parts:[
    {text:prompt},
    {inlineData:{mimeType:args.mimeType,data:args.bytes.toString('base64')}}
   ]}],
   generationConfig:{
    temperature:0,
    maxOutputTokens:5000,
    responseMimeType:'application/json',
    responseSchema:schema
   }
  })
 });
 if(!response.ok){
  const raw=await response.json().catch(()=>null);
  return {ok:false as const,error:cleanProviderError(raw)||'The uploaded school work could not be read.'};
 }
 const raw:any=await response.json();
 const text=raw?.candidates?.[0]?.content?.parts?.map((p:any)=>p?.text||'').join('').trim();
 if(!text)return {ok:false as const,error:'No readable questions were found in this upload.'};
 try{
  const parsed=JSON.parse(text) as ExtractedAssignment;
  const questions=(parsed.questions||[]).map(q=>({originalText:String(q.originalText||'').trim()})).filter(q=>q.originalText);
  if(!questions.length)return {ok:false as const,error:'No readable questions were found in this upload.'};
  return {ok:true as const,questions};
 }catch{
  return {ok:false as const,error:'The uploaded questions were read, but the extraction result was invalid.'};
 }
}
