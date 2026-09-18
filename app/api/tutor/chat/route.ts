import {requirePremiumFeature} from '@/lib/premiumAccess';
import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {getCurriculumTutorPlan} from '@/lib/curriculumTutor';
import {deepExamples} from '@/lib/deepTeaching';
import {claimAiRequest,completeAiRequest} from '@/lib/aiCostGuard';
import {aiStructured,configuredAiProvider} from '@/lib/aiGateway';

export const dynamic='force-dynamic';

const schema=z.object({
  subject:z.string().min(2).max(80),
  topic:z.string().min(2).max(120),
  classLevel:z.string().min(2).max(40),
  exam:z.string().min(2).max(40),
  unitIndex:z.number().int().min(0).max(50).default(0),
  question:z.string().min(1).max(1200),
  board:z.array(z.string().max(500)).max(20).default([]),
  recent:z.array(z.object({role:z.enum(['student','teacher']),text:z.string().max(1200)})).max(8).default([]),
  currentStepId:z.string().max(120).optional(),
  lessonSteps:z.array(z.object({id:z.string().max(120),label:z.string().max(180),kind:z.string().max(40),summary:z.string().max(500)})).max(120).default([])
});

function safeReguideStep(d:z.infer<typeof schema>,candidate?:string|null){
 const allowed=new Set(d.lessonSteps.map(x=>x.id));
 if(candidate&&allowed.has(candidate))return candidate;
 if(d.currentStepId&&allowed.has(d.currentStepId))return d.currentStepId;
 return d.lessonSteps[0]?.id||null;
}
function withGuidanceMeta(d:z.infer<typeof schema>,value:{reply:string;board:string[]},level:'HINT'|'RETEACH'|'ANSWER'='HINT'){
 return {...value,reguideStepId:safeReguideStep(d),assistanceLevel:level,requiresFreshEvidence:level!=='HINT'};
}

