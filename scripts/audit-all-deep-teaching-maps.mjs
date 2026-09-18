import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const specs=[
 ['JSS1 Mathematics','lib/jss1MathematicsTeachingMaps.ts',23],['JSS2 Mathematics','lib/jss2MathematicsTeachingMaps.ts',22],['JSS3 Mathematics','lib/jss3MathematicsTeachingMaps.ts',15],
 ['JSS1 English','lib/jss1EnglishTeachingMaps.ts',29],['JSS2 English','lib/jss2EnglishTeachingMaps.ts',37],['JSS3 English','lib/jss3EnglishTeachingMaps.ts',17]
];
let total=0;
for(const [label,file,expected] of specs){
 const s=fs.readFileSync(new URL(file,root),'utf8');
 const entries=[...s.matchAll(/^\s*'((?:\\'|[^'])+)':(?:m|common)\(/gm)].length;
 if(entries!==expected) throw new Error(`${label}: expected ${expected} maps, found ${entries}`);
 if(!s.includes('minimumRepresentativeExamples:3')) throw new Error(`${label}: 3-example minimum not enforced`);
 total+=entries; console.log(`PASS ${label}: ${entries}/${expected} type-aware maps`);
}
const arch=fs.readFileSync(new URL('lib/deepTeachingArchitecture.ts',root),'utf8');
for(const token of ['jss1MathematicsTeachingMaps','jss2MathematicsTeachingMaps','jss3MathematicsTeachingMaps','jss1EnglishTeachingMaps','jss2EnglishTeachingMaps','jss3EnglishTeachingMaps']) if(!arch.includes(token)) throw new Error(`Live architecture missing ${token}`);
const tutor=fs.readFileSync(new URL('lib/curriculumTutor.ts',root),'utf8');
if(!tutor.includes('teachingMapFor(lesson.topic,lesson.classLevel)')) throw new Error('Curriculum Tutor is not consuming type-aware maps');
if(!tutor.includes('teachingTypes:map?.types.map')) throw new Error('Tutor units do not expose mapped types/examples');
if(!tutor.includes('noJumpChecks:map?.noJumpChecks')) throw new Error('Tutor units do not expose no-jump checks');
console.log(`\nAll-class Deep Teaching Map audit passed: ${total}/${total} Mathematics + English topic maps connected to live Tutor architecture.`);
