import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
function loadCommonJs(source,filename,requireMap={}){
  const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
  const cjsModule={exports:{}};
  const localRequire=id=>{if(id in requireMap)return requireMap[id];throw new Error(`Audit cannot require ${id} from ${filename}`)};
  vm.runInNewContext(`(function(require,module,exports){${js}\n})`,{console})(localRequire,cjsModule,cjsModule.exports);
  return cjsModule.exports;
}

const engine=loadCommonJs(read('lib/lessonStepEngine.ts'),'lessonStepEngine.ts');
const presentation=loadCommonJs(read('lib/lessonPresentation.ts'),'lessonPresentation.ts',{'./lessonStepEngine':engine});
const runtime=read('lib/sentCurriculumRuntime.ts');
const start=runtime.indexOf('const sentUnits:SentUnit[]=');
const end=runtime.indexOf('\n\nconst courseName=',start);
if(start<0||end<0)throw new Error('Could not locate sentUnits in sentCurriculumRuntime.ts');
const sentLiteral=runtime.slice(start,end).replace('const sentUnits:SentUnit[]=', 'const sentUnits=');
const {sentUnits}=loadCommonJs(`${sentLiteral}\nexports.sentUnits=sentUnits;`,'sentCurriculumRuntime.sentUnits.ts');
const root=fileURLToPath(new URL('../',import.meta.url)),cache=new Map();
function loadFile(file){
 file=resolve(file);if(cache.has(file))return cache.get(file);
 if(file.endsWith('.json'))return JSON.parse(fs.readFileSync(file,'utf8'));
 const mod={exports:{}};cache.set(file,mod.exports);
 const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 vm.runInNewContext(`(function(require,module,exports){${js}\n})`,{console})(name=>{
  const target=name.startsWith('@/')?resolve(root,name.slice(2)):name.startsWith('.')?resolve(dirname(file),name):null;
  if(!target)throw new Error('Unexpected teaching audit import '+name);
  return loadFile(target.endsWith('.json')?target:target+'.ts');
 },mod,mod.exports);return mod.exports;
}
// Current-cohort JSS1 Mathematics uses the preserved NERDC deep-evidence runtime, not sentUnits.
const canonical=loadFile(resolve(root,'lib/nerdc2025Teaching.ts'));
const mathTopics=JSON.parse(read('data/nerdc-2025-official-jss1-jss2.json')).records.filter(row=>row.classLevel==='JSS1'&&row.subject==='Mathematics');
const canonicalUnits=mathTopics.flatMap(topic=>canonical.getNerdc2025DeepUnits(topic.classLevel,topic.subject,topic.topic)
 .map(unit=>({classLevel:topic.classLevel,subject:topic.subject,title:unit.title,steps:unit.sourceSteps,checks:unit.sourceChecks})));
if(mathTopics.length!==23||mathTopics.some(topic=>!canonical.getNerdc2025DeepUnits(topic.classLevel,topic.subject,topic.topic).length))
 throw new Error('Missing preserved runtime evidence for an official JSS1 Mathematics topic');
const auditedUnits=[...sentUnits,...canonicalUnits];

const violations=[];
const section=/^(?:\d+(?:\.\d+)+\s+\S|stanza\s+\d+|act\s+\d+\s*[,—–-]?\s*scene\s+\d+|passage\s+[a-z0-9]+|reading\s+extract|introduction|body\s+paragraph\s+\d+|conclusion)\s*:?\s*$/i;
const internal=/(?:\b(?:practice checkpoint|practice contract|avora should|avora must|avora will|avora's whiteboard|source step|supplied avora curriculum|learner must attempt|guided self-practice)\b|\[(?:annotation|closing\s+body)\s*:)/i;
let moments=0,checks=0;
const combos=new Set();
for(const unit of auditedUnits){
  combos.add(`${unit.classLevel}|${unit.subject}`);
  const structured=engine.structureTeachingSteps(unit.steps,unit.checks||[]);
  const output=presentation.composeLearnerSourceMoments(structured);
  moments+=output.length;
  checks+=output.filter(x=>x.requiresLearnerResponse).length;
  for(const m of output){
    const spoken=String(m.spoken||'').trim();
    if(spoken&&section.test(spoken))violations.push(`${unit.classLevel} ${unit.subject} / ${unit.title}: section heading spoken: ${spoken}`);
    if(spoken&&/^step\s+\d+\s*:/i.test(spoken))violations.push(`${unit.title}: Step prefix spoken: ${spoken}`);
    if(spoken&&internal.test(spoken))violations.push(`${unit.title}: internal note leaked: ${spoken}`);
    if(m.label?.includes('YOUR TURN')&&!m.requiresLearnerResponse)violations.push(`${unit.title}: non-check labeled YOUR TURN`);
    const original=structured.find(x=>`learner-${x.id}`===m.id);
    if(original?.boardAction==='DRAW'&&spoken&&spoken===presentation.sanitizeSourceForLearner(original.sourceText||original.narration))violations.push(`${unit.title}: raw DRAW instruction spoken`);
  }
  const authoredChecks=(unit.checks||[]).filter(Boolean).length;
  const renderedChecks=output.filter(x=>x.requiresLearnerResponse).length;
  if(renderedChecks!==authoredChecks)violations.push(`${unit.title}: authored checks ${authoredChecks}, rendered checks ${renderedChecks}`);
}
for(const c of ['JSS1|Mathematics','JSS2|Mathematics','JSS3|Mathematics','JSS1|English Language','JSS2|English Language','JSS3|English Language']){
 if(!combos.has(c))violations.push(`Missing source-backed class/subject combination: ${c}`);
}

// NCEE has its own authored-source runtime. Guard its raw source against the same leakage class.
const ncee=JSON.parse(read('data/ncee-source-content-v14.8.json'));
let nceeReady=0;
for(const topic of ncee.topics||[]){
 if(topic.contentStatus!=='TEACHING_READY')continue;
 nceeReady++;
 for(const raw of [...(topic.concepts||[]),...(topic.workedExamples||[])]){
  const text=String(raw||'').trim();
  if(internal.test(text))violations.push(`NCEE ${topic.classLevel} / ${topic.title}: internal instruction in teachable source: ${text}`);
 }
}

console.log(`Source-backed JSS units audited: ${auditedUnits.length} (${canonicalUnits.length} current-cohort JSS1 Mathematics units)`);
console.log(`Learner moments audited through real step + presentation functions: ${moments}`);
console.log(`Authored learner checks rendered: ${checks}`);
console.log(`NCEE teaching-ready topics source-guarded: ${nceeReady}`);
if(violations.length){
 console.error(`TEACHING PIPELINE REGRESSION: FAIL (${violations.length} violations)`);
 for(const v of violations.slice(0,100))console.error(`FAIL — ${v}`);
 process.exit(1);
}
console.log('TEACHING PIPELINE REGRESSION: PASS — no structural/internal leakage and only authored checks become learner questions.');
