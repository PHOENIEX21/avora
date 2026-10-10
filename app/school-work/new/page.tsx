'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function NewSchoolWorkPage(){
 const router=useRouter();
 const [subject,setSubject]=useState('Mathematics'),[classLevel,setClassLevel]=useState('JSS1'),[label,setLabel]=useState(''),[rawText,setRawText]=useState(''),[preview,setPreview]=useState<any>(null),[file,setFile]=useState<File|null>(null),[mode,setMode]=useState<'TYPE'|'UPLOAD'>('TYPE'),[busy,setBusy]=useState(false),[error,setError]=useState('');

 async function inspect(){
  setBusy(true);setError('');
  try{
   const r=await fetch('/api/assignments/convert',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject,classLevel,label,rawText})});
   const d=await r.json();if(!r.ok)throw new Error(d.error);setPreview(d);
  }catch(e:any){setError(e.message||'Could not inspect this school work.')}finally{setBusy(false)}
 }

 async function saveTyped(){
  setBusy(true);setError('');
  try{
   const r=await fetch('/api/assignments/convert',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject,classLevel,label,rawText})});
   const d=await r.json();if(!r.ok)throw new Error(d.error);
   router.push('/school-work/'+encodeURIComponent(d.assignmentId)+'?submitted=1');router.refresh();
  }catch(e:any){setError(e.message||'Could not save this school work.')}finally{setBusy(false)}
 }

 async function uploadSchoolWork(){
  if(!file)return;
  setBusy(true);setError('');
  try{
   const form=new FormData();
   form.set('file',file);form.set('classLevel',classLevel);form.set('subject',subject);form.set('label',label);
   const r=await fetch('/api/assignments/upload',{method:'POST',body:form});
   const d=await r.json();if(!r.ok)throw new Error(d.error);
   router.push('/school-work/'+encodeURIComponent(d.assignmentId)+'?submitted=1');router.refresh();
  }catch(e:any){setError(e.message||'Could not read and prepare this upload.')}finally{setBusy(false)}
 }

 return <main className="shell school-work-new">
  <header><span className="section-kicker">ADD SCHOOL WORK</span><h1>Type it, photograph it, or upload the PDF.</h1><p>AVORA can take a typed question, a clear question photo, or a PDF assignment. Existing A–D options are preserved. Your original question is saved first. An academic admin approves it before AVORA prepares any AI solution or CBT conversion.</p></header>

  <section className="school-work-form">
   <div className="school-work-fields"><label>Class<select value={classLevel} onChange={e=>setClassLevel(e.target.value)}><option>JSS1</option><option>JSS2</option><option>JSS3</option></select></label><label>Subject<select value={subject} onChange={e=>setSubject(e.target.value)}><option>Mathematics</option><option>English Language</option></select></label><label>Assignment name<input value={label} onChange={e=>setLabel(e.target.value)} placeholder="e.g. Monday Mathematics homework"/></label></div>

   <div className="school-work-actions">
    <button type="button" className={mode==='TYPE'?'premium-primary':'premium-secondary'} onClick={()=>{setMode('TYPE');setError('')}}>Type or paste</button>
    <button type="button" className={mode==='UPLOAD'?'premium-primary':'premium-secondary'} onClick={()=>{setMode('UPLOAD');setError('');setPreview(null)}}>Photo / PDF</button>
   </div>

   {mode==='TYPE'?<>
    <label className="school-work-text"><span>Questions</span><small className="phone-input-help">Type naturally: “Find the HCF of 18 and 24” is enough. For many questions, use 1., 2., 3. or put each question on a new line. You can also paste from WhatsApp or Notes.</small><textarea inputMode="text" autoCapitalize="sentences" autoCorrect="on" spellCheck={subject==='English Language'} enterKeyHint="enter" value={rawText} onChange={e=>{setRawText(e.target.value);setPreview(null)}} rows={14} placeholder={'1. Find the HCF of 18 and 24\n2. Simplify 3/4 + 1/8\n3. Explain why plants need sunlight'} /></label>
    <div className="school-work-actions"><button className="premium-secondary" disabled={busy||!rawText.trim()} onClick={inspect}>{busy?'Checking…':'Check questions first'}</button>{preview&&<button className="premium-primary" disabled={busy} onClick={saveTyped}>{busy?'Preparing questions…':'Submit for approval →'}</button>}</div>
   </>:<>
    <label className="school-work-text"><span>Question image or PDF</span><small className="phone-input-help">Use a clear JPG, PNG or WebP photo, or a PDF up to 4 MB. AVORA reads the actual questions and keeps supplied A–D choices instead of replacing them.</small><input type="file" accept="image/jpeg,image/png,image/webp,application/pdf,.pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/>{file&&<small>{file.name} · {(file.size/1024/1024).toFixed(2)} MB</small>}</label>
    <div className="school-work-actions"><button className="premium-primary" disabled={busy||!file} onClick={uploadSchoolWork}>{busy?'Reading and preparing…':'Submit for approval →'}</button></div>
   </>}

   {error&&<p className="form-error">{error}</p>}
  </section>

  {preview&&mode==='TYPE'&&<section className="conversion-preview"><header><span className="section-kicker">BEFORE SAVING</span><h2>{preview.questionCount} questions found</h2><p>AVORA keeps your original wording. Saving sends the work for academic approval; AI preparation starts only after approval.</p></header>{preview.questions.map((q:any)=><article key={q.index}><b>Question {q.index}</b><p>{q.originalText}</p><div><span>{q.questionType.replace('_',' ')}</span><span>{q.confidence}</span><small>{q.curriculumTopicId||'Topic will need confirmation'}</small>{q.questionType==='MULTIPLE_CHOICE'&&!/(?:^|\n)\s*[A-D][.)]\s+/m.test(q.originalText)&&<small>AVORA will create four answer choices + correct answer + worked solution</small>}{q.questionType==='THEORY'&&<small>AVORA will prepare a marking guide + worked solution</small>}</div></article>)}</section>}
 </main>
}
