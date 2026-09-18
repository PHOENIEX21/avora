import PracticeClient from '@/components/PracticeClient';import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';import {redirect} from 'next/navigation';import {Suspense} from 'react';
export default async function PracticePage(){const s=await getSession();if(!s)redirect('/login');
 await requireStudentLearningAccess(s);return <main className="practice-page"><Suspense fallback={<div className="practice-stage">Preparing your class-level practice…</div>}><PracticeClient/></Suspense></main>}
