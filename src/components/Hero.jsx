import { useEffect, useState } from "react";
import { THEMES, hex } from "../data/portfolioData.js";
import TechGlobe from "./TechGlobe.jsx";

const ROTATING_WORDS = ["React JS", "Tailwind CSS", "Flutter"];

export default function Hero({
  lang,
  accentHex,
  onChangeAccent,
  onNavigate,
  reduceMotion,
}) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section id="home">
      <div className="wrap hero">
        <div>
          <span className="badge glass">
            <i className="pulse" />
            {lang === "en"
              ? "Turning Caffeine into Code Since 2020"
              : "Mengubah Kafein menjadi Kode Sejak 2020"}
          </span>

          <p className="hello">
            {lang === "en" ? "// hello, I'm" : "// halo, saya"}
          </p>
          <h1>Jusuf Fathan Nuradly</h1>

          <p className="roleline">
            {lang === "en"
              ? "Junior Developer building with"
              : "Junior Developer yang membangun dengan"}{" "}
            <span className="rot">
              <span key={ROTATING_WORDS[wordIndex]}>
                {ROTATING_WORDS[wordIndex]}
              </span>
            </span>
          </p>

          <p className="lead">
            {lang === "en"
              ? "I turn pixel-perfect designs into fast, responsive web & mobile apps — clean code, calm interfaces, and details that feel good to use."
              : "Saya mengubah desain menjadi aplikasi web dan mobile yang cepat dan responsif. Kodenya rapi, tampilannya tenang, dan detailnya nyaman dipakai."}
          </p>

          <div className="cta">
            <a
              className="btn primary"
              href="#projects"
              onClick={(e) => onNavigate(e, "projects")}
            >
              {lang === "en" ? "View my work" : "Lihat proyek saya"} &rarr;
            </a>
            <a
              className="btn"
              href="#contact"
              onClick={(e) => onNavigate(e, "contact")}
            >
              {lang === "en" ? "Get in touch" : "Hubungi saya"}
            </a>
          </div>

          <dl className="hstats">
            <div>
              <dt>{lang === "en" ? "Projects" : "Proyek"}</dt>
              <dd>07</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>02</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>07</dd>
            </div>
          </dl>

          <div className="theme">
            <span>
              {lang === "en" ? "Change theme color:" : "Ganti warna tema:"}
            </span>
            <div className="sw" role="group" aria-label="Warna tema">
              {THEMES.map(([name, colorValue]) => (
                <button
                  key={name}
                  type="button"
                  style={{ "--c": hex(colorValue) }}
                  aria-label={name}
                  aria-pressed={accentHex === colorValue}
                  onClick={() => onChangeAccent(colorValue)}
                />
              ))}
            </div>
          </div>
        </div>

        <TechGlobe
          lang={lang}
          accentHex={accentHex}
          reduceMotion={reduceMotion}
        />
      </div>
    </section>
  );
}
