import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {isWeeklyLearningEnabled} from '@/lib/weeklyLearning';

export async function GET(request:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 const params=new URL(request.url).searchParams;
 const cls=params.get('classLevel');
 const term=Number(params.get('term'));
 const week=Number(params.get('week'));
 if(!cls||!['JSS1','JSS2','JSS3'].includes(cls)||!Number.isInteger(term)||term<1||term>3||!Number.isInteger(week)||week<1||week>16)
  return NextResponse.json({error:'Invalid class, term or week'},{status:400});
 if(session.role!=='ADMIN'){
  const [student]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${session.userId} LIMIT 1`);
  if(String(student?.class_level||'').toUpperCase()!==cls)return NextResponse.json({error:'Other class curriculum is private'},{status:403});
  if(!(await isWeeklyLearningEnabled(cls)))return NextResponse.json({error:'Weekly learning not enabled for this class'},{status:404});
  const [state]=await withDbRetry(()=>sql`SELECT term,current_week FROM weekly_class_week_state WHERE class_level=${cls} LIMIT 1`);
  if(!state||Number(state.term)!==term||Number(state.current_week)!==week)return NextResponse.json({error:'This week has not been released'},{status:404});
 }
 try{
  const rows=await withDbRetry(()=>sql`
   SELECT id,subject_name,day_index,topic_title,objective_text,source_reference
   FROM weekly_curriculum_objectives
   WHERE class_level=${cls} AND term=${term} AND week_number=${week} AND approval_status='PUBLISHED' AND published_at IS NOT NULL
   ORDER BY day_index,subject_name,topic_title,objective_text`);
  return NextResponse.json({classLevel:cls,term,week,days:[1,2,3,4,5].map(day=>({
   dayIndex:day,objectives:rows.filter(row=>Number(row.day_index)===day)
  }))});
 }catch{return NextResponse.json({error:'Weekly objectives unavailable'},{status:503})}
}
