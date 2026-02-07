# Architecture Patterns

**Domain:** Developer CV/Portfolio Site (React + Vite + GitHub Pages)
**Researched:** 2026-02-07

## Recommended Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│              GitHub Pages (Static)              │
│  https://dethon.github.io/cv-page/              │
└─────────────────────────────────────────────────┘
                      ▲
                      │ (Deploy: dist/ artifacts)
                      │
┌─────────────────────────────────────────────────┐
│           Vite Build Pipeline                    │
│  • Bundle React components                       │
│  • Optimize assets                               │
│  • Generate static HTML/CSS/JS                   │
└─────────────────────────────────────────────────┘
                      ▲
                      │ (Source)
                      │
┌─────────────────────────────────────────────────┐
│              React App (SPA)                     │
│                                                  │
│  App.jsx (Root)                                  │
│    ├─ Hero                                       │
│    ├─ Experience (Timeline)                      │
│    ├─ Skills                                     │
│    ├─ Projects                                   │
│    ├─ Education                                  │
│    ├─ DownloadCV                                 │
│    └─ Contact                                    │
│                                                  │
│  Data: JSON files (imported at build)            │
│  Animations: Motion (Framer Motion)              │
│  Styling: CSS Modules / Tailwind                 │
└─────────────────────────────────────────────────┘
```

**Architecture Type:** Static Single Page Application (SPA)
- **No routing needed** — sections anchor-linked on single scrolling page
- **No backend** — all content bundled at build time
- **Client-side only** — fully static deployment

### Component Boundaries

| Component | Responsibility | Receives Props | State |
|-----------|---------------|----------------|-------|
| **App** | Root layout, section orchestration | None (entry) | None (stateless sections) |
| **Hero** | Name, title, photo, summary, CTA | `profileData` | None (presentational) |
| **Experience** | Career timeline with companies/roles | `experienceData[]` | None (presentational) |
| **Skills** | Technology badges/categories | `skillsData[]` | Optional: filter/group state |
| **Projects** | Curated GitHub repos with descriptions | `projectsData[]` | None (presentational) |
| **Education** | Degrees and institutions | `educationData[]` | None (presentational) |
| **DownloadCV** | PDF download link/button | `cvUrl` | None (presentational) |
| **Contact** | Social links (email, LinkedIn, GitHub) | `contactData` | None (presentational) |

**Component Pattern:** Presentational/Container separation
- **App.jsx** acts as container — imports data, passes as props
- Section components are presentational — receive data, render UI
- No prop drilling — sections are direct children of App

### Data Flow

```
JSON Data Files (src/data/)
        │
        ├─ profile.json      → Hero component
        ├─ experience.json   → Experience component
        ├─ skills.json       → Skills component
        ├─ projects.json     → Projects component
        ├─ education.json    → Education component
        └─ contact.json      → Contact component

        ↓ (import at build time)

App.jsx (Container)
        │
        ├─ Imports all data files
        ├─ Passes data as props to components
        └─ No runtime data fetching

        ↓ (one-way data flow)

Section Components (Presentational)
        │
        └─ Render UI from props
           (No state management needed for static content)
