import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
const source=readFileSync(new URL('../lib/weeklyCurriculumCsv.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const testModule={exports:{}};
new Function('module','exports',compiled)(testModule,testModule.exports);
const {parseCurriculumCsv}=testModule.exports;
const header='classLevel,subjectName,term,weekNumber,dayIndex,topicTitle,objectiveText,sourceReference,curriculumTopicId';
test('CSV accepts quoted comma and newline and preserves source',()=>{
 const rows=parseCurriculumCsv(header+'\nJSS1,Mathematics,1,1,1,"Numbers, fractions","Identify\nfractions",NERDC-2025,topic-1');
 assert.equal(rows.length,1);assert.equal(rows[0].topicTitle,'Numbers, fractions');
 assert.equal(rows[0].objectiveText,'Identify\nfractions');
});
test('CSV rejects malformed and unreviewable content',()=>{
 assert.throws(()=>parseCurriculumCsv(header+'\nJSS1,Math,1,1,1,"unclosed,objective,source,id'));
 assert.throws(()=>parseCurriculumCsv(header+'\nJSS1,Math,1'));
 assert.throws(()=>parseCurriculumCsv('a,a\n1,2'));
});
test('learner release requires published and active week',()=>{
 const source=readFileSync(new URL('../app/api/weekly/objectives/route.ts',import.meta.url),'utf8');
 assert.match(source,/approval_status='PUBLISHED'/);
 assert.match(source,/weekly_class_week_state/);
 assert.match(source,/isWeeklyLearningEnabled/);
});
