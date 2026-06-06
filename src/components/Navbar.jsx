import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#intent', label: 'The Opportunity' },
  { href: '#why', label: 'Why Partner' },
  { href: '#exp', label: 'Experiences' },
  { href: '#ben', label: 'Benefits' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav id="nav" className={scrolled ? 's' : ''}>
      <a href="#" className="nlogo" onClick={(e) => go(e, '#hero')}>
        <svg className="nlogo-svg" viewBox="0 0 36 36" fill="none">
          <defs>
            <linearGradient id="ng" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c4a8ff" />
              <stop offset="100%" stopColor="#7B3FF2" />
            </linearGradient>
          </defs>
          <circle cx="18" cy="18" r="16" stroke="rgba(123,63,242,.3)" strokeWidth=".8" fill="none" />
          <path d="M18 5c0 0-6 6.5-6 11.5C12 20.09 14.686 23 18 23s6-2.91 6-6.5C24 11.5 18 5 18 5z" fill="url(#ng)" />
          <path d="M10 25.5c0 0 3 5.5 8 5.5s8-5.5 8-5.5" stroke="url(#ng)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
        <span className="nlogo-txt">Cheri<span>Pic</span></span>
      </a>
      <div className="nright">
        {LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>{l.label}</a>
        ))}
        <a href="#apply" className="nav-cta" onClick={(e) => go(e, '#apply')}>Become a Partner</a>
      </div>
    </nav>
  )
}