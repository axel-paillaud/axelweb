# CLAUDE.md — axelweb.fr

## Project Overview

Freelance portfolio/lead-generation website for **Axel Paillaud**, PHP back-end developer specializing in **PrestaShop** (and transitioning to **Sylius**). The site is a showcase (site vitrine) designed to present services, build credibility, and capture inbound leads from e-commerce merchants.

- **Domain:** axelweb.fr
- **CMS:** Grav v1.7.49.5
- **PHP:** 8.1
- **Language:** French only (FR)
- **Hosting:** Shared hosting (high quality)

## Architecture & Tech Stack

### Theme

- **Name:** `axelweb` — standalone copy of Quark 2.1.2 (NOT a child theme)
- **Location:** `user/themes/axelweb/`
- **CSS framework:** Spectre.css (lightweight, ~10KB gzipped)
- **Preprocessor:** SCSS
- **JavaScript:** Vanilla JS only (no frameworks)
- **Icons:** Line Awesome
- **Build tool:** Gulp (SCSS compilation, autoprefixer, minification, sourcemaps)

### Build Commands

```bash
# From user/themes/axelweb/
npm install        # Install dependencies
npm run dev        # Gulp watch (development)
npm run build      # Gulp build (production)
```

### Deployment

Git is installed on both local and production server. Workflow:

```
local → git push → production server
```

No CI/CD pipeline. Direct push deployment.

### Git Scope

Only the `user/` directory is versioned. The `.gitignore` excludes accounts, data, languages, other themes, and `config/security.yaml`. Only the `axelweb` theme is tracked.

## Site Structure & SEO Architecture

The SEO strategy is managed by an external SEO consultant. The information architecture follows a hub/spoke (pillar/cluster) model.

### Page Hierarchy

```
/                                          → Home (full custom landing page)
/services/                                 → Hub: e-commerce development services
├── /services/prestashop/                  → Pillar: PrestaShop developer
│   ├── /services/prestashop/modules-sur-mesure/
│   ├── /services/prestashop/theme-sur-mesure/
│   ├── /services/prestashop/maintenance/
│   ├── /services/prestashop/optimisation-performance/
│   ├── /services/prestashop/migration/
│   └── /services/prestashop/audit/
├── /services/sylius/                      → Pillar: Sylius developer (future-proof)
│   ├── /services/sylius/creation-projet/
│   ├── /services/sylius/migration-prestashop-vers-sylius/
│   ├── /services/sylius/plugins-bundles-sur-mesure/
│   ├── /services/sylius/performance-scalabilite/
│   └── /services/sylius/integrations-erp-pim-paiement/
/projets/                                  → Portfolio / case studies
/blog/                                     → Blog hub
├── /blog/prestashop/
├── /blog/sylius/
├── /blog/performance-ecommerce/
├── /blog/seo-ecommerce/                   (optional)
└── /blog/tutos-tech/
/a-propos/                                 → About (bio, stack, service areas)
/contact/                                  → Contact form (lead capture CTA)
/faq/                                      → FAQ (conversion + SEO)
/developpeur-prestashop-orleans/           → Local SEO page
/developpeur-prestashop-paris/             → Local SEO page
/developpeur-ecommerce-orleans/            → Local SEO page
/mentions-legales/                         → Legal notices
/politique-de-confidentialite/             → Privacy policy
/cookies/                                  → Cookie policy
```

### Navigation

**Header menu:**
1. Accueil → /
2. Services (dropdown with PrestaShop + Sylius sub-items)
3. Projets → /projets/
4. Blog → /blog/
5. À propos → /a-propos/
6. Contact (CTA button) → /contact/

**Footer menu:**
- Mentions légales, Politique de confidentialité, Cookies, FAQ

## Roles & Responsibilities

| Role | Owner | Scope |
|------|-------|-------|
| SEO strategy & content direction | External SEO consultant | Site architecture, keyword strategy, content briefs |
| UI/UX design & mockups | External graphic designer | Wireframes, visual design, brand identity |
| Front-end integration | Axel | HTML/Twig templates, SCSS, vanilla JS |
| Back-end / CMS | Axel | Grav configuration, theme PHP, plugins |
| Deployment & hosting | Axel | Server setup, git deployment |

## Development Guidelines

### Grav Conventions

- Pages live in `user/pages/` as Markdown files with YAML frontmatter
- Templates live in `user/themes/axelweb/templates/`
- Template naming must match the page type (e.g., `blog.html.twig` for a page with `template: blog`)
- Partials go in `templates/partials/`
- Modular page sections go in `templates/modular/`
- Theme configuration: `axelweb.yaml`
- Theme logic: `axelweb.php` (extends Grav Theme class, hooks into Grav events)
- Blueprints define admin panel forms: `blueprints.yaml` and `blueprints/*.yaml`

### SCSS Structure

- Source: `user/themes/axelweb/scss/`
- Spectre framework source: `scss/spectre/`
- Custom theme styles: `scss/theme/`
- Compiled output: `css-compiled/`
- Always compile via Gulp, never edit `css-compiled/` directly

### Coding Standards

- PHP: Follow PSR-12
- Twig: Use Grav's Twig conventions, leverage `autoescape: true` (configured in system.yaml)
- SCSS: Use variables and mixins from Spectre where possible before writing custom styles
- JS: Vanilla only, no jQuery. All legacy jQuery from Quark has been removed
- All content and UI text in French
- Code comments in English

### Forms

- Use Grav's built-in `form` plugin for all forms
- Contact form is the primary lead capture mechanism
- Form styling uses Spectre.css classes (configured in `axelweb.php`)

### Performance

- Production mode enabled (`production-mode: true` in theme config)
- CSS/JS minification enabled in system config
- No heavy JS frameworks
- Optimize images before committing
- Spectre experimental (`spectre-exp`) and icons (`spectre-icons`) CSS are disabled by default — only enable if needed

## File Structure Reference

```
user/
├── CLAUDE.md              ← This file
├── config/
│   ├── site.yaml          ← Site metadata (title, author, description)
│   ├── system.yaml        ← Core Grav settings (theme, cache, twig, assets)
│   └── ...
├── pages/                 ← Content (Markdown + YAML frontmatter)
├── plugins/               ← Grav plugins (admin, form, email, login, etc.)
└── themes/
    └── axelweb/
        ├── axelweb.php    ← Theme PHP class
        ├── axelweb.yaml   ← Theme defaults
        ├── blueprints.yaml← Admin panel form definition
        ├── gulpfile.js    ← Build pipeline
        ├── package.json   ← npm dependencies
        ├── scss/          ← SCSS source
        ├── css-compiled/  ← Build output (do not edit)
        ├── css/           ← Additional CSS (Line Awesome, custom)
        ├── js/            ← JavaScript files
        ├── fonts/         ← Icon fonts
        ├── images/        ← Theme images (logo, favicon)
        ├── templates/     ← Twig templates
        └── blueprints/    ← Page type blueprints
```

## Known Issues / TODOs

- `system.yaml` still references `theme: quark` — intentional until dev setup is ready
- Demo pages (home, typography) need to be replaced with actual content
- `js/` directory is empty — vanilla JS will be added as needed during integration
