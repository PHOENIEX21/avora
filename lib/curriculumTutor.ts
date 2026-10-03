import {getTutorPlan,type TutorPlan,type TutorUnit} from './tutorCurriculum';
import {jss3WholeNumbersTopic,jss3RationalNonRationalTopic,jss3BaseTwoOperationsTopic,jss3FactorizationTopic,jss3FractionEquationsTopic,jss3SimultaneousLinearTopic,jss3SimilarShapesTopic,jss3TrigonometryTopic,jss3AreaPlaneFiguresTopic,jss3ConstructionTopic,jss3CentralTendencyTopic,jss3DataPresentationTopic,jss3VariationTopic,jss3ChangeSubjectTopic,jss3ElevationDepressionTopic} from './jss3ProvisionalMathematics';
import {masterTopics,masterTopicByName} from './masterCurriculum';
import {getSentCurriculumCourse,getSentCurriculumUnits} from './sentCurriculumRuntime';
import {teachingMapFor} from './deepTeachingArchitecture';
import {getNerdc2025DeepUnits} from './nerdc2025Teaching';
import {officialNerdc2025Topic,isNerdc2025Class} from './nerdc2025Official';
import {jss3EnglishLessons,jss3EnglishTutorPlan} from './jss3EnglishTeaching';

export function getOfficialTopicNames(classLevel:string,subject:string):string[]{
 if(classLevel==='JSS3'&&subject==='English Language')return jss3EnglishLessons.map(x=>x.topic);
 if(classLevel==='JSS3'&&subject==='Mathematics')return [jss3WholeNumbersTopic,jss3RationalNonRationalTopic,jss3BaseTwoOperationsTopic,jss3FactorizationTopic,jss3FractionEquationsTopic,jss3SimultaneousLinearTopic,jss3SimilarShapesTopic,jss3TrigonometryTopic,jss3AreaPlaneFiguresTopic,jss3ConstructionTopic,jss3CentralTendencyTopic,jss3DataPresentationTopic,jss3VariationTopic,jss3ChangeSubjectTopic,jss3ElevationDepressionTopic];
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
 const units=isNerdc2025Class(classLevel)?getNerdc2025DeepUnits(classLevel,subject,topic):getSentCurriculumUnits(classLevel,subject,topic);
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
 if(classLevel==='JSS3'&&subject==='English Language'){const authored=jss3EnglishTutorPlan(topic);return authored?{...authored,units:applyTeachingMap(authored.units,classLevel,topic)}:undefined;}
 // JSS3 Mathematics has a complete authored BECE bank. It is authoritative and must
 // win before legacy/sent curriculum sources.
 if(classLevel==='JSS3'&&subject==='Mathematics'){
  const authored=getTutorPlan('BECE',subject,topic);
  if(authored)return {...authored,units:applyTeachingMap(authored.units,classLevel,topic)};
 }

 const master=masterTopicByName(classLevel,subject,topic);
 if(!master)return undefined; // old/parallel curriculum names cannot silently enter runtime.
 const sent=getSentCurriculumUnits(classLevel,subject,topic);
 // Revised JSS1/JSS2 topics must expose only the newly authored NERDC deep lesson.
 // Legacy source courses are deliberately not allowed to override these revised topics.
 // Do not merge legacy/sent curriculum units into learner teaching.
 const units=isNerdc2025Class(classLevel)?getNerdc2025DeepUnits(classLevel,subject,topic):sent;
 if(!units.length)return undefined; // launch audit treats this as a release blocker.
 const official=officialNerdc2025Topic(classLevel,subject,topic);
 return {
  goal:official?`Master every official NERDC performance objective for ${master.classLevel} ${master.subject}: ${master.topic}.`:`Master the complete ${master.classLevel} ${master.subject} requirements for ${master.topic}.`,
  why:official?`This lesson is anchored to the September 2025 NERDC New Revised Basic Education Curriculum (${official.sourceFile}, page${official.pages.length>1?'s':''} ${official.pages.join(', ')}). AVORA may split the topic into smaller teaching units, but it may not omit or silently replace the official performance objectives.`:`This lesson is governed by the AVORA Master Curriculum and taught from the supplied deep-teaching source documents. Topic coverage is not enough: AVORA must teach every attached source step, worked example, misconception bridge and learner checkpoint before independent mastery.`,
  outcomes:official?official.objectives:[`Teach and verify all ${units.length} source-backed unit(s) attached to this master topic.`],
  units:applyTeachingMap(units,classLevel,topic)
 };
}
