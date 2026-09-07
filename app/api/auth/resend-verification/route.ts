import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { createVerificationToken, sendVerificationEmail } from "@/lib/email";
const schema=z.object({email:z.string().email()});
export async function POST(req:Request){
  try{
    const {email}=schema.parse(await req.json());
    const [user]=await sql`SELECT id,email,full_name,email_verified_at FROM users WHERE email=${email.trim().toLowerCase()}`;
    if(!user||user.email_verified_at)return NextResponse.json({ok:true});
    const token=await createVerificationToken(user.id);
    const delivery=await sendVerificationEmail(user.email,user.full_name,token);
    return NextResponse.json({ok:true,emailSent:delivery.sent,devVerificationUrl:delivery.devVerificationUrl});
  }catch(e){console.error(e);return NextResponse.json({error:'Could not resend verification email.'},{status:400})}
}
