# Novusfy — Project Handoff / Context Brief

**Skill:** See `.claude/skills/payload/SKILL.md` for Payload CMS reference
(collections, fields, hooks, access control, queries, adapters, plugins) before
doing any Payload-related work.

**Purpose:** paste or upload this into a new Claude conversation to continue the
Novusfy website project with full context. Written for a Claude that has no
memory of prior sessions.

**Last updated:** November 1, 2026
**Owner:** DDTAJ (based in Erbil, Iraq)
**Repo:** GitHub → `novusfy-site` · **Live:** `novusfy-site.vercel.app`
(`novusfy.com` still points at the old WordPress site on cPanel — see §8)

> ⚠️ **No secrets in this file.** API keys, database strings, and passwords live
> only in the local `.env` (gitignored) and in Vercel's Environment Variables.
> Never paste them into a chat or commit them.

---

## 0. Current state at a glance (Nov 1, 2026)

The site is a **consultation-first** marketing site in EN / DE / AR. Every path
leads to a free 15-minute call booked on Cal.com. Recent work, all pushed:

- **Phase 1 — audit + Impressum.** Read-only privacy audit (cookies, storage,
  media hosts, Maps requests). Impressum gained the
  Wirtschafts-Identifikationsnummer (§ 139c AO). No Steuernummer anywhere.
