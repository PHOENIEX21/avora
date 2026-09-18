import type {TutorUnit} from './tutorCurriculum';
import {keyTermsForTeaching} from './academicVocabulary';
import {jss1MathematicsTeachingMaps} from './jss1MathematicsTeachingMaps';
import {jss2MathematicsTeachingMaps} from './jss2MathematicsTeachingMaps';
import {jss3MathematicsTeachingMaps} from './jss3MathematicsTeachingMaps';
import {jss1EnglishTeachingMaps} from './jss1EnglishTeachingMaps';
import {jss2EnglishTeachingMaps} from './jss2EnglishTeachingMaps';
import {jss3EnglishTeachingMaps} from './jss3EnglishTeachingMaps';

export type TopicType={name:string;description:string;examples?:string[]};
export type TopicTeachingMap={
 standard:string;
 governingIdea:string;
 types:TopicType[];
 minimumRepresentativeExamples:number;
 noJumpChecks:string[];
};

const maps:Array<{match:RegExp;classLevel?:string;map:TopicTeachingMap}>=[
 {
  match:/factorization|factorisation|algebraic expressions: expansion and factorisation/i,
  map:{
   standard:'Teach factorisation as the reverse of expansion. Before quadratic work, establish variable, coefficient, constant, term, factor, product and sum. For a quadratic expression use ax²+bx+c; for a quadratic equation use ax²+bx+c=0 with a≠0.',
   governingIdea:'Every factorisation must be justified by multiplication: the proposed factors are correct only if expanding them reproduces the original expression.',
   types:[
    {name:'Common factor',description:'Identify the greatest factor shared by every term and explain why it can be taken outside brackets.'},
    {name:'Grouping / compound common factors',description:'Group terms so a common bracket appears, then factor that common bracket.'},
    {name:'Quadratic trinomial with a = 1',description:'Find two numbers whose sum is b and whose product is c.'},
    {name:'Quadratic trinomial with a ≠ 1',description:'Find two numbers whose sum is b and whose product is ac, split the middle term, then factor by grouping.'},
    {name:'Difference of two squares',description:'Recognise a²−b² and explain why it becomes (a−b)(a+b).'},
    {name:'Equation requiring rearrangement',description:'If solving an equation by factorisation, first rearrange it into ax²+bx+c=0 while preserving equality, then use the zero-product principle.'}
   ],
   minimumRepresentativeExamples:3,
   noJumpChecks:['define every algebraic term before using it','identify a, b and c only after the expression/equation is in the required standard form','explain where candidate factor numbers come from','show at least one candidate pair that fails and say why','expand the factors to verify','when solving an equation, explain the zero-product principle before setting factors equal to zero']
  }
 },
 {
  match:/simultaneous.*equation/i,
  map:{
   standard:'Teach the meaning of simultaneous first: one pair of values must satisfy both equations at the same time. Connect algebraic and graphical meaning before procedures.',
   governingIdea:'Elimination deliberately creates equal or opposite coefficients so one unknown becomes zero when equations are added or subtracted. Substitution replaces an unknown with an equal expression.',
   types:[
    {name:'Immediate elimination',description:'A variable already has equal/opposite coefficients.'},
    {name:'One equation must be multiplied',description:'Create matching coefficients by multiplying every term of one equation.'},
    {name:'Both equations must be multiplied',description:'Use a common multiple to create matching coefficients in both equations.'},
    {name:'Substitution',description:'Use an already isolated variable or rearrange one equation first.'},
    {name:'Graphs',description:'Interpret the solution as the intersection point of two straight lines.'},
    {name:'Word problems',description:'Define unknowns, form two equations, solve and interpret the values in context.'}
   ],
   minimumRepresentativeExamples:3,
   noJumpChecks:['explain why a particular variable is chosen for elimination','explain why each multiplier was chosen','multiply every term in an equation','explain why addition or subtraction causes cancellation','substitute back and check both original equations']
  }
 }
];

