import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import test from 'node:test';
import ts from 'typescript';
const require=createRequire(import.meta.url);
const source=readFileSync(new URL('../lib/guardianVerification.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};
new Function('module','exports','require',js)(mod,mod.exports,require);
const {newGuardianChallengeCode,hashGuardianChallenge,matchesGuardianChallenge,guardianChallengeAllowed,guardianChallengeState}=mod.exports;
const secret='test-only-secret-that-is-long-enough-for-configuration';
test('codes contain exactly six numeric digits',()=>{
 for(let i=0;i<20;i++)assert.match(newGuardianChallengeCode(),/^[0-9]{6}$/);
});
test('verification uses nonce and constant-time digest comparison',()=>{
 const hash=hashGuardianChallenge('012345','nonce-one',secret);
 assert.equal(matchesGuardianChallenge('012345','nonce-one',secret,hash),true);
 assert.equal(matchesGuardianChallenge('012346','nonce-one',secret,hash),false);
 assert.equal(matchesGuardianChallenge('012345','nonce-two',secret,hash),false);
 assert.equal(matchesGuardianChallenge('012345','nonce-one',secret,'invalid'),false);
 assert.notEqual(hashGuardianChallenge('012345','nonce-one',secret),hashGuardianChallenge('012345','nonce-two',secret));
 assert.throws(()=>hashGuardianChallenge('12345','nonce-one',secret));
});
test('expired or exhausted challenges cannot be used',()=>{
 const now=new Date('2026-10-11T12:00:00Z');
 assert.equal(guardianChallengeAllowed(new Date('2026-10-11T12:10:00Z'),0,now),true);
 assert.equal(guardianChallengeAllowed(new Date('2026-10-11T12:00:00Z'),0,now),false);
 assert.equal(guardianChallengeAllowed(new Date('2026-10-11T12:10:00Z'),5,now),false);
});

test('challenge lifecycle blocks reused, expired and exhausted codes',()=>{
 const now=new Date('2026-10-11T12:00:00Z');
 const future=new Date('2026-10-11T12:10:00Z');
 assert.equal(guardianChallengeState(future,null,0,now),'pending');
 assert.equal(guardianChallengeState(future,now,0,now),'used');
 assert.equal(guardianChallengeState(now,null,0,now),'expired');
 assert.equal(guardianChallengeState(future,null,5,now),'exhausted');
});

test('code hash rejects an insufficient secret',()=>{
 assert.throws(()=>hashGuardianChallenge('123456','nonce','short'));
});
