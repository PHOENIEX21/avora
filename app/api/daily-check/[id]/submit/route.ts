import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {answerIsCorrect} from '@/lib/answers';
import {nextMasteryScore} from '@/lib/mastery';
import {z} from 'zod';

const schema=z.object({answers:z.record(z.string().uuid(),z.string().max(4000))});

export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 const s=await getSession();
 if(!s)return NextResponse.json({error:'Sign in required.'},{status:401});
 if(s.role!=='STUDENT')return NextResponse.json({error:'Student access only.'},{status:403});
 const {id}=await params;
 if(!z.string().uuid().safeParse(id).success)return NextResponse.json({error:'Invalid objective.'},{status:400});
 let data:unknown;
 try{data=await req.json()}catch{return NextResponse.json({error:'Invalid JSON.'},{status:400})}
 const parsed=schema.safeParse(data);
 if(!parsed.success)return NextResponse.json({error:'Invalid answers.'},{status:400});
 const {answers}=parsed.data;
 const [p]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 const [a]=await withDbRetry(()=>sql`SELECT a.id FROM daily_assessments a JOIN academic_daily_objectives o ON o.id=a.objective_id JOIN term_topic_schedule t ON t.id=o.schedule_id WHERE o.id=${id} AND a.status='PUBLISHED' AND t.class_level=${String(p?.class_level||'')}`);
 if(!a)return NextResponse.json({error:'Daily Check is unavailable.'},{status:404});
 const qs=await withDbRetry(()=>sql`SELECT q.id,q.question_type,q.correct_answer,q.options,q.skill_id FROM daily_assessment_questions x JOIN questions q ON q.id=x.question_id WHERE x.assessment_id=${a.id} ORDER BY x.position`);
 if(!qs.length||qs.some(q=>q.question_type!=='MULTIPLE_CHOICE'))
  return NextResponse.json({error:'Daily Check is not ready.'},{status:409});
 const questionIds=new Set(qs.map(q=>String(q.id)));
 if(Object.keys(answers).some(key=>!questionIds.has(key)))
  return NextResponse.json({error:'Answers must belong to this Daily Check.'},{status:400});
 const result=await withDbRetry(()=>sql.begin(async tx=>{
  // Serialize a student's evidence updates across simultaneous Daily Checks.
  await tx`SELECT id FROM users WHERE id=${s.userId} FOR UPDATE`;
  const claimed=await tx`INSERT INTO daily_assessment_submissions(student_id,assessment_id) VALUES(${s.userId},${a.id}) ON CONFLICT DO NOTHING RETURNING student_id`;
  if(!claimed.length){
   const [prior]=await tx`SELECT correct_count,total_count FROM daily_assessment_submissions WHERE student_id=${s.userId} AND assessment_id=${a.id}`;
   return {alreadySubmitted:true,correct:Number(prior?.correct_count||0),total:Number(prior?.total_count||0)};
  }
  let correct=0;
  for(const q of qs){
   const raw=answers[String(q.id)]||'',ok=answerIsCorrect(raw,q.correct_answer,q.options);
   if(ok)correct++;
   await tx`INSERT INTO attempts(student_id,question_id,answer,is_correct,diagnosis,mode) VALUES(${s.userId},${q.id},${JSON.stringify({value:raw})}::jsonb,${ok},${ok?'Independent Daily Check evidence':'Daily objective needs more work'},'PRACTICE')`;
   if(q.skill_id){
    const [old]=await tx`SELECT score,evidence_count FROM mastery WHERE student_id=${s.userId} AND skill_id=${q.skill_id}`;
    const score=nextMasteryScore(Number(old?.score||0),ok,Number(old?.evidence_count||0));
    await tx`INSERT INTO mastery(student_id,skill_id,score,evidence_count,last_practiced_at) VALUES(${s.userId},${q.skill_id},${score},1,now()) ON CONFLICT(student_id,skill_id) DO UPDATE SET score=${score},evidence_count=mastery.evidence_count+1,last_practiced_at=now(),updated_at=now()`;
   }
  }
  const total=qs.length;
  const [old]=await tx`SELECT evidence_count,earned_fraction FROM learner_objective_mastery WHERE student_id=${s.userId} AND objective_id=${id}`;
  const evidence=Number(old?.evidence_count||0)+total,sum=Number(old?.earned_fraction||0)+correct,score=evidence?sum/evidence:0;
  const status=evidence<1?'STARTING':score<.4?'NEEDS_TEACHING':score<.65?'DEVELOPING':score<.8?'PRACTISING':evidence>=3?'MASTERED':'SECURE';
  await tx`INSERT INTO learner_objective_mastery(student_id,objective_id,evidence_count,earned_fraction,mastery_score,status) VALUES(${s.userId},${id},${evidence},${sum},${score},${status}) ON CONFLICT(student_id,objective_id) DO UPDATE SET evidence_count=${evidence},earned_fraction=${sum},mastery_score=${score},status=${status},updated_at=now()`;
  await tx`UPDATE learner_daily_tasks SET status='COMPLETED',completed_at=now(),result_ref=${String(a.id)} WHERE student_id=${s.userId} AND objective_id=${id} AND task_kind='DAILY_CHECK' AND status<>'COMPLETED'`;
  await tx`UPDATE daily_assessment_submissions SET correct_count=${correct},total_count=${total} WHERE student_id=${s.userId} AND assessment_id=${a.id}`;
  return {alreadySubmitted:false,correct,total};
 }));
 return NextResponse.json({ok:true,alreadySubmitted:result.alreadySubmitted,score:result.total?Math.round(result.correct/result.total*100):0,correct:result.correct,total:result.total});
}
