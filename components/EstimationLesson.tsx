'use client';

const objectives=[
'explain what estimation means',
'distinguish an estimate from an exact measurement',
'estimate lengths and distances using familiar references',
'estimate capacity of containers',
'estimate mass of common objects',
'estimate time for everyday activities',
'choose sensible units for estimated quantities',
'compare an estimate with an actual measurement',
'explain why an estimate is reasonable or unreasonable',
'apply estimation to everyday situations and simple problems'
];
function Work({question,children}:{question:string;children:React.ReactNode}){return <div className="fraction-working estimation-example"><div className="example-question"><span>WORKED EXAMPLE</span><strong>{question}</strong></div><div className="math-stack">{children}</div></div>}
function L({children}:{children:React.ReactNode}){return <div className="math-line">{children}</div>}
function Mistake({n,title,children}:{n:number;title:string;children:React.ReactNode}){return <div className="binary-mistake"><span className="binary-mistake-label">Common mistake {n}</span><h4>{title}</h4>{children}</div>}
export default function EstimationLesson({onExercise}:{onExercise:()=>void}){
return <article className="wn-lesson fractions-premium-lesson estimation-lesson">
<header className="wn-hero"><span>JSS1 MATHEMATICS</span><h1>Estimation</h1><p>Use familiar quantities to make sensible approximate measurements.</p></header>
<section className="wn-objectives"><h2>Learning Objectives</h2><ul>{objectives.map(x=><li key={x}>{x}.</li>)}</ul></section>
<section className="wn-section"><h3>1. What Is Estimation?</h3><p>An <b>estimate</b> is a sensible value that is close to the actual value. It is not simply a guess. A good estimate uses something you already know as a reference.</p><p>If one large walking step is approximately 1 metre and a classroom takes about 8 such steps from one end to the other, a sensible estimate for its length is about <b>8 m</b>.</p></section>
<section className="wn-section"><h3>2. Estimate and Exact Measurement</h3><p>Suppose you estimate a table to be 1 m long. You then measure it and obtain 96 cm. Since 1 m = 100 cm, your estimate was only 4 cm away. An estimate is expected to be close, not necessarily exact.</p></section>
<section className="wn-section"><h3>3. Use a Familiar Reference</h3><p>Ask: <b>What known quantity can I compare this with?</b></p><div className="lesson-rule"><span>A metre ruler ≈ 1 m</span><span>A small water bottle ≈ 500 mL</span><span>1000 g = 1 kg</span><span>60 seconds = 1 minute</span></div></section>
<section className="wn-section"><h3>4. Estimating Length</h3><p>Use a unit that suits the object: centimetres for a pencil, metres for a classroom, and kilometres for long journeys.</p>
<Work question="Estimate the length of a classroom if one large step is approximately 1 metre and it takes 9 steps to walk from one end to the other."><L>1 step ≈ 1 m</L><L>9 steps × 1 m</L><L>= 9 m</L><L><b>Answer: approximately 9 m</b></L></Work></section>
<section className="wn-section"><h3>5. Estimating With a Known Length</h3>
<Work question="A ruler is 30 cm long. A desk appears to be about four ruler-lengths long. Estimate the length of the desk."><L>1 ruler = 30 cm</L><L>4 × 30 cm = 120 cm</L><L>120 cm = 1.2 m</L><L><b>Answer: approximately 120 cm or 1.2 m</b></L></Work></section>
<section className="wn-section"><h3>6. Estimating Distance</h3><p>If the school gate is about 100 large one-metre steps from your classroom, the estimated distance is 100 × 1 m = <b>100 m</b>. For distances between towns, kilometres are more sensible.</p></section>
<section className="wn-section"><h3>7. Estimating Capacity</h3><p>Capacity tells us how much liquid a container can hold. Remember: <b>1000 mL = 1 L.</b></p>
<Work question="A bottle holds 500 mL. A larger container appears to hold about four of those bottles. Estimate its capacity."><L>4 × 500 mL = 2000 mL</L><L>2000 mL = 2 L</L><L><b>Answer: approximately 2 L</b></L></Work></section>
<section className="wn-section"><h3>8. Estimating Mass</h3><p>Mass is commonly measured in grams and kilograms. Remember: <b>1000 g = 1 kg.</b></p>
<Work question="A small packet has a mass of about 250 g. Estimate the mass of four similar packets."><L>4 × 250 g = 1000 g</L><L>1000 g = 1 kg</L><L><b>Answer: approximately 1 kg</b></L></Work></section>
<section className="wn-section"><h3>9. Estimating Time</h3><p>60 seconds = 1 minute and 60 minutes = 1 hour. If walking from the classroom to the gate takes about 4 minutes, going there and returning takes approximately 4 + 4 = <b>8 minutes</b>.</p></section>
<section className="wn-section"><h3>10. Choosing a Sensible Unit</h3>
<Work question="A classroom door is approximately 2 ___ high. Which unit makes sense?"><L>2 mm — far too small</L><L>2 km — far too large</L><L>2 m — sensible</L><L><b>Answer: metres (m)</b></L></Work></section>
<section className="wn-section"><h3>11. Is the Estimate Reasonable?</h3><p>An exercise book cannot reasonably be 3 metres long. A value around 20 cm to 30 cm is much more sensible. Always ask whether the number and unit make sense for the object.</p></section>
<section className="wn-section"><h3>12. Estimate → Measure → Compare</h3>
<Work question="You estimate a table to be 150 cm long. Its actual measured length is 145 cm. How close was your estimate?"><L>150 cm − 145 cm = 5 cm</L><L><b>The estimate differed from the actual measurement by only 5 cm.</b></L></Work></section>
<section className="wn-section"><h3>13. Estimation in Everyday Life</h3><p>We estimate whether money is enough for purchases, how long a journey may take, how much water a container holds, how far we need to walk, how heavy a bag is, and how much material a task may need.</p></section>
<section className="wn-section"><h3>14. Complete Estimation Method</h3><div className="lesson-rule"><span><b>1.</b> Identify what is being estimated.</span><span><b>2.</b> Choose a sensible unit.</span><span><b>3.</b> Find a familiar reference.</span><span><b>4.</b> Compare the unknown quantity with the reference.</span><span><b>5.</b> Calculate if necessary.</span><span><b>6.</b> Ask whether the result is reasonable.</span></div></section>
<section className="wn-section"><h3>Common Misconceptions</h3>
<Mistake n={1} title="Treating estimation as random guessing"><p>A good estimate has a reason or reference behind it.</p></Mistake>
<Mistake n={2} title="Choosing an impossible unit"><p>A pencil may be about 15 cm long; 15 km is not a sensible estimate.</p></Mistake>
<Mistake n={3} title="Expecting the estimate to equal the exact value"><p>An estimate can be useful even when it is not identical to the measured value.</p></Mistake>
<Mistake n={4} title="Ignoring known references"><p>Use familiar measurements, such as a 500 mL bottle, to estimate unfamiliar quantities.</p></Mistake>
<Mistake n={5} title="Not checking reasonableness"><p>A classroom cannot reasonably be 8 cm long and a pencil cannot reasonably weigh 50 kg.</p></Mistake>
</section>
<section className="wn-section"><h3>Mastery Check</h3><ul><li>Can you explain estimation in your own words?</li><li>Can you distinguish an estimate from an exact measurement?</li><li>Can you estimate length, distance, capacity, mass and time?</li><li>Can you choose an appropriate unit?</li><li>Can you use a known quantity as a reference?</li><li>Can you compare an estimate with an actual measurement?</li><li>Can you explain why an estimate is sensible or unreasonable?</li></ul></section>
<div className="teacher-actions"><button type="button" className="primary" onClick={onExercise}>Go to Exercise →</button></div>
</article>
}