import type { MetadataRoute } from 'next'

import { CONTENT_UPDATED, INDEXABLE_PATHS } from '@/config/site'
import { routing } from '@/i18n/routing'
import { languageAlternates, localizedUrl } from '@/lib/metadata'

/**
 * /sitemap.xml — every indexable page in every locale, each entry listing its
 * hreflang siblings. The legal pages are noindex and deliberately left out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED)

  return INDEXABLE_PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      alternates: { languages: languageAlternates(path) },
    })),
  )
}
