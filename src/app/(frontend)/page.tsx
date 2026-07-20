import Link from 'next/link'
import React from 'react'

import HeroCanvas from './components/HeroCanvas'
import { WorkTile } from './components/WorkTile'
import { getFeaturedPortfolio } from '@/lib/portfolio'

export const revalidate = 300

export const metadata = {
  title: 'Novusfy — Your Next Begins Now',
  description:
    'Novusfy helps businesses, startups, and ambitious professionals grow, launch, and reinvent through strategy, marketing, digital systems, and practical learning.',
}

/** Bento shape: first tile is the large feature, second spans wide. */
const BENTO_MODIFIERS = ['tile--xl', 'tile--w tile--dark', '', 'tile--dark']

export default async function HomePage() {
  const featured = await getFeaturedPortfolio(4)
  return (
    <>
      {/* HERO — immersive "Birth of Next" motion field */}
      <section className="herox" id="hero">
        <HeroCanvas />
        <div className="herox__veil" aria-hidden="true"></div>
        <div className="herox__content">
          <p className="herox__label">
            <span className="eyebrow__dot"></span>Novusfy Strategy Group
          </p>
          <h1 className="herox__title">
            <span className="hx-line">Your Next</span>
            <br />
            <span className="hx-line">
              Begins <span className="ink-glow">Now.</span>
            </span>
          </h1>
          <p className="herox__sub">
            We help businesses grow, launch, and reinvent through strategy, marketing, digital
            systems, and practical learning.
          </p>
          <div className="herox__actions">
            <Link href="/#contact" className="btn btn--solid">
              Start Your Next Chapter <span className="btn__arrow">→</span>
            </Link>
            <Link href="/services" className="btn btn--glass">
              Explore Services
            </Link>
          </div>
          <ul className="herox__tags">
            <li>Strategy</li>
            <li>Marketing</li>
            <li>Digital</li>
            <li>Learning</li>
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
            <p className="label">Where you are now</p>
            <h2 className="sec-title">What kind of next are you building?</h2>
            <p className="sec-lede">
              Wherever you are now, Novusfy helps you define the next move — and build the path to
              reach it.
            </p>
          </div>
          <div className="nextkind__grid">
            <article className="nextcard">
              <div className="nextcard__no">01</div>
              <h3>Launch</h3>
              <p>For startups, new brands, new products, and new ideas that need structure.</p>
            </article>
            <article className="nextcard">
              <div className="nextcard__no">02</div>
              <h3>Grow</h3>
              <p>
                For businesses that need marketing, sales direction, digital systems, and stronger
                execution.
              </p>
            </article>
            <article className="nextcard">
              <div className="nextcard__no">03</div>
              <h3>Reinvent</h3>
              <p>
                For companies that feel stuck, outdated, unclear, or ready for a stronger market
                position.
              </p>
            </article>
            <article className="nextcard">
              <div className="nextcard__no">04</div>
              <h3>Learn</h3>
              <p>
                For professionals and teams building practical skills in AI, marketing, digital
                tools, and business systems.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="pillars" id="services-preview">
        <div className="wrap">
          <div className="pillars__head">
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <p className="label">What we do</p>
              <h2 className="sec-title">Six ways we move you forward.</h2>
            </div>
            <p className="sec-lede">
              A connected ecosystem of consulting, marketing, digital, learning, and execution
              services.
            </p>
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
              <h3>Business Consulting &amp; Development</h3>
              <p>Strategic direction that brings clarity, structure, and real progress.</p>
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
              <h3>Startup Lab &amp; Venture Enablement</h3>
              <p>From idea to launch — we build your foundations with you.</p>
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
              <h3>Marketing-as-a-Service</h3>
              <p>Your marketing department — simplified, modern, results-driven.</p>
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
              <h3>Digital &amp; Creative Solutions</h3>
              <p>Modern digital experiences designed for clarity, impact, and growth.</p>
              <div className="pillar__rule"></div>
            </article>
            <article className="pillar">
              <div className="pillar__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 3 21 3s-3 .5-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 4.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1Z" />
                </svg>
              </div>
              <div className="pillar__no">05</div>
              <h3>Experiential &amp; Travel Business Solutions</h3>
              <p>Enhancing customer journeys through powerful, memorable experiences.</p>
              <div className="pillar__rule"></div>
            </article>
            <article className="pillar">
              <div className="pillar__ico">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3a4 4 0 0 0-4 4c0 1.5-1 2-1.5 3.5C6 12 6 13 7 14c0 2 1 3 2 3.5V20h6v-2.5c1-.5 2-1.5 2-3.5 1-1 1-2 .5-3.5C17 9 16 8.5 16 7a4 4 0 0 0-4-4Z" />
                </svg>
              </div>
              <div className="pillar__no">06</div>
              <h3>Personal &amp; Professional Development</h3>
              <p>Growth begins within — we help you unlock your potential.</p>
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
              The Novusfy Method
            </p>
            <h2 style={{ marginTop: 14 }}>A clear path from where you are to what&apos;s next.</h2>
          </div>
          <ol className="method__steps">
            <li className="mstep">
              <span className="mstep__no">01</span>
              <h3>Diagnose</h3>
              <p>
                We understand where you are, what is blocking progress, and what opportunity is
                worth pursuing.
              </p>
            </li>
            <li className="mstep">
              <span className="mstep__no">02</span>
              <h3>Define</h3>
              <p>We shape the strategy, priorities, offer, message, structure, and roadmap.</p>
            </li>
            <li className="mstep">
              <span className="mstep__no">03</span>
              <h3>Build</h3>
              <p>We create the brand, website, campaigns, systems, documents, or launch assets.</p>
            </li>
            <li className="mstep">
              <span className="mstep__no">04</span>
              <h3>Move</h3>
              <p>
                We support execution, measure progress, improve what works, and help you keep
                momentum.
              </p>
            </li>
          </ol>
          <div className="method__cta">
            <div>
              <h3>Not sure where you stand?</h3>
              <p>
                Start with a business readiness consultation. We&apos;ll map your next move in 45
                minutes.
              </p>
            </div>
            <Link href="/#contact" className="btn btn--solid">
              Book a consultation <span className="btn__arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* LEARNING PREVIEW */}
      <section className="learn-preview" id="learning">
        <div className="wrap">
          <div className="learn-preview__grid">
            <div className="learn-preview__intro">
              <p className="label">Coming soon</p>
              <h2>The Learning Hub.</h2>
              <p>
                Short, action-focused courses for the next generation of business builders — videos,
                guides, templates, and practical systems you can use.
              </p>
              <Link href="/learning-hub" className="link-arrow">
                Preview the Hub →
              </Link>
            </div>
            <div className="learn-cards">
              <div className="learn-card">
                <p className="label">Course</p>
                <h4>AI &amp; Automation</h4>
                <p>Put AI to work in real workflows — not as a gimmick, as a system.</p>
              </div>
              <div className="learn-card">
                <p className="label">Build</p>
                <h4>Websites &amp; Apps with AI</h4>
                <p>Ship a working site or app fast using modern AI-assisted tools.</p>
              </div>
              <div className="learn-card">
                <p className="label">Guide</p>
                <h4>Paid Ads &amp; SEO</h4>
                <p>Precision targeting and organic growth strategies that convert.</p>
              </div>
              <div className="learn-card">
                <p className="label">Masterclass</p>
                <h4>Modern Marketing</h4>
                <p>Systems thinking for campaigns built to compound over time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK BENTO */}
      <section className="work" id="work">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">Selected work</p>
            <h2 className="sec-title">Next chapters we&apos;ve helped write.</h2>
          </div>
          {featured.length > 0 ? (
            <>
              <div className="work__bento">
                {featured.map((entry, i) => (
                  <WorkTile
                    key={entry.id}
                    entry={entry}
                    modifier={BENTO_MODIFIERS[i] ?? ''}
                  />
                ))}
              </div>
              <p className="work__more">
                <Link href="/work" className="btn btn--ghost">
                  See all work
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
              Ready for your next?
            </p>
            <h2 style={{ marginTop: 16 }}>Your next begins now.</h2>
            <p className="final-cta__sub">
              Tell us where you want to go. We&apos;ll show you the path and walk it with you.
            </p>
            <div className="final-cta__actions">
              <a href="mailto:info@novusfy.com" className="btn btn--solid">
                Start Your Next Chapter <span className="btn__arrow">→</span>
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
