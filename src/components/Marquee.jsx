const ITEMS = [
  'Clarity Before Connection', 'Intent Over Attention', 'Premium Experiences',
  'Verified Relationships', 'Dubai · London · New York',
]

export default function Marquee() {
  const full = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="mtrack">
        {full.map((t, i) => (
          <span className="mitem" key={i}>{t} <b>·</b></span>
        ))}
      </div>
    </div>
  )
}