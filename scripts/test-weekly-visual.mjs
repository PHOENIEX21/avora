import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url),mod={exports:{}};
const code=ts.transpileModule(readFileSync(new URL('../lib/weeklyVisual.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
new Function('module','exports',code)(mod,mod.exports);
const {weeklySubjectColour,weeklyObjectiveState}=mod.exports;
const objective=(overrides={})=>({studied:false,studySource:null,progress:{status:'NOT_STARTED',evidence:0},...overrides});
test('subject gems retain distinct reference colours and stable case-insensitive aliases',()=>{
 assert.equal(weeklySubjectColour('English Language'),weeklySubjectColour(' english '));
 assert.equal(new Set(['English','Mathematics','Basic Science','Civic Education'].map(weeklySubjectColour)).size,4);
 assert.equal(weeklySubjectColour('Unknown optional subject'),weeklySubjectColour('Another unknown subject'));
});
test('studying and study completion never appear as mastery',()=>{
 assert.equal(weeklyObjectiveState(objective()).label,'Not started');
 assert.equal(weeklyObjectiveState(objective({studySource:'TEXTBOOK'})).label,'Studying');
 assert.equal(weeklyObjectiveState(objective({studied:true,studySource:'TEXTBOOK'})).label,'Studied');
 assert.equal(weeklyObjectiveState(objective({studied:true,progress:{status:'IN_PROGRESS',evidence:1}})).label,'Practising');
 assert.equal(weeklyObjectiveState(objective({progress:{status:'STRUGGLING',evidence:7}})).label,'Needs practice');
 assert.equal(weeklyObjectiveState(objective({progress:{status:'MASTERED',evidence:7}})).label,'Mastered');
});
test('overview renders only supplied released subjects and objective progress, not mockup content',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
 const componentModule={exports:{}};
 const js=ts.transpileModule(readFileSync(new URL('../components/WeeklyDashboard.tsx',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 new Function('module','exports','require',js)(componentModule,componentModule.exports,name=>{
  if(name==='next/link')return {default:({children,...props})=>React.createElement('a',props,children)};
  if(name==='next/navigation')return {useRouter:()=>({push(){},refresh(){}})};
  if(name==='@/lib/weeklyVisual')return mod.exports;
  if(name.endsWith('.module.css'))return {default:new Proxy({},{get:(_,key)=>String(key)})};
  return require(name);
 });
 const props={classLevel:'JSS1',term:1,week:2,currentTerm:1,currentWeek:2,weeks:[{term:1,week:1},{term:1,week:2}],objectives:[{...objective({studied:true}),id:'fixture',subject:'TEST_ONLY_SUBJECT',topic:'TEST_ONLY_TOPIC',text:'TEST_ONLY_OBJECTIVE',source:'TEST_ONLY',lessonHref:null}]};
 const html=renderToStaticMarkup(React.createElement(componentModule.exports.default,props));
 assert.match(html,/TEST_ONLY_SUBJECT/);assert.match(html,/1 subjects/);assert.match(html,/0 stars lit/);assert.match(html,/aria-label="Studied"/);
 assert.doesNotMatch(html,/Fractions: adding|Exam Sat|11 subjects/);
});
