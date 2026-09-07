import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";

const schema=z.object({email:z.string().email(),password:z.string().min(1)});
export async function POST(req:Request){
  try{
    const data=schema.parse(await req.json());
    const [user]=await sql`SELECT id,email,password_hash,role,email_verified_at,full_name FROM users WHERE email=${data.email.trim().toLowerCase()}`;
    if(!user||!(await bcrypt.compare(data.password,user.password_hash)))return NextResponse.json({error:'Email or password is incorrect.'},{status:401});
    if(!user.email_verified_at)return NextResponse.json({error:'Please verify your email before signing in.',code:'EMAIL_NOT_VERIFIED'},{status:403});
    await createSession({userId:user.id,email:user.email,role:user.role,name:user.full_name||undefined});
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:'Could not sign in.'},{status:400})}
}
