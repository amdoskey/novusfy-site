'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { ROUTE_THEME } from './routeTheme'

// The stylesheet keys nav theming off body[data-hero] / body[data-page]
// (e.g. body[data-hero="dark"] .nav). The initial value is set by the
// pre-hydration script in layout.tsx; this keeps it in sync on client-side
// route changes.
export default function BodyAttributes() {
  const pathname = usePathname()

  useEffect(() => {
    const body = document.body
    const conf = ROUTE_THEME[pathname]

    if (conf?.page) body.setAttribute('data-page', conf.page)
    else body.removeAttribute('data-page')

    if (conf?.hero) body.setAttribute('data-hero', conf.hero)
    else body.removeAttribute('data-hero')
  }, [pathname])

  return null
}
