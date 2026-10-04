'use client';
const O=['explain approximation and distinguish it from estimation','explain what it means to round to the nearest value','identify the rounding digit and deciding digit','round whole numbers to the nearest 10, 100 and 1,000','round decimals to stated decimal places','approximate to significant figures where required','handle carrying correctly during rounding','approximate addition, subtraction, multiplication and division','use approximation to check exact answers','apply approximation to money, measurement and everyday situations','solve quantitative-reasoning problems','use ≈ correctly'];
function W({q,children}:{q:string;children:React.ReactNode}){return <div className="fraction-working"><div className="example-question"><span>WORKED EXAMPLE</span><strong>{q}</strong></div><div className="math-stack">{children}</div></div>}
function L({children}:{children:React.ReactNode}){return <div className="math-line">{children}</div>}
function Column({rows,result}:{rows:{value:string;op?:string}[];result:string}){return <div className="column-working">{rows.map((r,i)=><div className="column-row" key={i}><span className="column-op">{r.op||''}</span><span>{r.value}</span></div>)}<div className="column-rule"/><div className="column-result">{result}</div></div>}
function M({n,t,children}:{n:number;t:string;children:React.ReactNode}){return <div className="binary-mistake"><span className="binary-mistake-label">Common mistake {n}</span><h4>{t}</h4>{children}</div>}
export default function ApproximationLesson({onExercise}:{onExercise:()=>void}){return <article className="wn-lesson fractions-premium-lesson">
<header className="wn-hero"><span>JSS1 MATHEMATICS</span><h1>Approximation</h1><p>Replace a known number with a nearby simpler value at a stated level of accuracy.</p></header>
<section className="wn-objectives"><h2>Learning Objectives</h2><ul>{O.map(x=><li key={x}>{x}.</li>)}</ul></section>
<section className="wn-section"><h3>1. Approximation and Estimation</h3><p>Approximation starts with a known value. Estimation may be made before an exact value is known. If a tree is judged to be about 6 m before measuring, that is estimation. If its measured height is 6.37 m and we report 6.4 m, that is approximation.</p><div className="lesson-rule"><span>6.37 m ≈ 6.4 m</span><span>≈ means approximately equal to.</span></div></section>
<section className="wn-section"><h3>2. Place Value Comes First</h3><p>In 4,582, the digits are 4 thousands, 5 hundreds, 8 tens and 2 units. In 7.483, 4 is tenths, 8 hundredths and 3 thousandths. Identify the requested place before rounding.</p></section>
<section className="wn-section"><h3>3. What Does Nearest Mean?</h3><p>43 is 3 away from 40 and 7 away from 50, so 43 ≈ 40. But 48 is only 2 away from 50, so 48 ≈ 50. A number ending at the midpoint, such as 45 between 40 and 50, rounds upward under the usual school convention.</p></section>
<section className="wn-section"><h3>4. The Rounding Rule</h3><div className="lesson-rule"><span><b>1.</b> Identify the requested place.</span><span><b>2.</b> Look at the digit immediately to its right.</span><span><b>3.</b> 0–4: keep the rounding digit.</span><span><b>4.</b> 5–9: increase it by 1.</span><span><b>5.</b> For whole numbers, replace places to the right with zero; for decimal places, remove unwanted digits after deciding.</span></div></section>
<section className="wn-section"><h3>5. Nearest 10</h3>
<W q="Round 73 to the nearest 10."><L>Tens digit = 7</L><L>Deciding units digit = 3</L><L>3 &lt; 5 → keep 7</L><L><b>73 ≈ 70</b></L></W>
<W q="Round 78 to the nearest 10."><L>Tens digit = 7</L><L>Deciding digit = 8</L><L>8 ≥ 5 → 7 + 1 = 8</L><L><b>78 ≈ 80</b></L></W></section>
<section className="wn-section"><h3>6. Nearest 100</h3>
<W q="Round 342 to the nearest 100."><L>Hundreds digit = 3</L><L>Deciding tens digit = 4</L><L>4 &lt; 5 → keep 3</L><L><b>342 ≈ 300</b></L></W>
<W q="Round 368 to the nearest 100."><L>Hundreds digit = 3</L><L>Deciding digit = 6</L><L>6 ≥ 5 → 3 + 1 = 4</L><L><b>368 ≈ 400</b></L></W></section>
<section className="wn-section"><h3>7. Nearest 1,000 and Carrying</h3>
<W q="Round 4,382 to the nearest 1,000."><L>Thousands digit = 4</L><L>Deciding hundreds digit = 3</L><L>3 &lt; 5 → keep 4</L><L><b>4,382 ≈ 4,000</b></L></W>
<W q="Round 9,786 to the nearest 1,000."><L>Thousands digit = 9</L><L>Deciding digit = 7</L><L>7 ≥ 5 → 9 + 1 = 10</L><L><b>9,786 ≈ 10,000</b></L></W></section>
<section className="wn-section"><h3>8. One Number, Different Accuracy</h3>
<W q="Round 37,486 to the nearest 10, 100 and 1,000."><L>Nearest 10: units 6 → <b>37,490</b></L><L>Nearest 100: tens 8 → <b>37,500</b></L><L>Nearest 1,000: hundreds 4 → <b>37,000</b></L></W></section>
<section className="wn-section"><h3>9. Decimal Places</h3><p>One decimal place keeps the tenths digit and uses the hundredths digit to decide. Two decimal places keep through hundredths and use thousandths to decide.</p>
<W q="Round 6.47 to 1 decimal place."><L>Tenths = 4; deciding hundredths = 7</L><L>7 ≥ 5 → 4 + 1 = 5</L><L><b>6.47 ≈ 6.5</b></L></W>
<W q="Round 5.376 to 2 decimal places."><L>Hundredths = 7; deciding thousandths = 6</L><L>6 ≥ 5 → 7 + 1 = 8</L><L><b>5.376 ≈ 5.38</b></L></W>
<W q="Round 4.296 to 2 decimal places."><L>Hundredths = 9; deciding digit = 6</L><L>6 ≥ 5 → 9 + 1 = 10; write 0 and carry 1 to tenths</L><L><b>4.296 ≈ 4.30</b></L><L>Keep the final zero because two decimal places were requested.</L></W></section>
<section className="wn-section"><h3>10. Significant Figures — More Guided Examples</h3><p>Significant figures begin at the <b>first non-zero digit</b>. Zeros before the first non-zero digit are placeholders and are not counted. Zeros between significant digits count. A trailing zero after a decimal may show required accuracy.</p>
<W q="Round 4,782 to 1 significant figure."><L>First significant digit = 4 (thousands).</L><L>Next digit = 7, so round up.</L><L><b>4,782 ≈ 5,000</b></L></W>
<W q="Round 4,782 to 2 significant figures."><L>Keep 4 and 7.</L><L>Next digit = 8, so 47 rounds to 48.</L><L><b>4,782 ≈ 4,800</b></L></W>
<W q="Round 63,451 to 3 significant figures."><L>First three significant digits are 6, 3, 4.</L><L>Next digit = 5, so 4 rounds up to 5.</L><L><b>63,451 ≈ 63,500</b></L></W>
<W q="Round 0.006482 to 2 significant figures."><L>Ignore the zeros before 6; the first significant digit is 6.</L><L>Keep 6 and 4. The next digit is 8.</L><L>4 rounds up to 5.</L><L><b>0.006482 ≈ 0.0065</b></L></W>
<W q="Round 0.07396 to 3 significant figures."><L>First significant digit is 7, not the zero after the decimal point.</L><L>Keep 7, 3 and 9. Next digit = 6.</L><L>9 rounds up, causing a carry: 739 becomes 740.</L><L><b>0.07396 ≈ 0.0740</b></L><L>The final zero is significant here because 3 significant figures were requested.</L></W>
<W q="Round 9.995 to 3 significant figures."><L>Keep 9, 9, 9. Next digit = 5.</L><L>Rounding causes carrying through the retained 9s.</L><L><b>9.995 ≈ 10.0</b></L><L>10.0 shows three significant figures.</L></W>
<div className="lesson-rule"><span><b>Decimal places:</b> count places after the decimal point.</span><span><b>Significant figures:</b> begin counting at the first non-zero digit.</span><span>Leading zeros do not count.</span><span>Zeros between significant digits count.</span><span>A final decimal zero can be significant when it records the requested accuracy.</span></div></section>
<section className="wn-section"><h3>11. Approximation of Addition and Subtraction</h3>
<W q="Find an approximate value of 198 + 304."><L>First approximate each number:</L><L>198 ≈ 200</L><L>304 ≈ 300</L><L>Now arrange the approximate numbers by place value:</L><Column rows={[{value:"200"},{op:"+",value:"300"}]} result="500"/><L>Therefore, <b>198 + 304 ≈ 500</b>.</L><L>Exact answer = 502, so the approximation is close.</L></W>
<W q="Find an approximate value of 792 − 308."><L>First approximate each number:</L><L>792 ≈ 800</L><L>308 ≈ 300</L><L>Now arrange the approximate numbers by place value:</L><Column rows={[{value:"800"},{op:"−",value:"300"}]} result="500"/><L>Therefore, <b>792 − 308 ≈ 500</b>.</L><L>Exact answer = 484, which is reasonably close.</L></W></section>
<section className="wn-section"><h3>12. Approximation of Multiplication and Division</h3>
<W q="Find an approximate value of 49 × 21."><L>49 ≈ 50</L><L>21 ≈ 20</L><L>50 × 20 = <b>1,000</b></L><L>Exact answer = 1,029.</L></W>
<W q="Find an approximate value of 398 ÷ 21."><L>398 ≈ 400</L><L>21 ≈ 20</L><L>400 ÷ 20 = <b>20</b></L></W></section>
<section className="wn-section"><h3>13. Approximation as an Error Check</h3>
<W q="A learner writes 198 + 304 = 5,020. Is that answer reasonable?"><L>198 ≈ 200</L><L>304 ≈ 300</L><Column rows={[{value:"200"},{op:"+",value:"300"}]} result="500"/><L>5,020 is nowhere near 500.</L><L><b>The calculation must be checked.</b></L></W></section>
<section className="wn-section"><h3>14. Money and Measurement</h3>
<W q="Approximate ₦487 to the nearest ₦100."><L>Hundreds = 4; deciding tens = 8</L><L>8 ≥ 5 → 4 + 1 = 5</L><L><b>₦487 ≈ ₦500</b></L></W>
<W q="A rope measures 12.68 m. Approximate its length to 1 decimal place."><L>Tenths = 6; deciding hundredths = 8</L><L>8 ≥ 5 → 6 + 1 = 7</L><L><b>12.68 m ≈ 12.7 m</b></L></W></section>
<section className="wn-section"><h3>15. Quantitative Reasoning</h3>
<W q="A school bought 198 exercise books in one month and 307 the next. Approximately how many were bought altogether?"><L>198 ≈ 200</L><L>307 ≈ 300</L><Column rows={[{value:"200"},{op:"+",value:"300"}]} result="500"/><L><b>Approximately 500 books.</b></L></W>
<W q="A trader packs about 48 oranges in each box. About how many oranges are in 21 boxes?"><L>48 ≈ 50</L><L>21 ≈ 20</L><L>50 × 20 = <b>1,000 oranges</b></L></W></section>
<section className="wn-section"><h3>Common Misconceptions</h3>
<M n={1} t="Looking at the wrong digit"><p>For 4,372 to nearest hundred, the deciding digit is the tens digit 7, so 4,372 ≈ 4,400.</p></M>
<M n={2} t="Losing place-value zeros"><p>3,746 to nearest hundred is 3,700, not 37.</p></M>
<M n={3} t="Changing the deciding digit"><p>The deciding digit tells what happens to the rounding digit; it is not the digit being retained.</p></M>
<M n={4} t="Forgetting carrying"><p>9,786 to nearest thousand becomes 10,000.</p></M>
<M n={5} t="Using = instead of ≈"><p>Write 487 ≈ 500, not 487 = 500.</p></M>
<M n={6} t="Removing a required decimal zero"><p>4.296 to 2 decimal places is 4.30. The zero shows the requested accuracy.</p></M>
<M n={7} t="Confusing decimal places and significant figures"><p>Decimal places count after the decimal point; significant figures begin at the first non-zero digit.</p></M>
<M n={8} t="Treating an approximation as exact"><p>49 × 21 ≈ 1,000, but the exact answer is 1,029.</p></M></section>
<section className="wn-section"><h3>AVORA Approximation Method</h3><div className="lesson-rule"><span>1. What accuracy is required?</span><span>2. Which digit is the rounding digit?</span><span>3. Which digit immediately right is the deciding digit?</span><span>4. Is it 0–4 or 5–9?</span><span>5. Keep or increase.</span><span>6. Replace or remove remaining digits correctly.</span><span>7. Check that the result is close to the original.</span></div></section>
<section className="wn-section"><h3>Mastery Check</h3><ul><li>Approximation versus estimation</li><li>Meaning of nearest and midpoint rounding</li><li>Nearest 10, 100 and 1,000</li><li>Decimal places and significant figures</li><li>Carrying during approximation</li><li>Approximation of all four operations</li><li>Money, measurement and quantitative reasoning</li><li>Using approximation to check calculations</li><li>Correct use of ≈</li></ul></section>
<div className="teacher-actions"><button type="button" className="primary" onClick={onExercise}>Go to Exercise →</button></div></article>}