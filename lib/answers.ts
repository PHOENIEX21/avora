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
    .replace(/\s+/g, ' ')
    .trim();
}

function numericValue(value: unknown): number | null {
  let s = cleanText(value)
    .replace(/[₦$£€]/g, '')
    .replace(/,/g, '')
    .replace(/\b(naira|ngn|cm²|cm2|cm|mm|m²|m2|metres?|meters?|kg|g|litres?|liters?|ml|minutes?|mins?|degrees?|°)\b/g, '')
    .trim();
  if (!s) return null;
  const percent = s.endsWith('%');
  if (percent) s = s.slice(0, -1).trim();

  // Mixed numbers must be parsed before whitespace is removed. Otherwise 1 1/12
  // would collapse into 11/12 and a genuinely wrong option could be marked correct.
  const mixed = s.match(/^(-?\d+)\s+(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (mixed) {
    const whole = Number(mixed[1]), numerator = Number(mixed[2]), denominator = Number(mixed[3]);
    if (!denominator) return null;
    const sign = whole < 0 ? -1 : 1;
    const n = whole + sign * (numerator / denominator);
    return percent ? n / 100 : n;
  }

  s = s.replace(/\s+/g, '');
  if (/^-?\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/.test(s)) {
    const [a,b] = s.split('/').map(Number);
    if (b === 0) return null;
    const n = a / b;
    return percent ? n / 100 : n;
  }
  if (!/^-?\d+(?:\.\d+)?$/.test(s)) return null;
  const n = Number(s);
  return percent ? n / 100 : n;
}

function equivalentFreeResponse(a: unknown, b: unknown) {
  const ca = cleanText(a);
  const cb = cleanText(b);
  if (ca === cb) return true;

  // For free-response numerical work, harmless formatting and equivalent numeric
  // forms are acceptable. MCQ options are handled strictly before this function.
  const na = numericValue(a);
  const nb = numericValue(b);
  if (na != null && nb != null && Math.abs(na - nb) < 1e-9) return true;

  // Accept 75% for an expected whole-number percentage answer of 75 (and vice versa),
  // but never accept arbitrary x100 changes.
  const aPct = ca.endsWith('%');
  const bPct = cb.endsWith('%');
  if (aPct !== bPct) {
    const rawA = Number(ca.replace('%','').replace(/,/g,''));
    const rawB = Number(cb.replace('%','').replace(/,/g,''));
    if (Number.isFinite(rawA) && Number.isFinite(rawB) && Math.abs(rawA - rawB) < 1e-9) return true;
  }

  return false;
}

export function answerIsCorrect(actual: unknown, correctAnswer: unknown, options?: unknown): boolean {
  const unwrapped = unwrapCorrectAnswer(correctAnswer);
  const accepted = Array.isArray(unwrapped) ? unwrapped : [unwrapped];
  const opts = Array.isArray(options) ? options.map(String) : [];
  const a = cleanText(actual);

  // Multiple choice must be strict about the selected option. This prevents an
  // equivalent-but-intentionally-unsimplified distractor (for example 6/8 when the
  // task asks for 3/4 in simplest form) from being accepted through numeric coercion.
  if (opts.length) {
    const letter = a.match(/^[a-d]$/i);
    if (letter) {
      const index = letter[0].toLowerCase().charCodeAt(0) - 97;
      const picked = opts[index];
      if (picked == null) return false;
      return accepted.some(x => {
        const e = cleanText(x);
        if (/^[a-d]$/i.test(e)) return e === letter[0].toLowerCase();
        return cleanText(picked) === e;
      });
    }

    const selectedIndex = opts.findIndex(o => cleanText(o) === a);
    if (selectedIndex >= 0) {
      return accepted.some(x => {
        const e = cleanText(x);
        if (/^[a-d]$/i.test(e)) return selectedIndex === e.charCodeAt(0) - 97;
        return a === e;
      });
    }
  }

  return accepted.some(x => equivalentFreeResponse(actual, x));
}

export function displayCorrectAnswer(correctAnswer: unknown): string {
  const value = unwrapCorrectAnswer(correctAnswer);
  return Array.isArray(value) ? value.map(String).join(' / ') : String(value ?? '');
}
