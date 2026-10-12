import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {z} from 'zod';
const schema=z.object({question:z.string().trim().min(5).max(300),options:z.array(z.string().trim().min(1).max(120)).min(2).max(6)});
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 try{
  const session=await getSession();if(!session)return NextResponse.json({error:'Sign in first.'},{status:401});
  const {id}=await params;const input=schema.safeParse(await req.json());
  if(!input.success)return NextResponse.json({error:'Enter a question and 2–6 choices.'},{status:400});
  const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${session.userId}`);
  const [room]=await withDbRetry(()=>sql`SELECT class_level FROM study_rooms WHERE id=${id} AND status='ACTIVE'`);
  if(!room||(session.role!=='ADMIN'&&room.class_level!==profile?.class_level))return NextResponse.json({error:'This group is unavailable.'},{status:403});
  await withDbRetry(()=>sql`INSERT INTO study_room_polls(room_id,author_id,question,options) VALUES(${id},${session.userId},${input.data.question},${JSON.stringify(input.data.options)}::jsonb)`);
  return NextResponse.json({ok:true});
 }catch(e){console.error('poll create failed',e);return NextResponse.json({error:'Poll could not be created.'},{status:500})}
}
