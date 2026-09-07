# AVORA V7.12 — App Motion & Brand Ident

This release adds a restrained motion language designed for the student app/PWA experience.

## Added
- ~4.8 second AVORA sign-in ident after successful login.
- Original in-browser sonic mark generated with Web Audio (no copied audio asset, no external file).
- Skip control on the sign-in ident.
- Reduced-motion support.
- Global AVORA navy/gold navigation loader for signed-in student routes.
- Context-aware loading labels for Learn, Tutor, Practice, Exam, Progress and Home.
- Route-level `app/loading.tsx` fallback.
- Branded inline spinner on the authentication submit button.
- PWA/app icons (192px + 512px) and maskable manifest entry for a more app-like installed experience.

## Product rule
The long ident is reserved for sign-in. Normal navigation uses the small AVORA loader so repeated use stays fast and pleasant.

No database migration is required for V7.12.
