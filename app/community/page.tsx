import {redirect} from 'next/navigation';
import Link from 'next/link';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {sql,withDbRetry} from '@/lib/db';

export const dynamic='force-dynamic';
export default async function CommunityPage(){
 const s=await getSession();if(!s)redirect('/login');await requireStudentLearningAccess(s);
 const [p]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`,2);
 const level=String(p?.class_level||'JSS3');
 const rooms=await withDbRetry(()=>sql`SELECT r.id,r.title,r.subject_name,r.curriculum_topic_id,COUNT(p.id)::int AS posts FROM study_rooms r LEFT JOIN study_room_posts p ON p.room_id=r.id AND p.status='VISIBLE' WHERE r.class_level=${level} AND r.status='ACTIVE' GROUP BY r.id ORDER BY r.subject_name,r.title LIMIT 40`,2).catch(()=>[]);
 return <main className="shell community-page"><header className="academic-action-head"><span>{level} · STUDY TOGETHER</span><h1>Your academic community.</h1><p>Ask subject questions, compare working and help classmates understand. Study Rooms are organised by class and subject so useful learning does not disappear inside a general feed.</p><div className="academic-section-actions"><Link href="/home">← Today</Link><Link href="/learn">Continue learning →</Link></div></header>{rooms.length?<section className="study-room-list">{rooms.map((r:any)=><Link href={'/community/'+r.id} key={r.id}><div><small>{r.subject_name}</small><h2>{r.title}</h2><span>{r.curriculum_topic_id?'Topic room':'Subject room'}</span></div><strong>{r.posts} {r.posts===1?'post':'posts'} →</strong></Link>)}</section>:<section className="community-empty"><h2>Study Rooms are being prepared for {level}.</h2><p>Your learning and school-work areas remain available while rooms are created and moderated.</p></section>}</main>;
}
