# 1. Centralised API client with reactive auth teardown

- Status: Accepted
- Date: 2026-06-17

## Context

The client caches whether the user is logged in; the server (express-session) is
the source of truth. They can diverge (session expires, or logout in another tab)
leaving stale user data in the store. Backend calls were scattered bare `fetch`es
with no single place to detect this or clear protected state.

## Decision

All backend calls go through one client, `frontend/src/api/client.ts` (`apiFetch`).

- **Detect:** the backend stamps every response with `X-Authenticated: true|false`
  (`authStatusHeader`, works on public routes too). `apiFetch` tears down on a
  `401` **or** `X-Authenticated: false`, but only when the client currently
  believes it is logged in (so anonymous browsing / failed logins are ignored).
- **Teardown:** it dispatches `userLoggedOut` — the one action every slice with
  user data clears on.
- **Enforce:** ESLint (`no-restricted-syntax`) bans bare `fetch` outside the client.
- **No cycle:** the store is injected via `registerApiStore` (in `store.ts`), not
  imported by the client (that would form a load-time init cycle).
- Proactive `/auth/me` checks (boot / refocus / route change) stay — they cover
  detection while idle, which reactive calls can't.

## Rejected alternatives

- Clearing state in `RequireAuth` — only mounts on protected routes; blind to public browsing.
- 401-only — public endpoints return 200, so they never surface expiry.
- A `/auth/me` call alongside every request — doubles traffic for info the response already carries.

## Consequences

- New backend calls inherit teardown for free (lint-enforced).
- New slices with user data must still handle `userLoggedOut` (see CLAUDE.md checklist).
- CORS must expose the header: `exposedHeaders: ["X-Authenticated"]`.
