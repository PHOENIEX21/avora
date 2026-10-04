import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";
import {createVerificationToken,sendVerificationEmail} from "@/lib/email";

const schema=z.object({fullName:z.string().min(2).max(100),email:z.string().email(),password:z.string().min(8).max(128),classLevel:z.enum(['Primary 5','Primary 6','JSS1','JSS2','JSS3'])});

export async function POST(req:Request){
  try{
    const data=schema.parse(await req.json());
    const email=data.email.trim().toLowerCase();
    const targetExam=data.classLevel.startsWith('Primary')?'NCEE':'BECE';
    const exists=await sql`SELECT id FROM users WHERE email=${email}`;
    if(exists.length)return NextResponse.json({error:'An account already exists with this email.'},{status:409});
    const hash=await bcrypt.hash(data.password,12);
    const user=await sql.begin(async tx=>{
      const [created]=await tx`INSERT INTO users(email,password_hash,full_name,role,email_verified_at) VALUES(${email},${hash},${data.fullName.trim()},'STUDENT',NULL) RETURNING id,email,full_name`;
      await tx`INSERT INTO student_profiles(user_id,class_level,target_exam) VALUES(${created.id},${data.classLevel},${targetExam})`;;
      await tx`INSERT INTO learner_access_trials(student_id,started_at,ends_at) VALUES(${created.id},now(),now()+interval '14 days') ON CONFLICT(student_id) DO NOTHING`
      return created;
    });
    await createSession({userId:user.id,email:user.email,role:'STUDENT',name:user.full_name});
    let delivery:any={sent:false,provider:'none'};
    try{const token=await createVerificationToken(user.id);delivery=await sendVerificationEmail(user.email,user.full_name,token)}catch(mailError){console.error('Signup verification email failed safely',mailError)}
    return NextResponse.json({ok:true,verificationRequired:true,emailSent:Boolean(delivery.sent),emailProvider:delivery.provider,email:user.email},{status:201});
  }catch(e){
    if(e instanceof z.ZodError)return NextResponse.json({error:'Please check the information you entered.'},{status:400});
    console.error(e); return NextResponse.json({error:'Could not create account.'},{status:500});
  }
}
