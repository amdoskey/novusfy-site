import React from 'react'
import { setRequestLocale } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { localeAlternates } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: 'About — Novusfy',
    description:
      'The bridge to your next chapter. Novusfy is built around clarity, strategy, presence, and meaningful action.',
    ...localeAlternates(locale, '/about'),
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('about')

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

      <section className="story">
        <div className="wrap story__grid">
          <div className="story__visual">
            <span className="media-ph__tag">
              <b>Team / office image</b>4 : 5 portrait · add photo
            </span>
          </div>
          <div>
            <p className="label">{t('storyLabel')}</p>
            <h2 style={{ marginTop: 14 }}>{t('storyTitle')}</h2>
            <p>{t('storyP1')}</p>
            <p>{t('storyP2')}</p>
            <p>{t('storyP3')}</p>
            <div className="mv">
              <div className="mv__card">
                <p className="label">{t('missionLabel')}</p>
                <h3>{t('missionTitle')}</h3>
                <p>{t('missionBody')}</p>
              </div>
              <div className="mv__card">
                <p className="label">{t('visionLabel')}</p>
                <h3>{t('visionTitle')}</h3>
                <p>{t('visionBody')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="philosophy">
        <div className="wrap">
          <p
            className="label label--invert"
            style={{ marginBottom: 30, color: 'var(--blue-tint)' }}
          >
            {t('philosophyLabel')}
          </p>
          <p className="philosophy__quote">
            {t('philosophyQuotePre')} <span>{t('philosophyQuoteAccent')}</span>.
          </p>
          <p className="philosophy__by">{t('philosophyBy')}</p>
        </div>
      </section>

      <section className="why">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">{t('whyLabel')}</p>
            <h2 className="sec-title">{t('whyTitle')}</h2>
          </div>
          <div className="why__grid">
            <div className="why__cell">
              <b>01</b>
              <h3>{t('why1Title')}</h3>
              <p>{t('why1Body')}</p>
            </div>
            <div className="why__cell">
              <b>02</b>
              <h3>{t('why2Title')}</h3>
              <p>{t('why2Body')}</p>
            </div>
            <div className="why__cell">
              <b>03</b>
              <h3>{t('why3Title')}</h3>
              <p>{t('why3Body')}</p>
            </div>
            <div className="why__cell">
              <b>04</b>
              <h3>{t('why4Title')}</h3>
              <p>{t('why4Body')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="founder">
        <div className="wrap">
          <div className="founder__card">
            <div className="founder__photo">
              <span className="media-ph__tag">
                <b>Founder photo</b>1 : 1 · add photo
              </span>
            </div>
            <div>
              <p className="founder__role">{t('founderRole')}</p>
              <h2 style={{ marginTop: 14 }}>{t('founderTitle')}</h2>
              <p>{t('founderP1')}</p>
              <p>{t('founderP2')}</p>
              <Link href="/#contact" className="link-arrow">
                {t('founderLink')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap">
          <div className="final-cta__card">
            <p
              className="label label--invert"
              style={{ justifyContent: 'center', color: 'var(--blue-tint)' }}
            >
              {t('ctaLabel')}
            </p>
            <h2 style={{ marginTop: 16 }}>{t('ctaTitle')}</h2>
            <p className="final-cta__sub">{t('ctaSubtitle')}</p>
            <div className="final-cta__actions">
              <Link href="/#contact" className="btn btn--solid">
                {t('ctaPrimary')} <span className="btn__arrow">→</span>
              </Link>
              <Link href="/services" className="btn btn--ghost btn--ghost-invert">
                {t('ctaSecondary')}
              </Link>
            </div>
            <div className="final-cta__meta">
              <div>
                <span className="label label--invert">{t('officesLabel')}</span>
                <p>{t('officesValue')}</p>
              </div>
              <div>
                <span className="label label--invert">{t('emailLabel')}</span>
                <p>info@novusfy.com</p>
              </div>
              <div>
                <span className="label label--invert">Web</span>
                <p>novusfy.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
