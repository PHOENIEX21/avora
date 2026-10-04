// Deterministic, code-level gate that runs BEFORE any answer reaches the AI grader.
// Purpose: a learner typing "yes", "ok", "I understand", "got it", etc. must never
// be able to pass a checkpoint by agreement alone. This does not depend on the AI
// grader being strict — it blocks the low-effort case outright, for every lesson,
// every subject, every checkpoint, since all of them route through this gate.

const PURE_AFFIRMATION = /^(?:yes|yeah|yep|ok(?:ay)?|sure|correct|true|got\s*it|i\s*(?:get|got|understand|understood)(?:\s*it)?(?:\s*now)?|makes\s*sense|understood|noted|alright|fine|good)[.!\s]*$/i;

const MIN_SUBSTANTIVE_WORDS = 4;

export type UnderstandingGateResult =
  | { blocked: false }
  | { blocked: true; reason: 'AFFIRMATION_ONLY' | 'TOO_SHORT' };

/**
 * Returns blocked:true when the answer cannot possibly demonstrate reasoning
 * (a bare "yes"/"I understand" or a handful of words with no working shown).
 * Callers should skip the AI grading call entirely in this case and ask the
 * learner to actually explain or work through it.
 */
export function checkUnderstandingGate(rawAnswer: string): UnderstandingGateResult {
  const answer = String(rawAnswer || '').trim();
  if (!answer) return { blocked: false }; // empty is handled by existing required-field validation upstream

  if (PURE_AFFIRMATION.test(answer)) return { blocked: true, reason: 'AFFIRMATION_ONLY' };

  const wordCount = answer.split(/\s+/).filter(Boolean).length;
  // A short numeric/MCQ-style answer (e.g. "45" or "x = 12") is legitimate and must not
  // be blocked here — only block when it's short AND contains no digits/symbols/operators
  // that would indicate actual working, i.e. it reads like a filler phrase.
  const looksLikeWorkingOrValue = /[0-9=+\-×x*/÷^%]/.test(answer) || answer.length > 40;
  if (wordCount < MIN_SUBSTANTIVE_WORDS && !looksLikeWorkingOrValue) {
    return { blocked: true, reason: 'TOO_SHORT' };
  }

  return { blocked: false };
}

export function understandingGateMessage(reason: 'AFFIRMATION_ONLY' | 'TOO_SHORT') {
  if (reason === 'AFFIRMATION_ONLY') {
    return "Saying you understand isn't enough here — AVORA needs to see it. Explain it in your own words, or show the working, before AVORA can check it.";
  }
  return "That's too short for AVORA to check your understanding. Explain your reasoning or show your working, not just the final word.";
}
