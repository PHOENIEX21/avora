import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sql,withDbRetry } from '@/lib/db';
import { z } from 'zod';
const schema=z.object({classLevel:z.enum(['JSS1','JSS2','JSS3']),targetExam:z.enum(['NCEE','BECE']),preferredSubject:z.enum(['Mathematics','English']),learningGoal:z.string().min(2).max(160),dailyGoalMinutes:z.number().int().min(10).max(60),confidenceLevel:z.number().int().min(1).max(5)});
export async function POST(req:Request){
 const session=await getSession(); if(!session)return NextResponse.json({error:'Unauthorized'},{status:401});
 const parsed=schema.safeParse(await req.json()); if(!parsed.success)return NextResponse.json({error:'Please complete every field.'},{status:400});
 const d=parsed.data;
 await withDbRetry(()=>sql`UPDATE student_profiles SET class_level=${d.classLevel},target_exam=${d.targetExam},preferred_subject=${d.preferredSubject},learning_goal=${d.learningGoal},daily_goal_minutes=${d.dailyGoalMinutes},confidence_level=${d.confidenceLevel},onboarding_completed=true,updated_at=now() WHERE user_id=${session.userId}`);
 return NextResponse.json({ok:true});
}
