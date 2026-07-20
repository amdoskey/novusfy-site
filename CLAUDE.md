# Novusfy — Project Handoff / Context Brief

**Skill:** See `.claude/skills/payload/SKILL.md` for Payload CMS reference
(collections, fields, hooks, access control, queries, adapters, plugins) before
doing any Payload-related work.

**Purpose:** paste or upload this into a new Claude conversation to continue the
Novusfy website project with full context. Written for a Claude that has no
memory of prior sessions.

**Last updated:** July 19, 2026
**Owner:** DDTAJ (based in Erbil, Iraq)
**Repo:** GitHub → `novusfy-site` · **Live:** `novusfy-site.vercel.app`

> ⚠️ **No secrets in this file.** API keys, database strings, and passwords live
> only in the local `.env` (gitignored) and in Vercel's Environment Variables.
> Never paste them into a chat or commit them.

---

## 1. What Novusfy is

A premium business consulting, marketing, digital solutions, and learning
company. Physical offices in **Germany** and **Erbil, Iraq**.

- **Slogan:** *Your Next Begins Now.*
- **Positioning:** helps businesses, startups, and ambitious professionals
  **grow, launch, and reinvent** through strategy, marketing, digital systems,
  and practical learning.
- **Tone:** premium, strategic, modern, international, calm, confident.
  Explicitly **not** startup-hype, not crypto/AI-cliché, not generic agency.

### Brand system (fixed — do not redesign)

| Element | Value |
|---|---|
| Primary blue | `#0106FF` (sole accent) |
| Midnight | `#0A0A0F` (dark sections) |
| Surface | `#FFFFFF` / `#F9F9FF` / `#F0F3FF` |
| Display font | **Nexa Heavy (900)** — headings only |
| Text font | **Plus Jakarta Sans** — body, labels, UI |
| Mono | **JetBrains Mono** — small metadata labels |
| Signature detail | dashed **"stitch" dividers** |
| Card radius | 12–16px · Button radius 8px |

**Why Nexa is display-only:** only two weights exist (Heavy 900 and ExtraLight
200). ExtraLight is unreadable at body sizes, so Plus Jakarta Sans carries all
text. This was a deliberate decision — don't "fix" it.

**Logo:** use `icon-blue.png` / `icon-white.png` (the mark) next to the text
"Novusfy". The `logo-blue.png` / `logo-white.png` files are **full wordmarks** —
pairing them with the text span renders "NOVUSFY Novusfy" (bug already hit once).

---

## 2. Tech stack & architecture

- **Next.js 16.x** (App Router) + **Payload CMS 3.x** (blank template)
- **PostgreSQL** on **Neon**
- **Vercel** hosting (auto-deploys on push to `main`)
- **Resend** for email (transactional + planned marketing)
- **GitHub** for version control
- Fonts self-hosted via `next/font` (Nexa via `next/font/local`, others via
  `next/font/google`)

### Directory structure

```
src/app/(frontend)/     ← the public website (all work happens here)
  page.tsx              ← /
  about/page.tsx        ← /about
  services/page.tsx     ← /services
  learning-hub/page.tsx ← /learning-hub
  contact/page.tsx      ← /contact
  contact/send/route.ts ← contact form email handler
  components/           ← Nav, Footer, HeroCanvas, ContactForm,
                          ScrollReveal, WaitlistForm, SocialLinks,
                          BodyAttributes, Interactions
  fonts.ts · styles.css · routeTheme.ts

src/app/(payload)/      ← Payload admin + API — DO NOT TOUCH

src/collections/        ← Users · Media · CourseCategories · Courses
                          Portfolio · Articles
src/access/index.ts     ← shared access helpers
                          (publishedOrAuthenticated · authenticated)
src/seed/               ← one-off seeding — portfolio.ts (runner)
                          portfolio-data.ts (content) · lexical.ts
                          (Markdown → Lexical converter). Reusable for the
                          next content batch; see §6.
assets/content/         ← source Markdown the seeds were transcribed from
```

**Current Payload collections (verified July 2026):** `Users`, `Media`
(scaffold defaults) + `CourseCategories`, `Courses`, `Portfolio`, `Articles`.
`Portfolio` holds **5 seeded case studies, all drafts**; the rest are empty.

