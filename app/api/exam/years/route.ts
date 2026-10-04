import {learningAccessDenial} from '@/lib/apiAccess';
import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

export async function GET(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:'Please sign in again.'},{status:401});const accessDenied=await learningAccessDenial(s);if(accessDenied)return accessDenied;
 const url=new URL(req.url);const exam=url.searchParams.get('exam');const subject=url.searchParams.get('subject');
 if(!['BECE','NCEE'].includes(String(exam))||!['Mathematics','English Language'].includes(String(subject)))return NextResponse.json({error:'Invalid exam or subject.'},{status:400});
 const rows=await withDbRetry(()=>sql`SELECT exam_year,paper_structure,availability_status,rights_status,questions_available,solutions_available,source_label,source_url,direct_reproduction_allowed
 FROM exam_year_registry WHERE exam_name=${exam} AND subject_name=${subject} AND questions_available=true ORDER BY exam_year DESC`);
 return NextResponse.json({years:rows.map((r:any)=>({year:Number(r.exam_year),paperStructure:r.paper_structure,status:r.availability_status,rights:r.rights_status,solutions:Boolean(r.solutions_available),sourceLabel:r.source_label,sourceUrl:r.source_url,directReproductionAllowed:Boolean(r.direct_reproduction_allowed)}))});
}
