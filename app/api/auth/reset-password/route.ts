import {NextResponse} from 'next/server';
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import {sql,withDbRetry} from '@/lib/db';
import {hashPasswordResetToken} from '@/lib/email';

const schema=z.object({token:z.string().min(32).max(256),password:z.string().min(8).max(128)});

export async function POST(req:Request){
  const parsed=schema.safeParse(await req.json().catch(()=>null));
  if(!parsed.success)return NextResponse.json({error:'Use a valid reset link and a password of at least 8 characters.'},{status:400});
  const tokenHash=hashPasswordResetToken(parsed.data.token);
  const passwordHash=await bcrypt.hash(parsed.data.password,12);
  try{
    const result=await withDbRetry(()=>sql.begin(async tx=>{
      const [row]=await tx`SELECT id,user_id FROM password_reset_tokens WHERE token_hash=${tokenHash} AND used_at IS NULL AND expires_at>now() FOR UPDATE`;
      if(!row)return null;
      await tx`UPDATE users SET password_hash=${passwordHash} WHERE id=${row.user_id}`;
      await tx`UPDATE password_reset_tokens SET used_at=now() WHERE id=${row.id}`;
      await tx`DELETE FROM login_rate_limits WHERE rate_key IS NOT NULL AND updated_at<now()-interval '1 day'`;
      return row.user_id;
    }));
    if(!result)return NextResponse.json({error:'This reset link is invalid or has expired. Request a new one.'},{status:400});
    return NextResponse.json({ok:true});
  }catch(error){
    console.error('Password reset failed',error);
    return NextResponse.json({error:'AVORA could not reset the password yet. Please try again.'},{status:503});
  }
}
