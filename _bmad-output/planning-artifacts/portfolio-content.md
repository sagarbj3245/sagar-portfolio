# Portfolio Content — Sagar B J

Canonical source of Sagar's real content, provided 2026-07-08. Frontend content config (hero/about/skills, Story 1.4/2.x) and DB seeds (experience → Story 2.3, projects → Story 3.1) are populated from here. **[GAP]** marks what's still needed.

## Identity / Hero (FR-1)

- **Name:** Sagar B J
- **Headline / title:** Associate Full Stack Engineer
- **Specializations:** MERN Stack · Next.js · TypeScript · Real-Time Systems
- **Base location (for "based in ___" + weather widget):** **Bengaluru, India** ✅

## About (FR-2)

> Currently working as an Associate Full Stack Engineer at Byldd, building scalable, high-performance web applications using the MERN stack, Next.js, and TypeScript. Passionate about creating modern user experiences, real-time systems, and robust backend architectures.

- **Profile photo:** ✅ `frontend/public/profile.jpg` (extracted from the profile.pdf Sagar sent — clean portrait, ~1250px square).
- **CV (PDF):** ✅ `frontend/public/Sagar-B-J-Resume.pdf` (serve via the Download-CV button with `download` attr).

## Certificates (held for later — not in v1 scope)

Sagar also sent 3 certificates, stashed at `content-assets/certificates/` for a possible future Certifications section (not in the v1 PRD):
- `swayam-ai-prolog.jpg` — SWAYAM: Artificial Intelligence using Prolog (65%, Dec 2024)
- `swayam-data-structures-c.jpg` — SWAYAM: Data Structure using C (68%, Dec 2024)
- `ncc-a-certificate.jpg` — NCC 'A' Certificate (Naval Unit, Karnataka)
Source photo PDF kept at `content-assets/source/profile-source.pdf`.

## Contact & Socials (FR-6, FR-13c)

- **Personal email:** sagarbj001@gmail.com
- **Work email:** sagar@byldd.com **[confirm which email to show publicly — personal recommended for a portfolio]**
- **WhatsApp / phone:** +91 8277334654
- **Secondary number:** +91 9380983016 **[confirm: publish this and/or the one above? which is primary?]**
- **GitHub:** https://github.com/sagarbj3245
- **LinkedIn:** https://www.linkedin.com/in/sagar-b-j-2855b3319/
- **X / Twitter:** https://x.com/sagar_bj01
- **Instagram:** https://www.instagram.com/sagardrops/

## Skills / Expertise (FR-3)

Confirmed by Sagar 2026-07-08 — the skill set to display:
1. Frontend Development
2. Backend Development
3. AI Integration
4. Prompt Engineering
5. AI Automation
6. Real-Time Systems
*(Underlying stack — MERN · Next.js · TypeScript — surfaces via the projects and experience.)*

## Experience (FR-4 → seed Story 2.3, kind: work)

1. **Associate Full Stack Engineer — Byldd** · Full-time · Remote (New York, United States)
   - Jun 2026 – Present
   - Skills: Node.js, Express.js (+4 more **[GAP — list the +4]**)
2. **Full Stack Engineer Intern — Byldd** · Internship · Remote (New York, United States)
   - Sep 2025 – Mar 2026 (7 mos)
   - Skills: Next.js, React.js (+4 more **[GAP — list the +4]**)

*(Impact/achievement bullets per role: **[GAP]** — 2–3 lines each would strengthen these.)*

## Education (FR-4 → seed Story 2.3, kind: education)

1. **Rajeev Institute of Technology, Hassan** — B.E., Computer Science and Engineering
   - Dec 2021 – Aug 2025 · Grade 8.75 CGPA
   - Foundation in DSA, OOP, DBMS, OS, Computer Networks, Software Engineering. Web tech with Python, Django, Flask, HTML/CSS/JS. Cloud (AWS, IBM Cloud); exposure to AI/ML, Cyber Security, IoT, Mobile. Languages: Python, Java, C. Databases: MySQL, SQLite. Hands-on API development, Git, full-stack apps following SDLC & MVC.
2. **Sujala Pre University College, Hassan** — Pre-University (PCM)
   - Apr 2020 – Apr 2021 · Grade 98.9%

## Projects (FR-5 → seed Story 3.1)

