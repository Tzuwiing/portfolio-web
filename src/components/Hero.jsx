import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import ProfileCard from "./ProfileCard.jsx";
import { NAME, ROLE, EMAIL_URL } from "../config.js";
import { PROJECTS } from "../data/projects.js";

const STACK = ["React JS", "Tailwind CSS", "Flutter"];

const STATS = [
  { value: String(PROJECTS.length).padStart(2, "0"), label: "Projects" },
  { value: "02", label: "Platforms" },
  { value: "07", label: "Tools" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % STACK.length), 2400);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={STACK[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient"
        >
          {STACK[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  // kilau biru lembut mengikuti kursor (hanya mouse)
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const spot = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(56,189,248,0.10), transparent 65%)`;

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const go = () =>
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-16 pt-28 sm:px-8"
    >
      {/* background */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid grid-fade" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: spot }}
      />
      <div
        aria-hidden="true"
        className="glow-blue absolute -right-40 top-10 h-[34rem] w-[34rem] opacity-60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* ---------- copy ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left"
        >
          <motion.div
            variants={item}
            className="flex justify-center lg:justify-start"
          >
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Turning caffeine into code since 2020
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 font-mono text-sm text-accent"
          >
            {"// hello, I’m"}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-2 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl"
            aria-label={`${NAME}, ${ROLE}`}
          >
            {NAME}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-display text-xl text-zinc-300 sm:text-2xl"
          >
            {ROLE} building with <RotatingWord />
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg lg:mx-0"
          >
            I turn pixel-perfect designs into fast, responsive web &amp; mobile
            apps &mdash; clean code, calm interfaces, and details that feel good
            to use.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center"
          >
            <motion.button
              onClick={go}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary group w-full sm:w-auto"
            >
              View my work
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.button>
            <motion.a
              href={EMAIL_URL}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-ghost w-full sm:w-auto"
            >
              <Mail size={16} />
              Contact via Email
            </motion.a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mx-auto mt-12 grid max-w-md grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6 lg:mx-0"
          >
            {STATS.map((s) => (
              <div key={s.label} className="px-3 first:pl-0 sm:px-5">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-white">
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- photo ---------- */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <ProfileCard />
        </div>
      </div>
    </section>
  );
}