**Localization is ON:** `locales: ['en', 'de']`, `defaultLocale: 'en'`,
`fallback: true`. Localized fields carry EN + DE; `slug` is deliberately **not**
localized (one URL per doc across locales). API takes `?locale=de` — note that
Payload does **not** reject unknown locales, it falls back, so `?locale=fr`
returns 200 rather than an error.

### 🔴 Critical gotchas (learned the hard way)

1. **`/api/*` is owned by Payload's catch-all route.** Custom API routes must
   NOT live at `/api/...` — they collide and break the build. The contact
   handler uses `/contact/send`. Follow this pattern for new endpoints.
2. **The env var is `DATABASE_URL`** (not `DATABASE_URI`). Confirmed by
   `grep -r "DATABASE_UR" src/` → `payload.config.ts` reads
   `process.env.DATABASE_URL`.
3. **`.env` is gitignored** and does not transfer between machines. Recreate it
   manually when cloning to a new computer.
4. **Install with `npm install --legacy-peer-deps`.**
5. **NEVER run `npm audit fix --force`** — it breaks the Payload dependency tree.
   The vulnerability + "allow-scripts" warnings on install are normal; ignore.
6. **1px elements need a zero-threshold IntersectionObserver** (sub-pixel ratios
   round to 0, so stitch dividers never trigger reveals otherwise).
7. **Lenis smooth-scroll was deliberately skipped** — it hijacks the hash anchors
   (`#waitlist`, `/#contact`) the site relies on.
8. **`payload run` silently no-ops on a floating promise.** It exits as soon as
   the module finishes loading, so `main().catch(...)` at the bottom of a script
   dies at the first `await` — **no output, exit code 0**, nothing written. Looks
   exactly like a script that ran and did nothing. Use **top-level `await`**.
9. **`payload run` strips CLI args** — `process.argv` is empty, so
   `npm run payload run script.ts -- --dry` does *not* reach the script. A
   `--dry` guard checked this way silently evaluates false and the script runs
   **live**. Use an env var instead (`SEED_DRY=1 npm run payload run ...`).
   Gotchas 8 + 9 together cost most of a session on July 20, 2026.

---

## 3. What's built (pages & sections)

**Home** — full-viewport canvas particle hero ("The Birth of Next": blooming
core, depth-banded particles, mouse parallax, constellation hairlines, one-time
1.6s intro) → "What kind of next are you building?" (Launch / Grow / Reinvent /
Learn) → "Six ways we move you forward" (6 service pillars) → **The Novusfy
Method** (01 Diagnose · 02 Define · 03 Build · 04 Move) → Learning Hub preview →
Selected Work bento grid → final CTA.

**About** — "The bridge to your next chapter." → Our Story → Mission/Vision →
Brand Philosophy (dark section) → Why Novusfy (4 cells) → Founder → CTA.

**Services** — 6 service cards → How We Work (Discover · Define · Design ·
Deploy · Develop) → CTA.

**Learning Hub** — early-access badge → 6 course categories → 6 featured course
packs → "What's in each pack" → waitlist form *(front-end demo only — no backend
yet)*.

**Contact** — page header → email + socials → contact form → two office cards
(Germany + Erbil) with Call/WhatsApp buttons and embedded Google Maps.

### Design elevation pass (complete, 5 stages, pushed)

Motion foundation (unified easing `--ease-out-expo`, duration scale, staggered
reveals, count-up stats) · Hero signature (depth bands, parallax, constellation,
birth intro, synced glow breathing, exit parallax) · Micro-interactions (magnetic
buttons, sheen sweep, cursor-following card glow, animated nav underlines, stitch
draw-in) · Section craft (ambient glow drift, ghost numerals, `text-wrap:
balance`, seam stitches) · Page-load settle. All respect
`prefers-reduced-motion`. ~165fps, no dependencies added.

**Frontend note:** all five pages above are fully static — none currently read
from Payload. The collections now exist (§2) but nothing is wired to them yet;
connecting pages to Payload is a separate, deliberate task (§6).

---

## 4. Real business details (source of truth)

```
Email:      info@novusfy.com
Website:    novusfy.com

Germany:    Im Staadergarten 12, 78343 Gaienhofen OT Horn, Germany
            +49 179 3412853        (WhatsApp: wa.me/491793412853)

Iraq:       Gulan St, Boulevard, Erbil, Iraq
            +964 750 476 4327      (WhatsApp: wa.me/9647504764327)

Instagram:  https://www.instagram.com/novusfy/
Facebook:   https://www.facebook.com/novusfy/
LinkedIn:   https://www.linkedin.com/company/novusfy
```

