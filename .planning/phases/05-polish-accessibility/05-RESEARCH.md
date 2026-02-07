# Phase 5: Polish & Accessibility - Research

**Researched:** 2026-02-07
**Domain:** Web accessibility (WCAG 2.2 AA), SEO, scroll animations, performance optimization
**Confidence:** HIGH

## Summary

Phase 5 focuses on four interconnected domains: scroll-triggered animations, SEO optimization, accessibility compliance (WCAG 2.2 Level AA), and Lighthouse performance optimization. Research reveals well-established patterns for each domain, with particular emphasis on accessibility-first implementation.

**Key findings:**
- IntersectionObserver API + CSS transitions provide performant scroll animations that respect `prefers-reduced-motion`
- React Helmet Async is the current standard for managing meta tags in React SPAs, replacing deprecated react-helmet
- WCAG 2.2 Level AA adds 9 new success criteria to WCAG 2.1, including enhanced focus visibility requirements
- Achieving 90+ Lighthouse scores requires careful attention to bundle size, code splitting, and asset optimization
- Automated testing tools (axe DevTools, WAVE) catch ~30-40% of accessibility issues; manual testing is essential

**Primary recommendation:** Implement accessibility as the foundation, then layer animations and SEO optimizations on top. Use CSS for animations (JavaScript only for visibility detection), validate all color contrasts programmatically, and test with actual screen readers and keyboard navigation.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| IntersectionObserver API | Native | Detect element visibility | Native browser API, async/performant, widely supported since 2019 |
| react-helmet-async | ^2.0.0 | Manage document head/meta tags | Thread-safe, SSR-compatible, replaces deprecated react-helmet |
| CSS @media (prefers-reduced-motion) | Native | Respect motion preferences | Native CSS, required for WCAG 2.3.3 compliance, baseline support 2020+ |
| axe-core | ^4.x | Automated accessibility testing | Industry standard (Deque), highest accuracy, integrates with DevTools |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| WebAIM Contrast Checker | Online tool | Validate color contrast ratios | During design/development to verify 4.5:1 minimum |
| Lighthouse CI | ^0.13.0 | Automated performance/accessibility auditing | In CI/CD pipeline for continuous monitoring |
| WAVE Browser Extension | Browser tool | Visual accessibility feedback | Manual testing to validate automated results |
| React.lazy() | Built-in | Code splitting/lazy loading | For route-level or large component splitting |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-helmet-async | react-helmet | react-helmet is deprecated, has memory leaks, not thread-safe |
| IntersectionObserver | Scroll event listeners | Scroll events are synchronous, block main thread, poor performance |
| axe DevTools | Manual testing only | Automated testing catches 30-40% of issues much faster |
| CSS animations | JavaScript animation libraries (GSAP, Framer Motion) | JS libraries add bundle weight; CSS sufficient for simple fade/slide effects |

**Installation:**
```bash
npm install react-helmet-async
npm install --save-dev @axe-core/react
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   └── SEOHead.tsx          # Centralized SEO meta tag component
├── hooks/
│   ├── useIntersectionObserver.ts  # Reusable scroll animation hook
│   └── useReducedMotion.ts         # Detect prefers-reduced-motion
├── styles/
│   ├── animations.css       # Scroll animation classes
│   └── theme.css           # Existing theme with accessible colors
└── utils/
    └── accessibility.ts     # Focus management utilities
```

### Pattern 1: IntersectionObserver Hook for Scroll Animations
**What:** Reusable React hook that detects when elements enter viewport, adds CSS class for animation
**When to use:** For fade-in, slide-up effects on sections as they become visible

**Example:**
```typescript
// Source: https://www.builder.io/blog/react-intersection-observer
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(
  options = { threshold: 0.1, rootMargin: '0px' }
) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Only animate once when entering
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element); // Stop observing after animation
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
```

**Usage in component:**
```typescript
function Section() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className={isVisible ? 'fade-in-up visible' : 'fade-in-up'}
    >
      {/* Content */}
    </section>
  );
}
```

