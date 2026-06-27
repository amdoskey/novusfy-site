// Single source of truth for the body[data-page] / body[data-hero] hooks the
// stylesheet keys nav theming off of. Consumed by both the pre-hydration inline
// script in layout.tsx (to avoid a first-paint flash) and BodyAttributes.tsx
// (to update on client-side route changes).
export type RouteTheme = { page: string; hero?: string }

export const ROUTE_THEME: Record<string, RouteTheme> = {
  '/': { page: 'home', hero: 'dark' },
  '/about': { page: 'about' },
  '/services': { page: 'services' },
  '/learning-hub': { page: 'learning' },
}
