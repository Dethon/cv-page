# Phase 4: Showcase & Interaction - Research

**Researched:** 2026-02-07
**Domain:** Portfolio project display, PDF downloads, contact footer
**Confidence:** HIGH

## Summary

Phase 4 implements three distinct features: project cards for portfolio showcase, PDF download functionality, and a contact footer with social links. The research reveals established patterns for each:

**Project Cards:** Use CSS Grid for the card container layout (two-dimensional control) with auto-fit/minmax for responsive behavior. Individual card styling uses the existing component pattern (CSS custom properties, subtle hover effects). Technology tags display as inline badges using Flexbox.

**PDF Download:** Simple native approach using an anchor tag with `download` attribute pointing to the existing `cv.pdf` file. No external library needed since the PDF already exists and just needs to be served from the public directory.

**Contact Footer:** Use react-icons library (standard for React projects) to provide GitHub, LinkedIn, and email icons. Critical accessibility requirement: use `aria-label` on anchor tags with `aria-hidden="true"` on icon elements.

**Primary recommendation:** Follow the established component architecture pattern from prior phases (dedicated component file + CSS file, custom properties for theming, responsive breakpoints at 768px/1200px). Use CSS Grid for card layout, native download for PDF, and react-icons for social icons with proper accessibility labels.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-icons | ^5.x | Social media and UI icons | Most popular React icon library (ES6 imports, tree-shakeable, includes all major icon packs) |
| CSS Grid | Native | Card layout structure | Browser-native, best for two-dimensional layouts (rows + columns) |
| CSS Flexbox | Native | Tag/badge layout, card content alignment | Browser-native, best for one-dimensional layouts |
| Vite static assets | Built-in | Serving PDF from public directory | Already configured in project, zero additional setup |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| N/A | - | No additional libraries needed | Existing stack covers all requirements |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-icons | Font Awesome CDN or SVG sprites | react-icons offers better tree-shaking and TypeScript support |
| Native download | @react-pdf/renderer | Only needed if generating PDFs dynamically; overkill for serving existing file |
| CSS Grid | react-grid-layout | Only needed for draggable/resizable grids; excessive for static cards |

**Installation:**
```bash
npm install react-icons
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── Projects.tsx         # Project showcase section
│   ├── projects.css         # Project card styles
│   ├── ContactFooter.tsx    # Contact links footer
│   └── contactfooter.css    # Footer styles
├── types/
│   └── content.ts           # Add ProjectEntry interface
├── data/
│   └── cv-content.ts        # Add projects array
public/
└── cv.pdf                   # User's CV (move from root)
```

### Pattern 1: Project Card Grid Layout
**What:** Responsive card grid that automatically adjusts columns based on viewport
**When to use:** Displaying multiple cards of similar content (projects, articles, products)
**Example:**
```css
/* Source: https://dopebase.com/blog/creating-responsive-card-grid-layout-css-grid-react */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

/* Individual card */
.project-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px var(--shadow);
}

/* Responsive refinement */
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}
```

### Pattern 2: Technology Tags Display
**What:** Inline badges showing technologies used in each project
**When to use:** Displaying metadata tags, skill keywords, categories
**Example:**
```css
/* Source: https://smart-interface-design-patterns.com/articles/badges-chips-tags-pills/ */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tech-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 12px;
  background: var(--accent);
  color: var(--bg-primary);
  font-weight: 500;
}
```

### Pattern 3: Simple PDF Download Link
**What:** Native HTML download using anchor tag with download attribute
**When to use:** Serving pre-existing static files (CVs, documents, reports)
**Example:**
```tsx
// Source: https://bobbyhadz.com/blog/react-download-file
function DownloadButton() {
  return (
    <a
      href="/cv-page/cv.pdf"
      download="Juan_Francisco_Crespo_CV.pdf"
      className="download-btn"
    >
      Download CV
    </a>
  );
}
```

**Note:** The `download` attribute triggers browser download and sets the filename. The href path must account for Vite base path (`/cv-page/` from vite.config.ts).

### Pattern 4: Accessible Social Icon Links
**What:** Icon-only links with proper accessibility labels for screen readers
**When to use:** Social media links, icon navigation, contact methods
**Example:**
```tsx
// Source: https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function ContactFooter() {
  return (
    <div className="contact-links">
      <a
        href="mailto:JF_Crespo@outlook.es"
        aria-label="Email Juan Francisco Crespo"
      >
        <MdEmail aria-hidden="true" size={24} />
      </a>
      <a
        href="https://www.linkedin.com/in/jfcrespo5"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Juan Francisco's LinkedIn profile"
      >
        <FaLinkedin aria-hidden="true" size={24} />
      </a>
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Juan Francisco's GitHub profile"
      >
        <FaGithub aria-hidden="true" size={24} />
      </a>
    </div>
  );
}
```

**Critical accessibility pattern:**
- `aria-label` on the `<a>` tag explains the destination
- `aria-hidden="true"` on the icon component (screen readers ignore the icon itself)
- Never leave icon-only links without text or aria-label

