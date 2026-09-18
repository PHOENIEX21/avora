import type {StructuredTeachingStep} from './lessonStepEngine';

export type LearnerTeachingMoment={
  id:string;
  kind:'idea'|'example'|'mistake'|'check';
  label:string;
  spoken:string;
  lines:string[];
  boardAction?:'WRITE'|'DRAW'|'HIGHLIGHT'|'ASK'|'PAUSE';
  pauseAfterMs?:number;
  requiresLearnerResponse?:boolean;
};

const AUTHOR_INSTRUCTION=/\b(?:avora should|avora must|avora will|avora can|avora checks?|avora reveals?|avora teaches|avora holds|avora's marking|avora's content|for avora|avora's whiteboard|this completes|continuing next|at this same standard|source[- ]backed|source step|supplied avora curriculum|practice questions?:?\s*$|worked example:?\s*$|diagram for avora|re-?guides?\s+only|learner must attempt|learner attempts each|guided self-practice)\b/i;
const INTERNAL_LABEL=/^(?:\*?\s*step\s*\d+\s*[—–-]|\*?\s*worked example\b|\*?\s*practice questions?\b|\*?\s*practice checkpoint\b|\*?\s*practice contract\b|\*?\s*diagram\b|\*?\s*section\s+[a-z]\s*[—–-]|\*?\s*(?:teacher|author|internal)\s*(?:note|instruction)?\s*:)/i;
const ENGLISH_STRUCTURE_LABEL=/^(?:stanza\s+\d+|act\s+\d+\s*[,—–-]?\s*scene\s+\d+|passage\s+[a-z0-9]+|reading\s+extract|introduction|body\s+paragraph\s+\d+|conclusion)\s*:?\s*$/i;
const INTERNAL_SOURCE_NOTE=/^\s*\([^)]*(?:derived|established|recall|extend(?:s|ed)?|at this level|for avora|whiteboard|source|curriculum|topic)\b[^)]*\)\s*\*?\s*$/i;
const PROVENANCE=/\bJSS[123](?:\s*\/\s*JSS[123])?\s*T[123]\b/gi;
const MARKDOWN_RULE=/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/;
const TABLE_HEADER=/\b(?:originally derived in|key formula\/method|area)\b/i;

function cleanInline(text:string){
 return String(text||'')
  .replace(/^\s*\*+/,'')
  .replace(/\*+\s*$/,'')
  .replace(/^\s*Step\s*\d+\s*[—–-]\s*/i,'')
  .replace(/^\s*(?:Worked Example|Example)\s*(?:\([^)]*\)|\d+)?\s*:?\s*/i,'')
  // English source often puts a structural essay/passage label on the same line as real model
  // content. Remove the label from speech but keep the actual sentence/paragraph.
  .replace(/^\s*(?:Introduction|Body\s+Paragraph\s+\d+|Conclusion|Passage\s+[A-Z0-9]+|Reading\s+Extract)\s*:\s*\*?\s*/i,'')
  // Editorial annotations explain how the source was authored; they are not lesson narration.
  .replace(/\s*[—–-]?\s*\[(?:Annotation|Closing\s+body)\s*:[^\]]*\]\s*$/i,'')
  .replace(/\s*\(\s*with\s+avora[^)]*\)/i,'') // strip authoring self-references like "(with Avora modeling)"
  .replace(/\s*\[[A-Z]{3,12}\]\s*$/,'') // strip trailing bracketed sensory/author tags like "[SMELL]"
  .replace(PROVENANCE,'')
  .replace(/\s*\|\s*$/,'')
  .replace(/^\s*\|\s*/,'')
  .replace(/\s{2,}/g,' ')
  .trim();
}

function tableRow(text:string):string[]|null{
 const trimmed=text.trim();
 if(!trimmed.startsWith('|')||!trimmed.endsWith('|'))return null;
 if(MARKDOWN_RULE.test(trimmed))return [];
 return trimmed.slice(1,-1).split('|').map(x=>x.trim());
}

