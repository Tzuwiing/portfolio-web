import { THEMES, hex } from '../data/portfolioData.js';

export function initTheme(getOnAccentCallback) {
  let accentHex = 0x38bdf8;
  const sw = document.getElementById('sw');

  function setAccent(n) {
    accentHex = n;
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    const st = document.documentElement.style;
    st.setProperty('--accent', hex(n));
    st.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    const cb = getOnAccentCallback();
    if (typeof cb === 'function') cb(n);
  }

  if (sw) {
    THEMES.forEach((t, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.style.setProperty('--c', hex(t[1]));
      b.setAttribute('aria-label', t[0]);
      b.setAttribute('aria-pressed', String(i === 0));
      b.addEventListener('click', () => {
        setAccent(t[1]);
        sw.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      });
      sw.appendChild(b);
    });
  }

  return () => accentHex;
}
