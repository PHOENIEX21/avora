/** Pure, conservative release decision for one class/term/week. */
export type WeeklyReleaseEvidence={
 subjectCount:number;
 publishedObjectiveCount:number;
 objectivesOutsideActiveSubjects:number;
 publishedSubjectCount:number;
 objectivesWithoutSixItems:number;
 reviewedExamCount:number;
 readyTopicSets:number;
 publishedEnglishDays:number;
};
export function weeklyReleaseReadiness(e:WeeklyReleaseEvidence){
 const blockers:string[]=[];
 if(!Number.isInteger(e.subjectCount)||e.subjectCount<1)blockers.push('No active class subjects configured');
 if(e.publishedObjectiveCount<e.subjectCount)blockers.push('Published objectives are missing');
 if(e.objectivesOutsideActiveSubjects!==0)blockers.push('Published objectives reference inactive subjects');
 if(e.publishedSubjectCount!==e.subjectCount)blockers.push('Every active subject needs published objectives');
 if(e.objectivesWithoutSixItems!==0)blockers.push('Each published objective needs six approved questions');
 if(e.reviewedExamCount<e.subjectCount)blockers.push('Each active subject needs a reviewed or scheduled exam');
 if(e.readyTopicSets<e.subjectCount)blockers.push('Each subject needs a reviewed 40–50 question live topic set');
 if(e.publishedEnglishDays!==5)blockers.push('English Daily must be published for all five weekdays');
 return {ready:blockers.length===0,blockers};
}
