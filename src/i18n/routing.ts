import { defineRouting } from 'next-intl/routing'

/**
 * Locales mirror Payload's `localization` config in payload.config.ts —
 * keep the two lists in sync.
 *
 * `as-needed` keeps English unprefixed at the root (`/about`) and puts German
 * under `/de/about`, so every existing English URL survives this change.
 */
export const routing = defineRouting({
  locales: ['en', 'de', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // `/` always serves English. Without this, next-intl negotiates from the
  // Accept-Language header (and then pins it in a cookie), so German-browser
  // visitors saw German-URL placeholder content at the root. German is reached
  // only explicitly: /de or the nav switcher.
  localeDetection: false,
})

export type Locale = (typeof routing.locales)[number]

/**
 * Right-to-left locales. Drives the `dir` attribute on <html>, which is the
 * single switch every RTL rule in styles.css keys off — so adding an RTL
 * locale means adding it here and nothing else in the CSS.
 */
export const RTL_LOCALES: readonly string[] = ['ar']

export const dirFor = (locale: string): 'rtl' | 'ltr' =>
  RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
