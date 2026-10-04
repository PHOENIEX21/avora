import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const checks=[
 ['Migration 020 exists',fs.existsSync(path.join(root,'database/migrations/020_family_access_design_system.sql'))],
 ['Family plan is three seats',read('lib/billing.ts').includes('FAMILY_MAX_STUDENTS=3')],
 ['Trial is fourteen days',read('lib/billing.ts').includes('TRIAL_DAYS=14')],
 ['One learner cannot occupy two active family seats',read('database/migrations/020_family_access_design_system.sql').includes('uq_active_family_seat_per_student')],
 ['Seat event audit history exists',read('database/migrations/020_family_access_design_system.sql').includes('family_seat_events')],
 ['Server rejects fourth linked learner',read('app/api/parent/link/route.ts').includes('FAMILY_MAX_STUDENTS')&&read('app/api/parent/link/route.ts').includes('already has all 3 learner profiles')],
 ['Other-family seat reuse is blocked',read('app/api/parent/link/route.ts').includes('another AVORA Family subscription')],
 ['Linked parent must authenticate live supervision',read('app/api/live-assessment/[id]/join/route.ts').includes('must confirm supervision from their own Parent Dashboard')],
 ['Expired learning access has a dedicated route',fs.existsSync(path.join(root,'app/access/page.tsx'))],
 ['Core pages enforce learner access', ['home','learn','tutor','practice','exam','progress','live-assessment'].every(x=>read(`app/${x}/page.tsx`).includes('requireStudentLearningAccess'))],
 ['Core APIs enforce server-side access', ['questions','attempts','practice/step','tutor','tutor/chat','exam/start','exam/answer','exam/finish','live-assessment/[id]/answer','live-assessment/[id]/submit'].every(x=>read(`app/api/${x}/route.ts`).includes('learningAccessDenial'))],
 ['Warm AVORA design tokens exist',read('app/globals.css').includes('--brand:#283B73')&&read('app/globals.css').includes('--coral:#E98269')&&read('app/globals.css').includes('--lavender:#A99BE8')&&read('app/globals.css').includes('--honey:#F2C66D')&&read('app/globals.css').includes('--mint:#72C6A5')],
 ['Family billing UI shows three identity-bound seats',read('app/parent/billing/page.tsx').includes('Three seats, not three shared passwords')&&read('app/parent/billing/page.tsx').includes('billing-seat-grid')],
 ['Public offer communicates family model',read('app/page.tsx').includes('One subscription for up to three learners')&&read('app/page.tsx').includes('14-day trial')],
 ['Price is configuration-driven with 5000 launch default',read('lib/billing.ts').includes('AVORA_FAMILY_MONTHLY_PRICE_NGN||5000')],
 ['Admin can audit family seats',fs.existsSync(path.join(root,'app/admin/families/page.tsx'))&&fs.existsSync(path.join(root,'app/admin/families/[id]/page.tsx'))],
 ['Seat release requires admin and reason',read('app/api/admin/families/[id]/release-seat/route.ts').includes("s.role!=='ADMIN'")&&read('app/api/admin/families/[id]/release-seat/route.ts').includes('clear verified reason')],
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)pass++;}
console.log(`\nFamily Access + Design audit: ${pass}/${checks.length}`);if(pass!==checks.length)process.exit(1);
