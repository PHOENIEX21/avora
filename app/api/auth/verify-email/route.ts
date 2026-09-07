import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { hashVerificationToken } from "@/lib/email";

export async function GET(req:Request){
  const url=new URL(req.url); const token=url.searchParams.get('token');
  if(!token)return NextResponse.redirect(new URL('/login?verify=invalid',url));
  const hash=hashVerificationToken(token);
  const [row]=await sql`SELECT evt.id,evt.user_id,u.email,u.role,u.full_name FROM email_verification_tokens evt JOIN users u ON u.id=evt.user_id WHERE evt.token_hash=${hash} AND evt.expires_at>now()`;
  if(!row)return NextResponse.redirect(new URL('/login?verify=expired',url));
  await sql.begin(async tx=>{
    await tx`UPDATE users SET email_verified_at=COALESCE(email_verified_at,now()),updated_at=now() WHERE id=${row.user_id}`;
    await tx`DELETE FROM email_verification_tokens WHERE user_id=${row.user_id}`;
  });
  await createSession({userId:row.user_id,email:row.email,role:row.role,name:row.full_name||undefined});
  return NextResponse.redirect(new URL('/home?verified=1',url));
}
