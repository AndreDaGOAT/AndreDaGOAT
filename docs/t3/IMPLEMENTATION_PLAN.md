# Controlled implementation plan

## FOUND IN REPOSITORY

The checkout cannot support implementation planning estimates or code-level sequencing because it
contains no JECS application. The following is a gated proposal, not authorization to deploy.

## PROPOSED FOR T³

1. **Repeat discovery (blocking):** obtain the intended existing repository/branch without creating
   a replacement or reconnecting this profile repository. Inventory all tracked/generated schema,
   migrations, functions, RLS/storage policies, clients, secrets pattern, tests, and deployed-schema
   drift using approved read-only access. Re-run the 30-item discovery checklist.
2. **Validate requirements:** interview product, operations, finance/legal, payroll, security, and
   support; define payment/capture/refund, worker classification, evidence, tip, hold, dispute,
   offboarding, retention, and jurisdiction rules. Establish requirement-to-test traceability.
3. **Approve architecture/threat model:** select provider architecture and liabilities; confirm trust
   boundaries, T3-ARCH-001, data classification, deterministic policy, human review, incident plan.
4. **Design/rehearse Migration 001:** resolve assignment facts first. Run the conditional
   expand/backfill/contract proposal in `DATA_MODEL.md` only after mapping approval; no production
   deploy in this phase.
5. **Security/RLS design:** role-operation matrix, server function ownership/grants, storage policy,
   secret rotation, negative cross-tenant tests, audit controls, and step-up flows.
6. **Backend foundation:** implement verification inbox, ledger/allocation rules, tips, audit and
   transactional payout reservations behind flags—without provider money movement initially.
7. **Stripe test-mode integration:** hosted onboarding, provider adapter, signed/idempotent webhook
   inbox, ambiguous-result recovery, and reconciliation. Keep employee payroll separate.
8. **T³ Pay UI:** build read-only balances from ledger views and intent-only “Get Paid”; clear pending,
   hold, failure, and review states. Perform security/accessibility review and screenshot validation.
9. **Automated assurance:** unit/property tests for balanced allocations and state machines; database
   constraint/RLS tests; concurrency races; webhook replay/order; failure injection; AI evaluation,
   appeal, and bias monitoring; secret/SAST/dependency scans.
10. **Staging:** provider test transactions and operational runbooks; restore/reconciliation drills;
    observability/alerts; formal security, finance, legal, and product sign-off.
11. **Controlled pilot:** a few approved contractors, conservative limits/holds, no unsupported instant
    payout, daily reconciliation and rapid rollback/disable switches; expand only on measured gates.

## Review gates

No phase advances while critical unknowns, failed invariant/RLS/concurrency tests, unreconciled test
money, missing runbooks, or stakeholder approvals remain. Migration deployment, live Connect activation,
real connected accounts, and production money movement are explicitly outside this discovery task.
