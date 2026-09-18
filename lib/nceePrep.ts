export type PrimaryPrepClass='Primary 5'|'Primary 6';
export type NceeDomain='Mathematics'|'Basic Science & Technology'|'English Studies'|'National Values Education'|'Quantitative & Vocational Aptitude'|'Verbal Aptitude';

export const NCEE_PREP_CLASSES:PrimaryPrepClass[]=['Primary 5','Primary 6'];

export const NCEE_OFFICIAL_STRUCTURE={
 exam:'NCEE',
 purpose:'Admission into JSS1 of Federal Unity Colleges',
 paper1:{label:'Paper I',durationMinutes:130,parts:[
  {part:'A',domains:['Mathematics','Basic Science & Technology'] as NceeDomain[]},
  {part:'B',domains:['English Studies','National Values Education'] as NceeDomain[]},
 ]},
 paper2:{label:'Paper II',durationMinutes:80,parts:[
  {part:'A',domains:['Quantitative & Vocational Aptitude'] as NceeDomain[]},
  {part:'B',domains:['Verbal Aptitude'] as NceeDomain[]},
 ]},
 source:'NECO 2026 NCEE official timetable/general information',
} as const;

export type NceeTeachingTopic={
 id:string; classLevel:PrimaryPrepClass; domain:NceeDomain; title:string; objective:string;
 prerequisites:string[]; keyTerms:string[]; teachingJourney:string[]; workedExamples:string[];
 commonMistakes:string[]; masteryChecks:string[];
};

const domainScopes:Record<NceeDomain,{p5:string[];p6:string[]}>={
 'Mathematics':{
  p5:['Whole numbers and place value','Four operations and word problems','Fractions and mixed numbers','Decimals and money','Percentages','Ratio and simple proportion','Measurement and unit conversion','Perimeter, area and simple shapes','Time, calendar and speed sense','Data, averages and simple chance'],
  p6:['Number relationships and estimation','Multi-step operations','Fractions, decimals and percentages','Ratio, proportion and sharing','Commercial arithmetic','Measurement and mensuration','Angles, shapes and symmetry','Time, distance and everyday rate','Tables, charts and averages','Mixed problem solving and exam reasoning']},
 'Basic Science & Technology':{
  p5:['Living things and life processes','Human body and health','Plants, animals and habitats','Matter and materials','Force, motion and simple machines','Energy, light, heat and sound','Earth, weather and environment','Technology, tools and safety'],
  p6:['Body systems and healthy living','Ecology and environmental care','Materials and changes','Forces, machines and energy','Electricity and simple circuits','Light, sound and heat','Earth, space, weather and resources','Technology, ICT awareness and safety']},
 'English Studies':{
  p5:['Reading for main idea','Reading for details and inference','Vocabulary in context','Word classes','Tenses and agreement','Sentence construction','Spelling and punctuation','Meaning, synonyms and antonyms','Everyday usage and editing','Short passages and exam comprehension'],
  p6:['Comprehension and inference','Vocabulary and word meaning','Grammar and word classes','Tenses and subject–verb agreement','Sentence meaning and transformation','Spelling, punctuation and usage','Idioms and contextual meaning','Ordering ideas and cohesion','Editing and error recognition','Integrated English exam practice']},
 'National Values Education':{
  p5:['Family and community responsibilities','Honesty, respect and cooperation','Rules, rights and responsibilities','Leadership and followership','National symbols and identity','Peace, safety and conflict prevention','Environment and public property','Good citizenship in daily life'],
  p6:['Citizenship and national identity','Rights, duties and responsible behaviour','Leadership, democracy and cooperation','Integrity and consequences of choices','Peace, security and conflict resolution','National symbols, institutions and unity','Community service and public property','Values in real-life situations']},
 'Quantitative & Vocational Aptitude':{
  p5:['Number patterns','Missing-number reasoning','Shape and diagram patterns','Simple quantitative comparisons','Tables and coded numbers','Everyday money and measurement reasoning','Tools, occupations and work situations','Practical problem solving'],
  p6:['Advanced number sequences','Quantitative analogies','Missing values and coded operations','Diagram and spatial reasoning','Tables, charts and comparison','Rate, money and measurement aptitude','Vocational tools, roles and safety','Mixed timed quantitative reasoning']},
 'Verbal Aptitude':{
  p5:['Word relationships','Simple analogies','Odd word out','Alphabet and letter patterns','Word completion','Synonyms and antonyms','Sentence logic','Classification and grouping'],
  p6:['Verbal analogies','Word classification','Opposites and closest meanings','Letter and word codes','Sentence completion','Logical word relationships','Ordering and sequencing words','Mixed timed verbal reasoning']}
};

