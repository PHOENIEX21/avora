export type DeepJss3MathLesson={
 topicId:string; classLevel:'JSS3'; subject:'Mathematics'; topic:string;
 source:{authority:'NERDC';url:string;page:number}; objectives:string[]; prerequisites:string[];
 teaching:string[]; workedExamples:string[]; misconceptions:string[]; guidedPractice:string[]; independentPractice:string[];
 mastery:{criterion:string;status:'DEEP_WHEN_PASSED'}; boardReady:true;
};

const sourceUrl='https://nerdc.gov.ng/content_manager/jss/jss1-3_maths.pdf';

/**
 * AVORA-authored JSS3 Mathematics teaching layer.
 * NERDC is used for curriculum scope and performance objectives. Explanations,
 * examples, practice and mastery tasks below are original AVORA teaching content.
 */
export const jss3MathematicsDeepLessons:DeepJss3MathLesson[]=[
{
 topicId:'nerdc-jss3-math-numbers-and-numeration-whole-numbers-1',classLevel:'JSS3',subject:'Mathematics',topic:'Whole Numbers',source:{authority:'NERDC',url:sourceUrl,page:28},
 objectives:['Revise basic operations in the binary number system','Convert binary numbers to other bases and convert numbers from other bases to binary','Solve quantitative-reasoning problems involving binary numbers','Use a computer or calculator appropriately for simple mathematical calculations','Translate verbal statements and word problems into numerical expressions','Simplify expressions involving brackets and fractions','Solve direct- and inverse-proportion problems and apply them to practical situations','Solve compound-interest problems and connect compound interest to everyday financial situations'],
 prerequisites:['JSS1/JSS2 binary notation and place value','fractions and order of operations','ratio, rate and percentage','simple interest and percentage increase'],
 teaching:['Binary is a base-two place-value system: positions represent powers of 2. To convert a binary numeral to base ten, multiply each digit by its place value and add. To convert a base-ten integer to binary, repeatedly divide by 2 and read the remainders upward.','The same place-value idea supports conversion between bases. A safe route is often source base → base ten → target base, while carefully checking that every digit is valid for its base.','A verbal statement must first be translated structurally. Words such as sum, difference, product, quotient, half, twice, more than and less than determine the operation and the order. Brackets preserve the intended grouping.','For expressions containing brackets and fractions, follow the agreed order of operations: brackets first, then powers where present, multiplication/division, and addition/subtraction. Fractions are numbers, so common-denominator and reciprocal rules still apply.','Direct proportion means two quantities change by the same scale factor and y=kx. In inverse proportion their product remains constant and y=k/x. Decide which model fits the situation before substituting numbers.','Compound interest adds each period’s interest to the balance, so later interest is earned on the new balance. For annual compounding, amount=P(1+r/100)^n and compound interest=amount−principal. The repeated-percentage-growth idea is more important than memorising a formula.','Computers and calculators support arithmetic, checking and exploration, but AVORA requires estimation and interpretation so a learner can detect impossible or mistyped results.'],
 workedExamples:['Convert 101101₂ to base ten: 32+8+4+1=45, so 101101₂=45₁₀. Convert 45₁₀ back by repeated division to confirm 101101₂.','Translate “the difference between 7 and the sum of half of 8 and 3”: 7−(8/2+3)=7−7=0. The bracket is essential.','If 6 notebooks cost ₦2,700 at a constant price, 10 cost 2700/6×10=₦4,500. This is direct proportion.','If 8 workers complete a fixed job in 15 days at equal rates, 12 workers take 8×15/12=10 days. This is inverse proportion.','₦50,000 invested at 8% compound interest annually for 2 years becomes 50,000(1.08)^2=₦58,320; compound interest=₦8,320.'],
 misconceptions:['reading a binary numeral as an ordinary decimal number','using an invalid digit such as 2 in base two','translating “5 less than x” as 5−x instead of x−5','treating inverse proportion as direct proportion','calculating compound interest each year only on the original principal','accepting a calculator display without checking units or reasonableness'],
 guidedPractice:['Convert 110011₂ to base ten and 26₁₀ to binary; translate four verbal statements into numerical expressions; solve one direct-proportion and one inverse-proportion problem; calculate the amount and interest on ₦20,000 at 10% compounded annually for 2 years.'],
 independentPractice:['Complete a mixed set covering binary conversion/operations, bracket-and-fraction expressions, six word-to-expression items, direct/inverse proportion in speed/productivity/consumption contexts, and four compound-interest problems including comparison with simple interest.'],
 mastery:{criterion:'At least 80% across binary conversion/reasoning, verbal translation, bracket/fraction expressions, direct and inverse proportion, and compound interest; learner must also explain why each proportional model applies.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-numbers-and-numeration-whole-numbers-2',classLevel:'JSS3',subject:'Mathematics',topic:'Rational and non-rational numbers',source:{authority:'NERDC',url:sourceUrl,page:29},
 objectives:['Identify rational numbers and non-rational (irrational) numbers','Determine experimentally an approximate value of pi using circular objects'],
 prerequisites:['fractions and decimals','square roots','measurement of circumference and diameter'],
 teaching:['A rational number can be written as a fraction p/q where p and q are integers and q≠0. Its decimal expansion terminates or eventually repeats. Integers, terminating decimals and repeating decimals are therefore rational.','An irrational number cannot be expressed as a ratio of two integers. Its decimal expansion neither terminates nor repeats in a fixed pattern. Examples include √2, √3 and π.','A square root is not automatically irrational: √49=7 is rational, while √50=5√2 is irrational. Decide whether the number under a square root is a perfect square after simplification.','Pi is the constant ratio circumference/diameter for every circle. Measuring several circular objects and computing C÷d should give values near 3.14; variation occurs because physical measurements are approximate.'],
 workedExamples:['−7=−7/1, 0.125=1/8 and 0.333…=1/3 are rational.','√81=9 is rational; √20=2√5 is irrational.','If a lid has circumference 62.9 cm and diameter 20.0 cm, C/d≈3.145, close to π.'],
 misconceptions:['thinking every decimal is irrational','thinking every square root is irrational','using 22/7 as the exact definition of π rather than an approximation','classifying a number by appearance rather than by whether it can be expressed as p/q'],
 guidedPractice:['Classify −4, 2/7, 0.75, 0.121212…, √36, √7 and π; measure two circular objects and calculate C/d.'],
 independentPractice:['Classify twenty mixed numbers with reasons; simplify square roots before classification; complete a three-object π investigation and explain why results differ slightly.'],
 mastery:{criterion:'At least 85% correct rational/irrational classification with justification and a practical π estimate within reasonable measurement error.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-basic-operations-basic-operations-1',classLevel:'JSS3',subject:'Mathematics',topic:'Addition of numbers in base 2 numerals',source:{authority:'NERDC',url:sourceUrl,page:30},
 objectives:['Add two or three 3-digit binary numbers accurately'],
 prerequisites:['binary place value','base-ten addition and carrying'],
 teaching:['Binary addition follows place value exactly like ordinary addition, but regrouping occurs at 2 rather than 10. The basic facts are 0+0=0, 0+1=1, 1+1=10₂ and 1+1+1=11₂.','Work from right to left. When a column totals 2, write 0 and carry 1; when it totals 3, write 1 and carry 1. Align digits by place value before adding.','Check by converting the addends and answer to base ten. The base-ten sum should agree, but the working should still demonstrate binary addition.'],
 workedExamples:['101₂+011₂=1000₂ because 5+3=8.','111₂+101₂+010₂=1110₂ because 7+5+2=14.'],
 misconceptions:['using decimal carrying rules','writing 2 as a binary digit','misaligning place-value columns','forgetting a carried 1 when adding three numerals'],
 guidedPractice:['Add 101₂+110₂, then 011₂+101₂+111₂; verify both in base ten.'],
 independentPractice:['Ten binary additions, including two- and three-addend examples; convert three answers to base ten as checks.'],
 mastery:{criterion:'At least 9 of 10 additions correct, with valid binary digits and correct carrying shown.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-basic-operations-basic-operations-2',classLevel:'JSS3',subject:'Mathematics',topic:'Subtraction of numbers in base 2 numerals',source:{authority:'NERDC',url:sourceUrl,page:30},
 objectives:['Subtract 3-digit binary numbers accurately'],
 prerequisites:['binary place value','binary addition','borrowing in base ten'],
 teaching:['Binary subtraction uses 0−0=0, 1−0=1 and 1−1=0. When 0−1 occurs, borrow 1 from the next binary place; that borrowed 1 is worth 10₂, so 10₂−1₂=1₂.','If the next place is also zero, borrowing may pass across several places. Record each regrouping so the place-value change is visible.','Check by converting both numerals to base ten or by adding the difference back to the subtrahend.'],
 workedExamples:['110₂−011₂=011₂ because 6−3=3.','1000₂−0011₂=0101₂ because 8−3=5.'],
 misconceptions:['treating borrowed 1 as decimal ten','dropping leading place-value positions too early','subtracting the smaller digit from the larger regardless of order'],
 guidedPractice:['Subtract 101₂−011₂ and 1000₂−0110₂; check each by addition.'],
 independentPractice:['Ten subtraction problems with increasing borrowing complexity, plus three missing-number checks.'],
 mastery:{criterion:'At least 9 of 10 correct with borrowing shown and one independent verification method used.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-basic-operations-basic-operations-3',classLevel:'JSS3',subject:'Mathematics',topic:'Multiplication of numbers in base 2 numerals',source:{authority:'NERDC',url:sourceUrl,page:30},
 objectives:['Multiply two 2-digit binary numbers accurately'],
 prerequisites:['binary place value','binary addition','ordinary long multiplication'],
 teaching:['Binary multiplication has only four digit facts: 0×0=0, 0×1=0, 1×0=0 and 1×1=1. The place-value shifts in long multiplication are the important part.','Multiply by each digit of the multiplier from right to left. A row produced by a 1 copies the multiplicand; a row produced by a 0 is zero. Shift each new row one binary place to the left.','Add the partial products using binary addition and check in base ten when learning the method.'],
 workedExamples:['11₂×10₂=110₂ because 3×2=6.','11₂×11₂: partial products 11₂ and 110₂ sum to 1001₂, and 3×3=9.'],
 misconceptions:['forgetting the place-value shift','writing decimal multiplication facts into binary columns','using a digit 2 in a partial product'],
 guidedPractice:['Multiply 10₂×11₂ and 11₂×11₂, showing partial products.'],
 independentPractice:['Eight 2-digit-by-2-digit binary products and two contextual repeated-grouping problems.'],
 mastery:{criterion:'At least 8 of 10 correct with properly shifted partial products and valid binary addition.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-basic-operations-basic-operations-4',classLevel:'JSS3',subject:'Mathematics',topic:'Division of numbers in base 2 numerals',source:{authority:'NERDC',url:sourceUrl,page:30},
 objectives:['Divide two- to three-digit binary numbers by simple binary divisors'],
 prerequisites:['binary subtraction','binary multiplication','long division'],
 teaching:['Binary long division follows the same cycle as decimal long division: compare, place a quotient digit, multiply, subtract, and bring down. Quotient digits are only 0 or 1.','At each step ask whether the divisor fits into the current binary part. If yes, write 1; if no, write 0 and bring down the next digit.','A remainder must be smaller than the divisor. Verify by divisor×quotient+remainder=dividend.'],
 workedExamples:['110₂÷10₂=11₂ because 6÷2=3.','111₂÷11₂=10₂ remainder 1₂ because 7=3×2+1.'],
 misconceptions:['omitting a zero in the quotient when the divisor does not fit','using decimal division facts without binary place value','accepting a remainder equal to or larger than the divisor'],
 guidedPractice:['Divide 100₂ by 10₂ and 101₂ by 10₂; verify each.'],
 independentPractice:['Eight exact and remainder binary divisions; verify three using multiplication and addition.'],
 mastery:{criterion:'At least 8 of 10 division problems correct, including valid quotient-place zeros and remainder checks.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-algebraic-processes-algebraic-operations-1',classLevel:'JSS3',subject:'Mathematics',topic:'Factorization',source:{authority:'NERDC',url:sourceUrl,page:31},
 objectives:['Factorize simple algebraic expressions','Factorize quadratic-type expressions using suitable methods including the curriculum equation-box approach','Translate word problems into algebraic expressions and factorize where appropriate'],
 prerequisites:['expansion of brackets','common factors','algebraic terms and coefficients','integer multiplication'],
 teaching:['Factorization reverses expansion. First look for a greatest common factor because removing it simplifies every later step. For ax+ay, the common factor is a, giving a(x+y).','Grouping is useful when four terms share factors in pairs. Rearrange only when mathematically valid, factor each pair, then factor the common bracket.','Recognise standard identities: a²−b²=(a−b)(a+b) and a²−2ab+b²=(a−b)². Expand the answer to verify.','For a quadratic ax²+bx+c, first identify a, b and c. To split the middle term, write bx as mx+nx. Because mx+nx must still equal bx, m+n=b. For grouping to reproduce the original first and constant terms, mn=ac. Therefore find two numbers whose sum is b and whose product is ac; compare candidate factor pairs explicitly, split the middle term only after both conditions are satisfied, factor by grouping, and verify by expansion. When a=1 this reduces to product c because ac=c.','In word problems, define quantities, form the expression, then factorize only if factorization serves the question; algebra is a model, not a ritual.'],
 workedExamples:['6x+9=3(2x+3).','3m+pq+3p+mq=(m+p)(3+q) after grouping 3(m+p)+q(m+p).','x²−25=(x−5)(x+5).','2x²+7x+3: a=2,b=7,c=3, so sum=7 and product=ac=6. Compare 1 and 6 (sum 7, product 6) with 2 and 3 (sum 5, product 6). Use 1 and 6, split 7x as x+6x, then factor 2x²+x+6x+3=x(2x+1)+3(2x+1)=(2x+1)(x+3); expand to verify.'],
 misconceptions:['dividing only some terms by the common factor','confusing factorization with collecting like terms','using (a−b)² for a²−b²','choosing factor pairs with the correct product but wrong sum'],
 guidedPractice:['Factorize 8x+12, 2a+2b+ac+bc, y²−49 and x²+9x+20; expand each answer to check.'],
 independentPractice:['Fifteen mixed factorization items, including common factor, grouping, difference of squares, perfect-square trinomials, simple quadratics and two word-model tasks.'],
 mastery:{criterion:'At least 80% across all required factorization patterns and successful expansion checks on selected answers.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-algebraic-processes-algebraic-operations-2',classLevel:'JSS3',subject:'Mathematics',topic:'Simple equations involving fractions',source:{authority:'NERDC',url:sourceUrl,page:31},
 objectives:['Solve simple equations involving fractions','Translate word problems into simple fractional equations and solve them'],
 prerequisites:['equivalent fractions','LCM of denominators','inverse operations','JSS2 simple linear equations'],
 teaching:['A fractional equation contains one or more algebraic fractions. The safest first move is usually to multiply every term by the LCM of all denominators, which clears the fractions without changing equality.','After clearing denominators, solve the resulting linear equation using balanced inverse operations. Whatever is done to one side must be done to the other.','If a denominator contains a variable, state any value that would make it zero before solving. At this level many examples use numerical denominators, but the zero-denominator rule remains fundamental.','For word problems, define the unknown, translate relationships carefully, solve, then interpret the solution in the original context and check it.'],
 workedExamples:['x/3+2=7 → multiply by 3: x+6=21 → x=15.','x/4+x/6=5 → LCM 12: 3x+2x=60 → x=12.','“One third of a number plus 5 is 13” gives x/3+5=13, so x=24.'],
 misconceptions:['multiplying only the fractional term by the LCM','cross-multiplying when the equation is not a single fraction equals a single fraction','losing a negative sign while clearing denominators','stopping after finding x without checking the context'],
 guidedPractice:['Solve x/5+3=9, x/3−x/6=4 and a word problem involving one quarter of a number.'],
 independentPractice:['Twelve fractional equations with different denominators and four word problems; verify at least four by substitution.'],
 mastery:{criterion:'At least 80% correct with denominators cleared legitimately, balanced working shown and correct interpretation of word problems.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-algebraic-processes-algebraic-operations-3',classLevel:'JSS3',subject:'Mathematics',topic:'Simultaneous linear equations',source:{authority:'NERDC',url:sourceUrl,page:32},
 objectives:['Compile tables of values for two linear functions','Solve simultaneous linear equations in two variables graphically','Solve simultaneous equations by elimination','Apply elimination to real-life problems','Solve simultaneous equations by substitution','Apply substitution to real-life problems'],
 prerequisites:['linear equations','Cartesian graphs and tables of values','substitution into expressions','signed-number arithmetic'],
 teaching:['Two simultaneous linear equations describe two conditions that must hold at the same time. A solution is an ordered pair (x,y) satisfying both equations.','Graphically, create a table for each line, plot both on the same axes and read their intersection. Graphical answers may be approximate because of drawing scale.','Elimination combines equations so one variable cancels. If coefficients do not already match, multiply one or both equations by suitable constants first.','Substitution rearranges one equation for one variable and replaces that variable in the other equation. It is efficient when a variable already has coefficient 1 or is easily isolated.','For real-life problems, define both unknowns with units, form two independent equations, solve, and check that the answer makes sense in both original statements.'],
 workedExamples:['x+y=7 and x−y=1. Adding gives 2x=8, x=4, then y=3.','2x+y=11 and y=x+2. Substitute: 2x+x+2=11 → x=3, y=5.','Tickets cost ₦500 for adults and ₦300 for students. 20 tickets total ₦7,600: a+s=20, 500a+300s=7600 → a=8, s=12.'],
 misconceptions:['finding a point on only one line and calling it the solution','adding equations without arranging like variables','changing one equation but not every term when scaling','forgetting to substitute back for the second variable','using two equations that express the same information in a word problem'],
 guidedPractice:['Solve x+y=9, x−y=3 by graph and elimination; solve y=2x+1 with x+y=10 by substitution.'],
 independentPractice:['Nine systems: three graphical, three elimination and three substitution, plus three real-life modelling problems. Compare methods on one system.'],
 mastery:{criterion:'At least 80% overall and at least two correct solutions by each method; every solution must satisfy both original equations.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-mensuration-and-geometry-shapes-1',classLevel:'JSS3',subject:'Mathematics',topic:'Similar Shapes',source:{authority:'NERDC',url:sourceUrl,page:33},
 objectives:['Identify similar triangles, rectangles, squares, cubes and cuboids','Recognize similar shapes in the environment','Enlarge figures using scale factors','Calculate corresponding lengths, areas and volumes of similar figures','Solve quantitative-reasoning problems involving similarity'],
 prerequisites:['ratio and proportion','scale drawing','area and volume','properties of common shapes'],
 teaching:['Similar figures have the same shape: corresponding angles are equal and corresponding lengths are in a constant ratio called the scale factor. Equal-looking alone is not enough; correspondence must be established.','If the linear scale factor from shape A to B is k, corresponding lengths multiply by k, areas by k² and volumes by k³. These different powers are essential.','An enlargement with k>1 increases size; 0<k<1 gives a reduction. A scale factor acts from a specified original to an image, so direction matters.','Use labelled corresponding sides before writing a proportion. For 3-D solids, match like dimensions before applying k³ to volumes.'],
 workedExamples:['Triangles with corresponding sides 3,4,5 and 6,8,10 are similar with scale factor 2.','If similar rectangles have linear scale factor 3 and the smaller area is 12 cm², larger area=12×3²=108 cm².','If similar cubes have side ratio 2:5, their volume ratio is 2³:5³=8:125.'],
 misconceptions:['using k for area instead of k²','using k² for volume instead of k³','matching non-corresponding sides','assuming all rectangles or all triangles are similar'],
 guidedPractice:['Find missing sides in two similar triangles; enlarge a simple coordinate shape by scale factor 2; calculate an area and volume under a stated scale factor.'],
 independentPractice:['Twelve similarity problems mixing lengths, scale factors, areas, volumes, diagrams and environmental applications.'],
 mastery:{criterion:'At least 80% with correct correspondence and explicit use of k, k² and k³ where appropriate.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-mensuration-and-geometry-shapes-2',classLevel:'JSS3',subject:'Mathematics',topic:'Trigonometry',source:{authority:'NERDC',url:sourceUrl,page:33},
 objectives:['Identify sine, cosine and tangent of an acute angle in a right-angled triangle','Use trigonometric ratios to find unknown distances and lengths','Apply trigonometric ratios to practical and word problems'],
 prerequisites:['right-angled triangles','Pythagoras theorem','ratio','angles and calculator use'],
 teaching:['For an acute angle θ in a right-angled triangle, name sides relative to θ: opposite is across from θ, adjacent touches θ but is not the hypotenuse, and hypotenuse is opposite the right angle.','The three ratios are sinθ=opposite/hypotenuse, cosθ=adjacent/hypotenuse and tanθ=opposite/adjacent. Choose the ratio containing the known and required sides.','Draw and label a right triangle from the situation before calculating. Distances, heights, ladders, shadows and angles of elevation are models only after the geometry has been identified.','Keep units consistent and check whether the answer is physically plausible. For calculator work, use degree mode for degree angles.'],
 workedExamples:['In a right triangle with opposite=6 and hypotenuse=10, sinθ=0.6.','A ladder 5 m long makes 60° with the ground. Height reached=5sin60°≈4.33 m.','From a point 20 m from a vertical pole, angle of elevation to the top is 35°. Height≈20tan35°≈14.0 m, ignoring eye height.'],
 misconceptions:['naming opposite/adjacent without reference to the chosen angle','using sine/cosine/tangent interchangeably','using radian mode accidentally','forgetting that the hypotenuse is always opposite 90°'],
 guidedPractice:['For three labelled right triangles identify O/A/H relative to a marked angle; solve one unknown-side problem with each trig ratio.'],
 independentPractice:['Twelve problems involving trig ratios, heights/distances and angles of elevation, with diagrams required for all word problems.'],
 mastery:{criterion:'At least 80% with correct side identification, ratio selection, degree-mode use and units.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-mensuration-and-geometry-shapes-3',classLevel:'JSS3',subject:'Mathematics',topic:'Area of plane figures',source:{authority:'NERDC',url:sourceUrl,page:34},
 objectives:['Find areas of triangles','Find areas of parallelograms','Find areas of trapezia','Find areas of circles and sectors','Solve word problems involving area','Solve quantitative-reasoning problems involving areas'],
 prerequisites:['length measurement','perimeter versus area','fractions and decimals','circle vocabulary and π'],
 teaching:['Area measures surface in square units. The triangle formula A=1/2 bh can be derived as half a matching parallelogram; the perpendicular height must correspond to the chosen base.','A parallelogram has area bh because it can be rearranged into a rectangle with the same base and perpendicular height. A trapezium has area 1/2(a+b)h where a and b are the parallel sides.','A circle has area πr². A sector is a fraction of a circle, so sector area=(θ/360°)πr² for central angle θ.','Composite area problems should be decomposed into familiar shapes. Mark dimensions and units, compute each component, then add or subtract as the diagram requires.','Deriving and explaining formulas helps learners distinguish height, slant length, radius, diameter and parallel sides rather than simply substituting numbers.'],
 workedExamples:['Triangle b=12 cm,h=7 cm: A=42 cm².','Trapezium parallel sides 8 cm and 14 cm, height 5 cm: A=1/2(22)(5)=55 cm².','Circle r=7 cm: A=49π≈154 cm² using 22/7 where appropriate.','90° sector of radius 8 cm: A=90/360×π×64=16π≈50.3 cm².'],
 misconceptions:['using a sloping side as perpendicular height','forgetting to square the radius','using diameter in place of radius','using θ/180 instead of θ/360 for sector area','reporting area in linear units'],
 guidedPractice:['Derive triangle area from a rectangle sketch; calculate one triangle, parallelogram, trapezium, circle and sector.'],
 independentPractice:['Fifteen area problems including composite shapes and word contexts; require diagrams and square-unit answers.'],
 mastery:{criterion:'At least 80% across all listed figures, correct identification of perpendicular heights/radii and correct square units.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-mensuration-and-geometry-shapes-4',classLevel:'JSS3',subject:'Mathematics',topic:'Construction',source:{authority:'NERDC',url:sourceUrl,page:35},
 objectives:['Construct a 45° angle','Construct a 30° angle','Copy a given angle using ruler and compasses','Construct simple plane shapes accurately'],
 prerequisites:['basic ruler-and-compass construction','60° and 90° constructions','angle bisectors','triangle construction'],
 teaching:['Geometric construction uses an unmarked straightedge and compasses to create exact relationships. Keep arcs visible because they are evidence of the construction logic.','Construct 45° by first constructing a 90° angle and bisecting it. Construct 30° by constructing 60° and bisecting it.','To copy an angle, draw an arc across both arms of the original, reproduce the same arc radius at the new vertex, transfer the chord distance between the two intersections, then draw the second arm.','Simple plane shapes can be built from known sides, perpendiculars, parallel relationships, equal radii and constructed angles. Always verify dimensions after construction.'],
 workedExamples:['At point A on a line, construct a perpendicular to obtain 90°, then bisect to obtain 45°.','Construct an equilateral-triangle 60° at a point, then bisect to obtain 30°.','Copy a 73° given angle without setting a protractor by transferring its arc and chord.'],
 misconceptions:['measuring 45° or 30° directly with a protractor when a construction is required','changing compass width during a transfer step','erasing arcs before verification','assuming a sketch is a construction without geometric evidence'],
 guidedPractice:['Construct 45° and 30° from a common baseline; copy a supplied angle and verify with a protractor only after construction.'],
 independentPractice:['Complete six constructions: two target angles, two copied angles and two simple plane shapes with labelled dimensions and visible arcs.'],
 mastery:{criterion:'All required constructions are valid, within normal drawing tolerance, labelled and supported by visible compass/straightedge evidence.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-everyday-statistics-data-collection-and-presentation-1',classLevel:'JSS3',subject:'Mathematics',topic:'Measure of central tendency',source:{authority:'NERDC',url:sourceUrl,page:36},
 objectives:['Review mean, median and mode','Calculate the median of a data set','Find the mode of a data set','Calculate the mean of a data set','Find the range of a data set','Apply measures of central tendency and range to analyse information'],
 prerequisites:['JSS1/JSS2 data collection and tables','addition and division','ordering numbers'],
 teaching:['Mean, median and mode describe different aspects of a data set. Mean uses every value, median is the middle after ordering, and mode is the most frequent value. None is automatically “best” for every situation.','For an odd number of ordered values, the median is the middle value. For an even number, it is the mean of the two middle values. Data must be ordered first.','The mode may be one value, more than one value, or absent if no value repeats more than others. Range=max−min describes spread, not centre.','Outliers can pull the mean strongly while leaving the median relatively stable. Interpretation should therefore compare the measures and connect them to the context rather than merely calculate them.'],
 workedExamples:['Data 2,4,4,5,10: mean=5, median=4, mode=4, range=8.','Data 3,5,7,9: median=(5+7)/2=6.','Salaries 40,42,43,45,200 (thousands) have mean 74 but median 43; the median better represents a typical worker because of the outlier.'],
 misconceptions:['finding median before ordering','dividing mean by the wrong number of observations','calling the largest value the mode','confusing range with a central measure','assuming there must be exactly one mode'],
 guidedPractice:['For two small data sets calculate mean, median, mode and range, then decide which measure best represents a “typical” value.'],
 independentPractice:['Ten data sets plus four interpretation questions involving outliers, multiple modes and comparison of groups.'],
 mastery:{criterion:'At least 85% computational accuracy plus correct interpretation of when mean/median/mode is informative.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss3-math-everyday-statistics-data-collection-and-presentation-2',classLevel:'JSS3',subject:'Mathematics',topic:'Data presentation',source:{authority:'NERDC',url:sourceUrl,page:36},
 objectives:['Represent information accurately on pie charts','Interpret information presented on pie charts'],
 prerequisites:['frequency tables','fractions, percentages and ratios','angles and 360°','protractor use'],
 teaching:['A pie chart represents a whole as 360°. Convert each category to a sector angle using frequency/total×360°. The angles must total 360° apart from small rounding effects.','When percentages are given, sector angle=percentage/100×360°. When a sector angle and total are known, category frequency=angle/360×total.','Construction quality matters: label categories, use a sensible key where needed, draw angles from the centre and avoid visual exaggeration.','Interpretation should compare proportions, recover counts where possible and state only conclusions supported by the chart. A pie chart is poor for showing change over time, so choose presentation methods with purpose.'],
 workedExamples:['In a class of 40, 12 choose football: angle=12/40×360°=108°.','A 72° sector represents 20% of the whole because 72/360=0.2. In a survey of 250 people that equals 50 people.','Sector angles 90°,126°,54° and 90° sum to 360°, corresponding to 25%,35%,15%,25%.'],
 misconceptions:['using frequency as the angle','forgetting total frequency in the denominator','drawing sectors from the circumference instead of the centre','claiming the largest sector proves a cause','accepting angles that do not total 360°'],
 guidedPractice:['Convert a five-category frequency table to angles, check the sum, sketch the pie chart and answer five interpretation questions.'],
 independentPractice:['Construct two complete pie charts from raw/frequency data and solve ten reverse-reading questions involving angle, percentage and frequency.'],
 mastery:{criterion:'At least 85% accuracy in angle/frequency conversion, internally consistent 360° charts and evidence-based interpretation.',status:'DEEP_WHEN_PASSED'},boardReady:true
}
];

export function getJss3MathDeepLesson(topicId:string){return jss3MathematicsDeepLessons.find(x=>x.topicId===topicId)}
