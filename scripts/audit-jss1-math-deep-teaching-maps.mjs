import fs from 'node:fs';
const src=fs.readFileSync(new URL('../lib/jss1MathematicsTeachingMaps.ts',import.meta.url),'utf8');
const snap=JSON.parse(fs.readFileSync(new URL('../data/revised-2025-curriculum-snapshot.json',import.meta.url),'utf8'));
const topics=snap.topics.filter(x=>x.classLevel==='JSS1'&&x.subject==='Mathematics');
let fail=[];
for(const x of topics){
 const marker=`'${x.topic.replaceAll("'","\\'")}':common(`;
 if(!src.includes(marker)) fail.push(`${x.topic}: missing teaching map`);
}
const blocks=[...src.matchAll(/t\('([^']+)'\s*,[^\[]*\,\s*\[([^\]]*)\]\)/g)];
for(const m of blocks){const count=(m[2].match(/'/g)||[]).length/2;if(count<3)fail.push(`${m[1]}: fewer than 3 representative examples`)}
if(fail.length){console.error('JSS1 Mathematics deep-teaching map audit FAILED');for(const f of fail)console.error('-',f);process.exit(1)}
console.log(`JSS1 Mathematics deep-teaching map audit passed: ${topics.length}/${topics.length} revised topics mapped; representative type examples enforced.`);
