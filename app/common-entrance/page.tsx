import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {sql,withDbRetry} from '@/lib/db';
import {NCEE_DOMAINS,NCEE_OFFICIAL_STRUCTURE} from '@/lib/nceePrep';
import {nceeSourceTopicsFor} from '@/lib/nceeSourceRuntime';
export const dynamic='force-dynamic';
export default async function CommonEntranceHome(){
 const s=await getSession();if(!s)redirect('/login');await requireStudentLearningAccess(s);
 const [p]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 const cls=String(p?.class_level||'');if(!['Primary 5','Primary 6'].includes(cls))redirect('/home');
 return <main className="ncee-home"><section className="shell ncee-welcome"><div><span className="flow-label">AVORA COMMON ENTRANCE PREP · {cls}</span><h1>Small steps. Big confidence.</h1><p>Learn gently, practise every tested area, and grow toward the National Common Entrance Examination without turning learning into pressure.</p><div className="ncee-actions"><Link href="/common-entrance/learn">Start today’s learning →</Link><Link href="/common-entrance/mock">See full exam practice</Link></div></div><aside><b>{NCEE_OFFICIAL_STRUCTURE.paper1.label} + {NCEE_OFFICIAL_STRUCTURE.paper2.label}</b><span>All official tested domains covered</span><small>{cls==='Primary 5'?'Foundation year · build understanding before speed':'Exam year · understanding + speed + full-paper practice'}</small></aside></section>
 <section className="shell ncee-domain-grid">{NCEE_DOMAINS.map(d=><Link href={'/common-entrance/learn?domain='+encodeURIComponent(d.domain)} key={d.domain}><small>{d.paper}</small><h2>{d.domain}</h2><p>{d.description}</p><b>{nceeSourceTopicsFor(cls,d.domain).length} teaching areas →</b></Link>)}</section>
 <section className="shell ncee-parent-note"><span>FOR YOUNG LEARNERS</span><h2>Primary 5 and Primary 6 are intentionally different.</h2><p>Primary 5 builds the foundation slowly with familiar examples. Primary 6 revises the foundation, fills gaps and moves into timed Common Entrance reasoning. AVORA does not treat a ten-year-old like a JSS learner.</p></section></main>
}
