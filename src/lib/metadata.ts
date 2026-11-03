import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { SITE_NAME, SITE_URL } from '@/config/site'
import { routing } from '@/i18n/routing'

/** Pages with their own SEO strings under `meta.<key>` in messages/*.json. */
export type PageKey = 'home' | 'about' | 'expertise' | 'consultation' | 'learning' | 'contact'

export const PAGE_PATHS: Record<PageKey, string> = {
  home: '/',
  about: '/about',
  expertise: '/expertise',
  consultation: '/consultation',
  learning: '/learning',
  contact: '/contact',
}

const OG_LOCALE: Record<string, string> = { en: 'en_US', de: 'de_DE', ar: 'ar_AR' }

/**
 * Absolute URL of `path` (unprefixed, e.g. `/about`) in `locale`.
 * English is unprefixed (`localePrefix: 'as-needed'`); the English home page
 * is the bare origin with a trailing slash.
 */
export function localizedUrl(locale: string, path: string): string {
  const clean = path === '/' ? '' : path
  if (locale === routing.defaultLocale) return `${SITE_URL}${clean || '/'}`
  return `${SITE_URL}/${locale}${clean}`
}

/**
 * hreflang map for `path`: one entry per locale plus `x-default` → English.
 * Derived from `routing.locales`, so adding a locale there is enough.
 */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
    'x-default': localizedUrl(routing.defaultLocale, path),
  }
}

/**
 * Full metadata for an indexable page: localized title/description, absolute
 * canonical, hreflang alternates, Open Graph and Twitter card. The share image
 * itself comes from the route's opengraph-image / twitter-image files.
 */
export async function pageMetadata(locale: string, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  const path = PAGE_PATHS[page]
  const title = t(`${page}.title`)
  const description = t(`${page}.description`)
  const url = localizedUrl(locale, path)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: OG_LOCALE[locale] ?? 'en_US',
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

/**
 * The German-only legal pages (§3 gotcha 22): one canonical at the unprefixed
 * URL, no hreflang, and kept out of search results while links are followed.
 */
export function legalMetadata(title: string, path: string): Metadata {
  return {
    title: { absolute: title },
    alternates: { canonical: `${SITE_URL}${path}` },
    robots: { index: false, follow: true },
  }
}
