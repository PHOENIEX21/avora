import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

const source=readFileSync(new URL('../lib/weeklyBaselinePolicy.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const testModule={exports:{}};
new Function('module','exports',js)(testModule,testModule.exports);
const {BASELINE_QUESTION_TARGET,BASELINE_DURATION_MS,baselineMayPostpone,baselinePostponementDeadline,baselineTimeRemaining}=testModule.exports;

test('baseline targets twenty questions and fifteen minutes',()=>{
 assert.equal(BASELINE_QUESTION_TARGET,20);
 assert.equal(BASELINE_DURATION_MS,900000);
});
test('three-day postponement boundary is exclusive',()=>{
 const first=new Date('2026-10-01T10:00:00Z');
 const deadline=baselinePostponementDeadline(first);
 assert.equal(deadline.toISOString(),'2026-10-04T10:00:00.000Z');
 assert.equal(baselineMayPostpone(first,new Date(deadline.getTime()-1)),true);
 assert.equal(baselineMayPostpone(first,deadline),false);
});
test('remaining time never becomes negative',()=>{
 const start=new Date('2026-10-01T10:00:00Z');
 assert.equal(baselineTimeRemaining(start,start),900000);
 assert.equal(baselineTimeRemaining(start,new Date(start.getTime()+900001)),0);
});
