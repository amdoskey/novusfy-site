import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import BookingCards from '../../components/BookingCards'
import { routing } from '@/i18n/routing'
import { localeAlternates } from '@/lib/metadata'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'consultation' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    ...localeAlternates(locale, '/consultation'),
  }
}

export default async function ConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('consultation')

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <p className="eyebrow">
            <span className="eyebrow__dot"></span>
            {t('eyebrow')}
          </p>
          <h1 className="phead__title">{t('title')}</h1>
          <p className="phead__sub">{t('subtitle')}</p>
        </div>
      </section>

      <div className="stitch"></div>

      <section className="consult">
        <div className="wrap">
          <BookingCards />
        </div>
      </section>
    </>
  )
}
