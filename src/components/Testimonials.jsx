import Reveal from './Reveal'
import { testimonials } from '../data/content'

export default function Testimonials() {
  return (
    <section id="testi">
      <div className="W">
        <Reveal as="span" className="slbl" style={{ display: 'block', textAlign: 'center' }}>Partner Voices</Reveal>
        <Reveal as="h2">Experiences Worth Sharing</Reveal>
        <div className="qgrid">
          {testimonials.map((t, i) => (
            <Reveal className="qc" delay={(i + 1) * 0.1} key={i}>
              <span className="qmark">&ldquo;</span>
              <div className="qtext">{t.quote}</div>
              <div className="qauthor">
                <div className="qav" />
                <div><div className="qan">{t.name}</div><div className="qar">{t.role}</div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}