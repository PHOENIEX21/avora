import bankJson from '@/data/jss1-jss2-assessment-bank.json';
import {revised2025CurrentTopics} from './revised2025Curriculum';
import {evidenceIdsForOfficialTopic} from './nerdc2025TopicMap';
import {nerdc2025EvidenceForTopic} from './nerdc2025Teaching';
import {officialNerdc2025Topic,officialNerdc2025Topics} from './nerdc2025Official';
import {authoredNerdc2025EnglishQuestions} from './nerdc2025AuthoredEnglishExercises';

export type NerdcExerciseQuestion={
 id:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';topic:string;
 prompt:string;type:'MULTIPLE_CHOICE';options:string[];correctAnswer:string;explanation:string;hint:string;
 difficulty:number;skill:string;source:'AVORA_REVIEWED_BANK'|'AVORA_AUTHORED_NERDC_BANK'|'NERDC_DEEP_LESSON_CONCEPT_CHECK';
};
export type PublicNerdcExerciseQuestion=Omit<NerdcExerciseQuestion,'correctAnswer'>;

type BankQuestion={id:string;curriculumTopicId:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';topic:string;prompt:string;questionType:string;options:string[];correctAnswer:string;explanation:string;difficulty:number;qualityStatus:string};
const bank=(bankJson.questions as BankQuestion[]).filter(q=>q.qualityStatus==='REVIEWED'&&q.questionType==='MULTIPLE_CHOICE'&&Array.isArray(q.options)&&q.options.length===4);

function norm(text:string){return String(text||'').replace(/\s+/g,' ').trim().replace(/[.;]+$/,'')}
function cap(text:string){const v=norm(text);return v?`${v[0].toUpperCase()}${v.slice(1)}`:v}
function rotate<T>(items:T[],offset:number){if(!items.length)return items;const n=((offset%items.length)+items.length)%items.length;return [...items.slice(n),...items.slice(0,n)]}
function stableHash(input:string){let h=2166136261;for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

function compatibleBankQuestions(classLevel:'JSS1'|'JSS2',subject:'Mathematics'|'English Language',topic:string){
 const evidence=new Set(evidenceIdsForOfficialTopic(classLevel,subject,topic));
 const oldIds=new Set(revised2025CurrentTopics.filter(t=>t.classLevel===classLevel&&t.subject===subject&&t.evidenceLessonIds.some(id=>evidence.has(id))).map(t=>t.id));
 return bank.filter(q=>q.classLevel===classLevel&&q.subject===subject&&oldIds.has(q.curriculumTopicId));
}

function misconceptionOptions(values:string[],seed:number){
 const base=values.map(cap).filter(Boolean);const unique=[...new Set(base)];
 const fallback=[
  'Choose a shortcut from the appearance of the question without checking the governing rule',
  'Use the first familiar operation or language pattern even when the conditions do not match',
  'Accept the result without checking it against the original task or evidence',
 ];
 for(const item of fallback)if(unique.length<3&&!unique.includes(item))unique.push(item);
 return rotate(unique,seed).slice(0,3);
}

function conceptQuestions(classLevel:'JSS1'|'JSS2',subject:'Mathematics'|'English Language',topic:string,count:number):NerdcExerciseQuestion[]{
 const evidence=nerdc2025EvidenceForTopic(classLevel,subject,topic);
 const official=officialNerdc2025Topic(classLevel,subject,topic);
 if(!official||!evidence.length||count<=0)return [];
 const facts=evidence.flatMap(x=>x.teaching).map(norm).filter(x=>x.length>=24);
 const examples=evidence.flatMap(x=>x.workedExamples).map(norm).filter(x=>x.length>=18);
 const misconceptions=evidence.flatMap(x=>x.misconceptions).map(norm).filter(Boolean);
 const objectives=official.objectives.map(norm).filter(Boolean);
 const seeds=[...facts,...objectives.map(x=>`A learner should be able to ${x.replace(/^to\s+/i,'')}`),...examples.map(x=>`This worked example is valid evidence for the topic: ${x}`)];
 const out:NerdcExerciseQuestion[]=[];
 for(let i=0;i<count;i++){
  const correct=cap(seeds[i%seeds.length]||facts[0]||objectives[0]);
  const wrong=misconceptionOptions(misconceptions,i);
  let options=[correct,...wrong];
  const offset=stableHash(`${classLevel}|${subject}|${topic}|${i}`)%4; options=rotate(options,offset);
  const kind=i%3;
  const prompt=kind===0?`Concept check ${i+1}: Which statement most accurately reflects the correct idea or method for ${topic}?`:kind===1?`Reasoning check ${i+1}: A learner is reviewing ${topic}. Which statement should the learner rely on?`:`Misconception check ${i+1}: Which statement is consistent with the NERDC-aligned teaching of ${topic}?`;
  out.push({
   id:`nerdc25-${classLevel.toLowerCase()}-${subject==='Mathematics'?'math':'eng'}-${stableHash(topic).toString(36)}-${String(i+1).padStart(2,'0')}`,
   classLevel,subject,topic,prompt,type:'MULTIPLE_CHOICE',options,correctAnswer:correct,
   explanation:`${correct}. This is part of the verified teaching evidence used for the official NERDC topic “${topic}”.`,
   hint:subject==='Mathematics'?'Check the definition, relationship or rule before choosing; do not select an operation merely because it looks familiar.':'Check the exact language function, evidence or rule the lesson established; avoid choosing by a single familiar word.',
   difficulty:i<3?1:i<7?2:3,skill:topic,source:'NERDC_DEEP_LESSON_CONCEPT_CHECK'
  });
 }
 return out;
}

export function nerdc2025ExerciseQuestions(classLevel:string,subject:string,topic:string,count=15):NerdcExerciseQuestion[]{
 if((classLevel!=='JSS1'&&classLevel!=='JSS2')||(subject!=='Mathematics'&&subject!=='English Language'))return [];
 const official=officialNerdc2025Topic(classLevel,subject,topic);if(!official)return [];
 const authored=classLevel==='JSS2'&&subject==='English Language'?authoredNerdc2025EnglishQuestions(topic):[];
 if(authored.length){
  return authored.slice(0,count).map(q=>({
   ...q,type:'MULTIPLE_CHOICE' as const,
   hint:'Use the exact rule, purpose or evidence established in the NERDC-aligned lesson; eliminate options that contradict the taught meaning or context.',
   source:'AVORA_AUTHORED_NERDC_BANK' as const,
  }));
 }
 const existing=compatibleBankQuestions(classLevel,subject,topic).map(q=>({
  id:`nerdc25-bank-${q.id}`,classLevel:q.classLevel,subject:q.subject,topic,
  prompt:q.prompt,type:'MULTIPLE_CHOICE' as const,options:q.options.map(String),correctAnswer:String(q.correctAnswer),
  explanation:q.explanation||`The correct answer is ${q.correctAnswer}.`,
  hint:subject==='Mathematics'?'Identify the governing rule and work carefully before choosing.':'Use the sentence, passage or language rule—not a guess—to eliminate the distractors.',
  difficulty:Number(q.difficulty||1),skill:topic,source:'AVORA_REVIEWED_BANK' as const,
 }));
 const unique: NerdcExerciseQuestion[]=[];const prompts=new Set<string>();
 for(const q of existing){const k=q.prompt.toLowerCase().trim();if(prompts.has(k))continue;prompts.add(k);unique.push(q);if(unique.length>=count)break}
 const needed=Math.max(0,count-unique.length);
 for(const q of conceptQuestions(classLevel,subject,topic,needed)){if(!prompts.has(q.prompt.toLowerCase())){prompts.add(q.prompt.toLowerCase());unique.push(q)}}
 return unique.slice(0,count);
}

export function publicNerdc2025ExerciseQuestions(classLevel:string,subject:string,topic:string,count=15):PublicNerdcExerciseQuestion[]{
 return nerdc2025ExerciseQuestions(classLevel,subject,topic,count).map(({correctAnswer,...q})=>q);
}

export function checkNerdc2025Exercise(questionId:string,answer:string){
 for(const official of officialNerdc2025Topics('JSS1','Mathematics').concat(officialNerdc2025Topics('JSS1','English Language'),officialNerdc2025Topics('JSS2','Mathematics'),officialNerdc2025Topics('JSS2','English Language'))){
  const q=nerdc2025ExerciseQuestions(official.classLevel,official.subject,official.topic,15).find(item=>item.id===questionId);
  if(!q)continue;const correct=norm(answer).toLowerCase()===norm(q.correctAnswer).toLowerCase();
  return {correct,correctAnswer:q.correctAnswer,explanation:q.explanation,hint:correct?'Explain why the rule or evidence makes this answer valid.':q.hint,topic:q.topic,skill:q.skill};
 }
 return undefined;
}

export function nerdc2025ExerciseAudit(){
 const rows=[] as Array<{classLevel:string;subject:string;topic:string;count:number;bank:number;authored:number;concept:number}>;
 for(const classLevel of ['JSS1','JSS2'] as const)for(const subject of ['Mathematics','English Language'] as const)for(const topic of officialNerdc2025Topics(classLevel,subject)){
  const q=nerdc2025ExerciseQuestions(classLevel,subject,topic.topic,15);rows.push({classLevel,subject,topic:topic.topic,count:q.length,bank:q.filter(x=>x.source==='AVORA_REVIEWED_BANK').length,authored:q.filter(x=>x.source==='AVORA_AUTHORED_NERDC_BANK').length,concept:q.filter(x=>x.source==='NERDC_DEEP_LESSON_CONCEPT_CHECK').length});
 }
 return rows;
}
