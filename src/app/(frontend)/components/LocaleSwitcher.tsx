'use client'

import NextLink from 'next/link'

import { getPathname, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LABELS: Record<string, string> = { en: 'EN', de: 'DE' }

/**
 * EN / DE toggle.
 *
 * `usePathname` from next-intl returns the locale-free path (and for dynamic
 * routes the resolved segment, e.g. /work/gav-tv), so switching preserves where
 * the visitor is rather than dumping them at the homepage.
 *
 * Uses getPathname + next/link rather than next-intl's Link: passing an explicit
 * `locale` to that Link always emits a prefix, so English rendered /en/about,
 * which 307-redirects to /about. Computing the href honours
 * localePrefix: 'as-needed' and links straight at the canonical URL.
 */
export default function LocaleSwitcher({
  currentLocale,
  className = '',
}: {
  currentLocale: string
  className?: string
}) {
  const pathname = usePathname()

  return (
    <div className={`locale-switch ${className}`.trim()} role="group" aria-label="Language">
      {routing.locales.map((locale) => {
        const isCurrent = locale === currentLocale
        const href = getPathname({ href: pathname, locale })

        return (
          <NextLink
            key={locale}
            href={href}
            hrefLang={locale}
            aria-current={isCurrent ? 'true' : undefined}
            className={`locale-switch__opt${isCurrent ? ' is-current' : ''}`}
          >
            {LABELS[locale] ?? locale.toUpperCase()}
          </NextLink>
        )
      })}
    </div>
  )
}
