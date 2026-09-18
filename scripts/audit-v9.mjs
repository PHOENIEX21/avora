import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const checks=[];
function must(name,condition,detail){checks.push({name,ok:Boolean(condition),detail});}
const tutor=read('components/TutorClient.tsx');
const examFinish=read('app/api/exam/finish/route.ts');
const progress=read('app/progress/page.tsx');
const migration=read('database/migrations/012_learning_intelligence.sql');
const curriculum=read('lib/tutorCurriculum.ts');
const deep=read('lib/deepTeaching.ts');
const css=read('app/globals.css');
const home=read('app/home/page.tsx');
must('pause freezes engine',tutor.includes('pausedRef.current=true;stopAll();setPaused(true)'),'pause cancels timers + speech through stopAll');
must('checkpoint blocks Next',tutor.includes("disabled={event.kind==='check'&&!checkpointReply}"),'learner must receive a response before advancing');
must('checkpoint uses exact board question',tutor.includes('${event.question||event.spoken} My answer is:'),'checkpoint sends the exact learner-facing question instead of a generic fallback');
must('Tutor progress is subject-aware',tutor.includes('topic,subject,exam,currentUnit'),'Math/English progress cannot collide');
must('exam updates mastery',examFinish.includes('nextMasteryScore')&&examFinish.includes('INSERT INTO learner_skill_insights'),'exam evidence feeds mastery + learner model');
must('exam creates remediation',examFinish.includes('INSERT INTO remediation_plans'),'weak-topic recovery persists after submission');
must('parent/teacher evidence view',progress.includes('FOR PARENTS & TEACHERS')&&progress.includes('AVORA noticed'),'progress shows evidence + misconceptions');
must('home uses remediation',home.includes('remediation_plans')&&home.includes('plan_reason'),'home recommendation is connected to exam diagnosis');
must('learner intelligence schema',migration.includes('learner_skill_insights')&&migration.includes('tutor_interactions')&&migration.includes('remediation_plans'),'V9 data model present');
must('mobile dock five columns',/repeat\(5/.test(css),'Home remains visible in five-item dock');
for(const topic of ['Algebra','Number & Numeration','Geometry & Mensuration','Grammar & Structure','Comprehension','Concord','Writing & Composition'])must(`curriculum ${topic}`,curriculum.includes(`'${topic}'`)||curriculum.includes(`[\'${topic}\']`),topic);
for(const bank of ['simultaneous equations','operations and order of operations','area of plane shapes','concord','speech sounds: vowels and consonants','writing & composition','comprehension'])must(`deep bank ${bank}`,deep.includes(`'${bank}'`),bank);
const failed=checks.filter(x=>!x.ok);
for(const c of checks)console.log(`${c.ok?'✓':'✗'} ${c.name} — ${c.detail}`);
if(failed.length){console.error(`\nV9 launch audit FAILED: ${failed.length} check(s).`);process.exit(1)}
console.log(`\nV9 launch audit passed: ${checks.length}/${checks.length} checks.`);
