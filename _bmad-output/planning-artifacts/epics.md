---
stepsCompleted: ["step-01-validate-prerequisites", "step-02-design-epics", "step-03-create-stories", "step-04-final-validation"]
status: complete
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-sagars-portfolio-2026-07-06/prd.md
  - _bmad-output/planning-artifacts/prds/prd-sagars-portfolio-2026-07-06/addendum.md
  - _bmad-output/planning-artifacts/architecture/architecture-sagars-portfolio-2026-07-06/ARCHITECTURE-SPINE.md
  - _bmad-output/planning-artifacts/portfolio-analysis-and-required-inputs.md
  - PORTFOLIO_BLUEPRINT.md
---

# Sagar's Portfolio - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Sagar's Portfolio, decomposing the requirements from the PRD and Architecture spine into implementable stories. No formal UX spec exists; visual direction is inherited informally from PORTFOLIO_BLUEPRINT.md.

## Requirements Inventory

### Functional Requirements

FR-1: Hero section — pretitle, large serif headline resolving "I am Sagar, a [title] based in [location]", social links, scroll cue; hosts the weather widget (FR-13b) and 3D scene (FR-9).
FR-2: About section — photo (retina/2x), 3–4 sentence bio, Download CV button serving a PDF from the app.
FR-3: Skills / Expertise — 6–8 items as a big-type list with animated reveal.
FR-4: Experience & Education — twin timelines; each entry has org, role/degree, dates, 2–3 impact lines; scroll-triggered reveal.
FR-5: Projects — (5.1) list page with cards (screenshot, category, title); (5.2) detail via dynamic route /projects/[slug] with description, tech-tag pills, prominent live-demo link and GitHub link; (5.3) project data served from MongoDB via the API, not hardcoded.
FR-6: Contact — RHF + Zod validated form; submits via mutation to the API; message persisted in MongoDB; email + social links shown; includes AI draft assist (FR-14); contact CTA weighted equal to CV download.
FR-7: Footer — copyright, back-to-top, social links.
FR-8: Animation system — Motion (Framer Motion) across the site: staggered reveals, route transitions, hover micro-interactions, hero text animation; honors prefers-reduced-motion.
FR-9: 3D hero scene — one React Three Fiber scene (cursor-reactive particle field); lazy-loaded/code-split after first paint; static fallback on low-power devices and under reduced-motion.
FR-10: Backend REST API — Express service exposing project/experience/message endpoints with middleware: request logging, JSON parsing, Zod validation, central error handler; CORS restricted to the frontend origin.
FR-11: Data models — Mongoose models for projects, experiences, messages supporting create/read/update/delete.
FR-12: Admin area — (admin) route group with its own layout, protected by a credential check; CRUD for projects (optionally experience) via ShadCN forms + mutations; read/delete view for contact messages.
FR-13: Trust & liveness signals — (13a) visitor/view tracking persisted in the backend, public display threshold-gated; (13b) live weather widget in the hero using a keyless weather API; (13c) prominent real social links / reach.
FR-14: AI contact-draft assist — visitor enters rough intent, triggers "✨ Draft with AI"; a backend route proxies an LLM to return a polished editable message; key server-side only; per-IP rate limiting + token cap.
FR-15: SEO — complete head block (title, meta description, author, canonical), Open Graph + Twitter card tags with a share image, JSON-LD Person schema.
FR-16: Site hygiene — custom 404 page, robots.txt, sitemap.xml, full favicon set, filled-in web manifest.

### NonFunctional Requirements

NFR-1: Performance — Lighthouse ≥ 90 across all categories; 3D and heavy JS code-split/deferred; images optimized (WebP, sized) and lazy-loaded below the hero. (Merge gate per AD-10.)
NFR-2: Accessibility — single h1, logical heading order, sufficient contrast, visible focus states, meaningful alt text, aria-label on icon-only controls, prefers-reduced-motion respected.
NFR-3: Responsive — mobile-first; verified on phone, tablet, desktop; 3D degrades to static on low-power/mobile.
NFR-4: Security — all secrets (DB URI, LLM key, admin creds) server-side only, never in repo or client bundle; AI route rate-limited; admin authenticated; all inbound data Zod-validated.
NFR-5: Stack constraint (skills demonstration) — Frontend: Next.js App Router, TypeScript, ShadCN, React Query, RHF+Zod. Backend: Express + Mongoose. First-class requirement.
NFR-6: Analytics — lightweight privacy-friendly analytics for real traffic insight (distinct from the public social-proof counter in FR-13a).

