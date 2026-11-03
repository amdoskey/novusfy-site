import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import InterestForm from '../../components/InterestForm'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return pageMetadata(locale, 'learning')
}

const TOPICS = ['A', 'B', 'C', 'D', 'E', 'F'] as const

export default async function LearningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('learning')

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <h1 className="phead__title">{t('title')}</h1>
          <p className="phead__sub">{t('subtitle')}</p>
          <div className="hero__actions" style={{ marginTop: 30 }}>
            <Link href="#interest" className="btn btn--solid">
              {t('ctaInterest')} <span className="btn__arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="stitch"></div>

      <section className="cats">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">{t('catsLabel')}</p>
            <h2 className="sec-title">{t('catsTitle')}</h2>
          </div>
          <div className="cats__grid">
            {TOPICS.map((ix, i) => (
              <div key={ix} className="cat">
                <div className="cat__ix">{ix}</div>
                <h3>{t(`cat${i + 1}Title`)}</h3>
                <p>{t(`cat${i + 1}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="interest" id="interest">
        <div className="wrap">
          <div className="interest__card">
            <div>
              <h2>{t('interestTitle')}</h2>
              <p>{t('interestBody')}</p>
            </div>
            <InterestForm />
          </div>
        </div>
      </section>
    </>
  )
}
