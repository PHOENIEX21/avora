import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';
export async function POST(){
 await requireAdmin();
 const levels=['JSS1','JSS2','JSS3'];
 const subjects=['Mathematics','English Language'];
 const created=await withDbRetry(()=>sql.begin(async tx=>{
  let count=0;
  for(const level of levels)for(const subject of subjects){
   const rows=await tx`INSERT INTO study_rooms(class_level,subject_name,curriculum_topic_id,title,description,status)
   SELECT ${level},${subject},NULL,${subject+' Study Room'},${'Moderated '+level+' '+subject+' questions, explanations and worked examples.'},'ACTIVE'
   WHERE NOT EXISTS(SELECT 1 FROM study_rooms WHERE class_level=${level} AND subject_name=${subject} AND curriculum_topic_id IS NULL)
   RETURNING id`;
   count+=rows.length;
  }
  return count;
 }));
 return NextResponse.json({ok:true,created,message:'Class study rooms are ready for moderation.'});
}
