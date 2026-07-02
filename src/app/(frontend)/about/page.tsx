import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'About — Novusfy',
  description:
    'The bridge to your next chapter. Novusfy is built around clarity, strategy, presence, and meaningful action.',
}

export default function AboutPage() {
  return (
    <>
      <section className="phead">
        <div className="wrap">
          <p className="eyebrow">
            <span className="eyebrow__dot"></span>About Novusfy
          </p>
          <h1 className="phead__title">The bridge to your next chapter.</h1>
          <p className="phead__sub">
            We&apos;re a consulting, marketing, and digital solutions company built around one idea:
            meaningful progress starts the moment you get clear about what&apos;s next.
          </p>
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
            <p className="label">Our story</p>
            <h2 style={{ marginTop: 14 }}>Built for the in-between moments.</h2>
            <p>
              Most businesses don&apos;t fail because of one wrong decision. They drift — unclear on
              the goal, unsure of the next step, busy without progress. Novusfy was founded to close
              that gap.
            </p>
            <p>
              We bring together strategy, marketing, digital systems, and practical learning under
              one roof so growth isn&apos;t fragmented across five vendors and three half-finished
              plans. One partner, one direction, real momentum.
            </p>
            <p>
              From offices in Germany and Erbil, we work with businesses, startups, and ambitious
              professionals across the region who are ready to grow, launch, or reinvent.
            </p>
            <div className="mv">
              <div className="mv__card">
                <p className="label">Mission</p>
                <h3>Turn intention into progress.</h3>
                <p>
                  Give every client the clarity, structure, and tools to move from &quot;someday&quot;
                  to &quot;started&quot; — and keep moving.
                </p>
              </div>
              <div className="mv__card">
                <p className="label">Vision</p>
                <h3>A region of builders.</h3>
                <p>
                  To be the trusted partner behind the next generation of confident, modern, growing
                  businesses.
                </p>
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
            Brand philosophy
          </p>
          <p className="philosophy__quote">
            Every transformation begins in the present moment. Your business grows when your focus is
            clear, your strategy is intentional, and your action starts <span>now</span>.
          </p>
          <p className="philosophy__by">
            We don&apos;t chase trends. We build thoughtful, meaningful progress — rooted in
            awareness, strategy, and modern tools.
          </p>
        </div>
      </section>

      <section className="why">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">Why Novusfy</p>
            <h2 className="sec-title">Strategy and execution, under one roof.</h2>
          </div>
          <div className="why__grid">
            <div className="why__cell">
              <b>01</b>
              <h3>One partner</h3>
              <p>Strategy, marketing, and digital align instead of competing across vendors.</p>
            </div>
            <div className="why__cell">
              <b>02</b>
              <h3>Clarity first</h3>
              <p>We define the real objective before spending a dirham on tactics.</p>
            </div>
            <div className="why__cell">
              <b>03</b>
              <h3>Modern tools</h3>
              <p>AI and automation built into systems that actually run your business.</p>
            </div>
            <div className="why__cell">
              <b>04</b>
              <h3>We build with you</h3>
              <p>Not a deck and a handshake — execution you can see, measure, and own.</p>
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
              <p className="founder__role">Leadership · Novusfy</p>
              <h2 style={{ marginTop: 14 }}>Experience that&apos;s been on your side of the table.</h2>
              <p>
                Novusfy is led by people who&apos;ve built, launched, and reinvented real businesses
                — not just advised on them. That perspective shapes every engagement: we know how it
                feels to face the next move without a map.
              </p>
              <p>
                Our team blends strategy, brand, performance marketing, and product thinking, so the
                advice you get is grounded in what actually ships and grows.
              </p>
              <Link href="/#contact" className="link-arrow">
                Meet the team →
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
              Let&apos;s begin
            </p>
            <h2 style={{ marginTop: 16 }}>Your next begins now.</h2>
            <p className="final-cta__sub">
              If you&apos;re ready to grow, launch, or reinvent — we&apos;re ready to build it with
              you.
            </p>
            <div className="final-cta__actions">
              <Link href="/#contact" className="btn btn--solid">
                Start Your Next Chapter <span className="btn__arrow">→</span>
              </Link>
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
