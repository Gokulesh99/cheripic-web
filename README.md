# CheriPic — Partner Program Website

> **Clarity Before Connection** — The world's first verified relationship intelligence platform connecting premium businesses with emotionally intelligent, high-intent customers.

---

## Overview

CheriPic is a premium partner program landing page built for businesses looking to reach a curated audience of verified, high-intent adults actively seeking extraordinary real-world experiences. Unlike ad-based platforms, CheriPic focuses on *intent over attention* — every member is verified, income-qualified, and seeking meaningful engagement.

The site serves as the primary acquisition funnel for business partners (restaurants, hotels, wellness studios, travel experiences, etc.) across CheriPic's launch cities: **Dubai, London, New York, Miami, Toronto, and Los Angeles**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 (Oxc transform) |
| Styling | Pure CSS (custom, no framework) |
| Fonts | Cormorant Garamond + DM Sans (Google Fonts) |
| Linting | ESLint 10 with React Hooks plugin |
| Language | JavaScript (JSX) |

No external UI libraries. All components, animations, and layouts are hand-crafted.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Cheripic/cheripic.git
cd cheripic
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5500` with Hot Module Replacement enabled.

### Production Build

```bash
npm run build
```

Outputs optimized, hashed assets to `/dist`. Deploy the contents of `/dist` to any static host.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
cheripic/
├── index.html                  # Entry point — viewport, Google Fonts, meta tags
├── vite.config.js              # Vite config (port 5500, auto-open)
├── eslint.config.js            # ESLint rules
├── public/
│   └── favicon.svg             # Brand favicon
└── src/
    ├── main.jsx                # React 19 root render
    ├── App.jsx                 # Page composition — section order
    ├── styles/
    │   └── global.css          # All styles: theme variables, layout, animations, responsive
    ├── components/
    │   ├── Navbar.jsx          # Fixed nav with scroll detection and smooth-scroll links
    │   ├── Hero.jsx            # Full-viewport hero: animated background, stats counter
    │   ├── Intent.jsx          # "Attention vs Intent" three-card section
    │   ├── Marquee.jsx         # Infinite scrolling text strip
    │   ├── AlexProfile.jsx     # Ideal member persona card with stats and spending tags
    │   ├── WhyPartner.jsx      # Four-benefit grid explaining partner value
    │   ├── Experiences.jsx     # Draggable horizontal experience card carousel
    │   ├── Benefits.jsx        # Two-column layout: what partners give and receive
    │   ├── Globe.jsx           # Animated SVG world map with city pins
    │   ├── Testimonials.jsx    # Partner testimonial quotes (ready, pending real data)
    │   ├── ApplyForm.jsx       # Partner application form with validation and API submission
    │   ├── Closer.jsx          # Final CTA section
    │   ├── Footer.jsx          # Brand footer with tagline and copyright
    │   ├── Cursor.jsx          # Custom animated cursor (desktop only)
    │   ├── Reveal.jsx          # Scroll-triggered fade-in wrapper component
    │   └── Icons.jsx           # Inline SVG icon set
    ├── hooks/
    │   ├── useReveal.js        # IntersectionObserver for scroll animations
    │   ├── useCounter.js       # Animates numbers from 0 to target on scroll
    │   └── useDragScroll.js    # Mouse drag + momentum scrolling for carousels
    ├── data/
    │   └── content.js          # All static copy: cards, categories, testimonials, traits
    └── services/
        └── apiService.js       # API layer for form submission (configure endpoint here)
```

---

## Page Sections

| Section | Component | Description |
|---|---|---|
| Navigation | `Navbar` | Fixed top nav; blurs and adds border on scroll; hides nav links on mobile, shows CTA |
| Hero | `Hero` | Animated starfield, aurora, moon, cityscape; staggered title entrance; 4 live stat counters |
| Marquee | `Marquee` | Infinite horizontal scroll of brand keywords and city names |
| The Opportunity | `Intent` | Three cards contrasting Attention, Intent, and Experience-first marketing |
| Member Profile | `AlexProfile` | Persona card for the typical CheriPic member: age, income tier, verified status, spending categories |
| Why Partner | `WhyPartner` | Four-benefit grid: Quality Customers, Experience Discovery, Brand Positioning, Real-World Engagement |
| Experiences | `Experiences` | Drag-scrollable carousel of 7 experience categories (Fine Dining, Yacht, Hotels, Spa, Travel, Coffee, Culture) |
| Benefits | `Benefits` | Side-by-side columns: what partners offer (privileges, priority booking) vs what CheriPic provides (placement, notifications, analytics) |
| Global Map | `Globe` | Animated SVG world map — 6 city launch pins with pulsing indicators and connection arcs |
| Testimonials | `Testimonials` | Three-column quote grid (currently commented out; activate in `App.jsx` when testimonials are available) |
| Apply | `ApplyForm` | Full partner application: business name, contact, email, website, category, city, and business description |
| Closer | `Closer` | Closing statement with final CTA to the apply form |
| Footer | `Footer` | Logo, tagline "Clarity Before Connection", copyright |

