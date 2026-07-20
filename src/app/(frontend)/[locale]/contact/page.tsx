import React from 'react'
import { setRequestLocale } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { localeAlternates } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'

import ContactForm from '../../components/ContactForm'
import SocialLinks from '../../components/SocialLinks'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: 'Contact — Novusfy',
    description:
      'Get in touch with Novusfy. Two offices — Germany and Erbil, Iraq — one team. Reach us directly or send a message and we’ll reply within one business day.',
    ...localeAlternates(locale, '/contact'),
  }
}

const OFFICES = [
  {
    nameKey: 'officeGermany',
    address: 'Im Staadergarten 12, 78343 Gaienhofen OT Horn, Germany',
    tel: '+49 179 3412853',
    telHref: 'tel:+491793412853',
    whatsapp: 'https://wa.me/491793412853',
    mapSrc:
      'https://www.google.com/maps?q=Im+Staadergarten+12,+78343+Gaienhofen+OT+Horn,+Germany&output=embed',
  },
  {
    nameKey: 'officeErbil',
    address: 'Gulan St, Boulevard, Erbil, Iraq',
    tel: '+964 750 476 4327',
    telHref: 'tel:+9647504764327',
    whatsapp: 'https://wa.me/9647504764327',
    mapSrc: 'https://www.google.com/maps?q=Gulan+St,+Boulevard,+Erbil,+Iraq&output=embed',
  },
]

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('contact')

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

      <section className="contact">
        <div className="wrap contact__grid">
          <div className="contact__reach">
            <p className="label label--invert" style={{ color: 'var(--blue-tint)' }}>
              {t('reachLabel')}
            </p>
            <h2>{t('reachTitle')}</h2>
            <a className="contact__email" href="mailto:info@novusfy.com">
              info@novusfy.com
            </a>
            <div className="contact__follow">
              <p className="label label--invert" style={{ color: 'var(--blue-tint)' }}>
                {t('followLabel')}
              </p>
              <SocialLinks className="social--invert" />
            </div>
          </div>

          <div className="contact__form">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="offices">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">{t('officesLabel')}</p>
            <h2 className="sec-title">{t('officesTitle')}</h2>
          </div>
          <div className="offices__grid">
            {OFFICES.map((o) => (
              <div key={o.nameKey} className="office">
                <h3>{t(o.nameKey)}</h3>
                <p className="office__addr">{o.address}</p>
                <div className="office__actions">
                  <a href={o.telHref} className="btn btn--ghost btn--sm">
                    {t('call', { tel: o.tel })}
                  </a>
                  <a
                    href={o.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--solid btn--sm"
                  >
                    {t('whatsapp')}
                  </a>
                </div>
                <div className="office__map">
                  <iframe
                    src={o.mapSrc}
                    title={t('mapTitle', { name: t(o.nameKey) })}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            ))}
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
              <a href="mailto:info@novusfy.com" className="btn btn--solid">
                {t('ctaPrimary')} <span className="btn__arrow">→</span>
              </a>
              <Link href="/services" className="btn btn--ghost btn--ghost-invert">
                {t('ctaSecondary')}
              </Link>
            </div>
            <div className="final-cta__meta">
              <div>
                <span className="label label--invert">{t('metaOfficesLabel')}</span>
                <p>{t('metaOfficesValue')}</p>
              </div>
              <div>
                <span className="label label--invert">{t('metaEmailLabel')}</span>
                <p>info@novusfy.com</p>
              </div>
              <div>
                <span className="label label--invert">{t('metaWebLabel')}</span>
                <p>novusfy.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
