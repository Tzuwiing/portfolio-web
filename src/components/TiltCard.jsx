import React, { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/**
 * Kartu dengan efek 3D-tilt mengikuti kursor + spotlight biru tipis.
 * Hanya aktif untuk mouse (tidak mengganggu scroll/swipe di layar sentuh).
 */
export default function TiltCard({ children, className = '', max = 8, style, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 180, damping: 18 })
  const sy = useSpring(py, { stiffness: 180, damping: 18 })
  const amp = reduce ? 0 : max
  const rotateY = useTransform(sx, [0, 1], [-amp, amp])
  const rotateX = useTransform(sy, [0, 1], [amp, -amp])

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    px.set(x / r.width)
    py.set(y / r.height)
    ref.current.style.setProperty('--mx', `${x}px`)
    ref.current.style.setProperty('--my', `${y}px`)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      className={`spotlight ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
