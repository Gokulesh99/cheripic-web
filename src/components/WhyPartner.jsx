import Reveal from './Reveal'
import { Icon } from './Icons'
import { whyCards } from '../data/content'

export default function WhyPartner() {
  return (
    <section id="why">
      <div className="W">
        <Reveal className="why-top">
          <span className="slbl">The Case For Partnership</span>
          <h2>More Than Exposure</h2>
          <p>Everything we build is designed to connect your business with people who are emotionally ready to experience what you offer.</p>
        </Reveal>
        <div className="why-grid">
          {whyCards.map((c, i) => (
            <Reveal key={c.title} className="wc" delay={(i + 1) * 0.1}>
              <div className="wc-line" />
              <div className="wc-ico"><Icon name={c.icon} size={26} /></div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}