- **Phase 2a — legal fixes.** `localeCookie: false` (the public site sets no
  cookies); contact checkbox is an *acknowledgement* ("Ich habe die
  Datenschutzerklärung zur Kenntnis genommen."), not consent; Datenschutz
  rewritten (DPAs, Server-Logfiles, Neon/R2/Resend/Maps/Cookies, Art. 7(3)
  revocation, boxed Art. 21 objection notice, Art. 22, "Stand: November 2026").
- **Phase 3 — restructure.** `/services` → `/expertise`, `/learning-hub` →
  `/learning`, new `/consultation`; `/work` pages deleted; home rebuilt around
  bookings (client strip, anonymised client challenges, booking cards); slogan
  de-duplicated; titles/OG localized; Learning waitlist replaced by an interest
  form; `middleware.ts` → `proxy.ts`; 308 redirects for every retired URL.
- **Follow-up fixes.** Datenschutz names the mailbox host (Verpex, Frankfurt
  servers) and the Cal.com transfer basis (SCCs) — **no TODOs remain**; booking
  cards equal height with aligned CTAs; nav collapses to the burger below
  1180px; faint card borders fixed (see gotcha 18); privacy-label spacing fixed;
  Learning preview copy updated.

Open items are in §6.

---

## 1. What Novusfy is

A premium business consulting, marketing, digital solutions, and learning
company. Physical offices in **Germany** and **Erbil, Iraq**.

- **Slogan:** *Your Next Begins Now.* — used **only** in the footer, the home
  final CTA headline, and the page `<title>`/OG tags. Don't spread it again.
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
- **PostgreSQL** on **Neon** (Frankfurt)
- **Vercel** hosting (auto-deploys on push to `main`)
- **Cloudflare R2** for uploaded media (EU jurisdiction), via
  `@payloadcms/storage-s3`. Chosen over Vercel Blob for portability — see §5.
- **Resend** for email — `novusfy.com` is a verified sending domain in Resend's
  **EU region**; the sender comes from `CONTACT_FROM`.
- **Cal.com** for bookings — **linked to, never embedded** (§5).
- **Verpex** (cPanel) hosts the `info@novusfy.com` mailbox and, for now, DNS.
- Fonts self-hosted via `next/font` (Nexa via `next/font/local`, others via
  `next/font/google`) — no visitor request ever reaches Google Fonts.

### Routes (all exist in en / de / ar; English unprefixed)

| Route | Page |
|---|---|
| `/` | Home: hero → client strip → "What kind of next" → six pillars → Method → client challenges → ways to work with us (booking cards) → Learning preview → final CTA |
| `/about` | About Novusfy (story, mission, philosophy, founder, CTA → `/consultation`) |
| `/expertise` | Six service lines + "How we work" + CTA → `/consultation` (messages namespace is still `services`) |
| `/consultation` | Three booking formats (shared `BookingCards`) + payment note; § 19 UStG note on `/de` only |
| `/learning` | Intro, six Topics, interest form (`#interest`) |
| `/contact` | Email, socials, contact form, two offices with consent-gated maps |
| `/impressum`, `/datenschutz` | German legal pages — same German text at every locale URL |
| `/contact/send` | POST handler for both forms (outside `[locale]`, see gotcha 10) |
| `/admin`, `/api/*` | Payload |

**Redirects (308, `next.config.ts`, every locale prefix):** `/services` →
`/expertise`, `/learning-hub` → `/learning`, `/work` and `/work/:slug` → that
locale's home, `/kontakt` → `/de/contact`.

### Directory structure

```
src/app/(frontend)/
  [locale]/             ← EVERY page lives under here (en unprefixed, /de, /ar)
    layout.tsx          ← <html lang dir>, NextIntlClientProvider, localized
                          title/OG from the `meta` namespace
    page.tsx · about/ · expertise/ · consultation/ · learning/ · contact/
    impressum/ · datenschutz/   ← hardcoded German, canonical = unprefixed URL
  contact/send/route.ts ← both forms; allow-listed `type` (contact ·
                          learning-interest); email only, nothing stored
  components/           ← Nav, Footer, HeroCanvas, ClientStrip, BookingCards,
                          ContactForm, InterestForm, PrivacyAck (+ FormError),
                          LocaleSwitcher, MapEmbed (🔴 consent gate — §7),
                          ScrollReveal, SocialLinks, Interactions
  fonts.ts · styles.css · routeTheme.ts (stripLocale helper only)

src/app/(payload)/      ← Payload admin + API — DO NOT TOUCH
src/config/
  booking.ts            ← 🔴 the ONLY place for Cal.com URLs and prices
  clients.ts            ← client logo list for the home strip
  learning.ts           ← interest-form topic/format keys (also the server allow-list)
src/i18n/               ← routing.ts (locales, localeCookie:false, RTL) ·
                          navigation.ts · request.ts
src/proxy.ts            ← 🔴 locale routing (Next 16's name for middleware) —
                          matcher MUST exclude Payload
src/lib/metadata.ts     ← localeAlternates(): canonical + hreflang
src/collections/        ← Users · Media · CourseCategories · Courses ·
                          Portfolio · Articles
src/access/index.ts     ← publishedOrAuthenticated · authenticated
src/seed/               ← one-off Portfolio seeding (EN/DE/AR) + lexical.ts
messages/               ← en.json · de.json · ar.json — 326 keys each, parity
                          verified; 12 namespaces: meta, nav, footer, home,
                          about, services, contact, learning, contactForm,
                          interestForm, booking, consultation
assets/content/         ← source Markdown (seed data, impressum.md,
                          datenschutz.md — keep datenschutz.md in sync with the page)
next.config.ts          ← redirects + images.localPatterns for /api/media/file
```

**No frontend page reads Payload right now.** The Portfolio collection (5
published case studies, EN/DE/AR) stays in the CMS for future use; the home
page's client challenges are static, anonymised copy in `messages/*.json` (no
client names, no metrics).

**Payload collections:** `Users`, `Media` (upload-enabled, R2), `Portfolio`
(5 entries), `CourseCategories`, `Courses`, `Articles` (last three empty).
Payload localization is ON (`en`, `de`, `ar`, fallback true); `slug` is not
localized. Payload does not reject unknown locales — `?locale=fr` falls back.

### Localization (next-intl)

`localePrefix: 'as-needed'`, `localeDetection: false`, **`localeCookie: false`**.
`/` is always English; German/Arabic are reached only via `/de`, `/ar` or the
switcher. All UI copy is in `messages/*.json`; nothing in JSX needs translating.

**All DE and AR copy is a first-pass translation pending native review.** The
Phase 3 strings were listed for the reviewer in the Nov 1 session. Conventions:

