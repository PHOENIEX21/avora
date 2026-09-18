import type {TutorUnit} from './tutorCurriculum';

export type TeachingDepthProfile={
  prerequisites:string[];
  outcomes:string[];
  misconceptions:string[];
  conceptQuestions:string[];
  exampleBreakdown:string[];
  masteryChecklist:string[];
};

function unique(xs:string[]){return [...new Set(xs.map(x=>x.trim()).filter(Boolean))]}
function clauses(text:string){return String(text||'').split(/(?:→|;|(?<=[.!?])\s+)/).map(x=>x.trim()).filter(Boolean)}

function subjectDefaults(subject:string){
  if(subject==='English Language')return {
    misconceptions:[
      'choosing an answer because it sounds familiar without identifying the grammar, meaning or evidence that controls it',
      'memorising a label but not explaining what the word, sentence or passage is doing',
      'looking at one nearby word while ignoring the full sentence, paragraph or context'
    ],
    checklist:['name the language idea being tested','point to the word, structure or evidence that proves it','explain why the chosen form or meaning fits','check that the whole sentence or passage still makes sense']
  };
  return {
    misconceptions:[
      'starting a calculation before identifying what each number, symbol or quantity means',
      'using a remembered formula or operation without explaining why it applies to this situation',
      'accepting a numerical result without checking units, size, sign or the original question'
    ],
    checklist:['state what is given and what must be found','name the rule, relationship or operation and why it applies','show each mathematical step without hiding the reasoning','check the result against the original information and units']
  };
}

export function teachingDepthProfile(unit:TutorUnit,subject:string):TeachingDepthProfile{
  const defaults=subjectDefaults(subject);
  const terms=(unit.terms||[]).map(([term,meaning])=>`${term}: ${meaning}`);
  const prerequisites=unit.prerequisites?.length?unit.prerequisites:[
    `understand the key words used in ${unit.title}`,
    subject==='English Language'?'read the complete sentence or passage before deciding':'read the quantities, symbols and units before calculating'
  ];
  const outcomes=unit.outcomes?.length?unit.outcomes:[
    `explain the important terms in ${unit.title} in your own words`,
    'explain why the main rule or method works',
    'apply the idea to a fresh example instead of copying a memorised answer',
    'recognise a common mistake and correct it'
  ];
  const misconceptions=unique([...(unit.commonMistakes||[]),...defaults.misconceptions]).slice(0,5);
  const conceptQuestions=(unit.terms||[]).map(([term])=>`When you meet “${term}”, what does it tell you to notice before you continue?`);
  const exParts=clauses(unit.example||'');
  const exampleBreakdown=exParts.length?exParts.map((part,i)=>`${i+1}. ${part}`):['1. Read the example carefully.','2. Identify the idea being used.','3. Follow the reasoning to the result.'];
  const masteryChecklist=unique([...defaults.checklist,...outcomes.slice(0,2)]).slice(0,6);
  return {prerequisites,outcomes,misconceptions,conceptQuestions,exampleBreakdown,masteryChecklist};
}

export function termReason(term:string,meaning:string,subject:string){
  if(subject==='English Language')return `The word “${term}” is not just a label. It means ${meaning}. When AVORA uses this term, identify the exact word, phrase, sentence role or evidence that matches that meaning before choosing an answer.`;
  return `The term “${term}” means ${meaning}. In Mathematics, naming the idea first tells us what the numbers or symbols represent and prevents us from choosing an operation or formula blindly.`;
}

export function exampleReasoningPrompt(part:string,index:number,subject:string){
  if(subject==='English Language')return `Part ${index+1}: ${part}. Ask what word or structure controls this statement, what evidence supports it, and why a different form would change or weaken the meaning.`;
  return `Step ${index+1}: ${part}. Ask what changed from the previous line, which rule or operation allows that change, and whether the equality, units or relationship has been preserved.`;
}
