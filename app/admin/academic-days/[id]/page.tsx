import Link from 'next/link';
import {notFound} from 'next/navigation';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';import DailyCheckBuilder from '@/components/DailyCheckBuilder';import AcademicObjectiveStatus from '@/components/AcademicObjectiveStatus';
export const dynamic='force-dynamic';

export default async function AcademicDay({params}:{params:Promise<{id:string}>}){
 await requireAdmin();const {id}=await params;
 const [o]=await withDbRetry(()=>sql`SELECT o.*,t.class_level,t.subject_name,t.term,t.week_number,t.curriculum_topic_id FROM academic_daily_objectives o JOIN term_topic_schedule t ON t.id=o.schedule_id WHERE o.id=${id}`).catch(()=>[]);
 if(!o)notFound();
 const bank=await withDbRetry(()=>sql`
  SELECT q.id,q.prompt,q.question_type,q.difficulty,q.curriculum_objective,q.micro_skill,q.quality_status,q.content_origin,q.correct_answer
  FROM questions q LEFT JOIN skills s ON s.id=q.skill_id LEFT JOIN topics tp ON tp.id=s.topic_id
  WHERE q.class_level=${o.class_level}
    AND (q.curriculum_topic_id=${o.curriculum_topic_id} OR lower(tp.name)=lower(${o.curriculum_topic_id}))
    AND COALESCE(q.quality_status,'') IN ('APPROVED','REVIEWED')
  ORDER BY CASE WHEN lower(COALESCE(q.curriculum_objective,''))=lower(${o.objective_text}) THEN 0 ELSE 1 END,q.difficulty,q.created_at
  LIMIT 40`).catch(()=>[]);
 return <main className="shell admin-objective-workspace"><header className="admin-hero"><div><span className="eyebrow">{o.class_level} · {o.subject_name} · TERM {o.term} · WEEK {o.week_number} · DAY {o.day_index}</span><h1>{o.title}</h1><p>{o.objective_text}</p></div><Link href="/admin/academic-days">← All academic days</Link></header>
 <AcademicObjectiveStatus id={id} status={String(o.status)}/><section className="objective-contract"><div><span>Curriculum topic</span><strong>{o.curriculum_topic_id}</strong></div><div><span>Target</span><strong>{o.question_target} questions</strong></div><div><span>Objective status</span><strong>{o.status}</strong></div><div><span>Lesson focus</span><strong>{o.lesson_anchor||'Whole topic'}</strong></div></section>
 <DailyCheckBuilder objectiveId={id} target={Number(o.question_target)} candidates={bank}/><section className="ai-academic-panel"><header><span className="section-kicker">AVORA AI · ADMIN ONLY</span><h2>Use AI as an academic assistant.</h2><p>Ask it to identify missing skill coverage, generate equivalent variants, check objective relevance, verify answers or improve explanations. Generated work remains draft until you approve it.</p></header><div className="ai-action-grid"><button type="button" disabled>Analyse coverage gaps</button><button type="button" disabled>Generate missing questions</button><button type="button" disabled>Generate variants</button><button type="button" disabled>Verify relevance & answers</button></div><small>Actions are intentionally disabled until the provider service is connected to the governed job queue.</small></section>
 <section className="bank-candidates"><header><span className="section-kicker">APPROVED BANK MATCHES</span><h2>Start with questions we already trust.</h2><p>{bank.length} approved/reviewed candidates found for this curriculum topic. Objective matching must still be confirmed before publication.</p></header>{bank.length?<div>{bank.map((q:any)=><article key={q.id}><div><small>{q.content_origin||'AVORA'} · Difficulty {q.difficulty||'—'} · {q.micro_skill||'skill not tagged'}</small><strong>{q.prompt}</strong><p>{q.curriculum_objective||'Objective tag needs review'}</p></div><span>{q.quality_status}</span></article>)}</div>:<div className="admin-empty"><h3>No approved bank candidates yet.</h3><p>This is a genuine content gap. Admin can later ask AVORA AI to draft questions specifically against this objective, then review them before publication.</p></div>}</section>
 </main>;
}
