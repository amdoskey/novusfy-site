# Novusfy — Project Handoff / Context Brief

**Skill:** See `.claude/skills/payload/SKILL.md` for Payload CMS reference
(collections, fields, hooks, access control, queries, adapters, plugins) before
doing any Payload-related work.

**Purpose:** paste or upload this into a new Claude conversation to continue the
Novusfy website project with full context. Written for a Claude that has no
memory of prior sessions.

**Last updated:** July 21, 2026
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
src/app/(frontend)/
  [locale]/             ← EVERY page lives under here (en unprefixed, de = /de)
    layout.tsx          ← root layout: <html lang>, NextIntlClientProvider
    page.tsx            ← /            + /de
    about/page.tsx      ← /about       + /de/about
    services/page.tsx · learning-hub/page.tsx · contact/page.tsx
    work/page.tsx       ← /work  (all published case studies)
    work/[slug]/page.tsx ← /work/erbil-hills etc.
  contact/send/route.ts ← ⚠️ OUTSIDE [locale] on purpose — see gotcha 10
  components/           ← Nav, Footer, HeroCanvas, ContactForm, LocaleSwitcher,
                          MapEmbed (🔴 consent gate — §7), WorkTile,
                          CaseStudyBody, ScrollReveal, WaitlistForm,
                          SocialLinks, BodyAttributes, Interactions
  fonts.ts · styles.css · routeTheme.ts

src/app/(payload)/      ← Payload admin + API — DO NOT TOUCH
src/i18n/               ← routing.ts (locales) · navigation.ts (locale-aware
                          Link/usePathname) · request.ts (message loading)
src/middleware.ts       ← 🔴 locale routing — matcher MUST exclude Payload
messages/               ← en.json · de.json (both real copy, 332 keys each)

src/collections/        ← Users · Media · CourseCategories · Courses
                          Portfolio · Articles
src/access/index.ts     ← shared access helpers
                          (publishedOrAuthenticated · authenticated)
src/lib/portfolio.ts    ← public Portfolio queries (locale-aware)
src/lib/metadata.ts     ← localeAlternates(): hreflang + the /de noindex
src/seed/               ← one-off seeding — portfolio.ts (EN runner)
                          portfolio-de.ts (DE runner) · portfolio-data.ts
                          portfolio-data-de.ts · lexical.ts (Markdown →
                          Lexical converter). Reusable for the next content
                          batch; see §6.
