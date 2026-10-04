'use client';

type LessonUnit={title?:string;outcomes?:string[];sourceSteps?:string[];commonMistakes?:string[]};

function classify(text:string){
 const t=text.trim();
 if(/^\d+\./.test(t))return 'section';
 if(/^Worked example/i.test(t))return 'example';
 if(/^Common mistake/i.test(t))return 'mistake';
 if(/^MASTERY CHECK/i.test(t))return 'mastery';
 return 'body';
}
function splitHeading(text:string){
 const m=text.match(/^((?:\d+\.\s*)?[^.]+\.)\s*(.*)$/);
 return m?[m[1],m[2]]:[null,text];
}
export default function CountingBaseTwoLesson({unit,onExercise}:{unit:LessonUnit;onExercise:()=>void}){
 const steps=(unit.sourceSteps||[]).filter(x=>x&&x!=='What you will learn'&&!String(x).toLowerCase().startsWith('counting groups of two'));
 return <article className="wn-lesson counting-base-two-lesson">
  <header className="wn-hero"><span>JSS1 MATHEMATICS · VERIFIED TEXT-FIRST LESSON</span><h2>Counting in Base Two</h2><p>Understand how grouping in twos, binary place value and carrying make base-two counting work.</p></header>
  <section className="wn-objectives"><h3>What you will learn</h3><ul>{(unit.outcomes||[]).map(x=><li key={x}>{x}</li>)}</ul></section>
  {steps.map((text,i)=>{const kind=classify(text);const [heading,body]=splitHeading(text);
   if(kind==='example')return <section key={i} className="wn-section"><div className="wn-examples"><b>{heading||'Worked example'}</b>{body&&<p>{body}</p>}</div></section>;
   if(kind==='mistake')return <section key={i} className="wn-section"><div className="wn-examples"><b>{heading||'Common misconception'}</b>{body&&<p>{body}</p>}</div></section>;
   if(kind==='mastery')return <section key={i} className="wn-finish"><b>Mastery Check</b><p>{body||text.replace(/^MASTERY CHECK\.?\s*/i,'')}</p></section>;
   if(kind==='section')return <section key={i} className="wn-section"><h3>{heading}</h3>{body&&<p>{body}</p>}</section>;
   return <section key={i} className="wn-section"><p>{text}</p></section>
  })}
  <section className="wn-finish"><b>Ready to check your understanding?</b><p>The lesson stays available for review. The exercise checks whether you can apply the ideas independently.</p><button type="button" onClick={onExercise}>Start Counting in Base Two exercise →</button></section>
 </article>
}
