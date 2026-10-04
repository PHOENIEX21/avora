import fs from 'node:fs';
import {nerdc2025AuthoredJss2EnglishQuestions as questions} from '../lib/nerdc2025AuthoredEnglishExercises.ts';

const official=JSON.parse(fs.readFileSync('data/nerdc-2025-official-jss1-jss2.json','utf8')).records;
const manifest=JSON.parse(fs.readFileSync('data/nerdc-2025-integration-manifest.json','utf8'));
const exercise=fs.readFileSync('lib/nerdc2025Exercises.ts','utf8');
const expected=[
 'Debate',
 'Oral Summary',
 'Sentence Types (function): Declarative, Interrogative, Imperative (command) and Exclamatory',
 'Structural Sentence Types (simple, compound and complex)',
 'Skit-making',
 'Writing dialogues',
];
const officialJss2English=new Set(official.filter(x=>x.classLevel==='JSS2'&&x.subject==='English Language').map(x=>x.topic));
const ids=new Set(questions.map(q=>q.id));
const prompts=new Set(questions.map(q=>q.prompt.trim().toLowerCase()));
const badOptions=questions.filter(q=>!Array.isArray(q.options)||q.options.length!==4||new Set(q.options).size!==4);
const badKeys=questions.filter(q=>q.options.filter(o=>o===q.correctAnswer).length!==1);
const weakExplanations=questions.filter(q=>String(q.explanation||'').trim().length<35);
const genericPrompts=questions.filter(q=>/^(concept|reasoning|misconception) check\s*\d+/i.test(q.prompt));
const badMeta=questions.filter(q=>q.classLevel!=='JSS2'||q.subject!=='English Language'||!q.skill||![1,2,3].includes(q.difficulty));
const perTopic=Object.fromEntries(expected.map(topic=>[topic,questions.filter(q=>q.topic===topic)]));
const weakDifficulty=expected.filter(topic=>new Set(perTopic[topic].map(q=>q.difficulty)).size<3||perTopic[topic].filter(q=>q.difficulty===3).length<2);
const manifestRows=manifest.topics.filter(x=>x.classLevel==='JSS2'&&x.subject==='English Language'&&expected.includes(x.officialTopic));
const checks=[
 ['bank contains exactly 90 purpose-written questions',questions.length===90],
 ['bank covers exactly the six missing official topics',new Set(questions.map(q=>q.topic)).size===6&&expected.every(t=>perTopic[t].length===15)],
 ['all six bank topics are exact official NERDC topic names',expected.every(t=>officialJss2English.has(t))],
 ['all question ids are unique',ids.size===questions.length],
 ['all prompts are unique',prompts.size===questions.length],
 ['every question has four unique options',badOptions.length===0],
 ['every correct answer appears exactly once in its options',badKeys.length===0],
 ['every answer has a substantive explanation',weakExplanations.length===0],
 ['questions use authored prompts rather than generic fallback templates',genericPrompts.length===0],
 ['every question has valid class subject skill and difficulty metadata',badMeta.length===0],
 ['each topic progresses across difficulty levels 1 2 and 3',weakDifficulty.length===0],
 ['manifest records 15 authored questions and zero fallback need for all six topics',manifestRows.length===6&&manifestRows.every(x=>x.authoredNerdcQuestions===15&&x.conceptChecksNeededFor15===0&&x.exerciseQuestionTarget===15)],
 ['exercise engine prioritizes authored bank before legacy/fallback bank',exercise.indexOf('authoredNerdc2025EnglishQuestions(topic)')>=0&&exercise.indexOf('authoredNerdc2025EnglishQuestions(topic)')<exercise.indexOf('compatibleBankQuestions(classLevel,subject,topic)')],
 ['authored questions are labelled with dedicated reviewed source',exercise.includes("source:'AVORA_AUTHORED_NERDC_BANK' as const")],
];
let pass=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} — ${name}`);if(ok)pass++}
if(badOptions.length)console.log('Bad option rows:',badOptions.map(q=>q.id));
if(badKeys.length)console.log('Bad answer-key rows:',badKeys.map(q=>q.id));
if(weakDifficulty.length)console.log('Weak difficulty topics:',weakDifficulty);
console.log(`\nV14.9 AUTHORED JSS2 ENGLISH BANK: ${pass}/${checks.length} PASS`);
if(pass!==checks.length)process.exit(1);
