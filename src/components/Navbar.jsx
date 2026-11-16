import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { NAV_LINKS, EMAIL_URL } from '../config.js'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** id seksi yang sedang terlihat di viewport */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return active
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(NAV_LINKS.map((l) => l.id))
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })

  const go = (id) => {
    scrollToId(id)
    setOpen(false)
  }

  return (
    <>
      {/* scroll progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed top-0 inset-x-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent-deep via-accent to-accent-soft shadow-glow-sm"
      />

      <header className="fixed top-3 inset-x-0 z-50 px-3 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="glass edge flex items-center justify-between rounded-full py-2 pl-2 pr-2 sm:pl-3">
            <button
              onClick={() => go('hero')}
              aria-label="Back to top"
              className="group flex items-center gap-2.5 rounded-full pr-3"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/40 bg-accent/10 font-display text-sm font-semibold text-accent transition group-hover:shadow-glow-sm">
                JF
              </span>
              <span className="hidden sm:block font-display text-sm font-medium text-white">
                Jusuf Fathan
              </span>
            </button>

            {/* desktop links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main">
              {NAV_LINKS.map((l) => {
                const on = active === l.id
                return (
                  <button
                    key={l.id}
                    onClick={() => go(l.id)}
                    aria-current={on ? 'page' : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                      on ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-inset ring-accent/30"
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a href={EMAIL_URL} className="btn btn-primary !px-4 !py-2 group">
                <span className="hidden sm:inline">Email me</span>
                <span className="sm:hidden">Email</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <button
                className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white"
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.nav
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="md:hidden glass edge mt-2 rounded-3xl p-2 bg-ink/80"
                aria-label="Mobile"
              >
                <ul className="flex flex-col">
                  {NAV_LINKS.map((l, i) => (
                    <li key={l.id}>
                      <button
                        onClick={() => go(l.id)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                          active === l.id
                            ? 'bg-white/[0.06] text-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span>{l.label}</span>
                        <span className="font-mono text-[10px] text-accent">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
