import { useEffect } from 'react'
import logo from '../assets/optimized/logo.webp'
import { legalMeta, legalSections, legalFinal } from '../data/legal'

// Renders one block from a section body (string | {sub} | {ul} | {email})
function Block({ block }) {
  if (typeof block === 'string') return <p>{block}</p>
  if (block.sub) return <h4>{block.sub}</h4>
  if (block.email) return <p><a className="legal-mail" href={`mailto:${block.email}`}>{block.email}</a></p>
  if (block.ul) {
    return (
      <ul className="legal-list">
        {block.ul.map((item) => <li key={item}>{item}</li>)}
      </ul>
    )
  }
  return null
}

export default function Legal({ target = '' }) {
  // On load, start at the bottom of the agreement and smoothly glide up to the
  // top — regardless of which footer link was used to get here.
  useEffect(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })
    let raf2
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [target])

  const goHome = (e) => {
    e.preventDefault()
    window.location.hash = ''
    window.scrollTo(0, 0)
  }

  return (
    <div className="legal-page">
      <header className="legal-top">
        <a href="#" className="nlogo" onClick={goHome} aria-label="CheriPic home">
          <img className="nlogo-img" src={logo} alt="CheriPic" width="105" height="70" decoding="async" />
        </a>
        <a href="#" className="legal-back" onClick={goHome}>← Back to Home</a>
      </header>

      <div className="legal-wrap">
        <div className="legal-hd">
          <span className="slbl">Legal</span>
          <h1 className="legal-title">{legalMeta.title}</h1>
          <p className="legal-subtitle">{legalMeta.subtitle}</p>
          <div className="legal-meta">
            <span><b>Effective Date:</b> {legalMeta.effectiveDate}</span>
            <span><b>Platform:</b> {legalMeta.platform}</span>
            <span><b>Owned and Operated By:</b> {legalMeta.operatedBy}</span>
            <span><b>Websites:</b> {legalMeta.websites.join(' · ')}</span>
            <span>
              <b>Support:</b>{' '}
              <a className="legal-mail" href={`mailto:${legalMeta.support}`}>{legalMeta.support}</a>
            </span>
          </div>
        </div>

        {legalSections.map((sec) => (
          <section className="legal-sec" key={sec.num} id={sec.id ? `sec-${sec.id}` : undefined}>
            <h3><span className="lnum">{sec.num}.</span> {sec.title}</h3>
            {sec.body.map((block, i) => <Block block={block} key={i} />)}
          </section>
        ))}

        <section className="legal-final">
          <h3>{legalFinal.heading}</h3>
          <p>{legalFinal.intro}</p>
          <ul className="legal-list">
            {legalFinal.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <div className="legal-copy">{legalFinal.copyright}</div>
        </section>
      </div>
    </div>
  )
}
