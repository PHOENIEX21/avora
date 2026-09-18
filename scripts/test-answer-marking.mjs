import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root=new URL('../',import.meta.url);
const answers=await import(pathToFileURL(fileURLToPath(new URL('../lib/answers.ts',import.meta.url))).href);
const {answerIsCorrect}=answers;
const checks=[];
function check(name,fn){try{fn();checks.push([name,true])}catch(e){checks.push([name,false,e.message])}}

check('exact text',()=>assert.equal(answerIsCorrect('because it was raining',{value:'because it was raining'}),true));
check('case/whitespace tolerance',()=>assert.equal(answerIsCorrect('  Because   it was raining  ',{value:'because it was raining'}),true));
check('formatted numeric tolerance',()=>assert.equal(answerIsCorrect('224150',{value:'224,150'}),true));
check('fraction numeric equivalence',()=>assert.equal(answerIsCorrect('3/4',{value:'0.75'}),true));
check('percentage same-number display',()=>assert.equal(answerIsCorrect('75%',{value:'75'}),true));
check('MCQ option text',()=>assert.equal(answerIsCorrect('Blue',{value:'Blue'},['Red','Blue','Green','Gold']),true));
check('MCQ option letter to expected text',()=>assert.equal(answerIsCorrect('B',{value:'Blue'},['Red','Blue','Green','Gold']),true));
check('legacy stored option letter',()=>assert.equal(answerIsCorrect('Blue',{value:'B'},['Red','Blue','Green','Gold']),true));
check('wrong answer rejected',()=>assert.equal(answerIsCorrect('Red',{value:'Blue'},['Red','Blue','Green','Gold']),false));
check('sign error rejected',()=>assert.equal(answerIsCorrect('-12',{value:'12'}),false));

const bankFile=JSON.parse(fs.readFileSync(new URL('../data/jss1-jss2-assessment-bank.json',import.meta.url),'utf8'));
const bank=bankFile.questions;
check('888 reviewed JSS1/JSS2 correct answers mark correct',()=>{
 assert.equal(bank.length,888);
 for(const [i,q] of bank.entries()) assert.equal(answerIsCorrect(q.correctAnswer,{value:q.correctAnswer},q.options),true,`bank item ${i+1}`);
});
check('888 reviewed JSS1/JSS2 distractors do not mark correct',()=>{
 for(const [i,q] of bank.entries()) for(const option of q.options||[]) if(String(option)!==String(q.correctAnswer)) assert.equal(answerIsCorrect(option,{value:q.correctAnswer},q.options),false,`bank item ${i+1}: ${option}`);
});

for(const [name,ok,msg] of checks) console.log(`${ok?'PASS':'FAIL'} ${name}${msg?` — ${msg}`:''}`);
const pass=checks.filter(x=>x[1]).length;
console.log(`Answer marking test: ${pass}/${checks.length} PASS`);
if(pass!==checks.length)process.exit(1);