function fallbackReply(d:z.infer<typeof schema>){
 const plan=getCurriculumTutorPlan(d.classLevel,d.subject,d.topic);
 const unit=plan?.units[d.unitIndex]||plan?.units[0];
 const q=d.question.toLowerCase();
 if(!unit)return {reply:`Tell me the exact part of ${d.topic} you are working on. I will start from the prerequisite, define every new term, demonstrate the idea slowly, then give you one small step to do before we continue.`,board:[]};
 const rich=deepExamples(unit.title);
 const first=rich[0];
 if(/ship.*sheep|sheep.*ship/.test(q))return {reply:`The main difference is the vowel sound. “ship” uses /ɪ/ and “sheep” uses /iː/. Keep the first sound /ʃ/ and the final /p/ unchanged and listen only to the middle. Say: ship /ʃɪp/; sheep /ʃiːp/. Now compare sit /sɪt/ and seat /siːt/. The purpose is not to memorise symbols; it is to hear the contrast. Your turn: say “leave” slowly. Which middle sound do you hear, /ɪ/ or /iː/?`,board:['ship → /ʃɪp/','sheep → /ʃiːp/','Same outer sounds; different vowel.']};
 if(/explain this practice question|what this question is asking|what this question wants|explain this teaching checkpoint/.test(q))return {reply:`This question is checking the ${unit.title} idea you have just been learning. In simple terms, do not try to write everything you know. First identify the exact thing the question asks for. Then use the rule or meaning from this section: ${unit.explain} A good first move is to look for the information given, name the rule that connects it to what is required, and do only that first step. If the wording still feels unclear, tell me which word or phrase is confusing.`,board:['What is the question asking for?',`Use: ${unit.title}`,'Do one justified step first.']};
 if(/show me a clear model answer|model answer/.test(q))return {reply:`Here is the kind of answer I would expect at this point in the lesson. ${first?`${first.problem} ${first.steps.slice(0,3).join(' ')} The important reason is: ${first.why}`:`Use this model: ${unit.example}`} The goal is not to copy the wording. Notice the rule or reason being used, then explain the same idea in your own words when you try again.`,board:[first?.problem||unit.example,...(first?.steps.slice(0,2)||[])]};
 const term=unit.terms.find(([t])=>q.includes(t.toLowerCase()));
 if(term)return {reply:`${term[0]} means ${term[1]}. Before using it, connect it to what you already know: ${(unit.prerequisites||[]).join(', ')||'the previous idea in this lesson'}. ${unit.explain} ${first?`Let us see it in a real example: ${first.problem} ${first.steps.slice(0,3).join(' ')}`:`For example: ${unit.example}`} I do not want you to copy the result. Tell me which rule or meaning justifies the first important step.`,board:[`${term[0]} → ${term[1]}`,first?.problem||unit.example,'Why is the first step valid?']};
 if(/why|reason|how come/.test(q))return {reply:`The reason matters more than the shortcut. ${unit.explain} ${first?`In ${first.problem}, ${first.steps.slice(0,2).join(' ')} The method works because ${first.why}`:`Look at ${unit.example}. Each step must preserve the rule or meaning we started with.`} Now explain the reason back to me in one sentence. If your explanation is incomplete, I will help you repair it.`,board:['Meaning / rule first',first?.why||unit.example,'Explain the reason back.']};
 if(/easier|simpl|confus|understand|again|slow/.test(q))return {reply:`I will slow it down and reduce the size of the task. First, forget the full question for a moment. ${unit.title} is really about this: ${unit.explain} ${first?`Use this example only: ${first.problem} We will do just the first step: ${first.steps[0]}`:`Use this example: ${unit.example}`} Do not move to the next step yet. Tell me what that first step means in your own words, or tell me the exact word or symbol that is unclear.`,board:[unit.title,first?.steps[0]||unit.example,'One step only — explain it.']};
 if(/example|show me|another|different/.test(q)){
  const ex=rich[1]||rich[0];
  return {reply:ex?`Yes. Here is a different example so you can see the same idea in another form. ${ex.problem} Step 1: ${ex.steps[0]} Step 2: ${ex.steps[1]||'check what the first step gives us'}. ${ex.steps[2]?`Step 3: ${ex.steps[2]}`:''} Why this method fits: ${ex.why} Now you do the next small piece: ${ex.check}`:`Yes. We will not just change numbers and pretend it is new teaching. Here is the same idea in a fresh situation: ${unit.example} First identify what is given, what must be found, and which rule connects them. Then try: ${unit.check}`,
   board:ex?[ex.problem,...ex.steps.slice(0,2),`Your turn → ${ex.check}`]:['What is given?',unit.example,`Your turn → ${unit.check}`]};
 }
 if(/wrong|mistake|error/.test(q)&&unit.commonMistakes?.length)return {reply:`A common mistake here is: ${unit.commonMistakes[0]}. The important question is why it fails. It breaks the meaning or rule behind ${unit.title}. Compare the correct method: ${first?first.steps.slice(0,3).join(' '):unit.example} Now tell me where the incorrect method first stops following the rule.`,board:['Common mistake',unit.commonMistakes[0],'Find the first broken step.']};
 return {reply:`Let us answer your exact question inside ${unit.title}. ${unit.explain} ${first?`Use this worked example: ${first.problem} ${first.steps.slice(0,3).join(' ')} The reason is: ${first.why}`:`Use this example: ${unit.example}`} I will not move on until you participate. Your turn: ${first?.check||unit.check}`,board:[unit.title,first?.problem||unit.example,`Your turn → ${first?.check||unit.check}`]};
}

