import Link from 'next/link';
import {notFound,redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {sql,withDbRetry} from '@/lib/db';
import {nceeSourceTopicById,nceeSourceDeepLesson} from '@/lib/nceeSourceRuntime';

export const dynamic='force-dynamic';

export default async function Topic({params}:{params:Promise<{topic:string}>}){
  const s=await getSession();
  if(!s)redirect('/login');
  await requireStudentLearningAccess(s);
  const {topic}=await params;
  const base=nceeSourceTopicById(topic);
  if(!base)notFound();
  const t=nceeSourceDeepLesson(base);
  const [p]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
  if(String(p?.class_level)!==t.classLevel)redirect('/common-entrance/learn');

  return <main className="shell ncee-topic">
    <header>
      <Link href={'/common-entrance/learn?domain='+encodeURIComponent(t.domain)}>← {t.domain}</Link>
      <span>{t.classLevel} · {t.term} · SOURCE-BACKED LESSON</span>
      <h1>{t.title}</h1>
      <p>{t.objective}</p>
    </header>

    <section className="ncee-lesson-card ncee-start-card">
      <h2>Start from what you know</h2>
      <p>{t.prerequisitePrompt}</p>
    </section>

    <section className="ncee-lesson-card">
      <h2>AVORA teaches it in order</h2>
      <p className="ncee-lesson-note">One idea at a time. The board should show the important part while the teacher explains the reason.</p>
      {t.teacherSteps.map((x,i)=><article className="ncee-source-step" key={x.id}>
        <span>{String(i+1).padStart(2,'0')} · {x.kind==='concept'?'CONCEPT':'WORKED EXAMPLE'}</span>
        <p>{x.narration}</p>
        <div className="ncee-mini-board"><small>BOARD</small><strong>{x.board}</strong></div>
      </article>)}
    </section>

    <section className="ncee-lesson-card">
      <h2>Your turn</h2>
      {t.checks.length?t.checks.map((x,i)=><article className="ncee-check" key={`${i}-${x}`}><span>CHECK {i+1}</span><p>{x}</p></article>):<p>AVORA will give a fresh question from this learning area before mastery is recorded.</p>}
    </section>

    <section className="ncee-lesson-card">
      <h2>Ready to move on?</h2>
      {t.masteryChecks.map(x=><p key={x}>□ {x}</p>)}
      <small>{t.sourcePolicy}</small>
    </section>
  </main>;
}
