export default function Footer({ lang, onNavigate }) {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <b>Jusuf Fathan Nuradly</b>
          <small>Junior Developer &middot; React JS, Tailwind &amp; Flutter</small>
        </div>
        <nav aria-label="Footer">
          <a href="#home" onClick={(e) => onNavigate(e, 'home')}>
            {lang === 'en' ? 'Home' : 'Beranda'}
          </a>
          <a href="#about" onClick={(e) => onNavigate(e, 'about')}>
            {lang === 'en' ? 'About' : 'Tentang'}
          </a>
          <a href="#projects" onClick={(e) => onNavigate(e, 'projects')}>
            {lang === 'en' ? 'Work' : 'Proyek'}
          </a>
          <a href="#contact" onClick={(e) => onNavigate(e, 'contact')}>
            {lang === 'en' ? 'Contact' : 'Kontak'}
          </a>
        </nav>
      </div>
    </footer>
  );
}
