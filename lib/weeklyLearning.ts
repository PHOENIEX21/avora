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
export function defaultExamSaturday(monday:string):string{
 if(isoWeekday(monday)!==1)throw new Error('Week starts Monday');
 const d=new Date(monday+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+5);
 return d.toISOString().slice(0,10);
}
export function defaultRevisionWednesday(examDate:string):string{
 const d=new Date(examDate+'T12:00:00Z');
 const days=(3-isoWeekday(examDate)+7)%7||7;
 d.setUTCDate(d.getUTCDate()+days);
 return d.toISOString().slice(0,10);
}
export function nextWeekRevisionDates(examDate:string):string[]{
 const d=new Date(examDate+'T12:00:00Z');
 d.setUTCDate(d.getUTCDate()+8-isoWeekday(examDate));
 return Array.from({length:7},(_,i)=>{
  const day=new Date(d);day.setUTCDate(day.getUTCDate()+i);
  return day.toISOString().slice(0,10);
 });
}
export function validateWeeklyExamPlan(officialDate:string,revisionDate:string):boolean{
 isoWeekday(officialDate);isoWeekday(revisionDate);
 return revisionDate>officialDate;
}
