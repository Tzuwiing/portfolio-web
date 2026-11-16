import React, { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import { Check, Compass, Hammer, Plug, Rocket } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'

const STEPS = [
  {
    Icon: Compass,
    title: 'UI/UX Slicing',
    sub: 'Pixel-perfect Figma conversion',
    desc: 'I study every frame in Figma and rebuild it precisely: spacing, type scale, colors and assets.',
  },
  {
    Icon: Hammer,
    title: 'Architecture',
    sub: 'Modular React & Flutter code',
    desc: 'Reusable components, a clean folder structure and state that scales, so features snap together.',
  },
  {
    Icon: Plug,
    title: 'API Integration',
    sub: 'REST API & local database',
    desc: 'Fetching, caching and persisting data, with proper loading states, error handling and offline storage.',
  },
  {
    Icon: Rocket,
    title: 'Polish & Ship',
    sub: 'Responsive & optimized',
    desc: 'Every breakpoint tested, performance tuned and edge cases handled before launch.',
  },
]

function Step({ step, index, reached, current }) {
  const { Icon } = step
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-14 sm:pl-20"
    >
      {/* node on the rail */}
      <span
        className={`absolute left-0 top-6 grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 sm:h-12 sm:w-12 ${
          reached
            ? 'border-accent bg-accent/15 text-accent shadow-glow-sm'
            : 'border-white/10 bg-surface text-zinc-600'
        }`}
        aria-hidden="true"
      >
        {reached && !current ? <Check size={18} /> : <Icon size={18} />}
      </span>

      <div
        className={`glass edge rounded-3xl p-6 transition-all duration-500 sm:p-7 ${
          reached ? 'opacity-100' : 'opacity-55'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Step {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-[11px] text-zinc-500">{step.sub}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold text-white sm:text-2xl">
          {step.title}
        </h3>
        <p className="mt-2 leading-relaxed text-zinc-400">{step.desc}</p>
      </div>
    </motion.li>
  )
}

export default function Workflow() {
  const listRef = useRef(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.6', 'end 0.6'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  useMotionValueEvent(fill, 'change', (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)))
    setActive((prev) => (prev === i ? prev : i))
  })

  const current = STEPS[active]

  return (
    <section id="workflow" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div
        aria-hidden="true"
        className="glow-blue pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] opacity-40 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
        {/* sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionTitle
              eyebrow="Process"
              title="From design file to shipped product."
              sub="Four steps I follow on every project. Scroll to move through them."
              align="left"
            />

            <div className="glass edge mt-10 hidden rounded-3xl p-6 lg:block">
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Now at
              </p>
              <div className="mt-3 flex items-end gap-4">
                <div className="relative h-20 w-24 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={active}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-gradient absolute inset-0 font-display text-7xl font-semibold leading-none"
                    >
                      {String(active + 1).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="pb-1">
                  <p className="font-display text-lg font-medium text-white">{current.title}</p>
                  <p className="text-sm text-zinc-500">
                    of {String(STEPS.length).padStart(2, '0')} steps
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* steps */}
        <div className="lg:col-span-7">
          <div ref={listRef} className="relative">
            {/* rail */}
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-5 top-6 w-px bg-white/10 sm:left-6"
            />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: fill }}
              className="absolute bottom-6 left-5 top-6 w-px origin-top bg-gradient-to-b from-accent-deep via-accent to-accent-soft shadow-glow-sm sm:left-6"
            />

            <ol className="space-y-6">
              {STEPS.map((s, i) => (
                <Step key={s.title} step={s} index={i} reached={i <= active} current={i === active} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
