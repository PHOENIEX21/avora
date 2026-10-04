# AVORA V9.1.1 — Official Curriculum Inventory Foundation

This release extends V9.1.0 without changing the database schema.

## What changed

- Added an exhaustive NERDC table-of-contents topic/skill registry for JSS1–JSS3 Mathematics and English Studies.
- Mathematics registry: 54 official class-specific topics.
- English Studies registry: 64 official class-specific topics/skills across Reading, Writing, Listening and Speaking, Grammatical Accuracy, and Literature.
- Total official inventory: 118 entries.
- Every official topic remains present even when its AVORA lesson has not yet been reconciled or authored.
- Added separate `inventoryStatus` and `lessonStatus` fields so curriculum presence can never be confused with teaching completeness.
- The trust summary now reports topic-registry completeness separately from objective/lesson reconciliation.
- Academic trust audit now checks that the exhaustive Mathematics and English registries exist and that AVORA does not make a false content-completeness claim.

## Academic rule

`OFFICIAL_TOPIC_MAPPED` means the topic is genuinely present in the official NERDC curriculum inventory.

It does **not** mean AVORA has finished teaching it.

Lesson depth remains `UNASSESSED`, `EMPTY`, `PARTIAL`, or `DEEP` until the objective-by-objective reconciliation phase evaluates the actual Tutor content.

## Next academic phase

Map every official performance objective, content expectation, evaluation expectation, prerequisite, and AVORA lesson unit to these 118 official topic records. Only after that audit may a class/subject receive a curriculum-complete teaching claim.
