import {NextResponse} from 'next/server';
import {z} from 'zod';
import {sql,withDbRetry} from '@/lib/db';
import {createPasswordResetToken,sendPasswordResetEmail} from '@/lib/email';

const schema=z.object({email:z.string().email().max(254)});

export async function POST(req:Request){
  const parsed=schema.safeParse(await req.json().catch(()=>null));
  if(!parsed.success)return NextResponse.json({error:'Enter a valid email address.'},{status:400});
  const email=parsed.data.email.trim().toLowerCase();
  try{
    const [user]=await withDbRetry(()=>sql`SELECT id,email,full_name FROM users WHERE email=${email}`);
    let devResetUrl:string|undefined;
    if(user?.id){
      const token=await createPasswordResetToken(user.id);
      try{
        const delivery=await sendPasswordResetEmail(user.email,user.full_name||'Learner',token);
        devResetUrl=delivery.devResetUrl;
      }catch(error){console.error('Password reset email failed',error)}
    }
    return NextResponse.json({ok:true,message:'If an eligible AVORA account exists for that email, a reset link has been prepared.',...(process.env.NODE_ENV!=='production'&&devResetUrl?{devResetUrl}:{})});
  }catch(error){
    console.error('Forgot password failed',error);
    return NextResponse.json({error:'AVORA could not process that request yet. Please try again.'},{status:503});
  }
}
