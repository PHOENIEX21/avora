import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const checks=[
 ['migration 018 exists',fs.existsSync(path.join(root,'database/migrations/018_parent_accounts_dashboard.sql'))],
 ['parent profile and link tables',/parent_profiles/.test(read('database/migrations/018_parent_accounts_dashboard.sql'))&&/parent_student_links/.test(read('database/migrations/018_parent_accounts_dashboard.sql'))],
 ['one-time child link codes',/parent_link_codes/.test(read('database/migrations/018_parent_accounts_dashboard.sql'))&&/expires_at/.test(read('database/migrations/018_parent_accounts_dashboard.sql'))],
 ['parent registration API',fs.existsSync(path.join(root,'app/api/parent/register/route.ts'))],
 ['secure child link API',/expires_at>now\(\)/.test(read('app/api/parent/link/route.ts'))&&/FOR UPDATE/.test(read('app/api/parent/link/route.ts'))],
 ['student connection page',fs.existsSync(path.join(root,'app/parent-connect/page.tsx'))&&/one-time/i.test(read('components/StudentParentConnect.tsx'))],
 ['parent dashboard',fs.existsSync(path.join(root,'app/parent/page.tsx'))&&/UPCOMING/.test(read('app/parent/page.tsx'))&&/RECENT EVIDENCE/.test(read('app/parent/page.tsx'))],
 ['child evidence page',fs.existsSync(path.join(root,'app/parent/child/[id]/page.tsx'))&&/8-WEEK TREND/.test(read('app/parent/child/[id]/page.tsx'))],
 ['authenticated parent supervision',/AUTHENTICATED_PARENT/.test(read('app/api/parent/live-assessment/[id]/confirm/route.ts'))&&/confirmed_by_parent_id/.test(read('database/migrations/018_parent_accounts_dashboard.sql'))],
 ['student quiz respects linked parent verification',/linked_parent_required/.test(read('app/live-assessment/[id]/page.tsx'))&&/VERIFIED PARENT PRESENCE REQUIRED/.test(read('components/LiveStudentSession.tsx'))],
 ['role-aware navigation',/session.role==='PARENT'/.test(read('app/layout.tsx'))&&/role==='PARENT'/.test(read('components/MobileNav.tsx'))],
 ['parent login lands on parent dashboard',/session.role==='PARENT'/.test(read('app/signin-intro/page.tsx'))&&/redirect\('\/parent'\)/.test(read('app/signin-intro/page.tsx'))]
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'}  ${name}`);if(ok)pass++}console.log(`Parent trust layer audit: ${pass}/${checks.length}`);if(pass!==checks.length)process.exit(1);
