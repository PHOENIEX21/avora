export type TextbookChapter={chapter:number;title:string;sections:string[]};

// Siyavula Nigeria (NERDC) open Mathematics textbook scope. Textbook content on
// the online reader is CC BY; AVORA preserves attribution and uses this map to
// keep teaching in the published JSS sequence instead of inventing a syllabus.
export const siyavulaMathScope:Record<string,TextbookChapter[]>={
 JSS1:[
  {chapter:1,title:'Numbers big and small',sections:['The base ten number system','Place value','Powers of ten','How to add in groups of ten using place value','Counting in big numbers','Using large numbers in everyday life']},
  {chapter:2,title:'Highest common factor and lowest common multiple',sections:['Highest common factor','Lowest common multiple','Compare HCF and LCM','Practical applications']},
  {chapter:3,title:'Binary numbers',sections:['Powers of two','Converting between decimal and binary numbers']},
  {chapter:4,title:'Equivalent fractions',sections:['Types of fractions','Equivalent fractions','Comparing fractions','Decimal fractions','Percentages','Practical applications']},
  {chapter:5,title:'Addition and subtraction of integers',sections:['Revise place values','Addition and subtraction of large numbers','The number line','Addition and subtraction using the number line','Practical application']},
  {chapter:6,title:'Operations with fractions',sections:['Addition and subtraction','Multiplication and division','Practical applications']},
  {chapter:7,title:'Estimation and approximation',sections:['Estimation','Approximation and rounding off','Calculations','Practical applications']},
  {chapter:8,title:'Operations with binary numbers',sections:['Addition','Subtraction','Multiplication']},
  {chapter:9,title:'Using symbols',sections:['Open and closed number sentences','Solving open sentences that have variables','Using open sentences to solve problems']},
  {chapter:10,title:'Simplification of algebraic expressions',sections:['Algebraic expressions and terms','Working with algebraic expressions','Adding and subtracting like terms','Working with brackets in algebraic expressions','Working with brackets using the distributive law','Practical applications']},
  {chapter:11,title:'Simple equations',sections:['Formulating equations','Solving equations']},
  {chapter:12,title:'Two dimensional shapes',sections:['Types and properties of shapes','Perimeters','Areas','Practical applications']},
  {chapter:13,title:'Three dimensional objects',sections:['Cubes and cuboids','Pyramids and cones','Cylinders and spheres','Practical applications']},
  {chapter:14,title:'Constructions',sections:['Perpendicular lines','Parallel lines','Line bisector','Perpendicular bisector','Right angle','Sixty degree angle']},
  {chapter:15,title:'Angles',sections:['Measuring and labeling angles','Angles on intersecting lines','Angles with parallel lines','Practical applications']},
  {chapter:16,title:'Need for statistics',sections:['The purposes of statistics','Introduction to probability','Practical applications']},
  {chapter:17,title:'Data collection and presentation',sections:['Collecting and organising data','Summarising data','Presenting data']}
 ],
 JSS2:[
  {chapter:1,title:'Numbers big and small',sections:['Standard form','Prime factorisation','Applications of prime factorisation','Practical applications']},
  {chapter:2,title:'Fractions',sections:['Fractions, decimals and percentages','Ratio and proportion','Practical applications']},
  {chapter:3,title:'Transactions in the home and office',sections:['Commercial transactions','Household expenditure']},
  {chapter:4,title:'Approximation',sections:['Rounding off','Significant figures','Practical applications']},
  {chapter:5,title:'Multiplication and division',sections:['Squares and square roots','Multiplication and division of integers','Practical applications']},
  {chapter:6,title:'Algebraic expressions',sections:['Simplifying algebraic expressions','Basic factorising','Simplifying algebraic fractions','Indices','Practical applications']},
  {chapter:7,title:'Simple equations',sections:['Solving equations','Practical applications']},
  {chapter:8,title:'Linear inequalities',sections:['Introduction to inequalities','Solving inequalities','Inequalities on a number line','Practical applications']},
  {chapter:9,title:'Graphs',sections:['The Cartesian plane','Plotting graphs','Practical applications']},
  {chapter:10,title:'Plane shapes',sections:['Properties of shapes','The theorem of Pythagoras','Scale drawings','Practical applications']},
  {chapter:11,title:'Constructions',sections:['Triangles','Angles']},
  {chapter:12,title:'Angles',sections:['Sum of angles in polygons','Angles of elevation and depression','Practical applications']},
  {chapter:13,title:'Bearing',sections:['Cardinal points','Position','Scale drawing and distances']},
  {chapter:14,title:'Data presentation',sections:['Data collection','Organising data','Summary statistics','Graphical representation of data','Practical applications']},
  {chapter:15,title:'Probability',sections:['Probability basics','Probability calculations','Practical applications']}
 ],
 JSS3:[
  {chapter:1,title:'Numbers',sections:['Binary operations','Applications of binary numbers','Interpretation of word problems','Order of operations','Direct and inverse proportions','Compound interest']},
  {chapter:2,title:'Rational and irrational numbers',sections:['Rational and irrational numbers','Pi']},
  {chapter:3,title:'Binary numbers',sections:['Addition and subtraction','Multiplication','Division']},
  {chapter:4,title:'Factorisation',sections:['Revision of common factors','Compound common factors','Quadratic trinomials','Difference of two squares','Practical applications']},
  {chapter:5,title:'Simple equations',sections:['Equations with fractions','Practical applications']},
  {chapter:6,title:'Simultaneous linear equations',sections:['Tables and graphs','Elimination method','Substitution method','Practical applications']},
  {chapter:7,title:'Area of plane figures',sections:['Area of quadrilaterals','Area of triangles','Area of circles and sectors','Practical applications']},
  {chapter:8,title:'Constructions',sections:['Constructions of angles','Constructions of shapes']},
  {chapter:9,title:'Similar shapes',sections:['Similarity','Scale factors','Practical applications']},
  {chapter:10,title:'Trigonometry',sections:['Trigonometric ratios','Practical applications']},
  {chapter:11,title:'Summary statistics',sections:['Revise mean, mode and median','Revise range','Practical applications']},
  {chapter:12,title:'Data presentation',sections:['Revision of pie charts','Practical applications']}
 ]
};

const topicMap:Record<string,number[]>={
 'Number & Numeration':[1,2,3], 'Ratio & Proportion':[1], 'Commercial Arithmetic':[1],
 'Algebra':[4,5,6], 'Geometry & Mensuration':[7,8,9,10], 'Geometry & Measurement':[7,8,9,10],
 'Measurement':[7,9], 'Simultaneous equations':[6], 'Simultaneous linear equations':[6], 'Simple equations':[5,6], 'Statistics & Data':[11,12], 'Data & Statistics':[11,12], 'Probability':[12]
};
export function textbookChapters(classLevel:string,topic?:string){
 const all=siyavulaMathScope[classLevel]||siyavulaMathScope.JSS3;
 if(!topic)return all;
 const nums=topicMap[topic];return nums?all.filter(x=>nums.includes(x.chapter)):all;
}
export const siyavulaAttribution='Mathematics scope/content aligned to Siyavula Nigeria JSS open textbooks (CC BY), NERDC curriculum. Adapted by AVORA with attribution.';
