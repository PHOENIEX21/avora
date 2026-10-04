# AVORA V10.8.0 — Family Access Integrity + Warm Intelligence UI

This release hardens AVORA's family subscription model before real Paystack activation and establishes the global visual system.

## Family subscription model
- One parent/guardian billing owner.
- Up to **3 identified learner profiles** under one family subscription.
- Children may be in different classes; each learner keeps independent mastery, Tutor history, assessments and reports.
- A learner can occupy only one active family subscription seat at a time.
- The fourth learner is rejected server-side, not merely hidden in the UI.
- Seat attachment and release events are auditable.
- Learner seats are identity-bound; routine self-service seat swapping is intentionally not exposed. Genuine replacement should go through AVORA Support.

## Trial and entitlement
- **14-day introductory trial**.
- A learner trial belongs to the learner identity, not a browser/device.
- When a learner is connected to a family trial, the family trial does not reset that learner into a second free period.
- Once a learner occupies a family seat, that family entitlement becomes authoritative; an expired family trial cannot silently fall back to another learner trial.
- Core learner pages and learning APIs now enforce entitlement server-side.
- Expired learners keep their records and are routed to a clear renewal/parent-connection screen rather than losing data.

## Parent-supervised assessment integrity
- If a learner has a linked AVORA parent account, manual guardian-name confirmation no longer unlocks the supervised assessment.
- The linked parent/guardian must confirm from their authenticated Parent Dashboard.

## Paystack model
- Family monthly price remains configuration-driven via `AVORA_FAMILY_MONTHLY_PRICE_NGN` with the current launch default set to **₦5,000**.
- Paystack plan code and secret key remain environment configuration.
- Parent billing screen now explains exactly who pays, who gets access and how all three learner seats are used.

## Visual system
AVORA now uses a warm, professional global palette:
- Deep blue-indigo `#283B73`
- Warm cream `#FFF9F0`
- Coral `#E98269` with darker accessible action coral
- Lavender `#A99BE8`
- Honey gold `#F2C66D`
- White surfaces `#FFFFFF`
- Deep blue-grey text `#26344A`
- Mint success `#72C6A5`

Blue/cream/white remain dominant; coral, lavender, honey and mint are semantic accents rather than decoration everywhere.

## Important verification note
Structural audits can run in this working environment. The repository currently has no local `node_modules`, so the final Next.js/TypeScript production verification must still be run after dependencies are installed on the user's machine.
