function unwrapCorrectAnswer(value: unknown): unknown {
  if (value == null) return '';
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try { return unwrapCorrectAnswer(JSON.parse(trimmed)); } catch { return trimmed; }
    }
    return trimmed;
  }
  if (Array.isArray(value)) return value;
  if (typeof value === 'object') {
    const v = value as Record<string, unknown>;
    if ('value' in v) return v.value;
    if ('answer' in v) return v.answer;
    if ('answers' in v) return v.answers;
  }
  return value;
}

function cleanText(value: unknown) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[₦$£€]/g, '')
    .replace(/,/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[.!?]+$/g, '')
    .trim();
}

function numericValue(value: unknown): number | null {
  let s = cleanText(value)
    .replace(/\b(naira|ngn|cm²|cm2|cm|mm|m²|m2|metres?|meters?|kg|g|litres?|liters?|ml|minutes?|mins?|degrees?|°)\b/g, '')
    .replace(/\s+/g, '')
    .trim();
  if (!s) return null;
  const percent = s.endsWith('%');
  if (percent) s = s.slice(0, -1);
  if (/^-?\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/.test(s)) {
    const [a,b] = s.split('/').map(Number);
    if (b === 0) return null;
    return a / b;
  }
  if (!/^-?\d+(?:\.\d+)?$/.test(s)) return null;
  const n = Number(s);
  return percent ? n / 100 : n;
}

function equivalentText(a: unknown, b: unknown) {
  const ca = cleanText(a);
  const cb = cleanText(b);
  if (ca === cb) return true;

  // Accept harmless formatting and units when the mathematical value is the same.
  const na = numericValue(a);
  const nb = numericValue(b);
  if (na != null && nb != null && Math.abs(na - nb) < 1e-9) return true;

  // If one form is an explicit percentage and the other is the whole-number percentage answer,
  // accept 75% for an expected answer of 75 (and vice versa), but never accept arbitrary x100 changes.
  const aPct = ca.endsWith('%');
  const bPct = cb.endsWith('%');
  if (aPct !== bPct) {
    const rawA = Number(ca.replace('%',''));
    const rawB = Number(cb.replace('%',''));
    if (Number.isFinite(rawA) && Number.isFinite(rawB) && Math.abs(rawA - rawB) < 1e-9) return true;
  }

  return false;
}

export function answerIsCorrect(actual: unknown, correctAnswer: unknown, options?: unknown): boolean {
  const unwrapped = unwrapCorrectAnswer(correctAnswer);
  const accepted = Array.isArray(unwrapped) ? unwrapped : [unwrapped];
  if (accepted.some(x => equivalentText(actual, x))) return true;

  const opts = Array.isArray(options) ? options.map(String) : [];
  const a = cleanText(actual);
  const letter = a.match(/^[a-d]$/i);
  if (letter && opts.length) {
    const index = letter[0].toLowerCase().charCodeAt(0) - 97;
    const picked = opts[index];
    if (picked != null && accepted.some(x => equivalentText(picked, x))) return true;
  }

  // Also support legacy banks where the stored answer is A/B/C/D but the UI submits option text.
  for (const expected of accepted) {
    const e = cleanText(expected);
    if (/^[a-d]$/i.test(e) && opts.length) {
      const index = e.charCodeAt(0) - 97;
      if (opts[index] != null && equivalentText(actual, opts[index])) return true;
    }
  }
  return false;
}

export function displayCorrectAnswer(correctAnswer: unknown): string {
  const value = unwrapCorrectAnswer(correctAnswer);
  return Array.isArray(value) ? value.map(String).join(' / ') : String(value ?? '');
}
