# Addendum — Sagar's Portfolio PRD

Depth that supports the PRD but belongs downstream (architecture / UX / build). The PRD stays capability-focused; the how lives here.

## A. Stack & skills traceability (why this architecture)

The portfolio's secondary purpose is proving the training checklist. Each item maps to a feature so nothing on the list goes undemonstrated:

| Checklist skill | Proven by |
|---|---|
| Next.js nested + dynamic routes | FR-5.2 `/projects/[slug]` |
| Route groups | FR-12 `(site)` vs `(admin)` |
| Layouts | Root layout (nav/footer) + admin layout |
| React Query `useQuery` | FR-5.3 project/experience data; FR-13b weather (external API) |
| React Query `useMutation` | FR-6 contact submit; FR-14 AI draft; FR-12 admin CRUD |
| React Hook Form + Zod | FR-6 contact form; FR-12 add/edit project form |
| ShadCN UI | Cards, dialogs, forms, toasts, admin table |
| TypeScript (annotations, arrays/objects, functions, type alias, intersection, interfaces, enums) | Shared domain types (`Project`, `Experience`, `Message`); category enum; intersection types on API responses |
| Express routing + middleware | FR-10 logger, Zod validation, error handler, AI rate limiter |
| MongoDB + Mongoose CRUD | FR-11 projects / experiences / messages |
| Stretch (beyond checklist) | Framer Motion (FR-8), React Three Fiber (FR-9), LLM integration (FR-14) |

## B. Options considered

- **Product form:** standalone weather app (rejected — generic, not about Sagar) and static showcase (rejected — cannot demonstrate backend/mutations/Mongo). Full-stack portfolio chosen; the weather idea survives as the hero widget (FR-13b).
- **Visitor counter (OQ-1):** (a) public counter — simplest social proof but low early counts backfire; (b) admin-only analytics — safe, no client-facing proof; (c) threshold-gated public counter — hidden until a floor is passed. Recommendation: (c).
- **Hosting:** Frontend on Vercel (Git-connected). API on Render or Railway (OQ-3). DB on MongoDB Atlas free M0. GitHub Pages rejected — cannot host the Express API or SSR app.
- **Repo layout (OQ-2):** monorepo recommended for a simpler showcase; two-repo alternative viable.
- **Admin auth (OQ-5):** env-var credentials + session cookie (simplest) vs JWT. Auth is not on the checklist, so simplest-that-works is preferred.

## C. Environment variables (derived)

| Variable | Location | Source |
|---|---|---|
| `MONGODB_URI` | backend | MongoDB Atlas |
| `PORT` | backend | default 5000 |
| `ADMIN_USER` / `ADMIN_PASSWORD` (or `JWT_SECRET`) | backend | Sagar picks |
| `LLM_API_KEY` | backend only (never client) | LLM provider |
| `CORS_ORIGIN` | backend | frontend URL |
| `NEXT_PUBLIC_API_URL` | frontend | backend URL |
| `SMTP_*` or `RESEND_API_KEY` | backend | only if email notifications chosen (OQ-4) |

## D. Quality bar carried from the reference blueprint

SEO head + JSON-LD (FR-15); optimized WebP screenshots, own screenshots not hotlinks (FR-5); custom 404 / robots / sitemap / favicon / manifest (FR-16); accessibility incl. reduced-motion (NFR-2); Lighthouse ≥ 90 (NFR-1). These are the concrete fixes for the weaknesses audited in `PORTFOLIO_BLUEPRINT.md` §1.8.
