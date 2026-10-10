# Dawn UI implementation contract — approved mockup reference

Reference archive: `avora-design-reference.zip`, folder `avora-design-reference/`. These are `.dc.html` design-canvas files, not directly runnable Next.js components. Their names, names of students, exam scores, objectives and topic content are sample-only.

## Exact screen mapping
- `Login.dc.html` → once-daily login encouragement, not authentication form.
- `Main.dc.html` → Today hub, five-part Dawn Ring and weekly summary.
- `Menu.dc.html` → secondary destinations and logout.
- `Profile.dc.html` → student-only profile, learning summary, Parent Area entry.
- `Parent.dc.html` → PIN-gated read-only parent dashboard and parent settings.
- `EnglishDaily.dc.html` → English Daily four parts and word-bank progress.
- `Rule.dc.html` → Learn/See/Test grammar rule mini-lesson.
- `Oral.dc.html` → audio plus IPA examples and CBT entry.
- `CBT.dc.html` → reusable exercise/exam question screen.
- `DailyWord.dc.html` → word definition, part of speech, examples.
- `ThisWeek.dc.html` → class subject cards, topic and objective stars.
- `Objectives.dc.html` → topic objectives, textbook vs in-app lesson.
- `Constellation.dc.html` → objective mastery stars.
- `canvas.json` lists screens; `README.md` explains runtime constraints.

## Verified palette and layout
- Night #0E0F2E, violet #6C4CF1, rose #F0568C, teal #19C3B1, gold #FFC857.
- Cream #FBF7F2, ink #1B1840, white cards, light border #EAE5F5.
- Fraunces headings, Plus Jakarta Sans body; mobile reference 390x844, 24px horizontal padding. Build responsively at 360, 390 and 412 px.
- Use `lib/dawnDesignTokens.ts` as the centralized palette for the new weekly experience. Do not globally replace the legacy app theme while feature flags remain off.
- The Parent mockup uses a lock badge, cream background, weekly progress cards, subject status badges, a dark exam card and a gold help suggestion. It does not depict the PIN entry or guardian-verification onboarding screen; those must be designed to match Dawn but not presented as exact reference screenshots.

## Safety and release rules
- No hard-coded mockup names, scores, questions, progress or school data in production.
- All dashboards must load authenticated student-scoped data from real tables; no parent dashboard before secure PIN verification.
- Never use the visual mockup as evidence that parental consent is approved.
- Preserve existing-student account IDs and historical learning records; activate new UI by class-level release only after tests and owner sign-off.
- The design is confirmed as a reference, not implemented across the student application yet.
