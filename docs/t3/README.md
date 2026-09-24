# JECS T³ discovery dossier

**Status:** discovery-only architectural review, 2026-09-24. No migration was run and no
production behavior was changed.

## Discovery result

### FOUND IN REPOSITORY

The checked-out branch contains one tracked application-independent file: the repository-root
`README.md`. That file describes a personal GitHub profile and learning interests; it does not
describe JECS Quick Wash. There is no application source, dependency manifest, Supabase
configuration, database schema, migration, test, or deployment configuration in this checkout.
The Git history available locally contains one commit (`4f684a8`, `Create README.md`). No Git
remote is configured.

This is a material discovery finding—not evidence that the JECS production system lacks these
components. It means the requested implementation cannot be traced or safely integrated from
the supplied checkout. In particular, the known Supabase project URL was not queried and no
attempt was made to connect to or alter it.

### PROPOSED FOR T³

The remaining documents record a reviewable target architecture and a deliberately non-executable
Migration 001 proposal. Every proposal is conditional on repeating discovery in the actual JECS
application repository and validating the deployed schema through approved, read-only metadata.

## Document map

| Document | Purpose |
|---|---|
| [REQUIREMENTS.md](REQUIREMENTS.md) | Functional baseline and financial invariants |
| [CURRENT_STATE.md](CURRENT_STATE.md) | Evidence-backed repository inventory and dependency map |
| [GAP_ANALYSIS.md](GAP_ANALYSIS.md) | Current-to-target gaps and blockers |
| [ARCHITECTURE.md](ARCHITECTURE.md) | T3-ARCH-001, trust boundaries, and target flow |
| [THREAT_MODEL.md](THREAT_MODEL.md) | Assets, actors, abuse cases, and controls |
| [DATA_MODEL.md](DATA_MODEL.md) | Proposed financial domain and Migration 001 |
| [SECURITY_MODEL.md](SECURITY_MODEL.md) | Auth, RLS, secrets, and privileged operations |
| [TRANSACTION_STATES.md](TRANSACTION_STATES.md) | Verification, earning, and payout state machines |
| [AI_VERIFICATION.md](AI_VERIFICATION.md) | Human-centered evidence assessment |
| [STRIPE_CONNECT.md](STRIPE_CONNECT.md) | Conditional Connect integration design |
| [RECONCILIATION.md](RECONCILIATION.md) | Operational/financial/provider consistency |
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | Gated SDLC and validation plan |

## Decision required

Human architectural review should first confirm that the intended JECS repository contents have
been made available on an approved branch or workspace. Do not implement Migration 001 from this
dossier as-is.
