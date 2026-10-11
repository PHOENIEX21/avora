import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const route=readFileSync(new URL('../app/api/admin/weekly/objectives/review/route.ts',import.meta.url),'utf8');
test('publication fails closed if fewer than six reviewed objective items exist',()=>{
 assert.match(route,/approved_items/);
 assert.match(route,/i\.status='APPROVED'/);
 assert.match(route,/i\.reviewer_id IS NOT NULL/);
 assert.match(route,/i\.answer_key IS NOT NULL/);
 assert.match(route,/Number\(ready\?\.approved_items\)<6/);
});
test('publication requires assembled reviewed or scheduled exam',()=>{
 assert.match(route,/weekly_exam_items/);
 assert.match(route,/weekly_exams/);
 assert.match(route,/e\.status IN \('REVIEWED','SCHEDULED'\)/);
 assert.match(route,/Number\(ready\?\.assembled_exam_items\)<1/);
});
test('all publication gates precede database publication mutation',()=>{
 assert.ok(route.indexOf("if(action==='PUBLISH')")<route.indexOf('UPDATE weekly_curriculum_objectives'));
});
