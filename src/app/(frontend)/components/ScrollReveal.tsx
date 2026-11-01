'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/*
  Staggered scroll-reveal (Stage 1b).
  - Group containers stagger their direct children by 70ms.
  - Section heads compose in: label -> title (+100ms) -> lede (+220ms).
  Elements are hidden with .rv and revealed with .rv-in — once revealed,
  never re-hidden. Skipped entirely under prefers-reduced-motion.
*/
const GROUPS = [
  '.nextkind__grid',
  '.pillars__grid',
  '.method__steps',
  '.learn-cards',
  '.why__grid',
  '.cats__grid',
  '.courses__grid',
  '.format__grid',
  '.svc__grid',
  '.flow',
  '.mv',
  '.offices__grid',
  '.final-cta__card',
  '.waitlist__card',
  '.contact__grid',
  '.story__grid',
  '.founder__card',
]

const HEADS = ['.sec-head', '.method__head', '.pillars__head']

// .stitch gets a draw-in (clip-path) via its own .rv/.rv-in CSS rules.
const SINGLES = [
  '.method__cta',
  '.learn-preview__intro',
  '.philosophy__quote',
  '.philosophy__by',
  '.stitch',
]

const STAGGER = 70

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return

    const onIntersect = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('rv-in')
          obs.unobserve(e.target)
        }
      })
    }
    const io = new IntersectionObserver(onIntersect, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    })
    // Hairline elements (1px stitches) never reach a 0.12 ratio — observe at 0.
    const ioThin = new IntersectionObserver(onIntersect, {
      threshold: 0,
      rootMargin: '0px 0px -40px 0px',
    })

    const prepped: HTMLElement[] = []
    const prep = (el: Element | null, delay: number) => {
      if (!(el instanceof HTMLElement)) return
      if (el.classList.contains('rv') || el.classList.contains('rv-in')) return
      el.classList.add('rv')
      el.style.setProperty('--rv-delay', `${delay}ms`)
      ;(el.offsetHeight <= 2 ? ioThin : io).observe(el)
      prepped.push(el)
    }

    // Heads first so their inner text isn't re-prepped as group children.
    document.querySelectorAll(HEADS.join(',')).forEach((head) => {
      head.querySelectorAll('.label, h1, h2, .sec-lede').forEach((el) => {
        if (el.matches('.label')) prep(el, 0)
        else if (el.matches('h1,h2')) prep(el, 100)
        else prep(el, 220)
      })
    })

    document.querySelectorAll(GROUPS.join(',')).forEach((group) => {
      Array.from(group.children).forEach((child, i) => prep(child, Math.min(i, 7) * STAGGER))
    })

    document.querySelectorAll(SINGLES.join(',')).forEach((el) => prep(el, 0))


    return () => {
      io.disconnect()
      ioThin.disconnect()
      prepped.forEach((el) => {
        el.classList.remove('rv', 'rv-in')
        el.style.removeProperty('--rv-delay')
      })
    }
  }, [pathname])

  return null
}