### Additional Requirements

*(From the Architecture spine — AD references in parentheses.)*

- **Greenfield scaffold (Epic 1, Story 1):** monorepo with `frontend/` (Next.js 16.2 App Router, React 19.2, TypeScript, Tailwind v4, shadcn/ui), `backend/` (Express 5.2 layered: routes → controllers → services → models), and `shared/` (canonical TS types + Zod schemas + enums). No off-the-shelf multi-package starter mandated; `create-next-app` for the frontend, hand-scaffolded Express for the backend. (AD-1)
- Backend is the sole owner of MongoDB; frontend does all reads/writes via the REST API over HTTP only. (AD-2)
- One API response envelope: success `{data}`, error `{error:{message,code}}`, meaningful HTTP status; central Express error handler. (AD-3)
- Domain entities exactly: Project, Experience, Message, View. Project carries a unique kebab-case `slug` as the public route param; backend enforces slug uniqueness (unique index; reject/auto-derive on collision). (AD-4)
- Public read content via Next.js SSG/ISR (generateStaticParams); backend triggers Next on-demand revalidation after a successful admin mutation (+ time-based fallback); interactive data via React Query. (AD-5)
- Every inbound payload Zod-validated at the route boundary; the same Zod schemas (in `shared/`) back the RHF forms. (AD-6)
- Secrets server-side only; only non-secret frontend config uses NEXT_PUBLIC_*. (AD-7)
- Admin auth: backend-issued signed JWT in httpOnly+Secure+SameSite cookie; auth middleware gates admin routes; CORS with credentials for the single frontend origin. (AD-8)
- AI LLM call lives only on the Express backend (POST /api/ai/draft); per-IP rate-limit + token cap. (AD-9)
- Performance budget enforceable: dynamic-import the 3D hero + heavy libs after first paint; static fallback; next/image WebP lazy; Lighthouse ≥ 90 merge gate. (AD-10)
- Visitor counter: view increments via backend endpoint; public display threshold-gated (hidden until floor N). (AD-11)
- Shared TS contract: one source in `shared/`, plain TS with no runtime deps, compiles under both the Next and Express/tsc builds (dual ESM/CJS if formats differ). (AD-12)
- Deployment: frontend on Vercel (Git-connected), backend on Render, database on MongoDB Atlas free M0; local `.env` → host-dashboard env in production.
- Verified stack pins (July 2026): Node 24 LTS, Next 16.2.x, React 19.2, TypeScript 5.x, Tailwind 4.x, shadcn/ui current, @tanstack/react-query 5.101.x, react-hook-form 7.81.x, zod 4.4.x, motion 12.42.x, three + @react-three/fiber 9.6.x, Express 5.2.x, Mongoose 9.7.x, jsonwebtoken + express-rate-limit current.
- Conventions: entities PascalCase singular; collections lowercase plural; API routes kebab plural; dates ISO 8601 on the wire; component files PascalCase, else kebab-case; server state only via React Query.

### UX Design Requirements

*(No formal UX spec was produced. The following design direction is derived from PORTFOLIO_BLUEPRINT.md and is actionable enough to drive stories. Labelled UX-DR to keep them first-class.)*

UX-DR1: Design-token foundation — dark theme (near-black background), one warm accent color, a light-gray text scale, plus spacing and type scales, expressed as Tailwind/CSS tokens so a re-theme is a small edit.
UX-DR2: Typography — a big serif display face for headlines paired with a clean sans for body/UI.
UX-DR3: Signature motif — the concentric-circles ornament (candidate to reinterpret in the 3D hero), kept cheap and distinctive.
UX-DR4: Scroll-reveal interaction pattern — sections/elements fade-and-rise into view as they enter the viewport, staggered; one consistent mechanism site-wide.
UX-DR5: Project card pattern — responsive grid, hover lift + image zoom, hover-revealed action button (always visible on touch); detail opens a modal/expanded view with tech-tag pills.
UX-DR6: Reduced-motion + responsive behavior — every animation and the 3D scene degrade gracefully under prefers-reduced-motion and on small/low-power devices.

### FR Coverage Map

