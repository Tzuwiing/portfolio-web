# Jusuf Fathan Nuradly — Portfolio

Modular personal portfolio featuring interactive 3D constellation globe, project previews, bilingual support (ID / EN), and dynamic accent themes.

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Folder Structure

```text
personal-branding/
├── index.html                  # Semantic HTML entry
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── profile.jpg
└── src/
    ├── main.js                 # App entry point
    ├── data/
    │   └── portfolioData.js    # Projects, skills, themes & helpers
    ├── styles/
    │   ├── base.css            # Design tokens, glass surfaces, buttons & chips
    │   ├── sections.css        # Navbar, hero, 3D globe, about bento & process
    │   └── cards-contact.css   # Project grid, contact form, footer & responsive rules
    ├── modules/
    │   ├── i18n.js             # ID / EN language switcher
    │   ├── theme.js            # Dynamic accent color switcher
    │   ├── renderContent.js    # Dynamic skills & project cards renderer
    │   ├── interactions.js     # Scroll progress, counters, rotating text & 3D tilt
    │   └── contactForm.js      # Copy email & mailto draft generator
    └── three/
        ├── threeHelpers.js     # Glow textures & 3D shapes per project card
        ├── bgSky.js            # Starfield sky background & pointer sparks
        ├── techGlobe.js        # Interactive 3D skill constellation globe
        └── sceneLoop.js        # WebGL render loop & fallback handler
```
