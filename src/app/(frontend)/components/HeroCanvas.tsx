'use client'

import React, { useEffect, useRef } from 'react'

/* =========================================================
   HERO MOTION FIELD — "The Birth of Next"
   Canvas particle system. Calm, slow, premium.
   Stage 2 additions: 3 depth bands, lerped mouse parallax,
   sparse constellation lines, 1.6s birth intro, scroll-hint
   fade + layered parallax exit. All gated on reduced-motion.
   ========================================================= */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    const CONFIG = {
      blue: [1, 6, 255],
      white: [210, 214, 255],
      cyan: [120, 200, 255],
      coreGlow: 0.55,
      rotate: 0.00018, // very slow global drift
      bloom: 0.6,
      gridGap: 46,
      introMs: 1600, // one-time birth bloom
      linkAlpha: 0.07, // constellation hairlines (≤0.08 per spec)
      maxLinks: 30,
      parallax: 12, // max px shift opposite the cursor
    }

    type Particle = {
      ang: number
      baseRad: number
      orbit: number
      breathe: number
      breatheSpd: number
      size: number
      twk: number
      tone: number
      depth: number
      band: number // quantized depth band: 0.45 | 0.8 | 1.25
    }

    let w = 0,
      h = 0,
      cx = 0,
      cy = 0,
      dpr = 1,
      particles: Particle[] = [],
      t = 0,
      raf: number | null = null,
      born = 0 // performance.now() at first frame; drives the intro

    // Mouse parallax — lerped targets, "gravity, not tracking"
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0

    // Positions captured each frame for constellation pass
    const px: number[] = []
    const py: number[] = []

    function seed() {
      const target = Math.min(260, Math.round((w * h) / 9000))
      particles = []
      for (let i = 0; i < target; i++) {
        const ang = Math.random() * Math.PI * 2
        const rad = Math.pow(Math.random(), 0.7) * Math.max(w, h) * 0.55
        const depth = Math.random() * 0.7 + 0.3
        particles.push({
          ang,
          baseRad: rad,
          orbit: (Math.random() * 0.4 + 0.2) * (Math.random() < 0.5 ? -1 : 1),
          breathe: Math.random() * Math.PI * 2,
          breatheSpd: 0.004 + Math.random() * 0.006,
          size: Math.random() * 1.6 + 0.5,
          twk: Math.random() * Math.PI * 2,
          tone: Math.random(),
          depth,
          // three bands: far = small/dim/slow, near = large/bright/mobile
          band: depth < 0.55 ? 0.45 : depth < 0.82 ? 0.8 : 1.25,
        })
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas!.clientWidth
      h = canvas!.clientHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = w / 2
      cy = h * 0.4
      seed()
    }

    function mix(a: number[], b: number[], p: number) {
      return [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p]
    }
    function colorFor(tone: number) {
      if (tone > 0.86) return mix(CONFIG.white, CONFIG.cyan, (tone - 0.86) / 0.14)
      return mix(CONFIG.white, CONFIG.blue, tone / 0.86)
    }

    function drawGrid(intro: number) {
      ctx!.save()
      ctx!.globalAlpha = 0.05 * intro
      ctx!.strokeStyle = 'rgba(120,140,255,1)'
      ctx!.lineWidth = 1
      const gap = CONFIG.gridGap
      for (let x = gap; x < w; x += gap) {
        ctx!.beginPath()
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, h)
        ctx!.stroke()
      }
      for (let y = gap; y < h; y += gap) {
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(w, y)
        ctx!.stroke()
      }
      ctx!.restore()
    }

    function drawCore(intro: number) {
      const ccx = cx + mx * 0.35
      const ccy = cy + my * 0.35
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.012)
      const r = Math.min(w, h) * 0.16 * (0.85 + pulse * 0.25) * intro
      if (r <= 0) return
      const g = ctx!.createRadialGradient(ccx, ccy, 0, ccx, ccy, r)
      g.addColorStop(0, `rgba(120,150,255,${0.22 * CONFIG.coreGlow * (0.7 + pulse * 0.5) * intro})`)
      g.addColorStop(0.4, `rgba(1,6,255,${0.14 * CONFIG.coreGlow * intro})`)
      g.addColorStop(1, 'rgba(1,6,255,0)')
      ctx!.fillStyle = g
      ctx!.fillRect(ccx - r, ccy - r, r * 2, r * 2)
      const cr = (2.2 + pulse * 1.6) * intro
      const cg = ctx!.createRadialGradient(ccx, ccy, 0, ccx, ccy, cr * 6)
      cg.addColorStop(0, `rgba(255,255,255,${0.9 * intro})`)
      cg.addColorStop(0.5, `rgba(180,190,255,${0.4 * intro})`)
      cg.addColorStop(1, 'rgba(180,190,255,0)')
      ctx!.fillStyle = cg
      ctx!.beginPath()
      ctx!.arc(ccx, ccy, cr * 6, 0, Math.PI * 2)
      ctx!.fill()
    }

    function frame(now: number) {
      t += 1
      if (!born) born = now
      // one-time birth bloom, eased; 1 forever after
      const k = Math.min(1, (now - born) / CONFIG.introMs)
      const intro = 1 - Math.pow(1 - k, 3)

      // lerp the parallax toward its target — slow, like gravity
      mx += (tx - mx) * 0.04
      my += (ty - my) * 0.04

      ctx!.clearRect(0, 0, w, h)
      ctx!.globalCompositeOperation = 'source-over'
      drawGrid(intro)
      drawCore(intro)

      ctx!.globalCompositeOperation = 'lighter'
      px.length = 0
      py.length = 0
      const ccx = cx + mx * 0.35
      const ccy = cy + my * 0.35
      for (const p of particles) {
        p.breathe += p.breatheSpd
        // near bands drift slightly faster (depth harder)
        p.ang += CONFIG.rotate * p.orbit * 60 * (0.55 + p.band * 0.6)
        const breath = Math.sin(p.breathe) * CONFIG.bloom * 26
        const rad = p.baseRad + breath
        const x = cx + Math.cos(p.ang) * rad + mx * p.band
        const y = cy + Math.sin(p.ang) * rad * 0.78 + my * p.band
        px.push(x)
        py.push(y)
        p.twk += 0.03
        const tw = 0.55 + 0.45 * Math.sin(p.twk)
        const [r, g, b] = colorFor(p.tone)
        const alpha = Math.min(1, tw * p.band * 0.72) * intro
        const size = p.size * (0.5 + p.band * 0.85)

        const grad = ctx!.createRadialGradient(x, y, 0, x, y, size * 4)
        grad.addColorStop(0, `rgba(${r | 0},${g | 0},${b | 0},${alpha})`)
        grad.addColorStop(1, `rgba(${r | 0},${g | 0},${b | 0},0)`)
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(x, y, size * 4, 0, Math.PI * 2)
        ctx!.fill()

        // faint connecting filament to core for nearby particles
        if (p.baseRad < Math.max(w, h) * 0.22) {
          ctx!.strokeStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha * 0.12})`
          ctx!.lineWidth = 0.6
          ctx!.beginPath()
          ctx!.moveTo(x, y)
          ctx!.lineTo(ccx, ccy)
          ctx!.stroke()
        }
      }

      // Constellation pass — sparse hairlines between near neighbours.
      // Windowed scan keeps it O(n·10); capped per frame.
      const linkDist = Math.min(w, h) * 0.1
      let links = 0
      ctx!.lineWidth = 0.5
      outer: for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < Math.min(i + 11, particles.length); j++) {
          const dx = px[i] - px[j]
          const dy = py[i] - py[j]
          const d2 = dx * dx + dy * dy
          if (d2 < linkDist * linkDist) {
            const fade = 1 - Math.sqrt(d2) / linkDist
            const a = CONFIG.linkAlpha * fade * particles[i].band * 0.8 * intro
            ctx!.strokeStyle = `rgba(150,165,255,${a})`
            ctx!.beginPath()
            ctx!.moveTo(px[i], py[i])
            ctx!.lineTo(px[j], py[j])
            ctx!.stroke()
            if (++links >= CONFIG.maxLinks) break outer
          }
        }
      }

      ctx!.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (!raf) raf = requestAnimationFrame(frame)
    }
    function stop() {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    // Mouse parallax — fine pointers only, shifts opposite the cursor.
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / w - 0.5) * -2 * CONFIG.parallax
      ty = (e.clientY / h - 0.5) * -2 * CONFIG.parallax * 0.66
    }
    if (!reduce && finePointer) window.addEventListener('pointermove', onPointer, { passive: true })

    // Scroll: fade the hint, layer the exit (content ~0.85x, canvas ~0.6x).
    const content = document.querySelector<HTMLElement>('.herox__content')
    const hint = document.querySelector<HTMLElement>('.herox__scroll')
    let scrollRaf = 0
    const onScroll = () => {
      if (scrollRaf) return
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0
        const y = window.scrollY
        if (y < h * 1.3) {
          if (content) content.style.transform = `translate3d(0,${(y * 0.15).toFixed(1)}px,0)`
          canvas!.style.transform = `translate3d(0,${(y * 0.4).toFixed(1)}px,0)`
        }
        if (hint) hint.classList.toggle('is-hidden', y > 40)
      })
    }
    if (!reduce) window.addEventListener('scroll', onScroll, { passive: true })

    let io: IntersectionObserver | null = null

    if (reduce) {
      // static single render — calm, no motion, no intro
      drawGrid(1)
      drawCore(1)
      for (const p of particles) {
        const x = cx + Math.cos(p.ang) * p.baseRad
        const y = cy + Math.sin(p.ang) * p.baseRad * 0.78
        const [r, g, b] = colorFor(p.tone)
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.5 * p.depth})`
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    } else {
      // pause when hero off-screen to save battery
      io = new IntersectionObserver(
        (e) => {
          e.forEach((en) => (en.isIntersecting ? start() : stop()))
        },
        { threshold: 0.05 },
      )
      io.observe(canvas)
      start()
    }

    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      if (scrollRaf) cancelAnimationFrame(scrollRaf)
      if (io) io.disconnect()
      if (content) content.style.removeProperty('transform')
      canvas.style.removeProperty('transform')
    }
  }, [])

  return <canvas className="herox__canvas" id="heroCanvas" aria-hidden="true" ref={canvasRef} />
}