- German is formal *Sie*. Arabic is MSA.
- Kept in Latin script / English: brand and product names, the booking format
  names (**Discovery Call, Strategy Session, Momentum Program**), the branded
  noun `Next` in the slogan (`Ihr Next beginnt jetzt.`, `Next الخاص بك يبدأ
  الآن.`), German nav `Home`, the Expertise page D-steps (Discover · Define ·
  Design · Deploy · Develop), and standard terms (SEO, Paid Ads, Coaching …).
- "Learning" is **Weiterbildung** in German, **التعلّم** in Arabic.
- The German booking-card CTA is the short "Gespräch buchen" (the card already
  says "Kostenlos"); the nav uses "Kostenloses Gespräch buchen".
- Directional arrows live inside translated strings (Arabic uses `←` for
  "forward"); only the hardcoded `.btn__arrow` spans flip via CSS.
- Prices: `Intl.NumberFormat` per locale — EUR on `/de`, USD on `/en` and `/ar`.

**RTL (`/ar`):** `dir` comes from `dirFor(locale)` / `RTL_LOCALES` in
`src/i18n/routing.ts`. Cairo + IBM Plex Sans Arabic load only under
`[dir='rtl']`. `letter-spacing` resets to `normal` in RTL (tracking breaks
Arabic joining). **Physical left/right CSS properties are banned** — use logical
properties; only absolute positioning, `transform-origin`, glyphs and the logo
marquee direction have scoped `[dir='rtl']` rules. Phone numbers sit in
`<bdi>`/`dir="ltr"`.

---

## 3. Gotchas (learned the hard way)

1. **`/api/*` is owned by Payload's catch-all route.** Custom endpoints must not
   live under `/api/...`. The form handler is `/contact/send`.
2. **The env var is `DATABASE_URL`** (not `DATABASE_URI`).
3. **`.env` is gitignored** and does not transfer between machines.
4. **Install with `npm install --legacy-peer-deps`.**
5. **NEVER run `npm audit fix --force`** — it breaks the Payload dependency tree.
6. **1px elements need a zero-threshold IntersectionObserver** (stitch dividers).
7. **Lenis smooth-scroll was deliberately skipped** — it hijacks hash anchors
   (`/learning#interest`, `/#contact`).
8. **`payload run` silently no-ops on a floating promise** — use top-level
   `await` in scripts.
9. **`payload run` strips CLI args** — use env vars (`SEED_DRY=1`), not flags.
10. 🔴 **Next 16 uses `src/proxy.ts`, not `middleware.ts`.** Its matcher must
    exclude `api`, `admin`, `_next`, `_vercel`, `media`, `contact/send` and
    files with extensions. If it catches `/admin` or `/api/*` the CMS breaks;
    if it catches `/contact/send` the forms post to `/de/contact/send` and 404.
    **Any change to that regex needs `/admin`, `/api/portfolio` and both forms
    re-tested.**
11. **`stripLocale()`** exists because `next/navigation`'s `usePathname()` keeps
    the locale prefix; `Nav` uses it.
12. **Use `Link` from `@/i18n/navigation`, never `next/link`,** for internal
    links. Exception: `LocaleSwitcher` (explained in the file).
13. 🔴 **`upload: true` alone is broken on Vercel** — the R2 storage adapter is
    mandatory (`/var/task` is read-only). Payload warning *"Collections with
    uploads enabled require a storage adapter"* on startup = adapter not wired.
