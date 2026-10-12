import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql} from '@/lib/db';
import {WeeklyWorkspaceError} from '@/lib/weeklyWorkspace';
import {z} from 'zod';
const schema=z.object({prompt:z.string().trim().min(1).max(12000),correctAnswer:z.string().trim().min(1).max(12000),solution:z.string().trim().min(1).max(12000),options:z.array(z.string().trim().min(1).max(4000)).max(4).default([])});
export async function PATCH(request:Request,{params}:{params:Promise<{id:string;versionId:string;questionId:string}>}){
 await requireAdmin();const {id,versionId,questionId}=await params;
 const parsed=schema.safeParse(await request.json().catch(()=>null));
 if(![id,versionId,questionId].every(value=>z.string().uuid().safeParse(value).success)||!parsed.success)return NextResponse.json({error:'Invalid question edit.'},{status:400});
 try{
  const newId=await sql.begin(async tx=>{
   const [version]=await tx`SELECT v.status,b.class_level FROM weekly_exam_versions v JOIN weekly_exam_blueprints b ON b.id=v.blueprint_id
    WHERE v.id=${versionId} AND b.id=${id} FOR UPDATE OF b,v`;
   if(!version||!['DRAFT','IN_REVIEW'].includes(String(version.status)))throw new WeeklyWorkspaceError('Locked paper questions cannot be edited.',409);
   const [question]=await tx`SELECT q.* FROM questions q JOIN weekly_exam_version_questions membership ON membership.question_id=q.id
    WHERE q.id=${questionId} AND membership.version_id=${versionId} FOR SHARE OF q`;
   if(!question||question.class_level!==version.class_level)throw new WeeklyWorkspaceError('Question unavailable for this class.',404);
   const {prompt,correctAnswer,solution,options}=parsed.data;
   if(question.question_type==='MULTIPLE_CHOICE'&&(options.length!==4||new Set(options.map(value=>value.toLowerCase())).size!==4||!options.includes(correctAnswer)))
    throw new WeeklyWorkspaceError('MCQ needs four distinct options and an exact option-text answer.',400);
   // Editing creates a fresh draft; existing verified bank rows and saved results keep their source.
   const [created]=await tx`INSERT INTO questions(skill_id,source_id,source_type,exam_name,exam_year,prompt,question_type,options,correct_answer,explanation,difficulty,status,
    content_origin,curriculum_objective,quality_status,solution_steps,micro_skill,rights_status,class_level,curriculum_topic_id,assessment_kind,review_version)
    VALUES(${question.skill_id},${question.source_id},${question.source_type},${question.exam_name},${question.exam_year},${prompt},${question.question_type},
     ${JSON.stringify(options)}::jsonb,${JSON.stringify(correctAnswer)}::jsonb,${solution},${question.difficulty},'DRAFT','ADMIN_EDITED_AI_DRAFT',${question.curriculum_objective},'DRAFT',
     ${JSON.stringify([solution])}::jsonb,${question.micro_skill},${question.rights_status},${question.class_level},${question.curriculum_topic_id},${question.assessment_kind},'OWNER_EDIT_DRAFT') RETURNING id`;
   await tx`UPDATE weekly_exam_version_questions SET question_id=${created.id},relevance_status='PENDING',answer_status='PENDING',reviewer_note='Edited draft; fresh review required.'
    WHERE version_id=${versionId} AND question_id=${questionId}`;return String(created.id);
  });return NextResponse.json({ok:true,questionId:newId});
 }catch(error){return NextResponse.json({error:error instanceof WeeklyWorkspaceError?error.message:'Could not save reviewed draft edit.'},{status:error instanceof WeeklyWorkspaceError?error.status:503})}
}
