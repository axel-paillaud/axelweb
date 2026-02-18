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
- **SCSS compiler:** Dart Sass (via gulp-sass v5)
- **Build tool:** Gulp (SCSS compilation, autoprefixer, minification, sourcemaps)

### Build Commands

```bash
# From user/themes/axelweb/
npm install        # Install dependencies
npm run dev        # Gulp watch (development)
npm run build      # Gulp build (production)
```

**Note:** Do NOT run `npm run build` automatically after SCSS/JS changes — the developer runs `gulp watch` during development and builds manually.

### Deployment

Git is installed on both local and production server. Workflow:

```
local → git push → production server
```

No CI/CD pipeline. Direct push deployment.

### Git Scope

Only the `user/` directory is versioned. The `.gitignore` excludes accounts, data, languages, other themes, `config/security.yaml`, and `node_modules/`. Only the `axelweb` theme is tracked. The `css-compiled/` directory IS versioned (needed for prod deployment).

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
- Modular page sections go in `templates/modular/` — template name must match the `.md` filename in the `_module/` subfolder
- Reusable component partials go in `templates/partials/components/`
- Modular templates read data from `page.header.*` (YAML frontmatter)
- Homepage is a modular page (`pages/01.home/modular.md` with `content.items: '@self.modular'`)
- Module subfolders are prefixed with `_` (e.g. `_faq/`)
- Non-hero modules are wrapped in `.modular-sections` (flex column, gap 85px) in `modular.html.twig`
- Section spacing is managed via `gap` on `.modular-sections` in `_onepage.scss` — do not add vertical margins on sections
- Theme configuration: `axelweb.yaml`
- Theme logic: `axelweb.php` (extends Grav Theme class, hooks into Grav events)
- Blueprints define admin panel forms: `blueprints.yaml` and `blueprints/*.yaml`

### SCSS Structure

- Source: `user/themes/axelweb/scss/`
- Spectre framework source: `scss/spectre/`
- Custom theme styles: `scss/theme/`
- Components: `scss/theme/components/` (buttons, tag, collapse, chevron, faq, section-faq, process-card, section-process, section-hero, section-about, service-item, section-services, section-logo-band)
- Compiled output: `css-compiled/`
- Always compile via Gulp, never edit `css-compiled/` directly
- Import order in `theme.scss`: `theme/variables` → `spectre/variables` → `spectre/mixins` → `theme/fonts` → rest of theme → `theme/components/*`
- Theme variables MUST be declared in `_variables.scss` (loaded before Spectre) to override `!default` values

### Spectre Overrides

Spectre defaults are often incompatible with the design. Key overrides in `_variables.scss`:
- `$html-font-size: 16px` (Spectre default is 20px — caused all rem-based sizes to be wrong)
- `$font-size: 1.125rem` (body text at 18px, Spectre default .8rem was too small with 16px base)
- `$size-xl: 1440px` (grid container matches mockup width)
- `$content-max-width: 1250px` (max-width for section inner content)
- `$body-bg: $color-bg-base` (page background `#f9f9f6` — Spectre default was white)

### Component Library

Reusable UI components in `scss/theme/components/`:

