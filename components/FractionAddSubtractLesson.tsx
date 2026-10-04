'use client';

const objectives=[
'add and subtract fractions with the same denominator',
'add and subtract fractions with different denominators using the LCM method',
'simplify answers to their lowest terms',
'convert mixed numbers to improper fractions',
'add and subtract mixed numbers',
'convert improper answers back to mixed numbers',
'solve simple word problems involving addition and subtraction of fractions',
'identify and correct common errors in fraction calculations'
];

function Fraction({n,d}:{n:string|number;d:string|number}){return <span className="stacked-fraction" aria-label={`${n} over ${d}`}><span>{n}</span><span>{d}</span></span>}
function Work({label,children,result=false}:{label:string;children:React.ReactNode;result?:boolean}){return <div className={'fraction-working '+(result?'fraction-result':'')}><span className="math-label">{label}</span><div className="math-stack">{children}</div></div>}
function Line({children}:{children:React.ReactNode}){return <div className="math-line">{children}</div>}
function Mistake({n,title,children}:{n:number;title:string;children:React.ReactNode}){return <div className="binary-mistake"><span className="binary-mistake-label">Common mistake {n}</span><h4>{title}</h4>{children}</div>}

export default function FractionAddSubtractLesson({onExercise}:{onExercise:()=>void}){
return <article className="wn-lesson fractions-premium-lesson">
<header className="wn-hero"><span>JSS1 MATHEMATICS</span><h1>Addition and Subtraction of Fractions</h1><p>A simple classroom method: LCM → divide → multiply → add or subtract.</p></header>

<section className="wn-objectives"><h2>What you will learn</h2><ul>{objectives.map(x=><li key={x}>{x}.</li>)}</ul></section>

<section className="wn-section"><h3>1. Fractions With the Same Denominator</h3><p>When the denominators are already the same, <b>keep the denominator and add or subtract the numerators.</b></p>
<Work label="Example — Add"><Line><Fraction n="3" d="7"/> + <Fraction n="2" d="7"/></Line><Line>3 + 2 = 5</Line><Line><Fraction n="3" d="7"/> + <Fraction n="2" d="7"/> = <Fraction n="5" d="7"/></Line></Work>
<Work label="Example — Subtract"><Line><Fraction n="6" d="9"/> − <Fraction n="2" d="9"/> = <Fraction n="4" d="9"/></Line></Work>
<p>The denominator does not change because the size of the fractional parts has not changed.</p></section>

<section className="wn-section"><h3>2. Fractions With Different Denominators</h3><div className="lesson-rule"><b>Use this method every time:</b><span>LCM → Divide → Multiply → Add/Subtract</span></div>
<Work label="Example — 1/2 + 1/3">
<Line>LCM of 2 and 3 = 6</Line>
<Line>6 ÷ 2 = 3</Line><Line>3 × 1 = 3</Line>
<Line>6 ÷ 3 = 2</Line><Line>2 × 1 = 2</Line>
<Line><Fraction n="3" d="6"/> + <Fraction n="2" d="6"/> = <Fraction n="5" d="6"/></Line>
</Work>
<p><b>Meaning:</b> find the LCM, divide it by each denominator, then multiply that answer by the numerator belonging to that denominator.</p></section>

<section className="wn-section"><h3>3. Another Addition Example</h3>
<Work label="Add 3/4 + 2/5">
<Line>LCM(4, 5) = 20</Line>
<Line>20 ÷ 4 = 5</Line><Line>5 × 3 = 15</Line>
<Line>20 ÷ 5 = 4</Line><Line>4 × 2 = 8</Line>
<Line><Fraction n="15" d="20"/> + <Fraction n="8" d="20"/> = <Fraction n="23" d="20"/></Line>
<Line>23 ÷ 20 = 1 remainder 3</Line>
<Line><Fraction n="23" d="20"/> = 1<Fraction n="3" d="20"/></Line>
</Work></section>

<section className="wn-section"><h3>4. Subtraction Uses the Same Method</h3>
<Work label="Subtract 5/6 − 1/4">
<Line>LCM(6, 4) = 12</Line>
<Line>12 ÷ 6 = 2</Line><Line>2 × 5 = 10</Line>
<Line>12 ÷ 4 = 3</Line><Line>3 × 1 = 3</Line>
<Line><Fraction n="10" d="12"/> − <Fraction n="3" d="12"/> = <Fraction n="7" d="12"/></Line>
</Work>
<div className="lesson-rule"><b>For subtraction:</b><span>LCM → Divide → Multiply → Subtract</span></div></section>

<section className="wn-section"><h3>5. Always Simplify When Possible</h3>
<Work label="Example — 1/6 + 3/6">
<Line><Fraction n="1" d="6"/> + <Fraction n="3" d="6"/> = <Fraction n="4" d="6"/></Line>
<Line>HCF(4, 6) = 2</Line>
<Line>4 ÷ 2 = 2</Line><Line>6 ÷ 2 = 3</Line>
<Line><Fraction n="4" d="6"/> = <Fraction n="2" d="3"/></Line>
</Work></section>

<section className="wn-section"><h3>6. Mixed Numbers</h3><p>A mixed number has a whole number and a fraction. Before using it in the calculation, convert it to an improper fraction.</p>
<div className="lesson-rule"><b>Mixed-number rule:</b><span>Whole number × denominator + numerator</span><span>Keep the same denominator.</span></div>
<Work label="Convert 2 1/3">
<Line>2 × 3 = 6</Line><Line>6 + 1 = 7</Line>
<Line>2<Fraction n="1" d="3"/> = <Fraction n="7" d="3"/></Line>
</Work>
<Work label="Convert 3 2/5">
<Line>3 × 5 = 15</Line><Line>15 + 2 = 17</Line>
<Line>3<Fraction n="2" d="5"/> = <Fraction n="17" d="5"/></Line>
</Work></section>

<section className="wn-section"><h3>7. Adding Mixed Numbers</h3>
<Work label="Add 2 1/3 + 1 1/4">
<Line>2 × 3 + 1 = 7 → <Fraction n="7" d="3"/></Line>
<Line>1 × 4 + 1 = 5 → <Fraction n="5" d="4"/></Line>
<Line>LCM(3, 4) = 12</Line>
<Line>12 ÷ 3 = 4; 4 × 7 = 28</Line>
<Line>12 ÷ 4 = 3; 3 × 5 = 15</Line>
<Line><Fraction n="28" d="12"/> + <Fraction n="15" d="12"/> = <Fraction n="43" d="12"/></Line>
<Line>43 ÷ 12 = 3 remainder 7</Line>
<Line><Fraction n="43" d="12"/> = 3<Fraction n="7" d="12"/></Line>
</Work></section>

<section className="wn-section"><h3>8. Subtracting Mixed Numbers</h3>
<Work label="Subtract 3 1/2 − 1 1/3">
<Line>3 × 2 + 1 = 7 → <Fraction n="7" d="2"/></Line>
<Line>1 × 3 + 1 = 4 → <Fraction n="4" d="3"/></Line>
<Line>LCM(2, 3) = 6</Line>
<Line>6 ÷ 2 = 3; 3 × 7 = 21</Line>
<Line>6 ÷ 3 = 2; 2 × 4 = 8</Line>
<Line><Fraction n="21" d="6"/> − <Fraction n="8" d="6"/> = <Fraction n="13" d="6"/></Line>
<Line><Fraction n="13" d="6"/> = 2<Fraction n="1" d="6"/></Line>
</Work></section>

<section className="wn-section"><h3>9. Word Problem</h3><p>A learner drinks <Fraction n="1" d="3"/> litre of water in the morning and <Fraction n="1" d="4"/> litre in the afternoon. How much water was consumed altogether?</p>
<Work label="Solution">
<Line>LCM(3, 4) = 12</Line>
<Line>12 ÷ 3 = 4; 4 × 1 = 4</Line>
<Line>12 ÷ 4 = 3; 3 × 1 = 3</Line>
<Line><Fraction n="4" d="12"/> + <Fraction n="3" d="12"/> = <Fraction n="7" d="12"/></Line>
<Line>Answer: <Fraction n="7" d="12"/> litre</Line>
</Work></section>

<section className="wn-section"><h3>10. The Complete Method</h3>
<div className="lesson-rule"><b>Unlike fractions</b><span>Find LCM → divide by each denominator → multiply by its numerator → add or subtract.</span></div>
<div className="lesson-rule"><b>Mixed numbers</b><span>Whole × denominator → add numerator → keep the denominator.</span></div>
<div className="lesson-rule"><b>Finish</b><span>Simplify → convert an improper fraction to a mixed number when required.</span></div></section>

<section className="wn-section"><h3>Common Misconceptions</h3>
<Mistake n={1} title="Adding the denominators"><p>For <Fraction n="2" d="5"/> + <Fraction n="1" d="5"/>, keep denominator 5. The answer is <Fraction n="3" d="5"/>, not 3/10.</p></Mistake>
<Mistake n={2} title="Skipping the LCM"><p>For unlike denominators, first obtain a common denominator. Do not add 1/2 + 1/3 directly.</p></Mistake>
<Mistake n={3} title="Multiplying the wrong numerator"><p>For 3/4 with LCM 20: 20 ÷ 4 = 5, then 5 × <b>3</b> = 15. The multiplier belongs to the numerator above that denominator.</p></Mistake>
<Mistake n={4} title="Converting a mixed number incorrectly"><p>For 2 3/5: 2 × 5 = 10, then 10 + 3 = 13. Therefore 2 3/5 = 13/5.</p></Mistake>
<Mistake n={5} title="Forgetting to simplify"><p>If the numerator and denominator still share a common factor, continue simplifying until the fraction is in lowest terms.</p></Mistake>
</section>

<section className="wn-section"><h3>Mastery Check</h3><ul>
<li>Can you add and subtract fractions with the same denominator?</li>
<li>Can you use LCM → divide → multiply for unlike denominators?</li>
<li>Can you convert a mixed number using whole × denominator + numerator?</li>
<li>Can you add and subtract mixed numbers?</li>
<li>Can you simplify your final answer?</li>
<li>Can you convert an improper answer back to a mixed number?</li>
<li>Can you solve a simple fraction word problem and explain each step?</li>
</ul></section>

<div className="teacher-actions"><button type="button" className="primary" onClick={onExercise}>Go to Exercise →</button></div>
</article>
}