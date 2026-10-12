import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
import {regenerateWeeklyQuestion} from '@/lib/weeklyExamGenerator';
import {WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import type postgres from 'postgres';
import {z} from 'zod';
const schema=z.object({action:z.enum(['PASS_RELEVANCE','PASS_ANSWER','REJECT','REGENERATE']),note:z.string().trim().max(1000).default('')});
export async function PATCH(request:Request,{params}:{params:Promise<{id:string;versionId:string;questionId:string}>}){
 await requireAdmin();const {id,versionId,questionId}=await params;
 const parsed=schema.safeParse(await request.json().catch(()=>null));
 if(![id,versionId,questionId].every(value=>z.string().uuid().safeParse(value).success)||!parsed.success)return NextResponse.json({error:'Invalid paper review.'},{status:400});
 const {action,note}=parsed.data;
 async function reviewTransaction(work:(tx:postgres.TransactionSql)=>Promise<void>){
  return sql.begin(async tx=>{
   const [version]=await tx`SELECT v.status FROM weekly_exam_versions v JOIN weekly_exam_blueprints b ON b.id=v.blueprint_id
    WHERE v.id=${versionId} AND b.id=${id} FOR UPDATE OF b,v`;
   if(!version||!['DRAFT','IN_REVIEW'].includes(String(version.status)))throw new WeeklyWorkspaceError('This paper version is no longer editable.',409);
   const [membership]=await tx`SELECT question_id FROM weekly_exam_version_questions WHERE version_id=${versionId} AND question_id=${questionId} FOR UPDATE`;
   if(!membership)throw new WeeklyWorkspaceError('The question has already been replaced.',409);
   await work(tx);
  });
 }
 try{
  if(action==='PASS_RELEVANCE')await reviewTransaction(async tx=>{await tx`UPDATE weekly_exam_version_questions SET relevance_status='PASSED',reviewer_note=COALESCE(NULLIF(${note},''),reviewer_note) WHERE version_id=${versionId} AND question_id=${questionId}`});
  else if(action==='PASS_ANSWER')await reviewTransaction(async tx=>{await tx`UPDATE weekly_exam_version_questions SET answer_status='PASSED',reviewer_note=COALESCE(NULLIF(${note},''),reviewer_note) WHERE version_id=${versionId} AND question_id=${questionId}`});
  else if(action==='REJECT')await reviewTransaction(async tx=>{
   await tx`UPDATE weekly_exam_version_questions SET relevance_status='FAILED',answer_status='FAILED',reviewer_note=${note||'Rejected by owner'} WHERE version_id=${versionId} AND question_id=${questionId}`;
   await tx`UPDATE questions SET quality_status='REJECTED' WHERE id=${questionId} AND status IN ('DRAFT','REVIEW')`;
  });
  else{
   const [question]=await withDbRetry(()=>sql`SELECT membership.*,q.prompt,q.curriculum_objective,q.skill_id,b.class_level,j.instruction
    FROM weekly_exam_version_questions membership JOIN questions q ON q.id=membership.question_id JOIN weekly_exam_versions v ON v.id=membership.version_id
    JOIN weekly_exam_blueprints b ON b.id=v.blueprint_id LEFT JOIN academic_ai_jobs j ON j.id=v.generation_job_id
    WHERE membership.version_id=${versionId} AND membership.question_id=${questionId} AND b.id=${id} AND v.status IN ('DRAFT','IN_REVIEW')`);
   if(!question)throw new WeeklyWorkspaceError('Review-stage question not found.',404);
   const generated=await regenerateWeeklyQuestion({classLevel:String(question.class_level),subject:String(question.subject_name),topicId:String(question.curriculum_topic_id),objective:String(question.curriculum_objective),difficulty:String(question.difficulty_band) as 'FOUNDATION'|'STANDARD'|'CHALLENGE',originalPrompt:String(question.prompt),reviewerNote:note,adminInstruction:String(question.instruction||'')});
   if(!generated.ok||!generated.json)return NextResponse.json({error:'Replacement failed validation. The original question was kept.'},{status:422});
   const replacement=generated.json;
   await reviewTransaction(async tx=>{
    const [fresh]=await tx`INSERT INTO questions(skill_id,prompt,question_type,options,correct_answer,explanation,difficulty,status,content_origin,curriculum_objective,quality_status,solution_steps,micro_skill,rights_status,class_level,curriculum_topic_id,assessment_kind,review_version)
     VALUES(${question.skill_id},${replacement.prompt},${replacement.questionType}::question_type,${JSON.stringify(replacement.options)}::jsonb,${JSON.stringify(replacement.correctAnswer)}::jsonb,${replacement.solution},
      ${replacement.difficulty==='FOUNDATION'?1:replacement.difficulty==='STANDARD'?2:3},'DRAFT'::question_status,'AI_WEEKLY_REPLACEMENT',${replacement.objective},'DRAFT',${JSON.stringify([replacement.solution])}::jsonb,${replacement.skill},'ORIGINAL_AI_DRAFT',${question.class_level},${replacement.topicId},'WEEKLY_EXAM','replacement') RETURNING id`;
    await tx`UPDATE weekly_exam_version_questions SET question_id=${fresh.id},relevance_status='PENDING',answer_status='PENDING',reviewer_note=NULL WHERE version_id=${versionId} AND question_id=${questionId}`;
    await tx`UPDATE questions SET quality_status='REJECTED' WHERE id=${questionId} AND status IN ('DRAFT','REVIEW')`;
   });return NextResponse.json({ok:true,message:'Replacement saved as draft; fresh review is required.'});
  }
  return NextResponse.json({ok:true,message:'Owner review saved.'});
 }catch(error){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Could not save review. Original records were retained.'},{status:error instanceof WeeklyWorkspaceError?error.status:503})}
}
