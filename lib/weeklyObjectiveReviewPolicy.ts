/** Weekly curriculum state transitions. Admin-only authorization is enforced by the API route. */
export type ObjectiveReviewAction='SUBMIT'|'APPROVE'|'PUBLISH'|'REJECT';
export type ObjectiveStatus='DRAFT'|'IN_REVIEW'|'APPROVED'|'PUBLISHED';
const allowed:Record<ObjectiveReviewAction,{from:ObjectiveStatus;to:ObjectiveStatus}>={
 SUBMIT:{from:'DRAFT',to:'IN_REVIEW'},
 APPROVE:{from:'IN_REVIEW',to:'APPROVED'},
 PUBLISH:{from:'APPROVED',to:'PUBLISHED'},
 REJECT:{from:'IN_REVIEW',to:'DRAFT'}
};
export function objectiveReviewTransition(action:ObjectiveReviewAction,current:string,reviewedBy:string|null|undefined,dayIndex:number|null|undefined){
 const transition=allowed[action];
 if(current!==transition.from)return {ok:false as const,reason:'Invalid review transition'};
 if(action==='PUBLISH'&&(!reviewedBy||!Number.isInteger(dayIndex)||dayIndex!<1||dayIndex!>5))
  return {ok:false as const,reason:'A reviewed objective and valid weekday are required'};
 return {ok:true as const,next:transition.to};
}