⚠️ **Unresolved:** the German legal document from Karwan says **Im Staadergarten
15**, the site uses **12**. Must be confirmed before the Impressum is published —
this address is legally binding.

---

## 5. Settled decisions (do not re-open without new information)

- **Validate before building an LMS.** Courses ship as **downloadable digital
  packs** (video + slides + templates) sold via **Stripe**. No course platform,
  no LMS, no Thinkific — those were evaluated and rejected as premature/costly
  for the validation phase.
- **Vercel for production, not cPanel.** cPanel *can* run Node + Postgres, but
  Next.js + Payload on Passenger is fragile. cPanel keeps email/DNS only.
- **Resend for both transactional and marketing email.** Free tier covers the
  validation phase (~3,000 emails/month, ~1,000 marketing contacts, unlimited
  broadcasts). Chosen over Brevo (300/day cap + branding on free plan),
  MailerLite (small free tier), and n8n (needs hosting + still needs an email
  tool behind it). **Google Workspace is for the inbox, never for bulk sending.**
- **Content scale:** a handful of courses/portfolio items at launch. Owner adds
  courses via `/admin`; code handles structural content.
- **Workflow:** design + specs decided in chat → **Claude Code executes in the
  repo** → owner reviews locally → then pushes. Work in small staged commits.

---

## 6. Current state — what's done vs. open

### ✅ Done
- Next.js + Payload project scaffolded, on GitHub, deploying to Vercel
- Full static site migrated from the original HTML design, pixel-faithful
- Design elevation pass (all 5 stages) merged
- Contact page built; contact form UI + `/contact/send` handler written
- Real contact details, offices, socials, WhatsApp/Call links, maps
- Resend account created, API key generated
- `RESEND_API_KEY` populated in local `.env` *(confirmed July 2026)*
- **Vercel Environment Variables ARE set** (`DATABASE_URL`, `PAYLOAD_SECRET`
  confirmed working — live `/admin` loads and renders Dashboard).
  *(Corrects an earlier version of this doc that said they were empty.)*
- **Admin user exists** and works on both local (`localhost:3000/admin`) and
  live (`novusfy-site.vercel.app/admin`) — both show identical state.
- **Confirmed single shared database.** Local dev and Vercel production point
  at the **same Neon database** — this is a deliberate decision (see below),
  not a bug.
- **Payload schema built (July 19, 2026)** — `CourseCategories`, `Courses`,
  `Portfolio`, `Articles` modeled in `src/collections/`, plus **en/de
  localization** enabled. Schema-only: no frontend wiring, no seed content.
  Neon snapshot was taken before the schema push. Verified: types generate,
  `tsc` clean, production build clean (all 5 pages still static), all four REST
  endpoints 200 while `/api/bogus` 404s. Commits `9ce7e3d` + `0a24bbe`.
- **Portfolio seeded (July 20, 2026)** — 5 case studies created as **drafts**
  via `src/seed/portfolio.ts`, transcribed from
  `assets/content/portfolio-seed-data.md`. Rich text converted from Markdown to
  Lexical nodes (headings / bullet lists / blockquotes / inline bold), verified
  structurally against the source. All share one placeholder Media image
  pending real photography. Draft access control verified at the same time.

### 🗄️ Database strategy — single shared DB (deliberate)

No dev/prod branch split. Local `npm run dev` and the Vercel deployment both
read/write the **same Neon database**. Chosen over a two-branch setup to avoid
sync overhead for a single-owner project at this stage.

**Implication:** local testing (seeding data, creating/deleting test users,
running migrations) writes directly to production. Be deliberate about what
you run locally once real content exists.

**Mitigation:** take a manual Neon snapshot/backup before any bulk
seed/migration work. This was done before the July 19 collections push and
should be repeated before any future schema change. Revisit the dev/prod split
later only if it becomes a real pain point (e.g. multiple people building
against the DB at once).

**Consequence now visible:** `npm run dev` pushes schema straight to the shared
DB, so there are **no migration files** and therefore no reproducible schema
history. Accepted cost of the single-DB choice — but if a second person ever
builds against this DB, revisit both decisions together.

