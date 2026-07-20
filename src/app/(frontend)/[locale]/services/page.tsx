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
    title: 'Services — Novusfy',
    description:
      'Strategy, marketing, digital systems, and execution — built around your next move.',
    ...localeAlternates(locale, '/services'),
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('services')

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

      <section className="svc">
        <div className="wrap">
          <div className="svc__grid">
            <article className="svc-card">
              <div className="svc-card__ico">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="7" width="18" height="13" rx="1" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <div className="svc-card__no">{t('s1No')}</div>
              <h3>{t('s1Title')}</h3>
              <p>{t('s1Body')}</p>
              <div className="svc-card__list">
                <span>{t('s1t1')}</span>
                <span>{t('s1t2')}</span>
                <span>{t('s1t3')}</span>
                <span>{t('s1t4')}</span>
              </div>
            </article>
            <article className="svc-card">
              <div className="svc-card__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M4.5 16.5 3 21l4.5-1.5" />
                  <path d="M14 6c3-3 6-3 7-3 0 1 0 4-3 7l-7 7-4-4Z" />
                  <circle cx="14.5" cy="9.5" r="1.5" />
                </svg>
              </div>
              <div className="svc-card__no">{t('s2No')}</div>
              <h3>{t('s2Title')}</h3>
              <p>{t('s2Body')}</p>
              <div className="svc-card__list">
                <span>{t('s2t1')}</span>
                <span>{t('s2t2')}</span>
                <span>{t('s2t3')}</span>
                <span>{t('s2t4')}</span>
              </div>
            </article>
            <article className="svc-card">
              <div className="svc-card__ico">
                <svg viewBox="0 0 24 24">
                  <path d="m3 11 18-5v12L3 13v-2Z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </div>
              <div className="svc-card__no">{t('s3No')}</div>
              <h3>{t('s3Title')}</h3>
              <p>{t('s3Body')}</p>
              <div className="svc-card__list">
                <span>{t('s3t1')}</span>
                <span>{t('s3t2')}</span>
                <span>{t('s3t3')}</span>
                <span>{t('s3t4')}</span>
              </div>
            </article>
            <article className="svc-card">
              <div className="svc-card__ico">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="3" width="14" height="11" rx="1" />
                  <path d="M18 8h3v11a1 1 0 0 1-1 1h-9" />
                  <path d="M6 17v4" />
                </svg>
              </div>
              <div className="svc-card__no">{t('s4No')}</div>
              <h3>{t('s4Title')}</h3>
              <p>{t('s4Body')}</p>
              <div className="svc-card__list">
                <span>{t('s4t1')}</span>
                <span>{t('s4t2')}</span>
                <span>{t('s4t3')}</span>
                <span>{t('s4t4')}</span>
              </div>
            </article>
            <article className="svc-card">
              <div className="svc-card__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 3 21 3s-3 .5-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 4.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1Z" />
                </svg>
              </div>
              <div className="svc-card__no">{t('s5No')}</div>
              <h3>{t('s5Title')}</h3>
              <p>{t('s5Body')}</p>
              <div className="svc-card__list">
                <span>{t('s5t1')}</span>
                <span>{t('s5t2')}</span>
                <span>{t('s5t3')}</span>
                <span>{t('s5t4')}</span>
              </div>
            </article>
            <article className="svc-card">
              <div className="svc-card__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3a4 4 0 0 0-4 4c0 1.5-1 2-1.5 3.5C6 12 6 13 7 14c0 2 1 3 2 3.5V20h6v-2.5c1-.5 2-1.5 2-3.5 1-1 1-2 .5-3.5C17 9 16 8.5 16 7a4 4 0 0 0-4-4Z" />
                </svg>
              </div>
              <div className="svc-card__no">{t('s6No')}</div>
              <h3>{t('s6Title')}</h3>
              <p>{t('s6Body')}</p>
              <div className="svc-card__list">
                <span>{t('s6t1')}</span>
                <span>{t('s6t2')}</span>
                <span>{t('s6t3')}</span>
                <span>{t('s6t4')}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="howwework">
        <div className="wrap">
          <div className="method__head">
            <p
              className="label label--invert"
              style={{ justifyContent: 'center', color: 'var(--blue-tint)' }}
            >
              {t('howLabel')}
            </p>
            <h2
              style={{
                marginTop: 14,
                fontSize: 'clamp(30px,4.6vw,52px)',
                letterSpacing: '-.035em',
              }}
            >
              {t('howTitle')}
            </h2>
          </div>
          <ol className="flow">
            <li className="fstep">
              <span className="fstep__no">01</span>
              <h3>{t('f1Title')}</h3>
              <p>{t('f1Body')}</p>
            </li>
            <li className="fstep">
              <span className="fstep__no">02</span>
              <h3>{t('f2Title')}</h3>
              <p>{t('f2Body')}</p>
            </li>
            <li className="fstep">
              <span className="fstep__no">03</span>
              <h3>{t('f3Title')}</h3>
              <p>{t('f3Body')}</p>
            </li>
            <li className="fstep">
              <span className="fstep__no">04</span>
              <h3>{t('f4Title')}</h3>
              <p>{t('f4Body')}</p>
            </li>
            <li className="fstep">
              <span className="fstep__no">05</span>
              <h3>{t('f5Title')}</h3>
              <p>{t('f5Body')}</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="final-cta" style={{ paddingTop: 'clamp(56px,7vw,100px)' }}>
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
              <Link href="/learning-hub" className="btn btn--ghost btn--ghost-invert">
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
                <span className="label label--invert">{t('webLabel')}</span>
                <p>novusfy.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
