import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {resolve,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
import postgres from 'postgres';
const root=resolve(import.meta.dirname,'..'),require=createRequire(import.meta.url),marker='AVORA_WORD_BANK_ROLLBACK';
export async function verifyWeeklyWordBank(sql){
 let checks=0,rolledBack=false;const admin=randomUUID(),prefix='TEST_ONLY_WORD_BANK_'+randomUUID();
 const equal=(actual,expected)=>{assert.deepEqual(actual,expected);checks++};
 try{await sql.begin(async tx=>{
  const [identity]=await tx`SELECT current_setting('neon.branch_id',true) branch`;equal(identity.branch,'br-blue-scene-ayydvo7l');
  await tx`INSERT INTO users(id,email,password_hash,full_name,role) VALUES(${admin},${admin+'@avora-test.invalid'},'NOT_A_LOGIN_HASH','TEST_ONLY_WORD_BANK','ADMIN')`;
  let session={userId:admin,role:'ADMIN'},inserts=0,failInsert=false;const cache=new Map();
  const tagged=async(strings,...values)=>{
   if(strings.join('').includes('INSERT INTO weekly_vocabulary_words')){inserts++;if(failInsert&&inserts===2)throw new Error('TEST_ONLY_SECOND_ROW_FAILURE')}
   return tx(strings,...values);
  };tagged.json=value=>JSON.stringify(value);
  tagged.begin=async work=>{await tx.unsafe('SAVEPOINT avora_word_bank_fixture');try{const result=await work(tagged);await tx.unsafe('RELEASE SAVEPOINT avora_word_bank_fixture');return result}
   catch(error){await tx.unsafe('ROLLBACK TO SAVEPOINT avora_word_bank_fixture');await tx.unsafe('RELEASE SAVEPOINT avora_word_bank_fixture');throw error}};
  function load(file){file=resolve(root,file);if(cache.has(file))return cache.get(file);const mod={exports:{}};cache.set(file,mod.exports);
   const js=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
   new Function('module','exports','require',js)(mod,mod.exports,name=>{
    if(name==='@/lib/db')return {sql:tagged,withDbRetry:work=>work()};
    if(name==='@/lib/auth')return {getSession:async()=>session};
    if(name==='next/server')return {NextResponse:{json:(body,init)=>Response.json(body,init)}};
    if(name.startsWith('@/'))return load(name.slice(2)+'.ts');if(name.startsWith('.'))return load(resolve(dirname(file),name)+'.ts');return require(name);
   });return mod.exports;
  }
  const collection=load('app/api/admin/weekly/words/route.ts'),detail=load('app/api/admin/weekly/words/[id]/route.ts');
  const draft=suffix=>({word:prefix+suffix,partOfSpeech:'TEST_ONLY',meaning:'TEST_ONLY_NOT_A_LESSON',examples:['TEST_ONLY_NOT_CURRICULUM'],sourceReference:'TEST_ONLY_ROLLBACK_SOURCE',relatedForm:null,pronunciationHint:null});
  const request=body=>new Request('https://avora-test.invalid/api/admin/weekly/words',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const importRows=(rows,classLevel='JSS1')=>collection.POST(request({classLevel,rows}));
  const review=(id,change)=>detail.PATCH(request(change),{params:Promise.resolve({id})});
  const list=async(query='')=>collection.GET(new Request('https://avora-test.invalid/api/admin/weekly/words?classLevel=JSS1&search='+prefix+query));
  const stored=async id=>(await tx`SELECT * FROM weekly_vocabulary_words WHERE id=${id}`)[0];
  equal((await importRows([draft('A'),draft('B')])).status,200);
  const response=await list();equal(response.status,200);equal(response.headers.get('Cache-Control'),'no-store');
  const first=await response.json();equal(first.rows.length,2);equal(first.hasMore,false);
  const a=first.rows.find(row=>row.word===prefix+'A'),b=first.rows.find(row=>row.word===prefix+'B');
  equal(a.status,'DRAFT');equal(a.revision,1);equal((await stored(a.id)).imported_by,admin);equal(a.source_reference,'TEST_ONLY_ROLLBACK_SOURCE');
  equal((await importRows([{...draft('A'),word:' '+(prefix+'A').toLowerCase()+' '},draft('C')])).status,409);
  equal((await list()).status,200);equal((await (await list()).json()).rows.length,2);
  equal((await importRows([draft('A')],'JSS2')).status,200);
  equal((await (await collection.GET(new Request('https://avora-test.invalid?classLevel=JSS2&search='+prefix))).json()).rows.length,1);
  inserts=0;failInsert=true;equal((await importRows([draft('FAIL1'),draft('FAIL2')])).status,503);failInsert=false;
  equal((await tx`SELECT count(*)::int n FROM weekly_vocabulary_words WHERE word=ANY(${[prefix+'FAIL1',prefix+'FAIL2']}::text[])`)[0].n,0);
  equal((await review(a.id,{action:'APPROVE',expectedRevision:1,confirmedSource:true,note:'TEST_ONLY_CHECKED'})).status,409);
  equal((await review(a.id,{action:'EDIT',expectedRevision:1,draft:draft('B')})).status,409);equal((await stored(a.id)).revision,1);
  equal((await review(a.id,{action:'EDIT',expectedRevision:1,draft:{...draft('A'),meaning:'TEST_ONLY_CORRECTED'}})).status,200);
  equal((await stored(a.id)).meaning,'TEST_ONLY_CORRECTED');equal((await stored(a.id)).revision,2);
  equal((await review(a.id,{action:'SUBMIT',expectedRevision:1})).status,409);
  equal((await review(a.id,{action:'SUBMIT',expectedRevision:2})).status,200);
  equal((await stored(a.id)).status,'IN_REVIEW');equal((await stored(a.id)).reviewed_by,null);
  equal((await review(a.id,{action:'EDIT',expectedRevision:3,draft:draft('A')})).status,409);
  equal((await review(a.id,{action:'APPROVE',expectedRevision:3,confirmedSource:false,note:'TEST_ONLY_CHECKED'})).status,400);
  equal((await review(a.id,{action:'REJECT',expectedRevision:3,note:'TEST_ONLY_SOURCE_CORRECTION'})).status,200);
  equal((await stored(a.id)).status,'DRAFT');equal((await stored(a.id)).review_note,'TEST_ONLY_SOURCE_CORRECTION');equal((await stored(a.id)).revision,4);
  equal((await review(a.id,{action:'SUBMIT',expectedRevision:4})).status,200);
  equal((await review(a.id,{action:'APPROVE',expectedRevision:5,confirmedSource:true,note:'TEST_ONLY_OWNER_REVIEW'})).status,200);
  const approved=await stored(a.id);equal(approved.status,'APPROVED');equal(approved.reviewed_by,admin);equal(Boolean(approved.reviewed_at),true);equal(approved.revision,6);
  equal((await review(a.id,{action:'PUBLISH',expectedRevision:6})).status,400);
  equal((await review(a.id,{action:'EDIT',expectedRevision:6,draft:draft('A')})).status,409);
  equal((await review(a.id,{action:'REJECT',expectedRevision:6,note:'TEST_ONLY'})).status,409);equal((await stored(a.id)).meaning,'TEST_ONLY_CORRECTED');
  const approvedList=await (await list('&status=APPROVED')).json();equal(approvedList.rows.map(row=>row.id),[a.id]);
  equal((await (await list('&status=PUBLISHED')).json()).rows.length,0);
  await tx`UPDATE weekly_vocabulary_words SET source_reference=NULL WHERE id=${b.id}`;
  equal((await review(b.id,{action:'SUBMIT',expectedRevision:1})).status,409);
  await tx`UPDATE weekly_vocabulary_words SET status='IN_REVIEW' WHERE id=${b.id}`;
  equal((await review(b.id,{action:'APPROVE',expectedRevision:1,confirmedSource:true,note:'TEST_ONLY'})).status,409);
  equal((await review(b.id,{action:'REJECT',expectedRevision:1,note:'TEST_ONLY_FIX_SOURCE'})).status,200);
  equal((await review(b.id,{action:'EDIT',expectedRevision:2,draft:draft('B')})).status,200);equal((await stored(b.id)).source_reference,'TEST_ONLY_ROLLBACK_SOURCE');
  await tx`UPDATE weekly_vocabulary_words SET status='PUBLISHED',reviewed_by=${admin} WHERE id=${b.id}`;
  const published=await stored(b.id);
  equal((await review(b.id,{action:'EDIT',expectedRevision:3,draft:draft('B')})).status,409);equal((await stored(b.id)).meaning,published.meaning);
  equal((await importRows([draft('B')])).status,409);
  equal((await review(randomUUID(),{action:'SUBMIT',expectedRevision:1})).status,404);
  // Pagination and literal search must not leak other class rows or treat '%' as a wildcard.
  equal((await importRows(Array.from({length:51},(_,i)=>draft('PAGE'+String(i).padStart(2,'0'))),'JSS3')).status,200);
  const pageOne=await (await collection.GET(new Request('https://avora-test.invalid?classLevel=JSS3&search='+prefix))).json();equal(pageOne.rows.length,50);equal(pageOne.hasMore,true);
  const pageTwo=await (await collection.GET(new Request('https://avora-test.invalid?classLevel=JSS3&search='+prefix+'&page=2'))).json();equal(pageTwo.rows.length,1);equal(pageTwo.hasMore,false);
  equal(pageOne.rows.some(row=>row.id===pageTwo.rows[0].id),false);
  equal((await (await collection.GET(new Request('https://avora-test.invalid?classLevel=JSS3&search=%25'))).json()).rows.some(row=>row.word.startsWith(prefix)),false);
  for(const role of [null,'STUDENT','PARENT','TEACHER']){
   session=role?{userId:admin,role}:null;
   equal((await list()).status,403);equal((await importRows([draft('DENIED')])).status,403);
   equal((await review(a.id,{action:'SUBMIT',expectedRevision:6})).status,403);
  }
  equal((await stored(a.id)).status,'APPROVED');
  throw new Error(marker);
 });}catch(error){if(error.message!==marker)throw error;rolledBack=true}
 equal((await sql`SELECT count(*)::int n FROM users WHERE id=${admin}`)[0].n,0);
 equal((await sql`SELECT count(*)::int n FROM weekly_vocabulary_words WHERE strpos(word,${prefix})=1`)[0].n,0);
 return {checks,rolledBack};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const sql=process.env.AVORA_DATABASE_TRANSPORT==='neon-websocket'?(await import('../lib/neonDevelopmentDb.ts')).createNeonDevelopmentSql(process.env.DATABASE_URL):postgres(process.env.DATABASE_URL,{ssl:'require',max:1});
 try{console.log(JSON.stringify(await verifyWeeklyWordBank(sql)))}finally{await sql.end()}
}
