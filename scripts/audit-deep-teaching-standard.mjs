import fs from 'node:fs';

function read(path){return fs.readFileSync(path,'utf8')}
const curriculumTutor=read('lib/curriculumTutor.ts');
const architecture=read('lib/deepTeachingArchitecture.ts');
const vocabulary=read('lib/academicVocabulary.ts');
const sourceRuntime=read('lib/sentCurriculumRuntime.ts');
const client=read('components/TutorClient.tsx');
const packageJson=JSON.parse(read('package.json'));

const checks=[
 ['key-term definitions are present in source-backed runtime teaching',sourceRuntime.includes('The coefficient is the number multiplying a letter')&&sourceRuntime.includes('subject')&&sourceRuntime.includes('verb')],
 ['topic-type teaching map exists',architecture.includes('TopicTeachingMap')&&architecture.includes('minimumRepresentativeExamples')],
 ['quadratic standard form is explicit',architecture.includes('ax²+bx+c=0')&&architecture.includes('a≠0')],
 ['a=1 quadratic type exists',architecture.includes('Quadratic trinomials — a = 1')],
 ['a≠1/ac method exists for JSS3',architecture.includes('Quadratic trinomials — a ≠ 1')&&architecture.includes('product is ac')],
 ['failed factor-pair reasoning is demonstrated',architecture.includes('Candidate 1 and 6')&&architecture.includes('so it fails')],
 ['rearrangement before zero-product is explained',architecture.includes('Rearranging and solving by factorisation')&&architecture.includes('zero-product principle')],
 ['factorisation is verified by expansion',architecture.includes('expand')&&architecture.includes('verify')],
 ['simultaneous-equation type map exists',architecture.includes('Both equations must be multiplied')&&architecture.includes('Graphs')&&architecture.includes('Word problems')],
 ['Tutor board exposes topic types',client.includes('THE TYPES YOU MUST BE ABLE TO HANDLE')],
 ['Tutor runtime enforces no-jump contract without exposing author notes',client.includes('Terms first — no unexplained vocabulary')&&client.includes('Internal authoring/no-jump notes guide the runtime')],
 ['source-backed factorisation foundation is wired to the master algebra topic',sourceRuntime.includes('FOIL may be mentioned only as a memory label')&&sourceRuntime.includes('AVORA must explain why x×x=x²')&&sourceRuntime.includes('Algebraic Expressions: expansion/simplification')],
];
let failed=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)failed++}
console.log(`\nDeep Teaching Standard audit: ${checks.length-failed}/${checks.length} passed.`);
if(failed)process.exit(1);
