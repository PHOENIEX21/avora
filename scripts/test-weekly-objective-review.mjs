import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../lib/weeklyObjectiveReviewPolicy.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};
new Function('module','exports',js)(mod,mod.exports);
const {objectiveReviewTransition}=mod.exports;
test('review actions move only through explicit allowed states',()=>{
 for(const [action,current,next] of [['SUBMIT','DRAFT','IN_REVIEW'],['APPROVE','IN_REVIEW','APPROVED'],['PUBLISH','APPROVED','PUBLISHED'],['REJECT','IN_REVIEW','DRAFT']]){
  assert.deepEqual(objectiveReviewTransition(action,current,'reviewer',1),{ok:true,next});
 }
});
test('no bypass to published state',()=>{
 for(const state of ['DRAFT','IN_REVIEW','REVIEWED','RETIRED','PUBLISHED']){
  assert.equal(objectiveReviewTransition('PUBLISH',state,'reviewer',1).ok,false);
 }
});
test('publishing requires reviewer and valid weekday',()=>{
 for(const day of [0,-1,6,1.5,NaN,null,undefined]){
  assert.equal(objectiveReviewTransition('PUBLISH','APPROVED','reviewer',day).ok,false);
 }
 assert.equal(objectiveReviewTransition('PUBLISH','APPROVED',null,1).ok,false);
 assert.equal(objectiveReviewTransition('PUBLISH','APPROVED','reviewer',5).ok,true);
});
test('invalid transitions do not change review state',()=>{
 assert.equal(objectiveReviewTransition('APPROVE','DRAFT','reviewer',1).ok,false);
 assert.equal(objectiveReviewTransition('SUBMIT','APPROVED','reviewer',1).ok,false);
 assert.equal(objectiveReviewTransition('REJECT','PUBLISHED','reviewer',1).ok,false);
});
