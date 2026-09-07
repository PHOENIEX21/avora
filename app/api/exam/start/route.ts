import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';
import {subjectSlug,profileSubjectValue} from '@/lib/subjects';

const schema=z.object({exam:z.enum(['BECE','NCEE']),subject:z.enum(['Mathematics','English Language']),assessmentType:z.enum(['FULL_MOCK','QUICK_10','TOPIC_TEST','WEAKNESS_TEST']).default('FULL_MOCK'),topic:z.string().optional()});
function normalizeOptions(v:any):string[]|null{if(Array.isArray(v))return v.map(String);if(typeof v==='string'){try{return normalizeOptions(JSON.parse(v))}catch{return null}}if(v&&typeof v==='object'){if(Array.isArray(v.options))return v.options.map(String);if(Array.isArray(v.choices))return v.choices.map(String)}return null}
function shuffle<T>(a:T[]){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
function usable(r:any){const prompt=String(r.prompt||'').trim();const options=normalizeOptions(r.options);return prompt.length>=8&&(r.question_type!=='MULTIPLE_CHOICE'||Boolean(options&&options.length>=2))}
function errMessage(e:any){const text=String(e?.code||'')+' '+String(e?.message||'');if(/CONNECT_TIMEOUT|ETIMEDOUT|ECONNRESET|connection/i.test(text))return 'AVORA could not reach the assessment database. Your learning data is safe — tap Start again.';return 'Could not prepare this assessment. Please retry.'}

export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});
 try{
  const d=schema.parse(await req.json());const subSlug=subjectSlug(d.subject),profileSubject=profileSubjectValue(d.subject);
  const rows=await withDbRetry(()=>sql`
    SELECT q.id,q.prompt,q.question_type,q.options,q.difficulty,COALESCE(q.exam_topic,t.name) topic,
      COALESCE(hist.times_seen,0)::int times_seen,hist.last_seen,
      COALESCE(hist.correct_seen,0)::int correct_seen
    FROM questions q
    JOIN skills sk ON sk.id=q.skill_id
    JOIN topics t ON t.id=sk.topic_id
    JOIN subjects sub ON sub.id=t.subject_id
    LEFT JOIN (
      SELECT a.question_id,count(*) times_seen,max(a.created_at) last_seen,count(*) FILTER(WHERE a.is_correct) correct_seen
      FROM attempts a WHERE a.student_id=${s.userId} GROUP BY a.question_id
    ) hist ON hist.question_id=q.id
    WHERE q.status='PUBLISHED' AND q.exam_name=${d.exam} AND sub.slug=${subSlug}
      AND (${d.topic||null}::text IS NULL OR lower(COALESCE(q.exam_topic,t.name))=lower(${d.topic||null}) OR lower(t.name)=lower(${d.topic||null}))
    ORDER BY COALESCE(hist.times_seen,0),hist.last_seen NULLS FIRST,random()`);
  const good=rows.filter(usable);
  const needed=d.assessmentType==='QUICK_10'?10:d.assessmentType==='TOPIC_TEST'?Math.min(20,good.length):40;
  const minimum=d.assessmentType==='TOPIC_TEST'?Math.min(5,needed):needed;
  if(good.length<minimum)return NextResponse.json({error:`This ${d.exam} ${d.subject} bank currently has ${good.length} reviewed usable questions for this assessment. ${d.assessmentType==='FULL_MOCK'?'A full mock requires 40.':'Choose another assessment or topic while the bank is expanded.'}`},{status:409});

  let picked:any[]=[];
  if(d.assessmentType==='WEAKNESS_TEST'){
   const byTopic=new Map<string,{rows:any[];accuracy:number}>();
   for(const r of good){const x=byTopic.get(r.topic)||{rows:[],accuracy:1};x.rows.push(r);const seen=Number(r.times_seen||0);if(seen)x.accuracy=Math.min(x.accuracy,Number(r.correct_seen||0)/seen);byTopic.set(r.topic,x)}
   const ordered=[...byTopic.entries()].sort((a,b)=>a[1].accuracy-b[1].accuracy);
   let round=0;while(picked.length<Math.min(needed,good.length)&&round<50){for(const [,x] of ordered){if(x.rows[round]&&picked.length<needed)picked.push(x.rows[round])}round++}
  }else if(d.assessmentType==='FULL_MOCK'){
   const by=new Map<string,any[]>();for(const r of good){const a=by.get(r.topic)||[];a.push(r);by.set(r.topic,a)}
   const topics=shuffle([...by.keys()]);let round=0;while(picked.length<needed&&round<50){for(const t of topics){const pool=by.get(t)||[];if(pool[round]&&picked.length<needed)picked.push(pool[round])}round++}
  }else picked=good.slice(0,needed);
  picked=shuffle(picked).slice(0,needed);
  if(picked.length<minimum)return NextResponse.json({error:'AVORA could not build a complete reviewed paper from this bank yet.'},{status:409});

  const ids=picked.map(x=>x.id),duration=d.assessmentType==='QUICK_10'?900:d.assessmentType==='TOPIC_TEST'?1800:2700;
  const [x]=await withDbRetry(()=>sql`INSERT INTO exam_sessions(student_id,exam_name,subject_name,question_ids,duration_seconds) VALUES(${s.userId},${d.exam},${d.subject},${ids},${duration}) RETURNING id,started_at,duration_seconds`);
  // Track exposure in one database round-trip instead of one query per question.
  // Exposure tracking is helpful for freshness, but must never block starting an exam.
  try{
   const exposureRows=picked.map(q=>({student_id:s.userId,question_id:q.id,exam_session_id:x.id}));
   if(exposureRows.length){
    await sql.begin(async tx=>{
     for(const row of exposureRows){
      await tx`INSERT INTO question_exposures(student_id,question_id,exam_session_id)
       VALUES(${row.student_id},${row.question_id},${row.exam_session_id})
       ON CONFLICT DO NOTHING`;
     }
    });
   }
  }catch(e){console.warn('question exposure tracking unavailable',e)}
  await withDbRetry(()=>sql`UPDATE student_profiles SET target_exam=${d.exam},preferred_subject=${profileSubject},updated_at=now() WHERE user_id=${s.userId}`);
  return NextResponse.json({sessionId:x.id,startedAt:x.started_at,durationSeconds:x.duration_seconds,total:picked.length,assessmentType:d.assessmentType,questions:picked.map((q,i)=>{const options=normalizeOptions(q.options);return {number:i+1,id:q.id,prompt:String(q.prompt).trim(),type:q.question_type==='MULTIPLE_CHOICE'&&options?.length?'MULTIPLE_CHOICE':'SHORT_ANSWER',options,topic:q.topic}})});
 }catch(e:any){console.error('exam start',e);if(e instanceof z.ZodError)return NextResponse.json({error:'Please choose a valid exam, subject and assessment type.'},{status:400});return NextResponse.json({error:errMessage(e)},{status:503})}
}
