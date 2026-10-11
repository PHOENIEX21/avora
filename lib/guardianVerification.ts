import {randomInt,createHmac,timingSafeEqual} from 'node:crypto';

export const GUARDIAN_CHALLENGE_TTL_MS=10*60*1000;
export const GUARDIAN_CHALLENGE_MAX_ATTEMPTS=5;
export const GUARDIAN_CHALLENGE_COOLDOWN_MS=15*60*1000;

/** Never persist a raw verification code or log one. */
export function newGuardianChallengeCode():string{
 const n=randomInt(0,1000000);
 return String(n).padStart(6,'0');
}
export function hashGuardianChallenge(code:string,nonce:string,secret:string):string{
 if(!/^[0-9]{6}$/.test(code)||!nonce||secret.length<32)throw new Error('Invalid verification configuration');
 return createHmac('sha256',secret).update(nonce).update(':').update(code).digest('hex');
}
export function matchesGuardianChallenge(code:string,nonce:string,secret:string,expected:string):boolean{
 if(!/^[a-f0-9]{64}$/.test(expected)||!/^[0-9]{6}$/.test(code))return false;
 const actual=hashGuardianChallenge(code,nonce,secret);
 return timingSafeEqual(Buffer.from(actual,'hex'),Buffer.from(expected,'hex'));
}
export function guardianChallengeState(expiresAt:Date,consumedAt:Date|null,attempts:number,now=new Date()):'used'|'expired'|'exhausted'|'pending'{
 if(consumedAt)return 'used';
 if(expiresAt.getTime()<=now.getTime())return 'expired';
 if(attempts>=GUARDIAN_CHALLENGE_MAX_ATTEMPTS)return 'exhausted';
 return 'pending';
}
export function guardianChallengeAllowed(expiresAt:Date,attempts:number,now=new Date()):boolean{
 return attempts<GUARDIAN_CHALLENGE_MAX_ATTEMPTS&&expiresAt.getTime()>now.getTime();
}
