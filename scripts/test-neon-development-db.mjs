import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

const connection='postgresql://test:test@ep-rapid-sunset-aye7rhiz-pooler.c-5.us-east-2.aws.neon.tech/test';
function fixture(branch='br-blue-scene-ayydvo7l'){
 const calls=[];let releases=0;
 const client={release(){releases++},async query(text,params=[]){calls.push({text,params});
  return text.includes("current_setting('neon.branch_id'")?{rows:[{branch_id:branch}],rowCount:1}:{rows:[{value:1}],rowCount:1};
 }};
 class Pool{async connect(){return client}async end(){}}
 const compiled=ts.transpileModule(readFileSync(new URL('../lib/neonDevelopmentDb.ts',import.meta.url),'utf8'),{
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 const mod={exports:{}};
 new Function('module','exports','require',compiled)(mod,mod.exports,name=>{
  if(name==='@neondatabase/serverless')return {Pool,neonConfig:{}};
  if(name==='ws')return class{};
  if(name==='https-proxy-agent')return {HttpsProxyAgent:class{}};
  throw new Error('Unexpected dependency '+name);
 });
 return {create:mod.exports.createNeonDevelopmentSql,calls,releases:()=>releases};
}
test('development transport rejects every unapproved endpoint before connecting',()=>{
 const f=fixture();assert.throws(()=>f.create('postgresql://test:test@production.neon.tech/test'),/isolated branch/);
 assert.equal(f.calls.length,0);
});
test('production cannot enable this development transport',()=>{
 const previous=process.env.NODE_ENV;process.env.NODE_ENV='production';
 try{assert.throws(()=>fixture().create(connection),/unavailable in production/)}
 finally{if(previous===undefined)delete process.env.NODE_ENV;else process.env.NODE_ENV=previous}
});
test('branch mismatch blocks the requested query and releases the client',async()=>{
 const f=fixture('br-blue-lab-ayq111cy'),sql=f.create(connection);
 await assert.rejects(()=>sql`SELECT 1`,/identity mismatch/);
 assert.equal(f.calls.length,1);assert.equal(f.releases(),1);
});
test('queries bind parameters and retain JSON helper behavior',async()=>{
 const f=fixture(),sql=f.create(connection);
 const rows=await sql`SELECT ${"literal ' SQL"} AS text,${sql.json({value:1})}::jsonb AS data`;
 assert.equal(rows.length,1);assert.equal(rows.count,1);
 assert.equal(f.calls[1].text,'SELECT $1 AS text,$2::jsonb AS data');
 assert.deepEqual(f.calls[1].params,["literal ' SQL",'{"value":1}']);
});
test('transactions hold one verified connection and roll back on failure',async()=>{
 const f=fixture(),sql=f.create(connection);
 await assert.rejects(()=>sql.begin(async tx=>{await tx`SELECT ${1}`;throw new Error('TEST_ROLLBACK')}),/TEST_ROLLBACK/);
 assert.deepEqual(f.calls.map(x=>x.text),["SELECT current_setting('neon.branch_id',true) AS branch_id",'BEGIN','SELECT $1','ROLLBACK']);
 assert.equal(f.releases(),1);
});
