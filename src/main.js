import './styles/base.css';
import './styles/sections.css';
import './styles/cards-contact.css';

import { initI18n } from './modules/i18n.js';
import { initTheme } from './modules/theme.js';
import { renderSkillsAndFallback, renderProjects } from './modules/renderContent.js';
import { initInteractions } from './modules/interactions.js';
import { initContactForm } from './modules/contactForm.js';
import { initThreeScene } from './three/sceneLoop.js';

const reduce = Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

const getLang = initI18n();
renderSkillsAndFallback();
const cards = renderProjects();
initInteractions(cards, reduce);
initContactForm();

let onAccentChange = null;
const getAccentHex = initTheme(() => onAccentChange);

onAccentChange = initThreeScene({
  reduce,
  cards,
  getAccentHex,
  getLang,
});