export function sanitizeSourceForLearner(raw:string):string|null{
 const original=String(raw||'').trim();
 if(!original)return null;
 if(MARKDOWN_RULE.test(original)||AUTHOR_INSTRUCTION.test(original)||INTERNAL_LABEL.test(original)||INTERNAL_SOURCE_NOTE.test(original))return null;
 const cells=tableRow(original);
 if(cells){
  if(cells.length===0||TABLE_HEADER.test(cells.join(' ')))return null;
  // Markdown/reference-table rows are source/reference material, not spoken teaching.
  // They must be deliberately rewritten into learner-facing moments elsewhere.
  return null;
 }
 const cleaned=cleanInline(original);
 if(!cleaned||AUTHOR_INSTRUCTION.test(cleaned)||INTERNAL_LABEL.test(cleaned)||INTERNAL_SOURCE_NOTE.test(cleaned))return null;
 return cleaned;
}

function looksLikeExample(text:string){return /\b(?:example|given|suppose|if |let |calculate|=|→|₦|\d)\b/i.test(text)}
// A bare sub-topic heading like "1.2 Expressions Involving Brackets and Fractions" — a section
// label from the source outline, never something meant to be spoken as teaching content.
function isSectionHeading(text:string){
 const t=text.trim();
 return (/^\d+(?:\.\d+)+\s+\S/.test(t)&&t.length<90)||ENGLISH_STRUCTURE_LABEL.test(t);
}
function learnerLabel(text:string,index:number){
 if(/why|because|reason|therefore|means|represents|works/i.test(text))return 'WHY THIS WORKS';
 if(looksLikeExample(text))return `WORK IT THROUGH · ${index+1}`;
 return `BUILD THE IDEA · ${index+1}`;
}

// A worked-example line often arrives as its own array entry prefixed "Step 2: ..." — useful as a
// written board label, but reading "Step 2 colon" aloud on every line sounds like a worksheet, not
// a tutor. Spoken narration strips this and uses a natural ordinal connector instead; the board
// text (lines) keeps the original "Step 2:" prefix since that's a normal, useful written label.
function stripStepPrefix(text:string):{body:string;wasStep:boolean}{
 const m=text.match(/^\s*Step\s*\d+\s*[:.]?\s*[—–-]?\s*/i);
 if(!m)return {body:text,wasStep:false};
 return {body:text.slice(m[0].length).trim(),wasStep:true};
}

// A rotating pool per transition "shape", instead of one fixed sentence, so a lesson with 30 moments
// doesn't say the exact same connector 30 times. Indexed by academicIndex so it varies through a
// lesson without needing extra state; picking by index also means it's stable/deterministic.
const SEQUENCE_LEADS=['Next, ','Then, ','From there, ','Moving on, ','After that, ','Continuing on, ','Following that, '];
const COMPARISON_LEADS=['Notice the contrast here. ','Here is where it differs. ','Compare this with what we just saw. ','Pay attention to the difference. '];
const REASON_LEADS=["Here's why. ",'This is the reasoning behind it. ',"Let's see why that's true. ",'The reason is this. '];
const OPEN_LEADS=['','Now, ',"Here's the next part. ",'Look at this. ','',"Let's keep going. "];
const CHECK_LEADS=[
 'Pause here. Work this out in your own words or working before AVORA gives help. ',
 "Your turn — think it through before I help. ",
 "Try this one yourself first. ",
 "Before I explain further, have a go at this. ",
 "Now you try. Work through it, then we'll check. ",
 "Stop and attempt this on your own first. ",
];

