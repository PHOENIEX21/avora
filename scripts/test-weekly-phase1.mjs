import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
const source=readFileSync(new URL('../lib/weeklyLearning.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const testModule={exports:{}};
new Function('module','exports','require',compiled )(testModule,testModule.exports,()=>({sql:null,withDbRetry:null}));
const {nextRevisitInterval,canServeWeeklyItem,canAccessClassRoom,nextWeekRevisionDates,validateWeeklyExamPlan,isoWeekday}=testModule.exports;
test('scheduler: first correct 2 days, second 7 days, third 21 days, wrong resets',()=>{
 assert.equal(nextRevisitInterval(0,true),2);
 assert.equal(nextRevisitInterval(1,true),7);
 assert.equal(nextRevisitInterval(2,true),21);
 assert.equal(nextRevisitInterval(8,false),1);
});
test('answer key: unreviewed and unmapped items cannot be served',()=>{
 const approved={status:'APPROVED',objective_id:'obj',answer_key:{correct:'A'},reviewer_id:'teacher',reviewed_at:'2026-10-10'};
 assert.equal(canServeWeeklyItem(approved),true);
 for(const key of ['objective_id','answer_key','reviewer_id','reviewed_at'])assert.equal(canServeWeeklyItem({...approved,[key]:null}),false);
 assert.equal(canServeWeeklyItem({...approved,status:'DRAFT'}),false);
});
test('permissions: only own class unless explicitly moderator',()=>{
 assert.equal(canAccessClassRoom('JSS1','JSS1',false),true);
 assert.equal(canAccessClassRoom('JSS1','JSS2',false),false);
 assert.equal(canAccessClassRoom(null,'JSS1',false),false);
 assert.equal(canAccessClassRoom('JSS1','JSS2',true),true);
});
const sql=readFileSync(new URL('../database/migrations/048_weekly_restructure_phase1.sql',import.meta.url),'utf8');
test('migration: no destructive operations and pilot defaults disabled',()=>{
 assert.match(sql,/enabled boolean NOT NULL DEFAULT false/i);
 assert.doesNotMatch(sql,/\b(?:DROP|TRUNCATE|DELETE FROM|ALTER TABLE)\b/i);
 assert.match(sql,/weekly_item_approval_gate/);
});

test('weekly calendar: Monday-Friday objective days, Saturday exam, next-week revision selection',()=>{
 assert.equal(isoWeekday('2026-10-12'),1);
 assert.equal(isoWeekday('2026-10-16'),5);
 assert.equal(isoWeekday('2026-10-17'),6);
 assert.deepEqual(nextWeekRevisionDates('2026-10-17'),['2026-10-19','2026-10-20','2026-10-21','2026-10-22','2026-10-23','2026-10-24','2026-10-25']);
 assert.equal(validateWeeklyExamPlan('2026-10-17','2026-10-21'),true);
 assert.equal(validateWeeklyExamPlan('2026-10-17','2026-10-18'),false);
 assert.equal(validateWeeklyExamPlan('2026-10-17','2026-10-26'),false);
 assert.throws(()=>nextWeekRevisionDates('2026-10-16'));
 assert.throws(()=>isoWeekday('2026-02-30'));
});
