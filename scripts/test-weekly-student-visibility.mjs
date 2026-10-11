import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const route=readFileSync(new URL('../app/api/weekly/objectives/route.ts',import.meta.url),'utf8');
test('weekly objectives require release and enrollment',()=>{
 for(const required of ['getDawnGate','weekly_class_week_state',"approval_status='PUBLISHED'",'weekly_class_subjects','weekly_student_optional_subjects'])assert.ok(route.includes(required),required);
});
