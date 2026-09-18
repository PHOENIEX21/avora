import { jss3MathematicsDeepLessons } from './jss3MathematicsDeepLessons';
import { jss3EnglishDeepLessons } from './jss3EnglishDeepLessons';
import { nerdc2025OfficialTopics } from './nerdc2025Official';

export type OfficialObjectiveRecord={
  topicId:string;
  source:'NERDC'|'AVORA_PRESERVED_PRIOR_CYCLE';
  sourceUrl:string;
  sourceFile?:string;
  sourcePage:number;
  sourcePages?:number[];
  objectives:string[];
  contentExpectations:string[];
  provenance:'SOURCE_GROUNDED';
};

/**
 * JSS1/JSS2 objective authority comes directly from the September 2025 NERDC
 * tables supplied for this rebuild. The runtime topic id and the objective-map
 * topic id therefore match exactly; the older 111-subtopic registry is retained
 * only as reusable teaching/assessment evidence and never defines current scope.
 */
const currentNerdc2025Objectives:OfficialObjectiveRecord[]=nerdc2025OfficialTopics.map(topic=>({
  topicId:topic.id,
  source:'NERDC',
  sourceUrl:topic.sourceFile,
  sourceFile:topic.sourceFile,
  sourcePage:topic.pages[0],
  sourcePages:[...topic.pages],
  objectives:[...topic.objectives],
  contentExpectations:[topic.content].filter(Boolean),
  provenance:'SOURCE_GROUNDED' as const,
}));

/** JSS3 stays on the preserved prior-cycle lesson/objective set until cohort exit. */
const jss3MathObjectives:OfficialObjectiveRecord[]=jss3MathematicsDeepLessons.map(lesson=>({
  topicId:lesson.topicId,source:'AVORA_PRESERVED_PRIOR_CYCLE',sourceUrl:lesson.source.url,sourcePage:lesson.source.page,
  sourcePages:[lesson.source.page],objectives:lesson.objectives,
  contentExpectations:lesson.teaching.map(x=>x.split('.')[0]).filter(Boolean),
  provenance:'SOURCE_GROUNDED' as const
}));
const jss3EnglishObjectives:OfficialObjectiveRecord[]=jss3EnglishDeepLessons.map(lesson=>({
  topicId:lesson.topicId,source:'AVORA_PRESERVED_PRIOR_CYCLE',sourceUrl:lesson.source.url,sourcePage:lesson.source.page,
  sourcePages:[lesson.source.page],objectives:lesson.objectives,
  contentExpectations:lesson.teaching.map(x=>x.split('.')[0]).filter(Boolean),
  provenance:'SOURCE_GROUNDED' as const
}));

export const officialObjectiveRegistry:OfficialObjectiveRecord[]=[
  ...currentNerdc2025Objectives,
  ...jss3MathObjectives,
  ...jss3EnglishObjectives,
];

export function getOfficialObjectives(topicId:string){return officialObjectiveRegistry.find(x=>x.topicId===topicId)}
