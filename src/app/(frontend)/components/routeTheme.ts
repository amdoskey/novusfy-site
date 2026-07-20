// Single source of truth for the body[data-page] / body[data-hero] hooks the
// stylesheet keys nav theming off of. Consumed by both the pre-hydration inline
// script in layout.tsx (to avoid a first-paint flash) and BodyAttributes.tsx
// (to update on client-side route changes).
export type RouteTheme = { page: string; hero?: string }

export const ROUTE_THEME: Record<string, RouteTheme> = {
  '/': { page: 'home', hero: 'dark' },
  '/about': { page: 'about' },
  '/services': { page: 'services' },
  '/work': { page: 'work' },
  '/learning-hub': { page: 'learning' },
  '/contact': { page: 'contact' },
}

/**
 * Removes a leading locale segment so `/de/about` resolves against the
 * unprefixed ROUTE_THEME keys (and Nav's link comparisons).
 *
 * Keys here are locale-free by design — duplicating every route per locale
 * would mean this map drifts the moment a locale is added.
 */
export function stripLocale(pathname: string, locales: readonly string[]): string {
  const segments = pathname.split('/')
  if (segments.length > 1 && locales.includes(segments[1])) {
    const rest = `/${segments.slice(2).join('/')}`
    return rest === '/' ? '/' : rest.replace(/\/+$/, '') || '/'
  }
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/'
}
