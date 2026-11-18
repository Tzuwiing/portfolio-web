import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { clamp } from '../data/portfolioData.js';
import { glowTex, glowSprite } from '../three/threeHelpers.js';

export default function BackgroundCanvas({ accentHex, reduceMotion }) {
  const canvasRef = useRef(null);
  const accentRef = useRef(accentHex);
  const reduceRef = useRef(reduceMotion);
  const updateAccentRef = useRef(null);

  useEffect(() => {
    accentRef.current = accentHex;
    if (updateAccentRef.current) {
      updateAccentRef.current(accentHex);
    }
  }, [accentHex]);

  useEffect(() => {
    reduceRef.current = reduceMotion;
  }, [reduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const sc = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
    cam.position.set(0, 0, 14);

    const N = reduceRef.current ? 500 : 1400;
    const sp = new Float32Array(N * 3);
    const sg = new THREE.BufferGeometry();
    for (let i = 0; i < N; i++) {
      sp[i * 3] = (Math.random() - 0.5) * 80;
      sp[i * 3 + 1] = (Math.random() - 0.5) * 60;
      sp[i * 3 + 2] = -Math.random() * 50 + 5;
    }
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xbfe4ff,
      size: 0.09,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const starPts = new THREE.Points(sg, starMat);
    sc.add(starPts);

    const initialAccent = accentRef.current;
    const orb = new THREE.Group();
    sc.add(orb);
    orb.visible = false;

    const wireMat = new THREE.MeshBasicMaterial({
      color: initialAccent,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.3, 1), wireMat);
    const innerMat = new THREE.MeshBasicMaterial({
      color: initialAccent,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 0), innerMat);
    const heart = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xdff4ff, transparent: true, opacity: 0.95 })
    );
    const halo = glowSprite(initialAccent, 11, 0.8);
    orb.add(wire, inner, heart, halo);

    const rings = [];
    [
      [3.2, 0.2, 0.3],
      [3.9, 1.1, -0.4],
      [4.6, -0.5, 0.9],
    ].forEach((d, k) => {
      const m = new THREE.MeshBasicMaterial({
        color: initialAccent,
        transparent: true,
        opacity: 0.35 - k * 0.08,
      });
      const r = new THREE.Mesh(new THREE.TorusGeometry(d[0], 0.012, 6, 128), m);
      r.rotation.set(Math.PI / 2 + d[1], d[2], 0);
      orb.add(r);
      rings.push(r);
    });

    const bits = [];
    const bitMats = [];
    for (let b = 0; b < 18; b++) {
      const geo = [
        new THREE.OctahedronGeometry(0.17),
        new THREE.BoxGeometry(0.22, 0.22, 0.22),
        new THREE.TetrahedronGeometry(0.2),
      ][b % 3];
      const bm = new THREE.MeshBasicMaterial({
        color: b % 4 === 0 ? 0xffffff : initialAccent,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      });
      bitMats.push(bm);
      const bit = new THREE.Mesh(geo, bm);
      orb.add(bit);
      bits.push({
        m: bit,
        r: 3 + Math.random() * 2.6,
        a: Math.random() * 6.28,
        s: (0.15 + Math.random() * 0.35) * (Math.random() < 0.5 ? -1 : 1),
        y: (Math.random() - 0.5) * 3.4,
        ph: Math.random() * 6,
      });
    }

    const sparks = [];
    const sparkAt = (x, y) => {
      const v = new THREE.Vector3(
        (x / window.innerWidth) * 2 - 1,
        -(y / window.innerHeight) * 2 + 1,
        0.5
      ).unproject(cam);
      const dir = v.sub(cam.position).normalize();
      const pos = cam.position.clone().add(dir.multiplyScalar(-cam.position.z / dir.z));
      const n = 26;
      const pa = new Float32Array(n * 3);
      const vel = [];
      for (let i = 0; i < n; i++) {
        pa[i * 3] = pos.x;
        pa[i * 3 + 1] = pos.y;
        pa[i * 3 + 2] = pos.z;
        const a = Math.random() * 6.283;
        const s = 1.5 + Math.random() * 3.5;
        vel.push([Math.cos(a) * s, Math.sin(a) * s, (Math.random() - 0.5) * 2]);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pa, 3));
      const m = new THREE.PointsMaterial({
        color: accentRef.current,
        size: 0.16,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const p = new THREE.Points(g, m);
      sc.add(p);
      sparks.push({ p, v: vel, t: 0 });
    };

    const onPointerDown = (e) => {
      if (
        reduceRef.current ||
        e.target.closest('a, button, input, textarea, label, .card, .pcard, form, nav, #result')
      ) {
        return;
      }
      if (window.scrollY > window.innerHeight * 0.9) return;
      sparkAt(e.clientX, e.clientY);
    };

    updateAccentRef.current = (n) => {
      const c = new THREE.Color(n);
      wireMat.color.copy(c);
      innerMat.color.copy(c);
      rings.forEach((r) => r.material.color.copy(c));
      bitMats.forEach((m, i) => {
        if (i % 4 !== 0) m.color.copy(c);
      });
      if (halo.material.map) halo.material.map.dispose();
      halo.material.map = glowTex(n);
      halo.material.needsUpdate = true;
    };

    let W = 1;
    let H = 1;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      renderer.setSize(W, H, false);
      cam.aspect = W / H;
      cam.updateProjectionMatrix();
    };

    let mx = 0;
    let my = 0;
    let smx = 0;
    let smy = 0;
    const onPointerMove = (e) => {
      mx = (e.clientX / W) * 2 - 1;
      my = (e.clientY / H) * 2 - 1;
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', resize);
    resize();

    let last = performance.now();
    let T0 = 0;
    let vel = 0;
    let ly = window.scrollY;
    let scl = 1;
    let rafId = 0;

    const frame = (now) => {
      rafId = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      T0 += dt;

      const y = window.scrollY;
      const sv = Math.abs(y - ly) / Math.max(dt, 0.001);
      ly = y;
      vel += (clamp(sv / 2500, 0, 3) - vel) * 0.08;
      smx += (mx - smx) * 0.05;
      smy += (my - smy) * 0.05;

      const rm = reduceRef.current ? 0.15 : 1;
      const mobile = W / H < 0.9;
      const p = clamp(y / (H * 0.9), 0, 1);
      const baseS = mobile ? 0.62 : 1;
      const tx = mobile ? 0 : 4.3;
      const ty = mobile ? 2.9 : 0.1;

      orb.position.x += (tx * (1 - p * 0.35) - orb.position.x) * 0.1;
      orb.position.y += (ty + p * 2.4 - orb.position.y) * 0.1;
      scl += (baseS * (1 - p * 0.5) - scl) * 0.1;
      orb.scale.setScalar(scl);

      const fade = 1 - p * 0.72;
      wireMat.opacity = 0.55 * fade;
      innerMat.opacity = 0.3 * fade;
      heart.material.opacity = 0.95 * fade;
      halo.material.opacity = 0.8 * fade;

      rings.forEach((r, i) => {
        r.material.opacity = (0.35 - i * 0.08) * fade;
        r.rotation.z += dt * (0.12 + i * 0.07 + vel * 0.8) * rm;
      });
      wire.rotation.y += dt * (0.18 + vel * 0.9) * rm;
      wire.rotation.x += dt * 0.08 * rm;
      inner.rotation.y -= dt * 0.3 * rm;
      inner.rotation.z += dt * 0.14 * rm;
      orb.rotation.y += (smx * 0.6 - orb.rotation.y) * 0.04;
      orb.rotation.x += (smy * 0.4 - orb.rotation.x) * 0.04;
      heart.scale.setScalar(1 + Math.sin(T0 * 2) * 0.06);

      bits.forEach((b) => {
        b.a += dt * b.s * (1 + vel * 2) * rm;
        b.m.position.set(
          Math.cos(b.a) * b.r,
          b.y + Math.sin(T0 + b.ph) * 0.3,
          Math.sin(b.a) * b.r
        );
        b.m.rotation.x += dt * 0.8 * rm;
        b.m.rotation.y += dt * 0.6 * rm;
      });

      starPts.rotation.y += dt * 0.006 * rm;
      starPts.position.y = y * 0.0016;
      starMat.opacity = 0.75;
      cam.position.x = smx * 0.5;
      cam.position.y = -smy * 0.35 - y * 0.0004;
      cam.lookAt(0, 0, 0);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.t += dt;
        const pa = s.p.geometry.attributes.position;
        for (let k = 0; k < s.v.length; k++) {
          pa.array[k * 3] += s.v[k][0] * dt;
          pa.array[k * 3 + 1] += s.v[k][1] * dt;
          pa.array[k * 3 + 2] += s.v[k][2] * dt;
        }
        pa.needsUpdate = true;
        s.p.material.opacity = Math.max(0, 1 - s.t / 0.9);
        if (s.t > 0.9) {
          sc.remove(s.p);
          s.p.geometry.dispose();
          s.p.material.dispose();
          sparks.splice(i, 1);
        }
      }

      renderer.render(sc, cam);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      sparks.forEach((s) => {
        sc.remove(s.p);
        s.p.geometry.dispose();
        s.p.material.dispose();
      });
      sg.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="bg" ref={canvasRef} aria-hidden="true" />;
}