function naturalLead(text:string,index:number):string{
 const {body,wasStep}=stripStepPrefix(text);
 if(/^establish\b/i.test(body))return `First, let us make the idea clear. ${body.replace(/^establish\s*/i,'')}`;
 if(/^derive\b/i.test(body))return `Now let us see where the method comes from, rather than memorising it. ${body.replace(/^derive\s*/i,'')}`;
 if(/^explain\b/i.test(body))return `Here is the reason. ${body.replace(/^explain\s*/i,'')}`;
 if(wasStep)return `${SEQUENCE_LEADS[index%SEQUENCE_LEADS.length]}${body}`;
 if(index===0)return `Let us build this carefully from the beginning. ${body}`;
 if(/^(?:unlike|whereas|in contrast|compare|however|but\b)/i.test(body))return `${COMPARISON_LEADS[index%COMPARISON_LEADS.length]}${body}`;
 if(/^(?:because|since|this is why|therefore)\b/i.test(body))return `${REASON_LEADS[index%REASON_LEADS.length]}${body}`;
 const lead=OPEN_LEADS[index%OPEN_LEADS.length];
 return lead?`${lead}${body}`:body;
}
function boardLines(text:string):string[]{
 const pieces=text.split(/(?<=[.!?])\s+|\s*;\s*/).map(x=>x.trim()).filter(Boolean);
 if(pieces.length>1)return pieces.slice(0,5);
 if(text.length<=150)return [text];
 const parts=text.split(/\s+(?=(?:because|so|therefore|which|where|when|but|and)\b)/i).map(x=>x.trim()).filter(Boolean);
 return parts.length>1?parts.slice(0,5):[text];
}

export function composeLearnerSourceMoments(steps:StructuredTeachingStep[]|undefined):LearnerTeachingMoment[]{
 if(!Array.isArray(steps))return [];
 const out:LearnerTeachingMoment[]=[];
 let academicIndex=0;
 let checkIndex=0;
 for(const step of steps){
  const text=sanitizeSourceForLearner(step.sourceText||step.narration);
  if(!text&&(step.boardText||step.boardAction==='PAUSE')){
   out.push({id:`learner-${step.id}`,kind:'idea',label:step.boardAction==='PAUSE'?'PAUSE AND THINK':'LIVE VISUAL',spoken:'',lines:step.boardText?[step.boardText]:['Take a moment to think before we continue.'],boardAction:step.boardAction==='PAUSE'?'PAUSE':step.boardAction==='DRAW'?'DRAW':step.boardAction==='HIGHLIGHT'?'HIGHLIGHT':'WRITE',pauseAfterMs:step.pauseAfterMs});
   continue;
  }
  if(!text)continue;
  const id=`learner-${step.id}`;
  // A section heading (e.g. "1.3 Direct and Inverse Proportion") is shown on the board as a
  // marker but never spoken as though it were teaching content — it isn't a sentence.
  if(isSectionHeading(text)){
   out.push({id,kind:'idea',label:'NEW SECTION',spoken:'',lines:[text],boardAction:'WRITE',pauseAfterMs:600});
   continue;
  }
  // A step whose board action was classified DRAW (it describes a whiteboard diagram, e.g. text
  // starting "Draw two simple bar comparisons...") is an instruction for the visual, not a sentence
  // for AVORA to read aloud verbatim. Show the description on the board; speak a short lead-in only.
  if(step.boardAction==='DRAW'){
   out.push({id,kind:'idea',label:'LOOK AT THE DIAGRAM',spoken:'Look at the diagram on the board while I describe what it shows.',lines:boardLines(text),boardAction:'DRAW',pauseAfterMs:step.pauseAfterMs});
   academicIndex++;
   continue;
  }
  // Only content explicitly supplied as a learner checkpoint (the checks[] array, tagged
  // requiresLearnerResponse) is treated as "your turn" — NOT any step-array line that happens to
  // start with an imperative verb like "Simplify"/"Solve", since those are frequently AVORA's own
  // worked-example demonstration lines, not questions posed to the learner.
  const check=Boolean(step.requiresLearnerResponse);
  if(check){
   const lead=CHECK_LEADS[checkIndex%CHECK_LEADS.length];
   checkIndex++;
   out.push({id,kind:'check',label:'YOUR TURN — THINK FIRST',spoken:`${lead}${text}`,lines:['Your turn',...boardLines(text)],boardAction:'ASK',pauseAfterMs:0,requiresLearnerResponse:true});
   continue;
  }
  out.push({id,kind:looksLikeExample(text)?'example':'idea',label:learnerLabel(text,academicIndex),spoken:naturalLead(text,academicIndex),lines:boardLines(text),boardAction:step.boardAction==='HIGHLIGHT'?'HIGHLIGHT':'WRITE',pauseAfterMs:step.pauseAfterMs});
  academicIndex++;
 }
 return out;
}

