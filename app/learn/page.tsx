import {getSession} from '@/lib/auth';
import {redirect} from 'next/navigation';
import Link from 'next/link';
import {sql,withDbRetry} from '@/lib/db';
import {subjectSlug,subjectLabel} from '@/lib/subjects';

export const dynamic='force-dynamic';

export default async function LearnPage(){
 const s=await getSession();if(!s)redirect('/login');
 try{
  const [p]=await withDbRetry(()=>sql`SELECT preferred_subject,target_exam,current_skill_id,current_topic_id FROM student_profiles WHERE user_id=${s.userId}`);
  const exam=p?.target_exam||'BECE',subject=subjectLabel(p?.preferred_subject),subSlug=subjectSlug(p?.preferred_subject);
  const rows=await withDbRetry(()=>sql`SELECT t.id topic_id,t.name topic,s.id,s.name skill,t.order_index,COALESCE(m.score,0) score,COALESCE(m.evidence_count,0)::int evidence FROM skills s JOIN topics t ON t.id=s.topic_id JOIN subjects sub ON sub.id=t.subject_id LEFT JOIN mastery m ON m.skill_id=s.id AND m.student_id=${s.userId} WHERE sub.slug=${subSlug} AND EXISTS(SELECT 1 FROM questions q WHERE q.skill_id=s.id AND q.status='PUBLISHED' AND (q.exam_name=${exam} OR q.exam_name IS NULL)) ORDER BY t.order_index,s.created_at`);
  const grouped=new Map<string,{id:string,name:string,order:number,skills:any[]}>();
  for(const x of rows as any[]){if(!grouped.has(x.topic_id))grouped.set(x.topic_id,{id:x.topic_id,name:x.topic,order:x.order_index,skills:[]});grouped.get(x.topic_id)!.skills.push(x)}
  const topics=[...grouped.values()].sort((a,b)=>a.order-b.order);
  const current=rows.find((x:any)=>x.id===p?.current_skill_id);const currentTopic=current?.topic||topics[0]?.name;
  return <main className="shell path-page">
   <header className="path-head"><span className="flow-label">{exam} · {subject}</span><h1>Your learning path</h1><p>Choose what you want to learn. AVORA may recommend a topic, but it will not move you away from a topic you deliberately selected.</p></header>
   <div className="path-guide"><b>Choose any topic</b><span>Start with five focused evidence questions. Then AVORA opens the main lesson for that same topic and adapts the teaching to what your answers showed.</span></div>
   <section className="topic-learning-list">{topics.map((t,i)=>{const evidence=t.skills.reduce((n,x)=>n+Number(x.evidence||0),0);const avg=t.skills.length?t.skills.reduce((n,x)=>n+Number(x.score||0),0)/t.skills.length:0;const pct=Math.round(avg*100);const isCurrent=t.id===p?.current_topic_id||t.skills.some(x=>x.id===p?.current_skill_id);return <article className={isCurrent?'topic-learning-row current':'topic-learning-row'} key={t.id}>
    <Link href={'/practice?topic='+encodeURIComponent(t.name)} className="topic-learning-main" aria-label={`Learn ${t.name}`}>
     <div className="path-index">{String(i+1).padStart(2,'0')}</div><div className="topic-learning-copy"><span>{isCurrent?'RECOMMENDED NOW':'TOPIC'}</span><h2>{t.name}</h2><p>{t.skills.map(x=>x.skill).slice(0,3).join(' · ')}{t.skills.length>3?' · more':''}</p></div><div className="topic-open"><b>Start</b><span>→</span></div>
    </Link>
    <div className="topic-learning-meta"><span>{evidence?`${evidence} learning evidence`:'Ready to start'}</span><span>{evidence?`${pct}% current mastery`:'Not assessed yet'}</span><span>{pct>=80?'Secure':evidence?'Developing':'New'}</span></div>
   </article>})}</section>
   {currentTopic&&<div className="path-next"><div><span>AVORA RECOMMENDS</span><b>{currentTopic}</b><p>Start with five focused questions, then continue into the lesson for this exact topic.</p></div><Link href={'/practice?topic='+encodeURIComponent(currentTopic)} className="primary-action inline-action">Continue learning →</Link></div>}
  </main>
 }catch(e){
  console.error('LearnPage database',e);
  return <main className="shell path-page"><section className="practice-stage recovery"><span className="flow-label">CONNECTION PAUSED</span><h1>Your learning path is safe.</h1><p>AVORA could not reach the learning database just now. This is a temporary Neon connection timeout, not lost progress.</p><Link className="primary-action inline-action" href="/learn">Retry learning path</Link></section></main>
 }
}
