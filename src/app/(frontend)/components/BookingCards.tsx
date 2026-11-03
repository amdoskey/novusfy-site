import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'

import { BOOKING, formatPrice } from '@/config/booking'

/**
 * The three ways to work with us. Shared by /consultation and the home page.
 * Every CTA is a plain external link to Cal.com, opened in a new tab.
 *
 * `headingLevel` keeps the outline in order: 'h2' where the cards sit right
 * under the page h1 (/consultation), 'h3' under a section h2 (home).
 */
export default async function BookingCards({
  headingLevel: Heading = 'h3',
}: {
  headingLevel?: 'h2' | 'h3'
}) {
  const locale = await getLocale()
  const t = await getTranslations('booking')

  const cards = [
    {
      key: 'free',
      title: t('freeTitle'),
      meta: t('freeMeta'),
      body: t('freeBody'),
      cta: t('freeCta'),
      url: BOOKING.free.url,
      primary: true,
    },
    {
      key: 'strategy',
      title: t('strategyTitle'),
      meta: t('strategyMeta', { price: formatPrice(locale, BOOKING.strategy) }),
      body: t('strategyBody'),
      cta: t('strategyCta'),
      url: BOOKING.strategy.url,
      primary: false,
    },
    {
      key: 'program',
      title: t('programTitle'),
      meta: t('programMeta', { price: formatPrice(locale, BOOKING.program) }),
      body: t('programBody'),
      cta: t('programCta'),
      url: BOOKING.program.url,
      primary: false,
    },
  ]

  return (
    <div className="offers">
      <div className="offers__grid">
        {cards.map((c) => (
          <article key={c.key} className={`offer${c.primary ? ' offer--primary' : ''}`}>
            <p className="offer__meta">{c.meta}</p>
            <Heading>{c.title}</Heading>
            <p className="offer__body">{c.body}</p>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${c.primary ? 'btn--solid' : 'btn--ghost'}`}
            >
              {c.cta} <span className="btn__arrow">→</span>
              <span className="sr-only"> {t('newTab')}</span>
            </a>
          </article>
        ))}
      </div>
      <p className="offers__note">{t('note')}</p>
      {locale === 'de' ? <p className="offers__note">{t('vatNote')}</p> : null}
    </div>
  )
}
