import { PROJECTS, SKILLS, EXTRAS, hex, hasLink, T } from '../data/portfolioData.js';

export function renderSkillsAndFallback() {
  const gfall = document.getElementById('gfall');
  if (gfall) {
    gfall.innerHTML = SKILLS.map((s) => `<li class="chip">${s[0]}</li>`)
      .concat(EXTRAS.map((s) => `<li class="chip">${s}</li>`))
      .join('');
  }

  const skillsEl = document.getElementById('skills');
  if (skillsEl) {
    skillsEl.innerHTML = SKILLS.map(
      (s, i) =>
        `<li><div class="row"><span>${s[0]}</span><i>${s[1]}%</i></div><div class="bar" role="progressbar" aria-label="${s[0]}" aria-valuenow="${s[1]}" aria-valuemin="0" aria-valuemax="100" style="--w:${s[1]}%;--d:${i * 0.07}s"></div></li>`
    ).join('');
  }
}

export function renderProjects() {
  const grid = document.getElementById('grid');
  const cards = [];
  if (!grid) return cards;

  PROJECTS.forEach((p) => {
    const el = document.createElement('article');
    el.className = 'pcard glass rev';
    el.setAttribute('data-plat', p.platform);
    el.style.setProperty('--c', hex(p.color));

    let acts = '';
    if (hasLink(p.demo)) {
      acts += `<a class="btn primary sm" href="${p.demo}" target="_blank" rel="noopener">Live demo &nearr;</a>`;
    }
    if (hasLink(p.repo)) {
      acts += `<a class="btn sm" href="${p.repo}" target="_blank" rel="noopener">GitHub &nearr;</a>`;
    }
    if (!hasLink(p.demo)) {
      acts += `<span class="nodemo">${T('Belum ada demo online', 'No live demo yet')}</span>`;
    }

    el.innerHTML =
      `<div class="stage"><canvas width="480" height="320" aria-hidden="true"></canvas><span class="plat">${p.platform}</span></div>` +
      `<div class="pbody"><h3>${p.title}</h3><p class="psub">${p.sub}</p><p class="pdesc">${T(p.id, p.en)}</p>` +
      `<ul class="chips">${p.tech.map((t) => `<li class="chip">${t}</li>`).join('')}</ul><div class="pact">${acts}</div></div>`;

    grid.appendChild(el);
    cards.push({ el, canvas: el.querySelector('canvas'), p, vis: false, hov: false, mx: 0, my: 0, rot: Math.random() * 6 });
  });

  const filters = document.getElementById('filters');
  if (filters) {
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const f = b.getAttribute('data-f');
      filters.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      cards.forEach((c) => {
        c.el.hidden = !(f === 'all' || c.p.platform === f);
      });
    });
  }

  return cards;
}
