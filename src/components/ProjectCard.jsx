import { useEffect, useId, useRef } from "react";
import { clamp, hasLink, hex } from "../data/portfolioData.js";
import { useInView } from "../hooks/useInView.js";
import { useTilt } from "../hooks/useTilt.js";
import { projectRenderer } from "../three/projectRenderer.js";

export default function ProjectCard({ project, lang, reduceMotion }) {
  const id = useId();
  const canvasRef = useRef(null);
  const entryRef = useRef(null);
  const [inViewRef, inView] = useInView({ threshold: 0.08 });
  const tiltRef = useTilt(4, reduceMotion);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const entry = projectRenderer.register(id, {
      canvas,
      project,
      reduceMotion,
    });
    entryRef.current = entry;
    return () => {
      projectRenderer.unregister(id);
      entryRef.current = null;
    };
  }, [id, project, reduceMotion]);

  useEffect(() => {
    if (entryRef.current) {
      entryRef.current.vis = inView;
    }
  }, [inView]);

  const handlePointerEnter = () => {
    if (entryRef.current) entryRef.current.hov = true;
  };

  const handlePointerLeave = () => {
    if (entryRef.current) {
      entryRef.current.hov = false;
      entryRef.current.mx = 0;
      entryRef.current.my = 0;
    }
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !entryRef.current) return;
    const r = canvas.getBoundingClientRect();
    entryRef.current.mx = clamp(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -1,
      1,
    );
    entryRef.current.my = clamp(
      ((e.clientY - r.top) / r.height) * 2 - 1,
      -1,
      1,
    );
  };

  const setRefs = (node) => {
    inViewRef.current = node;
    tiltRef.current = node;
  };

  return (
    <article
      ref={setRefs}
      className={`pcard glass rev${inView ? " in" : ""}`}
      data-plat={project.platform}
      style={{ "--c": hex(project.color) }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <div className="stage">
        <canvas ref={canvasRef} width="480" height="320" aria-hidden="true" />
        <span className="plat">{project.platform}</span>
      </div>

      <div className="pbody">
        <h3>{project.title}</h3>
        <p className="psub">{project.sub}</p>
        <p className="pdesc">{lang === "en" ? project.en : project.id}</p>
        <ul className="chips">
          {project.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <div className="pact">
          {hasLink(project.demo) && (
            <a
              className="btn primary sm"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo ↗
            </a>
          )}
          {hasLink(project.repo) && (
            <a
              className="btn sm"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          )}
          {!hasLink(project.demo) && (
            <span className="nodemo">
              {lang === "en" ? "No live demo yet" : "Belum ada demo online"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
