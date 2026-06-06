// Small inline icon set used across cards.
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.3 }

export const Icon = ({ name, size = 22 }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', ...P }
  switch (name) {
    case 'clock':  return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" strokeLinecap="round" /></svg>
    case 'shield': return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    case 'heart':  return <svg {...common}><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" /></svg>
    case 'user':   return <svg {...common} strokeWidth="1.2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" /></svg>
    case 'search': return <svg {...common} strokeWidth="1.2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" strokeLinecap="round" /></svg>
    case 'star':   return <svg {...common} strokeWidth="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    default: return null
  }
}