import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {learningAccessDenial} from '@/lib/apiAccess';
import {sql,withDbRetry} from '@/lib/db';
import {nceeBankFor} from '@/lib/nceeQuestionBank';
import type {NceeDomain,PrimaryPrepClass} from '@/lib/nceePrep';
import {trialAssessmentCount,trialQuestionUsage,reserveTrialQuestions,TRIAL_NCEE_FULL_MOCK_LIMIT} from '@/lib/trialLimits';

function shuffled<T>(a:T[],seed:number){const x=[...a];let z=seed||1;for(let i=x.length-1;i>0;i--){z=(z*9301+49297)%233280;const j=Math.floor((z/233280)*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
const PAPER_I:NceeDomain[]=['Mathematics','Basic Science & Technology','English Studies','National Values Education'];
const PAPER_II:NceeDomain[]=['Quantitative & Vocational Aptitude','Verbal Aptitude'];

// Eight-form editorial allocation: shuffle each complete domain once with a stable
// class/domain seed, then give each mock its own 10-question slice. Across Mock 1–8,
// no question ID repeats inside a learner class as long as each domain has >=80 items.
function formSlice<T extends {id:string}>(items:T[],mockNumber:number,seed:number){
 if(items.length<80)throw new Error(`NCEE editorial bank requires 80+ items per domain; found ${items.length}`);
 const ordered=shuffled(items,seed);
 const start=(mockNumber-1)*10;
 return ordered.slice(start,start+10);
}

export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Sign in again.'},{status:401});
 const denied=await learningAccessDenial(s);if(denied)return denied;
 const body=await req.json();const mockNumber=Math.min(8,Math.max(1,Number(body?.mockNumber)||1));
 const [p]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 const cls=String(p?.class_level||'') as PrimaryPrepClass;
 if(!['Primary 5','Primary 6'].includes(cls))return NextResponse.json({error:'Common Entrance Prep is for Primary 5 and Primary 6.'},{status:409});
 const trial=await trialQuestionUsage(s.userId);if(trial.isTrial){const count=await trialAssessmentCount(s.userId,'NCEE_FULL_MOCK');if(count>=TRIAL_NCEE_FULL_MOCK_LIMIT)return NextResponse.json({error:'Your 14-day trial includes one complete NCEE mock. Subscribe to unlock all eight full mocks.',code:'TRIAL_MOCK_LIMIT',trial},{status:402});}
 const bank=nceeBankFor(cls);const classSeed=cls==='Primary 6'?61013:51013;
 const p1=PAPER_I.flatMap((d,i)=>formSlice(bank.filter(q=>q.domain===d),mockNumber,classSeed+i*1009));
 const p2=PAPER_II.flatMap((d,i)=>formSlice(bank.filter(q=>q.domain===d),mockNumber,classSeed+5000+i*1009));
 const selected=[...p1,...p2];const ids=selected.map(q=>q.id);const reserved=await reserveTrialQuestions(s.userId,'NCEE_MOCK',ids);if(!reserved.allowed)return NextResponse.json({error:`Your AVORA trial includes ${reserved.limit} self-service assessment questions. You have ${reserved.remaining} remaining, but this full mock needs ${reserved.needed}. Subscribe to continue without the trial limit.`,code:'TRIAL_QUESTION_LIMIT',trial:reserved},{status:402});
 const [row]=await withDbRetry(()=>sql`INSERT INTO ncee_mock_sessions(student_id,mock_number,class_level,question_ids) VALUES(${s.userId},${mockNumber},${cls},${ids}) RETURNING id,started_at`);
 return NextResponse.json({sessionId:row.id,mockNumber,classLevel:cls,paper1Minutes:130,paper2Minutes:80,questions:selected.map((q,i)=>({number:i+1,id:q.id,paper:i<40?'Paper I':'Paper II',domain:q.domain,topic:q.topic,prompt:q.prompt,options:q.options}))});
}
