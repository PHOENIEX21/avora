export type QuestionQuality={examReady:boolean;issues:string[];grading:'MCQ'|'EXACT_NUMERIC'|'EXACT_TEXT'|'STRUCTURED_RESPONSE'|'LLM_RUBRIC'};

const META=[/\bAVORA\b/i,/\brevised\s+JSS[123]\b/i,/\bcurriculum expectations\b/i,/\bwhich (?:explanation|outcome|principle|statement) (?:best |genuinely )?(?:represents|is part|should guide|identifies)\b/i,/\bthis topic\b.*\blearner should understand\b/i,/\bwhich worked example correctly applies\b/i,/\bwhich second example or reasoning move\b/i,/\bstrongest independent evidence\b/i,/\bsuccessful reasoning .* should achieve\b/i];
const VAGUE=[/^discuss\b/i,/^write about\b/i,/^say something about\b/i,/\bwhat do you think\b/i];
const COMMAND=/\b(find|calculate|solve|evaluate|simplify|factorise|factorize|expand|convert|express|write|state|identify|choose|select|which|what|why|how|explain|compare|complete|represent|construct|draw|round|estimate|determine|give|list|name|read|order|arrange|make|rewrite|correct|punctuate|summarise|summarize|infer|describe|analyse|analyze)\b/i;
function optionValue(value:unknown):string{
 if(value&&typeof value==='object'){
  const item=value as Record<string,unknown>;
  for(const key of ['text','value','label','answer','option'])if(typeof item[key]==='string')return item[key] as string;
 }
 return String(value??'');
}
function optionKey(value:unknown){return optionValue(value).normalize('NFKC').replace(/[−–—]/g,'-').replace(/\s+/g,'').toLowerCase();}

export function inspectQuestion(prompt:string,questionType?:string,options?:string[]|null,correctAnswer?:unknown):QuestionQuality{
 const p=String(prompt||'').trim();const issues:string[]=[];
 if(p.length<12)issues.push('PROMPT_TOO_SHORT');
 if(!COMMAND.test(p))issues.push('NO_EXPLICIT_TASK_COMMAND');
 if(META.some(x=>x.test(p)))issues.push('META_CURRICULUM_QUESTION');
 if(VAGUE.some(x=>x.test(p)))issues.push('VAGUE_TASK');
 if(/\b(None of these|All of the above)\b/i.test((options||[]).join(' | ')))issues.push('WEAK_OPTION_CONSTRUCTION');
 if(questionType==='MULTIPLE_CHOICE'){
  if(!options||options.length!==4)issues.push('MCQ_REQUIRES_FOUR_OPTIONS');
  else if(new Set(options.map(x=>x.trim().toLowerCase())).size!==4)issues.push('DUPLICATE_OPTIONS');
  if(correctAnswer!=null&&!options?.some(x=>optionKey(x)===optionKey(correctAnswer))&&!/^[A-D]$/i.test(String(correctAnswer).trim()))issues.push('ANSWER_NOT_IN_OPTIONS');
 }
 const numeric=/[-+]?\d/.test(String(correctAnswer??''))&&/^(?:[-+]?\s*[₦$£€]?\s*[\d,.]+(?:\/\d+)?\s*(?:%|°|cm2|cm²|cm|mm|m2|m²|m|km|kg|g|l|ml|s|min|minutes?|hours?|days?)?)$/i.test(String(correctAnswer??'').trim());
 const grading=questionType==='MULTIPLE_CHOICE'?'MCQ':numeric?'EXACT_NUMERIC':/\b(explain|why|compare|describe|analyse|analyze|justify|show your working|write a paragraph|essay|letter|summary)\b/i.test(p)?'LLM_RUBRIC':String(correctAnswer??'').trim()?'EXACT_TEXT':'STRUCTURED_RESPONSE';
 return {examReady:issues.length===0,issues,grading};
}

export function normalizeQuestionOptions(v:any):string[]|null{if(Array.isArray(v))return v.map(optionValue);if(typeof v==='string'){try{return normalizeQuestionOptions(JSON.parse(v))}catch{return null}}if(v&&typeof v==='object'){if(Array.isArray(v.options))return v.options.map(optionValue);if(Array.isArray(v.choices))return v.choices.map(optionValue)}return null}
export function isExamReadyQuestion(row:any){return inspectQuestion(String(row.prompt||''),String(row.question_type||''),normalizeQuestionOptions(row.options),row.correct_answer).examReady;}
