import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const review=readFileSync(new URL('../app/api/admin/weekly/objectives/review/route.ts',import.meta.url),'utf8');
const readiness=readFileSync(new URL('../app/api/admin/weekly/readiness/route.ts',import.meta.url),'utf8');
test('objective approval and publication remain separate from complete week release',()=>{
 assert.match(review,/objectiveReviewTransition/);
 assert.match(review,/approval_status=\$\{decision\.next\}/);
 assert.doesNotMatch(review,/approved_items/);
});
test('weekly release requires reviewed items and an assembled exam',()=>{
 assert.match(readiness,/approved_count<6/);
 assert.match(readiness,/weekly_exam_items/);
 assert.match(readiness,/weekly_english_daily_plan/);
 assert.match(readiness,/weeklyReleaseReadiness/);
});
test('readiness endpoint is owner-only',()=>assert.match(readiness,/session\.role!=='ADMIN'/));