export function factorizationFoundation(topic:string,classLevel:string):LearnerTeachingMoment[]{
 if(!/factor(?:ization|isation)/i.test(topic))return [];
 const base='factor-foundation';
 return [
  {id:`${base}-meaning`,kind:'idea',label:'START WITH THE MEANING',spoken:'Factorization reverses expansion. Instead of multiplying brackets to make an expression, we start with the expression and rebuild the factors that multiply to give it.',lines:['Factorization reverses expansion.','Expanded expression  →  factors multiplied together'],boardAction:'WRITE',pauseAfterMs:900},
  {id:`${base}-standard-form`,kind:'idea',label:'ESTABLISH THE QUADRATIC FORM FIRST',spoken:'For the middle-term method, first write the quadratic in standard order: a x squared plus b x plus c. If it is an equation, put it in the form a x squared plus b x plus c equals zero. Here a is the coefficient of x squared, b is the coefficient of x, and c is the constant. An unwritten numerical coefficient is one.',lines:['ax² + bx + c','If solving an equation:  ax² + bx + c = 0','a = coefficient of x²','b = coefficient of x','c = constant','Unwritten numerical coefficient = 1'],boardAction:'WRITE',pauseAfterMs:1200},
  {id:`${base}-split`,kind:'idea',label:'WHY WE SPLIT THE MIDDLE TERM',spoken:'Suppose we split b x into m x plus n x. Because m x plus n x must still equal b x, the numbers m and n must add to b. That is our first condition: m plus n equals b.',lines:['Split bx as mx + nx','mx + nx = bx','So  m + n = b'],boardAction:'WRITE',pauseAfterMs:1100},
  {id:`${base}-ac`,kind:'idea',label:'WHERE THE PRODUCT ac COMES FROM',spoken:'The second condition comes from making the four terms factor by grouping. The two split coefficients must connect the first coefficient a and the constant c. For the grouping to reproduce the original quadratic, their product must be a times c. So m n equals a c. This is why the product is a c; it is not an unexplained trick.',lines:['For grouping to rebuild the quadratic:','m × n = a × c','So the pair must satisfy BOTH conditions:','m + n = b','mn = ac'],boardAction:'HIGHLIGHT',pauseAfterMs:1300},
  {id:`${base}-example`,kind:'example',label:'TEST BOTH CONDITIONS — DO NOT GUESS',spoken:'Take two x squared plus seven x plus three. Here a is two, b is seven and c is three. We need two numbers whose sum is seven and whose product is two times three, which is six. One and six work because one plus six is seven and one times six is six. Two and three have the right product, but their sum is five, so they fail.',lines:['2x² + 7x + 3','a = 2,  b = 7,  c = 3','Need: sum = 7','Need: product = ac = 2×3 = 6','1 and 6  ✓ sum 7, product 6','2 and 3  ✗ sum 5'],boardAction:'WRITE',pauseAfterMs:1500},
  {id:`${base}-group`,kind:'example',label:'NOW SPLIT AND GROUP',spoken:'Only after the pair is justified do we split the middle term: seven x becomes x plus six x. Then group the four terms and factor each group. Two x squared plus x plus six x plus three becomes x times open bracket two x plus one close bracket, plus three times the same bracket. The common bracket gives open bracket two x plus one close bracket open bracket x plus three close bracket.',lines:['2x² + 7x + 3','= 2x² + x + 6x + 3','= x(2x + 1) + 3(2x + 1)','= (2x + 1)(x + 3)','Check by expanding.'],boardAction:'WRITE',pauseAfterMs:1500},
  {id:`${base}-check`,kind:'check',label:'YOUR TURN — EXPLAIN THE RULE',spoken:'Before we move on, explain this: why must the two numbers have sum b and product a c?',lines:['Why must the two numbers satisfy BOTH?','sum = b','product = ac'],boardAction:'ASK',pauseAfterMs:0,requiresLearnerResponse:true},
 ];
}
