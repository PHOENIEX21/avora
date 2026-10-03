import {redirect} from 'next/navigation';
import Link from 'next/link';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {sql,withDbRetry} from '@/lib/db';

export const dynamic='force-dynamic';
export default async function SchoolWorkPage(){
 const s=await getSession();if(!s)redirect('/login');await requireStudentLearningAccess(s);
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 const [summary,assignments]=await Promise.all([
  withDbRetry(()=>sql`SELECT COUNT(DISTINCT ua.id)::int assignments,COUNT(aq.id)::int questions,COUNT(aq.id) FILTER(WHERE aq.needs_confirmation=false)::int ready,COUNT(aq.id) FILTER(WHERE aq.active_for_review=true AND aq.needs_confirmation=false AND aq.next_review_at<=now())::int due FROM uploaded_assignments ua LEFT JOIN assignment_questions aq ON aq.assignment_id=ua.id WHERE ua.student_id=${s.userId}`).then(x=>x[0]),
  withDbRetry(()=>sql`SELECT ua.id,ua.label,ua.subject_name,ua.status,ua.uploaded_at,COUNT(aq.id)::int questions,COUNT(aq.id) FILTER(WHERE aq.needs_confirmation=false)::int confirmed,COUNT(aq.id) FILTER(WHERE aq.needs_confirmation=false AND aq.next_review_at<=now())::int due FROM uploaded_assignments ua LEFT JOIN assignment_questions aq ON aq.assignment_id=ua.id WHERE ua.student_id=${s.userId} GROUP BY ua.id ORDER BY ua.uploaded_at DESC LIMIT 12`)
 ]);
 return <main className="shell school-work-page">
  <header className="school-work-hero"><div><span className="section-kicker">SCHOOL WORK · {profile?.class_level||'JSS'}</span><h1>Bring what school gives you. AVORA helps you learn it — and remember it.</h1><p>Assignments and classwork do not disappear after submission. AVORA keeps confirmed questions connected to their curriculum topics, remembers where you struggled, and brings the right ones back during future review.</p></div><Link className="premium-primary" href="/school-work/new">Add school work <span>→</span></Link></header>
  <section className="school-work-loop"><div><b>01</b><strong>Add</strong><span>Type your assignment now. File and photo capture will follow after the extraction layer is verified.</span></div><div><b>02</b><strong>Understand</strong><span>AVORA identifies the curriculum topic and prepares a worked answer or marking guide for review.</span></div><div><b>03</b><strong>Practise</strong><span>Confirmed questions become part of your personal revision evidence.</span></div><div><b>04</b><strong>Remember</strong><span>Weak questions return sooner; secure work returns later so learning lasts.</span></div></section>
  <section className="school-work-stats"><div><strong>{Number(summary?.assignments||0)}</strong><span>school-work sets</span></div><div><strong>{Number(summary?.questions||0)}</strong><span>questions retained</span></div><div><strong>{Number(summary?.ready||0)}</strong><span>confirmed for review</span></div><div><strong>{Number(summary?.due||0)}</strong><span>due to revisit</span></div></section>
  <section className="school-work-history"><header><span className="section-kicker">YOUR SCHOOL-WORK MEMORY</span><h2>Nothing useful gets lost.</h2></header>{assignments.length?<div className="school-work-list">{assignments.map((a:any)=><article key={a.id}><div><small>{a.subject_name||'Subject'} · {new Date(a.uploaded_at).toLocaleDateString()}</small><strong>{a.label||'School assignment'}</strong></div><div><b>{a.questions}</b><span>questions</span></div><div><b>{a.confirmed}</b><span>review-ready</span></div><div><b>{a.due}</b><span>due now</span></div></article>)}</div>:<div className="school-work-empty"><h3>Your school-work memory starts here.</h3><p>Add the questions your teacher gives you. AVORA will keep the original wording, connect each confirmed question to learning, and use it again when revision will help.</p><Link href="/school-work/new">Add your first school work →</Link></div>}</section>
 </main>
}
