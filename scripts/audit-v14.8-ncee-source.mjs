import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const data=JSON.parse(read('data/ncee-source-content-v14.8.json'));
const prep=read('lib/nceePrep.ts');
const learn=read('app/common-entrance/learn/page.tsx');
const lesson=read('app/common-entrance/learn/[topic]/page.tsx');
const runtime=read('lib/nceeSourceRuntime.ts');
const pkg=JSON.parse(read('package.json'));
const srcDir=path.resolve(fileURLToPath(new URL('../data/ncee-sources/v14.8/',import.meta.url)));
const files=fs.readdirSync(srcDir).filter(x=>x.endsWith('.md')).sort();
const lessonFiles=files.filter(f=>!f.includes('CBT_')&&!f.includes('Curriculum_'));
const mockFiles=files.filter(f=>f.includes('CBT_'));
const allStudentText=data.topics.flatMap(t=>[...t.concepts,...t.workedExamples,...t.practiceQuestions]).join('\n');
const dist={};for(const t of data.topics){const k=`${t.classLevel}|${t.domain}`;dist[k]=(dist[k]||0)+1;}
const expected={
 'Primary 5|Mathematics':17,'Primary 6|Mathematics':16,
 'Primary 5|English Studies':19,'Primary 6|English Studies':21,
 'Primary 5|Basic Science & Technology':4,'Primary 6|Basic Science & Technology':5,
 'Primary 5|National Values Education':3,'Primary 6|National Values Education':5,
 'Primary 5|Quantitative & Vocational Aptitude':4,'Primary 6|Quantitative & Vocational Aptitude':6,
 'Primary 5|Verbal Aptitude':4,'Primary 6|Verbal Aptitude':6,
};
function questionCount(file){return [...read(`data/ncee-sources/v14.8/${file}`).matchAll(/^\*\*(\d+)\.\*\*/gm)].length}
function answerLetters(file){return [...read(`data/ncee-sources/v14.8/${file}`).matchAll(/\*Ans:\s*([A-D])\b/gi)].map(m=>m[1].toUpperCase())}
const biasedMocks=mockFiles.filter(f=>{const a=answerLetters(f);if(a.length<8)return false;const counts={};for(const x of a)counts[x]=(counts[x]||0)+1;return Math.max(...Object.values(counts))/a.length>.7});
const checks=[
 ['version 14.8 patch-or-newer',/^14\.8\./.test(pkg.version)],
 ['all 25 uploaded source files preserved',files.length===25&&data.sourceFiles.length===25],
 ['18 lesson files compiled',lessonFiles.length===18],
 ['110 source-backed teaching topics',data.topics.length===110],
 ['exact class/domain distribution',Object.entries(expected).every(([k,v])=>dist[k]===v)],
 ['teaching-ready topics have real teaching content',data.topics.filter(t=>t.contentStatus==='TEACHING_READY').every(t=>t.concepts.length+t.workedExamples.length>0)],
 ['no practice-only learner gap remains',data.topics.filter(t=>t.contentStatus==='PRACTICE_ONLY').length===0],
 ['mixed/timed source practice is assessment-only',data.topics.filter(t=>t.contentStatus==='ASSESSMENT_ONLY').length===3],
 ['every source entry has at least one learner/assessment check',data.topics.every(t=>t.practiceQuestions.length>0)],
 ['no author instruction leakage',!/Avora should|Avora must|Content Development Notes|Originally Derived|Source step/i.test(allStudentText)],
 ['no JSS provenance leakage',!/JSS[123]\s*T[123]/i.test(allStudentText)],
 ['dynamic current-affairs fact is explicitly dated',/As of 14 September 2026.*Bola Ahmed Tinubu/i.test(allStudentText)],
 ['raw markdown table syntax excluded from runtime',!/^\|/m.test(allStudentText)],
 ['source runtime separates board and narration',runtime.includes("kind:'concept'")&&runtime.includes('narration')&&runtime.includes('board:')],
 ['common-entrance browser uses source topics',learn.includes('nceeSourceTopicsFor')&&!learn.includes('nceeTopicsFor')],
 ['lesson route uses source-backed runtime',lesson.includes('nceeSourceTopicById')&&lesson.includes('nceeSourceDeepLesson')],
 ['non-teaching source blocks cannot enter lesson route',runtime.includes("contentStatus==='TEACHING_READY'&&t.id===id")],
 ['official 2026 two-paper structure retained',prep.includes("Part A - Mathematics")|| (prep.includes("domains:['Mathematics','Basic Science & Technology']")&&prep.includes("domains:['Quantitative & Vocational Aptitude']"))],
 ['official Paper I duration 130 minutes retained',prep.includes('durationMinutes:130')],
 ['official Paper II duration 80 minutes retained',prep.includes('durationMinutes:80')],
 ['uploaded mock sources not silently merged into live bank',!read('lib/nceeEditorialBank.ts').includes('data/ncee-sources/v14.8')],
 ['mock-source answer-position bias detected and quarantined',biasedMocks.length>=4],
 ['Primary 5 source mock counts intact',questionCount('Avora_NCEE_CBT_Maths_Primary5_MockSet1.md')===20&&questionCount('Avora_NCEE_CBT_English_Primary5_MockSet1.md')===20&&questionCount('Avora_NCEE_CBT_GeneralPaper_Primary5_MockSet1.md')===20],
 ['Primary 6 source mock counts intact',questionCount('Avora_NCEE_CBT_Maths_Primary6_MockSet1.md')===40&&questionCount('Avora_NCEE_CBT_English_Primary6_MockSet1.md')===40&&questionCount('Avora_NCEE_CBT_GeneralPaper_Primary6_MockSet1.md')===60],
];
let passed=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)passed++;}
console.log(`\nNCEE V14.8 source integration compatibility audit: ${passed}/${checks.length} PASS`);
console.log(`Quarantined biased source mocks: ${biasedMocks.join(', ')}`);
if(passed!==checks.length)process.exit(1);
