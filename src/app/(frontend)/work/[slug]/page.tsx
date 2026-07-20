import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import {
  getPortfolioBySlug,
  getPortfolioSlugs,
  mediaFrom,
  SERVICE_LABELS,
} from '@/lib/portfolio'
import { CaseStudyBody } from '../../components/CaseStudyBody'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = await getPortfolioBySlug(slug)
  if (!entry) return { title: 'Work — Novusfy' }

  return {
    title: `${entry.title} — Novusfy`,
    description: entry.summary ?? undefined,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = await getPortfolioBySlug(slug)

  if (!entry) notFound()

  const cover = mediaFrom(entry.coverImage)
  const services = entry.servicesProvided ?? []
  const results = entry.results ?? []
  const gallery = (entry.gallery ?? [])
    .map((row) => mediaFrom(row.image))
    .filter((m): m is NonNullable<typeof m> => Boolean(m?.url))

  return (
    <>
      <section className="phead case-head">
        <div className="wrap">
          <Link href="/work" className="case-back">
            ← All work
          </Link>

          {entry.clientName ? (
            <p className="eyebrow">
              <span className="eyebrow__dot"></span>
              {entry.clientName}
            </p>
          ) : null}
          <h1 className="phead__title">{entry.title}</h1>
          {entry.summary ? <p className="phead__sub">{entry.summary}</p> : null}

          <dl className="case-meta">
            {entry.industry ? (
              <div className="case-meta__item">
                <dt>Industry</dt>
                <dd>{entry.industry}</dd>
              </div>
            ) : null}
            {services.length > 0 ? (
              <div className="case-meta__item">
                <dt>Services</dt>
                <dd>
                  <ul className="case-tags">
                    {services.map((s) => (
                      <li key={s} className="case-tag">
                        {SERVICE_LABELS[s] ?? s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </section>

      {cover?.url ? (
        <section className="case-hero">
          <div className="wrap">
            <div className="case-hero__frame">
              <Image
                src={cover.url}
                alt={cover.alt ?? entry.title}
                width={cover.width ?? 1600}
                height={cover.height ?? 900}
                className="case-hero__img"
                priority
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Only rendered when the entry actually has figures — most don't. */}
      {results.length > 0 ? (
        <section className="case-results">
          <div className="wrap">
            <p className="label">Results</p>
            <div className="case-results__grid">
              {results.map((r, i) => (
                <div key={r.id ?? i} className="case-result">
                  <b>{r.value}</b>
                  <small>{r.label}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="case-body">
        <div className="wrap wrap--narrow">
          <CaseStudyBody data={entry.content as SerializedEditorState} />

          {entry.externalLink ? (
            <p className="case-link">
              <a
                href={entry.externalLink}
                className="btn btn--solid"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {entry.clientName ?? 'site'} ↗
              </a>
            </p>
          ) : null}
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="case-gallery">
          <div className="wrap">
            <div className="case-gallery__grid">
              {gallery.map((img, i) => (
                <div key={img.id ?? i} className="case-gallery__item">
                  <Image
                    src={img.url as string}
                    alt={img.alt ?? `${entry.title} — image ${i + 1}`}
                    width={img.width ?? 1600}
                    height={img.height ?? 900}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="case-next">
        <div className="wrap">
          <Link href="/work" className="btn btn--ghost">
            ← Back to all work
          </Link>
        </div>
      </section>
    </>
  )
}