export async function POST(req:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Please sign in again.'},{status:401});
 const premiumDenied=await requirePremiumFeature(session,'Interactive AVORA Tutor');if(premiumDenied)return premiumDenied;
 try{
  const d=schema.parse(await req.json());
  const plan=getCurriculumTutorPlan(d.classLevel,d.subject,d.topic);
  const unit=plan?.units[d.unitIndex]||plan?.units[0];
  if(!configuredAiProvider())return NextResponse.json({...withGuidanceMeta(d,fallbackReply(d),/model answer|full worked|teach this from my attempt/i.test(d.question)?'RETEACH':'HINT'),mode:'grounded-local'});
  const aiClaim=await claimAiRequest(session.userId,'TUTOR_CHAT');
  if(!aiClaim.allowed)return NextResponse.json({...withGuidanceMeta(d,fallbackReply(d),'HINT'),mode:'budget-safe-local',aiLimit:aiClaim.reason});

  const context={learner:{classLevel:d.classLevel,exam:d.exam},lesson:{subject:d.subject,topic:d.topic,unit:unit?{title:unit.title,terms:unit.terms,explain:unit.explain,example:unit.example,check:unit.check,why:unit.why,prerequisites:unit.prerequisites,outcomes:unit.outcomes,commonMistakes:unit.commonMistakes}:null},board:d.board,recent:d.recent,currentStepId:d.currentStepId,lessonSteps:d.lessonSteps};
  const ai=await aiStructured<any>({
    name:'avora_teacher_turn',
    instructions:`You are AVORA, a warm, rigorous Nigerian digital teacher. Teach naturally like a skilled private tutor, not a chatbot and not a textbook reader. Stay grounded in the supplied lesson context. Answer the learner's exact question first. Use age-appropriate language for the class level. Explain reasoning, not just procedures. If the learner is confused, change approach. Do not falsely claim mastery. Teach with enough depth to satisfy a serious classroom teacher: define terms, connect prerequisites, explain the reason for each step, work at least one concrete example when useful, and then give the learner a meaningful turn. Do not dump long notes, but do not be shallow. If the learner asks about a worked problem, explicitly explain the working rather than merely state the answer. Keep the response focused enough for a live lesson. When the learner says they do not understand, reduce the task to one smaller prerequisite or step and use a different example. Never praise an answer as correct unless the reasoning supports it. If uncertain, ask a checking question. When the learner is confused or makes a mistake, choose reguideStepId ONLY from the supplied lessonSteps. Point to the earliest useful teaching step that repairs the misconception; do not invent an ID. assistanceLevel is HINT for a small prompt, RETEACH when you substantially re-explain or work through the idea, and ANSWER only when a full answer/solution has been revealed. If substantial help is given, requiresFreshEvidence must be true because assisted work cannot prove independent mastery. Return structured JSON only. board should contain at most 3 short lines that genuinely help the live whiteboard.`,
    input:`LESSON CONTEXT\n${JSON.stringify(context)}\n\nLEARNER: ${d.question}`,
    schema:{type:'object',additionalProperties:false,properties:{reply:{type:'string'},board:{type:'array',items:{type:'string'},maxItems:3},reguideStepId:{type:['string','null']},assistanceLevel:{type:'string',enum:['HINT','RETEACH','ANSWER']},requiresFreshEvidence:{type:'boolean'}},required:['reply','board','reguideStepId','assistanceLevel','requiresFreshEvidence']}
  });
  if(!ai.ok){await completeAiRequest(aiClaim.eventId,null,'FAILED');console.warn('AVORA AI tutor unavailable',ai.error,ai.status||'',ai.detail||'');return NextResponse.json({...withGuidanceMeta(d,fallbackReply(d),'HINT'),mode:'grounded-fallback'});}
  await completeAiRequest(aiClaim.eventId,ai.usage,'COMPLETED');
  const parsed=ai.json as any;
  return NextResponse.json({...parsed,reguideStepId:safeReguideStep(d,parsed?.reguideStepId),mode:`ai-${ai.usage.provider}`});
 }catch(e){console.error('tutor chat',e);return NextResponse.json({error:'AVORA could not answer that just now. Please try again.'},{status:400});}
}
