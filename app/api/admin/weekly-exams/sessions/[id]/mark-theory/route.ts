import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
import {markWeeklyTheory} from '@/lib/weeklyTheoryMarker';
import type {WeeklyPaperQuestion} from '@/lib/weeklyExamSession';
import {z} from 'zod';
export const maxDuration=60;
export async function POST(_request:Request,{params}:{params:Promise<{id:string}>}){
 const admin=await requireAdmin(),{id}=await params;if(!z.string().uuid().safeParse(id).success)return NextResponse.json({error:'Invalid paper.'},{status:400});
 const [session]=await withDbRetry(()=>sql`SELECT * FROM exam_sessions WHERE id=${id} AND status='COMPLETED' AND marking_status='PENDING'`);
 if(!session)return NextResponse.json({error:'No theory paper is waiting for marking.'},{status:404});
 const paper=session.weekly_paper_snapshot as WeeklyPaperQuestion[];
 if(!Array.isArray(paper)||!paper.length)return NextResponse.json({error:'This earlier paper needs owner review of its original source.'},{status:409});
 const theory=paper.filter(q=>q.type!=='MULTIPLE_CHOICE');
 const marked=await markWeeklyTheory(theory.map(q=>({questionId:q.id,prompt:q.prompt,approvedSolution:q.explanation,learnerAnswer:String(session.answers?.[q.id]||''),objective:q.objectiveText})));
 if(!marked.ok)return NextResponse.json({error:'Theory marking could not be validated. The result remains pending.'},{status:422});
 const markMap=new Map(marked.json!.marks.map(mark=>[mark.questionId,mark]));
 if(markMap.size!==theory.length||theory.some(q=>!markMap.has(q.id)))return NextResponse.json({error:'Marking does not match this paper.'},{status:422});
 const saved=await sql.begin(async tx=>{
  await tx`SELECT id FROM users WHERE id=${session.student_id} FOR UPDATE`;
  const [current]=await tx`SELECT id FROM exam_sessions WHERE id=${id} AND status='COMPLETED' AND marking_status='PENDING' FOR UPDATE`;
  if(!current)return false;
  for(const question of theory){const mark=markMap.get(question.id)!;
   await tx`INSERT INTO weekly_exam_question_marks(session_id,question_id,objective_id,subject_name,curriculum_topic_id,mark_fraction,marking_source,feedback,marked_by)
    VALUES(${id},${question.id},${question.objectiveId},${question.subject},${question.topic},${mark.fraction},'AI_DRAFT',${mark.feedback},${admin.userId})
    ON CONFLICT(session_id,question_id) DO UPDATE SET mark_fraction=EXCLUDED.mark_fraction,feedback=EXCLUDED.feedback,marking_source='AI_DRAFT',marked_by=EXCLUDED.marked_by,marked_at=clock_timestamp()`;
  }
  await tx`UPDATE exam_sessions SET marking_status='REVIEW_PENDING' WHERE id=${id}`;return true;
 });return NextResponse.json(saved?{ok:true,count:theory.length}:{error:'This paper has already moved to review.'},{status:saved?200:409});
}
