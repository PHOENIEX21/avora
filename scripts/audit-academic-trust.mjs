import fs from 'node:fs';
const authority=fs.readFileSync('lib/curriculumAuthority.ts','utf8');
const board=fs.readFileSync('lib/teachingBoard.ts','utf8');
const exam=fs.readFileSync('lib/examIntegrity.ts','utf8');
const checks=[
 ['official NERDC authority',authority.includes("status:'OFFICIAL'")&&authority.includes('nerdc-jss-official')],
 ['commercial textbook reference-only',authority.includes("new-general-maths-guide")&&authority.includes("status:'REFERENCE_ONLY'")],
 ['JSS1 curriculum nodes',authority.includes("classLevel:'JSS1'")],
 ['JSS2 curriculum nodes',authority.includes("classLevel:'JSS2'")],
 ['JSS3 curriculum nodes',authority.includes("classLevel:'JSS3'")],
 ['deep teaching contract',authority.includes('workedExamples')&&authority.includes('misconceptions')&&authority.includes('boardReady')],
 ['English five-strand guard',authority.includes("'Reading','Writing','Listening and Speaking','Grammatical Accuracy','Literature'")],
 ['official Mathematics inventory',authority.includes('officialMathematicsTopicInventory')&&authority.includes('Division of numbers in base 2 numerals')&&authority.includes('Measure of central tendency')],
 ['official English inventory',authority.includes('officialEnglishTopicInventory')&&authority.includes('Reading for critical evaluation')&&authority.includes('Modal forms')&&authority.includes('Non-African folktales')],
 ['topic inventory can exist before lesson content',authority.includes("lessonStatus:'UNASSESSED'")],
 ['no false completeness claim',authority.includes('Public completeness claims remain gated by launch audits, assessment parity and production preflight.')],
 ['universal board write action',board.includes("type:'write'")],
 ['universal board transform action',board.includes("type:'transform'")],
 ['board learner interruption point',board.includes("type:'pause_for_student'")],
 ['board verification',board.includes("type:'check'")],
 ['authentic vs AVORA-standard split',exam.includes("'AUTHENTIC'|'AVORA_STANDARD'")],
 ['cross-year duplicate audit',exam.includes('auditCrossYearDuplicates')],
 ['near duplicate threshold',exam.includes('similarity>=0.82')],
];
let fail=0;for(const [n,ok] of checks){console.log(`${ok?'✓':'✗'} ${n}`);if(!ok)fail++}
if(fail){console.error(`\nAcademic trust audit failed: ${fail}/${checks.length}`);process.exit(1)}
console.log(`\nAcademic trust audit passed: ${checks.length}/${checks.length}.`)
