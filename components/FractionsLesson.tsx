'use client';

const objectives=[
'explain what a fraction represents','identify the numerator and denominator of a fraction','distinguish between proper, improper and mixed fractions','convert improper fractions to mixed numbers and mixed numbers to improper fractions','identify equivalent fractions','generate equivalent fractions correctly','simplify fractions to their lowest terms','use the highest common factor to simplify fractions','compare simple fractions correctly','recognise common mistakes involving fractions'
];
const sections=[
['1. What Is a Fraction?',<>A <b>fraction represents part of a whole or part of a collection</b>. If a cake is divided into 8 equal pieces and you take 3 pieces, you have taken <b>3/8</b>. The numerator tells how many parts were selected; the denominator tells how many equal parts make the whole. The parts must be equal, and the denominator cannot be zero.</>],
['2. Numerator and Denominator',<>In <b>5/9</b>, 5 is the numerator and 9 is the denominator. The denominator tells the number of equal parts into which the whole is divided; the numerator tells how many of those parts we are considering.</>],
['3. Understanding the Size of Fractional Parts',<>For the same whole, <b>1/2 &gt; 1/8</b>. Although 8 is greater than 2, dividing a whole into more equal pieces makes each individual piece smaller.</>],
['4. Proper Fractions',<>A proper fraction has a numerator smaller than its denominator: <b>1/4, 3/5, 7/10, 11/12</b>. A proper fraction represents less than one whole.</>],
['5. Improper Fractions',<>An improper fraction has a numerator greater than or equal to its denominator: <b>7/4, 9/5, 12/7, 8/8</b>. It represents one whole or more. For example, <b>7/4 = 1 3/4</b>.</>],
['6. Mixed Numbers',<>A mixed number contains a whole number and a proper fraction, such as <b>1 1/2, 2 3/5, 4 1/7</b>. It is another way of representing an improper fraction.</>],
['7. Converting an Improper Fraction to a Mixed Number',<><p>Divide the numerator by the denominator. The quotient becomes the whole number, the remainder becomes the new numerator, and the denominator stays the same.</p><Work label="Worked example — Convert 11/4" lines={['11 ÷ 4 = 2 remainder 3','11/4 = 2 3/4','Check: 2 × 4 + 3 = 11']}/></>],
['8. Converting a Mixed Number to an Improper Fraction',<><p>Multiply the whole number by the denominator, add the numerator, then place the result over the original denominator.</p><Work label="Worked example — Convert 3 2/5" lines={['3 × 5 = 15','15 + 2 = 17','3 2/5 = 17/5','Check: 17 ÷ 5 = 3 remainder 2']}/></>],
['9. Equivalent Fractions',<>Equivalent fractions look different but represent the same value. <b>1/2 = 2/4 = 3/6 = 4/8</b>. The names change, but the quantity does not.</>],
['10. How to Generate Equivalent Fractions',<><p>Multiply the numerator and denominator by the <b>same non-zero number</b>.</p><Work label="Starting with" lines={['2/3']}/><Work label="Multiply numerator and denominator by 2" lines={['(2 × 2) / (3 × 2)','= 4/6']}/><Work label="Multiply numerator and denominator by 3" lines={['(2 × 3) / (3 × 3)','= 6/9']}/><Work label="Therefore" lines={['2/3 = 4/6 = 6/9']} result/><h4>Why This Works</h4><p>Multiplying by 2/2 does not change the value because 2/2 = 1. Therefore 2/3 × 2/2 = 4/6.</p></>],
['11. Finding a Missing Number in Equivalent Fractions',<><p>For <b>3/5 = ?/20</b>, the denominator was multiplied by 4, so multiply the numerator by 4 too.</p><Work label="Working" lines={['5 × 4 = 20','3 × 4 = 12','3/5 = 12/20']}/><p>For <b>4/7 = 20/?</b>: 4 × 5 = 20, so 7 × 5 = 35. Therefore <b>4/7 = 20/35</b>.</p></>],
['12. Simplifying Fractions',<><p>Simplifying means writing an equivalent fraction using smaller numbers.</p><Work label="Simplify 8/12" lines={['8 ÷ 4 = 2','12 ÷ 4 = 3','8/12 = 2/3']} result/></>],
['13. Lowest Terms',<>A fraction is in its lowest terms when numerator and denominator have no common factor greater than 1. For <b>6/9</b>, divide both by 3: <b>6/9 = 2/3</b>.</>],
['14. Using the HCF to Simplify Fractions',<><p>The most efficient complete simplification is to divide numerator and denominator by their HCF.</p><Work label="Worked example — Simplify 18/24" lines={['HCF(18, 24) = 6','18 ÷ 6 = 3','24 ÷ 6 = 4','18/24 = 3/4']} result/></>],
['15. Simplifying in More Than One Step',<><Work label="Gradual method" lines={['24/36 = 12/18','12/18 = 6/9','6/9 = 2/3']}/><p>Using the HCF is faster: HCF(24,36)=12, so <b>24/36 = 2/3</b>.</p></>],
['16. Cancelling Common Factors',<><Work label="Simplify 15/25" lines={['15/25 = (3 × 5) / (5 × 5)','Cancel the common factor 5','15/25 = 3/5']} result/></>],
['17. Comparing Fractions with the Same Denominator',<>When denominators are the same, compare numerators. <b>5/8 &gt; 3/8</b>.</>],
['18. Comparing Fractions with the Same Numerator',<>When numerators are the same, the fraction with the smaller denominator is larger. Therefore <b>3/4 &gt; 3/7</b>.</>],
['19. Comparing Fractions Using Equivalent Fractions',<><Work label="Compare 2/3 and 3/5" lines={['LCM(3,5) = 15','2/3 = 10/15','3/5 = 9/15','10/15 > 9/15','Therefore 2/3 > 3/5']} result/></>],
['20. Fractions Equal to One Whole',<>When numerator and denominator are equal, the fraction equals one whole: <b>2/2 = 1, 5/5 = 1, 12/12 = 1</b>.</>],
['21. Fractions Greater Than One',<><Work label="Convert 9/4" lines={['4/4 = 1 whole','8/4 = 2 wholes','1/4 remains','9/4 = 2 1/4']} result/></>],
['22. Checking Your Simplification',<>After simplifying, ask whether numerator and denominator still have a common factor greater than 1. <b>12/18 = 6/9</b> is correct but incomplete; continue to <b>2/3</b>.</>]
] as const;
const worked=[
['Worked Example 5 — Identify the Type of Fraction',['5/8','5 < 8','Therefore 5/8 is a proper fraction.']],
['Worked Example 6 — Identify an Improper Fraction',['13/7','13 > 7','13 ÷ 7 = 1 remainder 6','13/7 = 1 6/7']],
['Worked Example 7 — Generate an Equivalent Fraction',['5/6 with denominator 24','6 × 4 = 24','5 × 4 = 20','5/6 = 20/24']],
['Worked Example 8 — Simplify 21/28',['HCF(21,28) = 7','21 ÷ 7 = 3','28 ÷ 7 = 4','21/28 = 3/4']],
['Worked Example 9 — Convert 4 3/7',['4 × 7 = 28','28 + 3 = 31','4 3/7 = 31/7']],
['Worked Example 10 — Compare 5/6 and 7/9',['LCM(6,9) = 18','5/6 = 15/18','7/9 = 14/18','15/18 > 14/18','Therefore 5/6 > 7/9']]
] as const;
const mistakes=[
['Adding the same number','Equivalent fractions are generated by multiplying or dividing numerator and denominator by the same non-zero number, not by adding. Correct: 2/3 × 2/2 = 4/6.'],
['Simplifying only the numerator','Changing 12/18 to 6/18 changes its value. Divide both parts by the same factor: 12/18 = 6/9 = 2/3.'],
['Thinking a larger denominator means a larger fraction','For the same whole, more equal parts means smaller pieces. Therefore 1/10 < 1/5.'],
['Changing the denominator when converting an improper fraction','For 11/4, 11 ÷ 4 = 2 remainder 3, so 11/4 = 2 3/4. The denominator remains 4.'],
['Stopping before lowest terms','18/24 = 9/12 is equivalent but not fully simplified. Continue: 9/12 = 3/4.']
] as const;
function Work({label,lines,result=false}:{label:string;lines:readonly string[];result?:boolean}){return <div className="fraction-working"><span className="math-label">{label}</span>{lines.map((x,i)=><span key={i} className={'math-line '+(result&&i===lines.length-1?'math-result':'')}>{x}</span>)}</div>}
export default function FractionsLesson({onExercise}:{onExercise:()=>void}){return <article className="wn-lesson fractions-premium-lesson"><header className="wn-hero"><span>JSS1 MATHEMATICS</span><h1>Fractions</h1><p>Types, simplification and equivalent fractions — taught step by step.</p></header><section className="wn-objectives"><h2>What you will learn</h2><ul>{objectives.map(x=><li key={x}>{x}.</li>)}</ul></section>{sections.map(([title,body])=><section className="wn-section" key={title}><h3>{title}</h3><div>{body}</div></section>)}<section className="wn-section"><h3>Worked Examples</h3>{worked.map(([title,lines])=><Work key={title} label={title} lines={lines}/>)}</section><section className="wn-section"><h3>Common Misconceptions</h3>{mistakes.map(([title,body],i)=><div className="binary-mistake" key={title}><span className="binary-mistake-label">Common mistake {i+1}</span><h4>{title}</h4><p>{body}</p></div>)}</section><section className="wn-section"><h3>Mastery Check</h3><ul>{['Explain a fraction as part of a whole or collection','Identify numerator and denominator','Distinguish proper, improper and mixed fractions','Convert between improper fractions and mixed numbers','Generate equivalent fractions','Find missing values in equivalent fractions','Simplify completely using common factors or HCF','Recognise lowest terms','Compare simple fractions','Explain why multiplying or dividing both parts by the same non-zero number preserves value','Identify and correct common fraction errors'].map(x=><li key={x}>{x}</li>)}</ul></section><div className="teacher-actions"><button type="button" className="primary" onClick={onExercise}>Go to Exercise →</button></div></article>}
