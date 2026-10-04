import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {redirect} from 'next/navigation';
import Link from 'next/link';
import {sql,withDbRetry} from '@/lib/db';
import {subjectLabel} from '@/lib/subjects';
import {getOfficialTopicNames} from '@/lib/curriculumTutor';

export const dynamic='force-dynamic';
type Search={subject?:string};
const choices=['Mathematics','English Language'] as const;

export default async function LearnPage({searchParams}:{searchParams:Promise<Search>}){
 const s=await getSession();if(!s)redirect('/login');
 await requireStudentLearningAccess(s);
 try{
  const sp=await searchParams;
  const [p]=await withDbRetry(()=>sql`SELECT preferred_subject,target_exam,class_level FROM student_profiles WHERE user_id=${s.userId}`);
  const exam='BECE';
  const classLevel=String(p?.class_level||'JSS3');
  if(classLevel==='Primary 5'||classLevel==='Primary 6')redirect('/common-entrance/learn');
  const requested=choices.includes(sp?.subject as any)?sp.subject:undefined;
  const subject=requested||subjectLabel(p?.preferred_subject);
  const topics=getOfficialTopicNames(classLevel,subject);
  return <main className="shell path-page learn-v2">
   <header className="path-head"><span className="flow-label">{classLevel} · NERDC · {exam} PATH</span><h1>Choose what you want to learn.</h1><p>Every topic below comes from AVORA's master curriculum for your class. AVORA can teach the full mapped lesson even when an independent question bank for that exact topic is still being reviewed.</p></header>
   <nav className="learn-subject-switch" aria-label="Choose subject">{choices.map(x=><Link key={x} className={subject===x?'active':''} href={'/learn?subject='+encodeURIComponent(x)}><span>{x==='Mathematics'?'∑':'Aa'}</span><b>{x}</b><small>{x==='Mathematics'?'Numbers, algebra, geometry, statistics and more':'Reading, writing, oral English, grammar and literature'}</small></Link>)}</nav>
   <div className="path-guide"><b>{subject}</b><span>{topics.length} master {classLevel} curriculum topics/skills are available for teaching. Choose any one; AVORA does not hide a topic because its assessment bank is still growing.</span></div>
   {topics.length?<section className="topic-learning-list">{topics.map((name,i)=><article className="topic-learning-row" key={name}><Link href={'/tutor?topic='+encodeURIComponent(name)+'&subject='+encodeURIComponent(subject)} className="topic-learning-main" aria-label={`Learn ${name}`}><div className="path-index">{String(i+1).padStart(2,'0')}</div><div className="topic-learning-copy"><span>AVORA MASTER {classLevel} CURRICULUM · SOURCE-BACKED TEACHING</span><h2>{name}</h2><p>supplied deep-teaching source · worked examples · misconceptions · learner checkpoints · mastery gate</p></div><div className="topic-open"><b>Learn</b><span>→</span></div></Link><div className="topic-learning-meta"><span>Teaching ready</span><span>Assessment evidence tracked separately</span><span>{classLevel}</span></div></article>)}</section>:<section className="empty-learning"><h2>No curriculum topics were found for this class.</h2><p>This is a configuration error rather than a learner problem. Return home and retry.</p></section>}
  </main>
 }catch(e){
  console.error('LearnPage database',e);
  return <main className="shell path-page"><section className="practice-stage recovery"><span className="flow-label">CONNECTION PAUSED</span><h1>Your learning path is safe.</h1><p>AVORA could not reach your learner profile just now. Retry without losing progress.</p><Link className="primary-action inline-action" href="/learn">Retry learning path</Link></section></main>
 }
}
