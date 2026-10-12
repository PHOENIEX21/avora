import Link from 'next/link';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
export const dynamic='force-dynamic';

export default async function AcademicDaysAdmin(){
 await requireAdmin();
 const rows=await withDbRetry(()=>sql`
  SELECT o.id,o.day_index,o.title,o.objective_text,o.question_target,o.status,
         t.class_level,t.subject_name,t.term,t.week_number,t.curriculum_topic_id,
         da.id AS assessment_id,da.status AS assessment_status,
         COUNT(daq.question_id)::int AS selected_questions,
         COUNT(daq.question_id) FILTER(WHERE daq.relevance_status IN ('PASSED','ADMIN_OVERRIDE') AND daq.answer_status IN ('PASSED','ADMIN_OVERRIDE'))::int AS verified_questions
  FROM academic_daily_objectives o
  JOIN term_topic_schedule t ON t.id=o.schedule_id
  LEFT JOIN daily_assessments da ON da.objective_id=o.id
  LEFT JOIN daily_assessment_questions daq ON daq.assessment_id=da.id
  GROUP BY o.id,t.id,da.id
  ORDER BY t.class_level,t.term,t.week_number,o.day_index,t.subject_name,o.sort_order
  LIMIT 200`).catch(()=>[]);
 return <main className="shell admin-academic-days"><header className="admin-hero"><div><span className="eyebrow">ACADEMIC DAY CONTROL</span><h1>Objective first. Questions second. AI only where it helps.</h1><p>Every Daily Check is tied to a curriculum objective. Start with approved standard-bank questions, use AI to analyse genuine gaps, then review relevance and answers before publishing.</p></div><Link href="/admin">Admin overview →</Link></header>
 <section className="academic-flow-strip"><span>1 · Curriculum week</span><span>2 · Daily objective</span><span>3 · Bank matches</span><span>4 · AI gap help</span><span>5 · Academic review</span><span>6 · Publish</span></section>
 <section className="admin-day-list">{rows.length?rows.map((r:any)=><Link key={r.id} href={'/admin/academic-days/'+r.id}><div><small>{r.class_level} · {r.subject_name} · Term {r.term} · Week {r.week_number} · Day {r.day_index}</small><h2>{r.curriculum_topic_id}</h2><strong>{r.title}</strong><p>{r.objective_text}</p></div><aside><span>{r.assessment_status||'NO CHECK YET'}</span><b>{r.verified_questions}/{r.question_target}</b><small>verified questions</small></aside></Link>):<div className="admin-empty"><h2>No daily objectives have been published yet.</h2><p>Create the verified curriculum schedule first; Daily Checks will attach to those objectives rather than being generated without academic context.</p></div>}</section></main>;
}