### Anti-Patterns to Avoid
- **Using Flexbox for card grid:** Grid provides better two-dimensional control and simpler responsive behavior
- **Empty icon links:** Icon-only links without aria-label or visible text are inaccessible (affects ~50% of top websites)
- **Generating PDF dynamically:** Don't use @react-pdf/renderer when a static PDF already exists
- **Using absolute positioning for card layouts:** Breaks responsive behavior, hard to maintain
- **Inline styles for hover effects:** Use CSS classes for better performance and consistency

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Social media icons | Custom SVG components for each icon | react-icons (FaGithub, FaLinkedin, MdEmail) | Handles accessibility, sizing, theming; includes thousands of icons; tree-shakeable |
| Responsive card grid | Manual media queries for column counts | CSS Grid auto-fit with minmax() | Automatically adapts to any viewport; less code; maintainable |
| PDF download | Custom fetch/blob implementation | Native `<a download>` attribute | Browser-native; simpler; handles MIME types; better UX |
| Technology tag styling | Custom badge components | Simple CSS with Flexbox + border-radius | Overengineering; CSS is sufficient; easier to theme |

**Key insight:** React portfolio sites often over-engineer solutions. For Phase 4, the browser and react-icons provide everything needed. The complexity is in the data structure and accessibility, not the implementation.

## Common Pitfalls

### Pitfall 1: Implicit Grid Creating Extra Rows
**What goes wrong:** Cards appear with unexpected gaps or misalignment when grid auto-creates rows for overflow items
**Why it happens:** Not defining how many items fit per row, leading CSS Grid to create implicit rows with default sizing
**How to avoid:** Use `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` which explicitly defines column behavior
**Warning signs:** Inconsistent card heights, unexpected vertical gaps, cards of different widths in same row

### Pitfall 2: Missing ARIA Labels on Icon Links
**What goes wrong:** Screen readers announce "link" with no context, making navigation impossible for visually impaired users
**Why it happens:** Developers forget that icon-only links have no text for screen readers to announce
**How to avoid:** Always add `aria-label` to the anchor tag describing the destination, and `aria-hidden="true"` to the icon
**Warning signs:** Lighthouse accessibility score below 100, screen reader testing reveals "link, link, link" with no context

### Pitfall 3: PDF Path Not Accounting for Vite Base
**What goes wrong:** Download link returns 404 in production (GitHub Pages) even though it works in dev
**Why it happens:** Vite config sets `base: '/cv-page/'` for GitHub Pages, but href uses absolute path
**How to avoid:** Use relative path from public: `/cv-page/cv.pdf` or use Vite's `import.meta.env.BASE_URL` for dynamic base
**Warning signs:** Works in `npm run dev` but breaks in `npm run preview` or deployed site

### Pitfall 4: Card Content Overflow
**What goes wrong:** Long project descriptions or many tech tags break card layout or overflow container
**Why it happens:** Not constraining text or using fixed heights without overflow handling
**How to avoid:** Use `overflow: hidden` with `text-overflow: ellipsis` for descriptions, or set reasonable `max-width` and let cards grow vertically
**Warning signs:** Text overlaps other elements, horizontal scrollbar appears, cards push layout boundaries

### Pitfall 5: Hover Effects on Mobile
**What goes wrong:** Card hover states persist on mobile after tap, creating "sticky" hover state
**Why it happens:** Touch devices trigger hover state on tap, which doesn't clear until another element is tapped
**How to avoid:** Use `@media (hover: hover)` media query to only apply hover effects on devices with hover capability
**Warning signs:** Cards stay in hover state on mobile, users report "weird behavior" on touch devices

## Code Examples

Verified patterns from official sources and established practices:

### Complete Project Card Component Structure
```tsx
// Projects.tsx
interface ProjectEntry {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
}

interface ProjectsProps {
  projects: ProjectEntry[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="section">
      <div className="section-content">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Project Card Responsive CSS
```css
/* projects.css */
/* Source: Combination of https://dopebase.com/blog/creating-responsive-card-grid-layout-css-grid-react
   and existing project patterns */

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.project-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Hover effect only on devices with hover capability */
@media (hover: hover) {
  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px var(--shadow);
  }
}

.project-title {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin: 0;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 12px;
  background: var(--accent);
  color: var(--bg-primary);
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.project-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.project-link:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}

/* Tablet and up: Allow wider cards */
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }
}

/* Desktop: Limit to 3 columns max for readability */
@media (min-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}
```

### Contact Footer with Icons
```tsx
// ContactFooter.tsx
// Source: https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import './contactfooter.css';

interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
}

interface ContactFooterProps {
  contact: ContactInfo;
}

