'use client'

import { usePathname as useRawPathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { stripLocale } from './routeTheme'
import LocaleSwitcher from './LocaleSwitcher'

// hrefs are locale-free — next-intl's Link adds the /de prefix as needed.
const LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/learning-hub', key: 'learningHub' },
  { href: '/work', key: 'work' },
  { href: '/contact', key: 'contact' },
] as const

export default function Nav() {
  // next-intl's usePathname is already locale-stripped; the raw one still has
  // the prefix and is what the scroll effect needs to detect the home route.
  const pathname = usePathname()
  const rawPathname = useRawPathname()
  const locale = useLocale()
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Home uses the dark immersive hero, so the nav starts transparent and
  // solidifies once scrolled past the hero (mirrors the original stickyNav()).
  const isHome = stripLocale(rawPathname, routing.locales) === '/'

  useEffect(() => {
    if (!isHome) return
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) nav.classList.add('is-stuck')
      else nav.classList.remove('is-stuck')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [rawPathname])

  const isActive = (href: string) => {
    if (href.includes('#')) return false
    if (href === '/') return pathname === '/'
    // Keep the parent link lit on nested routes, e.g. /work/erbil-hills.
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const cta =
    pathname === '/learning-hub'
      ? { href: '#waitlist', label: t('joinWaitlist') }
      : { href: '/#contact', label: t('getStarted') }

  return (
    <header className="nav" id="nav" ref={navRef}>
      <div className="nav__inner">
        <Link className="brand" href="/" aria-label={t('homeAria')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand__mark" src="/icon-blue.png" alt="" />
          <span className="brand__word">Novusfy</span>
        </Link>
        <nav className="nav__links" aria-label={t('primaryAria')}>
          {LINKS.map((l) => (
            <Link key={l.key} href={l.href} className={isActive(l.href) ? 'is-active' : undefined}>
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="nav__cta">
          <LocaleSwitcher currentLocale={locale} />
          <Link href={cta.href} className="btn btn--solid btn--sm">
            {cta.label}
          </Link>
        </div>
        <button
          className="nav__burger"
          id="burger"
          aria-label={t('openMenu')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className="nav__mobile" id="mobileMenu" hidden={!open}>
        {LINKS.map((l) => (
          <Link key={l.key} href={l.href} onClick={() => setOpen(false)}>
            {t(l.key)}
          </Link>
        ))}
        <Link href={cta.href} className="btn btn--solid" onClick={() => setOpen(false)}>
          {cta.label}
        </Link>
        <LocaleSwitcher currentLocale={locale} className="nav__mobile-locale" />
      </div>
    </header>
  )
}
