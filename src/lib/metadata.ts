import type { Metadata } from 'next'

import { routing } from '@/i18n/routing'

/**
 * hreflang alternates for a given unprefixed path.
 *
 * English is unprefixed (`localePrefix: 'as-needed'`), so `/about` and
 * `/de/about` point at each other. Also carries the noindex flag for German
 * while de.json still holds English placeholder copy — drop the `robots` block
 * here once real translations land and every page inherits the change.
 */
export function localeAlternates(locale: string, path = '/'): Metadata {
  const clean = path === '/' ? '' : path
  const isDefault = locale === routing.defaultLocale

  return {
    alternates: {
      canonical: isDefault ? path : `/${locale}${clean}`,
      languages: {
        en: path,
        de: `/de${clean}`,
      },
    },
    ...(isDefault ? {} : { robots: { index: false, follow: true } }),
  }
}
