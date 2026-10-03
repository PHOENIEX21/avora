'use client';
import Link from 'next/link';
import {useEffect,useMemo,useRef,useState} from 'react';
import {useRouter,useSearchParams} from 'next/navigation';
import type {TutorPlan} from '@/lib/tutorCurriculum';
import {textbookChapters,siyavulaAttribution} from '@/lib/textbookScope';
import {deepExamples} from '@/lib/deepTeaching';
import {mathTeachingPack} from '@/lib/mathDeepTeaching';
import {groundingFor,mbsseAttribution} from '@/lib/academicGrounding';
import {teachingDepthProfile,termReason,exampleReasoningPrompt} from '@/lib/universalTeaching';
import {composeLearnerSourceMoments,factorizationFoundation} from '@/lib/lessonPresentation';
import VisualBoard from '@/components/VisualBoard';
import WholeNumbersLesson from '@/components/WholeNumbersLesson';
import JSS2WholeNumbersLesson from '@/components/JSS2WholeNumbersLesson';
import JSS2PremiumMathLesson,{jss2PremiumMathTopics} from '@/components/JSS2PremiumMathLesson';
import JSS2DebateLesson from '@/components/JSS2DebateLesson';
import JSS1SpeechSoundsLesson from '@/components/JSS1SpeechSoundsLesson';
import JSS2OralComprehensionLesson from '@/components/JSS2OralComprehensionLesson';
import JSS2OralSummaryLesson from '@/components/JSS2OralSummaryLesson';
import JSS2ReadingFluencyLesson from '@/components/JSS2ReadingFluencyLesson';
import JSS2WritersPurposeLesson from '@/components/JSS2WritersPurposeLesson';
import JSS2ContextMeaningLesson from '@/components/JSS2ContextMeaningLesson';
import JSS2CriticalReadingLesson from '@/components/JSS2CriticalReadingLesson';
import JSS2ReadingForSummaryLesson from '@/components/JSS2ReadingForSummaryLesson';
import JSS2PartsOfSpeechCoreLesson from '@/components/JSS2PartsOfSpeechCoreLesson';
import JSS2PartsOfSpeechExtendedLesson from '@/components/JSS2PartsOfSpeechExtendedLesson';
import JSS2DirectIndirectSpeechLesson from '@/components/JSS2DirectIndirectSpeechLesson';
import JSS2FunctionalSentenceTypesLesson from '@/components/JSS2FunctionalSentenceTypesLesson';
import JSS2StructuralSentenceTypesLesson from '@/components/JSS2StructuralSentenceTypesLesson';
import JSS2TensesLesson from '@/components/JSS2TensesLesson';
import JSS2CompositionWritingLesson from '@/components/JSS2CompositionWritingLesson';
import JSS2LetterWritingLesson from '@/components/JSS2LetterWritingLesson';
import JSS2ReadingPlaysLesson from '@/components/JSS2ReadingPlaysLesson';
import JSS2AppreciatingActingPlaysLesson from '@/components/JSS2AppreciatingActingPlaysLesson';
import JSS2SkitMakingLesson from '@/components/JSS2SkitMakingLesson';
import JSS2WritingDialoguesLesson from '@/components/JSS2WritingDialoguesLesson';
import LCMLesson from '@/components/LCMLesson';
import HCFLesson from '@/components/HCFLesson';
import AdditionSubtractionLesson from '@/components/AdditionSubtractionLesson';
import CountingBaseTwoLesson from '@/components/CountingBaseTwoLesson';
import BaseTenToBinaryLesson from '@/components/BaseTenToBinaryLesson';
import FractionsLesson from '@/components/FractionsLesson';
import FractionAddSubtractLesson from '@/components/FractionAddSubtractLesson';
import FractionMultiplyDivideLesson from '@/components/FractionMultiplyDivideLesson';
import EstimationLesson from '@/components/EstimationLesson';
import ApproximationLesson from '@/components/ApproximationLesson';
import BinaryAdditionLesson from '@/components/BinaryAdditionLesson';
import BinarySubtractionLesson from '@/components/BinarySubtractionLesson';
import BinaryMultiplicationLesson from '@/components/BinaryMultiplicationLesson';
import UseOfSymbolsLesson from '@/components/UseOfSymbolsLesson';
import SimplificationAlgebraLesson from '@/components/SimplificationAlgebraLesson';
import SimpleEquationsLesson from '@/components/SimpleEquationsLesson';
import PlaneShapesLesson from '@/components/PlaneShapesLesson';
import ThreeDimensionalFiguresLesson from '@/components/ThreeDimensionalFiguresLesson';
import ConstructionLesson from '@/components/ConstructionLesson';
import AnglesLesson from '@/components/AnglesLesson';
import NeedForStatisticsLesson from '@/components/NeedForStatisticsLesson';
import DataCollectionLesson from '@/components/DataCollectionLesson';
import DataPresentationLesson from '@/components/DataPresentationLesson';
import {visualFor} from '@/lib/visualTeaching';
import {cacheTutorLesson,getCachedTutorLesson,queueSyncAction,flushQueuedActions,countPendingSyncActions} from '@/lib/offline';
import {trackEvent} from '@/lib/telemetry';
import {learnerSessionTitle,learnerTopicTitle} from '@/lib/learnerPresentation';
import {officialNerdc2025Topic} from '@/lib/nerdc2025Official';

type Topic={name:string;questions:number};
type Q={id:string;prompt:string;type:string;options:string[];hint:string;explanation:string;difficulty:number;skill:string;topic:string};
type Feedback={correct:boolean;hint?:string;explanation?:string;feedback?:string;correctAnswer?:string;questionHelp?:string;concept?:string;solutionSteps?:string[];misconception?:string;optionReview?:Array<{option:string;correct:boolean;note:string}>;finalAnswer?:string};
type BoardEvent={stepId:string;label:string;spoken:string;lines:string[];kind:'intro'|'term'|'idea'|'example'|'mistake'|'check';question?:string;expectation?:string;modelAnswer?:string;boardAction?:'WRITE'|'DRAW'|'HIGHLIGHT'|'CLEAR_SECTION'|'ASK'|'PAUSE';pauseAfterMs?:number};
type ChatTurn={role:'student'|'teacher';text:string};
type StructuredExample={title:string;problem:string;steps:string[];why:string;check:string;verification?:string;difficulty?:number;curriculumFocus?:string};
type Phase='probe'|'teach'|'guided'|'exercise'|'success';
const VOICE_TEACHING_ENABLED=process.env.NEXT_PUBLIC_VOICE_TEACHING_ENABLED==='true';
type GuidanceMeta={reguideStepId?:string|null;assistanceLevel?:'HINT'|'RETEACH'|'ANSWER';requiresFreshEvidence?:boolean};

async function parseJson(r:Response,label:string){const text=await r.text();if(!text.trim())throw new Error(`${label} returned no data.`);let d:any;try{d=JSON.parse(text)}catch{throw new Error(`${label} returned an invalid response.`)}if(r.status===401){const e:any=new Error('Session expired.');e.code='SESSION_EXPIRED';throw e}if(!r.ok)throw new Error(d.error||`${label} failed.`);return d}
function splitSentences(text:string){return text.split(/(?<=[.!?])\s+/).map(x=>x.trim()).filter(Boolean)}
function lessonSlideChunks(text:string,maxChars=460){
 const sentences=splitSentences(String(text||'').trim());if(!sentences.length)return text.trim()?[text.trim()]:[];
 const chunks:string[]=[];let bucket='';
 const push=(value:string)=>{const v=value.trim();if(v)chunks.push(v)};
 for(const sentence of sentences){
  if(sentence.length>maxChars){
   if(bucket){push(bucket);bucket=''}
   const parts=sentence.split(/(?<=[,;:])\s+/).map(x=>x.trim()).filter(Boolean);let inner='';
   for(const part of parts){const next=inner?`${inner} ${part}`:part;if(next.length>maxChars&&inner){push(inner);inner=part}else inner=next}
   if(inner.length>maxChars){const words=inner.split(/\s+/);let wordBucket='';for(const word of words){const next=wordBucket?`${wordBucket} ${word}`:word;if(next.length>maxChars&&wordBucket){push(wordBucket);wordBucket=word}else wordBucket=next}if(wordBucket)push(wordBucket)}else push(inner);
   continue
  }
  const next=bucket?`${bucket} ${sentence}`:sentence;
  if(next.length>maxChars&&bucket){push(bucket);bucket=sentence}else bucket=next
 }
 if(bucket)push(bucket);return chunks
}
function slideBoardLines(text:string){
 const parts=splitSentences(text).flatMap(x=>x.split(/\s*;\s*/)).map(x=>x.trim()).filter(Boolean);
 if(parts.length)return parts.slice(0,4);
 return text.trim()?[text.trim()]:[]
}
function narrationSegments(text:string){
 const out:string[]=[];
 for(const sentence of splitSentences(verbalize(text))){
  if(sentence.length<=210){out.push(sentence);continue}
  const parts=sentence.split(/(?<=[,;:])\s+/).map(x=>x.trim()).filter(Boolean);let bucket='';
  for(const part of parts){const next=bucket?`${bucket} ${part}`:part;if(next.length>210&&bucket){out.push(bucket);bucket=part}else bucket=next}
  if(bucket)out.push(bucket)
 }
 return out.length?out:[verbalize(text)]
}
type VoiceChoice={uri:string;name:string;lang:string;local:boolean};
function voiceScore(v:SpeechSynthesisVoice){const lang=v.lang.toLowerCase();let score=0;if(lang==='en-ng')score+=120;else if(lang.startsWith('en-gb'))score+=90;else if(lang.startsWith('en-us'))score+=75;else if(lang.startsWith('en-'))score+=60;if(/natural|neural|premium|enhanced|online|google|microsoft/i.test(v.name))score+=35;if(v.localService)score+=5;return score}
function preferredVoice(voices:SpeechSynthesisVoice[]){return [...voices].filter(v=>/^en(-|_)/i.test(v.lang)).sort((a,b)=>voiceScore(b)-voiceScore(a)||a.name.localeCompare(b.name))[0]||voices[0]}
function authoredExample(text:string,index:number):StructuredExample{const chunks=String(text||'').split(/(?:\s*→\s*|;\s+|(?<=[.!?])\s+)/).map(x=>x.trim()).filter(Boolean);const problem=chunks[0]||String(text||'');const steps=(chunks.length>1?chunks.slice(1):chunks).slice(0,8);return {title:`AUTHORED EXAMPLE ${index+1}`,problem,steps:steps.length?steps:[problem],why:'AVORA shows the evidence, calculation or transformation rather than jumping from the question to an answer.',check:'Explain the decisive rule, evidence or transformation in this example, then apply it to a fresh case.'}}
function verbalize(text:string){return text.replace(/([01]+)₂/g,(_,digits:string)=>`${digits.split('').join('-')} base two`).replace(/([0-9]+)₁₀/g,(_,digits:string)=>`${digits} base ten`).replace(/cm²/g,'square centimetres').replace(/cm³/g,'cubic centimetres').replace(/kg/g,'kilograms').replace(/cm/g,'centimetres').replace(/÷/g,' divided by ').replace(/×/g,' times ').replace(/=/g,' equals ').replace(/→/g,' then ').replace(/π/g,'pi').replace(/√/g,'square root of ')}

