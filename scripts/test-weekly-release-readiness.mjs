import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../lib/weeklyReleaseReadiness.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};
new Function('module','exports',js)(mod,mod.exports);
const {weeklyReleaseReadiness}=mod.exports;
const ready={publishedObjectiveCount:4,objectivesOutsideActiveSubjects:0,subjectCount:4,readyTopicSets:4,publishedSubjectCount:4,objectivesWithoutSixItems:0,reviewedExamCount:4,publishedEnglishDays:5};
test('complete reviewed class week can release',()=>assert.deepEqual(weeklyReleaseReadiness(ready),{ready:true,blockers:[]}));
test('empty week never releases',()=>assert.equal(weeklyReleaseReadiness({subjectCount:0,readyTopicSets:0,publishedObjectiveCount:0,objectivesOutsideActiveSubjects:0,publishedSubjectCount:0,objectivesWithoutSixItems:0,reviewedExamCount:0,publishedEnglishDays:0}).ready,false));
test('every independent readiness gate fails closed',()=>{
 for(const [field,value] of [['publishedSubjectCount',3],['objectivesWithoutSixItems',1],['reviewedExamCount',3],['publishedEnglishDays',4],['subjectCount',0],['publishedObjectiveCount',0],['objectivesOutsideActiveSubjects',1],['readyTopicSets',3]]){
  assert.equal(weeklyReleaseReadiness({...ready,[field]:value}).ready,false,field);
 }
});
test('excess exam count does not substitute missing objectives',()=>assert.equal(weeklyReleaseReadiness({...ready,publishedSubjectCount:3,reviewedExamCount:10}).ready,false));
