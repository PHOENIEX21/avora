import {sql,withDbRetry} from './db';
export async function heldOfficialQuestionIds(ids:string[]){
 if(!ids.length)return new Set<string>();
 const rows=await withDbRetry(()=>sql`SELECT DISTINCT membership.question_id FROM weekly_exam_version_questions membership
  JOIN weekly_exam_versions version ON version.id=membership.version_id AND (version.status='LOCKED' OR
   (version.status='SUPERSEDED' AND EXISTS(SELECT 1 FROM exam_sessions active WHERE active.weekly_exam_version_id=version.id)))
  JOIN weekly_exam_blueprints blueprint ON blueprint.id=version.blueprint_id
  WHERE membership.question_id=ANY(${ids}::uuid[]) AND blueprint.status IN ('APPROVED','SCHEDULED','LIVE','CLOSED')
   AND (blueprint.closes_at IS NULL OR clock_timestamp()<blueprint.closes_at)`);
 return new Set(rows.map(row=>String(row.question_id)));
}
export async function withoutHeldOfficialQuestions<T extends Record<string,unknown>>(rows:T[]){
 const held=await heldOfficialQuestionIds(rows.map(row=>String(row.id)));return rows.filter(row=>!held.has(String(row.id)));
}