```

**Data Management Strategy:** Static JSON + Props
- **Why JSON files:** Easy to update content without touching components
- **Why not Context API:** Overkill for simple one-way data flow
- **Why not state management:** No dynamic data, no user interactions requiring state
- **Content updates:** Edit JSON → rebuild → redeploy

**Animation State:** Local component state for Motion animations
- Scroll-triggered animations use Motion's `useInView` hook
- Hover states managed by Motion's gesture props
- No global animation state needed

## File/Folder Structure

### Recommended Structure (Feature-First, Scalable)

```
cv-page/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions for auto-deploy
├── public/
│   ├── cv.pdf                      # Downloadable CV
│   └── profile-photo.jpg           # Profile image (if not using external)
├── src/
│   ├── assets/                     # Static assets bundled by Vite
│   │   └── icons/                  # Social media icons, etc.
│   ├── components/                 # Reusable UI components
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero.module.css     # CSS Modules OR
│   │   │   └── Hero.test.jsx       # (Optional) Tests
│   │   ├── Experience/
│   │   │   ├── Experience.jsx
│   │   │   ├── TimelineItem.jsx    # Sub-component
│   │   │   └── Experience.module.css
│   │   ├── Skills/
│   │   │   ├── Skills.jsx
│   │   │   ├── SkillBadge.jsx      # Reusable badge
│   │   │   └── Skills.module.css
│   │   ├── Projects/
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── Projects.module.css
│   │   ├── Education/
│   │   │   ├── Education.jsx
│   │   │   └── Education.module.css
│   │   ├── DownloadCV/
│   │   │   ├── DownloadCV.jsx
│   │   │   └── DownloadCV.module.css
│   │   └── Contact/
│   │       ├── Contact.jsx
│   │       └── Contact.module.css
│   ├── data/                       # Content as JSON
│   │   ├── profile.json
│   │   ├── experience.json
│   │   ├── skills.json
│   │   ├── projects.json
│   │   ├── education.json
│   │   └── contact.json
│   ├── styles/                     # Global styles
│   │   ├── index.css               # Global CSS/Tailwind imports
│   │   └── variables.css           # CSS custom properties
│   ├── utils/                      # Utility functions (if needed)
│   │   └── constants.js            # Shared constants
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Vite entry point
│   └── index.css                   # Global styles import
├── .gitignore
├── index.html                      # HTML template
├── package.json
├── vite.config.js                  # Vite configuration
└── README.md
```

**Why This Structure:**
- **Component-first organization:** Each section is self-contained with its styles
- **Data separation:** Content lives in `/data`, not hardcoded in components
- **Scalability:** Easy to add new sections or split components further
- **Vite-optimized:** Follows Vite conventions for asset handling

### Alternative: Tailwind-Based Structure (If Using Tailwind)

If using Tailwind CSS instead of CSS Modules:

```
src/
├── components/
│   ├── Hero/
│   │   └── Hero.jsx              # Tailwind classes in JSX
│   ├── Experience/
│   │   ├── Experience.jsx
│   │   └── TimelineItem.jsx
│   └── ...
├── styles/
│   └── index.css                 # @tailwind directives
└── tailwind.config.js            # (at root)
```

**Recommendation:** CSS Modules for this project
- **Why:** Scoped styles, explicit dependencies, easier to customize
- **Tailwind alternative:** Valid choice, faster prototyping, but larger bundle for simple portfolio
- **When Tailwind:** If rapid iteration or using pre-built components

## Build and Deployment Pipeline

### Vite Configuration (`vite.config.js`)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cv-page/',  // CRITICAL: Must match GitHub repo name
  build: {
    outDir: 'dist',   // Default, but explicit
  },
})
```

**Critical Configuration:**
- **`base: '/cv-page/'`** — GitHub Pages serves repo at `username.github.io/repo-name/`
- **Without correct base:** All asset paths break in production
- **Custom domain alternative:** Set `base: '/'` if using custom domain

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']  # Or 'master' depending on default branch
  workflow_dispatch:     # Allow manual triggers

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Pipeline Steps:**
1. **Trigger:** Push to main branch (or manual dispatch)
2. **Setup:** Checkout code, install Node.js 20, cache npm dependencies
3. **Build:** Run `npm run build` → outputs to `dist/`
4. **Deploy:** Upload `dist/` artifact, deploy to GitHub Pages

**GitHub Pages Settings:**
- Navigate to repo **Settings → Pages**
- **Source:** GitHub Actions (not "Deploy from branch")
- **Custom domain:** (Optional) Configure if using

### Local Development Workflow

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

**Dev Server Features:**
- **Hot Module Replacement (HMR):** Instant updates without full reload
- **Fast startup:** Vite's native ESM-based dev server
- **Base path handled:** Preview matches production paths

## Patterns to Follow

### Pattern 1: JSON-Driven Content Architecture

**What:** Separate content from presentation by storing all portfolio data in JSON files.

**When:** Portfolio sites, landing pages, any static content that changes periodically.

**Example:**

