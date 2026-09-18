import {learningAccessDenial} from '@/lib/apiAccess';
import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';
import {answerIsCorrect,displayCorrectAnswer} from '@/lib/answers';
import {nextMasteryScore} from '@/lib/mastery';
import {evidenceConfidence,evidenceStatus,inferMisconception,remediationReason} from '@/lib/learnerIntelligence';
import {aiStructured,configuredAiProvider} from '@/lib/aiGateway';
import {claimAiRequest,completeAiRequest} from '@/lib/aiCostGuard';

const schema=z.object({sessionId:z.string().uuid(),extendedAnswers:z.record(z.string(),z.string().max(12000)).optional(),selectedExtendedKeys:z.array(z.string().min(1).max(180)).max(6).optional()});
function optionsOf(v:any):string[]{if(Array.isArray(v))return v.map(String);if(typeof v==='string'){try{return optionsOf(JSON.parse(v))}catch{return []}}return []}
function stepsOf(v:any,explanation:string):string[]{if(Array.isArray(v)&&v.length)return v.map(String);return explanation?[explanation]:[]}
async function gradeAuthoredShortAnswers(userId:string,items:Array<{id:string;prompt:string;answer:string;expected:string}>){
 if(!items.length||!configuredAiProvider())return new Map<string,{correct:boolean;note:string}>();
 const claim=await claimAiRequest(userId,'AUTHORED_SHORT_MARKING');if(!claim.allowed)return new Map<string,{correct:boolean;note:string}>();
 const schema={type:'object',additionalProperties:false,properties:{marks:{type:'array',items:{type:'object',additionalProperties:false,properties:{id:{type:'string'},correct:{type:'boolean'},note:{type:'string'}},required:['id','correct','note']}}},required:['marks']};
 try{
  const ai=await aiStructured<any>({name:'mock_short_answer_marks',instructions:`You are AVORA's constrained examination marker. Mark each learner response only against the supplied expected-answer guidance. Accept semantically equivalent wording and harmless grammar/spelling variation when the intended answer is clear. Do not reward an answer that contradicts the source guidance. Return JSON only.`,input:JSON.stringify(items),schema});
  if(!ai.ok){await completeAiRequest(claim.eventId,null,'FAILED');return new Map()}
  await completeAiRequest(claim.eventId,ai.usage,'COMPLETED');
  return new Map((ai.json?.marks||[]).map((m:any)=>[String(m.id),{correct:Boolean(m.correct),note:String(m.note||'')}]))
 }catch{await completeAiRequest(claim.eventId,null,'FAILED');return new Map()}
}


