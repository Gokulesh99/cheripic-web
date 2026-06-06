import Reveal from './Reveal'
import { Icon } from './Icons'
import { intentCards } from '../data/content'

export default function Intent() {
  return (
    <section id="intent">
      <div className="W">
        <Reveal className="int-head">
          <span className="slbl">The Distinction</span>
          <h2>Most Platforms Deliver Attention.<br /><em>We Deliver Intent.</em></h2>
          <p>There is a profound difference between a person who scrolls and a person who seeks. Our members are seekers.</p>
        </Reveal>
        <div className="int-cards">
          {intentCards.map((c, i) => (
            <Reveal key={c.num} className="ic" delay={(i + 1) * 0.1}>
              <div className="ic-top" /><div className="ic-bg-num">{c.num}</div>
              <div className="ic-ico"><Icon name={c.icon} /></div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}