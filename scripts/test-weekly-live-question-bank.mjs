import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
for(const path of ['../app/api/admin/weekly/readiness/route.ts','../app/api/admin/weekly/flags/route.ts']){
 const source=readFileSync(new URL(path,import.meta.url),'utf8');
 test(`${path} requires distinct subjects with reviewed live banks`,()=>{
  for(const fragment of ['weekly_topic_question_sets','weekly_topic_question_memberships',"m.pool='LIVE'",'count(DISTINCT qs.subject_name)', 'BETWEEN 40 AND 50', 'i.reviewed_at IS NOT NULL'])assert.ok(source.includes(fragment),fragment);
 });
}
