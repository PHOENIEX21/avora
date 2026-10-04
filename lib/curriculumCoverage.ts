import {officialCurriculumTopicInventory,type OfficialCurriculumTopic} from './curriculumAuthority';
import {getSentCurriculumUnits} from './sentCurriculumRuntime';

export type ObjectiveEvidenceStatus='SOURCE_GROUNDED';
export type CoverageEvidence={
 topicId:string;lessonStatus:OfficialCurriculumTopic['lessonStatus']|'UNASSESSED';
 matchedTutorTopic:string|null;evidence:string;objectiveStatus:ObjectiveEvidenceStatus;
};

export function reconcileOfficialTopic(topic:OfficialCurriculumTopic):CoverageEvidence{
 const units=getSentCurriculumUnits(topic.classLevel,topic.subject,topic.topic);
 const deep=units.length>0;
 return {
  topicId:topic.id,
  lessonStatus:deep?'DEEP':'UNASSESSED',
  matchedTutorTopic:deep?topic.topic:null,
  evidence:deep
   ?`${units.length} source-backed deep-teaching unit(s) from AVORA's supplied curriculum documents are attached to this master topic.`
   :'No source-backed teaching unit is attached. V13 launch audit must fail until this is corrected.',
  objectiveStatus:'SOURCE_GROUNDED'
 };
}
export const curriculumCoverage=officialCurriculumTopicInventory.map(topic=>({topic,...reconcileOfficialTopic(topic)}));
export function coverageSummary(){
 const deep=curriculumCoverage.filter(x=>x.lessonStatus==='DEEP').length;
 return {total:curriculumCoverage.length,deep,partial:0,empty:0,unassessed:curriculumCoverage.length-deep,
  objectiveGrounded:deep,objectivePending:curriculumCoverage.length-deep,
  policy:'V13 DEEP means the master curriculum topic has source-backed runtime teaching units. Parallel legacy/revised registries do not determine runtime coverage.'};
}
