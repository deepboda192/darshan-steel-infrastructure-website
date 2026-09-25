# DSI Design System

The design reference for **darshansteelinfra.com** — a single-page marketing site
whose layout, spacing, components and motion follow the Modera Webflow
template (`modera_template/`, kept untracked as a reference), re-keyed to the
Darshan Steel Infrastructure brand. Everything here is implemented in
`src/styles.css` (tokens + `m-*` component classes), `src/lib/motion.ts`
(scroll motion) and the components under `src/components/`.

_Last updated: 24 September 2026._

---

## 1. Principles

1. **Tokens only.** Tailwind's stock palette is cleared (`--color-*: initial`),
   so a class such as `bg-slate-900` produces no CSS. Every colour, face,
   size and radius comes from the `@theme` block in `src/styles.css`.
2. **Content is data.** Copy, figures, clients, solutions, industries and
   workflow stages live in `src/data/*.ts`; projects come from Supabase
   through the route loader. Components never carry marketing copy of their
   own — reorganise, don't invent.
3. **Four page types.** The home page (`src/routes/index.tsx`), About
   (`src/routes/about.tsx`), the projects index (`src/routes/projects/index.tsx`)
   and the project record (`src/routes/projects/$slug.tsx`). Home navigation is
   by `/#section` anchor; About and Projects have pages of their own. Do not add
   further pages unless asked.
4. **Progressive enhancement.** The page renders complete and static without
   JavaScript; motion is layered on once the `js` class is set and is
   switched off under `prefers-reduced-motion`.
5. **Reuse the building blocks.** New UI is composed from the `m-*` classes
   and the `Button` / `SectionIntro` / `ImageFrame` components before any
   one-off styling is written.

---

## 2. Colour

### Brand tokens

| Token | Value | Use |
| --- | --- | --- |
| `--color-primary` | `#03599e` | The brand blue. |
| `--color-primary-deep` | `#034c86` | Hover state of the primary. |
| `--color-secondary` | `#141414` | The dark surface (bands, enquiry block, 404). |

### Role tokens (what components actually reference)

| Token | Resolves to | Where it appears |
| --- | --- | --- |
| `--color-accent` | primary | Buttons, eyebrow rules, icon plates, highlight words, focus rings, `::selection`, nav hover rule. |
| `--color-accent-deep` | primary-deep | Button hover. |
| `--color-secondary` | — | Solutions and Why DSI bands, image captions, the About stat box, the 404 page. Hairlines on light surfaces use `secondary/15`–`/20`. |

### Neutrals

`--color-neutral-1` `#f5f5f5` · `-2` `#d2d2d2` · `-3` `#a4a4a5` · `-4` `#8e8e8f` ·
`-5` `#777778` · `-6` `#606062` · `-7` `#49494b` · `-8` `#2b2b2c` ·
`-9` `#1c1c1e` · `-10` `#0a0a0a`, plus `--color-white` and `--color-black`.

- Body copy: neutral-9 on white. Headings: neutral-10 (white on dark via `.light`).
- Paragraphs: neutral-8; on dark surfaces neutral-1 (`.m-paragraph.light`).
- Light panels and info boxes: neutral-1. Hairlines on dark: `white/20`–`/30`;
  on light: `black/10` or `secondary/15`.

### Feedback

| Token | Value | Use |
| --- | --- | --- |
| `--color-error` | `#b42318` | Error text on light surfaces. |
| `--color-error-tint` | `#fef3f2` | Error background on light surfaces. |
| `--color-error` | `#b3261e` | Error text, icons and borders on the light form block (alert boxes, invalid fields). |
| `--color-error-light` | `#ffb4ab` | Reserved for error text on dark surfaces; currently unused. |
| `--color-error-soft` | `#ff8f83` | Reserved for error borders on dark surfaces; currently unused. |

Errors are deliberately coral, never the brand blue, so validation stays
distinguishable from interactive elements.

### Overlays

- Hero photograph: `linear-gradient(90deg, #000000a6, #0000008c)`.
- Solution card hover wash: `#141414a6`.
- Footer backdrop: black at 60% (`bg-black/60`) over the whole photograph.

