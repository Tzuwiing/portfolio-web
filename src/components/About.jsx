import React, { useEffect, useRef } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { Atom, Wind, Smartphone, Braces, Code, Figma, Github, Globe, Layers } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'
import TiltCard from './TiltCard.jsx'
import { PROJECTS } from '../data/projects.js'

const SKILLS = [
  { name: 'React JS', Icon: Atom, level: 85 },
  { name: 'Tailwind CSS', Icon: Wind, level: 90 },
  { name: 'Flutter', Icon: Smartphone, level: 75 },
  { name: 'JavaScript', Icon: Braces, level: 80 },
  { name: 'HTML / CSS', Icon: Code, level: 92 },
  { name: 'Figma', Icon: Figma, level: 78 },
  { name: 'GitHub', Icon: Github, level: 82 },
]

const FOCUS = [
  { Icon: Globe, title: 'Web apps', text: 'Responsive interfaces with React JS & Tailwind CSS.' },
  { Icon: Smartphone, title: 'Mobile apps', text: 'One Flutter codebase for Android and iOS.' },
  { Icon: Layers, title: 'UI slicing', text: 'Figma designs rebuilt to the pixel.' },
]

function CountUp({ to, pad = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || !ref.current) return
    const c = animate(0, to, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v)).padStart(pad, '0')
      },
    })
    return () => c.stop()
  }, [inView, to, pad])
  return <span ref={ref}>{String(0).padStart(pad, '0')}</span>
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

function Card({ className = '', delay = 0, children }) {
  return (
    <motion.div {...reveal(delay)} className={className}>
      <TiltCard max={3} className="glass edge h-full rounded-3xl p-6 sm:p-8">
        {children}
      </TiltCard>
    </motion.div>
  )
}

export default function About() {
  const webCount = PROJECTS.filter((p) => p.platform === 'Web').length
  const mobileCount = PROJECTS.filter((p) => p.platform === 'Mobile').length

  return (
    <section id="about" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="About"
          title="A calm approach to building for screens."
          sub="A quick look at who I am, what I work with and what I focus on."
          align="left"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
          {/* bio */}
          <Card className="md:col-span-6 lg:col-span-7">
            <p className="eyebrow">Profile</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
              Hi, I&rsquo;m Jusuf &mdash; a junior developer who cares about the details.
            </h3>
            <p className="mt-4 leading-relaxed text-zinc-400">
              I turn designs into fast, responsive web and mobile apps. My daily tools are React
              JS, Tailwind CSS and Flutter, and I like keeping code modular and interfaces simple,
              so features snap together and stay easy to maintain.
            </p>
            <p className="mt-3 leading-relaxed text-zinc-400">
              I&rsquo;m always learning, and looking for the next real project to grow with.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Clean code', 'Responsive', 'Pixel-perfect', 'Always learning'].map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Card>

          {/* stats */}
          <Card className="md:col-span-6 lg:col-span-5" delay={0.08}>
            <p className="eyebrow">By the numbers</p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { v: PROJECTS.length, l: 'Projects' },
                { v: webCount, l: 'Web apps' },
                { v: mobileCount, l: 'Mobile apps' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-5xl font-semibold text-white sm:text-6xl">
                    <CountUp to={s.v} />
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-accent/60 via-white/10 to-transparent" />
            <p className="mt-4 text-sm text-zinc-500">
              Every project is open on GitHub, with live demos where available.
            </p>
          </Card>

          {/* stack */}
          <Card className="md:col-span-6 lg:col-span-7" delay={0.05}>
            <p className="eyebrow">Tech stack</p>
            <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {SKILLS.map(({ name, Icon, level }, i) => (
                <li key={name} className="group">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2.5 text-zinc-200 transition-colors group-hover:text-white">
                      <Icon
                        size={16}
                        className="text-accent transition-transform duration-300 group-hover:scale-125"
                      />
                      {name}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500">{level}%</span>
                  </div>
                  <div
                    className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]"
                    role="progressbar"
                    aria-label={`${name} proficiency`}
                    aria-valuenow={level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent shadow-glow-sm"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* focus */}
          <Card className="md:col-span-6 lg:col-span-5" delay={0.12}>
            <p className="eyebrow">What I focus on</p>
            <ul className="mt-6 space-y-5">
              {FOCUS.map(({ Icon, title, text }) => (
                <li key={title} className="group flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-accent transition duration-300 group-hover:border-accent/50 group-hover:shadow-glow-sm">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h4 className="font-display text-base font-medium text-white">{title}</h4>
                    <p className="mt-0.5 text-sm text-zinc-400">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
