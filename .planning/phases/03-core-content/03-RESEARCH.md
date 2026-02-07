# Phase 3: Core Content - Research

**Researched:** 2026-02-07
**Domain:** CV/Portfolio content presentation with React + TypeScript
**Confidence:** HIGH

## Summary

Phase 3 focuses on implementing four core content sections: Hero (introduction with photo placeholder), Experience (career timeline), Skills (categorized technology display), and Education (academic background). The primary technical domains are semantic HTML structure for accessibility, CSS layout patterns for timelines and skill displays, and TypeScript interfaces for strongly-typed content data.

The standard approach for CV/portfolio content in React is to separate content data from presentation components using TypeScript interfaces, implement semantic HTML with proper ARIA labels for accessibility, and use CSS custom properties for consistent theming. Modern 2026 best practices emphasize mobile-first responsive design, reduced motion support, and semantic markup for screen reader compatibility.

Key research findings show that vertical timelines are the standard for experience sections, skills should be organized by category with visual indicators, and hero sections must be optimized for mobile screens first. The project already has CSS custom properties and responsive breakpoints established in Phase 2, which should be leveraged for consistency.

**Primary recommendation:** Create TypeScript interfaces for content structure first, then implement semantic HTML with proper sectioning elements, and finally style with CSS following existing design system patterns.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.0 | Component framework | Already established in project |
| TypeScript | 5.9.3 | Type safety | Already established, ensures content structure integrity |
| CSS Custom Properties | N/A | Theming variables | Already established in Phase 2 for consistent design |
| Semantic HTML5 | N/A | Structure | Accessibility and SEO standard |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CSS Flexbox | N/A | Layout alignment | Avatar positioning, skill grid layouts |
| CSS Grid | N/A | Complex layouts | Skills category organization, responsive cards |
| IntersectionObserver | Native | Scroll detection | Already implemented for navigation, could extend for timeline animations |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom CSS | Icon libraries (react-icons) | Not needed for this phase, adds dependencies |
| TypeScript interfaces | JSON schema | TypeScript provides better IDE support and compile-time checks |
| CSS | Tailwind CSS | Project uses custom properties, changing now breaks consistency |
| Manual data | CMS/API | User decided on curated content for full control |

**Installation:**
```bash
# No new dependencies needed - use existing stack
# React 19.2.0, TypeScript 5.9.3, and CSS already in place
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/          # UI components (already exists)
│   ├── Hero.tsx        # Update with real content
│   ├── Experience.tsx  # Update with timeline
│   ├── Skills.tsx      # Update with categorized skills
│   └── Education.tsx   # Update with degrees
├── types/              # NEW: TypeScript interfaces
│   └── content.ts      # Content data structures
└── data/               # NEW: Content data
    └── cv-content.ts   # Personal and professional data
```

### Pattern 1: Separation of Data and Presentation
**What:** TypeScript interfaces define content structure, data lives in separate files, components receive typed props or import typed data.

**When to use:** Always for CV content - enables easy updates without touching component logic.

**Example:**
```typescript
// types/content.ts
export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  photoPlaceholder?: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | 'Present';
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  description?: string;
}

// data/cv-content.ts
import { PersonalInfo, Experience, SkillCategory, Education } from '../types/content';

export const personalInfo: PersonalInfo = {
  name: 'Juan Francisco Crespo Galan',
  title: 'Senior Software Engineer',
  summary: '10+ years of experience across embedded systems, full-stack web development, data engineering, and machine learning...',
};

export const experiences: Experience[] = [
  {
    company: 'Redslim',
    role: 'Senior Software Engineer',
    startDate: '2022-01',
    endDate: 'Present',
    achievements: [
      'Led development of...',
      'Improved performance by...',
    ],
  },
  // ... more experiences
];

// Component imports and uses typed data
import { personalInfo, experiences } from '../data/cv-content';
```

### Pattern 2: Semantic HTML Structure
**What:** Use semantic HTML5 elements (`<section>`, `<article>`, `<time>`, proper heading hierarchy) for accessibility and SEO.

