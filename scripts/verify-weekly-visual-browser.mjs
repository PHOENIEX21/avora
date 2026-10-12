import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=resolve(import.meta.dirname,'..'),out='/tmp/avora-weekly-visual';mkdirSync(out,{recursive:true});
const {build}=await import(pathToFileURL(process.env.AVORA_ESBUILD_PATH||'/tmp/avora-visual-tools/node_modules/esbuild/lib/main.js'));
const {chromium}=await import('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
await build({entryPoints:[resolve(root,'scripts/fixtures/weekly-visual.tsx')],bundle:true,outfile:out+'/bundle.js',jsx:'automatic',nodePaths:[root+'/node_modules'],plugins:[{name:'fixture-navigation',setup(b){
 b.onResolve({filter:/^next\/(link|navigation)$/},args=>({path:args.path,namespace:'fixture'}));
 b.onLoad({filter:/.*/,namespace:'fixture'},args=>({loader:'js',resolveDir:root,contents:args.path==='next/link'?'import React from "react";export default function Link(p){return React.createElement("a",p,p.children)}':'const router={push(url){window.__lastRoute=url},refresh(){window.dispatchEvent(new Event("fixture-refresh"))}};export function useRouter(){return router}'}));
}}]});
const server=createServer((req,res)=>{const asset=req.url==='/bundle.js'?'bundle.js':req.url==='/bundle.css'?'bundle.css':null;res.setHeader('Content-Type',asset?.endsWith('.js')?'text/javascript':asset?'text/css':'text/html');res.end(asset?readFileSync(out+'/'+asset):'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/bundle.css"></head><body><div id="root"></div><script src="/bundle.js"></script></body></html>')});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try{for(const width of [360,390,412,1280]){
 const page=await browser.newPage({viewport:{width,height:800}}),errors=[];let fail=true;
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('**/api/weekly/study',async route=>{const data=route.request().postDataJSON();assert.equal(data.objectiveId,'11111111-1111-4111-8111-111111111111');
  if(fail){fail=false;return route.fulfill({status:503,json:{error:'TEST_ONLY temporary save failure'}})}
  await page.evaluate(data=>{const stored=JSON.parse(localStorage.getItem('AVORA_TEST_ONLY_STUDY')||'{}');stored[data.objectiveId]=data;localStorage.setItem('AVORA_TEST_ONLY_STUDY',JSON.stringify(stored))},data);
  return route.fulfill({json:{ok:true}});
 });
 await page.goto(base+'/weekly');await page.getByRole('heading',{name:'Week 2'}).waitFor();
 const subjects=page.getByRole('region',{name:'Weekly subjects'});assert.equal(await subjects.getByRole('button').filter({visible:true}).count(),4);
 await page.getByText('2 more subjects',{exact:true}).click();assert.equal(await subjects.getByRole('button').filter({visible:true}).count(),6);
 await page.screenshot({path:out+'/subjects-'+width+'.png',fullPage:true});
 await subjects.getByRole('button',{name:/Mathematics/}).click();await page.getByRole('heading',{name:'TEST_ONLY topic with a long title for phone wrapping'}).waitFor();
 const article=page.locator('article').first();await article.getByRole('button',{name:'My textbook'}).click();await page.getByRole('alert').waitFor();
 assert.equal(await article.getByRole('button',{name:'My textbook'}).getAttribute('aria-pressed'),'false');
 await article.getByRole('button',{name:'My textbook'}).click();await article.getByText('Studying',{exact:true}).waitFor();
 assert.equal(await article.getByRole('button',{name:'My textbook'}).getAttribute('aria-pressed'),'true');
 await article.getByRole('button',{name:'Mark studied'}).click();await article.getByRole('button',{name:'Studied',exact:true}).waitFor();
 await page.screenshot({path:out+'/objectives-'+width+'.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const selected=article.getByRole('button',{name:'My textbook'});
 await selected.evaluate(el=>Promise.all(el.getAnimations().map(animation=>animation.finished)));
 const contrast=await selected.evaluate(el=>({fg:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
 function luminance(rgb){const values=rgb.match(/\d+/g).slice(0,3).map(value=>{const v=Number(value)/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return values[0]*.2126+values[1]*.7152+values[2]*.0722}
 const light=Math.max(luminance(contrast.fg),luminance(contrast.bg)),dark=Math.min(luminance(contrast.fg),luminance(contrast.bg));assert.ok((light+.05)/(dark+.05)>=4.5);
 for(const button of await page.getByRole('button').all()){if(await button.isVisible()){const box=await button.boundingBox();assert.ok(box.height>=44)}}
 await page.reload();await page.getByRole('region',{name:'Weekly subjects'}).getByRole('button',{name:/Mathematics/}).click();assert.ok(await page.getByRole('button',{name:'Studied',exact:true}).isDisabled());
 assert.equal(await article.getByText('Mastered',{exact:true}).count(),0);
 const practice=await article.getByRole('link',{name:/Practise/}).getAttribute('href');assert.equal(practice,'/weekly/practice?objectiveId=11111111-1111-4111-8111-111111111111');
 await page.getByLabel('Choose released week').selectOption('1:1');assert.equal(await page.evaluate(()=>window.__lastRoute),'/weekly?term=1&week=1');
 await page.goto(base+'/history');await page.getByRole('region',{name:'Weekly subjects'}).getByRole('button',{name:/Mathematics/}).click();assert.ok(await article.getByRole('button',{name:'My textbook'}).isDisabled());assert.equal(await page.getByRole('button',{name:'Mark studied'}).count(),0);await article.getByRole('link',{name:'Review lesson'}).waitFor();
 await page.goto(base+'/empty');await page.getByRole('heading',{name:'Your weekly plan is being prepared'}).waitFor();assert.equal(await page.locator('article').count(),0);
 let time='18:00';await page.route('**/api/weekly/study-settings',route=>{if(route.request().method()==='PUT')time=route.request().postDataJSON().studyTime;return route.fulfill({json:{settings:{study_period:'EVENING',study_time:time}}})});
 await page.goto(base+'/settings');await page.getByRole('button',{name:'Save study time'}).waitFor();await page.getByLabel('Time',{exact:true}).fill('19:30');await page.getByRole('button',{name:'Save study time'}).click();await page.getByText('Study time saved.',{exact:true}).waitFor();await page.reload();await page.waitForFunction(()=>document.getElementById('study-time')?.value==='19:30');
 await page.route('**/api/weekly/practice',route=>{const data=route.request().postDataJSON();return route.fulfill({json:data.action==='START'?{id:'TEST_ONLY',submitted:false,questions:Array.from({length:5},(_,i)=>({id:String(i),prompt:'TEST_ONLY practice prompt with long wrapping text '+i,options:['One','Two','Three','Four'],saved:null}))}:data.action==='ANSWER'?{correct:true,correctAnswer:'Two',explanation:'TEST_ONLY reviewed explanation'}:{ok:true}})});
 await page.goto(base+'/practice');await page.getByText('Question 1 of 5',{exact:true}).waitFor();await page.getByRole('button',{name:'B Two',exact:true}).click();await page.getByRole('button',{name:'Sure',exact:true}).click();await page.getByRole('button',{name:'Check answer'}).click();await page.getByText('TEST_ONLY reviewed explanation',{exact:true}).waitFor();await page.getByRole('button',{name:'Next',exact:true}).click();await page.getByText('Question 2 of 5',{exact:true}).waitFor();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);console.log('PASS weekly subjects/objectives, retry/study/reload/history, practice and settings at '+width+'px');await page.close();
}}finally{await browser.close();await new Promise(r=>server.close(r))}
