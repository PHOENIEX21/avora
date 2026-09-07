import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';
import {answerIsCorrect} from '@/lib/answers';

const schema=z.object({sessionId:z.string().uuid()});

export async function POST(req:Request){
 const s=await getSession();
 if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});
 try{
  const {sessionId}=schema.parse(await req.json());
  const [x]=await withDbRetry(()=>sql`SELECT * FROM exam_sessions WHERE id=${sessionId} AND student_id=${s.userId}`);
  if(!x)return NextResponse.json({error:'Assessment not found.'},{status:404});
  if(x.status==='COMPLETED')return NextResponse.json({error:'This assessment has already been submitted.'},{status:409});

  const qs=await withDbRetry(()=>sql`SELECT q.id,q.correct_answer,q.options,q.skill_id,COALESCE(q.exam_topic,t.name) topic FROM questions q JOIN skills sk ON sk.id=q.skill_id JOIN topics t ON t.id=sk.topic_id WHERE q.id=ANY(${x.question_ids})`);
  const ans=x.answers||{};
  let correct=0;
  const topic:any={};
  const attemptRows:any[]=[];

  for(const q of qs){
   const raw=ans[q.id]??'';
   const ok=answerIsCorrect(raw,q.correct_answer,q.options);
   correct+=ok?1:0;
   topic[q.topic]??={correct:0,total:0};
   topic[q.topic].total++;
   topic[q.topic].correct+=ok?1:0;
   attemptRows.push({
    student_id:s.userId,
    question_id:q.id,
    answer:JSON.stringify({value:raw}),
    is_correct:ok,
    diagnosis:ok?'Independent exam evidence':'Needs teaching after exam',
    mode:'EXAM'
   });
  }

  // Write the completed paper atomically. Using explicit tagged queries keeps
  // postgres.js + TypeScript inference stable in production builds.
  if(attemptRows.length){
   await withDbRetry(()=>sql.begin(async tx=>{
    for(const row of attemptRows){
     await tx`INSERT INTO attempts(student_id,question_id,answer,is_correct,diagnosis,mode)
      VALUES(${row.student_id},${row.question_id},${row.answer}::jsonb,${row.is_correct},${row.diagnosis},${row.mode})`;
    }
   }));
  }

  const score=qs.length?correct/qs.length:0;
  await withDbRetry(()=>sql`UPDATE exam_sessions SET status='COMPLETED',submitted_at=now(),score=${score} WHERE id=${sessionId}`);

  const analysis=Object.entries(topic)
   .map(([name,v]:any)=>({topic:name,correct:v.correct,total:v.total,percent:Math.round(v.correct/v.total*100)}))
   .sort((a,b)=>a.percent-b.percent);

  return NextResponse.json({score:Math.round(score*100),correct,total:qs.length,analysis,recommended:analysis[0]?.topic||null});
 }catch(e){
  console.error('exam finish',e);
  return NextResponse.json({error:'AVORA could not submit the assessment yet. Your answers are still on this page — please retry.'},{status:503});
 }
}
