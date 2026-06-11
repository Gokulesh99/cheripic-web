import Reveal from './Reveal'
import { alexTraits, alexChips } from '../data/content'

export default function AlexProfile() {
  return (
    <section id="alex">
      <div className="W">
        {/* <Reveal className="alex-card">
          <div className="alex-photo">
            <div className="alex-photo-art" />
            <div className="alex-photo-figure" />
            <div className="alex-badge">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="var(--g)"><path d="M8 0L9.8 5.4H15.5L11 8.7L12.8 14.1L8 10.8L3.2 14.1L5 8.7L.5 5.4H6.2L8 0Z" /></svg>
              <span>Verified CheriPic Member</span>
            </div>
          </div>
          <div className="alex-body">
            <div className="alex-name">Alex</div>
            <div className="alex-role">Premium Member</div>
            <div className="alex-stats">
              <div className="astat"><div className="astat-l">Age Range</div><div className="astat-v">28 — 45</div></div>
              <div className="astat"><div className="astat-l">Status</div><div className="astat-v">Verified ✓</div></div>
              <div className="astat"><div className="astat-l">Income</div><div className="astat-v">Above Avg.</div></div>
              <div className="astat"><div className="astat-l">Intent</div><div className="astat-v">High</div></div>
            </div>
            <div className="alex-spends">
              <div className="alex-spends-l">Spends On</div>
              <div className="chips">
                {alexChips.map(c => <span className="chip" key={c}>{c}</span>)}
              </div>
            </div>
          </div>
        </Reveal> */}

        <Reveal className="alex-txt" delay={0.2}>
          <span className="slbl">Your New Customer</span>
          <div className="grule" />
          <h2>Meet <em>Alex</em></h2>
          <p>Alex is the customer every premium business spends years trying to attract. Professionally successful, emotionally intelligent, and actively investing in relationships and real-world experiences.</p>
          <p>Alex doesn't want discounts. Alex wants to <em style={{ fontStyle: 'italic', color: 'var(--pu3)' }}>feel</em> something — and is entirely willing to spend to make it happen.</p>
          <ul className="traits">
            {alexTraits.map(t => (
              <li className="tr" key={t}><span className="tr-d">—</span>{t}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}