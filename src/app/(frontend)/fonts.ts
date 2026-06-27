import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
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
