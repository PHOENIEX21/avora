import {getSession} from '@/lib/auth';
import {requireStudentLearningAccess} from '@/lib/learningAccess';
import {redirect} from 'next/navigation';
import {sql,withDbRetry} from '@/lib/db';
import ExamClient from '@/components/ExamClient';
import {getOfficialTopicNames} from '@/lib/curriculumTutor';
export default async function Exam(){const s=await getSession();if(!s)redirect('/login');
 await requireStudentLearningAccess(s);const [p]=await withDbRetry(()=>sql`SELECT class_level FROM student_profiles WHERE user_id=${s.userId}`);const raw=String(p?.class_level||'JSS3');if(raw==='Primary 5'||raw==='Primary 6')redirect('/common-entrance/mock');const classLevel=(['JSS1','JSS2','JSS3'].includes(raw)?raw:'JSS3') as 'JSS1'|'JSS2'|'JSS3';return <ExamClient classLevel={classLevel} topicOptions={{'Mathematics':getOfficialTopicNames(classLevel,'Mathematics'),'English Language':getOfficialTopicNames(classLevel,'English Language')}}/>}
