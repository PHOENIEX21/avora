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
  const topics=getOfficialTopicNames(classLevel,subject);const themeRows=await withDbRetry(()=>sql`SELECT th.id,th.name,th.sort_order,tp.id topic_id,tp.name topic_name,ct.sort_order topic_order FROM curriculum_themes th LEFT JOIN curriculum_theme_topics ct ON ct.theme_id=th.id LEFT JOIN topics tp ON tp.id=ct.topic_id WHERE th.class_level=${classLevel} AND th.subject_name=${subject} AND th.status='LIVE' ORDER BY th.sort_order,ct.sort_order,tp.name`).catch(()=>[]);const themes=new Map<string,{name:string;topics:string[]}>();for(const row of themeRows as any[]){const key=String(row.id);if(!themes.has(key))themes.set(key,{name:String(row.name),topics:[]});if(row.topic_name)themes.get(key)!.topics.push(String(row.topic_name))}const mapped=new Set([...themes.values()].flatMap(x=>x.topics));const unmapped=topics.filter(name=>!mapped.has(name));
  return <main className="shell path-page learn-v2">
   <header className="path-head academic-section-head"><span className="flow-label">{classLevel} · AVORA LEARNING LIBRARY</span><h1>Explore your subjects.</h1><p>Choose Mathematics or English, find a topic and start a complete lesson. Your class curriculum stays organised in one place.</p><div className="academic-section-actions"><Link href="/home">← Today</Link><Link href="/ask">Ask about schoolwork →</Link></div></header>
   <nav className="learn-subject-switch" aria-label="Choose subject">{choices.map(x=><Link key={x} className={subject===x?'active':''} href={'/learn?subject='+encodeURIComponent(x)}><span>{x==='Mathematics'?'∑':'Aa'}</span><b>{x}</b><small>{x==='Mathematics'?'Numbers, algebra, geometry, statistics and more':'Reading, writing, oral English, grammar and literature'}</small></Link>)}</nav>
   <div className="path-guide"><b>{subject}</b><span>{topics.length} master {classLevel} curriculum topics/skills are available for teaching. Choose any one; AVORA does not hide a topic because its assessment bank is still growing.</span></div>
   {topics.length?<section className="curriculum-theme-list">{[...themes.values()].map(theme=><section className="curriculum-theme" key={theme.name}><header><span className="section-kicker">THEME</span><h2>{theme.name}</h2></header><div className="topic-learning-list">{theme.topics.map((name,i)=><article className="topic-learning-row" key={name}><Link href={'/tutor?topic='+encodeURIComponent(name)+'&subject='+encodeURIComponent(subject)} className="topic-learning-main" aria-label={`Learn ${name}`}><div className="path-index">{String(i+1).padStart(2,'0')}</div><div className="topic-learning-copy"><span>AVORA MASTER {classLevel} CURRICULUM · SOURCE-BACKED TEACHING</span><h2>{name}</h2><p>supplied deep-teaching source · worked examples · misconceptions · learner checkpoints · mastery gate</p></div><div className="topic-open"><b>Learn</b><span>→</span></div></Link><div className="topic-learning-meta"><span>Teaching ready</span><span>Assessment evidence tracked separately</span><span>{classLevel}</span></div></article>)}</div></section>)}{unmapped.length>0&&<section className="curriculum-theme curriculum-theme-unmapped"><header><span className="section-kicker">CURRICULUM TOPICS</span><h2>Theme mapping under academic review</h2><p>These verified AVORA topics remain available while their official theme grouping is being reviewed.</p></header><div className="topic-learning-list">{unmapped.map((name,i)=><article className="topic-learning-row" key={name}><Link href={'/tutor?topic='+encodeURIComponent(name)+'&subject='+encodeURIComponent(subject)} className="topic-learning-main"><div className="path-index">{String(i+1).padStart(2,'0')}</div><div className="topic-learning-copy"><span>VERIFIED TOPIC · THEME PENDING REVIEW</span><h2>{name}</h2><p>Deep lesson · worked examples · learner checkpoints · mastery evidence</p></div><div className="topic-open"><b>Learn</b><span>→</span></div></Link></article>)}</div></section>}</section>:<section className="empty-learning"><h2>No curriculum topics were found for this class.</h2><p>This is a configuration error rather than a learner problem. Return home and retry.</p></section>}
  </main>
 }catch(e){
  console.error('LearnPage database',e);
  return <main className="shell path-page"><section className="practice-stage recovery"><span className="flow-label">CONNECTION PAUSED</span><h1>Your learning path is safe.</h1><p>AVORA could not reach your learner profile just now. Retry without losing progress.</p><Link className="primary-action inline-action" href="/learn">Retry learning path</Link></section></main>
 }
}
