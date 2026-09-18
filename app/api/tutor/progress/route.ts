import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {subjectSlug} from '@/lib/subjects';

const progressBody=z.object({topic:z.string().min(1).max(120),subject:z.string().min(2).max(80),exam:z.string().min(2).max(40),currentUnit:z.number().int().min(0).max(100),coveredUnits:z.array(z.number().int().min(0).max(100)).max(100),coverageComplete:z.boolean(),lastUnitTitle:z.string().max(180).optional()});
const interactionBody=z.object({topic:z.string().min(1).max(120),subject:z.string().min(2).max(80),exam:z.string().min(2).max(40),unitTitle:z.string().max(180).optional(),kind:z.enum(['CHECKPOINT','QUESTION','RETEACH','LESSON_COMPLETE']),learnerText:z.string().max(1600).optional(),teacherText:z.string().max(2200).optional(),outcome:z.string().max(80).optional()});

export async function GET(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const u=new URL(req.url),topic=u.searchParams.get('topic')?.trim(),subject=u.searchParams.get('subject')?.trim();if(!topic)return NextResponse.json({progress:null});
  const [p]=await withDbRetry(()=>sql`SELECT target_exam,preferred_subject FROM student_profiles WHERE user_id=${s.userId}`);const exam=u.searchParams.get('exam')?.trim()||p?.target_exam||'BECE',slug=subjectSlug(subject||p?.preferred_subject);
  const [row]=await withDbRetry(()=>sql`SELECT current_unit,covered_units,coverage_complete,checkpoint_attempts,checkpoint_successes,last_unit_title,last_interaction_at FROM tutor_topic_progress WHERE student_id=${s.userId} AND exam_name=${exam} AND subject_slug=${slug} AND lower(topic_name)=lower(${topic})`);
  return NextResponse.json({progress:row?{currentUnit:Number(row.current_unit||0),coveredUnits:Array.isArray(row.covered_units)?row.covered_units:[],coverageComplete:Boolean(row.coverage_complete),checkpointAttempts:Number(row.checkpoint_attempts||0),checkpointSuccesses:Number(row.checkpoint_successes||0),lastUnitTitle:row.last_unit_title,lastInteractionAt:row.last_interaction_at}:null});
 }catch(e){console.error('tutor progress GET',e);return NextResponse.json({progress:null})}
}

export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const raw=await req.json();
  if(raw?.kind){
   const d=interactionBody.parse(raw),slug=subjectSlug(d.subject);
   await withDbRetry(()=>sql`INSERT INTO tutor_interactions(student_id,exam_name,subject_slug,topic_name,unit_title,interaction_kind,learner_text,teacher_text,outcome) VALUES(${s.userId},${d.exam},${slug},${d.topic},${d.unitTitle||null},${d.kind},${d.learnerText||null},${d.teacherText||null},${d.outcome||null})`);
   if(d.kind==='CHECKPOINT')await withDbRetry(()=>sql`UPDATE tutor_topic_progress SET checkpoint_attempts=checkpoint_attempts+1,checkpoint_successes=checkpoint_successes+CASE WHEN ${d.outcome||''}='CORRECT' THEN 1 ELSE 0 END,last_unit_title=${d.unitTitle||null},last_interaction_at=now(),updated_at=now() WHERE student_id=${s.userId} AND exam_name=${d.exam} AND subject_slug=${slug} AND lower(topic_name)=lower(${d.topic})`);
   return NextResponse.json({ok:true});
  }
  const d=progressBody.parse(raw),slug=subjectSlug(d.subject);
  await withDbRetry(()=>sql`INSERT INTO tutor_topic_progress(student_id,exam_name,subject_slug,topic_name,current_unit,covered_units,coverage_complete,last_unit_title,last_interaction_at,updated_at) VALUES(${s.userId},${d.exam},${slug},${d.topic},${d.currentUnit},${sql.json(d.coveredUnits)},${d.coverageComplete},${d.lastUnitTitle||null},now(),now()) ON CONFLICT(student_id,exam_name,subject_slug,topic_name) DO UPDATE SET current_unit=EXCLUDED.current_unit,covered_units=EXCLUDED.covered_units,coverage_complete=EXCLUDED.coverage_complete,last_unit_title=EXCLUDED.last_unit_title,last_interaction_at=now(),updated_at=now()`);
  return NextResponse.json({ok:true});
 }catch(e){console.error('tutor progress POST',e);return NextResponse.json({error:'Progress could not be saved yet.'},{status:503})}
}
