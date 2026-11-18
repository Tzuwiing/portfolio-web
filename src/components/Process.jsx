import { useEffect, useRef, useState } from 'react';
import { PROCESS_STEPS, clamp } from '../data/portfolioData.js';
import { useInView } from '../hooks/useInView.js';

export default function Process({ lang }) {
  const [headRef, headIn] = useInView({ threshold: 0.08 });
  const stepsRef = useRef(null);
  const stepRefs = useRef([]);
  const [fill, setFill] = useState(0);
  const [activeSteps, setActiveSteps] = useState([false, false, false, false]);

  useEffect(() => {
    const onScroll = () => {
      const stepsEl = stepsRef.current;
      if (!stepsEl) return;
      const r = stepsEl.getBoundingClientRect();
      const line = window.innerHeight * 0.62;
      setFill(clamp((line - r.top) / r.height, 0, 1));
      setActiveSteps(
        stepRefs.current.map((el) => {
          if (!el) return false;
          const sr = el.getBoundingClientRect();
          return sr.top + 40 < line;
        })
      );
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="process">
      <div className="wrap proc">
        <header ref={headRef} className={`sec-head rev${headIn ? ' in' : ''}`}>
          <p className="eyebrow">{lang === 'en' ? 'Process' : 'Cara kerja'}</p>
          <h2>
            {lang === 'en'
              ? 'From design file to shipped product.'
              : 'Dari file desain sampai produk yang rilis.'}
          </h2>
          <p>
            {lang === 'en'
              ? 'Four steps I follow on every project. Scroll to light them up.'
              : 'Empat langkah yang saya ikuti di setiap proyek. Scroll untuk melihat tiap langkahnya menyala.'}
          </p>
        </header>

        <ol className="steps" ref={stepsRef} style={{ '--fill': fill }}>
          {PROCESS_STEPS.map((step, idx) => (
            <li
              key={step.num}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              className={`step${activeSteps[idx] ? ' on' : ''}`}
            >
              <span className="n">{step.num}</span>
              <div>
                <h3>{lang === 'en' ? step.titleEn : step.titleId}</h3>
                <div className="s">{lang === 'en' ? step.subEn : step.subId}</div>
                <p>{lang === 'en' ? step.descEn : step.descId}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
