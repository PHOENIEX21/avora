import {redirect,notFound} from 'next/navigation';
import Link from 'next/link';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import StudyRoomComposer from '@/components/StudyRoomComposer';
export const dynamic='force-dynamic';
export default async function Room({params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s)redirect('/login');
 const {id}=await params;
 const [room]=await withDbRetry(()=>sql`SELECT * FROM study_rooms WHERE id=${id} AND status='ACTIVE'`).catch(()=>[]);
 if(!room)notFound();
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`).catch(()=>[]);
 if(s.role!=='ADMIN'&&String(profile?.class_level)!==String(room.class_level))notFound();
 const posts=await withDbRetry(()=>sql`SELECT p.id,p.parent_post_id,p.post_type,p.body,p.status,p.author_id,p.created_at,u.full_name FROM study_room_posts p JOIN users u ON u.id=p.author_id WHERE p.room_id=${id} AND (p.status='VISIBLE' OR (p.status='PENDING_REVIEW' AND p.author_id=${s.userId})) ORDER BY p.created_at ASC LIMIT 200`).catch(()=>[]);
 const visible=posts.filter((p:any)=>!p.parent_post_id||!posts.some((q:any)=>q.id===p.parent_post_id));
 const renderPost=(p:any)=> <article className="community-message" key={p.id}><header><b>{p.full_name}</b><time>{new Date(p.created_at).toLocaleString('en-NG',{dateStyle:'medium',timeStyle:'short'})}</time></header><p>{p.body}</p>{p.status==='PENDING_REVIEW'&&<small className="community-pending">Only you can see this until a moderator approves it.</small>}{p.status==='VISIBLE'&&<StudyRoomComposer roomId={id} parentPostId={p.id} compact/>}</article>;
 return <main className="shell study-room">
 <header className="community-room-heading"><Link href="/community">← All rooms</Link><span className="section-kicker">{room.class_level} · {room.subject_name}</span><h1>{room.title}</h1><p>{room.description||'Ask questions, share solutions and help classmates learn.'}</p></header>
 <section className="community-chat-shell" aria-label="Academic group conversation"><div className="community-chat-stream">{visible.length===0&&<p className="community-empty-chat">Start the conversation. Ask a question or share a solution with your classmates.</p>}{visible.map((p:any)=><div key={p.id} className="community-thread">{renderPost(p)}{posts.filter((reply:any)=>reply.parent_post_id===p.id).map((reply:any)=><div className="community-thread-reply" key={reply.id}>{renderPost(reply)}</div>)}</div>)}</div><div className="community-chat-input"><StudyRoomComposer roomId={id}/></div></section>
 </main>;
}
