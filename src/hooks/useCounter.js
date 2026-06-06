import { useEffect, useRef, useState } from 'react'

// Counts from 0 to `target` once the element is visible.
export function useCounter(target, duration = 1800) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = null
        const step = (ts) => {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          setValue(Math.floor(p * target))
          if (p < 1) requestAnimationFrame(step)
          else setValue(target)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return [ref, value]
}