### Contrast notes

White on primary ≈ 7:1 and primary on white ≈ 7:1 (AA/AAA for text).
Primary on the secondary surface is only ≈ 2.7:1 — fine for filled buttons
and icon plates, **not for text**: links on dark bands use `.m-link.light`
(white) rather than the accent.

---

## 3. Typography

### Faces

| Role | Family | Weights loaded | Notes |
| --- | --- | --- | --- |
| Headings, buttons, eyebrows, nav | **Radio Canada Big** (`--font-heading`) | 400–700 | Google Fonts, variable. `body { font-synthesis: style }` keeps browsers from faking weights. |
| Everything else | **Inter** (`--font-sans`) | 300–700 | Google Fonts, variable. |

Both are loaded by one `<link>` in `src/routes/__root.tsx`.

### Heading rules

- **Sentence case.** No `text-transform` on headings (buttons, nav links and
  eyebrow labels are the only caps on the site).
- **No letter-spacing** on headings or display numerals.
- **Line-height by rendered size:** a heading rendering at **36 px or larger**
  uses `--lh-lg: 1.15`; anything smaller uses `--lh-sm: 1.167` (the
  28-on-24 ratio). Inline-sized headings in components use
  `leading-(--lh-lg)` / `leading-(--lh-sm)` so they follow the same rule.
- Headings are 700; on dark surfaces `.light` drops them to 600, as the reference does.

### Scale (`.m-h1` … `.m-h5`)

| Class | Desktop | ≤ 767 px | ≤ 479 px |
| --- | --- | --- | --- |
| `.m-h1` | 75 / 86.25 (`min(75px, 9.6svh)` — shrinks on viewports under ~780 px tall) | 52 / 59.8 | 42 / 48.3 |
| `.m-h2` | 54 / 62.1 | 38 / 43.7 | 30 / 35.0 |
| `.m-h3` | 42 / 48.3 | 31 / 36.2 | 24 / 28 |
| `.m-h4` | 31 / 36.2 | 24 / 28 | 22 / 25.7 |
| `.m-h5` | 24 / 28 | 22 / 25.7 | 22 / 25.7 |

(font-size / line-height in px. Sizes live on `:root` as `--fs-h*` with
`--lh-h*` alongside, so the classes stay one line each.)

Commonly used inline heading sizes: solution cards 36 px, project names 48 px
(24 on phones), process/feature titles 24–28 px, footer call-to-action 64 px,
About statement in Inter at lead size (`m-paragraph large`, 20 px), stat figures 54–68 px (`leading-none`).

### Paragraphs (`.m-paragraph`)

| Variant | Size / line-height | ≤ 767 px |
| --- | --- | --- |
| default | 18 / 1.5 | 16 / 1.6 |
| `.large` | 20 / 1.5 | 18 |
| `.medium` | 16 / 1.6 | 14 at ≤ 479 |
| `.small` | 14 / 1.6 | — |

Body default is Inter 16 / 1.6, weight 400. Add `.light` on dark surfaces.

### Labels and eyebrows

- `.m-subtitle` — the section eyebrow: 16 px (14 on phones), Radio Canada Big 700,
  uppercase, with a 5 px accent rule on the left. `.light` on dark surfaces
  (adds +0.5 px tracking).
- Small uppercase labels (hero disciplines, project category, form labels)
  are 14–16 px Radio Canada Big with `tracking-[0.5px]`. This is the only positive
  tracking on the site and exists for legibility of small caps.

---

## 4. Layout and spacing

| Token | Desktop | ≤ 991 | ≤ 767 | ≤ 479 |
| --- | --- | --- | --- | --- |
| `--container-site` | 1370 px max width | | | |
| `--container-pad` | 30 px | 30 | 24 | 16 |
| `--section-lg` (section padding) | 96 px | 80 | 72 | 64 |
| `--section-md` | 80 px | 72 | 64 | 64 |

- `.m-container` — centred, max 1370 px, side padding from the token.
- `.m-section` — `padding-block: var(--section-lg)`; sections that butt against
  a photograph or another band override with `pb-0` etc.
