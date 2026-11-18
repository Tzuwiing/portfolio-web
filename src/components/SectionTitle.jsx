import React from 'react'
import { motion } from 'framer-motion'

/** Judul seksi bersama. align: 'center' | 'left' */
export default function SectionTitle({ eyebrow, title, sub, align = 'center', className = '' }) {
  const center = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${center ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}
    >
      <p className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base sm:text-lg text-zinc-400">{sub}</p>}
    </motion.div>
  )
}