### Pattern 2: CSS Animations with prefers-reduced-motion
**What:** CSS-based animations that respect user motion preferences
**When to use:** All animations, required for WCAG 2.3.3 compliance

**Example:**
```css
/* Source: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion */

/* Default state: invisible and offset */
.fade-in-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Visible state: full opacity and no offset */
.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    /* Replace motion-based animation with fade only */
    transform: none;
    transition: opacity 0.3s ease-out;
  }

  .fade-in-up.visible {
    transform: none;
  }
}

/* Remove all transitions for users who prefer no motion */
@media (prefers-reduced-motion: reduce) {
  body {
    transition: none;
  }
}
```

### Pattern 3: SEO Meta Tags with react-helmet-async
**What:** Centralized component for managing document head metadata
**When to use:** For SPAs that need SEO-friendly meta tags (Open Graph, Twitter Cards)

**Example:**
```typescript
// Source: https://github.com/staylor/react-helmet-async
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url: string;
}

export function SEOHead({ title, description, image, url }: SEOHeadProps) {
  const fullTitle = `${title} | Juan Francisco Crespo Galán`;
  const defaultImage = `${url}/og-image.png`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
```

**App setup:**
```typescript
// Source: https://www.npmjs.com/package/react-helmet-async
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <SEOHead
        title="CV Portfolio"
        description="Full-stack developer specializing in React and TypeScript"
        url={`${window.location.origin}${import.meta.env.BASE_URL}`}
      />
      {/* Rest of app */}
    </HelmetProvider>
  );
}
```

### Pattern 4: Semantic HTML and ARIA Landmarks
**What:** Proper HTML structure with landmark regions for screen reader navigation
**When to use:** Always; foundation of accessibility

**Example:**
```tsx
// Source: https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/
function App() {
  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header role="banner">
        <nav aria-label="Primary navigation">
          {/* Navigation links */}
        </nav>
      </header>

      <main id="main-content" role="main">
        {/* Main content */}
      </main>

      <footer role="contentinfo">
        {/* Footer content */}
      </footer>
    </>
  );
}
```

```css
/* Skip link: hidden until focused */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Pattern 5: Focus Management for Interactive Elements
**What:** Visible focus indicators that meet WCAG 2.4.7 (Level A) and 2.4.11 (Level AA)
**When to use:** All interactive elements (links, buttons, form controls)

**Example:**
```css
/* Source: https://www.sarasoueidan.com/blog/focus-indicators/ */

/* Base focus style: high contrast, thick outline */
a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Ensure sufficient contrast (3:1 minimum per WCAG 2.4.13) */
:focus-visible {
  outline-color: var(--accent); /* Must have 3:1 contrast with background */
}

/* Dark mode variant */
[data-theme='dark'] :focus-visible {
  outline-color: var(--accent); /* Verify this also meets 3:1 in dark mode */
}

/* Remove focus outline ONLY when using mouse */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Anti-Patterns to Avoid
- **Animating with JavaScript when CSS suffices:** JavaScript animations are synchronous and block the main thread; CSS animations are GPU-accelerated
- **Using `<div>` or `<span>` for clickable elements:** These have no semantic meaning, keyboard support, or screen reader announcements. Use `<button>` or `<a>` instead
- **Setting `outline: none` without replacement:** Removes keyboard navigation visibility; always provide an alternative focus indicator
- **Client-side only meta tags for static sites:** Search engines and social media crawlers read initial HTML; react-helmet-async only updates DOM after JavaScript loads
- **Applying ARIA when semantic HTML exists:** `<nav>` is better than `<div role="navigation">`; use ARIA only when no native element exists

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered visibility detection | Custom scroll event listener with `getBoundingClientRect()` | IntersectionObserver API | Scroll events fire synchronously on every scroll frame (janky); IO is async, batched, off main thread |
| Color contrast validation | Manual eyeball testing | WebAIM Contrast Checker or automated tools | WCAG requires exact ratios (4.5:1, 3:1); human judgment is inaccurate |
| Focus management after route changes | Manual `focus()` calls scattered throughout components | Centralized focus management utility or router integration | Easy to miss edge cases; inconsistent UX across routes |
| Meta tag management | Direct DOM manipulation with `document.head` | react-helmet-async | Thread-safe, SSR-compatible, prevents race conditions and memory leaks |
| Accessibility testing | Manual checklist walkthrough | axe DevTools + manual screen reader testing | Automated tools catch 30-40% of issues instantly; manual testing validates the rest |
| Animation performance optimization | Custom request animation frame logic | CSS transitions/animations + IntersectionObserver | CSS animations are GPU-accelerated, respect prefers-reduced-motion automatically with media query |

