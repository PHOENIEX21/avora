import {learningAccessDenial} from '@/lib/apiAccess';
import {NextResponse} from 'next/server';
import {z} from 'zod';
import {sql,withDbRetry} from '@/lib/db';
import {getSession} from '@/lib/auth';
import {nextMasteryScore} from '@/lib/mastery';
import {answerIsCorrect,displayCorrectAnswer} from '@/lib/answers';
import {evidenceConfidence,evidenceStatus,inferMisconception} from '@/lib/learnerIntelligence';

const schema=z.object({questionId:z.string().uuid(),answer:z.string().max(500),mode:z.enum(['PRACTICE','DIAGNOSTIC']).default('PRACTICE'),hintCount:z.number().int().min(0).max(9).default(0)});
function diagnosis(actual:string,expected:string,correct:boolean){if(correct)return 'Correct. You reached the expected result independently. AVORA will use another question to confirm the skill.';const a=Number(actual.replace(/[^0-9.-]/g,'')),e=Number(expected.replace(/[^0-9.-]/g,''));if(Number.isFinite(a)&&Number.isFinite(e)&&Math.abs(a)===Math.abs(e))return 'Not correct yet. Your value is close, but the sign changed. Check where a negative term was moved or combined.';return 'Not correct yet. Stay on this skill and locate the first step that changed.'}
function transient(e:any){return /CONNECT_TIMEOUT|ETIMEDOUT|ECONNRESET|ECONNREFUSED|connection/i.test(String(e?.code||'')+' '+String(e?.message||''))}

