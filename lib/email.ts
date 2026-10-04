import crypto from "node:crypto";
import { sql } from "@/lib/db";

export async function createVerificationToken(userId:string){const token=crypto.randomBytes(32).toString("hex");const tokenHash=hashVerificationToken(token);await sql`DELETE FROM email_verification_tokens WHERE user_id=${userId}`;await sql`INSERT INTO email_verification_tokens(user_id,token_hash,expires_at) VALUES(${userId},${tokenHash},now()+interval '30 minutes')`;return token;}
export function hashVerificationToken(token:string){return crypto.createHash("sha256").update(token).digest("hex");}
export async function createPasswordResetToken(userId:string){const token=crypto.randomBytes(32).toString("hex");const tokenHash=hashPasswordResetToken(token);await sql`DELETE FROM password_reset_tokens WHERE user_id=${userId} AND used_at IS NULL`;await sql`INSERT INTO password_reset_tokens(user_id,token_hash,expires_at) VALUES(${userId},${tokenHash},now()+interval '30 minutes')`;return token;}
export function hashPasswordResetToken(token:string){return crypto.createHash("sha256").update(token).digest("hex");}
function escapeHtml(value:string){return value.replace(/[&<>"']/g,ch=>({"&":'&amp;',"<":'&lt;',">":'&gt;', '"':'&quot;', "'":'&#39;'}[ch]||ch));}

type Mail={to:string;subject:string;html:string};
type DeliveryResult={sent:boolean;provider:'brevo'|'sendgrid-fallback'|'none';devVerificationUrl?:string;devResetUrl?:string};
async function deliver(mail:Mail):Promise<DeliveryResult>{
 const brevoKey=process.env.BREVO_API_KEY?.trim(); const from=process.env.EMAIL_FROM?.trim()||process.env.BREVO_FROM_EMAIL?.trim(); const fromName=process.env.EMAIL_FROM_NAME?.trim()||"AVORA";
 if(brevoKey&&from){const r=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':brevoKey,'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({sender:{email:from,name:fromName},to:[{email:mail.to}],subject:mail.subject,htmlContent:mail.html})});if(r.ok)return {sent:true,provider:'brevo' as const};console.error(`Brevo email failed: ${r.status}`);}
 // Optional migration fallback only. AVORA no longer requires SendGrid.
 const sg=process.env.SENDGRID_API_KEY?.trim(), sgFrom=process.env.SENDGRID_FROM_EMAIL?.trim();
 if(sg&&sgFrom){const r=await fetch('https://api.sendgrid.com/v3/mail/send',{method:'POST',headers:{Authorization:`Bearer ${sg}`,'Content-Type':'application/json'},body:JSON.stringify({personalizations:[{to:[{email:mail.to}]}],from:{email:sgFrom,name:process.env.SENDGRID_FROM_NAME||fromName},subject:mail.subject,content:[{type:'text/html',value:mail.html}]})});if(r.ok)return {sent:true,provider:'sendgrid-fallback' as const};console.error(`SendGrid fallback failed: ${r.status}`);}
 return {sent:false,provider:'none' as const};
}
export async function sendVerificationEmail(to:string,fullName:string,token:string):Promise<DeliveryResult>{const base=(process.env.APP_URL||'http://localhost:3000').replace(/\/$/,'');const url=`${base}/api/auth/verify-email?token=${encodeURIComponent(token)}`;const name=escapeHtml(fullName.trim().split(/\s+/)[0]||'Learner');const d=await deliver({to,subject:'Verify your AVORA account',html:`<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#122033"><b>AVORA</b><h1>Welcome, ${name}.</h1><p>Verify your email to secure your account.</p><p><a href="${url}">Verify my email</a></p><p>This link expires in 30 minutes.</p></div>`});if(!d.sent&&process.env.NODE_ENV!=='production'){console.log(`AVORA verification link for ${to}: ${url}`);return {...d,devVerificationUrl:url};}return d;}
export async function sendPasswordResetEmail(to:string,fullName:string,token:string):Promise<DeliveryResult>{const base=(process.env.APP_URL||'http://localhost:3000').replace(/\/$/,'');const url=`${base}/reset-password?token=${encodeURIComponent(token)}`;const name=escapeHtml(fullName.trim().split(/\s+/)[0]||'Learner');const d=await deliver({to,subject:'Reset your AVORA password',html:`<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#122033"><b>AVORA</b><h1>Reset your password, ${name}.</h1><p><a href="${url}">Reset my password</a></p><p>This one-time link expires in 30 minutes.</p></div>`});if(!d.sent&&process.env.NODE_ENV!=='production'){console.log(`AVORA password reset link for ${to}: ${url}`);return {...d,devResetUrl:url};}return d;}

export async function sendParentConnectionInvite(to:string,learnerName:string,code:string):Promise<DeliveryResult>{
 const base=(process.env.APP_URL||'http://localhost:3000').replace(/\/$/,'');
 const safeLearner=escapeHtml(learnerName.trim().split(/\s+/)[0]||'Your child');
 const safeCode=escapeHtml(code);
 const registerUrl=`${base}/parent/register`;
 const loginUrl=`${base}/login`;
 return deliver({to,subject:`${safeLearner} invited you to connect on AVORA`,html:`<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#122033"><b>AVORA</b><h1>Connect with ${safeLearner}'s learning.</h1><p>${safeLearner} asked to connect their AVORA learner profile to your parent/guardian account.</p><p style="font-size:24px;font-weight:800;letter-spacing:.12em">${safeCode}</p><p>This one-time code expires in 24 hours. For security, the connection is completed only after you sign in to your own parent account and enter the code.</p><p><a href="${loginUrl}">I already have a parent account</a></p><p><a href="${registerUrl}">Create a parent account</a></p><p>If you were not expecting this invitation, you can ignore this email.</p></div>`});
}
