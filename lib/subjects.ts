export function subjectSlug(value?: string | null) {
  const v = String(value || '').trim().toLowerCase();
  if (v === 'english' || v === 'english language') return 'english';
  return 'mathematics';
}

export function subjectLabel(value?: string | null) {
  return subjectSlug(value) === 'english' ? 'English Language' : 'Mathematics';
}

export function profileSubjectValue(value?: string | null) {
  return subjectSlug(value) === 'english' ? 'English' : 'Mathematics';
}
