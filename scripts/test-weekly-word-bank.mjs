import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {resolve,dirname} from 'node:path';
import ts from 'typescript';
const require=createRequire(import.meta.url),root=resolve(import.meta.dirname,'..');
function harness(){
 let session={userId:'11111111-1111-4111-8111-111111111111',role:'ADMIN'},calls=0;
 const cache=new Map();
 const sql=async()=>{calls++;throw new Error('Unexpected database call')};sql.begin=async()=>{calls++;throw new Error('Unexpected transaction')};
 function load(file){file=resolve(root,file);if(cache.has(file))return cache.get(file);
  const mod={exports:{}};cache.set(file,mod.exports);
  const js=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  new Function('module','exports','require',js)(mod,mod.exports,name=>{
   if(name==='@/lib/auth')return {getSession:async()=>session};
   if(name==='@/lib/db')return {sql,withDbRetry:work=>work()};
   if(name==='next/server')return {NextResponse:{json:(body,init)=>Response.json(body,init)}};
   if(name==='next/navigation')return {redirect:path=>{throw new Error('REDIRECT:'+path)}};
   if(name==='@/components/WeeklyWordBank')return {__esModule:true,default:()=>null};
   if(name.startsWith('@/'))return load(name.slice(2)+'.ts');if(name.startsWith('.'))return load(resolve(dirname(file),name)+'.ts');return require(name);
  });return mod.exports;
 }
 return {load,setSession:value=>session=value,calls:()=>calls};
}
const h=harness(),words=h.load('lib/weeklyWordBank.ts'),csv=h.load('lib/weeklyCurriculumCsv.ts');
const draft={word:'TEST_ONLY',partOfSpeech:'TEST_ONLY',meaning:'TEST_ONLY meaning',examples:['TEST_ONLY example'],sourceReference:'TEST_ONLY not curriculum'};
const request=(body,contentType='application/json')=>new Request('https://avora-test.invalid/api/admin/weekly/words?classLevel=JSS1',{method:'POST',headers:{'Content-Type':contentType},body:typeof body==='string'?body:JSON.stringify(body)});
test('word source parser handles BOM, quoted commas, multiline and escaped quotes',()=>{
 const rows=words.parseWordCsv('\uFEFFword,partOfSpeech,meaning,example1,sourceReference\r\nTEST_ONLY,noun,"TEST, ONLY","TEST\nONLY ""example""",TEST_ONLY_SOURCE');
 assert.deepEqual(rows[0],{word:'TEST_ONLY',partOfSpeech:'noun',meaning:'TEST, ONLY',examples:['TEST\nONLY "example"'],sourceReference:'TEST_ONLY_SOURCE',relatedForm:null,pronunciationHint:null});
});
test('word parser rejects malformed, missing, duplicate and unknown columns',()=>{
 for(const input of ['word,word\nx,y','word,partOfSpeech,meaning,example1,sourceReference\n"unterminated',
  'word,partOfSpeech,meaning,example1,sourceReference\nx,y,z,q,r,extra','word,meaning\nx,y',
  'word,partOfSpeech,meaning,example1,sourceReference,example3\nx,noun,meaning,example,source,third',
  'word,partOfSpeech,meaning,example1,sourceReference,status\nx,noun,meaning,example,source,PUBLISHED'])assert.throws(()=>words.parseWordCsv(input));
});
test('shared parser preserves required curriculum fields and batch bounds',()=>{
 const header=csv.curriculumHeaders.join(',');assert.equal(csv.parseCurriculumCsv(header+'\nJSS1,TEST,1,1,1,TEST,TEST,TEST,').length,1);
 assert.throws(()=>csv.parseCurriculumCsv('word\nTEST'));
 assert.throws(()=>words.parseWordCsv('word,partOfSpeech,meaning,example1,sourceReference\n'+'x,noun,meaning,example,source\n'.repeat(251)));
});
test('word validation requires source, meaning and one to three examples',()=>{
 assert.equal(words.wordDraftSchema.safeParse(draft).success,true);
 for(const patch of [{sourceReference:''},{meaning:' '},{examples:[]},{examples:['a']},{examples:Array(4).fill('TEST_ONLY')},{word:'x'.repeat(101)},{status:'PUBLISHED'}])assert.equal(words.wordDraftSchema.safeParse({...draft,...patch}).success,false);
 assert.equal(words.storedWordDraft({word:'TEST_ONLY',part_of_speech:'noun',meaning:'TEST_ONLY',example_sentences:['TEST_ONLY'],source_reference:null}).success,false);
});
test('body reader enforces UTF-8 bytes, cancels oversized input and rejects invalid UTF-8',async()=>{
 assert.equal(await words.readWordBody(request('TEST_ONLY'),9),'TEST_ONLY');
 await assert.rejects(()=>words.readWordBody(request('éé'),3),/too large/);
 await assert.rejects(()=>words.readWordBody(new Request('https://avora-test.invalid',{method:'POST',body:new Uint8Array([255])})),/encoded data/);
});
test('all word routes reject guest, student, parent and teacher before database access',async()=>{
 const gate=harness(),collection=gate.load('app/api/admin/weekly/words/route.ts'),detail=gate.load('app/api/admin/weekly/words/[id]/route.ts');
 for(const role of [null,'STUDENT','PARENT','TEACHER']){
  gate.setSession(role?{userId:'TEST_ONLY',role}:null);
  assert.equal((await collection.GET(request(''))).status,403);assert.equal((await collection.POST(request({}))).status,403);
  assert.equal((await detail.PATCH(request({}),{params:Promise.resolve({id:'bad'})})).status,403);
 }assert.equal(gate.calls(),0);
});
test('owner import rejects invalid rows, duplicate words and forbidden publication fields before writes',async()=>{
 const gate=harness(),collection=gate.load('app/api/admin/weekly/words/route.ts');
 for(const data of [{classLevel:'SS1',rows:[draft]},{classLevel:'JSS1',rows:[]},{classLevel:'JSS1',rows:[{...draft,sourceReference:''}]},
  {classLevel:'JSS1',rows:[{...draft,status:'PUBLISHED'}]},{classLevel:'JSS1',rows:[draft],status:'APPROVED'}])assert.equal((await collection.POST(request(data))).status,400);
 assert.equal((await collection.POST(request({classLevel:'JSS1',rows:[draft,{...draft,word:' test_only '}]}))).status,409);
 assert.equal((await collection.POST(request('not JSON'))).status,400);assert.equal(gate.calls(),0);
});
test('owner filters reject unsupported classes, states, pagination and extra fields',async()=>{
 const gate=harness(),collection=gate.load('app/api/admin/weekly/words/route.ts');
 for(const query of ['classLevel=SS1','classLevel=JSS1&page=0','classLevel=JSS1&page=1.5','classLevel=JSS1&status=LIVE','classLevel=JSS1&studentId=x'])assert.equal((await collection.GET(new Request('https://avora-test.invalid?'+query))).status,400);
 assert.equal(gate.calls(),0);
});
test('review requires valid UUID, revision, explicit source confirmation and owner note; publication is absent',async()=>{
 const gate=harness(),detail=gate.load('app/api/admin/weekly/words/[id]/route.ts'),context={params:Promise.resolve({id:'11111111-1111-4111-8111-111111111111'})};
 for(const data of [{action:'PUBLISH',expectedRevision:1},{action:'APPROVE',expectedRevision:1,note:'TEST_ONLY'},
  {action:'APPROVE',expectedRevision:1,confirmedSource:false,note:'TEST_ONLY'},{action:'APPROVE',expectedRevision:1,confirmedSource:true,note:''},
  {action:'SUBMIT',expectedRevision:0},{action:'REJECT',expectedRevision:1},{action:'EDIT',expectedRevision:1,draft:{...draft,examples:[]}}])assert.equal((await detail.PATCH(request(data),context)).status,400);
 assert.equal((await detail.PATCH(request({action:'SUBMIT',expectedRevision:1}),{params:Promise.resolve({id:'bad'})})).status,400);assert.equal(gate.calls(),0);
});
test('word-bank page routes guests and non-owners away before rendering the workspace',async()=>{
 const gate=harness(),page=gate.load('app/admin/weekly/words/page.tsx').default;
 gate.setSession(null);await assert.rejects(()=>page(),/REDIRECT:\/login/);
 for(const role of ['STUDENT','PARENT','TEACHER']){gate.setSession({userId:'TEST_ONLY',role});await assert.rejects(()=>page(),/REDIRECT:\/home/)}
 gate.setSession({userId:'TEST_ONLY',role:'ADMIN'});assert.ok(await page());assert.equal(gate.calls(),0);
});
