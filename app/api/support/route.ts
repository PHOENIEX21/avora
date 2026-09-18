import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {requirePremiumFeature} from '@/lib/premiumAccess';

export async function GET(){
 const s=await getSession();
 if(!s)return NextResponse.json({error:'Unauthorized'},{status:401});
 if(s.role==='ADMIN')return NextResponse.json({error:'Use the admin support queue.'},{status:403});
 const threads=await withDbRetry(()=>sql`
  SELECT st.id,st.title,st.category,st.subject,st.status,st.priority,st.current_topic_snapshot,
         st.last_message_at,st.created_at,
         (SELECT body FROM support_messages sm WHERE sm.thread_id=st.id ORDER BY sm.created_at DESC LIMIT 1) last_message,
         (SELECT sender_role FROM support_messages sm WHERE sm.thread_id=st.id ORDER BY sm.created_at DESC LIMIT 1) last_sender
  FROM support_threads st
  WHERE st.student_id=${s.userId}
  ORDER BY st.last_message_at DESC
 `);
 return NextResponse.json({threads});
}

export async function POST(req:Request){
 const s=await getSession();
 if(!s)return NextResponse.json({error:'Unauthorized'},{status:401});
 if(s.role!=='STUDENT')return NextResponse.json({error:'Student support is available to learner accounts.'},{status:403});
 const premiumDenied=await requirePremiumFeature(s,'Human Academic Support');if(premiumDenied)return premiumDenied;
 const b=await req.json();
 const title=String(b.title||'').trim().slice(0,160),body=String(b.message||'').trim().slice(0,4000);
 const category=String(b.category||'LEARNING_HELP').slice(0,60),subject=String(b.subject||'').trim().slice(0,100)||null;
 if(!title||!body)return NextResponse.json({error:'Add a short subject and tell us how we can help.'},{status:400});
 try{
  const [profile,topic,remediation]=await Promise.all([
   withDbRetry(()=>sql`SELECT class_level,preferred_subject,target_exam FROM student_profiles WHERE user_id=${s.userId}`),
   withDbRetry(()=>sql`SELECT topic_name,last_unit_title,last_interaction_at FROM tutor_topic_progress WHERE student_id=${s.userId} ORDER BY last_interaction_at DESC NULLS LAST,updated_at DESC LIMIT 1`),
   withDbRetry(()=>sql`SELECT recommended_topic,plan_reason FROM remediation_plans WHERE student_id=${s.userId} AND status='ACTIVE' ORDER BY created_at DESC LIMIT 1`)
  ]);
  const p=profile[0],t=topic[0],r=remediation[0];
  const context={preferredSubject:p?.preferred_subject||null,targetExam:p?.target_exam||null,lastTutorUnit:t?.last_unit_title||null,lastTutorInteraction:t?.last_interaction_at||null,recommendedTopic:r?.recommended_topic||null,remediationReason:r?.plan_reason||null};
  const created=await sql.begin(async tx=>{
   const [thread]=await tx`INSERT INTO support_threads(student_id,category,subject,title,class_level_snapshot,current_topic_snapshot,context_snapshot,status,last_message_at) VALUES(${s.userId},${category},${subject},${title},${p?.class_level||null},${t?.topic_name||r?.recommended_topic||null},${tx.json(context)},'OPEN',now()) RETURNING id`;
   await tx`INSERT INTO support_messages(thread_id,sender_id,sender_role,body) VALUES(${thread.id},${s.userId},'STUDENT',${body})`;
   await tx`INSERT INTO support_thread_events(thread_id,actor_id,event_type,event_data) VALUES(${thread.id},${s.userId},'THREAD_CREATED',${tx.json({category,subject})})`;
   return thread;
  });
  return NextResponse.json({id:created.id});
 }catch(e){console.error(e);return NextResponse.json({error:'Could not start the support conversation.'},{status:500})}
}
