import { useEffect, useRef, useState } from 'react'
import {
  profile,
  techMarquee,
  bento,
  specializations,
  skillGroups,
  experience,
  journey,
  family,
  values,
  gallery,
  nav,
} from './data'

/* ============================================================
   SIGNATURE: root-to-circuit canvas
   Luminous filaments grow upward from a soil line and terminate
   in circuit nodes — heritage roots becoming generative circuitry.
============================================================ */
function RootCircuit() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1

    type Node = { x: number; y: number }
    type Branch = { pts: Node[]; delay: number; nodeAt: number[] }
    let branches: Branch[] = []

    // Deterministic-ish PRNG so the composition is stable per size
    function build() {
      const rect = canvas!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      branches = []
      const soil = h * 0.98
      const count = Math.max(5, Math.min(9, Math.round(w / 150)))
      for (let i = 0; i < count; i++) {
        const startX = (w / (count + 1)) * (i + 1) + (Math.sin(i * 12.9) * w) / 40
        const pts: Node[] = [{ x: startX, y: soil }]
        const nodeAt: number[] = []
        const steps = 5 + (i % 3)
        const targetY = h * (0.18 + ((i * 0.11) % 0.4))
        let x = startX
        let y = soil
        for (let s = 1; s <= steps; s++) {
          const t = s / steps
          y = soil + (targetY - soil) * t
          const sway = Math.sin(i * 3.1 + s * 1.7) * (w / 22) * (1 - t * 0.4)
          x = startX + sway + (i - count / 2) * 6 * t
          pts.push({ x, y })
          if (s >= 2 && s % 2 === 0) nodeAt.push(s)
        }
        nodeAt.push(steps)
        branches.push({ pts, delay: i * 0.06, nodeAt })
      }
    }

    function stroke(pts: Node[], upto: number) {
      ctx!.beginPath()
      ctx!.moveTo(pts[0].x, pts[0].y)
      const seg = upto * (pts.length - 1)
      const full = Math.floor(seg)
      for (let k = 1; k <= full && k < pts.length; k++) ctx!.lineTo(pts[k].x, pts[k].y)
      const frac = seg - full
      if (full < pts.length - 1 && frac > 0) {
        const a = pts[full]
        const b = pts[full + 1]
        ctx!.lineTo(a.x + (b.x - a.x) * frac, a.y + (b.y - a.y) * frac)
      }
      ctx!.stroke()
    }

    const start = performance.now()
    function frame(now: number) {
      const elapsed = (now - start) / 1000
      ctx!.clearRect(0, 0, w, h)

      for (const br of branches) {
        const local = reduce ? 1 : Math.max(0, Math.min(1, (elapsed - br.delay) / 2.2))
        if (local <= 0) continue

        // filament — warm gold, faint
        const grad = ctx!.createLinearGradient(0, h, 0, 0)
        grad.addColorStop(0, 'rgba(184,102,58,0.0)')
        grad.addColorStop(0.35, 'rgba(201,146,58,0.35)')
        grad.addColorStop(1, 'rgba(240,212,146,0.5)')
        ctx!.strokeStyle = grad
        ctx!.lineWidth = 1.1
        ctx!.lineCap = 'round'
        ctx!.lineJoin = 'round'
        stroke(br.pts, local)

        // circuit nodes light up as growth passes them; subtle breathing
        for (const ni of br.nodeAt) {
          const reach = ni / (br.pts.length - 1)
          if (local < reach) continue
          const p = br.pts[ni]
          const breathe = reduce ? 0.7 : 0.5 + 0.5 * Math.sin(now / 700 + p.x)
          const r = 1.6 + breathe * 1.4
          ctx!.beginPath()
          ctx!.arc(p.x, p.y, r, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(228,183,91,${0.35 + breathe * 0.4})`
          ctx!.shadowBlur = 10
          ctx!.shadowColor = 'rgba(228,183,91,0.6)'
          ctx!.fill()
          ctx!.shadowBlur = 0
        }
        // a cool "lumen" spark at the growing tip while animating
        if (!reduce && local < 1) {
          const seg = local * (br.pts.length - 1)
          const fi = Math.floor(seg)
          const a = br.pts[Math.min(fi, br.pts.length - 1)]
          const b = br.pts[Math.min(fi + 1, br.pts.length - 1)]
          const fr = seg - fi
          const tx = a.x + (b.x - a.x) * fr
          const ty = a.y + (b.y - a.y) * fr
          ctx!.beginPath()
          ctx!.arc(tx, ty, 2.4, 0, Math.PI * 2)
          ctx!.fillStyle = 'rgba(127,233,206,0.9)'
          ctx!.shadowBlur = 12
          ctx!.shadowColor = 'rgba(127,233,206,0.8)'
          ctx!.fill()
          ctx!.shadowBlur = 0
        }
      }

      if (!reduce) raf = requestAnimationFrame(frame)
    }

    build()
    raf = requestAnimationFrame(frame)
    if (reduce) {
      // draw one static full frame
      cancelAnimationFrame(raf)
      frame(start + 5000)
    }

    let rt = 0
    const onResize = () => {
      clearTimeout(rt)
      rt = window.setTimeout(() => {
        build()
        if (reduce) frame(start + 5000)
      }, 180)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      clearTimeout(rt)
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}

/* ---------- hooks ---------- */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -50px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('pks2-theme')
    return saved === 'light' ? 'light' : 'dark'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pks2-theme', theme)
  }, [theme])
  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }
}

function useScrolled() {
  const [s, setS] = useState(false)
  useEffect(() => {
    const on = () => setS(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return s
}

/* magnetic pull for the portrait */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height
      el.style.transform = `perspective(900px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-2px)`
    }
    const reset = () => {
      el.style.transform = ''
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', reset)
    }
  }, [])
  return ref
}

/* ---------- sections ---------- */
function Nav({ theme, toggle }: { theme: string; toggle: () => void }) {
  const scrolled = useScrolled()
  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#home" className="brand">
        <span className="mono">{profile.initial}</span>
        <span className="full">{profile.name}</span>
      </a>
      <div className="nav-links">
        {nav.map((n) => (
          <a href={`#${n.id}`} key={n.id}>
            {n.label}
          </a>
        ))}
      </div>
      <div className="nav-actions">
        <button className="tog" onClick={toggle} aria-label="Toggle theme">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <a href="#contact" className="btn btn-primary">
          Say hello
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  const tilt = useTilt()
  return (
    <header className="hero" id="home">
      <RootCircuit />
      <div className="hero-soil" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-status reveal">
              <span className="pulse" /> {profile.availability} · {profile.location}
            </span>
            <h1 className="reveal d1">
              <span className="first">{profile.firstName}</span>
              <span className="last">{profile.lastName}</span>
            </h1>
            <div className="hero-role reveal d2">
              <span>Software Developer</span>
              <span className="sep" />
              <span>Generative AI Engineer</span>
            </div>
            <p className="hero-tagline reveal d2">{profile.tagline}</p>
            <div className="hero-cta reveal d3">
              <a href="#contact" className="btn btn-primary">
                Start a conversation
              </a>
              <a href="#experience" className="btn btn-ghost">
                See the work
              </a>
            </div>
          </div>
          <div className="hero-portrait reveal d2">
            <div className="portrait-shell" ref={tilt}>
              <span className="portrait-orbit">◇ gen · ai</span>
              <img src={profile.heroImage} alt={profile.name} />
              <span className="portrait-chip">
                <span className="star">✦</span> {profile.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function Marquee() {
  const items = [...techMarquee, ...techMarquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">About</span>
          <h2 className="section-title">
            Values, discipline &amp; <em>technology</em>
          </h2>
        </div>
        <div className="about-grid">
          <div className="about-body reveal d1">
            <p className="lead">
              I come from a humble agricultural family in Andhra Pradesh, and turned a fascination
              with technology into a career building Generative AI and enterprise software.
            </p>
            <p>
              Today I work as a Software &amp; Generative AI Developer at{' '}
              <b style={{ color: 'var(--gold)' }}>Ajuserv IT Solutions, Hyderabad</b>, where I design
              AI-powered applications — intelligent assistants, RAG systems, and clean Python
              backends that hold up in production.
            </p>
            <p>
              I believe technology grounded in honesty and hard work can genuinely serve people — the
              same principles I learned growing up in a farming household.
            </p>
            <div className="about-quote reveal d2">
              Despite a traditional rural farming background, I pursued engineering with dedication
              and built a career in modern AI and enterprise systems.
            </div>
          </div>
          <aside className="about-spec panel reveal d2">
            <h4>// areas of specialization</h4>
            <div className="spec-tags">
              {specializations.map((s) => (
                <span className="spec-tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Glance() {
  return (
    <section className="section" id="glance">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Profile</span>
          <h2 className="section-title">At a glance</h2>
          <p className="section-lead">
            The essentials — presented with clarity and respect for a thoughtful introduction.
          </p>
        </div>
        <div className="bento">
          <div className="tile feature reveal">
            <span className="halo" aria-hidden="true" />
            <span className="t-label">{bento.focus.label}</span>
            <div>
              <div className="t-value">{bento.focus.value}</div>
              <span className="t-note">{bento.focus.note}</span>
            </div>
          </div>
          <div className="tile reveal d1">
            <span className="t-label">{bento.education.label}</span>
            <div>
              <div className="t-value md">{bento.education.value}</div>
              <span className="t-note">{bento.education.note}</span>
            </div>
          </div>
          <div className="tile reveal d1">
            <span className="t-label">{bento.income.label}</span>
            <div className="t-value md">{bento.income.value}</div>
          </div>
          <div className="tile wide reveal d2">
            <span className="t-label">{bento.role.label}</span>
            <div>
              <div className="t-value sm">{bento.role.value}</div>
              <span className="t-note">{bento.role.note}</span>
            </div>
          </div>
          <div className="tile reveal d2">
            <span className="t-label">{bento.location.label}</span>
            <div className="t-value md">{bento.location.value}</div>
          </div>
          <div className="tile wide reveal">
            <span className="t-label">{bento.languages.label}</span>
            <div className="lang-row">
              {(bento.languages.value as string[]).map((l) => (
                <span className="lang" key={l}>
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="tile wide reveal d1">
            <span className="t-label">{bento.roots.label}</span>
            <div>
              <div className="t-value sm">{bento.roots.value}</div>
              <span className="t-note">{bento.roots.note}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Work</span>
          <h2 className="section-title">
            Where technology meets <em>purpose</em>
          </h2>
        </div>
        <div className="exp-card panel reveal d1">
          <div className="exp-mark">A</div>
          <div>
            <div className="exp-head">
              <div>
                <div className="exp-role">{experience.role}</div>
                <div className="exp-co">{experience.company}</div>
                <div className="exp-loc">◎ {experience.location}</div>
              </div>
              <span className="exp-badge">● {experience.period}</span>
            </div>
            <ul className="exp-list">
              {experience.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Skills</span>
          <h2 className="section-title">Tools &amp; technologies</h2>
          <p className="section-lead">
            A modern stack spanning backend engineering, generative AI, and cloud.
          </p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <div className={`skill-group reveal${i % 2 ? ' d1' : ''}`} key={g.label}>
              <h4>{g.label}</h4>
              <div className="chips">
                {g.items.map((it) => (
                  <span className="chip" key={it}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section className="section" id="journey">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Journey</span>
          <h2 className="section-title">
            From the fields to the <em>frontier</em>
          </h2>
        </div>
        <div className="timeline">
          {journey.map((j, i) => (
            <div className="tl reveal" key={j.title}>
              <div className="tl-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="tl-card">
                <div className="tl-year">{j.year}</div>
                <h4>{j.title}</h4>
                <p>{j.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Family() {
  return (
    <section className="section" id="family">
      <div className="wrap">
        <div className="section-head reveal" style={{ maxWidth: 'none', textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Family
          </span>
          <h2 className="section-title">Rooted in a respected family</h2>
        </div>
        <p className="family-statement reveal d1">
          “A respected agricultural family, rooted in simplicity, strong cultural values, mutual
          respect, and education.”
        </p>
        <div className="fam-grid">
          {family.map((m, i) => (
            <div className={`fam-card reveal${i % 2 ? ' d1' : ''}`} key={m.rel + m.name}>
              <div className="fam-head">
                <div className={`fam-av${m.note ? ' late' : ''}`}>{m.name.charAt(0)}</div>
                <div>
                  <div className="fam-rel">{m.rel}</div>
                  <div className="fam-name">
                    {m.name} {m.note && <span className="late-tag">{m.note}</span>}
                  </div>
                </div>
              </div>
              <div className="fam-meta">
                {m.tel && (
                  <div className="row">
                    <b>Mobile</b>
                    <a href={`tel:${m.tel}`}>{m.tel}</a>
                  </div>
                )}
                {m.meta?.map((r) => (
                  <div className="row" key={r.k}>
                    <b>{r.k}</b>
                    <span>{r.v}</span>
                  </div>
                ))}
              </div>
              {m.children && (
                <div className="fam-kids">
                  <div className="k">Children</div>
                  <div className="kid-row">
                    {m.children.map((c) => (
                      <span className="kid" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="section" id="gallery">
      <div className="wrap">
        <div className="section-head reveal" style={{ maxWidth: 'none', textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Gallery
          </span>
          <h2 className="section-title">Moments &amp; portraits</h2>
        </div>
        <div className="gallery-grid">
          {gallery.map((g, i) => (
            <div className={`gal reveal${i % 2 ? ' d1' : ''}`} key={i}>
              <img src={g.src} alt={g.cap} loading="lazy" />
              <div className="gal-cap">{g.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section className="section" id="values">
      <div className="wrap">
        <div className="section-head reveal" style={{ maxWidth: 'none', textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Values
          </span>
          <h2 className="section-title">What I stand for</h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div className={`value reveal${['', ' d1', ' d2', ' d3'][i % 4]}`} key={v.h}>
              <div className="vi">{v.icon}</div>
              <h4>{v.h}</h4>
              <p>{v.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="contact-band reveal">
          <span className="halo" aria-hidden="true" />
          <div className="contact-grid">
            <div className="contact-lead">
              <span className="eyebrow">Contact</span>
              <h2 style={{ marginTop: 16 }}>Let’s talk.</h2>
              <p>For a respectful introduction or to know more, reach out anytime.</p>
              <a href={`tel:${profile.mobile}`} className="btn btn-primary">
                Call {profile.mobile}
              </a>
            </div>
            <div className="contact-rows">
              <div className="crow">
                <div className="ci">📱</div>
                <div>
                  <div className="cl">Personal mobile</div>
                  <a className="cv" href={`tel:${profile.mobile}`}>
                    {profile.mobile}
                  </a>
                </div>
              </div>
              <div className="crow">
                <div className="ci">👨</div>
                <div>
                  <div className="cl">Father’s contact</div>
                  <a className="cv" href={`tel:${profile.fatherMobile}`}>
                    {profile.fatherMobile}
                  </a>
                </div>
              </div>
              <div className="crow">
                <div className="ci">🏢</div>
                <div>
                  <div className="cl">Company</div>
                  <div className="cv">{profile.company}</div>
                </div>
              </div>
              <div className="crow">
                <div className="ci">🗺️</div>
                <div>
                  <div className="cl">Company address</div>
                  <div className="cv" style={{ fontWeight: 400 }}>
                    {profile.companyAddress}
                  </div>
                </div>
              </div>
              <div className="crow">
                <div className="ci">🏡</div>
                <div>
                  <div className="cl">Native place</div>
                  <div className="cv" style={{ fontWeight: 400 }}>
                    {profile.nativeAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = useRef(2026).current
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fm">{profile.initial}</div>
        <h3>{profile.name}</h3>
        <div className="fp">Rooted in values, driven by technology.</div>
        <div className="socials">
          <a href="#" aria-label="LinkedIn">
            in
          </a>
          <a href={`tel:${profile.mobile}`} aria-label="Call">
            ☎
          </a>
          <a href="mailto:" aria-label="Email">
            @
          </a>
        </div>
        <div className="copy">© {year} {profile.name} · Crafted with care.</div>
      </div>
    </footer>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()
  useReveal()
  return (
    <>
      <Nav theme={theme} toggle={toggle} />
      <Hero />
      <Marquee />
      <About />
      <Glance />
      <Experience />
      <Skills />
      <Journey />
      <Family />
      <Gallery />
      <Values />
      <Contact />
      <Footer />
    </>
  )
}
