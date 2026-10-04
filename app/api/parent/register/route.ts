import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {z} from 'zod';
import {sql} from '@/lib/db';
import {createVerificationToken,sendVerificationEmail} from '@/lib/email';
import {createSession} from '@/lib/auth';


const schema=z.object({fullName:z.string().min(2).max(100),email:z.string().email(),password:z.string().min(8).max(128),phone:z.string().max(40).optional()});
export async function POST(req:Request){
 try{
  const d=schema.parse(await req.json()),email=d.email.trim().toLowerCase();
  const exists=await sql`SELECT id FROM users WHERE email=${email}`;
  if(exists.length)return NextResponse.json({error:'An account already exists with this email.'},{status:409});
  const hash=await bcrypt.hash(d.password,12);
  const user=await sql.begin(async tx=>{const [u]=await tx`INSERT INTO users(email,password_hash,full_name,role,email_verified_at) VALUES(${email},${hash},${d.fullName.trim()},'PARENT',NULL) RETURNING id,email,full_name`;await tx`INSERT INTO parent_profiles(user_id,phone) VALUES(${u.id},${d.phone?.trim()||null})`;return u});
  await createSession({userId:user.id,email:user.email,role:'PARENT',name:user.full_name||undefined});
  let delivery:any={sent:false,provider:'none'};try{const token=await createVerificationToken(user.id);delivery=await sendVerificationEmail(user.email,user.full_name,token)}catch(mailError){console.error('Parent signup verification email failed safely',mailError)}
  return NextResponse.json({ok:true,verificationRequired:true,emailSent:Boolean(delivery.sent),emailProvider:delivery.provider,email:user.email,next:'/parent/family'},{status:201});
 }catch(e){if(e instanceof z.ZodError)return NextResponse.json({error:'Please check the information you entered.'},{status:400});console.error(e);return NextResponse.json({error:'Could not create parent account.'},{status:500})}
}
