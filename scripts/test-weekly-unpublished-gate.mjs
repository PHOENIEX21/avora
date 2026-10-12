import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
for(const path of ['../app/api/admin/weekly/readiness/route.ts','../app/api/admin/weekly/flags/route.ts']){
 const s=readFileSync(new URL(path,import.meta.url),'utf8');
 test(path+' blocks any unpublished objective, even when another objective is published',()=>{
  assert.ok(s.includes('all_objectives AS ('),'all objectives must be independently counted');
  assert.ok(s.includes("approval_status<>'PUBLISHED' OR published_at IS NULL"));
  assert.ok(s.includes('unpublished_objectives'));
 });
}
