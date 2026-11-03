import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts` (same matcher semantics,
 * Node.js runtime). next-intl's handler is exported unchanged as the default.
 */
export default createMiddleware(routing)

/**
 * 🔴 The matcher is the dangerous part of this file.
 *
 * Payload owns /admin and /api/* (see CLAUDE.md §2 gotcha 1). If the locale
 * proxy rewrites those to /en/admin or /en/api/..., the CMS breaks
 * outright — admin stops loading and every REST endpoint 404s.
 *
 * /contact/send is the contact form handler. ContactForm posts to that absolute
 * path from every locale, so it must not be rewritten to /de/contact/send.
 *
 * Share images (opengraph-image / twitter-image) are generated per locale at
 * /<locale>/…/opengraph-image-<hash>/card. Next writes /en/… into the meta
 * tags; the proxy would 307 that to the unprefixed path, so it skips them and
 * Next serves the prerendered file directly.
 *
 * Excluded, in order: Payload API, Payload admin, Next internals, Vercel
 * internals, uploaded media, the contact handler, share images, and anything
 * with a file extension (favicons, images, robots.txt, sitemap.xml, llms.txt).
 */
export const config = {
  matcher: [
    '/((?!api|admin|_next|_vercel|media|contact/send|.*(?:opengraph|twitter)-image|.*\\..*).*)',
  ],
}
