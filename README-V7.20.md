# AVORA V7.20 — Synchronized Whiteboard Tutor + Dashboard Responsiveness

- Whiteboard is now the Tutor surface; voice narrates the exact visible whiteboard step instead of living in a separate media strip.
- Voice can be turned off while the learner continues through the same complete visual explanation.
- Reliable Pause / Continue: pause preserves the current board step and Continue restarts that exact step instead of relying on inconsistent browser speech resume behavior.
- Previous / Next board-step controls work independently of voice.
- Dashboard evidence queries run in parallel with bounded transient DB retry to reduce avoidable Neon latency.
- Global route loading indicator is delayed by 450 ms, so fast navigation does not flash a spinner; it appears only when a route actually takes noticeable time.
- Preserves V7.19 auth navigation fix and all V7.18 curriculum/question/progress work.
- No new migration or seed required.
