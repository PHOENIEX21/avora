import {officialCurriculumTopicInventory} from './curriculumAuthority';

export function weeklyLessonLink(classLevel:string,subject:string,topicId:unknown):string|null{
 const topic=officialCurriculumTopicInventory.find(x=>x.id===topicId&&x.classLevel===classLevel&&x.subject===subject);
 if(!topic)return null;
 return '/tutor?'+new URLSearchParams({topic:topic.topic,subject:topic.subject,from:'weekly'}).toString();
}
