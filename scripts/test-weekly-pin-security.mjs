import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const source=readFileSync(new URL('../lib/weeklyPinSecurity.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const testModule={exports:{}};
new Function('module','exports','require',compiled)(testModule,testModule.exports,require);
const {validateStudentPin,hashStudentPin,verifyStudentPin,nextPinAttempt}=testModule.exports;
test('PIN format is 6-8 digits only',()=>{
 assert.equal(validateStudentPin('123456'),true);
 assert.equal(validateStudentPin('12345678'),true);
 assert.equal(validateStudentPin('12345'),false);
 assert.equal(validateStudentPin('123456789'),false);
 assert.equal(validateStudentPin('abc123'),false);
});
test('PIN hash is salted and verifies without exposing raw PIN',async()=>{
 const first=await hashStudentPin('123456');
 const second=await hashStudentPin('123456');
 assert.notEqual(first,second);
 assert.equal(first.includes('123456'),false);
 assert.equal(await verifyStudentPin('123456',first),true);
 assert.equal(await verifyStudentPin('123457',first),false);
 assert.equal(await verifyStudentPin('123456','invalid'),false);
});
test('five wrong PIN attempts lock for fifteen minutes',()=>{
 const now=new Date('2026-10-10T12:00:00Z');
 let state={failedAttempts:0,lockedUntil:null};
 for(let i=0;i<5;i++)state=nextPinAttempt(state.failedAttempts,state.lockedUntil,false,now);
 assert.equal(state.failedAttempts,5);
 assert.equal(state.lockedUntil.toISOString(),'2026-10-10T12:15:00.000Z');
 assert.equal(nextPinAttempt(5,state.lockedUntil,true,new Date('2026-10-10T12:01:00Z')).allowed,false);
 const reset=nextPinAttempt(5,state.lockedUntil,true,new Date('2026-10-10T12:16:00Z'));
 assert.equal(reset.allowed,true);assert.equal(reset.failedAttempts,0);
});
