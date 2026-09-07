export function nextMasteryScore(current: number, isCorrect: boolean, evidenceCount: number) {
  const confidence = Math.min(0.22, 0.08 + evidenceCount * 0.015);
  const target = isCorrect ? 1 : 0;
  return Math.max(0, Math.min(1, current + (target - current) * confidence));
}

export function masteryLabel(score: number) {
  if (score >= 0.8) return "Mastered";
  if (score >= 0.6) return "Developing";
  if (score >= 0.35) return "Needs practice";
  return "Starting";
}