```javascript
// src/data/experience.json
[
  {
    "id": "redslim",
    "company": "Redslim",
    "role": "Senior Software Engineer",
    "period": "2023 - Present",
    "description": "Full-stack development with TypeScript, Databricks, Spark",
    "technologies": ["TypeScript", "Spark", "Databricks", "AWS"]
  },
  {
    "id": "nielseniq",
    "company": "NielsenIQ",
    "role": "Data Engineer",
    "period": "2021 - 2023",
    "description": "Data pipelines and analytics infrastructure",
    "technologies": ["Python", "Spark", "SQL", "Azure"]
  }
]
```

```jsx
// src/components/Experience/Experience.jsx
import experienceData from '../../data/experience.json'
import TimelineItem from './TimelineItem'

export default function Experience() {
  return (
    <section id="experience">
      <h2>Experience</h2>
      <div className="timeline">
        {experienceData.map(job => (
          <TimelineItem key={job.id} {...job} />
        ))}
      </div>
    </section>
  )
}
```

**Benefits:**
- Content updates don't touch component code
- Non-developers can edit JSON (simpler than JSX)
- Data can be validated/typed easily
- Easy to version control content changes

### Pattern 2: Component Co-location (Feature Folders)

**What:** Keep each component's code, styles, and tests in the same folder.

**When:** Always, for maintainability and developer experience.

**Example:**

```
components/
└── Experience/
    ├── Experience.jsx           # Component logic
    ├── Experience.module.css    # Scoped styles
    ├── TimelineItem.jsx         # Sub-component
    └── index.js                 # Optional: clean imports
```

```javascript
// index.js (barrel export)
export { default } from './Experience'
```

```javascript
// App.jsx — clean import
import Experience from './components/Experience'
```

**Benefits:**
- Easy to find related files
- Refactoring moves one folder, not scattered files
- Clear component boundaries
- Easier to extract to library later

### Pattern 3: Motion (Framer Motion) for Subtle Animations

**What:** Use Motion library for scroll-triggered and gesture-based animations.

**When:** Enhancing UX with subtle animations (scroll reveals, hover effects).

**Example:**

```jsx
import { motion } from 'motion/react'

export default function Hero({ profileData }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>{profileData.name}</h1>
      <p>{profileData.title}</p>
    </motion.section>
  )
}
```

**Scroll-triggered animation:**

```jsx
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline content */}
    </motion.section>
  )
}
```

**Best Practices:**
- **Subtle over spectacular:** Fade-ins, gentle slides (10-20px), not wild rotations
- **GPU-accelerated properties:** Use `opacity`, `scale`, `rotate`, `x`/`y` transforms
- **Avoid animating:** `width`, `height`, `top`, `left` (causes layout thrashing)
- **Respect user preferences:** Check `prefers-reduced-motion`
- **Performance:** Use `once: true` on `useInView` to prevent re-triggering

### Pattern 4: Presentational Components (Props-Only)

**What:** Section components receive data via props, contain no business logic or data fetching.

**When:** Static sites where data is known at build time.

**Example:**

```jsx
// ✅ GOOD: Presentational component
export default function Skills({ skillsData }) {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skillsData.map(skill => (
          <SkillBadge key={skill.id} name={skill.name} level={skill.level} />
        ))}
      </div>
    </section>
  )
}

// ❌ BAD: Mixing data loading and presentation
export default function Skills() {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    fetch('/api/skills')  // No API in static site!
      .then(res => res.json())
      .then(setSkills)
  }, [])

  return <div>{/* ... */}</div>
}
```

**Benefits:**
- Predictable, easy to test (just pass props)
- No side effects, no surprises
- Fast — no runtime data fetching overhead
- Fits static site deployment model

## Anti-Patterns to Avoid

### Anti-Pattern 1: Runtime API Calls in Static Sites

**What:** Fetching data from GitHub API, external APIs, or backends at runtime.

**Why bad:**
- **GitHub Pages = static only** — no backend to proxy requests
- **Rate limits:** GitHub API limits unauthenticated requests (60/hour)
- **Slow UX:** Content appears after page load, flash of empty state
- **Dependency:** Site breaks if API is down

**Instead:**
- Fetch data at **build time** (Vite can run scripts pre-build)
- Hardcode curated content in JSON files
- Use GitHub Actions to rebuild on schedule if content updates

