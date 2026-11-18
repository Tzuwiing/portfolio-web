import { useEffect, useState } from 'react';
import { hex } from './data/portfolioData.js';
import BackgroundCanvas from './components/BackgroundCanvas.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Process from './components/Process.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('jf-lang') === 'en' ? 'en' : 'id';
    } catch {
      return 'id';
    }
  });

  const [accentHex, setAccentHex] = useState(0x38bdf8);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(() =>
    Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('jf-lang', lang);
    } catch {
      /* ignore storage errors */
    }
  }, [lang]);

  useEffect(() => {
    const r = (accentHex >> 16) & 255;
    const g = (accentHex >> 8) & 255;
    const b = accentHex & 255;
    const st = document.documentElement.style;
    st.setProperty('--accent', hex(accentHex));
    st.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
  }, [accentHex]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section'));
    const secObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setActiveSection(en.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => secObs.observe(s));
    return () => secObs.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const navigateTo = (e, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <BackgroundCanvas accentHex={accentHex} reduceMotion={reduceMotion} />
      <div
        id="prog"
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <Navbar
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'id' ? 'en' : 'id'))}
        activeSection={activeSection}
        onNavigate={navigateTo}
      />

      <main>
        <Hero
          lang={lang}
          accentHex={accentHex}
          onChangeAccent={setAccentHex}
          onNavigate={navigateTo}
          reduceMotion={reduceMotion}
        />
        <About lang={lang} reduceMotion={reduceMotion} />
        <Process lang={lang} />
        <Projects lang={lang} reduceMotion={reduceMotion} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} onNavigate={navigateTo} />
    </>
  );
}
