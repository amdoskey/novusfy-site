import { getPayload } from 'payload'
import config from '@payload-config'

import type { Portfolio, Media } from '@/payload-types'

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

export async function getFeaturedPortfolio(limit = 4): Promise<Portfolio[]> {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'portfolio',
    where: { and: [PUBLISHED, { featured: { equals: true } }] },
    sort: 'title',
    limit,
    depth: 1,
  })
  return docs
}

export async function getAllPortfolio(): Promise<Portfolio[]> {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'portfolio',
    where: PUBLISHED,
    sort: 'title',
    limit: 100,
    depth: 1,
  })
  return docs
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'portfolio',
    where: { and: [PUBLISHED, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
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

/** Maps the stored select values back to their human labels. */
export const SERVICE_LABELS: Record<string, string> = {
  branding: 'Branding',
  'web-development': 'Web Development',
  'ai-automation': 'AI & Automation',
  'digital-strategy': 'Digital Strategy',
  marketing: 'Marketing',
  'software-development': 'Software Development',
}
