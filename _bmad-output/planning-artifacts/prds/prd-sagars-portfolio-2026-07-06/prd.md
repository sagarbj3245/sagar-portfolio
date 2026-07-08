---
title: "PRD — Sagar's Portfolio"
status: ready-for-architecture
created: 2026-07-06
updated: 2026-07-06
---

# PRD — Sagar's Portfolio

## 1. Overview

Sagar's Portfolio is a **full-stack developer portfolio** that serves double duty: it is Sagar's real professional front door (resume, LinkedIn, freelance pitches) **and** a working demonstration of his engineering stack. The portfolio is not a static page — it is a running Next.js + Express + MongoDB application, because for one of its three audiences (fellow developers) *the site itself is the strongest proof of skill*.

The design language, section anatomy, and quality bar are adapted from the reference analysis of `ModhakNatesh.github.io` (see `PORTFOLIO_BLUEPRINT.md`); the architecture is the mandated training stack (see `portfolio-analysis-and-required-inputs.md`). Technical rationale, options considered, and hosting decisions live in `addendum.md`.

## 2. Problem & Goals

**Problem.** Sagar needs a single link that convinces three very different visitors — a time-pressed recruiter, a skeptical senior developer, and a non-technical freelance client — each of whom arrives with a different question. A generic template portfolio answers none of them well.

**Goals.**
1. Convert each of the three audiences toward their "win" action (see §3).
2. Demonstrably exercise the full training-stack checklist through shipped features.
3. Ship a fast, accessible, discoverable site that reads as professional-grade craft.

## 3. Target Users & Journeys

Three named journeys drive every requirement below. The same page does three different jobs.

### UJ-1 — Priya, the recruiter (skimming for hireability)
Priya screens candidates with 40 tabs open. She lands on the **hero** and needs an instant, unambiguous summary of who Sagar is and what he builds. If that reads in seconds, she keeps scrolling. **Project outcomes** and the **creative polish of the animations** hold her attention; the **About section and Sagar's communication style** are the differentiator that tips her from "fine" to "want." **Win: she downloads the CV (primary) or sends a message (secondary).**
*PM note: CV download is a "leaky" win — she leaves with the PDF. Contact must be as frictionless as the CV download so the conversation can stay on Sagar's turf.*

### UJ-2 — Arjun, the developer (auditing technical depth)
Arjun is skeptical by default and immune to pretty animations. He goes straight to the **projects**, asking *"how was this built, and how well?"* He wants the **tech stack per project**, the **decisions**, and clicks through to **GitHub** to read code. He judges **cleanliness and structure**. Crucially, the portfolio itself is a live full-stack app — real frontend calling a real API backed by a database, with an admin panel and an AI feature — so **the medium is the proof**. **Win: he respects the engineering (GitHub star / follow / vouch).**

### UJ-3 — Meera, the freelance client (a trust-and-budget decision)
Meera is a non-technical founder deciding whether to hire Sagar with real money on the line. She can't read code, so she **clicks live project demos** and uses the working thing (live demos matter more to her than GitHub). She reads **creativity** as "he'll make my product look good," and looks for **social proof** — visitor reach, social presence — and **clean, professional work** as reliability signals. **Win: she feels safe enough to reach out.**

## 4. Scope

**In (v1):** Public site (hero, about, skills, experience/education, projects list + detail, contact, footer); animation system + one 3D hero; Express REST API; MongoDB data for projects/experience/messages; admin CRUD area; AI contact-draft assist; visitor tracking; SEO/discoverability + quality bar.

**Out (deferred to phase 2):** "Ask my portfolio" AI chatbot; testimonials; multi-step/dynamic forms; MongoDB aggregation; blog/CMS; i18n; 3D beyond the single hero scene; custom domain.

**Descope-first if timeline slips:** the 3D hero (FR-9) and AI assist (FR-14) are in-scope but the first cuts to protect a shippable v1.

## 5. Functional Requirements

### Feature A — Public Site (the narrative)
- **FR-1 Hero.** Pretitle, large serif headline resolving "I am Sagar, a **[title]** based in **[location]**", social links, scroll cue. Hosts the live weather widget (FR-13b) and the 3D scene (FR-9).
- **FR-2 About.** Photo (retina/2x), 3–4 sentence bio, **Download CV** button serving a PDF from the app (not a third-party drive link).
- **FR-3 Skills / Expertise.** 6–8 items rendered as a big-type list with animated reveal.
- **FR-4 Experience & Education.** Twin timelines; each entry: org, role/degree, dates, 2–3 impact lines; scroll-triggered reveal.
- **FR-5 Projects.**
  - FR-5.1 Projects list page; cards with screenshot, category, title.
  - FR-5.2 Project detail via **dynamic route `/projects/[slug]`**: description, tech-tag pills, **live demo link** (prominent) and **GitHub link**.
  - FR-5.3 Project data served from MongoDB via the API (not hardcoded).
- **FR-6 Contact.** RHF + Zod validated form; submits via a mutation to the API; message persisted in MongoDB; email + social links shown. Includes AI draft assist (FR-14). Contact CTA given equal visual weight to the CV download (per UJ-1 note).
- **FR-7 Footer.** Copyright, back-to-top, social links.