### 🔧 Immediately open (blocking)
1. **Verify `novusfy.com` as a sending domain in Resend** (DNS records).
   Until then email sends from `onboarding@resend.dev` and lands in spam.
   Required before any waitlist/marketing email. Also re-confirm the contact
   form actually delivers email now that `RESEND_API_KEY` is populated.

### 📋 Next build phases (in order)
2. **Finish the content load.** 5 Portfolio case studies are seeded as drafts
   (July 20, 2026) — Erbil Hills, GAV TV, Korek Telecom, DDTAJ, Aral Hope.
   Remaining: **~5 more portfolio entries** and **5 articles**. Re-run the seed
   script with a new data file rather than hand-entering; it is idempotent
   (skips existing slugs) and the Markdown → Lexical converter is already
   written. Every localized field asks for EN **and** DE — the seeded 5 are
   EN-only and fall back.
   - **Owner actions still pending on the seeded 5:** replace the shared gray
     placeholder image (Media id 1) with real photography per entry, then flip
     each from draft to published when happy.
3. **Wire the frontend to Payload** — convert Learning Hub / Selected Work /
   articles from hardcoded markup to server components querying Payload. This
   is what finally kills the placeholder content in §8. Suggested order: start
   with one section end-to-end (Learning Hub is the most list-shaped), confirm
   the pattern, then repeat. Note server components must query with
   `draft: true` + an authenticated context to see unpublished work, or the
   seeded drafts simply won't appear.
4. **Waitlist backend** — handler that (a) saves signup to a Payload
   `waitlist-signups` collection, (b) adds contact to a Resend Audience,
   (c) sends automated welcome email. Use a non-`/api` path.
5. **Stripe purchase + protected download flow** — needs its own focused
   session (webhooks + preventing link sharing). The `Courses.downloadFile`
   field already exists and is ungated; gating it is this phase's job.
6. **Point `novusfy.com` DNS at Vercel** (currently still serving an old
   WordPress site — see §7).

### 🧩 Schema decisions worth knowing (July 19, 2026)

- **Draft-enabled collections do not use Media's `read: () => true`.** That
  would leak unpublished drafts. They use `publishedOrAuthenticated` in
  `src/access/index.ts`, which returns a `{ _status: { equals: 'published' } }`
  query constraint for anonymous requests. ✅ **Verified July 20, 2026** against
  the 5 seeded drafts: anonymous `/api/portfolio` → 0 docs, anonymous
  `?draft=true` → 0 docs (not bypassable via query param), Local API with
  `overrideAccess: false` and no user → 0 docs, privileged query → all 5.
- **`Courses.price` is cleared by a `beforeChange` hook when `accessType` is
  `free`.** `admin.condition` only hides a field in the UI — it does not stop a
  stale value being stored, which would eventually reach Stripe.
- **`Articles.tags` is freeform `text` + `hasMany`, not a `select`.** A select's
  options are a hardcoded enum, so adding a tag would mean a code change and a
  deploy — the exact problem the CMS exists to solve. `Portfolio.
  servicesProvided` *is* a select, because those six service lines are
  genuinely fixed.
- **`Portfolio.results.value` is not localized** (figures like `+312%` read the
  same in every locale); its `label` is localized.
- **Slugs are manual text fields.** Payload's `slugField()` auto-generate helper
  exists in the skill reference if hand-typing them becomes annoying.

### 🐛 Known broken (pre-existing, unrelated to features)

- **`npm run lint` fails outright** — `TypeError: Converting circular structure
  to JSON` inside ESLint's own config loader (`ConfigArrayFactory`), before any
  source file is read. An eslint-config-next / ESLint 9.39 incompatibility.
  Confirmed present at clean `HEAD` with no local changes, so it is **not**
  caused by any recent work. Typecheck (`npx tsc --noEmit`) and
  `npm run build` both pass — use those as the real gate until lint is fixed.

---

## 7. 🇩🇪 German legal compliance (required before going live)

Karwan (the registered company contact in Germany) supplied an audit. **Note: he
reviewed the OLD WordPress site still live at novusfy.com**, so his WordPress-
specific fixes (OMGF, Complianz, fake theme testimonials, demo images from
`bizzen-wp.nayonacademy.com`) do **not** apply to the Next.js site. The legal
requirements do.

