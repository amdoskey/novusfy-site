import { defineRouting } from 'next-intl/routing'

/**
 * Locales mirror Payload's `localization` config in payload.config.ts —
 * keep the two lists in sync.
 *
 * `as-needed` keeps English unprefixed at the root (`/about`) and puts German
 * under `/de/about`, so every existing English URL survives this change.
 */
export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})

export type Locale = (typeof routing.locales)[number]
