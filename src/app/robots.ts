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

/**
 * Payload's admin and API are never useful in search results — except CMS
 * images, which are served from /api/media/file/… and must stay crawlable.
 * The more specific Allow wins over the /api Disallow.
 */
const ALLOW = ['/', '/api/media/']
const DISALLOW = ['/admin', '/api']

/** /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: ALLOW, disallow: DISALLOW },
      ...NAMED_BOTS.map((userAgent) => ({ userAgent, allow: ALLOW, disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
