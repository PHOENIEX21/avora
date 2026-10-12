# AVORA RESTRUCTURE: INSTRUCTIONS FOR THE BUILD AGENT

## 0. How to use this document

- **Roles: there is exactly one admin (the owner) and the registered students.** There are no teachers, schools or other staff on the platform. Wherever any text in this document says teacher, reviewer, moderator or school admin, it means the admin. The admin builds, reviews, approves, schedules and moderates everything through the Admin console (Phase 10b). Parents act only through the Parent area (PIN) inside the student's app.
- **This document is the specification. The mockup is the visual source of truth.** The folder `avora-design-reference` holds the mockup's screen files (and exported images if supplied). Build screens to match them: layout, spacing, colours, type and the Dawn concept. Where the text and the mockup disagree, stop and ask the owner. Do not choose silently.
- The mockup uses **sample content only** (topics, objectives, words, names, results, messages). Never ship it. Real content comes through the content pipelines in Phases 2b and 4g.
- The admin's "Live session control" screen is also in the mockup, as a reference for the Admin console. The mockup also includes admin screens: Live session control, Student card and Messaging settings. The mockup screens: Login encouragement, Today, Menu, Getting started, Exam lobby, Direct message, Student profile, Parent area, Group home, Group chat, English Daily, Rule lesson, Oral English lesson, CBT exercise, Daily word, This week (all subjects), Topic objectives, Constellation.
- **Open decisions the owner has not yet made (ask before building the affected part):**
  1. Which pronunciation standard the Oral English audio follows. The admin decides and it is used consistently.
  2. Whether the midweek exam revisit is compulsory for everyone or only for students below a pass mark.
  3. Whether all 11 subjects are compulsory for every student or some are optional.
  4. Who records the oral audio: the admin, a hired speaker, or synthesized audio the admin approves clip by clip.
  5. The exact consent wording for student data and photos. Parents give consent at the student's registration (Phase 1c). Have a lawyer confirm the wording.
  6. Which SMS or email provider is used for exam reminders.
  7. Launch scope: which class and subjects go first. Recommended: JSS1, four subjects, Term 1.
  8. Whether to add trusted student moderators or part-time helpers later. Not needed at launch.
- Follow Section 2 (ground rules) at all times, and start with Phase 0 (audit). Wait for approval after the audit.

## 1. Context

Avora is an existing, working learning app for Nigerian school students. It is being restructured into a weekly, curriculum-aligned learning and testing platform. Do not rebuild from scratch. Extend and reshape what exists.

**Product goal:** help students know what they are being taught in school and retain it through constant practice aligned with the NERDC curriculum.

**The loop:**
1. Monday: objectives for each subject topic are shown to the student.
2. Student studies independently, using their own textbook or an in-app lesson.
3. Daily: English Daily (5 new words, a rule lesson, an Oral English lesson, sentence construction, each with a CBT-style exercise), plus a Revisit set from the student's own uploaded work. An encouragement message greets the student at login.
4. Weekend: main exam per subject.
5. Results are shown per objective. Weak objectives return in the next week's daily Revisit.

Students upload their assignments and exercises. These are converted into questions and re-served repeatedly on a schedule to follow up on what they were already taught.

## 2. Ground rules

- **Audit before changing anything.** Inspect the codebase and database, identify the stack, and report what exists before writing code.
- Never run a destructive migration. All migrations must be reversible, and existing data must be preserved.
- Put the new weekly experience behind a feature flag **per class**, so pilot classes can be switched over without breaking others.
- Commit in small steps, one logical change per commit, with a clear message.
- Write tests for the scheduler, scoring and permissions.
- Do not invent curriculum content, questions or answer keys. Content comes from imported curriculum data and admin-approved items only.
- If a requirement is ambiguous, stop and ask. Do not guess.
- Mobile first. Many users have low-end phones and limited data: keep pages light, compress images, and make practice screens usable on a weak connection.

## 3. Phases and acceptance criteria

### Phase 0: Audit
Produce a short report: stack, auth, existing tables, existing screens, what can be reused, what conflicts with this plan. Wait for approval before Phase 1.

### Phase 1: Data model
Add (adapting names to existing conventions):
- `curriculum`: class, subject, term, week, topic, objective. One row per objective.
- `class_subjects`: class, subject, core or optional.
- `english_daily_plan`: class, term, week, day, 5 word ids, rule id, oral lesson id, sentence task set id, status.
- `english_rules`: topic, series, part number, definition, rule points (statement, explanation, correct examples, incorrect example with correction), common mistakes, summary, exercise items tagged to a rule point, class level, status.
- `oral_lessons`: topic (vowels, consonants, diphthongs, stress, intonation, rhyme), short description, examples with audio asset, written form and IPA, exercise items, class level, status.
- `audio_assets`: file, duration, speaker, reviewed_by, status.
- `encouragement_messages`: text, context tag, status, plus `encouragement_log` (student, message, shown_at).
- `mistakes`: student, item, answer given, confidence, status (to fix / fixed), created_at, fixed_at.
- `study_settings`: student, study time, parent weekly summary on/off.
- `cbt_sessions`: student, source (daily lesson / weekly exam / revisit), question set, mode (practice / exam), started_at, submitted_at.
- `content_batches`: class, term, week range, type (english / objectives), status, reviewer, signed_off_at.
- `vocabulary_words`: word, part of speech, meaning, pronunciation hint, up to 3 example sentences, related form, class level, status (draft / approved / published).
- `term_calendar`: class, term, start date, teaching weeks, break weeks, term-end exam week.
- `class_week_state`: class, current week, mode (auto / held), changed_by, changed_at, plus an audit log of every switch.
- `items`: question text, type (MCQ, fill-in, short answer, sentence-construction), options, answer key, objective_id, difficulty (recall / application / analysis), source (curriculum_bank / student_upload / admin), status (draft / in_review / approved / retired), reviewer_id.
- `item_stats`: times served, percent correct, flagged.
- `student_item_schedule`: student_id, item_id, due_date, interval_days, streak, last_result.
- `uploads`: student_id, file, class, subject, topic, week, extraction status.
- `weekly_exams`: class, subject, week, window start/end, blueprint.
- `exam_attempts` and `attempt_answers`, stored with objective_id so results can be reported per objective. Attempts carry a type (official / revisit / baseline).
- `exam_schedules`: exam_id, scope type, class or group or student ids, start, duration, close, late-entry rule, status.
- `live_sessions`: exam, class level, lobby opens at, planned start, status (lobby / countdown / live / closed), late-entry minutes.
- `lobby_presence`: session, student, joined_at, state (here / ready / need time).
- `lobby_announcements`: session, text, sent_at.
- `dm_threads`: type (admin-student / student-student), participants, created_at.
- `dm_messages`: thread, sender, text, attachment, sent_at, status.
- `messaging_settings`: master switch, per class level switches, show photos to classmates default.
- `student_dm_settings`: student, parent_allows_dm, admin_override_off.
- `user_blocks`: blocker, blocked.
- `exam_revisits`: exam_id, opens_at, scope, status.
- `notifications`: recipient (student or parent), type, channel, sent_at, delivered_at, opened_at.
- `group_spaces`, `group_posts`, `moderation_actions`, `reports`.
- `parent_consents`: student, consent_data, consent_photo, consent_at, parent contact (verified, optional).
- `parent_pins`: student, hashed PIN, failed attempts, locked_until.
- `student_pins`: student, hashed PIN, failed attempts, locked_until (for shared devices).
- `question_reports`: item, student, reason, status.
- `admin_audit_log`: action, target, timestamp.
- `student_photos`: student_id, storage path, status (pending / approved / rejected), approved_by, consent_flag.

