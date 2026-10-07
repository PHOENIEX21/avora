import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';

export default async function AskPage(){
 const s=await getSession();if(!s)redirect('/login');await requireStudentLearningAccess(s);
 return <main className="shell academic-action-page"><header className="academic-action-head"><span>ASK AVORA · SCHOOL WORK</span><h1>Bring in what you are learning at school.</h1><p>Choose the subject, type or upload the question exactly as your teacher gave it. AVORA keeps it with your learning record; approved questions can be solved and reused for practice.</p></header><section className="academic-choice-grid"><Link href="/school-work"><b>Submit a question or assignment</b><span>Type a question, include options when there are any, or upload school work.</span><strong>Start →</strong></Link><Link href="/school-work"><b>My submitted work</b><span>Track what you sent, when you sent it, approval status and available solutions.</span><strong>View history →</strong></Link></section></main>;
}