function words(text:string){return new Set(String(text||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(x=>x.length>3&&!['this','that','with','from','what','your','then','into','when','where','which','using','question','answer'].includes(x)))}
function questionFit(q:Q|undefined,unit:any){if(!q||!unit)return 0;const target=words([unit.title,unit.explain,(unit.terms||[]).map((x:any)=>x[0]).join(' '),(unit.outcomes||[]).join(' ')].join(' '));const source=words([q.skill,q.prompt,q.topic].join(' '));let score=0;for(const w of source)if(target.has(w))score++;return score}
function questionInstruction(q:Q){if(q.type==='MULTIPLE_CHOICE')return 'Choose the option you believe is correct. Work it out first if needed, then tap one answer. AVORA will tell you clearly whether you got it and explain why.';return 'Work through the question, then type your answer or reasoning. AVORA will check it and explain what to improve.'}

function buildEvents(unit:any,topic:string,subject:string,classLevel:string):BoardEvent[]{
 if(!unit)return [];
 const events:Array<Omit<BoardEvent,'stepId'>&{stepId?:string}>=[];
 const depth=teachingDepthProfile(unit,subject);
 const mathPack=subject==='Mathematics'?mathTeachingPack(classLevel,topic):undefined;
 // Source-backed lessons are authoritative. Once a unit has structured source steps, do not
 // surround them with generic tutor templates, duplicate examples, synthetic misconceptions or
 // stock prompts. Those additions made AVORA drift away from the authored curriculum and could
 // make a complete lesson sound repetitive or unrelated. Teach the supplied content, in order,
 // and treat only authored checks[] as learner questions.
 if(Array.isArray(unit.structuredSteps)&&unit.structuredSteps.length){
  const sourceEvents:BoardEvent[]=[];
  for(const moment of composeLearnerSourceMoments(unit.structuredSteps)){
   const base:BoardEvent={
    stepId:moment.id,kind:moment.kind,label:moment.label,spoken:moment.spoken,
    question:moment.requiresLearnerResponse?moment.lines.slice(1).join(' '):undefined,
    modelAnswer:undefined,
    expectation:moment.requiresLearnerResponse?'Attempt the authored curriculum check. Show the reasoning or working the question asks for.':undefined,
    lines:moment.lines,boardAction:moment.boardAction,pauseAfterMs:moment.pauseAfterMs
   };
   // Deep authored paragraphs are preserved in full, but presented as readable lesson slides.
   // Checks and explicit visual-only moments remain single slides so their interaction is not fragmented.
   if(moment.requiresLearnerResponse||moment.kind==='check'||!moment.spoken||moment.spoken.length<=520){sourceEvents.push(base);continue}
   const chunks=lessonSlideChunks(moment.spoken);
   chunks.forEach((spoken,index)=>sourceEvents.push({...base,stepId:`${moment.id}-slide-${index+1}`,label:index===0?moment.label:`${moment.label} · CONTINUED`,spoken,lines:slideBoardLines(spoken),pauseAfterMs:index===chunks.length-1?moment.pauseAfterMs:500}));
  }
  return sourceEvents.filter(e=>{
   if(e.kind==='check')return false;
   const learnerText=[e.label,e.spoken,...(e.lines||[])].join(' ').toLowerCase();
   if(/nerdc source provenance|curriculum page|source provenance/.test(learnerText))return false;
   if(/what this topic must cover before avora can call the teaching complete/.test(learnerText))return false;
   if(/learning objective|learning objectives|nerdc objective|nerdc objectives/.test(learnerText))return false;
   return true;
  });
 }
 events.push({kind:'intro',label:'WHY THIS MATTERS',spoken:unit.why||`We are going to understand ${unit.title}, not just memorize a rule.`,lines:[unit.title,unit.why||`This is a required part of ${topic}.`]});
 events.push({kind:'idea',label:'WHAT YOU WILL UNDERSTAND',spoken:`By the end of this section, you should be able to explain the idea, apply it and justify your reasoning.`,lines:['By the end, you should be able to:',...depth.outcomes.map((x:string)=>`• ${x}`)]});
 events.push({kind:'idea',label:'BUILD THE FOUNDATION FIRST',spoken:`Before examples, we connect the knowledge this lesson depends on. ${depth.prerequisites.join('. ')}. If one of these is unclear, interrupt me and we will rebuild it.`,lines:['Foundation first:',...depth.prerequisites.map((x:string)=>`• ${x}`)]});
 if(mathPack?.terms.length){
  events.push({kind:'idea',label:'WORDS MUST MEAN SOMETHING BEFORE WE USE THEM',spoken:`Before working, we define the mathematical language for ${topic}.`,lines:['Terms first — no unexplained vocabulary']});
  for(const def of mathPack.terms){
   events.push({kind:'term',label:`TERM — ${def.term.toUpperCase()}`,spoken:`${def.term}. ${def.simple}. More formally: ${def.formal} Example: ${def.example} Contrast: ${def.contrast} In this lesson: ${def.use}`,lines:[def.term,`Simple meaning: ${def.simple}`,`Formal meaning: ${def.formal}`,`Example: ${def.example}`,`Not this: ${def.contrast}`,`Why we need it: ${def.use}`]});
  }
 }
 for(const [term,meaning] of unit.terms||[]){
   events.push({kind:'term',label:'KEY WORD — MEANING',spoken:termReason(term,meaning,subject),lines:[term,meaning]});
   events.push({kind:'idea',label:'WHY THAT WORD MATTERS',spoken:termReason(term,meaning,subject),lines:[`When you see “${term}”…`,subject==='English Language'?'Find the exact language role or evidence it describes.':'Connect the word to the quantity, symbol, relationship or operation it describes.','Do not continue until the word makes sense.']});
 }
 if(Array.isArray(unit.teachingTypes)&&unit.teachingTypes.length){
  events.push({kind:'idea',label:'THE TYPES YOU MUST BE ABLE TO HANDLE',spoken:`This topic has different forms. Learning one easy example is not complete coverage. We will recognise the important types and what changes between them.`,lines:['Required forms / types:',...unit.teachingTypes.map((x:string)=>`• ${x}`)]});
 }
 // Internal authoring/no-jump notes guide the runtime, but are never read aloud or shown as learner content.
 // High-risk concepts can inject a carefully authored conceptual bridge before examples.
 for(const moment of factorizationFoundation(topic,classLevel)){
  events.push({stepId:moment.id,kind:moment.kind,label:moment.label,spoken:moment.spoken,question:moment.requiresLearnerResponse?moment.lines.slice(1).join(' '):undefined,expectation:moment.requiresLearnerResponse?'Explain the relationship in your own words before continuing.':undefined,lines:moment.lines,boardAction:moment.boardAction,pauseAfterMs:moment.pauseAfterMs});
 }
 // Source content is compiled into learner-facing teaching moments. Raw source rows, provenance and author instructions never reach the board or voice.
 for(const moment of composeLearnerSourceMoments(unit.structuredSteps)){
  events.push({stepId:moment.id,kind:moment.kind,label:moment.label,spoken:moment.spoken,question:moment.requiresLearnerResponse?moment.lines.slice(1).join(' '):undefined,modelAnswer:undefined,expectation:moment.requiresLearnerResponse?'Attempt it first. Show the reasoning or working that the question asks for.':undefined,lines:moment.lines,boardAction:moment.boardAction,pauseAfterMs:moment.pauseAfterMs});
 }
 const parts=splitSentences(unit.explain||'');
 parts.forEach((p:string,i:number)=>events.push({kind:'idea',label:i===0?'CORE IDEA — SLOWLY':'BUILD THE IDEA — ONE REASON AT A TIME',spoken:`${p} Now ask yourself what makes this statement true and how it connects to the definitions we just established.`,lines:[p,'What makes this true?','Which definition or rule supports it?']}));
 if(unit.why)events.push({kind:'idea',label:'REASONING BEHIND THE RULE',spoken:unit.why,lines:['Why this works',unit.why]});
 const bankRich=deepExamples(unit.title);
 const authored=Array.isArray(unit.workedExamples)?unit.workedExamples.slice(0,5).map((x:string,i:number)=>authoredExample(x,i)):[];
 const rich:StructuredExample[]=mathPack?.workedExamples?.length?mathPack.workedExamples:(bankRich.length?bankRich:authored);
 if(rich.length){
  rich.forEach((ex,ei)=>{
   events.push({kind:'example',label:`EXAMPLE ${ei+1} — UNDERSTAND THE SITUATION`,spoken:`Let us work this example slowly. ${ex.problem} Before doing anything, identify what is given, what is required and which concept this belongs to.`,lines:[ex.title,ex.problem,'GIVEN → REQUIRED → METHOD','Now watch the working change one line at a time.']});
   ex.steps.forEach((step,si)=>events.push({kind:'example',label:`EXAMPLE ${ei+1} · REASONING STEP ${si+1}`,spoken:`${step} ${exampleReasoningPrompt(step,si,subject)}`,lines:[`Step ${si+1}`,step,subject==='English Language'?'What language evidence makes this step valid?':'What rule allows this step? Why this operation?']}));
   events.push({kind:'idea',label:`EXAMPLE ${ei+1} — WHY THE METHOD WORKS`,spoken:ex.why,lines:['Why it works',ex.why]});
   if(ex.verification)events.push({kind:'idea',label:`EXAMPLE ${ei+1} — VERIFY, DO NOT JUST TRUST THE ANSWER`,spoken:ex.verification,lines:['Independent verification',ex.verification]});
   events.push({kind:'check',label:`EXAMPLE ${ei+1} — EXPLAIN IT BACK`,spoken:`Pause here and answer this in your own words or working: ${ex.check}`,question:ex.check,expectation:'Explain the key idea, rule or step. AVORA is checking understanding, not memorised wording.',lines:['Pause here','Explain the reasoning, not only the final answer.','The question appears once below so you can focus on it clearly.']});
  });
 }
 if(mathPack?.standardQuestions?.length){
  const standard=mathPack.standardQuestions.slice(0,8);
  events.push({kind:'idea',label:'CURRICULUM-STANDARD PRACTICE SET',spoken:`You have also got ${standard.length} reviewed questions aligned to this topic. These move from concept and misconception checks into application, reasoning and transfer. We will not mistake seeing an answer for mastery; you must solve them yourself after the demonstrations.`,lines:['Reviewed question set',...standard.map((q,i)=>`${i+1}. ${q.prompt}`)]});
 }
 else{
  const exampleText=String(unit.example||'');
  events.push({kind:'example',label:'WORKED EXAMPLE 1 — FIRST READ',spoken:`Here is our first worked example. ${exampleText} Do not copy the answer. First identify what is happening and which idea controls it.`,lines:['Worked example 1',exampleText,'What is happening here? Which idea controls it?']});
  const steps=exampleText.split('→').map((x:string)=>x.trim()).filter(Boolean);
  const breakdown=steps.length>1?steps:depth.exampleBreakdown.map((x:string)=>x.replace(/^\d+\.\s*/,''));
  breakdown.forEach((step:string,i:number)=>events.push({kind:'example',label:`WORKED EXAMPLE 1 · REASONING ${i+1}`,spoken:exampleReasoningPrompt(step,i,subject),lines:[`${subject==='English Language'?'Reasoning point':'Step'} ${i+1}`,step,subject==='English Language'?'Which word, structure or evidence controls this?':'What changed? Which rule allows it?']}));
  events.push({kind:'idea',label:'WORKED EXAMPLE 1 — EXPLAIN THE REASON',spoken:`A finished answer is not enough. Rebuild the example by naming the concept, explaining why it applies, and checking that the result answers the original task.`,lines:['Name the concept','Explain why it applies','Follow each step','Check the final result']});
  events.push({kind:'example',label:'EXAMPLE 2 — CONTRAST THE THINKING',spoken:`Now compare the correct reasoning with a tempting wrong approach. The purpose is to understand what must stay true when the wording, numbers or sentence changes.`,lines:['A second way to learn:',subject==='English Language'?'Compare the correct language evidence with a tempting but unsupported choice.':'Compare the correct method with a tempting operation or formula that does not fit.','Ask: exactly which rule would the wrong approach break?']});
  events.push({kind:'idea',label:'EXAMPLE 2 — WHAT MUST STAY TRUE',spoken:`Even when the surface details change, the underlying concept stays the same. ${depth.masteryChecklist.join('. ')}.`,lines:['What must stay true:',...depth.masteryChecklist.slice(0,4).map((x:string)=>`• ${x}`)]});
  events.push({kind:'idea',label:'FRESH APPLICATION — PREPARE',spoken:`Next you will meet a fresh situation. Before answering, identify the concept, say what the question expects, choose a reasoned method, and check your result.`,lines:['Fresh application next','1. Identify the concept','2. Explain what is expected','3. Use the rule with reasons','4. Check the result']});
 }
 depth.misconceptions.forEach((m:string,i:number)=>events.push({kind:'mistake',label:`COMMON MISTAKE ${i+1} — WHY IT FAILS`,spoken:`A learner may make this mistake: ${m}. We do not just say “wrong”; we ask which definition, relationship, grammar rule, evidence or mathematical property it breaks.`,lines:['Common mistake',m,'Why it fails → which idea was broken?']}));
 events.push({kind:'idea',label:'BEFORE AVORA TESTS YOU',spoken:`Use this checklist before you answer: ${depth.masteryChecklist.join('. ')}.`,lines:['Understanding checklist',...depth.masteryChecklist.map((x:string)=>`✓ ${x}`)]});
 events.push({kind:'check',label:'SECTION UNDERSTANDING CHECK',spoken:`Now answer one clear question about exactly what we have just taught: ${unit.check}`,question:unit.check,expectation:subject==='English Language'?'Answer directly, identify the word/structure/evidence that controls the answer, and explain why it fits.':'Answer directly, state the rule or relationship first, show the working, and check the result.',lines:['Now you do something','Use only the concept just taught.','Explain the reason, not only the final answer.']});
 return events.filter(e=>e.kind!=='check').map((e,i)=>({...e,stepId:e.stepId||`runtime-${String(i+1).padStart(3,'0')}`,question:undefined,expectation:undefined})) as BoardEvent[];
}


function AuthoredGeometryDiagram({topic,title,example}:{topic:string;title:string;example?:string}){
 const key=(topic+' '+title).toLowerCase();const text=String(example||'');const deg=text.match(/(\d+(?:\.\d+)?)°/)?.[1];const metres=[...text.matchAll(/(\d+(?:\.\d+)?)\s*m\b/gi)].map(x=>x[1]);const theta=deg?deg+'°':'θ';
 if(key.includes('elevation')||key.includes('depression')){
  const depression=key.includes('depression');const base=metres[0]?metres[0]+' m':'horizontal distance';const height=metres[1]?metres[1]+' m':'height';
  return <figure className="authored-geometry-figure"><svg viewBox="0 0 640 330" role="img" aria-label={depression?'Angle of depression diagram':'Angle of elevation diagram'}>
   <line x1="90" y1="270" x2="555" y2="270" className="geo-ground"/><line x1="485" y1="270" x2="485" y2="65" className="geo-strong"/><line x1="125" y1="245" x2="485" y2="65" className="geo-sight"/>
   <line x1="125" y1="245" x2="485" y2="245" className="geo-guide"/><path d="M185 245 A60 60 0 0 0 178 218" className="geo-angle"/>
   <circle cx="125" cy="245" r="5" className="geo-point"/><circle cx="485" cy="65" r="5" className="geo-point"/><circle cx="485" cy="270" r="5" className="geo-point"/>
   <text x="145" y="232" className="geo-label">{theta}</text><text x="285" y="292" className="geo-label">{base}</text><text x="500" y="170" className="geo-label">{height}</text><text x="95" y="238" className="geo-small">observer</text><text x="493" y="61" className="geo-small">top</text><text x="493" y="286" className="geo-small">foot</text>
   {depression&&<><line x1="485" y1="65" x2="585" y2="65" className="geo-guide"/><path d="M545 65 A60 60 0 0 1 537 91" className="geo-angle"/><text x="548" y="94" className="geo-label">{theta}</text></>}
  </svg><figcaption>{depression?'Depression is measured downward from the upper horizontal; the equal lower angle follows from parallel horizontals.':'Elevation is measured upward from the observer’s horizontal. Label the triangle before choosing a trigonometric ratio.'}</figcaption></figure>
 }
 if(key.includes('trigonometry')){
  return <figure className="authored-geometry-figure"><svg viewBox="0 0 640 330" role="img" aria-label="Right triangle trigonometry diagram"><polygon points="120,265 500,265 500,75" className="geo-shape"/><rect x="476" y="241" width="24" height="24" className="geo-right"/><path d="M185 265 A65 65 0 0 0 177 235" className="geo-angle"/><text x="145" y="242" className="geo-label">{theta}</text><text x="285" y="292" className="geo-label">Adjacent (A)</text><text x="512" y="175" className="geo-label">Opposite (O)</text><text x="285" y="155" className="geo-label">Hypotenuse (H)</text></svg><figcaption>SOH–CAH–TOA depends on the sides relative to the marked angle, not on where a side happens to be drawn.</figcaption></figure>
 }
 if(key.includes('similar shape')){
  return <figure className="authored-geometry-figure"><svg viewBox="0 0 640 330" role="img" aria-label="Similar shapes scale factor diagram"><polygon points="70,245 220,245 145,105" className="geo-shape"/><polygon points="330,265 590,265 460,45" className="geo-shape"/><text x="110" y="275" className="geo-label">original</text><text x="425" y="295" className="geo-label">enlargement</text><text x="105" y="170" className="geo-small">corresponding sides</text><text x="420" y="160" className="geo-small">same angles, proportional sides</text></svg><figcaption>Match corresponding vertices first. A length scale factor k produces area factor k² and volume factor k³.</figcaption></figure>
 }
 if(key.includes('construction')){
  return <figure className="authored-geometry-figure"><svg viewBox="0 0 640 330" role="img" aria-label="Compass and straightedge construction diagram"><line x1="95" y1="255" x2="545" y2="255" className="geo-strong"/><line x1="180" y1="255" x2="420" y2="95" className="geo-strong"/><path d="M245 255 A65 65 0 0 0 232 219" className="geo-angle"/><path d="M125 255 A130 130 0 0 1 238 142" className="geo-arc"/><path d="M305 255 A125 125 0 0 0 250 150" className="geo-arc"/><circle cx="180" cy="255" r="5" className="geo-point"/><text x="150" y="282" className="geo-label">vertex</text><text x="235" y="224" className="geo-label">θ</text></svg><figcaption>Construction arcs remain visible: the arcs justify the exact ray or point; the final straight line is drawn only after the construction locates it.</figcaption></figure>
 }
 if(key.includes('area of plane')||key.includes('plane figure')){
  return <figure className="authored-geometry-figure"><svg viewBox="0 0 640 330" role="img" aria-label="Plane figures diagram"><polygon points="55,240 230,240 190,110 95,110" className="geo-shape"/><line x1="95" y1="110" x2="95" y2="240" className="geo-guide"/><circle cx="455" cy="175" r="105" className="geo-shape"/><line x1="455" y1="175" x2="560" y2="175" className="geo-strong"/><text x="115" y="275" className="geo-label">trapezium</text><text x="470" y="165" className="geo-label">r</text><text x="410" y="305" className="geo-label">circle</text></svg><figcaption>Use perpendicular height for area calculations; a sloping side is not automatically the height.</figcaption></figure>
 }
 return null;
}

export default function TutorClient(){
 const router=useRouter(),params=useSearchParams();
 const loadRequestRef=useRef(0);
 async function readJson(r:Response,label:string){try{return await parseJson(r,label)}catch(e:any){if(e?.code==='SESSION_EXPIRED'){router.replace('/login');router.refresh()}throw e}}
 const requestedTopic=params.get('topic')||'';
 const requestedSubject=params.get('subject')||'';
 const requestedPreviewClass=params.get('previewClass')||'';
 const [subject,setSubject]=useState(requestedSubject==='English Language'?'English Language':'Mathematics');
 const [topic,setTopic]=useState(requestedTopic);
 const [topics,setTopics]=useState<Topic[]>([]);
 const [plan,setPlan]=useState<TutorPlan|undefined>(undefined);
 const [exam,setExam]=useState('BECE');const [classLevel,setClassLevel]=useState('JSS3');
 const [previewClass,setPreviewClass]=useState(['JSS1','JSS2','JSS3'].includes(requestedPreviewClass)?requestedPreviewClass:'');
 const [questions,setQuestions]=useState<Q[]>([]);const [exerciseQuestions,setExerciseQuestions]=useState<Q[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 const [phase,setPhase]=useState<Phase>('probe');const [unitIndex,setUnitIndex]=useState(0);const [covered,setCovered]=useState<number[]>([]);
 const [answer,setAnswer]=useState('');const [feedback,setFeedback]=useState<Feedback|null>(null);const [checking,setChecking]=useState(false);
 const [eventIndex,setEventIndex]=useState(0);const [paused,setPaused]=useState(false);const [voiceOn,setVoiceOn]=useState(VOICE_TEACHING_ENABLED);const [rate,setRate]=useState(.9);const [speaking,setSpeaking]=useState(false);const [extraBoard,setExtraBoard]=useState<string[]>([]);
 const [voiceChoices,setVoiceChoices]=useState<VoiceChoice[]>([]);const [voiceURI,setVoiceURI]=useState('');const [speechAvailable,setSpeechAvailable]=useState(true);const [narrationSegment,setNarrationSegment]=useState(0);const [narrationChar,setNarrationChar]=useState(0);const [syncing,setSyncing]=useState(false);
 const timer=useRef<number|null>(null);const utterance=useRef<SpeechSynthesisUtterance|null>(null);const started=useRef(false);const pausedRef=useRef(false);const playToken=useRef(0);const skipPlaybackEffect=useRef(false);
 const [ask,setAsk]=useState('');const [asking,setAsking]=useState(false);const [chat,setChat]=useState<ChatTurn[]>([]);const [checkpoint,setCheckpoint]=useState('');const [checkpointReply,setCheckpointReply]=useState('');const [checkingPoint,setCheckingPoint]=useState(false);
 const [questionHelp,setQuestionHelp]=useState('');const [revealed,setRevealed]=useState<Feedback|null>(null);const [helping,setHelping]=useState(false);
 const [reguideStepId,setReguideStepId]=useState<string|null>(null);const [assistanceLevel,setAssistanceLevel]=useState<'HINT'|'RETEACH'|'ANSWER'|null>(null);const [freshEvidenceRequired,setFreshEvidenceRequired]=useState(false);
 const [online,setOnline]=useState(true);const [sessionReady,setSessionReady]=useState(false);const [restoredSession,setRestoredSession]=useState(false);const [lastSavedAt,setLastSavedAt]=useState<number|null>(null);const [screenAwake,setScreenAwake]=useState(false);const [autoPausedByVisibility,setAutoPausedByVisibility]=useState(false);const [cachedLesson,setCachedLesson]=useState(false);const [pendingSync,setPendingSync]=useState(0);
 const [showLessonMap,setShowLessonMap]=useState(false);const [showAskPanel,setShowAskPanel]=useState(false);const [visitedSlides,setVisitedSlides]=useState<Record<number,number>>({});
 const [exerciseIndex,setExerciseIndex]=useState(0);const [exerciseAnswer,setExerciseAnswer]=useState('');const [exerciseFeedback,setExerciseFeedback]=useState<Feedback|null>(null);const [exerciseChecking,setExerciseChecking]=useState(false);const [exerciseCorrect,setExerciseCorrect]=useState(0);const [exerciseFinished,setExerciseFinished]=useState(false);
 const wakeLockRef=useRef<any>(null);const activeSessionKeyRef=useRef('');const slideTouchRef=useRef({x:0,y:0,blocked:false});const lessonStageRef=useRef<HTMLElement|null>(null);


 const sourceChapters=useMemo(()=>subject==='Mathematics'?textbookChapters(classLevel,topic):[],[classLevel,subject,topic]);
 const officialTopic=useMemo(()=>officialNerdc2025Topic(classLevel,subject,topic),[classLevel,subject,topic]);
 const unit=plan?.units[unitIndex];
 const grounding=useMemo(()=>groundingFor(subject,unit?.title||topic,classLevel),[subject,unit?.title,topic,classLevel]);
 const events=useMemo(()=>buildEvents(unit,topic,subject,classLevel),[unit,topic,subject,classLevel]);const event=events[Math.min(eventIndex,Math.max(0,events.length-1))];
 const maxVisitedEventIndex=Math.max(eventIndex,visitedSlides[unitIndex]??0);
 const lessonSteps=useMemo(()=>events.map(e=>({id:e.stepId,label:e.label,kind:e.kind,summary:String(e.question||e.lines[0]||e.spoken).slice(0,500)})),[events]);
 const spokenSegments=useMemo(()=>event?narrationSegments(event.spoken):[],[event]);
 const activeSpokenSegment=spokenSegments[Math.min(narrationSegment,Math.max(0,spokenSegments.length-1))]||'';
 const narrationProgress=spokenSegments.length?Math.min(100,Math.round(((narrationSegment+(activeSpokenSegment?Math.min(1,narrationChar/Math.max(1,activeSpokenSegment.length)):0))/spokenSegments.length)*100)):0;
 const visibleBoardLineCount=!VOICE_TEACHING_ENABLED?(event?.lines?.length||0):syncing&&voiceOn&&event?.lines?.length>1?Math.max(1,Math.ceil(((narrationSegment+1)/Math.max(1,spokenSegments.length))*event.lines.length)):(event?.lines?.length||0);
 const visualSpec=useMemo(()=>subject==='Mathematics'&&event?visualFor(topic,event.label,event.lines):{kind:'none' as const,title:'',caption:''},[subject,topic,event]);
 const topicKey=String(topic||'').trim().toLowerCase().replace(/\s+/g,' ');
 const unitKey=String(unit?.title||'').trim().toLowerCase().replace(/\s+/g,' ');
 const useAuthoredWholeNumbers=classLevel==='JSS1'&&subject==='Mathematics'&&topic.toLowerCase()==='whole numbers';
 const requestedTopicKey=String(requestedTopic||'').trim().toLowerCase().replace(/\s+/g,' ');
 const jss2RouteTopicKey=requestedTopicKey||topicKey;
 const useJSS2WholeNumbers=classLevel==='JSS2'&&subject==='Mathematics'&&jss2RouteTopicKey==='whole numbers';
 const jss2PremiumTopic=jss2PremiumMathTopics.find(t=>t.trim().toLowerCase().replace(/\s+/g,' ')===jss2RouteTopicKey);
 const useJSS2PremiumMath=classLevel==='JSS2'&&subject==='Mathematics'&&!useJSS2WholeNumbers&&Boolean(jss2PremiumTopic);
 const useJSS1SpeechSounds=classLevel==='JSS1'&&subject.toLowerCase().includes('english')&&['speech sounds (vowels and consonants)','speech sounds vowels and consonants'].includes(jss2RouteTopicKey);
 const useJSS2Debate=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['debate','debates'].includes(jss2RouteTopicKey);
 const useJSS2OralComprehension=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['oral comprehension','oral comprehensi on'].includes(jss2RouteTopicKey);
 const useJSS2OralSummary=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['oral summary'].includes(jss2RouteTopicKey);
 const useJSS2ReadingFluency=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['reading with fluency'].includes(jss2RouteTopicKey);
 const useJSS2WritersPurpose=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&["reading to understand the writer's purpose","reading to understand the writer’s purpose"].includes(jss2RouteTopicKey);
 const useJSS2ContextMeaning=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['reading to identify the meanings of words in various contexts'].includes(jss2RouteTopicKey);
 const useJSS2CriticalReading=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['critical reading'].includes(jss2RouteTopicKey);
 const useJSS2ReadingForSummary=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['reading for summary'].includes(jss2RouteTopicKey);
 const useJSS2PartsOfSpeechCore=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['parts of speech: noun, pronoun, verb and adjective','parts of speech noun pronoun verb and adjective'].includes(jss2RouteTopicKey);
 const useJSS2PartsOfSpeechExtended=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['parts of speech: adverbs, conjunctions, prepositions and interjections','parts of speech adverbs conjunctions prepositions and interjections'].includes(jss2RouteTopicKey);
 const useJSS2DirectIndirectSpeech=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['direct and indirect speeches','direct and indirect speech'].includes(jss2RouteTopicKey);
 const useJSS2FunctionalSentenceTypes=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['sentence types (function): declarative, interrogative, imperative (command) and exclamatory','sentence types function declarative interrogative imperative command and exclamatory'].includes(jss2RouteTopicKey);
 const useJSS2StructuralSentenceTypes=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['structural sentence types (simple, compound and complex)','structural sentence types simple compound and complex'].includes(jss2RouteTopicKey);
 const useJSS2Tenses=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['tenses'].includes(jss2RouteTopicKey);
 const useJSS2CompositionWriting=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['composition writing: expository and argumentative essays','composition writing expository and argumentative essays'].includes(jss2RouteTopicKey);
 const useJSS2LetterWriting=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['letter writing: informal and formal','letter writing informal and formal'].includes(jss2RouteTopicKey);
 const useJSS2ReadingPlays=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['reading classappropriate plays','reading class-appropriate plays'].includes(jss2RouteTopicKey);
 const useJSS2AppreciatingActingPlays=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['reading and appreciating classappropriate plays','reading and appreciating class-appropriate plays'].includes(jss2RouteTopicKey);
 const useJSS2SkitMaking=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['skit-making','skit making','skit-making students should be able to'].includes(jss2RouteTopicKey);
 const useJSS2WritingDialogues=classLevel==='JSS2'&&subject.toLowerCase().includes('english')&&['writing dialogues'].includes(jss2RouteTopicKey);
 const lcmRouteText=(requestedTopicKey+' '+topicKey+' '+unitKey).trim();
 const hcfRouteText=(requestedTopicKey+' '+topicKey+' '+unitKey).trim();
 const useCleanLCM=subject==='Mathematics'&&(requestedTopicKey==='lcm'||topicKey==='lcm'||unitKey==='lcm'||lcmRouteText.includes('lowest common multiple')||/(^|[^a-z])lcm([^a-z]|$)/.test(lcmRouteText));
 const useCleanHCF=subject==='Mathematics'&&(requestedTopicKey==='hcf'||topicKey==='hcf'||unitKey==='hcf'||hcfRouteText.includes('highest common factor')||/(^|[^a-z])hcf([^a-z]|$)/.test(hcfRouteText));
 const useCleanCountingBaseTwo=classLevel==='JSS1'&&subject==='Mathematics'&&['counting in base 2','counting in base two'].includes(topic.trim().toLowerCase())||['counting in base 2','counting in base two'].includes(String(unit?.title||'').trim().toLowerCase());
 const useCleanBaseTenToBinary=classLevel==='JSS1'&&subject==='Mathematics'&&(['conversion of base 10 numerals to binary numbers','conversion of base 10 to binary numbers'].includes(topic.trim().toLowerCase())||['conversion of base 10 numerals to binary numbers','conversion of base 10 to binary numbers'].includes(String(unit?.title||'').trim().toLowerCase()));
 const useCleanFractions=classLevel==='JSS1'&&subject==='Mathematics'&&['fractions','fractions: types, simplification and equivalent fractions'].includes(topic.trim().toLowerCase());
 const useCleanAdditionSubtraction=classLevel==='JSS1'&&subject==='Mathematics'&&['addition and subtraction'].includes(topic.trim().toLowerCase());
 const useCleanFractionAddSubtract=classLevel==='JSS1'&&subject==='Mathematics'&&['addition and subtraction of fractions','addition and subtraction of fraction'].includes(topic.trim().toLowerCase());
 const useCleanFractionMultiplyDivide=classLevel==='JSS1'&&subject==='Mathematics'&&['multiplications and divisions of fractions','multiplication and division of fractions','multiplication and division of fraction'].includes(topic.trim().toLowerCase());
 const useCleanEstimation=classLevel==='JSS1'&&subject==='Mathematics'&&topic.trim().toLowerCase()==='estimation';
 const useCleanApproximation=classLevel==='JSS1'&&subject==='Mathematics'&&topic.trim().toLowerCase()==='approximation';
 const authoredTopicKey=topicKey||unitKey;
 const isBinaryAdditionKey=(s:string)=>s.includes('addition')&&s.includes('base')&&(s.includes('2')||s.includes('two'));
 const useCleanBinaryAddition=classLevel==='JSS1'&&subject==='Mathematics'&&(isBinaryAdditionKey(topicKey)||isBinaryAdditionKey(unitKey));
 const isBinarySubtractionKey=(s:string)=>s.includes('subtraction')&&s.includes('base')&&(s.includes('2')||s.includes('two'));
 const useCleanBinarySubtraction=classLevel==='JSS1'&&subject==='Mathematics'&&(isBinarySubtractionKey(topicKey)||isBinarySubtractionKey(unitKey));
 const isBinaryMultiplicationKey=(s:string)=>s.includes('multiplication')&&s.includes('base')&&(s.includes('2')||s.includes('two'));
 const useCleanBinaryMultiplication=classLevel==='JSS1'&&subject==='Mathematics'&&(isBinaryMultiplicationKey(topicKey)||isBinaryMultiplicationKey(unitKey));
 const useCleanUseOfSymbols=classLevel==='JSS1'&&subject==='Mathematics'&&(['use of symbols','use of symbol'].includes(topicKey)||['use of symbols','use of symbol'].includes(unitKey));
 const useCleanSimplificationAlgebra=classLevel==='JSS1'&&subject==='Mathematics'&&(topicKey==='simplification of algebraic expressions'||unitKey==='simplification of algebraic expressions');
 const useCleanSimpleEquations=classLevel==='JSS1'&&subject==='Mathematics'&&(topicKey==='simple equations'||unitKey==='simple equations');
 const useCleanPlaneShapes=classLevel==='JSS1'&&subject==='Mathematics'&&(topicKey==='plane shapes'||unitKey==='plane shapes');
 const useCleanThreeDimensionalFigures=classLevel==='JSS1'&&subject==='Mathematics'&&(topicKey==='three dimensional figures'||topicKey==='three-dimensional figures'||unitKey==='three dimensional figures'||unitKey==='three-dimensional figures');
 const useCleanConstruction=classLevel==='JSS1'&&subject==='Mathematics'&&(topicKey==='construction'||topicKey==='constructions'||unitKey==='construction'||unitKey==='constructions');
 const useCleanAngles=classLevel==='JSS1'&&subject==='Mathematics'&&(topicKey==='angles'||unitKey==='angles');
 const useCleanNeedForStatistics=classLevel==='JSS1'&&subject==='Mathematics'&&(topicKey==='need for statistics'||unitKey==='need for statistics');
 const useCleanDataCollection=classLevel==='JSS1'&&subject==='Mathematics'&&(topicKey==='data collection'||unitKey==='data collection');
 const useCleanDataPresentation=classLevel==='JSS1'&&subject==='Mathematics'&&(topicKey==='data presentation'||unitKey==='data presentation'||topicKey==='data representation'||unitKey==='data representation');
 const probeQ=questions.find(q=>q.type==='MULTIPLE_CHOICE'&&Array.isArray(q.options)&&q.options.length>=2);
 const exerciseQ=exerciseQuestions[exerciseIndex];
 const guidedQ=useMemo(()=>{if(!unit||!questions.length)return undefined;const ranked=[...questions].map(q=>({q,score:questionFit(q,unit)})).sort((a,b)=>b.score-a.score);const matched=ranked.filter(x=>x.score>=1);if(matched.length)return matched[unitIndex%matched.length].q;return questions[unitIndex%questions.length]},[questions,unit,unitIndex]);
 const lessonQuickCheck=useMemo(()=>{if(!unit||!exerciseQuestions.length)return undefined;const ranked=[...exerciseQuestions].filter(q=>q.type==='MULTIPLE_CHOICE'&&Array.isArray(q.options)&&q.options.length>=2).map(q=>({q,score:questionFit(q,unit)})).sort((a,b)=>b.score-a.score);return ranked.find(x=>x.score>=1)?.q},[exerciseQuestions,unit]);

 useEffect(()=>{setSubject(requestedSubject==='English Language'?'English Language':'Mathematics');},[requestedSubject]);
 useEffect(()=>{if(requestedTopic&&requestedTopic!==topic)setTopic(requestedTopic);},[requestedTopic,topic]);
 // The lesson loader intentionally re-runs only when the selected topic/subject changes.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(()=>{void load(topic,subject)},[subject,topic]);
 // stopAll is the current mounted playback cleanup; do not restart this effect on each render.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(()=>()=>stopAll(),[]);
 useEffect(()=>{
  if(!VOICE_TEACHING_ENABLED){setSpeechAvailable(false);setVoiceOn(false);return}
  if(typeof window==='undefined'||!('speechSynthesis'in window)){setSpeechAvailable(false);return}
  const synth=window.speechSynthesis;setSpeechAvailable(true);
  const refresh=()=>{const list=synth.getVoices();const english=list.filter(v=>/^en(-|_)/i.test(v.lang));const shown=(english.length?english:list).sort((a,b)=>voiceScore(b)-voiceScore(a)||a.name.localeCompare(b.name));setVoiceChoices(shown.map(v=>({uri:v.voiceURI,name:v.name,lang:v.lang,local:v.localService})));setVoiceURI(current=>{if(current&&shown.some(v=>v.voiceURI===current))return current;const saved=window.localStorage.getItem('avora:tutor-voice-uri');if(saved&&shown.some(v=>v.voiceURI===saved))return saved;return preferredVoice(shown)?.voiceURI||''})};
  refresh();synth.addEventListener?.('voiceschanged',refresh);return()=>synth.removeEventListener?.('voiceschanged',refresh)
 },[]);
 // Playback is driven by these state transitions; event/playCurrent are derived from the same render.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(()=>{if(!VOICE_TEACHING_ENABLED||phase!=='teach'||!event||paused)return;if(skipPlaybackEffect.current){skipPlaybackEffect.current=false;return}playCurrent();return clearTimer},[phase,eventIndex,paused,voiceOn,rate,voiceURI,unitIndex]);
 useEffect(()=>{if(phase!=='teach')return;setVisitedSlides(previous=>{const known=previous[unitIndex]??0;if(eventIndex<=known)return previous;return {...previous,[unitIndex]:eventIndex}})},[phase,unitIndex,eventIndex]);
 useEffect(()=>{if(phase!=='teach'||typeof window==='undefined')return;const id=window.setTimeout(()=>lessonStageRef.current?.scrollIntoView({block:'start',behavior:'smooth'}),80);return()=>window.clearTimeout(id)},[phase,unitIndex]);

 useEffect(()=>{if(typeof window==='undefined')return;let previous=window.navigator.onLine;const update=()=>{const isOnline=window.navigator.onLine;setOnline(isOnline);if(isOnline){if(!previous)trackEvent('TUTOR_RECONNECTED',{subject,topic,offline:false});void flushQueuedActions().then(r=>setPendingSync(r.remaining)).catch(()=>{})}else{if(previous)trackEvent('TUTOR_OFFLINE_ENTERED',{subject,topic,offline:true});void countPendingSyncActions().then(setPendingSync).catch(()=>{})}previous=isOnline};update();window.addEventListener('online',update);window.addEventListener('offline',update);return()=>{window.removeEventListener('online',update);window.removeEventListener('offline',update)}},[subject,topic]);
 useEffect(()=>{if(typeof document==='undefined')return;const onVisibility=()=>{if(document.visibilityState==='hidden'&&phase==='teach'&&!paused){pause();setAutoPausedByVisibility(true)}};document.addEventListener('visibilitychange',onVisibility);return()=>document.removeEventListener('visibilitychange',onVisibility)},[phase,paused]);
 useEffect(()=>{if(typeof navigator==='undefined')return;const nav:any=navigator;let cancelled=false;async function syncWakeLock(){try{if(phase==='teach'&&!paused&&document.visibilityState==='visible'&&nav.wakeLock?.request){if(!wakeLockRef.current){const lock=await nav.wakeLock.request('screen');if(cancelled){await lock.release?.();return}wakeLockRef.current=lock;setScreenAwake(true);lock.addEventListener?.('release',()=>{wakeLockRef.current=null;setScreenAwake(false)})}}else if(wakeLockRef.current){await wakeLockRef.current.release?.();wakeLockRef.current=null;setScreenAwake(false)}}catch{setScreenAwake(false)}}void syncWakeLock();return()=>{cancelled=true;if(wakeLockRef.current){void wakeLockRef.current.release?.();wakeLockRef.current=null;setScreenAwake(false)}}},[phase,paused]);
 useEffect(()=>{if(typeof window==='undefined'||!topic||!sessionReady||activeSessionKeyRef.current!==`${subject}:${topic}`)return;const snapshot={version:1,subject,topic,phase:phase==='success'?'probe':phase,unitIndex,eventIndex,covered,answer,checkpoint,chat:chat.slice(-8),rate,voiceOn,freshEvidenceRequired,reguideStepId,assistanceLevel,savedAt:Date.now()};try{window.localStorage.setItem(`avora:tutor-session:${subject}:${topic}`,JSON.stringify(snapshot));setLastSavedAt(snapshot.savedAt)}catch{}},[subject,topic,phase,unitIndex,eventIndex,covered,answer,checkpoint,chat,rate,voiceOn,freshEvidenceRequired,reguideStepId,assistanceLevel,sessionReady]);

 function clearTimer(){if(timer.current){window.clearTimeout(timer.current);timer.current=null}}
 function stopSpeech(){if(typeof window!=='undefined'&&'speechSynthesis'in window)window.speechSynthesis.cancel();setSpeaking(false);setSyncing(false);setNarrationSegment(0);setNarrationChar(0);utterance.current=null}
 function stopAll(){playToken.current++;clearTimer();stopSpeech()}
 async function load(chosen:string,subj:string){
  const requestId=++loadRequestRef.current;
  stopAll();activeSessionKeyRef.current='';pausedRef.current=false;setSessionReady(false);setRestoredSession(false);setAutoPausedByVisibility(false);setLoading(true);setError('');setFeedback(null);setAnswer('');setEventIndex(0);setPaused(false);setExtraBoard([]);setChat([]);setCheckpoint('');setCheckpointReply('');setQuestionHelp('');setRevealed(null);setReguideStepId(null);setAssistanceLevel(null);setFreshEvidenceRequired(false);setShowLessonMap(false);setShowAskPanel(false);setVisitedSlides({});setExerciseQuestions([]);setExerciseIndex(0);setExerciseAnswer('');setExerciseFeedback(null);setExerciseCorrect(0);setExerciseFinished(false);setPhase('probe');setUnitIndex(0);setPlan(undefined);
  try{const u=new URLSearchParams();if(chosen)u.set('topic',chosen);u.set('subject',subj);if(previewClass)u.set('previewClass',previewClass);let d:any;let fromCache=false;try{d=await readJson(await fetch('/api/tutor?'+u.toString(),{cache:'no-store'}),'Tutor');if(requestId!==loadRequestRef.current)return;setCachedLesson(false);void cacheTutorLesson(subj,chosen,d).catch(()=>{})}catch(networkError){const cached=await getCachedTutorLesson(subj,chosen).catch(()=>null);if(!cached)throw networkError;if(requestId!==loadRequestRef.current)return;d=cached.payload;fromCache=true;setCachedLesson(true);trackEvent('TUTOR_CACHED_LESSON_USED',{subject:subj,topic:chosen,cached:true})}setExam(d.exam);setClassLevel(d.classLevel);setTopics(d.topics||[]);const loadedQuestions=d.questions||[];setQuestions(loadedQuestions);setExerciseQuestions(d.exerciseQuestions||[]);setPlan(d.plan||undefined);
   const directAuthoredTopic=['JSS1','JSS2','JSS3'].includes(String(d.classLevel||previewClass||classLevel))&&['Mathematics','English Language'].includes(subj);
   if(directAuthoredTopic){setPhase('teach');setUnitIndex(0);setEventIndex(0);setRestoredSession(false);if(typeof window!=='undefined'){try{window.localStorage.removeItem(`avora:tutor-session:${subj}:${chosen}`)}catch{}}}
   let serverUnit=0;let serverCovered:number[]=[];if(chosen&&!fromCache&&typeof navigator!=='undefined'&&navigator.onLine){try{const pu=new URLSearchParams({topic:chosen,subject:subj,exam:d.exam});if(previewClass)pu.set('previewClass',previewClass);const pd=await readJson(await fetch('/api/tutor/progress?'+pu.toString(),{cache:'no-store'}),'Tutor progress');if(pd.progress){serverCovered=Array.isArray(pd.progress.coveredUnits)?pd.progress.coveredUnits:[];serverUnit=Number.isInteger(pd.progress.currentUnit)&&pd.progress.currentUnit>=0?pd.progress.currentUnit:0;setCovered(serverCovered);if(!directAuthoredTopic)setUnitIndex(serverUnit)}}catch{}}
   if(chosen&&!directAuthoredTopic&&typeof window!=='undefined'){try{const raw=window.localStorage.getItem(`avora:tutor-session:${subj}:${chosen}`);if(raw){const snap=JSON.parse(raw);const fresh=Number(snap?.savedAt)>Date.now()-7*24*60*60*1000;const units=Array.isArray(d.plan?.units)?d.plan.units.length:0;if(fresh&&snap?.subject===subj&&snap?.topic===chosen&&['probe','teach','guided','exercise'].includes(snap?.phase)){const savedUnit=Math.max(0,Math.min(units?units-1:0,Number(snap.unitIndex)||0));setUnitIndex(savedUnit);setEventIndex(Math.max(0,Number(snap.eventIndex)||0));setCovered(Array.isArray(snap.covered)?snap.covered.filter((x:any)=>Number.isInteger(x)&&x>=0&&(!units||x<units)):serverCovered);setAnswer(String(snap.answer||''));setCheckpoint(String(snap.checkpoint||''));setChat(Array.isArray(snap.chat)?snap.chat.slice(-8):[]);setRate(Number(snap.rate)>=.7&&Number(snap.rate)<=1.2?Number(snap.rate):.9);setVoiceOn(VOICE_TEACHING_ENABLED&&snap.voiceOn!==false);setFreshEvidenceRequired(Boolean(snap.freshEvidenceRequired));setReguideStepId(typeof snap.reguideStepId==='string'?snap.reguideStepId:null);setAssistanceLevel(['HINT','RETEACH','ANSWER'].includes(snap.assistanceLevel)?snap.assistanceLevel:null);setPhase(snap.phase);setRestoredSession(true);trackEvent('TUTOR_LESSON_RESTORED',{subject:subj,topic:chosen,restored:true});setLastSavedAt(Number(snap.savedAt)||null);if(snap.phase==='teach'){pausedRef.current=true;setPaused(true)}}}}catch{}}
   if(chosen&&!loadedQuestions.length&&d.plan?.units?.[0]?.check){
    setQuestions([{id:`probe:${subj}:${chosen}`,prompt:d.plan.units[0].check,type:'SHORT_ANSWER',options:[],hint:'Explain the idea and show the key step rather than guessing.',explanation:'AVORA will use this answer to choose the right starting point for your lesson.',difficulty:1,skill:d.plan.units[0].title,topic:chosen}])
   }
  }catch(e:any){if(requestId===loadRequestRef.current)setError(e.message||'Could not prepare Tutor.')}finally{if(requestId===loadRequestRef.current){activeSessionKeyRef.current=chosen?`${subj}:${chosen}`:'';if(chosen)trackEvent('TUTOR_LESSON_OPENED',{subject:subj,topic:chosen,exam});setSessionReady(true);setLoading(false)}}
 }
 function selectTopic(t:string){setTopic(t);const u=new URLSearchParams({topic:t,subject});if(previewClass)u.set('previewClass',previewClass);router.replace('/tutor?'+u.toString());}
 function chooseSubject(s:string){setTopic('');setPlan(undefined);setTopics([]);setQuestions([]);setExerciseQuestions([]);setLoading(true);const u=new URLSearchParams({subject:s});if(previewClass||classLevel)u.set('previewClass',previewClass||classLevel);router.replace('/tutor?'+u.toString());}

 function scheduleAdvance(ms:number){clearTimer();if(event?.kind==='check')return;const token=playToken.current;timer.current=window.setTimeout(()=>{if(pausedRef.current||token!==playToken.current)return;if(eventIndex<events.length-1)setEventIndex(i=>i+1);else continueAfterGuided()},ms)}
 function playCurrent(){
  clearTimer();stopSpeech();if(!event||pausedRef.current)return;const token=++playToken.current;
  const base=event.kind==='example'?9000:event.kind==='idea'?7000:6000;const wait=Math.max(base,Math.min(26000,4200+event.spoken.length*48));
  const segments=narrationSegments(event.spoken);setNarrationSegment(0);setNarrationChar(0);
  if(!VOICE_TEACHING_ENABLED||!voiceOn||typeof window==='undefined'||!('speechSynthesis'in window)){setSyncing(false);return}
  const synth=window.speechSynthesis;const selected=synth.getVoices().find(v=>v.voiceURI===voiceURI)||preferredVoice(synth.getVoices());setSyncing(true);
  const speakPart=(index:number)=>{if(pausedRef.current||token!==playToken.current)return;if(index>=segments.length){setSpeaking(false);setSyncing(false);scheduleAdvance(Math.max(900,event.pauseAfterMs??1400));return}setNarrationSegment(index);setNarrationChar(0);const u=new SpeechSynthesisUtterance(segments[index]);utterance.current=u;u.lang=selected?.lang||'en-NG';if(selected)u.voice=selected;u.rate=rate;u.pitch=1;u.volume=1;u.onstart=()=>{if(token===playToken.current)setSpeaking(true)};u.onboundary=(e)=>{if(token===playToken.current&&e.name==='word')setNarrationChar(e.charIndex||0)};u.onend=()=>{if(pausedRef.current||token!==playToken.current)return;window.setTimeout(()=>speakPart(index+1),90)};u.onerror=()=>{if(pausedRef.current||token!==playToken.current)return;window.setTimeout(()=>speakPart(index+1),80)};synth.speak(u)};
  speakPart(0)
 }
 function pause(){if(pausedRef.current)return;pausedRef.current=true;clearTimer();if(typeof window!=='undefined'&&'speechSynthesis'in window&&window.speechSynthesis.speaking){window.speechSynthesis.pause()}setPaused(true)}
 function resume(){if(!pausedRef.current)return;pausedRef.current=false;setAutoPausedByVisibility(false);if(typeof window!=='undefined'&&'speechSynthesis'in window&&window.speechSynthesis.paused&&utterance.current){skipPlaybackEffect.current=true;window.speechSynthesis.resume()}setPaused(false)}
 function replay(){stopAll();pausedRef.current=false;setPaused(false);window.setTimeout(playCurrent,80)}
 function resetSlideInteraction(){setCheckpoint('');setCheckpointReply('');setQuestionHelp('');setRevealed(null);setShowAskPanel(false)}
 function nextEvent(){stopAll();pausedRef.current=false;setPaused(false);resetSlideInteraction();if(eventIndex<events.length-1)setEventIndex(i=>i+1);else continueAfterGuided()}
 function prevEvent(){stopAll();pausedRef.current=false;setPaused(false);resetSlideInteraction();setEventIndex(i=>Math.max(0,i-1))}
 function goToVisitedSlide(index:number){if(index<0||index>=events.length)return;stopAll();pausedRef.current=true;setPaused(true);resetSlideInteraction();setEventIndex(index)}
 function handleLessonTouchStart(e:any){const target=e.target as HTMLElement;const t=e.changedTouches?.[0];if(!t)return;slideTouchRef.current={x:t.clientX,y:t.clientY,blocked:Boolean(target?.closest?.('button,a,input,textarea,select,summary'))}}
 function handleLessonTouchEnd(e:any){const start=slideTouchRef.current;const t=e.changedTouches?.[0];if(!t||start.blocked)return;const dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy)*1.15)return;if(dx<0)nextEvent();else prevEvent()}
 function handleLessonKeyDown(e:any){const target=e.target as HTMLElement;if(target?.closest?.('button,a,input,textarea,select,summary'))return;if(e.key==='ArrowRight'){e.preventDefault();nextEvent()}else if(e.key==='ArrowLeft'){e.preventDefault();prevEvent()}}
 function toggleVoice(){stopSpeech();setVoiceOn(v=>!v)}
 function chooseVoice(uri:string){setVoiceURI(uri);if(typeof window!=='undefined')window.localStorage.setItem('avora:tutor-voice-uri',uri)}
 function applyGuidanceMeta(d:GuidanceMeta){setReguideStepId(d.reguideStepId||null);setAssistanceLevel(d.assistanceLevel||null);setFreshEvidenceRequired(Boolean(d.requiresFreshEvidence))}
 function jumpToGuidanceStep(){if(!reguideStepId)return;trackEvent('TUTOR_RETEACH_TRIGGERED',{subject,topic,exam,reason:assistanceLevel||'RETEACH'});const idx=events.findIndex(e=>e.stepId===reguideStepId);if(idx<0)return;stopAll();pausedRef.current=false;setEventIndex(idx);setPhase('teach');setPaused(false);setCheckpoint('');setCheckpointReply('');setQuestionHelp('')}

 async function check(kind:'probe'|'guided'){
  const q=kind==='probe'?probeQ:guidedQ;if(!q||!answer.trim()||checking)return;if(!online){setError('You are offline. Your answer is saved on this device; reconnect to let AVORA mark it.');return;}setChecking(true);setError('');setRevealed(null);
  try{
   const d=q.id.startsWith('probe:')?
    await readJson(await fetch('/api/tutor/probe',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),body:JSON.stringify({subject,topic,classLevel,question:q.prompt,answer})}),'Answer check'):
    await readJson(await fetch('/api/tutor/check',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),body:JSON.stringify({questionId:q.id,answer,reveal:false})}),'Answer check');
   setFeedback(d)
  }catch(e:any){setError(e.message||'Could not mark this answer.')}finally{setChecking(false)}
 }
 async function explainQuestion(q:Q|undefined){if(!q||helping)return;if(!online){setQuestionHelp('You are offline. Continue reviewing the board; reconnect when you want AVORA to diagnose your attempt.');return;}setHelping(true);setQuestionHelp('');try{const d=await readJson(await fetch('/api/tutor/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject,topic,classLevel,exam,unitIndex,question:`I already attempted this practice question: ${q.prompt}. My attempt was: ${answer}. Diagnose the first meaningful gap or mistake, preserve anything I did correctly, and give me only the next useful hint or teaching step. Do not reveal the final answer yet.`,board:[q.prompt],recent:[],currentStepId:event?.stepId,lessonSteps})}),'AVORA');setQuestionHelp(String(d.reply||''));applyGuidanceMeta(d)}catch(e:any){setQuestionHelp(e.message||'AVORA could not explain that just now.')}finally{setHelping(false)}}
 async function revealAnswer(q:Q|undefined){if(!q||checking)return;if(!online){setError('You are offline. Reconnect before requesting the worked answer.');return;}setChecking(true);try{const d=await readJson(await fetch('/api/tutor/check',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({questionId:q.id,answer:answer||'',reveal:true})}),'Answer reveal');setRevealed(d);setAssistanceLevel('ANSWER');setFreshEvidenceRequired(true)}catch(e:any){setError(e.message||'Could not show the worked answer.')}finally{setChecking(false)}}

 async function saveProgress(next:number,cov:number[],complete:boolean){const payload={topic,subject,exam,currentUnit:next,coveredUnits:cov,coverageComplete:complete,lastUnitTitle:unit?.title};if(!online){try{await queueSyncAction('/api/tutor/progress',payload,{dedupeKey:`progress:${subject}:${topic}`});setPendingSync(await countPendingSyncActions())}catch{}return}try{const r=await fetch('/api/tutor/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!r.ok)throw new Error('progress sync failed')}catch{try{await queueSyncAction('/api/tutor/progress',payload,{dedupeKey:`progress:${subject}:${topic}`});setPendingSync(await countPendingSyncActions())}catch{}}}
 async function logInteraction(kind:'CHECKPOINT'|'QUESTION'|'RETEACH'|'LESSON_COMPLETE',learnerText?:string,teacherText?:string,outcome?:string){const payload={topic,subject,exam,unitTitle:unit?.title,kind,learnerText,teacherText,outcome};if(!online){try{await queueSyncAction('/api/tutor/progress',payload);setPendingSync(await countPendingSyncActions())}catch{}return}try{const r=await fetch('/api/tutor/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!r.ok)throw new Error('interaction sync failed')}catch{try{await queueSyncAction('/api/tutor/progress',payload);setPendingSync(await countPendingSyncActions())}catch{}}}
 function beginLesson(){trackEvent('TUTOR_LESSON_STARTED',{subject,topic,exam,classLevel});pausedRef.current=false;setFeedback(null);setAnswer('');setPhase('teach');setEventIndex(0);setPaused(false)}
 function startExercise(){if(!exerciseQuestions.length)return;stopAll();setExerciseIndex(0);setExerciseAnswer('');setExerciseFeedback(null);setExerciseCorrect(0);setExerciseFinished(false);setPhase('exercise');trackEvent('TUTOR_TOPIC_EXERCISE_STARTED',{subject,topic,exam,classLevel,questions:exerciseQuestions.length})}
 function isNerdcObjectiveUnit(unit:any){const title=String(unit?.title||'');const structured=Array.isArray(unit?.structuredSteps)?unit.structuredSteps:[];const text=[title,unit?.explain,unit?.why,...structured.flatMap((x:any)=>[x?.label,x?.spoken,...(x?.lines||[])])].filter(Boolean).join(' ').toLowerCase();return /official nerdc scope/.test(title.toLowerCase())&&(/objective|must cover|by the end/.test(text)||structured.length<=1)}
function explanationName(unit:any,index:number){const title=String(unit?.title||'');if(/source lesson/i.test(title))return 'Deep explanation';if(/official nerdc scope/i.test(title)&&!isNerdcObjectiveUnit(unit))return 'NERDC explanation';return null}
 function continueAfterGuided(){
  const cov=[...new Set([...covered,unitIndex])].sort((a,b)=>a-b);setCovered(cov);setFeedback(null);setAnswer('');setExtraBoard([]);setChat([]);
  if(plan&&unitIndex<plan.units.length-1){let n=unitIndex+1;while(n<plan.units.length&&isNerdcObjectiveUnit(plan.units[n]))n++;if(n<plan.units.length){setUnitIndex(n);setEventIndex(0);setPhase('teach');pausedRef.current=false;setPaused(false);void saveProgress(n,cov,false)}else if(exerciseQuestions.length){startExercise();void saveProgress(unitIndex,cov,true)}else{setPhase('success');void saveProgress(unitIndex,cov,true);void logInteraction('LESSON_COMPLETE','','Topic teaching coverage completed.','COVERED')}}else if(exerciseQuestions.length){setExerciseIndex(0);setExerciseAnswer('');setExerciseFeedback(null);setExerciseCorrect(0);setExerciseFinished(false);setPhase('exercise');void saveProgress(unitIndex,cov,true);trackEvent('TUTOR_TOPIC_EXERCISE_STARTED',{subject,topic,exam,classLevel,questions:exerciseQuestions.length})}else{setPhase('success');void saveProgress(unitIndex,cov,true);void logInteraction('LESSON_COMPLETE','','Topic teaching coverage completed.','COVERED');trackEvent('TUTOR_LESSON_COMPLETED',{subject,topic,exam,classLevel,outcome:'COVERED'})}
 }

 async function checkExercise(){
  if(!exerciseQ||!exerciseAnswer||exerciseChecking||exerciseFeedback)return;
  if(!online){setError('Reconnect to let AVORA mark this exercise.');return}
  setExerciseChecking(true);setError('');
  try{const d=await readJson(await fetch('/api/tutor/exercise-check',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({questionId:exerciseQ.id,answer:exerciseAnswer})}),'NERDC exercise');setExerciseFeedback(d);if(d.correct)setExerciseCorrect(v=>v+1)}catch(e:any){setError(e.message||'Could not mark this exercise.')}finally{setExerciseChecking(false)}
 }
 function nextExercise(){
  if(!exerciseFeedback)return;
  if(exerciseIndex<exerciseQuestions.length-1){setExerciseIndex(i=>i+1);setExerciseAnswer('');setExerciseFeedback(null);setError('');return}
  const finalCorrect=exerciseCorrect;setExerciseFinished(true);trackEvent('TUTOR_TOPIC_EXERCISE_COMPLETED',{subject,topic,exam,classLevel,score:finalCorrect,total:exerciseQuestions.length});
  if(finalCorrect>=Math.ceil(exerciseQuestions.length*.8)){setPhase('success');void logInteraction('LESSON_COMPLETE','','NERDC topic teaching and end-of-topic exercise completed.','MASTERED');trackEvent('TUTOR_LESSON_COMPLETED',{subject,topic,exam,classLevel,outcome:'MASTERED'})}
 }
 function reteachAfterExercise(){setExerciseIndex(0);setExerciseAnswer('');setExerciseFeedback(null);setExerciseCorrect(0);setExerciseFinished(false);setUnitIndex(0);setEventIndex(0);setCovered([]);setPhase('teach');setPaused(false);pausedRef.current=false;trackEvent('TUTOR_RETEACH_TRIGGERED',{subject,topic,exam,reason:'NERDC_EXERCISE_BELOW_80'})}
 async function explainCheckpoint(showModel=false){if(!event||helping)return;if(!online){setQuestionHelp('You are offline. Your checkpoint attempt is saved locally. Reconnect for targeted re-teaching.');return;}setHelping(true);setQuestionHelp('');const prompt=event.question||event.spoken;try{const d=await readJson(await fetch('/api/tutor/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject,topic,classLevel,exam,unitIndex,question:showModel?`I attempted this checkpoint: ${prompt}. My attempt was: ${checkpoint}. Teach from exactly where my attempt stopped or went wrong. Preserve correct work, explain one legal/reasoned step at a time, and only reach the full worked solution after the reasoning has been taught. Do not restart from zero unless my foundation is missing.`:`I attempted this checkpoint: ${prompt}. My attempt was: ${checkpoint}. Explain the first gap in simple language without giving the final answer.`,board:[...(event.lines||[]),...extraBoard],recent:chat.slice(-4),currentStepId:event.stepId,lessonSteps})}),'AVORA');setQuestionHelp(String(d.reply||''));applyGuidanceMeta(d)}catch(e:any){setQuestionHelp(e.message||'AVORA could not explain that just now.')}finally{setHelping(false)}}

 async function respondToCheckpoint(){
  const response=checkpoint.trim();if(!response||checkingPoint||!event)return;if(!online){setCheckpointReply('Your attempt is saved on this device. Reconnect so AVORA can check and diagnose it.');return;}pause();setCheckingPoint(true);setCheckpointReply('');
  try{const d=await readJson(await fetch('/api/tutor/checkpoint',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(20000),body:JSON.stringify({subject,topic,classLevel,exam,unitIndex,question:event.question||event.spoken,answer:response,board:[...(event.lines||[]),...extraBoard]})}),'AVORA checkpoint');const reply=`${d.verdict|| (d.correct?'Correct':'Incorrect')}

${d.feedback||''}

${d.correction||''}

AVORA's worked solution:\n${d.solution||'No worked solution was returned.'}`;setCheckpointReply(reply);applyGuidanceMeta({assistanceLevel:d.correct?'HINT':'RETEACH',requiresFreshEvidence:!d.correct});void logInteraction('CHECKPOINT',response,reply,d.correct?'CORRECT':'INCORRECT');if(Array.isArray(d.board)&&d.board.length)setExtraBoard(x=>[...x,...d.board].slice(-8))}catch(e:any){setCheckpointReply(e.message||'I could not check that just now. Try again.')}finally{setCheckingPoint(false)}
 }
 async function askTeacher(presetQuestion?:string){
  const question=(presetQuestion||ask).trim();if(!question||asking)return;if(!online){setChat((x:ChatTurn[])=>[...x,{role:'student' as const,text:question},{role:'teacher' as const,text:'You are offline. I saved your lesson position; reconnect and ask this again for a live answer.'}].slice(-8));setAsk('');return;}pause();setAsking(true);const recent=[...chat,{role:'student' as const,text:question}].slice(-8);setChat(recent);setAsk('');
  try{const d=await readJson(await fetch('/api/tutor/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject,topic,classLevel,exam,unitIndex,question,board:[...(event?.lines||[]),...extraBoard],recent,currentStepId:event?.stepId,lessonSteps})}),'AVORA');applyGuidanceMeta(d);setChat((x:ChatTurn[])=>[...x,{role:'teacher' as const,text:String(d.reply||'')}].slice(-8));void logInteraction('QUESTION',question,String(d.reply||''),'ANSWERED');if(Array.isArray(d.board)&&d.board.length)setExtraBoard(x=>[...x,...d.board].slice(-6))}catch(e:any){setChat((x:ChatTurn[])=>[...x,{role:'teacher' as const,text:String(e.message||'I could not answer that just now. Ask me again.')}])}finally{setAsking(false)}
 }

 if(loading)return <section className="tutor-loading"><b>AVORA is preparing your lesson…</b><span>Loading the topic map, learner context and reviewed questions.</span></section>;
 if(error&&!topics.length)return <section className="tutor-error"><b>{error}</b><button onClick={()=>load(topic,subject)}>Retry</button></section>;
 if(!topic)return <section className="tutor-picker-v2"><div className="tutor-preview-class"><label><span>Testing class</span><select value={previewClass||classLevel} onChange={async e=>{const next=e.target.value;setPreviewClass(next);setTopic('');setPlan(undefined);setQuestions([]);setExerciseQuestions([]);setLoading(true);try{const u=new URLSearchParams({subject,previewClass:next});const d=await readJson(await fetch('/api/tutor?'+u.toString(),{cache:'no-store'}),'Tutor');setExam(d.exam);setClassLevel(d.classLevel);setTopics(d.topics||[])}catch(e:any){setError(e.message||'Could not switch class.')}finally{setLoading(false)}}}><option value="JSS1">JSS1</option><option value="JSS2">JSS2</option><option value="JSS3">JSS3</option></select></label><small>Preview only — your registered class and saved learner progress are not changed.</small></div><div className="tutor-subjects"><button className={subject==='Mathematics'?'active':''} onClick={()=>chooseSubject('Mathematics')}><span>∑</span><b>Mathematics</b><small>Choose any topic and start learning directly.</small></button><button className={subject==='English Language'?'active':''} onClick={()=>chooseSubject('English Language')}><span>Aa</span><b>English Language</b><small>Grammar, comprehension, vocabulary and usage.</small></button></div><div className="tutor-topic-grid">{topics.map(t=><button key={t.name} onClick={()=>selectTopic(t.name)}><span>{t.questions?`${t.questions} reviewed questions`:'Full lesson map'}</span><b>{t.name}</b><small>Teach me this topic →</small></button>)}</div></section>;


 return <section className="tutor-engine-v1">
  <div className="tutor-breadcrumb"><Link href="/home">Home</Link><span>›</span><Link href={'/learn?subject='+encodeURIComponent(subject)}>{subject}</Link><span>›</span><b>{topic}</b></div>
  <header className="teacher-session-head"><div><span>{classLevel} · {exam} · {subject}</span><h2>{learnerTopicTitle(topic)}</h2><p>{plan?.goal||'AVORA will teach this topic, check your understanding and adapt to your questions.'}</p></div><button onClick={()=>{setTopic('');router.replace('/tutor?subject='+encodeURIComponent(subject))}}>Change topic</button></header>
  {exerciseQuestions.length>0&&phase!=='exercise'&&classLevel!=='JSS3'&&<div className="tutor-top-actions"><button type="button" className="exercise-top-button" onClick={startExercise}>Go straight to Exercise →</button></div>}

  
  {!online&&<div className="tutor-resilience-v140 offline"><div><i></i><b>Offline learning mode</b><span>Loaded lesson content and the teaching board remain available. Attempts are kept on this device until you reconnect.</span></div><div className="resilience-badges"><span>{lastSavedAt?'✓ Lesson autosaved':'Saving lesson…'}</span><span>{cachedLesson?'✓ Loaded from offline lesson cache':'✓ Latest lesson cached'}</span>{pendingSync>0&&<span>{pendingSync} queued to sync</span>}<span>{screenAwake?'✓ Screen kept awake':'Screen follows device settings'}</span></div></div>}
  {restoredSession&&<div className="session-restored-v140"><div><b>Lesson restored from this device</b><span>{autoPausedByVisibility?'AVORA paused when you left the page so you would not miss teaching.':'Your last section, board step and unfinished answer were recovered. Voice stays paused until you choose Continue.'}</span></div><button type="button" onClick={()=>{setRestoredSession(false);if(paused)resume()}}>Continue from here →</button></div>}
  {phase==='probe'&&!probeQ&&<article className="teacher-turn-card"><span className="teacher-kicker">FULL LESSON AVAILABLE</span><h2>We can teach this topic even before its question bank is complete.</h2><p className="teacher-copy">AVORA will never leave a curriculum lesson blank merely because a reviewed diagnostic question is missing. We teach first, then attach reviewed assessment as it becomes available.</p><div className="teacher-actions"><button className="primary" onClick={beginLesson}>Start the complete lesson →</button></div></article>}
  {phase==='probe'&&probeQ&&<article className="teacher-turn-card"><span className="teacher-kicker">BEFORE I TEACH</span><h2>Show me what you already know.</h2><p className="teacher-copy">This only sets the pace. One answer will never make AVORA skip the rest of the required topic.</p><Question q={probeQ} answer={answer} setAnswer={x=>{setAnswer(x);setFeedback(null);setError('')}}/>{checking&&<p className="answer-status" role="status">AVORA is checking your answer…</p>}{error&&<p className="answer-status error" role="alert">{error}</p>}{feedback&&<div className={feedback.correct?'persistent-feedback good':'persistent-feedback'}><b>{feedback.correct?'Correct — I can build from that.':'Not yet — this shows me where to begin.'}</b><p>{feedback.correct?(feedback.explanation||'That answer is correct.'):(feedback.feedback||feedback.hint||'I will teach the missing idea before asking you again.')}</p></div>}<div className="teacher-actions">{!feedback?<button type="button" className="primary" disabled={!answer||checking} onClick={()=>check('probe')}>{checking?'Checking…':'Check my answer'}</button>:<button type="button" className="primary" onClick={beginLesson}>Start teaching me →</button>}</div></article>}

  {phase==='teach'&&useAuthoredWholeNumbers&&<WholeNumbersLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2WholeNumbers&&<JSS2WholeNumbersLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2PremiumMath&&<JSS2PremiumMathLesson topic={jss2PremiumTopic||topic} onExercise={startExercise}/>}

  {phase==='teach'&&useJSS1SpeechSounds&&<JSS1SpeechSoundsLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2Debate&&<JSS2DebateLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2OralComprehension&&<JSS2OralComprehensionLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2OralSummary&&<JSS2OralSummaryLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2ReadingFluency&&<JSS2ReadingFluencyLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2WritersPurpose&&<JSS2WritersPurposeLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2ContextMeaning&&<JSS2ContextMeaningLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2CriticalReading&&<JSS2CriticalReadingLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2ReadingForSummary&&<JSS2ReadingForSummaryLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2PartsOfSpeechCore&&<JSS2PartsOfSpeechCoreLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2PartsOfSpeechExtended&&<JSS2PartsOfSpeechExtendedLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2DirectIndirectSpeech&&<JSS2DirectIndirectSpeechLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2FunctionalSentenceTypes&&<JSS2FunctionalSentenceTypesLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2StructuralSentenceTypes&&<JSS2StructuralSentenceTypesLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2Tenses&&<JSS2TensesLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2CompositionWriting&&<JSS2CompositionWritingLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2LetterWriting&&<JSS2LetterWritingLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2ReadingPlays&&<JSS2ReadingPlaysLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2AppreciatingActingPlays&&<JSS2AppreciatingActingPlaysLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2SkitMaking&&<JSS2SkitMakingLesson onExercise={startExercise}/>}

  {phase==='teach'&&useJSS2WritingDialogues&&<JSS2WritingDialoguesLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanLCM&&<LCMLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanHCF&&<HCFLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanAdditionSubtraction&&<AdditionSubtractionLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanCountingBaseTwo&&unit&&<CountingBaseTwoLesson unit={unit} onExercise={startExercise}/>}

  {phase==='teach'&&useCleanBaseTenToBinary&&unit&&<BaseTenToBinaryLesson unit={unit} onExercise={startExercise}/>}

  {phase==='teach'&&useCleanFractions&&<FractionsLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanFractionAddSubtract&&<FractionAddSubtractLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanFractionMultiplyDivide&&<FractionMultiplyDivideLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanEstimation&&<EstimationLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanApproximation&&<ApproximationLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanBinaryAddition&&<BinaryAdditionLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanBinarySubtraction&&<BinarySubtractionLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanBinaryMultiplication&&<BinaryMultiplicationLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanUseOfSymbols&&<UseOfSymbolsLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanSimplificationAlgebra&&<SimplificationAlgebraLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanSimpleEquations&&<SimpleEquationsLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanPlaneShapes&&<PlaneShapesLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanThreeDimensionalFigures&&<ThreeDimensionalFiguresLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanConstruction&&<ConstructionLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanAngles&&<AnglesLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanNeedForStatistics&&<NeedForStatisticsLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanDataCollection&&<DataCollectionLesson onExercise={startExercise}/>}

  {phase==='teach'&&useCleanDataPresentation&&<DataPresentationLesson onExercise={startExercise}/>}

  {phase==='teach'&&!useJSS1SpeechSounds&&!useAuthoredWholeNumbers&&!useJSS2WholeNumbers&&!useJSS2PremiumMath&&!useJSS2Debate&&!useJSS2OralComprehension&&!useJSS2OralSummary&&!useJSS2ReadingFluency&&!useJSS2WritersPurpose&&!useJSS2ContextMeaning&&!useJSS2CriticalReading&&!useJSS2ReadingForSummary&&!useJSS2PartsOfSpeechCore&&!useJSS2PartsOfSpeechExtended&&!useJSS2DirectIndirectSpeech&&!useJSS2FunctionalSentenceTypes&&!useJSS2StructuralSentenceTypes&&!useJSS2Tenses&&!useJSS2CompositionWriting&&!useJSS2LetterWriting&&!useJSS2ReadingPlays&&!useJSS2AppreciatingActingPlays&&!useJSS2SkitMaking&&!useJSS2WritingDialogues&&!useCleanLCM&&!useCleanHCF&&!useCleanAdditionSubtraction&&!useCleanCountingBaseTwo&&!useCleanBaseTenToBinary&&!useCleanFractions&&!useCleanFractionAddSubtract&&!useCleanFractionMultiplyDivide&&!useCleanEstimation&&!useCleanApproximation&&!useCleanBinaryAddition&&!useCleanBinarySubtraction&&!useCleanBinaryMultiplication&&!useCleanUseOfSymbols&&!useCleanSimplificationAlgebra&&!useCleanSimpleEquations&&!useCleanPlaneShapes&&!useCleanThreeDimensionalFigures&&!useCleanConstruction&&!useCleanAngles&&!useCleanNeedForStatistics&&!useCleanDataCollection&&!useCleanDataPresentation&&plan?.units?.length>0&&<article ref={lessonStageRef} className="live-teacher-stage lesson-slide-deck-v1492 authored-premium-lesson" tabIndex={0}>
   <div className="teacher-stage-title authored-premium-title"><div><span className="teacher-kicker">{classLevel} · {subject}</span><h2>{topic}</h2></div>{exerciseQuestions.length>0&&<span className="authored-exercise-count">{exerciseQuestions.length} questions</span>}</div>
   <div className="lesson-scroll-view approved-lesson-scroll authored-premium-scroll">
    {!!plan?.outcomes?.length&&<section className="authored-premium-objectives"><span>WHAT YOU WILL LEARN</span><ul>{plan.outcomes.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul></section>}
    {!!plan?.goal&&<section className="authored-premium-overview"><b>LESSON OVERVIEW</b><p>{plan.goal}</p></section>}
    {exerciseQuestions.length>0&&<div className="tutor-top-actions authored-exercise-after-objectives"><button type="button" className="exercise-top-button" onClick={startExercise}>Exercise · {exerciseQuestions.length} questions →</button></div>}
    {plan?.units?.map((lessonUnit:any,lessonIndex:number)=><section key={lessonIndex} className="authored-premium-section"><div className="authored-section-number">{String(lessonIndex+1).padStart(2,'0')}</div><div className="authored-section-content"><h3>{learnerTopicTitle(lessonUnit.title)}</h3>{!!lessonUnit.outcomes?.length&&<div className="authored-unit-outcomes"><b>In this section</b><ul>{lessonUnit.outcomes.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul></div>}{!!lessonUnit.terms?.length&&<div className="authored-definition-grid">{lessonUnit.terms.map(([term,meaning]:[string,string],i:number)=><div key={i} className="authored-definition"><b>{term}</b><p>{meaning}</p></div>)}</div>}<div className="authored-explanation">{splitSentences(lessonUnit.explain||'').map((x:string,i:number)=><p key={i}>{x}</p>)}</div><AuthoredGeometryDiagram topic={topic} title={lessonUnit.title} example={lessonUnit.example}/>{lessonUnit.why&&<div className="authored-reason"><b>WHY THIS WORKS</b><p>{lessonUnit.why}</p></div>}{lessonUnit.example&&<div className="authored-worked-example"><span>WORKED EXAMPLE</span><pre className="authored-math-working">{lessonUnit.example}</pre></div>}{!!lessonUnit.workedExamples?.length&&<div className="authored-example-stack">{lessonUnit.workedExamples.map((ex:any,i:number)=><div key={i} className="authored-worked-example"><span>WORKED EXAMPLE {i+1}</span><pre className="authored-math-working">{typeof ex==='string'?ex:(ex?.working||ex?.solution||ex?.example||JSON.stringify(ex,null,2))}</pre></div>)}</div>}{!!lessonUnit.commonMistakes?.length&&<div className="authored-mistakes"><b>WATCH OUT FOR</b><ul>{lessonUnit.commonMistakes.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul></div>}{lessonUnit.check&&<div className="authored-check"><b>CHECK YOUR UNDERSTANDING</b><p>{lessonUnit.check}</p></div>}</div></section>)}
    <div className="authored-premium-finish"><b>You have reached the end of the teaching.</b><p>Use the exercise to prove that you can apply what you have learned independently.</p>{exerciseQuestions.length>0?<button type="button" className="primary" onClick={startExercise}>Go to Exercise →</button>:<span>Exercise bank is being prepared for this topic.</span>}</div>
   </div>
  </article>}

  {phase==='guided'&&guidedQ&&<article className="teacher-turn-card"><span className="teacher-kicker">NOW YOU TRY THE SAME SKILL</span><h2>Practice what AVORA just taught.</h2><div className="task-expectation"><b>What you are expected to do</b><p>{questionInstruction(guidedQ)}</p></div><Question q={guidedQ} answer={answer} setAnswer={x=>{setAnswer(x);setFeedback(null);setRevealed(null);setReguideStepId(null);setAssistanceLevel(null);setFreshEvidenceRequired(false)}}/>{feedback&&<div className="question-help-row">{!feedback.correct&&<button type="button" onClick={()=>void explainQuestion(guidedQ)} disabled={helping}>{helping?'Diagnosing…':'Explain from my attempt'}</button>}{(!feedback.correct&&questionHelp)&&<button type="button" onClick={()=>void revealAnswer(guidedQ)} disabled={checking}>Show the full worked solution after the hint</button>}</div>}{questionHelp&&<div className="question-help-box"><b>WHAT THE QUESTION MEANS</b><p>{questionHelp}</p></div>}{reguideStepId&&<div className="reguide-card"><div><b>Re-teach the missing idea</b><span>AVORA linked this difficulty to a specific teaching step.</span></div><button type="button" onClick={jumpToGuidanceStep}>Open exact teaching step →</button></div>}{freshEvidenceRequired&&<p className="fresh-evidence-note">Because AVORA substantially helped with this item, use a fresh equivalent question for independent mastery evidence.</p>}{feedback&&<div className={feedback.correct?'persistent-feedback good':'persistent-feedback'}><b>{feedback.correct?'Correct ✓ — you got this one.':'Not yet — this answer is not correct.'}</b><p><strong>Your answer:</strong> {answer}</p><p>{feedback.correct?(feedback.explanation||'That is correct. Notice which rule or step made it work.'):(feedback.hint||'Use the clue and try again.')}</p></div>}{revealed&&<div className="answer-reveal-box"><b>AVORA'S ANSWER</b><strong>{revealed.correctAnswer||'See the explanation below.'}</strong><p>{revealed.explanation||revealed.hint||'Review the rule AVORA just taught, then try a similar question.'}</p><small>Seeing the answer helps you learn, but it does not count as independent mastery.</small></div>}{error&&<p className="flow-error">{error}</p>}<div className="teacher-actions"><button onClick={()=>{setPhase('teach');setEventIndex(0);setFeedback(null);setAnswer('');setQuestionHelp('');setRevealed(null)}}>Teach this again</button>{!feedback?.correct?<button className="primary" disabled={!answer||checking} onClick={()=>check('guided')}>{checking?'Marking…':'Check my answer'}</button>:<button className="primary" onClick={continueAfterGuided}>{plan&&unitIndex<plan.units.length-1?'Continue to next section →':'Finish topic teaching →'}</button>}{revealed&&!feedback?.correct&&<button onClick={continueAfterGuided}>{plan&&unitIndex<plan.units.length-1?'Continue after review →':'Finish this taught topic →'}</button>}</div></article>}

  {phase==='exercise'&&exerciseQ&&!exerciseFinished&&<article className="teacher-turn-card nerdc-topic-exercise"><span className="teacher-kicker">NERDC TOPIC EXERCISE · {exerciseIndex+1} OF {exerciseQuestions.length}</span><h2>Now prove what you understood.</h2><p className="teacher-copy">These multiple-choice questions sample concepts, application, reasoning and common misconceptions from this topic. Read each option carefully before choosing.</p><div className="exercise-score-strip"><span>Score so far</span><b>{exerciseCorrect} correct</b></div><div className="exercise-navigation-v1493"><button type="button" className="exercise-return-lesson" onClick={()=>{setPhase('teach');setFeedback(null);setAnswer('');setError('');}}>← Return to lesson</button><div className="exercise-question-strip-v1492" aria-label="Exercise question navigation">{exerciseQuestions.map((_,i)=><button type="button" key={i} aria-label={`Go to question ${i+1}`} aria-current={i===exerciseIndex?'step':undefined} className={i===exerciseIndex?'active':i<exerciseIndex?'done':''} onClick={()=>{setExerciseIndex(i);setExerciseAnswer('');setExerciseFeedback(null);setExerciseFinished(false);setError('');}}>{i+1}</button>)}</div></div><Question q={exerciseQ} answer={exerciseAnswer} setAnswer={x=>{if(!exerciseFeedback)setExerciseAnswer(x)}}/>{exerciseFeedback&&<div className={exerciseFeedback.correct?'persistent-feedback good tutor-feedback-v1491':'persistent-feedback tutor-feedback-v1491'}><span className="feedback-tutor-label">AVORA TUTOR FEEDBACK</span><b>{exerciseFeedback.correct?'Correct ✓ — now understand why.':'Not yet — we will fix the idea, not just the answer.'}</b><p><strong>Your answer:</strong> {exerciseAnswer}</p><p><strong>Correct answer:</strong> {exerciseFeedback.correctAnswer}</p><div className="exercise-deep-feedback"><h3>Understand the answer</h3><p><strong>Concept being tested:</strong> {exerciseFeedback.concept||exerciseQ.skill||topic}</p><p><strong>Why this answer works:</strong> {exerciseFeedback.explanation||exerciseFeedback.hint}</p>{exerciseFeedback.solutionSteps&&exerciseFeedback.solutionSteps.length>1&&<div className="exercise-solution-steps"><strong>Work through it:</strong><ol>{exerciseFeedback.solutionSteps.map((step,i)=><li key={i}>{step}</li>)}</ol></div>}<p><strong>{exerciseFeedback.correct?'Confirm your reasoning:':'Where your thinking needs correction:'}</strong> {exerciseFeedback.misconception||exerciseFeedback.hint}</p>{exerciseFeedback.optionReview&&exerciseFeedback.optionReview.length>1&&<div className="exercise-option-review"><strong>Check the options:</strong>{exerciseFeedback.optionReview.map((item,i)=><div key={i} className={item.correct?'option-review-row correct':'option-review-row'}><b>{item.option}</b><span>{item.note}</span></div>)}</div>}<p className="exercise-final-answer"><strong>Final answer:</strong> {exerciseFeedback.correctAnswer}</p><p><strong>Lesson connection:</strong> Use the same rule or method on the next question; do not rely on the appearance of the options.</p></div>{!exerciseFeedback.correct&&<button type="button" onClick={()=>{setPhase('teach');setUnitIndex(0);setEventIndex(0);setPaused(true);pausedRef.current=true}}>Teach the topic again from the foundation →</button>}</div>}{error&&<p className="answer-status error" role="alert">{error}</p>}<div className="teacher-actions">{!exerciseFeedback?<button className="primary" disabled={!exerciseAnswer||exerciseChecking} onClick={()=>void checkExercise()}>{exerciseChecking?'Marking…':'Check answer'}</button>:<button className="primary" onClick={nextExercise}>{exerciseIndex<exerciseQuestions.length-1?'Next question →':'Finish exercise →'}</button>}</div></article>}
  {phase==='exercise'&&exerciseFinished&&<article className="teacher-turn-card"><span className="teacher-kicker">MASTERY CHECK</span><h2>{exerciseCorrect} / {exerciseQuestions.length}</h2><p className="teacher-copy">AVORA requires at least 80% independent evidence here before treating the topic as secure. A lower score does not erase your progress; it tells us to reteach the topic from the beginning and focus on the rules and misconceptions that still need work.</p><div className="teacher-actions"><button className="primary" onClick={reteachAfterExercise}>Re-teach this topic completely →</button><Link className="link-button" href={'/practice?topic='+encodeURIComponent(topic)}>Do more independent practice</Link></div></article>}

  {phase==='success'&&<article className="teacher-turn-card success"><span className="teacher-kicker">TOPIC COVERAGE COMPLETE</span><h2>You have been taught the required sections of {topic}.</h2><p>That is teaching coverage, not a fake mastery badge. Now prove the topic independently without Tutor help.</p><div className="teacher-actions"><Link className="primary link-button" href={'/practice?topic='+encodeURIComponent(topic)}>Start independent practice →</Link><Link className="link-button" href={'/learn?subject='+encodeURIComponent(subject)}>Choose another topic</Link></div></article>}
 </section>
}

function Question({q,answer,setAnswer}:{q:Q;answer:string;setAnswer:(x:string)=>void}){return <div className="teacher-question"><h3>{q.prompt}</h3>{q.type==='MULTIPLE_CHOICE'&&q.options?.length?<div className="teacher-options">{q.options.map((o,i)=><button type="button" key={`${o}-${i}`} className={answer===o?'chosen':''} onClick={()=>setAnswer(o)}><b>{String.fromCharCode(65+i)}</b><span>{o}</span></button>)}</div>:<div className="teacher-input"><input value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your answer here…"/></div>}</div>}
