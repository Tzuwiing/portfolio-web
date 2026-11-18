export function initI18n() {
  let lang = 'id';
  try {
    lang = localStorage.getItem('jf-lang') === 'en' ? 'en' : 'id';
  } catch {
    /* ignore storage access errors */
  }

  function setLang(l) {
    lang = l;
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.lang = l;
    document.querySelectorAll('[data-ph-id]').forEach((el) => {
      el.placeholder = el.getAttribute(`data-ph-${l}`);
    });
    try {
      localStorage.setItem('jf-lang', l);
    } catch {
      /* ignore storage access errors */
    }
  }

  const langBtn = document.getElementById('lang');
  if (langBtn) {
    langBtn.addEventListener('click', () => setLang(lang === 'id' ? 'en' : 'id'));
  }
  setLang(lang);

  return () => lang;
}