**Example of build-time fetching (optional):**

```javascript
// scripts/fetch-github-repos.js
// Run before build: node scripts/fetch-github-repos.js

import { writeFileSync } from 'fs'

const repos = await fetch('https://api.github.com/users/Dethon/repos')
  .then(r => r.json())

const curated = repos
  .filter(r => r.stargazers_count > 5)  // Example filter
  .slice(0, 6)
  .map(r => ({
    id: r.id,
    name: r.name,
    description: r.description,
    url: r.html_url,
    stars: r.stargazers_count
  }))

writeFileSync('./src/data/projects.json', JSON.stringify(curated, null, 2))
```

**Update `package.json`:**

```json
{
  "scripts": {
    "prebuild": "node scripts/fetch-github-repos.js",
    "build": "vite build"
  }
}
```

### Anti-Pattern 2: Deep Component Nesting Without Purpose

**What:** Creating unnecessary component hierarchies that make code hard to follow.

**Why bad:**
- Prop drilling through multiple levels
- Hard to trace where data comes from
- Over-engineering for a simple site

**Example:**

```jsx
// ❌ BAD: Unnecessary nesting
<App>
  <Layout>
    <PageWrapper>
      <SectionContainer>
        <ExperienceSection>
          <ExperienceTimeline>
            <TimelineList>
              <TimelineItem />
```

```jsx
// ✅ GOOD: Flat, direct hierarchy
<App>
  <Hero />
  <Experience>
    <TimelineItem />
  </Experience>
  <Skills />
```

**Instead:**
- Keep hierarchy shallow — most sections are direct App children
- Create sub-components only for **repeated patterns** (TimelineItem, SkillBadge)
- Avoid wrapper components that add no value

### Anti-Pattern 3: Global State for Static Content

**What:** Using Context API, Redux, or Zustand for portfolio content.

**Why bad:**
- **Overkill:** Content doesn't change after build
- **Complexity:** Adds boilerplate for no benefit
- **Performance:** Context causes unnecessary re-renders

**Example:**

```jsx
// ❌ BAD: Context for static data
const PortfolioContext = createContext()

function App() {
  const [data, setData] = useState(portfolioData)

  return (
    <PortfolioContext.Provider value={data}>
      <Hero />
      <Experience />
    </PortfolioContext.Provider>
  )
}

function Hero() {
  const data = useContext(PortfolioContext)  // Unnecessary indirection
  return <h1>{data.name}</h1>
}
```

```jsx
// ✅ GOOD: Direct props
function App() {
  return (
    <>
      <Hero profileData={profileData} />
      <Experience experienceData={experienceData} />
    </>
  )
}
```

**When to use global state:**
- Theme toggling (dark mode)
- User preferences (reduced motion)
- NOT for static content

### Anti-Pattern 4: Incorrect Vite Base Path

**What:** Forgetting to set `base` in `vite.config.js` or setting it wrong.

**Why bad:**
- **Symptom:** Site works locally, breaks on GitHub Pages
- **Cause:** Assets referenced from `/assets/...` instead of `/repo-name/assets/...`
- **Result:** Blank page, 404 errors for all CSS/JS

**Example:**

```javascript
// ❌ BAD: Missing base (defaults to '/')
export default defineConfig({
  plugins: [react()],
})
// Deployed to: https://dethon.github.io/cv-page/
// Assets try to load from: https://dethon.github.io/assets/... ❌
```

```javascript
// ✅ GOOD: Correct base for repo
export default defineConfig({
  plugins: [react()],
  base: '/cv-page/',  // Matches repo name
})
// Assets load from: https://dethon.github.io/cv-page/assets/... ✅
```

**Prevention:**
- **Always set `base`** for GitHub Pages project repos
- **Custom domain:** Use `base: '/'` if deploying to `yourdomain.com`
- **Test with `npm run preview`** after build to catch issues locally

### Anti-Pattern 5: Over-Animating

**What:** Adding animations to every element, long durations, distracting effects.

**Why bad:**
- **Performance:** Too many simultaneous animations cause jank
- **UX:** Distracts from content, feels gimmicky
- **Accessibility:** Violates `prefers-reduced-motion`, causes motion sickness

