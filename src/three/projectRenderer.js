import * as THREE from 'three';
import { buildProjectBody } from './threeHelpers.js';

class SharedProjectRenderer {
  constructor() {
    this.items = new Map();
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.rafId = 0;
    this.last = 0;
    this.t0 = 0;
  }

  ensureInit() {
    if (this.renderer) return true;
    try {
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(1);
      renderer.setSize(480, 320, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 480 / 320, 0.1, 50);
      camera.position.set(0, 0.35, 5.2);
      camera.lookAt(0, 0, 0);

      scene.add(new THREE.AmbientLight(0x8899bb, 1.0));
      const dl = new THREE.DirectionalLight(0xffffff, 1.1);
      dl.position.set(2, 3, 4);
      scene.add(dl);

      const rim = new THREE.PointLight(0xffffff, 0.9, 20);
      rim.position.set(-3, -1, 2);
      scene.add(rim);

      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;
      return true;
    } catch {
      return false;
    }
  }

  register(id, { canvas, project, reduceMotion }) {
    if (!this.ensureInit()) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const entry = {
      canvas,
      ctx,
      body: buildProjectBody(project),
      vis: true,
      hov: false,
      mx: 0,
      my: 0,
      rot: Math.random() * 6,
      reduceMotion: Boolean(reduceMotion),
    };
    this.items.set(id, entry);
    this.startLoop();
    return entry;
  }

  unregister(id) {
    this.items.delete(id);
    if (this.items.size === 0 && this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  startLoop() {
    if (this.rafId) return;
    this.last = performance.now();

    const frame = (now) => {
      this.rafId = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      this.t0 += dt;

      this.items.forEach((item) => {
        if (!item.vis) return;
        const speed = item.hov ? 1.8 : 0.45;
        const motionFactor = item.reduceMotion && !item.hov ? 0 : 1;
        item.rot += dt * speed * motionFactor;
        item.body.rotation.y = item.rot + item.mx * 0.7;
        item.body.rotation.x = 0.18 - item.my * 0.35;
        item.body.position.y = Math.sin(this.t0 * 1.4 + item.rot) * 0.06;

        this.scene.add(item.body);
        this.renderer.render(this.scene, this.camera);
        this.scene.remove(item.body);

        item.ctx.clearRect(0, 0, 480, 320);
        item.ctx.drawImage(this.renderer.domElement, 0, 0, 480, 320);
      });
    };

    this.rafId = requestAnimationFrame(frame);
  }
}

export const projectRenderer = new SharedProjectRenderer();
