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
2. Services → /services/prestashop/ (via `menu_url` override on `/services/` page)
3. Projets → /projets/
4. Blog → /blog/
5. FAQ → /faq/
6. Contact (CTA button) → /contact/

**Footer menu:**
- Ressources: À propos, FAQ
- Légal: Mentions légales, Politique de confidentialité, Cookies

**Nav notes:**
- "À propos" page has `visible: false` — removed from header nav, linked manually in footer
- `/services/` page uses custom `menu_url: /services/prestashop` frontmatter to redirect nav link
- Header template supports `menu_url` override: `{% set link_url = p.header.menu_url ?: p.url %}`

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
- Components: `scss/theme/components/` (buttons, tag, collapse, chevron, faq, faq-page, section-faq, process-card, section-process, section-hero, section-about, service-card, section-services, section-logo-band, offering-card, section-offerings, breadcrumb, service-detail, separator, blog-card, blog-detail, article-card, section-articles, section-contact, content-layout, mobile-nav, projet-card, projet-detail, pagination)
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
| Buttons | `_buttons.scss` | — | — | Primary (CTA orange) + Secondary (ghost/link with Line Awesome arrow). `.btn-no-arrow` modifier hides the auto `::after` arrow on secondary buttons |
| Tag | `_tag.scss` | — | — | Taxonomy label (blog tags, service cards). CSS square icon, uppercase |
| Collapse | `_collapse.scss` | — | `js/collapse.js` | Toggle +/- button. CSS-drawn icon (no font dependency) |
| Chevron | `_chevron.scss` | — | — | Left/right nav arrows for sliders. Line Awesome icons |
| FAQ Item | `_faq.scss` | `partials/components/faq-item.html.twig` | — | Single Q&A block with collapse toggle |
| Section FAQ | `_section-faq.scss` | `modular/section-faq.html.twig` | — | Full-width 2-column layout (heading left, FAQ items right) |
| Process Card | `_process-card.scss` | `partials/components/process-card.html.twig` | — | Step card with tag, title, description. White bg, border, 20px radius |
| Section Process | `_section-process.scss` | `modular/section-process.html.twig` | `js/carousel.js` | "Comment je travaille" carousel. 3 visible cards, chevron nav, peek effect |
| Article Card | `_article-card.scss` | `partials/components/article-card.html.twig` | — | Blog article card. Two-column (image left, content right). White bg, border, 20px radius |
| Section Articles | `_section-articles.scss` | `modular/section-articles.html.twig` | `js/carousel.js` | "Derniers articles" carousel. 1 card per slide, dynamic collection from /blog |
| Section Hero | `_section-hero.scss` | `modular/hero.html.twig` | — | Two-column hero: H1 left, description + CTA buttons right. Rendered in `{% block hero %}` (before other sections). Background SVG logo (opacity 0.3, float animation, anchored to $size-xl center). Wrapped in `.section-hero-wrapper` with `overflow-x: clip` for independent axis control. Inner widened to $size-xl |
| Section About | `_section-about.scss` | `modular/section-about.html.twig` | — | Two-column: photo left (border-radius 20px), content right (heading, 2 paragraphs side by side, badge image, primary CTA). Images from page media |
| Service Card | `_service-card.scss` | `partials/components/service-card.html.twig` | `js/services.js` | Accordion item: 3 fixed-width columns (icon+title, subtitle+description, btn-secondary). Colors via SCSS variables per item. `h2.h3` for SEO h2 with h3 visual size |
| Section Services | `_section-services.scss` | `modular/section-services.html.twig` | `js/services.js` | Stacked "tab divider" effect: 3 items with negative margin overlap, z-index stacking. Hover opens on desktop, touch tap on mobile. JS-driven max-height animation via scrollHeight |
| Section Logo Band | `_section-logo-band.scss` | `modular/section-logo-band.html.twig` | — | CSS marquee (3x content duplication, translateX -33.33%). Full-width, logos grayscale+opacity → color on hover. Links with `target="_blank" rel="noopener noreferrer nofollow"`. Pause on hover. Responsive padding (40px → 24px → 12px) and logo size (30px at mobile) |
| Offering Card | `_offering-card.scss` | `partials/components/offering-card.html.twig` | — | Card with colored header (intercalaire style, border-radius 20px 20px 0 0), icon + title, excerpt, "En savoir plus" link. Color cycle: 1,4=$color-accent-2, 2,5=$color-dark, 3,6=$color-dark-light. Hover translateY(-4px). Border-bottom 2px $color-bg-accent |
| Section Offerings | `_section-offerings.scss` | `modular/section-offerings.html.twig` | — | CSS grid 3 columns (2 at $size-md, 1 at $size-sm), gap 24px. Heading + grid of offering cards. Max-width $content-max-width |
| Breadcrumb | `_breadcrumb.scss` | `partials/components/breadcrumb.html.twig` | — | Schema.org BreadcrumbList microdata. Uses Spectre `.breadcrumb` class on `<ol>`. Minimal override: margin-bottom 24px, `.is-active` color $primary-color |
| Service Detail | `_service-detail.scss` | `service.html.twig` | `js/toc.js` | Individual service page (prose content). Breadcrumb, content-layout with TOC sidebar, CTA to contact. Used by PrestaShop/Sylius child pages |
| Separator | `_separator.scss` | — | — | Reusable `border-bottom: 2px solid $color-bg-accent`, removed on `:last-child` |
| FAQ Page | `_faq-page.scss` | `faq.html.twig` | `js/collapse.js` | Standalone FAQ page with light background. Schema.org FAQPage JSON-LD. Accordion items, separator between items, CTA "Vous n'avez pas trouvé votre réponse ?" at bottom. Max-width 800px |
| Header | `_header.scss` | `partials/header.html.twig` | `js/header.js` | Sticky header (`position: sticky; top: 0; z-index: 100`). Logo "Axelweb" + desktop nav (`.site-nav.hide-sm`) + burger button (`.site-burger.show-sm`). Shrinks on scroll via `.is-scrolled` class (JS). Mobile: always shrunk (padding 12px, logo 1.5rem). Desktop nav in rounded bordered container, Contact CTA via URL detection |
| Section Contact | `_section-contact.scss` | `modular/section-contact.html.twig` | — | Contact form in footer (homepage only). Rendered via `{% embed %}` in `modular.html.twig` into `{% block footer_cta %}`. Uses Grav form plugin with honeypot. Surtitle (Space Grotesk 500) + large title (Jakarta 700, uppercase). Excluded from `.modular-sections` flow |
| Footer | `_footer.scss` | `partials/footer.html.twig` | — | 3 columns (Ressources, Légal, Réseaux) + copyright signature. Full-width bg #e5e6e2, border-top-radius 40px. Hardcoded links. `{% block footer_cta %}` used by Section Contact via `{% embed %}` in `modular.html.twig` |
| Projet Card | `_projet-card.scss` | `partials/components/projet-card.html.twig` | — | Two-column card (image left, content right). Flex layout with gap 20px. Tags (from `taxonomy.tag`), date, client logo/name, title, excerpt, btn-secondary link (url_projet priority, fallback url_github). Image link has `aria-hidden` + `tabindex="-1"`. `data-category` for future JS filtering |
| Projet Detail | `_projet-detail.scss` | `projet.html.twig` | — | Single project page using `.content-layout`. Header (tags, h1, client), hero image, `.prose` content, actions bar (btn-primary "Voir le site" + btn-secondary "Tous les projets" in flex space-between) |
| Content Layout | `_content-layout.scss` | — | `js/toc.js` | 3-column layout (toc sidebar + main content + empty). Reusable across blog/project. TOC auto-generated from h2/h3 headings with Intersection Observer active state. Sticky sidebar, white bg, border-radius 20px, border accent |
| Mobile Nav | `_mobile-nav.scss` | `partials/header.html.twig` | `js/header.js` | Mobile menu (visible via Spectre `.show-sm` <= 600px). Fixed panel, slides down from under header via `translateY`. Toggled by `.is-nav-open` on `body`. Sibling of header (not child) to allow independent z-index stacking |
| Blog Card | `_blog-card.scss` | `partials/components/blog-card.html.twig` | — | Vertical card for blog listing. Entire card is a single `<a>` link. Image top (aspect-ratio 16/9, cropZoom 600x340), content bottom (single tag, date, title, excerpt). `.blog-card--no-image` variant pushes body to bottom via `margin-top: auto`. Grid: 3 cols desktop, 2 tablet, 1 mobile. Hover: `translateY(-4px)` |
| Blog Detail | `_blog-detail.scss` | `item.html.twig` | `js/toc.js` | Single blog article page using `.content-layout`. Header (tags, h1, date), `.prose` content with `data-toc-content` for TOC. Actions bar: prev/next article navigation + "Tous les articles" link (all `btn-no-arrow`) |
| Pagination | `_pagination.scss` | — | — | Grav pagination plugin override. Centered, Space Grotesk font, `$color-dark-light` default, `$primary-color` active/hover, no border |

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
- **Listing page:** `pages/03.projets/projets.md` — template `projets.html.twig`, collection with pagination (12 per page), ordered by date desc. Title "Projets Axelweb" (SEO) with `menu: Projets` override for nav
- **Project pages:** `pages/03.projets/<slug>/projet.md` — template `projet.html.twig`
- **Admin blueprints:** `blueprints/projets.yaml` (listing config: items, limit, order, pagination) + `blueprints/projet.yaml` (project fields: client, client_logo, excerpt, url_projet, url_github, image, taxonomy)
- **child_type:** `projet` — new project pages created via Admin default to `projet` template
- **Frontmatter fields:** `title`, `client`, `client_logo`, `excerpt` (short description for card), `url_projet` (external link, priority), `url_github` (fallback if no url_projet), `image` (hero image via filepicker), `taxonomy.tag` (for card tags + future JS filtering), `date`
- **Images:** via Grav page media (drop images in the project's folder). Detail uses `cropResize(1200, 700)` with `|raw` for proper HTML rendering
- **Listing:** `.projets-list` flex column with 32px gap. Cards have `data-category` attribute for future client-side filtering
- **Card layout:** Two-column flex (image 45%, content flex-1). Content uses gap 20px: meta (tags+date) → client → body (title+excerpt, gap 8px) → btn-secondary link pushed to bottom via `margin-top: auto`
- **Detail layout:** Uses `.content-layout` (3-column: toc sidebar + main content). Header, hero image, `.prose` content body (70ch max), actions bar (space-between)
- **Accessibility:** Image link on cards has `aria-hidden="true"` + `tabindex="-1"` (decorative duplicate, title link carries meaning)
- **Pagination:** Grav pagination plugin (v1.4.6). Custom styles in `_pagination.scss`
- **TOC:** Auto-generated sticky table of contents from h2/h3 headings via `toc.js` (loaded only on project pages via `{% block javascripts %}`). Intersection Observer for active state highlighting

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
        ├── js/            ← JavaScript files (header.js, collapse.js, carousel.js, services.js, toc.js)
        ├── fonts/         ← Icon fonts
        ├── images/        ← Theme images (logo, favicon)
        ├── templates/     ← Twig templates
        └── blueprints/    ← Page type blueprints
```

## Current Status

### Done

#### Core Infrastructure
- Spectre overrides: `$html-font-size`, `$font-size`, `$size-xl`, `$body-bg`, `$primary-color`
- Grid container set to `grid-xl` (1440px), `$content-max-width: 1250px`
- `|french_typo` custom Twig filter for non-breaking spaces
- `.sr-only`, `.section-wide`, `.default-content` utility classes in `_framework.scss`
- `scroll-behavior: smooth` on `html`
- Zed editor config (`.zed/settings.json`) for 4-space Twig indentation

#### Component Library
- Buttons (primary CTA orange + secondary ghost/link with arrow, `.btn-no-arrow` modifier)
- Tag, Collapse (+/- toggle with max-height CSS animation), Chevron
- FAQ Item (Q&A block with collapse)
- Process Card, Article Card, Blog Card, Projet Card, Offering Card, Service Card
- Breadcrumb (schema.org BreadcrumbList microdata, Spectre `.breadcrumb` class)
- Separator (reusable border-bottom, hidden on `:last-child`)
- Content Layout (3-column flex: TOC sidebar + main + empty, responsive)
- `toc.js` (auto-generated sticky TOC from h2/h3, Intersection Observer active state)
- `carousel.js` (configurable via `data-visible-count`)
- `collapse.js` (max-height animation via scrollHeight, shared by FAQ sections and FAQ page)

#### Homepage (Modular)
- Modular page (`pages/01.home/modular.md`) with real content (all lorem ipsum replaced)
- Section Hero: two-column (H1 left, description + CTAs right), background SVG logo (opacity 0.3, float animation, anchored to $size-xl center), `.section-hero-wrapper` with `overflow-x: clip`, inner widened to $size-xl
- Section Services: 3 accordion items, "tab divider" overlap effect, JS scrollHeight animation
- Section Logo Band: CSS marquee, responsive padding/sizing
- Section Process: carousel with 3 visible cards
- Section Articles: carousel, dynamic blog collection
- Section About: two-column (photo + content), images via page media
- Section FAQ: 2-column layout (heading left, FAQ items right)
- Section Contact: form in footer via `{% embed %}`, Grav form plugin with honeypot

#### Services Pages
- `/services/` page redirects nav to `/services/prestashop/` via custom `menu_url` frontmatter
- `/services/prestashop/` modular hub page (`modular-service.html.twig`):
  - Hero section with PrestaShop-specific content
  - Offerings grid (3x2 cards linking to child pages, color-cycled headers)
  - Process section (contextualized PrestaShop steps)
  - FAQ section (PrestaShop-specific questions)
  - Contact section in footer
- 6 PrestaShop child pages: modules-sur-mesure, theme-sur-mesure, maintenance, optimisation-performance, migration, audit — each using `service.html.twig`
- Sylius child pages structure created (placeholder for future)
- Blueprints: `section-offerings.yaml`, `service.yaml`

#### Standalone Pages
- FAQ page (`/faq/`): standalone template with schema.org FAQPage JSON-LD, light background, accordion items with separators, CTA at bottom. Blueprint `faq.yaml`
- About page (`/a-propos/`): real biographical content, `visible: false` (footer only)
- Contact page (`/contact/`): form with `.default-content` wrapper
- Merci page (`/merci/`): post-submission confirmation, `visible: false`

#### Blog
- Listing: `@self.descendants` collection, grid of blog-cards (3/2/1 cols), tag filter (server-side via taxonomy URL params)
- Detail: `.content-layout` + TOC + `.prose`, prev/next navigation
- Blog card: single `<a>` wrapping, `.blog-card--no-image` variant, hover translateY

#### Projects (Portfolio)
- Listing: child pages pattern, `.projets-list` flex column, two-column cards, tag filter, pagination (v1.4.6)
- Detail: `.content-layout` + TOC + `.prose`, actions bar (space-between)
- Blueprints: `projets.yaml`, `projet.yaml`
- 20 dummy projects for pagination testing

#### Navigation & Layout
- Header: sticky, shrinks on scroll (`.is-scrolled`), `menu_url` support for nav link override
- Mobile: burger menu, `.mobile-nav` sibling panel, `.is-nav-open` body class
- Footer: 3 columns (Ressources incl. À propos, Légal, Réseaux), border-top-radius 40px, `{% block footer_cta %}`
- `default.html.twig`: upgraded with breadcrumb, content-layout (TOC sidebar), prose wrapper — applies to all standard markdown pages

#### Typography & Styling
- `.prose` styles in `_typography.scss` (max-width 70ch, image border-radius 20px)
- Typography fixes: code block bg, `.notices.green` bg, `a:visited` color
- `$primary-color` = `$color-accent-2` (blue-green). Orange preserved on `.btn-primary`, `.site-nav-cta`
- Global form styles in `_forms.scss`

### Next Steps
- Animations/interactions pass (scroll-triggered reveals, hover refinements, page transitions)
- Responsive: full pass on all homepage sections and service pages
- Content: fill in PrestaShop child service pages with real prose content
- Content: fill in Sylius pages when ready

### Pending — Design System
- Waiting on graphic designer for component specs (states, spacings, variants)

### Cleanup (Low Priority)
- `system.yaml` still references `theme: quark` — intentional until dev setup is ready
- Quark branding: `assets/quark-screenshots.jpg`, `screenshot.jpg`, `thumbnail.jpg` to replace
- `README.md` / `CHANGELOG.md` in theme are Quark originals — to rewrite or remove
- `css/custom.css` is empty — decide if keeping as override layer or removing
- Notices override markdown-notices plugin colors in `_typography.scss` with Gruvbox palette
- Admin back-office: clean up unused theme config options (keep only `grid-size` and `production-mode`)
