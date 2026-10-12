import {notFound} from 'next/navigation';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
import WeeklyTheoryReview from '@/components/WeeklyTheoryReview';
import type {WeeklyPaperQuestion} from '@/lib/weeklyExamSession';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{id:string}>}){
 await requireAdmin();const {id}=await params;
 const [session]=await withDbRetry(()=>sql`SELECT es.id,es.answers,es.marking_status,es.objective_score,es.weekly_paper_snapshot,u.full_name,b.title
  FROM exam_sessions es JOIN users u ON u.id=es.student_id JOIN weekly_exam_blueprints b ON b.id=es.weekly_exam_blueprint_id WHERE es.id=${id}`);
 if(!session)notFound();
 if(!Array.isArray(session.weekly_paper_snapshot))return <main className="shell"><h1>Original paper review required</h1><p>The earlier saved attempt is retained.</p></main>;
 const marks=await withDbRetry(()=>sql`SELECT question_id,mark_fraction,feedback,marking_source FROM weekly_exam_question_marks WHERE session_id=${id}`);
 const questions=(session.weekly_paper_snapshot as WeeklyPaperQuestion[]).map((question,index)=>{
  const mark=marks.find(mark=>String(mark.question_id)===question.id);
  return {id:question.id,position:index+1,subject_name:question.subject,curriculum_topic_id:question.topic,prompt:question.prompt,explanation:question.explanation,...mark};
 }).filter((_,index)=>(session.weekly_paper_snapshot as WeeklyPaperQuestion[])[index].type!=='MULTIPLE_CHOICE');
 return <main className="shell"><header className="admin-hero"><div><span className="eyebrow">WEEKLY THEORY REVIEW</span><h1>{session.full_name} · {session.title}</h1></div></header>
  <WeeklyTheoryReview sessionId={id} status={session.marking_status} answers={session.answers||{}} questions={questions}/>
 </main>;
}