**Key insight:** Accessibility edge cases are numerous and subtle (focus management during unmount, ARIA state sync, keyboard trap scenarios). Use battle-tested libraries and native browser APIs rather than reimplementing standard patterns.

## Common Pitfalls

### Pitfall 1: Animations Trigger Vestibular Issues
**What goes wrong:** Scroll-triggered animations with scaling, rotation, or parallax can trigger vestibular disorders, migraines, and seizures in sensitive users.

**Why it happens:** Developers implement "cool" effects without considering that 70+ million people have vestibular disorders. The `prefers-reduced-motion` media query is often forgotten or misunderstood.

**How to avoid:**
- Always wrap motion-based animations in `@media (prefers-reduced-motion: no-preference)`
- Provide fade-only alternatives: `@media (prefers-reduced-motion: reduce)` should use opacity changes, not transforms
- Test with OS setting enabled (macOS: System Settings > Accessibility > Display > Reduce motion)

**Warning signs:** Animations use `transform: scale()`, `transform: rotate()`, or parallax effects without `prefers-reduced-motion` handling.

### Pitfall 2: Dynamic Content Changes Not Announced to Screen Readers
**What goes wrong:** React state changes update the DOM, but screen readers don't announce the update. Users are unaware content has changed.

**Why it happens:** SPAs update content without page reloads, so screen readers don't automatically detect changes. React doesn't manage ARIA live regions.

**How to avoid:**
- Use ARIA live regions for dynamic content: `<div aria-live="polite" aria-atomic="true">`
- For critical updates (errors): `aria-live="assertive"`
- For route changes: programmatically announce page title or move focus to main heading

**Warning signs:** Form validation errors appear visually but aren't announced; loading states change without screen reader feedback.

### Pitfall 3: Poor Color Contrast in Dark Mode
**What goes wrong:** Light mode passes WCAG AA (4.5:1), but dark mode theme fails with insufficient contrast.

**Why it happens:** Developers manually pick dark mode colors without re-validating contrast ratios. Different backgrounds change relative contrast.

**How to avoid:**
- Test EVERY color combination in BOTH themes using WebAIM Contrast Checker
- Verify: text-primary on bg-primary, text-secondary on bg-secondary, accent on both backgrounds
- Document passing ratios in CSS comments: `--text-primary: #f1f5f9; /* 13.2:1 on --bg-primary */`

**Warning signs:** Dark mode looks good subjectively but hasn't been contrast-tested programmatically.

**Example validation needed for cv-page theme:**
```css
/* Light mode: verify these pass 4.5:1 */
--text-primary: #111827 on --bg-primary: #ffffff
--text-secondary: #6b7280 on --bg-primary: #ffffff
--accent: #3b82f6 on --bg-primary: #ffffff

/* Dark mode: verify these pass 4.5:1 */
--text-primary: #f1f5f9 on --bg-primary: #0f172a
--text-secondary: #94a3b8 on --bg-primary: #0f172a
--accent: #60a5fa on --bg-primary: #0f172a
```

### Pitfall 4: Focus Lost During Route Changes or Modal Dialogs
**What goes wrong:** User tabs through navigation, clicks link, route changes, focus returns to `<body>` instead of new page content. Keyboard users must tab through entire navigation again.

**Why it happens:** React Router doesn't manage focus by default. When modals close, focus stays on the now-hidden trigger button.

