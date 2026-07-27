// Locale-path helper shared by Nav.
//
// This file previously also held ROUTE_THEME, a path→theme map consumed by a
// pre-hydration inline script and a BodyAttributes client component. Both were
// removed: the dark nav treatment is now expressed directly in CSS via
// `body:has(.herox)`, so there is nothing to keep in sync. See §2 gotcha 15.

/**
 * Removes a leading locale segment so `/de/about` and `/ar/about` compare
 * equal to `/about`.
 */
export function stripLocale(pathname: string, locales: readonly string[]): string {
  const segments = pathname.split('/')
  if (segments.length > 1 && locales.includes(segments[1])) {
    const rest = `/${segments.slice(2).join('/')}`
    return rest === '/' ? '/' : rest.replace(/\/+$/, '') || '/'
  }
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/'
}