type ExtendedTask={task_key:string;task_number:number;task_type:string;prompt:string;expected_solution:string|null;rubric:any;max_marks:number;required_count:number};
type ExtendedMark={taskKey:string;score:number;maxScore:number;feedback:string;criteria:Array<{id:string;label:string;score:number;maxScore:number;topic:string;feedback:string}>};
async function gradeExtendedTasks(userId:string,tasks:ExtendedTask[],answers:Record<string,string>):Promise<ExtendedMark[]>{
 const completed=tasks.filter(t=>String(answers[t.task_key]||'').trim());
 const blanks=tasks.filter(t=>!String(answers[t.task_key]||'').trim()).map(t=>({taskKey:t.task_key,score:0,maxScore:Number(t.max_marks),feedback:'No response was submitted for this selected task.',criteria:(Array.isArray(t.rubric)?t.rubric:[]).map((c:any)=>({id:String(c.id||''),label:String(c.label||''),score:0,maxScore:Number(c.maxMarks||0),topic:String(c.topic||'Extended response'),feedback:'No response submitted.'}))}));
 if(!completed.length)return blanks;
 if(!configuredAiProvider())throw new Error('EXTENDED_GRADER_UNAVAILABLE');
 const claim=await claimAiRequest(userId,'EXTENDED_MOCK_GRADING');if(!claim.allowed)throw new Error('EXTENDED_GRADER_UNAVAILABLE');
 const payload=completed.map(t=>({taskKey:t.task_key,taskType:t.task_type,prompt:t.prompt,learnerAnswer:String(answers[t.task_key]||''),expectedSolution:t.expected_solution,rubric:t.rubric,maxScore:Number(t.max_marks)}));
 const schema={type:'object',additionalProperties:false,properties:{marks:{type:'array',items:{type:'object',additionalProperties:false,properties:{taskKey:{type:'string'},score:{type:'number'},maxScore:{type:'number'},feedback:{type:'string'},criteria:{type:'array',items:{type:'object',additionalProperties:false,properties:{id:{type:'string'},label:{type:'string'},score:{type:'number'},maxScore:{type:'number'},topic:{type:'string'},feedback:{type:'string'}},required:['id','label','score','maxScore','topic','feedback']}}},required:['taskKey','score','maxScore','feedback','criteria']}}},required:['marks']};
 const ai=await aiStructured<any>({name:'extended_mock_marks',instructions:`You are AVORA's constrained school examination marker. Mark ONLY against the supplied prompt, expected solution and rubric. For Mathematics, award partial credit for valid method, substitutions, intermediate reasoning and correct units even when the final answer is wrong; do not award method marks for unexplained guesses. Equivalent valid mathematical methods are acceptable. For English composition, score each named criterion independently; do not invent extra criteria, and do not penalize a learner twice for the same flaw. Never treat your own feedback as learner evidence. Return JSON only.`,input:JSON.stringify(payload),schema});
 if(!ai.ok){await completeAiRequest(claim.eventId,null,'FAILED');throw new Error('EXTENDED_GRADER_UNAVAILABLE')}
 await completeAiRequest(claim.eventId,ai.usage,'COMPLETED');
 const taskMap=new Map(tasks.map(t=>[t.task_key,t]));const graded=(ai.json?.marks||[]).map((m:any)=>{const t=taskMap.get(String(m.taskKey));if(!t)return null;const rubric=Array.isArray(t.rubric)?t.rubric:[];const allowed=new Map(rubric.map((c:any)=>[String(c.id),c]));const criteria=(m.criteria||[]).map((c:any)=>{const r:any=allowed.get(String(c.id));if(!r)return null;const max=Number(r.maxMarks||0);return{id:String(r.id),label:String(r.label),score:Math.max(0,Math.min(max,Number(c.score||0))),maxScore:max,topic:String(r.topic||c.topic||'Extended response'),feedback:String(c.feedback||'')}}).filter(Boolean);const score=Math.max(0,Math.min(Number(t.max_marks),criteria.reduce((a:number,c:any)=>a+c.score,0)));return{taskKey:t.task_key,score,maxScore:Number(t.max_marks),feedback:String(m.feedback||''),criteria}}).filter(Boolean) as ExtendedMark[];
 return [...graded,...blanks];
}


