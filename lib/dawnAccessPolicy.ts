/**
 * Pure policy for Dawn access. Do not conflate a database timestamp with
 * a legally approved, completed guardian verification workflow.
 */
export type DawnEvidence={
 classReleased:boolean;
 weekReleased:boolean;
 consentRecorded:boolean;
 contactVerified:boolean;
 parentPinPresent:boolean;
 studentPinPresent:boolean;
 guardianWorkflowApproved:boolean;
};
export const DAWN_GUARDIAN_WORKFLOW_ACTIVE=false as boolean;

export type DawnDecision='legacy'|'onboarding_required'|'verification_pending'|'ready';
export function decideDawnAccess(e:DawnEvidence):DawnDecision{
 if(!e.classReleased||!e.weekReleased)return 'legacy';
 if(!e.consentRecorded||!e.contactVerified||!e.parentPinPresent||!e.studentPinPresent)
  return 'onboarding_required';
 if(!DAWN_GUARDIAN_WORKFLOW_ACTIVE||!e.guardianWorkflowApproved)return 'verification_pending';
 return 'ready';
}
