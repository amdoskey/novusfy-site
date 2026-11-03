/**
 * Site-wide facts: the canonical domain and the business details that feed
 * metadata, JSON-LD, the sitemap and /llms.txt. Keep in sync with the
 * Impressum and CLAUDE.md §4.
 */

/** Canonical origin. Every canonical, hreflang, sitemap and OG URL is built from it. */
export const SITE_URL = 'https://novusfy.com'

/** The old Vercel production host; 308-redirected to SITE_URL (next.config.ts). */
export const LEGACY_HOST = 'novusfy-site.vercel.app'

/**
 * Sitemap `lastModified` for every page. Bump it (YYYY-MM-DD) whenever page
 * content changes in a way search engines should re-crawl.
 */
export const CONTENT_UPDATED = '2026-11-03'

export const SITE_NAME = 'Novusfy'
export const EMAIL = 'info@novusfy.com'

/** Same URLs as the footer's social row (components/SocialLinks.tsx reads these). */
export const SOCIAL_URLS = {
  instagram: 'https://www.instagram.com/novusfy/',
  facebook: 'https://www.facebook.com/novusfy/',
  linkedin: 'https://www.linkedin.com/company/novusfy',
} as const

/** Legal seat — the Impressum address. */
export const OFFICE_GERMANY = {
  telephone: '+49 179 3412853',
  streetAddress: 'Im Staadergarten 15',
  postalCode: '78343',
  addressLocality: 'Gaienhofen OT Horn',
  addressCountry: 'DE',
} as const

export const OFFICE_ERBIL = {
  telephone: '+964 750 476 4327',
  streetAddress: 'Gulan St, Boulevard',
  addressLocality: 'Erbil',
  addressCountry: 'IQ',
} as const

/**
 * Indexable pages (unprefixed paths). Drives the sitemap and /llms.txt.
 * /impressum and /datenschutz are deliberately absent: they are noindex.
 */
export const INDEXABLE_PATHS = [
  '/',
  '/about',
  '/expertise',
  '/consultation',
  '/learning',
  '/contact',
] as const
