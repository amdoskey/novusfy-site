import Link from 'next/link'
import React from 'react'

import WaitlistForm from '../components/WaitlistForm'

export const metadata = {
  title: 'Learning Hub — Novusfy',
  description:
    'Downloadable course packs for the next generation of business builders. AI, automation, websites, apps, paid ads, SEO, and modern marketing. Coming soon.',
}

export default function LearningHubPage() {
  return (
    <>
      <section className="phead">
        <div className="wrap">
          <span className="lh-badge">
            <i></i> Early access · Coming soon
          </span>
          <h1 className="phead__title">
            Practical learning for the next generation of business builders.
          </h1>
          <p className="phead__sub">
            Short, action-focused course packs in AI, automation, websites, apps, paid ads, SEO, and
            modern marketing — video lessons, slides, and templates you download and keep.
          </p>
          <div className="hero__actions" style={{ marginTop: 30 }}>
            <Link href="#waitlist" className="btn btn--solid">
              Join the Waitlist <span className="btn__arrow">→</span>
            </Link>
            <Link href="#courses" className="btn btn--ghost">
              See upcoming packs
            </Link>
          </div>
        </div>
      </section>

      <div className="stitch"></div>

      <section className="cats">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">Course categories</p>
            <h2 className="sec-title">Skills that move a business forward.</h2>
          </div>
          <div className="cats__grid">
            <div className="cat">
              <div className="cat__ix">A</div>
              <h3>AI &amp; Automation</h3>
              <p>Put AI to work in real workflows — not as a gimmick, as a system.</p>
            </div>
            <div className="cat">
              <div className="cat__ix">B</div>
              <h3>Build Websites &amp; Apps with AI</h3>
              <p>Ship a working site or app fast, using modern AI-assisted tools.</p>
            </div>
            <div className="cat">
              <div className="cat__ix">C</div>
              <h3>Paid Ads</h3>
              <p>Run campaigns that return — targeting, creative, and budgets that scale.</p>
            </div>
            <div className="cat">
              <div className="cat__ix">D</div>
              <h3>SEO</h3>
              <p>Be found by the customers already searching for what you offer.</p>
            </div>
            <div className="cat">
              <div className="cat__ix">E</div>
              <h3>Marketing Strategy</h3>
              <p>Connect channels into one system that compounds over time.</p>
            </div>
            <div className="cat">
              <div className="cat__ix">F</div>
              <h3>Business &amp; Startup Playbooks</h3>
              <p>Frameworks for launching, pricing, and growing with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="courses" id="courses">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">Featured upcoming</p>
            <h2 className="sec-title">First course packs in the pipeline.</h2>
          </div>
          <div className="courses__grid">
            <article className="course">
              <div className="course__top">
                <span className="course__chip">AI &amp; Automation</span>
                <div className="course__num">01</div>
              </div>
              <div className="course__body">
                <h3>AI Automation for Business</h3>
                <p>Map your repetitive work and automate it end-to-end with practical AI tooling.</p>
                <div className="course__foot">
                  <span>Early access</span>
                  <span className="link-arrow">Notify me →</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">Build with AI</span>
                <div className="course__num">02</div>
              </div>
              <div className="course__body">
                <h3>Build Websites with AI</h3>
                <p>Go from blank page to a live, on-brand website using AI-assisted workflows.</p>
                <div className="course__foot">
                  <span>Early access</span>
                  <span className="link-arrow">Notify me →</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">Paid Ads</span>
                <div className="course__num">03</div>
              </div>
              <div className="course__body">
                <h3>Paid Ads Fundamentals</h3>
                <p>Set up, launch, and read campaigns that actually pay for themselves.</p>
                <div className="course__foot">
                  <span>Early access</span>
                  <span className="link-arrow">Notify me →</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">SEO</span>
                <div className="course__num">04</div>
              </div>
              <div className="course__body">
                <h3>SEO for Business Owners</h3>
                <p>A no-jargon system for ranking and being found by ready-to-buy customers.</p>
                <div className="course__foot">
                  <span>Early access</span>
                  <span className="link-arrow">Notify me →</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">Marketing Systems</span>
                <div className="course__num">05</div>
              </div>
              <div className="course__body">
                <h3>Marketing Systems with AI</h3>
                <p>Wire strategy, content, and analytics into one loop that keeps improving.</p>
                <div className="course__foot">
                  <span>Early access</span>
                  <span className="link-arrow">Notify me →</span>
                </div>
              </div>
            </article>
            <article className="course">
              <div className="course__top">
                <span className="course__chip">Playbooks</span>
                <div className="course__num">06</div>
              </div>
              <div className="course__body">
                <h3>The Startup Launch Playbook</h3>
                <p>Validate, build, and take your idea to first customers — step by step.</p>
                <div className="course__foot">
                  <span>Early access</span>
                  <span className="link-arrow">Notify me →</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="format">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">What&apos;s in each pack</p>
            <h2 className="sec-title">Built to apply, not just to watch.</h2>
          </div>
          <div className="format__grid">
            <div className="format__item">
              <p className="label">01</p>
              <p>Video lessons</p>
            </div>
            <div className="format__item">
              <p className="label">02</p>
              <p>Slide decks</p>
            </div>
            <div className="format__item">
              <p className="label">03</p>
              <p>Templates</p>
            </div>
            <div className="format__item">
              <p className="label">04</p>
              <p>Action tasks</p>
            </div>
            <div className="format__item">
              <p className="label">05</p>
              <p>Practical assignments</p>
            </div>
          </div>
        </div>
      </section>

      <section className="waitlist" id="waitlist">
        <div className="wrap">
          <div className="waitlist__card">
            <div>
              <p className="label label--invert" style={{ color: 'var(--blue-tint)' }}>
                Early access
              </p>
              <h2 style={{ marginTop: 14 }}>Join the Learning Hub waitlist.</h2>
              <p>
                Be first in when the course packs drop. Waitlist members get early access and
                founding-member pricing.
              </p>
            </div>
            <WaitlistForm />
          </div>
        </div>
      </section>
    </>
  )
}
