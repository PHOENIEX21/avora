import fs from 'node:fs';
const curriculum=fs.readFileSync(new URL('../lib/tutorCurriculum.ts',import.meta.url),'utf8');
const deep=fs.readFileSync(new URL('../lib/deepTeaching.ts',import.meta.url),'utf8');
const tutor=fs.readFileSync(new URL('../components/TutorClient.tsx',import.meta.url),'utf8');
const checks=[
 ['concord defines singular noun',curriculum.includes("['singular noun'")],
 ['concord defines plural noun',curriculum.includes("['plural noun'")],
 ['concord defines singular verb',curriculum.includes("['singular verb'")],
 ['concord explains noun/verb -s contrast',curriculum.includes('plural nouns often have -s, but singular present-tense verbs often have -s')],
 ['concord teaches be/have/do',curriculum.includes('Have” becomes has')&&curriculum.includes('Do” becomes does')],
 ['concord has deep examples',deep.includes("'basic subject–verb agreement':[")&&deep.includes('Example 5 — pronouns and person')],
 ['hard concord structures deepened',deep.includes("'compound subjects and either/neither structures':[")&&deep.includes("'collective nouns, measurements and relative-clause agreement':[")],
 ['angle foundations expanded',curriculum.includes("['reflex angle'")&&curriculum.includes("['transversal'")],
 ['angle worked examples deepened',deep.includes("'lines, angles and angle relationships':[")&&deep.includes('Example 5 — parallel lines and a transversal')],
 ['checkpoint question not duplicated on board',tutor.includes("The question appears once below")&&!tutor.includes("lines:['Think, work, then explain:',unit.check]")&&!tutor.includes("lines:['Pause here','Explain the reasoning, not only the final answer.',ex.check]")],
];
let fail=0; for(const [name,ok] of checks){console.log(`${ok?'✓':'✗'} ${name}`); if(!ok) fail++;}
if(fail){console.error(`\nV9.0.4 depth tests failed: ${fail}/${checks.length}`);process.exit(1)}
console.log(`\nV9.0.4 depth tests passed: ${checks.length}/${checks.length}.`);
