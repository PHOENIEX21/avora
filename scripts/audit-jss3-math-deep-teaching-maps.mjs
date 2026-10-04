import fs from 'node:fs';
const src=fs.readFileSync(new URL('../lib/jss3MathematicsTeachingMaps.ts',import.meta.url),'utf8');
const lessons=fs.readFileSync(new URL('../lib/jss3MathematicsDeepLessons.ts',import.meta.url),'utf8');
const topics=[...lessons.matchAll(/topic:'([^']+)'/g)].map(m=>m[1]);
let fail=[];
for(const topic of topics){
 const escaped=topic.replaceAll("'","\\'");
 if(!src.includes(`'${escaped}':common(`)) fail.push(`${topic}: missing teaching map`);
}
const blocks=[...src.matchAll(/t\('([^']+)'\s*,[^\[]*\,\s*\[([^\]]*)\]\)/g)];
for(const m of blocks){const count=(m[2].match(/'/g)||[]).length/2;if(count<3)fail.push(`${m[1]}: fewer than 3 representative examples`)}
for(const phrase of ['governingIdea','minimumRepresentativeExamples:3','noJumpChecks'])if(!src.includes(phrase))fail.push(`architecture marker missing: ${phrase}`);
if(!src.includes('Quadratic trinomial a≠1'))fail.push('factorisation: a≠1 quadratic type missing');
if(!src.includes('Multiply both equations'))fail.push('simultaneous equations: both-equations multiplication type missing');
if(!src.includes('Angles of elevation/depression'))fail.push('trigonometry: elevation/depression type missing');
if(fail.length){console.error('JSS3 Mathematics deep-teaching map audit FAILED');for(const f of fail)console.error('-',f);process.exit(1)}
console.log(`JSS3 Mathematics deep-teaching map audit passed: ${topics.length}/${topics.length} legacy JSS3 topics mapped; representative type examples enforced.`);
