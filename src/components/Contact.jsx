import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Github, Instagram, Linkedin, Mail, Send } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'
import { EMAIL, EMAIL_URL, SOCIALS } from '../config.js'
import { hasLink } from '../data/projects.js'

const SOCIAL_ITEMS = [
  { label: 'GitHub', href: SOCIALS.github, Icon: Github },
  { label: 'LinkedIn', href: SOCIALS.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: SOCIALS.instagram, Icon: Instagram },
].filter((s) => hasLink(s.href))

const field =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-zinc-600 ' +
  'transition focus:border-accent/70 focus:bg-white/[0.05] focus:outline-none focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]'

export default function Contact() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard tidak tersedia: abaikan, link mailto tetap berfungsi */
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    const subject = `Portfolio message from ${name.trim()}`
    const body = `Hi Jusuf! I'm ${name.trim()}.\n\n${message.trim()}`
    const url = `${EMAIL_URL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
    setTimeout(() => {
      window.location.href = url
    }, 500)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div
        aria-hidden="true"
        className="glow-blue pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ---------- left ---------- */}
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow="Contact"
            title="Let's build something great together."
            sub="Got a project, an internship or a collaboration in mind? Send a message, it goes straight to my Gmail."
            align="left"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 space-y-4"
          >
            <div className="glass edge flex items-center justify-between gap-3 rounded-2xl p-2 pl-4">
              <a
                href="mailto:jusuffathan1909@gmail.com"
                className="group flex min-w-0 items-center gap-3 py-2 text-white"
              >
                <Mail size={18} className="shrink-0 text-accent" />
                <span className="truncate text-sm sm:text-base">{EMAIL}</span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
              <button
                type="button"
                onClick={copy}
                aria-label="Copy email address"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 text-zinc-300 transition hover:border-accent/50 hover:text-accent"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'ok' : 'copy'}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            {SOCIAL_ITEMS.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {SOCIAL_ITEMS.map(({ label, href, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-accent/60 hover:text-accent hover:shadow-glow-sm"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* ---------- form ---------- */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass edge rounded-[1.75rem] p-6 sm:p-9 lg:col-span-7"
        >
          <label htmlFor="name" className="block font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            Your name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            placeholder="Jane Doe"
            autoComplete="name"
            className={`${field} mt-2`}
            required
          />

          <label
            htmlFor="msg"
            className="mt-6 block font-mono text-[11px] uppercase tracking-widest text-zinc-500"
          >
            Message
          </label>
          <textarea
            id="msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            maxLength={800}
            placeholder="Tell me about your project..."
            className={`${field} mt-2 resize-none`}
            required
          />
          <div className="mt-1 text-right font-mono text-[10px] text-zinc-600">
            {message.length}/800
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary flex-1"
            >
              {sent ? <Check size={16} /> : <Send size={16} />}
              {sent ? 'Opening your email app…' : 'Send message'}
            </motion.button>
            <motion.a
              href="mailto:jusuffathan1909@gmail.com"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-ghost flex-1"
            >
              <Mail size={16} />
              Email directly
            </motion.a>
          </div>
          <p className="mt-4 text-xs text-zinc-600">
            No backend: this opens your email app with the message addressed to my Gmail.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
