'use client';
import {useState} from 'react';
type Row={id:string;class_level:string;subject_name:string;term:number;week_number:number;day_index:number;topic_title:string;objective_text:string;source_reference:string;approval_status:string};
const HEADER='classLevel,subjectName,term,weekNumber,dayIndex,topicTitle,objectiveText,sourceReference,curriculumTopicId';
export default function WeeklyCurriculumImport(){
 const [classLevel,setClassLevel]=useState('JSS1');
 const [csv,setCsv]=useState('');
 const [rows,setRows]=useState<Row[]>([]);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('');
 async function refresh(){
  setBusy(true);
  try{const res=await fetch('/api/admin/weekly/objectives?classLevel='+encodeURIComponent(classLevel),{cache:'no-store'});
   const data=await res.json();if(!res.ok)throw new Error(data.error||'Unable to load');
   setRows(data.rows||[]);setMessage('Loaded '+(data.rows||[]).length+' objectives');
  }catch(e){setMessage(e instanceof Error?e.message:'Unable to load')}finally{setBusy(false)}
 }
 async function importCsv(){
  if(!csv.trim()){setMessage('Paste your verified CSV first');return}
  setBusy(true);
  try{const res=await fetch('/api/admin/weekly/objectives',{method:'POST',headers:{'Content-Type':'text/csv'},body:csv});
   const data=await res.json();if(!res.ok)throw new Error(data.error||'Import failed');
   setMessage('Imported '+data.inserted+' of '+data.submitted+' rows as drafts. Nothing is published.');
  }catch(e){setMessage(e instanceof Error?e.message:'Import failed')}finally{setBusy(false)}
 }
 async function review(id:string,action:'SUBMIT'|'APPROVE'|'PUBLISH'|'REJECT'){
  if(action==='PUBLISH'&&!window.confirm('Publish this reviewed objective for its class and week?'))return;
  setBusy(true);
  try{const res=await fetch('/api/admin/weekly/objectives/review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({objectiveId:id,action})});
   const data=await res.json();if(!res.ok)throw new Error(data.error||'Review failed');
   setRows(old=>old.map(r=>r.id===id?{...r,approval_status:data.objective.approval_status}:r));setMessage('Objective '+data.objective.approval_status.toLowerCase());
  }catch(e){setMessage(e instanceof Error?e.message:'Review failed')}finally{setBusy(false)}
 }
 return <main style={{maxWidth:960,margin:'0 auto',padding:'24px 16px',color:'#1B1840',background:'#FBF7F2',minHeight:'100vh'}}>
  <h1>Weekly curriculum review</h1>
  <p>Import only verified curriculum objectives. The source reference is mandatory. Imported records remain drafts until explicitly reviewed and published.</p>
  <label htmlFor="pilot-class">Class</label>{' '}
  <select id="pilot-class" value={classLevel} onChange={e=>{setClassLevel(e.target.value);setRows([])}}><option>JSS1</option><option>JSS2</option><option>JSS3</option></select>
  <section style={{background:'#fff',borderRadius:18,padding:20,marginTop:20}}>
   <h2>Import CSV</h2>
   <p>Required columns: <code>{HEADER}</code>. Use the exact column names. Weekdays are 1 (Monday) to 5 (Friday). Maximum 250 rows per import.</p>
   <label htmlFor="curriculum-csv">Verified curriculum CSV</label>
   <textarea id="curriculum-csv" rows={9} value={csv} onChange={e=>setCsv(e.target.value)} placeholder={HEADER} style={{width:'100%',marginTop:8,padding:12,fontSize:16}}/>
   <div style={{display:'flex',gap:12,marginTop:12,flexWrap:'wrap'}}>
    <button disabled={busy} onClick={importCsv} style={{padding:'12px 20px',borderRadius:12,background:'#1B1840',color:'#fff'}}>Import as drafts</button>
    <button disabled={busy} onClick={refresh} style={{padding:'12px 20px',borderRadius:12,border:'1px solid #1B1840'}}>Load class objectives</button>
   </div>
  </section>
  <p role="status" aria-live="polite">{message}</p>
  <section aria-label="Imported objectives"><h2>Review queue</h2>
   {rows.length===0?<p>No loaded objectives. Select a class and load its records.</p>:rows.map(row=><article key={row.id} style={{background:'#fff',padding:18,marginBottom:12,borderRadius:16}}>
    <strong>{row.subject_name} · Term {row.term} · Week {row.week_number} · Day {row.day_index}</strong>
    <h3>{row.topic_title}</h3><p>{row.objective_text}</p><small>Source: {row.source_reference}</small><p>Status: <strong>{row.approval_status}</strong></p>
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
     {row.approval_status==='DRAFT'&&<button disabled={busy} onClick={()=>review(row.id,'SUBMIT')}>Send for review</button>}
     {row.approval_status==='IN_REVIEW'&&<><button disabled={busy} onClick={()=>review(row.id,'APPROVE')}>Approve</button><button disabled={busy} onClick={()=>review(row.id,'REJECT')}>Return to draft</button></>}
     {row.approval_status==='APPROVED'&&<button disabled={busy} onClick={()=>review(row.id,'PUBLISH')}>Publish</button>}
    </div>
   </article>)}
  </section>
 </main>;
}
