// Mobile menu toggle
const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  });
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    })
  );
}

// Scroll reveal (respects reduced motion)
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll(
    '.pillar,.step,.case,.svc-card,.cat,.course,.flow__step,.mv__card,.why__cell,.format__item,.topic-rail li'
  );
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1)';
    el.style.transitionDelay = (i % 6) * 60 + 'ms';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(t => io.observe(t));
}

// Waitlist form (demo, no backend)
const wlForm = document.getElementById('waitlistForm');
if (wlForm) {
  wlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = wlForm.querySelector('button[type="submit"]');
    btn.textContent = "You're on the list ✓";
    btn.disabled = true;
    wlForm.querySelectorAll('input,select').forEach(f => (f.disabled = true));
  });
}

/* =========================================================
   HERO MOTION FIELD — "The Birth of Next"
   Vanilla canvas particle system. Calm, slow, premium.
   Structured to later port to React Three Fiber / Three.js:
   - config block = uniforms/props
   - particle array = instanced points
   - draw loop = frame shader equivalent
   ========================================================= */
(function heroField(){
  const canvas = document.getElementById('heroCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CONFIG = {
    blue:[1,6,255],
    white:[210,214,255],
    cyan:[120,200,255],
    count: 150,        // scaled by area below
    coreGlow: 0.55,
    rotate: 0.00018,   // very slow global drift
    bloom: 0.6,
    gridGap: 46,
  };

  let w, h, cx, cy, dpr, particles = [], t = 0, raf;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    cx = w/2; cy = h*0.40;
    seed();
  }

  function seed(){
    // density scales with viewport area, capped for perf
    const target = Math.min(260, Math.round((w*h)/9000));
    particles = [];
    for(let i=0;i<target;i++){
      const ang = Math.random()*Math.PI*2;
      const rad = Math.pow(Math.random(),0.7) * Math.max(w,h)*0.55;
      particles.push({
        ang,
        rad,
        baseRad: rad,
        // each particle slowly orbits + breathes toward/away from core
        orbit: (Math.random()*0.4+0.2) * (Math.random()<0.5?-1:1),
        breathe: Math.random()*Math.PI*2,
        breatheSpd: 0.004 + Math.random()*0.006,
        size: Math.random()*1.6 + 0.5,
        twk: Math.random()*Math.PI*2,
        tone: Math.random(),        // 0..1 blends white->blue->cyan
        depth: Math.random()*0.7+0.3
      });
    }
  }

  function mix(a,b,p){return [a[0]+(b[0]-a[0])*p,a[1]+(b[1]-a[1])*p,a[2]+(b[2]-a[2])*p];}
  function colorFor(tone){
    // mostly blue/white with rare faint cyan
    if(tone>0.86) return mix(CONFIG.white,CONFIG.cyan,(tone-0.86)/0.14);
    return mix(CONFIG.white,CONFIG.blue,tone/0.86);
  }

  function drawGrid(){
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = 'rgba(120,140,255,1)';
    ctx.lineWidth = 1;
    const gap = CONFIG.gridGap;
    // faint perspective-ish blueprint lines converging toward core
    for(let x=gap; x<w; x+=gap){
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke();
    }
    for(let y=gap; y<h; y+=gap){
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke();
    }
    ctx.restore();
  }

  function drawCore(){
    const pulse = 0.5 + 0.5*Math.sin(t*0.012);
    const r = (Math.min(w,h)*0.16) * (0.85 + pulse*0.25);
    const g = ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    g.addColorStop(0,`rgba(120,150,255,${0.22*CONFIG.coreGlow*(0.7+pulse*0.5)})`);
    g.addColorStop(0.4,`rgba(1,6,255,${0.14*CONFIG.coreGlow})`);
    g.addColorStop(1,'rgba(1,6,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(cx-r,cy-r,r*2,r*2);
    // bright seed point
    const cr = 2.2 + pulse*1.6;
    const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,cr*6);
    cg.addColorStop(0,'rgba(255,255,255,0.9)');
    cg.addColorStop(0.5,'rgba(180,190,255,0.4)');
    cg.addColorStop(1,'rgba(180,190,255,0)');
    ctx.fillStyle = cg;
    ctx.beginPath(); ctx.arc(cx,cy,cr*6,0,Math.PI*2); ctx.fill();
  }

  function frame(){
    t += 1;
    ctx.clearRect(0,0,w,h);
    ctx.globalCompositeOperation = 'source-over';
    drawGrid();
    drawCore();

    ctx.globalCompositeOperation = 'lighter';
    for(const p of particles){
      p.breathe += p.breatheSpd;
      p.ang += CONFIG.rotate * p.orbit * 60;
      // breathing radius — slow bloom toward and away from the core
      const breath = Math.sin(p.breathe) * CONFIG.bloom * 26;
      const rad = p.baseRad + breath;
      const x = cx + Math.cos(p.ang)*rad;
      const y = cy + Math.sin(p.ang)*rad*0.78; // slight vertical compression
      p.twk += 0.03;
      const tw = 0.55 + 0.45*Math.sin(p.twk);
      const [r,g,b] = colorFor(p.tone);
      const alpha = tw * p.depth * 0.85;
      const size = p.size * (0.8 + p.depth*0.6);

      const grad = ctx.createRadialGradient(x,y,0,x,y,size*4);
      grad.addColorStop(0,`rgba(${r|0},${g|0},${b|0},${alpha})`);
      grad.addColorStop(1,`rgba(${r|0},${g|0},${b|0},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(x,y,size*4,0,Math.PI*2); ctx.fill();

      // faint connecting filament to core for nearby particles
      if(p.baseRad < Math.max(w,h)*0.22){
        ctx.strokeStyle = `rgba(${r|0},${g|0},${b|0},${alpha*0.12})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(cx,cy); ctx.stroke();
      }
    }
    ctx.globalCompositeOperation = 'source-over';
    raf = requestAnimationFrame(frame);
  }

  function start(){ if(!raf) frame(); }
  function stop(){ if(raf){cancelAnimationFrame(raf); raf=null;} }

  resize();
  window.addEventListener('resize', () => { resize(); });

  if(reduce){
    // static single render — calm, no motion
    drawGrid(); drawCore();
    for(const p of particles){
      const x = cx + Math.cos(p.ang)*p.baseRad;
      const y = cy + Math.sin(p.ang)*p.baseRad*0.78;
      const [r,g,b] = colorFor(p.tone);
      ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${0.5*p.depth})`;
      ctx.beginPath(); ctx.arc(x,y,p.size,0,Math.PI*2); ctx.fill();
    }
  } else {
    // pause when hero off-screen to save battery
    const io = new IntersectionObserver((e)=>{
      e.forEach(en => en.isIntersecting ? start() : stop());
    },{threshold:0.05});
    io.observe(canvas);
    start();
  }
})();

/* nav solidifies once scrolled past hero */
(function stickyNav(){
  const nav = document.getElementById('nav');
  if(!nav || document.body.getAttribute('data-hero')!=='dark') return;
  const onScroll = () => {
    if(window.scrollY > window.innerHeight*0.7) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();
