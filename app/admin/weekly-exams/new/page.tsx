import Link from 'next/link';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
import WeeklyExamCreateForm from '@/components/WeeklyExamCreateForm';
export const dynamic='force-dynamic';
export default async function NewWeeklyExam(){
 await requireAdmin();
 const scope=await withDbRetry(()=>sql`
  SELECT t.id::text,t.class_level,t.subject_name,t.term,t.week_number,t.curriculum_topic_id,
         COUNT(o.id) FILTER(WHERE o.status IN ('REVIEWED','LIVE'))::int AS approved_objectives
  FROM term_topic_schedule t LEFT JOIN academic_daily_objectives o ON o.schedule_id=t.id
  GROUP BY t.id ORDER BY t.class_level,t.term,t.week_number,t.subject_name`).catch(()=>[]);
 return <main className="shell admin-weekly-new"><header className="admin-hero"><div><span className="eyebrow">CREATE AVORA WEEKLY</span><h1>Define the academic blueprint before asking AI for a paper.</h1><p>Select only curriculum work actually covered during the week. The AI generation step comes after this scope is saved.</p></div><Link href="/admin/weekly-exams">← Weekly exams</Link></header><WeeklyExamCreateForm scope={scope}/></main>;
}