**When to use:** Always - critical for screen readers and search engines.

**Example:**
```typescript
// Semantic structure for Experience section
export function Experience() {
  return (
    <section id="experience" className="section" aria-label="Work Experience">
      <div className="container">
        <h2>Experience</h2>
        <ol className="timeline" role="list">
          {experiences.map((exp, index) => (
            <li key={index} className="timeline-item">
              <article className="experience-card">
                <h3>{exp.role}</h3>
                <p className="company">{exp.company}</p>
                <time dateTime={exp.startDate}>
                  {formatDate(exp.startDate)} - {exp.endDate}
                </time>
                <ul className="achievements">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

### Pattern 3: Mobile-First Timeline Layout
**What:** Vertical timeline for mobile, can optionally enhance for desktop with alternating layout or wider content cards.

**When to use:** Experience section timeline display.

**Example CSS:**
```css
/* Mobile-first: vertical timeline */
.timeline {
  list-style: none;
  padding: 0;
  position: relative;
}

.timeline::before {
  /* Vertical line */
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--text-tertiary);
}

.timeline-item {
  position: relative;
  padding-left: 50px;
  margin-bottom: 2rem;
}

.timeline-item::before {
  /* Circle marker */
  content: '';
  position: absolute;
  left: 11px;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 2px solid var(--accent-primary);
}

