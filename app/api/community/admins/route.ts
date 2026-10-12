import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';import {sql,withDbRetry} from '@/lib/db';
import {isCommunityOwner} from '@/lib/communityAccess';
export async function GET(){
 const s=await getSession();if(!s||!isCommunityOwner(s.userId))return NextResponse.json({error:'Owner only'},{status:403});
 const rows=await withDbRetry(()=>sql`SELECT a.user_id,u.full_name,u.email,a.granted_at FROM study_room_admins a JOIN users u ON u.id=a.user_id ORDER BY a.granted_at DESC`);
 return NextResponse.json({admins:rows});
}
export async function POST(req:Request){
 const s=await getSession();if(!s||!isCommunityOwner(s.userId))return NextResponse.json({error:'Owner only'},{status:403});
 const body=await req.json().catch(()=>({}));const email=String(body.email||'').trim().toLowerCase();
 if(!email||email.length>254)return NextResponse.json({error:'Enter an existing user email'},{status:400});
 const [user]=await withDbRetry(()=>sql`SELECT id,email FROM users WHERE lower(email)=${email} LIMIT 1`);
 if(!user)return NextResponse.json({error:'No AVORA account with this email'},{status:404});
 if(isCommunityOwner(String(user.id)))return NextResponse.json({error:'Owner already has full access'},{status:400});
 await withDbRetry(()=>sql`INSERT INTO study_room_admins(user_id,granted_by) VALUES(${user.id},${s.userId}) ON CONFLICT(user_id) DO NOTHING`);
 return NextResponse.json({ok:true});
}
export async function DELETE(req:Request){
 const s=await getSession();if(!s||!isCommunityOwner(s.userId))return NextResponse.json({error:'Owner only'},{status:403});
 const body=await req.json().catch(()=>({}));const userId=String(body.userId||'');
 if(!/^[a-f0-9-]{36}$/i.test(userId))return NextResponse.json({error:'Invalid user'},{status:400});
 await withDbRetry(()=>sql`DELETE FROM study_room_admins WHERE user_id=${userId}`);
 return NextResponse.json({ok:true});
}
