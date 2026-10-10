'use client';
import {useRef,useState} from 'react';
import {useRouter} from 'next/navigation';

export default function AskQuestionForm({classLevel}:{classLevel:string}){
 const router=useRouter();
 const fileInput=useRef<HTMLInputElement>(null);
 const [subject,setSubject]=useState('Mathematics');
 const [question,setQuestion]=useState('');
 const [file,setFile]=useState<File|null>(null);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 async function submit(){
  setBusy(true);setError('');
  try{
   let response:Response;
   if(file){
    const data=new FormData();
    data.append('file',file);
    data.append('subject',subject);
    data.append('classLevel',classLevel);
    data.append('label','Ask AVORA question');
    response=await fetch('/api/assignments/upload',{method:'POST',body:data});
   }else{
    response=await fetch('/api/assignments/convert',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject,classLevel,label:'Ask AVORA question',rawText:question})});
   }
   const result=await response.json();
   if(!response.ok)throw new Error(result.error||'Could not submit your question.');
   router.push('/school-work/'+result.assignmentId+'?submitted=1');
  }catch(e){setError(e instanceof Error?e.message:'Submission failed. Please try again.')}finally{setBusy(false)}
 }
 return <section className="ask-question-form">
  <label>Subject<select value={subject} onChange={e=>setSubject(e.target.value)}><option>Mathematics</option><option>English Language</option></select></label>
  <div className="ask-input-modes" role="group" aria-label="Question format"><strong>Bring your question</strong><p>Type it below, or attach a clear picture or PDF. Attached files are extracted for academic review.</p></div>
  <label>Your typed question<textarea rows={7} value={question} onChange={e=>setQuestion(e.target.value)} placeholder={'Example: Solve 2x + 3y = 12 and x - y = 1\n\nYou may include options A–D.'}/></label>
  <label className="ask-file-label">Upload a picture or PDF (up to 4 MB)
   <input ref={fileInput} type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" onChange={e=>{const next=e.target.files?.[0]||null;setError('');if(next&&next.size>4*1024*1024){setFile(null);setError('File is too large. Maximum size is 4 MB.');e.target.value='';return}setFile(next)}}/>
  </label>
  {file&&<div className="ask-file-selected"><span>Attached: {file.name}</span><button type="button" onClick={()=>{setFile(null);if(fileInput.current)fileInput.current.value=''}}>Remove</button></div>}
  {file&&question.trim()&&<p className="ask-input-note">Your attachment will be submitted. Remove it to submit typed text instead.</p>}
  <p>AVORA saves the questions for academic review before preparing solutions. Only submit material you have permission to share.</p>
  <button type="button" className="premium-primary" disabled={busy||(!file&&question.trim().length<4)} onClick={submit}>{busy?'Submitting…':file?'Upload for academic approval →':'Submit for academic approval →'}</button>
  {error&&<p className="form-error" role="alert">{error}</p>}
 </section>;
}