**Required:**
- **`/impressum` page** (§5 DDG) — Karwan Jameel, Novusfy, address, phone,
  info@novusfy.com, §18(2) MStV responsibility line, consumer-dispute statement.
  Footer-linked.
- **`/datenschutz` page** (GDPR) — generate with a reputable German tool
  (e-recht24 / activeMind / Dr. Schwenke), but it **must describe the actual
  stack**: **Vercel** (US host), **Neon** (database), **Resend** (US email
  processor), **Google Maps** embeds, and the contact form (data, Art. 6 basis,
  retention). Likely needs DPAs with Vercel and Resend.
- **Footer:** replace the dead `#` "Privacy" link with real Impressum +
  Datenschutz links.
- **Contact form:** add a privacy-consent checkbox linking to `/datenschutz`.

**🔴 Highest-risk item:** the `/contact` page auto-loads **two Google Maps
iframes**, transmitting visitor IPs to Google without consent — a known German
Abmahnung risk. Fix with a **click-to-load placeholder** or consent gate.

**Already compliant:** Google Fonts — `next/font` self-hosts at build time, so no
visitor IP reaches Google. ✅

**Cookie banner:** probably not yet required (no analytics, no tracking cookies),
but becomes required once analytics is added or if maps load without gating.

**Still needed from Karwan:** exact address (12 vs 15) · legal form
(Einzelunternehmen vs UG/GmbH — a UG/GmbH needs Handelsregister, HRB number,
Registergericht, Geschäftsführer in the Impressum) · Kleinunternehmer §19 yes/no
(decides whether a USt-IdNr line appears).

**Later, when selling courses to EU consumers:** AGB (terms),
Widerrufsbelehrung (withdrawal right + digital-download waiver), VAT-inclusive
pricing, and the "button solution" (checkout button must read *zahlungspflichtig
bestellen*).

> Not legal advice. Use a proper generator for the Datenschutzerklärung and have
> Karwan confirm the tax/legal-form questions with a Steuerberater or lawyer.

---

## 8. ⚠️ Placeholder content that must be replaced before launch

The site currently contains **invented demo content** written to fill the layout.
Karwan's audit correctly flags fake stats as *irreführende Werbung* (misleading
advertising — legally risky in Germany). These must go:

- **Fake clients in Selected Work:** "Meridian Clinic Group", "Atlas Logistics",
  "Verda Travel", "Nimbus Retail" — the real replacements (Erbil Hills, GAV TV,
  Korek Telecom, DDTAJ, Aral Hope) are now seeded in `Portfolio` as drafts and
  land on the page once §6 item 3 wires it up.
- **Fake stats:** "+312% qualified reach", "3 locations launched",
  "2.4× repeat bookings", "12+ years of expertise"
- **Wrong currency reference:** About page says *"before spending a **dirham** on
  tactics"* — leftover from an early assumption that the office was in Dubai.
- **Image placeholders** awaiting real photography: hero image slot, About
  team/office image, founder photo, all Work bento tiles.
- **`public/og-image.png`** (1200×630) — social share preview, artwork needed.
  *Still missing, confirmed July 2026.*

Owner has real case studies with photos prepared — swap them in.

---

## 9. Everyday commands

```bash
npm install --legacy-peer-deps   # after cloning or pulling new deps
npm run dev                      # → localhost:3000  ·  /admin for CMS
openssl rand -base64 32          # generate a PAYLOAD_SECRET

git add . && git commit -m "..." && git push   # push → Vercel auto-deploys
```

`.env` shape (values live only locally / in Vercel):

```
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=...
RESEND_API_KEY=re_...
# CONTACT_FROM=Novusfy Website <info@novusfy.com>   ← enable after domain verify
```

---

## 10. How to work with me on this

- Give **design/architecture decisions in chat**; hand **build specs to Claude
  Code** to execute in the repo.
- Prefer **small staged commits**, verified locally before pushing.
- Ask Claude Code to **propose a plan before building** on anything substantial,
  and to **not push** until the owner has reviewed locally.
- Collections are now modeled (§2), so the "keep everything static" rule has
  served its purpose. The frontend is still hardcoded — wire it to Payload
  deliberately, one section at a time (§6 item 4), not in one sweep.
