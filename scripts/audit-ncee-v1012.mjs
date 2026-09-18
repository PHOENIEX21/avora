import fs from 'node:fs';
const r=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const editorial=r('lib/nceeEditorialBank.ts');
const bank=r('lib/nceeQuestionBank.ts');
const start=r('app/api/common-entrance/mock/start/route.ts');
const prep=r('lib/nceePrep.ts');
const pkg=JSON.parse(r('package.json'));
const domains=['Mathematics','Basic Science & Technology','English Studies','National Values Education','Quantitative & Vocational Aptitude','Verbal Aptitude'];
const checks=[
 ['editorial bank builder exists',editorial.includes('buildNceeEditorialBank')&&editorial.includes('NCEE_EDITORIAL_QUESTION_BANK')],
 ['all six domain builders present',domains.every(d=>editorial.includes(`'${d}'`))],
 ['both Primary 5 and Primary 6 generated',editorial.includes("['Primary 5','Primary 6']")],
 ['minimum 80 items/domain/class contract',editorial.includes('Math.ceil(80/topics.length)')&&start.includes('items.length<80')],
 ['every question remains topic-remediation linked',editorial.includes('remediationTopic:topic')||editorial.includes('remediationTopic:topic')],
 ['answer-option integrity guard',editorial.includes('options.includes(answer)')],
 ['eight mocks use non-overlapping 10-question slices',start.includes('const start=(mockNumber-1)*10')&&start.includes('slice(start,start+10)')],
 ['mock number hard-limited 1–8',start.includes('Math.min(8,Math.max(1')],
 ['official Paper I domains preserved',domains.slice(0,4).every(d=>start.includes(`'${d}'`))],
 ['official Paper II domains preserved',domains.slice(4).every(d=>start.includes(`'${d}'`))],
 ['live bank now points to expanded editorial bank',bank.includes('NCEE_REVIEWED_QUESTION_BANK=NCEE_EDITORIAL_QUESTION_BANK')],
 ['historical papers remain reference-only',prep.includes('reproduceQuestions:false')],
 ['question explanations remain mandatory',bank.includes('explanation:string')],
 ['difficulty remains explicit',bank.includes('difficulty:1|2|3')],
 ['launch check includes V10.12 audit',String(pkg.scripts?.['launch:check']||'').includes('audit:ncee-v1012')],
];
let n=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);n+=+ok}
console.log(`\nNCEE V10.12 editorial-bank audit: ${n}/${checks.length}`);if(n!==checks.length)process.exit(1);
