import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s||s.role!=='ADMIN')return NextResponse.json({error:'Forbidden'},{status:403});const {id}=await params;const {studentId,reason}=await req.json();
 if(!studentId||String(reason||'').trim().length<8)return NextResponse.json({error:'A clear verified reason is required.'},{status:400});
 try{const rows=await withDbRetry(()=>sql.begin(async tx=>{const [seat]=await tx`SELECT id FROM billing_student_seats WHERE billing_account_id=${id} AND student_id=${studentId} AND status='ACTIVE' FOR UPDATE`;if(!seat)return [];await tx`UPDATE billing_student_seats SET status='REMOVED',removed_at=now(),release_reason=${String(reason).trim()},replacement_available_at=now() WHERE id=${seat.id}`;const [family]=await tx`SELECT owner_user_id FROM billing_accounts WHERE id=${id}`;if(family)await tx`UPDATE parent_student_links SET status='REVOKED',revoked_at=now() WHERE parent_id=${family.owner_user_id} AND student_id=${studentId}`;await tx`INSERT INTO family_seat_events(billing_account_id,student_id,actor_user_id,event_type,reason) VALUES(${id},${studentId},${s.userId},'RELEASED',${String(reason).trim()})`;return [seat]}));if(!rows.length)return NextResponse.json({error:'Active learner seat not found.'},{status:404});return NextResponse.json({ok:true})}catch(e){console.error(e);return NextResponse.json({error:'Could not release this learner seat.'},{status:500})}
}
