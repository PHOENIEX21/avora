# AVORA V14.5.4 — NCEE seed reconciliation

- Keeps the V14.5.3 Neon retry/cache hardening.
- Reconciles interrupted or legacy NCEE V11 seed records after the 960-item editorial bank is upserted.
- Exactly one published row is retained per expected `ncee:<id>` variant.
- Unexpected or duplicate AVORA-original V11 NCEE_PREP rows are marked `RETIRED`, not deleted.
- Final integrity check still requires exactly 960 published V11 NCEE_PREP rows.
