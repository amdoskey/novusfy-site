import React from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import Footer from '../components/Footer'
import Interactions from '../components/Interactions'
import Nav from '../components/Nav'
import ScrollReveal from '../components/ScrollReveal'
import { cairo, jakarta, jetbrainsMono, nexa, plexArabic } from '../fonts'
import { dirFor, routing } from '@/i18n/routing'
import '../styles.css'

// Nav theming used to run through a pre-hydration inline <script> that set
// body[data-hero], mirrored by a BodyAttributes client component. Both are gone:
// React 19 errors on any <script> element rendered in a component tree
// ("Scripts inside React components are never executed when rendering on the
// client"), which fired on every client-side navigation that remounted this
// layout. The stylesheet now selects `body:has(.herox)` — the immersive hero
// only exists on the home route — so the dark nav treatment is pure CSS:
// correct at first paint, correct after client navigation, and impossible to
// desync. Same specificity as the old attribute selector, so cascade is
// unchanged. See §2 gotcha 15.

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport = {
  themeColor: '#0A0A0F', // midnight, globally — matches the brand's dark sections
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isDefault = locale === routing.defaultLocale

  return {
    metadataBase: new URL('https://novusfy.com'),
    title: 'Novusfy — Your Next Begins Now',
    description:
      'Novusfy helps businesses, startups, and ambitious professionals grow, launch, and reinvent through strategy, marketing, digital systems, and practical learning.',
    alternates: {
      canonical: isDefault ? '/' : `/${locale}`,
      languages: { en: '/', de: '/de' },
    },
    ...(isDefault ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: 'Novusfy — Your Next Begins Now',
      description:
        'Strategy, marketing, digital systems, and practical learning — one partner for your next move.',
      url: isDefault ? 'https://novusfy.com' : `https://novusfy.com/${locale}`,
      siteName: 'Novusfy',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      // Placeholder slot — drop the final artwork in public/og-image.png (1200x630).
      images: [
        { url: '/og-image.png', width: 1200, height: 630, alt: 'Novusfy — Your Next Begins Now' },
      ],
    },
    icons: {
      icon: '/icon-blue.png',
      apple: '/icon-blue.png',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  // Opts this branch into static rendering — without it every page goes dynamic
  // and the ISR settings on the work routes stop meaning anything.
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      // Single switch for every RTL rule in styles.css. en/de resolve to 'ltr'.
      dir={dirFor(locale)}
      className={`scroll-smooth ${nexa.variable} ${jakarta.variable} ${jetbrainsMono.variable} ${cairo.variable} ${plexArabic.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <ScrollReveal />
          <Interactions />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