- **Breakpoints** follow the reference: 991 (tablet), 767 (landscape phone),
  479 (phone). In Tailwind these are written `max-lg`, `max-md`,
  `max-xs` (a named breakpoint, `--breakpoint-xs: 30rem` = 480 px — never `max-[479px]` or a px value: Tailwind v4 sorts max-variants by bare number, so anything not in rem lands before `max-md` and the tablet rule wins on phones); desktop-only layout switches on `lg:`.
- **Radius**: `--radius-btn: 2px` on buttons; everything else is square.
- **Grids**: cell plates use hairline dividers (`border-l border-t` on the
  grid, `border-r border-b` on each cell) rather than gaps. Card grids use
  `gap-5` / `gap-7`.
- **Easing**: `--ease-modera: cubic-bezier(0.25, 0.46, 0.45, 0.94)` for hover
  transitions.
- `html, body { overflow-x: clip }` keeps pre-reveal `translateX` states from
  making the page pannable. Keep it `clip`, not `hidden`: `clip` does not
  create a scroll container, so the sticky project rows still work.

---

## 5. Components

### CSS building blocks (`@layer components`, prefixed `m-`)

| Class | What it is |
| --- | --- |
| `.m-container`, `.m-section` | Layout wrappers (see §4). |
| `.m-subtitle` (+ `.light`) | Section eyebrow with the accent rule. |
| `.m-h1` … `.m-h5` (+ `.light`) | Display headings. |
| `.m-paragraph` (+ `.large` `.medium` `.small` `.light`) | Copy. |
| `.m-btn` | Solid accent button: 14 × 18 px padding, 16 px caps, 2 px radius, hover to `accent-deep`. |
| `.m-btn-outline` (+ `.light`) | Hairline outline that fills with the accent on hover. |
| `.m-btn-arrows` | The two-arrow swap inside buttons (first arrow leaves right, second arrives from the left). |
| `.m-link` (+ `.light`) | Underlined text link, 18 px (16 on phones); white on dark bands. |
| `.m-nav-link` | 78 px tall caps link with an accent underline on hover. |
| `.m-icon-box` | Square accent plate for a Lucide icon; size set inline (typically 70 × 70, icon 30 / stroke 1.8). |
| `.m-marquee`, `.m-marquee-track` | Clipped row of duplicated tracks driven by `data-marquee`. |
| `.m-tag` | Accent category plate on project cards (6 × 12 px padding, 16 px medium). |
| `.m-chip` | Filter chip: hairline box that fills with the accent on hover or when `aria-pressed`. |
| `.m-field` | Form control on the light block: white background, near-black text, `black/15` hairline (`black/30` on hover), accent border + soft accent ring on focus, `--color-error` when `aria-invalid`. |
| `.tabular` | Tabular numerals for small indices and the message counter; the big stat figures stay proportional so they set like the hero figure. |

### React components

