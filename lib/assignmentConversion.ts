import { getOfficialObjectives, officialObjectiveRegistry } from './curriculumObjectives';

export type AssignmentSegment={index:number;originalText:string};
export type AssignmentClassification={curriculumTopicId:string|null;confidence:'HIGH'|'MEDIUM'|'LOW'|'UNCLASSIFIED';matchedTerms:string[]};

const STOP=new Set(['the','a','an','and','or','of','to','in','on','for','with','is','are','be','by','from','as','this','that','your','you','find','calculate','state','write','give','what','which']);
function words(v:string){return [...new Set(String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').split(/\s+/).filter(x=>x.length>2&&!STOP.has(x)))]}

export function segmentTypedAssignment(raw:string):AssignmentSegment[]{
 const text=String(raw||'').replace(/\r/g,'').trim();
 if(!text)return [];
 const numbered=[...text.matchAll(/(?:^|\n)\s*(\d{1,3})[.)]\s+([\s\S]*?)(?=(?:\n\s*\d{1,3}[.)]\s+)|$)/g)];
 if(numbered.length>1)return numbered.map((m,i)=>({index:i+1,originalText:m[2].trim()})).filter(x=>x.originalText);
 return text.split(/\n{2,}/).map(x=>x.trim()).filter(Boolean).map((originalText,i)=>({index:i+1,originalText}));
}

export function classifyAssignmentQuestion(originalText:string,classLevel:string):AssignmentClassification{
 const wanted=new Set(words(originalText));
 let best:{id:string;score:number;terms:string[]}={id:'',score:0,terms:[]};
 for(const record of officialObjectiveRegistry){
   if(!record.topicId.toLowerCase().includes(classLevel.toLowerCase()))continue;
   const source=words([record.topicId,...record.objectives,...record.contentExpectations].join(' '));
   const matched=source.filter(x=>wanted.has(x));
   const score=matched.length;
   if(score>best.score)best={id:record.topicId,score,terms:matched};
 }
 if(best.score===0)return {curriculumTopicId:null,confidence:'UNCLASSIFIED',matchedTerms:[]};
 const confidence=best.score>=5?'HIGH':best.score>=3?'MEDIUM':'LOW';
 return {curriculumTopicId:best.id,confidence,matchedTerms:best.terms};
}

export function assignmentQuestionKind(text:string):'MULTIPLE_CHOICE'|'THEORY'{
 const value=String(text||'');
 if(/(?:^|\n)\s*[A-D][.)]\s+/m.test(value))return 'MULTIPLE_CHOICE';
 if(/\b(explain|describe|discuss|justify|compare|outline|in your own words|give reasons?)\b/i.test(value))return 'THEORY';
 return 'THEORY';
}

export function classificationEvidence(topicId:string|null){
 return topicId?getOfficialObjectives(topicId):undefined;
}
