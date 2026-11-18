import { EMAIL, T } from '../data/portfolioData.js';

function copyText(txt, btn, doneId, doneEn, idleId, idleEn) {
  const done = () => {
    btn.innerHTML = T(doneId, doneEn);
    setTimeout(() => { btn.innerHTML = T(idleId, idleEn); }, 1600);
  };
  const fallback = () => {
    try {
      const mailEl = document.getElementById('mailtxt');
      if (mailEl) {
        const r = document.createRange();
        r.selectNodeContents(mailEl);
        const s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
      }
    } catch {
      /* ignore selection errors */
    }
    btn.innerHTML = T('Terpilih, tekan Ctrl+C', 'Selected, press Ctrl+C');
    setTimeout(() => { btn.innerHTML = T(idleId, idleEn); }, 2200);
  };

  try {
    navigator.clipboard.writeText(txt).then(done, fallback);
  } catch {
    fallback();
  }
}

export function initContactForm() {
  const copyMailBtn = document.getElementById('copymail');
  if (copyMailBtn) {
    copyMailBtn.addEventListener('click', function () {
      copyText(EMAIL, this, 'Tersalin', 'Copied', 'Salin', 'Copy');
    });
  }

  const form = document.getElementById('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('f-name').value.trim();
    const msg = document.getElementById('f-msg').value.trim();
    const res = document.getElementById('result');

    if (!name || !msg) {
      res.hidden = false;
      res.innerHTML = T('Isi nama dan pesan dulu, ya.', 'Please fill in your name and message first.');
      return;
    }

    const subject = `Pesan dari portfolio: ${name}`;
    const body = `Hai Jusuf, saya ${name}.\n\n${msg}`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    res.hidden = false;
    res.innerHTML =
      `<div>${T(`Email sudah disiapkan, belum terkirim. Buka aplikasi email, atau salin teks di bawah lalu kirim ke <b>${EMAIL}</b>.`, `Your email is drafted but not sent yet. Open your mail app, or copy the text below and send it to <b>${EMAIL}</b>.`)}</div><pre id="draft"></pre>` +
      `<div class="row"><a class="btn primary sm" href="${href}">${T('Buka aplikasi email', 'Open mail app')}</a><button class="btn sm" type="button" id="copydraft">${T('Salin teks', 'Copy text')}</button></div>`;

    const fullDraft = `To: ${EMAIL}\nSubject: ${subject}\n\n${body}`;
    document.getElementById('draft').textContent = fullDraft;
    document.getElementById('copydraft').addEventListener('click', function () {
      copyText(fullDraft, this, 'Tersalin', 'Copied', 'Salin teks', 'Copy text');
    });
  });
}
