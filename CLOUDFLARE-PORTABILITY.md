# AVORA Cloudflare portability path
Vercel remains the active testing host for V14.4. This is a non-destructive commercial-hosting path and does not change the current deployment.

Cloudflare currently recommends vinext for existing Next.js 16 applications, but vinext is beta and Cloudflare says to run `npx vinext check` before production adoption. AVORA therefore does not initialize it blindly.

When ready on a copy/branch:
1. `npx vinext check`
2. Review every incompatibility.
3. `npx vinext init`
4. `npm run dev:vinext`
5. `npm run build:vinext`
6. Test registration/login/session, Tutor, Practice, Exam/Mocks, weekly Live Exam, family/parent, Paystack, Brevo, Neon, AI budgets, PWA/offline/reconnect, Admin and telemetry.
7. Deploy to a temporary workers.dev address.
8. Move the custom domain only after feature parity.

Keep the normal Next.js/Vercel scripts. Portability means both paths coexist until Cloudflare is proven.
