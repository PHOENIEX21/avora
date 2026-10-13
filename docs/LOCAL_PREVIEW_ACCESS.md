# Local learner preview access

This opt-in flag exists only to preview learner pages locally when the test student has an expired trial.

In the local clone, add the following line to `.env.local`:

```dotenv
AVORA_LOCAL_PREVIEW=true
```

Restart `npm run dev` after changing environment variables. Then refresh `http://localhost:3000/home`.

Safety:
- The bypass applies only when `NODE_ENV` is not `production`.
- It does not alter a trial, subscription, parent link, guardian consent, class release, or weekly schedule in the database.
- Do not set this flag in production. It has no effect in production builds/runtime.
- It is intended for local UI validation only, not as a learner entitlement or launch workaround.
- Weekly/Dawn guardian and curriculum-release gates remain separate and continue to apply.