export function teachingMapFor(topic:string,classLevel:string):TopicTeachingMap|undefined{
 if(classLevel==='JSS1'&&jss1MathematicsTeachingMaps[topic]) return jss1MathematicsTeachingMaps[topic];
 if(classLevel==='JSS2'&&jss2MathematicsTeachingMaps[topic]) return jss2MathematicsTeachingMaps[topic];
 if(classLevel==='JSS3'&&jss3MathematicsTeachingMaps[topic]) return jss3MathematicsTeachingMaps[topic];
 if(classLevel==='JSS1'&&jss1EnglishTeachingMaps[topic]) return jss1EnglishTeachingMaps[topic];
 if(classLevel==='JSS2'&&jss2EnglishTeachingMaps[topic]) return jss2EnglishTeachingMaps[topic];
 if(classLevel==='JSS3'&&jss3EnglishTeachingMaps[topic]) return jss3EnglishTeachingMaps[topic];
 return maps.find(x=>(!x.classLevel||x.classLevel===classLevel)&&x.match.test(topic))?.map;
}

function unit(title:string,why:string,explain:string,example:string,check:string,terms:ReturnType<typeof keyTermsForTeaching>,prerequisites:string[],outcomes:string[],commonMistakes:string[]):TutorUnit{
 return {title,why,explain,example,check,terms,prerequisites,outcomes,commonMistakes};
}

