import {sql} from '@/lib/db';
import {guardianChallengeState,matchesGuardianChallenge,GUARDIAN_CHALLENGE_MAX_ATTEMPTS} from '@/lib/guardianVerification';

export type ChallengeConfirmation='verified'|'invalid'|'expired'|'used'|'exhausted'|'missing';

/**
 * Atomic one-time challenge confirmation. No guardian consent or account
 * activation is inferred from possession of a contact verification code.
 * Call only after the independent guardian identity checks are implemented.
 */
export async function confirmGuardianContactChallenge(
 studentId:string,challengeId:string,code:string,secret:string
):Promise<ChallengeConfirmation>{
 if(!/^[0-9]{6}$/.test(code)||secret.length<32)return 'invalid';
 return sql.begin(async tx=>{
  const rows=await tx`SELECT code_hash,nonce,attempts,expires_at,consumed_at
   FROM weekly_guardian_challenges WHERE id=${challengeId} AND student_id=${studentId}
   FOR UPDATE`;
  if(rows.length!==1)return 'missing';
  const row=rows[0];
  const state=guardianChallengeState(new Date(row.expires_at),
   row.consumed_at?new Date(row.consumed_at):null,Number(row.attempts));
  if(state!=='pending')return state;
  const valid=matchesGuardianChallenge(code,String(row.nonce),secret,String(row.code_hash));
  if(valid){
   await tx`UPDATE weekly_guardian_challenges SET consumed_at=now(),verified_at=now()
    WHERE id=${challengeId} AND student_id=${studentId}`;
   return 'verified';
  }
  await tx`UPDATE weekly_guardian_challenges SET attempts=LEAST(attempts+1,${GUARDIAN_CHALLENGE_MAX_ATTEMPTS})
   WHERE id=${challengeId} AND student_id=${studentId}`;
  return Number(row.attempts)+1>=GUARDIAN_CHALLENGE_MAX_ATTEMPTS?'exhausted':'invalid';
 });
}