**Example:**

```jsx
// ❌ BAD: Excessive, distracting animations
<motion.div
  animate={{
    rotate: [0, 360],
    scale: [1, 1.5, 1],
    x: [-100, 100, -100],
  }}
  transition={{ duration: 3, repeat: Infinity }}
>
  <h1>My Portfolio</h1>  {/* Spinning, scaling title — nauseating! */}
</motion.div>
```

```jsx
// ✅ GOOD: Subtle, purposeful animation
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h1>My Portfolio</h1>  {/* Gentle fade-in, feels polished */}
</motion.div>
```

**Best Practices:**
- **Subtle movements:** 10-20px slides, not 100px
- **Short durations:** 0.3-0.6s, not 2-3s
- **Purpose:** Guide attention, indicate interaction, not decoration
- **Respect preferences:** Use `useReducedMotion` hook or check media query

## Scalability Considerations

| Concern | At Launch (Static) | Future (v2+) | Long-term |
|---------|-------------------|-------------|-----------|
| **Content updates** | Edit JSON, rebuild, redeploy | GitHub Actions scheduled rebuild | Headless CMS (Contentful, Sanity) |
| **Performance** | Vite bundle optimization sufficient | Code-split routes if adding pages | CDN (Cloudflare, Vercel) |
| **SEO** | Static meta tags in `index.html` | React Helmet for dynamic meta | Migrate to Next.js for SSR/SSG |
| **Analytics** | None (privacy-first) | Plausible/Fathom (privacy-friendly) | Google Analytics if needed |
| **Internationalization** | English only | i18next for multi-language | Route-based locales (/en, /es) |
| **Blog/CMS** | Out of scope | MDX files in `/content` | Headless CMS + markdown |

**When to Stick with Vite + React:**
- Portfolio remains simple (< 10 pages)
- Content updates are infrequent (monthly or less)
- SEO via static meta tags is sufficient

**When to Migrate to Next.js:**
- Need server-side rendering for SEO
- Adding dynamic routes (blog posts, project pages)
- Want image optimization (`next/image`)
- API routes for contact forms, etc.

## Suggested Build Order

### Phase 1: Foundation (Week 1)
1. **Project setup**
   - Initialize Vite + React (`npm create vite@latest`)
   - Install dependencies: `motion`, CSS framework (Tailwind or plain CSS)
   - Configure `vite.config.js` with correct `base`
   - Set up GitHub Actions workflow for deployment

2. **Global styles & layout**
   - Define CSS variables (colors, typography, spacing)
   - Set up responsive grid/flexbox layout
   - Create basic App.jsx structure (empty sections)

3. **Data schema**
   - Create JSON files in `/src/data/`
   - Populate with real content from `cv.pdf`
   - Define data structure (types if using TypeScript)

**Why this order:** Infrastructure first — deployment pipeline working early prevents "works locally, breaks in prod" surprises.

### Phase 2: Core Sections (Week 1-2)
4. **Hero section**
   - Name, title, photo, summary
   - CTA button (scroll to contact or download CV)
   - Simple fade-in animation

5. **Experience timeline**
   - Vertical timeline component
   - TimelineItem sub-component
   - Scroll-triggered animations (stagger items)

6. **Skills section**
   - Technology badges or grouped lists
   - Optional: hover effects on badges

**Why this order:** Hero → Experience → Skills follows natural reading flow. Hero is simplest, builds confidence.

### Phase 3: Project Showcase (Week 2)
7. **Projects section**
   - ProjectCard component (image, description, links)
   - Manually curated from GitHub repos
   - Hover animations (card lift, scale)

8. **Education section**
   - Degrees, institutions, years
   - Simple list or timeline format

**Why this order:** Projects and education are content-heavy but structurally simple. Education can reuse timeline patterns from Experience.

### Phase 4: Polish & Deploy (Week 2-3)
9. **Download CV & Contact**
   - Download CV button (link to `public/cv.pdf`)
   - Contact links (email, LinkedIn, GitHub)
   - Social icons with hover effects

10. **Responsive design**
    - Test on mobile, tablet, desktop
    - Adjust breakpoints in CSS
    - Ensure animations work on all devices

