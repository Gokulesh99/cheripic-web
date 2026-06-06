import { useCounter } from '../hooks/useCounter'

function Stat({ target, suffix, label, duration }) {
  const [ref, value] = useCounter(target, duration)
  return (
    <div className="hb" ref={ref}>
      <div className="hb-n"><span className="ac">{value}</span>{suffix}</div>
      <div className="hb-l">{label}</div>
    </div>
  )
}

export default function Hero() {
  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero">
      <div className="h-base" />
      <div className="h-stars" />
      <div className="h-aurora" />
      <div className="h-moon" />
      <div className="h-skyline" />
      <div className="h-lights" />
      <div className="h-horizon" />
      <div className="h-horizon-glow" />
      <div className="h-orb" />
      <div className="h-scan" />

      <div className="hcontent">
        <div className="h-pill">
          <span className="h-pill-dot" />
          <span>CheriPic Partner Program — Now Open</span>
        </div>
        <h1 className="h-title">
          <span className="row"><span className="inn">Meaningful</span></span>
          <span className="row"><span className="inn">Connections Create</span></span>
          <span className="row"><span className="inn"><em>Meaningful</em> Customers</span></span>
        </h1>
        <p className="h-sub">CheriPic connects premium businesses with emotionally intelligent adults actively seeking extraordinary real-world experiences.</p>
        <div className="h-disc">
          <span>Discover</span>
          <div className="h-scroll-line" />
        </div>
        <div className="h-btns">
          <a href="#apply" className="btn-gold" onClick={(e) => go(e, '#apply')}>Become a Partner</a>
          <a href="#ben" className="btn-ghost" onClick={(e) => go(e, '#ben')}>See Partner Benefits</a>
        </div>
      </div>

      <div className="h-bar">
        <Stat target={10} suffix="K" label="Founding Members" duration={1800} />
        <Stat target={6} suffix="" label="Global Cities" duration={1400} />
        <Stat target={0} suffix="" label="Ads Displayed. Ever." duration={600} />
        <Stat target={100} suffix="%" label="Verified Members" duration={2200} />
      </div>

      <div className="h-scroll">
        <span>Discover</span>
        <div className="h-scroll-line" />
      </div>
    </section>
  )
}