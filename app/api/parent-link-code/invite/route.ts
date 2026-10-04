import {NextResponse} from 'next/server';
import {z} from 'zod';
import crypto from 'crypto';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {sendParentConnectionInvite} from '@/lib/email';

const schema=z.object({parentEmail:z.string().email().max(254)});
function code(){return crypto.randomBytes(5).toString('base64url').replace(/[-_]/g,'').slice(0,8).toUpperCase()}

export async function POST(req:Request){
 const s=await getSession();
 if(!s||s.role!=='STUDENT')return NextResponse.json({error:'Learner account required.'},{status:403});
 const parsed=schema.safeParse(await req.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:'Enter a valid parent or guardian email.'},{status:400});
 const parentEmail=parsed.data.parentEmail.trim().toLowerCase();
 if(parentEmail===s.email.toLowerCase())return NextResponse.json({error:'Use your parent or guardian’s email, not your learner email.'},{status:400});
 try{
  const [existingLink]=await withDbRetry(()=>sql`SELECT psl.id,u.email FROM parent_student_links psl JOIN users u ON u.id=psl.parent_id WHERE psl.student_id=${s.userId} AND psl.status='ACTIVE' LIMIT 1`);
  if(existingLink)return NextResponse.json({error:'Your learner profile is already connected to a parent/guardian account.'},{status:409});
  await withDbRetry(()=>sql`UPDATE parent_link_codes SET expires_at=now() WHERE student_id=${s.userId} AND used_at IS NULL AND expires_at>now()`);
  const c=code();
  const [created]=await withDbRetry(()=>sql`INSERT INTO parent_link_codes(student_id,code,expires_at) VALUES(${s.userId},${c},now()+interval '24 hours') RETURNING code,expires_at`);
  const delivery=await sendParentConnectionInvite(parentEmail,s.name||'Your child',c);
  return NextResponse.json({ok:true,code:created.code,expires_at:created.expires_at,emailSent:delivery.sent,message:delivery.sent?'Invitation sent. Your parent still needs to sign in and accept the connection using the code.':'The secure code is ready, but email delivery is unavailable right now. Show the code to your parent directly.'});
 }catch(error){console.error('parent invite failed',error);return NextResponse.json({error:'Could not prepare the parent invitation. Please try again.'},{status:503})}
}
