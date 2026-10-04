import fs from 'node:fs';import path from 'node:path';
const root=process.cwd();
const checks=[
 ['migration 016 exists','database/migrations/016_live_assessment_results_intervention.sql','live_assessment_reports'],
 ['topic evidence table','database/migrations/016_live_assessment_results_intervention.sql','live_assessment_topic_results'],
 ['live source remediation','database/migrations/016_live_assessment_results_intervention.sql','source_live_assessment_id'],
 ['submission updates mastery','lib/liveAssessmentFinalizer.ts','nextMasteryScore'],
 ['submission updates learner insight','lib/liveAssessmentFinalizer.ts','learner_skill_insights'],
 ['submission creates live report','lib/liveAssessmentFinalizer.ts','live_assessment_reports'],
 ['student receives topic evidence','app/live-assessment/[id]/page.tsx','live_assessment_topic_results'],
 ['student sees teaching priority','components/LiveStudentSession.tsx','NEXT TEACHING PRIORITY'],
 ['admin results centre','app/admin/live-assessments/[id]/results/page.tsx','SUPERVISED ASSESSMENT EVIDENCE'],
 ['host links results','app/admin/live-assessments/[id]/page.tsx','View assessment results & interventions'],
 ['host END finalizes in-progress learners','app/api/admin/live-assessments/[id]/route.ts','finalizeLiveAssessmentForStudent']
];
let pass=0;for(const [name,file,needle] of checks){const full=path.join(root,file);const ok=fs.existsSync(full)&&fs.readFileSync(full,'utf8').includes(needle);console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)pass++}console.log(`Live assessment results audit: ${pass}/${checks.length}`);if(pass!==checks.length)process.exit(1);
