import fs from 'node:fs';
const read=(p)=>fs.readFileSync(p,'utf8');
const checks=[
 ['Primary 5/6 registration is public',read('components/AuthForm.tsx').includes('<option>Primary 5</option>')&&read('components/AuthForm.tsx').includes('<option>Primary 6</option>')],
 ['registration derives NCEE/BECE server-side',read('app/api/auth/register/route.ts').includes("startsWith('Primary')?'NCEE':'BECE'")],
 ['forgot-password route exists',fs.existsSync('app/forgot-password/page.tsx')&&fs.existsSync('app/api/auth/forgot-password/route.ts')],
 ['reset-password route exists',fs.existsSync('app/reset-password/page.tsx')&&fs.existsSync('app/api/auth/reset-password/route.ts')],
 ['password reset is token-hashed',read('lib/email.ts').includes('hashPasswordResetToken')&&read('database/migrations/025_password_reset.sql').includes('token_hash')],
 ['password reset migration exists',fs.existsSync('database/migrations/025_password_reset.sql')],
 ['admin exposes academic preview',read('app/admin/page.tsx').includes('/admin/academic-preview')&&read('app/admin/page.tsx').includes('NCEE & BECE')],
 ['Tutor board reserves progress-line space',read('app/globals.css').includes('padding:22px 22px 60px')&&read('app/globals.css').includes('padding:18px 15px 58px')],
 ['Tutor board wraps long content',read('app/globals.css').includes('overflow-wrap:anywhere')],
 ['support auto-scrolls to newest message',read('components/SupportChat.tsx').includes('scrollIntoView')&&read('components/SupportChat.tsx').includes('streamEndRef')],
 ['support stream remains scrollable',read('app/globals.css').includes('.support-message-stream{max-height:62vh}')],
 ['internal navigation avoids location href',![...fs.readdirSync('components')].filter(x=>x.endsWith('.tsx')).some(f=>read('components/'+f).includes('window.location.href='))],
 ['preflight requires password reset table',read('scripts/preflight.mjs').includes("'password_reset_tokens'")],
 ['preflight requires latest migration 026',read('scripts/preflight.mjs').includes('026_login_security.sql')],
];
let fail=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)fail++}
console.log(`V12.3 launch completeness audit: ${checks.length-fail}/${checks.length}`);if(fail)process.exit(1);
