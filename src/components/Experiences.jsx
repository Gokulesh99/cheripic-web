import Reveal from './Reveal'
import { useDragScroll } from '../hooks/useDragScroll'
import { experiences } from '../data/content'

// Decorative line art per card scene
const sceneLines = {
  es1: <svg viewBox="0 0 400 520" fill="none"><path d="M0,400 L400,350" stroke="rgba(216,181,106,.3)" strokeWidth=".5" /><path d="M0,450 L400,400" stroke="rgba(216,181,106,.2)" strokeWidth=".5" /><rect x="80" y="200" width="60" height="200" stroke="rgba(216,181,106,.15)" strokeWidth=".5" fill="none" /><rect x="160" y="150" width="80" height="250" stroke="rgba(216,181,106,.1)" strokeWidth=".5" fill="none" /><rect x="260" y="180" width="60" height="220" stroke="rgba(216,181,106,.12)" strokeWidth=".5" fill="none" /></svg>,
  es2: <svg viewBox="0 0 400 520" fill="none"><ellipse cx="200" cy="480" rx="200" ry="40" stroke="rgba(123,63,242,.3)" strokeWidth=".5" fill="none" /><path d="M40,420 Q200,360 360,420" stroke="rgba(157,108,255,.2)" strokeWidth=".5" fill="none" /><path d="M80,450 Q200,390 320,450" stroke="rgba(157,108,255,.15)" strokeWidth=".5" fill="none" /></svg>,
  es3: <svg viewBox="0 0 400 520" fill="none"><rect x="60" y="100" width="280" height="320" stroke="rgba(216,181,106,.12)" strokeWidth=".5" fill="none" /><rect x="80" y="120" width="240" height="280" stroke="rgba(216,181,106,.08)" strokeWidth=".5" fill="none" /><line x1="200" y1="100" x2="200" y2="420" stroke="rgba(216,181,106,.08)" strokeWidth=".5" /></svg>,
  es4: <svg viewBox="0 0 400 520" fill="none"><circle cx="200" cy="260" r="150" stroke="rgba(157,108,255,.12)" strokeWidth=".5" fill="none" /><circle cx="200" cy="260" r="100" stroke="rgba(157,108,255,.08)" strokeWidth=".5" fill="none" /><circle cx="200" cy="260" r="50" stroke="rgba(157,108,255,.06)" strokeWidth=".5" fill="none" /></svg>,
  es5: <svg viewBox="0 0 400 520" fill="none"><path d="M0,300 Q200,200 400,300" stroke="rgba(123,63,242,.15)" strokeWidth=".5" fill="none" /><path d="M0,350 Q200,250 400,350" stroke="rgba(123,63,242,.1)" strokeWidth=".5" fill="none" /></svg>,
  es6: <svg viewBox="0 0 400 520" fill="none"><rect x="120" y="200" width="160" height="200" stroke="rgba(196,80,120,.15)" strokeWidth=".5" fill="none" /><line x1="120" y1="260" x2="280" y2="260" stroke="rgba(196,80,120,.1)" strokeWidth=".5" /></svg>,
  es7: <svg viewBox="0 0 400 520" fill="none"><polygon points="200,80 340,320 60,320" stroke="rgba(123,63,242,.15)" strokeWidth=".5" fill="none" /><polygon points="200,140 300,300 100,300" stroke="rgba(123,63,242,.1)" strokeWidth=".5" fill="none" /></svg>,
}

export default function Experiences() {
  const [trackRef, scrollBy] = useDragScroll()

  return (
    <section id="exp">
      <div className="W">
        <Reveal className="exp-hd">
          <div><span className="slbl">The Ecosystem</span><h2>How Members Discover<br />Experiences</h2></div>
          <p>Curated, verified, and presented in the context of meaningful connection — never algorithmic noise.</p>
        </Reveal>
        <Reveal className="exp-outer" ref={trackRef}>
          <div className="exp-track">
            {experiences.map((e) => (
              <div className="ecard" key={e.name}>
                <div className={`ecard-scene ${e.scene}`}>
                  {e.img && <img className="ecard-img" src={e.img} alt={e.name} loading="lazy" />}
                  <div className="ecard-lines">{sceneLines[e.scene]}</div>
                </div>
                <div className="ecard-ov" />
                <div className="ecard-badge">{e.badge}</div>
                <div className="ecard-info">
                  <div className="ecard-cat">{e.cat}</div>
                  <div className="ecard-name">{e.name}</div>
                  <div className="ecard-desc">{e.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="exp-controls">
          <span>Drag to Explore</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="earr" onClick={() => scrollBy(-402)} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5" /></svg>
            </button>
            <button className="earr" onClick={() => scrollBy(402)} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3l5 5-5 5" /></svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}