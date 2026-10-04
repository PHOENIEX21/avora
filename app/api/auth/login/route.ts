import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { clearLoginFailures, loginThrottle, recordLoginFailure } from "@/lib/loginRateLimit";

const schema=z.object({email:z.string().email(),password:z.string().min(1)});
const GENERIC_ERROR='Email or password is incorrect.';

async function readCredentials(req:Request){
  const contentType=req.headers.get("content-type")||"";
  if(contentType.includes("application/json")) return schema.parse(await req.json());
  const form=await req.formData();
  return schema.parse({email:form.get("email"),password:form.get("password")});
}

function wantsHtml(req:Request){
  const contentType=req.headers.get("content-type")||"";
  return !contentType.includes("application/json");
}

function rateLimited(req:Request,html:boolean,retryAfterSeconds:number){
  const headers={"Retry-After":String(Math.max(1,retryAfterSeconds||900)),"Cache-Control":"no-store"};
  if(html){
    const response=NextResponse.redirect(new URL('/login?error=RATE_LIMITED',req.url),303);
    for(const [key,value] of Object.entries(headers)) response.headers.set(key,value);
    return response;
  }
  return NextResponse.json({error:'Too many sign-in attempts. Please try again later.',code:'RATE_LIMITED'},{status:429,headers});
}

export async function POST(req:Request){
  const html=wantsHtml(req);
  try{
    const data=await readCredentials(req);
    const email=data.email.trim().toLowerCase();

    const gate=await loginThrottle(email,req);
    if(!gate.allowed) return rateLimited(req,html,gate.retryAfterSeconds);

    const [user]=await sql`SELECT id,email,password_hash,role,full_name FROM users WHERE email=${email}`;
    const valid=Boolean(user)&&await bcrypt.compare(data.password,user.password_hash);
    if(!valid){
      const afterFailure=await recordLoginFailure(email,req);
      if(!afterFailure.allowed) return rateLimited(req,html,afterFailure.retryAfterSeconds);
      if(html) return NextResponse.redirect(new URL('/login?error=invalid_credentials',req.url),303);
      return NextResponse.json({error:GENERIC_ERROR},{status:401,headers:{"Cache-Control":"no-store"}});
    }

    await clearLoginFailures(email,req);
    await createSession({userId:user.id,email:user.email,role:user.role,name:user.full_name||undefined});
    if(html) return NextResponse.redirect(new URL('/signin-intro',req.url),303);
    return NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
  }catch(error){
    console.error('Login failed safely',error instanceof Error?error.message:'unknown error');
    if(html) return NextResponse.redirect(new URL('/login?error=signin_failed',req.url),303);
    return NextResponse.json({error:'Could not sign in.'},{status:400,headers:{"Cache-Control":"no-store"}});
  }
}
