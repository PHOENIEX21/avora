import {sql,withDbRetry} from '@/lib/db';

export type TodayObjective={
 id:string;subjectName:string;topicId:string;topicName:string;dayIndex:number;
 title:string;objectiveText:string;lessonAnchor:string|null;questionTarget:number;
};

export function lessonHref(objective:TodayObjective){
 const q=new URLSearchParams({subject:objective.subjectName,topic:objective.topicName});
 if(objective.lessonAnchor)q.set('focus',objective.lessonAnchor);
 return '/tutor?'+q.toString();
}

export async function getTodayObjectives(classLevel:string,term:number,week:number,dayIndex:number):Promise<TodayObjective[]>{
 return withDbRetry(async()=>{
  const rows=await sql`
   SELECT o.id::text,o.day_index,o.title,o.objective_text,o.lesson_anchor,o.question_target,
          s.subject_name,t.curriculum_topic_id,COALESCE(tp.name,t.curriculum_topic_id) AS topic_name
   FROM academic_daily_objectives o
   JOIN term_topic_schedule t ON t.id=o.schedule_id
   LEFT JOIN topics tp ON tp.id::text=t.curriculum_topic_id
   WHERE t.class_level=${classLevel} AND t.term=${term} AND t.week_number=${week}
     AND o.day_index=${dayIndex} AND o.status='LIVE'
   ORDER BY o.sort_order,t.subject_name`;
  return rows.map((r:any)=>({id:String(r.id),subjectName:String(r.subject_name),topicId:String(r.curriculum_topic_id),
   topicName:String(r.topic_name),dayIndex:Number(r.day_index),title:String(r.title),objectiveText:String(r.objective_text),
   lessonAnchor:r.lesson_anchor?String(r.lesson_anchor):null,questionTarget:Number(r.question_target||10)}));
 },2);
}

export function relativeAcademicDate(value:Date|string,now=new Date()){
 const date=new Date(value);const a=new Date(now.getFullYear(),now.getMonth(),now.getDate());
 const b=new Date(date.getFullYear(),date.getMonth(),date.getDate());
 const days=Math.round((a.getTime()-b.getTime())/86400000);
 if(days===0)return 'Today';if(days===1)return 'Yesterday';
 return new Intl.DateTimeFormat('en-NG',{day:'numeric',month:'short',year:a.getFullYear()===b.getFullYear()?undefined:'numeric'}).format(date);
}
