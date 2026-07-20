import React from 'react'
import { setRequestLocale } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { localeAlternates } from '@/lib/metadata'

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

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <p className="eyebrow">
            <span className="eyebrow__dot"></span>What we do
          </p>
          <h1 className="phead__title">
            Strategy, marketing, digital systems, and execution — built around your next move.
          </h1>
          <p className="phead__sub">
            Six core capabilities, one operating partner. Engage one or stack them into a complete
            growth system.
          </p>
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
              <div className="svc-card__no">Service 01</div>
              <h3>Business Consulting &amp; Development</h3>
              <p>
                Strategic direction that brings clarity, structure, and real progress to where your
                business goes next.
              </p>
              <div className="svc-card__list">
                <span>Strategy</span>
                <span>Positioning</span>
                <span>Operating model</span>
                <span>Roadmaps</span>
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
              <div className="svc-card__no">Service 02</div>
              <h3>Startup Lab &amp; Venture Enablement</h3>
              <p>
                From idea to launch — we build your foundations: model, brand, product, and the
                first path to customers.
              </p>
              <div className="svc-card__list">
                <span>Validation</span>
                <span>Branding</span>
                <span>MVP</span>
                <span>Go-to-market</span>
              </div>
            </article>
            <article className="svc-card">
              <div className="svc-card__ico">
                <svg viewBox="0 0 24 24">
                  <path d="m3 11 18-5v12L3 13v-2Z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </div>
              <div className="svc-card__no">Service 03</div>
              <h3>Marketing-as-a-Service</h3>
              <p>
                Your marketing department — simplified, modern, and results-driven. Strategy,
                content, and paid in one system.
              </p>
              <div className="svc-card__list">
                <span>Paid ads</span>
                <span>SEO</span>
                <span>Content</span>
                <span>Analytics</span>
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
              <div className="svc-card__no">Service 04</div>
              <h3>Digital &amp; Creative Solutions</h3>
              <p>
                Modern digital experiences designed for clarity, impact, and growth — websites,
                apps, and brand systems.
              </p>
              <div className="svc-card__list">
                <span>Web &amp; apps</span>
                <span>UX/UI</span>
                <span>Automation</span>
                <span>Identity</span>
              </div>
            </article>
            <article className="svc-card">
              <div className="svc-card__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 3 21 3s-3 .5-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 4.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1Z" />
                </svg>
              </div>
              <div className="svc-card__no">Service 05</div>
              <h3>Experiential &amp; Travel Business Solutions</h3>
              <p>
                Enhancing customer journeys through powerful, memorable experiences — on the ground
                and across borders.
              </p>
              <div className="svc-card__list">
                <span>Journeys</span>
                <span>Events</span>
                <span>Hospitality</span>
                <span>Partnerships</span>
              </div>
            </article>
            <article className="svc-card">
              <div className="svc-card__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3a4 4 0 0 0-4 4c0 1.5-1 2-1.5 3.5C6 12 6 13 7 14c0 2 1 3 2 3.5V20h6v-2.5c1-.5 2-1.5 2-3.5 1-1 1-2 .5-3.5C17 9 16 8.5 16 7a4 4 0 0 0-4-4Z" />
                </svg>
              </div>
              <div className="svc-card__no">Service 06</div>
              <h3>Personal &amp; Professional Development</h3>
              <p>
                Growth begins within — we help you unlock your potential through coaching and
                practical, applied learning.
              </p>
              <div className="svc-card__list">
                <span>Coaching</span>
                <span>Workshops</span>
                <span>Leadership</span>
                <span>Skills</span>
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
              How we work
            </p>
            <h2
              style={{
                marginTop: 14,
                fontSize: 'clamp(30px,4.6vw,52px)',
                letterSpacing: '-.035em',
              }}
            >
              Five moves from idea to momentum.
            </h2>
          </div>
          <ol className="flow">
            <li className="fstep">
              <span className="fstep__no">01</span>
              <h3>Discover</h3>
              <p>We learn your business, market, and the real goal behind the brief.</p>
            </li>
            <li className="fstep">
              <span className="fstep__no">02</span>
              <h3>Define</h3>
              <p>We set the objective, the audience, and the measure of success.</p>
            </li>
            <li className="fstep">
              <span className="fstep__no">03</span>
              <h3>Design</h3>
              <p>We architect the strategy, system, and assets your next move needs.</p>
            </li>
            <li className="fstep">
              <span className="fstep__no">04</span>
              <h3>Deploy</h3>
              <p>We launch — brand, digital, and campaigns, live and working together.</p>
            </li>
            <li className="fstep">
              <span className="fstep__no">05</span>
              <h3>Develop</h3>
              <p>We measure and refine so results compound long after launch day.</p>
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
              Ready when you are
            </p>
            <h2 style={{ marginTop: 16 }}>Schedule a consultation.</h2>
            <p className="final-cta__sub">
              Bring your next move. We&apos;ll map the path and the system to get there — in 45
              minutes.
            </p>
            <div className="final-cta__actions">
              <Link href="/#contact" className="btn btn--solid">
                Schedule a Consultation <span className="btn__arrow">→</span>
              </Link>
              <Link href="/learning-hub" className="btn btn--ghost btn--ghost-invert">
                Visit Learning Hub
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