export function goldFactorisationUnits(classLevel:string,topic:string,base:{prerequisites:string[];objectives:string[];misconceptions:string[]}):TutorUnit[]{
 const terms=keyTermsForTeaching('Mathematics',topic,'variable coefficient constant term expression factor factorise product sum quadratic equation trinomial standard form');
 const common={terms,prerequisites:base.prerequisites,outcomes:base.objectives,commonMistakes:base.misconceptions};
 const units:TutorUnit[]=[
  unit(
   `${topic} · Language and foundation`,
   'A learner cannot understand factorisation if words such as variable, coefficient, term, factor, sum and product are being used as unexplained labels.',
   'Start with the language. A variable is a letter representing a number. A coefficient is the numerical factor multiplying a variable; if x or x² is written without a visible number, its coefficient is 1 because x=1x and x²=1x². A constant has no variable attached. Terms are separated by + or − signs. A factor is something that multiplies another factor to make a product. Factorisation is the reverse of expansion: we rewrite an expression as a product and later expand it to prove that nothing changed.',
   'In 3x² − 5x + 6, the terms are 3x², −5x and 6. The coefficient of x² is 3, the coefficient of x is −5, and the constant is 6.',
   'In x² + 7x + 10, identify every term, the coefficient of x², the coefficient of x and the constant, and explain why the coefficient of x² is 1.',
   common.terms,common.prerequisites,common.outcomes,common.commonMistakes
  ),
  unit(
   `${topic} · Foundational mini-lesson — multiplying two brackets`,
   'Factorisation becomes meaningful only when the learner understands expansion as repeated distribution. This prerequisite is taught deeply once, then recalled whenever later algebra needs it.',
   'Begin with the distributive law using numbers: 3(4+5)=3×4+3×5. Then transfer the same idea to algebra: 2(x+y)=2x+2y. Only after that, multiply two brackets. In (a+b)(c+d), treat the second bracket as one whole quantity first: a(c+d)+b(c+d). Now distribute again to get ac+ad+bc+bd. Make clear that FOIL is only a memory label for a result already derived; it is not the reason the method works. Every term in the first bracket must multiply every term in the second bracket.',
   '(x+2)(x+5): x multiplies the whole second bracket, giving x²+5x. Then 2 multiplies the whole second bracket, giving 2x+10. Combine: x²+5x+2x+10. The like terms 5x and 2x combine to 7x, so the result is x²+7x+10. Verify by tracing where each of the four products came from.',
   'Expand (x+3)(x+4). Before simplifying, show all four products and explain why none may be skipped.',
   common.terms,
   [...common.prerequisites,'single-term distribution such as 3(x+2)','like terms and coefficients'],
   common.outcomes,
   [...common.commonMistakes,'multiplying only the first terms and last terms','using FOIL as an unexplained rule','combining unlike terms']
  ),
  unit(
   `${topic} · Common factors and reversing expansion`,
   'Common-factor factorisation is the clearest place to see that factorisation reverses the distributive law.',
   'Before searching for quadratic patterns, always look for a common factor. Find the greatest number and variable factor shared by every term. Divide every term by that common factor to determine what remains inside the brackets. Then expand the answer to verify it returns to the original expression.',
   '12x + 18 = 6(2x + 3). We choose 6 because it divides both 12 and 18. Expanding gives 6×2x + 6×3 = 12x + 18, so the factorisation is verified.',
   'Factorise 15y + 25, explain why your outside factor is valid, and expand your answer to check it.',
   common.terms,common.prerequisites,common.outcomes,common.commonMistakes
  ),
  unit(
   `${topic} · Quadratic trinomials — a = 1`,
   'The two numbers used in a quadratic factorisation are not guessed. They are selected because their sum creates the middle coefficient and their product creates the constant term.',
   'For x²+bx+c, the leading coefficient a is 1. We need two numbers p and q such that p+q=b and pq=c. Test factor pairs deliberately. A pair that satisfies only the sum or only the product is not enough. Once the correct pair is found, x²+bx+c=(x+p)(x+q). Expand the brackets to verify both the middle term and constant.',
   'For x²−5x+6, b=−5 and c=6. Candidate 1 and 6 has product 6 but sum 7, so it fails. Candidate −1 and −6 has product 6 but sum −7, so it fails. Candidate −2 and −3 has product 6 and sum −5, so it works: (x−2)(x−3). Expanding gives x²−5x+6.',
   'Factorise x²+7x+12. Show at least one factor pair that does not work, state why, then verify your final factors by expansion.',
   common.terms,common.prerequisites,common.outcomes,common.commonMistakes
  )
 ];
 if(classLevel==='JSS3'){
  units.push(
   unit(
    `${topic} · Quadratic trinomials — a ≠ 1`,
    'When the coefficient of x² is not 1, using only the constant c is not enough. The middle-term method uses the product a×c.',
    'For ax²+bx+c, first identify a, b and c. Calculate ac. Find two numbers whose sum is b and whose product is ac. Use those numbers to split bx into two terms. Then factor the resulting four terms by grouping. The method works because the split changes only the form of the middle term, not its value.',
    'Factorise 2x²+7x+3. Here a=2, b=7, c=3, so ac=6. We need two numbers with sum 7 and product 6: 1 and 6. Split 7x as x+6x: 2x²+x+6x+3. Group: x(2x+1)+3(2x+1)=(x+3)(2x+1). Expand to verify.',
    'Factorise 3x²+10x+8 using the ac method. Explain why each of your two chosen numbers is needed.',
    common.terms,common.prerequisites,common.outcomes,common.commonMistakes
   ),
   unit(
    `${topic} · Difference of two squares`,
    'Recognising structure avoids unnecessary trial-and-error, but the identity should be understood through expansion rather than memorised blindly.',
    'A difference of two squares has the form A²−B². It factorises as (A−B)(A+B). Expanding gives A²+AB−AB−B², and the middle terms cancel, leaving A²−B². Both terms must actually be perfect squares and there must be subtraction between them.',
    'x²−25 = x²−5² = (x−5)(x+5). By contrast, x²+25 is not a difference of squares because the sign is addition.',
    'Factorise 9y²−16 and explain why 9y²+16 does not use the same identity.',
    common.terms,common.prerequisites,common.outcomes,common.commonMistakes
   ),
   unit(
    `${topic} · Rearranging and solving by factorisation`,
    'A quadratic equation must be in a form where one side is zero before the zero-product principle can be used. Rearrangement is not decoration; it creates the condition needed by the method.',
    'A quadratic equation is written in standard form ax²+bx+c=0, with a≠0. If terms are on both sides, use the same operation on both sides to bring all terms to one side while preserving equality. After factorising, use the zero-product principle: if two factors multiply to zero, at least one factor must be zero. Solve each resulting linear equation, then substitute the answers into the original equation to check.',
    'Solve x²+6=5x. Subtract 5x from both sides: x²−5x+6=0. Factorise: (x−2)(x−3)=0. Therefore x−2=0 or x−3=0, so x=2 or x=3. Check both values in the original equation x²+6=5x.',
    'Solve x²+2x=15 by first explaining why it must be rearranged before factorisation, then verify every solution in the original equation.',
    common.terms,common.prerequisites,common.outcomes,common.commonMistakes
   )
  );
 }
 return units;
}
