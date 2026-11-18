import { useEffect, useState } from 'react';
import { SKILLS, clamp } from '../data/portfolioData.js';
import { useInView } from '../hooks/useInView.js';
import { useTilt } from '../hooks/useTilt.js';

function CountUp({ to, active }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    let rafId = 0;

    const tick = (now) => {
      const k = clamp((now - t0) / 1100, 0, 1);
      setVal(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [to, active]);

  return <b>{('0' + val).slice(-2)}</b>;
}

export default function About({ lang, reduceMotion }) {
  const [headRef, headIn] = useInView({ threshold: 0.08 });
  const [profileInRef, profileIn] = useInView({ threshold: 0.08 });
  const [numsInRef, numsIn] = useInView({ threshold: 0.25 });
  const [skillsInRef, skillsIn] = useInView({ threshold: 0.25 });
  const [focusInRef, focusIn] = useInView({ threshold: 0.08 });

  const tilt1 = useTilt(3, reduceMotion);
  const tilt2 = useTilt(3, reduceMotion);
  const tilt3 = useTilt(3, reduceMotion);
  const tilt4 = useTilt(3, reduceMotion);

  const mergeRefs = (...refs) => (node) => {
    refs.forEach((r) => {
      if (typeof r === 'function') r(node);
      else if (r) r.current = node;
    });
  };

  return (
    <section id="about">
      <div className="wrap">
        <header ref={headRef} className={`sec-head rev${headIn ? ' in' : ''}`}>
          <p className="eyebrow">{lang === 'en' ? 'About' : 'Tentang saya'}</p>
          <h2>
            {lang === 'en'
              ? 'A calm approach to building for screens.'
              : 'Pendekatan yang tenang untuk membangun tampilan layar.'}
          </h2>
          <p>
            {lang === 'en'
              ? 'A quick look at who I am, what I work with and what I focus on.'
              : 'Kenalan singkat: siapa saya, alat apa yang saya pakai, dan apa yang jadi fokus saya.'}
          </p>
        </header>

        <div className="bento">
          <article
            ref={mergeRefs(profileInRef, tilt1)}
            className={`card glass c7 rev tilt${profileIn ? ' in' : ''}`}
          >
            <p className="eyebrow">{lang === 'en' ? 'Profile' : 'Profil'}</p>
            <h3>
              {lang === 'en'
                ? "Hi, I'm Jusuf — a junior developer who cares about the details."
                : 'Hai, saya Jusuf, junior developer yang peduli pada detail.'}
            </h3>
            <p>
              {lang === 'en'
                ? 'I turn designs into fast, responsive web and mobile apps. My daily tools are React JS, Tailwind CSS and Flutter, and I like keeping code modular and interfaces simple, so features snap together and stay easy to maintain.'
                : 'Saya mengubah desain menjadi aplikasi web dan mobile yang cepat dan responsif. Alat harian saya React JS, Tailwind CSS, dan Flutter. Saya suka menjaga kode tetap modular dan antarmuka tetap sederhana, supaya fitur mudah dipasang dan mudah dirawat.'}
            </p>
            <p>
              {lang === 'en'
                ? "I'm always learning, and looking for the next real project to grow with."
                : 'Saya selalu belajar, dan sedang mencari proyek nyata berikutnya untuk bertumbuh bersama.'}
            </p>
            <ul className="chips">
              <li className="chip">{lang === 'en' ? 'Clean code' : 'Kode bersih'}</li>
              <li className="chip">{lang === 'en' ? 'Responsive' : 'Responsif'}</li>
              <li className="chip">Pixel-perfect</li>
              <li className="chip">{lang === 'en' ? 'Always learning' : 'Selalu belajar'}</li>
            </ul>
          </article>

          <article
            ref={mergeRefs(numsInRef, tilt2)}
            className={`card glass c5 rev tilt${numsIn ? ' in' : ''}`}
          >
            <p className="eyebrow">{lang === 'en' ? 'By the numbers' : 'Dalam angka'}</p>
            <div className="nums">
              <div>
                <CountUp to={7} active={numsIn} />
                <span>{lang === 'en' ? 'Projects' : 'Proyek'}</span>
              </div>
              <div>
                <CountUp to={4} active={numsIn} />
                <span>{lang === 'en' ? 'Web apps' : 'Aplikasi web'}</span>
              </div>
              <div>
                <CountUp to={3} active={numsIn} />
                <span>{lang === 'en' ? 'Mobile apps' : 'Aplikasi mobile'}</span>
              </div>
            </div>
            <div className="rule" />
            <p>
              {lang === 'en'
                ? 'Every project is open on GitHub, with live demos where available.'
                : 'Semua proyek terbuka di GitHub, dengan live demo bila tersedia.'}
            </p>
          </article>

          <article
            ref={mergeRefs(skillsInRef, tilt3)}
            className={`card glass c7 rev tilt${skillsIn ? ' in' : ''}`}
          >
            <p className="eyebrow">Tech stack</p>
            <ul className={`skills${skillsIn ? ' in' : ''}`}>
              {SKILLS.map(([name, level], i) => (
                <li key={name}>
                  <div className="row">
                    <span>{name}</span>
                    <i>{level}%</i>
                  </div>
                  <div
                    className="bar"
                    role="progressbar"
                    aria-label={name}
                    aria-valuenow={level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ '--w': `${level}%`, '--d': `${i * 0.07}s` }}
                  />
                </li>
              ))}
            </ul>
          </article>

          <article
            ref={mergeRefs(focusInRef, tilt4)}
            className={`card glass c5 rev tilt${focusIn ? ' in' : ''}`}
          >
            <p className="eyebrow">{lang === 'en' ? 'What I focus on' : 'Fokus saya'}</p>
            <ul className="focus">
              <li>
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                  </svg>
                </span>
                <div>
                  <h4>{lang === 'en' ? 'Web apps' : 'Aplikasi web'}</h4>
                  <p>
                    {lang === 'en'
                      ? 'Responsive interfaces with React JS & Tailwind CSS.'
                      : 'Antarmuka responsif dengan React JS & Tailwind CSS.'}
                  </p>
                </div>
              </li>
              <li>
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <rect x="7" y="2" width="10" height="20" rx="2.5" />
                    <path d="M11 18h2" />
                  </svg>
                </span>
                <div>
                  <h4>{lang === 'en' ? 'Mobile apps' : 'Aplikasi mobile'}</h4>
                  <p>
                    {lang === 'en'
                      ? 'One Flutter codebase for Android and iOS.'
                      : 'Satu basis kode Flutter untuk Android dan iOS.'}
                  </p>
                </div>
              </li>
              <li>
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3l9 5-9 5-9-5 9-5z" />
                    <path d="M3 13l9 5 9-5M3 17.5l9 5 9-5" opacity=".6" />
                  </svg>
                </span>
                <div>
                  <h4>UI slicing</h4>
                  <p>
                    {lang === 'en'
                      ? 'Figma designs rebuilt to the pixel.'
                      : 'Desain Figma dibangun ulang sampai ke piksel.'}
                  </p>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
