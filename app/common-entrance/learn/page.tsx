import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {sql,withDbRetry} from '@/lib/db';
import {NCEE_DOMAINS} from '@/lib/nceePrep';
import {nceeSourceTopicsFor,nceeSourcePracticeOnlyFor} from '@/lib/nceeSourceRuntime';
export const dynamic='force-dynamic';
export default async function NceeLearn({searchParams}:{searchParams:Promise<{domain?:string;term?:string}>}){
 const s=await getSession();if(!s)redirect('/login');await requireStudentLearningAccess(s);
 const [p]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 const cls=String(p?.class_level||'');if(!['Primary 5','Primary 6'].includes(cls))redirect('/learn');
 const sp=await searchParams;const chosen=NCEE_DOMAINS.find(x=>x.domain===sp.domain)?.domain||NCEE_DOMAINS[0].domain;
 const all=nceeSourceTopicsFor(cls,chosen);const practiceOnly=nceeSourcePracticeOnlyFor(cls,chosen);const terms=[...new Set(all.map(t=>t.term))];const chosenTerm=sp.term&&terms.includes(sp.term)?sp.term:null;
 const topics=chosenTerm?all.filter(t=>t.term===chosenTerm):all;
 return <main className="shell ncee-learn">
  <header><Link href="/common-entrance">← Common Entrance home</Link><span>{cls} · {chosen}</span><h1>Choose what to learn.</h1><p>These lessons now come from the authored Primary 5/6 NCEE source pack. AVORA removes author notes and teaches only student-facing concepts, worked examples and checks.</p></header>
  <nav>{NCEE_DOMAINS.map(d=><Link className={d.domain===chosen?'active':''} href={'/common-entrance/learn?domain='+encodeURIComponent(d.domain)} key={d.domain}>{d.domain}</Link>)}</nav>
  {terms.length>1&&<div className="ncee-term-filter"><Link className={!chosenTerm?'active':''} href={'/common-entrance/learn?domain='+encodeURIComponent(chosen)}>All terms</Link>{terms.map(term=><Link className={chosenTerm===term?'active':''} href={'/common-entrance/learn?domain='+encodeURIComponent(chosen)+'&term='+encodeURIComponent(term)} key={term}>{term}</Link>)}</div>}
  {practiceOnly.length>0&&<p className="ncee-source-warning">{practiceOnly.length} source entr{practiceOnly.length===1?'y is':'ies are'} practice-only and {practiceOnly.length===1?'is':'are'} not being presented as a teaching lesson until a real explanation/example exists.</p>}<section>{topics.map((t,i)=><Link href={'/common-entrance/learn/'+t.id} key={t.id}><span>{String(i+1).padStart(2,'0')}</span><div><small>{t.term}{t.strand?` · ${t.strand}`:''}</small><h2>{t.title}</h2><p>{t.concepts[0]||`Build ${t.title.toLowerCase()} carefully from the foundation.`}</p></div><b>Learn →</b></Link>)}</section>
 </main>
}