| Component | SCSS | Twig | JS | Description |
|-----------|------|------|----|-------------|
| Buttons | `_buttons.scss` | — | — | Primary (CTA orange) + Secondary (ghost/link with Line Awesome arrow) |
| Tag | `_tag.scss` | — | — | Taxonomy label (blog tags, service cards). CSS square icon, uppercase |
| Collapse | `_collapse.scss` | — | `js/collapse.js` | Toggle +/- button. CSS-drawn icon (no font dependency) |
| Chevron | `_chevron.scss` | — | — | Left/right nav arrows for sliders. Line Awesome icons |
| FAQ Item | `_faq.scss` | `partials/components/faq-item.html.twig` | — | Single Q&A block with collapse toggle |
| Section FAQ | `_section-faq.scss` | `modular/section-faq.html.twig` | — | Full-width 2-column layout (heading left, FAQ items right) |
| Process Card | `_process-card.scss` | `partials/components/process-card.html.twig` | — | Step card with tag, title, description. White bg, border, 20px radius |
| Section Process | `_section-process.scss` | `modular/section-process.html.twig` | `js/carousel.js` | "Comment je travaille" carousel. 3 visible cards, chevron nav, peek effect |
| Article Card | `_article-card.scss` | `partials/components/article-card.html.twig` | — | Blog article card. Two-column (image left, content right). White bg, border, 20px radius |
| Section Articles | `_section-articles.scss` | `modular/section-articles.html.twig` | `js/carousel.js` | "Derniers articles" carousel. 1 card per slide, dynamic collection from /blog |
| Section Hero | `_section-hero.scss` | `modular/hero.html.twig` | — | Two-column hero: H1 left, description + CTA buttons right. Rendered in `{% block hero %}` (before other sections) |
| Section About | `_section-about.scss` | `modular/section-about.html.twig` | — | Two-column: photo left (border-radius 20px), content right (heading, 2 paragraphs side by side, badge image, primary CTA). Images from page media |
| Service Item | `_service-item.scss` | `partials/components/service-item.html.twig` | `js/services.js` | Accordion item: 3 fixed-width columns (icon+title, subtitle+description, btn-secondary). Colors via SCSS variables per item. `h2.h3` for SEO h2 with h3 visual size |
| Section Services | `_section-services.scss` | `modular/section-services.html.twig` | `js/services.js` | Stacked "tab divider" effect: 3 items with negative margin overlap, z-index stacking. Hover opens on desktop, touch tap on mobile. JS-driven max-height animation via scrollHeight |
| Section Logo Band | `_section-logo-band.scss` | `modular/section-logo-band.html.twig` | — | CSS marquee (3x content duplication, translateX -33.33%). Full-width, logos grayscale+opacity → color on hover. Links with `target="_blank" rel="noopener noreferrer nofollow"`. Pause on hover |
| Header | `_header.scss` | `partials/header.html.twig` | — | Logo text "Axelweb" + nav in rounded bordered container. Dynamic nav via `pages.children.visible`. Contact CTA detected via URL. Border separator below |
| Section Contact | `_section-contact.scss` | `modular/section-contact.html.twig` | — | Contact form in footer (homepage only). Rendered via `{% embed %}` in `modular.html.twig` into `{% block footer_cta %}`. Uses Grav form plugin with honeypot. Surtitle (Space Grotesk 500) + large title (Jakarta 700, uppercase). Excluded from `.modular-sections` flow |
| Footer | `_footer.scss` | `partials/footer.html.twig` | — | 3 columns (Ressources, Légal, Réseaux) + copyright signature. Full-width bg #e5e6e2, border-top-radius 40px. Hardcoded links. `{% block footer_cta %}` used by Section Contact via `{% embed %}` in `modular.html.twig` |
| Projet Card | — | `projets.html.twig` (inline) | — | Project card in listing grid. Thumbnail, tags, title, client, excerpt. `data-category` attribute for future JS filtering |
| Projet Detail | — | `projet.html.twig` | — | Single project page. Header (tags, h1, client), hero image, content body, external link CTA, back button |

### Icon Strategy

- **Line Awesome** (v4.7, font-family `FontAwesome`) for standard icons (arrows, chevrons)
- **CSS-drawn shapes** for simple geometric icons (collapse +/-, tag square) — avoids font dependency, pixel-perfect centering
- Line Awesome v4.7 is missing some newer icons (e.g. `la-square-full`). Do NOT update the lib for single icons — use CSS alternatives instead

### French Typography

- Custom Twig filter `|french_typo` (registered in `axelweb.php`) replaces spaces before `:`, `;`, `?`, `!` with `&nbsp;`
- Declared with `is_safe: ['html']` — no need for `|raw` after it
- Use `{{ text|french_typo }}` in any template for French non-breaking space rules

### Design Tokens

#### Color Palette (Gruvbox-inspired warm)

| Variable | Value | Usage |
|----------|-------|-------|
| `$color-dark` | `#282120` | Text, dark blocks |
| `$color-dark-light` | `#584c4c` | Buttons on dark bg |
| `$color-accent-1` | `#fe6038` | CTA orange (buttons only: `.btn-primary`, `.site-nav-cta`, `@mixin button-primary`) |
| `$color-accent-2` | `#75999b` | Primary accent (blue-green) → `$primary-color`. Links, focus states, form controls, checkboxes |
| `$color-accent-2-light` | `#d9edee` | Light blue variant |
| `$color-bg-white` | `#ffffff` | Block background |
| `$color-bg-base` | `#f9f9f6` | Page background |
| `$color-bg-light` | `#f8f8f1` | Light text bg |
| `$color-bg-grey` | `#e5e6e2` | Grey background |
| `$color-bg-accent` | `#ebecdb` | Accent block bg |
| `$color-success` | `#98971a` | Gruvbox green |
| `$color-warning` | `#d79921` | Gruvbox amber |
| `$color-error` | `#cc241d` | Gruvbox red |

