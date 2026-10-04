'use client';

const objectives=[
'multiply a fraction by a whole number',
'multiply two or more fractions correctly',
'simplify fractions before or after multiplication',
'convert mixed numbers to improper fractions before multiplication or division',
'divide fractions using Keep → Change → Flip',
'divide mixed numbers correctly',
'simplify final answers to their lowest terms',
'convert improper answers to mixed numbers where necessary',
'solve simple word problems involving multiplication and division of fractions',
'identify and correct common mistakes'
];
function F({n,d}:{n:string|number;d:string|number}){return <span className="stacked-fraction" aria-label={`${n} over ${d}`}><span>{n}</span><span>{d}</span></span>}
function Work({label,children}:{label:string;children:React.ReactNode}){return <div className="fraction-working"><span className="math-label">{label}</span><div className="math-stack">{children}</div></div>}
function L({children}:{children:React.ReactNode}){return <div className="math-line">{children}</div>}
function Mistake({n,title,children}:{n:number;title:string;children:React.ReactNode}){return <div className="binary-mistake"><span className="binary-mistake-label">Common mistake {n}</span><h4>{title}</h4>{children}</div>}

export default function FractionMultiplyDivideLesson({onExercise}:{onExercise:()=>void}){
return <article className="wn-lesson fractions-premium-lesson">
<header className="wn-hero"><span>JSS1 MATHEMATICS</span><h1>Multiplication and Division of Fractions</h1><p>Multiply straight across. For division: Keep → Change → Flip.</p></header>
<section className="wn-objectives"><h2>What you will learn</h2><ul>{objectives.map(x=><li key={x}>{x}.</li>)}</ul></section>

<section className="wn-section"><h3>1. Multiplying a Fraction by a Whole Number</h3><p>Write the whole number over 1, then multiply numerator by numerator and denominator by denominator.</p>
<Work label="Example — 3 × 2/5"><L>3 = <F n="3" d="1"/></L><L><F n="3" d="1"/> × <F n="2" d="5"/></L><L>3 × 2 = 6</L><L>1 × 5 = 5</L><L><F n="6" d="5"/> = 1<F n="1" d="5"/></L></Work></section>

<section className="wn-section"><h3>2. The Main Multiplication Rule</h3><div className="lesson-rule"><b>No LCM is needed.</b><span>Numerator × Numerator</span><span>Denominator × Denominator</span><span>Then simplify.</span></div>
<Work label="Example — 2/3 × 4/5"><L>2 × 4 = 8</L><L>3 × 5 = 15</L><L><F n="2" d="3"/> × <F n="4" d="5"/> = <F n="8" d="15"/></L></Work></section>

<section className="wn-section"><h3>3. Simplify After Multiplication</h3>
<Work label="Example — 3/4 × 2/9"><L>3 × 2 = 6</L><L>4 × 9 = 36</L><L><F n="6" d="36"/></L><L>HCF(6, 36) = 6</L><L>6 ÷ 6 = 1</L><L>36 ÷ 6 = 6</L><L><F n="6" d="36"/> = <F n="1" d="6"/></L></Work></section>

<section className="wn-section"><h3>4. Cancel Before Multiplying</h3><p>Cancellation means dividing a numerator and a denominator by the same common factor. It keeps the numbers smaller.</p>
<Work label="Example — 3/4 × 2/9"><L>3 and 9 share factor 3: 3 ÷ 3 = 1; 9 ÷ 3 = 3</L><L>2 and 4 share factor 2: 2 ÷ 2 = 1; 4 ÷ 2 = 2</L><L><F n="1" d="2"/> × <F n="1" d="3"/> = <F n="1" d="6"/></L></Work></section>

<section className="wn-section"><h3>5. Mixed Numbers</h3><div className="lesson-rule"><b>Before multiplying or dividing:</b><span>Whole × denominator + numerator</span><span>Keep the same denominator.</span></div>
<Work label="Example — 2 1/3 × 3/5"><L>2 × 3 = 6</L><L>6 + 1 = 7</L><L>2<F n="1" d="3"/> = <F n="7" d="3"/></L><L><F n="7" d="3"/> × <F n="3" d="5"/></L><L>Cancel 3 with 3</L><L><F n="7" d="5"/> = 1<F n="2" d="5"/></L></Work></section>

<section className="wn-section"><h3>6. Multiplying Two Mixed Numbers</h3>
<Work label="Example — 1 1/2 × 2 2/3"><L>1 × 2 + 1 = 3 → <F n="3" d="2"/></L><L>2 × 3 + 2 = 8 → <F n="8" d="3"/></L><L><F n="3" d="2"/> × <F n="8" d="3"/></L><L>Cancel 3 with 3; divide 8 and 2 by 2</L><L>1 × 4 = 4</L></Work></section>

<section className="wn-section"><h3>7. What Division Means</h3><p><F n="1" d="2"/> ÷ <F n="1" d="4"/> asks: <b>how many quarters fit into one half?</b> Two quarters make one half, so the answer is 2.</p></section>

<section className="wn-section"><h3>8. The Main Division Rule</h3><div className="lesson-rule"><b>KEEP → CHANGE → FLIP</b><span>KEEP the first fraction.</span><span>CHANGE division to multiplication.</span><span>FLIP only the second fraction.</span></div>
<Work label="Example — 2/3 ÷ 4/5"><L>KEEP: <F n="2" d="3"/></L><L>CHANGE: ÷ becomes ×</L><L>FLIP: <F n="4" d="5"/> becomes <F n="5" d="4"/></L><L><F n="2" d="3"/> × <F n="5" d="4"/></L><L>Cancel 2 and 4 → 1 and 2</L><L><F n="1" d="3"/> × <F n="5" d="2"/> = <F n="5" d="6"/></L></Work></section>

<section className="wn-section"><h3>9. Only Flip the Second Fraction</h3>
<Work label="Example — 3/4 ÷ 2/5"><L><F n="3" d="4"/> ÷ <F n="2" d="5"/></L><L><F n="3" d="4"/> × <F n="5" d="2"/></L><L><F n="15" d="8"/> = 1<F n="7" d="8"/></L></Work><p>The first fraction stays exactly as it is. Only the divisor — the fraction after ÷ — is flipped.</p></section>

<section className="wn-section"><h3>10. Fraction ÷ Whole Number</h3>
<Work label="Example — 3/5 ÷ 2"><L>2 = <F n="2" d="1"/></L><L><F n="3" d="5"/> ÷ <F n="2" d="1"/></L><L>Keep → Change → Flip</L><L><F n="3" d="5"/> × <F n="1" d="2"/> = <F n="3" d="10"/></L></Work></section>

<section className="wn-section"><h3>11. Whole Number ÷ Fraction</h3>
<Work label="Example — 3 ÷ 2/5"><L>3 = <F n="3" d="1"/></L><L><F n="3" d="1"/> ÷ <F n="2" d="5"/></L><L><F n="3" d="1"/> × <F n="5" d="2"/> = <F n="15" d="2"/></L><L><F n="15" d="2"/> = 7<F n="1" d="2"/></L></Work></section>

<section className="wn-section"><h3>12. Dividing Mixed Numbers</h3>
<Work label="Example — 2 1/4 ÷ 1 1/2"><L>2 × 4 + 1 = 9 → <F n="9" d="4"/></L><L>1 × 2 + 1 = 3 → <F n="3" d="2"/></L><L><F n="9" d="4"/> ÷ <F n="3" d="2"/></L><L>Keep → Change → Flip</L><L><F n="9" d="4"/> × <F n="2" d="3"/></L><L>Cancel: 9 ÷ 3 = 3; 4 ÷ 2 = 2</L><L><F n="3" d="2"/> = 1<F n="1" d="2"/></L></Work></section>

<section className="wn-section"><h3>13. Word Problem — Multiplication</h3><p>A farmer uses <F n="3" d="4"/> of a plot for crops. Of that part, <F n="2" d="3"/> is maize. What fraction of the entire plot is maize?</p>
<Work label="Solution"><L><F n="3" d="4"/> × <F n="2" d="3"/></L><L>Cancel 3 with 3</L><L><F n="1" d="4"/> × <F n="2" d="1"/> = <F n="2" d="4"/> = <F n="1" d="2"/></L><L>Answer: half of the plot.</L></Work></section>

<section className="wn-section"><h3>14. Word Problem — Division</h3><p>A container holds 3<F n="1" d="2"/> litres of juice. Each cup holds <F n="1" d="4"/> litre. How many cups can be filled?</p>
<Work label="Solution"><L>3 × 2 + 1 = 7 → <F n="7" d="2"/></L><L><F n="7" d="2"/> ÷ <F n="1" d="4"/></L><L><F n="7" d="2"/> × <F n="4" d="1"/></L><L>4 ÷ 2 = 2</L><L>7 × 2 = 14 cups</L></Work></section>

<section className="wn-section"><h3>15. Complete Rules</h3><div className="lesson-rule"><b>Multiplication</b><span>Numerator × numerator → denominator × denominator → simplify.</span></div><div className="lesson-rule"><b>Mixed numbers</b><span>Whole × denominator + numerator → keep denominator.</span></div><div className="lesson-rule"><b>Division</b><span>Keep → Change → Flip → multiply → simplify.</span></div></section>

<section className="wn-section"><h3>Common Misconceptions</h3>
<Mistake n={1} title="Finding LCM before multiplication"><p>Multiplication does not need a common denominator. Multiply straight across.</p></Mistake>
<Mistake n={2} title="Cancelling without a common factor"><p>Cancellation means dividing a numerator and denominator by the same common factor. Do not simply cross numbers out.</p></Mistake>
<Mistake n={3} title="Flipping the first fraction"><p>In division, keep the first fraction. Flip only the second fraction — the divisor.</p></Mistake>
<Mistake n={4} title="Forgetting to change ÷ to ×"><p>Keep → <b>Change</b> → Flip. Division must become multiplication.</p></Mistake>
<Mistake n={5} title="Using mixed numbers directly"><p>Convert each mixed number first using whole × denominator + numerator.</p></Mistake>
<Mistake n={6} title="Forgetting to simplify"><p>Always check whether numerator and denominator still share a common factor.</p></Mistake>
</section>

<section className="wn-section"><h3>Mastery Check</h3><ul><li>Can you multiply numerator by numerator and denominator by denominator?</li><li>Can you cancel only genuine common factors?</li><li>Can you convert mixed numbers using whole × denominator + numerator?</li><li>Can you use Keep → Change → Flip correctly?</li><li>Can you divide a fraction by a whole number and a whole number by a fraction?</li><li>Can you divide mixed numbers?</li><li>Can you simplify and convert improper answers?</li><li>Can you solve multiplication and division word problems?</li></ul></section>
<div className="teacher-actions"><button type="button" className="primary" onClick={onExercise}>Go to Exercise →</button></div>
</article>
}