import React from 'react'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

import Footer from './(frontend)/components/Footer'
import Nav from './(frontend)/components/Nav'
import { cairo, jakarta, jetbrainsMono, nexa, plexArabic } from './(frontend)/fonts'
import { Link } from '@/i18n/navigation'
import { dirFor } from '@/i18n/routing'
import './(frontend)/styles.css'

/**
 * Localized 404 for every URL that matches no route (experimental
 * `globalNotFound` in next.config.ts).
 *
 * Why not [locale]/not-found.tsx + a [...rest] catch-all: this app has two
 * root layouts ((frontend)/[locale] and (payload)) and the frontend one sits
 * under a dynamic segment — the two cases the Next docs name for
 * global-not-found. With the catch-all, the 404 status was right but the
 * server sent an empty error shell (the page only appeared after JavaScript
 * ran), so crawlers saw a blank page.
 *
 * The locale comes from the next-intl proxy: it has already rewritten /nope to
 * /en/nope and /de/nope stays /de/nope, and it passes the locale along on the
 * request. Unknown /admin/* and /api/* paths never get here — Payload's
 * catch-all routes answer those.
 *
 * Next adds <meta name="robots" content="noindex"> to 404 responses.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound')
  return { title: `${t('title')} — Novusfy` }
}

export default async function GlobalNotFound() {
  const locale = await getLocale()
  const t = await getTranslations('notFound')

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      className={`scroll-smooth ${nexa.variable} ${jakarta.variable} ${jetbrainsMono.variable} ${cairo.variable} ${plexArabic.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <Nav />
          <main>
            <section className="phead">
              <div className="wrap">
                <p className="eyebrow">
                  <span className="eyebrow__dot"></span>
                  {t('eyebrow')}
                </p>
                <h1 className="phead__title">{t('title')}</h1>
                <p className="phead__sub">{t('body')}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 32 }}>
                  <Link href="/" className="btn btn--solid">
                    {t('ctaHome')} <span className="btn__arrow">→</span>
                  </Link>
                  <Link href="/consultation" className="btn btn--ghost">
                    {t('ctaBook')}
                  </Link>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
