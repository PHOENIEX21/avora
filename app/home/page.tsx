import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {sql,withDbRetry} from '@/lib/db';
import {learnerTopicTitle} from '@/lib/learnerPresentation';

export const dynamic='force-dynamic';
export const revalidate=0;

export default async function Welcome(){
 const s=await getSession();
 if(!s) redirect('/login');
 const access=await requireStudentLearningAccess(s);

 const [u]=await withDbRetry(()=>sql`SELECT u.full_name,sp.class_level,sp.target_exam,sp.preferred_subject,sp.learning_goal,sp.daily_goal_minutes,sp.onboarding_completed,sp.diagnostic_completed,sp.diagnostic_score FROM users u LEFT JOIN student_profiles sp ON sp.user_id=u.id WHERE u.id=${s.userId}`,2);
 if(!u?.onboarding_completed) redirect('/onboarding');
 if(u?.class_level==='Primary 5'||u?.class_level==='Primary 6') redirect('/common-entrance');

 const [[st],[at],skillRows,remediationRows]=await Promise.all([
  withDbRetry(()=>sql`SELECT COALESCE(ROUND(AVG(score)*100),0) AS mastery,COUNT(*)::int skills FROM mastery WHERE student_id=${s.userId}`,2),
  withDbRetry(()=>sql`SELECT COUNT(*)::int attempts,COUNT(*) FILTER(WHERE is_correct)::int correct,COUNT(*) FILTER(WHERE mode='DIAGNOSTIC')::int diagnostic_attempts,COUNT(*) FILTER(WHERE mode='DIAGNOSTIC' AND is_correct)::int diagnostic_correct FROM attempts WHERE student_id=${s.userId}`,2),
  withDbRetry(()=>sql`SELECT s.name,t.name AS topic,ROUND(AVG(CASE WHEN a.is_correct THEN 1 ELSE 0 END)*100)::int AS accuracy,COUNT(*)::int evidence FROM attempts a JOIN questions q ON q.id=a.question_id JOIN skills s ON s.id=q.skill_id JOIN topics t ON t.id=s.topic_id WHERE a.student_id=${s.userId} GROUP BY s.id,s.name,t.name ORDER BY accuracy ASC,evidence DESC LIMIT 3`,2),
  withDbRetry(()=>sql`SELECT recommended_topic,plan_reason FROM remediation_plans WHERE student_id=${s.userId} AND status='ACTIVE' ORDER BY created_at DESC LIMIT 1`,2)
 ]);

 const first=(u.full_name||'Learner').split(/\s+/)[0];
 const mastery=Number(st?.mastery||0);
 const diagAttempts=Number(at?.diagnostic_attempts||0);
 const diagCorrect=Number(at?.diagnostic_correct||0);
 let diagnosticComplete=Boolean(u.diagnostic_completed);
 let diag=u.diagnostic_score==null?(diagAttempts?Math.round(diagCorrect/diagAttempts*100):null):Math.round(Number(u.diagnostic_score)*100);
 if(!diagnosticComplete && diagAttempts>=5){
  const score=diagAttempts?diagCorrect/diagAttempts:0;
  await sql`UPDATE student_profiles SET diagnostic_completed=true,diagnostic_completed_at=COALESCE(diagnostic_completed_at,now()),diagnostic_score=${score},updated_at=now() WHERE user_id=${s.userId}`;
  diagnosticComplete=true;diag=Math.round(score*100);
 }
 const remediation=remediationRows[0];
 const focus=skillRows[0];
 const focusName=focus?.skill_name||focus?.name||'Your next skill';
 const focusTopic=remediation?.recommended_topic||focus?.topic||u.preferred_subject||'Mathematics';
 const focusAccuracy=focus?.accuracy==null?null:Number(focus.accuracy);
 const exam=u.target_exam||'BECE';
 const daily=Number(u.daily_goal_minutes||20);
 const observed=Number(at?.attempts||0);
 const skills=Number(st?.skills||0);
 const focusState=focusAccuracy==null?'Ready to begin':focusAccuracy<45?'Needs teaching':focusAccuracy<75?'Developing':'Building confidence';

 return <main className="premium-home">

  {u.class_level==='JSS3'&&!diagnosticComplete&&<section className="shell diagnostic-home-callout"><div><span className="section-kicker">START HERE · ABOUT 5 QUESTIONS</span><h2>Help AVORA find your starting point.</h2><p>You can still explore Learn, Tutor and Exam. This short check simply makes your recommendations more personal.</p></div><Link href="/diagnostic" className="premium-primary">Start diagnostic <span>→</span></Link></section>}
  <section className="shell premium-welcome">
   <div className="welcome-main">
    <div className="welcome-eyebrow"><span>HOME · YOUR LEARNING SPACE</span><i></i><b>{exam} · {u.preferred_subject||'Mathematics'}</b></div>
    <h1>Your learning plan, <span>{first}.</span></h1>
    <p className="welcome-summary">Here’s what AVORA recommends next based on your learning evidence. Continue where you stopped, choose another subject, or follow today’s focus.</p>
    <div className="welcome-actions">
     <Link href="/learn" className="premium-primary">Continue learning <span>→</span></Link>
     <Link href="/learn" className="premium-secondary">Choose a subject</Link>
    </div>
   </div>
   <aside className="welcome-status" aria-label="Today's learning focus">
    <span className="status-label">TODAY'S FOCUS</span>
    <strong>{learnerTopicTitle(focusTopic)}</strong>
    <p>{learnerTopicTitle(focusName)}</p>
    <div className="status-row"><span>{focusState}</span><b>{focusAccuracy==null?'—':`${focusAccuracy}%`}</b></div>
   </aside>
  </section>

  <section className="shell focus-band">
   <div className="focus-copy">
    <span className="section-kicker">YOUR NEXT MOVE</span>
    <h2>{learnerTopicTitle(focusName)}</h2>
    <p>{remediation?.plan_reason|| (focus?`AVORA noticed that this skill deserves attention. We’ll teach it in interactive steps, wait for your reasoning, then give you fresh independent proof.`:'We’ll begin with a guided sequence and use your answers to decide what comes next.')}</p>
    <Link href={remediation?.recommended_topic?'/tutor?topic='+encodeURIComponent(remediation.recommended_topic)+'&subject='+encodeURIComponent(u.preferred_subject||'Mathematics'):'/learn'} className="focus-link">Start this learning session <span>→</span></Link>
   </div>
   <div className="focus-meta">
    <div><span>Topic</span><strong>{learnerTopicTitle(focusTopic)}</strong></div>
    <div><span>Target exam</span><strong>{exam}</strong></div>
    <div><span>Daily rhythm</span><strong>{daily} min</strong></div>
    <div><span>Current evidence</span><strong>{focusAccuracy==null?'Not assessed':`${focusAccuracy}%`}</strong></div>
   </div>
  </section>

  <section className="shell evidence-strip">
   <div className="evidence-intro">
    <span className="section-kicker">LEARNING EVIDENCE</span>
    <h2>A clear picture, not just a score.</h2>
    <p>AVORA uses repeated answers to understand where you are strong, where you are developing, and what should be taught next.</p>
   </div>
   <div className="evidence-stats">
    <div><strong>{diag==null?'—':`${diag}%`}</strong><span>starting point</span></div>
    <div><strong>{observed}</strong><span>answers observed</span></div>
    <div><strong>{skills}</strong><span>skills with evidence</span></div>
   </div>
  </section>

  {skillRows.length>0&&<section className="shell learning-signals">
   <div className="signals-head">
    <div><span className="section-kicker">WHAT AVORA NOTICED</span><h2>Your first learning priorities</h2></div>
    <Link href="/progress">See full progress →</Link>
   </div>
   <div className="signal-list">
    {skillRows.map((x:any,index:number)=><div className="signal-row" key={`${x.topic}-${x.name}`}>
     <span className="signal-index">0{index+1}</span>
     <div><small>{x.topic}</small><strong>{x.name}</strong></div>
     <div className="signal-evidence"><b>{x.accuracy}%</b><span>{x.evidence} {x.evidence===1?'answer':'answers'}</span></div>
    </div>)}
   </div>
  </section>}

  <section className="shell journey-guide">
   <div className="journey-head"><span className="section-kicker">HOW TO USE AVORA</span><h2>Every feature has one job.</h2><p>You should always know what to do next and why.</p></div>
   <div className="journey-steps"><Link href="/exam"><b>01 · Exam</b><span>Find the gaps</span><small>Take a timed paper so AVORA can see where exam skills break down.</small></Link><Link href="/tutor"><b>02 · Tutor</b><span>Learn the gap</span><small>Choose a topic and learn it through simple, visual or guided teaching.</small></Link><Link href="/practice"><b>03 · Practice</b><span>Prove it alone</span><small>Answer without tutor support so the result counts as independent evidence.</small></Link><Link href="/progress"><b>04 · Progress</b><span>See mastery</span><small>Know what is weak, developing, secure and ready for the exam.</small></Link></div>
  </section>

  <section className="shell home-promise">
   <span>YOUR GOAL</span>
   <p>{u.learning_goal||'Build reliable understanding and become exam-ready.'}</p>
   <small>Scores are evidence, not labels. Your path changes as your understanding changes.</small>
  </section>
 </main>
}
