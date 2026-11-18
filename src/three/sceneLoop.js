import { clamp } from '../data/portfolioData.js';
import { buildProjectBody } from './threeHelpers.js';
import { createBgSky } from './bgSky.js';
import { createTechGlobe } from './techGlobe.js';

export function initThreeScene({ reduce, cards, getAccentHex, getLang }) {
  const THREE = window.THREE;
  if (!THREE) return null;

  try {
    const bgCanvas = document.getElementById('bg');
    const gEl = document.getElementById('globe');
    const gcv = document.getElementById('gcv');

    const sky = createBgSky(THREE, bgCanvas, reduce, getAccentHex);
    const globe = createTechGlobe(THREE, gEl, gcv, reduce, getLang);

    const shR = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    shR.setPixelRatio(1);
    shR.setSize(480, 320, false);
    shR.setClearColor(0x000000, 0);

    const shS = new THREE.Scene();
    const shC = new THREE.PerspectiveCamera(38, 480 / 320, 0.1, 50);
    shC.position.set(0, 0.35, 5.2);
    shC.lookAt(0, 0, 0);
    shS.add(new THREE.AmbientLight(0x8899bb, 1.0));
    const dl = new THREE.DirectionalLight(0xffffff, 1.1);
    dl.position.set(2, 3, 4);
    shS.add(dl);
    const rim = new THREE.PointLight(0xffffff, 0.9, 20);
    rim.position.set(-3, -1, 2);
    shS.add(rim);

    cards.forEach((c) => {
      c.body = buildProjectBody(THREE, c.p);
      c.ctx = c.canvas.getContext('2d');
    });

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const c = cards.find((x) => x.el === en.target);
          if (c) c.vis = en.isIntersecting;
        });
      },
      { rootMargin: '80px' }
    );
    cards.forEach((c) => cio.observe(c.el));

    let W = 1;
    let H = 1;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      sky.resize(W, H);
    };
    window.addEventListener('resize', resize);
    resize();

    let mx = 0, my = 0, smx = 0, smy = 0;
    let last = performance.now(), T0 = 0, vel = 0, ly = window.scrollY;
    window.addEventListener('pointermove', (e) => {
      mx = (e.clientX / W) * 2 - 1;
      my = (e.clientY / H) * 2 - 1;
    });

    function frame(now) {
      requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      T0 += dt;

      const y = window.scrollY;
      const sv = Math.abs(y - ly) / Math.max(dt, 0.001);
      ly = y;
      vel += (clamp(sv / 2500, 0, 3) - vel) * 0.08;
      smx += (mx - smx) * 0.05;
      smy += (my - smy) * 0.05;

      sky.render(dt, T0, W, H, y, vel, smx, smy);
      globe.render(dt, T0);

      cards.forEach((c) => {
        if (!c.vis || c.el.hidden) return;
        c.rot += dt * (c.hov ? 1.8 : 0.45) * (reduce && !c.hov ? 0 : 1);
        c.body.rotation.y = c.rot + c.mx * 0.7;
        c.body.rotation.x = 0.18 - c.my * 0.35;
        c.body.position.y = Math.sin(T0 * 1.4 + c.rot) * 0.06;
        shS.add(c.body);
        shR.render(shS, shC);
        shS.remove(c.body);
        c.ctx.clearRect(0, 0, 480, 320);
        c.ctx.drawImage(shR.domElement, 0, 0, 480, 320);
      });
    }

    requestAnimationFrame((t) => {
      last = t;
      frame(t);
    });

    return (n) => {
      sky.updateAccent(n);
      globe.updateAccent(n);
    };
  } catch (err) {
    const ge = document.getElementById('globe');
    if (ge) ge.classList.remove('live');
    console.warn('3D disabled:', err);
    return null;
  }
}
