'use client'

import { useEffect } from 'react'

/*
  Pointer micro-interactions (Stage 3), delegated + rAF-throttled:
  - Magnetic primary buttons: ease 2–4px toward the cursor via --mx/--my
    (the button's own transform transition provides the spring-back).
  - Cards: cursor-following inner highlight via --px/--py consumed by a
    radial-gradient ::after in CSS.
  Mouse-only; skipped on touch and under prefers-reduced-motion.
*/
const CARD_SEL =
  '.pillar,.nextcard,.learn-card,.cat,.course,.svc-card,.tile,.why__cell,.mv__card,.office'

export default function Interactions() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce || !fine) return

    let raf = 0
    let lastEvent: PointerEvent | null = null

    const apply = () => {
      raf = 0
      const e = lastEvent
      if (!e) return
      const t = e.target as Element | null

      const card = t?.closest?.(CARD_SEL) as HTMLElement | null
      if (card) {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--px', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
        card.style.setProperty('--py', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
      }

      const btn = t?.closest?.('.btn--solid') as HTMLElement | null
      if (btn) {
        const r = btn.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        btn.style.setProperty('--mx', `${Math.max(-4, Math.min(4, dx * 0.12)).toFixed(1)}px`)
        btn.style.setProperty('--my', `${Math.max(-3, Math.min(3, dy * 0.2)).toFixed(1)}px`)
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      lastEvent = e
      if (!raf) raf = requestAnimationFrame(apply)
    }

    // Spring the magnet back when the cursor leaves a button.
    const onOut = (e: PointerEvent) => {
      const btn = (e.target as Element)?.closest?.('.btn--solid') as HTMLElement | null
      if (btn && !(e.relatedTarget instanceof Node && btn.contains(e.relatedTarget))) {
        btn.style.setProperty('--mx', '0px')
        btn.style.setProperty('--my', '0px')
      }
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut, true)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut, true)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
