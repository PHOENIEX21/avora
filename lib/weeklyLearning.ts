import {sql,withDbRetry} from '@/lib/db';

/** Opt-in weekly learning only. Missing flag/table means legacy flow remains active. */
export async function isWeeklyLearningEnabled(classLevel:string):Promise<boolean>{
 if(!classLevel)return false;
 try{
  const [row]=await withDbRetry(()=>sql`SELECT enabled FROM weekly_class_flags WHERE class_level=${classLevel} LIMIT 1`,1);
  return row?.enabled===true;
 }catch{
  return false;
 }
}
export function canServeWeeklyItem(item:{status:string;objective_id:string|null;answer_key:unknown;reviewer_id:string|null;reviewed_at:unknown}):boolean{
 return item.status==='APPROVED'&&Boolean(item.objective_id)&&item.answer_key!==null&&item.answer_key!==undefined&&Boolean(item.reviewer_id)&&Boolean(item.reviewed_at);
}
export function nextRevisitInterval(streak:number,correct:boolean):number{
 if(!correct)return 1;
 if(streak<=0)return 2;
 if(streak===1)return 7;
 return 21;
}
export function canAccessClassRoom(studentClass:string|null,roomClass:string,isModerator:boolean):boolean{
 return isModerator||Boolean(studentClass&&roomClass&&studentClass===roomClass);
}

/** ISO weekday: 1=Monday through 7=Sunday. Uses calendar dates, never UTC weekday guessing. */
export function isoWeekday(date:string):number{
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new Error('Expected YYYY-MM-DD');
 const d=new Date(date+'T12:00:00Z');
 if(Number.isNaN(d.getTime())||d.toISOString().slice(0,10)!==date)throw new Error('Invalid date');
 return d.getUTCDay()||7;
}
export function nextWeekRevisionDates(saturday:string):string[]{
 if(isoWeekday(saturday)!==6)throw new Error('Official weekly examination must be on Saturday');
 const start=new Date(saturday+'T12:00:00Z');
 return Array.from({length:7},(_,i)=>{
  const d=new Date(start);
  d.setUTCDate(d.getUTCDate()+i+2);
  return d.toISOString().slice(0,10);
 });
}
export function validateWeeklyExamPlan(officialDate:string,revisionDate:string):boolean{
 return isoWeekday(officialDate)===6&&nextWeekRevisionDates(officialDate).includes(revisionDate);
}