---

## Design System

### Color Variables

```css
--pu:  #7B3FF2    /* Primary purple */
--pu2: #9D6CFF    /* Light purple */
--pu3: #c4a8ff    /* Soft lavender */
--g:   #D8B56A    /* Gold accent */
--g2:  #e8cc8a    /* Light gold */
--ink: #08041a    /* Deep navy black (background) */
--w:   #FFFFFF    /* White */
--gr:  #c0c0d0    /* Muted grey */
```

### Typography

- **Headings** — Cormorant Garamond (serif, 300–500 weight, italic for emphasis)
- **Body / UI** — DM Sans (sans-serif, 200–500 weight)

### Animations

| Name | Usage |
|---|---|
| `titleUp` | Staggered hero title entrance (slides up from overflow clip) |
| `riseIn` | General fade-up entrance for pills, subtitles, buttons |
| `auroraMove` | Slow horizontal sway on background aurora gradients |
| `moonFloat` | Gentle vertical float on the hero moon element |
| `starTwinkle` | Opacity pulse on star field |
| `scan` | Diagonal scan line moving top to bottom |
| `orbPulse` | Radial orb scale breathing |
| `scrollDrop` | Animated gradient drop in scroll indicator line |
| `grain` | Subtle film grain texture overlay |
| `mqroll` | Marquee infinite horizontal scroll |
| `dash` | Dashed SVG path animation on globe |
| `ping` | Pulsing radius on globe city pins |

---

## Responsive Design

| Breakpoint | Behaviour |
|---|---|
| > 1100px | Full desktop: all nav links visible, 4-column stats bar, multi-column grids |
| ≤ 1100px | Nav links hidden (CTA only), stats bar hidden, single-column Alex and Benefits sections |
| ≤ 900px | Intent cards stack to single column, Experiences header stacks vertically |
| ≤ 768px | Hero top-aligned with padding below fixed navbar, inline Discover indicator, full-width buttons, single-column all grids |
| ≤ 420px | Tighter padding, experience cards scale to 84vw |

Custom cursor (`Cursor.jsx`) is disabled at ≤ 768px — falls back to the native OS cursor.

---

## Form & API Integration

The partner application form (`ApplyForm.jsx`) submits to the endpoint configured in `src/services/apiService.js`. Before going to production:

1. Open `src/services/apiService.js`
2. Replace the placeholder URL with your actual API endpoint:

```js
const API_URL = 'https://your-api-url.com/api/partner-application'
```

The form collects: Business Name, Contact Name, Email, Website, Business Category, City, and a free-text description. It handles loading and success states, and shows field-level validation errors.

---

## Deployment

The project outputs a fully static site. After running `npm run build`, deploy the `/dist` folder to any of the following:

- **Vercel** — `vercel --prod` or connect the GitHub repo for automatic deployments
- **Netlify** — Drag and drop `/dist` or connect via Git
- **GitHub Pages** — Push `/dist` contents to the `gh-pages` branch
- **Any CDN / static host** — Upload `/dist` and configure root to `index.html`

No server-side rendering or backend is required for the site itself.

---

## Known TODOs

- [ ] Configure the API endpoint in `apiService.js` for form submissions
- [ ] Enable `Testimonials` section in `App.jsx` once partner quotes are collected
- [ ] Add real partner logos or media assets to the Experience cards
- [ ] Implement analytics / event tracking on CTA button clicks and form submissions
- [ ] Add OpenGraph and Twitter meta tags to `index.html` for social sharing

---

## License

Private — All rights reserved. CheriPic © 2025.
