import { useEffect, useRef, useState } from 'react'

// Observes an element and flips `visible` true when it scrolls into view.
export function useReveal(options = { threshold: 0.07, rootMargin: '0px 0px -24px 0px' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        obs.unobserve(el)
      }
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, visible]
}