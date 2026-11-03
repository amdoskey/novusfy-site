import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

import { LEGACY_HOST, SITE_URL } from './src/config/site'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Locale prefixes as they appear in URLs: English is unprefixed ('as-needed').
const PREFIXES = ['', '/de', '/ar']

/**
 * Permanent (308) redirects for retired URLs, in every locale. These run before
 * the next-intl proxy, so the destinations are already canonical paths.
 */
const LEGACY_REDIRECTS = PREFIXES.flatMap((p) => [
  { source: `${p}/services`, destination: `${p}/expertise`, permanent: true },
  { source: `${p}/learning-hub`, destination: `${p}/learning`, permanent: true },
  { source: `${p}/work`, destination: p || '/', permanent: true },
  { source: `${p}/work/:slug`, destination: p || '/', permanent: true },
  // German-speaking visitors guess /kontakt; it always lands on the German page.
  { source: `${p}/kontakt`, destination: '/de/contact', permanent: true },
])

/**
 * The old production host → the canonical domain, same path, permanent (308).
 * `has.value` is matched as an anchored regex, so dots are escaped to keep it
 * an exact host match: preview URLs (novusfy-site-git-….vercel.app,
 * novusfy-site-<hash>-….vercel.app) don't match and keep working.
 */
const HOST_REDIRECT = {
  source: '/:path*',
  has: [{ type: 'host' as const, value: LEGACY_HOST.replaceAll('.', '\\.') }],
  destination: `${SITE_URL}/:path*`,
  permanent: true,
}

/**
 * URLs from the old WordPress site on novusfy.com (its wp-sitemap.xml, checked
 * Nov 2026), mapped to their closest page. English only — WordPress had no
 * locale prefixes. Order matters: specific rules before the /services catch-all.
 */
const WORDPRESS_REDIRECTS = [
  ['/faqs', '/consultation'],
  ['/author/admin', '/about'],
  ['/services/:slug(personal-professional-development.*)', '/learning'],
  ['/services/:path*', '/expertise'],
  // The five consulting blog posts.
  ['/:slug(why-every-entrepreneur.*)', '/expertise'],
  ['/:slug(innovative-solutions.*)', '/expertise'],
  ['/:slug(harness-digital-transformation.*)', '/expertise'],
  ['/:slug(mastering-change-management.*)', '/expertise'],
  ['/:slug(what-consultants-should-know.*)', '/expertise'],
  // Template leftovers, archives and feeds → home.
  ['/:slug(spending-habits-.*)', '/'],
  ['/blog/:path*', '/'],
  ['/blog-grid', '/'],
  ['/sample-page', '/'],
  ['/hello-world', '/'],
  ['/category/:path*', '/'],
  ['/tag/:path*', '/'],
  ['/project/:path*', '/'],
  ['/author/charisma', '/'],
  ['/feed', '/'],
  ['/comments/feed', '/'],
].map(([source, destination]) => ({ source, destination, permanent: true }))

/**
 * Trailing slashes. `skipTrailingSlashRedirect` turns off Next's built-in
 * /path/ → /path redirect, which runs before every custom rule and would make
 * old WordPress URLs (always /slug/) take two hops. This rule restores it as
 * the last redirect, so legacy URLs go to their target in one hop and every
 * other /path/ still lands on /path.
 */
const TRAILING_SLASH = { source: '/:path+/', destination: '/:path+', permanent: true }

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  experimental: {
    // Localized full-page 404 for unmatched URLs (src/app/global-not-found.tsx).
    globalNotFound: true,
  },
  async redirects() {
    // Host redirect first, so old-host requests go straight to the canonical domain.
    return [HOST_REDIRECT, ...WORDPRESS_REDIRECTS, ...LEGACY_REDIRECTS, TRAILING_SLASH]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
