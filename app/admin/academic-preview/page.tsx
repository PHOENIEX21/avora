import Link from 'next/link';
import {requireAdmin} from '@/lib/admin/access';
import {getOfficialTopicNames,getDeepCurriculumLesson,deepLessonToTutorPlan} from '@/lib/curriculumTutor';
import {NCEE_DOMAINS,NCEE_PREP_CLASSES,nceeTopicsFor,nceeTopicById,type NceeDomain,type PrimaryPrepClass} from '@/lib/nceePrep';
import {nceeRichDeepLesson} from '@/lib/nceeRichTeaching';

export const dynamic='force-dynamic';
type Search={class?:string;subject?:string;topic?:string};
const JSS_SUBJECTS=['Mathematics','English Language'] as const;
const ALL_CLASSES=['Primary 5','Primary 6','JSS1','JSS2','JSS3'] as const;

function enc(v:string){return encodeURIComponent(v)}

export default async function AcademicPreview({searchParams}:{searchParams:Promise<Search>}){
 await requireAdmin();
 const sp=await searchParams;
 const classLevel=ALL_CLASSES.includes(sp.class as any)?String(sp.class):'JSS1';
 const primary=NCEE_PREP_CLASSES.includes(classLevel as PrimaryPrepClass);
 const subjects=primary?NCEE_DOMAINS.map(x=>x.domain):[...JSS_SUBJECTS];
 const subject=subjects.includes(sp.subject as any)?String(sp.subject):String(subjects[0]);

 const jssTopics=primary?[]:getOfficialTopicNames(classLevel,subject);
 const nceeTopics=primary?nceeTopicsFor(classLevel as PrimaryPrepClass,subject as NceeDomain):[];
 const requested=String(sp.topic||'');
 const selectedJss=!primary&&jssTopics.includes(requested)?requested:'';
 const selectedNcee=primary?nceeTopics.find(x=>x.id===requested):undefined;
 const jssLesson=selectedJss?getDeepCurriculumLesson(classLevel,subject,selectedJss):undefined;
 const jssPlan=jssLesson?deepLessonToTutorPlan(jssLesson):undefined;
 const nceeLesson=selectedNcee?nceeRichDeepLesson(nceeTopicById(selectedNcee.id)!):undefined;

 return <main className="shell admin-v103 academic-preview-page">
  <header className="admin-section-head academic-preview-head"><div><Link href="/admin">← Admin dashboard</Link><span className="eyebrow">ADMIN ACADEMIC PREVIEW · OWNER TEST MODE</span><h1>Inspect every AVORA class, subject and teaching topic.</h1><p>This mode does not change a learner profile and does not weaken learner class restrictions. Choose any class and subject below to inspect the exact academic content available to students.</p></div><span className="admin-preview-badge">ADMIN ONLY</span></header>

  <section className="academic-path-switch"><Link className={primary?'active':''} href="/admin/academic-preview?class=Primary%205"><b>NCEE / Common Entrance</b><span>Primary 5 · Primary 6</span></Link><Link className={!primary?'active':''} href="/admin/academic-preview?class=JSS1"><b>BECE / JSS</b><span>JSS1 · JSS2 · JSS3</span></Link></section>

  <section className="admin-panel academic-preview-controls">
   <div><b>1 · Choose class</b><nav>{ALL_CLASSES.map(c=><Link key={c} className={classLevel===c?'active':''} href={`/admin/academic-preview?class=${enc(c)}`}>{c}</Link>)}</nav></div>
   <div><b>2 · Choose subject / domain</b><nav>{subjects.map(s=><Link key={s} className={subject===s?'active':''} href={`/admin/academic-preview?class=${enc(classLevel)}&subject=${enc(String(s))}`}>{String(s)}</Link>)}</nav></div>
  </section>

  <section className="academic-preview-summary">
   <article><span>Viewing as</span><strong>{classLevel}</strong></article><article><span>Subject / domain</span><strong>{subject}</strong></article><article><span>Topics available</span><strong>{primary?nceeTopics.length:jssTopics.length}</strong></article><article><span>Path</span><strong>{primary?'NCEE':'NERDC / BECE'}</strong></article>
  </section>

  <section className="admin-panel academic-preview-browser"><header><span>3 · CHOOSE A TOPIC</span><h2>{classLevel} · {subject}</h2><p>Select any topic to inspect its actual lesson structure. Learners remain restricted to their own class outside this admin-only page.</p></header><div className="academic-topic-grid">
   {(primary?nceeTopics:jssTopics).map((t:any,i:number)=>{const id=primary?t.id:t;const title=primary?t.title:t;const active=requested===id;return <Link className={active?'active':''} key={id} href={`/admin/academic-preview?class=${enc(classLevel)}&subject=${enc(subject)}&topic=${enc(id)}`}><small>{String(i+1).padStart(2,'0')}</small><b>{title}</b><span>{active?'Open below ↓':'Inspect →'}</span></Link>})}
  </div></section>

  {jssLesson&&jssPlan&&<section className="admin-panel academic-lesson-inspector"><header><span>JSS SOURCE-BACKED TEACHING PREVIEW</span><h2>{jssLesson.topic}</h2><p>{jssPlan.goal}</p></header><div className="academic-inspector-stats"><span><b>{jssLesson.units.length}</b> source-backed units</span><span><b>{jssLesson.units.reduce((n,u)=>n+(u.sourceSteps?.length||0),0)}</b> source teaching steps</span><span><b>{jssLesson.units.reduce((n,u)=>n+(u.sourceChecks?.length||0),0)}</b> learner checkpoints</span><span><b>Term {jssLesson.term}</b> master curriculum</span></div><details open><summary>Lesson purpose</summary><p>{jssPlan.why}</p>{jssPlan.outcomes?.map(x=><p key={x}>✓ {x}</p>)}</details><details open><summary>Exact source-backed Tutor units</summary>{jssLesson.units.map((u,i)=><article key={`${u.title}-${i}`} className="academic-unit-preview"><header><small>UNIT {String(i+1).padStart(2,'0')}</small><b>{u.title}</b></header>{u.prerequisites?.length?<div><strong>Prerequisites</strong>{u.prerequisites.map(x=><p key={x}>✓ {x}</p>)}</div>:null}{u.terms?.length?<div><strong>Terms</strong>{u.terms.map(([term,meaning])=><p key={term}><b>{term}:</b> {meaning}</p>)}</div>:null}<div><strong>Core explanation</strong><p>{u.explain}</p></div>{u.why?<div><strong>Why it works</strong><p>{u.why}</p></div>:null}{u.example?<div><strong>Worked/example bridge</strong><p>{u.example}</p></div>:null}{u.sourceSteps?.length?<div><strong>Source teaching sequence</strong>{u.sourceSteps.map((x,n)=><p key={n}><b>{n+1}.</b> {x}</p>)}</div>:null}{u.commonMistakes?.length?<div><strong>Misconceptions / mistakes</strong>{u.commonMistakes.map(x=><p key={x}>• {x}</p>)}</div>:null}{u.sourceChecks?.length?<div><strong>Learner checkpoints</strong>{u.sourceChecks.map((x,n)=><p key={n}>CHECK {n+1} · {x}</p>)}</div>:<div><strong>Checkpoint</strong><p>{u.check}</p></div>}</article>)}</details><div className="academic-master-gate"><b>Mastery rule</b><p>Admin preview reflects the same V13 source-backed units used by the learner Tutor. Assisted checkpoints do not count as independent mastery; fresh independent evidence is still required.</p></div></section>}

  {nceeLesson&&<section className="admin-panel academic-lesson-inspector"><header><span>NCEE DEEP TEACHING PREVIEW</span><h2>{nceeLesson.title}</h2><p>{nceeLesson.objective}</p></header><div className="academic-inspector-stats"><span><b>{nceeLesson.definitions.length}</b> definitions</span><span><b>{nceeLesson.workedExamples.length}</b> worked examples</span><span><b>{nceeLesson.teachingPhases.length}</b> teaching phases</span><span><b>{nceeLesson.masteryChecks.length}</b> mastery checks</span></div><details open><summary>Big idea + why it works</summary><p>{nceeLesson.bigIdea}</p><p><b>Why:</b> {nceeLesson.whyItWorks}</p></details><details><summary>Prerequisites + definitions</summary>{nceeLesson.prerequisites.map(x=><p key={x}>✓ {x}</p>)}{nceeLesson.definitions.map(x=><article key={x.term}><b>{x.term}</b><p>{x.simple}</p><small>{x.use}</small></article>)}</details><details><summary>Eight-stage teaching journey</summary>{nceeLesson.teachingPhases.map((x,i)=><p key={x.name}><b>{i+1}. {x.name}:</b> {x.text}</p>)}</details><details><summary>Five worked examples</summary>{nceeLesson.workedExamples.map((x,i)=><article key={i}><b>Example {i+1}: {x.prompt}</b><p>Answer: {x.answer}</p><small>{x.explanation}</small></article>)}</details><details><summary>Misconception repair</summary>{nceeLesson.misconceptionRepairs.map((x,i)=><p key={i}><b>Mistake:</b> {x.mistake}<br/><b>Repair:</b> {x.repair}</p>)}</details><details><summary>Guided + independent practice</summary>{nceeLesson.guidedPractice.map(x=><p key={'g'+x}>GUIDED · {x}</p>)}{nceeLesson.independentPractice.map(x=><p key={'i'+x}>INDEPENDENT · {x}</p>)}</details><div className="academic-master-gate"><b>Mastery checks</b>{nceeLesson.masteryChecks.map(x=><p key={x}>□ {x}</p>)}</div></section>}
 </main>
}