**How to avoid:**
- After route change: move focus to main heading (`<h1>`) or main landmark
- When opening modal: trap focus within modal, save previous focus target
- When closing modal: return focus to trigger element
- Use `useEffect` to manage focus after state changes

**Warning signs:** After navigation, pressing Tab starts from page top instead of main content; closing modal leaves focus nowhere.

### Pitfall 5: Missing Alt Text or Generic Alt Text
**What goes wrong:** Images have `alt=""` when decorative flag wasn't intended, or generic text like "image" or "photo".

**Why it happens:** Developers forget alt text or don't understand how to write meaningful descriptions.

**How to avoid:**
- Decorative images (CSS backgrounds, visual embellishment): `alt=""`
- Functional images (links, buttons): describe the action (e.g., `alt="View GitHub profile"`)
- Informational images: describe the content/purpose, not "image of X"
- Complex images (charts): brief alt + longer description via `aria-describedby` or adjacent text

**Warning signs:** `alt="profile picture"` instead of person's name; `alt="icon"` for functional buttons.

**Correct examples:**
```tsx
{/* Decorative */}
<img src="pattern.svg" alt="" />

{/* Functional link */}
<a href="https://github.com/user">
  <img src="github-icon.svg" alt="GitHub profile" />
</a>

{/* Informational */}
<img src="headshot.jpg" alt="Juan Francisco Crespo Galán" />
```

### Pitfall 6: Lighthouse Performance Regression from Unoptimized Builds
**What goes wrong:** Development build is fast, but production Lighthouse score is 60-70 instead of 90+.

**Why it happens:** Large bundle sizes, no code splitting, unoptimized images, third-party script bloat.

**How to avoid:**
- Use Vite's default code splitting (dynamic imports for routes)
- Lazy load non-critical components: `const Projects = React.lazy(() => import('./Projects'))`
- Compress images (WebP format, responsive srcset)
- Audit bundle with `npm run build -- --report` to identify large dependencies
- Self-host fonts instead of Google Fonts (avoid external requests)

**Warning signs:** Bundle size > 500KB, First Contentful Paint > 2s, Time to Interactive > 4s.

### Pitfall 7: Keyboard Traps in Custom Components
**What goes wrong:** User tabs into custom dropdown/modal, can't tab out, stuck in component.

**Why it happens:** Custom components manage focus manually but don't implement Escape key handling or proper focus loop boundaries.

**How to avoid:**
- Modals: trap focus within modal (tab from last element returns to first), Escape key closes and returns focus
- Dropdowns: Escape closes, Arrow keys navigate, Enter/Space select
- Use libraries for complex patterns (Radix UI, Headless UI provide accessible primitives)

**Warning signs:** Custom modal/dropdown/menu doesn't respond to Escape key; tabbing goes behind modal to background content.

## Code Examples

Verified patterns from official sources:

### useReducedMotion Hook
```typescript
// Source: https://www.joshwcomeau.com/react/prefers-reduced-motion/
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
}
```

**Usage:**
```typescript
function AnimatedSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6
      }}
    >
      Content
    </motion.div>
  );
}
```

### Scroll Animation with Staggered Children
```css
/* Source: https://dev.to/miacan2021/fade-in-animation-on-scroll-with-intersectionobserver-vanilla-js-4p27 */

.fade-in-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger child animations */
.fade-in-up.visible:nth-child(1) { transition-delay: 0.1s; }
.fade-in-up.visible:nth-child(2) { transition-delay: 0.2s; }
.fade-in-up.visible:nth-child(3) { transition-delay: 0.3s; }
.fade-in-up.visible:nth-child(4) { transition-delay: 0.4s; }

@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    transform: none;
    transition: opacity 0.3s ease-out;
  }

  .fade-in-up.visible {
    transform: none;
  }

  /* Remove stagger delays in reduced motion */
  .fade-in-up.visible:nth-child(n) {
    transition-delay: 0s;
  }
}
```

### Accessible Modal Focus Management
```typescript
// Source: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
import { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Save currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Move focus to modal
      modalRef.current?.focus();

      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }

        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          if (!focusableElements || focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);

        // Return focus to previously focused element
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className="modal-overlay"
    >
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}
```

