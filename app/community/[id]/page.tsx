import {redirect,notFound} from 'next/navigation';
import Link from 'next/link';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import StudyRoomComposer from '@/components/StudyRoomComposer';
import StudyPolls from '@/components/StudyPolls';
import CommunityLiveRefresh from '@/components/CommunityLiveRefresh';
import CommunityChatStream from '@/components/CommunityChatStream';
import StudyReplyAction from '@/components/StudyReplyAction';
import StudyMessageActions from '@/components/StudyMessageActions';
export const dynamic='force-dynamic';
export default async function Room({params}:{params:Promise<{id:string}>}){
 const s=await getSession();if(!s)redirect('/login');
 const {id}=await params;
 const [room]=await withDbRetry(()=>sql`SELECT * FROM study_rooms WHERE id=${id} AND status='ACTIVE'`).catch(()=>[]);
 if(!room)notFound();
 const [profile]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`).catch(()=>[]);
 if(s.role!=='ADMIN'&&String(profile?.class_level)!==String(room.class_level))notFound();
 const posts=await withDbRetry(()=>sql`SELECT p.id,p.parent_post_id,p.post_type,p.body,p.status,p.author_id,p.created_at,u.full_name,a.id AS attachment_id,a.file_name AS attachment_name,a.mime_type AS attachment_type,(st.post_id IS NOT NULL) AS is_starred FROM study_room_posts p JOIN users u ON u.id=p.author_id LEFT JOIN study_room_attachments a ON a.post_id=p.id LEFT JOIN study_room_starred_posts st ON st.post_id=p.id AND st.user_id=${s.userId} WHERE p.room_id=${id} AND (p.status='VISIBLE' OR (p.status='PENDING_REVIEW' AND p.author_id=${s.userId})) ORDER BY p.created_at ASC LIMIT 200`).catch(()=>[]);
 const rawPolls=await withDbRetry(()=>sql`SELECT p.id,p.question,p.options,(SELECT json_agg(json_build_object('option',v.option_index,'voter',v.voter_id)) FROM study_room_poll_votes v WHERE v.poll_id=p.id) votes FROM study_room_polls p WHERE p.room_id=${id} ORDER BY p.created_at DESC LIMIT 20`).catch(()=>[]);
 const polls=rawPolls.map((p:any)=>{const options=typeof p.options==='string'?JSON.parse(p.options):p.options;const votes=p.votes||[];return {id:p.id,question:p.question,options,counts:options.map((_:string,i:number)=>votes.filter((v:any)=>v.option===i).length),mine:votes.find((v:any)=>v.voter===s.userId)?.option??null}});
 const visible=posts.filter((p:any)=>!p.parent_post_id||!posts.some((q:any)=>q.id===p.parent_post_id));
 const renderPost=(p:any)=> <article className={'community-message '+(p.author_id===s.userId?'community-message-own':'community-message-peer')} key={p.id}><header><b>{p.full_name}</b><time>{new Date(p.created_at).toLocaleString('en-NG',{dateStyle:'medium',timeStyle:'short'})}</time></header>{p.body&&<p>{p.body}</p>}{p.attachment_id&&<div className="community-attachment">{String(p.attachment_type).startsWith('image/')?<a href={'/api/community/rooms/'+id+'/attachments/'+p.attachment_id} target="_blank" rel="noreferrer"><img src={'/api/community/rooms/'+id+'/attachments/'+p.attachment_id} alt={'Shared image: '+p.attachment_name} loading="lazy"/></a>:<a href={'/api/community/rooms/'+id+'/attachments/'+p.attachment_id} target="_blank" rel="noreferrer">📄 Open PDF: {p.attachment_name}</a>}</div>}{p.status==='PENDING_REVIEW'&&<small className="community-pending">Only you can see this until a moderator approves it.</small>}{p.status==='VISIBLE'&&<div className="community-post-tools"><StudyReplyAction roomId={id} postId={p.id}/><StudyMessageActions roomId={id} postId={p.id} initialStarred={Boolean(p.is_starred)}/></div>}</article>;
 return <main className="shell study-room">
 <header className="community-room-heading"><Link href="/community">← All rooms</Link><div className="community-group-identity"><span className="community-group-avatar" aria-hidden="true">📚</span><div><span className="section-kicker">{room.class_level} · {room.subject_name}</span><h1>{room.title}</h1></div></div><CommunityLiveRefresh roomId={id}/><small>Messages update automatically while this group is open.</small><p>{room.description||'Ask questions, share solutions and help classmates learn.'}</p></header>
 <StudyPolls roomId={id} polls={polls}/><section className="community-chat-shell" aria-label="Academic group conversation"><CommunityChatStream>{visible.length===0&&<p className="community-empty-chat">Start the conversation. Ask a question or share a solution with your classmates.</p>}{visible.map((p:any)=><div key={p.id} className="community-thread">{renderPost(p)}{posts.filter((reply:any)=>reply.parent_post_id===p.id).map((reply:any)=><div className="community-thread-reply" key={reply.id}>{renderPost(reply)}</div>)}</div>)}</CommunityChatStream><div className="community-chat-input"><StudyRoomComposer roomId={id}/></div></section>
 </main>;
}