FR-1 Hero: Epic 1 — first visible live slice
FR-2 About (+CV): Epic 2 — narrative sections
FR-3 Skills: Epic 2 — narrative sections
FR-4 Experience/Education: Epic 2 — DB-driven timeline
FR-5 Projects: Epic 3 — public projects showcase (DB read, dynamic route)
FR-6 Contact: Epic 4 — engagement & trust
FR-7 Footer: Epic 1 — base layout
FR-8 Animation system: Epic 1 (baseline) + Epic 6 (polish)
FR-9 3D hero: Epic 6 — signature experience
FR-10 Backend REST API + middleware: Epic 1 (foundation: app, middleware, health) — extended per entity in Epics 2/3/4
FR-11 Data models (Mongoose CRUD): Epic 2 (Experience), Epic 3 (Project), Epic 4 (Message, View)
FR-12 Admin area: Epic 5 — content management
FR-13 Trust & liveness (weather, counter, socials): Epic 4 (public) + Epic 5 (admin stats/display)
FR-14 AI draft assist: Epic 4 — engagement & trust
FR-15 SEO: Epic 1 (base head shell) + Epic 6 (full OG / JSON-LD / share image)
FR-16 Site hygiene (404/robots/sitemap/favicon/manifest): Epic 6 (base shell seeded in Epic 1)
NFR-1 Performance (Lighthouse ≥90 gate): Epic 6 — verified across all epics
NFR-2 Accessibility: Epic 6 — applied throughout
NFR-3 Responsive: all epics — verified in Epic 6
NFR-4 Security (auth, rate-limit, validation): Epics 4 & 5
NFR-5 Stack constraint: Epic 1 — established at scaffold
NFR-6 Analytics: Epic 6

## Epic List

### Epic 1: Foundation & Live Landing
Stand up the monorepo (frontend/ + backend/ + shared/), wire the deploy pipeline (Vercel + Render + MongoDB Atlas), establish the design-token system and base layout, and ship a real public URL that renders the branded Hero and Footer with the baseline animation pattern. Delivers a live, on-brand landing page and the platform every later epic builds on.
**FRs covered:** FR-1, FR-7, FR-8 (baseline), FR-10 (foundation), FR-15/FR-16 (base shell), NFR-5; UX-DR1, UX-DR2, UX-DR4.

### Epic 2: Narrative Sections (About, Skills, Experience)
Build the storytelling scroll below the hero: the About block with a Download-CV button, the big-type Skills list, and the twin Experience/Education timelines. Experience is served from MongoDB (first backend entity end-to-end); About and Skills are content-configured. Delivers the "who is Sagar" story that Priya (recruiter) reads.
**FRs covered:** FR-2, FR-3, FR-4, FR-11 (Experience), FR-8 (reveals); UX-DR4.

### Epic 3: Projects Showcase
The centerpiece for all three audiences: a DB-driven projects list and per-project detail pages at /projects/[slug] (SSG/ISR), each with screenshot, category, tech-tag pills, and prominent live-demo + GitHub links. Seeded with real project data via a seed script until admin CRUD lands in Epic 5. Delivers the proof-of-work that Arjun (developer) and Meera (client) came to see.
**FRs covered:** FR-5, FR-11 (Project, read side); UX-DR5.

### Epic 4: Engagement & Trust
Let visitors reach out and feel the site is alive: the RHF+Zod contact form persisting messages to MongoDB, the ✨ AI draft-message assist (backend LLM proxy, rate-limited), the keyless weather widget, prominent social links, and the visitor/view counter (threshold-gated). Delivers Meera's trust signals and the low-friction contact that converts all three audiences.
**FRs covered:** FR-6, FR-13, FR-14, FR-11 (Message, View); NFR-4 (validation, rate-limit).

### Epic 5: Admin & Content Management
Give Sagar a secure back office: JWT-cookie login, the (admin) route group and layout, CRUD for projects and experience (ShadCN forms + React Query mutations), a contact-messages inbox (read/delete), and the visitor-stats view. On a successful mutation it triggers frontend revalidation. Delivers owner control so content is poured in through the UI, not code.
**FRs covered:** FR-12, FR-11 (write side), FR-13a (admin stats); NFR-4 (auth), AD-5 (revalidation), AD-8.

