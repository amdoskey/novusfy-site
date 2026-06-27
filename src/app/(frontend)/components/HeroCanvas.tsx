'use client'

import React, { useEffect, useRef } from 'react'

/* =========================================================
   HERO MOTION FIELD — "The Birth of Next"
   Canvas particle system, ported verbatim from the original
   script.js heroField() into a React effect. Calm, slow, premium.
   ========================================================= */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const CONFIG = {
      blue: [1, 6, 255],
      white: [210, 214, 255],
      cyan: [120, 200, 255],
      count: 150, // scaled by area below
      coreGlow: 0.55,
      rotate: 0.00018, // very slow global drift
      bloom: 0.6,
      gridGap: 46,
    }

    type Particle = {
      ang: number
      rad: number
      baseRad: number
      orbit: number
      breathe: number
      breatheSpd: number
      size: number
      twk: number
      tone: number
      depth: number
    }

    let w = 0,
      h = 0,
      cx = 0,
      cy = 0,
      dpr = 1,
      particles: Particle[] = [],
      t = 0,
      raf: number | null = null

    function seed() {
      // density scales with viewport area, capped for perf
      const target = Math.min(260, Math.round((w * h) / 9000))
      particles = []
      for (let i = 0; i < target; i++) {
        const ang = Math.random() * Math.PI * 2
        const rad = Math.pow(Math.random(), 0.7) * Math.max(w, h) * 0.55
        particles.push({
          ang,
          rad,
          baseRad: rad,
          orbit: (Math.random() * 0.4 + 0.2) * (Math.random() < 0.5 ? -1 : 1),
          breathe: Math.random() * Math.PI * 2,
          breatheSpd: 0.004 + Math.random() * 0.006,
          size: Math.random() * 1.6 + 0.5,
          twk: Math.random() * Math.PI * 2,
          tone: Math.random(), // 0..1 blends white->blue->cyan
          depth: Math.random() * 0.7 + 0.3,
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
      // mostly blue/white with rare faint cyan
      if (tone > 0.86) return mix(CONFIG.white, CONFIG.cyan, (tone - 0.86) / 0.14)
      return mix(CONFIG.white, CONFIG.blue, tone / 0.86)
    }

    function drawGrid() {
      ctx!.save()
      ctx!.globalAlpha = 0.05
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

    function drawCore() {
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.012)
      const r = Math.min(w, h) * 0.16 * (0.85 + pulse * 0.25)
      const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r)
      g.addColorStop(0, `rgba(120,150,255,${0.22 * CONFIG.coreGlow * (0.7 + pulse * 0.5)})`)
      g.addColorStop(0.4, `rgba(1,6,255,${0.14 * CONFIG.coreGlow})`)
      g.addColorStop(1, 'rgba(1,6,255,0)')
      ctx!.fillStyle = g
      ctx!.fillRect(cx - r, cy - r, r * 2, r * 2)
      // bright seed point
      const cr = 2.2 + pulse * 1.6
      const cg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, cr * 6)
      cg.addColorStop(0, 'rgba(255,255,255,0.9)')
      cg.addColorStop(0.5, 'rgba(180,190,255,0.4)')
      cg.addColorStop(1, 'rgba(180,190,255,0)')
      ctx!.fillStyle = cg
      ctx!.beginPath()
      ctx!.arc(cx, cy, cr * 6, 0, Math.PI * 2)
      ctx!.fill()
    }

    function frame() {
      t += 1
      ctx!.clearRect(0, 0, w, h)
      ctx!.globalCompositeOperation = 'source-over'
      drawGrid()
      drawCore()

      ctx!.globalCompositeOperation = 'lighter'
      for (const p of particles) {
        p.breathe += p.breatheSpd
        p.ang += CONFIG.rotate * p.orbit * 60
        const breath = Math.sin(p.breathe) * CONFIG.bloom * 26
        const rad = p.baseRad + breath
        const x = cx + Math.cos(p.ang) * rad
        const y = cy + Math.sin(p.ang) * rad * 0.78 // slight vertical compression
        p.twk += 0.03
        const tw = 0.55 + 0.45 * Math.sin(p.twk)
        const [r, g, b] = colorFor(p.tone)
        const alpha = tw * p.depth * 0.85
        const size = p.size * (0.8 + p.depth * 0.6)

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
          ctx!.lineTo(cx, cy)
          ctx!.stroke()
        }
      }
      ctx!.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (!raf) frame()
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

    let io: IntersectionObserver | null = null

    if (reduce) {
      // static single render — calm, no motion
      drawGrid()
      drawCore()
      for (const p of particles) {
        const x = cx + Math.cos(p.ang) * p.baseRad
        const y = cy + Math.sin(p.ang) * p.baseRad * 0.78
        const [r, g, b] = colorFor(p.tone)
        ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.5 * p.depth})`
        ctx!.beginPath()
        ctx!.arc(x, y, p.size, 0, Math.PI * 2)
        ctx!.fill()
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
      if (io) io.disconnect()
    }
  }, [])

  return <canvas className="herox__canvas" id="heroCanvas" aria-hidden="true" ref={canvasRef} />
}
