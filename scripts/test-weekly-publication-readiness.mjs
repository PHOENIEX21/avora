import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const review=readFileSync(new URL('../app/api/admin/weekly/objectives/review/route.ts',import.meta.url),'utf8');
const readiness=readFileSync(new URL('../app/api/admin/weekly/readiness/route.ts',import.meta.url),'utf8');
test('ZIP Phase 2b requires six reviewed items before objective publication',()=>{
 assert.match(review,/approved_items/);
 assert.match(review,/Number\(ready\?\.approved_items\)<6/);
 assert.match(review,/i\.reviewer_id IS NOT NULL/);
 assert.match(review,/i\.answer_key IS NOT NULL/);
});
test('ZIP Phase 2b requires an assembled reviewed exam before publishing',()=>{
 assert.match(review,/weekly_exam_items/);
 assert.match(review,/Number\(ready\?\.assembled_exam_items\)<1/);
});
test('week release separately verifies all subjects and English Daily',()=>{
 assert.match(readiness,/weekly_class_subjects/);
 assert.match(readiness,/weekly_english_daily_plan/);
 assert.match(readiness,/weeklyReleaseReadiness/);
});
test('publication guard precedes status mutation',()=>{
 assert.ok(review.indexOf("if(action==='PUBLISH')")<review.indexOf('UPDATE weekly_curriculum_objectives'));
});
