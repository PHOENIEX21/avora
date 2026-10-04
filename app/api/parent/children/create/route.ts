import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {ensureBillingAccount,startFamilyTrialIfEligible,attachLearnerSeat,FAMILY_MAX_STUDENTS} from '@/lib/billing';

const schema=z.object({fullName:z.string().min(2).max(100),email:z.string().email(),password:z.string().min(8).max(128),classLevel:z.enum(['Primary 5','Primary 6','JSS1','JSS2','JSS3'])});

export async function POST(req:Request){
 const s=await getSession();if(!s||s.role!=='PARENT')return NextResponse.json({error:'Parent account required.'},{status:403});
 try{
  const d=schema.parse(await req.json()),email=d.email.trim().toLowerCase();
  const [count]=await withDbRetry(()=>sql`SELECT COUNT(*)::int count FROM parent_student_links WHERE parent_id=${s.userId} AND status='ACTIVE'`);
  if(Number(count?.count||0)>=FAMILY_MAX_STUDENTS)return NextResponse.json({error:'Your family already has all 3 learner profiles.'},{status:409});
  const existing=await withDbRetry(()=>sql`SELECT id,role FROM users WHERE lower(email)=${email} LIMIT 1`);
  if(existing.length)return NextResponse.json({error:'That email already belongs to an AVORA account. Do not create a duplicate learner. If it belongs to your child, sign in to that learner account and use Parent connection to generate a code.'},{status:409});
  const hash=await bcrypt.hash(d.password,12),targetExam=d.classLevel.startsWith('Primary')?'NCEE':'BECE';
  const learner:any=await sql.begin(async tx=>{
   const [u]=await tx`INSERT INTO users(email,password_hash,full_name,role,email_verified_at) VALUES(${email},${hash},${d.fullName.trim()},'STUDENT',NULL) RETURNING id,email,full_name`;
   await tx`INSERT INTO student_profiles(user_id,class_level,target_exam) VALUES(${u.id},${d.classLevel},${targetExam})`;
   await tx`INSERT INTO learner_access_trials(student_id,started_at,ends_at) VALUES(${u.id},now(),now()+interval '14 days')`;
   await tx`INSERT INTO parent_student_links(parent_id,student_id,relationship,status,seat_locked_at) VALUES(${s.userId},${u.id},'PARENT_GUARDIAN','ACTIVE',now())`;
   return {...u,class_level:d.classLevel};
  });
  const billing=await ensureBillingAccount(s.userId);
  await startFamilyTrialIfEligible(s.userId);
  await attachLearnerSeat({parentId:s.userId,billingAccountId:billing.id,studentId:learner.id});
  return NextResponse.json({ok:true,student:learner,seats:FAMILY_MAX_STUDENTS,usedSeats:Number(count?.count||0)+1,remainingSeats:Math.max(0,FAMILY_MAX_STUDENTS-(Number(count?.count||0)+1))},{status:201});
 }catch(e:any){
  if(e instanceof z.ZodError)return NextResponse.json({error:'Check the learner name, email, password and class.'},{status:400});
  const code=String(e?.message||'');
  if(code.includes('FAMILY_SEATS_FULL'))return NextResponse.json({error:'All 3 learner seats are already in use.'},{status:409});
  if(code.includes('duplicate key'))return NextResponse.json({error:'This learner identity already exists. Do not create a duplicate profile.'},{status:409});
  console.error(e);return NextResponse.json({error:'Could not create the learner profile.'},{status:500});
 }
}
