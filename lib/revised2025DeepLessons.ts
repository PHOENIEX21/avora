import {revised2025CurrentTopics,type Revised2025Topic} from './revised2025Curriculum';
import {revised2025SupplementalLessons} from './revised2025SupplementalLessons';
import {jss1MathematicsDeepLessons} from './jss1MathematicsDeepLessons';
import {jss2MathematicsDeepLessons} from './jss2MathematicsDeepLessons';
import {jss1EnglishDeepLessons} from './jss1EnglishDeepLessons';
import {jss2EnglishDeepLessons} from './jss2EnglishDeepLessons';

export type Revised2025DeepLesson={
 topicId:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';strand:string;topic:string;
 source:{authority:'NERDC';url:string;version:'NEW_REVISED_BEC_2025';verification:Revised2025Topic['verification']};
 objectives:string[];prerequisites:string[];teaching:string[];workedExamples:string[];misconceptions:string[];
 guidedPractice:string[];independentPractice:string[];mastery:{criterion:string;status:'DEEP_WHEN_PASSED'};boardReady:true;
 evidenceLessonIds:string[];
};

type Evidence={topicId:string;prerequisites:string[];teaching:string[];workedExamples:string[];misconceptions:string[];guidedPractice:string[];independentPractice:string[];mastery:{criterion:string;status:string};boardReady:true};
const evidence:Evidence[]=[...jss1MathematicsDeepLessons,...jss2MathematicsDeepLessons,...jss1EnglishDeepLessons,...jss2EnglishDeepLessons,...revised2025SupplementalLessons] as Evidence[];
const evidenceById=new Map(evidence.map(x=>[x.topicId,x]));
const unique=(items:string[])=>[...new Set(items.filter(Boolean))];

function compose(t:Revised2025Topic):Revised2025DeepLesson|undefined{
 const parts=t.evidenceLessonIds.map(id=>evidenceById.get(id));
 if(parts.some(x=>!x))return undefined;
 const found=parts as Evidence[];
 return {
  topicId:t.id,classLevel:t.classLevel,subject:t.subject,strand:t.strand,topic:t.topic,
  source:{authority:'NERDC',url:'https://www.nerdc.gov.ng/content_manager/new_curriculum_home.html',version:'NEW_REVISED_BEC_2025',verification:t.verification},
  objectives:t.objectives,
  prerequisites:unique(found.flatMap(x=>x.prerequisites)),
  teaching:unique(found.flatMap(x=>x.teaching)),
  workedExamples:unique(found.flatMap(x=>x.workedExamples)),
  misconceptions:unique(found.flatMap(x=>x.misconceptions)),
  guidedPractice:unique(found.flatMap(x=>x.guidedPractice)),
  independentPractice:unique(found.flatMap(x=>x.independentPractice)),
  mastery:{criterion:`Master every revised-2025 objective for ${t.topic}; achieve at least 80% on independent topic evidence and complete any required performance task without step-by-step carrying. ${found.map(x=>x.mastery.criterion).join(' ')}`,status:'DEEP_WHEN_PASSED'},
  boardReady:true,evidenceLessonIds:t.evidenceLessonIds
 };
}

export const revised2025DeepLessons:Revised2025DeepLesson[]=revised2025CurrentTopics.map(compose).filter((x):x is Revised2025DeepLesson=>Boolean(x));
export const unresolvedRevised2025Evidence=revised2025CurrentTopics.flatMap(t=>t.evidenceLessonIds.filter(id=>!evidenceById.has(id)).map(id=>({topicId:t.id,evidenceId:id})));
export function getRevised2025DeepLesson(id:string){return revised2025DeepLessons.find(x=>x.topicId===id)}
