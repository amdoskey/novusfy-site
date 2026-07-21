import { getPayload } from 'payload'
import config from '@payload-config'

import type { Portfolio, Media } from '@/payload-types'
import type { Locale } from '@/i18n/routing'

/**
 * Public Portfolio queries for the frontend.
 *
 * Published-only: these feed public pages, so drafts must never appear. The
 * `publishedOrAuthenticated` access helper would already filter anonymous
 * requests, but this is server-side Local API where access control is bypassed
 * by default — so the constraint is explicit here rather than assumed.
 */

const PUBLISHED = { _status: { equals: 'published' } } as const

async function payloadClient() {
  return getPayload({ config })
}

/**
 * `locale` is passed straight through to Payload. Payload's `fallback: true`
 * means German requests return English values for any field not yet translated,
 * so /de/work/* reads correctly before the German content exists.
 */
export async function getFeaturedPortfolio(locale: Locale, limit = 4): Promise<Portfolio[]> {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'portfolio',
    where: { and: [PUBLISHED, { featured: { equals: true } }] },
    sort: 'title',
    limit,
    depth: 1,
    locale,
    fallbackLocale: 'en',
  })
  return docs
}

export async function getAllPortfolio(locale: Locale): Promise<Portfolio[]> {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'portfolio',
    where: PUBLISHED,
    sort: 'title',
    limit: 100,
    depth: 1,
    locale,
    fallbackLocale: 'en',
  })
  return docs
}

export async function getPortfolioBySlug(
  slug: string,
  locale: Locale,
): Promise<Portfolio | null> {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'portfolio',
    where: { and: [PUBLISHED, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
    locale,
    fallbackLocale: 'en',
  })
  return docs[0] ?? null
}

export async function getPortfolioSlugs(): Promise<string[]> {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'portfolio',
    where: PUBLISHED,
    limit: 100,
    depth: 0,
    select: { slug: true },
  })
  return docs.map((d) => d.slug).filter(Boolean)
}

/** Upload fields come back as an ID or a populated doc depending on depth. */
export function mediaFrom(value: unknown): Media | null {
  if (value && typeof value === 'object' && 'url' in value) return value as Media
  return null
}

// Display labels for Portfolio.servicesProvided live in messages/*.json under
// the `serviceLabels` namespace — a hardcoded map here rendered English tags on
// German pages. Keep those keys in sync with the select options in
// src/collections/Portfolio.ts.
