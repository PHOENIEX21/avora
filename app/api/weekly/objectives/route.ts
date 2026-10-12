import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {isWeeklyLearningEnabled} from '@/lib/weeklyLearning';
import {getDawnGate} from '@/lib/dawnAccess';
import {canReadReleasedWeek} from '@/lib/weeklyReleaseWindow';

export async function GET(request:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in required'},{status:401});
 const params=new URL(request.url).searchParams;
 const cls=params.get('classLevel');
 const termValue=params.get('term');
 const weekValue=params.get('week');
 const term=termValue===null?NaN:Number(termValue);
 const week=weekValue===null?NaN:Number(weekValue);
 if(!cls||!['JSS1','JSS2','JSS3'].includes(cls)||!Number.isInteger(term)||term<1||term>3||!Number.isInteger(week)||week<1||week>16)
  return NextResponse.json({error:'Invalid class, term or week'},{status:400});
 if(session.role!=='ADMIN'){
  if(session.role!=='STUDENT')return NextResponse.json({error:'Student access required'},{status:403});
  const gate=await getDawnGate(session.userId);
  if(gate.status!=='ready')return NextResponse.json({error:'Guardian onboarding and verification required'},{status:403});
  const [student]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${session.userId} LIMIT 1`);
  if(String(student?.class_level||'').toUpperCase()!==cls)return NextResponse.json({error:'Other class curriculum is private'},{status:403});
  if(!(await isWeeklyLearningEnabled(cls)))return NextResponse.json({error:'Weekly learning not enabled for this class'},{status:404});
  const [state]=await withDbRetry(()=>sql`SELECT term,current_week FROM weekly_class_week_state WHERE class_level=${cls} LIMIT 1`);
  if(!canReadReleasedWeek(state?{term:Number(state.term),week:Number(state.current_week)}:null,{term,week}))return NextResponse.json({error:'This week has not been released'},{status:404});
 }
 try{
  const rows=await withDbRetry(()=>sql`
   SELECT id,subject_name,day_index,topic_title,objective_text,source_reference
   FROM weekly_curriculum_objectives
   WHERE class_level=${cls} AND term=${term} AND week_number=${week} AND approval_status='PUBLISHED' AND published_at IS NOT NULL
     AND ( ${session.role==='ADMIN'} OR EXISTS (
      SELECT 1 FROM weekly_class_subjects cs WHERE cs.class_level=${cls}
       AND cs.subject_name=weekly_curriculum_objectives.subject_name AND cs.active=true
       AND (cs.subject_kind='CORE' OR EXISTS (
        SELECT 1 FROM weekly_student_optional_subjects os
        WHERE os.student_id=${session.userId} AND os.class_level=${cls} AND os.subject_name=cs.subject_name
       ))
     ))
   ORDER BY day_index,subject_name,topic_title,objective_text`);
  return NextResponse.json({classLevel:cls,term,week,days:[1,2,3,4,5].map(day=>({
   dayIndex:day,objectives:rows.filter(row=>Number(row.day_index)===day)
  }))});
 }catch{return NextResponse.json({error:'Weekly objectives unavailable'},{status:503})}
}
