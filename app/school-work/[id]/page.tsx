import Link from 'next/link';
import {notFound,redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {sql,withDbRetry} from '@/lib/db';

export const dynamic='force-dynamic';

export default async function SchoolWorkDetail({params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s)redirect('/login');await requireStudentLearningAccess(s);
 const {id}=await params;
 const [assignment]=await withDbRetry(()=>sql`
  SELECT id,label,subject_name,class_level,status,uploaded_at
  FROM uploaded_assignments
  WHERE id=${id} AND student_id=${s.userId}
 `);
 if(!assignment)notFound();
 const questions=await withDbRetry(()=>sql`
  SELECT id,original_text,curriculum_topic_id,classification_confidence,question_type,
         options,correct_answer,rubric,max_marks,model_solution,needs_confirmation
  FROM assignment_questions
  WHERE assignment_id=${id}
  ORDER BY created_at,id
 `);
 return <main className="shell school-work-page">
  <header className="school-work-hero"><div><span className="section-kicker">PREPARED SCHOOL WORK · {assignment.class_level}</span><h1>{assignment.label||'School assignment'}</h1><p>{assignment.subject_name||'Subject'} · {new Date(assignment.uploaded_at).toLocaleDateString()}</p></div><div className="school-work-hero-actions"><Link className="premium-secondary" href="/school-work">← School Work</Link><Link className="premium-primary" href="/school-work/new">Add more questions →</Link></div></header>
  <section className="conversion-preview">
   <header><span className="section-kicker">YOUR QUESTIONS</span><h2>{questions.length} prepared {questions.length===1?'question':'questions'}</h2><p>Suitable objective questions appear as CBT with four options, the correct answer and a worked solution. Theory questions show a marking guide and model solution.</p></header>
   {questions.map((q:any,index:number)=><article key={q.id}>
    <b>Question {index+1}</b>
    <p>{q.original_text}</p>
    <div><span>{q.question_type==='MULTIPLE_CHOICE'?'CBT · MULTIPLE CHOICE':'THEORY'}</span><span>{q.classification_confidence}</span><small>{q.curriculum_topic_id||'Curriculum topic still needs confirmation for future revision'}</small></div>
    {q.question_type==='MULTIPLE_CHOICE'&&Array.isArray(q.options)&&q.options.length===4&&<div className="assignment-cbt-options">
      {q.options.map((option:string,i:number)=><div key={i}><b>{String.fromCharCode(65+i)}.</b> <span>{option}</span></div>)}
    </div>}
    {q.question_type==='MULTIPLE_CHOICE'&&q.correct_answer&&<div className="assignment-answer"><small>CORRECT ANSWER</small><strong>{q.correct_answer}</strong></div>}
    {q.question_type==='THEORY'&&Array.isArray(q.rubric)&&q.rubric.length>0&&<div className="assignment-rubric"><small>MARKING GUIDE · {q.max_marks||0} marks</small>{q.rubric.map((r:any,i:number)=><div key={i}><span>{r.point}</span><b>{r.marks} mark{Number(r.marks)===1?'':'s'}</b></div>)}</div>}
    <div className="assignment-solution"><small>WORKED SOLUTION</small><p>{q.model_solution&&q.model_solution!=='Pending academic conversion.'?q.model_solution:'AVORA could not complete the academic preparation for this question yet.'}</p></div>
    {q.needs_confirmation&&<small>Academic content is prepared for you now; curriculum confirmation is still required before this question joins long-term revision.</small>}
   </article>)}
  </section>
 </main>
}
