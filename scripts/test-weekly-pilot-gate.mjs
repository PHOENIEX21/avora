import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const flags=readFileSync(new URL('../app/api/admin/weekly/flags/route.ts',import.meta.url),'utf8');
const readiness=readFileSync(new URL('../app/api/admin/weekly/readiness/route.ts',import.meta.url),'utf8');
test('pilot activation never relies only on five published weekdays',()=>{
 assert.match(flags,/weekly_class_subjects/);
 assert.match(flags,/weekly_items/);
 assert.match(flags,/weekly_exam_items/);
 assert.match(flags,/weekly_english_daily_plan/);
 assert.match(flags,/Number\(ready\?\.english_days\)!==5/);
});
test('pilot activation requires matching released class week',()=>{
 assert.match(flags,/weekly_class_week_state/);
 assert.match(flags,/Number\(state\.current_week\)!==week/);
});
test('duplicate exams for one subject cannot bypass readiness',()=>{
 assert.match(flags,/count\(DISTINCT e\.subject_name\)/i);
 assert.match(readiness,/count\(DISTINCT e\.subject_name\)/i);
});
test('pilot activation is admin only',()=>assert.match(flags,/session\.role!=='ADMIN'/));
