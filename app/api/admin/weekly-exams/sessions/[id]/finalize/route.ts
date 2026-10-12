import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';
import {WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import type {WeeklyPaperQuestion} from '@/lib/weeklyExamSession';
const schema=z.object({marks:z.record(z.string().uuid(),z.object({fraction:z.number().min(0).max(1),feedback:z.string().max(2000)}))});
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
 const admin=await requireAdmin(),{id}=await params;
 const parsed=schema.safeParse(await request.json().catch(()=>null));if(!z.string().uuid().safeParse(id).success||!parsed.success)return NextResponse.json({error:'Invalid reviewed marks.'},{status:400});
 try{
  const [owner]=await withDbRetry(()=>sql`SELECT student_id FROM exam_sessions WHERE id=${id}`);
  if(!owner)return NextResponse.json({error:'Paper not found.'},{status:404});
  const result=await sql.begin(async tx=>{
   await tx`SELECT id FROM users WHERE id=${owner.student_id} FOR UPDATE`;
   const [session]=await tx`SELECT * FROM exam_sessions WHERE id=${id} AND student_id=${owner.student_id} AND status='COMPLETED' AND marking_status='REVIEW_PENDING' FOR UPDATE`;
   if(!session)throw new WeeklyWorkspaceError('This session is not awaiting mark review.',409);
   const paper=session.weekly_paper_snapshot as WeeklyPaperQuestion[];
   if(!Array.isArray(paper)||!paper.length)throw new WeeklyWorkspaceError('This earlier paper needs owner review of its original source.',409);
   const theory=paper.filter(q=>q.type!=='MULTIPLE_CHOICE'),allowed=new Set(theory.map(q=>q.id));
   if(Object.keys(parsed.data.marks).length!==theory.length||Object.keys(parsed.data.marks).some(id=>!allowed.has(id)))throw new WeeklyWorkspaceError('Review every theory question from this paper.',400);
   for(const question of theory){const mark=parsed.data.marks[question.id];
    const updated=await tx`UPDATE weekly_exam_question_marks SET mark_fraction=${mark.fraction},feedback=${mark.feedback},marking_source='ADMIN',marked_by=${admin.userId},marked_at=clock_timestamp()
     WHERE session_id=${id} AND question_id=${question.id} RETURNING question_id`;
    if(!updated.length)throw new WeeklyWorkspaceError('The theory marking draft is incomplete.',409);
   }
   const marks=await tx`SELECT question_id,mark_fraction FROM weekly_exam_question_marks WHERE session_id=${id}`;
   if(marks.length!==paper.length||marks.some(mark=>!paper.some(q=>q.id===String(mark.question_id))))throw new WeeklyWorkspaceError('The reviewed marks are incomplete.',409);
   const score=marks.reduce((sum,mark)=>sum+Number(mark.mark_fraction),0)/paper.length;
   await tx`UPDATE exam_sessions SET score=${score},marking_status='COMPLETED' WHERE id=${id}`;return {ok:true,score:Math.round(score*100)};
  });return NextResponse.json(result);
 }catch(error){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Could not finalize reviewed marks.'},{status:error instanceof WeeklyWorkspaceError?error.status:503})}
}
