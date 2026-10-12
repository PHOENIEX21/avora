import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const route=readFileSync(new URL('../app/api/weekly/objectives/route.ts',import.meta.url),'utf8');
test('weekly objectives require release and enrollment',()=>{
 for(const required of ['getDawnGate','weekly_class_week_state',"approval_status='PUBLISHED'",'weekly_class_subjects','weekly_student_optional_subjects'])assert.ok(route.includes(required),required);
});

test('published past weeks remain readable for revisit; future weeks are blocked',()=>{
 assert.ok(route.includes('Number(state.term)<term'));
 assert.ok(route.includes('Number(state.current_week)<week'));
 assert.ok(!route.includes('Number(state.current_week)!==week'));
});
