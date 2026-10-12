import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../lib/weeklyReleaseWindow.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};
new Function('module','exports',js)(mod,mod.exports);
const {canReadReleasedWeek}=mod.exports;
test('current and prior weeks remain accessible for revision',()=>{
 for(const term of [1,2,3])for(let week=1;week<=16;week++){
  assert.equal(canReadReleasedWeek({term,week},{term,week}),true);
  if(week>1)assert.equal(canReadReleasedWeek({term,week},{term,week:week-1}),true);
  if(week<16)assert.equal(canReadReleasedWeek({term,week},{term,week:week+1}),false);
 }
});
test('earlier term remains available; future term remains hidden',()=>{
 assert.equal(canReadReleasedWeek({term:2,week:1},{term:1,week:16}),true);
 assert.equal(canReadReleasedWeek({term:1,week:16},{term:2,week:1}),false);
});
test('missing, invalid and out of range release state fail closed',()=>{
 for(const state of [null,{term:0,week:1},{term:1,week:17},{term:NaN,week:1}])assert.equal(canReadReleasedWeek(state,{term:1,week:1}),false);
 for(const request of [{term:4,week:1},{term:1,week:0},{term:1.5,week:1}])assert.equal(canReadReleasedWeek({term:3,week:16},request),false);
});
