import Link from 'next/link';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
export const dynamic='force-dynamic';

type CountRow={n?:number|string};
const KPI_TIMEOUT_MS=5000;

async function safeCount(work:()=>Promise<CountRow[]>){
  let timer:ReturnType<typeof setTimeout>|undefined;
  try{
    const timeout=new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(new Error(`Admin KPI timed out after ${KPI_TIMEOUT_MS}ms`)),KPI_TIMEOUT_MS)});
    const [row]=await Promise.race([withDbRetry(work,1),timeout]);
    return {value:Number(row?.n??0),available:true};
  }catch(error){
    console.error('Admin KPI query failed',error);
    return {value:0,available:false};
  }finally{
    if(timer)clearTimeout(timer);
  }
}

export default async function Admin(){
  await requireAdmin();
  const [studentsKpi,liveKpi,attemptsKpi,avgKpi]=await Promise.all([
    safeCount(()=>sql`SELECT COUNT(*)::int n FROM users WHERE role='STUDENT'`),
    safeCount(()=>sql`SELECT COUNT(*)::int n FROM live_assessments WHERE status IN ('SCHEDULED','LOBBY','LIVE','PAUSED')`),
    safeCount(()=>sql`SELECT COUNT(*)::int n FROM attempts WHERE created_at>now()-interval '7 days'`),
    safeCount(()=>sql`SELECT COALESCE(ROUND(AVG(score)*100),0)::int n FROM live_assessment_participants WHERE submitted_at>now()-interval '30 days'`)
  ]);
  const allKpisAvailable=[studentsKpi,liveKpi,attemptsKpi,avgKpi].every(x=>x.available);
  return <main className="shell admin-v103"><header className="admin-hero"><div><span className="eyebrow">AVORA ACADEMIC OPERATIONS</span><h1>See the learner. See the evidence. Know what happens next.</h1><p>A focused workspace for student progress, supervised live assessments and intervention.</p></div><Link className="premium-primary" href="/admin/live-assessments/new">Schedule live assessment →</Link></header>{!allKpisAvailable&&<p className="admin-data-notice" role="status">Some dashboard totals took too long to load. Admin tools remain available; refresh later to retry those totals.</p>}<section className="admin-kpis"><div><span>Students</span><strong>{studentsKpi.available?studentsKpi.value:'—'}</strong><small>registered learners</small></div><div><span>Live assessments</span><strong>{liveKpi.available?liveKpi.value:'—'}</strong><small>scheduled or active</small></div><div><span>Weekly evidence</span><strong>{attemptsKpi.available?attemptsKpi.value:'—'}</strong><small>independent attempts</small></div><div><span>Live average</span><strong>{avgKpi.available?`${avgKpi.value}%`:'—'}</strong><small>last 30 days</small></div></section><section className="admin-action-grid"><Link href="/admin/academic-preview"><b>Academic Preview · NCEE & BECE</b><span>Inspect Primary 5/6 Common Entrance and JSS1–3 teaching content across classes, subjects and topics.</span><em>Open academic preview →</em></Link><Link href="/admin/students"><b>Students & Progress</b><span>Search learners, inspect every attempt, mastery, weak topics and live-assessment history.</span><em>Open students →</em></Link><Link href="/admin/live-assessments"><b>Live Assessments</b><span>Schedule, host and review parent-supervised sessions by class and covered topics.</span><em>Open host centre →</em></Link><Link href="/admin/support"><b>Human Assistance</b><span>Open the support inbox, see learner context, answer directly and track ownership.</span><em>Open support →</em></Link><Link href="/admin/families"><b>Family Access</b><span>Review parent subscriptions, three-child seat usage, identity locks and verified seat changes.</span><em>Open family access →</em></Link><Link href="/admin/validation"><b>Real-user Validation</b><span>See privacy-safe signals for Tutor completion, re-teaching, offline recovery and assessment-to-Tutor journeys.</span><em>Open validation →</em></Link></section></main>;
}
