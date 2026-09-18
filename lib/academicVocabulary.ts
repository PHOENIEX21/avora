export type AcademicTerm=[string,string];

const mathTerms:Record<string,string>={
 variable:'a letter or symbol used to represent a number that may be unknown or may change',
 coefficient:'the numerical factor multiplying a variable; for example, the coefficient of x in x is 1 because x = 1x',
 constant:'a number whose value is fixed and which has no variable attached in the expression being studied',
 term:'one part of an expression separated from another by addition or subtraction signs',
 expression:'a mathematical phrase made from numbers, variables and operations, without an equality sign',
 equation:'a statement that two mathematical expressions have the same value',
 factor:'a number or expression that multiplies another number or expression to make a product',
 factorise:'rewrite an expression as a product of factors',
 product:'the result of multiplication',
 sum:'the result of addition',
 difference:'the result of subtraction',
 quotient:'the result of division',
 trinomial:'an algebraic expression containing three terms',
 'quadratic expression':'an expression whose highest power of the variable is 2',
 'quadratic equation':'an equation that can be written in the form ax² + bx + c = 0, where a is not zero',
 'standard form':'an agreed arrangement used so the important parts of a mathematical object can be identified consistently',
 'inverse operation':'an operation that reverses another operation, such as subtraction reversing addition',
 'like terms':'terms that have exactly the same variable part and powers',
 numerator:'the top number or expression in a fraction',
 denominator:'the bottom number or expression in a fraction; it tells the size or number of equal parts and cannot be zero',
 fraction:'a number representing one or more equal parts of a whole, or a quotient of two numbers',
 ratio:'a comparison of two quantities by division',
 percentage:'a comparison out of one hundred',
 integer:'a whole positive number, whole negative number, or zero',
 'directed number':'a number with a positive or negative sign showing position or direction relative to zero',
 approximation:'a value close to the exact value, usually produced by rounding or estimation',
 'significant figure':'a digit that contributes to the precision of a number, counted from the first non-zero digit',
 'standard form number':'a number written as a × 10ⁿ where 1 ≤ a < 10',
 angle:'the amount of turn between two rays or line segments meeting at a point',
 vertex:'the common endpoint where the arms or sides of an angle meet',
 polygon:'a closed plane shape made only from straight line segments',
 parallel:'describing lines in the same plane that remain the same distance apart and never meet',
 perpendicular:'meeting at a right angle of 90 degrees',
 bearing:'a direction measured clockwise from north, usually written as a three-digit angle',
 frequency:'the number of times a value or category occurs',
 probability:'a measure of how likely an event is to happen, from 0 to 1',
 mean:'the total of the values divided by the number of values',
 median:'the middle value after the data have been arranged in order',
 mode:'the value that occurs most often',
 range:'the difference between the greatest and least values',
};

const englishTerms:Record<string,string>={
 noun:'a word used to name a person, place, thing, idea or quality',
 pronoun:'a word used in place of a noun or noun phrase',
 verb:'a word or group of words expressing an action, event, process or state',
 adjective:'a word that describes or gives more information about a noun or pronoun',
 adverb:'a word that modifies a verb, adjective, another adverb, or sometimes a whole clause',
 subject:'the person, thing or idea that the clause is mainly about and that normally controls agreement with the verb',
 predicate:'the part of a clause that says something about the subject and normally contains the verb',
 tense:'the grammatical system used to locate an action, event or state in time',
 concord:'grammatical agreement between related parts of a sentence, especially subject and verb',
 clause:'a group of words containing a subject and a verb',
 phrase:'a group of related words that functions as a unit but does not normally contain a complete subject-and-predicate structure',
 sentence:'a complete grammatical unit expressing a statement, question, command or exclamation',
 antecedent:'the noun or noun phrase to which a pronoun refers',
 conjunction:'a word used to connect words, phrases or clauses',
 preposition:'a word that shows a relationship such as place, time, direction or possession between parts of a sentence',
 punctuation:'marks used in writing to organise meaning, show boundaries and guide interpretation',
 paragraph:'a group of related sentences developing one main idea',
 'topic sentence':'a sentence that states or controls the main idea of a paragraph',
 audience:'the person or group for whom a text is written or spoken',
 purpose:'the reason for speaking or writing',
 inference:'a conclusion reached by combining evidence in a text with reasonable background knowledge',
 evidence:'specific information from a text that supports an answer or interpretation',
 summary:'a shorter statement of the main ideas of a text without unnecessary detail',
 syllable:'a beat or unit of pronunciation built around a vowel sound',
 stress:'extra prominence given to a syllable or word in speech',
 intonation:'the rise and fall of the voice in speech',
 phoneme:'the smallest sound unit that can distinguish meaning in a language',
 metaphor:'a figure of speech that describes one thing as another to create a comparison without using like or as',
 personification:'giving human qualities or actions to something non-human',
 onomatopoeia:'a word whose sound imitates or suggests the sound it describes',
};

const topicHints:Array<[RegExp,string[]]>= [
 [/factor|algebraic expression|quadratic/i,['variable','coefficient','constant','term','expression','factor','factorise','product','sum','trinomial','quadratic expression','quadratic equation','standard form']],
 [/equation/i,['variable','coefficient','constant','term','expression','equation','inverse operation']],
 [/fraction/i,['fraction','numerator','denominator']],
 [/ratio|proportion|percentage/i,['ratio','percentage']],
 [/directed/i,['directed number','integer']],
 [/approximation|significant|standard form/i,['approximation','significant figure','standard form number']],
 [/angle|polygon/i,['angle','vertex','polygon','parallel','perpendicular']],
 [/bearing/i,['bearing','angle']],
 [/statistics|data|frequency|pie chart/i,['frequency','mean','median','mode','range']],
 [/probability/i,['probability']],
 [/concord|subject.?verb|grammatical accuracy/i,['subject','verb','concord','noun','pronoun','tense']],
 [/pronoun/i,['pronoun','antecedent','noun']],
 [/sentence|clause|phrase/i,['sentence','clause','phrase','subject','predicate']],
 [/writing|composition|letter|report|story/i,['audience','purpose','paragraph','topic sentence','punctuation']],
 [/reading|comprehension|summary/i,['evidence','inference','summary']],
 [/speech|listening|pronunciation|stress|intonation|sound/i,['syllable','stress','intonation','phoneme']],
 [/literature|poetry|prose|drama|figurative/i,['metaphor','personification','onomatopoeia','evidence']],
];

function add(out:AcademicTerm[],name:string,bank:Record<string,string>){
 const meaning=bank[name];
 if(meaning&&!out.some(([term])=>term===name))out.push([name,meaning]);
}

export function keyTermsForTeaching(subject:string,topic:string,text=''):AcademicTerm[]{
 const bank=subject==='English Language'?englishTerms:mathTerms;
 const corpus=`${topic} ${text}`.toLowerCase();
 const out:AcademicTerm[]=[];
 for(const [pattern,names] of topicHints){
  if(pattern.test(topic)||pattern.test(text))for(const name of names)add(out,name,bank);
 }
 for(const [name,meaning] of Object.entries(bank)){
  const rx=new RegExp(`\\b${name.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&').replace(/ /g,'\\s+')}s?\\b`,'i');
  if(rx.test(corpus)&&!out.some(([term])=>term===name))out.push([name,meaning]);
 }
 return out.slice(0,12);
}