| Component | Purpose / API |
| --- | --- |
| `site/Button` | `variant` `primary` \| `outline` \| `link`; `tone` `light` \| `dark` (outline on dark surfaces); `arrow` (default on); `href` renders an anchor (`/#…`, external, `mailto:`) or a router link; otherwise a `<button>` with `type`, `disabled`, `onClick`. |
| `site/Select` | The site-styled select (ARIA select-only combobox): `.m-field` trigger, white hairline listbox panel with square corners, active row on neutral-1, chosen row in the accent with a check; arrow keys, Home/End, type-ahead, Enter/Space, Escape, outside click. Used for project type and area unit. |
| `site/SectionIntro` | Eyebrow + heading in one rhythm: `subtitle`, `title`, `tone`, `align` `left` \| `center`, `animate` `blur` \| `none`, `as` `h1` \| `h2`. Every section opens with it. |
| `site/Container` | Thin `.m-container` wrapper (also used by the admin/auth screens). |
| `site/ContactForm` | The enquiry form: validation summary + per-field errors, honeypot, posts to `VITE_ENQUIRY_ENDPOINT` (default `/api/public/enquiry`). Reads `?intent=` to preselect the subject. |
| `site/NotFoundPage` | 404 on the secondary surface; calls `useMotion()`. |
| `site/InnerHero` | Inner-page hero (65 svh photo under a wash): `title`, `image`, `crumbs` (the last is the current page), `tall` for records. |
| `site/VideoBand` | Full-width film band (90 svh) with a play/pause control; loads through `lib/useLazyVideo` exactly like the hero video. |
| `about/*` | The About page sections: `AboutIntro` (statement, big figures, film box with its lightbox, figure plates), `TaglineBand` (outlined marquee + photo), `Principles` (six-cell plate on the dark surface), `ShopAndSite` (sticky argument + the two works), `IntegratedModel` (four stepped, sticky cards), `Leadership`. |
| `projects/Gallery` | Two-across gallery tiles with a hover wash; each opens a native `<dialog>` lightbox with previous/next, arrow keys and Escape. |
| `projects/ProjectCard` | The reference's project card: 76 %-tall photo under a gradient wash, accent type tag, location and name; links to the record. `priority` for above-the-fold cards. |
| `media/ImageFrame` | Photograph with `tone`, `ratio` (`fill` …), `scrim`, `zoom`, `priority`, `sizes`; falls back to `TechnicalPlate` when the image has no `src`. |
| `sections/Counter` | `<span data-counter data-suffix>` with the final value server-rendered. |
| `layout/Navbar`, `layout/Footer`, `layout/Logo` | Chrome. `Logo tone="dark"` = white mark for dark backgrounds, `tone="light"` = colour mark. |

### Component conventions

- Section files own their layout only; pull copy from `src/data`.
- Icons are `lucide-react`, mapped per slug inside the component that shows
  them (presentation, not data).
- Hover states are CSS (`group-hover`, `transition-*`); scroll-driven states
  are the motion attributes below. Never both on the same property.
- Values still awaiting real DSI data carry `data-placeholder="true"`;
  `?audit=1` outlines them.

---

## 6. Motion

Implemented in `src/lib/motion.ts` (GSAP 3 + ScrollTrigger + SplitType,
loaded lazily on the client). Mark up elements with data attributes:

| Attribute | Behaviour | Timing |
| --- | --- | --- |
| `data-counter="230" data-suffix="+"` (`data-grouping`) | Counts up from zero when scrolled into view; `en-IN` digit grouping. | 2.3 s, `power3.out` |
| `data-scrub-words` | Words brighten one by one as the block scrolls through the viewport. | scrubbed |
| `data-animation="blur-stagger"` | Words blur-fade in (headings). `…-chars` does it per character. | 1.2 s, stagger 0.06, `quart.out` |
| `data-marquee="left\|right"` + `data-marquee-speed` on the wrapper, `data-marquee-track` on each duplicated track | Infinite loop; pauses on hover. | linear; speed = loop duration |
| `data-reveal="up\|fade\|left\|right"` (`data-reveal-delay`) | Entrance when scrolled into view; anything already on screen when motion arms (the hero foot, short viewports) plays at once. | 0.9 s, `power2.out` |
| `data-reveal-stagger` | Children enter one after another. | stagger 0.12 |
| `data-stack` / `data-stack-item` | Sticky rows: as the next slides over, the covered row scales to 0.8 and fades out, scrubbed over its share of the stack; last row stays. ≥ 1024px only. | scrub 0.8, linear |

Rules:

- **Call `useMotion()` from the page component** (`HomePage`, `NotFoundPage`),
  never from the root layout: lazy route chunks hydrate after the root effect
  runs, and GSAP's inline styles would cause hydration mismatches.
- Initial hidden states are applied only under `html.js` (set by the inline
  boot script in `__root.tsx`); without JS everything is visible.
- Under `prefers-reduced-motion: reduce` all attributes render static and the
  counters show their final values.
- Smooth scrolling is on (`html { scroll-behavior: smooth }`), which is what
  makes the `/#section` anchors glide.

---

## 7. Page anatomy (home)

