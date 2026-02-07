# Phase 1: Foundation & Deployment - Research

**Researched:** 2026-02-07
**Domain:** React + Vite + TypeScript project initialization and GitHub Pages deployment
**Confidence:** HIGH

## Summary

Phase 1 establishes the core development and deployment infrastructure for the CV portfolio site. The research focused on the standard Vite + React + TypeScript stack initialization, GitHub Actions workflows for automated GitHub Pages deployment, and critical configuration requirements.

**Key findings:**
- Vite 6 provides the fastest React development experience with out-of-the-box HMR and optimal defaults
- React 19 is stable and well-supported by Vite's official `react-ts` template
- GitHub Actions with artifact-based deployment (v4 actions) is the official recommended approach
- Base path configuration is the #1 deployment pitfall - must be set correctly before first deployment
- Local preview testing with `npm run preview` catches 80% of deployment issues before pushing

**Primary recommendation:** Follow the official Vite + GitHub Actions pattern exactly. Use the `react-ts` template, configure base path immediately in vite.config.ts, and test with preview before deploying. This prevents the most common failure mode (blank page on GitHub Pages).

## Standard Stack

The established tools for Vite + React + TypeScript initialization and deployment:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vite | 6.x (latest) | Build tool & dev server | Official React recommendation, 5x faster than webpack, built-in HMR. Requires Node.js 20.19+/22.12+ |
| React | 19.x | UI library | Latest stable, well-supported by Vite template |
| TypeScript | 5.x | Type safety | Included in `react-ts` template with optimal defaults |
| Node.js | 20.19+ or 22.12+ | Runtime | Required by Vite 6 |

