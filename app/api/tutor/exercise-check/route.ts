import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';
import {checkNerdc2025Exercise} from '@/lib/nerdc2025Exercises';
import {checkJss3EnglishExercise} from '@/lib/jss3EnglishTeaching';
import {checkJss3MathExercise} from '@/lib/jss3ProvisionalMathematics';

export async function POST(req:Request){
 const session=await getSession();if(!session)return NextResponse.json({error:'Please sign in again.'},{status:401});
 try{
  const body=await req.json();const questionId=String(body?.questionId||'');const answer=String(body?.answer||'');
  if(!questionId||!answer.trim())return NextResponse.json({error:'Choose an answer first.'},{status:400});
  const result=checkJss3EnglishExercise(questionId,answer)||checkJss3MathExercise(questionId,answer)||checkNerdc2025Exercise(questionId,answer);if(!result)return NextResponse.json({error:'This exercise question is not part of the verified NERDC bank.'},{status:404});
  return NextResponse.json(result,{headers:{'Cache-Control':'no-store'}});
 }catch(error){console.error('tutor exercise check',error);return NextResponse.json({error:'AVORA could not mark this exercise just now.'},{status:503})}
}
