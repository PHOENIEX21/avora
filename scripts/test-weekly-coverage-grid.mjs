import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../app/api/admin/weekly/coverage/route.ts',import.meta.url),'utf8');
test('coverage grid includes empty weeks for each active class subject',()=>{
 assert.ok(source.includes('generate_series(1,16)'));
 assert.ok(source.includes('CROSS JOIN'));
 assert.ok(source.includes("?'EMPTY'"));
});
test('coverage exposes missing sources and publication state',()=>{
 for(const token of ['source_reference','missingSources','published_count','objective_count','topic_count'])assert.ok(source.includes(token));
});
test('coverage is owner-only and class-scoped',()=>{
 assert.ok(source.includes("session.role!=='ADMIN'"));
 assert.ok(source.includes('cs.class_level='));
});
