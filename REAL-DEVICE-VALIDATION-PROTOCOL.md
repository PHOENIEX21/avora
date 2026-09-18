# AVORA V14.2 Real-Device Validation Protocol

This protocol validates the product with real learner behaviour. Passing source audits is not the same as proving that a JSS learner can use AVORA comfortably.

## Privacy rule
Validation telemetry records only allowlisted operational metadata: route/surface, subject, class level, topic, exam, source flow, outcome/mode and offline/restored/cached flags. It must never store raw learner answers, Tutor chat text, lesson narration, names, email addresses, IP addresses, browser user-agent strings, free-form composition text, parent codes or authentication values.

## Minimum device matrix
Test at least:
- Android phone around 360×800 on Chrome
- Android phone with data temporarily disabled during Tutor
- Windows laptop on Chrome or Edge
- iPhone/Safari when available
- One weak/slow network scenario

## Learner journey tests
1. Sign in as a JSS learner and open Home.
2. Take an Exam or authored Mock.
3. Submit and select the recommended weak topic.
4. Confirm Tutor opens the exact recommended subject/topic.
5. Start the lesson and allow board + voice to advance.
6. Give one wrong checkpoint answer and request help.
7. Confirm exact re-teaching returns to a valid lesson step.
8. Complete the topic.
9. Enter independent Practice and answer a fresh question.
10. Confirm assisted work did not itself create independent mastery.

## Resilience tests
1. Start a Tutor lesson online.
2. Disable network after the lesson has loaded.
3. Confirm loaded/cached teaching remains readable and device voice can continue.
4. Confirm live grading/AI does not pretend to work offline.
5. Refresh/reopen Tutor and confirm saved position restores paused.
6. Restore network and confirm queued progress synchronizes.
7. Confirm Admin Validation records offline entered, reconnect, restored/cached lesson events without learner answer content.

## Family tests
1. Parent opens Manage family.
2. Link an existing child by one-time code.
3. Verify the linked learner consumes one of the maximum three learner seats.
4. Verify a duplicate link is rejected.
5. Verify a fourth learner is rejected server-side.
6. Verify linking does not reset the learner trial allowance.

## PWA tests
1. Install AVORA where browser support exists.
2. Relaunch from installed icon.
3. Trigger a new deployment/service-worker update.
4. Confirm the learner sees update-ready UI instead of being forcibly reloaded mid-lesson.
5. Apply update and confirm lesson position remains recoverable.

## Acceptance evidence
For every test, record only: device/browser family, pass/fail, approximate screen width, flow name, and a short non-sensitive observation. Never copy learner answers or personal data into test notes.

A release should not be called production-validated until these real-device flows have been exercised successfully by representative learners/parents/teachers, even if all automated audits pass.