14. 🔴 **After adding any Payload plugin, run `npm run generate:importmap` and
    commit `src/app/(payload)/admin/importMap.js`.** Otherwise `/admin` is a
    blank page in production (works locally, so it's easy to miss).
15. 🔴 **Never render a `<script>` inside a React tree** (React 19 errors on
    client navigation). Express state in CSS — e.g. the dark home nav is
    `body:has(.herox)`.
16. **`npm run build` and `npm run dev` can corrupt each other's `.next`.** If
    the dev server throws `SyntaxError: Unexpected end of JSON input`,
    `rm -rf .next` and restart. Next 16 also refuses a second `next dev` in the
    same folder — use the running one or `next start` on another port.
17. **Chrome auto-translate on `/de` can look like a bug.** Chrome offers to
    translate German pages; screenshots then show English text on `/de`. Check
    the HTML (`curl`) before "fixing" a translation.
18. **Transformed elements lose pixel-snapping.** A card with a 1px light border
    at a fractional x-position, left with any `transform` (even
    `translateY(0)`), renders the border smeared and nearly invisible. Revealed
    elements therefore end at `transform: none` (`.rv-in`); keep it that way.
19. **Flex labels split rich text.** `.form__consent` is a flex container, so
    text + `<a>` + "." become separate flex items with gaps. `PrivacyAck` wraps
    the label in one `<span>` — keep that wrapper.
20. **Forms use `noValidate` for styling, so `required` is not enforced by the
    browser.** Both forms call `form.reportValidity()` before sending, and
    `/contact/send` independently requires `privacy === 'on'`.
21. **Nav width.** The full nav needs ~1170px in German (~1040px English), so it
    collapses to the burger below **1180px**. Longer nav labels need re-measuring.
22. **Legal pages are German-only by design.** `/impressum` and `/datenschutz`
    show the same German text at `/`, `/de` and `/ar` URLs, canonical to the
    unprefixed URL, no hreflang. Don't "translate" them.
23. **`npm run lint` is broken** (ESLint config loader crash, pre-existing). Use
    `npx tsc --noEmit` and `npm run build` as the gates. A build can also fail
    transiently while `next/font/google` downloads fonts — retry once before
    debugging.
24. **The MCP network monitor records localhost only.** To prove no third-party
    request, use `performance.getEntriesByType('resource')` in the page.

---

## 4. Real business details (source of truth)

```
Email:      info@novusfy.com
Website:    novusfy.com

Germany:    Im Staadergarten 15, 78343 Gaienhofen OT Horn, Germany
            +49 179 3412853        (WhatsApp: wa.me/491793412853)

Iraq:       Gulan St, Boulevard, Erbil, Iraq
            +964 750 476 4327      (WhatsApp: wa.me/9647504764327)

Instagram:  https://www.instagram.com/novusfy/
Facebook:   https://www.facebook.com/novusfy/
LinkedIn:   https://www.linkedin.com/company/novusfy
```

Legal form: **Einzelunternehmen** (Inhaber Karwan Jameel), Kleinunternehmer
§ 19 UStG (no VAT, no USt-IdNr). The Impressum shows the
Wirtschafts-Identifikationsnummer; **never add the Steuernummer**.

**Booking formats** (all values only in `src/config/booking.ts`):

| Format | Length | Price | Cal.com event |
|---|---|---|---|
| Discovery Call | 15 min | free | `novusfy/15min` |
| Strategy Session | 45 min | $150 / €140 | `novusfy/strategy-session` |
| Momentum Program | 4 × 60 min over a month (link books the kickoff) | $600 / €550 | `novusfy/momentum-program-kickoff` |

Paid formats are booked as a request; an invoice follows via Stripe once the
project is confirmed. No payment is taken at booking.

---

## 5. Settled decisions (do not re-open without new information)

- **Consultation-first funnel.** Every page's primary CTA leads to
  `/consultation` (or straight to the free call). Case-study pages, waitlists
  and "coming soon" messaging were removed on purpose.
- **Cal.com is link-out only.** Nothing from Cal.com is embedded or loaded on
  our pages (no iframe, no script). The Datenschutz text depends on this.
- **No cookies and no browser storage on the public site.** `localeCookie:
  false` in `src/i18n/routing.ts` — **don't re-enable it**. No
  localStorage/sessionStorage. Map consent is per page view, not persisted.
  This is why there is no cookie banner. Only `/admin` sets (technically
  necessary) cookies. Adding analytics or anything that stores data in the
  browser means a consent banner and a Datenschutz update first.
- **Forms are email-only.** `/contact/send` sends via Resend to
  `info@novusfy.com` (reply-to = visitor) and stores nothing in the database.
  Handler validates `type`, topic and format against allow-lists, requires the
  privacy acknowledgement, and keeps a best-effort per-IP rate limit.
- **Media goes through our own server.** Images are requested from
  `/api/media/file/...` (served by Payload from the private R2 bucket) and
  rendered with `next/image`. The R2 bucket is never exposed to visitors, so
  their IP never reaches Cloudflare. Don't make the bucket public.
- **Resend:** domain verified in the EU region; sender is `CONTACT_FROM`.
  Resend for transactional and later marketing email; Google Workspace / the
  Verpex mailbox is for the inbox, never bulk sending.
- **Work pages removed, Portfolio kept.** The collection and seeds stay in the
  CMS; the site shows anonymised challenges instead. Don't re-add case-study
  pages without a decision.
- **Client logos** come from `src/config/clients.ts`. Below 6 entries the strip
  is a static centered row; at 6+ it becomes a slow CSS marquee (mirrored in
  RTL, static under `prefers-reduced-motion`). Real logos go in
  `public/clients/*.svg` and are referenced via `logo:`; entries without one
  render as a muted text wordmark. DDTAJ is the owner's own company — **not** a
  client, never list it.
- **Prices and booking URLs live only in `src/config/booking.ts`.** Components
  format prices with `Intl.NumberFormat`; no currency strings in components.
- **Vercel for production, not cPanel.** cPanel keeps email (and DNS until the
  domain moves). This rejected cPanel specifically, not self-hosting: a Hetzner
  VPS with Coolify is under consideration, so **prefer portable
  infrastructure** (that's why media is on R2, not Vercel Blob).
- **Single shared Neon database** for local dev and production (deliberate).
  Local seeding/testing writes to production; take a Neon snapshot before bulk
  or schema work. `npm run dev` pushes schema directly — there are no migration
  files.
- **Validate before building an LMS.** Learning is currently an interest form
  (coaching / workshop / online course). Future paid courses were planned as
  downloadable packs sold via Stripe — no course platform yet.
- **Workflow:** decisions in chat → Claude Code executes in the repo → owner
  reviews locally → push. Small staged commits. Propose a plan before anything
  substantial; never push without being asked.

---

## 6. Open items

1. **Native DE/AR review** of all copy, especially the Phase 3 strings and the
   booking cards. Earlier flags still open: German "Marketing als
   Dienstleistung"; Arabic keeps `Next` in Latin script mid-sentence.
2. **Client logo files** — add SVGs to `public/clients/` and set `logo:` in
   `src/config/clients.ts`.
3. **Connect `novusfy.com` to Vercel** — follow §8 *exactly*, or email breaks.
4. **Rotate the R2 secret** and save the new one in Vercel as a **Sensitive**
   environment variable.
5. **Add `sslmode=verify-full` to `DATABASE_URL` in Vercel** (and local
   `.env`). Today's driver already treats `require` as verify-full; after the
   pg v9 major it silently weakens. Pinning it makes that upgrade a no-op. Don't
   use the warning's `uselibpqcompat=true&sslmode=require` alternative — weaker.
6. **Form success-state polish** (both forms currently swap to a one-line
   confirmation).
7. **Branded notification email** — the internal email `/contact/send` sends is
   plain HTML.
8. **`public/og-image.png`** (1200×630) — referenced by the metadata, still
   missing.
9. **Payload email adapter (Resend)** so `/admin` password resets actually send.
10. Still-open content: real photography for the hero, About team/office image
    and founder photo; Courses / Articles collections unwired and empty.

---

## 7. 🇩🇪 German legal compliance

- **Impressum** (`/impressum`): § 5 DDG details, § 19 UStG note,
  Wirtschafts-Identifikationsnummer, § 18 Abs. 2 MStV, EU-Streitschlichtung,
  liability/copyright. No Steuernummer.
- **Datenschutzerklärung** (`/datenschutz`, mirrored in
  `assets/content/datenschutz.md` — **edit both together**). It states that
  **DPAs (Art. 28 DSGVO) are concluded with Vercel, Neon, Cloudflare, Resend,
  Cal.com and Verpex**, and describes: hosting + server logfiles (Vercel), Neon
  (Frankfurt), R2 (EU, served via our server), contact *and* interest forms
  (email only, deletion after 6 months), Resend (EU sending), the Verpex
  mailbox (Frankfurt servers, UK adequacy decision), Cal.com booking links (US
  processing under SCCs, nothing loaded before click), consent-gated Google
  Maps, no cookies/storage, rights incl. Art. 7(3) and a boxed Art. 21 notice,
  Art. 22, "Stand: November 2026". No TODOs remain.
- 🔴 **Any new third-party service needs a Datenschutz update (page + .md)
  before it ships** — and a DPA. Same for anything that sets a cookie or uses
  browser storage.
- **Google Maps consent gate** (`MapEmbed.tsx`): no iframe and no Google URL in
  the DOM until "Karte laden" is clicked; consent is not persisted. 🔴 The
  placeholder must stay request-free — never swap in Static Maps or remote
  tiles.
- **Owner/Karwan items:** legal review of both pages; keep the DPAs actually in
  place; confirm the LfDI Baden-Württemberg address.
- **Later, when selling to EU consumers:** AGB, Widerrufsbelehrung (incl.
  digital-download waiver), VAT-inclusive pricing if § 19 stops applying, and a
  checkout button reading *zahlungspflichtig bestellen*.

> Not legal advice.

---

## 8. 🔴 Domain switch warning (`novusfy.com` → Vercel)

On cPanel (Verpex), the **MX record and `mail.novusfy.com` currently point at
the root domain**. Pointing the root at Vercel without preparing mail first
will break `info@novusfy.com` (and with it every form notification).

Do it in this order:

1. Make **`mail.novusfy.com` an A record** pointing at the **Verpex server IP**.
2. Point the **MX** record and the mail **SRV** records (autodiscover etc.) at
   `mail.novusfy.com`.
3. **Wait for DNS propagation** and confirm mail still sends and receives.
4. Only then switch **root (`@`) and `www`** to Vercel and add the domain in
   the Vercel project.

Keep the Resend DNS records (SPF/DKIM for the EU sending domain) untouched
during the switch. After the switch, re-check form delivery end to end.

---

## 9. Everyday commands

```bash
npm install --legacy-peer-deps   # after cloning or pulling new deps
npm run dev                      # → localhost:3000  ·  /admin for CMS
npx tsc --noEmit                 # typecheck gate (npm run lint is broken)
npm run build                    # build gate (retry once on a font fetch error)
npm run generate:importmap       # after adding ANY Payload plugin — gotcha 14
openssl rand -base64 32          # generate a PAYLOAD_SECRET

git push origin main             # → Vercel auto-deploys
```

Seed scripts (env var, not flags — gotcha 9):

```bash
SEED_DRY=1 npm run payload run src/seed/portfolio.ts    # preview, no writes
npm run payload run src/seed/portfolio.ts               # EN content
npm run payload run src/seed/portfolio-de.ts            # DE translations
npm run payload run src/seed/portfolio-ar.ts            # AR translations
```

`.env` shape (values live only locally / in Vercel):

```
DATABASE_URL=postgresql://...        # add sslmode=verify-full (§6 item 5)
PAYLOAD_SECRET=...
RESEND_API_KEY=re_...
CONTACT_FROM=Novusfy Website <...@novusfy.com>   # verified Resend sender

# Cloudflare R2 (media uploads — required, gotcha 13)
R2_BUCKET=novusfy-media
R2_ENDPOINT=https://<account-id>.eu.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
```

🔴 **The `.eu.` in the R2 endpoint is mandatory.** The bucket is in R2's EU
jurisdiction and is only reachable at `<account-id>.eu.r2.cloudflarestorage.com`;
the plain host returns 403 and every upload fails. Jurisdiction cannot be
changed after bucket creation. `region` is hardcoded to `'auto'` in
`payload.config.ts`.

---

## 10. How to work with me on this

- Give **design/architecture decisions in chat**; hand **build specs to Claude
  Code** to execute in the repo.
- Prefer **small staged commits**, verified locally (`tsc`, `build`, curl for
  redirects/headers, browser check incl. `/ar` and reduced motion).
- Ask Claude Code to **propose a plan before building** anything substantial,
  and to **not push** until the owner says so.
- New copy needs **EN/DE/AR** in `messages/*.json` with key parity, and every
  new DE/AR string listed for native review.
