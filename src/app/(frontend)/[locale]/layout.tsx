import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import Footer from '../components/Footer'
import JsonLd from '../components/JsonLd'
import Interactions from '../components/Interactions'
import Nav from '../components/Nav'
import ScrollReveal from '../components/ScrollReveal'
import { cairo, jakarta, jetbrainsMono, nexa, plexArabic } from '../fonts'
import { SITE_NAME, SITE_URL } from '@/config/site'
import { dirFor, routing } from '@/i18n/routing'
import { siteGraph } from '@/lib/jsonld'
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

/**
 * Site-wide defaults. Every page overrides title, description, canonical,
 * hreflang, Open Graph and Twitter via pageMetadata()/legalMetadata() in
 * src/lib/metadata.ts; these values only show where a page sets nothing (404).
 * Share images come from the opengraph-image / twitter-image route files.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    metadataBase: new URL(SITE_URL),
    title: t('home.title'),
    description: t('home.description'),
    applicationName: SITE_NAME,
    twitter: { card: 'summary_large_image' },
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

  // Opts this branch into static rendering — without it every page goes dynamic.
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      // Single switch for every RTL rule in styles.css. en/de resolve to 'ltr'.
      dir={dirFor(locale)}
      className={`scroll-smooth ${nexa.variable} ${jakarta.variable} ${jetbrainsMono.variable} ${cairo.variable} ${plexArabic.variable}`}
    >
      <body>
        <JsonLd data={await siteGraph(locale)} />
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
