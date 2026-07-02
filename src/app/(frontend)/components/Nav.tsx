'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/learning-hub', label: 'Learning Hub' },
  { href: '/#work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Home uses the dark immersive hero, so the nav starts transparent and
  // solidifies once scrolled past the hero (mirrors the original stickyNav()).
  const isHome = pathname === '/'

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
  }, [pathname])

  const isActive = (href: string) => {
    if (href.includes('#')) return false
    return pathname === href
  }

  const cta =
    pathname === '/learning-hub'
      ? { href: '#waitlist', label: 'Join Waitlist' }
      : { href: '/#contact', label: 'Get Started' }

  return (
    <header className="nav" id="nav" ref={navRef}>
      <div className="nav__inner">
        <Link className="brand" href="/" aria-label="Novusfy home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand__mark" src="/icon-blue.png" alt="" />
          <span className="brand__word">Novusfy</span>
        </Link>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className={isActive(l.href) ? 'is-active' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav__cta">
          <Link href={cta.href} className="btn btn--solid btn--sm">
            {cta.label}
          </Link>
        </div>
        <button
          className="nav__burger"
          id="burger"
          aria-label="Open menu"
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
          <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href={cta.href} className="btn btn--solid" onClick={() => setOpen(false)}>
          {cta.label}
        </Link>
      </div>
    </header>
  )
}
