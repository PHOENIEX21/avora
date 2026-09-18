import {sql,withDbRetry} from '@/lib/db';
import {nextMasteryScore} from '@/lib/mastery';
import {evidenceConfidence,evidenceStatus,inferMisconception} from '@/lib/learnerIntelligence';
import {buildLiveTopicResults,liveReportSummary} from '@/lib/liveAssessmentEvidence';

export async function finalizeLiveAssessmentForStudent(assessmentId:string,studentId:string){
 const [live]=await withDbRetry(()=>sql`SELECT l.subject_name,l.class_level,p.status participant_status,p.parent_confirmed,u.full_name FROM live_assessments l JOIN live_assessment_participants p ON p.assessment_id=l.id JOIN users u ON u.id=p.student_id WHERE l.id=${assessmentId} AND p.student_id=${studentId}`);
 if(!live)throw new Error('Live assessment participant not found.');
 if(live.participant_status==='SUBMITTED')return {alreadySubmitted:true};
 if(!live.parent_confirmed)throw new Error('Parent supervision was not confirmed.');
 const evidence=await withDbRetry(()=>sql`SELECT q.id question_id,q.skill_id,q.prompt,q.micro_skill,q.wrong_answer_reasoning,q.misconception_tags,sk.name skill,t.name topic,a.answer,a.is_correct FROM live_assessment_questions laq JOIN questions q ON q.id=laq.question_id JOIN skills sk ON sk.id=q.skill_id JOIN topics t ON t.id=sk.topic_id LEFT JOIN live_assessment_answers a ON a.assessment_id=laq.assessment_id AND a.question_id=q.id AND a.student_id=${studentId} WHERE laq.assessment_id=${assessmentId} ORDER BY laq.order_index`);
 const total=evidence.length,correct=evidence.filter((x:any)=>x.is_correct===true).length,score=total?correct/total:0,percent=Math.round(score*100);
 const topicResults=buildLiveTopicResults(evidence.map((x:any)=>({topic:x.topic,is_correct:x.is_correct})));
 const report=liveReportSummary(live.full_name,percent,topicResults);
 await withDbRetry(()=>sql.begin(async tx=>{
  for(const row of evidence){
   if(row.answer==null)continue;
   const misconception=row.is_correct?null:inferMisconception({topic:row.topic,skill:row.skill,microSkill:row.micro_skill,prompt:row.prompt,wrongAnswerReasoning:row.wrong_answer_reasoning,misconceptionTags:row.misconception_tags});
   await tx`INSERT INTO attempts(student_id,question_id,answer,is_correct,diagnosis,mode) VALUES(${studentId},${row.question_id},${sql.json(row.answer)},${row.is_correct===true},${row.is_correct?'Parent-supervised live assessment evidence':misconception?.note||'Needs reteaching after supervised assessment'},'LIVE_ASSESSMENT')`;
   const existing=await tx`SELECT score,evidence_count FROM mastery WHERE student_id=${studentId} AND skill_id=${row.skill_id}`;
   const current=existing[0]?Number(existing[0].score):0,count=existing[0]?Number(existing[0].evidence_count):0,next=nextMasteryScore(current,row.is_correct===true,count);
   await tx`INSERT INTO mastery(student_id,skill_id,score,evidence_count,last_practiced_at) VALUES(${studentId},${row.skill_id},${next},1,now()) ON CONFLICT(student_id,skill_id) DO UPDATE SET score=${next},evidence_count=mastery.evidence_count+1,last_practiced_at=now(),updated_at=now()`;
   const history=await tx`SELECT COUNT(*)::int n,COUNT(*) FILTER(WHERE a.is_correct)::int correct,COUNT(*) FILTER(WHERE NOT a.is_correct AND a.created_at>now()-interval '30 days')::int recent_wrong FROM attempts a WHERE a.student_id=${studentId} AND a.question_id IN (SELECT id FROM questions WHERE skill_id=${row.skill_id}) AND a.mode IN ('PRACTICE','EXAM','DIAGNOSTIC','LIVE_ASSESSMENT')`;
   const ev=Number(history[0]?.n||0),acc=ev?Number(history[0]?.correct||0)/ev:0,recentWrong=Number(history[0]?.recent_wrong||0),status=evidenceStatus(acc,ev,recentWrong),confidence=evidenceConfidence(ev);
   await tx`INSERT INTO learner_skill_insights(student_id,skill_id,status,confidence,misconception_key,misconception_note,independent_accuracy,independent_evidence,last_wrong_at,last_correct_at,updated_at) VALUES(${studentId},${row.skill_id},${status},${confidence},${misconception?.key||null},${misconception?.note||null},${acc},${ev},${row.is_correct?null:new Date()},${row.is_correct?new Date():null},now()) ON CONFLICT(student_id,skill_id) DO UPDATE SET status=${status},confidence=${confidence},misconception_key=CASE WHEN ${row.is_correct===true} THEN learner_skill_insights.misconception_key ELSE COALESCE(${misconception?.key||null},learner_skill_insights.misconception_key) END,misconception_note=CASE WHEN ${row.is_correct===true} THEN learner_skill_insights.misconception_note ELSE COALESCE(${misconception?.note||null},learner_skill_insights.misconception_note) END,independent_accuracy=${acc},independent_evidence=${ev},last_wrong_at=CASE WHEN ${row.is_correct===true} THEN learner_skill_insights.last_wrong_at ELSE now() END,last_correct_at=CASE WHEN ${row.is_correct===true} THEN now() ELSE learner_skill_insights.last_correct_at END,updated_at=now()`;
  }
  for(const r of topicResults)await tx`INSERT INTO live_assessment_topic_results(assessment_id,student_id,topic_name,correct_count,total_count,percent,evidence_status) VALUES(${assessmentId},${studentId},${r.topic},${r.correct},${r.total},${r.percent},${r.status}) ON CONFLICT(assessment_id,student_id,topic_name) DO UPDATE SET correct_count=EXCLUDED.correct_count,total_count=EXCLUDED.total_count,percent=EXCLUDED.percent,evidence_status=EXCLUDED.evidence_status,updated_at=now()`;
  await tx`INSERT INTO live_assessment_reports(assessment_id,student_id,overall_percent,strongest_topic,weakest_topic,recommended_topic,summary) VALUES(${assessmentId},${studentId},${percent},${report.strongest},${report.weakest},${report.recommended},${report.summary}) ON CONFLICT(assessment_id,student_id) DO UPDATE SET overall_percent=EXCLUDED.overall_percent,strongest_topic=EXCLUDED.strongest_topic,weakest_topic=EXCLUDED.weakest_topic,recommended_topic=EXCLUDED.recommended_topic,summary=EXCLUDED.summary,generated_at=now()`;
  await tx`UPDATE remediation_plans SET status='SUPERSEDED',completed_at=now() WHERE student_id=${studentId} AND subject_name=${live.subject_name} AND status='ACTIVE'`;
  if(report.recommended)await tx`INSERT INTO remediation_plans(student_id,exam_name,subject_name,source_live_assessment_id,weak_topics,recommended_topic,plan_reason) VALUES(${studentId},${live.class_level},${live.subject_name},${assessmentId},${sql.json(topicResults.filter(x=>x.percent<80).slice(0,6))},${report.recommended},${`Supervised assessment evidence recommends reteaching ${report.recommended} before the next live check.`})`;
  await tx`UPDATE live_assessment_participants SET status='SUBMITTED',submitted_at=COALESCE(submitted_at,now()),score=${score} WHERE assessment_id=${assessmentId} AND student_id=${studentId}`;
 }));
 return {alreadySubmitted:false,score:percent,recommended:report.recommended};
}
