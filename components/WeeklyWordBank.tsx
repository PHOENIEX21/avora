'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,Check,FileUp,RefreshCw,Save,Search,Send,Undo2,X} from 'lucide-react';
import type {WordBankRow,WordDraft} from '@/lib/weeklyWordBank';
import styles from './WeeklyWordBank.module.css';
const csvHeader='word,partOfSpeech,meaning,example1,example2,example3,sourceReference,relatedForm,pronunciationHint';
const emptyDraft:WordDraft={word:'',partOfSpeech:'',meaning:'',examples:[''],sourceReference:'',relatedForm:'',pronunciationHint:''};
const statusLabel=(status:string)=>status.replaceAll('_',' ').toLowerCase();
export default function WeeklyWordBank(){
 const [classLevel,setClassLevel]=useState('JSS1'),[status,setStatus]=useState(''),[search,setSearch]=useState(''),[query,setQuery]=useState(''),[page,setPage]=useState(1);
 const [rows,setRows]=useState<WordBankRow[]>([]),[hasMore,setHasMore]=useState(false),[selected,setSelected]=useState<WordBankRow|null>(null);
 const [loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');
 const [csv,setCsv]=useState(''),[note,setNote]=useState(''),[confirmed,setConfirmed]=useState(false),[editing,setEditing]=useState(false),[draft,setDraft]=useState<WordDraft>(emptyDraft);
 const activeRequest=useRef<AbortController|null>(null);
 const reviewPanel=useRef<HTMLElement|null>(null);
 useEffect(()=>{
  if(selected?.id&&window.matchMedia('(max-width:700px)').matches)
   reviewPanel.current?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
 },[selected?.id]);
 const load=useCallback(async()=>{
  activeRequest.current?.abort();const controller=new AbortController();activeRequest.current=controller;setLoading(true);setError('');
  const filters=new URLSearchParams({classLevel,page:String(page),search:query});if(status)filters.set('status',status);
  try{const response=await fetch('/api/admin/weekly/words?'+filters,{cache:'no-store',signal:controller.signal});
   const data=await response.json();if(!response.ok)throw new Error(data.error||'Unable to load words');
   if(controller.signal.aborted)return;setRows(data.rows);setHasMore(data.hasMore);
   setSelected(old=>old?data.rows.find((row:WordBankRow)=>row.id===old.id)||null:null);
  }catch(e){if(!controller.signal.aborted){setRows([]);setSelected(null);setHasMore(false);setError(e instanceof Error?e.message:'Unable to load words')}}
  finally{if(!controller.signal.aborted)setLoading(false)}
 },[classLevel,status,query,page]);
 useEffect(()=>{void load();return()=>activeRequest.current?.abort()},[load]);
 function select(row:WordBankRow){setSelected(row);setEditing(false);setNote('');setConfirmed(false);setMessage('');setError('')}
 async function importWords(){
  setBusy(true);setError('');setMessage('');
  try{const response=await fetch('/api/admin/weekly/words?classLevel='+classLevel,{method:'POST',headers:{'Content-Type':'text/csv'},body:csv});
   const data=await response.json();if(!response.ok)throw new Error(data.error||'Import failed');
   setCsv('');setMessage(data.inserted+' draft '+(data.inserted===1?'word':'words')+' saved');await load();
  }catch(e){setError(e instanceof Error?e.message:'Import failed')}finally{setBusy(false)}
 }
 async function change(action:'SUBMIT'|'APPROVE'|'REJECT'|'EDIT'){
  if(!selected)return;setBusy(true);setError('');setMessage('');
  try{const body={action,expectedRevision:selected.revision,...(action==='EDIT'?{draft:{...draft,examples:draft.examples.filter(s=>s.trim())}}:{}),
    ...(action==='APPROVE'?{confirmedSource:confirmed,note}:action==='REJECT'?{note}:{})};
   const response=await fetch('/api/admin/weekly/words/'+selected.id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
   const data=await response.json();if(!response.ok)throw new Error(data.error||'Change failed');
   setEditing(false);setNote('');setConfirmed(false);setMessage(action==='EDIT'?'Draft saved':'Word '+statusLabel(data.word.status));await load();
  }catch(e){setError(e instanceof Error?e.message:'Change failed')}finally{setBusy(false)}
 }
 function beginEdit(){if(!selected)return;setDraft({word:selected.word,partOfSpeech:selected.part_of_speech,meaning:selected.meaning,
  examples:selected.example_sentences.length?selected.example_sentences:[''],sourceReference:selected.source_reference||'',
  relatedForm:selected.related_form||'',pronunciationHint:selected.pronunciation_hint||''});setEditing(true)}
 const locked=busy||loading;
 return <main className={styles.root}>
  <header className={styles.header}><Link href="/admin/weekly"><ArrowLeft size={18}/>Weekly curriculum</Link><h1>English word bank</h1></header>
  <section className={styles.import} aria-labelledby="import-heading"><h2 id="import-heading">Import drafts</h2>
   <div className={styles.filters}><label>Class<select aria-label="Class" value={classLevel} disabled={locked||editing} onChange={e=>{setClassLevel(e.target.value);setPage(1);setSelected(null);setMessage('')}}><option>JSS1</option><option>JSS2</option><option>JSS3</option></select></label>
    <label>CSV file<input type="file" accept=".csv,text/csv" disabled={locked} onChange={async e=>{
     const file=e.target.files?.[0];if(!file)return;if(file.size>1_000_000){setError('CSV exceeds 1MB');return}
     try{setCsv(await file.text());setError('')}catch{setError('Unable to read file')}e.target.value='';
    }}/></label></div>
   <label>Source-backed CSV<textarea aria-label="Source-backed CSV" rows={5} value={csv} disabled={busy} onChange={e=>setCsv(e.target.value)} placeholder={csvHeader}/></label>
   <button onClick={importWords} disabled={locked||!csv.trim()}><FileUp size={18}/>Import drafts</button>
  </section>
  {error&&<p className={styles.error} role="alert">{error}</p>}<p role="status" aria-live="polite" className={styles.message}>{message}</p>
  <section aria-labelledby="queue-heading"><div className={styles.queueHeading}><h2 id="queue-heading">Review queue</h2>
   <button onClick={()=>void load()} disabled={busy||editing} title="Reload word bank" aria-label="Reload word bank"><RefreshCw size={18}/></button></div>
   <form className={styles.filters} onSubmit={e=>{e.preventDefault();setQuery(search);setPage(1);setSelected(null)}}>
    <label>Status<select aria-label="Status" value={status} disabled={locked||editing} onChange={e=>{setStatus(e.target.value);setPage(1);setSelected(null)}}><option value="">All statuses</option>{['DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED'].map(s=><option key={s} value={s}>{statusLabel(s)}</option>)}</select></label>
    <label>Find word<input type="search" value={search} maxLength={100} disabled={busy||editing} onChange={e=>setSearch(e.target.value)}/></label>
    <button type="submit" disabled={locked||editing} aria-label="Search words" title="Search words"><Search size={18}/></button>
   </form>
   {loading?<p role="status">Loading words...</p>:rows.length===0&&!error?<p>No words found.</p>:null}
   <div className={styles.workspace}><div>
    <ul className={styles.list}>{rows.map(row=><li key={row.id}><button className={styles.wordRow} disabled={locked||editing} aria-pressed={selected?.id===row.id} onClick={()=>select(row)}>
     <span><strong>{row.word}</strong><small>{row.part_of_speech}</small></span><span className={styles.status}>{statusLabel(row.status)}</span>
    </button></li>)}</ul>
    <div className={styles.pagination}><button title="Previous page" aria-label="Previous page" disabled={locked||editing||page===1} onClick={()=>{setPage(page-1);setSelected(null)}}><ArrowLeft size={18}/></button>
     <span>Page {page}</span><button title="Next page" aria-label="Next page" disabled={locked||editing||!hasMore} onClick={()=>{setPage(page+1);setSelected(null)}}><ArrowRight size={18}/></button></div>
   </div>
   {selected&&<section ref={reviewPanel} className={styles.detail} aria-label="Word review">
    <div className={styles.queueHeading}><h3>{selected.word}</h3><button aria-label="Close word review" title="Close word review" disabled={busy} onClick={()=>{setSelected(null);setEditing(false)}}><X size={18}/></button></div>
    {editing?<form onSubmit={e=>{e.preventDefault();void change('EDIT')}}>
     <label>Word<input required maxLength={100} value={draft.word} disabled={busy} onChange={e=>setDraft({...draft,word:e.target.value})}/></label>
     <label>Part of speech<input required minLength={2} maxLength={80} value={draft.partOfSpeech} disabled={busy} onChange={e=>setDraft({...draft,partOfSpeech:e.target.value})}/></label>
     <label>Meaning<textarea aria-label="Meaning" required minLength={3} maxLength={2000} value={draft.meaning} disabled={busy} onChange={e=>setDraft({...draft,meaning:e.target.value})}/></label>
     {[0,1,2].map(index=><label key={index}>Example {index+1}<textarea aria-label={'Example '+(index+1)} required={index===0} minLength={3} maxLength={1000} disabled={busy} value={draft.examples[index]||''} onChange={e=>{
      const examples=[...draft.examples];examples[index]=e.target.value;setDraft({...draft,examples});
     }}/></label>)}
     <label>Source reference<textarea aria-label="Source reference" required minLength={3} maxLength={1000} value={draft.sourceReference} disabled={busy} onChange={e=>setDraft({...draft,sourceReference:e.target.value})}/></label>
     <label>Related form<input maxLength={200} value={draft.relatedForm||''} disabled={busy} onChange={e=>setDraft({...draft,relatedForm:e.target.value})}/></label>
     <label>Pronunciation hint<input maxLength={200} value={draft.pronunciationHint||''} disabled={busy} onChange={e=>setDraft({...draft,pronunciationHint:e.target.value})}/></label>
     <div className={styles.actions}><button type="submit" disabled={busy}><Save size={18}/>Save draft</button><button type="button" disabled={busy} onClick={()=>setEditing(false)}><X size={18}/>Cancel</button></div>
    </form>:<>
     <p className={styles.status}>{statusLabel(selected.status)} / {selected.class_level}</p><p><strong>{selected.part_of_speech}</strong>{selected.pronunciation_hint?' / '+selected.pronunciation_hint:''}</p><p>{selected.meaning}</p>
     <ol>{selected.example_sentences.map((example,i)=><li key={i}>{example}</li>)}</ol>
     {selected.related_form&&<p>Related: {selected.related_form}</p>}
     <dl><dt>Source</dt><dd>{selected.source_reference||'Not recorded'}</dd>
      {selected.review_note&&<><dt>Review note</dt><dd>{selected.review_note}</dd></>}
      {selected.reviewed_at&&<><dt>Approved</dt><dd>{new Date(selected.reviewed_at).toLocaleString('en-GB',{timeZone:'Africa/Lagos'})} (Lagos)</dd></>}
     </dl>
     {selected.status==='DRAFT'&&<div className={styles.actions}><button disabled={locked} onClick={beginEdit}><Save size={18}/>Edit draft</button><button disabled={locked} onClick={()=>void change('SUBMIT')}><Send size={18}/>Send for review</button></div>}
     {selected.status==='IN_REVIEW'&&<div><label>Review note<textarea aria-label="Review note" value={note} minLength={3} maxLength={2000} disabled={busy} onChange={e=>setNote(e.target.value)}/></label>
      <label className={styles.check}><input type="checkbox" checked={confirmed} disabled={busy} onChange={e=>setConfirmed(e.target.checked)}/>I checked the source, meaning and examples.</label>
      <div className={styles.actions}><button disabled={locked||!confirmed||note.trim().length<3} onClick={()=>void change('APPROVE')}><Check size={18}/>Approve content</button><button disabled={locked||note.trim().length<3} onClick={()=>void change('REJECT')}><Undo2 size={18}/>Return to draft</button></div>
     </div>}
    </>}
   </section>}
   </div>
  </section>
 </main>;
}
