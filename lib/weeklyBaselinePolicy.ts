/**
 * A starting check is diagnostic, not a scored public examination.
 * It lasts 15 minutes and permits postponement for at most three days
 * from the first offer, never three days per postponement.
 */
export const BASELINE_QUESTION_TARGET=20;
export const BASELINE_DURATION_MS=15*60*1000;
export const BASELINE_POSTPONEMENT_MS=3*24*60*60*1000;

export function baselinePostponementDeadline(firstOfferedAt:Date):Date{
 return new Date(firstOfferedAt.getTime()+BASELINE_POSTPONEMENT_MS);
}
export function baselineMayPostpone(firstOfferedAt:Date,now=new Date()):boolean{
 return now.getTime()<baselinePostponementDeadline(firstOfferedAt).getTime();
}
export function baselineTimeRemaining(startedAt:Date,now=new Date()):number{
 return Math.max(0,BASELINE_DURATION_MS-(now.getTime()-startedAt.getTime()));
}

export function baselineAttemptExpired(startedAt:Date,now=new Date()):boolean{
 return baselineTimeRemaining(startedAt,now)===0;
}
