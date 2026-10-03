import {aiStructured,configuredAiProvider} from './aiGateway';

export function normalizeText(v:string){return String(v||'').trim().toLowerCase().replace(/\s+/g,' ')}

export function markAssignmentMcq(answer:string,correct:string){
 return normalizeText(answer)===normalizeText(correct)?1:0;
}

export async function gradeAssignmentTheory(args:{prompt:string;answer:string;rubric:any[];maxMarks:number;modelSolution:string}){
 if(!configuredAiProvider())return {ok:false as const,error:'THEORY_GRADER_UNAVAILABLE'};
 const schema={type:'object',additionalProperties:false,properties:{score:{type:'number'},feedback:{type:'string'},criteria:{type:'array',items:{type:'object',additionalProperties:false,properties:{point:{type:'string'},earned:{type:'number'},available:{type:'number'},feedback:{type:'string'}},required:['point','earned','available','feedback']}}},required:['score','feedback','criteria']};
 const result=await aiStructured<any>({name:'assignment_theory_mark',instructions:'Mark only against the supplied assignment question, rubric and model solution. Award valid equivalent reasoning and partial credit. Never invent criteria or award more than the stated maximum. Return concise learner-facing feedback and JSON only.',input:JSON.stringify(args),schema,maxOutputTokens:900});
 if(!result.ok)return result;
 const max=Math.max(1,Number(args.maxMarks||1));const score=Math.max(0,Math.min(max,Number(result.json?.score||0)));
 return {...result,json:{...result.json,score,maxMarks:max,normalizedScore:score/max}};
}
