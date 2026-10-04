# AVORA V9.2.0 — Curriculum Reality Layer

This release turns the official JSS1–JSS3 Mathematics + English inventory into an inspectable academic system rather than a static list.

## What is real now

- All official topic entries remain present even when lesson content is missing.
- `/curriculum` displays the official curriculum by class, subject and strand.
- Curriculum truth is split into two independent dimensions: official objective grounding and AVORA lesson depth.
- Existing broad Tutor plans may provide conservative `PARTIAL` evidence only. They can never automatically produce a `DEEP` claim.
- `DEEP` is reserved for objective-by-objective audit evidence.
- The first official objective records are source-grounded and pinned to NERDC PDF pages, beginning with JSS1 Mathematics Whole Numbers/LCM/HCF/Base 2 and JSS1 English intensive reading.
- A new `audit:curriculum` gate protects these rules.

## Deliberate honesty

V9.2.0 does not claim that all 118 topics have complete lessons. It makes the gap impossible to hide: objectives not yet extracted are shown as `OBJECTIVES PENDING`, and lessons not yet fully audited cannot be marked `DEEP`.

No database migration is required.
