import {sql,withDbRetry} from './db';
import {dueAssignmentReviewQuestions} from './assignmentReview';

export type ScheduledAssessmentKind='DAILY_CBT'|'WEEKEND_EXAM';

function take<T>(rows:T[],n:number){return rows.slice(0,Math.max(0,n))}

export async function buildScheduledAssessment(args:{studentId:string;classLevel:string;subject:string;kind:ScheduledAssessmentKind;currentTopicId:string}){
 const total=args.kind==='DAILY_CBT'?12:20;
 const assignmentTarget=args.kind==='WEEKEND_EXAM'?Math.round(total*0.20):0;
 const freshTarget=args.kind==='WEEKEND_EXAM'?Math.round(total*0.50):Math.round(total*0.75);
 const reviewTarget=total-freshTarget-assignmentTarget;

 const fresh=await withDbRetry(()=>sql`
  SELECT q.id,q.prompt,q.question_type,q.options,q.difficulty,q.curriculum_topic_id,
         COALESCE(q.exam_topic,t.name) topic
  FROM questions q JOIN skills sk ON sk.id=q.skill_id JOIN topics t ON t.id=sk.topic_id
  JOIN subjects sub ON sub.id=t.subject_id
  LEFT JOIN attempts a ON a.question_id=q.id AND a.student_id=${args.studentId}
  WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND q.class_level=${args.classLevel}
    AND sub.name=${args.subject} AND q.curriculum_topic_id=${args.currentTopicId}
  GROUP BY q.id,t.name ORDER BY COUNT(a.id),MAX(a.created_at) NULLS FIRST,q.difficulty,random()`);

 const older=await withDbRetry(()=>sql`
  SELECT q.id,q.prompt,q.question_type,q.options,q.difficulty,q.curriculum_topic_id,
         COALESCE(q.exam_topic,t.name) topic,m.score mastery_score
  FROM questions q JOIN skills sk ON sk.id=q.skill_id JOIN topics t ON t.id=sk.topic_id
  JOIN subjects sub ON sub.id=t.subject_id
  JOIN mastery m ON m.skill_id=sk.id AND m.student_id=${args.studentId}
  LEFT JOIN attempts a ON a.question_id=q.id AND a.student_id=${args.studentId}
  WHERE q.status='PUBLISHED' AND q.quality_status='REVIEWED' AND q.class_level=${args.classLevel}
    AND sub.name=${args.subject} AND COALESCE(q.curriculum_topic_id,'')<>${args.currentTopicId}
    AND m.score>=0.8
  GROUP BY q.id,t.name,m.score
  ORDER BY COUNT(a.id),MAX(a.created_at) NULLS FIRST,m.score ASC,q.difficulty,random()`);

 const assignment=args.kind==='WEEKEND_EXAM'?await dueAssignmentReviewQuestions(args.studentId,args.subject,assignmentTarget):[];
 const freshPicked=take(fresh,freshTarget),olderPicked=take(older,reviewTarget);
 const shortage=total-assignment.length-freshPicked.length-olderPicked.length;
 if(shortage>0){
   const used=new Set([...freshPicked,...olderPicked].map((q:any)=>String(q.id)));
   for(const q of [...fresh,...older]){if(shortage<=0)break;if(!used.has(String(q.id))){olderPicked.push(q);used.add(String(q.id));if(freshPicked.length+olderPicked.length+assignment.length>=total)break}}
 }
 return {kind:args.kind,totalTarget:total,currentTopicId:args.currentTopicId,
  objectiveQuestions:[...freshPicked,...olderPicked].slice(0,total-assignment.length),
  assignmentQuestions:assignment,
  mix:{fresh:freshPicked.length,older:olderPicked.length,assignment:assignment.length}};
}

export async function scheduledTopic(classLevel:string,subject:string,term:number,weekNumber:number){
 if(![1,2,3].includes(term)||weekNumber<1||weekNumber>20)return null;
 const rows=await withDbRetry(()=>sql`SELECT curriculum_topic_id,term,week_number FROM term_topic_schedule WHERE class_level=${classLevel} AND subject_name=${subject} AND term=${term} AND week_number=${weekNumber} LIMIT 1`);
 return rows[0]||null;
}