Sagar's decision (updated 2026-07-08): **feature ALL 5**. Deployment "later" — non-live OK for now. Screenshots: place image files in `frontend/public/projects/`.

**Screenshot status:**
- AI-Assistant-Sid — ✅ real: `frontend/public/projects/ai-assistant-sid.png`
- SiteSculptor — ✅ real: `frontend/public/projects/sitesculptor.jpg`
- PokeVault — 🟡 placeholder in place: `frontend/public/projects/pokevault.webp` (Pokédex/Pikachu — web image; swap for real before public launch, IP)
- SeaTalk — 🟡 placeholder in place: `frontend/public/projects/seatalk.webp` (generic chat UI — web image; swap for real screenshot)
- ExpenseTracker — 🟡 placeholder in place: `frontend/public/projects/expensetracker.png` (generic expense UI — web image; swap for real screenshot)

**All 5 project image slots filled** (2 real, 3 web placeholders). Placeholders are third-party images — replace with Sagar's own screenshots before the public launch (Story 3.x), especially the Pokémon one (IP).

### ⭐ 1. PokeVault — Pokédex Search Engine  *(RECOMMENDED — flagship)*
- **GitHub:** https://github.com/sagarbj3245/PokeVault
- **Live:** [GAP — not deployed yet; ready for Vercel + Railway]
- **Tech:** Next.js · Express · TypeScript · shared TS models · LRU cache (TTL) · PokéAPI · MVC
- **Desc:** Full-stack Pokédex — search by name/ID with autocomplete, rich stats/abilities/artwork, smart LRU caching, shared TypeScript models across frontend & backend, responsive. Production-quality (claims Lighthouse 95+).
- *Why featured: mirrors his target stack (Next+Express+TS) and this portfolio's own architecture — strongest signal for developers.*

### ⭐ 2. SeaTalk — Real-Time Chat & Media App  *(RECOMMENDED)*
- **GitHub:** https://github.com/sagarbj3245/SeaTalk
- **Live:** http://65.1.130.180:3000/signup — **NOT live currently**
- **Tech:** Node.js · Express · MySQL · Socket.IO · AWS S3 · JWT · bcrypt · Multer · node-cron
- **Desc:** Real-time messaging — direct + group chat via Socket.IO, media upload to S3, scheduled chat archiving (node-cron), JWT auth, responsive UI.
- *Why featured: showcases "real-time systems," his stated specialization.*

### ⭐ 3. ExpenseTracker  *(RECOMMENDED)*
- **GitHub:** https://github.com/sagarbj3245/ExpenseTracker
- **Live:** http://13.233.15.15:3000/ (AWS EC2; railway deploy failing)
- **Tech:** Node.js · Express · MySQL/Sequelize · JWT · bcrypt · Cashfree (payments) · Brevo (email) · AWS EC2/S3/IAM/RDS · Bootstrap · MVC
- **Desc:** Expense manager — auth, add/view/delete expenses, premium membership via Cashfree payment gateway, leaderboard & reports, password reset via Brevo email. Modular MVC.
- *Why featured: breadth — real payment + email + cloud integrations.*

### 4. AI-Assistant-Sid  *(alternative — LIVE)*
- **GitHub:** https://github.com/sagarbj3245/AI-Assistant-Sid · **Live:** https://ai-assistant-sid-927s.vercel.app/ ✅
- **Tech:** React · CSS · Google Gemini API
- **Desc:** Gemini-powered AI chatbot with conversational UI and simulated typing effect.

### 5. SiteSculptor  *(alternative — LIVE)*
- **GitHub:** https://github.com/sagarbj3245/SiteSculptor · **Live:** https://site-sculptor-etfb.vercel.app/ ✅
- **Tech:** [GAP — description/tech not provided]
- **Desc:** [GAP]

**Decision (final):** all 5 featured. Ordering suggestion (flagship first): PokeVault → SeaTalk → ExpenseTracker → AI-Assistant-Sid → SiteSculptor. SiteSculptor tech/description still **[GAP]** (Sagar to supply).

## Accounts / credentials still needed (deploy — Story 1.5+)

- GitHub repo (username: sagarbj3245) · Vercel account · Render account **[GAP]**
- Admin username + password you choose (Story 5.1) **[GAP]**
- LLM API key for AI assist (Story 4.3) **[GAP]**
