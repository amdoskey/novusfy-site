import React from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import BodyAttributes from '../components/BodyAttributes'
import Footer from '../components/Footer'
import Interactions from '../components/Interactions'
import Nav from '../components/Nav'
import { ROUTE_THEME } from '../components/routeTheme'
import ScrollReveal from '../components/ScrollReveal'
import { jakarta, jetbrainsMono, nexa } from '../fonts'
import { routing } from '@/i18n/routing'
import '../styles.css'

// Runs during HTML parsing, before the nav paints, so body[data-hero]/[data-page]
// are already correct on first frame — no flash of the wrong nav theme. Kept in
// sync with BodyAttributes via the shared ROUTE_THEME map.
//
// The locale prefix is stripped before lookup: ROUTE_THEME is keyed by
// unprefixed path, so /de/about must resolve to the '/about' entry. Without
// this, every German page loses its nav theming on first paint.
const bodyThemeScript = `(function(){try{
var m=${JSON.stringify(ROUTE_THEME)};
var L=${JSON.stringify(routing.locales)};
var p=location.pathname.replace(/\\/+$/,'')||'/';
var s=p.split('/');
if(s.length>1&&L.indexOf(s[1])>-1){p='/'+s.slice(2).join('/');}
if(p!=='/'&&p.length>1&&p.endsWith('/'))p=p.slice(0,-1);
if(p==='')p='/';
var c=m[p];
if(c){document.body.setAttribute('data-page',c.page);if(c.hero)document.body.setAttribute('data-hero',c.hero);}
}catch(e){}})();`

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
    // German pages currently serve English placeholder copy. Indexing them
    // would register duplicate English content under /de — remove this block
    // once real translations land in messages/de.json.
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
      className={`scroll-smooth ${nexa.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: bodyThemeScript }} />
        <NextIntlClientProvider>
          <BodyAttributes />
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