### Feature B — Motion & Experience
- **FR-8 Animation system.** Framer Motion across the site: staggered section reveals, page/route transitions, hover micro-interactions, hero text animation. Must honor `prefers-reduced-motion` (all motion disabled/reduced).
- **FR-9 3D hero scene.** One signature React Three Fiber scene in the hero (e.g. cursor-reactive particle field). Lazy-loaded after first paint, code-split; static image fallback on low-power devices and under reduced-motion. Subject to the performance guardrail (NFR-1).

### Feature C — Data & Admin (the full-stack proof)
- **FR-10 Backend REST API.** Express service exposing project/experience/message endpoints, with middleware: request logging, JSON parsing, Zod validation, and a central error handler. CORS restricted to the frontend origin.
- **FR-11 Data models.** Mongoose models for `projects`, `experiences`, `messages` supporting create/read/update/delete.
- **FR-12 Admin area.** `(admin)` route group with its own layout, protected by a credential check. CRUD for projects (optionally experience) via ShadCN forms + mutations; read/delete view for contact messages.
- **FR-13 Trust & liveness signals.**
  - FR-13a **Visitor/view tracking** persisted in the backend. Display treatment is an open decision (OQ-1): public counter, admin-only analytics, or threshold-gated public counter.
  - FR-13b **Live weather widget** in the hero using a free/keyless weather API for Sagar's location (demonstrates external-API data fetching).
  - FR-13c Prominent, real **social links / reach** as a client trust signal.

### Feature D — AI
- **FR-14 AI contact-draft assist.** In the contact form, the visitor enters a rough intent and triggers "✨ Draft with AI"; a backend route proxies an LLM to return a polished, editable message. Key held server-side only; per-IP rate limiting and a token cap protect cost.

### Feature E — Discoverability & Quality
- **FR-15 SEO.** Complete head block (title, meta description, author, canonical), Open Graph + Twitter card tags with a share image, and JSON-LD `Person` schema.
- **FR-16 Site hygiene.** Custom 404 page, `robots.txt`, `sitemap.xml`, full favicon set, and a filled-in web manifest.

## 6. Non-Functional Requirements

- **NFR-1 Performance.** Lighthouse ≥ 90 across all categories. 3D and heavy JS code-split and deferred; images optimized (WebP, sized) and lazy-loaded below the hero.
- **NFR-2 Accessibility.** Single `<h1>`, logical heading order, sufficient color contrast, visible focus states, meaningful `alt` text, `aria-label` on icon-only controls, `prefers-reduced-motion` respected.
- **NFR-3 Responsive.** Mobile-first; verified on phone, tablet, desktop. 3D degrades to static on low-power/mobile.
- **NFR-4 Security.** All secrets (DB URI, LLM key, admin credentials) server-side in git-ignored env/host config — never in the repo or client bundle. AI route rate-limited; admin area authenticated; all inbound data Zod-validated.
- **NFR-5 Stack constraint (skills demonstration).** Frontend: Next.js App Router, TypeScript, ShadCN, React Query, RHF+Zod. Backend: Express + Mongoose. This constraint is a first-class requirement — the portfolio's secondary purpose is to prove exactly this stack (traceability in `addendum.md`).
- **NFR-6 Analytics.** Lightweight privacy-friendly analytics for real traffic insight (distinct from the public social-proof counter in FR-13a).

## 7. Success Metrics

| Metric | Target | Counter-metric (watch) |
|---|---|---|
| Recruiter conversion | CV downloads + messages per visit trending up | Bounce before scrolling past hero |
| Developer credibility | GitHub click-throughs / follows | Time-on-projects near zero (skimmed, not inspected) |
| Client trust | Contact submissions from non-referral traffic | Contact-form starts abandoned before send |
| Quality bar | Lighthouse ≥ 90 all categories | Performance regressions from 3D/animation |
| Skills coverage | 100% of checklist items exercised by a shipped feature | Features that demo nothing on the checklist |

## 8. Resolved Decisions (provisional defaults — Sagar may override)

Locked to PM recommendations on 2026-07-06 to unblock architecture. Items marked *(taste)* are reversible at no cost and await Sagar's confirmation.

- **D-1 Visitor counter (was OQ-1).** Build view tracking now (FR-13a); public display is **threshold-gated** — the number stays hidden until a floor is passed, so low early counts never show. *(taste — confirm)*
- **D-2 Repo layout (was OQ-2).** **Monorepo** (`frontend/` + `backend/`).
- **D-3 API host (was OQ-3).** **Render** (verify free-tier terms at signup). — Winston to confirm.
- **D-4 Contact notifications (was OQ-4).** **Store-only** in MongoDB for v1; email notification deferred.
- **D-5 Admin auth (was OQ-5).** **Env-var credentials + session cookie** (simplest; auth is not on the checklist). — Winston to confirm.
- **D-6 LLM provider/model (was OQ-6).** Decide at architecture stage with current pricing; **a small/fast model suffices** for message drafting. — Winston to finalize.
- **D-7 3D hero concept (was OQ-7).** **Cursor-reactive particle field** (highest wow-per-effort, degrades gracefully). *(taste — confirm; Sagar may supply a reference hero instead)*

## 9. Phasing

- **v1 (this PRD):** Features A–E as scoped in §4/§5.
- **Phase 2:** "Ask my portfolio" AI chatbot, testimonials, custom domain, richer analytics, additional 3D moments.

---

*Journeys captured with Sagar via coaching, 2026-07-06. Inputs: `PORTFOLIO_BLUEPRINT.md`, `portfolio-analysis-and-required-inputs.md`. Technical rationale in `addendum.md`.*
