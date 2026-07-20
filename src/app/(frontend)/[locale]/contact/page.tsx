import React from 'react'
import { setRequestLocale } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { localeAlternates } from '@/lib/metadata'

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
    name: 'Germany',
    address: 'Im Staadergarten 12, 78343 Gaienhofen OT Horn, Germany',
    tel: '+49 179 3412853',
    telHref: 'tel:+491793412853',
    whatsapp: 'https://wa.me/491793412853',
    mapSrc:
      'https://www.google.com/maps?q=Im+Staadergarten+12,+78343+Gaienhofen+OT+Horn,+Germany&output=embed',
  },
  {
    name: 'Erbil, Iraq',
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

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <p className="eyebrow">
            <span className="eyebrow__dot"></span>Get in touch
          </p>
          <h1 className="phead__title">Let&apos;s start your next chapter.</h1>
          <p className="phead__sub">
            Two offices, one team. Reach us directly, or send a message and we&apos;ll get back to
            you within one business day.
          </p>
        </div>
      </section>

      <div className="stitch"></div>

      <section className="contact">
        <div className="wrap contact__grid">
          <div className="contact__reach">
            <p className="label label--invert" style={{ color: 'var(--blue-tint)' }}>
              Reach us directly
            </p>
            <h2>Prefer email? We read every message.</h2>
            <a className="contact__email" href="mailto:info@novusfy.com">
              info@novusfy.com
            </a>
            <div className="contact__follow">
              <p className="label label--invert" style={{ color: 'var(--blue-tint)' }}>
                Follow
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
            <p className="label">Our offices</p>
            <h2 className="sec-title">Two homes, one team.</h2>
          </div>
          <div className="offices__grid">
            {OFFICES.map((o) => (
              <div key={o.name} className="office">
                <h3>{o.name}</h3>
                <p className="office__addr">{o.address}</p>
                <div className="office__actions">
                  <a href={o.telHref} className="btn btn--ghost btn--sm">
                    Call {o.tel}
                  </a>
                  <a
                    href={o.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--solid btn--sm"
                  >
                    WhatsApp
                  </a>
                </div>
                <div className="office__map">
                  <iframe
                    src={o.mapSrc}
                    title={`Map of Novusfy ${o.name} office`}
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
              Your next begins now
            </p>
            <h2 style={{ marginTop: 16 }}>Ready when you are.</h2>
            <p className="final-cta__sub">
              Tell us where you want to go. We&apos;ll show you the path and walk it with you.
            </p>
            <div className="final-cta__actions">
              <a href="mailto:info@novusfy.com" className="btn btn--solid">
                Email us <span className="btn__arrow">→</span>
              </a>
              <Link href="/services" className="btn btn--ghost btn--ghost-invert">
                Explore Services
              </Link>
            </div>
            <div className="final-cta__meta">
              <div>
                <span className="label label--invert">Offices</span>
                <p>Germany · Erbil</p>
              </div>
              <div>
                <span className="label label--invert">Email</span>
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
