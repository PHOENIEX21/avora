export type DeepJss2MathLesson={
 topicId:string; classLevel:'JSS2'; subject:'Mathematics'; topic:string;
 source:{authority:'NERDC';url:string;page:number}; objectives:string[]; prerequisites:string[];
 teaching:string[]; workedExamples:string[]; misconceptions:string[]; guidedPractice:string[]; independentPractice:string[];
 mastery:{criterion:string;status:'DEEP_WHEN_PASSED'}; boardReady:true;
};

const sourceUrl='https://nerdc.gov.ng/content_manager/jss/jss1-3_maths.pdf';

/** AVORA-authored teaching. NERDC controls scope/objectives; explanations, examples and practice are original. */
export const jss2MathematicsDeepLessons:DeepJss2MathLesson[]=[
{
 topicId:'nerdc-jss2-math-numbers-and-numeration-whole-numbers-1',classLevel:'JSS2',subject:'Mathematics',topic:'Whole Numbers',source:{authority:'NERDC',url:sourceUrl,page:18},
 objectives:['Express whole numbers in standard form','Express decimal numbers in standard form','Find prime factors of numbers not greater than 200','Express numbers as products of prime factors','Find LCM and HCF','Identify perfect squares and find squares','Find square roots of perfect squares by factor method and estimate other square roots','Solve quantitative-reasoning problems using these ideas'],
 prerequisites:['JSS1 place value and large numbers','prime numbers, factors, multiples, LCM and HCF','basic multiplication and division'],
 teaching:['Standard form writes a non-zero number as a×10^n where 1≤a<10. Move the decimal point until the first factor lies between 1 and 10; the number of places moved gives the power of ten.','Prime factorization breaks a whole number into prime-number building blocks. A factor tree or repeated division may be used, but the final product must contain only primes.','For LCM use every required prime factor at its highest power; for HCF use only common prime factors at their lowest powers.','A perfect square is the product of an integer with itself. For a perfect-square root by prime factors, pair equal prime factors and take one member from each pair.','For non-perfect square roots, locate the number between consecutive perfect squares and estimate its root; then check by squaring the estimate.'],
 workedExamples:['48,000=4.8×10^4; 0.0063=6.3×10^-3.','180=2²×3²×5. Therefore √180 is not an integer, while 144=2⁴×3² and √144=2²×3=12.','72=2³×3² and 90=2×3²×5, so HCF=2×3²=18 and LCM=2³×3²×5=360.','Since 7²=49 and 8²=64, √50 is just above 7; 7.1²=50.41, so √50≈7.1 to 1 d.p.'],
 misconceptions:['using a leading number such as 48 in “standard form” instead of 4.8','leaving composite factors such as 6 in a prime factorization','using highest powers for HCF or lowest powers for LCM','assuming every square root is a whole number'],
 guidedPractice:['Write 725,000 and 0.00084 in standard form; prime-factorize 168; find HCF and LCM of 24 and 54; find √196.'],
 independentPractice:['Write 6,030,000 and 0.00905 in standard form; factorize 150 and 192; find HCF/LCM of 36,48,60; estimate √70 to 1 d.p.; complete five mixed quantitative-reasoning items.'],
 mastery:{criterion:'At least 80% across standard form, prime factors, LCM/HCF, squares/square roots and quantitative reasoning, with method shown.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-numbers-and-numeration-fractions-1',classLevel:'JSS2',subject:'Mathematics',topic:'Fractions',source:{authority:'NERDC',url:sourceUrl,page:19},
 objectives:['Convert simple fractions to ratios, decimals and percentages and vice versa','Solve quantitative-reasoning problems involving fractions, ratios, decimals and percentages'],
 prerequisites:['JSS1 equivalent fractions','fraction-decimal-percentage conversion','ratio vocabulary and simplification'],
 teaching:['A fraction a/b compares a part with a whole; as a ratio it may be written a:b when the same two quantities are being compared. Always identify what the numerator and denominator represent.','Convert a fraction to a decimal by division and to a percentage by multiplying by 100%. Convert a percentage to a fraction over 100 and simplify; convert a terminating decimal using place value.','A ratio compares quantities in the same units. Simplify by dividing all terms by their HCF and scale ratios by multiplying or dividing every term by the same non-zero number.','In word problems, decide first whether the unknown is a part, a whole, a percentage, or a ratio share before calculating.'],
 workedExamples:['3/5=0.6=60%; as a part-to-whole ratio it is 3:5.','35%=35/100=7/20=0.35.','A class has boys:girls=3:5 and 32 learners. Total parts=8, one part=4, so boys=12 and girls=20.','A ₦2,400 item is reduced by 15%: discount=0.15×2400=₦360, new price=₦2,040.'],
 misconceptions:['treating 3/5 as the part-to-part ratio 3:2 without context','dividing a percentage by 100 twice','simplifying only one term of a ratio','using the percentage as the final amount rather than the change'],
 guidedPractice:['Convert 7/8 to decimal and percentage; convert 62.5% to a fraction; share ₦4,200 in the ratio 2:5.'],
 independentPractice:['Complete a conversion table for 1/4,3/8,0.45,72%; solve four ratio/percentage word problems including increase, decrease and sharing.'],
 mastery:{criterion:'Learner converts accurately in both directions and solves at least 4 of 5 context problems with correct interpretation.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-basic-operations-derived-operations-1',classLevel:'JSS2',subject:'Mathematics',topic:'Transactions in the homes and offices',source:{authority:'NERDC',url:sourceUrl,page:20},
 objectives:['Solve household and office arithmetic problems','Solve simple commercial arithmetic involving profit, interest, discount and commission'],
 prerequisites:['percentages','decimal arithmetic','reading bills, tables and money notation'],
 teaching:['Household arithmetic uses mathematical records such as electricity/water bills, budgets, receipts and schedules. Read the units, rates, fixed charges and totals before computing.','Profit=selling price−cost price; loss=cost price−selling price. Profit or loss percentage is normally based on cost price unless stated otherwise.','Simple interest I=PRT/100 when R is a percentage per year and T is in years; amount=P+I.','Discount is a reduction from marked price; commission is payment based on sales or another stated base. Always identify the base before applying the rate.','A budget compares expected income with planned expenditure; balance=income−expenditure. A negative balance means planned spending exceeds income.'],
 workedExamples:['A household income of ₦180,000 with expenses of ₦152,500 leaves ₦27,500.','An item costs ₦8,000 and sells for ₦9,600: profit=₦1,600; profit%=1,600/8,000×100=20%.','Simple interest on ₦50,000 at 8% p.a. for 2 years is ₦8,000; amount=₦58,000.','A ₦25,000 marked price with 12% discount gives discount ₦3,000 and selling price ₦22,000.'],
 misconceptions:['calculating profit percentage on selling price by default','adding discount to marked price','using months as years without conversion in simple interest','ignoring fixed charges or units on a bill'],
 guidedPractice:['Prepare a simple monthly budget; calculate profit percentage on a ₦6,500 cost sold for ₦7,800; find 10% commission on ₦240,000 sales.'],
 independentPractice:['Solve a mock electricity-bill problem, one budget problem, and six commercial-arithmetic problems covering profit, loss, simple interest, discount and commission.'],
 mastery:{criterion:'At least 80% across realistic household/office and commercial-arithmetic tasks, with correct base quantities and units.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-basic-operations-derived-operations-2',classLevel:'JSS2',subject:'Mathematics',topic:'Approximation',source:{authority:'NERDC',url:sourceUrl,page:20},
 objectives:['Approximate numbers to a stated degree of accuracy','Solve quantitative-reasoning problems involving approximation'],
 prerequisites:['place value','JSS1 estimation and approximation','decimal notation'],
 teaching:['Decimal places count digits to the right of the decimal point. Look at the next digit: 0–4 leaves the retained digit unchanged; 5–9 increases it by one.','Significant figures begin at the first non-zero digit. Zeros between non-zero digits are significant; leading zeros are not.','For a requested accuracy, state the rounded value clearly and preserve placeholder zeros when they communicate place value.','Use approximation to judge whether an exact answer is reasonable. In applied problems, round only at the requested stage to reduce accumulated error.'],
 workedExamples:['47.386 to 2 d.p.=47.39.','0.005786 to 2 s.f.=0.0058.','83,649 to 2 s.f.=84,000.','19.8×5.03≈20×5=100, so an exact calculator result near 100 is plausible.'],
 misconceptions:['counting leading zeros as significant figures','rounding every intermediate step unnecessarily','confusing 2 d.p. with 2 s.f.','dropping place-holding zeros so 84,000 becomes 84'],
 guidedPractice:['Round 6.7845 to 3 d.p.; 0.009746 to 2 s.f.; 528,941 to 3 s.f.; estimate 39.7×2.98.'],
 independentPractice:['Ten mixed rounding questions plus three quantitative-reasoning problems requiring an estimate and an explanation of reasonableness.'],
 mastery:{criterion:'Learner distinguishes decimal places from significant figures and gets at least 8 of 10 rounding/estimation items correct.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-basic-operations-derived-operations-3',classLevel:'JSS2',subject:'Mathematics',topic:'Multiplication and division of directed numbers',source:{authority:'NERDC',url:sourceUrl,page:20},
 objectives:['Obtain squares and square roots from supplied square/square-root tables','Interpret information from tables, charts, records and schedules','Multiply directed numbers','Divide directed numbers'],
 prerequisites:['JSS1 addition/subtraction of directed numbers','multiplication tables','meaning of positive and negative values'],
 teaching:['For multiplication and division, equal signs give a positive result and unlike signs give a negative result. Determine the sign separately from the magnitude.','The sign rule follows repeated patterns: for example 3×(-2)=-6, 2×(-2)=-4, 1×(-2)=-2, 0×(-2)=0, so (-1)×(-2)=+2 to preserve the constant difference.','Division reverses multiplication: if (-4)×3=-12, then -12÷3=-4 and -12÷(-4)=3.','A square/square-root table is a lookup tool, not a substitute for understanding. Read the table title and headings first, locate the given number or required entry using the row/column convention printed on that table, record the value with the stated precision, then verify that a claimed square root is reasonable by squaring or by bracketing it between nearby perfect squares.','In tables, charts and schedules, identify the row/column headings and units before extracting or combining values.'],
 workedExamples:['If a supplied square-root table gives √2.25=1.50, check: 1.50²=2.25. For a non-perfect value, first bracket it; for example 49<50<64 means 7<√50<8, so any table value must lie between 7 and 8.','(-7)×6=-42.','(-8)×(-5)=40.','54÷(-9)=-6.','A temperature changes by -3°C each hour for 4 hours: total change=4×(-3)=-12°C.'],
 misconceptions:['reading a numerical table without checking its headings or precision','accepting an impossible square-root table value without a reasonableness check','always making a product negative when a negative number appears','using addition sign rules for multiplication','losing the sign when dividing','reading chart entries without checking units'],
 guidedPractice:['Use the square/square-root table supplied in class to obtain two values and verify each by estimation or squaring; then evaluate (-9)(4), (-6)(-7), 72÷(-8), -81÷(-9) and explain each sign.'],
 independentPractice:['Twelve directed-number products/quotients plus three context/table problems.'],
 mastery:{criterion:'At least 85% accuracy and learner can verbally justify the sign of every product/quotient.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-algebraic-processes-algebraic-operations-1',classLevel:'JSS2',subject:'Mathematics',topic:'Algebraic expressions',source:{authority:'NERDC',url:sourceUrl,page:21},
 objectives:['Expand algebraic expressions','Factorize simple algebraic expressions','Expand and factorize quadratic expressions','Solve quantitative-reasoning problems','Simplify algebraic fractions with monomial denominators','Interpret and solve word problems leading to simple algebraic fractions'],
 prerequisites:['JSS1 algebraic symbols','collecting like terms','distributive law','common factors and fractions'],
 teaching:['Expansion removes brackets by multiplying every term inside by the factor outside. Factorization reverses expansion by extracting a common factor or finding factors that reproduce the expression.','For quadratics, first identify the standard form ax²+bx+c. Define a as the coefficient of x², b as the coefficient of x, and c as the constant. If bx is split as mx+nx, then m+n=b because the split terms must still combine to bx; for grouping to rebuild the quadratic, mn=ac. So compare factor pairs until BOTH sum b and product ac are satisfied. When a=1, ac=c. Check the final factors by expanding.','The NERDC quadratic box/grid method makes the same distributive structure visible. For expansion, place one factor along the top and the other down the side of a 2×2 box, multiply to fill all cells, then collect like terms. For factorisation, place ax² and c in opposite cells, find the two middle terms whose sum is bx and product is acx², fill the remaining cells, then take common factors from rows and columns. The box is a representation of the distributive law, not a different rule.','Algebraic fractions obey ordinary fraction rules. Factor numerator/denominator where useful and cancel only common factors, never separate terms joined by addition.','Translate words before calculating: “three more than x” is x+3; “half of y” is y/2; “the sum divided by p” requires brackets around the sum.'],
 workedExamples:['3(x+4)-2(x-1)=3x+12-2x+2=x+14.','6x+9=3(2x+3).','x²+5x+6=(x+2)(x+3). In a 2×2 box, x² and 6 occupy opposite cells; split 5x as 2x+3x, then the row/column common factors reveal (x+2)(x+3).','(6x²+9x)/(3x)=2x+3 for x≠0.'],
 misconceptions:['multiplying the outside factor by only the first term','canceling x from (x+3)/x','factorizing x²+5x+6 with numbers whose product/sum do not match','treating the quadratic box as a memorised picture without checking that its four cells expand back to the original expression','omitting brackets when translating grouped word phrases'],
 guidedPractice:['Expand 4(2x-3)+5; factorize 8y+12; factorize x²+7x+12; simplify (10a²-5a)/(5a).'],
 independentPractice:['Six expansion/factorization tasks, four algebraic-fraction tasks and two word-to-algebra problems, each followed by a verification step.'],
 mastery:{criterion:'Learner scores at least 80% and verifies factorization by expansion and fraction simplification by identifying valid common factors.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-algebraic-processes-algebraic-operations-2',classLevel:'JSS2',subject:'Mathematics',topic:'Simple equations',source:{authority:'NERDC',url:sourceUrl,page:22},
 objectives:['Solve problems involving simple equations'],
 prerequisites:['JSS1 simple equations','inverse operations','expansion and collecting like terms'],
 teaching:['An equation states that two expressions are equal. Preserve equality by performing the same valid operation on both sides.','Simplify each side first, remove brackets where needed, collect variable terms on one side and constants on the other, then divide by the coefficient.','Fractions can often be cleared by multiplying every term on both sides by the LCM of denominators.','Always substitute the proposed answer into the original equation; equality must be restored.'],
 workedExamples:['3n-4=2n+1 ⇒ n=5; check:11=11.','5(x-2)=3x+8 ⇒5x-10=3x+8⇒2x=18⇒x=9.','x/3+2=7 ⇒x/3=5⇒x=15.'],
 misconceptions:['moving a term across the equals sign without understanding the inverse operation','changing only one side of an equation','dividing one term but not the entire side','checking in a rearranged line rather than the original equation'],
 guidedPractice:['Solve 4y+7=2y+19 and 3(2p-1)=15; verify both.'],
 independentPractice:['Ten equations of increasing difficulty including brackets and simple fractions, plus two short word problems.'],
 mastery:{criterion:'At least 8 of 10 equations correct, with valid transformations and successful substitution checks.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-algebraic-processes-algebraic-operations-3',classLevel:'JSS2',subject:'Mathematics',topic:'Linear inequalities',source:{authority:'NERDC',url:sourceUrl,page:22},
 objectives:['Identify a linear inequality in one variable','Solve linear inequalities in one variable','Represent solution sets on a number line','Solve word problems involving linear inequalities'],
 prerequisites:['simple equations','directed numbers','number-line representation'],
 teaching:['An inequality compares quantities using <, >, ≤ or ≥. Its solution is usually a set of values rather than one value.','Solve similarly to an equation, but multiplying or dividing both sides by a negative number reverses the inequality sign.','On a number line, an open circle means the endpoint is excluded (< or >); a filled circle means included (≤ or ≥). Shade in the direction containing the solutions.','Translate language carefully: “at least” means ≥, “at most” means ≤, “more than” means > and “less than” means <.'],
 workedExamples:['3x+2<14 ⇒3x<12⇒x<4.','-2y≥8 ⇒ y≤-4 because division by -2 reverses the sign.','A bus carries at most 45 people: if x is passengers, x≤45.'],
 misconceptions:['forgetting to reverse the sign after multiplying/dividing by a negative','using a filled circle for a strict inequality','treating the answer as a single value','misreading “at least” as ≤'],
 guidedPractice:['Solve 5x-7≤18 and -3p<12; draw both solution sets on number lines.'],
 independentPractice:['Eight symbolic inequalities and four word problems requiring translation, solution and number-line representation.'],
 mastery:{criterion:'Learner solves and graphs at least 80% correctly and explains when and why the inequality sign reverses.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-algebraic-processes-algebraic-operations-4',classLevel:'JSS2',subject:'Mathematics',topic:'Graphs',source:{authority:'NERDC',url:sourceUrl,page:23},
 objectives:['Identify x-axis and y-axis','Plot points on the Cartesian plane','Prepare tables of values','Plot graphs of linear equations in two variables','Interpret plotted graphs','Plot linear graphs from real-life situations','Solve quantitative-reasoning problems using graphs'],
 prerequisites:['directed numbers','substitution in algebra','reading tables and scales'],
 teaching:['The Cartesian plane has a horizontal x-axis and vertical y-axis meeting at the origin (0,0). Coordinates are written (x,y): move in x first, then y.','To graph y=mx+c, choose convenient x-values, calculate y, make a table, plot the ordered pairs and draw the straight line through them.','A graph scale must be uniform on each axis, though x- and y-axes may use different scales. Label axes, units and title when context is involved.','Interpret a graph by connecting coordinates to meaning: slope shows rate of change, intercepts show values where an axis quantity is zero, and a horizontal segment may show no change.'],
 workedExamples:['For y=2x+1 and x=-1,0,1,2, y=-1,1,3,5; plot (-1,-1),(0,1),(1,3),(2,5).','Point (-3,2) lies 3 units left and 2 units up from the origin.','If a distance-time graph goes from (0 h,0 km) to (2 h,120 km), average speed over that interval is 60 km/h.'],
 misconceptions:['reversing x and y coordinates','using unequal, unmarked scale intervals','joining unrelated discrete points when a continuous line is not justified','reading slope without considering axis units'],
 guidedPractice:['Make a table and graph y=3x-2 for x=-1,0,1,2; identify the y-intercept and interpret the slope.'],
 independentPractice:['Plot two linear equations, interpret six features from a supplied distance-time/item-price dataset, and answer two quantitative-reasoning graph questions.'],
 mastery:{criterion:'Accurate axes/scales/points and at least 80% correct interpretation across algebraic and real-life graphs.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-mensuration-and-geometry-shapes-1',classLevel:'JSS2',subject:'Mathematics',topic:'Plane figures/Shapes',source:{authority:'NERDC',url:sourceUrl,page:24},
 objectives:['State properties of parallelogram, rhombus and kite','Identify these shapes in the environment','Draw plane objects to scale','Convert actual lengths to scale lengths and vice versa','Apply scale drawing to measurement problems','Solve quantitative-reasoning problems involving shapes and scale drawing'],
 prerequisites:['JSS1 plane shapes','measurement and unit conversion','ratio'],
 teaching:['A parallelogram has both pairs of opposite sides parallel and equal; opposite angles are equal and diagonals bisect each other.','A rhombus is a parallelogram with all four sides equal; its diagonals are perpendicular and bisect opposite angles. A kite has two pairs of adjacent equal sides, with one pair of opposite angles equal.','A scale such as 1:100 means 1 unit on the drawing represents 100 of the same units in reality. Convert units before applying the scale.','For “1 cm represents 5 m”, keep the stated correspondence visible throughout the calculation to avoid unit errors.'],
 workedExamples:['At scale 1:200, a real 8 m wall=800 cm/200=4 cm on the drawing.','A 6.5 cm map distance at 1 cm:4 km represents 26 km.','A quadrilateral with all sides equal and both pairs of opposite sides parallel is a rhombus.'],
 misconceptions:['assuming every kite is a rhombus','mixing metres and centimetres inside a ratio','multiplying when the scale requires division or vice versa','describing a rhombus as needing right angles'],
 guidedPractice:['Classify three quadrilaterals from properties; convert 12 m to drawing length at 1:300; recover real length from 7 cm at 1 cm:2.5 m.'],
 independentPractice:['A property table for parallelogram/rhombus/kite plus six scale-drawing problems and one room-layout application.'],
 mastery:{criterion:'Learner identifies properties without overgeneralising and solves at least 5 of 6 scale problems with correct units.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-mensuration-and-geometry-shapes-2',classLevel:'JSS2',subject:'Mathematics',topic:'Angles',source:{authority:'NERDC',url:sourceUrl,page:25},
 objectives:['Find the sum of angles in triangles','Find the sum of angles in quadrilaterals','Find the sum of interior angles of polygons','Distinguish angles of elevation and depression','Use elevation/depression with scale drawing to calculate heights/distances','Relate angles of elevation and depression','Solve quantitative-reasoning problems involving angles'],
 prerequisites:['JSS1 angle types and measurement','parallel-line angle facts','basic scale drawing'],
 teaching:['The interior angles of a triangle total 180° and of a quadrilateral total 360°. Splitting an n-sided polygon into n−2 triangles gives interior-angle sum (n−2)×180°.','An angle of elevation is measured upward from a horizontal line of sight; an angle of depression is measured downward from a horizontal line of sight.','When the observer and target horizontals are parallel, an angle of depression can equal the corresponding angle of elevation through alternate-angle relationships.','At JSS2, scale drawings can model height/distance: draw the horizontal, construct the stated angle accurately, use the selected scale and measure the missing length.'],
 workedExamples:['Pentagon angle sum=(5−2)×180°=540°.','A regular hexagon has each interior angle 720°/6=120°.','If a scale drawing uses 1 cm:10 m and the measured height is 4.6 cm, actual height=46 m.'],
 misconceptions:['using n×180° for polygon angle sum','measuring elevation from the vertical','assuming every polygon is regular','forgetting to convert measured drawing length back through the scale'],
 guidedPractice:['Find unknown angles in a triangle and quadrilateral; compute sums for 7- and 10-sided polygons; sketch and label elevation/depression.'],
 independentPractice:['Eight polygon/angle problems plus two scale-drawing elevation/depression problems with measured results and units.'],
 mastery:{criterion:'At least 80% and learner can justify the polygon formula and correctly distinguish elevation from depression.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-mensuration-and-geometry-shapes-3',classLevel:'JSS2',subject:'Mathematics',topic:'Bearing',source:{authority:'NERDC',url:sourceUrl,page:26},
 objectives:['Identify cardinal points','Locate objects using compass and three-digit bearings','Find distances between objects using scale drawing'],
 prerequisites:['angles measured clockwise','protractor use','scale drawing'],
 teaching:['The four major cardinal points are N,E,S,W; minor points include NE,SE,SW,NW. Compass directions describe sectors, while three-digit bearings give precise clockwise angles from North.','A three-digit bearing always has three figures: east is 090°, south 180°, west 270°. To locate an object, draw North at the starting point, measure clockwise, then draw the ray.','Reverse bearings differ by 180°: add 180° if the original is below 180°, otherwise subtract 180°.','When scale drawing is involved, determine direction first, measure/draw the scaled distance second, and convert back to the real distance only at the end.'],
 workedExamples:['A point due southeast has compass direction SE; an exact direction might be 135°.','Bearing of B from A is 065°; bearing of A from B=245°.','At scale 1 cm:5 km, a plotted separation of 7.4 cm represents 37 km.'],
 misconceptions:['measuring bearings anticlockwise','starting a bearing from East instead of North','writing 65° instead of 065°','assuming the reverse bearing is obtained by changing N to S without checking the exact angle'],
 guidedPractice:['Draw bearings 040°,125°,270° from a point; find their reverse bearings; solve one scale-distance problem.'],
 independentPractice:['Six compass/three-digit bearing conversions, four reverse-bearing questions and two scale-drawing navigation problems.'],
 mastery:{criterion:'Learner measures/writes bearings correctly to three digits and solves at least 80% of direction-distance tasks.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-mensuration-and-geometry-shapes-4',classLevel:'JSS2',subject:'Mathematics',topic:'Construction',source:{authority:'NERDC',url:sourceUrl,page:26},
 objectives:['Construct triangles from two sides and included angle','Construct triangles from two angles and the included side','Construct triangles from three sides','Bisect a given angle'],
 prerequisites:['ruler, compass and protractor use','triangle vocabulary','accurate measurement'],
 teaching:['A mathematical construction follows enough given measurements to determine a unique figure. Draw a clear base first and keep construction arcs visible.','For SAS, draw one given side, construct the included angle at the correct endpoint, mark the second side length, then join the remaining vertices.','For ASA, draw the included side, construct each given angle at its endpoint and extend the rays until they meet. For SSS, draw one side, use compass arcs of the other two side lengths; their intersection locates the third vertex.','To bisect an angle using a compass, draw an arc from the vertex cutting both arms; from those cut points draw equal-radius arcs that intersect; join the vertex to the intersection.'],
 workedExamples:['Construct ΔABC with AB=6 cm, AC=5 cm and ∠BAC=70° (SAS).','Construct ΔPQR with PQ=7 cm, ∠P=50°, ∠Q=65° (ASA).','Construct a triangle of sides 5 cm,6 cm,8 cm using SSS; check each side afterward.'],
 misconceptions:['using the wrong angle in an SAS construction','changing compass radius while creating the angle bisector intersection','erasing all construction evidence','attempting impossible SSS data where two smaller sides do not exceed the largest'],
 guidedPractice:['Complete one SAS triangle and bisect a 76° angle; verify the two halves with a protractor.'],
 independentPractice:['Construct one SAS, one ASA and one SSS triangle and two angle bisectors; label all given dimensions and verification measurements.'],
 mastery:{criterion:'All required constructions are geometrically valid, labelled, accurate within normal drawing tolerance and supported by visible construction steps.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-everyday-statistics-data-collection-and-presentation-1',classLevel:'JSS2',subject:'Mathematics',topic:'Data presentation',source:{authority:'NERDC',url:sourceUrl,page:27},
 objectives:['Present data in ordered form','Construct frequency tables from familiar data','Read information from pie charts','Calculate and interpret the interquartile range (IQR)','Use box plots to organise, compare and interpret data distributions'],
 prerequisites:['JSS1 data collection/presentation','fractions, ratios and percentages','median and ordered data','angles and protractor use'],
 teaching:['Raw data become easier to interpret when ordered and summarised. A frequency table records each value or category and how often it occurs; total frequency must equal the number of observations.','For a pie chart, sector angle=(category frequency/total frequency)×360°. The sector angles should total 360°; percentages should total 100% apart from rounding. To read a pie chart, reverse the relationship: frequency=(sector angle/360°)×total when the total is known.','Quartiles divide an ORDERED data set into four parts. AVORA uses this school convention consistently: find the median Q2; for an odd number of observations exclude that overall median before finding the median of the lower half (Q1) and upper half (Q3); for an even number split the ordered data equally into lower and upper halves.','The interquartile range is IQR=Q3−Q1. It measures the spread of the middle 50% of the data. A larger IQR means the central half is more spread out; a smaller IQR means it is more tightly grouped. Compare IQRs only after checking that the datasets and units are meaningfully comparable.','A box plot is built from the five-number summary: minimum, Q1, median (Q2), Q3 and maximum. Draw a number-line scale; make a box from Q1 to Q3; draw a line at the median; extend whiskers to the minimum and maximum. The box length represents the IQR.','To compare two box plots, discuss centre (medians), spread of the middle half (IQRs), overall range and visible skew/unequal whiskers. Do not invent causes that the plot does not establish.','Statistical interpretation should state what the data support. Always read labels, units, time period and source before drawing conclusions; computer-generated box plots still require the learner to understand what the five-number summary means.'],
 workedExamples:['Data 2,3,2,5,3,2 ordered gives 2,2,2,3,3,5; frequencies are 2→3, 3→2, 5→1.','In a survey of 40 learners, 10 choose football: sector angle=10/40×360°=90°. A 72° sector in a pie chart of 150 people represents 72/360×150=30 people.','For 2,4,5,7,8,10,13,15: Q2=(7+8)/2=7.5. Lower half 2,4,5,7 gives Q1=(4+5)/2=4.5. Upper half 8,10,13,15 gives Q3=(10+13)/2=11.5. IQR=11.5−4.5=7.','The same data have five-number summary 2,4.5,7.5,11.5,15. A box plot places whiskers at 2 and 15, a box from 4.5 to 11.5 and a median line at 7.5.','Class A has median 52 and IQR 8; Class B has median 55 and IQR 18. B has the higher central value but its middle 50% is more spread out. That description is supported; saying why B varies more would need extra evidence.'],
 misconceptions:['using frequency directly as degrees','forgetting that pie sectors must sum to 360°','finding quartiles before ordering the data','using range (maximum−minimum) when the question asks for IQR (Q3−Q1)','including the single overall median in both halves under the stated odd-data convention','drawing a box plot without a uniform numerical scale','claiming causation from a descriptive chart or box plot'],
 guidedPractice:['Order 3,5,5,6,8,9,11,13; find Q1, median, Q3 and IQR; then sketch its box plot on a labelled scale.','Given two five-number summaries, compare their medians, IQRs and overall ranges using complete sentences.'],
 independentPractice:['Create a frequency table and read a supplied pie chart; calculate quartiles and IQR for three datasets; construct two box plots on a common scale and write a justified comparison of centre and spread.'],
 mastery:{criterion:'Learner orders data correctly, constructs consistent frequency/pie representations, computes Q1/Q2/Q3 and IQR accurately, builds a valid box plot and makes evidence-based comparisons at 80%+.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
 topicId:'nerdc-jss2-math-everyday-statistics-data-collection-and-presentation-2',classLevel:'JSS2',subject:'Mathematics',topic:'Probability',source:{authority:'NERDC',url:sourceUrl,page:27},
 objectives:['Discuss chance events in everyday life','Determine probabilities of simple events','Apply probability/chance to everyday situations'],
 prerequisites:['fractions and ratios','data interpretation','counting equally likely outcomes'],
 teaching:['Probability measures how likely an event is, from 0 (impossible) to 1 (certain). For equally likely outcomes, P(event)=favourable outcomes/total possible outcomes.','An experiment is the action, an outcome is a possible result, and an event is one or more outcomes of interest. List the sample space before counting.','The complement of an event is “not the event”; P(not A)=1−P(A). Experimental probability uses observed relative frequency and may differ from theoretical probability in a small number of trials.','Probability supports decisions under uncertainty, but it does not guarantee what happens in one trial. A 70% chance does not mean an event must happen.'],
 workedExamples:['Fair coin: sample space {H,T}; P(H)=1/2.','Fair die: P(number greater than 4)=2/6=1/3.','Bag with 3 red,2 blue,5 green counters: P(blue)=2/10=1/5; P(not blue)=4/5.','If rain occurred on 18 of 60 comparable recorded days, experimental probability=18/60=0.3.'],
 misconceptions:['putting total outcomes over favourable outcomes','assuming past independent outcomes force the next result','treating experimental and theoretical probability as always identical','giving probabilities below 0 or above 1'],
 guidedPractice:['Find probabilities of even, prime and not-prime outcomes on a fair die; compare with a 30-roll experiment.'],
 independentPractice:['Ten coin/die/counter probability questions plus three everyday applications requiring interpretation rather than prediction certainty.'],
 mastery:{criterion:'At least 80% accuracy, valid sample spaces, probabilities in [0,1], and clear distinction between likelihood and certainty.',status:'DEEP_WHEN_PASSED'},boardReady:true
}
];

export function getJss2MathDeepLesson(topicId:string){return jss2MathematicsDeepLessons.find(x=>x.topicId===topicId)}
