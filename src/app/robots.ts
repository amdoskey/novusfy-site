import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/config/site'

/** Search and AI crawlers we explicitly welcome (same rules as everyone else). */
const NAMED_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
  'Bingbot',
]

/** Payload's admin and API are never useful in search results. */
const DISALLOW = ['/admin', '/api']

/** /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...NAMED_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