#### Typography

| Element | Font | Weight | Size | Line-height | Extra |
|---------|------|--------|------|-------------|-------|
| H1 | Space Grotesk | 500 | 3.75rem | 1.033 | letter-spacing: -.03em |
| H2 | Space Grotesk | 500 | 2.625rem | 0.929 | letter-spacing: -.03em |
| H3 | Space Grotesk | 500 | 1.625rem | 1.077 | letter-spacing: -.03em |
| H4 | Space Grotesk | 400 | 1rem | 1.125 | letter-spacing: -.03em, uppercase |
| Body | Plus Jakarta Sans | 400 | 1.125rem | 1.167 | |
| Caption | Plus Jakarta Sans | 400 | 1rem | 1.188 | |
| Buttons | Space Grotesk | 400 | 1rem | — | letter-spacing: .07em, uppercase |

Font files are self-hosted as `.woff2` in `themes/axelweb/fonts/`. Declared in `scss/theme/_fonts.scss`, family variables in `scss/theme/_variables.scss`.

### Coding Standards

- PHP: Follow PSR-12
- Twig: Use Grav's Twig conventions, leverage `autoescape: true` (configured in system.yaml)
- SCSS: Use variables and mixins from Spectre where possible before writing custom styles
- JS: Vanilla only, no jQuery, arrow functions + `const`/`let`. All legacy jQuery from Quark has been removed
- JS files loaded via `assets.addJs()` in `base.html.twig` with `group: 'bottom'` + `defer`
- All content and UI text in French
- Code comments in English

### Projects (Portfolio)

