import fs from 'node:fs';
const snapshot=JSON.parse(fs.readFileSync(new URL('../data/revised-2025-curriculum-snapshot.json',import.meta.url),'utf8'));
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
const unique=a=>[...new Set(a.map(clean).filter(Boolean))];
function rotate(arr,n){return arr.slice(n).concat(arr.slice(0,n));}
function optionSet(correct,wrong,seed){
 const fillers=unique([...wrong,'None of these statements correctly addresses the stated skill.','The answer can be chosen without using the topic rule.']).filter(x=>x!==correct);
 while(fillers.length<3) fillers.push(`Unrelated distractor ${fillers.length+1}`);
 return rotate([correct,...fillers.slice(0,3)],seed%4);
}
const questions=[]; const performanceTasks=[];
for(const entry of snapshot.topics){
 const t=entry; const l=entry.deepLesson;
 if(!l) throw new Error(`Missing deep lesson for ${t.id}`);
 const obj=l.objectives; const teach=l.teaching; const ex=l.workedExamples; const mis=l.misconceptions; const guided=l.guidedPractice; const indep=l.independentPractice;
 const specs=[
  {kind:'CONCEPT',difficulty:1,prompt:`In ${t.classLevel} ${t.subject} — ${t.topic}, which explanation best represents the rule or idea a learner should understand?`,correct:teach[0]||obj[0],wrong:mis},
  {kind:'OBJECTIVE',difficulty:1,prompt:`Which outcome is genuinely part of the revised ${t.classLevel} ${t.subject} expectations for ${t.topic}?`,correct:obj[0],wrong:mis},
  {kind:'APPLICATION',difficulty:2,prompt:`Which worked example correctly applies ${t.classLevel} ${t.subject} — ${t.topic}?`,correct:ex[0]||teach[1]||obj[0],wrong:mis},
  {kind:'MISCONCEPTION',difficulty:2,prompt:`Which statement identifies a mistake AVORA should actively correct while teaching ${t.classLevel} ${t.subject} — ${t.topic}?`,correct:mis[0]||'Using the rule without checking meaning or context.',wrong:[teach[0],obj[0],ex[0]]},
  {kind:'TRANSFER',difficulty:2,prompt:`A learner meets an unfamiliar ${t.classLevel} ${t.subject} problem on ${t.topic}. Which principle should guide the first sound step?`,correct:teach[1]||teach[0]||obj[0],wrong:mis.slice(1)},
  {kind:'APPLICATION',difficulty:3,prompt:`Which second example or reasoning move is valid evidence of deeper understanding of ${t.classLevel} ${t.subject} — ${t.topic}?`,correct:ex[1]||ex[0]||teach[2]||teach[0],wrong:mis},
  {kind:'MASTERY',difficulty:3,prompt:`Which task would provide the strongest independent evidence that a learner can use ${t.classLevel} ${t.subject} — ${t.topic}, rather than merely recognise a definition?`,correct:indep[0]||guided[0]||l.mastery.criterion,wrong:[`Copy the definition of ${t.topic} exactly.`,`Read the worked example without attempting a new problem.`,`Choose an answer only from memory without showing or applying the relevant skill.`]},
  {kind:'REASONING',difficulty:3,prompt:`Which statement best explains what successful reasoning in ${t.classLevel} ${t.subject} — ${t.topic} should achieve?`,correct:obj[1]||obj[0],wrong:mis.slice().reverse()}
 ];
 specs.forEach((s,i)=>{
  const correct=clean(s.correct); const options=optionSet(correct,s.wrong,i+t.officialOrder);
  questions.push({id:`${t.id}-q${i+1}`,curriculumTopicId:t.id,classLevel:t.classLevel,subject:t.subject,topic:t.topic,prompt:s.prompt,questionType:'MULTIPLE_CHOICE',options,correctAnswer:correct,explanation:correct,difficulty:s.difficulty,assessmentKind:s.kind,curriculumObjective:obj[i%obj.length],misconceptionTags:mis.slice(0,3),qualityStatus:'REVIEWED',contentOrigin:'AVORA_ORIGINAL',curriculumVersion:'NERDC_NEW_REVISED_BEC_2025',variantFamily:`${t.id}-${String(s.kind).toLowerCase()}-${i+1}`});
 });
 performanceTasks.push({id:`${t.id}-performance`,curriculumTopicId:t.id,classLevel:t.classLevel,subject:t.subject,topic:t.topic,prompt:indep[0]||guided[0]||`Complete an independent mastery task for ${t.topic}.`,rubric:[...obj,l.mastery.criterion],prerequisites:l.prerequisites,sourceAuthority:'NERDC',sourceUrl:l.source.url,sourcePage:0,curriculumVersion:'NERDC_NEW_REVISED_BEC_2025',status:'ACTIVE'});
}
const counts={}; for(const q of questions){const k=`${q.classLevel}|${q.subject}`;counts[k]=(counts[k]||0)+1}
const bank={version:'10.0.0',curriculumVersion:'NERDC_NEW_REVISED_BEC_2025',generatedFrom:'AVORA reconciled revised-2025 deep lesson records',questions,performanceTasks,summary:{totalTopics:snapshot.topics.length,totalQuestions:questions.length,totalPerformanceTasks:performanceTasks.length,byClassSubject:counts,questionsPerTopic:8}};
const prompts=new Set(); for(const q of questions){if(prompts.has(q.prompt))throw new Error(`Duplicate prompt: ${q.prompt}`);prompts.add(q.prompt);if(new Set(q.options).size!==4)throw new Error(`Bad options ${q.id}`);if(!q.options.includes(q.correctAnswer))throw new Error(`Missing answer ${q.id}`)}
fs.writeFileSync(new URL('../data/jss1-jss2-assessment-bank.json',import.meta.url),JSON.stringify(bank,null,2));
console.log(JSON.stringify(bank.summary,null,2));
