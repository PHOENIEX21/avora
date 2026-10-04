import {sql,withDbRetry} from '@/lib/db';
import {getStudentEntitlement} from '@/lib/billing';

export const TRIAL_QUESTION_ALLOWANCE=150;
export const TRIAL_NCEE_FULL_MOCK_LIMIT=1;
export const TRIAL_JSS_FULL_MOCK_LIMIT=1;

export async function trialQuestionUsage(studentId:string){
  const entitlement=await getStudentEntitlement(studentId);
  const isTrial=entitlement.source==='LEARNER_TRIAL'||entitlement.source==='FAMILY_TRIAL';
  if(!isTrial)return {isTrial:false,used:0,remaining:Number.POSITIVE_INFINITY,limit:Number.POSITIVE_INFINITY};
  const [r]=await withDbRetry(()=>sql`SELECT COUNT(*)::int n FROM trial_question_exposures WHERE student_id=${studentId}`);
  const used=Number(r?.n||0);
  return {isTrial:true,used,remaining:Math.max(0,TRIAL_QUESTION_ALLOWANCE-used),limit:TRIAL_QUESTION_ALLOWANCE};
}

export async function reserveTrialQuestions(studentId:string,source:string,questionKeys:string[]){
  const usage=await trialQuestionUsage(studentId);
  if(!usage.isTrial)return {...usage,allowed:true,needed:0};
  const unique=[...new Set(questionKeys.map(String))];
  const existing=unique.length?await withDbRetry(()=>sql`SELECT question_key FROM trial_question_exposures WHERE student_id=${studentId} AND question_key=ANY(${unique})`):[];
  const seen=new Set(existing.map((x:any)=>String(x.question_key)));
  const fresh=unique.filter(x=>!seen.has(x));
  if(fresh.length>usage.remaining)return {...usage,allowed:false,needed:fresh.length};
  for(const k of fresh)await withDbRetry(()=>sql`INSERT INTO trial_question_exposures(student_id,question_key,source) VALUES(${studentId},${k},${source}) ON CONFLICT DO NOTHING`);
  return {...usage,allowed:true,needed:fresh.length,used:usage.used+fresh.length,remaining:usage.remaining-fresh.length};
}

export async function trialAssessmentCount(studentId:string,kind:'NCEE_FULL_MOCK'|'JSS_FULL_MOCK'){
  if(kind==='NCEE_FULL_MOCK'){
    const [r]=await withDbRetry(()=>sql`SELECT COUNT(*)::int n FROM ncee_mock_sessions WHERE student_id=${studentId}`);
    return Number(r?.n||0);
  }
  const [r]=await withDbRetry(()=>sql`SELECT COUNT(*)::int n FROM exam_sessions WHERE student_id=${studentId} AND assessment_type='FULL_MOCK'`);
  return Number(r?.n||0);
}
