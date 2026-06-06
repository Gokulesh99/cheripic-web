import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    // Disable on touch / small screens
    if (window.matchMedia('(max-width: 768px)').matches) return

    let mx = 0, my = 0, rx = 0, ry = 0, raf
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px' }
    }
    const follow = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px' }
      raf = requestAnimationFrame(follow)
    }
    document.addEventListener('mousemove', onMove)
    follow()

    const add = () => document.body.classList.add('hs')
    const remove = () => document.body.classList.remove('hs')
    const targets = document.querySelectorAll('a,button,.chip,.wc,.ic,.ecard,.qc,.earr,input,select,textarea')
    targets.forEach(el => { el.addEventListener('mouseenter', add); el.addEventListener('mouseleave', remove) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      targets.forEach(el => { el.removeEventListener('mouseenter', add); el.removeEventListener('mouseleave', remove) })
    }
  }, [])

  return (
    <>
      <div id="CUR" ref={dot} />
      <div id="CURR" ref={ring} />
    </>
  )
}