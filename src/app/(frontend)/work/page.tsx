import type { Metadata } from 'next'

import { getAllPortfolio } from '@/lib/portfolio'
import { WorkTile } from '../components/WorkTile'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Work — Novusfy',
  description:
    'Selected case studies: brand, marketing, and digital systems work for clients across real estate, media, telecom, and healthcare.',
}

export default async function WorkPage() {
  const entries = await getAllPortfolio()

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <p className="eyebrow">
            <span className="eyebrow__dot"></span>Selected work
          </p>
          <h1 className="phead__title">Next chapters we&apos;ve helped write.</h1>
          <p className="phead__sub">
            Strategy, brand, and digital systems work — the projects behind the positioning.
          </p>
        </div>
      </section>

      <div className="stitch"></div>

      <section className="work">
        <div className="wrap">
          {entries.length === 0 ? (
            <p className="work__empty">Case studies are being prepared. Check back shortly.</p>
          ) : (
            <div className="work__grid">
              {entries.map((entry, i) => (
                <WorkTile
                  key={entry.id}
                  entry={entry}
                  modifier={i % 3 === 0 ? 'tile--dark' : ''}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
