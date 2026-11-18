import { useRef, useState } from "react";
import { EMAIL } from "../data/portfolioData.js";
import { useInView } from "../hooks/useInView.js";

export default function Contact({ lang }) {
  const [leftRef, leftIn] = useInView({ threshold: 0.08 });
  const [formRef, formIn] = useInView({ threshold: 0.08 });
  const mailCodeRef = useRef(null);

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [copyMailState, setCopyMailState] = useState("idle");
  const [copyDraftState, setCopyDraftState] = useState("idle");
  const [result, setResult] = useState(null);

  const handleCopy = (text, setStatus, selectMail = false) => {
    const onDone = () => {
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1600);
    };
    const onFallback = () => {
      if (selectMail && mailCodeRef.current) {
        try {
          const r = document.createRange();
          r.selectNodeContents(mailCodeRef.current);
          const s = window.getSelection();
          s.removeAllRanges();
          s.addRange(r);
        } catch {
          /* ignore selection error */
        }
      }
      setStatus("selected");
      setTimeout(() => setStatus("idle"), 2200);
    };

    try {
      navigator.clipboard.writeText(text).then(onDone, onFallback);
    } catch {
      onFallback();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = msg.trim();

    if (!trimmedName || !trimmedMsg) {
      setResult({ error: true });
      return;
    }

    const subject = `Pesan dari portfolio: ${trimmedName}`;
    const body = `Hai Jusuf, saya ${trimmedName}.\n\n${trimmedMsg}`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const fullDraft = `To: ${EMAIL}\nSubject: ${subject}\n\n${body}`;

    setCopyDraftState("idle");
    setResult({ error: false, href, fullDraft });
  };

  const renderCopyLabel = (state, idleId, idleEn) => {
    if (state === "copied") return lang === "en" ? "Copied" : "Tersalin";
    if (state === "selected")
      return lang === "en"
        ? "Selected, press Ctrl+C"
        : "Terpilih, tekan Ctrl+C";
    return lang === "en" ? idleEn : idleId;
  };

  return (
    <section id="contact">
      <div className="wrap contact">
        <div ref={leftRef} className={`rev${leftIn ? " in" : ""}`}>
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">{lang === "en" ? "Contact" : "Kontak"}</p>
            <h2>
              {lang === "en"
                ? "Let's build something great together."
                : "Ayo bangun sesuatu yang bagus bersama."}
            </h2>
            <p>
              {lang === "en"
                ? "Got a project, an internship or a collaboration in mind? Write a message, or email me directly."
                : "Punya proyek, magang, atau kolaborasi? Tulis pesan di samping, atau kirim langsung ke email saya."}
            </p>
          </div>

          <div className="mailbox glass">
            <code id="mailtxt" ref={mailCodeRef}>
              {EMAIL}
            </code>
            <button
              className="btn sm"
              type="button"
              onClick={() => handleCopy(EMAIL, setCopyMailState, true)}
            >
              {renderCopyLabel(copyMailState, "Salin", "Copy")}
            </button>
          </div>

          <div className="socials">
            <a
              className="btn sm"
              href="https://github.com/Tzuwiing"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className="btn sm"
              href="https://www.instagram.com/nuradlyy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        <form
          ref={formRef}
          className={`card glass rev${formIn ? " in" : ""}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="f-name">
            {lang === "en" ? "Your name" : "Nama kamu"}
          </label>
          <input
            className="field"
            id="f-name"
            maxLength={40}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={lang === "en" ? "Jane Doe" : "Nama lengkap"}
          />

          <label className="fgap" htmlFor="f-msg">
            {lang === "en" ? "Message" : "Pesan"}
          </label>
          <textarea
            className="field"
            id="f-msg"
            rows={6}
            maxLength={800}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder={
              lang === "en"
                ? "Tell me about your project..."
                : "Ceritakan proyek atau idemu..."
            }
          />

          <div className="fgap">
            <button className="btn primary" type="submit">
              {lang === "en" ? "Prepare email" : "Siapkan email"} &rarr;
            </button>
          </div>

          {result && (
            <div id="result" aria-live="polite">
              {result.error ? (
                lang === "en" ? (
                  "Please fill in your name and message first."
                ) : (
                  "Isi nama dan pesan dulu, ya."
                )
              ) : (
                <>
                  <div>
                    {lang === "en" ? (
                      <>
                        Your email is drafted but not sent yet. Open your mail
                        app, or copy the text below and send it to{" "}
                        <b>{EMAIL}</b>.
                      </>
                    ) : (
                      <>
                        Email sudah disiapkan, belum terkirim. Buka aplikasi
                        email, atau salin teks di bawah lalu kirim ke{" "}
                        <b>{EMAIL}</b>.
                      </>
                    )}
                  </div>
                  <pre>{result.fullDraft}</pre>
                  <div className="row">
                    <a className="btn primary sm" href={result.href}>
                      {lang === "en" ? "Open mail app" : "Buka aplikasi email"}
                    </a>
                    <button
                      className="btn sm"
                      type="button"
                      onClick={() =>
                        handleCopy(result.fullDraft, setCopyDraftState, false)
                      }
                    >
                      {renderCopyLabel(
                        copyDraftState,
                        "Salin teks",
                        "Copy text",
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
