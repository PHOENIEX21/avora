import source from '@/data/nerdc-2025-official-jss1-jss2.json';

export type Nerdc2025OfficialTopic={
 classLevel:'JSS1'|'JSS2'; subject:'Mathematics'|'English Language'; theme:string; topic:string;
 tableTopic:string; objectives:string[]; content:string; evaluation:string; sourceFile:string; pages:number[];
 sourceVersion:string; authority:string; official:true;
};

const slug=(value:string)=>value.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const NERDC_2025_VERSION='NERDC_NEW_REVISED_BEC_SEPTEMBER_2025' as const;
export const nerdc2025OfficialTopics=(source.records as Nerdc2025OfficialTopic[]).map((record,index)=>({
 ...record,
 id:`nerdc-2025-${record.classLevel.toLowerCase()}-${record.subject==='Mathematics'?'math':'english'}-${slug(record.topic)}`,
 officialOrder:index+1,
}));
export type Nerdc2025RuntimeTopic=(typeof nerdc2025OfficialTopics)[number];

export function isNerdc2025Class(classLevel:string){return classLevel==='JSS1'||classLevel==='JSS2'}
export function officialNerdc2025Topics(classLevel:string,subject:string){
 return nerdc2025OfficialTopics.filter(topic=>topic.classLevel===classLevel&&topic.subject===subject);
}
export function officialNerdc2025TopicNames(classLevel:string,subject:string){
 return officialNerdc2025Topics(classLevel,subject).map(topic=>topic.topic);
}
export function officialNerdc2025Topic(classLevel:string,subject:string,topic:string){
 return nerdc2025OfficialTopics.find(item=>item.classLevel===classLevel&&item.subject===subject&&item.topic===topic);
}
export function nerdc2025OfficialSummary(){
 const by=(c:string,s:string)=>nerdc2025OfficialTopics.filter(x=>x.classLevel===c&&x.subject===s).length;
 return {total:nerdc2025OfficialTopics.length,JSS1:{Mathematics:by('JSS1','Mathematics'),English:by('JSS1','English Language')},JSS2:{Mathematics:by('JSS2','Mathematics'),English:by('JSS2','English Language')},version:NERDC_2025_VERSION};
}
