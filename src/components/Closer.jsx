import Reveal from './Reveal'

export default function Closer() {
  const go = (e) => {
    e.preventDefault()
    document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section id="closer">
      <div className="W">
        <Reveal className="close-ornament"><div className="co-l" /><div className="co-dia" /><div className="co-l" /></Reveal>
        <Reveal as="h2">The Future Of <em>Connection</em><br />Happens In The Real World</Reveal>
        <Reveal as="p" delay={0.1}>Join the businesses helping people create extraordinary experiences beyond the screen.</Reveal>
        <Reveal as="a" href="#apply" className="btn-gold" delay={0.2} onClick={go}>Become a CheriPic Partner</Reveal>
      </div>
    </section>
  )
}