### Epic 6: Signature Experience & Launch Polish
Make it boom and make it ship-ready: the lazy-loaded React Three Fiber 3D hero with static/reduced-motion fallback, the full animation polish pass, complete SEO (Open Graph, Twitter card, JSON-LD Person, share image), site hygiene (custom 404, robots, sitemap, favicon set, web manifest), the accessibility pass, analytics, and enforcing the Lighthouse ≥ 90 gate. Delivers the wow-factor and the professional-grade quality bar.
**FRs covered:** FR-9, FR-8 (polish), FR-15 (full), FR-16, NFR-1, NFR-2, NFR-3 (verify), NFR-6; UX-DR3, UX-DR6, AD-10.

---

## Epic 1: Foundation & Live Landing

Stand up the monorepo and deploy pipeline, establish the design system and base layout, and ship a live public URL rendering the branded hero and footer.

### Story 1.1: Scaffold the monorepo and shared contract

As Sagar (the developer),
I want a working monorepo with `frontend/`, `backend/`, and `shared/` set up,
So that I have a runnable foundation to build every feature on.

**Acceptance Criteria:**

**Given** an empty repository
**When** I initialize the project
**Then** `frontend/` contains a Next.js 16 App Router app (TypeScript, Tailwind v4, shadcn/ui initialized)
**And** `backend/` contains an Express 5 skeleton in the layered shape `routes / controllers / services / models / middleware / config`
**And** `shared/` is a dependency-free TypeScript module exporting the API envelope type and an (initially empty) schema/enum barrel, importable by both sides
**And** root `.gitignore`, `.env.example`, and README exist, and both apps start locally with a documented command.

### Story 1.2: Backend health endpoint, database connection, and core middleware

As Sagar (the developer),
I want the Express API to boot with core middleware, connect to MongoDB, and expose a health check,
So that the backend is verifiably alive and ready for feature endpoints.

**Acceptance Criteria:**

**Given** the backend scaffold from Story 1.1
**When** the server starts with a valid `MONGODB_URI`
**Then** it connects to MongoDB Atlas and logs a successful connection
**And** request-logging, JSON-parsing, and a central error-handler middleware are registered
**And** `GET /api/health` returns `{ "data": { "status": "ok" } }` with HTTP 200 in the standard envelope
**When** an internal error is thrown in any handler
**Then** the central error handler returns the `{ "error": { "message", "code" } }` envelope with an appropriate status.

### Story 1.3: Design-token system and base layout shell

As a visitor,
I want the site to have a consistent, on-brand dark theme with clear navigation and footer,
So that the portfolio feels intentional and easy to move around.

**Acceptance Criteria:**

**Given** the frontend scaffold
**When** the design system is defined
**Then** Tailwind theme tokens exist for the dark background, one warm accent, a gray text scale, and spacing/type scales (UX-DR1)
**And** a serif display font and a sans body font are wired via `next/font` (UX-DR2)
**And** the root layout renders a responsive header nav and a footer with copyright, social links, and a back-to-top control (FR-7)
**And** the layout passes at mobile, tablet, and desktop widths without horizontal overflow.

### Story 1.4: Hero section with content and baseline animation

As Priya (a recruiter),
I want an instant, clear headline of who Sagar is the moment the page loads,
So that I can judge fit in seconds.

**Acceptance Criteria:**

**Given** the base layout
**When** the home page loads
**Then** the hero shows a pretitle, a large serif headline resolving "I am Sagar, a {title} based in {location}" from a content config, social links, and a scroll cue (FR-1)
**And** hero elements animate in with a staggered Motion reveal (FR-8 baseline)
**When** the OS requests reduced motion
**Then** animations are disabled and content appears immediately (NFR-2).

### Story 1.5: Deploy pipeline live with base SEO and wired API

As Sagar,
I want the site deployed to a real URL with the frontend talking to the backend,
So that there is a live, shareable foundation from day one.

**Acceptance Criteria:**

**Given** the frontend and backend build successfully
**When** I deploy
**Then** the frontend is live on Vercel and the backend on Render, with the database on MongoDB Atlas
**And** `NEXT_PUBLIC_API_URL` and backend `CORS_ORIGIN` are configured so the deployed frontend successfully calls `GET /api/health`
**And** the document head carries a base title, meta description, and canonical URL (FR-15 base)
**And** no secret value appears in the client bundle (NFR-4, AD-7).

## Epic 2: Narrative Sections (About, Skills, Experience)

