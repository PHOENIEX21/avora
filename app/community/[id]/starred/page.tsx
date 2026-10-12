import Link from 'next/link';import {redirect,notFound} from 'next/navigation';
import {getSession} from '@/lib/auth';import {sql,withDbRetry} from '@/lib/db';
export const dynamic='force-dynamic';
export default async function Starred({params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s)redirect('/login');const {id}=await params;
 const [room]=await withDbRetry(()=>sql`SELECT title,class_level FROM study_rooms WHERE id=${id} AND status='ACTIVE'`);
 if(!room)notFound();
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);
 if(s.role!=='ADMIN'&&String(profile?.class_level)!==String(room.class_level))notFound();
 const posts=await withDbRetry(()=>sql`SELECT p.id,p.body,p.created_at,u.full_name,a.file_name,a.mime_type,a.id AS attachment_id FROM study_room_starred_posts st JOIN study_room_posts p ON p.id=st.post_id JOIN users u ON u.id=p.author_id LEFT JOIN study_room_attachments a ON a.post_id=p.id WHERE st.user_id=${s.userId} AND p.room_id=${id} AND p.status='VISIBLE' ORDER BY st.created_at DESC LIMIT 200`);
 return <main className="shell study-room"><Link href={'/community/'+id}>← Back to group</Link><h1>★ Starred messages</h1><p>Saved privately from {room.title}.</p>{posts.length===0&&<p>No starred messages yet. Star useful explanations or resources inside the group.</p>}{posts.map((p:any)=><article key={p.id} className="community-message community-message-peer"><header><b>{p.full_name}</b><time>{new Date(p.created_at).toLocaleString('en-NG')}</time></header>{p.body&&<p>{p.body}</p>}{p.attachment_id&&<a href={'/api/community/rooms/'+id+'/attachments/'+p.attachment_id} target="_blank" rel="noreferrer">📎 {p.file_name}</a>}</article>)}</main>;
}
