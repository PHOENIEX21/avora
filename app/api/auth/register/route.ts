import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sql } from "@/lib/db";
import { createVerificationToken, sendVerificationEmail } from "@/lib/email";

const schema=z.object({fullName:z.string().min(2).max(100),email:z.string().email(),password:z.string().min(8).max(128),classLevel:z.string().min(2).max(20).default('JSS3'),targetExam:z.string().min(2).max(30).default('BECE')});

export async function POST(req:Request){
  try{
    const data=schema.parse(await req.json());
    const email=data.email.trim().toLowerCase();
    const exists=await sql`SELECT id FROM users WHERE email=${email}`;
    if(exists.length)return NextResponse.json({error:'An account already exists with this email.'},{status:409});
    const hash=await bcrypt.hash(data.password,12);
    const [user]=await sql`INSERT INTO users(email,password_hash,full_name,role,email_verified_at) VALUES(${email},${hash},${data.fullName.trim()},'STUDENT',NULL) RETURNING id,email,full_name`;
    await sql`INSERT INTO student_profiles(user_id,class_level,target_exam) VALUES(${user.id},${data.classLevel},${data.targetExam})`;
    const token=await createVerificationToken(user.id);
    let delivery:{sent:boolean;devVerificationUrl?:string}={sent:false};
    try { delivery=await sendVerificationEmail(user.email,user.full_name,token); } catch(e) { console.error('Verification email failed',e); }
    return NextResponse.json({ok:true,verificationRequired:true,email:user.email,emailSent:delivery.sent,devVerificationUrl:delivery.devVerificationUrl},{status:201});
  }catch(e){
    if(e instanceof z.ZodError)return NextResponse.json({error:'Please check the information you entered.'},{status:400});
    console.error(e); return NextResponse.json({error:'Could not create account.'},{status:500});
  }
}
