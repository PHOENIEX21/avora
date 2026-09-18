import type {TutorPlan,TutorUnit} from './tutorCurriculum';
import {masterTopics,masterTopicByName} from './masterCurriculum';
import {getSentCurriculumCourse,getSentCurriculumUnits} from './sentCurriculumRuntime';
import {teachingMapFor} from './deepTeachingArchitecture';
import {getNerdc2025DeepUnits} from './nerdc2025Teaching';
import {officialNerdc2025Topic,isNerdc2025Class} from './nerdc2025Official';

export function getOfficialTopicNames(classLevel:string,subject:string):string[]{
 return masterTopics(classLevel,subject).map(x=>x.topic);
}

/**
 * V13 compatibility adapter for Admin Academic Preview.
 * A "deep lesson" is now the source-backed master topic itself, not an older parallel registry.
 */
export type MasterDeepLesson={
 topicId:string;classLevel:string;subject:string;topic:string;term:number|null;units:TutorUnit[];
};
export function getDeepCurriculumLesson(classLevel:string,subject:string,topic:string):MasterDeepLesson|undefined{
 const master=masterTopicByName(classLevel,subject,topic);
 if(!master)return undefined;
 const units=isNerdc2025Class(classLevel)?mergeUnits(getSentCurriculumUnits(classLevel,subject,topic),getNerdc2025DeepUnits(classLevel,subject,topic)):getSentCurriculumUnits(classLevel,subject,topic);
 if(!units.length)return undefined;
 return {topicId:master.id,classLevel,subject,topic,term:master.term,units};
}
export function deepLessonToTutorPlan(lesson:MasterDeepLesson):TutorPlan{
 const lessonMap=teachingMapFor(lesson.topic,lesson.classLevel);
 return {
  goal:`Master ${lesson.topic} completely, following AVORA's supplied deep-teaching source material in order.`,
  why:lesson.term?`This is a Term ${lesson.term} topic from the AVORA Master Curriculum. Every source-backed unit, example, reasoning bridge and learner checkpoint attached to this topic must be completed before mastery is claimed.`:`This is an official September 2025 NERDC topic. AVORA preserves the official topic and performance objectives while teaching them through explicit, source-backed lesson units before mastery is claimed.`,
  outcomes:[`Complete every source-backed teaching unit and independent checkpoint for ${lesson.topic}.`],
  units:lessonMap?applyTeachingMap(lesson.units,lesson.classLevel,lesson.topic):lesson.units
 };
}


function mergeUnits(primary:TutorUnit[],secondary:TutorUnit[]){
 const seen=new Set<string>();const out:TutorUnit[]=[];
 for(const unit of [...primary,...secondary]){const key=`${unit.sourceOrigin||''}|${unit.title}`;if(seen.has(key))continue;seen.add(key);out.push(unit)}
 return out;
}

function applyTeachingMap(units:TutorUnit[],classLevel:string,topic:string){
 const map=teachingMapFor(topic,classLevel);
 if(!map)return units;
 const mapped={noJumpChecks:map?.noJumpChecks};
 return units.map(unit=>({
  ...unit,
  teachingTypes:unit.teachingTypes?.length?unit.teachingTypes:map?.types.map(type=>`${type.name}: ${type.description}`),
  noJumpChecks:[...(unit.noJumpChecks||[]),...(mapped.noJumpChecks||[])],
  outcomes:[...(unit.outcomes||[]),map.governingIdea],
 }));
}

export function getCurriculumTutorPlan(classLevel:string,subject:string,topic:string):TutorPlan|undefined{
 // Source courses remain supported for owner/audit use but are not surfaced as curriculum topics.
 const sourceCourse=getSentCurriculumCourse(classLevel,subject,topic);
 if(sourceCourse)return {...sourceCourse,units:applyTeachingMap(sourceCourse.units,classLevel,topic)};

 const master=masterTopicByName(classLevel,subject,topic);
 if(!master)return undefined; // old/parallel curriculum names cannot silently enter runtime.
 const sent=getSentCurriculumUnits(classLevel,subject,topic);
 const units=isNerdc2025Class(classLevel)?mergeUnits(sent,getNerdc2025DeepUnits(classLevel,subject,topic)):sent;
 if(!units.length)return undefined; // launch audit treats this as a release blocker.
 const official=officialNerdc2025Topic(classLevel,subject,topic);
 return {
  goal:official?`Master every official NERDC performance objective for ${master.classLevel} ${master.subject}: ${master.topic}.`:`Master the complete ${master.classLevel} ${master.subject} requirements for ${master.topic}.`,
  why:official?`This lesson is anchored to the September 2025 NERDC New Revised Basic Education Curriculum (${official.sourceFile}, page${official.pages.length>1?'s':''} ${official.pages.join(', ')}). AVORA may split the topic into smaller teaching units, but it may not omit or silently replace the official performance objectives.`:`This lesson is governed by the AVORA Master Curriculum and taught from the supplied deep-teaching source documents. Topic coverage is not enough: AVORA must teach every attached source step, worked example, misconception bridge and learner checkpoint before independent mastery.`,
  outcomes:official?official.objectives:[`Teach and verify all ${units.length} source-backed unit(s) attached to this master topic.`],
  units:applyTeachingMap(units,classLevel,topic)
 };
}
