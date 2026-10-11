import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import test from 'node:test';
import ts from 'typescript';
const require=createRequire(import.meta.url);
const source=readFileSync(new URL('../lib/dawnAccessPolicy.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};
new Function('module','exports','require',compiled)(mod,mod.exports,require);
const {decideDawnAccess}=mod.exports;
const complete={classReleased:true,weekReleased:true,consentRecorded:true,contactVerified:true,parentPinPresent:true,studentPinPresent:true,guardianWorkflowApproved:true};
test('unreleased class and week always use legacy experience',()=>{
 for(const key of ['classReleased','weekReleased'])assert.equal(decideDawnAccess({...complete,[key]:false}),'legacy');
});
test('each missing guardian requirement blocks Dawn',()=>{
 for(const key of ['consentRecorded','contactVerified','parentPinPresent','studentPinPresent'])
  assert.equal(decideDawnAccess({...complete,[key]:false}),'onboarding_required',key);
});
test('records alone cannot activate unapproved guardian workflow',()=>{
 assert.equal(decideDawnAccess({...complete,guardianWorkflowApproved:false}),'verification_pending');
});
test('even complete records cannot activate a disabled guardian workflow',()=>assert.equal(decideDawnAccess(complete),'verification_pending'));
test('undefined and missing evidence fail closed',()=>{
 assert.notEqual(decideDawnAccess({}),'ready');
});
