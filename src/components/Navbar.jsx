import { NAV_ITEMS } from '../data/portfolioData.js';

export default function Navbar({ lang, onToggleLang, activeSection, onNavigate }) {
  return (
    <nav className="top" aria-label="Navigasi utama">
      <div className="pill glass">
        <a className="brand" href="#home" onClick={(e) => onNavigate(e, 'home')}>
          JF<span>.</span>
        </a>
        <div className="links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'on' : ''}
              onClick={(e) => onNavigate(e, item.id)}
            >
              {lang === 'en' ? item.labelEn : item.labelId}
            </a>
          ))}
        </div>
        <button
          id="lang"
          type="button"
          onClick={onToggleLang}
          aria-label="Ganti bahasa / Switch language"
        >
          <b className="l-id">ID</b> / <b className="l-en">EN</b>
        </button>
      </div>
    </nav>
  );
}