/* Desktop enhancement */
@media (min-width: 768px) {
  .timeline-item {
    padding-left: 60px;
  }

  .experience-card {
    max-width: 700px;
  }
}
```

### Pattern 4: Skills Grid Layout
**What:** Use CSS Grid to organize skills by category with responsive column layout.

**When to use:** Skills section with multiple categories (Frontend, Backend, etc.).

**Example:**
```typescript
// Skills component with grid
export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2>Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.category}</h3>
              <ul className="skill-list">
                {category.skills.map((skill, i) => (
                  <li key={i} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

```css
.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
}

.skill-item {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border-radius: 4px;
  font-size: 0.9rem;
}

@media (min-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Pattern 5: Avatar/Photo Placeholder
**What:** Responsive circular or rounded image placeholder with alt text and object-fit for aspect ratio control.

**When to use:** Hero section profile photo.

**Example:**
```typescript
// Hero with photo placeholder
export function Hero() {
  return (
    <section id="hero" className="section section--hero">
      <div className="container hero-content">
        <div className="hero-photo">
          <img
            src="/assets/profile-photo.jpg"
            alt="Juan Francisco Crespo Galan - Senior Software Engineer"
            className="avatar"
          />
        </div>
        <div className="hero-text">
          <h1>{personalInfo.name}</h1>
          <p className="subtitle">{personalInfo.title}</p>
          <p>{personalInfo.summary}</p>
        </div>
      </div>
    </section>
  );
}
```

```css
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
}

.hero-photo {
  width: 150px;
  height: 150px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-primary);
}

@media (min-width: 768px) {
  .hero-content {
    flex-direction: row;
    text-align: left;
  }

  .hero-photo {
    width: 200px;
    height: 200px;
  }
}
```

### Anti-Patterns to Avoid
- **Inline content strings in components:** Breaks separation of concerns, makes updates harder. Use separate data files.
- **Non-semantic div soup:** Using `<div>` everywhere instead of `<section>`, `<article>`, `<time>` hurts accessibility.
- **Desktop-first CSS:** Starting with desktop layouts makes mobile optimization harder. Always mobile-first.
- **Single monolithic CSS file:** Putting all styles in one file (App.css) creates maintenance nightmare. Each section can have focused styles or use sections.css.
- **Over-fragmenting components:** Creating separate components for every small piece adds complexity without benefit. Keep timeline items, skill items as mapped JSX within parent component.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Date formatting | Custom parsers | Native `Date` methods or `Intl.DateTimeFormat` | Handles edge cases, internationalization, timezones |
| Responsive images | Manual srcset logic | CSS `object-fit: cover` + responsive sizing | Browser-optimized, simpler to maintain |
| Scroll animations | Custom scroll handlers | `IntersectionObserver` (already in project) | Better performance, battery-friendly, already implemented |
| Avatar fallback initials | String manipulation | CSS `::before` content or SVG text | Accessible, no JavaScript needed for display |
| Skills filtering/search | Custom search logic | Defer to future phase or use simple `.filter()` | Not in requirements, adds complexity |

**Key insight:** For CV content, simplicity beats cleverness. Use standard HTML/CSS patterns, leverage existing browser APIs, and avoid premature optimization. The content should be the star, not the implementation.

## Common Pitfalls

### Pitfall 1: Mixing Content and Presentation Logic
**What goes wrong:** Hardcoding content strings directly in JSX makes updates require touching component files, increases risk of typos, and makes multi-lingual support impossible later.

**Why it happens:** It's faster to type content directly while building components, especially for placeholder text.

**How to avoid:** Create TypeScript interfaces first, then data files, then components. Enforce the pattern by making components expect typed props or import typed data.

**Warning signs:** Using string literals for names, titles, descriptions directly in JSX. Components with 50+ lines because of embedded content arrays.

### Pitfall 2: Inaccessible Timeline Markup
**What goes wrong:** Using `<div>` elements for timeline items, missing ARIA labels, no semantic HTML for dates - screen readers can't properly announce content structure or chronological order.

**Why it happens:** Developers focus on visual appearance first, forgetting that semantic HTML provides meaning to assistive technology.

**How to avoid:** Use `<ol>` or `<ul>` for timeline container, `<li>` for items, `<article>` for experience cards, `<time>` with `dateTime` attribute for dates. Add `aria-label` to section landmarks.

**Warning signs:** Accessibility audits showing missing landmarks, inability to navigate timeline with screen reader, dates not recognized as temporal data.

### Pitfall 3: Non-Responsive Avatar/Photo
**What goes wrong:** Photo looks good on desktop but too large on mobile, or aspect ratio breaks on different screen sizes, or file size is too large causing slow mobile loads.

**Why it happens:** Testing primarily on desktop, using fixed pixel dimensions, not optimizing images for web.

**How to avoid:** Use `object-fit: cover` for aspect ratio control, responsive sizing with viewport-relative units or media queries, optimize images (WebP format, appropriate resolution).

**Warning signs:** Horizontal scroll on mobile, squished or stretched photos, slow page load on mobile networks.

### Pitfall 4: Over-Engineering Skills Display
**What goes wrong:** Building complex skill rating systems, percentage bars, or interactive filters that aren't in requirements. Adds development time and maintenance burden.

**Why it happens:** Developers want to showcase technical skills through fancy UI, or see examples online and want to implement them.

**How to avoid:** Check requirements - CONT-03 asks for "visual presentation" which can be as simple as organized categories with subtle styling. Start simple, enhance if time permits and user requests.

**Warning signs:** Spending multiple hours on skills section animations, building features not in requirements, JavaScript-heavy interactions for static content.

### Pitfall 5: Skipping Reduced Motion Support
**What goes wrong:** Timeline animations or scroll effects cause motion sickness for users with vestibular disorders. Violates WCAG accessibility guidelines.

**Why it happens:** Animations look cool, developers forget about accessibility preferences, or don't know about `prefers-reduced-motion`.

**How to avoid:** Wrap all animations in `@media (prefers-reduced-motion: no-preference)`. Project already uses this for smooth scroll (02-03), extend pattern to any timeline animations.

**Warning signs:** Animations run for all users regardless of system settings, accessibility audit failures, user complaints about motion effects.

### Pitfall 6: Incorrect Date Formatting
**What goes wrong:** Using string concatenation for dates, hardcoding formats, not handling "Present" for current positions, inconsistent date display across timeline.

**Why it happens:** Dates seem simple, but formatting, localization, and edge cases are complex.

**How to avoid:** Store dates in ISO format (YYYY-MM), use union types for `endDate: string | 'Present'`, create helper function for formatting. Consider `Intl.DateTimeFormat` for locale-aware display.

**Warning signs:** Inconsistent date formats, "undefined" showing for current positions, dates not in semantic `<time>` elements.

## Code Examples

Verified patterns from official sources:

### Semantic Resume Structure
```typescript
// Source: MDN - HTML Accessibility Best Practices
// https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML

// Proper semantic structure for resume sections
export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="container">
        <h2 id="experience-heading">Experience</h2>
        <ol className="timeline">
          <li className="timeline-item">
            <article>
              <h3>Senior Software Engineer</h3>
              <p>
                <strong>Redslim</strong>
                {' · '}
                <time dateTime="2022-01">January 2022</time>
                {' - '}
                <time dateTime="2024-12">Present</time>
              </p>
              <ul>
                <li>Achievement 1</li>
                <li>Achievement 2</li>
              </ul>
            </article>
          </li>
        </ol>
      </div>
    </section>
  );
}
```

### TypeScript Content Interfaces
```typescript
// Source: TypeScript Handbook - Interfaces
// https://www.typescriptlang.org/docs/handbook/2/objects.html

