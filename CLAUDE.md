# Novusfy — Project Handoff / Context Brief

**Skill:** See `.claude/skills/payload/SKILL.md` for Payload CMS reference
(collections, fields, hooks, access control, queries, adapters, plugins) before
doing any Payload-related work.

**Purpose:** paste or upload this into a new Claude conversation to continue the
Novusfy website project with full context. Written for a Claude that has no
memory of prior sessions.

**Last updated:** July 2026
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
```

**Current Payload collections (verified July 2026):** `Users`, `Media` —
both scaffold defaults. No content collections modeled yet; see §6.

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
from Payload. This is intentional until content collections are modeled (§6).

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

### 🔧 Immediately open (blocking)
1. **Vercel Environment Variables are EMPTY.** Must add `DATABASE_URL`,
   `PAYLOAD_SECRET`, `RESEND_API_KEY` → then **redeploy**. This is why the
   contact form has never sent email and why live `/admin` doesn't work.
2. **Neon has one project / one branch.** Create a `development` branch for
   local, keep `main` for production. Local `.env` → dev branch; Vercel →
   main branch.
3. **Create admin users** in both environments (local `/admin` and live
   `/admin`) — the databases are currently empty.
4. **Verify `novusfy.com` as a sending domain in Resend** (DNS records).
   Until then email sends from `onboarding@resend.dev` and lands in spam.
   Required before any waitlist/marketing email.

### 📋 Next build phases (in order)
5. **Waitlist backend** — handler that (a) saves signup to a Payload
   `waitlist-signups` collection, (b) adds contact to a Resend Audience,
   (c) sends automated welcome email. Use a non-`/api` path.
6. **Payload collections** — Courses (title, slug, description, category,
   cover, **access type: free|paid**, price, downloadable file,
   draft/published), Portfolio, Articles, Blog. Model the Courses schema
   carefully *before* building; changing it after real entries is painful.
   Currently only scaffold `Users`/`Media` collections exist — this is the
   biggest real gap: the CMS does nothing yet, every content edit is a code
   change + deploy.
7. **Stripe purchase + protected download flow** — needs its own focused
   session (webhooks + preventing link sharing).
8. **Point `novusfy.com` DNS at Vercel** (currently still serving an old
   WordPress site — see §7).

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
  "Verda Travel", "Nimbus Retail"
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
- Keep content **static** until the Payload collections are deliberately modeled.
