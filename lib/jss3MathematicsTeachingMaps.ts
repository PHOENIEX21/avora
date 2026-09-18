import type {TopicTeachingMap} from './deepTeachingArchitecture';
const t=(name:string,description:string,examples:string[])=>({name,description,examples});
const common=(governingIdea:string,types:ReturnType<typeof t>[],checks:string[]):TopicTeachingMap=>({standard:'JSS3 Mathematics deep-teaching map: activate prerequisites, define vocabulary, teach every listed form explicitly, model at least three varied examples per mapped type, explain every mathematical reason, connect procedures to BECE-level problem forms, then move through guided practice, independent practice, checking and mastery.',governingIdea,types,minimumRepresentativeExamples:3,noJumpChecks:checks});

export const jss3MathematicsTeachingMaps:Record<string,TopicTeachingMap>={
'Whole Numbers':common('Whole-number competence at JSS3 is not only calculation: learners must reason about place value, factors, multiples, powers, roots and estimation so they can choose efficient methods and judge whether an answer is reasonable.',[
 t('Place value and ordering','Read, write, compare and order large whole numbers using positional value.',['7,045,302 in words and place values','order 905,060; 950,006; 905,600','value of 8 in 18,472,905']),
 t('Factors, multiples and divisibility','Use factor/multiple structure and divisibility tests to reason efficiently.',['list factors of 72','first common multiples of 12 and 18','test 4,536 for divisibility by 3, 4, 9 and 11']),
 t('Powers, squares, cubes and roots','Interpret indices and inverse root relationships in whole-number contexts.',['12² and √144','5³ and ∛125','compare 2⁵ and 4³']),
 t('Approximation and estimation','Round strategically and use estimates to test exact calculations.',['48,972 to nearest thousand','estimate 398×51','estimate 8,046÷197'])],
 ['re-establish place value before large-number shortcuts','define factor, multiple, square, cube, root and power','explain divisibility tests as place-value consequences where appropriate','use estimation to check reasonableness rather than treat it as a separate ritual']),

'Rational and non-rational numbers':common('Number classification depends on representation: rational numbers can be written as a ratio of integers and have terminating or recurring decimals, while irrational numbers cannot and have non-terminating non-recurring decimals.',[
 t('Classifying rational numbers','Recognise integers, fractions, terminating decimals and recurring decimals as rational.',['−7','3/8','0.125 and 0.333…']),
 t('Recognising irrational numbers','Identify common irrational forms and distinguish them from unsimplified rational roots.',['√2','π','√49 versus √50']),
 t('Number-line comparison','Locate or estimate rational and irrational values to compare them.',['compare √5 and 2.3','place π between 3.1 and 3.2','order −√4, −1.5, 0, √3']),
 t('Operations/estimation with surds or irrational approximations','Use suitable decimal approximations when exact irrational forms cannot be combined at this level.',['estimate 2+√3','approximate π×7','compare √10+1 with 4.2'])],
 ['define integer, fraction, ratio, terminating, recurring and irrational','do not teach “has a square-root sign = irrational”; simplify perfect-square roots first','show why every integer is rational by writing n/1','state when an answer is exact and when it is approximate']),

'Addition of numbers in base 2 numerals':common('Binary addition follows place value exactly like denary addition, but each column has only 0 and 1, so 1+1 produces 10₂: write 0 and carry 1 to the next power of two.',[
 t('Addition without carrying','Add aligned binary digits where no column total reaches 2.',['1010₂+0101₂','1001₂+0010₂','10100₂+00011₂']),
 t('Single/multiple carrying','Regroup whenever a column total is 2 or 3.',['1011₂+0110₂','1111₂+0001₂','101101₂+11101₂']),
 t('Three or more addends','Track carries when several binary numbers are added.',['101₂+10₂+1₂','111₂+101₂+11₂','1001₂+111₂+101₂']),
 t('Verification by denary conversion','Convert operands and sum to base 10 to check meaning.',['1101₂+101₂','10110₂+1111₂','111001₂+10111₂'])],
 ['define binary place values 1,2,4,8,…','derive 1+1=10₂ from place value instead of memorising a table only','align corresponding powers of two','carry the quotient/base value correctly','verify representative work in denary']),

'Subtraction of numbers in base 2 numerals':common('Binary subtraction uses the same place-value conservation as denary subtraction; borrowing one unit from the next binary column gives 10₂ in the current column, which equals two units there.',[
 t('Subtraction without borrowing','Subtract where each top digit is at least the lower digit.',['1110₂−0100₂','1011₂−0010₂','11010₂−01010₂']),
 t('Single borrowing','Borrow from the next power-of-two column and regroup it as 10₂.',['1010₂−0011₂','1100₂−0101₂','1001₂−0010₂']),
 t('Borrowing across zeros','Regroup through one or more zero columns carefully.',['10000₂−00001₂','10100₂−00111₂','100000₂−010011₂']),
 t('Verification','Check by inverse addition or denary conversion.',['1101₂−101₂','10010₂−111₂','11100₂−10101₂'])],
 ['explain what is being borrowed in place-value terms','show why borrowed 1 becomes 10₂ in the next column','do not copy denary borrowing digits blindly','use addition as inverse check','verify difficult borrow-across-zero examples']),

'Multiplication of numbers in base 2 numerals':common('Binary multiplication is repeated shifted addition: multiplying by 0 gives 0, multiplying by 1 reproduces the multiplicand, and each position shift represents multiplication by 2.',[
 t('Single-bit multiplier','Multiply by 0 or 1 to establish the basic products.',['1011₂×1₂','1101₂×0₂','100101₂×1₂']),
 t('Two-bit multipliers','Build partial products and shift according to binary place value.',['101₂×11₂','110₂×10₂','111₂×11₂']),
 t('Larger multipliers','Use multiple partial products with correct alignment.',['1011₂×101₂','1101₂×110₂','1001₂×111₂']),
 t('Verification','Convert factors/product to denary or divide back where convenient.',['101₂×110₂','111₂×101₂','10010₂×11₂'])],
 ['define partial product and binary place shift','explain why a left shift multiplies by 2','align partial products by powers of two','separate multiplication errors from subsequent addition errors','verify representative products in base 10']),

'Division of numbers in base 2 numerals':common('Binary division asks how many times a binary divisor fits into successive place-value portions of the dividend; quotient digits are therefore only 0 or 1, and multiplication/subtraction verify each step.',[
 t('Exact simple division','Divide by powers of two or simple binary divisors with no remainder.',['1100₂÷10₂','1111₂÷11₂','10100₂÷100₂']),
 t('Long division','Build the quotient digit by digit using binary comparison and subtraction.',['10110₂÷11₂','11001₂÷101₂','111100₂÷110₂']),
 t('Division with remainder','State quotient and remainder in binary and interpret remainder < divisor.',['1011₂÷10₂','1110₂÷100₂','10001₂÷11₂']),
 t('Verification','Check dividend=divisor×quotient+remainder.',['11010₂÷10₂','10101₂÷100₂','11101₂÷101₂'])],
 ['define dividend, divisor, quotient and remainder','explain why quotient digits are only 0/1','compare binary magnitudes before subtracting','require remainder smaller than divisor','verify using multiplication plus remainder']),

'Factorization':common('Factorisation reverses expansion. A correct factorisation preserves the expression exactly and can always be verified by expanding the proposed factors.',[
 t('Greatest common factor','Extract the greatest numerical and variable factor shared by every term.',['12x+18','15a²−20a','18xy+24x²']),
 t('Grouping','Regroup four terms so a common binomial factor appears.',['ax+ay+bx+by','2x²+6x+x+3','3ab−6a+2b−4']),
 t('Quadratic trinomial a=1','Choose two numbers whose sum is b and product is c.',['x²+7x+12','x²−5x+6','x²+x−12']),
 t('Quadratic trinomial a≠1','Use ac, split the middle term and factor by grouping.',['2x²+7x+3','3x²+10x+8','6x²−x−2']),
 t('Difference of two squares','Recognise A²−B²=(A−B)(A+B) and distinguish non-examples.',['x²−49','9y²−16','25a²−b²']),
 t('Solving quadratic equations by factorisation','Rearrange to zero, factorise, apply zero-product principle and check roots.',['x²+6=5x','2x²+7x+3=0','9y²=25'])],
 ['define variable, coefficient, constant, term, factor, product, sum and quadratic','identify a,b,c only after standard form is established','show candidate factor pairs including at least one failure','explain ac method rather than pattern-match it','verify factors by expansion','explain zero-product principle before solving factor equations']),

'Simple equations involving fractions':common('Fractional equations are solved by preserving equality while removing denominators through multiplication by a common multiple; “cross multiplication” is a derived shortcut, not a magic rule.',[
 t('One fractional term','Undo division using multiplication or multiply both sides by the denominator.',['x/5=7','(x+3)/4=6','2x/3=10']),
 t('Several terms with numerical denominators','Use the LCM of denominators to clear every fraction at once.',['x/2+x/3=10','(x−1)/4+3/2=5','2x/5−x/2=3']),
 t('Variable expression in numerator','Clear denominators before expanding/collecting.',['(2x+1)/3=(x−2)/2','(x+4)/5−(x−1)/2=1','3(x−2)/4=(x+5)/6']),
 t('Fractional word equations','Translate rates, shares or parts into an equation then solve and interpret.',['half a number plus 7 is 19','one-third of a number exceeds one-fifth by 8','fraction of a journey remaining'])],
 ['define numerator, denominator, equivalent equation and LCM','state denominator restrictions where relevant','show why multiplying every term by the LCM preserves equality','apply the multiplier to every term, not selected fractions','verify the solution in the original fractional equation']),

'Simultaneous linear equations':common('A simultaneous solution is one ordered pair that satisfies both linear equations. Elimination and substitution are justified transformations of the same pair of relationships, while graphs show the pair as an intersection.',[
 t('Immediate elimination','Add/subtract equations when a variable already has equal or opposite coefficients.',['x+y=9; x−y=1','2x+3y=13; 2x−y=5','4a+b=11; 4a−3b=3']),
 t('Multiply one equation','Scale every term of one equation to create a matching coefficient.',['x+2y=8; 2x+3y=13','3x+y=11; x−2y=0','2a+5b=19; a+2b=8']),
 t('Multiply both equations','Use an LCM/common coefficient when neither equation matches conveniently.',['2x+3y=11; 3x+2y=9','4x+5y=23; 6x−7y=5','3a−4b=2; 5a+6b=34']),
 t('Substitution','Isolate or use an already isolated variable and replace it with an equal expression.',['y=2x+1; x+y=10','x=7−y; 2x−3y=4','3a+b=14; b=a−2']),
 t('Graphical solution','Plot both linear equations and read/verify their intersection.',['x+y=6 and x−y=2','2x+y=8 and x+y=5','y=2x−1 and y=−x+5']),
 t('Word problems','Define two unknowns, form two equations, solve, then interpret units/context.',['ticket prices from two purchases','ages with sum/difference','two item prices from quantity totals'])],
 ['define simultaneous and ordered pair','explain why a variable is chosen for elimination','explain every multiplier using target coefficients/LCM','multiply every term in an equation','explain why addition/subtraction cancels the chosen variable','after first unknown, explain substitution for the second','check the pair in both original equations']),

'Similar Shapes':common('Similar figures have equal corresponding angles and proportional corresponding lengths. Lengths scale by k, areas by k², and corresponding parts must be matched in the same order.',[
 t('Recognising similarity','Use angle equality and side proportionality to decide whether figures are similar.',['triangles 3-4-5 and 6-8-10','rectangles 4×6 and 10×15','two equiangular triangles with proportional sides']),
 t('Finding missing corresponding lengths','Form a consistent scale factor from matched sides.',['4 cm→10 cm, 6 cm→?','triangle sides 3,5,7 scaled to largest 14','map/model dimensions']),
 t('Perimeter scale','Use the same linear scale factor for perimeters.',['perimeter 18 scaled by 3','similar rectangles perimeters 24 and ? at k=1.5','find k from perimeters 35 and 70']),
 t('Area scale','Use k² and distinguish it from the linear factor.',['length factor 2 ⇒ area factor 4','areas 36 and 81 ⇒ length factor 3/2','similar triangles with one area and k']),
 t('Applied similarity','Use indirect measurement or diagrams with parallel lines/shadows.',['height from shadow ratio','scale drawing room dimensions','similar triangles in a diagram'])],
 ['define corresponding parts and scale factor','match vertices/sides consistently before forming ratios','explain why area scales as k² using two dimensions','do not use perimeter/area ratios interchangeably','verify missing dimensions by reverse ratio']),

'Trigonometry':common('Right-triangle trigonometry relates an acute angle to ratios of side lengths. The labels opposite/adjacent depend on the chosen angle, while hypotenuse is always opposite the right angle.',[
 t('Identifying sides relative to an angle','Label hypotenuse, opposite and adjacent correctly before choosing a ratio.',['right triangle with θ at base','same triangle viewed from other acute angle','diagram with rotated orientation']),
 t('Sine','Use sinθ=opposite/hypotenuse when those quantities are relevant.',['find opposite with θ=30°, hyp=12','find hypotenuse from opposite 8 and θ=40°','find θ from opposite/hypotenuse ratio']),
 t('Cosine','Use cosθ=adjacent/hypotenuse.',['find adjacent with θ=60°, hyp=14','find hypotenuse from adjacent 9 and θ=35°','find θ from adjacent/hypotenuse ratio']),
 t('Tangent','Use tanθ=opposite/adjacent.',['find height from horizontal 20 m and 35°','find adjacent from opposite 6 and θ=25°','find θ from opposite 12, adjacent 9']),
 t('Angles of elevation/depression','Translate line-of-sight situations into right triangles before calculating.',['tree height from elevation angle','cliff viewed from boat','depression from building to car'])],
 ['define right angle, acute angle, hypotenuse, opposite and adjacent','relabel opposite/adjacent for the selected reference angle','explain ratio choice from known/unknown sides rather than SOHCAHTOA alone','draw/interpret a triangle before calculation in word problems','state units and check whether side/angle magnitude is sensible']),

'Area of plane figures':common('Area measures two-dimensional coverage. Each formula follows from decomposition/rearrangement, and the correct perpendicular height or radius must match the chosen figure dimensions.',[
 t('Triangles','Use A=1/2bh with perpendicular height.',['b=12,h=7','right triangle legs 9 and 5','find missing height from area 54 and base 12']),
 t('Parallelograms','Use A=bh and distinguish slant side from height.',['b=15,h=8','find base from A=96,h=6','diagram with slant side 10,height 7']),
 t('Trapezia','Use A=1/2(a+b)h for parallel sides a,b.',['a=8,b=14,h=5','find h from A=72,a=10,b=14','irregular orientation with parallel sides marked']),
 t('Circles','Use A=πr² and convert diameter to radius where needed.',['r=7','diameter 20','find r from area 154 using 22/7']),
 t('Sectors','Treat the sector as θ/360 of a circle.',['90° sector r=8','120° sector r=6','find θ from sector area and radius']),
 t('Composite figures','Decompose into known shapes and add/subtract areas.',['rectangle plus semicircle','rectangle with circular hole','compound triangle/trapezium figure'])],
 ['derive/justify formulas through rearrangement where feasible','define perpendicular height and parallel sides','square linear scale and units for area','convert diameter to radius before circle formula','explain θ/360 in sector area','draw decomposition lines and track included/excluded regions']),

'Construction':common('Geometric construction creates exact relationships with straightedge and compasses. Visible arcs are evidence of the geometric reasoning, not decoration.',[
 t('Constructing 45°','Construct 90° then bisect it.',['45° at point A on a line','45° inside a given angle region','45° from a vertical ray']),
 t('Constructing 30°','Construct 60° then bisect it.',['30° at a baseline point','30° from a given ray','construct 30° inside a triangle setup']),
 t('Copying an angle','Transfer an arc and its chord distance without measuring the original angle.',['copy an acute angle','copy an obtuse angle','copy an angle to a new baseline orientation']),
 t('Plane-shape construction','Combine side lengths, angle constructions, perpendicular/parallel relations and equal radii.',['construct triangle from side/angle data','construct rhombus/kite from given data','construct quadrilateral from stated conditions'])],
 ['state allowed instruments and purpose','keep compass radius unchanged during transfer steps','explain why bisecting 90° gives 45° and 60° gives 30°','show visible arcs/labels','verify with measurement only after construction, not as the construction method']),

'Measure of central tendency':common('Mean, median and mode describe centre in different ways, while range describes spread. Appropriate interpretation depends on distribution, frequency and outliers, not merely on calculation.',[
 t('Ungrouped mean','Add all observations and divide by their count.',['2,4,4,5,10','8,11,13,16','mean of five scores when one score is unknown']),
 t('Median','Order first; choose the middle value or mean of two middle values.',['3,1,9,5,7','4,8,2,10','frequency list expanded mentally']),
 t('Mode','Identify highest frequency, allowing no mode or multiple modes.',['2,2,3,4,4,4','1,2,3,4','5,5,6,6,7']),
 t('Range','Subtract minimum from maximum and distinguish spread from centre.',['3,8,9,20','temperatures −3 to 12','compare two data sets with same mean']),
 t('Frequency-table mean','Use Σfx/Σf and explain frequency weighting.',['scores 1-5 with frequencies','discrete number-of-children table','group comparison with frequency totals']),
 t('Interpretation and outliers','Choose/compare measures in context.',['salary data with one huge outlier','test scores with repeated modal mark','two classes same mean but different range'])],
 ['define observation, frequency, mean, median, mode, range and outlier','order values before median','explain Σfx as repeated addition compressed by frequency','do not assume every set has exactly one mode','distinguish centre from spread','justify which measure is representative in context']),

'Data presentation':common('A data display must preserve the underlying frequencies/proportions. For pie charts, the full data set corresponds to 360°, so every sector is a proportional part of that whole.',[
 t('Frequency to sector angle','Use frequency/total×360°.',['12 of 40→108°','25 of 100→90°','18 of 60→108°']),
 t('Percentage to sector angle','Use percentage/100×360°.',['20%→72°','35%→126°','12.5%→45°']),
 t('Sector angle back to frequency/percentage','Reverse the proportional relationship.',['72° of 250 people','144° as percentage','54° sector when total=120']),
 t('Constructing a pie chart','Calculate/check all sectors, then draw from the centre with labels/key.',['five-category school survey','household budget table','transport-mode frequencies']),
 t('Interpreting/comparing sectors','Recover proportions/counts and make only evidence-supported comparisons.',['largest/smallest category','difference between two sectors','combined proportion of two categories']),
 t('Choosing a suitable display','Recognise when pie charts are or are not appropriate.',['composition of budget','change over 12 months','comparing exact frequencies across many categories'])],
 ['define frequency, proportion, sector and central angle','show why 360° represents the whole','check sector angles sum to 360°','distinguish percentage, angle and frequency units','avoid causal claims from a chart alone','explain when a bar/line display would communicate better'])
};
