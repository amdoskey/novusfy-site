import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

/**
 * 🔴 The matcher is the dangerous part of this file.
 *
 * Payload owns /admin and /api/* (see CLAUDE.md §2 gotcha 1). If the locale
 * middleware rewrites those to /en/admin or /en/api/..., the CMS breaks
 * outright — admin stops loading and every REST endpoint 404s.
 *
 * /contact/send is the contact form handler. ContactForm posts to that absolute
 * path from every locale, so it must not be rewritten to /de/contact/send.
 *
 * Excluded, in order: Payload API, Payload admin, Next internals, Vercel
 * internals, uploaded media, the contact handler, and anything with a file
 * extension (favicons, images, robots.txt).
 */
export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|media|contact/send|.*\\..*).*)'],
}
