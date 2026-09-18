'use client';
import {FormEvent,useState} from 'react';
import {useRouter} from 'next/navigation';

export default function ParentCreateChild(){
 const r=useRouter(),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setBusy(true);setError('');
  const f=new FormData(e.currentTarget);
  const res=await fetch('/api/parent/children/create',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({
   fullName:f.get('fullName'),email:f.get('email'),password:f.get('password'),classLevel:f.get('classLevel')
  })});
  const d=await res.json();setBusy(false);
  if(!res.ok){setError(d.error||'Could not create learner profile.');return}
  r.push('/parent');r.refresh();
 }
 return <form className="family-setup-form" onSubmit={submit}>
  <span>MY CHILD IS NEW TO AVORA</span><h2>Create their learner account</h2>
  <p>Choose this only if your child has never registered on AVORA. You create their learner login now, and AVORA automatically adds that learner to your family.</p>
  <label>Child’s full name<input name="fullName" minLength={2} maxLength={100} required/></label>
  <label>Child’s email<input name="email" type="email" required autoComplete="off"/></label>
  <label>Temporary password<input name="password" type="password" minLength={8} maxLength={128} required autoComplete="new-password"/></label>
  <label>Class<select name="classLevel" defaultValue="" required><option value="" disabled>Choose the learner’s class</option><option>Primary 5</option><option>Primary 6</option><option>JSS1</option><option>JSS2</option><option>JSS3</option></select><small>This class controls the learner’s curriculum, Tutor, Practice and Exam route.</small></label>
  {error&&<p className="form-error">{error}</p>}
  <button className="premium-primary" disabled={busy}>{busy?'Creating learner…':'Create learner and add to family →'}</button>
 </form>
}