**Done when:** migrations apply and roll back cleanly, and existing features still work.

### Phase 1c: Independent registration and the Parent area

**Assumption:** each student registers independently, on a phone or tablet at home. There are no schools or teachers on the platform. A parent can take the phone at any time to check how the child is doing.

**Student registration**
1. The student enters their name, class level (JSS1, JSS2 or JSS3) and school (typed in, for information only; it links to nothing), and creates a login (phone or email with a verification code, plus a password or PIN).
2. **Parent consent comes before the account is active.** A short screen, handed to the parent, explains in plain words how the child's data is used. The parent ticks consent and sets a **parent PIN** that is different from the student's own login. The consent text also says that messages between the student and the admin can be seen by the parent and are logged, and that reported or flagged messages may be reviewed by the admin. The parent can optionally add a phone number or email, verified by a code, to receive exam reminders. Photo consent is a separate tick, and photo upload stays blocked until it is given. Record the consent type, time and contact. Children's data generally needs a parent or guardian's consent under Nigerian law, so have a lawyer confirm the wording.
3. The class level decides the student's subjects, content and exam schedule.

**Everything the student needs works straight away:** English Daily, weekly objectives and study, uploads, CBT exercises, the weekly exam, revisits, profile, progress and the class-level group (Phase 8).

**Exam scheduling:** the admin sets one central schedule per class level (Phase 3b), with the flexible window mode by default, and can add per-student overrides.