### Vite Code Splitting for Performance
```typescript
// Source: https://vite.dev/guide/features
import React, { Suspense } from 'react';

// Route-level code splitting
const Experience = React.lazy(() => import('./components/Experience'));
const Skills = React.lazy(() => import('./components/Skills'));
const Education = React.lazy(() => import('./components/Education'));
const Projects = React.lazy(() => import('./components/Projects'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Experience />
      <Skills />
      <Education />
      <Projects />
    </Suspense>
  );
}
```

**Vite configuration for optimized chunks:**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React ecosystem
          'react-vendor': ['react', 'react-dom', 'react-helmet-async'],
          // Icons in separate chunk
          'react-icons': ['react-icons/fa', 'react-icons/si'],
        },
      },
    },
  },
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| react-helmet | react-helmet-async | 2020 | Thread-safe, no memory leaks, SSR-compatible |
| Scroll event listeners for animations | IntersectionObserver API | 2019 (baseline support) | Async, performant, off main thread |
| WCAG 2.1 AA | WCAG 2.2 AA | 2023 (official), 2026 (legal compliance) | 9 new criteria including Focus Not Obscured (2.4.11) |
| Manual contrast checking | Automated tools (axe, Lighthouse) | Ongoing maturity | Faster detection, CI/CD integration |
| Google Fonts CDN | Self-hosted fonts | 2022-2024 (privacy + perf) | Eliminates external requests, improves Lighthouse score |
| jQuery-based scroll animations | CSS transitions + IO API | 2019-2020 | Smaller bundle, GPU-accelerated, native browser features |

**Deprecated/outdated:**
- **react-helmet:** Deprecated in favor of react-helmet-async (memory leaks, not thread-safe)
- **`scroll` event listeners for visibility detection:** Replaced by IntersectionObserver (performance, simplicity)
- **WCAG 2.1 as legal standard:** WCAG 2.2 is now ISO standard (2025), US federal compliance deadline April 2026/2027
- **Client-side only routing without focus management:** Modern SPAs must manage focus for accessibility (WCAG 2.4.3)

## Open Questions

Things that couldn't be fully resolved:

1. **GitHub Pages static site SEO with react-helmet-async**
   - What we know: react-helmet-async updates DOM after React hydration; search crawlers may not wait for JavaScript execution
   - What's unclear: Whether GitHub Pages pre-renders React apps, or if crawlers execute JavaScript sufficiently for meta tags
   - Recommendation: Test with Facebook Debugger and Twitter Card Validator after deployment. If meta tags don't appear, may need build-time meta tag injection in `index.html` template or Vite plugin for static generation

2. **Optimal Lighthouse performance score threshold for this project**
   - What we know: Industry recommends 90+ for "good" score; 100 is extremely difficult and not expected
   - What's unclear: Whether a CV portfolio page (minimal JavaScript, mostly static) should target 95+ or if 90 is sufficient
   - Recommendation: Target 90+ initially; if easily achievable, stretch to 95+. Prioritize actual UX metrics (FCP, LCP, CLS) over score number

3. **Whether to self-host fonts vs use system fonts**
   - What we know: Self-hosted fonts eliminate external requests (better Lighthouse score); system fonts are fastest but less control over typography
   - What's unclear: Current font setup not visible in research; impact on performance vs design goals
   - Recommendation: Check current font loading strategy. If using Google Fonts, consider self-hosting WOFF2 subset. If no custom fonts yet, start with system fonts for best performance

4. **Focus management strategy for single-page navigation**
   - What we know: Should move focus to main heading or main landmark after route change; current site uses scroll-spy navigation
   - What's unclear: Whether smooth scroll navigation interferes with focus management
   - Recommendation: Test with keyboard-only navigation. After clicking nav link, programmatically focus the corresponding section's heading with `tabindex="-1"` to enable focus without adding to tab order

## Sources