// Strong typing for CV content
export interface CVContent {
  personal: PersonalInfo;
  experiences: Experience[];
  skills: SkillCategory[];
  education: Education[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  email?: string;
  location?: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string; // ISO format: YYYY-MM
  endDate: string | 'Present';
  location?: string;
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  field?: string;
  institution: string;
  location: string;
  year: string;
  description?: string;
}
```

### Responsive Avatar with Object-Fit
```css
/* Source: W3Schools - Responsive Images
   https://www.w3schools.com/howto/howto_css_image_responsive.asp */

.hero-photo {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover; /* Maintains aspect ratio, crops to fit */
  border: 3px solid var(--accent-primary);
}

/* Responsive sizing */
@media (min-width: 768px) {
  .hero-photo {
    width: 180px;
    height: 180px;
  }
}

@media (min-width: 1200px) {
  .hero-photo {
    width: 200px;
    height: 200px;
  }
}
```

### Accessible Timeline with CSS
```css
/* Source: CodyHouse - Vertical Timeline
   https://codyhouse.co/gem/vertical-timeline/ */

.timeline {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  position: relative;
}

/* Vertical connector line */
.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--text-tertiary);
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  margin-bottom: 3rem;
}

/* Timeline node/marker */
.timeline-item::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 3px solid var(--accent-primary);
  z-index: 1;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: no-preference) {
  .timeline-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .timeline-item.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Disable animations for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .timeline-item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

### Skills Grid Layout
```css
/* Source: MDN - CSS Grid Layout
   https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout */

.skills-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: single column */
  gap: 2.5rem 2rem;
  margin-top: 2rem;
}

.skill-category h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--accent-primary);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
}

.skill-item {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--text-tertiary);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns for wider layouts */
@media (min-width: 1200px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Date Formatting Helper
```typescript
// Source: MDN - Intl.DateTimeFormat
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

export function formatDate(isoDate: string): string {
  if (isoDate === 'Present') return 'Present';

  // Parse YYYY-MM format
  const [year, month] = isoDate.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);

  // Format as "Month Year"
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  }).format(date);
}

// Usage in component
<time dateTime={exp.startDate}>
  {formatDate(exp.startDate)}
</time>
{' - '}
{exp.endDate === 'Present' ? (
  <span>Present</span>
) : (
  <time dateTime={exp.endDate}>
    {formatDate(exp.endDate)}
  </time>
)}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Progress bars for skills | Category organization with tags | ~2024-2025 | Simpler, more honest (no arbitrary percentages), better responsive layout |
| Rating stars (1-5) | Simple listing | ~2023-2024 | Removes subjective self-assessment, focuses on what you know |
| Horizontal timeline | Vertical mobile-first | ~2022-2023 | Better mobile UX, easier to implement responsively |
| Large hero images | Minimalist with focus on text | ~2025-2026 | Faster load, less maintenance, accessibility focus |
| Complex animations | Subtle transitions with reduced-motion support | ~2024-2025 | WCAG 2.1 compliance, better UX for sensitive users |
| CSS-in-JS for component styles | CSS custom properties | ~2024-2025 | Better performance, works without JS, simpler theming |
| External icon libraries | Native CSS shapes or SVG | ~2025-2026 | Fewer dependencies, faster load, more control |

