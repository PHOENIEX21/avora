import Link from 'next/link';
import { curriculumCoverage, coverageSummary } from '../../lib/curriculumCoverage';
import { getOfficialObjectives } from '../../lib/curriculumObjectives';

export default function CurriculumPage(){
 const summary=coverageSummary();
 const groups=['JSS1','JSS2','JSS3'] as const;
 return <main className="shell curriculum-page">
  <header className="compact-head">
   <span className="section-kicker">ACADEMIC TRUST</span>
   <h1>Official curriculum coverage</h1>
   <p>This page separates what NERDC requires from what AVORA has actually built. A real topic stays visible even when its lesson is empty.</p>
  </header>
  <section className="curriculum-summary">
   <article><strong>{summary.total}</strong><span>official topics</span></article>
   <article><strong>{summary.objectiveGrounded}</strong><span>objectives source-grounded</span></article>
   <article><strong>{summary.partial}</strong><span>broad-plan partial</span></article>
   <article><strong>{summary.deep}</strong><span>fully audited deep</span></article>
  </section>
  <div className="curriculum-truth-note"><b>Truth rule</b><span>“DEEP” is never inferred. It only appears after every official objective for that topic has teaching, guided practice, independent practice, misconceptions, board steps and mastery evidence.</span></div>
  {groups.map(level=><section key={level} className="curriculum-class">
   <h2>{level}</h2>
   {(['Mathematics','English Language'] as const).map(subject=>{
    const rows=curriculumCoverage.filter(x=>x.topic.classLevel===level&&x.topic.subject===subject);
    return <div key={subject} className="curriculum-subject"><h3>{subject}</h3><div className="curriculum-list">
     {rows.map(({topic,lessonStatus,objectiveStatus,matchedTutorTopic})=>{const official=getOfficialObjectives(topic.id);return <article key={topic.id} className="curriculum-row">
      <div><small>{topic.strand}{topic.subTheme?` · ${topic.subTheme}`:''}</small><b>{topic.topic}</b>{matchedTutorTopic&&<em>Current Tutor evidence: {matchedTutorTopic}</em>}</div>
      <div className="curriculum-badges"><span data-state={objectiveStatus}>{objectiveStatus==='SOURCE_GROUNDED'?'OBJECTIVES GROUNDED':'OBJECTIVES PENDING'}</span><span data-state={lessonStatus}>{lessonStatus}</span></div>
      {official&&<details><summary>Official objective map</summary><ul>{official.objectives.map(o=><li key={o}>{o}</li>)}</ul><p>NERDC source page {official.sourcePage}. AVORA lesson wording remains independently authored.</p></details>}
     </article>})}
    </div></div>
   })}
  </section>)}
  <div className="archive-actions"><Link href="/learn" className="btn btn-primary">Go to Learn</Link><Link href="/tutor" className="btn btn-secondary">Open Tutor</Link></div>
 </main>
}