### Primary (HIGH confidence)
- [MDN: IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Official browser API documentation
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) - CSS media feature specification
- [W3C WCAG 2.2: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) - Official WCAG success criterion 1.4.3
- [W3C: ARIA Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) - Official ARIA practices guide
- [react-helmet-async npm package](https://www.npmjs.com/package/react-helmet-async) - Official package documentation
- [Vite: Features - Code Splitting](https://vite.dev/guide/features) - Official Vite documentation

### Secondary (MEDIUM confidence)
- [Builder.io: React Intersection Observer Guide](https://www.builder.io/blog/react-intersection-observer) - Verified implementation patterns
- [Josh W. Comeau: Accessible Animations in React](https://www.joshwcomeau.com/react/prefers-reduced-motion/) - Well-regarded accessibility expert
- [Sara Soueidan: Focus Indicators](https://www.sarasoueidan.com/blog/focus-indicators/) - Recognized accessibility specialist
- [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/) - Industry-standard tool
- [Deque: axe DevTools](https://www.deque.com/axe/devtools/) - Industry-leading accessibility testing
- [DEV Community: Fade-in animation with IntersectionObserver](https://dev.to/miacan2021/fade-in-animation-on-scroll-with-intersectionobserver-vanilla-js-4p27) - Practical implementation
- [Level Access: WCAG 2.2 AA Checklist](https://www.levelaccess.com/blog/wcag-2-2-aa-summary-and-checklist-for-website-owners/) - WCAG compliance guide
- [Mivi: WCAG 2.2 Checklist 2026](https://mivibzzz.com/resources/accessibility/wcag-checklist) - Current compliance requirements

### Secondary (MEDIUM confidence - GitHub Pages SEO)
- [Static Meta Tags for React SEO (GitHub Gist)](https://gist.github.com/MahdiKarimipour/b8bafbf36ba5ec994178de4e0749c117) - Community pattern
- [DEV Community: SEO Optimization for React + Vite](https://dev.to/ali_dz/optimizing-seo-in-a-react-vite-project-the-ultimate-guide-3mbh) - Practical guide
- [ThatSoftwareDude: react-helmet vs react-helmet-async](https://www.thatsoftwaredude.com/content/14126/react-helmet-vs-react-helmet-async) - Library comparison

### Tertiary (LOW confidence - Lighthouse optimization)
- [GitHub Discussion: Vite Build Size and Lighthouse Score](https://github.com/vitejs/vite/discussions/14359) - Community discussion, anecdotal
- [DEV Community: Get 100 Lighthouse Performance Score with React](https://dev.to/mladenstojanovic/get-100-lighthouse-performance-score-with-a-react-app-hc6) - Individual blog post, not verified
- [Medium: Boost React Performance with Vite, Lazy Loading, Code Splitting](https://benmukebo.medium.com/boost-your-react-apps-performance-with-vite-lazy-loading-and-code-splitting-2fd093128682) - General optimization advice

### Testing and Validation Resources
- [WebAIM: WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist) - Comprehensive WCAG compliance checklist
- [Accessible.org: WCAG 2.1 AA and 2.2 AA Checklist](https://accessible.org/wcag/) - Updated checklist with 2.2 criteria
- [A11y Project: Skip Navigation Links](https://www.a11yproject.com/posts/skip-nav-links/) - Skip link best practices
- [W3C: Alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) - Guide for writing alt text

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - IntersectionObserver and prefers-reduced-motion are native APIs with extensive documentation; react-helmet-async is widely adopted and verified
- Architecture: HIGH - Patterns verified from official sources (MDN, W3C) and recognized experts (Josh W. Comeau, Sara Soueidan)
- Pitfalls: HIGH - Based on official WCAG documentation and common issues documented by accessibility organizations (WebAIM, Deque, A11y Project)
- SEO for static sites: MEDIUM - react-helmet-async best practices documented, but GitHub Pages specific behavior requires post-deployment testing
- Lighthouse optimization: MEDIUM - General Vite optimization well-documented, but specific score targets depend on implementation details

**Research date:** 2026-02-07
**Valid until:** 30 days (stable domain; WCAG 2.2 is current standard through 2026; tools and libraries mature)
