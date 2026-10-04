import source from '@/data/ncee-source-content-v14.8.json';
import type {NceeDomain,PrimaryPrepClass} from './nceePrep';

export type NceeSourceTopic={
  id:string;classLevel:PrimaryPrepClass;domain:NceeDomain;subject:string;term:string;title:string;
  strand:string|null;subtopics:string[];concepts:string[];workedExamples:string[];practiceQuestions:string[];
  sourceFile:string;sourceLineStart:number;contentStatus:'TEACHING_READY'|'PRACTICE_ONLY'|'ASSESSMENT_ONLY';
  completionBasis?:string; completionVersion?:string;
};

const topics=source.topics as NceeSourceTopic[];

export function nceeSourceTopicsFor(classLevel:string,domain?:string){
  return topics.filter(t=>t.contentStatus==='TEACHING_READY'&&t.classLevel===classLevel&&(!domain||t.domain===domain));
}
export function nceeSourceTopicById(id:string){return topics.find(t=>t.contentStatus==='TEACHING_READY'&&t.id===id)||null}
export function nceeSourcePracticeOnlyFor(classLevel:string,domain?:string){return topics.filter(t=>t.contentStatus==='PRACTICE_ONLY'&&t.classLevel===classLevel&&(!domain||t.domain===domain));}
export function nceeSourceAssessmentOnlyFor(classLevel:string,domain?:string){return topics.filter(t=>t.contentStatus==='ASSESSMENT_ONLY'&&t.classLevel===classLevel&&(!domain||t.domain===domain));}
export const NCEE_SOURCE_TOPIC_COUNT=topics.length;
export const NCEE_SOURCE_FILES=source.sourceFiles;

function stripInstructionPrefix(text:string){
  return text
   .replace(/^Step\s+\d+\s*[—–-]\s*/i,'')
   .replace(/^Establish\s+/i,'')
   .replace(/^Recall\s+WHY\s+/i,'Remember why ')
   .trim();
}

function splitForTeaching(text:string){
  const cleaned=stripInstructionPrefix(text);
  return cleaned.split(/(?<=[.!?])\s+(?=[A-Z0-9“"'(...)])/).map(x=>x.trim()).filter(Boolean);
}

export function nceeSourceDeepLesson(topic:NceeSourceTopic){
  const conceptSteps=topic.concepts.flatMap(splitForTeaching);
  const sourceExamples=topic.workedExamples.flatMap(splitForTeaching);
  const checks=topic.practiceQuestions.map(x=>x.trim()).filter(Boolean);
  const teacherSteps=[
    ...conceptSteps.map((text,i)=>({
      id:`concept-${i+1}`,
      kind:'concept' as const,
      narration:i===0?`Let us build ${topic.title.toLowerCase()} carefully. ${text}`:text,
      board:text.length<=150?text:`${text.slice(0,147).trimEnd()}…`,
    })),
    ...sourceExamples.map((text,i)=>({
      id:`example-${i+1}`,
      kind:'worked-example' as const,
      narration:text,
      board:text.length<=170?text:`${text.slice(0,167).trimEnd()}…`,
    })),
  ];
  return {
    ...topic,
    objective:`Understand ${topic.title.toLowerCase()}, explain the idea in your own words, and answer a fresh ${topic.classLevel} question independently.`,
    prerequisitePrompt:topic.classLevel==='Primary 5'
      ?'Start from a familiar example. Say what you already know before using a rule.'
      :'Recall the simpler idea first, then explain why the method works before using it quickly.',
    teacherSteps,
    checks,
    masteryChecks:[
      `Can you explain ${topic.title.toLowerCase()} without reading the lesson back word-for-word?`,
      checks[0]||`Can you answer a fresh ${topic.title.toLowerCase()} question without a hint?`,
      'Can you explain why one tempting wrong answer is wrong?',
    ],
    sourcePolicy:'Authored NCEE source transformed into student-safe teaching steps; internal notes and raw tables are excluded from narration.',
  };
}