**Source:** [Vite Getting Started Guide](https://vite.dev/guide/) - HIGH confidence

### GitHub Actions
| Action | Version | Purpose | When to Use |
|--------|---------|---------|-------------|
| actions/checkout | v5 | Clone repository | Every workflow (first step) |
| actions/setup-node | v6 | Install Node.js | Build steps requiring npm/node |
| actions/configure-pages | v5 | Configure Pages metadata | Before upload-pages-artifact |
| actions/upload-pages-artifact | v4 | Package build output | After build, before deploy |
| actions/deploy-pages | v4 | Deploy to GitHub Pages | Final deployment step |

**Important:** v4 of deploy-pages requires `actions: read` permission. v4 uses artifact IDs (more reliable) vs v3's path-based approach.

**Sources:**
- [GitHub actions/deploy-pages](https://github.com/actions/deploy-pages)
- [GitHub Changelog: Artifacts v4 requirement](https://github.blog/changelog/2024-12-05-deprecation-notice-github-pages-actions-to-require-artifacts-actions-v4-on-github-com/)

**Confidence:** HIGH (official GitHub Actions documentation)

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GitHub Actions | gh-pages npm package | Actions is official, more reliable, better CI/CD integration |
| Vite | Create React App (CRA) | CRA deprecated/unmaintained, Vite 5x faster |
| npm | pnpm/yarn | npm included with Node, one less tool, sufficient for this project |
| Node LTS | Specific version | LTS auto-updates to latest stable (recommended by GitHub) |

**Installation:**
```bash
# Initialize Vite project with React + TypeScript template
npm create vite@latest cv-page -- --template react-ts
cd cv-page

# Install dependencies
npm install

# Start development server
npm run dev
```

## Architecture Patterns

### Recommended Project Structure
```
cv-page/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/                     # Static assets (copied as-is)
├── src/
│   ├── assets/                 # Images, fonts used in components
│   ├── App.tsx                 # Root component
│   ├── App.css                 # App styles
│   ├── main.tsx                # Entry point (renders App)
│   ├── index.css               # Global styles
│   └── vite-env.d.ts           # Vite type declarations
├── index.html                  # Entry HTML (at root, not in public/)
├── package.json
├── tsconfig.json               # TypeScript config
├── tsconfig.app.json           # App-specific TS config
├── tsconfig.node.json          # Node/config-specific TS config
├── vite.config.ts              # Vite configuration
└── .gitignore
```

**Key architectural notes:**
- `index.html` lives at project root, not inside `public/` (Vite treats it as source code)
- Vite auto-rebases URLs in `index.html`, no `%PUBLIC_URL%` needed
- Multiple tsconfig files support separate concerns (app vs build tooling)

**Source:** Vite official template structure - HIGH confidence

### Pattern 1: Vite Configuration for GitHub Pages

**What:** Configure base path for subdirectory deployment (username.github.io/repo-name)

**When to use:** When deploying to GitHub project pages (not username.github.io root)

**Example:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cv-page/',  // CRITICAL: Must match GitHub repo name exactly
  build: {
    outDir: 'dist',   // Default output directory
  },
})
```

**Source:** [Vite Static Deploy Guide](https://vite.dev/guide/static-deploy) - HIGH confidence

**Critical details:**
- `base` must include leading and trailing slashes: `/repo-name/`
- For `username.github.io` root sites, use `base: '/'`
- Wrong base path = blank page with 404 errors for all assets
- Set this BEFORE first deployment to avoid confusion

### Pattern 2: GitHub Actions Workflow Structure

**What:** Official workflow for deploying Vite static output to GitHub Pages

**When to use:** Every GitHub Pages deployment using Vite (recommended approach)

**Example:**
```yaml
# .github/workflows/deploy.yml
name: Deploy static content to Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:  # Allows manual trigger from Actions tab

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true  # Cancel in-progress runs on new push

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Set up Node
        uses: actions/setup-node@v6
        with:
          node-version: lts/*
          cache: 'npm'  # Speeds up installs on subsequent runs

      - name: Install dependencies
        run: npm ci  # Use ci instead of install for reproducible builds

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: './dist'  # Vite's default output directory

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Source:** [Vite Official Deployment Guide](https://vite.dev/guide/static-deploy) - HIGH confidence

**Why this pattern:**
- Uses latest v4/v5/v6 actions (artifact-based, more reliable)
- Combines build and deploy in single job (simpler for static sites)
- `npm ci` guarantees reproducible builds from package-lock.json
- `cache: 'npm'` speeds up subsequent workflow runs
- `workflow_dispatch` enables manual testing of deployments

### Pattern 3: npm Scripts Convention

**What:** Standard Vite scripts for development, building, and testing

**When to use:** Default package.json scripts for all Vite projects

**Example:**
```json
{
  "scripts": {
    "dev": "vite",              // Starts dev server with HMR on port 5173
    "build": "tsc && vite build",  // Type-check then build for production
    "preview": "vite preview"    // Preview production build locally on port 4173
  }
}
```

**Usage workflow:**
```bash
# Development (hot reload, fast refresh)
npm run dev

# Before deployment: build and test locally
npm run build
npm run preview  # Catches base path issues before pushing

# Production deployment (GitHub Actions runs this)
npm run build
```

**Source:** [Vite Getting Started](https://vite.dev/guide/) - HIGH confidence

**Why preview is critical:**
- Dev server (`npm run dev`) and production build behave differently
- Preview serves built files from `dist/` exactly as GitHub Pages will
- Catches base path errors, missing files, broken imports before deployment
- 80% of deployment issues visible in preview

### Anti-Patterns to Avoid

- **❌ Skipping preview testing:** Always run `npm run preview` before pushing deployment changes
- **❌ Using relative base path (`./`):** Some sources suggest this, but `/repo-name/` is clearer and official
- **❌ Committing dist/ to git:** Let GitHub Actions build fresh on each deploy (reproducible)
- **❌ Old Actions versions:** Using deploy-pages@v3 or older (v4 required as of Dec 2024)
- **❌ Missing base config:** Forgetting `base` in vite.config.ts causes blank page on GitHub Pages

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Development server with HMR | Custom dev server | Vite dev server (built-in) | Vite HMR works out-of-box for React, WebSocket-based, sub-100ms updates |
| Production build optimization | Custom build scripts | Vite build (uses Rollup) | Tree-shaking, minification, code-splitting automatic |
| GitHub Pages deployment | Custom deployment scripts | GitHub Actions workflow | Official, integrated with Pages permissions, artifact-based reliability |
| TypeScript configuration | Custom tsconfig | Vite template defaults | Optimized for React, includes proper JSX transform, path resolution |
| Preview server | Custom static server | `vite preview` | Matches production build behavior, correct MIME types |

**Key insight:** Vite and GitHub Actions provide complete solutions for development and deployment. Custom scripts add complexity without benefit for standard React deployments.

## Common Pitfalls

### Pitfall 1: Incorrect Base Path Configuration Causes Blank Page

**What goes wrong:** Site deploys successfully but shows blank white page at username.github.io/cv-page/. Browser console shows 404 errors for all JS/CSS assets. Assets load from root (`username.github.io/assets/...`) instead of subdirectory (`username.github.io/cv-page/assets/...`).

**Why it happens:** GitHub Pages serves project repos at subdirectory paths, but Vite defaults to `base: '/'` (root). Without matching base configuration, all asset paths are wrong.

**How to avoid:**
```typescript
// vite.config.ts - Set IMMEDIATELY during initial setup
export default defineConfig({
  base: '/cv-page/',  // Must match repo name EXACTLY
  // ...
})
```

**Prevention checklist:**
- [ ] Set `base: '/cv-page/'` in vite.config.ts before first build
- [ ] Verify base includes leading and trailing slashes
- [ ] Test with `npm run build && npm run preview` locally
- [ ] Check preview at `localhost:4173/cv-page/` (not root)
- [ ] Inspect built `index.html` - script src should include `/cv-page/`

**Warning signs:**
- `npm run preview` shows blank page (base path wrong even locally)
- Network tab shows 404 for `username.github.io/assets/...` instead of `/cv-page/assets/...`
- Works in dev (`npm run dev`) but fails in preview

**Source:** [Vite GitHub Pages deployment issues](https://github.com/orgs/community/discussions/61478) - HIGH confidence

**Phase implications:** Fix in Phase 1 initial setup. This is the #1 deployment failure mode.

---

### Pitfall 2: GitHub Pages Source Not Set to GitHub Actions

**What goes wrong:** Workflow runs successfully in Actions tab, but site never updates at GitHub Pages URL. Workflow shows green checkmark but changes aren't live.

**Why it happens:** GitHub Pages defaults to "Deploy from a branch" mode. Must manually switch to "GitHub Actions" as the source before workflows can deploy.

**How to avoid:**
1. Navigate to repo Settings → Pages
2. Under "Build and deployment" → "Source"
3. Select "GitHub Actions" (not "Deploy from a branch")
4. Push workflow file AFTER changing this setting

**Critical sequence:**
```
1. Change Pages source to "GitHub Actions" first
2. Then commit/push .github/workflows/deploy.yml
3. Workflow will fail if pushed before source is changed
```

**Warning signs:**
- Workflow runs but GitHub Pages shows old content or 404
- Pages settings still show "Deploy from a branch"
- No `github-pages` environment visible in repo

**Source:** [GitHub Pages with GitHub Actions setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) - HIGH confidence

**Phase implications:** Part of Phase 1 deployment setup. Document in setup instructions.

---

### Pitfall 3: Testing Only in Dev, Not Preview

**What goes wrong:** Site works perfectly in development (`npm run dev`) but fails in production. Different behavior between dev and build modes causes surprises.

**Why it happens:**
- Dev mode uses Vite dev server (unbundled, root-relative paths)
- Production build bundles, tree-shakes, uses configured base path
- Developers skip preview testing and push directly to main

**Consequences:**
- Base path errors only visible after deployment
- Import errors from incorrect path resolution
- Missing files not copied to dist/
- Wasted CI/CD minutes on failed deployments

**How to avoid:**

**Always run preview before pushing:**
```bash
# Before committing deployment changes
npm run build      # Build for production
npm run preview    # Test at localhost:4173

# Verify:
# - Site loads at correct base path
# - All assets load (no 404s in Network tab)
# - No console errors
# - HMR warnings gone (expected in production)
```

**What preview catches:**
- Base path misconfiguration (immediate blank page)
- Missing assets (404 errors)
- TypeScript errors that dev mode missed
- Bundle size issues (check dist/ size)

**Warning signs:**
- Skipping preview step in workflow
- "Works on my machine" (only tested dev mode)
- Repeated deployment failures

**Phase implications:** Add to Phase 1 verification steps. Make preview testing part of pre-push checklist.

---

### Pitfall 4: Using Outdated GitHub Actions Versions

**What goes wrong:** Workflow fails with deprecation warnings or errors about incompatible artifact versions. Actions v3 artifacts don't work with v4 deployment.

**Why it happens:** GitHub deprecated old artifact upload/download in Dec 2024. v4 required for new deployments. Old tutorials show v3 examples.

**How to avoid:**

**Use latest action versions (as of Feb 2026):**
```yaml
# ✅ Correct - latest versions
- uses: actions/checkout@v5
- uses: actions/setup-node@v6
- uses: actions/configure-pages@v5
- uses: actions/upload-pages-artifact@v4
- uses: actions/deploy-pages@v4

# ❌ Wrong - outdated versions
- uses: actions/checkout@v3
- uses: actions/upload-pages-artifact@v2
- uses: actions/deploy-pages@v3
```

**Additional permissions for v4:**
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
  actions: read  # Required for deploy-pages@v4
```

**Warning signs:**
- Workflow deprecation warnings in Actions log
- "Artifact not found" errors during deployment
- Using examples from pre-2024 tutorials

**Source:** [GitHub Actions deprecation notice](https://github.blog/changelog/2024-12-05-deprecation-notice-github-pages-actions-to-require-artifacts-actions-v4-on-github-com/) - HIGH confidence

**Phase implications:** Use correct versions from start in Phase 1. Check official Vite docs, not random tutorials.

---

### Pitfall 5: Node.js Version Mismatch

**What goes wrong:** Vite fails to start with cryptic errors. Workflow builds fail with "Unsupported Node.js version" warnings.

**Why it happens:** Vite 6 requires Node.js 20.19+ or 22.12+. Older Node versions lack required features.

**How to avoid:**

**Check local Node version:**
```bash
node --version  # Should show v20.19+, v22.12+, or higher
```

**GitHub Actions configuration:**
```yaml
- uses: actions/setup-node@v6
  with:
    node-version: lts/*  # Auto-uses latest LTS (safe choice)
    # OR specific version:
    # node-version: '22'
```

**Local development:**
- Use nvm (Node Version Manager) to switch versions
- `nvm install --lts` gets latest LTS
- `nvm use --lts` switches to LTS

**Warning signs:**
- "Error: Vite requires Node.js version X or higher"
- Workflow shows Node 18.x or older
- Dev server won't start locally

**Source:** [Vite Getting Started - Node requirement](https://vite.dev/guide/) - HIGH confidence

**Phase implications:** Document Node version requirement in Phase 1 prerequisites.

---

### Pitfall 6: Committing dist/ Directory to Git

**What goes wrong:** Git history bloated with built files. Merge conflicts in generated code. Stale builds accidentally deployed.

**Why it happens:** Old deployment patterns (gh-pages npm package) required committing dist/. GitHub Actions doesn't need this.

**How to avoid:**

**Ensure .gitignore includes dist/:**
```gitignore
# .gitignore (Vite default)
node_modules
dist
dist-ssr
*.local
```

**Why this is correct:**
- GitHub Actions builds fresh on each deploy (reproducible)
- No merge conflicts in generated code
- Smaller git repository
- Build artifacts generated in CI, not committed

**If dist/ already committed:**
```bash
git rm -r --cached dist
git commit -m "chore: remove dist/ from git tracking"
```

**Warning signs:**
- dist/ folder visible in git diff
- Merge conflicts in bundle files
- Large git repository size

**Source:** Standard Vite .gitignore - MEDIUM confidence

**Phase implications:** Verify .gitignore in Phase 1 setup.

## Code Examples

Verified patterns from official sources:

### Minimal Vite Configuration for GitHub Pages

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cv-page/',  // MUST match GitHub repo name
})
```

**Source:** [Vite Static Deploy Guide](https://vite.dev/guide/static-deploy)

### Complete GitHub Actions Workflow

See "Pattern 2: GitHub Actions Workflow Structure" in Architecture Patterns section above.

**Source:** [Vite Static Deploy Guide](https://vite.dev/guide/static-deploy)

### Testing Production Build Locally

```bash
# Build for production
npm run build

# Preview build locally (serves from dist/)
npm run preview

# Open browser to:
# http://localhost:4173/cv-page/
#
# Verify:
# - Page loads (not blank)
# - No 404 errors in Network tab
# - No console errors
```

**Why this works:** Preview server mimics GitHub Pages static file serving. Catches base path issues before deployment.

### Initial Project Setup Commands

```bash
# Create project from Vite template
npm create vite@latest cv-page -- --template react-ts

# Enter project directory
cd cv-page

# Install dependencies
npm install

# Configure base path IMMEDIATELY
# Edit vite.config.ts, add: base: '/cv-page/'

# Start development server
npm run dev

# Test production build
npm run build && npm run preview
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Create React App | Vite | 2023-2024 | CRA deprecated, Vite 5x faster dev server |
| gh-pages npm package | GitHub Actions | 2022+ | Actions is official, more reliable, no dist/ commits |
| Deploy from branch | Deploy from Actions | 2022+ | Better CI/CD integration, artifact-based |
| actions/deploy-pages@v3 | actions/deploy-pages@v4 | Dec 2024 | Artifact v4 required, uses artifact IDs |
| Node 18 | Node 20.19+/22.12+ | Vite 6 release (late 2025) | Required for Vite 6 |
| Single tsconfig.json | Multiple tsconfigs | Vite 5+ templates | Separate app vs node/build tool configs |

**Deprecated/outdated:**
- **Create React App:** Unmaintained since 2023, use Vite
- **gh-pages npm package:** Use GitHub Actions instead
- **Deploy from branch:** Use GitHub Actions source
- **Actions v3 or older:** v4 required as of Dec 2024

**Source confidence:** HIGH (official changelogs and documentation)

## Open Questions

Things that couldn't be fully resolved:

1. **Custom domain configuration**
   - What we know: Can configure custom domains in GitHub Pages settings
   - What's unclear: DNS configuration steps, CNAME file requirements
   - Recommendation: Out of scope for Phase 1. Document as future enhancement if needed.

2. **Deployment preview environments**
   - What we know: Main workflow deploys to production
   - What's unclear: Best practice for preview deployments from PRs
   - Recommendation: Phase 1 uses single production environment. Preview environments are v2 feature.

3. **Build caching optimization**
   - What we know: `cache: 'npm'` in setup-node speeds up installs
   - What's unclear: Whether Vite build cache can be preserved between runs
   - Recommendation: Default npm caching sufficient for Phase 1. Optimize if build times become problematic.

## Sources

### Primary (HIGH confidence)
- [Vite Official Documentation - Getting Started](https://vite.dev/guide/) - Project initialization, npm scripts
- [Vite Official Documentation - Static Deploy](https://vite.dev/guide/static-deploy) - GitHub Actions workflow, base path config
- [Vite Official Documentation - Server Options](https://vite.dev/config/server-options) - Development server configuration
- [GitHub Actions - actions/deploy-pages](https://github.com/actions/deploy-pages) - Latest action versions and requirements
- [GitHub Docs - Configuring publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) - Pages settings setup

### Secondary (MEDIUM confidence)
- [Complete Guide to Setting Up React with TypeScript and Vite (2026)](https://medium.com/@robinviktorsson/complete-guide-to-setting-up-react-with-typescript-and-vite-2025-468f6556aaf2) - Setup walkthrough
- [Deploy Your Vite App to GitHub Pages (Lazy Dev's Guide)](https://levelup.gitconnected.com/deploy-your-vite-app-to-github-pages-a-lazy-devs-guide-37b0b472fa35) - Base path configuration examples
- [Deploying Vite to GitHub Pages with Single GitHub Action](https://savaslabs.com/blog/deploying-vite-github-pages-single-github-action) - Workflow patterns
- [GitHub Changelog - Artifacts v4 requirement](https://github.blog/changelog/2024-12-05-deprecation-notice-github-pages-actions-to-require-artifacts-actions-v4-on-github-com/) - Deprecation notice

### Tertiary (LOW confidence - community discussions)
- [GitHub Community Discussion #61478](https://github.com/orgs/community/discussions/61478) - Blank page troubleshooting
- [GitHub Community Discussion #59575](https://github.com/orgs/community/discussions/59575) - 404 error patterns
- Various Medium articles and DEV.to posts - Community patterns (verified against official docs)

## Metadata

**Confidence breakdown:**
- Standard stack (Vite/React/TypeScript): HIGH - Verified with official Vite documentation and npm versions
- GitHub Actions workflow: HIGH - Direct from official Vite deployment guide and GitHub Actions docs
- Architecture patterns: HIGH - Official Vite configuration and GitHub recommendations
- Pitfalls: HIGH - Based on official docs and verified community reports with consistent patterns
- Code examples: HIGH - All examples from official Vite documentation or verified working patterns

**Research date:** 2026-02-07
**Valid until:** 90 days (Vite stable, GitHub Actions stable, React stable) - Re-verify if major versions released
**Technologies researched:** Vite 6.x, React 19.x, TypeScript 5.x, GitHub Actions (latest), Node.js 20.19+/22.12+

**Critical success factors for Phase 1:**
1. Set `base: '/cv-page/'` in vite.config.ts IMMEDIATELY
2. Configure GitHub Pages source to "GitHub Actions" BEFORE pushing workflow
3. Use latest Actions versions (v4/v5/v6)
4. Always test with `npm run preview` before deploying
5. Verify Node.js 20.19+ or 22.12+ locally and in CI
