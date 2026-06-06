import { useRef, useEffect } from 'react'

// Adds click-drag + momentum scrolling to a horizontal container.
export function useDragScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let isDown = false, startX = 0, scrollStart = 0
    let vel = 0, lastX = 0, raf

    const down = (e) => {
      isDown = true
      startX = e.pageX
      scrollStart = el.scrollLeft
      cancelAnimationFrame(raf)
      el.style.cursor = 'grabbing'
    }
    const move = (e) => {
      if (!isDown) return
      vel = (e.pageX - lastX) * 1.2
      lastX = e.pageX
      el.scrollLeft = scrollStart - (e.pageX - startX)
    }
    const up = () => {
      isDown = false
      el.style.cursor = 'grab'
      const glide = () => {
        if (Math.abs(vel) > 0.5) {
          el.scrollLeft += vel
          vel *= 0.92
          raf = requestAnimationFrame(glide)
        }
      }
      glide()
    }

    el.addEventListener('mousedown', down)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      el.removeEventListener('mousedown', down)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  const scrollBy = (amount) => ref.current?.scrollBy({ left: amount, behavior: 'smooth' })
  return [ref, scrollBy]
}