- **Architecture:** Child pages pattern (same as blog). Listing page `projets.md` collects `@self.children`, each child is a `projet.md`
- **Listing page:** `pages/03.projets/projets.md` — template `projets.html.twig`, collection with pagination (12 per page), ordered by date desc
- **Project pages:** `pages/03.projets/<slug>/projet.md` — template `projet.html.twig`
- **Admin blueprints:** `blueprints/projets.yaml` (listing config: items, limit, order, pagination) + `blueprints/projet.yaml` (project fields: client, excerpt, url_projet, taxonomy)
- **child_type:** `projet` — new project pages created via Admin default to `projet` template
- **Frontmatter fields:** `title`, `client`, `excerpt` (short description for card), `url_projet` (external link), `taxonomy.category` (for tags + future JS filtering), `date`
- **Images:** via Grav page media (drop images in the project's folder). Listing uses `cropResize(600, 400)`, detail uses `cropResize(1200, 700)`
- **Grid:** `.projets-grid` in listing template, cards have `data-category` attribute for future client-side filtering
- **Styling:** Not yet styled (waiting on wireframes from designer). Templates use `.default-content` wrapper, `.tag` component for categories

### Forms

- Use Grav's built-in `form` plugin for all forms
- Contact form is the primary lead capture mechanism
- Form styling uses Spectre.css classes (configured in `axelweb.php`) with custom overrides in `_forms.scss`
- Form field styles (inputs, select, textarea, checkbox, columns) are global in `_forms.scss` — shared across all frontend forms
- Labels hidden with `.sr-only` (in `_forms.scss`), placeholders used instead. Optional fields marked "(optionnel)" in placeholder
- `form.html.twig` theme override wraps content in `.default-content` (max-width 1250px)
- Contact form defined in `pages/01.home/07._contact/section-contact.md`, reused on `/contact` page
- Email config: `user/config/plugins/email.yaml` (SMTP, from/to addresses)
- Post-submission redirect to `/merci` page

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
        ├── js/            ← JavaScript files (collapse.js, carousel.js)
        ├── fonts/         ← Icon fonts
        ├── images/        ← Theme images (logo, favicon)
        ├── templates/     ← Twig templates
        └── blueprints/    ← Page type blueprints
```

## Current Status

### Done
- Component library: buttons (primary + secondary), tag, collapse, chevron, FAQ item, section FAQ
- Homepage converted to modular page
- Section FAQ modular template working with frontmatter data
- Spectre overrides: `$html-font-size`, `$font-size`, `$size-xl`
- Grid container set to `grid-xl` (1440px)
- Zed editor config (`.zed/settings.json`) for 4-space Twig indentation
- `default.html.twig` contains component examples for visual testing
- Section "Comment je travaille" (process carousel with cards, tags, chevrons, JS carousel)
- Section "Derniers articles" (article carousel, dynamic blog collection, 1 card per slide)
- `$content-max-width` variable for consistent section inner widths
- `$body-bg` override for page background (#f9f9f6)
- `.modular-sections` wrapper with gap for section spacing
- `carousel.js` supports `data-visible-count` attribute for configurable visible cards
- `|french_typo` custom Twig filter for non-breaking spaces
- Blog structure with category folders and taxonomy tags
- Section Hero (two-column, H1 left, description + CTAs right, own padding independent of modular-sections gap)
- Cleaned up Quark legacy hero styles from `_framework.scss` and `_onepage.scss`, removed `partials/hero.html.twig`
- Section About (two-column: photo + content with heading, dual paragraphs, badge, CTA). Frontmatter-driven content, images via page media
- Section Services (3 accordion items with "tab divider" overlap effect). Fixed-width columns for alignment, SCSS variables for per-item colors, `h2.h3` pattern for SEO/visual decoupling, JS scrollHeight animation, hover (desktop) + pointerup touch (mobile)
- Section Logo Band (CSS marquee, 3x duplication for seamless loop up to 2K+, full-width, grayscale→color hover, linked logos with nofollow)
- `.section-wide` utility class in `_framework.scss` (padding 0 5%) for wider-than-default sections
- Header navigation: logo text "Axelweb" + nav with rounded bordered container. Dynamic Grav nav (`pages.children.visible`), Contact as CTA (detected via URL `/contact`). Modular `header_navigation` override removed. Requires pages to exist in `user/pages/` for nav items to appear
- Footer: 3 columns (Ressources, Légal, Réseaux) + copyright signature. Full-width bg, border-top-radius 40px, hardcoded links. `{% block footer_cta %}` ready for future homepage contact form
- `default.html.twig` cleaned up (removed component demo examples)
- `blog.html.twig` cleaned up (removed reference to deleted Quark `partials/hero.html.twig`)
- Section Contact form in footer (homepage only). Module `07._contact/section-contact.md` with Grav form plugin. Rendered via `{% embed %}` of footer partial in `modular.html.twig`. Fields: firstname, lastname, company, email, phone, select (request type), textarea, checkbox RGPD, honeypot. Excluded from `.modular-sections`, injected into `{% block footer_cta %}`
- Page `/contact` (`pages/06.contact/form.md`) with same form fields. Theme override `form.html.twig` with `.default-content` max-width wrapper
- Page `/merci` (`pages/merci/default.md`) — post-submission confirmation page, `visible: false`
- `$primary-color` changed from `$color-accent-1` (orange) to `$color-accent-2` (blue-green). Orange preserved on `.btn-primary`, `.site-nav-cta`, `@mixin button-primary`
- Global form styles in `_forms.scss`: field sizing, border-radius, colors, columns layout, sr-only labels, checkbox customization
- `.sr-only` utility class in `_framework.scss`
- `.default-content` layout class in `_framework.scss` (max-width 1250px)
- Email plugin configured: `user/config/plugins/email.yaml` (SMTP localhost:1025 for DDEV/Mailpit)
- Projects (portfolio) structure: listing page `projets.md` with child pages pattern, `projet.md` template for individual projects, admin blueprints for both, `data-category` attributes for future JS filtering. Two example projects created. Styling pending (waiting on wireframes)

### Next Steps — Homepage Sections
- Mobile menu redesign
- Animations pass (collapse transitions, hover states, etc.)

### Pending — Design System
- Waiting on graphic designer for component specs (states, spacings, variants)
- Missing: hover/focus states on most components, card designs, form field styles

### Cleanup (Low Priority)
- `system.yaml` still references `theme: quark` — intentional until dev setup is ready
- Demo pages (typography) need to be replaced with actual content
- Quark branding: `assets/quark-screenshots.jpg`, `screenshot.jpg`, `thumbnail.jpg` to replace
- `README.md` / `CHANGELOG.md` in theme are Quark originals — to rewrite or remove
- `css/custom.css` is empty — decide if keeping as override layer or removing
- Notices override markdown-notices plugin colors in `_typography.scss` with Gruvbox palette
- Admin back-office: clean up unused theme config options (keep only `grid-size` and `production-mode`)
