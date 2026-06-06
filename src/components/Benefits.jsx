import Reveal from './Reveal'
import { benefitsProvide, benefitsReceive } from '../data/content'

function Column({ label, items, delay }) {
  return (
    <Reveal className="bcol" delay={delay}>
      <div className="bcol-label">{label}</div>
      {items.map(b => (
        <div className="bi" key={b.title}>
          <div className="bi-dot" />
          <div><h4>{b.title}</h4><p>{b.text}</p></div>
        </div>
      ))}
    </Reveal>
  )
}

export default function Benefits() {
  return (
    <section id="ben">
      <div className="W">
        <Reveal className="ben-top"><span className="slbl">The Exchange</span><h2>What Partners Receive</h2></Reveal>
        <div className="ben-cols">
          <Column label="What Partners Provide" items={benefitsProvide} delay={0.1} />
          <Column label="What CheriPic Provides" items={benefitsReceive} delay={0.2} />
        </div>
      </div>
    </section>
  )
}