Build the storytelling scroll: About with CV download, the Skills list, and the DB-driven Experience/Education timelines.

### Story 2.1: About section with CV download

As Priya (a recruiter),
I want a concise bio and a one-click CV download,
So that I can quickly understand Sagar and take his resume with me.

**Acceptance Criteria:**

**Given** the home page
**When** I scroll to the About section
**Then** it shows a photo (with a 2x retina source), a 3–4 sentence bio from content config, and a "Download CV" button (FR-2)
**When** I click "Download CV"
**Then** a PDF served by the app downloads (not a third-party drive link)
**And** the section reveals on scroll and respects reduced motion.

### Story 2.2: Skills / Expertise big-type list

As Arjun (a developer),
I want to see Sagar's core skills at a glance,
So that I can gauge his technical range immediately.

**Acceptance Criteria:**

**Given** the home page
**When** I scroll to the Skills section
**Then** 6–8 skills from content config render as a large-type list (FR-3)
**And** items reveal with a staggered animation that respects reduced motion (UX-DR4).

### Story 2.3: Experience data model and read API

As Sagar (the developer),
I want experience and education entries stored in MongoDB and served by the API,
So that the timeline is data-driven and later editable in the admin panel.

**Acceptance Criteria:**

**Given** the backend
**When** the Experience model is added
**Then** a Mongoose `Experience` schema exists with fields `{ org, role, kind (enum: work|education), startDate, endDate, order, description }` and a matching Zod schema + `kind` enum live in `shared/` (FR-11, AD-6, AD-12)
**And** `GET /api/experiences` returns entries ordered for display in the standard envelope (FR-4, AD-3)
**And** a seed script inserts sample entries so the endpoint returns data.

### Story 2.4: Experience and Education timelines UI

As Priya (a recruiter),
I want to see Sagar's work history and education as clear timelines,
So that I can assess his background.

**Acceptance Criteria:**

**Given** experience data available from the API
**When** the home page renders
**Then** twin timelines (Experience, Education) are server-rendered from `GET /api/experiences`, each entry showing org, role/degree, dates, and 2–3 impact lines (FR-4, AD-5)
**And** entries reveal on scroll and the layout is responsive
**And** public read content is present in the initial HTML (not client-fetched) (AD-5, NFR-1).

## Epic 3: Projects Showcase

DB-driven projects list and per-project detail pages — the centerpiece for all three audiences.

### Story 3.1: Project data model, read API, and seed

As Sagar (the developer),
I want projects stored in MongoDB with unique slugs and served by the API,
So that the showcase is data-driven and routable by slug.

**Acceptance Criteria:**

**Given** the backend
**When** the Project model is added
**Then** a Mongoose `Project` schema exists with `{ slug, title, category (enum), summary, description, techTags[], coverImage, liveUrl, githubUrl, screenshots[], order }`, a matching Zod schema + category enum in `shared/`, and a unique index on `slug` (FR-11, AD-4, AD-12)
**And** `GET /api/projects` returns a list and `GET /api/projects/:slug` returns one project (or a 404 envelope) (AD-3)
**When** two projects would resolve to the same slug
**Then** the backend rejects or auto-derives a distinct slug (AD-4)
**And** a seed script inserts several real sample projects.

### Story 3.2: Projects list page

As Meera (a client),
I want to browse Sagar's projects as visual cards,
So that I can see the kind of work he produces.

**Acceptance Criteria:**

**Given** project data from the API
**When** I visit the projects list
**Then** projects render as a responsive card grid (cover image, category, title) built via SSG/ISR from `GET /api/projects` (FR-5.1, AD-5)
**And** cards lift and the image zooms on hover, with the action affordance always visible on touch devices (UX-DR5)
**And** the grid reflows cleanly on mobile.

### Story 3.3: Project detail dynamic route

As Arjun (a developer) and Meera (a client),
I want a dedicated page per project with details and links,
So that I can inspect the work and open the live demo or code.

**Acceptance Criteria:**

**Given** projects available from the API
**When** I open `/projects/[slug]`
**Then** the page is statically generated via `generateStaticParams` and shows description, tech-tag pills, and prominent live-demo and GitHub links (FR-5.2, AD-4)
**When** I request a slug that does not exist
**Then** the custom not-found response is shown
**And** the detail content is in the initial HTML for SEO (AD-5).

