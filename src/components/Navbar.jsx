import { useEffect, useState } from 'react'
import logo from '../assets/optimized/logo.webp'

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
        <img className="nlogo-img" src={logo} alt="CheriPic" width="105" height="70" decoding="async" />
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