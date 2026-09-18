import { sql, withDbRetry } from '@/lib/db';

export const FAMILY_PLAN_KEY='FAMILY_MONTHLY';
export const FAMILY_MAX_STUDENTS=3;
export const TRIAL_DAYS=14;
export const SEAT_REPLACEMENT_COOLDOWN_DAYS=90;

export function familyPlanCode(){return process.env.PAYSTACK_PLAN_CODE_FAMILY_MONTHLY||''}
export function familyPlanDisplayPrice(){const n=Number(process.env.AVORA_FAMILY_MONTHLY_PRICE_NGN||5000);return Number.isFinite(n)&&n>0?n:5000}


export async function getFamilyBillingStatus(parentId:string){
  const [row]=await withDbRetry(()=>sql`SELECT status,plan_key,max_students,trial_started_at,trial_ends_at,current_period_end FROM billing_accounts WHERE owner_user_id=${parentId} LIMIT 1`);
  return row||null;
}

export async function ensureBillingAccount(ownerUserId:string){
  const [row]=await withDbRetry(()=>sql`
    INSERT INTO billing_accounts(owner_user_id,provider,plan_key,max_students)
    VALUES(${ownerUserId},'PAYSTACK',${FAMILY_PLAN_KEY},${FAMILY_MAX_STUDENTS})
    ON CONFLICT(owner_user_id) DO UPDATE
      SET max_students=GREATEST(billing_accounts.max_students,${FAMILY_MAX_STUDENTS}),updated_at=now()
    RETURNING *`);
  return row as any;
}

export async function ensureLearnerTrial(studentId:string){
  const [row]=await withDbRetry(()=>sql`
    INSERT INTO learner_access_trials(student_id,started_at,ends_at)
    VALUES(${studentId},now(),now()+make_interval(days=>${TRIAL_DAYS}))
    ON CONFLICT(student_id) DO UPDATE SET student_id=EXCLUDED.student_id
    RETURNING *`);
  return row as any;
}

export async function startFamilyTrialIfEligible(parentId:string){
  const billing=await ensureBillingAccount(parentId);
  if(['ACTIVE','PAST_DUE','CANCELLED'].includes(String(billing.status))) return billing;
  const [history]=await withDbRetry(()=>sql`
    SELECT MIN(lat.started_at) first_trial_start
    FROM parent_student_links psl
    LEFT JOIN learner_access_trials lat ON lat.student_id=psl.student_id
    WHERE psl.parent_id=${parentId} AND psl.status='ACTIVE'`);
  const firstStart=history?.first_trial_start||new Date().toISOString();
  const [updated]=await withDbRetry(()=>sql`
    UPDATE billing_accounts
    SET status='TRIALING',trial_started_at=COALESCE(trial_started_at,${firstStart}),
        trial_ends_at=COALESCE(trial_ends_at,${firstStart}::timestamptz+make_interval(days=>${TRIAL_DAYS})),updated_at=now()
    WHERE id=${billing.id} AND trial_consumed_at IS NULL
    RETURNING *`);
  return updated||billing;
}

export async function activeFamilySeatCount(billingAccountId:string){
  const [row]=await withDbRetry(()=>sql`SELECT COUNT(*)::int count FROM billing_student_seats WHERE billing_account_id=${billingAccountId} AND status='ACTIVE'`);
  return Number(row?.count||0);
}

export async function attachLearnerSeat(params:{parentId:string;billingAccountId:string;studentId:string;actorUserId?:string}){
  const {parentId,billingAccountId,studentId,actorUserId=parentId}=params;
  return withDbRetry(()=>sql.begin(async tx=>{
    const [billing]=await tx`SELECT * FROM billing_accounts WHERE id=${billingAccountId} AND owner_user_id=${parentId} FOR UPDATE`;
    if(!billing) throw new Error('BILLING_NOT_FOUND');
    const [link]=await tx`SELECT id FROM parent_student_links WHERE parent_id=${parentId} AND student_id=${studentId} AND status='ACTIVE'`;
    if(!link) throw new Error('LEARNER_NOT_LINKED');
    const [other]=await tx`SELECT billing_account_id FROM billing_student_seats WHERE student_id=${studentId} AND status='ACTIVE' AND billing_account_id<>${billingAccountId} LIMIT 1`;
    if(other) throw new Error('LEARNER_ALREADY_IN_ANOTHER_FAMILY');
    const [existing]=await tx`SELECT * FROM billing_student_seats WHERE billing_account_id=${billingAccountId} AND student_id=${studentId}`;
    if(existing?.status==='ACTIVE') return existing;
    const [count]=await tx`SELECT COUNT(*)::int count FROM billing_student_seats WHERE billing_account_id=${billingAccountId} AND status='ACTIVE'`;
    if(Number(count.count)>=Number(billing.max_students)) throw new Error('FAMILY_SEATS_FULL');
    const [seat]=await tx`
      INSERT INTO billing_student_seats(billing_account_id,student_id,status,attached_at,locked_at,removed_at,replacement_available_at,release_reason)
      VALUES(${billingAccountId},${studentId},'ACTIVE',now(),now(),NULL,NULL,NULL)
      ON CONFLICT(billing_account_id,student_id) DO UPDATE SET
        status='ACTIVE',attached_at=now(),locked_at=now(),removed_at=NULL,replacement_available_at=NULL,release_reason=NULL
      RETURNING *`;
    await tx`UPDATE parent_student_links SET seat_locked_at=COALESCE(seat_locked_at,now()) WHERE id=${link.id}`;
    await tx`INSERT INTO family_seat_events(billing_account_id,student_id,actor_user_id,event_type,reason) VALUES(${billingAccountId},${studentId},${actorUserId},'ATTACHED','Learner attached to family subscription')`;
    if(billing.status==='TRIALING'&&billing.trial_started_at&&billing.trial_ends_at){
      await tx`INSERT INTO learner_access_trials(student_id,started_at,ends_at) VALUES(${studentId},${billing.trial_started_at},${billing.trial_ends_at}) ON CONFLICT(student_id) DO UPDATE SET started_at=LEAST(learner_access_trials.started_at,EXCLUDED.started_at),ends_at=LEAST(learner_access_trials.ends_at,EXCLUDED.ends_at)`;
    }
    return seat;
  }));
}

