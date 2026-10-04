'use client';
import {useState} from 'react';
import {wholeNumbersObjectives,wholeNumbersSections} from '@/lib/wholeNumbersAuthored';

function PeriodTable(){
 return <div className="wn-table-scroll" role="region" aria-label="Place value period table" tabIndex={0}><table className="wn-place-table"><thead><tr><th colSpan={3}>Billions</th><th colSpan={3}>Millions</th><th colSpan={3}>Thousands</th><th colSpan={3}>Units</th></tr><tr><th>Hundreds</th><th>Tens</th><th>Units</th><th>Hundreds</th><th>Tens</th><th>Units</th><th>Hundreds</th><th>Tens</th><th>Units</th><th>Hundreds</th><th>Tens</th><th>Units</th></tr></thead><tbody><tr><td>—</td><td>—</td><td>—</td><td>5</td><td>8</td><td>4</td><td>3</td><td>2</td><td>7</td><td>6</td><td>1</td><td>9</td></tr></tbody></table><p><b>584 | 327 | 619</b> = 584 million | 327 thousand | 619</p></div>
}
function ValueTable(){
 return <div className="wn-table-scroll" role="region" aria-label="Place value table for 372,645,918" tabIndex={0}><table className="wn-place-table compact"><thead><tr><th>Hundred millions</th><th>Ten millions</th><th>Millions</th><th>Hundred thousands</th><th>Ten thousands</th><th>Thousands</th><th>Hundreds</th><th>Tens</th><th>Units</th></tr></thead><tbody><tr><td>3</td><td className="focus">7</td><td>2</td><td>6</td><td className="focus">4</td><td>5</td><td>9</td><td>1</td><td>8</td></tr></tbody></table><p><b>7 → 70,000,000</b> &nbsp; · &nbsp; <b>4 → 40,000</b></p></div>
}
function NumberLine({scale=1,max=10,highlight=[]}:{scale?:number;max?:number;highlight?:number[]}){
 const [large,setLarge]=useState(false);const [zoom,setZoom]=useState(1);
 const values=Array.from({length:Math.floor(max/scale)+1},(_,i)=>i*scale);
 const left=48,right=712,y=92;const step=(right-left)/(values.length-1);
 return <div className={'wn-numberline '+(large?'large':'')}>
  <div className="wn-diagram-head"><div><b>Number line</b><span>Each equal interval represents {scale} {scale===1?'unit':'units'}.</span></div><div><button type="button" onClick={()=>setLarge(v=>!v)}>{large?'Normal view':'View larger'}</button>{large&&<><button type="button" aria-label="Zoom out" onClick={()=>setZoom(z=>Math.max(1,+(z-.2).toFixed(1)))}>−</button><button type="button" aria-label="Zoom in" onClick={()=>setZoom(z=>Math.min(1.8,+(z+.2).toFixed(1)))}>+</button></>}</div></div>
  <div className="wn-numberline-viewport"><div style={{width:large?Math.round(760*zoom):760,maxWidth:large?'none':'100%'}}><svg viewBox="0 0 760 185" role="img" aria-label={`Number line from 0 to ${max}, scale ${scale}`}>
   <defs><marker id={`wn-arrow-${scale}`} markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" className="wn-axis-fill"/></marker></defs>
   <text x="380" y="25" textAnchor="middle" className="wn-direction">numbers increase as we move right</text>
   <line x1="32" y1={y} x2="730" y2={y} className="wn-axis" markerEnd={`url(#wn-arrow-${scale})`}/>
   {values.map((v,i)=>{const x=left+i*step;const on=highlight.includes(v);return <g key={v}><line x1={x} y1={on?70:76} x2={x} y2={on?113:107} className={on?'wn-tick strong':'wn-tick'}/>{on&&<circle cx={x} cy={y} r="7" className="wn-point"/>}<text x={x} y="139" textAnchor="middle" className={on?'wn-label strong':'wn-label'}>{v}</text></g>})}
   {scale===1&&highlight.includes(4)&&highlight.includes(7)&&<><path d={`M${left+4*step} 62 Q${left+4.5*step} 37 ${left+5*step} 62 Q${left+5.5*step} 37 ${left+6*step} 62 Q${left+6.5*step} 37 ${left+7*step} 62`} className="wn-jumps"/><text x={(left+4*step+left+7*step)/2} y="172" textAnchor="middle" className="wn-caption">4 → 5 → 6 → 7 = 3 equal intervals</text></>}
  </svg></div></div>
  {large&&<small>Use +/− to enlarge the diagram. On a small screen, move sideways inside the diagram without breaking the tick alignment.</small>}
 </div>
}
export default function WholeNumbersLesson({onExercise}:{onExercise:()=>void}){
 return <article className="wn-lesson">
  <header className="wn-hero"><span>JSS1 MATHEMATICS · VERIFIED TEXT-FIRST LESSON</span><h2>Whole Numbers</h2><p>Learn how our place-value system makes even very long numbers readable, comparable and useful.</p></header>
  <section className="wn-objectives"><h3>What you will learn</h3><ul>{wholeNumbersObjectives.map(x=><li key={x}>{x}</li>)}</ul></section>
  {wholeNumbersSections.map(section=><section key={section.id} id={'whole-'+section.id} className="wn-section"><h3>{section.title}</h3>{section.paragraphs.map((p,i)=><p key={i}>{p}</p>)}{section.examples?.length?<div className="wn-examples"><b>{section.examples.length>1?'Examples':'Example'}</b>{section.examples.map((x,i)=><p key={i}>{x}</p>)}</div>:null}{section.id==='periods'&&<PeriodTable/>}{section.id==='value'&&<ValueTable/>}{section.id==='line'&&<NumberLine highlight={[4,7]}/>} {section.id==='scale'&&<NumberLine scale={10} max={50}/>}</section>)}
  <section className="wn-finish"><b>Ready to check your understanding?</b><p>The lesson stays available for review. The exercise checks whether you can apply the ideas independently.</p><button type="button" onClick={onExercise}>Start Whole Numbers exercise →</button></section>
 </article>
}
