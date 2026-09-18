import type {TopicTeachingMap} from './deepTeachingArchitecture';

const t=(name:string,description:string,examples:string[])=>({name,description,examples});
const common=(governingIdea:string,types:ReturnType<typeof t>[],checks:string[]):TopicTeachingMap=>({standard:'JSS1 Mathematics deep-teaching map: establish vocabulary and prerequisites, teach every listed form explicitly, model at least three varied examples across the topic, then move from guided to independent work.',governingIdea,types,minimumRepresentativeExamples:3,noJumpChecks:checks});

export const jss1MathematicsTeachingMaps:Record<string,TopicTeachingMap>={
 'Whole Numbers':common('A digit has a face value, but its place determines its value; our base-ten system groups places in powers of ten.',[
  t('Reading and writing large numbers','Move between numerals and words while preserving zero placeholders.',['4,305,018','70,020,006','9,012,006,040']),
  t('Place value and digit value','Identify the place and actual value of a selected digit.',['63,405,090: value of 4','507,201,600: value of 7','8,040,003,012: value of 4']),
  t('Comparing and ordering','Compare digit counts first, then compare from the greatest place.',['6,040,000 vs 6,400,000','999,999 vs 1,000,000','7,020,300 vs 7,020,030']),
  t('Context problems','Interpret large quantities in money, population, distance or capacity.',['stadium capacities','state populations','budget totals'])
 ],['define digit, numeral, place and place value','show why zeros may be silent when read but cannot be dropped when written','compare from the highest place, not the units side']),
 'LCM (Least Common Multiple)':common('LCM is the first positive quantity at which repeating multiples meet.',[
  t('Listing multiples','List multiples until the first common positive multiple appears.',['LCM(4,6)','LCM(6,8)','LCM(9,12)']),
  t('Prime-factor method','Use every required prime at its greatest power.',['12 and 18','15 and 20','8,12 and 18']),
  t('Repeated-event problems','Translate “together again/next same time” into LCM.',['bells every 4 and 6 min','buses every 12 and 18 min','lights flash every 6,8,12 sec'])
 ],['define factor and multiple separately','explain why the least common multiple is selected','explain why greatest prime powers are needed']),
 'HCF (Highest Common Factor)':common('HCF is the greatest size or number that divides every given quantity exactly.',[
  t('Listing factors','List factors and choose the greatest shared one.',['HCF(18,24)','HCF(20,30)','HCF(24,36)']),
  t('Prime-factor method','Keep only common primes at their smallest powers.',['36 and 48','72 and 96','60,90 and 150']),
  t('Equal-grouping/cutting problems','Recognise largest identical groups, lengths or packets as HCF contexts.',['24 oranges and 36 apples','48m and 60m ribbons','72 red and 96 blue beads'])
 ],['define divides exactly and factor','contrast HCF contexts with LCM contexts','explain why smallest common prime powers are used']),
 'Counting in Base 2':common('Binary is a place-value system with base 2, so only 0 and 1 are digits and each place is twice the value to its right.',[
  t('Binary counting sequence','Regroup two units of a place into one unit of the next place.',['0₂ to 111₂','111₂ to 1000₂','1011₂ to 1100₂']),
  t('Binary place values','Read positions as 1,2,4,8,16… from right to left.',['101₂','1101₂','10010₂']),
  t('Concrete grouping','Use pairs/bundles to make carrying in base 2 visible.',['5 counters','8 counters','13 counters'])
 ],['define base and place value','explain why digit 2 cannot appear in a binary numeral','distinguish 10₂ from decimal ten']),
 'Conversion of Base 10 Numerals to Binary Numbers':common('A decimal number can be expressed uniquely as a sum of powers of two.',[
  t('Powers-of-two decomposition','Select powers of two that sum to the decimal number.',['6₁₀=110₂','9₁₀=1001₂','13₁₀=1101₂']),
  t('Repeated division by 2','Divide repeatedly, record remainders and read upward.',['10₁₀','18₁₀','25₁₀']),
  t('Verification','Convert the binary answer back using place values.',['1010₂→10','10010₂→18','11001₂→25'])
 ],['explain why powers of two are used','explain why remainders are read bottom-to-top','always verify by reconversion']),
 'Fractions: Types, Simplification and Equivalent Fractions':common('A fraction represents equal parts or a ratio; equivalent fractions name the same value even when numerators and denominators differ.',[
  t('Types of fractions','Recognise proper, improper and mixed fractions and convert where required.',['3/5','9/4','2 1/3']),
  t('Simplifying fractions','Divide numerator and denominator by common factors without changing value.',['12/18','24/36','45/60']),
  t('Equivalent fractions','Multiply or divide both parts by the same non-zero number.',['1/2=2/4','3/5=9/15','12/20=3/5']),
  t('Ordering/comparing fractions','Use common denominators or valid cross-products.',['2/3 vs 3/5','5/8,2/3,3/4','7/10 vs 11/15']),
  t('Fraction-decimal-percentage links','Move between equivalent representations.',['3/4=0.75=75%','0.35=7/20=35%','45%=9/20'])
 ],['define numerator and denominator','explain why the same non-zero factor must affect numerator and denominator','do not use denominator size alone to compare unlike fractions']),
 'Basic Operations on Whole Numbers':common('Whole-number operations describe combining, separating, repeated addition and equal sharing; place value governs written algorithms.',[
  t('Addition','Align equal place values and regroup when a place reaches ten.',['3,748+2,596','56,709+8,645','405,090+76,912']),
  t('Subtraction','Align places and regroup from a higher place when necessary.',['8,004−2,786','50,000−18,765','703,020−94,856']),
  t('Multiplication','Use place value/distributive reasoning behind the standard algorithm.',['324×6','208×34','1,205×27']),
  t('Division','Interpret division as sharing/grouping and connect quotient×divisor+remainder to dividend.',['864÷8','1,575÷15','2,005÷24']),
  t('Mixed/context operations','Choose the operation from the relationship described, not from keywords alone.',['shopping total/change','equal packs','multi-step school budget'])
 ],['align place values','explain every regrouping/carry/borrow as place-value exchange','estimate to check reasonableness']),
 'Addition and Subtraction of Fractions':common('Fractions can be added or subtracted directly only when they refer to equal-sized parts; common denominators create equal-sized parts.',[
  t('Like denominators','Keep the common denominator and combine numerators.',['2/7+3/7','6/11−4/11','5/8+1/8']),
  t('Unlike denominators','Find a common denominator, rewrite equivalent fractions, then operate.',['1/2+1/3','5/6−1/4','3/5+7/10']),
  t('Mixed numbers','Convert or regroup carefully before operating.',['1 1/2+2 1/3','4 1/4−2 2/3','3 3/5+1 7/10']),
  t('Context problems','Add/subtract fractional measures or portions.',['recipe quantities','distance covered/remaining','shared water volume'])
 ],['explain why denominators cannot simply be added','show how LCM creates equal-sized parts','simplify final answers and check size']),
 'Multiplication and Division of Fractions':common('Multiplication finds a fraction of a quantity; division asks how many groups of one fractional size fit into another.',[
  t('Fraction × whole number','Interpret repeated groups or a fraction of a whole.',['3/5×20','7×2/3','5/8 of 32']),
  t('Fraction × fraction','Multiply numerators and denominators, simplifying before/after.',['2/3×3/5','7/8×4/21','5/6×9/10']),
  t('Fraction ÷ fraction','Multiply by the reciprocal and explain why reciprocal multiplication undoes division.',['3/4÷1/2','5/6÷10/9','2 1/4÷3/5']),
  t('Context problems','Interpret “of” and equal fractional groups.',['fraction of class','recipe scaling','lengths cut into fractional pieces'])
 ],['define reciprocal','explain why division becomes multiplication by reciprocal','convert mixed numbers before multiplying/dividing']),
 'Estimation and Approximation':common('Approximation replaces a value with a nearby useful value; estimation uses approximations to judge likely size and check answers.',[
  t('Rounding whole numbers','Use the next digit to decide whether the target digit stays or increases.',['4,367 nearest 10','58,649 nearest 100','2,549,800 nearest 1000']),
  t('Decimal places/significant figures','Round to specified precision while preserving place value.',['6.784 to 2 d.p.','0.04726 to 2 s.f.','125.49 to 3 s.f.']),
  t('Estimating operations','Round compatible values before calculating.',['398+602','49×21','1,986÷51']),
  t('Checking reasonableness','Compare exact/calculator answer with an estimate.',['shopping bill','area estimate','division quotient'])
 ],['define approximation, estimate, decimal place and significant figure before use','explain the halfway/next-digit rounding rule','state the requested degree of accuracy']),
 'Binary Addition':common('Binary addition follows place value exactly like decimal addition, but regrouping occurs at two rather than ten.',[
  t('No-carry addition','Add columns where no column reaches 2.',['100₂+011₂','1010₂+0101₂','10001₂+00110₂']),
  t('Single/multiple carries','Use 1+1=10₂ and carry one to the next binary place.',['11₂+1₂','101₂+11₂','1111₂+1₂']),
  t('Verification in base ten','Convert operands and answer to decimal to check.',['101₂+11₂','110₂+101₂','1001₂+111₂'])
 ],['establish binary place values first','explain 1+1=10₂ as regrouping two units','align binary place values']),
 'Binary Subtraction':common('Binary subtraction preserves value through regrouping: borrowing one from the next place gives 10₂, which equals two of the current place.',[
  t('No-borrow subtraction','Subtract aligned binary digits directly.',['111₂−101₂','1101₂−1001₂','10110₂−10010₂']),
  t('Borrowing','Regroup one higher binary unit as two lower units.',['100₂−1₂','1010₂−11₂','10000₂−1011₂']),
  t('Verification','Check by binary addition or decimal conversion.',['1010₂−11₂','1100₂−101₂','10001₂−111₂'])
 ],['explain why borrowed 1 becomes 10₂','align place values','verify subtraction by adding difference and subtrahend']),
 'Binary Multiplication':common('Binary multiplication uses the same distributive/place-value structure as decimal multiplication, with partial products containing only 0 or shifted copies.',[
  t('Multiply by one binary digit','0 gives zero; 1 reproduces the multiplicand.',['101₂×1₂','111₂×0₂','1001₂×1₂']),
  t('Multi-digit binary multiplication','Create shifted partial products then add in base 2.',['101₂×10₂','11₂×11₂','101₂×101₂']),
  t('Verification','Check the product in decimal.',['101₂×10₂','11₂×11₂','110₂×101₂'])
 ],['explain left shift as multiplying by 2','keep partial products aligned','use binary addition rules for the final sum']),
 'Use of Symbols and Algebraic Expressions':common('Algebra uses symbols to represent quantities and relationships; a symbol has meaning from its context, not because letters are special numbers.',[
  t('Variables and constants','Distinguish changing/unknown quantities from fixed numbers.',['x+5','3a−7','p=2l+2w']),
  t('Translating words to expressions','Represent verbal relationships accurately.',['five more than n → n+5','three times x →3x','half of y less 2 → y/2−2']),
  t('Terms and coefficients','Identify terms, coefficients and constants.',['4x+7','3a−2b+5','x+6y−9']),
  t('Substitution/evaluation','Replace variables with given values using correct operation order.',['2x+3 for x=4','a²+b for a=3,b=2','3m−2n for m=5,n=4'])
 ],['define variable, constant, term, coefficient and expression','explain implied multiplication in 3x','use brackets when substituting negative values']),
 'Simplification of Algebraic Expressions':common('Only like terms represent the same algebraic quantity and can be combined by adding/subtracting their coefficients.',[
  t('Collecting like terms','Group terms with identical variable parts.',['3x+5x','4a+3−2a+7','5x+2y−3x+y']),
  t('Removing brackets','Use distributive multiplication before collecting terms.',['3(x+4)','2(3a−5)+a','−2(x−3)+4x']),
  t('Expressions with several variables','Keep unlike variable parts separate.',['2a+3b+a−b','4xy+2x−xy','3m²+2m−m²+5m']),
  t('Verification by substitution','Check original and simplified forms at a chosen value.',['3x+2x vs 5x','2(a+3)+a vs 3a+6','4y−2+y vs5y−2'])
 ],['define like terms by variable part and powers','explain why x and x² are unlike','distribute signs to every term inside brackets']),
 'Simple Equations':common('An equation states that two expressions are equal; solving preserves that equality while isolating the unknown.',[
  t('One-step addition/subtraction equations','Undo addition/subtraction with the inverse operation on both sides.',['x+5=12','y−7=9','18=a+6']),
  t('One-step multiplication/division equations','Undo multiplication/division equally on both sides.',['3x=21','y/4=6','5a=35']),
  t('Two-step equations','Reverse operations in a logical order while preserving balance.',['3x+5=17','2y−7=15','x/3+4=9']),
  t('Unknowns on both sides / simple brackets','Simplify and collect unknown terms without breaking equality.',['3x+2=x+10','2(x+3)=14','4y−5=2y+9']),
  t('Word equations','Define the unknown, form an equation, solve and interpret.',['number plus 8 is 21','three equal tickets cost ₦2400','perimeter problem'])
 ],['define equation, equality, unknown and inverse operation','never teach sign-changing across = as magic; derive it from equal operations on both sides','substitute solution into the original equation']),
 'Plane Shapes':common('Plane shapes are classified by defining properties such as number of sides, angle relationships, parallel sides and symmetry.',[
  t('Triangles','Classify by sides and by angles.',['equilateral/isosceles/scalene','acute/right/obtuse triangles','identify from measurements']),
  t('Quadrilaterals','Distinguish square, rectangle, parallelogram, rhombus, kite and trapezium by properties.',['square vs rhombus','rectangle vs parallelogram','kite vs trapezium']),
  t('Polygons and circles','Recognise common polygons and basic circle parts.',['pentagon/hexagon/octagon','radius/diameter/chord','regular vs irregular polygon']),
  t('Symmetry','Identify line and rotational symmetry where appropriate.',['square','rectangle','equilateral triangle'])
 ],['define side, vertex, angle, parallel and perpendicular','classify using properties rather than appearance','show that a shape may belong to more than one broader category']),
 'Three-Dimensional Figures':common('Three-dimensional figures occupy space and are described by faces/surfaces, edges and vertices; nets connect 3D objects to 2D layouts.',[
  t('Prisms/polyhedra','Identify faces, edges and vertices.',['cube','cuboid','triangular prism']),
  t('Curved solids','Distinguish cylinder, cone and sphere and their surfaces.',['cylinder','cone','sphere']),
  t('Nets','Match or construct valid nets for solids.',['cube net','cuboid net','triangular prism net']),
  t('Real-life identification','Connect objects to ideal geometric solids.',['tin can→cylinder','dice→cube','football→sphere'])
 ],['define face/surface, edge and vertex','do not invent edges/vertices where curved surfaces meet incorrectly','use physical/mental folding to validate nets']),
 'Geometric Constructions':common('A geometric construction creates exact relationships from compass-and-straightedge operations, not visual guessing.',[
  t('Bisecting a line segment','Construct the perpendicular bisector from equal-radius arcs.',['bisect 8cm','bisect 6.5cm','find midpoint without ruler measurement']),
  t('Bisecting an angle','Use equal arcs to construct two equal angles.',['60° angle','arbitrary acute angle','obtuse angle']),
  t('Constructing standard angles/perpendiculars','Build exact angles and right-angle relationships.',['60°','90°','45° by bisection']),
  t('Simple triangles','Construct from given side/angle information at JSS1 level.',['SSS triangle','given base and two angles','isosceles triangle'])
 ],['explain why equal-radius arcs establish equality','keep compass radius unchanged when required','distinguish drawing from exact construction']),
 'Angles':common('Angle facts arise from turns, straight lines, points, intersecting lines and parallel-line relationships.',[
  t('Measuring/classifying angles','Use a protractor and classify acute/right/obtuse/reflex where required.',['35°','90°','125°']),
  t('Angles on a straight line/around a point','Use totals of 180° and 360°.',['x+137=180','90+110+x=360','adjacent angles 3x and 2x on line']),
  t('Vertically opposite angles','Use equality created by intersecting straight lines.',['opposite to 72°','algebraic opposite angles','find adjacent then opposite']),
  t('Parallel-line relationships','Recognise corresponding, alternate and co-interior relationships where in scope.',['corresponding 65°','alternate x','co-interior x+118=180'])
 ],['define vertex and arms','read the correct protractor scale','name the angle property used instead of merely calculating']),
 'Need for Statistics':common('Statistics turns collected data into evidence for description, planning and cautious prediction; data inform decisions but do not guarantee outcomes.',[
  t('Purpose of statistics','Identify how data support decisions.',['school enrolment planning','health-resource planning','sales records']),
  t('Planning and prediction','Use patterns while acknowledging uncertainty.',['rainfall planning','attendance trend','transport demand']),
  t('Chance/probability language','Describe uncertain events from impossible to certain.',['coin outcome','rolling a die','sun rising tomorrow'])
 ],['define data and statistics','separate evidence from opinion','explain why prediction is not certainty']),
 'Data Collection':common('Good data collection starts with a clear question, defined variable/population and consistent recording method.',[
  t('Tally/frequency collection','Record categories consistently and total frequencies.',['transport to school','favourite fruit','shoe sizes']),
  t('Numerical measurements','Record quantitative observations with units.',['heights','test scores','daily temperatures']),
  t('Categorical data','Define non-overlapping categories before collection.',['sports preference','transport mode','house colour']),
  t('Data-quality checks','Detect missing, duplicate or irrelevant entries.',['duplicate learner','missing score','unclear “other” category'])
 ],['define data, variable, category, frequency and tally','state the question before collecting','check totals against number of observations']),
 'Data Presentation':common('A presentation should preserve the data accurately and make patterns easier to see; median requires ordered data.',[
  t('Frequency tables','Organise raw observations into values/categories and counts.',['shoe sizes','test scores','transport modes']),
  t('Simple charts/graphs','Represent frequencies with an appropriate labelled display where required.',['bar chart','pictogram','simple line display']),
  t('Median — odd number of values','Order first, then choose the single middle value.',['3,8,5,2,7','12,4,9,6,1','10,10,11,12,40']),
  t('Median — even number of values','Order first, then average the two middle values.',['2,4,7,9','3,8,10,15,20,22','5,5,6,8'])
 ],['define raw data, frequency and median','order values before locating the middle','for even counts explain why two middle values must be averaged'])
};
