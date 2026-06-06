import Reveal from './Reveal'

export default function Globe() {
  return (
    <section id="globe">
      <div className="W">
        <Reveal as="span" className="slbl" style={{ display: 'block', textAlign: 'center' }}>Scale &amp; Vision</Reveal>
        <Reveal as="h2">Built For Global Experiences</Reveal>
        <Reveal as="p" className="gsub">Starting in Dubai. Expanding to every city where extraordinary experiences and meaningful connections happen.</Reveal>
        <Reveal className="globe-wrap">
          <div className="globe-grid" />
          <svg id="msvg" viewBox="0 0 1000 460" xmlns="http://www.w3.org/2000/svg">
            <g fill="rgba(123,63,242,0.1)" stroke="rgba(123,63,242,0.22)" strokeWidth="0.5">
              <path d="M130,90 Q180,72 240,88 Q290,104 285,148 Q280,192 248,212 Q216,230 182,222 Q148,214 128,190 Q108,166 118,130 Z" />
              <path d="M156,234 Q192,224 218,242 Q240,260 244,304 Q248,348 234,388 Q220,424 198,434 Q176,440 158,418 Q140,396 140,360 Q140,318 150,274 Z" />
              <path d="M318,74 Q380,56 428,76 Q462,96 472,136 Q482,176 464,216 Q446,252 412,260 Q378,268 348,248 Q318,228 312,188 Q306,148 318,74Z" />
              <path d="M460,132 Q516,118 548,140 Q572,162 578,208 Q582,252 564,296 Q546,334 518,348 Q490,360 464,340 Q438,318 434,278 Q430,232 442,180 Z" />
              <path d="M556,60 Q660,42 750,64 Q810,80 832,120 Q854,156 836,192 Q818,224 776,236 Q734,246 690,238 Q646,228 610,212 Q574,196 560,160 Q546,120 556,60Z" />
              <path d="M732,270 Q784,258 818,278 Q844,298 840,336 Q836,372 812,386 Q788,396 760,382 Q732,366 726,334 Q720,298 732,270Z" />
            </g>
            <g>
              <path className="cl" d="M716,152 Q600,100 502,88" />
              <path className="cl" d="M502,88 Q380,76 218,130" style={{ animationDelay: '-6s' }} />
              <path className="cl" d="M218,130 Q218,148 220,162" style={{ animationDelay: '-12s' }} />
              <path className="cl" d="M218,130 Q200,108 192,96" style={{ animationDelay: '-18s' }} />
              <path className="cl" d="M218,130 Q172,128 140,132" style={{ animationDelay: '-9s' }} />
            </g>
            <g className="cpin" transform="translate(716,152)"><circle className="pulse" r="4" fill="none" stroke="rgba(216,181,106,.6)" strokeWidth="1" /><circle r="5.5" fill="#D8B56A" /><circle r="2.5" fill="white" /><text className="clabel" x="12" y="-8">Dubai</text><text className="csub" x="12" y="5">LAUNCH CITY</text></g>
            <g className="cpin" transform="translate(502,88)"><circle className="pulse" r="4" fill="none" stroke="rgba(157,108,255,.5)" strokeWidth="1" /><circle r="4.5" fill="#9D6CFF" /><circle r="2" fill="white" /><text className="clabel" x="10" y="-8">London</text></g>
            <g className="cpin" transform="translate(218,130)"><circle className="pulse" r="4" fill="none" stroke="rgba(157,108,255,.5)" strokeWidth="1" /><circle r="4.5" fill="#9D6CFF" /><circle r="2" fill="white" /><text className="clabel" x="10" y="-8">New York</text></g>
            <g className="cpin" transform="translate(220,165)"><circle className="pulse" r="4" fill="none" stroke="rgba(157,108,255,.5)" strokeWidth="1" /><circle r="4.5" fill="#9D6CFF" /><circle r="2" fill="white" /><text className="clabel" x="10" y="-6">Miami</text></g>
            <g className="cpin" transform="translate(192,96)"><circle className="pulse" r="4" fill="none" stroke="rgba(157,108,255,.5)" strokeWidth="1" /><circle r="4.5" fill="#9D6CFF" /><circle r="2" fill="white" /><text className="clabel" x="10" y="-6">Toronto</text></g>
            <g className="cpin" transform="translate(138,132)"><circle className="pulse" r="4" fill="none" stroke="rgba(157,108,255,.5)" strokeWidth="1" /><circle r="4.5" fill="#9D6CFF" /><circle r="2" fill="white" /><text className="clabel" x="10" y="-6">Los Angeles</text></g>
          </svg>
        </Reveal>
      </div>
    </section>
  )
}