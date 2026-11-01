import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

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

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS
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