export async function POST(req:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Sign in to save mastery progress.'},{status:401});
 const accessDenied=await learningAccessDenial(session);if(accessDenied)return accessDenied;
 let data:z.infer<typeof schema>;
 try{data=schema.parse(await req.json())}catch(e){if(e instanceof z.ZodError)return NextResponse.json({error:'That answer could not be read. Please try again.'},{status:400});return NextResponse.json({error:'That answer could not be read. Please try again.'},{status:400})}

 // Fetch and mark first. Once the question has been read successfully, AVORA must tell the
 // learner whether the answer is correct even if the later evidence write has a transient failure.
 let q:any;
 try{
  [q]=await withDbRetry(()=>sql`SELECT q.id,q.skill_id,q.correct_answer,q.options,q.explanation,q.difficulty,q.micro_skill,q.wrong_answer_reasoning,q.misconception_tags,sk.name skill,t.name topic FROM questions q JOIN skills sk ON sk.id=q.skill_id JOIN topics t ON t.id=sk.topic_id WHERE q.id=${data.questionId} AND q.status='PUBLISHED'`,4);
 }catch(e:any){
  console.error('attempt question read',e);
  return NextResponse.json({error:'AVORA could not read this question just now. Please retry.'},{status:503});
 }
 if(!q)return NextResponse.json({error:'Question not found.'},{status:404});

 const expected=displayCorrectAnswer(q.correct_answer),correct=answerIsCorrect(data.answer,q.correct_answer,q.options),baseDiag=diagnosis(data.answer,expected,correct);
 const misconception=correct?null:inferMisconception({topic:q.topic,skill:q.skill,microSkill:q.micro_skill,wrongAnswerReasoning:q.wrong_answer_reasoning,misconceptionTags:q.misconception_tags});
 const diag=correct?baseDiag:(misconception?.note||baseDiag);
 const independent=data.hintCount===0;

 let masteryScore=0;
 try{
  // Save the learner's attempt and primary mastery evidence together. Secondary analytics
  // must never make a successfully recorded answer look like a failed submission.
  const primary=await withDbRetry(()=>sql.begin(async tx=>{
    const [m]=await tx`SELECT score,evidence_count FROM mastery WHERE student_id=${session.userId} AND skill_id=${q.skill_id} FOR UPDATE`;
    const current=m?Number(m.score):0,count=m?Number(m.evidence_count):0;
    const score=independent?nextMasteryScore(current,correct,count):current;
    await tx`INSERT INTO attempts(student_id,question_id,answer,is_correct,diagnosis,mode,hint_count) VALUES(${session.userId},${q.id},${sql.json({value:data.answer})},${correct},${diag},${data.mode},${data.hintCount})`;
    if(independent)await tx`INSERT INTO mastery(student_id,skill_id,score,evidence_count,last_practiced_at) VALUES(${session.userId},${q.skill_id},${score},1,now()) ON CONFLICT(student_id,skill_id) DO UPDATE SET score=${score},evidence_count=mastery.evidence_count+1,last_practiced_at=now(),updated_at=now()`;
    return {score};
  }),4);
  masteryScore=primary.score;
 }catch(e:any){
  console.error('attempt evidence save',e);
  return NextResponse.json({
   correct,explanation:q.explanation,diagnosis:diag,mastery:null,evidenceCount:null,accuracy:null,status:null,confidence:null,misconception,
   independentEvidence:false,assisted:!independent,saved:false,
   saveMessage:transient(e)?'Your answer was checked, but AVORA briefly lost the database connection before saving the evidence. Your correct/wrong result is still shown below. Tap Retry saving evidence.':'Your answer was checked, but AVORA could not save the evidence. Your correct/wrong result is still shown below. Tap Retry saving evidence.'
  });
 }

 let evidenceCount=0,accuracy=0,recentWrong=0,status='STARTING',confidence='LOW';
 try{
  const [e]=await withDbRetry(()=>sql`SELECT COUNT(*)::int n,COUNT(*) FILTER(WHERE is_correct)::int correct,COUNT(*) FILTER(WHERE NOT is_correct AND created_at>now()-interval '30 days')::int recent_wrong FROM attempts a JOIN questions qq ON qq.id=a.question_id WHERE a.student_id=${session.userId} AND a.mode IN ('PRACTICE','DIAGNOSTIC','EXAM') AND COALESCE(a.hint_count,0)=0 AND qq.skill_id=${q.skill_id}`,3);
  evidenceCount=Number(e?.n||0);accuracy=evidenceCount?Number(e?.correct||0)/evidenceCount:0;recentWrong=Number(e?.recent_wrong||0);
  status=evidenceStatus(accuracy,evidenceCount,recentWrong);confidence=evidenceConfidence(evidenceCount);
  if(independent){
    await withDbRetry(()=>sql`INSERT INTO learner_skill_insights(student_id,skill_id,status,confidence,misconception_key,misconception_note,independent_accuracy,independent_evidence,last_wrong_at,last_correct_at,updated_at) VALUES(${session.userId},${q.skill_id},${status},${confidence},${misconception?.key||null},${misconception?.note||null},${accuracy},${evidenceCount},${correct?null:new Date()},${correct?new Date():null},now()) ON CONFLICT(student_id,skill_id) DO UPDATE SET status=${status},confidence=${confidence},misconception_key=CASE WHEN ${correct} THEN learner_skill_insights.misconception_key ELSE COALESCE(${misconception?.key||null},learner_skill_insights.misconception_key) END,misconception_note=CASE WHEN ${correct} THEN learner_skill_insights.misconception_note ELSE COALESCE(${misconception?.note||null},learner_skill_insights.misconception_note) END,independent_accuracy=${accuracy},independent_evidence=${evidenceCount},last_wrong_at=CASE WHEN ${correct} THEN learner_skill_insights.last_wrong_at ELSE now() END,last_correct_at=CASE WHEN ${correct} THEN now() ELSE learner_skill_insights.last_correct_at END,updated_at=now()`,3);
  }
 }catch(analyticsError){
  console.warn('attempt analytics deferred',analyticsError instanceof Error?analyticsError.message:'unknown');
 }

 return NextResponse.json({correct,explanation:q.explanation,diagnosis:diag,mastery:masteryScore,evidenceCount,accuracy,status,confidence,misconception,independentEvidence:independent,assisted:!independent,saved:true});
}
