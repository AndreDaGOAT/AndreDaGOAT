# Current-state discovery

## Method and boundary

### FOUND IN REPOSITORY

Discovery inspected the working tree, tracked-file list, local branches/remotes, and local history.
The checkout has one tracked file (`README.md`), one local commit, no configured remote, and no
untracked application artifacts. The README identifies the repository as the `AndreDaGOAT` GitHub
profile repository. No credentials were printed or sought.

### Discovery inventory

| Requested area | Finding |
|---|---|
| Framework and structure | Not present; no package/dependency/build manifest. |
| Supabase configuration | Not present. The user-supplied project URL is not repository evidence. |
| Schemas/migrations/RLS | No SQL, migration directories, schema definitions, or policies. |
| `service_requests`, `appointments`, SRN | No definitions or references. Generation/consumption and appointment resolution cannot be traced. |
| `assigned_wash_pro_id` / assignment | No occurrence; column type and runtime behavior cannot be confirmed. |
| Wash Pro profile/documents/territories/availability | No definitions or references. |
| Onboarding/offboarding | No implementation. |
| Auth/roles/status transitions/`Completed` | No implementation. |
| Evidence/photos/AI | No implementation or storage configuration. |
| `payments`/subscriptions/recurrence | No definitions or code. |
| Stripe/Connect/webhooks | No dependencies, endpoints, or code. |
| Edge/server functions | No function source or configuration. |
| Environment/secrets pattern | No example environment file or runtime configuration. |
| Audit/logging | No implementation. |
| Tests | No test files or test runner configuration. |

Absence from this checkout must not be generalized to the live system.

## Current-state dependency map

```text
Customer              [NOT FOUND]
  ↓ relationship      [UNVERIFIABLE]
Service Request       [NOT FOUND]
  ↓ request_id/SRN    [UNVERIFIABLE]
Appointment           [NOT FOUND]
  ↓ assignment        [UNVERIFIABLE]
Wash Pro              [NOT FOUND]
  ↓ completion path   [UNVERIFIABLE]
Completion evidence   [NOT FOUND]
  ↓ financial link    [UNVERIFIABLE]
Payment               [NOT FOUND]
```

There is therefore no honest “actual discovered relationship” beyond identifying each node as
unavailable in this checkout.

## PROPOSED FOR T³ overlay

```text
Service Request Completed (claim only)
  → T³ Verification → AI Evidence Assessment → Deterministic Policy
  → Financial Transaction → Versioned Revenue Allocation → Earnings Ledger
  → Payout Eligibility → T³ Pay → Stripe Connect
  → Authenticated Provider Webhook → Reconciliation
```

The entire overlay is a target design gap. The first dependency remains retrieval and validation of
the intended application repository and deployed-schema metadata.
