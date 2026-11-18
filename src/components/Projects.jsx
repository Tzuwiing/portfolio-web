import { useState } from 'react';
import { PROJECTS } from '../data/portfolioData.js';
import { useInView } from '../hooks/useInView.js';
import ProjectCard from './ProjectCard.jsx';

export default function Projects({ lang, reduceMotion }) {
  const [filter, setFilter] = useState('all');
  const [headRef, headIn] = useInView({ threshold: 0.08 });

  const webCount = PROJECTS.filter((p) => p.platform === 'Web').length;
  const mobileCount = PROJECTS.filter((p) => p.platform === 'Mobile').length;
  const visibleProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.platform === filter);

  return (
    <section id="projects">
      <div className="wrap">
        <header ref={headRef} className={`sec-head rev${headIn ? ' in' : ''}`}>
          <p className="eyebrow">{lang === 'en' ? 'Work' : 'Proyek'}</p>
          <h2>{lang === 'en' ? "Things I've built." : 'Karya yang sudah saya bangun.'}</h2>
          <p>
            {lang === 'en'
              ? 'The 3D shape on each card hints at what the project is. Move your cursor over a card to spin it.'
              : 'Bentuk 3D di tiap kartu mewakili jenis proyeknya. Gerakkan kursor di atas kartu untuk memutarnya.'}
          </p>
        </header>

        <div className="filters" role="group" aria-label="Filter proyek">
          <button
            type="button"
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            {lang === 'en' ? 'All' : 'Semua'}
            <small>{PROJECTS.length}</small>
          </button>
          <button
            type="button"
            aria-pressed={filter === 'Web'}
            onClick={() => setFilter('Web')}
          >
            Web<small>{webCount}</small>
          </button>
          <button
            type="button"
            aria-pressed={filter === 'Mobile'}
            onClick={() => setFilter('Mobile')}
          >
            Mobile<small>{mobileCount}</small>
          </button>
        </div>

        <div className="grid">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              lang={lang}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
