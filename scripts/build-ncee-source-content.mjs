import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const srcDir=path.join(root,'data','ncee-sources','v14.8');
const outFile=path.join(root,'data','ncee-source-content-v14.8.json');
const completionFile=path.join(root,'data','ncee-completion-v14.8.1.json');
const completion=JSON.parse(fs.readFileSync(completionFile,'utf8'));
const depthFile=path.join(root,'data','ncee-depth-supplements-v14.8.1.json');
const depth=JSON.parse(fs.readFileSync(depthFile,'utf8'));
const files=fs.readdirSync(srcDir).filter(x=>x.endsWith('.md')).sort();
const clean=s=>s.replace(/\*\*/g,'').replace(/^\*|\*$/g,'').trim();
const slug=s=>s.toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function metaFrom(name,text){
 const cls=/Primary5/.test(name)?'Primary 5':/Primary6/.test(name)?'Primary 6':/Primary 5/.test(text)?'Primary 5':/Primary 6/.test(text)?'Primary 6':null;
 let subject=null,domain=null,term=null;
 if(/Maths_/.test(name)){subject='Mathematics';domain='Mathematics'}
 else if(/English_/.test(name)){subject='English Studies';domain='English Studies'}
 else if(/QuantitativeReasoning/.test(name)){subject='Quantitative Reasoning';domain='Quantitative & Vocational Aptitude'}
 else if(/VerbalReasoning/.test(name)){subject='Verbal Reasoning';domain='Verbal Aptitude'}
 else if(/GeneralPaper/.test(name)){subject='General Paper'}
 const m=text.match(/^##\s+Primary [56],\s+([^\n(]+)/m); if(m) term=m[1].trim();
 return {cls,subject,domain,term};
}
function studentSafeLine(line){
 const s=line.trim();
 if(!s) return '';
 if(/^---+$/.test(s)) return '';
 if(/Avora should|Avora must|Content Development Notes|Continuing (next )?to|This completes .*ENTIRE NCEE curriculum/i.test(s)) return '';
 if(/^\*Note on depth/i.test(s)) return '';
 if(/^\*Note: .*Deep Teaching Standard/i.test(s)) return '';
 if(/current President of Nigeria/i.test(s)) return ''; // dynamic fact: never freeze into static lesson
 return s;
}
function splitTopicBlocks(name,text){
 const lines=text.split(/\r?\n/); const meta=metaFrom(name,text); const blocks=[];
 if(!meta.cls||!meta.subject) return blocks;
 if(meta.subject==='General Paper'){
   let partDomain=null, current=null;
   for(let i=0;i<lines.length;i++){
     const l=lines[i];
     if(/^## Part A:/i.test(l)){partDomain='Basic Science & Technology';continue}
     if(/^## Part B:/i.test(l)){partDomain='National Values Education';continue}
     const h=l.match(/^###\s+\d+\.\s+(.+)/);
     if(h&&partDomain){if(current)blocks.push(current);current={title:clean(h[1]),domain:partDomain,start:i+1,lines:[]};continue}
     if(current)current.lines.push(l);
   }
   if(current)blocks.push(current);
 } else if(meta.subject==='English Studies'){
   let strand=null,current=null;
   for(let i=0;i<lines.length;i++){
     const sh=lines[i].match(/^##\s+Strand\s+\d+:\s+(.+)/i);
     const h3=lines[i].match(/^###\s+(?:\d+\.\d+\s+)?(.+)/);
     if(sh){if(current)blocks.push(current); strand=clean(sh[1]); current={title:strand,domain:meta.domain,start:i+1,lines:[],strand,hasChild:false};continue}
     if(h3&&strand){
       if(current && current.lines.some(x=>studentSafeLine(x))) blocks.push(current);
       current={title:clean(h3[1]),domain:meta.domain,start:i+1,lines:[],strand,hasChild:true};continue;
     }
     if(current)current.lines.push(lines[i]);
   }
   if(current&&current.lines.some(x=>studentSafeLine(x)))blocks.push(current);
 } else {
   let current=null;
   for(let i=0;i<lines.length;i++){
     const h=lines[i].match(/^##\s+Topic\s+\d+:\s+(.+)/i);
     if(h){if(current)blocks.push(current);current={title:clean(h[1]),domain:meta.domain,start:i+1,lines:[]};continue}
     if(current)current.lines.push(lines[i]);
   }
   if(current)blocks.push(current);
 }
 return blocks.map(b=>({...b,...meta,domain:b.domain||meta.domain}));
}
function parseBlock(b,name){
 const safe=b.lines.map(studentSafeLine).filter(Boolean);
 const concepts=[],workedExamples=[],practiceQuestions=[],subtopics=[];
 let mode='concept', buf=[];
 const flush=()=>{if(!buf.length)return;const t=buf.join(' ').replace(/\s+/g,' ').trim();if(!t){buf=[];return;}if(mode==='worked')workedExamples.push(t);else if(mode==='practice')practiceQuestions.push(t.replace(/^\d+\.\s*/,''));else concepts.push(t);buf=[];};
 for(const raw of safe){
   if(/^###\s+/.test(raw)){flush();subtopics.push(clean(raw.replace(/^###\s+/,'').replace(/^\d+\.\d+\s+/,'')));mode='concept';continue}
   if(/^\*\*Step\s+/i.test(raw)){flush();concepts.push(clean(raw));mode='concept';continue}
   if(/^\*\*Worked Example/i.test(raw)){flush();mode='worked';const rest=clean(raw).replace(/^Worked Example(?:\s*\([^)]*\))?:?\s*/i,'');if(rest)buf.push(rest);continue}
   if(/^\*\*Practice Questions?:?\*\*/i.test(raw)){flush();mode='practice';continue}
   if(/^\*\*Sample passage:/i.test(raw)){flush();mode='worked';buf.push(clean(raw));continue}
   if(/^\*\*Worked Example/i.test(clean(raw))){flush();mode='worked';buf.push(clean(raw));continue}
   if((mode==='practice' || /practice set|objective practice/i.test(b.title)) && /^\d+\.\s+/.test(raw)){flush();mode='practice';buf.push(clean(raw));flush();continue}
   if(/^\|[-| :]+\|$/.test(raw))continue;
   if(/^\|/.test(raw)){ // table row -> readable board line, never markdown syntax
     const cells=raw.split('|').map(x=>x.trim()).filter(Boolean); if(cells.length)buf.push(cells.join(' → ')); continue;
   }
   if(/^#/.test(raw))continue;
   buf.push(clean(raw));
 }
 flush();
 // Filter accidental author/meta instructions again at field level.
 const ok=s=>s && !/Avora should|Avora must|Originally Derived|Source step|Content Development Notes/i.test(s) && !/JSS[123]\s*T[123]/i.test(s);
 return {
   id:`ncee-source-${b.cls==='Primary 5'?'p5':'p6'}-${slug(b.domain)}-${slug(b.term||'all')}-${slug(b.title)}`,
   classLevel:b.cls, domain:b.domain, subject:b.subject, term:b.term||'All Terms', title:b.title,
   strand:b.strand||null, subtopics,
   concepts:concepts.filter(ok),workedExamples:workedExamples.filter(ok),practiceQuestions:practiceQuestions.filter(ok),
   sourceFile:name, sourceLineStart:b.start,
   contentStatus:(concepts.filter(ok).length+workedExamples.filter(ok).length>0)?'TEACHING_READY':'PRACTICE_ONLY',
 };
}
const lessonFiles=files.filter(f=>!f.includes('CBT_')&&!f.includes('Curriculum_'));
let topics=[];
for(const name of lessonFiles){const text=fs.readFileSync(path.join(srcDir,name),'utf8');for(const b of splitTopicBlocks(name,text))topics.push(parseBlock(b,name));}
// Avoid empty pseudo-blocks created by strand headers immediately followed by child headings.
topics=topics.filter(t=>t.concepts.length+t.workedExamples.length+t.practiceQuestions.length>0);

// V14.8.1: reconcile source-only gaps before anything becomes learner-visible.
// Genuine teaching gaps receive authored, topic-specific completion content.
// Timed mixed-practice blocks remain assessment material and are never presented as lessons.
const completionIds=new Set(Object.keys(completion.overrides||{}));
const assessmentOnlyIds=new Set(completion.assessmentOnlyIds||[]);
topics=topics.map(t=>{
  if(assessmentOnlyIds.has(t.id)) return {...t,contentStatus:'ASSESSMENT_ONLY'};
  const o=completion.overrides?.[t.id];
  if(!o) return t;
  return {...t,concepts:o.concepts,workedExamples:o.workedExamples,practiceQuestions:o.practiceQuestions,contentStatus:'TEACHING_READY',completionBasis:o.completionBasis,completionVersion:'14.8.1'};
});

// Every learner-visible lesson must have a real explanatory floor. Source material stays first;
// static AVORA-authored supplements only fill missing phases. Nothing is fabricated at runtime.
const mins=depth.minimumLearnerLesson;
const addUnique=(base,extra,min)=>{const out=[...base];for(const item of extra||[]){if(out.length>=min)break;if(!out.includes(item))out.push(item)}return out};
topics=topics.map(t=>{
  if(t.contentStatus!=='TEACHING_READY') return t;
  const sup=depth.supplements?.[t.id];
  if(!sup) throw new Error(`Missing NCEE depth supplement for learner lesson ${t.id}`);
  return {...t,
    concepts:addUnique(t.concepts,sup.concepts,mins.concepts),
    workedExamples:addUnique(t.workedExamples,sup.workedExamples,mins.workedExamples),
    practiceQuestions:addUnique(t.practiceQuestions,sup.practiceQuestions,mins.practiceQuestions),
    depthCompletionVersion:'14.8.1',
  };
});

const sourceFiles=files.map(name=>({name,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(srcDir,name))).digest('hex')}));
const result={version:'14.8.1',generatedAt:'SOURCE_BUILD',sourceFiles,topics,policy:{studentSafe:true,dynamicCurrentAffairsExcluded:true,rawMarkdownTablesNeverSpoken:true,authorInstructionsNeverSpoken:true,officialExamStructureSource:'NECO 2026 NCEE timetable/general information',learnerCatalogueRequiresCompleteTeaching:true,practiceOnlyNeverLearnerVisible:true,timedPracticeSetsAreAssessmentsNotLessons:true,currentAffairsVerifiedAt:completion.verifiedAt}};
fs.writeFileSync(outFile,JSON.stringify(result,null,2)+'\n');
console.log(`Built ${topics.length} student-safe NCEE source topics from ${lessonFiles.length} lesson source files.`);
const by={};for(const t of topics){const k=`${t.classLevel}|${t.domain}`;by[k]=(by[k]||0)+1;}console.log(by);
