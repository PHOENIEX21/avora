import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../lib/lessonPresentation.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};new Function('module','exports',js)(mod,mod.exports);
test('editorial annotations with nested name placeholders do not leak into narration',()=>{
 assert.equal(mod.exports.sanitizeSourceForLearner('"Dear Sir," - [Annotation: use "Dear Mr. [Surname]" when the name is known.]'),'"Dear Sir,"');
 assert.equal(mod.exports.sanitizeSourceForLearner('Body Paragraph 1: Actual authored teaching. [Annotation: editorial note.]'),'Actual authored teaching.');
});
test('ordinary authored text and name placeholders are preserved',()=>{
 assert.equal(mod.exports.sanitizeSourceForLearner('Use Dear Mr. [Surname] when the name is known.'),'Use Dear Mr. [Surname] when the name is known.');
 assert.equal(mod.exports.sanitizeSourceForLearner('This sentence contains no editorial note.'),'This sentence contains no editorial note.');
});
