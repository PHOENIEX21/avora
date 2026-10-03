import {aiStructured} from './aiGateway';

export type ConvertedAcademicQuestion={
 questionType:'MULTIPLE_CHOICE'|'THEORY';
 options:string[];
 correctAnswer:string;
 rubric:{point:string;marks:number}[];
 maxMarks:number;
 modelSolution:string;
};

const schema={
 type:'object',
 properties:{
  questionType:{type:'string',enum:['MULTIPLE_CHOICE','THEORY']},
  options:{type:'array',items:{type:'string'}},
  correctAnswer:{type:'string'},
  rubric:{type:'array',items:{type:'object',properties:{point:{type:'string'},marks:{type:'integer'}},required:['point','marks'],additionalProperties:false}},
  maxMarks:{type:'integer'},
  modelSolution:{type:'string'}
 },
 required:['questionType','options','correctAnswer','rubric','maxMarks','modelSolution'],
 additionalProperties:false
};

function valid(x:any):x is ConvertedAcademicQuestion{
 if(!x||!['MULTIPLE_CHOICE','THEORY'].includes(x.questionType)||!String(x.modelSolution||'').trim())return false;
 if(x.questionType==='MULTIPLE_CHOICE'){
  if(!Array.isArray(x.options)||x.options.length!==4)return false;
  const clean=x.options.map((v:any)=>String(v).trim());
  if(new Set(clean.map((v:string)=>v.toLowerCase())).size!==4)return false;
  if(!clean.includes(String(x.correctAnswer).trim()))return false;
 }
 if(x.questionType==='THEORY'){
  if(!Array.isArray(x.rubric)||!x.rubric.length||Number(x.maxMarks)<=0)return false;
  const sum=x.rubric.reduce((n:number,r:any)=>n+Math.max(0,Number(r.marks||0)),0);
  if(sum!==Number(x.maxMarks))return false;
 }
 return true;
}

export async function convertAcademicQuestion(args:{originalText:string;classLevel:string;subject:string;topicId:string|null;objectives:string[]}){
 const instructions=[
  'You convert a real Nigerian junior-secondary school assignment question into AVORA assessment data.',
  'Preserve what the original question tests. Never silently change its academic demand.',
  'Use the supplied NERDC topic/objectives only as scope evidence. If it is an explanation/discussion/derivation task, keep THEORY.',
  'Use MULTIPLE_CHOICE only when the same knowledge or calculation can genuinely be tested objectively.',
  'For MCQ return exactly four distinct options. Every distractor must represent a plausible learner mistake; never use duplicate-value distractors.',
  'For THEORY return a concrete point-based rubric whose marks sum exactly to maxMarks.',
  'The model solution must teach the reasoning step by step at first-encounter learner depth, not merely state an answer.',
  'Do not introduce facts not needed to answer the original question.'
 ].join(' ');
 const input=JSON.stringify({classLevel:args.classLevel,subject:args.subject,originalQuestion:args.originalText,curriculumTopicId:args.topicId,curriculumObjectives:args.objectives});
 const result=await aiStructured<ConvertedAcademicQuestion>({instructions,input,schema,name:'assignment_conversion',maxOutputTokens:1200});
 if(!result.ok)return result;
 if(!valid(result.json))return {ok:false as const,error:'ACADEMIC_CONVERSION_FAILED_VALIDATION'};
 return result;
}