function makeTopic(classLevel:PrimaryPrepClass,domain:NceeDomain,title:string,index:number):NceeTeachingTopic{
 const isP6=classLevel==='Primary 6';
 const baseId=`ncee-${classLevel==='Primary 5'?'p5':'p6'}-${domain.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${index+1}`;
 const domainIntro:Record<NceeDomain,string>={
  'Mathematics':'understand the idea, model it with simple numbers, then solve it in a story or exam situation',
  'Basic Science & Technology':'connect the idea to something the child can observe, name the parts, explain what happens and apply it safely',
  'English Studies':'hear or read the language in context, notice the rule or meaning, compare correct and incorrect forms, then use it independently',
  'National Values Education':'start from a familiar home, school or community situation, identify the value involved, reason about consequences and choose responsible action',
  'Quantitative & Vocational Aptitude':'spot the pattern or relationship, explain the clue, test a possible answer and then solve a fresh timed item',
  'Verbal Aptitude':'understand the words first, identify the relationship, reject distractors for a reason and then solve a new verbal pattern'
 };
 return {
  id:baseId,classLevel,domain,title,
  objective:`The learner can explain and independently handle ${title.toLowerCase()} at ${classLevel} Common Entrance preparation level.`,
  prerequisites:isP6?['Recall the simpler Primary 5 idea','Read the question carefully','Explain one step in words before choosing an answer']:['Read or listen to a short instruction','Use familiar everyday examples','Say what is known before solving'],
  keyTerms:[title.split(' ')[0],domain.includes('Aptitude')?'pattern':'example',domain==='English Studies'?'meaning':'reasoning'],
  teachingJourney:[`Warm-up with a familiar child-friendly example.`,`Teach ${title} in small steps: ${domainIntro[domain]}.`,'Model at least three different forms, from easy to exam-like.','Ask the learner to explain why the answer works, not only choose an option.','Give guided practice with hints that fade away.','Give independent practice and reteach differently after repeated errors.'],
  workedExamples:[`Starter: a simple ${title.toLowerCase()} example using familiar school/home objects or language.`,`Variation: the same idea presented in a different form so the child learns the concept, not one pattern.`,`Exam bridge: a short Common Entrance-style item that requires choosing the useful clue before answering.`],
  commonMistakes:['Rushing because an option looks familiar','Guessing without explaining the clue or rule','Carrying a method from one question into a different type without checking'],
  masteryChecks:[`Can the learner explain ${title.toLowerCase()} in simple words?`,'Can the learner solve a new example without a hint?','Can the learner identify why one tempting wrong option is wrong?']
 };
}

export const NCEE_TEACHING_TOPICS:NceeTeachingTopic[]=[];
for(const cls of NCEE_PREP_CLASSES){
 for(const domain of Object.keys(domainScopes) as NceeDomain[]){
  const titles=cls==='Primary 5'?domainScopes[domain].p5:domainScopes[domain].p6;
  titles.forEach((title,i)=>NCEE_TEACHING_TOPICS.push(makeTopic(cls,domain,title,i)));
 }
}

export function nceeTopicsFor(classLevel:string,domain?:string){
 return NCEE_TEACHING_TOPICS.filter(t=>t.classLevel===classLevel&&(!domain||t.domain===domain));
}
export function nceeTopicById(id:string){return NCEE_TEACHING_TOPICS.find(t=>t.id===id)||null}

export const NCEE_DOMAINS=(Object.keys(domainScopes) as NceeDomain[]).map((domain)=>({
 domain,
 paper:domain==='Quantitative & Vocational Aptitude'||domain==='Verbal Aptitude'?'Paper II':'Paper I',
 description:({
  'Mathematics':'Numbers, operations, fractions, measurement, geometry, data and problem solving.',
  'Basic Science & Technology':'Science ideas, health, environment, energy, tools, technology and safety.',
  'English Studies':'Comprehension, vocabulary, grammar, usage, spelling, punctuation and meaning.',
  'National Values Education':'Citizenship, values, responsibilities, leadership, peace and national identity.',
  'Quantitative & Vocational Aptitude':'Patterns, comparisons, coded numbers, practical reasoning, occupations and tools.',
  'Verbal Aptitude':'Analogies, word relationships, codes, classification and verbal logic.'
 } as Record<NceeDomain,string>)[domain]
}));

