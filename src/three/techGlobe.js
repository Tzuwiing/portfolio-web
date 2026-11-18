import { SKILLS, EXTRAS, clamp } from '../data/portfolioData.js';
import { glowTex, glowSprite } from './threeHelpers.js';

export function createTechGlobe(THREE, gEl, gcv, reduce, getLang) {
  const ACC = 0x38bdf8;
  gEl.classList.add('live');

  const gR = new THREE.WebGLRenderer({ canvas: gcv, antialias: true, alpha: true });
  gR.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  gR.setClearColor(0x000000, 0);

  const gS = new THREE.Scene();
  const gC = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  gC.position.set(0, 0, 10.8);

  const globe = new THREE.Group();
  gS.add(globe);

  const GR = 3.3;
  let gW = 1;
  let gH = 1;

  const gWireMat = new THREE.MeshBasicMaterial({ color: ACC, wireframe: true, transparent: true, opacity: 0.28 });
  const gWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 2), gWireMat);
  const gCore = new THREE.Mesh(new THREE.SphereGeometry(0.62, 28, 28), new THREE.MeshBasicMaterial({ color: 0xdff4ff }));
  const gHalo = glowSprite(THREE, ACC, 8, 0.85);
  globe.add(gWire, gCore, gHalo);

  const DN = 520;
  const dpos = new Float32Array(DN * 3);
  for (let di = 0; di < DN; di++) {
    const dy = 1 - ((di + 0.5) / DN) * 2;
    const dr = Math.sqrt(1 - dy * dy);
    const dph = di * 2.39996;
    dpos[di * 3] = Math.cos(dph) * dr * GR;
    dpos[di * 3 + 1] = dy * GR;
    dpos[di * 3 + 2] = Math.sin(dph) * dr * GR;
  }
  const dg = new THREE.BufferGeometry();
  dg.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  const dotMat = new THREE.PointsMaterial({ color: ACC, size: 0.055, transparent: true, opacity: 0.5, depthWrite: false });
  globe.add(new THREE.Points(dg, dotMat));

  const NODES = SKILLS.map((s) => ({ t: s[0], lvl: s[1], main: true })).concat(
    EXTRAS.map((s) => ({ t: s, lvl: null, main: false }))
  );
  const NN = NODES.length;
  const nodePos = [];

  NODES.forEach((n, i) => {
    const y = 1 - ((i + 0.5) / NN) * 2;
    const r = Math.sqrt(1 - y * y);
    const ph = i * 2.39996 + 0.6;
    n.p = new THREE.Vector3(Math.cos(ph) * r * GR, y * GR, Math.sin(ph) * r * GR);
    n.sp = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, depthTest: false }));
    n.sp.position.copy(n.p);
    globe.add(n.sp);
    nodePos.push(n.p);
  });

  function textTex(n) {
    const c = document.createElement('canvas');
    const f = `${n.main ? '600 54px' : '500 42px'} 'Space Grotesk', system-ui, sans-serif`;
    let g = c.getContext('2d');
    g.font = f;
    const w = Math.ceil(g.measureText(n.t).width) + 44;
    c.width = w;
    c.height = 100;
    g = c.getContext('2d');
    g.font = f;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.shadowColor = 'rgba(0,0,0,.95)';
    g.shadowBlur = 14;
    g.fillStyle = n.main ? '#ffffff' : '#a9b8cc';
    g.fillText(n.t, w / 2, 52);
    n.sp.material.map = new THREE.CanvasTexture(c);
    n.sp.material.needsUpdate = true;
    const h = n.main ? 0.62 : 0.5;
    n.bw = (w / 100) * h;
    n.bh = h;
    n.sp.scale.set(n.bw, n.bh, 1);
  }
  NODES.forEach(textTex);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => NODES.forEach(textTex));
  }

  const lp = [];
  for (let a1 = 0; a1 < NN; a1++) {
    for (let a2 = a1 + 1; a2 < NN; a2++) {
      if (nodePos[a1].distanceTo(nodePos[a2]) < 3.7) {
        lp.push(nodePos[a1].x, nodePos[a1].y, nodePos[a1].z, nodePos[a2].x, nodePos[a2].y, nodePos[a2].z);
      }
    }
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lp), 3));
  const lineMat = new THREE.LineBasicMaterial({ color: ACC, transparent: true, opacity: 0.22 });
  globe.add(new THREE.LineSegments(lg, lineMat));

  const sat = new THREE.Group();
  sat.rotation.set(1.15, 0.2, 0.35);
  gS.add(sat);
  const satRingMat = new THREE.MeshBasicMaterial({ color: ACC, transparent: true, opacity: 0.3 });
  sat.add(new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.012, 6, 140), satRingMat));

  const satBits = [];
  const satMats = [];
  for (let sb = 0; sb < 3; sb++) {
    const smat = new THREE.MeshBasicMaterial({ color: sb === 0 ? 0xffffff : ACC, wireframe: true });
    satMats.push(smat);
    const sm = new THREE.Mesh(new THREE.OctahedronGeometry(0.2), smat);
    sat.add(sm);
    satBits.push({ m: sm, a: sb * 2.094 });
  }

  const pulseRing = new THREE.Mesh(
    new THREE.RingGeometry(0.97, 1, 64),
    new THREE.MeshBasicMaterial({ color: ACC, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  gS.add(pulseRing);
  let gPulse = 0;

  function updateAccent(n) {
    const c = new THREE.Color(n);
    gWireMat.color.copy(c);
    dotMat.color.copy(c);
    lineMat.color.copy(c);
    satRingMat.color.copy(c);
    pulseRing.material.color.copy(c);
    satMats.forEach((m, i) => { if (i) m.color.copy(c); });
    gHalo.material.map = glowTex(THREE, n);
    gHalo.material.needsUpdate = true;
    gPulse = 1;
  }

  function gResize() {
    gW = gcv.clientWidth || 1;
    gH = gcv.clientHeight || 1;
    gR.setSize(gW, gH, false);
    gC.aspect = gW / gH;
    gC.updateProjectionMatrix();
  }
  window.addEventListener('resize', gResize);
  gResize();
  if (window.ResizeObserver) new ResizeObserver(gResize).observe(gcv);

  let gDrag = false, gVy = 0, gMoved = 0, gPx = 0, gPy = 0;
  const gPtr = { x: -999, y: -999, in: false };
  let gHover = -1, gLock = -1, gLockT = 0, gShown = -1;

  gcv.addEventListener('pointerdown', (e) => {
    gDrag = true;
    gMoved = 0;
    gPx = e.clientX;
    gPy = e.clientY;
    try { gcv.setPointerCapture(e.pointerId); } catch { /* ignore capture error */ }
  });
  gcv.addEventListener('pointermove', (e) => {
    const r = gcv.getBoundingClientRect();
    gPtr.x = e.clientX - r.left;
    gPtr.y = e.clientY - r.top;
    gPtr.in = true;
    if (!gDrag) return;
    const dx = e.clientX - gPx;
    const dy = e.clientY - gPy;
    gPx = e.clientX;
    gPy = e.clientY;
    gMoved += Math.abs(dx) + Math.abs(dy);
    globe.rotation.y += dx * 0.009;
    if (e.pointerType === 'mouse') globe.rotation.x = clamp(globe.rotation.x + dy * 0.007, -1.2, 1.2);
    gVy = dx * 0.55;
  });
  const gUp = () => {
    if (gDrag && gMoved < 6 && gHover > -1) { gLock = gHover; gLockT = 2.6; gPulse = 1; }
    gDrag = false;
  };
  gcv.addEventListener('pointerup', gUp);
  gcv.addEventListener('pointercancel', () => { gDrag = false; });
  gcv.addEventListener('pointerleave', () => { gPtr.in = false; gPtr.x = gPtr.y = -999; });

  const gwv = new THREE.Vector3();
  const gpv = new THREE.Vector3();
  const gnameEl = document.getElementById('gname');
  const glvlEl = document.getElementById('glvl');
  const gfillEl = document.getElementById('gfill');

  function render(dt, T) {
    gVy *= Math.pow(0.05, dt);
    if (!gDrag) {
      globe.rotation.y += (gVy + (gHover > -1 ? 0.04 : 0.28 * (reduce ? 0.2 : 1))) * dt;
      const tx = gPtr.in ? (gPtr.y / gH - 0.5) * 0.5 : 0.12;
      globe.rotation.x += (tx - globe.rotation.x) * 0.03;
    }
    gPulse = Math.max(0, gPulse - dt * 1.3);
    gCore.scale.setScalar(1 + Math.sin(T * 2) * 0.05 + gPulse * 0.35);
    gHalo.scale.setScalar(8 * (1 + gPulse * 0.35));
    gWire.rotation.y -= dt * 0.25 * (reduce ? 0.2 : 1);
    gWire.rotation.x += dt * 0.1;
    pulseRing.material.opacity = gPulse * 0.55;
    pulseRing.scale.setScalar(1 + (1 - gPulse) * 5.2);

    satBits.forEach((s) => {
      s.a += dt * 0.5 * (reduce ? 0.2 : 1);
      s.m.position.set(Math.cos(s.a) * 4.5, Math.sin(s.a) * 4.5, 0);
      s.m.rotation.x += dt;
      s.m.rotation.y += dt * 0.7;
    });
    sat.rotation.z += dt * 0.05;

    let best = -1, bd = 52, front = 0, fd = -9;
    NODES.forEach((n, i) => {
      n.sp.getWorldPosition(gwv);
      const depth = clamp((gwv.z + GR) / (2 * GR), 0, 1);
      gpv.copy(gwv).project(gC);
      const sx = (gpv.x * 0.5 + 0.5) * gW;
      const sy = (-gpv.y * 0.5 + 0.5) * gH;
      n.depth = depth;
      if (depth > fd) { fd = depth; front = i; }
      if (gPtr.in && depth > 0.38) {
        const d = Math.hypot(sx - gPtr.x, sy - gPtr.y);
        if (d < bd) { bd = d; best = i; }
      }
    });

    gHover = best;
    gLockT = Math.max(0, gLockT - dt);
    if (gLockT === 0) gLock = -1;

    NODES.forEach((n, i) => {
      const on = i === gHover || i === gLock;
      const k = on ? 1.28 : 1;
      n.s = (n.s || 1) + (k - (n.s || 1)) * 0.15;
      n.sp.scale.set(n.bw * n.s, n.bh * n.s, 1);
      n.sp.material.opacity = on ? 1 : 0.18 + 0.82 * n.depth;
    });

    gcv.style.cursor = gHover > -1 ? 'pointer' : (gDrag ? 'grabbing' : 'grab');
    const show = gLock > -1 ? gLock : (gHover > -1 ? gHover : front);
    if (show !== gShown) {
      gShown = show;
      const nd = NODES[show];
      if (gnameEl) gnameEl.textContent = nd.t;
      if (glvlEl) glvlEl.textContent = nd.lvl != null ? `${nd.lvl}%` : (getLang() === 'en' ? 'tools & practice' : 'alat & praktik');
      if (gfillEl) gfillEl.style.setProperty('--w', `${nd.lvl != null ? nd.lvl : 0}%`);
    }

    gR.render(gS, gC);
  }

  return { updateAccent, render };
}