**Parent area (inside the student's app, no separate parent account)**
- Opened from the menu or profile, and only with the parent PIN. Five wrong attempts lock it for 15 minutes.
- Shows how the child is doing this week: days studied, new words, stars lit, each subject marked On track, Needs attention or Not started, next exam time, recent results with the revisit improvement, uploads, and one short suggestion for how a parent can help.
- Also holds the parent's settings: change PIN, reminder contact, photo consent.
- Read-only apart from those settings. It locks again after a short period of inactivity, and "Back to [student]" returns to the student's own view.

**Shared devices:** if more than one child registers on the same device, opening the app shows each child's initials (or photo) and asks for that child's PIN. A child session reaches only that child's data. Auto-lock after inactivity, and sessions do not persist by default. Log out is always one clear tap in the menu.

**Notifications:** sent to the student's own app. If a parent contact was verified, exam times, reminders and changes also go there (push, then SMS or email fallback). Parents can mute everything except exam notices.

**Short, resumable sessions.** Every task saves progress on each step, so a child can stop when the parent needs the phone and carry on later, on the same or another device. Keep each daily part to about 3 to 5 minutes.

**Low-end and low-data by default.** Build as a lightweight installable web app that works on cheap Android phones and slow connections. Cache the day's lessons and audio, and sync when the connection returns.

**Done when:** a student can register, a parent consents and sets a PIN, the student's PIN and the parent PIN open different views, the parent area shows the week's progress, two children can share one phone without seeing each other's data, and a task resumes after the app is closed midway.

### Phase 1d: Starting check and daily study time (the last step of registration)

**Starting check**
- About 20 questions, about 15 minutes, in the CBT screen, with **no score shown**. It is a mixed set (English, Mathematics and the student's other subjects) for the student's class level, chosen by the admin from approved items.
- It is stored as a `baseline` attempt. The student sees only a kind summary of strengths and areas to work on, per objective, and never a mark. Weak areas seed the first Revisit and a catch-up list.
- The student can postpone it for up to 3 days ("Do it later"), with a reminder. The admin sees baseline against later results per class level, which is the evidence needed to show that students improve.

**Daily study time**
- At registration the student picks a usual study time (After school, Evening or After dinner, plus an exact time). They can change it in Settings.
- The app sends one short reminder at that time, to the student's own app. Send nothing if the day's tasks are already done. Never more than one reminder a day, and no guilt language.
- **Weekly parent summary:** if a parent contact was verified, send one short message a week (for example Sunday evening) with days studied, tasks done and the next exam time. No scores unless the parent switches that on in the Parent area.

### Phase 2: Curriculum import
Build an admin import (CSV or sheet) for curriculum rows. Every item and exam question must map to an objective. Unmapped content goes to the admin queue.

**Done when:** one pilot class has a full term's weeks, topics and objectives loaded.

### Phase 2b: Loading objectives for all classes and keeping them hidden until released

**Scale to plan for:** 3 classes (JSS1, JSS2, JSS3) x 11 subjects x 3 terms x about 12 teaching weeks = roughly 1,200 subject-weeks, each with several objectives. This is a content pipeline, not a one-time upload, and it must be done in batches.

**Structure:** class → subject → term → week → topic → objectives. Subjects are attached to a class through a `class_subjects` table, so each student sees only the subjects of their own class (and any optional subjects they are enrolled in).

**Two separate gates control what a student sees. Both must be open.**
1. **Content gate (status):** every curriculum row and every question carries a status: `draft → in_review → approved → published`. Students never see anything below `published`.
2. **Release gate (time):** a published week appears to a class only when that class's current week (Phase 3c) reaches it. Future weeks stay hidden even if they are fully prepared, so content can be built 2 to 3 weeks ahead safely.
- Everything an agent imports lands as `draft` by default. The agent is not allowed to set `published`.
- Enforce both gates on the server, in the queries and the API, not just in the interface. Include tests that prove a student cannot fetch draft or future-week content directly, including by guessing IDs or URLs.

**Batch loading flow (repeat per class, subject and term)**
1. **Source:** the owner supplies the official NERDC scheme of work or curriculum document for that class, subject and term. The agent extracts weeks, topics and objectives from the source only. It must record the source reference (document and page) on each row and must not invent objectives.
2. **Import:** the agent loads the rows through the admin import as `draft`, using a fixed template (class, subject, term, week, topic, objective text, source reference).
3. **Validation report:** automatic checks run: every week of the term has a topic, every topic has objectives, no duplicates, no objective without a source reference. Failures block progress to the next step.
4. **Admin review:** the admin reviews and edits the objectives in the Admin console, then marks the subject-term `approved`.
5. **Question readiness:** a week cannot be published until every objective has the minimum number of approved questions (default 6 at launch, raised to 10 as the bank grows, across the three difficulty levels) and that week's exam is assembled.
6. **Publish:** the admin publishes the subject-term. Nothing becomes visible to students yet.
7. **Release:** content appears week by week as each class's calendar reaches it.

**Coverage dashboard (admin):** a grid of 11 subjects x 12 weeks for each class and term, coloured by state (empty / draft / in review / approved / published). This is the control room for knowing what is ready and what is not.

**Rollout order:** start with one class (for example JSS1) and 4 core subjects for one term. Run it through the whole flow, then expand to the remaining subjects, then JSS2 and JSS3, then later terms.

**Changes after publishing:** edits create a new version of the objective or question. Students' past results stay attached to the version they actually saw.

**Across classes:** JSS1, JSS2 and JSS3 each have their own objectives. Do not copy content between classes. Optionally, link related topics across classes (for example a JSS2 topic to its JSS1 prerequisite) so the Revisit can draw on earlier-class foundations.

**Done when:** one class and subject for one term is loaded as draft, reviewed, published and released week by week, and tests confirm that students cannot see draft, unreleased or other-class content by any route.

### Phase 3: Weekly cycle
- Monday release: each week has **one topic per subject**, chosen by the admin from the NERDC scheme of work, and each topic has its own objectives. All subjects of the class level appear together in the "This week" view (see Phase 10); tapping a subject opens its topic and the objectives.
- Wednesday checkpoint: 5 questions per objective, not recorded as an exam grade.
- Main exam: live and timed, scheduled per Phase 3b (default is the weekend, but it can be set for any class or student at any time). Blueprint: 50% this week's objectives, 25% revisit items from earlier weeks, 25% from uploaded work.
- Results: score per objective with a plain recommendation. Weak objectives are added to next week's Revisit.

**Done when:** a pilot class can run one full week end to end.

### Phase 3b: Live exam scheduling, notifications and midweek revisit

**Scheduling**
- The admin schedules exams in the Admin console for a class level, for selected groups, or for individual students, at any date and time. Per-student overrides cover make-ups and absences. The default is one central schedule per class level.
- Each schedule stores: scope (class / group / student list), start time, duration, window close, late-entry rule, status (scheduled / live / closed / cancelled). Use the Africa/Lagos timezone, stored in UTC.
- There is no school-level or teacher-level scheduling. The admin's central schedule applies to everyone in a class level, plus any per-student overrides.
- Rescheduling or cancelling is allowed up to the start time, and every change triggers a notice.
- **Three timing modes:** (1) **fixed start** (everyone starts at the planned time); (2) **flexible window** (the student may start any time inside a set window, for example a Saturday from 9:00 to 18:00, and their own timer begins when they start), which suits families that share one device; and (3) **live session** (the admin leads: lobby, ready check, then a start for everyone at once, see below). The admin chooses the mode for each exam. Default to the flexible window for the weekly exam unless the admin chooses another.

**Live exam behaviour**
- The server owns the clock. The countdown shown on the device is only a display. Never trust client time.
- Answers autosave on every response. If the connection drops, the student resumes where they left off, and the clock keeps running.
- Auto-submit when time ends. One official attempt per student.
- Randomise question and option order per student.
- The admin gets a live view in the Admin console: who has started, who is in progress, who has submitted, who has not joined.

**Communication**
- Every student in the scope is notified when an exam is scheduled, rescheduled or cancelled.
- Reminders at 24 hours, 1 hour and 10 minutes before the start. Channels: in-app notification and push by default, with SMS or email as a fallback for students who do not use the app often (provider configurable).
- If a parent contact was verified at registration, the parent gets the same schedule notice.
- Track delivery and opened status per student so the admin can see who has not seen the schedule.

**Midweek revisit of the same exam**
- After an exam closes, the same exam is made available again as a follow-up, by default midweek (the Wednesday after), and the admin can change that date per class level.
- Same questions and objectives, with order and options reshuffled.
- Corrections are released once the exam window closes: each wrong answer shows the correct answer and a short explanation, so the student can study before the revisit.
- Official score is always attempt 1. The revisit is stored as a separate attempt and never overwrites it.
- Show improvement per objective (attempt 1 vs revisit) on the results page, in the Parent area and in the Admin console.
- Objectives that are still weak after the revisit go straight into next week's daily Revisit set.
- The revisit can also be scheduled for individual students, exactly like the main exam, and uses the same notification flow.

**Live session mode: exam lobby and ready check**
- The admin chooses this mode when scheduling an exam that everyone should start together.
- **Lobby:** it opens before the planned start (default 10 minutes). Students get a notification, and the exam card on Today shows "Join lobby". The server records who is present.
- **Lobby screen (student):** exam name, class and length, a countdown to the planned start, how many students are here, the admin's announcements, a connection check and a short checklist (connection good, phone charged, quiet place), and two reactions: **"I'm ready"** (a thumb) and **"Need 5 more minutes"**. Students cannot type or chat in the lobby. The screen shows only the total ("31 of 38 ready"), never who asked for more time.
- **Announcements:** the admin sends preset or typed messages ("Ready to start?", "Starting in 5 minutes", "Close other apps") that appear as admin bubbles in the lobby. A message such as "Ready to start?" collects the reactions.
- **Admin control panel (Admin console):** live counts of here, ready, need time and no reply, a progress bar, the list of students not ready yet, an announcement box with preset chips, and the buttons **Start now**, **Wait 5 minutes** (which also announces the delay) and **Cancel session**.
- **Start:** when the admin presses Start now, every student in the lobby sees a 10-second countdown, and then the exam opens in CBT exam mode. The server clock starts at the same moment for everyone.
- **Late entry:** students who arrive after the start can join during the late-entry window (default 10 minutes) and get the time that is left, shown clearly before they enter. The admin can instead allow full time. Students who are absent can take the exam in a make-up window set by the admin.
- **Technical:** use realtime updates (websockets or server-sent events) and fall back to polling every 5 seconds on weak connections. The start signal must reach every student within a few seconds. A student who loses connection can rejoin the lobby or the running exam.
- No chat in the lobby or during the exam: only admin announcements and the two reactions.

**Done when:** the admin can schedule an exam for one class level and one individual student at different times, students receive the notices and reminders, the exam runs live with server-side timing, and the revisit opens on the set date with both attempts compared.

### Phase 3c: Week-to-week switching of objectives

**Principle:** the NERDC scheme of work gives the planned topic for each week. The week a class level is "in" is stored per class level and controlled by the admin, with an automatic default.

**Term calendar (per class level)**
- Store term start date, number of teaching weeks, break weeks, and the term-end exam week. Break weeks are skipped. The term-end exam week serves a cumulative exam instead of new objectives.

**Class week state**
- Each class level has a current week and a mode: `auto` (follows the calendar) or `held` (the admin has paused the advance). The admin can hold, advance early or go back from the Admin console. Every change is logged in the audit log.

**The switch (automatic, with a readiness check)**
- A scheduled job runs just after midnight Monday (Africa/Lagos), once per class level. It must be idempotent: running twice must not publish twice.
- **Readiness check first:** if next week's content is not fully published (objectives, minimum questions, exam, daily English), the job does not release it. It holds the class level on the current week and alerts the admin.
- If ready, it does the following, in order:
  1. Closes the old week: its objectives become read-only but stay accessible for study and for Revisit.
  2. Publishes the new week's objectives for every subject.
  3. Adds old-week objectives that the student never marked studied, or scored weak on, to a "carried over" list that feeds the daily Revisit.
  4. Sends a notification: "New week: here are your objectives."

**What the student sees at the switch**
- Three things overlap in the early week, and the UI must keep them clearly separate: *This week* (new objectives), *Last week's follow-up* (corrections, then the midweek revisit of last week's exam), and *Today's Revisit* (spaced items).
- A week selector lets students swipe back to earlier weeks. The Constellation always shows all weeks.

**Edge cases**
- A student who registers mid-term sees the current week plus a "catch up" list of earlier weeks.
- If the admin moves a class level backward or forward, scheduled exams and revisits for it are flagged for the admin to confirm, never silently changed.

**Done when:** a class level advances automatically on Monday only when its content is ready, the admin can hold it, carried-over objectives show up in the next week's Revisit, and the job can be re-run safely without duplicating anything.

### Phase 4: Daily tasks (English Daily, Revisit and login encouragement)

Each school day has **five tasks**, which fill the five segments of the Dawn Ring: four English parts and the Revisit set. Encouragement is not a task. It appears at login (4f).

1. **Words:** 5 new words (4a).
2. **Rule:** one English rule (4b).
3. **Oral English:** one oral lesson (4c).
4. **Sentences:** 3 sentence-construction tasks (section 4 below).
5. **Revisit:** items due today from the student's uploaded work and from earlier words, capped (default 8).

English Daily should take about 12 minutes. A single hub screen shows the four English parts as steps, with a done state for each, and the student's word-bank progress.

**CBT exercise space:** the exercise at the end of every Words, Rule and Oral lesson uses one shared CBT-style screen, the same component as the weekly exam. It shows "Question N of M", a progress bar, an optional timer, large options A to D, a row of question numbers and Previous and Next buttons. In practice mode (daily lessons) the student sees a one-line explanation after each answer. In exam mode (weekly exams) there is no feedback until submission. Answers autosave. It supports audio questions for oral lessons and images where needed. Practising in this format every day makes the real exams, and later CBT exams, familiar.

**Confidence tap:** before an answer is checked, a row of three options asks "How sure are you?" (Guess, Fairly sure, Sure). It is shown in daily practice, checkpoints and revisits, but not in the official weekly paper, and the student may skip it. Store it with each answer. A wrong answer given as "Sure" is a confident mistake: show it first in My mistakes and bring it back sooner in the Revisit. A right answer given as "Guess" is treated as not yet learned and gets a short interval.

**4a. Word bank (about 1,000 words per class per year)**
- 5 words per school day. At about 12 teaching weeks a term, that is about 300 words a term and 900 a year (975 at 13 weeks) for each class, close to the 1,000-word target.
- Each word screen shows: the word, its classification (part of speech, with a hint such as "describes a noun"), a plain meaning, up to three numbered example sentences using the word in different ways with the word highlighted, and the related form where it exists (for example generous / generosity).
- The full word list for each class and term is planned in advance in `english_daily_plan`, set at the right level for the class, approved by the admin, and never repeats within a class year. Words are published only after approval (same status flow as other content).
- **Testing:** every word enters the revisit scheduler (Phase 6) and comes back as questions: meaning, fill the gap, identify the part of speech, choose the correct sentence, and write a sentence with it. The term-end exam draws from that term's 300 words, and the year-end exam from all of them. The student sees "word bank: N of 300 this term".

**4b. English rule lessons (Learn, See, Test)**
A rule lesson is a real mini-lesson, not a one-line tip. Every lesson has these parts, in this order:
1. **Definition:** what the topic is, in plain words (for example, concord means agreement between a verb and its subject).
2. **The rule points:** each as a numbered card with the rule stated simply, a short explanation, at least one perfect standard example marked "Correct", and one example marked "Incorrect" with its correction. Never rely on colour alone: the labels and icons carry the meaning.
3. **Common mistakes and exceptions** that students actually make.
4. **Remember:** a two or three line summary.
5. **Exercise (CBT):** at least one question for every rule point in the lesson and at least 5 questions in total, each with a one-line explanation.

- **Rule series:** a big topic such as concord is taught across several days as parts (for example: basic agreement; subjects joined by and, or, nor; collective nouns; each, every, neither and similar words; words that come between subject and verb). The admin decides the split. A lesson has at most 4 rule points and takes about 4 to 6 minutes. Each part opens with a two-line recap of the previous part, and its exercise includes one or two questions from earlier parts.
- **Rule book:** every rule lesson the student has done stays available under English → Rule book, searchable by topic, so they can reread any time.
- **Testing and retention:** every exercise question is tagged to its rule point. Weak rule points go into the Revisit, and the term-end exam includes the rules covered that term.
- **Authorship:** the agent only drafts, and cites the source it used for each rule point. The admin checks every definition, rule point, example and answer. The agent must not invent rules.

**4c. Oral English (Listen, Compare, Try)**
- Same pattern as rules, with audio: a short description, perfect standard examples the student can play, then an exercise.
- Topics: vowel sounds, consonant sounds, diphthongs, stress, intonation, rhyme.
- **Pronunciation standard:** the admin decides which standard model the app follows and it must be used consistently everywhere. Label examples "standard pronunciation". Every audio item has its written form (and IPA symbols where relevant) on screen.
- Audio is recorded by the admin or a hired speaker, or synthesized audio is accepted only after the admin listens to and approves each clip. Audio files are small, compressed, cached for the day's lessons, and the exercise falls back to text if audio fails to load.
- Exercise types: "which word do you hear", odd one out by sound, mark the stressed syllable, rhyme match. No microphone is needed in the first version. Speaking practice can come later.

**4d. Sentences:** see section 4 (sentence construction).

**4e. Daily plan data:** `english_daily_plan` links class level, term, week and day to its 5 words, one rule, one oral lesson and one sentence task set. The admin can pause or skip a day (holidays, exams) and the plan shifts forward without losing words.

**4f. Login encouragement**
- Shown full screen on the first login of each day: the student's photo in the glowing ring, a short greeting, one encouraging message in large type, and a one-line preview of today's tasks. A prominent "Start today" button and a quiet "Skip".
- Messages come from a large library written or approved by the admin (about 20 words at most each), never repeating within 30 days. Variants for context: ordinary day, returning after time away (welcoming, no guilt), exam within 48 hours (calm and steady), after a strong result (celebrating), end of term.
- Never compare the student with others, never mention weak scores negatively, never use fake urgency.
- Stored in `encouragement_messages` (text, context tag, status) with a log of the last messages each student saw.

**Done when:** a student can complete a full English Daily (words, rule, oral, sentences) plus Revisit, the ring fills across all five tasks, word progress is tracked towards the term total, and the login message appears once a day with context-appropriate text.

### Phase 4g: Producing the daily English content

**Scale (per class, per year, about 180 school days):** 900 words, 180 rules, 180 oral lessons, roughly 900 rule questions, 900 oral questions and at least 2,700 word questions (3 per word), about 4,500 questions per class and about 13,500 across JSS1 to JSS3. This must run as a pipeline in weekly batches, never as one big upload.

**A week-batch** is 25 words, 5 rules, 5 oral lessons, their exercises, and the week's sentence tasks.

**Steps for every week-batch**
1. **Plan the term first.** The admin fixes the term map: the sequence of rules and oral topics aligned with the NERDC English scheme and each week's English topics, the source of the word list (never invented), and difficulty progression. Keep one master word list across JSS1 to JSS3 so words do not repeat unintentionally.
2. **Draft.** The agent drafts the batch as `draft`: for each word the part of speech, meaning and three natural, age-appropriate example sentences in a familiar school context; rule text and standard examples; oral lesson text; exercise questions in CBT format with an answer key and a one-line explanation; sentence tasks. The agent cannot publish.
3. **Automatic checks.** Every example sentence actually contains its word, the part of speech is consistent, no duplicate words, each question has exactly one correct option, and no inappropriate content. Failures block the batch.
4. **Admin review.** The admin edits and approves every item in the Admin console and signs off the batch. The agent attaches the source for each rule point, and a second independent AI check solves every exercise and compares its answer with the key. Any disagreement is flagged for the admin first. Recommended, not required: occasionally have someone with English-teaching experience spot-check a sample of rule and oral content, because errors in grammar teaching are costly and hard to unlearn.
5. **Audio.** Clips for the approved oral scripts are recorded by the admin or a hired speaker (or synthesized and approved clip by clip), linked to their lesson, and listened to by the admin before publishing.
6. **Publish and schedule.** The batch becomes `published` and is scheduled in `english_daily_plan` for specific days. It stays hidden until its day (the Phase 2b gates apply).
7. **Stay ahead.** Keep content 2 to 3 weeks ahead of the calendar, with a coverage grid (days against classes) showing what is empty, draft, in review, approved or published.

**Rollout:** start with JSS1 Term 1 (300 words, 60 rules, 60 oral lessons, about 1,500 questions). Measure how long review takes per week-batch over the first two weeks, then plan the admin's weekly review time for the rest.

**After release:** words and questions that students miss most are fed back into the Revisit, and flawed questions are retired using exam statistics.

### Phase 5: Upload pipeline

The admin cannot review every student upload, so uploads are private to the student by default and reach other students only after the admin approves them.

1. Student uploads an image or PDF and tags subject, topic and week.
2. OCR and text extraction, then split into individual items.
3. Map each item to an objective. If confidence is low, it stays unmapped and private to that student, under the topic they tagged.
4. Convert to a question format.
5. **Answer key rule (critical):** a student's written answers on an assignment must never be used as the key. The key comes from an independent AI solve, checked by a second independent AI pass. If both agree, the item is marked "checked automatically". If they disagree, or no key can be found, the item is not served and the student sees "we could not check this one".
6. **Private pool:** the student's own items go into their own Revisit pool, labelled "from your own work". They never count towards official exam scores and are never shown to other students.
7. **Promotion by demand:** when the same item is uploaded by many students (default: 5 different students), it enters the admin queue, ranked by how many students uploaded it. The admin reviews the most-uploaded first. Approved items become shared items and become eligible for weekly and term exams.
8. The student sees the status of each upload: extracting, ready, or could not check. Every question has a "Report a problem" button (Phase 7).
9. The exam blueprint's share for uploaded work uses only admin-approved shared items, filled from the question bank until enough exist.

### Phase 6: Revisit scheduler
- First exposure, then re-serve at 2 days, 7 days and 21 days, then in the term-end exam.
- Wrong answer: next due date resets to 1 day.
- Correct twice in a row: lengthen the interval.
- Daily set is capped so it never overwhelms the student.
- Record the score on items revisited at 21 days. This is the retention metric.

### Phase 6b: My mistakes notebook and the instant follow-up

- Every wrong answer is saved to **My mistakes**: the question, the student's answer, the correct answer, the explanation, the subject, topic and objective, and the confidence the student gave. Wrong answers from official exams are added only after the exam window closes, so corrections are never leaked early.
- **Instant follow-up:** after a student finishes a set, offer one similar question for each wrong answer, tagged to the same objective or rule point (for Mathematics, a template variant with new numbers). A mistake moves to **Fixed** only after the student answers a similar question correctly now and again after the scheduler's next interval.
- **Screen:** two tabs, To fix and Fixed, with a count on each. Each card shows the subject, the confidence the student gave ("You said: Sure"), the question, the student's answer struck through next to the correct answer, a short explanation, and a "Try a similar one" button. A daily nudge ("Fix 3 today") sits above the navigation bar.
- Reach it from the menu ("My mistakes") and from a card on Today when mistakes are due. The daily mistakes set counts within the same daily cap as the Revisit.
- The Parent area shows only the count of mistakes still to fix.

### Phase 7: Question bank and review

**One topic per subject per week.** The admin picks each week's topic for each subject from the NERDC scheme of work. If the scheme has more than one topic in a week, the admin merges them or spreads them across weeks. Each topic has its own objectives and its own question bank.

**Standard weekly paper (defaults the admin can change)**
- 30 questions per subject, in CBT format.
- Blueprint: about half from this week's topic objectives, about a quarter revisit items from earlier weeks, and about a quarter admin-approved shared items from student uploads (filled from the bank until enough exist). Every objective of the topic appears at least once, and the mix of recall, application and analysis questions is the same for every student.
- **Each student gets their own form**, drawn from the topic's exam-eligible questions to the same blueprint and stored, so students cannot simply share answers. The midweek revisit reuses that student's own form, reshuffled.

**Live set and reserve bank (per topic)**
- **Live set:** 40 to 50 approved questions per topic are live. They feed the weekly paper, the Wednesday checkpoint, the daily practice and the Revisit. Suggested split: about 40 exam-eligible questions (100% admin-reviewed) and the rest practice.
- **Reserve bank:** all other questions the agent drafts and the admin approves are kept in reserve, hidden from students, and grow over time. The ceiling is up to 1,000 per topic, but only where usage data justifies it. Do not generate beyond what is being used.
- **Rotation:** about once a term, the admin rotates each topic's live set from the Admin console. The console previews the swaps (about 10 to 15 questions in, the same number out) and the admin approves them. Retire first the questions with the worst statistics (almost always right, almost always wrong, or reported). Only reviewed questions can move from reserve to live. When a topic is reused in a later year, refresh at least 30% of its live set.
- **Overlap is acceptable:** with a 30-question paper drawn from about 40 exam-eligible questions, students' forms will overlap heavily. Since the aim is learning and not a high-stakes exam, shuffling the order of questions and options is enough. Each student still gets their own stored form for the revisit. If many students show identical answer patterns, enlarge the exam-eligible pool or shorten the paper.
- **Scale check:** one topic per subject per week means about 1,188 topics (3 class levels x 11 subjects x 3 terms x 12 weeks). At 45 live questions each that is about 53,000 live questions in total, and the reserve grows slowly on top. At 1,000 each it would be about 1.2 million, which one admin cannot review.
- To publish a week: at least 6 approved questions per objective, plus the assembled exam (Phase 2b), and a live set within the 40 to 50 range.
- Track how many different questions each student is served per topic and how often each is reused. Add reserve questions only where students are running out.
- **Templates for numeric questions:** for Mathematics and any calculation-based subject, write a question template with random numbers and compute the answer key by code. One reviewed template yields thousands of variants with correct keys, so these topics can have large reserves without reviewing every variant.
- Detect and remove near-duplicate questions. A large bank of rewordings adds little.

**Review by risk** (all done by the admin in the Admin console)
- Items in official exams (weekly, term-end, year-end) are 100% reviewed before they can be used.
- Practice items (daily CBT, Revisit) get the automatic two-pass answer check. The admin fully reviews the first two weeks of each class level, then samples at least 20% of each later batch, and raises the sample if errors are found.
- Anything flagged by the checks, by reports or by statistics goes to full review.
- **Second AI check:** an independent solve of every question. Any disagreement with the key flags the item.
- **Report a problem:** every question shows a "Report a problem" button. Reports go to the admin's queue, and an item with 3 or more reports is pulled from serving until reviewed.
- **Statistics:** after each exam, flag items that nearly everyone got right or wrong.
- Target per objective: at least three difficulty levels.
- Retired items are kept in the database but never served.

### Phase 8: Group (WhatsApp-style chat, educational only, monitored by the admin)

Build this last. It is the highest-risk feature, and one admin must be able to watch it.

**The group must look and feel like a WhatsApp group chat**, in Avora's colours and without WhatsApp's branding. Match the mockup screens "Group home" and "Group chat". A group chat that is a list of structured posts is wrong: it must be a live conversation.

**Group home**
- One class space per class level (JSS1, JSS2, JSS3) with a chat channel per subject (11 subjects).
- A rules banner: "Educational discussion only. Messages are monitored."
- Each channel is a row: round coloured subject badge, subject name, a one-line preview of the last message with the sender's first name, the time, and an unread count badge.

**Chat screen (match these details)**
- **Header (white):** back arrow, round group avatar, channel name, "N online", and an info button.
- **Pinned bar under the header:** the admin-pinned message, for example the week's topic.
- **Date chips** centred between days ("Yesterday").
- **Message bubbles:** incoming on the left (white) with a small round initial avatar beside it, the sender's **first name above the text in a colour fixed per student**, and the time at the bottom right of the bubble. Outgoing on the right in soft gold. Rounded bubbles with a small square corner on the sender's side.
- **Reply:** a quoted block inside the bubble with a coloured left bar, the original sender's name and a snippet of the original message.
- **Reaction:** one reaction only, "Helpful", shown as a small chip under the bubble with a count.
- **Attachments:** photo bubbles with a preview, and PDF cards showing file name, pages and size, each with an optional caption.
- **Pending state:** an attachment waiting for approval shows "Checking before it shows" to the sender.
- **Admin messages** show the name "Avora" with an ADMIN badge.
- **Input bar at the bottom:** a rounded white pill with the text field, an attach (photo or PDF) icon and a camera icon, and a separate round send button. No microphone or voice notes, no stickers or GIFs at launch.
- Long-press a message for: reply, copy, report, and delete (own messages only). A "jump to latest" button with an unread count appears when scrolled up.
- Never show phone numbers or full names. Show the first name only, and initials in the avatar (or the photo only if the student has opted in, Phase 9).

**Rules and moderation**
- No private messages, and students cannot create groups.
- Educational only.
- **Text messages** pass an instant automatic filter (blocks phone numbers, email addresses, links, social media handles, addresses, and abusive or inappropriate words) and then appear immediately, so the chat feels live. If a message is blocked, the sender sees a short reason.
- **Photos and PDFs are held until approved.** An automatic scan runs first, then the admin queue. Attachments are the highest-risk content.
- The admin sees a live feed of every channel in the Admin console, with flagged messages first, and can delete a message, mute a student for a set time, or ban. Students can report any message.
- Slow mode (a limit on messages per minute) and configurable quiet hours when the group is closed.
- Cap the active members per space at what the admin can realistically watch, and open one class level first.
- The admin keeps a written response procedure for serious safety reports (a child at risk, bullying, an adult contacting children), including who to contact and how fast to act. Serious reports are handled the same day.
- The admin can pin a message and can promote a good question and answer into the revision pool.
- Keep full logs of messages and moderation actions.

### Phase 8b: Direct messages (admin to anyone, and a general DM switch)

Direct messages use the same WhatsApp-style layout as the group chat (see the mockup screen "Direct message with Avora"): white header with the person's avatar and name, message bubbles with times, reply quotes, an input bar with attach and camera and a send button.

**Admin and student direct messages (always available to the admin)**
- The admin can message any student: from the student card, from a search, or by tapping a name anywhere. The admin can also send a broadcast to a whole class level, which appears in each student's "Avora" thread.
- A student can reply, and can start a conversation with the admin from Help ("Ask Avora").
- The thread header shows "Avora" with an ADMIN badge, and a banner at the top of every admin thread says **"Your parent can see messages in this chat."** The Parent area lists messages between the student and Avora, read-only. Say this in the parent consent text too.
- Every message is logged. Students can report. No notifications during quiet hours (default 9 pm to 6 am).
- Photos and PDFs sent by students are scanned first.
- These messages are not affected by the general DM switch below.

**General DMs between students (default OFF)**
Student-to-student private chat is the riskiest feature for a platform of children who registered independently, so it is controlled by switches, and it starts switched off.
- **Master switch** in the Admin console, "Student to student messages". Default off.
- **Per class level switches** (JSS1, JSS2, JSS3). They work only while the master switch is on.
- **Per student override:** the admin can turn DMs off for one student ("Turn DMs off" on the student card).
- **Parent switch:** each child's DMs are off until the parent switches them on in the Parent area. The parent can switch them off again at any time.
- A student can send or receive DMs only when the master switch, their class level switch and their parent switch are all on.
- **When on:** same class level only; text only, with no attachments or links; the same automatic filter as the group (phone numbers, emails, links, social handles, addresses, abusive words); rate limits; a Block and a Report button in every chat; blocked students cannot message each other. A chat starts from a student's name in the group chat ("Message"). Messages are logged, and the admin can review a conversation when it is reported or flagged by the filter. State this in the consent text.
- Switching the master switch off immediately hides all student DM threads from students and keeps the logs.

### Phase 9: Student photos

Students' real photos must appear in the app. Build it safely:
- Upload by the student. Resize to a small square (WebP) on upload.
- Photo upload needs the parent's photo consent recorded at registration (Phase 1c).
- The admin approves each photo before it is shown anywhere beyond the student's own screens.
- **Where the photo shows:** everywhere the student appears to the **admin** (group chat avatars, lobby lists, review queues, search, DMs and the student card), and on the student's own screens (profile, home header, results header, login greeting) and in the Parent area. Where there is no approved photo, show initials.
- **Classmates see a student's photo only if** the student has switched on "show my photo to classmates" (this needs the parent's photo consent), or the admin has switched on "Show photos to classmates by default" in Messaging settings (the student's photo consent is still required). Both are off by default. Otherwise classmates see the first name and initials only. This protects children in a group that mixes students from many places.
- **Tapping a profile:** for the admin, tapping any avatar or name anywhere opens the **student card** (bottom sheet): photo, name, class and school, last active, stats, consent chips, and buttons Message, Open full profile, Mute 1 hour, Turn DMs off, Suspend. For a student, tapping another student shows only a small card with the first name, the avatar (photo if allowed, otherwise initials), a Report button, and Message only if DMs are allowed.
- Never on public pages. Never in exports. No image downloading. A "Delete my photo" button in settings works immediately, and a request to delete the whole account is honoured.
- Show a clean initials fallback when a photo is missing or pending.

### Phase 10: Full visual redesign (mobile first, distinctive, not generic)

The current look is to be replaced entirely: colours, layout, typography, components, motion. Do not use a stock template or default component-library look. Design for a **360 x 800 phone first**, then scale up to tablet and desktop.

**Design concept: "Dawn".** Avora's name suggests aurora and first light, and the product is a daily habit of learning. The whole interface is built around a sunrise-to-night sky. Colour and mood shift gently through the day, and student progress is shown as light.

**Colour system (replace the earlier indigo and amber tokens)**
- Night (base for dark mode and hero surfaces): `#0E0F2E`. Deep violet: `#2A1B6B`.
- Aurora gradient, used sparingly on hero cards, rings and the countdown only: violet `#6C4CF1` to rose `#F0568C` to teal `#19C3B1`, with a gold `#FFC857` highlight.
- Light mode: warm cream `#FBF7F2` background, white cards, ink text `#1B1840`.
- Subject "gems", each a pairing of a deep and a bright tone, used consistently for chips, rings and stars: English (sapphire), Mathematics (ember), Basic Science (emerald), Social Studies (amethyst); further subjects from a fixed set.
- Feedback colours: success mint, warning gold, error coral. Never rely on colour alone to convey meaning.
- **Time-of-day theming:** the home header gradient shifts with local time (morning gold and rose, afternoon teal and sky, evening violet and night). Dark mode switches on automatically in the evening unless the student chooses otherwise.
- Rule: gradients are rare and special. Most of the interface is calm, with plenty of space, so the colour that does appear feels earned.

**Typography**
- Headings and big numbers: an expressive, elegant display face (for example Fraunces). Body and UI: a clean geometric sans (for example Plus Jakarta Sans or Manrope). Tabular figures for scores and timers.
- Body text 16px or larger. Self-host fonts as WOFF2 subsets to keep pages light.

**Signature elements**
1. **The Dawn Ring (home).** One large ring shows how much of today's tasks are done. It fills with the aurora gradient, glows as it nears completion, and when it closes the header "sun" rises. This is the daily moment students come back for.
2. **The Constellation (mastery map).** Each topic is a constellation and each objective is a star. Unseen objectives are dark, practised ones glow dim, mastered ones shine bright. After a revisit, a star visibly brightens. Tapping a star opens that objective. Class pages can show the class as a field of faces, each student's photo as a star.
3. **Student photo avatars.** Circular, with a thin ring that takes the colour of the student's current streak level. Initials fallback until the photo is approved.
4. **Floating bottom navigation.** A rounded floating pill in the thumb zone with four tabs (Today, Subjects, Group, Progress) and a raised centre button for Upload. Primary actions always live in the lower half of the screen, reachable with one hand.
5. **Bottom sheets instead of modals** for choices, study-source selection, and reports.
6. **Live exam focus mode.** The interface strips down: one question per screen, large tap targets, a slim aurora timer bar at the top that shifts from teal to rose as time runs low, no distractions, subtle haptic on answer.
7. **Results reveal.** After an exam, stars light up objective by objective, then the per-objective breakdown appears. On the revisit, attempt 1 and attempt 2 are shown side by side as dim versus bright stars.

**Navigation model (one obvious place for everything, so students are never confused)**
- The student's avatar (top left on the main tab screens) opens their Profile.
- A three-line menu (top right) holds secondary items only: Results history, My mistakes, My uploads, Exam schedule, Word bank, Parent area (PIN), Notifications, Settings, Help, Log out.
- The bottom bar holds the daily-use destinations: Today, Subjects, Upload (raised centre), Group, Progress. No destination appears in both the bottom bar and the menu.
- Every screen has one clear primary action. Lesson and exercise screens use a back or close button instead of the top bar. Nothing is deeper than two levels.

**Screens**
- **Today:** header sun and photo, Dawn Ring, the avatar (opens Profile) and the three-line menu button in the top bar, then today's cards (Words, Rule and Oral English; Sentences; Revisit), then This Week with subject gems and progress. The exam countdown appears as a glowing card when an exam is within 48 hours.
- **This week (all subjects):** the weekly view of all the class level's subjects. One card per subject with its colour edge, the week's topic, a row of small stars for that topic's objectives (lit = mastered), and a count. Subjects beyond the first screen collapse into "N more subjects". This is the main weekly overview.
- **Topic objectives:** opened from a subject card. Topic title in large type, then one card per objective with its star, status, and a switch between "My textbook" and "In-app lesson". Also shows checkpoint and exam times.
- **Login encouragement:** full-screen greeting on the first login of the day: a sun rising over a horizon, the student's photo in the glowing ring, "Welcome back, [name]", one message in large display type, streak and a line previewing today's tasks, then a "Start today" button and a quiet "Skip".
- **Profile:** opened from the avatar. Large photo in the glowing ring (changing it sends the new photo to the admin for approval), name, class level and school as entered, three tiles (streak, words learned, stars lit), recent results with the revisit change, uploads count and status, and an entry to the Parent area. A student sees only their own profile. The Parent area also lists the messages between the student and Avora, read-only, and holds the switch for the child's student-to-student DMs. Other students appear only as first name and initials.
- **Menu:** full-screen panel opened by the three-line button, listing the secondary items above, with Log out set apart at the bottom.
- **CBT exercise:** see Phase 4. One shared screen with question counter, progress bar, optional timer, large A to D options, a question-number row, and Previous and Next.
- **Group home:** the class space with a channel row per subject (coloured badge, name, last-message preview, time, unread count) under a rules banner. See Phase 8.
- **Group chat:** a WhatsApp-style conversation: white header with online count, pinned topic bar, date chips, bubbles with first-name senders, reply quotes, "Helpful" reaction, PDF and photo messages, a "Checking before it shows" state, ADMIN badge, and an input bar with attach and camera plus a send button. See Phase 8.
- **Getting started:** the last registration step. Three-segment progress bar ("Step 3 of 3"), a study-time chooser (After school, Evening, After dinner, with an exact time and a Change button), a "Starting check" card (20 questions, about 15 minutes, no score shown) with a "Start the check" button, and a quiet "Do it later".
- **My mistakes:** a page titled "Turn mistakes into stars", To fix and Fixed tabs, mistake cards (subject, "You said: Sure", question, your answer struck through, the correct answer, explanation, "Try a similar one"), and a "Fix 3 today" nudge. See Phase 6b.
- **Exam lobby (live session mode):** dark calm screen with a "Lobby open" chip, exam title, a large countdown to the planned start, an avatar stack with "38 here", an admin announcement bubble with an ADMIN badge, a large gold "I'm ready" thumb button, a secondary "Need 5 more minutes" button, a "31 of 38 ready" progress bar, and three check items. See Phase 3b.
- **Direct message:** a WhatsApp-style one-to-one thread with Avora (ADMIN badge), a banner "Your parent can see messages in this chat", bubbles with times and read ticks, and the same input bar as the group chat.
- **English Daily hub:** four steps (words, rule, oral, sentences) with done states, the next step highlighted, and the term word-bank progress bar (for example 90 of 300).
- **Rule lesson:** a scrolling lesson page: part label (for example "Part 1 of 4"), topic title, a definition card, numbered rule cards each with Correct and Incorrect examples, a common-mistake card, a dark Remember card, and an exercise button that says how many questions follow.
- **Oral English lesson:** short description, then "Listen" rows with a play button, the word and its sounds written out, labelled "standard pronunciation", then a "Try it" exercise card.
- **Daily word:** word in large type, its classification chip (part of speech), meaning, up to three numbered example sentences with the word highlighted, the related form, and a button into the sentence tasks.
- **Group:** class space, subject channels, structured post types.
- **Progress:** constellation, results history and word bank.
- **Upload:** camera-first flow, with live status per upload (extracting, under review, live).
- **Parent area:** opened with the parent PIN, in a calmer parent mode with a lock badge and a "Back to [student]" button. Shows days studied, new words and stars lit this week, a seven-day dots row, each subject marked On track, Needs attention or Not started, the next exam and its window, and one suggestion of how to help.
- **Admin console:** not part of the student app. See Phase 10b. The mockup does not include its screens.

**Motion**
- Spring-based, 200 to 350 ms, using only transform and opacity so it runs smoothly on cheap phones. Skeleton loaders instead of spinners. Haptic feedback on key actions where supported.
- Celebrations are brief and restrained. Respect the system "reduce motion" setting.

**Healthy "addictive" design (important, because users are children)**
Make it compelling through progress, beauty and small wins, not manipulation:
- The daily set has a clear end. When the ring closes, show a calm "done for today" screen with a short closing message. No endless feed.
- Streaks forgive: include a free "rest day" so a missed day does not erase progress or create guilt.
- Class comparisons, if any, reward improvement rather than rank, and are opt-in. No public shaming.
- No fake urgency, no manipulative notifications. Reminders are tied to real exam times and due Revisit items.

**Performance and accessibility**
- Mobile first: tap targets at least 44 px, one-handed layouts, everything usable on a weak connection. WebP images, lazy loading, small JS bundles.
- Build constellations, rings and the sun with SVG and CSS, not heavy libraries. Use animation files only if small.
- WCAG AA contrast, visible focus states, readable in bright sunlight (check light mode outdoors-level contrast).
- All tokens (colours, spacing, radii, type scale, motion) live in one design-tokens file so the whole look can be changed in one place.

**Done when:** every screen is built at 360, 390 and 412 px widths, passes a contrast and tap-target check, loads acceptably on a mid-range phone over a slow connection, and the owner has signed off screenshots of Today, Subjects, Live Exam, Results, Group and Me.

### Phase 10b: Admin console (the owner runs everything from here)

The admin is the only staff member, so this console is as important as the student app. It must make a day of reviewing and monitoring fast, on a laptop or a phone.

- **Access:** admin only, with two-step verification, session timeout, and an audit log of every admin action. The database is backed up before any bulk import.
- **Home:** today at a glance (new students, tasks completed, exams in progress), counts for every review queue, and alerts (for example, next week's content not ready).
- **Content pipeline:** coverage grids for objectives (subjects by weeks) and for the English daily plan (days by class level), colour-coded draft, in review, approved or published. Draft batches open into the review screen.
- **Review queues:** content items, most-uploaded student items, question reports, photos, group posts, safety reports. Each has a one-item-at-a-time review screen with the draft and its source side by side, Approve, Edit and Reject buttons, keyboard shortcuts on desktop and large buttons on a phone, bulk approve after sampling, filters, and a progress counter.
- **Question sets:** for each topic, the live set (40 to 50) and the reserve bank, with usage statistics, a "Rotate set" action that previews the swaps for approval, and a retire list.
- **Messaging:** a settings screen with the master switch for student-to-student DMs, per class level switches, the default for showing photos to classmates, and notes on the safety rules that apply when DMs are on. The admin can message any student or class level from here or from a student card.
- **Student card:** opened by tapping any avatar or name. See Phase 9.
- **Live session control:** during a live session, the lobby counts, ready check, announcements and the Start now, Wait 5 minutes and Cancel session buttons (see Phase 3b).
- **Exam scheduler:** create, reschedule or cancel exams per class level, with per-student overrides, flexible windows, and a live monitor of who has started and submitted.
- **Calendar and weeks:** the term calendar, and hold or advance a class level.
- **Students:** search, view a student's progress, reset the student PIN or parent PIN, suspend, view consent records, delete data on request.
- **Messages:** the encouragement library and a notifications log.
- **Analytics:** mastery per class level and objective, weekly completion, exam participation, 21-day retention, export to CSV or PDF (never including photos).
- **Settings:** pronunciation standard label, minimum questions per objective, daily Revisit cap, quiet hours.

**Done when:** the admin can run a complete week (publish content, schedule the exam, review queues, monitor the group, read results) from the console without touching the database.

### Phase 11: Analytics for schools and government
Per class and per objective: mastery, weekly completion rate, exam participation, and the 21-day retention score. Provide curriculum-coverage reporting mapped to NERDC objectives, with CSV and PDF export that never includes student photos.

### Phase 12: QA and rollout
- Test the full week cycle with a pilot class behind the feature flag.
- Test permissions: students cannot see other classes, photos, or posts.
- Load test the weekend exam window.
- Roll out class by class. Keep a rollback switch.

## 4. English: sentence construction

Each day, alongside vocabulary, include 3 sentence-construction tasks matched to the student's class level. Rotate across these types:
1. **Arrange the words** into a correct sentence.
2. **Correct the error** in a given sentence (tense, subject-verb agreement, punctuation, spelling).
3. **Complete the sentence** using a given word.
4. **Write your own sentence** using today's vocabulary word.

**Marking:**
- Types 1 to 3 have fixed keys and are auto-marked.
- Type 4 is marked against a rubric: uses the word correctly, grammar, tense, punctuation, sense. Give the student short, kind feedback with one correction and one example.
- Sentences marked weak return in the Revisit set with a new word or context.
- The admin can see a student's written sentences and override the feedback.
- Never publish a student's sentence to the group without moderation.

## 5. Definition of done

- A pilot class completes one full week using only the new flow.
- Every question in an exam maps to an objective.
- No item is live without a verified answer key.
- Student photos appear throughout the app and are only visible to approved audiences.
- The group has no private messaging, and every upload is scanned and moderated.
- Old data is intact and the rollback switch works.
