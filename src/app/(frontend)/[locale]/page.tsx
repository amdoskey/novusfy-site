import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import HeroCanvas from '../components/HeroCanvas'
import { WorkTile } from '../components/WorkTile'
import { getFeaturedPortfolio } from '@/lib/portfolio'
import { Link } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/metadata'

export const revalidate = 300

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return localeAlternates(locale, '/')
}

/** Bento shape: first tile is the large feature, second spans wide. */
const BENTO_MODIFIERS = ['tile--xl', 'tile--w tile--dark', '', 'tile--dark']

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('home')
  const featured = await getFeaturedPortfolio(locale as Locale, 4)
  return (
    <>
      {/* HERO — immersive "Birth of Next" motion field */}
      <section className="herox" id="hero">
        <HeroCanvas />
        <div className="herox__veil" aria-hidden="true"></div>
        <div className="herox__content">
          <p className="herox__label">
            <span className="eyebrow__dot"></span>
            {t('hero.eyebrow')}
          </p>
          <h1 className="herox__title">
            <span className="hx-line">{t('hero.titleLine1')}</span>
            <br />
            <span className="hx-line">
              {t('hero.titleLine2Prefix')}{' '}
              <span className="ink-glow">{t('hero.titleLine2Accent')}</span>
            </span>
          </h1>
          <p className="herox__sub">{t('hero.subtitle')}</p>
          <div className="herox__actions">
            <Link href="/#contact" className="btn btn--solid">
              {t('hero.ctaPrimary')} <span className="btn__arrow">→</span>
            </Link>
            <Link href="/services" className="btn btn--glass">
              {t('hero.ctaSecondary')}
            </Link>
          </div>
          <ul className="herox__tags">
            <li>{t('hero.tagStrategy')}</li>
            <li>{t('hero.tagMarketing')}</li>
            <li>{t('hero.tagDigital')}</li>
            <li>{t('hero.tagLearning')}</li>
          </ul>
        </div>
        <div className="herox__scroll" aria-hidden="true">
          <span></span>
        </div>
      </section>

      {/* WHAT KIND OF NEXT */}
      <section className="nextkind">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">{t('nextKind.label')}</p>
            <h2 className="sec-title">{t('nextKind.title')}</h2>
            <p className="sec-lede">{t('nextKind.lede')}</p>
          </div>
          <div className="nextkind__grid">
            <article className="nextcard">
              <div className="nextcard__no">01</div>
              <h3>{t('nextKind.launchTitle')}</h3>
              <p>{t('nextKind.launchBody')}</p>
            </article>
            <article className="nextcard">
              <div className="nextcard__no">02</div>
              <h3>{t('nextKind.growTitle')}</h3>
              <p>{t('nextKind.growBody')}</p>
            </article>
            <article className="nextcard">
              <div className="nextcard__no">03</div>
              <h3>{t('nextKind.reinventTitle')}</h3>
              <p>{t('nextKind.reinventBody')}</p>
            </article>
            <article className="nextcard">
              <div className="nextcard__no">04</div>
              <h3>{t('nextKind.learnTitle')}</h3>
              <p>{t('nextKind.learnBody')}</p>
            </article>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="pillars" id="services-preview">
        <div className="wrap">
          <div className="pillars__head">
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <p className="label">{t('pillars.label')}</p>
              <h2 className="sec-title">{t('pillars.title')}</h2>
            </div>
            <p className="sec-lede">{t('pillars.lede')}</p>
          </div>
          <div className="pillars__grid">
            <article className="pillar">
              <div className="pillar__ico">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="7" width="18" height="13" rx="1" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <div className="pillar__no">01</div>
              <h3>{t('pillars.p1Title')}</h3>
              <p>{t('pillars.p1Body')}</p>
              <div className="pillar__rule"></div>
            </article>
            <article className="pillar">
              <div className="pillar__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M4.5 16.5 3 21l4.5-1.5" />
                  <path d="M14 6c3-3 6-3 7-3 0 1 0 4-3 7l-7 7-4-4Z" />
                  <circle cx="14.5" cy="9.5" r="1.5" />
                </svg>
              </div>
              <div className="pillar__no">02</div>
              <h3>{t('pillars.p2Title')}</h3>
              <p>{t('pillars.p2Body')}</p>
              <div className="pillar__rule"></div>
            </article>
            <article className="pillar">
              <div className="pillar__ico">
                <svg viewBox="0 0 24 24">
                  <path d="m3 11 18-5v12L3 13v-2Z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </div>
              <div className="pillar__no">03</div>
              <h3>{t('pillars.p3Title')}</h3>
              <p>{t('pillars.p3Body')}</p>
              <div className="pillar__rule"></div>
            </article>
            <article className="pillar">
              <div className="pillar__ico">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="3" width="14" height="11" rx="1" />
                  <path d="M18 8h3v11a1 1 0 0 1-1 1h-9" />
                  <path d="M6 17v4" />
                </svg>
              </div>
              <div className="pillar__no">04</div>
              <h3>{t('pillars.p4Title')}</h3>
              <p>{t('pillars.p4Body')}</p>
              <div className="pillar__rule"></div>
            </article>
            <article className="pillar">
              <div className="pillar__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 3 21 3s-3 .5-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 4.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1Z" />
                </svg>
              </div>
              <div className="pillar__no">05</div>
              <h3>{t('pillars.p5Title')}</h3>
              <p>{t('pillars.p5Body')}</p>
              <div className="pillar__rule"></div>
            </article>
            <article className="pillar">
              <div className="pillar__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3a4 4 0 0 0-4 4c0 1.5-1 2-1.5 3.5C6 12 6 13 7 14c0 2 1 3 2 3.5V20h6v-2.5c1-.5 2-1.5 2-3.5 1-1 1-2 .5-3.5C17 9 16 8.5 16 7a4 4 0 0 0-4-4Z" />
                </svg>
              </div>
              <div className="pillar__no">06</div>
              <h3>{t('pillars.p6Title')}</h3>
              <p>{t('pillars.p6Body')}</p>
              <div className="pillar__rule"></div>
            </article>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="method" id="method">
        <div className="wrap">
          <div className="method__head">
            <p
              className="label label--invert"
              style={{ justifyContent: 'center', color: 'var(--blue-tint)' }}
            >
              {t('method.label')}
            </p>
            <h2 style={{ marginTop: 14 }}>{t('method.title')}</h2>
          </div>
          <ol className="method__steps">
            <li className="mstep">
              <span className="mstep__no">01</span>
              <h3>{t('method.s1Title')}</h3>
              <p>{t('method.s1Body')}</p>
            </li>
            <li className="mstep">
              <span className="mstep__no">02</span>
              <h3>{t('method.s2Title')}</h3>
              <p>{t('method.s2Body')}</p>
            </li>
            <li className="mstep">
              <span className="mstep__no">03</span>
              <h3>{t('method.s3Title')}</h3>
              <p>{t('method.s3Body')}</p>
            </li>
            <li className="mstep">
              <span className="mstep__no">04</span>
              <h3>{t('method.s4Title')}</h3>
              <p>{t('method.s4Body')}</p>
            </li>
          </ol>
          <div className="method__cta">
            <div>
              <h3>{t('method.ctaTitle')}</h3>
              <p>{t('method.ctaBody')}</p>
            </div>
            <Link href="/#contact" className="btn btn--solid">
              {t('method.ctaButton')} <span className="btn__arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* LEARNING PREVIEW */}
      <section className="learn-preview" id="learning">
        <div className="wrap">
          <div className="learn-preview__grid">
            <div className="learn-preview__intro">
              <p className="label">{t('learnPreview.label')}</p>
              <h2>{t('learnPreview.title')}</h2>
              <p>{t('learnPreview.body')}</p>
              <Link href="/learning-hub" className="link-arrow">
                {t('learnPreview.link')}
              </Link>
            </div>
            <div className="learn-cards">
              <div className="learn-card">
                <p className="label">{t('learnPreview.c1Label')}</p>
                <h4>{t('learnPreview.c1Title')}</h4>
                <p>{t('learnPreview.c1Body')}</p>
              </div>
              <div className="learn-card">
                <p className="label">{t('learnPreview.c2Label')}</p>
                <h4>{t('learnPreview.c2Title')}</h4>
                <p>{t('learnPreview.c2Body')}</p>
              </div>
              <div className="learn-card">
                <p className="label">{t('learnPreview.c3Label')}</p>
                <h4>{t('learnPreview.c3Title')}</h4>
                <p>{t('learnPreview.c3Body')}</p>
              </div>
              <div className="learn-card">
                <p className="label">{t('learnPreview.c4Label')}</p>
                <h4>{t('learnPreview.c4Title')}</h4>
                <p>{t('learnPreview.c4Body')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK BENTO */}
      <section className="work" id="work">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">{t('workSection.label')}</p>
            <h2 className="sec-title">{t('workSection.title')}</h2>
          </div>
          {featured.length > 0 ? (
            <>
              <div className="work__bento">
                {featured.map((entry, i) => (
                  <WorkTile key={entry.id} entry={entry} modifier={BENTO_MODIFIERS[i] ?? ''} />
                ))}
              </div>
              <p className="work__more">
                <Link href="/work" className="btn btn--ghost">
                  {t('workSection.seeAll')}
                </Link>
              </p>
            </>
          ) : null}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="contact">
        <div className="wrap">
          <div className="final-cta__card">
            <p
              className="label label--invert"
              style={{ justifyContent: 'center', color: 'var(--blue-tint)' }}
            >
              {t('finalCta.label')}
            </p>
            <h2 style={{ marginTop: 16 }}>{t('finalCta.title')}</h2>
            <p className="final-cta__sub">{t('finalCta.subtitle')}</p>
            <div className="final-cta__actions">
              <a href="mailto:info@novusfy.com" className="btn btn--solid">
                {t('finalCta.ctaPrimary')} <span className="btn__arrow">→</span>
              </a>
              <Link href="/services" className="btn btn--ghost btn--ghost-invert">
                {t('finalCta.ctaSecondary')}
              </Link>
            </div>
            <div className="final-cta__meta">
              <div>
                <span className="label label--invert">{t('finalCta.officesLabel')}</span>
                <p>{t('finalCta.officesValue')}</p>
              </div>
              <div>
                <span className="label label--invert">{t('finalCta.emailLabel')}</span>
                <p>info@novusfy.com</p>
              </div>
              <div>
                <span className="label label--invert">{t('finalCta.webLabel')}</span>
                <p>novusfy.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