| # | Section (`id`) | Reference pattern | Content source |
| --- | --- | --- | --- |
| 1 | Hero | one-viewport photo (`min-h-svh`; gaps, stat box and h1 compress on short screens), blur-in headline, certification marks + stat box | hero copy in `Hero.tsx`, `company.metrics`, `company.certifications` |
| 2 | About (`#about`) | scrub statement, Vision/Mission, stat plate + photos | `company.about/vision/mission/metrics` |
| 3 | Solutions (`#solutions`) | 3 × 2 service grid on the dark band, photo in every cell (zooms 6% on hover, clipped), summary on hover | `solutions` |
| 4 | Why DSI (`#why-dsi`) | drone photo of the works under `black/70`, hairline cells, accent on hover | `whyChooseDsi` |
| 5 | Clients | ruled heading, then a hairline grid of marks (4 / 3 / 2 across) | `clients` |
| 6 | Projects (`#projects`) | sticky stacked rows, covered row shrinks + fades (`data-stack`) | Supabase via route loader (`projectsQueryOptions`) |
| 7 | Process (`#process`) | numbered step cards on neutral-1 | `workflowStages` |
| 8 | Contact (`#contact`) | info boxes, form on the light block, photo | `company` contact data, `ContactForm` |
| — | Footer | closing CTA over a photo; white box in three labelled, left-aligned columns (brand + office/factory addresses · link groups under headings · email/phones/social) with copyright and back-to-top; watermark | footer copy, `footerNav` |

Navigation (`src/data/nav.ts`): About · Solutions · Projects · Why DSI ·
Process · Contact, plus the "Contact Us" button → `/#contact`. Projects
leads to its own pages; the other links are home-page anchors that resolve
from any page.

### About (`/about`)

`InnerHero` ("About DSI", Home • About) → *Who we are*: the eyebrow beside the
statement and `company.about`, a still linking to the projects, the two big
figures (years since establishment, projects delivered), the film box (poster +
pulsing play button opening the works film in a `<dialog>`) and two figure
plates (capacity on the accent, built-up area on the dark surface) → *What we
build* (the same Solutions grid as the home page) → the tagline band (`company.tagline` as hollow marquee type with the portal-frame
photo rising into it) → *How we work* on the dark surface: the six operating
principles (`operatingPrinciples` in `capabilities.ts`) as a hairline plate
filling with the accent on hover → *Shop and site*: sticky heading, argument
and facts (established / facility area / workforce) beside a card per works
(`company.works`) → *What we do*: the four bands of the integrated model
(`integratedModel`), each card stepping 60 px lower and sticking as the page
scrolls, listing the workflow stages it covers → the film band → *Leadership*
(eyebrow-left / heading-right, profiles flagged as pending). Team profiles and
FAQs are omitted until DSI has the content.

### Staff sign-in (`/auth`) and admin (`/admin`, `/admin/projects`, `/admin/users`)

Tools, not pages: the root layout drops the navbar and footer for them.
Sign-in is a white card (max 440 px) on the secondary surface — logo,
`m-subtitle`, 28 px heading, `.m-field` inputs, a full-width primary button
and an `m-link` to switch between sign-in and account creation; feedback is
the pale red error panel or a pale accent info panel. Admin is a white header
(logo · "Site management" · View site / Sign out) with caps tab links
underlined in the accent, over a neutral-1 workspace; screens use white
hairline cards, 28 px headings, 13 px caps labels, `.m-field` controls, the
site `Select` and `Button`, and `--color-error` for destructive actions.

### Projects index (`/projects`)

`InnerHero` ("Projects", Home • Projects) → `SectionIntro` + lead → a row of
`.m-chip` filters (All + one per building type on record; client-side, the
server renders the full list) → `ProjectCard`s two across (one on tablets and
phones). Records come from the route loader (Supabase, catalogue fallback).

### Project record (`/projects/:slug`)

`InnerHero` (`tall`, name, Home • Projects • name) → the cover photograph
(54 % tall) → two columns (1.72 fr / 1 fr, stacked below 992 px): the case
study (overview, challenge, approach, execution, result, then the gallery)
and a sticky rail with Project details (icon rows), Specification and the
contact card → "More projects" (the next two records) on neutral-1. An
unknown slug throws `notFound()` from the loader and renders the 404 page
with a real 404 status; the sitemap lists every verified record.

---

## 8. Imagery

