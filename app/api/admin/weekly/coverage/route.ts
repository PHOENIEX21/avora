import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
const schema=z.object({classLevel:z.enum(['JSS1','JSS2','JSS3']),term:z.coerce.number().int().min(1).max(3)});
export async function GET(request:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const parsed=schema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
 if(!parsed.success)return NextResponse.json({error:'Invalid class or term'},{status:400});
 const {classLevel,term}=parsed.data;
 try{
  const rows=await withDbRetry(()=>sql`
   SELECT cs.subject_name,cs.subject_kind,
    calendar_week.week_number,
    count(o.id)::int AS objective_count,
    count(o.id) FILTER(WHERE o.approval_status='PUBLISHED' AND o.published_at IS NOT NULL)::int AS published_count,
    count(o.id) FILTER(WHERE o.source_reference IS NULL OR btrim(o.source_reference)='')::int AS missing_sources,
    count(DISTINCT o.topic_title)::int AS topic_count
   FROM weekly_class_subjects cs
   CROSS JOIN generate_series(1,16) AS calendar_week(week_number)
   LEFT JOIN weekly_curriculum_objectives o ON o.class_level=cs.class_level
    AND o.subject_name=cs.subject_name AND o.term=${term} AND o.week_number=calendar_week.week_number
   WHERE cs.class_level=${classLevel} AND cs.active=true
   GROUP BY cs.subject_name,cs.subject_kind,calendar_week.week_number
   ORDER BY cs.subject_name,calendar_week.week_number
  `);
  return NextResponse.json({classLevel,term,coverage:rows.map(row=>({
   subjectName:row.subject_name,subjectKind:row.subject_kind,
   week:Number(row.week_number??0),objectives:Number(row.objective_count),
   published:Number(row.published_count),missingSources:Number(row.missing_sources),
   topics:Number(row.topic_count),
   status:Number(row.objective_count)===0?'EMPTY':Number(row.missing_sources)>0?'SOURCE_MISSING':
    Number(row.published_count)===Number(row.objective_count)?'PUBLISHED':'IN_PROGRESS'
  }))});
 }catch{return NextResponse.json({error:'Curriculum coverage unavailable'},{status:503})}
}
