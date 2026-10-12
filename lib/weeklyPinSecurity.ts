import {randomBytes,scrypt as scryptCallback,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
const scrypt=promisify(scryptCallback);
const PIN_PATTERN=/^[0-9]{6,8}$/;
const MAX_ATTEMPTS=5;
const LOCK_MS=15*60*1000;
/** PINs are stored as salted scrypt hashes; never store or log raw PINs. */
export function validateStudentPin(pin:string):boolean{return PIN_PATTERN.test(pin);}
export async function hashStudentPin(pin:string):Promise<string>{
 if(!validateStudentPin(pin))throw new Error('PIN must contain 6 to 8 digits');
 const salt=randomBytes(16);
 const hash=await scrypt(pin,salt,64) as Buffer;
 return 'scrypt$'+salt.toString('hex')+'$'+hash.toString('hex');
}
export async function verifyStudentPin(pin:string,stored:string):Promise<boolean>{
 if(!validateStudentPin(pin))return false;
 const parts=stored.split('$');
 if(parts.length!==3||parts[0]!=='scrypt'||!/^[a-f0-9]{32}$/.test(parts[1])||!/^[a-f0-9]{128}$/.test(parts[2]))return false;
 const actual=await scrypt(pin,Buffer.from(parts[1],'hex'),64) as Buffer;
 return timingSafeEqual(actual,Buffer.from(parts[2],'hex'));
}
export function nextPinAttempt(failedAttempts:number,lockedUntil:Date|null,correct:boolean,now=new Date()):{failedAttempts:number;lockedUntil:Date|null;allowed:boolean}{
 if(lockedUntil&&lockedUntil.getTime()>now.getTime())return {failedAttempts,lockedUntil,allowed:false};
 if(correct)return {failedAttempts:0,lockedUntil:null,allowed:true};
 const failures=(lockedUntil?0:failedAttempts)+1;
 return {failedAttempts:failures>=MAX_ATTEMPTS?MAX_ATTEMPTS:failures,lockedUntil:failures>=MAX_ATTEMPTS?new Date(now.getTime()+LOCK_MS):null,allowed:false};
}