- Photographs are registered in `src/data/images.ts` (`siteImages.hero`,
  `.aboutPrimary`, `.aboutSecondary`, `.manufacturing`, `.safety`,
  `.footer`, `.whatWeBuild.*`). Give every entry `src`, `alt`, `width`,
  `height`; an empty `src` renders the `TechnicalPlate` fallback instead of a
  broken image.
- Dark washes over photographs use the overlays in §2 so white type stays
  legible; never place text on an un-washed photo.
- The hero also carries a looping video (`public/videos/hero-loop.mp4`, registered as
  `heroVideo` in `images.ts`) layered over the photograph by `sections/HeroVideo`.
  It is server-rendered without a source, attached only after the page `load`
  event when the browser is idle, and faded in on `playing`; it is skipped under
  reduced motion, data saver or 2G/3G. The photograph stays the first and
  largest contentful paint.
- The hero's certification marks (TÜV SÜD ISO 9001 / 14001 / 45001, trimmed to
  their octagons, surround knocked out) sit in equal boxes so the three read
  at one size.

---

## 9. Forms

- Controls use `.m-field`; labels are 14 px caps eyebrow style in neutral-8. The form sits on a neutral-1 block so the white fields read as fields.
- Required fields are marked in the label; the summary (`role="alert"`) lists
  every problem with a jump link, and each field repeats its own message
  beneath it. Colours: `error-soft` borders, `error-light` text.
- The success and failure panels reuse the same block; buttons inside are
  `Button` primary / outline `tone="dark"`.

---

## 10. Guardrails

- Never reintroduce Modera's orange (`#ff5500`) or teal; the accent is the
  brand blue and there is one token for it.
- No new `@theme` colours without a role; no raw hex in components except
  the four overlays listed in §2.
- No letter-spacing and no uppercase on headings. Caps stay on buttons, nav
  and eyebrows only.
- Keep `overflow-x: clip` (not `hidden`) on `html`/`body`.
- Server-rendered Supabase content must come from a route loader
  (`ensureQueryData` + `useLoaderData`), never a bare `useQuery` — the router
  has no react-query SSR integration and a bare query hydrates mismatched.
- Admin (`/admin/*`) and sign-in (`/auth`) render as bare shells without the
  site chrome (`RootComponent` in `__root.tsx`).
- The repo's Prettier config is not enforced; match the surrounding file's
  style (single quotes, no semicolons in the site components).

---

## 11. Known gaps

- The hero still uses stock photography. DSI's aerial shot of the works is
  in (`public/images/works-aerial.webp`, `siteImages.worksAerial`, behind
  Why DSI); the rest of the site's photographs remain stock until DSI
  supplies more.
- Modera's testimonials and blog sections are intentionally omitted — no DSI
  content exists for them.
- The shadcn `src/components/ui/*` kit is unused apart from `sonner`; it and
  its dependencies can be removed if the Lovable workflow no longer needs it.

---

## 12. File map

```
src/styles.css                  tokens (@theme), :root scale, base, m-* components, motion CSS, audit mode
src/lib/motion.ts               initMotion() / useMotion() — the data-attribute behaviours
src/lib/useLazyVideo.ts         post-load, idle-scheduled muted video (hero backdrop, film band)
src/routes/__root.tsx           fonts <link>, meta, boot script, Navbar/Footer shell
src/routes/index.tsx            the home page: section order + projects loader
src/routes/about.tsx            the About page
src/routes/projects/            index.tsx (all records + filter) and $slug.tsx (the record)
src/components/site/            Button, SectionIntro, InnerHero, VideoBand, Container, ContactForm, NotFoundPage, NextLink
src/components/about/           AboutIntro, TaglineBand, Principles, ShopAndSite, IntegratedModel, Leadership
src/components/projects/        ProjectCard
src/components/sections/        one file per home-page section (+ Counter)
src/components/layout/          Navbar, Footer, Logo
src/components/media/           ImageFrame, NextImage, TechnicalPlate
src/data/                       company, solutions, capabilities, industries, clients, projects (fallback), nav, images
modera_template/                the Webflow reference export (untracked)
```
