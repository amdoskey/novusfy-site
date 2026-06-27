'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Port of the IntersectionObserver scroll-reveal from the original script.js.
// Runs on every route change so newly mounted sections animate in. Respects
// prefers-reduced-motion.
const SELECTOR =
  '.pillar,.step,.case,.svc-card,.cat,.course,.flow__step,.fstep,.mv__card,.why__cell,.format__item,.topic-rail li,.nextcard,.learn-card,.mstep'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return

    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
    targets.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
      el.style.transition =
        'opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1)'
      el.style.transitionDelay = (i % 6) * 60 + 'ms'
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'none'
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    targets.forEach((t) => io.observe(t))

    return () => io.disconnect()
  }, [pathname])

  return null
}
