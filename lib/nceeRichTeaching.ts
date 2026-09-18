import type {NceeTeachingTopic,NceeDomain} from './nceePrep';
import {nceeBankFor} from './nceeQuestionBank';

type Definition={term:string;simple:string;use:string};
type Worked={prompt:string;options:string[];answer:string;explanation:string;difficulty:number};

function coreFor(domain:NceeDomain,title:string){
  const t=title.toLowerCase();
  if(domain==='Mathematics'){
    if(t.includes('fraction')||t.includes('decimal')||t.includes('percentage')) return {bigIdea:'Fractions, decimals and percentages are different ways of describing parts of a whole. AVORA first connects them before asking the learner to calculate.',why:'The methods work because the same quantity can be renamed without changing its value: for example 1/2 = 0.5 = 50%.',definitions:[['whole','the complete amount before it is divided','Identify the whole before finding a fraction or percentage of it'],['fraction','a number showing equal parts of a whole','Use numerator and denominator to describe the chosen parts'],['percentage','a fraction out of 100','Rename a part as an amount per hundred']]};
    if(t.includes('ratio')||t.includes('proportion')||t.includes('sharing')) return {bigIdea:'A ratio compares quantities using equal-sized parts. Proportion keeps the same comparison when quantities are scaled.',why:'Ratio sharing works because the total is divided into the exact number of equal ratio parts before those parts are grouped.',definitions:[['ratio','a comparison between quantities','Read 2:3 as two equal parts compared with three equal parts'],['part','one equal share in a ratio model','Find the value of one part before finding a person’s share'],['proportion','two comparisons that keep the same relationship','Scale both sides by the same factor']]};
    if(t.includes('area')||t.includes('perimeter')||t.includes('measurement')||t.includes('mensuration')) return {bigIdea:'Measurement tells us how much length, boundary, surface or capacity an object has. The learner must first decide what is being measured before choosing a rule.',why:'Perimeter adds the outside boundary; area counts equal square units covering a surface. Different quantities need different units and rules.',definitions:[['perimeter','the distance around a shape','Add all outside sides'],['area','the amount of flat surface covered','Count or calculate square units'],['unit','the agreed measure used for an answer','Keep cm, m, cm² and m² distinct']]};
    if(t.includes('angle')||t.includes('shape')||t.includes('symmetry')) return {bigIdea:'Geometry is about properties and relationships, not memorising pictures. AVORA names the parts, marks what is known and reasons from properties.',why:'Angle and shape rules work because geometric figures have fixed relationships, such as the interior angles of a triangle adding to 180°.',definitions:[['angle','the amount of turn between two lines','Measure or reason in degrees'],['vertex','the point where sides or lines meet','Locate the corner before naming an angle'],['symmetry','a matching balance of shape','Test whether parts match after folding or reflection']]};
    if(t.includes('data')||t.includes('average')||t.includes('chart')||t.includes('chance')) return {bigIdea:'Data questions begin by reading what the numbers represent before calculating. An average summarises; a chart displays; probability describes chance.',why:'A mean is fair sharing of the total across the number of values, so we add first and divide by how many values there are.',definitions:[['data','information collected for a purpose','Read labels and units before using numbers'],['mean','the total shared equally among the values','Add all values and divide by the count'],['probability','how likely an event is','Compare possible favourable outcomes with all possible outcomes']]};
    return {bigIdea:`${title} is taught as a connected idea: understand what the quantities mean, choose a valid operation, show every step and check whether the answer makes sense.`,why:'A correct mathematical method preserves the relationships in the problem. AVORA therefore explains why an operation is allowed before using a shortcut.',definitions:[['quantity','an amount that can be counted or measured','Identify the numbers and what each number represents'],['operation','a mathematical action such as +, −, × or ÷','Choose an operation because of the relationship in the problem'],['estimate','a sensible approximate value','Use it to predict and check an exact answer']]};
  }
  if(domain==='Basic Science & Technology') return {bigIdea:`${title} is taught through observation → naming → explanation → application. The learner connects the idea to something real before answering exam questions.`,why:'Science explanations are strongest when they connect evidence with cause and effect instead of memorising isolated facts.',definitions:[['observe','to notice carefully using the senses or suitable tools','Describe what can actually be seen, measured or noticed'],['function','the job a part performs','Explain what a body part, tool or system does'],['safety','actions that reduce harm or danger','Choose the safe behaviour and explain why it prevents harm']]};
  if(domain==='English Studies') return {bigIdea:`${title} is taught in real sentences and passages. AVORA first establishes meaning, then the language rule, then contrasts correct and incorrect use.`,why:'English choices depend on meaning and sentence relationships. A learner should be able to explain why an option fits the context, not only recognise it.',definitions:[['context','the words and situation around a word or sentence','Use surrounding clues to decide meaning'],['grammar','the system that helps words work together correctly','Check how words relate inside the sentence'],['evidence','the exact word, phrase or sentence supporting an answer','Point back to the passage instead of guessing']]};
  if(domain==='National Values Education') return {bigIdea:`${title} is taught through familiar home, school and community situations. The learner identifies the value, considers consequences and chooses responsible action.`,why:'Values become meaningful when a child can connect a principle to real decisions and explain how the choice affects other people and the community.',definitions:[['value','a principle that guides good choices','Name the principle behind an action'],['responsibility','a duty a person is expected to carry out','Connect rights with duties'],['consequence','what happens because of an action or choice','Compare likely results before choosing']]};
  if(domain==='Quantitative & Vocational Aptitude') return {bigIdea:`${title} trains the child to notice relationships quickly without blind guessing. AVORA teaches the clue first, then a method for checking it.`,why:'Aptitude patterns are solved by finding a relationship that works consistently, not by choosing the option that merely looks familiar.',definitions:[['pattern','a relationship that repeats or changes by a rule','Test the same rule across more than one step'],['clue','a useful feature that points to the relationship','State the clue before calculating'],['check','a second test that confirms the proposed rule','Apply the rule again before selecting an option']]};
  return {bigIdea:`${title} develops verbal reasoning by making the learner understand each word, identify the relationship and reject distractors for a stated reason.`,why:'Verbal aptitude is about relationships between meanings, letters and ideas; the same relationship must hold on both sides of the question.',definitions:[['relationship','the way two words or ideas are connected','Say the connection aloud before choosing'],['analogy','a comparison showing matching relationships','Complete A:B :: C:? using the same link'],['distractor','an option designed to look possible but is not the best answer','Explain why the tempting wrong option fails']]};
}

