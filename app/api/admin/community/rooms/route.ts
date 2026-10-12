import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

export async function POST(){
 try{
  const session=await getSession();
  if(!session)return NextResponse.json({error:'Please sign in as an administrator.'},{status:401});
  if(session.role!=='ADMIN')return NextResponse.json({error:'Administrator access is required.'},{status:403});
  const levels=['JSS1','JSS2','JSS3'];
  const subjects=['General','Mathematics','English Language'];
  const created=await withDbRetry(()=>sql.begin(async tx=>{
   // Serialise setup requests so repeated clicks cannot create duplicate NULL-topic rooms.
   await tx`SELECT pg_advisory_xact_lock(42723105)`;
   let count=0;
   for(const level of levels)for(const subject of subjects){
    const rows=await tx`INSERT INTO study_rooms(class_level,subject_name,curriculum_topic_id,title,description,status)
     SELECT ${level},${subject},NULL,${subject==='General'?level+' Main Study Group':subject+' Study Room'},${subject==='General'?'Main class group for questions, solutions, academic polls and peer support.':'Moderated '+level+' '+subject+' questions, explanations and worked examples.'},'ACTIVE'
     WHERE NOT EXISTS(SELECT 1 FROM study_rooms WHERE class_level=${level} AND subject_name=${subject} AND curriculum_topic_id IS NULL)
     RETURNING id`;
    count+=rows.length;
   }
   return count;
  }));
  return NextResponse.json({ok:true,created,message:'Class Study Rooms are ready.'});
 }catch(error){
  console.error('study room setup failed',error);
  return NextResponse.json({error:'Study Rooms could not be created. Please check the database migrations and server logs.'},{status:500});
 }
}