## Epic 4: Engagement & Trust

Contact, AI draft assist, weather widget, socials, and the visitor counter.

### Story 4.1: Message model and validated contact API

As Sagar (the developer),
I want contact submissions validated and stored in MongoDB,
So that no visitor message is lost and bad input is rejected.

**Acceptance Criteria:**

**Given** the backend
**When** the Message model and endpoint are added
**Then** a Mongoose `Message` schema `{ name, email, body, createdAt }` exists with a matching Zod schema in `shared/` (FR-11, AD-12)
**When** `POST /api/messages` receives a payload
**Then** Zod validation middleware runs before persistence and rejects invalid input with the error envelope (AD-6, AD-3)
**And** a valid message is stored and a success envelope returned.

### Story 4.2: Contact form UI with React Query mutation

As Meera (a client),
I want an easy, validated way to send Sagar a message,
So that I can start a conversation without friction.

**Acceptance Criteria:**

**Given** the contact section
**When** I fill and submit the form
**Then** the form uses React Hook Form with the shared Zod resolver and submits via a React Query `useMutation` to `POST /api/messages` (FR-6, AD-6)
**And** success and error states are shown via toasts, and email + social links are displayed with the contact CTA weighted equal to the CV download (FR-6, FR-13c)
**And** inline validation errors appear before submission is allowed.

### Story 4.3: AI draft-message assist

As Meera (a client) who is unsure how to phrase a request,
I want AI to draft my message from a rough intent,
So that reaching out feels effortless.

**Acceptance Criteria:**

**Given** the contact form
**When** I enter a rough intent and click "✨ Draft with AI"
**Then** a React Query mutation calls `POST /api/ai/draft` on the backend, which proxies the LLM and returns an editable draft into the message field (FR-14, AD-9)
**And** the LLM key stays server-side and the route is protected by per-IP rate limiting and a token cap (NFR-4, AD-9)
**When** the AI call fails or the rate limit is hit
**Then** the form degrades gracefully and the user can still type and send manually.

### Story 4.4: Live weather widget

As Meera (a client),
I want a small live signal that the site is real and current,
So that it feels actively maintained.

**Acceptance Criteria:**

**Given** the hero
**When** the page loads
**Then** a weather widget fetches Sagar's location weather from a keyless API via React Query on the client and shows the current condition (FR-13b, AD-5)
**When** the weather request is loading or fails
**Then** a loading state shows and, on failure, the widget hides gracefully without breaking the hero.

### Story 4.5: Threshold-gated visitor counter

As Meera (a client),
I want to see that others visit Sagar's portfolio,
So that I have social proof he is taken seriously.

**Acceptance Criteria:**

**Given** the backend
**When** a visitor loads a page
**Then** a view is recorded via a backend endpoint backed by a `View` model (FR-13a, AD-11)
**And** the public counter is hidden until the count passes a configured floor `N`, below which counts are visible only in the admin area (AD-11)
**And** repeated rapid loads from the same session are not double-counted in an obvious way.

## Epic 5: Admin & Content Management

Secure back office: login, admin shell, CRUD for projects and experience, messages inbox, and stats.

### Story 5.1: Admin login with JWT cookie

As Sagar (the owner),
I want to log in securely to a back office,
So that only I can manage portfolio content.

**Acceptance Criteria:**

**Given** admin credentials configured as backend env vars
**When** I submit valid credentials to `POST /api/auth/login`
**Then** the backend issues a signed JWT in an `httpOnly; Secure; SameSite` cookie and CORS is configured with credentials for the frontend origin (FR-12, AD-8, NFR-4)
**When** I submit invalid credentials
**Then** login is rejected with the error envelope
**And** a logout action clears the cookie.

### Story 5.2: Admin shell and route protection

As Sagar (the owner),
I want an admin area that only I can reach,
So that management screens are not publicly accessible.

**Acceptance Criteria:**

**Given** the auth from Story 5.1
**When** I navigate to any `(admin)` route without a valid session
**Then** I am redirected to the login page, and admin API routes reject unauthenticated requests via auth middleware (FR-12, AD-8)
**When** I am authenticated
**Then** the admin layout renders with navigation to Projects, Experience, Messages, and Stats.

### Story 5.3: Projects CRUD in admin

As Sagar (the owner),
I want to create, edit, and delete projects through the UI,
So that I can manage the showcase without touching code.