export function nceeRichDeepLesson(topic:NceeTeachingTopic){
  const core=coreFor(topic.domain,topic.title);
  const bank=nceeBankFor(topic.classLevel,topic.domain).filter(q=>q.topic===topic.title);
  const examples:Worked[]=bank.slice(0,5).map(q=>({prompt:q.prompt,options:q.options,answer:q.answer,explanation:q.explanation,difficulty:q.difficulty}));
  if(examples.length<5) throw new Error(`NCEE deep lesson ${topic.id} needs at least five concrete reviewed examples; found ${examples.length}`);
  const definitions:Definition[]=core.definitions.map(([term,simple,use])=>({term,simple,use}));
  return {
    ...topic,
    bigIdea:core.bigIdea,
    whyItWorks:core.why,
    definitions,
    workedExamples:examples,
    boardSequence:[
      `Write the goal: I can handle ${topic.title.toLowerCase()} and explain why my answer works.`,
      'Recall the one prerequisite needed before the new idea.',
      'Write and define the key words before using them.',
      'Show the first concrete example and label the important clue, quantity, word or relationship.',
      'Work the example one step at a time and explain why each step is allowed.',
      'Place a contrasting example beside it so the learner sees what changes and what stays the same.',
      'Let the child complete a guided example on the board.',
      'Finish with a fresh independent item and a reason/check, not just an answer.',
    ],
    teachingPhases:[
      {name:'1 · Connect',text:`Start with a familiar Primary-school situation connected to ${topic.title.toLowerCase()}. Ask what the learner already notices before naming a rule.`},
      {name:'2 · Words first',text:'Teach the key words in simple language, give an example and a non-example, then use each word immediately.'},
      {name:'3 · Explain the idea',text:core.bigIdea},
      {name:'4 · Teacher model',text:'Work through the first two examples slowly. State what is known, what is being asked, the clue or rule, each step, and the final check.'},
      {name:'5 · Compare forms',text:'Use the next examples to show that the same idea can appear in different wording, numbers, diagrams or situations.'},
      {name:'6 · Guided proof',text:'Let the learner complete a fresh example with only one clue at a time. Ask “Why?” before revealing the next step.'},
      {name:'7 · Independent proof',text:'Remove hints. The learner answers a fresh item, explains the reason, and checks a tempting wrong option.'},
      {name:'8 · Mastery or reteach',text:'Move on only when the child can solve a new form and explain the reason. Otherwise repair the exact prerequisite and try a different representation.'},
    ],
    misconceptionRepairs:[
      ...topic.commonMistakes.map(m=>({mistake:m,repair:`Stop, identify why this approach fails for ${topic.title.toLowerCase()}, model one contrasting example, then let the learner correct the original attempt.`})),
      {mistake:'Choosing an answer because it looks familiar',repair:'Ask the learner to state the clue, rule or evidence before looking at the options again.'},
    ],
    guidedPractice:[`Use a sixth bank item for ${topic.title.toLowerCase()} with one first-step clue only.`,`Ask the learner to explain why one wrong option fails before choosing the correct answer.`],
    independentPractice:[`Solve a new ${topic.title.toLowerCase()} item without hints.`,`Solve a different-form item under gentle exam timing and explain the answer afterwards.`],
    masteryChecks:[...topic.masteryChecks,`Can the learner solve a different form of ${topic.title.toLowerCase()} and explain the reason without copying the teacher example?`],
    remediation:['Return to the exact missing prerequisite','Use a concrete object, picture, shorter sentence or smaller number','Model one new example differently','Ask one tiny understanding question','Return to the original difficulty','Require a fresh independent proof before mastery'],
  };
}
