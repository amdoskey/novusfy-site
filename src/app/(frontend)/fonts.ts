import localFont from 'next/font/local'

/**
 * Every face is self-hosted with next/font/local, so `next build` never
 * downloads a font (next/font/google fetched from Google at build time and
 * could fail the build). Visitors never contact Google either way.
 *
 * Sources: assets/fonts/*.ttf are the official files from github.com/google/fonts
 * (OFL licences alongside). The woff2 files in assets/fonts/web/ are generated
 * from them by scripts/build-web-fonts.py — subset to the scripts we render and
 * cut to the weights below. Re-run that script if a TTF or weight changes.
 */

// Display face — Nexa (Heavy 900 + ExtraLight 200), self-hosted from /assets/fonts.
// Bound to --font-nexa, which styles.css feeds into --f-display.
export const nexa = localFont({
  src: [
    {
      path: '../../../assets/fonts/Nexa-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/Nexa-Heavy.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-nexa',
  display: 'swap',
})

// Body text — Plus Jakarta Sans, variable, weights 400–800.
export const jakarta = localFont({
  src: '../../../assets/fonts/web/PlusJakartaSans-VF.woff2',
  weight: '400 800',
  style: 'normal',
  variable: '--font-jakarta',
  display: 'swap',
})

// Mono accents — JetBrains Mono, variable, weights 400–500.
export const jetbrainsMono = localFont({
  src: '../../../assets/fonts/web/JetBrainsMono-VF.woff2',
  weight: '400 500',
  style: 'normal',
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

/**
 * Arabic faces. Plus Jakarta Sans, JetBrains Mono and Nexa ship no Arabic
 * glyphs, so without these /ar would render tofu boxes throughout.
 *
 * Nexa has no Arabic cut we own, so the Arabic site is a deliberate sibling of
 * the brand rather than the same typeface (§1). Cairo Black stands in for
 * Nexa Heavy's geometric weight; IBM Plex Sans Arabic carries body text and
 * also the mono tier, since Arabic has no monospace-metadata convention. Both
 * files include Latin too, so brand names inside Arabic text match the face.
 *
 * They are only *applied* under [dir="rtl"], and `preload: false` keeps en/de
 * pages from fetching them: browsers download a face only once text uses it.
 */
export const cairo = localFont({
  src: '../../../assets/fonts/web/Cairo-VF.woff2',
  weight: '700 900',
  style: 'normal',
  variable: '--font-cairo',
  display: 'swap',
  preload: false,
})

export const plexArabic = localFont({
  src: [
    { path: '../../../assets/fonts/web/IBMPlexSansArabic-400.woff2', weight: '400', style: 'normal' },
    { path: '../../../assets/fonts/web/IBMPlexSansArabic-500.woff2', weight: '500', style: 'normal' },
    { path: '../../../assets/fonts/web/IBMPlexSansArabic-600.woff2', weight: '600', style: 'normal' },
    { path: '../../../assets/fonts/web/IBMPlexSansArabic-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-plex-arabic',
  display: 'swap',
  preload: false,
})
