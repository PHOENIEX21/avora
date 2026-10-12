import {answerIsCorrect} from './answers';
import {evidenceStatus} from './learnerIntelligence';

export type PracticeItem={id:string;prompt:string;options:string[];answer:string;explanation:string};
export function reviewedPracticeItem(row:Record<string,unknown>):PracticeItem|null{
 const options=Array.isArray(row.options)?row.options:[];
 const key=row.answer_key;
 const answer=typeof key==='string'?key:key&&typeof key==='object'
  ?(key as Record<string,unknown>).correct??(key as Record<string,unknown>).answer??(key as Record<string,unknown>).value:null;
 if(row.item_type!=='MCQ'||row.status!=='PUBLISHED'||!row.reviewer_id||!row.reviewed_at
  ||!row.objective_id||!row.prompt||!row.explanation||typeof answer!=='string'
  ||options.length!==4||!options.every(x=>typeof x==='string'&&x.trim())
  ||new Set(options.map(x=>String(x).trim().toLowerCase())).size!==4)return null;
 const correct=options.filter(option=>answerIsCorrect(option,answer,options));
 if(correct.length!==1)return null;
 return {id:String(row.id),prompt:String(row.prompt),options:options as string[],answer:String(correct[0]),explanation:String(row.explanation)};
}
export function publicPracticeItem(item:PracticeItem){
 return {id:item.id,prompt:item.prompt,options:item.options};
}
export function weeklyProgress(evidence:number,correct:number,studied:boolean,retainedCorrect=correct){
 const count=Math.max(0,Number(evidence)||0),earned=Math.max(0,Math.min(count,Number(correct)||0));
 const retained=Math.max(0,Math.min(count,Number(retainedCorrect)||0));
 return {evidence:count,correct:earned,accuracy:count?Math.round(earned/count*100):null,
  status:count?evidenceStatus(retained/count,count,count-retained):studied?'STUDIED':'NOT_STARTED'};
}
