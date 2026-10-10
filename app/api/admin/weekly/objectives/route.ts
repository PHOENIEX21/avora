import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

const rowSchema=z.object({
 classLevel:z.enum(['JSS1','JSS2','JSS3']),
 subjectName:z.string().trim().min(2).max(100),
 term:z.number().int().min(1).max(3),
 weekNumber:z.number().int().min(1).max(16),
 dayIndex:z.number().int().min(1).max(5),
 topicTitle:z.string().trim().min(3).max(250),
 objectiveText:z.string().trim().min(8).max(2000),
 sourceReference:z.string().trim().min(3).max(300),
 curriculumTopicId:z.string().trim().max(150).nullable().optional()
});
const payload=z.object({rows:z.array(rowSchema).min(1).max(250)});
export async function GET(request:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const url=new URL(request.url);
 const cls=url.searchParams.get('classLevel');
 if(!cls||!['JSS1','JSS2','JSS3'].includes(cls))return NextResponse.json({error:'Invalid class'},{status:400});
 try{
  const rows=await withDbRetry(()=>sql`
   SELECT id,class_level,subject_name,term,week_number,day_index,topic_title,objective_text,
          source_reference,approval_status
   FROM weekly_curriculum_objectives WHERE class_level=${cls}
   ORDER BY term,week_number,day_index,subject_name,topic_title`);
  return NextResponse.json({rows});
 }catch{return NextResponse.json({error:'Weekly curriculum unavailable'},{status:503})}
}
export async function POST(request:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const parsed=payload.safeParse(await request.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:'Invalid curriculum rows',issues:parsed.error.issues},{status:400});
 try{
  let inserted=0;
  for(const row of parsed.data.rows){
   const result=await withDbRetry(()=>sql`
    INSERT INTO weekly_curriculum_objectives
     (class_level,subject_name,term,week_number,day_index,topic_title,objective_text,source_reference,curriculum_topic_id,approval_status)
    VALUES(${row.classLevel},${row.subjectName},${row.term},${row.weekNumber},${row.dayIndex},
           ${row.topicTitle},${row.objectiveText},${row.sourceReference},${row.curriculumTopicId??null},'DRAFT')
    ON CONFLICT(class_level,subject_name,term,week_number,objective_text) DO NOTHING RETURNING id`);
   inserted+=result.length;
  }
  return NextResponse.json({ok:true,inserted,submitted:parsed.data.rows.length,status:'DRAFT'});
 }catch{return NextResponse.json({error:'Curriculum import failed; check source and database migration'},{status:503})}
}
