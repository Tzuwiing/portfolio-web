import * as THREE from 'three';

export function glowTex(color) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const col = new THREE.Color(color);
  const rgb = `${Math.round(col.r * 255)},${Math.round(col.g * 255)},${Math.round(col.b * 255)}`;
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, `rgba(${rgb},1)`);
  gr.addColorStop(0.25, `rgba(${rgb},.35)`);
  gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function glowSprite(color, size, op) {
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTex(color),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: op,
    })
  );
  s.scale.set(size, size, 1);
  return s;
}

export function buildProjectBody(p) {
  const g = new THREE.Group();
  const col = p.color;
  const mat = (e) =>
    new THREE.MeshStandardMaterial({
      color: col,
      emissive: col,
      emissiveIntensity: e == null ? 0.25 : e,
      roughness: 0.4,
      metalness: 0.35,
    });
  const addMesh = (geo, m) => {
    const x = new THREE.Mesh(geo, m || mat());
    g.add(x);
    return x;
  };
  const k = p.kind;

  if (k === 'prayer') {
    const m = addMesh(new THREE.TorusGeometry(0.85, 0.27, 20, 48, Math.PI * 1.55));
    m.rotation.z = Math.PI * 0.2;
    addMesh(new THREE.SphereGeometry(0.2, 14, 14)).position.set(0.2, 0.15, 0);
  } else if (k === 'tasks') {
    for (let i = 0; i < 3; i++) {
      const m = addMesh(new THREE.BoxGeometry(1.5 - i * 0.18, 0.32, 1.0));
      m.position.y = (i - 1) * 0.5;
      m.rotation.y = i * 0.35;
      m.material.emissiveIntensity = 0.2 + i * 0.15;
    }
  } else if (k === 'bmi') {
    addMesh(new THREE.SphereGeometry(0.8, 32, 32));
    const m = addMesh(new THREE.TorusGeometry(1.22, 0.05, 8, 64), mat(0.9));
    m.rotation.x = Math.PI / 2.3;
  } else if (k === 'finance') {
    for (let j = 0; j < 4; j++) {
      const m = addMesh(new THREE.CylinderGeometry(0.88, 0.88, 0.2, 40));
      m.position.y = (j - 1.5) * 0.27;
      m.rotation.y = j * 0.4;
    }
  } else if (k === 'books') {
    const hs = [1.5, 1.15, 1.7, 1.3];
    for (let q = 0; q < 4; q++) {
      const m = addMesh(new THREE.BoxGeometry(0.28, hs[q], 0.85));
      m.position.set((q - 1.5) * 0.36, 0, 0);
      m.rotation.z = q === 3 ? 0.22 : 0;
      m.material.emissiveIntensity = 0.15 + q * 0.1;
    }
  } else if (k === 'mobile') {
    addMesh(new THREE.BoxGeometry(0.85, 1.55, 0.13));
    const m = addMesh(new THREE.PlaneGeometry(0.7, 1.36), new THREE.MeshBasicMaterial({ color: 0xcffafe }));
    m.position.z = 0.072;
  } else {
    addMesh(new THREE.IcosahedronGeometry(1.05, 0));
    addMesh(
      new THREE.IcosahedronGeometry(1.25, 0),
      new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.5 })
    );
  }

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.012, 6, 80),
    new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.45 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -1.15;
  g.add(ring);
  return g;
}
