import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {ensureBillingAccount,startFamilyTrialIfEligible,attachLearnerSeat,FAMILY_MAX_STUDENTS} from '@/lib/billing';

export async function POST(req:Request){
 const s=await getSession();if(!s||s.role!=='PARENT')return NextResponse.json({error:'Parent account required.'},{status:403});
 const {code,relationship}=await req.json();const clean=String(code||'').trim().toUpperCase();
 if(clean.length<6)return NextResponse.json({error:'Enter the link code shown in your child’s AVORA account.'},{status:400});
 try{
  const billing=await ensureBillingAccount(s.userId);
  const [activeCount]=await withDbRetry(()=>sql`SELECT COUNT(*)::int count FROM parent_student_links WHERE parent_id=${s.userId} AND status='ACTIVE'`);
  if(Number(activeCount?.count||0)>=FAMILY_MAX_STUDENTS)return NextResponse.json({error:'Your AVORA Family account already has all 3 learner profiles linked.'},{status:409});
  const [preview]=await withDbRetry(()=>sql`SELECT plc.student_id,u.full_name,sp.class_level FROM parent_link_codes plc JOIN users u ON u.id=plc.student_id JOIN student_profiles sp ON sp.user_id=u.id WHERE plc.code=${clean} AND plc.used_at IS NULL AND plc.expires_at>now() LIMIT 1`);
  if(!preview)return NextResponse.json({error:'That code is invalid, expired or has already been used.'},{status:400});
  const [alreadyLinked]=await withDbRetry(()=>sql`SELECT id FROM parent_student_links WHERE parent_id=${s.userId} AND student_id=${preview.student_id} AND status='ACTIVE' LIMIT 1`);
  if(alreadyLinked)return NextResponse.json({error:'This learner is already linked to your family. No duplicate was created.'},{status:409});
  const [otherFamily]=await withDbRetry(()=>sql`SELECT b.owner_user_id FROM billing_student_seats bs JOIN billing_accounts b ON b.id=bs.billing_account_id WHERE bs.student_id=${preview.student_id} AND bs.status='ACTIVE' AND b.owner_user_id<>${s.userId} LIMIT 1`);
  if(otherFamily)return NextResponse.json({error:'This learner is already attached to another AVORA Family subscription. Contact support if the family situation has genuinely changed.'},{status:409});

  const result=await sql.begin(async tx=>{
   const [row]=await tx`SELECT plc.id,plc.student_id,u.full_name,sp.class_level FROM parent_link_codes plc JOIN users u ON u.id=plc.student_id JOIN student_profiles sp ON sp.user_id=u.id WHERE plc.code=${clean} AND plc.used_at IS NULL AND plc.expires_at>now() FOR UPDATE`;
   if(!row)throw new Error('INVALID_CODE');
   await tx`INSERT INTO parent_student_links(parent_id,student_id,relationship,status,seat_locked_at) VALUES(${s.userId},${row.student_id},${String(relationship||'PARENT_GUARDIAN')},'ACTIVE',now()) ON CONFLICT(parent_id,student_id) DO UPDATE SET status='ACTIVE',relationship=EXCLUDED.relationship,revoked_at=NULL,linked_at=now(),seat_locked_at=COALESCE(parent_student_links.seat_locked_at,now())`;
   await tx`UPDATE parent_link_codes SET used_at=now(),used_by_parent_id=${s.userId} WHERE id=${row.id}`;
   return row;
  });
  await startFamilyTrialIfEligible(s.userId);
  await attachLearnerSeat({parentId:s.userId,billingAccountId:billing.id,studentId:result.student_id});
  return NextResponse.json({ok:true,student:result,seats:FAMILY_MAX_STUDENTS,usedSeats:Number(activeCount?.count||0)+1,remainingSeats:Math.max(0,FAMILY_MAX_STUDENTS-(Number(activeCount?.count||0)+1))});
 }catch(e:any){
  const code=String(e?.message||'');
  if(code.includes('INVALID_CODE'))return NextResponse.json({error:'That code is invalid, expired or has already been used.'},{status:400});
  if(code.includes('FAMILY_SEATS_FULL'))return NextResponse.json({error:'All 3 AVORA Family learner seats are already in use.'},{status:409});
  if(code.includes('LEARNER_ALREADY_IN_ANOTHER_FAMILY'))return NextResponse.json({error:'This learner already belongs to another active family subscription.'},{status:409});
  console.error(e);return NextResponse.json({error:'Could not link this learner.'},{status:500});
 }
}
