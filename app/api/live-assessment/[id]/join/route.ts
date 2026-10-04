import {requirePremiumFeature} from '@/lib/premiumAccess';
import {NextResponse} from 'next/server';import {getSession} from '@/lib/auth';import {sql,withDbRetry} from '@/lib/db';
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s)return NextResponse.json({error:'Unauthorized'},{status:401});const premiumDenied=await requirePremiumFeature(s,'Weekly Live Exam');if(premiumDenied)return premiumDenied;
 const {id}=await params,{parentName}=await req.json();
 const [linked]=await withDbRetry(()=>sql`SELECT parent_id FROM parent_student_links WHERE student_id=${s.userId} AND status='ACTIVE' LIMIT 1`);
 if(linked)return NextResponse.json({error:'A parent account is linked to this learner. Your parent or guardian must confirm supervision from their own Parent Dashboard.'},{status:409});
 if(String(parentName||'').trim().length<2)return NextResponse.json({error:'Enter the supervising parent or guardian name.'},{status:400});
 const rows=await withDbRetry(()=>sql`UPDATE live_assessment_participants p SET parent_confirmed=true,parent_name=${String(parentName).trim()},parent_confirmed_at=now(),parent_confirmation_method='MANUAL_GUARDIAN',joined_at=COALESCE(joined_at,now()),status=CASE WHEN status='INVITED' THEN 'JOINED' ELSE status END FROM live_assessments l WHERE p.assessment_id=l.id AND p.assessment_id=${id} AND p.student_id=${s.userId} AND l.status IN ('SCHEDULED','LOBBY') RETURNING p.id`);
 if(!rows.length)return NextResponse.json({error:'This session cannot be joined now.'},{status:409});return NextResponse.json({ok:true})
}
