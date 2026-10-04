'use client';

type LessonUnit={title?:string;outcomes?:string[];sourceSteps?:string[]};

function notation(s:string){
 return s.replace(/2\^0/g,'2⁰').replace(/2\^1/g,'2¹').replace(/2\^2/g,'2²').replace(/2\^3/g,'2³').replace(/2\^4/g,'2⁴').replace(/2\^5/g,'2⁵')
 .replace(/1_10/g,'1₁₀').replace(/2_10/g,'2₁₀').replace(/3_10/g,'3₁₀').replace(/4_10/g,'4₁₀').replace(/5_10/g,'5₁₀').replace(/6_10/g,'6₁₀').replace(/7_10/g,'7₁₀').replace(/8_10/g,'8₁₀').replace(/9_10/g,'9₁₀').replace(/10_10/g,'10₁₀')
 .replace(/1_2/g,'1₂').replace(/10_2/g,'10₂').replace(/11_2/g,'11₂').replace(/100_2/g,'100₂').replace(/101_2/g,'101₂').replace(/110_2/g,'110₂').replace(/111_2/g,'111₂').replace(/1000_2/g,'1000₂').replace(/1001_2/g,'1001₂').replace(/1010_2/g,'1010₂');
}
function Paragraphs({text}:{text:string}){return <>{notation(text).split(/\n+/).filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}</>}
function TeachingStep({text}:{text:string}){const t=notation(text).replace(/```/g,'').trim();const numbered=t.match(/^(\d+\.\s*[^.]+\.)\s*(.*)$/s);if(numbered)return <><h3>{numbered[1]}</h3><Paragraphs text={numbered[2]}/></>;const question=t.match(/^([A-Z][A-Z\s-]+\?)\s*(.*)$/s);if(question)return <><h3>{question[1]}</h3><Paragraphs text={question[2]}/></>;const caps=t.match(/^([A-Z][A-Z\s—-]+\.)\s*(.*)$/s);if(caps)return <><h3>{caps[1].slice(0,-1)}</h3><Paragraphs text={caps[2]}/></>;if(/^For the NERDC 1–10 range/i.test(t))return <><h3>Quick Reference — Decimal 1–10 in Binary</h3><div className="binary-reference"><span>1₁₀ = 1₂</span><span>2₁₀ = 10₂</span><span>3₁₀ = 11₂</span><span>4₁₀ = 100₂</span><span>5₁₀ = 101₂</span><span>6₁₀ = 110₂</span><span>7₁₀ = 111₂</span><span>8₁₀ = 1000₂</span><span>9₁₀ = 1001₂</span><span>10₁₀ = 1010₂</span></div><p>Learners should understand the conversion method rather than memorise the table.</p></>;if(/^Example with 10/i.test(t))return <><h3>Example — Convert 10 by Repeated Division</h3><DivisionTable n={10} rows={[[10,5,0],[5,2,1],[2,1,0],[1,0,1]]} answer="10₁₀ = 1010₂"/></>;return <Paragraphs text={t}/>}
function Mistake({text,index}:{text:string;index:number}){const body=notation(text).replace(/^Common mistake\s*\d*:\s*/i,'');return <div className="binary-mistake"><span className="binary-mistake-label">Common mistake {index+1}</span><p>{body}</p></div>}
function DivisionTable({n,rows,answer}:{n:number;rows:[number,number,number][],answer:string}){
 return <div className="binary-division" role="region" aria-label={`Repeated division of ${n} by 2`}>
  <div className="binary-division-head"><span>Division</span><span>Quotient</span><span>Remainder</span></div>
  {rows.map(([a,q,r])=><div className="binary-division-row" key={a}><span>{a} ÷ 2</span><strong>{q}</strong><strong>{r}</strong></div>)}
  <p><b>Read the remainder column from bottom to top ↑</b></p><p><b>{answer}</b></p>
 </div>
}
const examples=[
 {title:'Worked Example 1 — Convert 6 to Binary Using Powers of Two',body:<><p>Use the binary place values <b>4, 2, 1</b>.</p><p>6 = 4 + 2, so the 4-place is 1, the 2-place is 1 and the 1-place is 0.</p><p><b>6₁₀ = 110₂</b></p><p>Check: 4 + 2 + 0 = 6.</p></>},
 {title:'Worked Example 2 — Convert 10 Using Repeated Division',body:<><DivisionTable n={10} rows={[[10,5,0],[5,2,1],[2,1,0],[1,0,1]]} answer="10₁₀ = 1010₂"/><p>Check: (1 × 2³) + (0 × 2²) + (1 × 2¹) + (0 × 2⁰) = 8 + 0 + 2 + 0 = 10.</p></>},
 {title:'Worked Example 3 — Convert 23 to Binary',body:<><DivisionTable n={23} rows={[[23,11,1],[11,5,1],[5,2,1],[2,1,0],[1,0,1]]} answer="23₁₀ = 10111₂"/><p>Check: 16 + 0 + 4 + 2 + 1 = 23.</p></>},
 {title:'Worked Example 4 — The Wrong Reading Direction',body:<><DivisionTable n={14} rows={[[14,7,0],[7,3,1],[3,1,1],[1,0,1]]} answer="14₁₀ = 1110₂"/><p>Reading the remainders from top to bottom gives 0111₂, which equals 7, not 14. The correct direction is <b>bottom to top</b>.</p></>},
 {title:'Worked Example 5 — Binary and Computer Switches',body:<><p>A simple electronic switch can have two states: <b>ON = 1</b> and <b>OFF = 0</b>.</p><p>Examples with two active positions include 1100₂ = 12, 1010₂ = 10, 1001₂ = 9, 0110₂ = 6, 0101₂ = 5 and 0011₂ = 3.</p><p>This two-state pattern is one reason binary is useful in digital systems.</p></>},
 {title:'Worked Example 6 — Convert 30 to Binary',body:<><DivisionTable n={30} rows={[[30,15,0],[15,7,1],[7,3,1],[3,1,1],[1,0,1]]} answer="30₁₀ = 11110₂"/><p>Check: 16 + 8 + 4 + 2 + 0 = 30.</p></>}
];
export default function BaseTenToBinaryLesson({unit,onExercise}:{unit:LessonUnit;onExercise:()=>void}){
 const steps=(unit.sourceSteps||[]).filter(Boolean).filter(x=>x!=='What you will learn'&&!(unit.outcomes||[]).includes(x)&&!/^Worked example/i.test(x)&&!/^Common mistake/i.test(x));
 return <article className="wn-lesson base-ten-binary-lesson">
  <header className="wn-hero"><span>JSS1 MATHEMATICS · NERDC-ALIGNED LESSON</span><h2>Conversion of Base 10 Numerals to Binary Numbers</h2><p>Learn two reliable conversion methods, understand why they work, and verify every answer using binary place value.</p></header>
  <section className="wn-objectives"><h3>What you will learn</h3><ul>{(unit.outcomes||[]).map(x=><li key={x}>{notation(x)}</li>)}</ul></section>
  <section className="wn-section"><h3>Before you begin</h3><p>You should already understand binary counting, powers of two such as <b>2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8 and 2⁴ = 16</b>, and division with remainders.</p></section>
  {steps.map((text,i)=><section key={i} className="wn-section"><TeachingStep text={String(text)}/></section>)}
  <section className="wn-section"><h3>Worked Examples</h3><p>Follow each example one line at a time. Keep the quotient and remainder in separate columns.</p></section>
  {examples.map((x,i)=><section key={i} className="wn-section"><h3>{x.title}</h3><div className="wn-examples">{x.body}</div></section>)}
  <section className="wn-section"><h3>Common Misconceptions</h3>{(unit.sourceSteps||[]).filter(x=>/^Common mistake/i.test(x)).map((x,i)=><Mistake text={x} index={i} key={i}/>)}</section>
  <section className="wn-finish"><b>Mastery Check</b><p>You should be able to convert base-ten numbers to binary using powers of two and repeated division, read remainders from bottom to top, preserve zero placeholders, and verify the result by converting back to base ten.</p></section>
  <section className="wn-finish"><b>Ready to practise?</b><p>Use the exercise to prove that you can convert correctly and check your answer independently.</p><button type="button" onClick={onExercise}>Start conversion exercise →</button></section>
 </article>
}
