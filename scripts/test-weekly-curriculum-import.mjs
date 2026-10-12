import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../app/api/admin/weekly/objectives/route.ts',import.meta.url),'utf8');
test('curriculum imports always begin in draft',()=>assert.match(source,/\x27DRAFT\x27\)/));
test('curriculum import requires source and bounded week',()=>{
 for(const token of ['sourceReference:z.string()','weekNumber:z.number().int().min(1).max(16)','dayIndex:z.number().int().min(1).max(5)'])assert.ok(source.includes(token),token);
});
test('curriculum imports are owner-only',()=>assert.match(source,/session.role!=='ADMIN'/));
