import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {sql,withDbRetry} from '@/lib/db';
import {learnerTopicTitle} from '@/lib/learnerPresentation';
import {getActiveAcademicPlan} from '@/lib/academicCore';

export const dynamic='force-dynamic';
export const revalidate=0;

export default async function Welcome(){
 const s=await getSession();
 if(!s) redirect('/login');
 const access=await requireStudentLearningAccess(s);

 const [u]=await withDbRetry(()=>sql`SELECT u.full_name,sp.class_level,sp.target_exam,sp.preferred_subject,sp.learning_goal,sp.daily_goal_minutes,sp.onboarding_completed,sp.diagnostic_completed,sp.diagnostic_score FROM users u LEFT JOIN student_profiles sp ON sp.user_id=u.id WHERE u.id=${s.userId}`,2);
 if(!u?.onboarding_completed) redirect('/onboarding');
 if(u?.class_level==='Primary 5'||u?.class_level==='Primary 6') redirect('/common-entrance');

 const [[st],[at],skillRows,remediationRows,academicPlan]=await Promise.all([
  withDbRetry(()=>sql`SELECT COALESCE(ROUND(AVG(score)*100),0) AS mastery,COUNT(*)::int skills FROM mastery WHERE student_id=${s.userId}`,2),
  withDbRetry(()=>sql`SELECT COUNT(*)::int attempts,COUNT(*) FILTER(WHERE is_correct)::int correct,COUNT(*) FILTER(WHERE mode='DIAGNOSTIC')::int diagnostic_attempts,COUNT(*) FILTER(WHERE mode='DIAGNOSTIC' AND is_correct)::int diagnostic_correct FROM attempts WHERE student_id=${s.userId}`,2),
  withDbRetry(()=>sql`SELECT s.name,t.name AS topic,ROUND(AVG(CASE WHEN a.is_correct THEN 1 ELSE 0 END)*100)::int AS accuracy,COUNT(*)::int evidence FROM attempts a JOIN questions q ON q.id=a.question_id JOIN skills s ON s.id=q.skill_id JOIN topics t ON t.id=s.topic_id WHERE a.student_id=${s.userId} GROUP BY s.id,s.name,t.name ORDER BY accuracy ASC,evidence DESC LIMIT 3`,2),
  withDbRetry(()=>sql`SELECT recommended_topic,plan_reason FROM remediation_plans WHERE student_id=${s.userId} AND status='ACTIVE' ORDER BY created_at DESC LIMIT 1`,2),
  getActiveAcademicPlan(String(u.class_level||'JSS3'))
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

 const weeklyExams=await withDbRetry(()=>sql`SELECT b.id,b.title,b.release_at,b.closes_at,es.submitted_at FROM weekly_exam_blueprints b JOIN weekly_exam_versions v ON v.blueprint_id=b.id AND v.status='LOCKED' LEFT JOIN exam_sessions es ON es.weekly_exam_version_id=v.id AND es.student_id=${s.userId} WHERE b.class_level=${String(u.class_level||'')} AND b.status IN ('SCHEDULED','LIVE') AND b.closes_at>=now() ORDER BY b.release_at LIMIT 2`).catch(()=>[]);
 const weekday=Math.max(1,Math.min(5,new Date().getDay()||5));
 const liveToday=(academicPlan as any[]).filter((x:any)=>Number(x.day_index)===weekday).slice(0,4);

 return <main className="premium-home">

  <section className="shell today-command">
   <header><div><span className="section-kicker">TODAY · {new Intl.DateTimeFormat('en-NG',{weekday:'long',day:'numeric',month:'long'}).format(new Date())}</span><h1>Know exactly what to do today.</h1><p>{liveToday.length?'Your curriculum work is ready. Study each focus first, then complete its Daily Check.':'Your verified daily curriculum timetable is being prepared. Until it is live, continue from your current AVORA learning focus below.'}</p></div><Link href="/ask" className="premium-secondary">Add what school taught me →</Link></header>
   {liveToday.length?<div className="today-task-list">{liveToday.map((x:any)=><article key={x.id}><div><small>{x.subject_name} · Week {x.week_number}</small><h2>{x.topic_name}</h2><strong>{x.title}</strong><p>{x.objective_text}</p></div><div className="today-task-actions"><Link href={'/tutor?subject='+encodeURIComponent(x.subject_name)+'&topic='+encodeURIComponent(x.topic_name)+(x.lesson_anchor?'&focus='+encodeURIComponent(x.lesson_anchor):'')}>Study this topic →</Link>{x.daily_check_status==='PUBLISHED'?<Link href={'/daily-check/'+x.id}>{x.question_target} question Daily Check →</Link>:<span>{x.question_target} question Daily Check · preparing</span>}</div></article>)}</div>:<div className="today-empty-plan"><b>Current recommendation</b><strong>{learnerTopicTitle(focusTopic)}</strong><p>We will replace this recommendation with the verified weekly curriculum schedule as soon as the academic plan is approved.</p><Link href={remediation?.recommended_topic?'/tutor?topic='+encodeURIComponent(remediation.recommended_topic)+'&subject='+encodeURIComponent(u.preferred_subject||'Mathematics'):'/learn'}>Continue learning →</Link></div>}
  </section>
  {weeklyExams.length>0&&<section className="shell today-weekly-exam"><span className="section-kicker">AVORA WEEKLY</span>{weeklyExams.map((x:any)=><article key={x.id}><div><h2>{x.title}</h2><p>{x.submitted_at?'Submitted — result will follow the configured release time.':Date.now()<new Date(x.release_at).getTime()?'Your serious weekly assessment is scheduled.':'Your weekly assessment is open now.'}</p></div>{!x.submitted_at&&<Link href={'/weekly-exam/'+x.id}>{Date.now()<new Date(x.release_at).getTime()?'View assessment →':'Start weekly exam →'}</Link>}</article>)}</section>}

  {u.class_level==='JSS3'&&!diagnosticComplete&&<section className="shell diagnostic-home-callout"><div><span className="section-kicker">START HERE · ABOUT 5 QUESTIONS</span><h2>Help AVORA find your starting point.</h2><p>You can still explore Learn, Tutor and Exam. This short check simply makes your recommendations more personal.</p></div><Link href="/diagnostic" className="premium-primary">Start diagnostic <span>→</span></Link></section>}
  <section className="shell academic-hub" aria-label="Your learning workspace">
   <div className="academic-hub-intro"><span className="section-kicker">YOUR AVORA WORKSPACE · {u.class_level||'JUNIOR SECONDARY'}</span><h2>Welcome back, {first}.</h2><p>One clear place for today’s lessons, questions, study groups and your learning evidence. Your target is {exam}.</p></div>
   <div className="academic-hub-grid">
    <Link href="/learn" className="academic-hub-tile"><span aria-hidden="true">📚</span><strong>Learn</strong><small>Verified topics and complete lessons</small><b>Explore subjects →</b></Link>
    <Link href="/ask" className="academic-hub-tile"><span aria-hidden="true">✍️</span><strong>Ask AVORA</strong><small>Bring schoolwork for guided help</small><b>Ask a question →</b></Link>
    <Link href="/community" className="academic-hub-tile"><span aria-hidden="true">👥</span><strong>Study rooms</strong><small>Learn with moderated classmates</small><b>Join a room →</b></Link>
    <Link href="/progress" className="academic-hub-tile"><span aria-hidden="true">📈</span><strong>My growth</strong><small>See mastery and what needs revision</small><b>View progress →</b></Link>
   </div>
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
   <div className="journey-head"><span className="section-kicker">THE AVORA LEARNING LOOP</span><h2>School today. Understanding now. Memory for later.</h2><p>Every part of AVORA feeds the same learning record, so lessons, school assignments and revision work together.</p></div>
   <div className="journey-steps"><Link href="/learn"><b>01 · Learn</b><span>Understand today’s curriculum</span><small>Follow verified class topics and learn them deeply before trying to memorise answers.</small></Link><Link href="/school-work"><b>02 · School Work</b><span>Bring in what your teacher gives you</span><small>Keep real assignments connected to the topics they test instead of losing them after submission.</small></Link><Link href="/practice"><b>03 · Review</b><span>Return to what needs strengthening</span><small>AVORA mixes fresh work with older mastered and weak questions so understanding lasts.</small></Link><Link href="/progress"><b>04 · Progress</b><span>See what the evidence says</span><small>Know what is taught, what is independently proven, and what should come back next.</small></Link></div>
  </section>

  <section className="shell home-promise">
   <span>YOUR GOAL</span>
   <p>{u.learning_goal||'Build reliable understanding and become exam-ready.'}</p>
   <small>Scores are evidence, not labels. Your path changes as your understanding changes.</small>
  </section>
 </main>
}
