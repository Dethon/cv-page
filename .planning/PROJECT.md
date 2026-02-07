# CV Portfolio Page

## What This Is

A personal CV/portfolio website for Juan Francisco Crespo Galan — a senior software engineer with 10+ years of experience across embedded systems, full-stack web, data engineering, and machine learning. Built with React 19 + Vite 7 + TypeScript, deployed on GitHub Pages with dark/light theme, scroll animations, and WCAG 2.2 Level AA accessibility.

## Core Value

Visitors immediately understand who Juan Francisco is as an engineer — his breadth of experience, technical depth, and the quality of his work — and can easily reach out or explore further.

## Requirements

### Validated

- ✓ Hero section with name, title, summary, and professional photo placeholder — v1.0
- ✓ Experience timeline showing career progression (6 companies, 8 roles) — v1.0
- ✓ Skills/technologies section with 6 categorized groups — v1.0
- ✓ Curated projects section with 5 hand-picked projects and technology badges — v1.0
- ✓ Education section (Master's + Bachelor's + Technical Engineering) — v1.0
- ✓ Downloadable CV as PDF — v1.0
- ✓ Contact links: email, LinkedIn, GitHub with accessible icon links — v1.0
- ✓ Responsive design on mobile (320px+), tablet (768px+), desktop (1200px+) — v1.0
- ✓ Scroll-triggered animations with prefers-reduced-motion support — v1.0
- ✓ Deployed on GitHub Pages with CI/CD pipeline — v1.0
- ✓ Built with React 19 + Vite 7 + TypeScript — v1.0
- ✓ Dark/light mode toggle with system preference detection and persistence — v1.0
- ✓ SEO meta tags (Open Graph, Twitter Cards) — v1.0
- ✓ WCAG 2.2 Level AA accessibility compliance — v1.0
- ✓ Custom branded 404 page — v1.0
- ✓ Optimized production build with vendor chunk splitting (76KB gzipped) — v1.0

### Active

(None — define in next milestone with `/gsd:new-milestone`)

### Out of Scope

- Blog/writing section — not needed for v1, can add later
- Multi-language support — English only for now
- Contact form with backend — links are sufficient
- CMS or admin panel — content managed in code
- Analytics/tracking — can add later if desired
- 3D effects / WebGL — overkill for professional presence
- AI chatbot assistant — content should speak for itself

## Context

Shipped v1.0 with 1,725 LOC application source (TypeScript/CSS/HTML).
Tech stack: React 19, Vite 7, TypeScript, CSS custom properties, GitHub Actions.
Built in 1 day with 58 commits across 5 phases and 12 plans.

**Known issues:**
- react-helmet-async installed with --legacy-peer-deps (awaiting React 19 support)
- public/ directory gitignore conflict with cv.pdf requiring force-add
- Lighthouse verification pending (Chrome not available in WSL2)

**Content source**: LinkedIn PDF extract available in repo (`cv.pdf`) with full career history
**LinkedIn**: https://www.linkedin.com/in/jfcrespo5/
**GitHub**: https://github.com/Dethon
**Deployment target**: GitHub Pages (static hosting, no server-side)

## Constraints

- **Hosting**: GitHub Pages — must be fully static (no SSR, no server-side APIs)
- **Stack**: React + Vite — user's explicit choice
- **Content**: English only
- **Projects**: Manually curated — no GitHub API calls at runtime

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React + Vite over static HTML | User preference; component-based architecture for maintainability | ✓ Good |
| Curated projects over API-fetched | Full control over what's displayed and how it's described | ✓ Good |
| Single language (English) | Professional working language, broader audience | ✓ Good |
| GitHub Pages deployment | Free, simple, already has GitHub account | ✓ Good |
| CSS custom properties over CSS-in-JS | Better performance, works without JavaScript | ✓ Good |
| Inline FOUC prevention script | Prevents flash of wrong theme on load | ✓ Good |
| IntersectionObserver over scroll events | More efficient, battery-friendly for scroll-spy and animations | ✓ Good |
| Hamburger breakpoint at 768px | Standard mobile/tablet breakpoint | ✓ Good |
| ExperienceEntry roles array structure | Handles multiple roles under same company | ✓ Good |
| CSS-only timeline without JavaScript | Static presentation, animations added in Phase 5 | ✓ Good |
| react-helmet-async with --legacy-peer-deps | React 19 compatibility workaround | ⚠️ Revisit |
| Manual Vite chunk splitting | Optimal browser caching for vendor dependencies | ✓ Good |
| Force-added cv.pdf to git | Static asset should be version-controlled despite public/ gitignore | ⚠️ Revisit |

---
*Last updated: 2026-02-07 after v1.0 milestone*
