'use client';
const objectives=['recall binary place values using powers of 2','determine the base-ten value represented by a binary number','explain and apply the rules of binary addition','explain why 1 + 1 = 10₂ and 1 + 1 + 1 = 11₂','arrange binary numbers correctly for vertical addition','add binary numbers with and without carrying','handle repeated carrying correctly','check binary addition by showing complete base-ten conversions','identify and correct common binary-addition errors'];
function Line({children,strong=false}:{children:React.ReactNode;strong?:boolean}){return <div className={strong?'math-line math-result':'math-line'}>{children}</div>}
function Work({q,children}:{q:string;children:React.ReactNode}){return <div className="fraction-working"><div className="example-question"><span>WORKED EXAMPLE</span><strong>{q}</strong></div><div className="math-stack">{children}</div></div>}
function Sum({rows,answer}:{rows:string[];answer:string}){return <div className="column-operation" aria-label={rows.join(' plus ')+' equals '+answer}><div className="column-operands">{rows.map((r,i)=><div className="column-row" key={i}><span className="column-sign">{i===rows.length-1?'+':''}</span><span>{r}</span></div>)}</div><div className="column-answer"><span className="column-sign"></span><span>{answer}</span></div></div>}
function Convert({binary,powers,values,total}:{binary:string;powers:string;values:string;total:string}){return <div className="math-working"><Line>{binary}</Line><Line>= {powers}</Line><Line>= {values}</Line><Line strong>= {total}</Line></div>}
export default function BinaryAdditionLesson({onExercise}:{onExercise:()=>void}){return <article className="wn-lesson fractions-premium-lesson binary-addition-lesson">
<header className="wn-hero"><span>JSS1 MATHEMATICS</span><h1>Addition of Numbers in Base Two</h1><p>Understand binary place value, add vertically, carry correctly, and verify every answer through complete conversion working.</p></header>
<section className="wn-objectives"><h2>Learning Objectives</h2><ul>{objectives.map(x=><li key={x}>{x}.</li>)}</ul></section>
<section className="wn-section"><h3>1. Recall: Place Values in Base Two</h3><p>Binary place values are powers of 2. Starting from the right they are 2⁰, 2¹, 2², 2³, 2⁴, ... with values 1, 2, 4, 8, 16, ... .</p>
<Work q="What value does 1011₂ represent in base ten?"><Line>Digits: 1 &nbsp; 0 &nbsp; 1 &nbsp; 1</Line><Line>Places: 2³ &nbsp; 2² &nbsp; 2¹ &nbsp; 2⁰</Line><Line>1011₂ = (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰)</Line><Line>= (1 × 8) + (0 × 4) + (1 × 2) + (1 × 1)</Line><Line>= 8 + 0 + 2 + 1</Line><Line strong>= 11₁₀</Line></Work>
<Work q="Convert 1101₂ to base ten."><Line>1101₂ = (1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰)</Line><Line>= (1 × 8) + (1 × 4) + (0 × 2) + (1 × 1)</Line><Line>= 8 + 4 + 0 + 1</Line><Line strong>= 13₁₀</Line></Work></section>
<section className="wn-section"><h3>2. Binary Addition Rules</h3><div className="lesson-rule"><span>0 + 0 = 0</span><span>0 + 1 = 1</span><span>1 + 0 = 1</span><span>1 + 1 = 10₂ — write 0, carry 1.</span></div><p>Why? 1 + 1 = 2₁₀, and 2₁₀ = (1 × 2¹) + (0 × 2⁰) = 10₂.</p></section>
<section className="wn-section"><h3>3. Addition Without Carrying</h3>
<Work q="Add 101₂ + 10₂."><Sum rows={['101₂','010₂']} answer="111₂"/><Line>Right: 1 + 0 = 1</Line><Line>Middle: 0 + 1 = 1</Line><Line>Left: 1 + 0 = 1</Line><Line strong>101₂ + 010₂ = 111₂</Line></Work>
<h4>Check every conversion</h4>
<Convert binary="101₂" powers="(1 × 2²) + (0 × 2¹) + (1 × 2⁰)" values="4 + 0 + 1" total="5₁₀"/>
<Convert binary="010₂" powers="(0 × 2²) + (1 × 2¹) + (0 × 2⁰)" values="0 + 2 + 0" total="2₁₀"/>
<Sum rows={['5','2']} answer="7"/>
<Convert binary="111₂" powers="(1 × 2²) + (1 × 2¹) + (1 × 2⁰)" values="4 + 2 + 1" total="7₁₀"/></section>
<section className="wn-section"><h3>4. Addition With Carrying</h3>
<Work q="Add 101₂ + 11₂."><Sum rows={['101₂','011₂']} answer="1000₂"/><Line>Right: 1 + 1 = 10₂ → write 0, carry 1.</Line><Line>Middle: carried 1 + 0 + 1 = 10₂ → write 0, carry 1.</Line><Line>Left: carried 1 + 1 = 10₂ → write 0 and carry 1 into a new column.</Line><Line strong>101₂ + 011₂ = 1000₂</Line></Work>
<h4>Check every conversion</h4>
<Convert binary="101₂" powers="(1 × 2²) + (0 × 2¹) + (1 × 2⁰)" values="4 + 0 + 1" total="5₁₀"/>
<Convert binary="011₂" powers="(0 × 2²) + (1 × 2¹) + (1 × 2⁰)" values="0 + 2 + 1" total="3₁₀"/>
<Sum rows={['5','3']} answer="8"/>
<Convert binary="1000₂" powers="(1 × 2³) + (0 × 2²) + (0 × 2¹) + (0 × 2⁰)" values="8 + 0 + 0 + 0" total="8₁₀"/></section>
<section className="wn-section"><h3>5. When Three Ones Meet</h3><p>A carry can produce 1 + 1 + 1. Since this is 3₁₀:</p><div className="math-working"><Line>3₁₀ = (1 × 2¹) + (1 × 2⁰)</Line><Line>= 2 + 1</Line><Line strong>= 11₂</Line></div><div className="lesson-rule"><span>1 + 1 = 10₂ → write 0, carry 1.</span><span>1 + 1 + 1 = 11₂ → write 1, carry 1.</span></div></section>
<section className="wn-section"><h3>6. Repeated Carrying</h3>
<Work q="Add 111₂ + 101₂."><Sum rows={['111₂','101₂']} answer="1100₂"/><Line>Right: 1 + 1 = 10₂ → write 0, carry 1.</Line><Line>Middle: 1 + 1 + 0 = 10₂ → write 0, carry 1.</Line><Line>Left: 1 + 1 + 1 = 11₂ → write 1, carry 1.</Line><Line strong>111₂ + 101₂ = 1100₂</Line></Work>
<h4>Check every conversion</h4>
<Convert binary="111₂" powers="(1 × 2²) + (1 × 2¹) + (1 × 2⁰)" values="4 + 2 + 1" total="7₁₀"/>
<Convert binary="101₂" powers="(1 × 2²) + (0 × 2¹) + (1 × 2⁰)" values="4 + 0 + 1" total="5₁₀"/>
<Sum rows={['7','5']} answer="12"/>
<Convert binary="1100₂" powers="(1 × 2³) + (1 × 2²) + (0 × 2¹) + (0 × 2⁰)" values="8 + 4 + 0 + 0" total="12₁₀"/></section>
<section className="wn-section"><h3>7. Larger Binary Addition</h3>
<Work q="Add 1011₂ + 1101₂."><Sum rows={['1011₂','1101₂']} answer="11000₂"/><Line>First column: 1 + 1 = 10₂ → write 0, carry 1.</Line><Line>Second: 1 + 1 + 0 = 10₂ → write 0, carry 1.</Line><Line>Third: 1 + 0 + 1 = 10₂ → write 0, carry 1.</Line><Line>Fourth: 1 + 1 + 1 = 11₂ → write 1, carry 1.</Line><Line strong>1011₂ + 1101₂ = 11000₂</Line></Work>
<h4>Full check — no skipping</h4>
<Convert binary="1011₂" powers="(1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰)" values="8 + 0 + 2 + 1" total="11₁₀"/>
<Convert binary="1101₂" powers="(1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰)" values="8 + 4 + 0 + 1" total="13₁₀"/>
<Sum rows={['11','13']} answer="24"/>
<Convert binary="11000₂" powers="(1 × 2⁴) + (1 × 2³) + (0 × 2²) + (0 × 2¹) + (0 × 2⁰)" values="16 + 8 + 0 + 0 + 0" total="24₁₀"/></section>
<section className="wn-section"><h3>8. Numbers of Different Lengths</h3>
<Work q="Add 1101₂ + 11₂."><Line>Align from the right: 11₂ becomes 0011₂.</Line><Sum rows={['1101₂','0011₂']} answer="10000₂"/><Line>Right: 1 + 1 = 10₂ → write 0, carry 1.</Line><Line>Next: 1 + 0 + 1 = 10₂ → write 0, carry 1.</Line><Line>Next: 1 + 1 + 0 = 10₂ → write 0, carry 1.</Line><Line>Last: 1 + 1 = 10₂ → write 0, carry 1.</Line><Line strong>1101₂ + 0011₂ = 10000₂</Line></Work>
<h4>Check every conversion</h4>
<Convert binary="1101₂" powers="(1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰)" values="8 + 4 + 0 + 1" total="13₁₀"/>
<Convert binary="0011₂" powers="(0 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰)" values="0 + 0 + 2 + 1" total="3₁₀"/>
<Sum rows={['13','3']} answer="16"/>
<Convert binary="10000₂" powers="(1 × 2⁴) + (0 × 2³) + (0 × 2²) + (0 × 2¹) + (0 × 2⁰)" values="16 + 0 + 0 + 0 + 0" total="16₁₀"/></section>
<section className="wn-section"><h3>Common Misconceptions</h3><div className="lesson-rule"><span><b>Do not write 2 in a binary answer.</b> 1 + 1 = 10₂.</span><span><b>Do not lose the carry.</b> A carried 1 belongs in the next column.</span><span><b>Three ones are 11₂.</b> Write 1 and carry 1.</span><span><b>Align from the right.</b> Place values must match.</span><span><b>One line only.</b> Write every operand first, then draw the horizontal line after the final number, then write the answer.</span><span><b>Do not skip conversion working.</b> Show digit × power of 2, evaluate, add, then state the base-ten value.</span></div></section>
<section className="wn-section"><h3>AVORA Binary Addition Method</h3><div className="lesson-rule"><span>1. Align all binary numbers from the right.</span><span>2. Put + on the final number being added.</span><span>3. Draw one horizontal line after the final operand.</span><span>4. Start at the rightmost column.</span><span>5. Apply the binary rules and include every carry.</span><span>6. Continue right to left and retain the final carry.</span><span>7. When checking in base ten, show every powers-of-two conversion.</span></div></section>
<section className="wn-section"><h3>Mastery Check</h3><ul><li>Explain why 1 + 1 = 10₂ and 1 + 1 + 1 = 11₂.</li><li>Arrange binary addition vertically with one line after the final operand.</li><li>Add with no carry, one carry and repeated carrying.</li><li>Align numbers of different lengths correctly.</li><li>Show complete powers-of-two conversion working when checking answers.</li></ul></section>
<div className="teacher-actions"><button type="button" className="primary" onClick={onExercise}>Go to Exercise →</button></div></article>}