export async function syncLinkedChildrenToSeats(parentId:string,billingAccountId:string,maxStudents:number){
  const linked=await withDbRetry(()=>sql`SELECT student_id FROM parent_student_links WHERE parent_id=${parentId} AND status='ACTIVE' ORDER BY linked_at`);
  const current=await withDbRetry(()=>sql`SELECT student_id FROM billing_student_seats WHERE billing_account_id=${billingAccountId} AND status='ACTIVE' ORDER BY attached_at`);
  const present=new Set(current.map((x:any)=>x.student_id));
  let used=current.length;
  for(const link of linked as any[]){
    if(present.has(link.student_id)||used>=Math.min(maxStudents,FAMILY_MAX_STUDENTS)) continue;
    try{await attachLearnerSeat({parentId,billingAccountId,studentId:link.student_id});used++;present.add(link.student_id)}catch(e:any){
      const code=String(e?.message||'');
      if(!['LEARNER_ALREADY_IN_ANOTHER_FAMILY','FAMILY_SEATS_FULL'].includes(code)) throw e;
    }
  }
}

export async function releaseLearnerSeat(params:{parentId:string;studentId:string;actorUserId?:string;reason:string}){
  const {parentId,studentId,actorUserId=parentId,reason}=params;
  return withDbRetry(()=>sql.begin(async tx=>{
    const [billing]=await tx`SELECT * FROM billing_accounts WHERE owner_user_id=${parentId} FOR UPDATE`;
    if(!billing) throw new Error('BILLING_NOT_FOUND');
    const [seat]=await tx`SELECT * FROM billing_student_seats WHERE billing_account_id=${billing.id} AND student_id=${studentId} AND status='ACTIVE' FOR UPDATE`;
    if(!seat) throw new Error('SEAT_NOT_FOUND');
    const available=new Date(Date.now()+SEAT_REPLACEMENT_COOLDOWN_DAYS*86400000).toISOString();
    await tx`UPDATE billing_student_seats SET status='REMOVED',removed_at=now(),replacement_available_at=${available},release_reason=${reason} WHERE id=${seat.id}`;
    await tx`UPDATE parent_student_links SET status='REVOKED',revoked_at=now() WHERE parent_id=${parentId} AND student_id=${studentId}`;
    await tx`INSERT INTO family_seat_events(billing_account_id,student_id,actor_user_id,event_type,reason) VALUES(${billing.id},${studentId},${actorUserId},'RELEASED',${reason})`;
    return {replacementAvailableAt:available};
  }));
}

export async function getStudentEntitlement(studentId:string){
  const [family]=await withDbRetry(()=>sql`
    SELECT b.status,b.current_period_end,b.trial_ends_at,b.owner_user_id
    FROM billing_student_seats s JOIN billing_accounts b ON b.id=s.billing_account_id
    WHERE s.student_id=${studentId} AND s.status='ACTIVE'
    LIMIT 1`);
  if(family){
    const trial=family.status==='TRIALING';
    const trialValid=trial&&family.trial_ends_at&&new Date(family.trial_ends_at).getTime()>Date.now();
    const allowed=family.status==='ACTIVE'||Boolean(trialValid);
    return {allowed,source:trial?'FAMILY_TRIAL':'FAMILY_SUBSCRIPTION',status:allowed?family.status:(trial?'EXPIRED':family.status),endsAt:trial?family.trial_ends_at:family.current_period_end,parentId:family.owner_user_id};
  }
  const trial=await ensureLearnerTrial(studentId);
  const allowed=new Date(trial.ends_at).getTime()>Date.now();
  return {allowed,source:'LEARNER_TRIAL',status:allowed?'TRIALING':'EXPIRED',endsAt:trial.ends_at,parentId:null};
}

export async function studentHasActiveEntitlement(studentId:string){
  const e=await getStudentEntitlement(studentId);return e.allowed;
}

export type AvoraAccessTier='PREMIUM'|'PREMIUM_TRIAL'|'FREE';
export async function getStudentAccessTier(studentId:string):Promise<{tier:AvoraAccessTier;entitlement:any}>{
 const entitlement=await getStudentEntitlement(studentId);
 if(entitlement.allowed)return {tier:entitlement.status==='TRIALING'?'PREMIUM_TRIAL':'PREMIUM',entitlement};
 return {tier:'FREE',entitlement};
}
export async function studentHasPremiumAccess(studentId:string){
 const {tier}=await getStudentAccessTier(studentId);return tier==='PREMIUM'||tier==='PREMIUM_TRIAL';
}
