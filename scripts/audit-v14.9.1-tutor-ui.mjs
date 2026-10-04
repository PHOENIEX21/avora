import fs from 'node:fs';
const tutor=fs.readFileSync('components/TutorClient.tsx','utf8');
const css=fs.readFileSync('app/globals.css','utf8');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const checks=[
 ['release is V14.9.1',pkg.version==='14.9.1'],
 ['official NERDC topic runtime imported',tutor.includes("officialNerdc2025Topic")],
 ['learning objectives are visible',tutor.includes('By the end of this topic, you should be able to:')],
 ['September 2025 NERDC trust label is visible',tutor.includes('NERDC NEW REVISED BEC · SEPTEMBER 2025')],
 ['curriculum details include official theme',tutor.includes('<b>Theme:</b>')],
 ['curriculum details include official source pages',tutor.includes('officialTopic.pages.join')],
 ['curriculum details explain AVORA lesson splitting',tutor.includes('splits this official topic into smaller teaching sections')],
 ['visible tutor dialogue layer exists',tutor.includes('AVORA IS TEACHING')&&tutor.includes('avora-teacher-dialogue-v1491')],
 ['why interruption exists',tutor.includes('Why is this step or idea valid?')],
 ['simple re-explanation interruption exists',tutor.includes('Explain this exact idea more simply')],
 ['another-example interruption exists',tutor.includes('Give me one different example of this exact idea')],
 ['exercise feedback is tutor-labelled',tutor.includes('AVORA TUTOR FEEDBACK')],
 ['incorrect exercise can route to reteaching',tutor.includes('Teach the topic again from the foundation')],
 ['voice stays feature flagged',tutor.includes("NEXT_PUBLIC_VOICE_TEACHING_ENABLED==='true'")],
 ['new UI styles are responsive',css.includes('.nerdc-objectives-v1491')&&css.includes('@media(max-width:700px)')],
];
let failures=0;
for(const [name,pass] of checks){console.log(`${pass?'✓':'✗'} ${name}`);if(!pass)failures++;}
console.log(`V14.9.1 Tutor UI audit: ${checks.length-failures}/${checks.length}`);
if(failures)process.exit(1);