// AVORA mock blueprint covers every official NCEE domain. Item allocation is AVORA's
// practice design, not a claim about NECO's official item count.
export const NCEE_AVORA_MOCK_BLUEPRINT={
 label:'AVORA Full NCEE Mock',
 officialDomainCoverage:true,
 papers:[
  {paper:'Paper I',durationMinutes:130,sections:[
   {domain:'Mathematics' as NceeDomain,avoraItems:10},
   {domain:'Basic Science & Technology' as NceeDomain,avoraItems:10},
   {domain:'English Studies' as NceeDomain,avoraItems:10},
   {domain:'National Values Education' as NceeDomain,avoraItems:10},
  ]},
  {paper:'Paper II',durationMinutes:80,sections:[
   {domain:'Quantitative & Vocational Aptitude' as NceeDomain,avoraItems:10},
   {domain:'Verbal Aptitude' as NceeDomain,avoraItems:10},
  ]}
 ]
};

// V10.10 — Deep-learning and exam-intelligence contract for Primary 5/6.
// Authentic past-paper text is never reproduced unless rights are verified.
export const NCEE_DEEP_TEACHING_STANDARD = {
  minimumWorkedExamplesPerTopic: 5,
  sequence: ['prerequisite recall','child-friendly vocabulary','governing idea','teacher board demonstration','worked examples across different forms','guided practice','independent practice','misconceptions','explain-your-reason check','mastery gate','targeted reteaching'] as const,
  youngerLearnerRules: [
    'Use short teaching chunks without shortening the academic idea.',
    'Prefer concrete home, school, money, shape, word and everyday-life examples before abstraction.',
    'Define every unfamiliar word before relying on it.',
    'Ask the child to explain the clue or reason, not merely select an option.',
    'After repeated errors, change representation or example instead of repeating the same wording.',
  ],
};

export const NCEE_WEEKLY_ASSESSMENT_POLICY = {
  parentSupervised: true,
  classes: NCEE_PREP_CLASSES,
  domains: Object.keys(domainScopes) as NceeDomain[],
  selection: ['COVERED','MANUAL'] as const,
  rule: 'Weekly live assessments test taught evidence only; full mocks separately test whole-exam readiness.',
};

// Multiple complete AVORA-original papers let a learner practise repeatedly without
// AVORA pretending that copyrighted historical questions are ours to reproduce.
export const NCEE_MOCK_SERIES = Array.from({length:8},(_,i)=>({
  id:`avora-ncee-mock-${i+1}`,
  title:`Full NCEE Mock ${i+1}`,
  sourceType:'AVORA_ORIGINAL' as const,
  patternBasis:'Current NECO NCEE two-paper structure',
  papers:NCEE_AVORA_MOCK_BLUEPRINT.papers,
}));

// Historical papers are useful as exam intelligence. These entries are reference
// metadata only until reproduction/licensing rights for a particular paper are verified.
export const NCEE_PAST_YEAR_REFERENCE = Array.from({length:14},(_,i)=>({
  year:2011+i,
  access:'REFERENCE_ONLY' as const,
  reproduceQuestions:false,
  note:'Use for pattern/review intelligence; do not display copyrighted question text without verified permission.',
}));

export function nceeDeepLesson(topic:NceeTeachingTopic){
  const examples=[...topic.workedExamples];
  while(examples.length<NCEE_DEEP_TEACHING_STANDARD.minimumWorkedExamplesPerTopic){
    const n=examples.length+1;
    examples.push(n===4
      ?`Guided variation: solve a fresh ${topic.title.toLowerCase()} example while explaining the clue, rule or relationship used at each step.`
      :`Independent variation: solve a new ${topic.title.toLowerCase()} example without hints, then check the answer and explain why a tempting alternative is wrong.`);
  }
  return {
    ...topic,
    workedExamples:examples,
    vocabulary:topic.keyTerms.map(term=>({term,contract:'simple meaning → example → contrast/non-example → use in this lesson'})),
    boardSequence:['Show the idea with something familiar','Name and label the important parts','Demonstrate one complete example slowly','Compare a different form','Let the child complete a guided example','Hide hints for independent work','Check and explain the answer'],
    guidedPractice:[`Solve one ${topic.title.toLowerCase()} item with a clue.`,`Solve a different form with only a first-step hint.`],
    independentPractice:[`Solve a fresh standard item.`,`Solve an exam-bridge item and explain the reason for the answer.`],
    remediation:['Return to the prerequisite that broke down','Use a simpler representation or concrete example','Model one new example','Ask a one-step understanding check','Resume at the exact point of difficulty'],
  };
}