assets/content/         ← source Markdown the seeds were transcribed from
```

**Current Payload collections (verified July 2026):** `Users`, `Media`
(scaffold defaults) + `CourseCategories`, `Courses`, `Portfolio`, `Articles`.
`Portfolio` holds **5 seeded case studies, all drafts**; the rest are empty.

**Frontend localization (next-intl, added July 20, 2026).** Routing is
`localePrefix: 'as-needed'` — English stays unprefixed (`/about`), German lives
at `/de/about`, so every pre-existing English URL still resolves. Static UI copy
comes from `messages/*.json`; CMS content comes from Payload with the active
locale passed through (`getPortfolioBySlug(slug, locale)`).

Copy extraction is **complete**: all six pages plus `ContactForm`, `WaitlistForm`
and `MapEmbed` are keyed — **332 keys across 12 namespaces** (`nav`, `footer`,
`home`, `about`, `services`, `learningHub`, `contact`, `work`, `caseStudy`,
`contactForm`, `waitlistForm`, `serviceLabels`), en/de key parity verified. No
JSX changes are needed to translate anything. Not keyed on purpose: the
`media-ph__tag` photo-placeholder markers on About (deleted when real photos
land, §8) and the contact form's hidden honeypot label.

✅ **German content is live (July 21, 2026).** `messages/de.json` holds a real
first-pass translation (formal *Sie*), and all 5 Portfolio case studies carry
German `title` / `summary` / `content` / result labels, written via
`src/seed/portfolio-de.ts`. **Pending native-speaker review** — three items
flagged for that reviewer:
- `results.value` is **not** localized, so GAV TV's `"5x increase"` still renders
  English on `/de`. Either reword it in `/admin` or localize the field (schema
  change).
- The Services page keeps *Discover · Define · Design · Deploy · Develop* in
  English (the D-alliteration is the device); the homepage method steps *were*
  translated. Deliberate, but a reviewer may want them consistent.
- `about.philosophyQuotePre` was restructured — English ends on the accent word
  "now", which German word order won't allow, so the lead-in ends with an em
  dash to keep `jetzt` last.

🔴 **`/de/*` is still `noindex`** (`localeAlternates()` in `src/lib/metadata.ts`).
That gate is **legal, not linguistic** — translation quality does not lift it.
It comes off only when the Impressum and Datenschutzerklärung exist (§7).

**Translation conventions in use** (keep these if extending): `Learning Hub`,
nav `Home`, and the branded noun `Next` stay untranslated (`Ihr Next beginnt
jetzt.`); `Work → Projekte`; service-line names and English business terms
standard in German (SEO, Paid Ads, Analytics, Coaching, Leadership) stay as-is.

**Payload localization is ON:** `locales: ['en', 'de']`, `defaultLocale: 'en'`,
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
10. 🔴 **The next-intl middleware matcher must exclude Payload.** `src/middleware.ts`
    rewrites paths for locale routing. If its matcher catches `/admin` or
    `/api/*`, the CMS breaks outright — admin stops loading, every REST endpoint
    404s. It also excludes `/contact/send`, because `ContactForm` posts to that
    absolute path from every locale and must not become `/de/contact/send`.
    **Any change to that regex needs `/admin` + `/api/portfolio` re-tested.**
11. **`ROUTE_THEME` is keyed by unprefixed path** (`/about`, not `/de/about`).
    Both consumers — `BodyAttributes.tsx` and the pre-hydration inline script in
    `[locale]/layout.tsx` — run the path through `stripLocale()` first. Skip that
    and every German page silently loses its nav theming on first paint.
12. **Use `Link` from `@/i18n/navigation`, never `next/link`,** for internal
    links — a raw `next/link href="/about"` drops a German visitor back into
    English. Exception: `LocaleSwitcher` uses `next/link` with a `getPathname()`
    href on purpose, because next-intl's `Link` with an explicit `locale` always
    emits a prefix (`/en/about`), which then 307s to `/about`.

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

**Work** *(added July 20, 2026)* — `/work` lists all published case studies;
`/work/[slug]` renders the full case study (meta, cover, results grid, richText
body, gallery, external link). Both read live from Payload.

**Frontend note — partially wired to Payload.** The homepage "Selected Work"
bento and the `/work` routes query the `Portfolio` collection. Everything else
(hero, services, Learning Hub, About, Contact) is still hardcoded. Wiring the
remaining sections is §6 item 3.

**Data-fetch pattern (follow this for the next section):** Local API via
`getPayload({ config })` in Server Components, query helpers isolated in
`src/lib/portfolio.ts`, `export const revalidate = 300` (ISR — 5 min) on each
page, `generateStaticParams` for dynamic routes. Public queries **must** filter
`_status: 'published'` explicitly: server-side Local API bypasses access control
by default, so the `publishedOrAuthenticated` helper does **not** protect you
here. Rich text renders through `RichText` from
`@payloadcms/richtext-lexical/react` — already a dependency, do not hand-roll a
Lexical renderer or add a package for it.

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
- **Portfolio wired to the frontend + published (July 20, 2026)** — homepage
  bento, `/work`, `/work/[slug]`; all 5 entries published. The fake demo clients
  and stats in §8 are gone.
- **Frontend localization shipped (July 20–21, 2026)** — next-intl, `/[locale]`
  routing, locale switcher, hreflang, Payload locale passthrough. Commits
  `2fe3d0a`, `1bfcc3d`, `91c7bee`.
- **German content live (July 21, 2026)** — `de.json` fully translated + DE
  locale written on all 5 case studies (`d49859c`). English was snapshotted
  before and after the write and verified byte-identical, because
  `Portfolio.results` rows are shared across locales (see §6 schema notes).
- **Google Maps consent gate (July 21, 2026)** — `6051ff3`, closes the
  highest-risk item in §7. See that section; §7 itself stays open.

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
2. **Finish the content load.** The first 5 Portfolio case studies (Erbil Hills,
   GAV TV, Korek Telecom, DDTAJ, Aral Hope) are seeded, published, EN + DE, and
   live. Remaining: **~5 more portfolio entries** and **5 articles**. Re-run the
   seed script with a new data file rather than hand-entering; it is idempotent
   (skips existing slugs) and the Markdown → Lexical converter is already
   written. New entries need **both** locales — `portfolio-data.ts` for EN and
   `portfolio-data-de.ts` for DE.
   - Still pending on the live 5: replace the shared gray placeholder image
     (Media id 1) with real photography per entry, in `/admin`. The frontend
     picks new images up within the 5-minute ISR window — no deploy needed.
3. **Wire the remaining frontend to Payload.** ✅ **Portfolio done**
   (July 20, 2026): homepage bento + `/work` + `/work/[slug]`, and the fake
   Selected Work content in §8 is gone. **Remaining:** Learning Hub → `Courses`
   + `CourseCategories`, and an articles/blog index → `Articles`. Follow the
   established pattern documented in §3 — `src/lib/portfolio.ts` is the
   reference implementation; copy its shape into `src/lib/courses.ts`.
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
  same in every locale); its `label` is localized. ⚠️ The assumption that values
  are pure figures already leaks once: GAV TV's `"5x increase"` renders English
  on `/de` (§2).
- 🔴 **`Portfolio.results` rows are SHARED across locales.** The array itself is
  not localized — only `label` inside it is — so row identity is common to EN and
  DE. When writing a non-default locale, **read the existing rows and pass their
  `id`s back**; omitting them makes Payload recreate the rows and drop the other
  locale's labels. `src/seed/portfolio-de.ts` does this, and refuses to run if
  the label count doesn't match the row count rather than guessing alignment.
  Snapshot the source locale before and diff after — that is what proved the
  July 21 DE write was non-destructive.
- **Display labels for `servicesProvided` live in `messages/*.json`**
  (`serviceLabels` namespace), not in a map in `lib/`. A hardcoded map rendered
  English tags on German pages. Keep those keys in sync with the select options
  in `src/collections/Portfolio.ts`.
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

> ### 🔺 PRIORITY RAISED — July 20, 2026
>
> The site now ships a **German-language version** at `/de/*` (see §2). That
> materially changes the risk profile: an English-only site aimed at an
> international audience is a weak trigger for German consumer/DDG obligations,
> but a site actively serving German at German URLs is a **strong** one. It is
> evidence of targeting the German market, which is the test that matters for
> Impressum (§5 DDG), the Datenschutzerklärung, and the Google Maps consent
> issue below.
>
> **These must land before real German traffic — not indefinitely after.**
> Concretely: before `novusfy.com` DNS points at Vercel (§6 item 6), and before
> `/de/*` is de-noindexed.
>
> ⚠️ **As of July 21, 2026 these pages are the *only* thing still gating the
> German site.** The translations are done and the pages render real German
> (§2) — so the temptation to lift the `noindex` is now real. Don't. The gate
> was never about translation quality.
>
> Mitigation in place meanwhile: **every `/de/*` page carries `noindex, follow`**
> (`localeAlternates()` in `src/lib/metadata.ts`), so German pages are not yet
> being indexed or surfaced to German searchers. That is a holding measure, not
> compliance — remove it only together with the legal pages, not before.

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

**✅ Google Maps consent gate — DONE (July 21, 2026).** `/contact` previously
auto-loaded two Google Maps iframes, transmitting visitor IPs to Google without
consent. Both are now behind a click-to-load gate (`components/MapEmbed.tsx`):
no `<iframe>` and no Google embed URL exists in the document until the visitor
clicks, plus a notice stating that loading transfers data to Google, and a
"Route planen" link that opens Maps in a new tab for anyone who'd rather not
embed. Consent is per-map and **deliberately not persisted** — storing it would
make this a consent-management surface with its own disclosure duties, and the
site's "stores nothing client-side" position is worth keeping.

> 🔴 **The placeholder must stay request-free.** Do not "improve" it with
> Google's Static Maps API or any remote tile image — that leaks the visitor IP
> exactly like the iframe did, just less visibly, and silently undoes this fix.
> It is pure CSS on purpose.

Verified via `performance.getEntriesByType('resource')`: 27 resources on
`/de/contact`, **zero external**, zero Google — then exactly one Google request
after clicking, for that card only. (Note for future sessions: the MCP network
monitor records **localhost only** — it showed "no requests" even for deliberate
cross-origin fetches, so it cannot prove absence of third-party calls. Use the
performance timeline.)

**Still required despite the above:** the Datenschutzerklärung must still
describe this Google Maps embed and its click-gate. Fixing the leak does not
remove the duty to disclose it.

**Already compliant:** Google Fonts — `next/font` self-hosts at build time, so no
visitor IP reaches Google. ✅

**Cookie banner:** probably not yet required (no analytics, no tracking cookies,
and the maps are gated — see above), but becomes required once analytics is
added or if the map gate is ever removed.

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

The site originally contained **invented demo content** written to fill the
layout. Karwan's audit correctly flags fake stats as *irreführende Werbung*
(misleading advertising — legally risky in Germany).

**The fake copy is gone as of July 20, 2026** — what remains is missing
*artwork*, not misleading text. History kept below so the audit trail is
readable:

- ✅ **Fake clients — REMOVED (July 20, 2026).** "Meridian Clinic Group",
  "Atlas Logistics", "Verda Travel", "Nimbus Retail" are gone from the codebase.
  The homepage bento and `/work` now render the real seeded case studies from
  Payload.
- ✅ **Fake stat "+312% qualified reach" — REMOVED.** Stats on tiles now come
  from `Portfolio.results`. **Note:** "3 locations launched", "2.4× repeat
  bookings" and "12+ years of expertise" were listed here historically but a
  grep confirms they **do not exist anywhere in the codebase** — this list was
  overstating what remained.
- ✅ **Currency reference — FIXED.** About now reads *"before spending a single
  dinar on tactics"* (was "dirham", a leftover from an early Dubai assumption).
- **Image placeholders** awaiting real photography: hero image slot, About
  team/office image, founder photo. **All 5 case studies share one gray
  placeholder** (Media id 1) — replace per entry in `/admin`; the frontend picks
  up new images automatically within the 5-minute ISR window.
- **`public/og-image.png`** (1200×630) — social share preview, artwork needed.
  *Still missing, confirmed July 2026.*

Owner has real case studies with photos prepared — swap them in.

---

## 9. Everyday commands

```bash
npm install --legacy-peer-deps   # after cloning or pulling new deps
npm run dev                      # → localhost:3000  ·  /admin for CMS
npx tsc --noEmit                 # real typecheck gate (npm run lint is broken, §6)
npm run build                    # real build gate
openssl rand -base64 32          # generate a PAYLOAD_SECRET

git add . && git commit -m "..." && git push   # push → Vercel auto-deploys
```

Seed scripts (note the env var — `payload run` strips CLI args, gotcha 9):

```bash
SEED_DRY=1 npm run payload run src/seed/portfolio.ts    # preview, no writes
npm run payload run src/seed/portfolio.ts               # EN content
npm run payload run src/seed/portfolio-de.ts            # DE translations
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