**Acceptance Criteria:**

**Given** the admin area and the Project model
**When** I create or edit a project via a ShadCN form (RHF + shared Zod resolver)
**Then** a React Query mutation calls the protected `POST`/`PUT` `/api/projects` endpoints and the change persists (FR-12, FR-11 write)
**When** a slug would collide
**Then** the form surfaces the conflict rather than silently overwriting (AD-4)
**When** a create/edit/delete succeeds
**Then** the backend triggers revalidation of the affected public project pages (AD-5).

### Story 5.4: Experience CRUD in admin

As Sagar (the owner),
I want to manage experience and education entries through the UI,
So that my timeline stays current.

**Acceptance Criteria:**

**Given** the admin area and the Experience model
**When** I create, edit, delete, or reorder an entry
**Then** a ShadCN form (RHF + shared Zod) drives protected `POST`/`PUT`/`DELETE` `/api/experiences` mutations and the change persists (FR-12, FR-11 write)
**When** a mutation succeeds
**Then** the public timeline reflects the change after revalidation (AD-5).

### Story 5.5: Messages inbox and visitor stats

As Sagar (the owner),
I want to read/delete contact messages and see visitor counts,
So that I can follow up on leads and track reach.

**Acceptance Criteria:**

**Given** stored messages and view counts
**When** I open the Messages screen
**Then** I can list, read, and delete messages via protected endpoints (FR-12)
**When** I open the Stats screen
**Then** I can see raw visitor counts including values below the public threshold (FR-13a, AD-11).

## Epic 6: Signature Experience & Launch Polish

The 3D hero, animation polish, full SEO, site hygiene, accessibility, and the performance gate.

### Story 6.1: 3D hero scene with graceful fallback

As Priya (a recruiter) and Meera (a client),
I want a striking, memorable hero,
So that the portfolio stands out in the first five seconds.

**Acceptance Criteria:**

**Given** the hero section
**When** the page loads on a capable device
**Then** a cursor-reactive React Three Fiber particle field renders, dynamically imported and mounted after first paint (FR-9, AD-10)
**When** the OS requests reduced motion or the device is low-power / coarse-pointer
**Then** a static fallback image renders instead of the 3D scene (UX-DR6, NFR-3)
**And** the 3D bundle is code-split and does not block first paint (AD-10, NFR-1).

### Story 6.2: Animation polish pass

As any visitor,
I want cohesive, high-quality motion throughout,
So that the site feels expensive and intentional.

**Acceptance Criteria:**

**Given** all sections exist
**When** I navigate and scroll
**Then** route transitions, hover micro-interactions, and a single consistent scroll-reveal pattern apply site-wide (FR-8)
**When** reduced motion is requested
**Then** all such motion is disabled or minimized (UX-DR6, NFR-2).

### Story 6.3: Full SEO and share preview

As Sagar,
I want rich link previews and structured data,
So that sharing the portfolio looks professional and ranks well.

**Acceptance Criteria:**

**Given** the site
**When** a page is crawled or shared
**Then** Open Graph and Twitter-card tags with a share image, a canonical URL, and JSON-LD `Person` schema are present (FR-15)
**And** project detail pages emit per-project Open Graph metadata
**When** I test the URL in a social share inspector
**Then** a correct preview card renders.

### Story 6.4: Site hygiene

As Sagar,
I want the standard production niceties,
So that the site behaves correctly for users and crawlers.

**Acceptance Criteria:**

**Given** the site
**When** I request a nonexistent path
**Then** a custom 404 page renders (FR-16)
**And** `robots.txt`, a `sitemap.xml` that includes project slugs, a full favicon set, and a filled-in web manifest are served.

### Story 6.5: Accessibility and performance gate

As any visitor, including those using assistive technology,
I want the site to be fast and accessible,
So that everyone can use it well.

**Acceptance Criteria:**

**Given** the completed site
**When** I run an accessibility review
**Then** there is a single `h1`, logical heading order, sufficient contrast, visible focus states, meaningful `alt` text, and `aria-label`s on icon-only controls (NFR-2)
**When** I run Lighthouse on key pages
**Then** all four categories score ≥ 90, with regressions from the 3D/animations fixed (NFR-1, AD-10)
**And** lightweight privacy-friendly analytics is installed (NFR-6).
