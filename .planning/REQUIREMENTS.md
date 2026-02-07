# Requirements: CV Portfolio Page

**Defined:** 2026-02-07
**Core Value:** Visitors immediately understand who Juan Francisco is as an engineer — his breadth, depth, and quality — and can easily reach out or explore further.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Layout & Structure

- [x] **LAYOUT-01**: Single-page design with scrollable sections (Hero, Experience, Skills, Projects, Education, Contact)
- [x] **LAYOUT-02**: Sticky navigation bar with smooth scroll to sections and active section highlighting
- [x] **LAYOUT-03**: Dark/light mode toggle with system preference detection and persistence
- [x] **LAYOUT-04**: Custom branded 404 error page

### Content

- [ ] **CONT-01**: Hero section with name, title, professional summary, and photo placeholder
- [ ] **CONT-02**: Experience timeline showing career progression (Redslim, NielsenIQ, NTT DATA, GRIAL, Audaspace, Universidad de Salamanca) with company, role, dates, and key achievements
- [ ] **CONT-03**: Skills section organized by category (Frontend, Backend, Data/ML, DevOps, Languages) with visual presentation
- [ ] **CONT-04**: Education section with degrees from Universidad de Salamanca (Master's, Bachelor's, Technical Engineering)

### Showcase & Interaction

- [ ] **SHOW-01**: Curated project cards with description, technology tags, GitHub link, and optional live demo link
- [ ] **SHOW-02**: Downloadable CV as PDF via one-click download button
- [ ] **SHOW-03**: Contact links footer with email (JF_Crespo@outlook.es), LinkedIn, and GitHub icons/links
- [ ] **SHOW-04**: Subtle scroll-triggered animations (fade-in, slide-up) as sections enter viewport, respecting prefers-reduced-motion

### Technical

- [x] **TECH-01**: Responsive design working on mobile (320px+), tablet (768px+), and desktop (1200px+)
- [ ] **TECH-02**: SEO meta tags including Open Graph, Twitter Cards, proper title, and description
- [ ] **TECH-03**: GitHub Actions workflow auto-deploying to GitHub Pages on push to main branch
- [ ] **TECH-04**: Accessibility compliance — semantic HTML, keyboard navigation, color contrast (4.5:1), alt text, focus indicators

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content Expansion

- **CONT-05**: Blog/writing section for technical articles
- **CONT-06**: Testimonials/recommendations from colleagues or clients
- **CONT-07**: Detailed project case studies with problem, approach, and outcomes

### Internationalization

- **I18N-01**: Multi-language support (English + Spanish toggle)

### Analytics

- **ANLYT-01**: Privacy-friendly analytics integration (Plausible or Fathom)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Contact form with backend | Links are sufficient; avoids backend complexity on static hosting |
| CMS or admin panel | Content managed in code via JSON files; no need for runtime editing |
| GitHub API runtime calls | Curated content in JSON avoids rate limits and loading delays |
| 3D effects / WebGL | Overkill for professional presence; adds bundle size and complexity |
| Real-time features | No use case for a static portfolio |
| User accounts / login | Not relevant for portfolio |
| AI chatbot assistant | Gimmick; content should speak for itself |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| LAYOUT-01 | Phase 2 | Complete |
| LAYOUT-02 | Phase 2 | Complete |
| LAYOUT-03 | Phase 2 | Complete |
| LAYOUT-04 | Phase 2 | Complete |
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |
| SHOW-01 | Phase 4 | Pending |
| SHOW-02 | Phase 4 | Pending |
| SHOW-03 | Phase 4 | Pending |
| SHOW-04 | Phase 5 | Pending |
| TECH-01 | Phase 2 | Complete |
| TECH-02 | Phase 5 | Pending |
| TECH-03 | Phase 1 | Complete |
| TECH-04 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0 (100% coverage)

---
*Requirements defined: 2026-02-07*
*Last updated: 2026-02-07 after roadmap creation*
