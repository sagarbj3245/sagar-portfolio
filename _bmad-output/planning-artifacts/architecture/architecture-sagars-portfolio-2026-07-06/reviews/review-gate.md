# Reviewer Gate — Architecture Spine, Sagar's Portfolio

Run: 2026-07-06, inline (subagents not spawned per environment guidance; deterministic lint_spine.py unavailable — Python absent — so mechanical checks done by hand). Reviewer notes this is a self-review, less independent than a fresh-context subagent.

**Gate verdict: PASS with fixes applied.** No critical holes; two genuine cross-unit seams found and closed by tightening ADs; version lens closed by web-verifying the two remaining libs.

## Lens 0 — Deterministic (mechanical)
- AD IDs AD-1..AD-12 unique; no reuse. ✓
- Every AD carries Binds / Prevents / Rule. ✓
- No `{placeholder}` tokens or empty mermaid graphs; three diagrams valid. ✓
- Unpinned stack rows: `jsonwebtoken`/`express-rate-limit` = "current", `shadcn/ui` = "current CLI", `LLM SDK` = "provider TBD". ACCEPTED — shadcn is vendored (copy-in, not a versioned runtime dep), jwt/rate-limit pinned at scaffold, LLM provider intentionally deferred (D-6). Low.

## Lens 1 — Version / reality check (finalize_reviewers #1)
- Web-verified this session: Next.js 16.2.x, React 19.2, TanStack Query 5.101.x, RHF 7.81.x, Zod 4.4.x, Motion 12.42.x, R3F 9.6.x, Express 5.2.x, Mongoose 9.7.x. ✓
- Gap found + closed: Tailwind v4 + shadcn/ui + Next 16 + React 19 compatibility — **verified supported** (shadcn CLI initializes Tailwind v4 / React 19 projects; components updated, forwardRef removed for React 19). ✓
- Gap found + closed: Node LTS — **Node 24 is Active LTS** (July 2026); 22 in maintenance. FIX: stack pin changed from ">=22 LTS" to "24 LTS (Active)". ✓
- Stack is internally coherent on React 19.2 — all React-coupled libs confirm 19 support. ✓

## Lens 2 — Adversarial (finalize_reviewers #2): two units obeying every AD yet diverging
- **[HIGH — FIXED] Slug collision.** AD-4 declared `slug` unique but named no enforcer. Admin "create project" and any seed/import could both mint slug `portfolio`; both obey AD-4 yet the route `/projects/[slug]` becomes ambiguous. FIX: AD-4 now requires the backend to enforce uniqueness (unique index) and reject or auto-derive on collision.
- **[HIGH — FIXED] Stale static pages.** AD-5 said project pages are static, "revalidated when admin mutates," but the mutation happens on the Render backend while the static pages live on Vercel — no unit owned the revalidation trigger. An admin-form builder and a backend builder each obey AD-5 yet edits never surface until redeploy. FIX: AD-5 now names the owner — the backend triggers Next.js on-demand revalidation after a successful mutation, with a time-based `revalidate` fallback.
- **[MEDIUM — FIXED] Weather key placement.** AD-5 routes the weather widget as a client-side React Query fetch, which is safe only if the weather API is keyless. If a keyed provider is chosen, the client fetch would leak the key (violating AD-7). FIX: AD-5 note added — weather source must be keyless for client fetch; a keyed provider must be proxied through the backend.
- **[MEDIUM — FIXED] shared/ module-format seam.** AD-12 fixes the type contract but deferred the mechanism; a raw-TS `shared/` consumed by both the Next build and an Express/tsc build can fail to compile if module formats (ESM/CJS) mismatch. FIX: Deferred note strengthened — `shared/` must be plain TS with no runtime deps, compiled by both build systems (or emitted dual-format); decided at scaffold.
- **[LOW — noted] View double-count** (React strict-mode / SSR re-render) and **CORS preview origins** (Vercel per-PR URLs vs single origin in AD-8) — implementation-level, left to code.

## Rubric walker — good-spine checklist
- Fixes the real divergence points, misses none → PASS after the two HIGH fixes above.
- Every AD Rule enforceable & prevents its divergence → PASS (AD-4/AD-5 tightened).
- Nothing under Deferred lets two units diverge → PASS (shared/ note strengthened).
- Named tech verified-current → PASS (all rows web-checked or intentionally deferred).
- Spec capabilities covered → PASS (all 16 FRs mapped in Capability→Architecture Map).
- Brownfield ratification / inherited-parent conflicts → N/A (greenfield, no parent spine).
- Operational envelope present → PASS (hosting/config/CORS table).
