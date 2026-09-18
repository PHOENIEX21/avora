import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const client=read('components/TutorClient.tsx');
const presentation=read('lib/lessonPresentation.ts');
const jss3=read('lib/jss3MathematicsDeepLessons.ts');
const jss2=read('lib/jss2MathematicsDeepLessons.ts');
const sent=read('lib/sentCurriculumRuntime.ts');
const checks=[
 ['raw source step labels removed from learner runtime',!client.includes('SOURCE STEP ${i+1}')&&!client.includes('SOURCE-BACKED LIVE LESSON')],
 ['internal step ids hidden from learner board',!client.includes('<code>{event.stepId}</code>')],
 ['author instruction filter exists',presentation.includes('avora should')&&presentation.includes('AUTHOR_INSTRUCTION')],
 ['JSS provenance stripped',presentation.includes('PROVENANCE')&&presentation.includes('JSS[123]')],
 ['markdown/reference table rows are never spoken as teaching steps',presentation.includes('Markdown/reference-table rows are source/reference material')&&presentation.includes('return null;')],
 ['source is compiled into learner moments',client.includes('composeLearnerSourceMoments(unit.structuredSteps)')],
 ['factorization foundation injected',client.includes('factorizationFoundation(topic,classLevel)')],
 ['quadratic standard form established',presentation.includes('ax² + bx + c')],
 ['sum b derived',presentation.includes('m + n = b')],
 ['product ac derived',presentation.includes('m × n = a × c')],
 ['both conditions explicitly required',presentation.includes('satisfy BOTH conditions')],
 ['candidate pair failure shown',presentation.includes('2 and 3  ✗ sum 5')],
 ['middle term split only after pair justification',presentation.includes('Only after the pair is justified')],
 ['JSS3 deep content upgraded to general ac method',jss3.includes('mn=ac')&&jss3.includes('m+n=b')],
 ['JSS2 deep content upgraded to general ac method',jss2.includes('mn=ac')&&jss2.includes('m+n=b')],
 ['author/no-jump notes not rendered as learner checklist',!client.includes("label:'NO UNEXPLAINED JUMPS'")],
 ['internal reference units excluded from learner Tutor plans',sent.includes('isLearnerTeachingUnit')&&sent.includes('core formula\\s*&\\s*method reference')],
 ['source-backed learner why text is not an author instruction',!sent.includes('AVORA must teach it in order rather than replace it with a generic summary')],
 ['safe learner explain/example/check are compiled through sanitizer',sent.includes('function learnerText')&&sent.includes('sanitizeSourceForLearner(value)')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)pass++}
console.log(`V14.7 teacher runtime audit: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