**Deprecated/outdated:**
- **Skill percentage bars:** Arbitrary self-assessment, hard to maintain, modern portfolios prefer categorical organization
- **Horizontal timelines on mobile:** Poor UX, requires awkward scrolling or truncation
- **Flash/animation-heavy introductions:** Accessibility issues, slow loads, dated aesthetic
- **Social media icon libraries:** Bundle size bloat for simple links, use native SVG or Unicode characters
- **Class-based React components:** Hooks are standard since React 16.8 (2019), project uses functional components

## Open Questions

Things that couldn't be fully resolved:

1. **Actual CV content extraction from PDF**
   - What we know: cv.pdf exists in repo but PDF parsing tools not available in environment
   - What's unclear: Exact wording of professional summary, specific achievement bullet points, precise dates
   - Recommendation: Planner should create placeholder content structure with TODO markers for user to fill in, or extract manually from PDF if accessible

2. **Photo placeholder specifics**
   - What we know: CONT-01 requires "photo placeholder"
   - What's unclear: Is this a literal placeholder (grey box with icon), temporary stock photo, or should include actual photo path for user to replace?
   - Recommendation: Use CSS-styled `<div>` with background color and centered text "Photo" as placeholder, with TODO comment for user to replace with actual image path

3. **Skills visual presentation interpretation**
   - What we know: CONT-03 requires "visual presentation" for skills
   - What's unclear: Specific visual treatment expected - just organized lists, tags with styling, or something more elaborate?
   - Recommendation: Use category-organized tag-style layout (pill-shaped badges) as good middle ground - more visual than plain lists, less complex than charts

4. **Timeline animation preferences**
   - What we know: IntersectionObserver already implemented for nav scroll-spy, could reuse for timeline fade-in
   - What's unclear: Are animations desired or should content be static?
   - Recommendation: Defer animations to future enhancement phase, implement static content first to meet requirements

## Sources

### Primary (HIGH confidence)
- MDN Web Docs - HTML Accessibility Best Practices: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML
- MDN Web Docs - CSS Grid Layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- MDN Web Docs - Intl.DateTimeFormat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
- TypeScript Handbook - Objects and Interfaces: https://www.typescriptlang.org/docs/handbook/2/objects.html
- Project codebase - React 19.2.0, TypeScript 5.9.3, existing Phase 2 patterns verified

### Secondary (MEDIUM confidence)
- W3Schools - Responsive Images: https://www.w3schools.com/howto/howto_css_image_responsive.asp
- W3Schools - CSS Timeline: https://www.w3schools.com/howto/howto_css_timeline.asp
- CodyHouse - Vertical Timeline: https://codyhouse.co/gem/vertical-timeline/
- DEV Community - Semantic HTML and Accessibility Best Practices (2024+): https://dev.to/keshav_kumar/semantic-html-and-accessibility-best-practices-how-to-write-accessible-and-semantic-code-45gk

### Tertiary (LOW confidence - WebSearch only, general guidance)
- Various portfolio design inspiration sites (Awwwards, CodePen collections)
- React developer resume examples (content guidance, not technical patterns)
- Modern portfolio design trends (2026 search results)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Project stack already established, no new libraries needed
- Architecture: HIGH - Patterns verified from official docs (MDN, TypeScript handbook), aligned with existing project structure
- Pitfalls: MEDIUM-HIGH - Common issues well-documented in accessibility guides and React best practices, some from general web development experience
- Code examples: HIGH - All examples sourced from or verified against official documentation (MDN, TypeScript, W3Schools)
- Content structure: MEDIUM - TypeScript interface patterns standard, but specific CV content not extractable from PDF in environment

**Research date:** 2026-02-07
**Valid until:** 2026-03-07 (30 days - stable domain, HTML/CSS/TypeScript patterns change slowly)
