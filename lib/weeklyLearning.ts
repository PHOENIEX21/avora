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
