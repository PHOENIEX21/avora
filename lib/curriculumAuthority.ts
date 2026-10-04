import {masterTopics} from './masterCurriculum';
import {isNerdc2025Class,officialNerdc2025Topic,NERDC_2025_VERSION} from './nerdc2025Official';

/**
 * Runtime curriculum authority.
 * JSS1/JSS2 use the actual September 2025 NERDC New Revised BEC tables supplied by the user.
 * JSS3 remains on the preserved prior-cycle AVORA master inventory until that cohort exits.
 */
export type OfficialCurriculumTopic={
 id:string;
 classLevel:'JSS1'|'JSS2'|'JSS3';
 subject:'Mathematics'|'English Language';
 strand:string;
 subTheme?:string;
 topic:string;
 officialOrder:number;
 term:1|2|3|null;
 sourceKey:'nerdc-revised-bec-september-2025'|'avora-master-curriculum';
 inventoryStatus:'OFFICIAL_NERDC_TOPIC'|'MASTER_TOPIC_MAPPED';
 lessonStatus:'DEEP';
 sourcePages?:number[];
 performanceObjectives?:string[];
};

function strandFor(subject:OfficialCurriculumTopic['subject'],topic:string,theme?:string){
 if(theme)return theme;
 if(subject==='Mathematics'){
  if(/statistic|data|mean|median|mode|pie chart|probability/i.test(topic))return 'Statistics and Data';
  if(/shape|angle|construction|bearing|trig|area|volume|polygon/i.test(topic))return 'Geometry and Mensuration';
  if(/algebra|equation|factor|symbol|inequal|graph/i.test(topic))return 'Algebraic Processes';
  return 'Numbers and Operations';
 }
 const prefix=topic.split(':')[0].trim();
 if(/^Speech Work$/i.test(prefix))return 'Speech Work';
 if(/^Grammar$/i.test(prefix))return 'Grammar';
 if(/^Comprehension$/i.test(prefix))return 'Comprehension';
 if(/^Composition$/i.test(prefix))return 'Composition';
 if(/^Literature$/i.test(prefix))return 'Literature';
 return 'English Studies';
}

const allMaster=[
 ...masterTopics('JSS1','Mathematics'),...masterTopics('JSS1','English Language'),
 ...masterTopics('JSS2','Mathematics'),...masterTopics('JSS2','English Language'),
 ...masterTopics('JSS3','Mathematics'),...masterTopics('JSS3','English Language'),
];
export const officialCurriculumTopicInventory:OfficialCurriculumTopic[]=allMaster.map((x,index)=>{
 const nerdc=officialNerdc2025Topic(x.classLevel,x.subject,x.topic);
 return {
  id:x.id,classLevel:x.classLevel,subject:x.subject,term:x.term,topic:x.topic,
  strand:strandFor(x.subject,x.topic,nerdc?.theme),officialOrder:index+1,
  sourceKey:nerdc?'nerdc-revised-bec-september-2025':'avora-master-curriculum',
  inventoryStatus:nerdc?'OFFICIAL_NERDC_TOPIC':'MASTER_TOPIC_MAPPED',lessonStatus:'DEEP',
  sourcePages:nerdc?.pages,performanceObjectives:nerdc?.objectives,
 };
});
export const officialMathematicsTopicInventory=officialCurriculumTopicInventory.filter(x=>x.subject==='Mathematics');
export const officialEnglishTopicInventory=officialCurriculumTopicInventory.filter(x=>x.subject==='English Language');

export function curriculumInventorySummary(){
 const by=(subject:OfficialCurriculumTopic['subject'],classLevel:OfficialCurriculumTopic['classLevel'])=>
  officialCurriculumTopicInventory.filter(x=>x.subject===subject&&x.classLevel===classLevel).length;
 return {
  totalOfficialTopics:officialCurriculumTopicInventory.length,
  mathematics:{total:officialMathematicsTopicInventory.length,JSS1:by('Mathematics','JSS1'),JSS2:by('Mathematics','JSS2'),JSS3:by('Mathematics','JSS3')},
  english:{total:officialEnglishTopicInventory.length,JSS1:by('English Language','JSS1'),JSS2:by('English Language','JSS2'),JSS3:by('English Language','JSS3')},
  currentCohortRegistryStatus:'NERDC_SEPTEMBER_2025_OFFICIAL' as const,
  jss3RegistryStatus:'PRIOR_CYCLE_PRESERVED' as const,
  lessonDepthStatus:'SOURCE_BACKED_DEEP_TEACHING' as const
 };
}

export const curriculumAuthorities=[
 {key:'nerdc-revised-bec-september-2025',jurisdiction:'Nigeria',stage:'JSS1–JSS2',subjects:['Mathematics','English Language'],authority:'Nigerian Educational Research and Development Council (NERDC)',title:'New Revised Basic Education Curriculum — September 2025',status:'CURRENT_COHORT_RUNTIME_AUTHORITY',use:'Exact supplied NERDC topic tables, pages, performance objectives, content/skills and evaluation requirements define JSS1/JSS2 runtime scope.'},
 {key:'avora-master-curriculum',jurisdiction:'Nigeria',stage:'JSS3',subjects:['Mathematics','English Language'],authority:'AVORA preserved prior-cycle source set',title:'Prior-cycle JSS3 curriculum inventory',status:'PRESERVED_UNTIL_COHORT_EXIT',use:'Keeps the existing JSS3 cohort stable while JSS1/JSS2 use the September 2025 revised BEC.'}
] as const;

export const englishCurriculumStrands=['Listening and Speaking','Reading','Grammatical Accuracy','Writing','Literature'] as const;
export const mathematicsCurriculumCore=officialMathematicsTopicInventory;

export function curriculumTrustSummary(){
 return {
  policy:'For JSS1/JSS2, the supplied September 2025 NERDC tables define topic scope and objectives; AVORA-authored deep lessons explain that scope without replacing it. JSS3 remains on the preserved prior-cycle inventory.',
  currentCohortVersion:NERDC_2025_VERSION,
  mathematicsCoreNodes:officialMathematicsTopicInventory.length,
  mathematicsClasses:['JSS1','JSS2','JSS3'],
  englishRequiredStrands:[...englishCurriculumStrands],
  officialTopicInventory:curriculumInventorySummary(),
  englishStatus:'NERDC_2025_SOURCE_BACKED' as const,
  warning:'Do not market completeness from old registry counts. Completeness means every current official performance objective has source-backed teaching and assessment evidence.'
 };
}
