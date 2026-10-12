import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=resolve(import.meta.dirname,'..'),out='/tmp/avora-words-visual';mkdirSync(out,{recursive:true});
const {build}=await import(pathToFileURL(process.env.AVORA_ESBUILD_PATH||'/tmp/avora-visual-tools/node_modules/esbuild/lib/main.js'));
const {chromium}=await import('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
await build({entryPoints:[resolve(root,'scripts/fixtures/weekly-words-visual.tsx')],bundle:true,outfile:out+'/bundle.js',jsx:'automatic',nodePaths:[root+'/node_modules'],plugins:[{name:'fixture-navigation',setup(b){
 b.onResolve({filter:/^next\/link$/},args=>({path:args.path,namespace:'fixture'}));
 b.onLoad({filter:/.*/,namespace:'fixture'},()=>({loader:'js',resolveDir:root,contents:'import React from "react";export default function Link(p){return React.createElement("a",p,p.children)}'}));
}}]});
const server=createServer((req,res)=>{const asset=req.url==='/bundle.js'?'bundle.js':req.url==='/bundle.css'?'bundle.css':null;
 res.setHeader('Content-Type',asset?.endsWith('.js')?'text/javascript':asset?'text/css':'text/html');
 res.end(asset?readFileSync(out+'/'+asset):'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/bundle.css"></head><body><div id="root"></div><script src="/bundle.js"></script></body></html>')});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try{for(const width of [360,390,412,1280]){
 const page=await browser.newPage({viewport:{width,height:850}}),errors=[];page.on('pageerror',error=>errors.push(error.message));
 let rows=[],failImport=true,failLoad=false;
 const fixture={id:'11111111-1111-4111-8111-111111111111',class_level:'JSS1',word:'TEST_ONLY review word',part_of_speech:'TEST_ONLY',meaning:'TEST_ONLY meaning, not approved teaching content.',
  example_sentences:['TEST_ONLY example, not curriculum.'],source_reference:'TEST_ONLY source reference for browser review',related_form:'TEST_ONLY',pronunciation_hint:null,status:'DRAFT',revision:1,reviewed_at:null,review_note:null};
 await page.route('**/api/admin/weekly/words**',async route=>{
  const request=route.request(),url=new URL(request.url());
  if(request.method()==='GET'){
   if(failLoad){failLoad=false;return route.fulfill({status:503,json:{error:'TEST_ONLY load failure'}})}
   let filtered=rows.filter(row=>row.class_level===url.searchParams.get('classLevel'));
   if(url.searchParams.get('status'))filtered=filtered.filter(row=>row.status===url.searchParams.get('status'));
   if(url.searchParams.get('search'))filtered=filtered.filter(row=>row.word.includes(url.searchParams.get('search')));
   return route.fulfill({json:{rows:filtered,hasMore:false,page:1}});
  }
  if(request.method()==='POST'){
   assert.ok(request.postData().includes('TEST_ONLY'));
   if(failImport){failImport=false;return route.fulfill({status:503,json:{error:'TEST_ONLY import failure; no rows saved'}})}
   assert.equal(url.searchParams.get('classLevel'),'JSS1');rows=[{...fixture}];return route.fulfill({json:{ok:true,inserted:1,status:'DRAFT'}});
  }
  const body=request.postDataJSON(),row=rows[0];assert.equal(body.expectedRevision,row.revision);
  if(body.action==='EDIT'){assert.equal(row.status,'DRAFT');row.meaning=body.draft.meaning;row.example_sentences=body.draft.examples;row.revision++}
  else if(body.action==='SUBMIT'){assert.equal(row.status,'DRAFT');row.status='IN_REVIEW';row.revision++}
  else if(body.action==='REJECT'){row.status='DRAFT';row.review_note=body.note;row.revision++}
  else{assert.equal(body.action,'APPROVE');assert.equal(body.confirmedSource,true);row.status='APPROVED';row.review_note=body.note;row.reviewed_at='2026-10-12T12:00:00Z';row.revision++}
  return route.fulfill({json:{ok:true,word:row}});
 });
 await page.goto(base);await page.getByText('No words found.',{exact:true}).waitFor();
 const csv='word,partOfSpeech,meaning,example1,sourceReference\nTEST_ONLY,TEST_ONLY,TEST_ONLY,TEST_ONLY,TEST_ONLY';
 await page.getByLabel('CSV file',{exact:true}).setInputFiles({name:'TEST_ONLY.csv',mimeType:'text/csv',buffer:Buffer.from(csv)});
 await page.getByRole('button',{name:'Import drafts',exact:true}).click();await page.getByRole('alert').waitFor();assert.equal(await page.getByRole('button',{name:/TEST_ONLY review word/}).count(),0);
 await page.getByRole('button',{name:'Import drafts',exact:true}).click();await page.getByText('1 draft word saved',{exact:true}).waitFor();
 await page.getByRole('button',{name:/TEST_ONLY review word/}).click();await page.getByRole('heading',{name:'TEST_ONLY review word',exact:true}).waitFor();
 await page.getByRole('button',{name:'Edit draft',exact:true}).click();await page.getByLabel('Meaning',{exact:true}).fill('TEST_ONLY edited meaning');
 await page.getByLabel('Example 2',{exact:true}).fill('TEST_ONLY second example');await page.getByRole('button',{name:'Save draft',exact:true}).click();await page.getByText('Draft saved',{exact:true}).waitFor();
 await page.getByText('TEST_ONLY edited meaning',{exact:true}).waitFor();assert.equal(rows[0].example_sentences.length,2);
 await page.getByRole('button',{name:'Send for review',exact:true}).click();await page.getByRole('button',{name:'Approve content',exact:true}).waitFor();
 const approve=page.getByRole('button',{name:'Approve content',exact:true});assert.ok(await approve.isDisabled());
 await page.getByLabel('Review note',{exact:true}).fill('TEST_ONLY checked source and examples');assert.ok(await approve.isDisabled());
 await page.getByLabel('I checked the source, meaning and examples.',{exact:true}).check();assert.ok(await approve.isEnabled());
 await page.screenshot({path:out+'/review-'+width+'.png',fullPage:true});
 await page.getByRole('button',{name:'Return to draft',exact:true}).click();await page.getByRole('button',{name:'Send for review',exact:true}).waitFor();
 await page.getByRole('button',{name:'Send for review',exact:true}).click();await page.getByLabel('Review note',{exact:true}).fill('TEST_ONLY final owner review');await page.getByLabel('I checked the source, meaning and examples.',{exact:true}).check();await approve.click();
 await page.getByText('Word approved',{exact:true}).waitFor();assert.equal(await page.getByRole('button',{name:'Edit draft',exact:true}).count(),0);assert.equal(await page.getByRole('button',{name:/Publish/}).count(),0);
 await page.reload();await page.getByRole('button',{name:/TEST_ONLY review word/}).click();await page.getByText('TEST_ONLY final owner review',{exact:true}).waitFor();
 await page.screenshot({path:out+'/approved-'+width+'.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 for(const button of await page.getByRole('button').all()){if(await button.isVisible()){const box=await button.boundingBox();assert.ok(box.height>=44)}}
 await page.getByLabel('Status',{exact:true}).selectOption('PUBLISHED');await page.getByText('No words found.',{exact:true}).waitFor();
 await page.getByLabel('Class',{exact:true}).selectOption('JSS2');await page.getByText('No words found.',{exact:true}).waitFor();
 failLoad=true;await page.getByRole('button',{name:'Reload word bank'}).click();await page.getByRole('alert').waitFor();await page.getByRole('button',{name:'Reload word bank'}).click();await page.getByText('No words found.',{exact:true}).waitFor();
 assert.deepEqual(errors,[]);console.log('PASS owner word-bank import/retry/file/edit/review/reload/class/status and phone layout at '+width+'px');await page.close();
}}finally{await browser.close();await new Promise(r=>server.close(r))}
