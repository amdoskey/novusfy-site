import React from 'react'
import { setRequestLocale } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { localeAlternates } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'

import WaitlistForm from '../../components/WaitlistForm'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: 'Learning Hub — Novusfy',
    description:
      'Downloadable course packs for the next generation of business builders. AI, automation, websites, apps, paid ads, SEO, and modern marketing. Coming soon.',
    ...localeAlternates(locale, '/learning-hub'),
  }
}

export default async function LearningHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('learningHub')

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <span className="lh-badge">
            <i></i> {t('badge')}
          </span>
          <h1 className="phead__title">{t('title')}</h1>
          <p className="phead__sub">{t('subtitle')}</p>
          <div className="hero__actions" style={{ marginTop: 30 }}>
            <Link href="#waitlist" className="btn btn--solid">
              {t('ctaWaitlist')} <span className="btn__arrow">→</span>
            </Link>
            <Link href="#courses" className="btn btn--ghost">
              {t('ctaPacks')}
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
            <div className="cat">
              <div className="cat__ix">A</div>
              <h3>{t('cat1Title')}</h3>
              <p>{t('cat1Body')}</p>
            </div>
            <div className="cat">
              <div className="cat__ix">B</div>
              <h3>{t('cat2Title')}</h3>
              <p>{t('cat2Body')}</p>
            </div>
            <div className="cat">
              <div className="cat__ix">C</div>
              <h3>{t('cat3Title')}</h3>
              <p>{t('cat3Body')}</p>
            </div>
            <div className="cat">
              <div className="cat__ix">D</div>
              <h3>{t('cat4Title')}</h3>
              <p>{t('cat4Body')}</p>
            </div>
            <div className="cat">
              <div className="cat__ix">E</div>
              <h3>{t('cat5Title')}</h3>
              <p>{t('cat5Body')}</p>
            </div>
            <div className="cat">
              <div className="cat__ix">F</div>
              <h3>{t('cat6Title')}</h3>
              <p>{t('cat6Body')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="courses" id="courses">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">{t('coursesLabel')}</p>
            <h2 className="sec-title">{t('coursesTitle')}</h2>
          </div>
          <div className="courses__grid">
            <article className="course">
              <div className="course__top">
                <span className="course__chip">{t('c1Chip')}</span>
                <div className="course__num">01</div>
              </div>
              <div className="course__body">
                <h3>{t('c1Title')}</h3>
                <p>{t('c1Body')}</p>
                <div className="course__foot">
                  <span>{t('earlyAccess')}</span>
                  <span className="link-arrow">{t('notifyMe')}</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">{t('c2Chip')}</span>
                <div className="course__num">02</div>
              </div>
              <div className="course__body">
                <h3>{t('c2Title')}</h3>
                <p>{t('c2Body')}</p>
                <div className="course__foot">
                  <span>{t('earlyAccess')}</span>
                  <span className="link-arrow">{t('notifyMe')}</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">{t('c3Chip')}</span>
                <div className="course__num">03</div>
              </div>
              <div className="course__body">
                <h3>{t('c3Title')}</h3>
                <p>{t('c3Body')}</p>
                <div className="course__foot">
                  <span>{t('earlyAccess')}</span>
                  <span className="link-arrow">{t('notifyMe')}</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">{t('c4Chip')}</span>
                <div className="course__num">04</div>
              </div>
              <div className="course__body">
                <h3>{t('c4Title')}</h3>
                <p>{t('c4Body')}</p>
                <div className="course__foot">
                  <span>{t('earlyAccess')}</span>
                  <span className="link-arrow">{t('notifyMe')}</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">{t('c5Chip')}</span>
                <div className="course__num">05</div>
              </div>
              <div className="course__body">
                <h3>{t('c5Title')}</h3>
                <p>{t('c5Body')}</p>
                <div className="course__foot">
                  <span>{t('earlyAccess')}</span>
                  <span className="link-arrow">{t('notifyMe')}</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">{t('c6Chip')}</span>
                <div className="course__num">06</div>
              </div>
              <div className="course__body">
                <h3>{t('c6Title')}</h3>
                <p>{t('c6Body')}</p>
                <div className="course__foot">
                  <span>{t('earlyAccess')}</span>
                  <span className="link-arrow">{t('notifyMe')}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="format">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">{t('formatLabel')}</p>
            <h2 className="sec-title">{t('formatTitle')}</h2>
          </div>
          <div className="format__grid">
            <div className="format__item">
              <p className="label">01</p>
              <p>{t('fmt1')}</p>
            </div>
            <div className="format__item">
              <p className="label">02</p>
              <p>{t('fmt2')}</p>
            </div>
            <div className="format__item">
              <p className="label">03</p>
              <p>{t('fmt3')}</p>
            </div>
            <div className="format__item">
              <p className="label">04</p>
              <p>{t('fmt4')}</p>
            </div>
            <div className="format__item">
              <p className="label">05</p>
              <p>{t('fmt5')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="waitlist" id="waitlist">
        <div className="wrap">
          <div className="waitlist__card">
            <div>
              <p className="label label--invert" style={{ color: 'var(--blue-tint)' }}>
                {t('waitlistLabel')}
              </p>
              <h2 style={{ marginTop: 14 }}>{t('waitlistTitle')}</h2>
              <p>{t('waitlistBody')}</p>
            </div>
            <WaitlistForm />
          </div>
        </div>
      </section>
    </>
  )
}
