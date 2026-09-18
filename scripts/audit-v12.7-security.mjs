import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const auth=read('lib/auth.ts');
const login=read('app/api/auth/login/route.ts');
const limiter=read('lib/loginRateLimit.ts');
const migration=read('database/migrations/026_login_security.sql');
const preflight=read('scripts/preflight.mjs');
const migrate=read('scripts/migrate.mjs');
const checks=[
  ['production auth fails closed', auth.includes('Refusing to create or verify production sessions') && auth.includes('secret.length<32') && auth.includes('secure: process.env.NODE_ENV === "production"')],
  ['login rate-limit gate runs before credential verification', login.indexOf('loginThrottle(email,req)')>0 && login.indexOf('loginThrottle(email,req)')<login.indexOf('bcrypt.compare')],
  ['failed credentials are recorded', login.includes('recordLoginFailure(email,req)') && login.includes("code:'RATE_LIMITED'")],
  ['successful pair is cleared only after valid password', login.indexOf('clearLoginFailures(email,req)')>login.indexOf('if(!valid)')],
  ['rate limiter is database-backed', limiter.includes('login_rate_limits') && limiter.includes('MAX_FAILURES=5') && limiter.includes('IDENTITY_MAX_FAILURES=20') && limiter.includes('IP_MAX_FAILURES=30') && limiter.includes('LOCK_MINUTES=15')],
  ['identity, identity+IP and IP scopes exist', limiter.includes('scope:"IDENTITY"') && limiter.includes('IDENTITY_IP') && limiter.includes('scope:"IP"')],
  ['stored bucket identifiers are hashed', limiter.includes('createHash("sha256")') && !migration.includes('email text') && !migration.includes('ip_address')],
  ['atomic database upsert is used', limiter.includes('ON CONFLICT(bucket_key) DO UPDATE') && limiter.includes('RETURNING locked_until')],
  ['429 responses expose Retry-After and disable cache', login.includes('"Retry-After"') && login.includes('"Cache-Control":"no-store"') && login.includes('status:429')],
  ['credential errors remain generic', login.includes("GENERIC_ERROR='Email or password is incorrect.'") && !login.includes('User not found')],
  ['forward-only login security migration exists', migration.includes('CREATE TABLE IF NOT EXISTS login_rate_limits') && migration.includes('IDENTITY_IP') && migration.includes('updated_at')],
  ['preflight requires migration 026', preflight.includes("filename='026_login_security.sql'") && preflight.includes('login_rate_limits')],
  ['migration runner applies ordered SQL transactionally', migrate.includes(".filter(f=>f.endsWith('.sql')).sort()") && migrate.includes('sql.begin')],
  ['public launch requires HTTPS and strong secrets', preflight.includes('APP_URL must use HTTPS for public launch') && preflight.includes('AUTH_SECRET must be at least 32 characters') && preflight.includes('CRON_SECRET must be at least 24 characters')],
];
let fail=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)fail++;}
console.log(`V12.7 security hardening audit: ${checks.length-fail}/${checks.length}`);
if(fail)process.exit(1);
