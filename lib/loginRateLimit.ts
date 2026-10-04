import { createHash } from "node:crypto";
import { sql } from "@/lib/db";

export const MAX_FAILURES=5;
export const IDENTITY_MAX_FAILURES=20;
export const IP_MAX_FAILURES=30;
export const WINDOW_MINUTES=15;
export const LOCK_MINUTES=15;

type Scope="IDENTITY"|"IDENTITY_IP"|"IP";
type Bucket={key:string;scope:Scope;maxFailures:number};
export type LoginThrottleResult={allowed:boolean;retryAfterSeconds:number};

function hash(value:string){
  return createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(email:string){return email.trim().toLowerCase()}

function clientIp(req:Request){
  // On Vercel/proxies, x-forwarded-for is a comma-separated chain; the left-most
  // value is the originating client supplied by the trusted platform proxy.
  const forwarded=(req.headers.get("x-forwarded-for")||"").split(",")[0]?.trim();
  const real=(req.headers.get("x-real-ip")||"").trim();
  const candidate=forwarded||real;
  if(!candidate) return null;
  // Bound storage/input size and strip whitespace; we hash it before persistence.
  return candidate.replace(/\s+/g,"").slice(0,128)||null;
}

function buckets(email:string,req:Request):Bucket[]{
  const normalized=normalizeEmail(email);
  const ip=clientIp(req);
  const identityIpMaterial=ip?`${normalized}|${ip}`:normalized;
  const list:Bucket[]=[
    {key:hash(`identity:${normalized}`),scope:"IDENTITY",maxFailures:IDENTITY_MAX_FAILURES},
    {key:hash(`identity-ip:${identityIpMaterial}`),scope:"IDENTITY_IP",maxFailures:MAX_FAILURES},
  ];
  if(ip) list.push({key:hash(`ip:${ip}`),scope:"IP",maxFailures:IP_MAX_FAILURES});
  return list;
}

function retrySeconds(value:unknown){
  const until=value instanceof Date?value:new Date(String(value||""));
  const ms=until.getTime()-Date.now();
  return Number.isFinite(ms)&&ms>0?Math.max(1,Math.ceil(ms/1000)):0;
}

export async function loginThrottle(email:string,req:Request):Promise<LoginThrottleResult>{
  const bs=buckets(email,req);
  let retryAfterSeconds=0;
  for(const bucket of bs){
    const [row]=await sql`
      SELECT locked_until
      FROM login_rate_limits
      WHERE bucket_key=${bucket.key}
        AND locked_until IS NOT NULL
        AND locked_until > now()
      LIMIT 1`;
    if(row?.locked_until) retryAfterSeconds=Math.max(retryAfterSeconds,retrySeconds(row.locked_until));
  }
  return {allowed:retryAfterSeconds===0,retryAfterSeconds};
}

async function recordBucketFailure(bucket:Bucket){
  const [row]=await sql`
    INSERT INTO login_rate_limits(bucket_key,scope,failure_count,window_started_at,locked_until,updated_at)
    VALUES(${bucket.key},${bucket.scope},1,now(),NULL,now())
    ON CONFLICT(bucket_key) DO UPDATE SET
      scope=EXCLUDED.scope,
      failure_count=CASE
        WHEN login_rate_limits.window_started_at < now() - (${WINDOW_MINUTES} * interval '1 minute') THEN 1
        ELSE login_rate_limits.failure_count + 1
      END,
      window_started_at=CASE
        WHEN login_rate_limits.window_started_at < now() - (${WINDOW_MINUTES} * interval '1 minute') THEN now()
        ELSE login_rate_limits.window_started_at
      END,
      locked_until=CASE
        WHEN (
          CASE
            WHEN login_rate_limits.window_started_at < now() - (${WINDOW_MINUTES} * interval '1 minute') THEN 1
            ELSE login_rate_limits.failure_count + 1
          END
        ) >= ${bucket.maxFailures}
        THEN GREATEST(COALESCE(login_rate_limits.locked_until,now()),now() + (${LOCK_MINUTES} * interval '1 minute'))
        ELSE CASE WHEN login_rate_limits.locked_until <= now() THEN NULL ELSE login_rate_limits.locked_until END
      END,
      updated_at=now()
    RETURNING locked_until`;
  return row?.locked_until?retrySeconds(row.locked_until):0;
}

export async function recordLoginFailure(email:string,req:Request):Promise<LoginThrottleResult>{
  const bs=buckets(email,req);
  let retryAfterSeconds=0;
  for(const bucket of bs) retryAfterSeconds=Math.max(retryAfterSeconds,await recordBucketFailure(bucket));
  return {allowed:retryAfterSeconds===0,retryAfterSeconds};
}

export async function clearLoginFailures(email:string,req:Request){
  const bs=buckets(email,req);
  const identity=bs.find(x=>x.scope==="IDENTITY");
  const pair=bs.find(x=>x.scope==="IDENTITY_IP");
  // A successful authentication proves this identity and identity/IP pair. We
  // intentionally keep the broader IP bucket so password-spraying pressure cannot
  // be erased by successfully signing in to one known account from the same IP.
  if(identity&&pair) await sql`DELETE FROM login_rate_limits WHERE bucket_key IN (${identity.key},${pair.key})`;
  // Opportunistic bounded cleanup prevents stale security rows from growing forever.
  await sql`DELETE FROM login_rate_limits WHERE updated_at < now() - interval '2 days' AND (locked_until IS NULL OR locked_until < now())`;
}

export async function pruneOldLoginRateLimits(){
  await sql`DELETE FROM login_rate_limits WHERE updated_at < now() - interval '2 days' AND (locked_until IS NULL OR locked_until < now())`;
}
