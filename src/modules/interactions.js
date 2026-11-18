import { clamp } from '../data/portfolioData.js';

export function initInteractions(cards, reduce) {
  document.querySelectorAll('[data-go]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const t = document.getElementById(a.getAttribute('data-go'));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const navLinks = Array.from(document.querySelectorAll('.links a'));
  const secObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('on', a.getAttribute('data-go') === en.target.id));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  document.querySelectorAll('main section').forEach((s) => secObs.observe(s));

  const revObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          revObs.unobserve(en.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.rev').forEach((el) => revObs.observe(el));

  const skillsEl = document.getElementById('skills');
  const numsEl = document.getElementById('nums');
  let counted = false;
  const statObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        if (en.target === skillsEl) skillsEl.classList.add('in');
        if (en.target === numsEl && !counted) {
          counted = true;
          numsEl.querySelectorAll('b').forEach((b) => {
            const to = +b.getAttribute('data-to');
            const t0 = performance.now();
            (function tick(now) {
              const k = clamp((now - t0) / 1100, 0, 1);
              b.textContent = ('0' + Math.round(to * (1 - Math.pow(1 - k, 3)))).slice(-2);
              if (k < 1) requestAnimationFrame(tick);
            })(t0);
          });
        }
      });
    },
    { threshold: 0.3 }
  );
  if (skillsEl) statObs.observe(skillsEl);
  if (numsEl) statObs.observe(numsEl);

  const words = ['React JS', 'Tailwind CSS', 'Flutter'];
  let wi = 0;
  let rotw = document.getElementById('rotw');
  if (!reduce && rotw) {
    setInterval(() => {
      wi = (wi + 1) % words.length;
      const n = rotw.cloneNode(false);
      n.id = 'rotw';
      n.textContent = words[wi];
      rotw.parentNode.replaceChild(n, rotw);
      rotw = n;
    }, 2400);
  }

  const stepsEl = document.getElementById('steps');
  const stepEls = stepsEl ? Array.from(stepsEl.querySelectorAll('.step')) : [];
  const prog = document.getElementById('prog');
  function onScroll() {
    if (!stepsEl || !prog) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    const r = stepsEl.getBoundingClientRect();
    const line = window.innerHeight * 0.62;
    stepsEl.style.setProperty('--fill', clamp((line - r.top) / r.height, 0, 1));
    stepEls.forEach((s) => {
      const sr = s.getBoundingClientRect();
      s.classList.toggle('on', sr.top + 40 < line);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  function tilt(el, max) {
    el.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--ry', `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    });
  }

  if (!reduce) {
    document.querySelectorAll('.tilt').forEach((el) => tilt(el, 3));
    cards.forEach((c) => tilt(c.el, 4));
  }

  cards.forEach((c) => {
    c.el.addEventListener('pointerenter', () => { c.hov = true; });
    c.el.addEventListener('pointerleave', () => { c.hov = false; c.mx = 0; c.my = 0; });
    c.el.addEventListener('pointermove', (e) => {
      const r = c.canvas.getBoundingClientRect();
      c.mx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      c.my = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
    });
  });
}