export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});const accessDenied=await learningAccessDenial(s);if(accessDenied)return accessDenied;
 try{
  const {sessionId,extendedAnswers={},selectedExtendedKeys=[]}=schema.parse(await req.json());
  const [x]=await withDbRetry(()=>sql`SELECT * FROM exam_sessions WHERE id=${sessionId} AND student_id=${s.userId}`);
  if(!x)return NextResponse.json({error:'Assessment not found.'},{status:404});
  if(x.status==='COMPLETED')return NextResponse.json({error:'This assessment has already been submitted.'},{status:409});
  if(x.assessment_type==='AUTHORED_MOCK'){await withDbRetry(()=>sql`UPDATE exam_sessions SET extended_answers=extended_answers||${sql.json(extendedAnswers)},extended_selected_keys=${selectedExtendedKeys} WHERE id=${sessionId} AND student_id=${s.userId}`);x.extended_answers={...(x.extended_answers||{}),...extendedAnswers};x.extended_selected_keys=selectedExtendedKeys;}
  const qs=await withDbRetry(()=>sql`SELECT q.id,q.prompt,q.question_type,q.correct_answer,q.options,q.explanation,q.solution_steps,q.wrong_answer_reasoning,q.micro_skill,q.misconception_tags,q.difficulty,q.exam_year,q.exam_name,q.content_origin,q.rights_status,q.assessment_kind,q.mock_answer_guidance,q.skill_id,sk.name skill,COALESCE(q.exam_topic,t.name) topic FROM questions q JOIN skills sk ON sk.id=q.skill_id JOIN topics t ON t.id=sk.topic_id WHERE q.id=ANY(${x.question_ids})`);
  const byId=new Map(qs.map((q:any)=>[q.id,q]));const ordered=(x.question_ids||[]).map((id:string)=>byId.get(id)).filter(Boolean);
  const ans=x.answers||{};let correct=0;const topic:any={};const attemptRows:any[]=[];const review:any[]=[];
  const authoredShort=ordered.filter((q:any)=>q.assessment_kind==='AUTHORED_MOCK'&&q.question_type!=='MULTIPLE_CHOICE').map((q:any)=>({id:String(q.id),prompt:String(q.prompt||''),answer:String(ans[q.id]??''),expected:String(q.mock_answer_guidance||displayCorrectAnswer(q.correct_answer))}));
  const authoredMarks=await gradeAuthoredShortAnswers(s.userId,authoredShort);
  for(let index=0;index<ordered.length;index++){
   const q:any=ordered[index];const raw=ans[q.id]??'';const semantic=authoredMarks.get(String(q.id));const ok=semantic?semantic.correct:answerIsCorrect(raw,q.correct_answer,q.options);correct+=ok?1:0;
   topic[q.topic]??={correct:0,total:0};topic[q.topic].total++;topic[q.topic].correct+=ok?1:0;
   const misconception=ok?null:inferMisconception({topic:q.topic,skill:q.skill,microSkill:q.micro_skill,prompt:q.prompt,wrongAnswerReasoning:q.wrong_answer_reasoning,misconceptionTags:q.misconception_tags});
   attemptRows.push({student_id:s.userId,question_id:q.id,skill_id:q.skill_id,answer:JSON.stringify({value:raw}),is_correct:ok,diagnosis:ok?'Independent exam evidence':misconception?.note||'Needs teaching after exam',mode:'EXAM',misconception});
   review.push({number:index+1,id:q.id,prompt:q.prompt,type:q.question_type,options:optionsOf(q.options),yourAnswer:String(raw||''),correctAnswer:displayCorrectAnswer(q.correct_answer),correct:ok,topic:q.topic,skill:q.skill,microSkill:q.micro_skill||null,difficulty:Number(q.difficulty||1),solutionSteps:stepsOf(q.solution_steps,q.explanation),explanation:q.explanation,wrongAnswerReasoning:ok?null:(semantic?.note||q.wrong_answer_reasoning||misconception?.note||null),source:{origin:q.content_origin||'AVORA_ORIGINAL',exam:q.exam_name||x.exam_name,year:q.exam_year||null,rights:q.rights_status||'AVORA_OWNED'}});
  }


  let extendedMarks:ExtendedMark[]=[];let extendedEarned=0;let extendedPossible=0;let extendedReview:any[]=[];
  if(x.assessment_type==='AUTHORED_MOCK'&&x.mock_paper_key){
   const allExt=await withDbRetry(()=>sql`SELECT task_key,task_number,task_type,prompt,expected_solution,rubric,max_marks,required_count FROM authored_mock_extended_tasks WHERE paper_key=${x.mock_paper_key} AND status='PUBLISHED' ORDER BY task_number`) as ExtendedTask[];
   if(allExt.length){const required=Number(allExt[0].required_count||1);const selected=(x.extended_selected_keys||[]).map(String);if(selected.length!==required||selected.some((k:string)=>!allExt.some(t=>t.task_key===k)))return NextResponse.json({error:`This mock requires you to select ${required} ${x.subject_name==='Mathematics'?'theory questions':'composition option'}${required===1?'':'s'} before submitting.`},{status:409});const selectedTasks=allExt.filter(t=>selected.includes(t.task_key));try{extendedMarks=await gradeExtendedTasks(s.userId,selectedTasks,x.extended_answers||{})}catch(e:any){if(e?.message==='EXTENDED_GRADER_UNAVAILABLE')return NextResponse.json({error:'Your full mock answers are saved, but AVORA could not complete rubric marking right now. Please submit again when the grading service is available; no response has been lost.',code:'EXTENDED_GRADER_UNAVAILABLE'},{status:503});throw e}
    extendedEarned=extendedMarks.reduce((a,m)=>a+m.score,0);extendedPossible=extendedMarks.reduce((a,m)=>a+m.maxScore,0);const markMap=new Map(extendedMarks.map(m=>[m.taskKey,m]));
    for(const t of selectedTasks){const m=markMap.get(t.task_key);if(!m)continue;extendedReview.push({taskKey:t.task_key,number:Number(t.task_number),type:t.task_type,prompt:t.prompt,yourAnswer:String((x.extended_answers||{})[t.task_key]||''),score:m.score,maxScore:m.maxScore,feedback:m.feedback,criteria:m.criteria,workedSolution:t.task_type==='MATH_THEORY'?t.expected_solution:null});for(const c of m.criteria){topic[c.topic]??={correct:0,total:0};topic[c.topic].correct+=c.score;topic[c.topic].total+=c.maxScore;}}
    await withDbRetry(()=>sql`UPDATE exam_sessions SET extended_marks=${sql.json(Object.fromEntries(extendedMarks.map(m=>[m.taskKey,m])))},extended_score=${extendedPossible?extendedEarned/extendedPossible:0} WHERE id=${sessionId}`);
   }
  }

  if(attemptRows.length)await withDbRetry(()=>sql.begin(async tx=>{
   for(const row of attemptRows){
    await tx`INSERT INTO attempts(student_id,question_id,answer,is_correct,diagnosis,mode) VALUES(${row.student_id},${row.question_id},${row.answer}::jsonb,${row.is_correct},${row.diagnosis},${row.mode})`;
    const existing=await tx`SELECT score,evidence_count FROM mastery WHERE student_id=${row.student_id} AND skill_id=${row.skill_id}`;
    const current=existing[0]?Number(existing[0].score):0;const count=existing[0]?Number(existing[0].evidence_count):0;
    const score=nextMasteryScore(current,row.is_correct,count);
    await tx`INSERT INTO mastery(student_id,skill_id,score,evidence_count,last_practiced_at) VALUES(${row.student_id},${row.skill_id},${score},1,now()) ON CONFLICT(student_id,skill_id) DO UPDATE SET score=${score},evidence_count=mastery.evidence_count+1,last_practiced_at=now(),updated_at=now()`;
    const history=await tx`SELECT COUNT(*)::int n,COUNT(*) FILTER(WHERE a.is_correct)::int correct,COUNT(*) FILTER(WHERE NOT a.is_correct AND a.created_at>now()-interval '30 days')::int recent_wrong FROM attempts a WHERE a.student_id=${row.student_id} AND a.question_id IN (SELECT id FROM questions WHERE skill_id=${row.skill_id}) AND a.mode IN ('PRACTICE','EXAM','DIAGNOSTIC')`;
    const ev=Number(history[0]?.n||0),acc=ev?Number(history[0]?.correct||0)/ev:0,recentWrong=Number(history[0]?.recent_wrong||0);
    const status=evidenceStatus(acc,ev,recentWrong);const confidence=evidenceConfidence(ev);
    await tx`INSERT INTO learner_skill_insights(student_id,skill_id,status,confidence,misconception_key,misconception_note,independent_accuracy,independent_evidence,last_wrong_at,last_correct_at,updated_at) VALUES(${row.student_id},${row.skill_id},${status},${confidence},${row.misconception?.key||null},${row.misconception?.note||null},${acc},${ev},${row.is_correct?null:new Date()},${row.is_correct?new Date():null},now()) ON CONFLICT(student_id,skill_id) DO UPDATE SET status=${status},confidence=${confidence},misconception_key=CASE WHEN ${row.is_correct} THEN learner_skill_insights.misconception_key ELSE COALESCE(${row.misconception?.key||null},learner_skill_insights.misconception_key) END,misconception_note=CASE WHEN ${row.is_correct} THEN learner_skill_insights.misconception_note ELSE COALESCE(${row.misconception?.note||null},learner_skill_insights.misconception_note) END,independent_accuracy=${acc},independent_evidence=${ev},last_wrong_at=CASE WHEN ${row.is_correct} THEN learner_skill_insights.last_wrong_at ELSE now() END,last_correct_at=CASE WHEN ${row.is_correct} THEN now() ELSE learner_skill_insights.last_correct_at END,updated_at=now()`;
   }
  }));

  const totalPoints=ordered.length+extendedPossible;const earnedPoints=correct+extendedEarned;const score=totalPoints?earnedPoints/totalPoints:0;
  await withDbRetry(()=>sql`UPDATE exam_sessions SET status='COMPLETED',submitted_at=now(),score=${score} WHERE id=${sessionId}`);
  const analysis=Object.entries(topic).map(([name,v]:any)=>({topic:name,correct:v.correct,total:v.total,percent:Math.round(v.correct/v.total*100)})).sort((a,b)=>a.percent-b.percent);
  const remediation=remediationReason(analysis);
  if(remediation.topic){
   const weak=analysis.filter((a:any)=>a.percent<75).slice(0,6);
   await withDbRetry(()=>sql`UPDATE remediation_plans SET status='SUPERSEDED',completed_at=now() WHERE student_id=${s.userId} AND exam_name=${x.exam_name} AND subject_name=${x.subject_name} AND status='ACTIVE'`);
   await withDbRetry(()=>sql`INSERT INTO remediation_plans(student_id,exam_name,subject_name,source_exam_session_id,weak_topics,recommended_topic,plan_reason) VALUES(${s.userId},${x.exam_name},${x.subject_name},${sessionId},${sql.json(weak)},${remediation.topic},${remediation.reason})`);
  }
  let paperReference:any=null;
  if(x.past_year){const refs=await withDbRetry(()=>sql`SELECT exam_name,exam_year,subject_name,source_label,source_url,rights_status,direct_reproduction_allowed FROM exam_year_registry WHERE exam_name=${x.exam_name} AND exam_year=${x.past_year} AND subject_name=${x.subject_name} LIMIT 1`);const r:any=refs[0];if(r)paperReference={exam:r.exam_name,year:Number(r.exam_year),subject:r.subject_name,sourceLabel:r.source_label,sourceUrl:r.source_url,rights:r.rights_status,note:r.direct_reproduction_allowed?'Past-paper content is cleared for in-app use.':'AVORA used the cited year as exam intelligence while serving original standard-equivalent questions; exact copyrighted wording was not reproduced.'};}
  return NextResponse.json({score:Math.round(score*100),correct,total:ordered.length,objectiveScore:ordered.length?Math.round(correct/ordered.length*100):0,extended:{earned:extendedEarned,possible:extendedPossible,percent:extendedPossible?Math.round(extendedEarned/extendedPossible*100):null},analysis,recommended:remediation.topic||analysis[0]?.topic||null,remediation,paperReference,review,extendedReview});
 }catch(e){console.error('exam finish',e);return NextResponse.json({error:'AVORA could not submit the assessment yet. Your answers are still on this page — please retry.'},{status:503})}
}
