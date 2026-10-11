import {randomBytes,createHmac} from 'node:crypto';
import {sql} from '@/lib/db';
import {newGuardianChallengeCode,hashGuardianChallenge,canIssueGuardianChallenge,GUARDIAN_CHALLENGE_TTL_MS} from '@/lib/guardianVerification';

/** Internal only. Must be called from an independently authenticated guardian workflow. */
export async function issueGuardianChallenge(studentId:string,contact:string,channel:'EMAIL'|'SMS',secret:string){
 if(secret.length<32||!contact.trim())throw new Error('Guardian verification not configured');
 const code=newGuardianChallengeCode();
 const nonce=randomBytes(24).toString('hex');
 const codeHash=hashGuardianChallenge(code,nonce,secret);
 const digest=createHmac('sha256',secret).update(channel+':'+contact.trim().toLowerCase()).digest('hex');
 const id=await sql.begin(async tx=>{
  const students=await tx`SELECT id FROM users WHERE id=${studentId} FOR UPDATE`;
  if(!students.length)throw new Error('Student not found');
  const last=await tx`SELECT created_at FROM weekly_guardian_challenges WHERE student_id=${studentId} ORDER BY created_at DESC LIMIT 1`;
  if(last.length&&!canIssueGuardianChallenge(new Date(last[0].created_at)))return null;
  await tx`UPDATE weekly_guardian_challenges SET consumed_at=now() WHERE student_id=${studentId} AND consumed_at IS NULL`;
  const rows=await tx`INSERT INTO weekly_guardian_challenges(student_id,contact_digest,code_hash,nonce,channel,expires_at)
   VALUES(${studentId},${digest},${codeHash},${nonce},${channel},now()+${GUARDIAN_CHALLENGE_TTL_MS}*interval '1 millisecond') RETURNING id`;
  return String(rows[0].id);
 });
 return id?{id,code}:null;
}