export function ContactFooter({ contact }: ContactFooterProps) {
  return (
    <footer className="contact-footer">
      <div className="contact-content">
        <h3>Get in Touch</h3>
        <div className="contact-links">
          <a
            href={`mailto:${contact.email}`}
            aria-label={`Email ${contact.email}`}
            className="contact-icon"
          >
            <MdEmail aria-hidden="true" size={28} />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
            className="contact-icon"
          >
            <FaLinkedin aria-hidden="true" size={28} />
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
            className="contact-icon"
          >
            <FaGithub aria-hidden="true" size={28} />
          </a>
        </div>
        <a
          href="/cv-page/cv.pdf"
          download="Juan_Francisco_Crespo_CV.pdf"
          className="download-btn"
        >
          Download CV (PDF)
        </a>
      </div>
    </footer>
  );
}
```

### Contact Footer CSS
```css
/* contactfooter.css */
.contact-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: 3rem 1rem;
  text-align: center;
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-content h3 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.contact-icon {
  color: var(--text-secondary);
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-flex;
}

.contact-icon:hover {
  color: var(--accent);
  transform: scale(1.1);
}

.download-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--accent);
  color: var(--bg-primary);
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.2s ease;
}

.download-btn:hover {
  background: var(--accent-hover);
}

@media (min-width: 768px) {
  .contact-footer {
    padding: 4rem 2rem;
  }

  .contact-links {
    gap: 3rem;
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Font Awesome CDN | react-icons with ES6 imports | ~2019 | Better tree-shaking, no global namespace pollution, TypeScript support |
| Manual media queries for cards | CSS Grid auto-fit/minmax | ~2017 | Fewer breakpoints needed, truly fluid responsive design |
| Custom SVG components for icons | Icon libraries (react-icons, lucide-react) | ~2018 | Massive time savings, consistency, accessibility built-in |
| File downloads via fetch/blob | Native `<a download>` attribute | HTML5 | Simpler, better browser support, cleaner code |

**Deprecated/outdated:**
- **Icon fonts (Font Awesome CDN):** Modern React projects use component-based icon libraries for better tree-shaking and TypeScript support
- **Float-based card layouts:** CSS Grid and Flexbox have completely replaced float-based layouts
- **react-grid-layout for static cards:** Overkill; only needed for draggable/resizable grids
- **@react-pdf/renderer for serving static PDFs:** Library is for PDF generation, not serving existing files

## Open Questions

Things that couldn't be fully resolved:

1. **GitHub username for contact footer**
   - What we know: Email (JF_Crespo@outlook.es) and LinkedIn (linkedin.com/in/jfcrespo5) are in cv-content.ts
   - What's unclear: GitHub username not present in existing data
   - Recommendation: Add `github: string` to PersonalInfo interface and populate in cv-content.ts during planning

2. **Project data structure completeness**
   - What we know: Need title, description, technologies[], githubUrl, optional demoUrl
   - What's unclear: Whether user wants project images/screenshots (not mentioned in requirements)
   - Recommendation: Start without images per YAGNI principle; requirements only specify text content

3. **Number of projects to display**
   - What we know: User has 10+ years experience with diverse projects
   - What's unclear: How many projects to curate for portfolio
   - Recommendation: Plan for data structure supporting 4-6 projects; user can adjust content in cv-content.ts

## Sources

### Primary (HIGH confidence)
- [CSS Grid Layout Guide - CSS-Tricks](https://css-tricks.com/css-grid-layout-guide/)
- [Creating Responsive Card Grid Layout with CSS Grid and React - Dopebase](https://dopebase.com/blog/creating-responsive-card-grid-layout-css-grid-react)
- [ARIA Labels for Web Accessibility - AllAccessible](https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility)
- [React Icons Official Documentation](https://react-icons.github.io/react-icons/)
- [MDN: Relationship of Grid Layout to Other Layout Methods](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Relationship_with_other_layout_methods)

### Secondary (MEDIUM confidence)
- [Using React Icons in React: A Practical, Modern Guide (2026) - TheLinuxCode](https://thelinuxcode.com/using-react-icons-in-react-a-practical-modern-guide-2026/)
- [How to Download Files in React.js - Bobby Hadz](https://bobbyhadz.com/blog/react-download-file)
- [CSS Flexbox vs CSS Grid - LogRocket Blog](https://blog.logrocket.com/css-flexbox-vs-css-grid/)
- [Badges vs. Pills vs. Chips vs. Tags - Smart Interface Design Patterns](https://smart-interface-design-patterns.com/articles/badges-chips-tags-pills/)
- [The Problem with Social Media Icons - Savvas Stephanides](https://savvas.me/accessibility/problem-with-social-icons/)

### Tertiary (LOW confidence - marked for validation)
- Various WebSearch results on portfolio design trends (general guidance only, not technical)
- Icon resource sites (Flaticon, Icons8) - alternatives if react-icons doesn't meet needs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - react-icons is industry standard, CSS Grid/Flexbox are well-established
- Architecture: HIGH - Patterns verified with MDN and established documentation
- Pitfalls: HIGH - Common issues documented in multiple authoritative sources (MDN, CSS-Tricks, accessibility guides)

**Research date:** 2026-02-07
**Valid until:** ~30 days (stable technologies, but check for react-icons updates)
