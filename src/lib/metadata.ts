import type { Metadata } from 'next'

import { routing } from '@/i18n/routing'

/**
 * hreflang alternates for a given unprefixed path.
 *
 * English is unprefixed (`localePrefix: 'as-needed'`), so `/about`, `/de/about`
 * and `/ar/about` all point at each other. The languages map is derived from
 * `routing.locales`, so adding a locale there is enough — nothing to update here.
 *
 * 🔴 Every non-default locale carries `noindex, follow`. The Impressum and
 * Datenschutzerklärung now exist (§7), so the technical prerequisite is met.
 * Removing `noindex` is an **owner decision** — do not flip it automatically.
 */
export function localeAlternates(locale: string, path = '/'): Metadata {
  const clean = path === '/' ? '' : path
  const isDefault = locale === routing.defaultLocale

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, l === routing.defaultLocale ? path : `/${l}${clean}`]),
  )

  return {
    alternates: {
      canonical: isDefault ? path : `/${locale}${clean}`,
      languages,
    },
    ...(isDefault ? {} : { robots: { index: false, follow: true } }),
  }
}
