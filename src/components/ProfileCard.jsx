import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TiltCard from './TiltCard.jsx'
import { NAME, ROLE, PHOTO_SRC } from '../config.js'

const CHIPS = [
  { label: 'React JS', pos: '-top-3 -left-2 sm:-left-8', delay: '0s' },
  { label: 'Flutter', pos: 'top-1/3 -right-2 sm:-right-10', delay: '1.2s' },
  { label: 'Tailwind', pos: '-bottom-3 left-4 sm:-left-6', delay: '2.4s' },
]

function Corner({ className }) {
  return <span aria-hidden="true" className={`absolute w-5 h-5 border-accent/70 ${className}`} />
}

/** Bingkai foto profil: glassmorphism + corner brackets + glow biru saat hover. */
export default function ProfileCard() {
  const [failed, setFailed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm"
    >
      {/* ambient glow */}
      <div aria-hidden="true" className="glow-blue absolute -inset-16 -z-10 blur-2xl" />

      {/* floating stack chips */}
      {CHIPS.map((c) => (
        <div
          key={c.label}
          style={{ animationDelay: c.delay }}
          className={`absolute z-20 ${c.pos} animate-floaty glass rounded-full px-3 py-1.5 font-mono text-[11px] text-zinc-200 flex items-center gap-2`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-glow-sm" />
          {c.label}
        </div>
      ))}

      <TiltCard max={7} className="group glass edge rounded-[1.75rem] p-2.5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-surface">
          {!failed ? (
            <img
              src={PHOTO_SRC}
              alt={`Foto profil ${NAME}`}
              onError={() => setFailed(true)}
              draggable="false"
              className="absolute inset-0 h-full w-full object-cover object-top grayscale-[35%] contrast-105 transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          ) : (
            /* fallback monogram saat foto belum dipasang */
            <div className="absolute inset-0 grid place-items-center bg-grid">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-accent-deep/10" />
              <span className="relative font-display text-8xl font-semibold text-gradient select-none">
                JF
              </span>
              <span className="absolute bottom-24 font-mono text-[10px] tracking-[0.2em] text-zinc-500">
                ADD /public/profile.jpg
              </span>
            </div>
          )}

          {/* scan line + vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-scan"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
          />

          {/* corner brackets */}
          <Corner className="top-3 left-3 border-t-2 border-l-2 rounded-tl-md" />
          <Corner className="top-3 right-3 border-t-2 border-r-2 rounded-tr-md" />
          <Corner className="bottom-3 left-3 border-b-2 border-l-2 rounded-bl-md" />
          <Corner className="bottom-3 right-3 border-b-2 border-r-2 rounded-br-md" />

          {/* name plate */}
          <div className="absolute inset-x-3 bottom-3 glass rounded-xl px-4 py-3 flex items-center justify-between gap-3 bg-ink/50">
            <div className="min-w-0">
              <p className="font-display text-sm font-medium text-white truncate">{NAME}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{ROLE}</p>
            </div>
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-dot" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}
