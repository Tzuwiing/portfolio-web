import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Mail } from 'lucide-react'
import { NAME, ROLE, EMAIL, NAV_LINKS } from '../config.js'

export default function Footer() {
  const top = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/10 px-4 py-14 sm:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-white">{NAME}</p>
          <p className="mt-1 text-sm text-zinc-500">{ROLE} &middot; React JS, Tailwind &amp; Flutter</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm text-zinc-400 transition hover:text-accent"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:jusuffathan1909@gmail.com"
            aria-label={`Email ${EMAIL}`}
            title={EMAIL}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-accent/60 hover:text-accent hover:shadow-glow-sm"
           
          >
            <Mail size={17} />
          </a>
          <motion.button
            onClick={top}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-accent/60 hover:text-accent hover:shadow-glow-sm"
          >
            <ArrowUp size={17} />
          </motion.button>
        </div>
      </div>

      <p className="mt-10 text-center font-mono text-[11px] text-zinc-600">
        &copy; {new Date().getFullYear()} {NAME}. Built with React, Tailwind CSS &amp; Framer Motion.
      </p>
    </footer>
  )
}
