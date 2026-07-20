import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { getPortfolioBySlug, getPortfolioSlugs, mediaFrom, SERVICE_LABELS } from '@/lib/portfolio'
import { Link } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/metadata'
import { CaseStudyBody } from '../../../components/CaseStudyBody'

export const revalidate = 300

// Slugs are not localized (one URL per doc across locales), so params are the
// cartesian product of locales x slugs.
export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs()
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const entry = await getPortfolioBySlug(slug, locale as Locale)
  if (!entry) return { title: 'Work — Novusfy' }

  return {
    title: `${entry.title} — Novusfy`,
    description: entry.summary ?? undefined,
    ...localeAlternates(locale, `/work/${slug}`),
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('caseStudy')
  const entry = await getPortfolioBySlug(slug, locale as Locale)

  if (!entry) notFound()

  const cover = mediaFrom(entry.coverImage)
  const services = entry.servicesProvided ?? []
  const results = entry.results ?? []
  // Skip gallery entries that repeat the cover (or each other) — the seeded
  // entries all share one placeholder, which otherwise renders the same image
  // twice and reads like the page restarting.
  const seenMedia = new Set<string | number>()
  if (cover?.id) seenMedia.add(cover.id)

  const gallery = (entry.gallery ?? [])
    .map((row) => mediaFrom(row.image))
    .filter((m): m is NonNullable<typeof m> => Boolean(m?.url))
    .filter((m) => {
      if (seenMedia.has(m.id)) return false
      seenMedia.add(m.id)
      return true
    })

  return (
    <>
      <section className="phead case-head">
        <div className="wrap">
          <Link href="/work" className="case-back">
            {t('backShort')}
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
                <dt>{t('industry')}</dt>
                <dd>{entry.industry}</dd>
              </div>
            ) : null}
            {services.length > 0 ? (
              <div className="case-meta__item">
                <dt>{t('services')}</dt>
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
            <p className="label">{t('results')}</p>
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
                {t('visit', { name: entry.clientName ?? t('site') })} ↗
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
            {t('backLong')}
          </Link>
        </div>
      </section>
    </>
  )
}
