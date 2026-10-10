import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';

export async function POST(req:Request){
 const admin=await requireAdmin();
 const body=await req.json();
 const assignmentId=String(body.assignmentId||'');
 if(!assignmentId)return NextResponse.json({error:'assignmentId is required.'},{status:400});
 const [row]=await withDbRetry(()=>sql`
  UPDATE uploaded_assignments
  SET approved_at=COALESCE(approved_at,now()),reviewed_by=${admin.userId},status='APPROVED',updated_at=now()
  WHERE id=${assignmentId}
  RETURNING id,student_id,subject_name,label,approved_at`);
 if(!row)return NextResponse.json({error:'Submission not found.'},{status:404});
 await withDbRetry(()=>sql`
  INSERT INTO student_notifications(student_id,kind,title,body,href,entity_key)
  VALUES(${row.student_id},'ASSIGNMENT_APPROVED','School work approved',
   ${String(row.subject_name||'School work')+' · '+String(row.label||'Your submitted work')},
   ${'/school-work/'+row.id},${'assignment-approved:'+row.id})
  ON CONFLICT DO NOTHING`);
 return NextResponse.json({ok:true,assignmentId:String(row.id),approvedAt:row.approved_at});
}
