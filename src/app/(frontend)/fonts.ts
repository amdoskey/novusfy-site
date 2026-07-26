import { Cairo, IBM_Plex_Sans_Arabic, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import localFont from 'next/font/local'

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

// Body text — Plus Jakarta Sans (replaces the Google Fonts <link>).
export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

// Mono accents — JetBrains Mono.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

/**
 * Arabic faces. None of the three fonts above ship Arabic glyphs — verified
 * against next/font's subset data: Plus Jakarta Sans is latin/latin-ext/
 * cyrillic-ext/vietnamese, JetBrains Mono adds cyrillic/greek, and Nexa is a
 * Latin-only local TTF. Without these, /ar would render tofu boxes throughout.
 *
 * Nexa has no Arabic cut we own, so the Arabic site is a deliberate sibling of
 * the brand rather than the same typeface (§1). Cairo Black stands in for
 * Nexa Heavy's geometric weight; IBM Plex Sans Arabic carries body text and
 * also the mono tier, since Arabic has no monospace-metadata convention.
 *
 * These are declared globally but only *applied* under [dir="rtl"], so
 * browsers on en/de pages never download them — no glyph in range is used.
 */
export const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['700', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
})