11. **Accessibility & performance**
    - Semantic HTML (`<section>`, `<article>`, `<nav>`)
    - Alt text for images
    - Check `prefers-reduced-motion`
    - Optimize images (WebP format, lazy loading)

12. **Deploy & test**
    - Push to GitHub, verify Actions workflow
    - Test deployed site on GitHub Pages
    - Share link, gather feedback

**Why this order:** Download CV and Contact are quick wins. Responsive design and a11y happen throughout but get final pass at end. Deploy early, iterate.

### Build Order Rationale

**Bottom-up vs Top-down:**
- **Avoid:** Building all components, then integrating
- **Prefer:** Build + integrate incrementally (Hero → deploy → Experience → deploy)

**Deploy early, deploy often:**
- Catch deployment issues before you've built everything
- See progress in production environment
- Share work-in-progress for feedback

**Animation last (within each component):**
- Get structure and content right first
- Add animations as polish, not foundation
- Easier to test without animation complexity

**Content before styling:**
- HTML structure with real content first
- Styles applied after content is in place
- Prevents design decisions based on lorem ipsum

## Sources

### Architecture & Patterns
- [React Stack Patterns 2026](https://www.patterns.dev/react/react-2026/)
- [React Architecture Patterns and Best Practices for 2026](https://www.bacancytechnology.com/blog/react-architecture-patterns-and-best-practices)
- [ReactBlueprint - React Best Practices 2026](https://react-blueprint.dev/)
- [33 React JS Best Practices For 2026](https://technostacks.com/blog/react-best-practices/)

### Vite + React Structure
- [React Folder Structure with Vite & TypeScript](https://medium.com/@prajwalabraham.21/react-folder-structure-with-vite-typescript-beginner-to-advanced-9cd12d1d18a6)
- [The Perfect Project Structure for React + Vite Projects](https://medium.com/@chetandekate79/the-perfect-project-structure-for-react-vite-projects-129b8aa624b1)
- [Recommended Folder Structure for React 2025](https://dev.to/pramod_boda/recommended-folder-structure-for-react-2025-48mc)
- [Creating a Good Folder Structure For Your Vite App](https://www.thatsoftwaredude.com/content/14110/creating-a-good-folder-structure-for-your-vite-app)

### GitHub Pages Deployment
- [Deploying a Static Site | Vite Official Docs](https://vite.dev/guide/static-deploy)
- [Deploy Your Vite App to GitHub Pages](https://levelup.gitconnected.com/deploy-your-vite-app-to-github-pages-a-lazy-devs-guide-37b0b472fa35)
- [Deploying Vite App to GitHub Pages](https://medium.com/@aishwaryaparab1/deploying-vite-deploying-vite-app-to-github-pages-166fff40ffd3)

### Animations & UX
- [Motion (Framer Motion) Official Docs](https://motion.dev)
- [10 Framer Motion Examples for Stunning React Animations](https://jana-portfolio-web.webflow.io/blog/framer-motion-web-animation-examples)
- [Framer Motion Tips for Performance in React](https://tillitsdone.com/blogs/framer-motion-performance-tips/)
- [Beyond Eye Candy: Top React Animation Libraries 2026](https://www.syncfusion.com/blogs/post/top-react-animation-libraries)

### Portfolio Examples & Components
- [How to Build a Portfolio Website with React](https://buttercms.com/blog/build-a-portfolio-website-with-react/)
- [How I Built My Developer Portfolio with Vite, React, and Bun](https://dev.to/dainyjose/how-i-built-my-developer-portfolio-with-vite-react-and-bun-fast-modern-fully-customizable-410b)
- [React Timeline Components](https://www.flexyui.com/react-tailwind-components/timeline)
- [React Hero Section Templates](https://www.flexyui.com/react-tailwind-components/hero)

---

**Confidence Level:** HIGH
- Architecture patterns verified with official Vite docs and multiple 2026 sources
- Deployment configuration confirmed via Vite official documentation
- Component patterns aligned with React best practices (patterns.dev, ReactBlueprint)
- Animation approach validated via Motion official docs and performance guides
