# AVORA V10.9.0 — Two-Class Common Entrance Prep

## Product decision
AVORA Common Entrance Prep is deliberately limited to **Primary 5 and Primary 6**. It is not a full Primary 1–6 school replacement.

- **Primary 5:** foundation year — slower, concrete, child-friendly teaching toward NCEE.
- **Primary 6:** exam year — repair gaps, strengthen reasoning, add speed and complete two-paper practice.

## Official NCEE coverage
The prep architecture follows the current NECO NCEE structure:

**Paper I**
- Mathematics
- Basic Science & Technology
- English Studies
- National Values Education

**Paper II**
- Quantitative & Vocational Aptitude
- Verbal Aptitude

The official 2026 timetable gives 130 minutes for Paper I and 80 minutes for Paper II. AVORA's mock item allocation is explicitly labelled as AVORA practice design and is not represented as NECO's official question count.

## Deep-teaching architecture
`lib/nceePrep.ts` contains separate Primary 5 and Primary 6 prep maps for every tested domain. Each mapped teaching area carries prerequisites, terminology, a teaching journey, at least three representative forms/examples, common mistakes and mastery checks.

The learner interface is intentionally simpler and warmer than the JSS workspace. Primary learners are routed to `/common-entrance`, not dropped into the JSS Learn/Exam experience.

## Important trust boundary
This release establishes the full two-class teaching/exam **structure** and all-domain learning map. Existing historical NCEE question content is still being expanded from the earlier Maths/English-heavy bank into all six domains. AVORA-original practice must remain distinct from authentic/licensed past questions. Do not market the question bank as a complete official past-paper archive until that content and rights review are finished.

## Database
Migration `021_ncee_primary5_primary6_prep.sql` marks Primary 5/6 learner profiles as NCEE prep and adds an NCEE class/domain question index.

## Audit
Run `npm run audit:ncee-prep`.
