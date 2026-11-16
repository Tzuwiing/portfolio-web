import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Pause,
  Play,
} from "lucide-react";
import SectionTitle from "./SectionTitle.jsx";
import TiltCard from "./TiltCard.jsx";
import { PROJECTS, hasLink, displayHost } from "../data/projects.js";

const AUTOPLAY_MS = 7000;
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 450;
const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  Ilustrasi preview (SVG minimalis, hitam-putih + aksen biru)         */
/* ------------------------------------------------------------------ */
const LINE = "rgba(255,255,255,0.16)";
const FILL = "rgba(255,255,255,0.05)";
const BG = "#0a0e14";

function Row({ y, w = 120, done, delay = 0 }) {
  return (
    <motion.g
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
    >
      <rect
        x="86"
        y={y}
        width="228"
        height="34"
        rx="10"
        fill={FILL}
        stroke={LINE}
      />
      <rect
        x="100"
        y={y + 10}
        width="14"
        height="14"
        rx="4"
        fill={done ? "#38bdf8" : "none"}
        stroke={done ? "#38bdf8" : LINE}
      />
      {done && (
        <path
          d={`M103.5 ${y + 17} l3 3 l5 -6`}
          stroke={BG}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <rect
        x="126"
        y={y + 14}
        width={w}
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.22)"
      />
    </motion.g>
  );
}

function Visual({ kind }) {
  const common = {
    viewBox: "0 0 400 250",
    className: "h-full w-full",
    "aria-hidden": true,
  };

  if (kind === "prayer") {
    const times = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    return (
      <svg {...common}>
        <circle cx="105" cy="100" r="62" fill="rgba(56,189,248,0.10)" />
        <motion.circle
          cx="105"
          cy="100"
          r="40"
          fill="#38bdf8"
          initial={{ r: 20, opacity: 0 }}
          animate={{ r: 40, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <circle cx="123" cy="90" r="36" fill={BG} />
        {[
          [60, 40],
          [165, 52],
          [150, 160],
          [48, 150],
          [180, 120],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="#fff" opacity="0.6" />
        ))}
        {times.map((t, i) => (
          <motion.g
            key={t}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: EASE }}
          >
            <rect
              x="210"
              y={42 + i * 36}
              width="150"
              height="28"
              rx="9"
              fill={i === 2 ? "rgba(56,189,248,0.14)" : FILL}
              stroke={i === 2 ? "#38bdf8" : LINE}
            />
            <text
              x="224"
              y={60 + i * 36}
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fill={i === 2 ? "#7dd3fc" : "#a1a1aa"}
            >
              {t}
            </text>
            <circle
              cx="344"
              cy={56 + i * 36}
              r="3"
              fill={i === 2 ? "#38bdf8" : LINE}
            />
          </motion.g>
        ))}
      </svg>
    );
  }

  if (kind === "tasks") {
    return (
      <svg {...common}>
        <Row y={36} w={140} done delay={0.05} />
        <Row y={82} w={96} done delay={0.15} />
        <Row y={128} w={120} delay={0.25} />
        <Row y={174} w={76} delay={0.35} />
      </svg>
    );
  }

  if (kind === "bmi") {
    return (
      <svg {...common}>
        <path
          d="M110 170 A90 90 0 0 1 290 170"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <motion.path
          d="M110 170 A90 90 0 0 1 290 170"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.56 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
        <motion.g
          initial={{ rotate: -80 }}
          animate={{ rotate: 8 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        >
          <line
            x1="200"
            y1="170"
            x2="200"
            y2="96"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
        <circle cx="200" cy="170" r="8" fill="#fff" />
        <circle cx="200" cy="170" r="3" fill={BG} />
        <text
          x="200"
          y="208"
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="26"
          fontWeight="600"
          fill="#fff"
        >
          22.5
        </text>
        <text
          x="200"
          y="226"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#7dd3fc"
        >
          NORMAL
        </text>
      </svg>
    );
  }

  if (kind === "finance") {
    const bars = [70, 110, 85, 140, 100, 160];
    return (
      <svg {...common}>
        <line x1="60" y1="200" x2="340" y2="200" stroke={LINE} />
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1="60"
            y1={80 + i * 40}
            x2="340"
            y2={80 + i * 40}
            stroke="rgba(255,255,255,0.05)"
          />
        ))}
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={72 + i * 46}
            y={200 - h}
            width="28"
            height={h}
            rx="6"
            fill={i === bars.length - 1 ? "#38bdf8" : "rgba(255,255,255,0.14)"}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
          />
        ))}
        <motion.polyline
          points="86,140 132,100 178,118 224,66 270,92 316,44"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
        />
      </svg>
    );
  }

  if (kind === "books") {
    const books = [
      { w: 26, h: 120 },
      { w: 34, h: 150 },
      { w: 22, h: 104 },
      { w: 30, h: 136, accent: true },
      { w: 26, h: 112 },
      { w: 36, h: 146 },
    ];
    let x = 76;
    return (
      <svg {...common}>
        <line
          x1="56"
          y1="200"
          x2="344"
          y2="200"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {books.map((b, i) => {
          const bx = x;
          x += b.w + 8;
          return (
            <motion.rect
              key={i}
              x={bx}
              y={200 - b.h}
              width={b.w}
              height={b.h}
              rx="4"
              fill={b.accent ? "rgba(56,189,248,0.2)" : FILL}
              stroke={b.accent ? "#38bdf8" : LINE}
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
            />
          );
        })}
        <rect
          x="296"
          y="168"
          width="38"
          height="30"
          rx="4"
          fill={FILL}
          stroke={LINE}
          transform="rotate(-14 315 183)"
        />
      </svg>
    );
  }

  if (kind === "mobile") {
    const Phone = ({ x, y, delay }) => (
      <motion.g
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, ease: EASE }}
      >
        <rect
          x={x}
          y={y}
          width="96"
          height="190"
          rx="18"
          fill={BG}
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.5"
        />
        <rect
          x={x + 34}
          y={y + 8}
          width="28"
          height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.18)"
        />
        <circle cx={x + 22} cy={y + 36} r="9" fill="#38bdf8" />
        <rect
          x={x + 38}
          y={y + 30}
          width="40"
          height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.3)"
        />
        <rect
          x={x + 38}
          y={y + 40}
          width="26"
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.14)"
        />
        <rect
          x={x + 12}
          y={y + 62}
          width="72"
          height="40"
          rx="10"
          fill="rgba(56,189,248,0.14)"
          stroke="rgba(56,189,248,0.5)"
        />
        <rect
          x={x + 12}
          y={y + 110}
          width="72"
          height="22"
          rx="8"
          fill={FILL}
          stroke={LINE}
        />
        <rect
          x={x + 12}
          y={y + 138}
          width="72"
          height="22"
          rx="8"
          fill={FILL}
          stroke={LINE}
        />
      </motion.g>
    );
    return (
      <svg {...common}>
        <Phone x={100} y={40} delay={0.05} />
        <Phone x={216} y={28} delay={0.18} />
      </svg>
    );
  }

  /* slicing */
  return (
    <svg {...common}>
      <motion.rect
        x="96"
        y="70"
        width="170"
        height="110"
        rx="10"
        fill={FILL}
        stroke={LINE}
        initial={{ x: 44, y: 30, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <motion.rect
        x="128"
        y="52"
        width="170"
        height="110"
        rx="10"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.28)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      />
      <motion.rect
        x="156"
        y="84"
        width="170"
        height="110"
        rx="10"
        fill="rgba(56,189,248,0.10)"
        stroke="#38bdf8"
        strokeDasharray="5 4"
        initial={{ x: -36, y: -24, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
      />
      {[
        [156, 84],
        [326, 84],
        [156, 194],
        [326, 194],
      ].map(([cx, cy], i) => (
        <rect
          key={i}
          x={cx - 4}
          y={cy - 4}
          width="8"
          height="8"
          rx="1.5"
          fill="#fff"
          stroke="#38bdf8"
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Varian transisi (arah mengikuti next / prev)                        */
/* ------------------------------------------------------------------ */
const slide = {
  enter: (d) => ({ opacity: 0, x: d * 48, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (d) => ({ opacity: 0, x: d * -48, scale: 0.985 }),
};
const stagger = {
  center: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const rise = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function Portfolio() {
  const n = PROJECTS.length;
  const reduce = useReducedMotion();
  const [[index, dir], setPage] = useState([0, 0]);
  const [engaged, setEngaged] = useState(false); // hover / fokus di dalam carousel
  const [playing, setPlaying] = useState(true);
  const railRef = useRef(null);

  const project = PROJECTS[index];
  const paused = !playing || engaged || reduce;

  const go = useCallback(
    (i, d) => setPage(([cur]) => [((i % n) + n) % n, d ?? (i > cur ? 1 : -1)]),
    [n],
  );
  const next = useCallback(() => setPage(([c]) => [(c + 1) % n, 1]), [n]);
  const prev = useCallback(() => setPage(([c]) => [(c - 1 + n) % n, -1]), [n]);

  // autoplay: timer dimulai ulang setiap slide berganti / di-resume
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  // keyboard: ← →, saat carousel di-hover / difokus
  useEffect(() => {
    if (!engaged) return;
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable)
        return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [engaged, next, prev]);

  // jaga thumbnail aktif tetap terlihat di rail. Hanya menggulung rail itu sendiri
  // (BUKAN scrollIntoView, yang ikut menggulung halaman / seksi dan membuat layout bergeser).
  useEffect(() => {
    const rail = railRef.current;
    const el = rail?.querySelector('[aria-selected="true"]');
    if (!rail || !el) return;
    const left = el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2;
    rail.scrollTo({
      left: Math.max(0, left),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [index, reduce]);

  const onDragEnd = (_, info) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY)
      next();
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY)
      prev();
  };

  const showDemo = hasLink(project.demo);
  const showRepo = hasLink(project.repo);

  return (
    <section
      id="portfolio"
      className="relative overflow-clip px-4 py-24 sm:px-8 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="glow-blue pointer-events-none absolute -right-48 top-24 h-[34rem] w-[34rem] opacity-40 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow="Selected work"
            title="Projects I've built."
            sub={`${n} projects across web and mobile. Swipe, use the arrows, or pick one below.`}
            align="left"
          />
          <p className="font-mono text-sm text-zinc-500" aria-hidden="true">
            <span className="text-2xl font-semibold text-white">
              {String(index + 1).padStart(2, "0")}
            </span>{" "}
            / {String(n).padStart(2, "0")}
          </p>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Portfolio projects"
          onMouseEnter={() => setEngaged(true)}
          onMouseLeave={() => setEngaged(false)}
          onFocus={() => setEngaged(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false);
          }}
          className="mt-12"
        >
          {/* split-screen asimetris */}
          <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-0">
            {/* ---------- preview ---------- */}
            <div className="lg:col-span-7">
              <TiltCard max={5} className="glass edge rounded-[1.75rem] p-2.5">
                <div className="overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-surface">
                  {/* window bar */}
                  <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
                    </div>
                    <div className="min-w-0 flex-1 truncate rounded-full bg-white/[0.04] px-3 py-1 text-center font-mono text-[11px] text-zinc-500">
                      {displayHost(project)}
                    </div>
                  </div>

                  {/* stage */}
                  <div className="relative aspect-[16/10] touch-pan-y overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-grid opacity-60"
                    />
                    <div
                      aria-hidden="true"
                      className="glow-blue absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 opacity-50"
                    />
                    <AnimatePresence mode="wait" custom={dir} initial={false}>
                      <motion.div
                        key={project.id}
                        custom={dir}
                        variants={slide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        dragMomentum={false}
                        onDragEnd={onDragEnd}
                        className="absolute inset-0 cursor-grab p-4 active:cursor-grabbing sm:p-8"
                      >
                        <Visual kind={project.kind} />
                      </motion.div>
                    </AnimatePresence>

                    {/* autoplay progress */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-white/[0.06]"
                    >
                      <motion.div
                        key={`${index}-${paused}`}
                        className="h-full origin-left bg-accent shadow-glow-sm"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        transition={{
                          duration: paused ? 0 : AUTOPLAY_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* ---------- details ---------- */}
            <div className="lg:col-span-5 lg:-ml-14 lg:mt-14">
              <div className="glass edge relative flex h-full flex-col rounded-[1.75rem] bg-ink/60 p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={project.id}
                    variants={stagger}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-1 flex-col"
                  >
                    <motion.div
                      variants={rise}
                      className="flex items-center justify-between"
                    >
                      <span className="eyebrow">
                        {String(index + 1).padStart(2, "0")} &mdash;{" "}
                        {project.platform}
                      </span>
                    </motion.div>

                    <motion.h3
                      variants={rise}
                      className="mt-4 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      variants={rise}
                      className="mt-1 text-sm text-accent-soft"
                    >
                      {project.sub}
                    </motion.p>
                    <motion.p
                      variants={rise}
                      className="mt-4 min-h-[5.5rem] leading-relaxed text-zinc-400"
                    >
                      {project.desc}
                    </motion.p>

                    <motion.div
                      variants={rise}
                      className="mt-5 flex flex-wrap gap-2"
                    >
                      {project.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </motion.div>

                    {/* tombol hanya dirender bila link tersedia */}
                    {(showDemo || showRepo) && (
                      <motion.div
                        variants={rise}
                        className="mt-7 flex flex-wrap gap-3"
                      >
                        {showDemo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary group"
                          >
                            Live demo
                            <ArrowUpRight
                              size={16}
                              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </a>
                        )}
                        {showRepo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost"
                          >
                            <Github size={16} />
                            GitHub
                          </a>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* controls */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <div className="flex items-center gap-2">
                    <motion.button
                      type="button"
                      onClick={prev}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Previous project"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition hover:border-accent/60 hover:text-accent hover:shadow-glow-sm"
                    >
                      <ArrowLeft size={18} />
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={next}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Next project"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition hover:border-accent/60 hover:text-accent hover:shadow-glow-sm"
                    >
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause autoplay" : "Resume autoplay"}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500 transition hover:text-white"
                  >
                    {playing ? <Pause size={14} /> : <Play size={14} />}
                    {playing ? "Auto" : "Paused"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- project rail ---------- */}
          <div
            ref={railRef}
            role="tablist"
            aria-label="Select project"
            className="relative -mx-4 mt-8 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PROJECTS.map((p, i) => {
              const on = i === index;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => go(i)}
                  className={`group relative shrink-0 snap-center rounded-2xl border px-4 py-3 text-left transition-colors duration-300 ${
                    on
                      ? "border-accent/40 bg-accent/[0.06]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="rail-glow"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-x-4 -bottom-px h-px bg-accent shadow-glow-sm"
                    />
                  )}
                  <span
                    className={`block font-mono text-[10px] tracking-widest ${
                      on ? "text-accent" : "text-zinc-600"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`mt-0.5 block whitespace-nowrap text-sm transition-colors ${
                      on ? "text-white" : "text-zinc-400 group-hover:text-white"
                    }`}
                  >
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="sr-only" aria-live="polite">
            {project.title}
          </p>
        </div>
      </div>
    </section>
  );
}
