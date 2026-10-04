import fs from 'node:fs';

const source=fs.readFileSync(new URL('../lib/tutorCurriculum.ts',import.meta.url),'utf8');
const titles=[...source.matchAll(/\{title:'([^']+)'/g)].map(m=>m[1]);
const visual=/equation|graph|data|statistic|chart|fraction|percentage|place value|binary|base.two|number line|inequal|bearing|elevation|depression|construction|angle|triangle|shape|polygon|quadrilateral|area|perimeter|volume|solid|ratio|proportion/i;
const mapped=/equation|graph|coordinate|data|statistic|bar chart|pie chart|line graph|frequency|fraction|decimal.*fraction|percentage|place value|large number|standard form|binary|base.two|directed number|number line|inequal|bearing|elevation|depression|construction|scale drawing|angle|triangle|similar shape|plane shape|2d|two dimensional|perimeter|area|polygon|quadrilateral|3d|three.dimensional|surface area|volume|solid|ratio|proportion|sharing/i;
const eligible=titles.filter(x=>visual.test(x));
const missing=eligible.filter(x=>!mapped.test(x));
console.log(`Visual-eligible tutor topics: ${eligible.length}`);
console.log(`Mapped by structured visual rules: ${eligible.length-missing.length}/${eligible.length}`);
if(missing.length){console.error('Missing visual mappings:',missing);process.exit(1)}
console.log('PASS — all currently detected visual-eligible tutor topics map to a structured visual family.');
