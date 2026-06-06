import { forwardRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const Reveal = forwardRef(function Reveal(
  { children, delay = 0, className = '', as: Tag = 'div', ...rest }, externalRef
) {
  const [internalRef, visible] = useReveal()
  // Merge the reveal observer ref with any forwarded ref (e.g. drag-scroll)
  const setRefs = (node) => {
    internalRef.current = node
    if (typeof externalRef === 'function') externalRef(node)
    else if (externalRef) externalRef.current = node
  }
  return (
    <Tag
      ref={setRefs}
      className={`rv ${visible ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default Reveal