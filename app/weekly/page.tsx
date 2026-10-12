import Link from 'next/link';
import {getSession} from '@/lib/auth';
import {getDawnGate} from '@/lib/dawnAccess';
import {redirect} from 'next/navigation';
import {notFound} from 'next/navigation';
import {weeklyStudentContext,weeklyObjectives,WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {weeklyLessonLink} from '@/lib/weeklyLessonLink';
import {sql,withDbRetry} from '@/lib/db';
import WeeklyDashboard from '@/components/WeeklyDashboard';
export const dynamic='force-dynamic';
export default async function WeeklyPage({searchParams}:{searchParams:Promise<{term?:string;week?:string}>}){
 const session=await getSession();
 if(!session)redirect('/login');
 if(session.role!=='STUDENT')redirect('/home');
 const gate=await getDawnGate(session.userId);
 if(gate.status==='ready'){
  const context=await weeklyStudentContext(session.userId),requested=await searchParams;
  const term=requested.term===undefined?context.term:Number(requested.term),week=requested.week===undefined?context.week:Number(requested.week);
  try{
   const objectives=await weeklyObjectives(context,term,week);
   const history=await withDbRetry(()=>sql`SELECT DISTINCT term,week_number FROM weekly_curriculum_objectives
    WHERE class_level=${context.classLevel} AND approval_status='PUBLISHED' AND published_at IS NOT NULL
     AND (term<${context.term} OR (term=${context.term} AND week_number<=${context.week})) ORDER BY term,week_number`);
   const weeks=history.map(x=>({term:Number(x.term),week:Number(x.week_number)}));
   if(!weeks.some(x=>x.term===context.term&&x.week===context.week))weeks.push({term:context.term,week:context.week});
   return <WeeklyDashboard classLevel={context.classLevel} term={term} week={week} currentTerm={context.term} currentWeek={context.week} weeks={weeks}
    objectives={objectives.map(x=>({id:x.id,subject:x.subject_name,topic:x.topic_title,text:x.objective_text,source:String(x.source_reference),
     studied:Boolean(x.studied_at),studySource:x.study_source==='TEXTBOOK'||x.study_source==='LESSON'?x.study_source:null,
     lessonHref:weeklyLessonLink(context.classLevel,x.subject_name,x.curriculum_topic_id),progress:x.progress}))}/>;
  }catch(error){if(error instanceof WeeklyWorkspaceError&&error.status===404)notFound();
   return <main className="shell"><h1>Weekly learning is temporarily unavailable</h1><Link href="/weekly">Retry</Link></main>}
 }
 return <main className="shell"><h1>Weekly learning</h1><p>{gate.status==='legacy'?'Your weekly class has not been released.':'Guardian verification must be completed before weekly learning can open.'}</p><Link href="/learn">Continue learning</Link></main>;
}
