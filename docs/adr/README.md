# Architecture Decision Records (ADRs)

This directory records significant architectural decisions for Playstack.

We use a lightweight [MADR](https://adr.github.io/madr/)-style template:
**Context → Decision Drivers → Considered Options → Decision → Consequences**.

## Conventions

- One decision per file, named `NNNN-short-kebab-title.md` (zero-padded, e.g.
  `0001-...`). Numbers are sequential and never reused.
- Each ADR has a `Status` (Proposed / Accepted / Superseded / Deprecated).
- ADRs are immutable once Accepted. To change a decision, add a new ADR and mark
  the old one `Superseded by NNNN` rather than editing it.

## Index

- [0001 — Centralised API client with reactive auth teardown](0001-centralised-api-client-and-auth-teardown.md)
