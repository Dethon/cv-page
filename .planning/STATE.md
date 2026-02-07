# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-07)

**Core value:** Visitors immediately understand who Juan Francisco is as an engineer — his breadth of experience, technical depth, and the quality of his work — and can easily reach out or explore further.
**Current focus:** Phase 3: Core Content

## Current Position

Phase: 3 of 5 (Core Content)
Plan: 2 of 4 complete
Status: In progress
Last activity: 2026-02-07 — Completed 03-02-PLAN.md

Progress: [█████░░░░░] 60%

## Performance Metrics

**Velocity:**
- Total plans completed: 6
- Average duration: 8 min
- Total execution time: 1.0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1 | 1 | 5 min | 5 min |
| 2 | 3 | 42 min | 14 min |
| 3 | 2 | 3 min | 1.5 min |

**Recent Trend:**
- Last 5 plans: 02-02 (2 min), 02-03 (38 min), 03-01 (2 min), 03-02 (1 min)
- Trend: Fast execution on autonomous plans, checkpoints add time

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- React + Vite over static HTML — User preference; component-based architecture for maintainability
- Curated projects over API-fetched — Full control over what's displayed and how it's described
- Single language (English) — Professional working language, broader audience
- GitHub Pages deployment — Free, simple, already has GitHub account
- Vite scaffold fallback (tmp-scaffold) — Non-empty directory required scaffold-then-move approach
- GitHub Pages environment policy — Added `main` branch to deployment branch policies
- CSS custom properties over CSS-in-JS — Better performance, works without JavaScript (02-01)
- Inline FOUC prevention script — Prevents flash of wrong theme on load (02-01)
- Simple hook over Context API — Sufficient for single theme state (02-01)
- IntersectionObserver over scroll events — More efficient, battery-friendly for scroll-spy (02-02)
- Hamburger breakpoint at 768px — Standard mobile/tablet breakpoint (02-02)
- Hero excluded from nav links — Landing section doesn't need nav link, site title provides return-to-top (02-02)
- ThemeToggle integrated into Navigation — Provides persistent access in sticky header (02-03)
- 404 page as standalone HTML — GitHub Pages requirement, inline CSS and FOUC script for theme support (02-03)
- Smooth scroll with prefers-reduced-motion — CSS-based, respects system accessibility setting (02-03)
- ExperienceEntry roles array structure — Handles multiple roles under same company (03-01)
- ISO YYYY-MM date format with formatDate helper — Machine-readable storage, human-readable display (03-01)
- Photo placeholder as CSS-styled div — Visual balance until real photo available (03-01)
- Vertical timeline with left-aligned connector and circle markers — CSS-only layout using pseudo-elements (03-02)
- Ordered list (ol) for chronological data semantics — Timeline uses semantic HTML for experience data (03-02)
- Multi-role companies show all roles under single company heading — Border separator between roles (03-02)
- CSS-only timeline layout without JavaScript — Static presentation, no animations until Phase 5 (03-02)

### Pending Todos

None.

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-02-07T04:47:21Z
Stopped at: Completed 03-02-PLAN.md — Experience timeline with vertical layout
Resume file: None
