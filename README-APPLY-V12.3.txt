AVORA V12.3.0 RECHECKED LAUNCH PATCH

Extract into your current AVORA_TEST project and choose Replace files in destination.
Then run once:
  node --env-file=.env.local scripts/migrate.mjs
Then verify:
  npm run launch:check
  npm run preflight
  npm run build

No reseeding and no npm install are required.
